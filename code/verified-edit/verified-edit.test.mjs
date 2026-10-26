import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { verifiedEdit } from './verified-edit.mjs';

async function fixture(t, text = 'original') {
  const root = await mkdtemp(join(tmpdir(), 'verified-edit-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const file = join(root, 'module.mjs');
  await writeFile(file, text);
  return { root, file };
}
const pass = { command: 'node --test', exitCode: 0 };
const reject = { command: 'node --test', exitCode: 1 };

test('validates the candidate before publishing and records committed bytes', async t => {
  const { root, file } = await fixture(t);
  const r = await verifiedEdit({ file, produceCandidate: () => 'accepted', runCheck: async staged => {
    assert.notEqual(staged, file);
    assert.equal(await readFile(file, 'utf8'), 'original');
    assert.equal(await readFile(staged, 'utf8'), 'accepted');
    return pass;
  } });
  assert.equal(r.outcome, 'completed');
  assert.equal(r.receipt.exitCode, 0);
  assert.notEqual(r.receipt.before, r.receipt.after);
  assert.equal(await readFile(file, 'utf8'), 'accepted');
  assert.deepEqual(await readdir(root), ['module.mjs']);
});

for (const [name, check, expected] of [
  ['nonzero check', async () => reject, 'check-rejected'],
  ['checker exception', async () => { throw Error('checker unavailable'); }, 'check-error'],
  ['missing check result', async () => null, 'check-rejected'],
  ['incomplete check receipt', async () => ({ exitCode: 0 }), 'check-rejected'],
]) test(`${name} preserves original bytes and cleans up staging`, async t => {
  const { root, file } = await fixture(t);
  const r = await verifiedEdit({ file, produceCandidate: () => 'unaccepted', runCheck: check });
  assert.equal(r.outcome, expected);
  assert.equal(r.receipt, null);
  assert.equal(await readFile(file, 'utf8'), 'original');
  assert.deepEqual(await readdir(root), ['module.mjs']);
});

test('an outside edit during verification is preserved', async t => {
  const { file } = await fixture(t);
  const r = await verifiedEdit({ file, produceCandidate: () => 'candidate', runCheck: async () => {
    await writeFile(file, 'human edit');
    return pass;
  } });
  assert.equal(r.outcome, 'conflict-before-commit');
  assert.equal(r.receipt, null);
  assert.equal(await readFile(file, 'utf8'), 'human edit');
});

test('an outside edit is preserved when the checker throws', async t => {
  const { file } = await fixture(t);
  await verifiedEdit({ file, produceCandidate: () => 'candidate', runCheck: async () => {
    await writeFile(file, 'human edit');
    throw Error('checker unavailable');
  } });
  assert.equal(await readFile(file, 'utf8'), 'human edit');
});

test('an edit during generation prevents verification and promotion', async t => {
  const { file } = await fixture(t);
  const r = await verifiedEdit({ file, produceCandidate: async () => {
    await writeFile(file, 'newer');
    return 'stale';
  }, runCheck: () => assert.fail('check must not execute') });
  assert.equal(r.outcome, 'conflict-before-check');
  assert.equal(await readFile(file, 'utf8'), 'newer');
});

test('cancellation during verification preserves original bytes', async t => {
  const { file } = await fixture(t), ctl = new AbortController();
  const r = await verifiedEdit({ file, signal: ctl.signal, produceCandidate: () => 'candidate', runCheck: async () => { ctl.abort(); return pass; } });
  assert.equal(r.outcome, 'cancelled');
  assert.equal(await readFile(file, 'utf8'), 'original');
});

test('a pre-cancelled edit does not call the producer', async t => {
  const { file } = await fixture(t), ctl = new AbortController();
  ctl.abort();
  const r = await verifiedEdit({ file, signal: ctl.signal, produceCandidate: () => assert.fail(), runCheck: () => assert.fail() });
  assert.equal(r.outcome, 'cancelled');
});

test('a checker cannot promote bytes different from the proposed candidate', async t => {
  const { file } = await fixture(t);
  const r = await verifiedEdit({ file, produceCandidate: () => 'candidate', runCheck: async staged => { await writeFile(staged, 'different'); return pass; } });
  assert.equal(r.outcome, 'candidate-changed');
  assert.equal(await readFile(file, 'utf8'), 'original');
});

test('participating editors serialize without overwriting one another', async t => {
  const { file } = await fixture(t);
  let release, started;
  const held = new Promise(resolve => { release = resolve; });
  const ready = new Promise(resolve => { started = resolve; });
  const first = verifiedEdit({ file, produceCandidate: () => 'first', runCheck: async () => { started(); await held; return pass; } });
  await ready;
  const second = await verifiedEdit({ file, produceCandidate: () => 'second', runCheck: async () => pass });
  assert.equal(second.outcome, 'busy');
  release();
  assert.equal((await first).outcome, 'completed');
  assert.equal(await readFile(file, 'utf8'), 'first');
});

test('producer exceptions release the lock for a later edit', async t => {
  const { file } = await fixture(t);
  await assert.rejects(verifiedEdit({ file, produceCandidate: () => { throw Error('producer unavailable'); }, runCheck: async () => pass }));
  const r = await verifiedEdit({ file, produceCandidate: () => 'accepted', runCheck: async () => pass });
  assert.equal(r.outcome, 'completed');
});

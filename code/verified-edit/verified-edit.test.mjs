import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { verifiedEdit } from './verified-edit.mjs';

async function fixture(text = 'export const x = 1;\n') {
  const file = join(await mkdtemp(join(tmpdir(), 'edit-')), 'mod.js');
  await writeFile(file, text);
  return file;
}
const pass = { command: 'check', exitCode: 0 };
const fail = { command: 'check', exitCode: 1 };

test('passing check completes with a receipt', async () => {
  const file = await fixture();
  const r = await verifiedEdit({ file, produceCandidate: () => 'export const x = 2;\n', runCheck: async () => pass });
  assert.equal(r.outcome, 'completed');
  assert.equal(r.receipt.exitCode, 0);
  assert.equal(await readFile(file, 'utf8'), 'export const x = 2;\n');
});

test('failing check restores the original and issues no receipt', async () => {
  const file = await fixture();
  const r = await verifiedEdit({ file, produceCandidate: () => 'broken(', runCheck: async () => fail });
  assert.equal(r.outcome, 'check-failed-restored');
  assert.equal(r.receipt, null);
  assert.equal(await readFile(file, 'utf8'), 'export const x = 1;\n');
});

test('an edit by someone else during the check is never overwritten', async () => {
  const file = await fixture();
  const r = await verifiedEdit({
    file,
    produceCandidate: () => 'broken(',
    runCheck: async f => { await writeFile(f, 'human fix\n'); return fail; },
  });
  assert.equal(r.outcome, 'conflict-after-write');
  assert.equal(await readFile(file, 'utf8'), 'human fix\n');
});

test('a file changed while the candidate was generating is not written', async () => {
  const file = await fixture();
  const r = await verifiedEdit({
    file,
    produceCandidate: async () => { await writeFile(file, 'newer\n'); return 'stale candidate'; },
    runCheck: async () => pass,
  });
  assert.equal(r.outcome, 'conflict-before-write');
  assert.equal(await readFile(file, 'utf8'), 'newer\n');
});

test('cancellation during the check rolls back and does not complete', async () => {
  const file = await fixture();
  const ctl = new AbortController();
  const r = await verifiedEdit({
    file, signal: ctl.signal,
    produceCandidate: () => 'export const x = 3;\n',
    runCheck: async () => { ctl.abort(); return pass; },
  });
  assert.equal(r.outcome, 'cancelled');
  assert.equal(await readFile(file, 'utf8'), 'export const x = 1;\n');
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, readdir, unlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { verifiedEdit } from './verified-edit.mjs';

async function fixture(t) {
  const dir = await mkdtemp(join(tmpdir(), 'public-edit-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const file = join(dir, 'module.mjs');
  await writeFile(file, 'original');
  return { dir, file };
}
test('throwing check restores bytes and releases the lock', async t => {
  const { file, dir } = await fixture(t);
  const r = await verifiedEdit({ file, produceCandidate: () => 'candidate', runCheck: () => { throw Error('spawn failed'); } });
  assert.equal(r.outcome, 'check-error');
  assert.equal(r.receipt, null);
  assert.equal(await readFile(file, 'utf8'), 'original');
  assert.deepEqual(await readdir(dir), ['module.mjs']);
});
test('malformed check cannot issue a completion receipt', async t => {
  const { file } = await fixture(t);
  const r = await verifiedEdit({ file, produceCandidate: () => 'candidate', runCheck: () => ({ exitCode: 0 }) });
  assert.equal(r.outcome, 'check-rejected');
  assert.equal(await readFile(file, 'utf8'), 'original');
});
test('deletion during check is preserved', async t => {
  const { file } = await fixture(t);
  const r = await verifiedEdit({ file, produceCandidate: () => 'candidate', runCheck: async () => { await unlink(file); return {command:'test',exitCode:0}; } });
  assert.equal(r.outcome, 'conflict-before-commit');
  await assert.rejects(readFile(file), { code: 'ENOENT' });
});
test('pre-aborted signal never calls candidate or check', async t => {
  const { file } = await fixture(t);
  const signal = AbortSignal.abort();
  const forbidden = () => { throw Error('unexpected call'); };
  assert.equal((await verifiedEdit({ file, signal, produceCandidate: forbidden, runCheck: forbidden })).outcome, 'cancelled');
  assert.equal(await readFile(file, 'utf8'), 'original');
});
test('candidate generation errors release the lock without writing', async t => {
  const { file, dir } = await fixture(t);
  await assert.rejects(verifiedEdit({file, produceCandidate: () => {throw Error('generation');}, runCheck: () => ({command:'test',exitCode:0})}), /generation/);
  assert.equal(await readFile(file,'utf8'), 'original');
  assert.deepEqual(await readdir(dir), ['module.mjs']);
});
test('invalid candidate type does not replace the file', async t => {
  const { file } = await fixture(t);
  await assert.rejects(verifiedEdit({ file, produceCandidate: () => null, runCheck: () => ({command:'test',exitCode:0}) }), /UTF-8/);
  assert.equal(await readFile(file,'utf8'), 'original');
});
test('lock excludes a competing process before candidate generation', async t => {
  const { file } = await fixture(t);
  let announce;
  const entered = new Promise(resolve => { announce = resolve; });
  let release;
  const blocked = new Promise(resolve => { release = resolve; });
  const first = verifiedEdit({file, produceCandidate: async () => {announce(); await blocked; return 'first';}, runCheck: () => ({command:'test',exitCode:0})});
  await entered;
  try {
    const source = `import {verifiedEdit} from ${JSON.stringify(new URL('./verified-edit.mjs', import.meta.url).href)};
      const result = await verifiedEdit({file:${JSON.stringify(file)}, produceCandidate:()=>{throw Error('must not run');},runCheck:()=>({command:'test',exitCode:0})});
      console.log(JSON.stringify(result));`;
    const child = spawn(process.execPath, ['--input-type=module', '-e', source], {stdio:['ignore','pipe','pipe']});
    let output=''; let errors='';
    child.stdout.on('data', b => {output += b;});
    child.stderr.on('data', b => {errors += b;});
    const [code] = await once(child,'close');
    assert.equal(code,0,errors);
    assert.equal(JSON.parse(output).outcome,'busy');
  } finally {release(); await first;}
});

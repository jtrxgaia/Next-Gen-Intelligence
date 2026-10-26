import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { runJsonProcess } from './process-solver.mjs';

test('the evaluation CLI runs a private adapter and emits an answer-free provenance receipt', async t => {
  const root = await mkdtemp(join(tmpdir(), 'evaluator-cli-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const tasks = join(root, 'tasks.json'), adapter = join(root, 'adapter.mjs');
  await writeFile(tasks, JSON.stringify({ fixture: { train: [{ input: [[1]], output: [[1]] }], test: [{ input: [[2]], output: [[2]] }] } }));
  await writeFile(adapter, "let b='';process.stdin.on('data',x=>b+=x);process.stdin.on('end',()=>console.log(JSON.stringify(JSON.parse(b).input)));");
  const report = await runJsonProcess({ command: process.execPath,
    args: [fileURLToPath(new URL('./evaluate.mjs', import.meta.url)), '--tasks', tasks, '--adapter', adapter], input: {} });
  assert.equal(report.passed, 1);
  assert.equal(report.total, 1);
  assert.match(report.tasksetSHA256, /^[a-f0-9]{64}$/);
  assert.match(report.adapterSHA256, /^[a-f0-9]{64}$/);
  assert.equal(Object.hasOwn(report, 'tasks'), false);
  assert.equal(Object.hasOwn(report, 'outputs'), false);
  assert.equal(JSON.stringify(report).includes(root), false);
});

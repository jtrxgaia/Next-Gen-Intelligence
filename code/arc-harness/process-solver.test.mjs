import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runJsonProcess, processSolver } from './process-solver.mjs';
import { scoreTask } from './harness.mjs';
const run = (source, options = {}) => runJsonProcess({ command: process.execPath, args: ['-e', source], input: { x: 3 }, ...options });

test('a real process receives one JSON request and returns parsed JSON', async () => {
  const r = await run("let b='';process.stdin.on('data',x=>b+=x);process.stdin.on('end',()=>console.log(JSON.stringify({value:JSON.parse(b).x*2})))");
  assert.deepEqual(r, { value: 6 });
});

test('an adapter process receives no test answers from the scorer', async () => {
  const source = "let b='';process.stdin.on('data',x=>b+=x);process.stdin.on('end',()=>{const p=JSON.parse(b);if(Object.keys(p).sort().join(',')!=='input,train')process.exit(3);console.log(JSON.stringify(p.input))})";
  const r = await scoreTask({ train: [{ input: [[1]], output: [[1]] }], test: [{ input: [[2]], output: [[2]] }] }, processSolver({ command: process.execPath, args: ['-e', source] }));
  assert.equal(r.passed, true);
});

test('an unresponsive adapter is terminated at its wall-time bound', async () => {
  await assert.rejects(run('setInterval(()=>{},1000)', { timeoutMs: 150 }), { code: 'PROCESS_TIMEOUT' });
});

test('output is bounded on stdout and stderr', async () => {
  for (const stream of ['stdout', 'stderr']) {
    await assert.rejects(run(`process.${stream}.write('x'.repeat(10000))`, { maxOutputBytes: 128 }), { code: 'PROCESS_OUTPUT_LIMIT' });
  }
});

test('nonzero exits and invalid protocol output are classified', async () => {
  await assert.rejects(run('process.exit(2)'), { code: 'PROCESS_EXIT' });
  await assert.rejects(run("console.log('not json')"), { code: 'PROCESS_JSON' });
});

test('cancellation terminates an active adapter', async () => {
  const ctl = new AbortController();
  const pending = run('setInterval(()=>{},1000)', { signal: ctl.signal });
  setTimeout(() => ctl.abort(), 50);
  await assert.rejects(pending, { code: 'PROCESS_CANCELLED' });
});

test('a missing executable settles without hanging', async () => {
  await assert.rejects(runJsonProcess({ command: 'nonexistent-portfolio-adapter-29d6', input: {} }), { code: 'PROCESS_START' });
});

test('process bounds and oversized input are validated before launch', () => {
  assert.throws(() => run('', { timeoutMs: 0 }), RangeError);
  assert.throws(() => run('', { maxOutputBytes: Infinity }), RangeError);
  assert.throws(() => run('', { input: 'x'.repeat(1048576) }), RangeError);
});

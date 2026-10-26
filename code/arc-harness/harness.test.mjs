import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gridsEqual, identitySolver, scoreSet, scoreTask, withoutAnswers } from './harness.mjs';

const flip = { train: [{ input: [[1, 0]], output: [[0, 1]] }], test: [{ input: [[2, 0]], output: [[0, 2]] }] };
const same = { train: [{ input: [[5, 6]], output: [[5, 6]] }], test: [{ input: [[7, 8]], output: [[7, 8]] }, { input: [[8, 9]], output: [[8, 9]] }] };
const flipSolver = () => ({ input }) => input.map(r => [...r].reverse());

test('exact full-grid equality only', () => {
  assert.ok(gridsEqual([[1, 2]], [[1, 2]]));
  assert.ok(!gridsEqual([[1, 2]], [[1, 2, 0]]));
  assert.ok(!gridsEqual([[1]], null));
});

test('solver never receives test outputs', async () => {
  assert.equal('output' in withoutAnswers(flip).test[0], false);
  let peeked = false;
  await scoreTask(flip, () => args => { peeked = JSON.stringify(args).includes('[[0,2]]'); return null; });
  assert.equal(peeked, false);
});

test('a task with several test inputs needs all of them right', async () => {
  let calls = 0;
  const half = () => ({ input }) => (++calls === 1 ? input : [[0]]);
  assert.equal((await scoreTask(same, half)).passed, false);
});

test('a crashing solver scores zero instead of breaking the run', async () => {
  assert.equal((await scoreTask(flip, () => () => { throw new Error('x'); })).passed, false);
});

test('identity baseline and a real rule are scored honestly', async () => {
  const tasks = { flip, same };
  assert.equal((await scoreSet(tasks, identitySolver)).passed, 1);
  assert.equal((await scoreSet(tasks, flipSolver)).passed, 1);
});

test('sparse and malformed predictions cannot receive exact-match credit', async () => {
  for (const invalid of [[Array(2)], Array(1), [[1], [1, 2]], [[NaN]], [[]], [[10]], [[-1]]]) {
    assert.equal(gridsEqual(invalid, [[1, 2]]), false);
  }
  assert.equal(gridsEqual([[1]], [null]), false);
  assert.equal((await scoreTask(flip, () => () => [Array(2)])).passed, false);
});

test('solver mutations cannot change the task or later inputs', async () => {
  const task = structuredClone(same), before = structuredClone(task);
  const result = await scoreTask(task, () => ({ train, input }) => {
    assert.deepEqual(train, before.train);
    train[0].output[0][0] = 0;
    return input;
  });
  assert.equal(result.passed, true);
  assert.deepEqual(task, before);
});

test('solver construction exceptions count as incorrect attempts', async () => {
  const r = await scoreTask(same, () => { throw Error('initialization unavailable'); });
  assert.equal(r.passed, false);
  assert.equal(r.results.length, 2);
});

test('empty or malformed workloads cannot produce vacuous success', async () => {
  await assert.rejects(scoreTask({ train: [], test: [] }, identitySolver), TypeError);
  await assert.rejects(scoreTask({ train: same.train, test: [{ input: [[1]], output: [null] }] }, identitySolver), TypeError);
});

test('withheld task views cannot mutate the evaluator task', () => {
  const task = structuredClone(flip), visible = withoutAnswers(task);
  visible.train[0].output[0][0] = 9;
  assert.deepEqual(task, flip);
});

test('arbitrary task identifiers are retained as ordinary keys', async () => {
  const tasks = JSON.parse('{"__proto__":{"train":[{"input":[[1]],"output":[[1]]}],"test":[{"input":[[2]],"output":[[2]]}]}}');
  const r = await scoreSet(tasks, identitySolver);
  assert.equal(r.total, 1);
  assert.equal(r.passed, 1);
  assert.equal(Object.hasOwn(r.perTask, '__proto__'), true);
});

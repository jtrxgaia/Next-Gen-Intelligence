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

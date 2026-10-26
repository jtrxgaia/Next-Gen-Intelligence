import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gridsEqual, scoreTask } from './harness.mjs';

const task = () => ({train:[{input:[[1]],output:[[2]]}],test:[{input:[[3]],output:[[4]]},{input:[[5]],output:[[6]]}]});
test('sparse, empty, ragged and non-grid predictions cannot pass', () => {
  assert.equal(gridsEqual(new Array(1),[[1]]),false);
  assert.equal(gridsEqual([new Array(1)],[[1]]),false);
  assert.equal(gridsEqual([],[]),false);
  assert.equal(gridsEqual([[1],[1,2]],[[1],[1,2]]),false);
  assert.equal(gridsEqual([[10]],[[10]]),false);
});
test('solver factory crashes count as failures for every test input', async () => {
  const r = await scoreTask(task(),()=>{throw Error('initialization');});
  assert.equal(r.passed,false); assert.equal(r.results.length,2);
});
test('solver mutations cannot alter later cases or the caller workload', async () => {
  const original=task(); let i=0;
  const r=await scoreTask(original,()=>({train})=>{
    assert.equal(train[0].output[0][0],2);
    train[0].output[0][0]=9;
    return [[++i===1?4:6]];
  });
  assert.equal(r.passed,true); assert.equal(original.train[0].output[0][0],2);
});
test('tasks without test cases are invalid rather than successful', async () => {
  await assert.rejects(scoreTask({train:[],test:[]},()=>()=>null),/at least one/);
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { evaluate, exactEqual } from './runner.mjs';

async function adapter(t, source) {
  const dir = await mkdtemp(join(tmpdir(),'public-evaluator-'));
  t.after(()=>rm(dir,{recursive:true,force:true}));
  const path=join(dir,'adapter.mjs');
  await writeFile(path,source);
  return path;
}
test('JSON equality ignores object order but preserves array order and types', () => {
  assert.ok(exactEqual({a:1,b:[2,3]},{b:[2,3],a:1}));
  assert.ok(!exactEqual([1,2],[2,1]));
  assert.ok(!exactEqual('1',1));
});
test('protocol sends input alone, restarts adapter, and omits secrets from report', async t => {
  const path=await adapter(t, `import {readFileSync} from 'node:fs';
    const request=JSON.parse(readFileSync(0,'utf8'));
    if(Object.keys(request).join()!=='input') process.exit(2);
    let counter=0; console.log(JSON.stringify({value:request.input, count:++counter}));`);
  const cases=[1,2].map(input=>({id:'private-id',input,expected:{value:input,count:1}}));
  const report=await evaluate({cases,adapter:path});
  assert.equal(report.passed,2);
  assert.equal(report.accepted,true);
  assert.ok(!JSON.stringify(report).includes('private-id'));
  assert.ok(!JSON.stringify(report).includes(path));
});
test('wrong answers count against the full denominator', async t => {
  const path=await adapter(t,'console.log(0)');
  const r=await evaluate({cases:[{input:1,expected:0},{input:2,expected:2}],adapter:path});
  assert.equal(r.passed,1); assert.equal(r.total,2); assert.equal(r.accepted,false);
});
test('process errors and malformed output are scored as failures', async t => {
  for(const source of ['process.exit(1)','console.log("not json")']) {
    const path=await adapter(t,source);
    const r=await evaluate({cases:[{input:1,expected:1}],adapter:path});
    assert.equal(r.passed,0); assert.notEqual(r.rows[0].status,'ok');
  }
});
test('timeouts and excess output are bounded', async t => {
  const hanging=await adapter(t,'setInterval(()=>{},1000)');
  const timeout=await evaluate({cases:[{input:1,expected:1}],adapter:hanging,timeoutMs:150});
  assert.equal(timeout.rows[0].status,'timeout');
  const noisy=await adapter(t,'console.log("x".repeat(100000))');
  const limited=await evaluate({cases:[{input:1,expected:1}],adapter:noisy,maxOutputBytes:1024});
  assert.equal(limited.rows[0].status,'output-limit');
});
test('empty or malformed workloads cannot pass vacuously', async () => {
  await assert.rejects(evaluate({cases:[],adapter:'unused'}),/nonempty/);
  await assert.rejects(evaluate({cases:[{input:1}],adapter:'unused'}),/nonempty/);
});
test('adapter modification invalidates acceptance', async t => {
  const path=await adapter(t,`import {appendFileSync} from 'node:fs';
    import {fileURLToPath} from 'node:url'; appendFileSync(fileURLToPath(import.meta.url),String.fromCharCode(10)+'//changed'); console.log(1);`);
  const r=await evaluate({cases:[{input:1,expected:1}],adapter:path});
  assert.equal(r.passed,1); assert.equal(r.adapterUnchanged,false); assert.equal(r.accepted,false);
});

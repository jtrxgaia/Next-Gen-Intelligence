// Deterministic policy fixtures, not AI model evaluation or a production benchmark.
import { mkdtemp, readFile, writeFile, unlink, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { verifiedEdit } from '../verified-edit/verified-edit.mjs';

const scenarios = ['valid', 'invalid-syntax', 'check-exception', 'cancel-during-check',
  'external-during-generation', 'external-during-check-pass', 'external-during-check-fail',
  'deleted-during-check', 'cancel-before-start'];
const sha = bytes => createHash('sha256').update(bytes).digest('hex');

// Deliberately minimal baseline: write a generated candidate, run a check, report
// its status. No rollback, cancellation, or ownership checks. Not a competitor.
async function writeThenCheck({ file, produceCandidate, runCheck }) {
  await writeFile(file, await produceCandidate(await readFile(file,'utf8')));
  const check = await runCheck(file);
  return { outcome: check.exitCode === 0 ? 'completed' : 'check-failed' };
}
function syntaxCheck(file) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['--check', file], {stdio:'ignore', timeout:5000});
    child.once('error', reject);
    child.once('close', code => resolve({command:'node --check candidate.mjs', exitCode:code}));
  });
}
async function runOne(dir, implementation, scenario, iteration) {
  const file = join(dir,'candidate.mjs');
  const baseline = `export const value = ${iteration};\n`;
  const candidate = scenario === 'invalid-syntax' ? 'export const value = (' : `export const value = ${iteration+1};\n`;
  const external = `export const humanEdit = ${iteration};\n`;
  await writeFile(file,baseline);
  const controller = new AbortController();
  if (scenario === 'cancel-before-start') controller.abort();
  let r; let error = null;
  const started = performance.now();
  try {
    r = await implementation({file, signal:controller.signal,
      produceCandidate: async () => {
        if (scenario === 'external-during-generation') await writeFile(file,external);
        return candidate;
      },
      runCheck: async () => {
        if (scenario === 'check-exception') throw Error('injected process-start error');
        if (scenario === 'cancel-during-check') controller.abort();
        if (scenario.startsWith('external-during-check')) await writeFile(file,external);
        if (scenario === 'deleted-during-check') await unlink(file);
        if (scenario === 'external-during-check-fail' || scenario === 'deleted-during-check') return {command:'injected failure',exitCode:1};
        return syntaxCheck(file);
      }});
  } catch (e) { error = e.name; }
  const elapsedMs = performance.now()-started;
  let final = null;
  try { final = await readFile(file,'utf8'); } catch(e) { if(e.code !== 'ENOENT') throw e; }
  const expected = scenario.startsWith('external-') ? external : scenario === 'deleted-during-check' ? null : scenario === 'valid' ? candidate : baseline;
  const shouldComplete = scenario === 'valid';
  return {scenario, iteration, policyPassed: final === expected && (r?.outcome === 'completed') === shouldComplete,
    outcome:r?.outcome ?? 'threw', error, finalMatchesExpected:final===expected, elapsedMs};
}
export async function runBenchmark({ rounds = 10 } = {}) {
  const dir = await mkdtemp(join(tmpdir(),'public-edit-benchmark-'));
  const rows = [];
  try {
    for(let iteration=0;iteration<rounds;iteration++) for(const scenario of scenarios) {
      // Alternate execution order to reduce a fixed order's timing bias.
      const implementations = iteration%2 ? [['verified',verifiedEdit],['baseline',writeThenCheck]] : [['baseline',writeThenCheck],['verified',verifiedEdit]];
      for(const [implementation, fn] of implementations) rows.push({implementation,...await runOne(dir,fn,scenario,iteration)});
    }
  } finally {await rm(dir,{recursive:true,force:true});}
  const summary = Object.fromEntries(['baseline','verified'].map(name => {
    const selected=rows.filter(r=>r.implementation===name);
    const times=selected.map(r=>r.elapsedMs).sort((a,b)=>a-b);
    const midpoint = Math.floor(times.length/2);
    return [name,{passed:selected.filter(r=>r.policyPassed).length,total:selected.length,
      medianWallMs:times.length%2 ? times[midpoint] : (times[midpoint-1]+times[midpoint])/2,
      perScenario:Object.fromEntries(scenarios.map(s=>[s,{passed:selected.filter(r=>r.scenario===s&&r.policyPassed).length,total:rounds}]))}];
  }));
  const sourceFiles = ['code/benchmarks/edit-safety.mjs','code/verified-edit/verified-edit.mjs'];
  const repository = new URL('../../',import.meta.url);
  const sources = await Promise.all(sourceFiles.map(async path=>({path,sha256:sha(await readFile(new URL(path,repository)))})));
  return {schema:'public.edit-safety-benchmark.v1', executedAt:new Date().toISOString(),
    runtime:process.version, platform:process.platform, arch:process.arch, rounds, scenarios:scenarios.length,
    provenance:'AI-assisted public reference and benchmark added October 26, 2026; not private product source.',
    interpretation:'Policy fixtures compare a minimal write/check baseline with this public implementation. Repeated conditions are not independent samples. Timings include filesystem and child-process overhead, not model inference. No production, competitor, or AI-quality score.',
    sources,summary,rows};
}
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const result = await runBenchmark();
  const outputIndex=process.argv.indexOf('--output');
  if(outputIndex>=0) await writeFile(process.argv[outputIndex+1],JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify(result.summary,null,2));
  if(result.summary.verified.passed!==result.summary.verified.total) process.exitCode=1;
}

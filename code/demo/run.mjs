// Public reference workflow. All fixtures and algorithms below are independent
// of the proprietary QI Core and are deliberately small enough to inspect.
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { verifiedEdit } from '../verified-edit/verified-edit.mjs';
import { buildManifest, verifyManifest } from '../evidence-verifier/verify.mjs';
import { scoreSet, identitySolver } from '../arc-harness/harness.mjs';
import { runJsonProcess, processSolver } from '../arc-harness/process-solver.mjs';

export async function runDemo() {
  const root = await mkdtemp(join(tmpdir(), 'portfolio-demo-'));
  try {
    const file = join(root, 'median.mjs');
    const original = 'export const median = xs => [...xs].sort((a,b)=>a-b)[Math.floor(xs.length/2)];\n';
    await writeFile(file, original);
    const checkSource = `
      import assert from 'node:assert/strict';
      const {median} = await import(process.argv[1]);
      for (const [input,expected] of [[[9,1,5],5],[[2,8],5],[[8,2,9,1],5],[[7],7]]) {
        const before=[...input];assert.equal(median(input),expected);assert.deepEqual(input,before);
      }
      console.log(JSON.stringify({passed:4}));
    `;
    const check = async staged => {
      try {
        const result = await runJsonProcess({ command: process.execPath,
          args: ['--input-type=module', '-e', checkSource, pathToFileURL(staged).href], input: {} });
        assert.equal(result.passed, 4);
        return { command: 'node:four-independent-median-checks', exitCode: 0 };
      } catch {
        return { command: 'node:four-independent-median-checks', exitCode: 1 };
      }
    };
    const declined = await verifiedEdit({ file, produceCandidate: () => 'export const median = () => 0;\n', runCheck: check });
    assert.equal(declined.outcome, 'check-rejected');
    assert.equal(await readFile(file, 'utf8'), original);
    const accepted = await verifiedEdit({ file, produceCandidate: () => `export function median(xs) {
  const sorted=[...xs].sort((a,b)=>a-b), middle=Math.floor(sorted.length/2);
  return sorted.length%2 ? sorted[middle] : (sorted[middle-1]+sorted[middle])/2;
}\n`, runCheck: check });
    assert.equal(accepted.outcome, 'completed');
    const firstManifest = await buildManifest(root, ['median.mjs']);
    assert.deepEqual((await verifyManifest(root, firstManifest)).map(r => r.status), ['ok']);
    const ctl = new AbortController();
    const cancelled = await verifiedEdit({ file, signal: ctl.signal, produceCandidate: () => original, runCheck: async () => { ctl.abort(); return { command: 'cancel-control', exitCode: 0 }; } });
    assert.equal(cancelled.outcome, 'cancelled');
    assert.deepEqual((await verifyManifest(root, firstManifest)).map(r => r.status), ['ok']);

    // This toy adapter selects one of two ordinary public grid rules from a
    // training example. It demonstrates the evaluator protocol, not QI Core.
    const adapter = join(root, 'fixture-adapter.mjs');
    await writeFile(adapter, `let data='';process.stdin.on('data',b=>data+=b);process.stdin.on('end',()=>{
 const {train,input}=JSON.parse(data), example=train[0];
 const reverse=grid=>grid.map(row=>[...row].reverse());
 const identity=JSON.stringify(example.input)===JSON.stringify(example.output);
 console.log(JSON.stringify(identity?input:reverse(input)));
});\n`);
    const tasks = {
      copy: { train: [{ input: [[1,2]], output: [[1,2]] }], test: [{ input: [[3,4]], output: [[3,4]] }] },
      mirror: { train: [{ input: [[1,2]], output: [[2,1]] }], test: [{ input: [[3,4]], output: [[4,3]] }] },
      mirrorRows: { train: [{ input: [[1,2],[3,4]], output: [[2,1],[4,3]] }], test: [{ input: [[5,6],[7,8]], output: [[6,5],[8,7]] }] },
    };
    const baseline = await scoreSet(tasks, identitySolver);
    const reference = await scoreSet(tasks, processSolver({ command: process.execPath, args: [adapter] }));
    assert.equal(baseline.passed, 1);
    assert.equal(reference.passed, 3);

    const report = {
      schema: 'portfolio.reference-demo.v1',
      scope: 'Public reference workflow and synthetic fixtures; independent of the proprietary core.',
      safeguards: { unacceptedCandidatePreservedOriginal: true, cancellationPreservedAcceptedBytes: true },
      realCandidateChecks: 4, acceptedEditVerified: true, evidenceIntegrityVerified: true,
      evaluation: { fixtureTasks: 3, identityBaseline: baseline.passed, referenceAdapter: reference.passed, attemptsPerInput: 1, freshProcessPerInput: true },
      deterministicResults: true,
    };
    return report;
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(await runDemo(), null, 2));
}

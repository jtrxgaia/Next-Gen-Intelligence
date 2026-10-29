// Recompute public claims from retained receipts. This does not execute the
// private engine or authenticate the observations recorded in those receipts.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const count = n => Number.isSafeInteger(n) && n >= 0;
const sha = value => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
function score(value) {
  assert.ok(value && count(value.passed) && count(value.total) && value.total > 0 && value.passed <= value.total, 'Invalid score or empty denominator');
}
export function auditArc(r) {
  assert.equal(r.schema, 'next-gen-intelligence.codex.arc2.v1');
  assert.equal(r.split, 'public training');
  assert.equal(r.test_labels_provided_to_solver, false);
  assert.equal(r.attempts_per_test_input, 1);
  assert.ok(Array.isArray(r.results) && r.results.length > 0);
  assert.equal(r.tasks, r.results.length);
  const ids = new Set();
  for (const row of r.results) {
    assert.ok(typeof row.task_id === 'string' && row.task_id.length > 0 && !ids.has(row.task_id), 'Duplicate/invalid task');
    ids.add(row.task_id);
    assert.ok(sha(row.task_sha256));
    assert.ok(Array.isArray(row.pairs) && row.pairs.length > 0, 'Empty task');
    for (const pair of row.pairs) {
      assert.equal(typeof pair.success, 'boolean');
      assert.equal(typeof pair.exception, 'boolean');
      assert.ok(Number.isFinite(pair.latency_ms) && pair.latency_ms >= 0);
      if (pair.exception) assert.equal(pair.success, false);
    }
    assert.equal(row.success, row.pairs.every(p => p.success));
  }
  const passed = r.results.filter(row => row.success).length;
  assert.equal(r.passed, passed);
  assert.ok(Math.abs(r.score_percent - passed / r.tasks * 100) < 1e-9);
  return { kind: 'ARC public-training receipt', passed, total: r.tasks };
}
export function auditSafety(r) {
  assert.equal(r.schema, 'public.edit-safety-benchmark.v1');
  assert.ok(count(r.rounds) && r.rounds > 0 && count(r.scenarios) && r.scenarios > 0);
  assert.ok(Array.isArray(r.rows));
  const names = ['baseline', 'verified'];
  const scenarios = Object.keys(r.summary.verified.perScenario).sort();
  assert.equal(scenarios.length, r.scenarios);
  assert.equal(r.rows.length, 2 * r.rounds * r.scenarios);
  const keys = new Set();
  for (const row of r.rows) {
    assert.ok(names.includes(row.implementation) && scenarios.includes(row.scenario));
    assert.ok(count(row.iteration) && row.iteration < r.rounds);
    const key = JSON.stringify([row.implementation, row.scenario, row.iteration]);
    assert.ok(!keys.has(key), 'Duplicate trial'); keys.add(key);
    assert.equal(typeof row.finalMatchesExpected, 'boolean');
    assert.ok(typeof row.outcome === 'string' && row.outcome.length > 0);
    assert.equal(row.policyPassed, row.finalMatchesExpected && ((row.outcome === 'completed') === (row.scenario === 'valid')));
    assert.ok(Number.isFinite(row.elapsedMs) && row.elapsedMs >= 0);
  }
  for (const name of names) {
    const rows = r.rows.filter(row => row.implementation === name);
    const summary = r.summary[name]; score(summary);
    assert.equal(summary.total, rows.length);
    assert.equal(summary.passed, rows.filter(row => row.policyPassed).length);
    assert.deepEqual(Object.keys(summary.perScenario).sort(), scenarios);
    for (const scenario of scenarios) {
      const selected = rows.filter(row => row.scenario === scenario);
      assert.equal(selected.length, r.rounds);
      assert.deepEqual(summary.perScenario[scenario], { passed: selected.filter(row => row.policyPassed).length, total: selected.length });
    }
    const times = rows.map(row => row.elapsedMs).sort((a,b) => a-b), middle = Math.floor(times.length/2);
    const median = times.length % 2 ? times[middle] : (times[middle-1]+times[middle])/2;
    assert.equal(summary.medianWallMs, median);
  }
  return { kind: 'Public editing defense trials', verified: r.summary.verified.passed, baseline: r.summary.baseline.passed, totalPerImplementation: r.rounds*r.scenarios };
}
export function auditLearning(r) {
  assert.equal(r.schema, 'portfolio.private-component-recheck.v1');
  const suites = r.component_suites;
  assert.ok(count(suites.tests) && suites.tests > 0 && count(suites.passed) && count(suites.failed));
  assert.equal(suites.tests, suites.passed + suites.failed);
  const probe = r.synthetic_probe, total = probe.cases_per_condition;
  assert.ok(count(total) && total > 0 && count(probe.demonstrations) && probe.demonstrations > 0);
  for (const key of ['untrained_exact','trained_exact','restored_exact','disabled_resolved']) {
    assert.ok(count(probe[key]) && probe[key] <= total, 'Invalid control denominator');
  }
  for (const hash of Object.values(r.artifact_identities)) assert.ok(sha(hash));
  return { kind: 'Recorded private component observations', tests: suites.tests, passed: suites.passed, casesPerCondition: total, learned: probe.trained_exact, restored: probe.restored_exact, untrained: probe.untrained_exact, disabledResolved: probe.disabled_resolved };
}
export function auditTraining(r, original) {
  assert.equal(r.schema, 'portfolio.training-progression.v1');
  assert.equal(r.execution_date, '2026-10-25');
  assert.equal(r.new_execution, false);
  assert.equal(r.exposure, 'TRAINING_EXPOSED');
  assert.equal(r.independent_audit, false);
  for (const run of [r.baseline, r.revised]) {
    score(run.interpret); score(run.realize);
    assert.ok(sha(run.report_sha256) && sha(run.weights_sha256));
    assert.equal(run.total, run.interpret.total + run.realize.total);
    assert.equal(run.passed, run.interpret.passed + run.realize.passed);
  }
  assert.equal(r.baseline.total, r.revised.total);
  assert.equal(r.improvement_in_exact_training_outputs, r.revised.passed - r.baseline.passed);
  const retained = original.custom_from_scratch_training;
  assert.equal(r.revised.total, retained.training_exposed_examples);
  assert.deepEqual(r.revised.interpret, retained.scores.interpret);
  assert.deepEqual(r.revised.realize, retained.scores.realize);
  assert.equal(r.restart.outputs_compared, retained.restart.rows_compared);
  assert.equal(r.restart.same_weights, retained.restart.same_weights);
  assert.equal(r.restart.consistent_except_elapsed_time, retained.restart.consistent_except_elapsed_time);
  assert.equal(r.restart.optimizer_started, retained.restart.optimizer_started);
  assert.equal(r.restart.same_weights, true);
  assert.equal(r.restart.consistent_except_elapsed_time, true);
  assert.equal(r.restart.optimizer_started, false);
  return { kind: 'Recorded training progression', before: r.baseline.passed, after: r.revised.passed, total: r.revised.total, restartOutputs: r.restart.outputs_compared };
}
export async function auditRepository(root) {
  const load = async path => JSON.parse(await readFile(resolve(root, path), 'utf8'));
  const results = [];
  results.push(auditArc(await load('benchmarks/portfolio/receipts/2026-10-03_Codex_ARC2.json')));
  results.push(auditSafety(await load('benchmarks/results/2026-10-26-public-edit-safety.json')));
  results.push(auditLearning(await load('benchmarks/results/2026-10-26-private-component-recheck.json')));
  results.push(auditTraining(await load('benchmarks/results/2026-10-28-training-progression.json'), await load('benchmarks/results/2026-10-25-ai-training-review.json')));
  return { schema: 'public.evidence-arithmetic-audit.v1', results, scope: 'Recomputed public receipt counts and internal consistency. No private engine execution, source authenticity, independent observation, or capability certification.' };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(JSON.stringify(await auditRepository(fileURLToPath(new URL('../../', import.meta.url))), null, 2)); }
  catch (error) { console.error(`Evidence audit failed: ${error.message}`); process.exitCode = 1; }
}

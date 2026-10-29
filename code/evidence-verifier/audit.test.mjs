import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { auditArc, auditSafety, auditLearning, auditTraining, auditRepository } from './audit.mjs';
const root = new URL('../../', import.meta.url);
const load = async path => JSON.parse(await readFile(new URL(path, root), 'utf8'));
const arc = await load('benchmarks/portfolio/receipts/2026-10-03_Codex_ARC2.json');
const safety = await load('benchmarks/results/2026-10-26-public-edit-safety.json');
const learning = await load('benchmarks/results/2026-10-26-private-component-recheck.json');
const training = await load('benchmarks/results/2026-10-28-training-progression.json');
const original = await load('benchmarks/results/2026-10-25-ai-training-review.json');
test('all retained evidence audits pass without a private service', async () => {
  const { fileURLToPath } = await import('node:url');
  assert.equal((await auditRepository(fileURLToPath(root))).results.length, 4);
});
test('ARC rejects inflated successes, dropped failures and duplicated tasks', () => {
  for (const mutate of [r => r.passed++, r => r.results.pop(), r => r.results[1].task_id = r.results[0].task_id]) {
    const r = structuredClone(arc); mutate(r); assert.throws(() => auditArc(r));
  }
});
test('ARC rejects task success inconsistent with its test inputs', () => {
  const r = structuredClone(arc); r.results[0].pairs[0].success = false;
  assert.throws(() => auditArc(r));
});
test('defense results reject omitted or duplicated trials and inflated summaries', () => {
  for (const mutate of [r => r.rows.pop(), r => r.rows[1] = r.rows[0], r => r.summary.baseline.passed++]) {
    const r = structuredClone(safety); mutate(r); assert.throws(() => auditSafety(r));
  }
});
test('defense results reject success unsupported by preservation or completion', () => {
  const r = structuredClone(safety); r.rows.find(row => row.policyPassed).finalMatchesExpected = false;
  assert.throws(() => auditSafety(r));
});
test('defense results reject distorted per-condition totals or timing summary', () => {
  for (const mutate of [r => r.summary.verified.perScenario.valid.total++, r => r.summary.verified.medianWallMs++]) {
    const r = structuredClone(safety); mutate(r); assert.throws(() => auditSafety(r));
  }
});
test('private aggregate records reject invalid denominators and suite accounting', () => {
  for (const mutate of [r => r.synthetic_probe.trained_exact++, r => r.component_suites.tests++, r => r.synthetic_probe.cases_per_condition=0]) {
    const r = structuredClone(learning); mutate(r); assert.throws(() => auditLearning(r));
  }
});
test('training progression cannot inflate the earlier receipt or claim a new run', () => {
  for (const mutate of [r => r.revised.passed++, r => r.new_execution=true, r => r.restart.outputs_compared++, r => r.exposure='HELD_OUT']) {
    const r = structuredClone(training); mutate(r); assert.throws(() => auditTraining(r, original));
  }
});

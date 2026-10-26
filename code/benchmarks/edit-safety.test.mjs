import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runBenchmark } from './edit-safety.mjs';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

test('safety comparison retains every condition and detects unsafe baseline behavior', async () => {
  const result = await runBenchmark({rounds:1});
  assert.equal(result.rows.length,18);
  assert.deepEqual([result.summary.verified.passed,result.summary.verified.total],[9,9]);
  assert.deepEqual([result.summary.baseline.passed,result.summary.baseline.total],[3,9]);
  assert.equal(result.summary.baseline.perScenario['invalid-syntax'].passed,0);
  assert.equal(result.summary.baseline.perScenario['check-exception'].passed,0);
});

test('recorded comparison identifies the currently published implementation and benchmark', async () => {
  const root = new URL('../../',import.meta.url);
  const report = JSON.parse(await readFile(new URL('benchmarks/results/2026-10-26-public-edit-safety.json',root),'utf8'));
  for (const entry of report.sources) {
    const bytes = await readFile(new URL(entry.path,root));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),entry.sha256,entry.path);
  }
});

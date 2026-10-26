import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runDemo } from './run.mjs';

test('the complete public workflow reproduces checks, preservation, integrity and subprocess scoring', async () => {
  const report = await runDemo();
  assert.equal(report.acceptedEditVerified, true);
  assert.equal(report.evidenceIntegrityVerified, true);
  assert.equal(report.safeguards.unacceptedCandidatePreservedOriginal, true);
  assert.equal(report.safeguards.cancellationPreservedAcceptedBytes, true);
  assert.equal(report.evaluation.referenceAdapter, report.evaluation.fixtureTasks);
});

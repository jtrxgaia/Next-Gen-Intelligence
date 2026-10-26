# What the evidence proves

[Portfolio](../../../README.md) · [Run the public checks](../../../code/README.md) · [Results](../../README.md)

## Three kinds of evidence

| Kind | Available evidence | Limit |
|---|---|---|
| **Public and runnable** | Verification/scoring source, tests, working demo, safety comparison, and CI | Qualifies these public examples, not the full private products |
| **Private and observed** | Selected source inspection, 47 passing component tests, and a controlled synthetic-learning probe | AI-authored records; outsiders need confidential access to verify them |
| **Historical** | Training artifacts, ARC receipts, application checks, delivery notes, and screenshots | Applies to the recorded version, date, and workload |

## Claims and backing

| Claim | Evidence | Supported conclusion |
|---|---|---|
| The core has learning, symbolic processing, saved state, and application connections | [Source inspection](core-evidence.md) | Selected private implementations and connections were inspected |
| A component learns and retains a supported mapping | [Snapshot recheck](../../results/2026-10-26-private-component-recheck.json): 47/47 tests; learned 200/200; restored 200/200; untrained 0/200; disabled 0/200 resolved | Bounded learning and saved-state behavior within one synthetic family |
| A model was trained from random starting weights | [Training record](../../results/2026-10-25-ai-training-review.json): 34 training-exposed examples and eight restart outputs | Recorded training fit and continuity, not unseen-task generalization |
| The public editor checks changes before accepting them | [Implementation](../../../code/verified-edit/verified-edit.mjs), tests, and [90/90 policy comparison](public-safety-benchmark.md) | Staged validation and preservation under the named conditions; outside writers can still race the advisory lock |
| Public evaluation avoids common scoring errors | [ARC scorer](../../../code/arc-harness/harness.mjs), [process adapter](../../../code/arc-harness/process-solver.mjs), and [JSON kit](../../../code/evaluation-runner/README.md) | Exact scoring, input isolation, process limits, and complete denominators on supported tasks |
| Historical ARC result was 19/50 | [Methods and receipt](../../METHODS.md#arc-agi-2-development-measurement) | A public-training development result; the public examples do not reproduce that solver |
| Work spans desktop, web, and games | [Dark Matter](../projects/dark-matter.md), [web](../projects/echoqi-web.md), [SYNAP](../projects/synap-fps.md) | Documented projects with selected checks and open acceptance work |

## Verify the private work

An outside evaluator can inspect pinned artifacts confidentially, select fresh tasks, witness a restart and failure, and ask Jack to explain and change part of the system. [Procedure](confidential-verification.md). A private adapter can use the public evaluation tools without entering this repository. No new outside attestation or customer outcome is claimed.

## Attribution

The records attribute the ecosystem’s design and ownership to Jack Rourke, with AI assistance and dependencies acknowledged. Codex prepared the public examples and documentation and ran the private snapshot recheck. Those records are not independent audits. The core remains private.

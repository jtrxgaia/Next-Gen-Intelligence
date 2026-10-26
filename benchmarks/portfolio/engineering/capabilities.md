# Engineering capability profile

[Portfolio](../../../README.md) · [Strengths and business value](strengths.md)

The project record covers custom AI components, model training, desktop and web products, developer tools, and real-time applications. The table links these areas to specific engineering records and their validation scope.

| Capability | Supporting work | Evidence boundary |
|---|---|---|
| AI architecture and model development | Custom neuro-symbolic implementations, model training, state ownership, finalization boundaries, and application integration | October 26: 47/47 selected component tests and 200/200 new-value cases, retained after state restoration. Training-fit evidence has its own scope. [Core evidence](core-evidence.md). |
| Desktop and developer tooling | Repository analysis, controlled edits, verification, snapshots, and recovery | Historical selected suites and fixtures; full installed-app acceptance is separate. |
| Web application engineering | Frontend/backend contracts, authentication boundaries, sessions, and AI adapters | Selected checks and public browsing; current signed-in workflows require validation. |
| Real-time game engineering | Combat, weapons, progression, rendering, persistence, packaging, and native migration | Browser and native editions have separate acceptance records; native parity remains in progress. |
| Debugging and reliability | Diagnostic reproduction, content integrity, checkpoints, and rollback | Results are scoped to their documented workloads and versions. |

## Supporting records

[AI training](../../results/2026-10-25-ai-training-review.json) · [Selected engineering checks](../../results/2026-10-18-selected-checks.json) · [Inspection manifest](../../results/2026-10-25-expanded-inspection.json) · [Native delivery](../../results/2026-10-24-synap-native-summary.json)

[Codex technical assessment](../reviews/self-reports/capabilities.md)

## Direct reviewer path

Use the [architecture evidence guide](reviewer-guide.md) to move from a claim to its receipt, runnable public demonstration or confidential verification procedure. The fresh private snapshot recheck and public recovery benchmark support different conclusions; their scope is explicit in that guide.

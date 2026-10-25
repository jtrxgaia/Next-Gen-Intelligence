# Benchmarks, methods, and dated corrections
**Reviewed October 25, 2026. Historical measurements retain their original dates.**

[Portfolio](../README.md) · [Original gallery](../LEGACY_SHOWCASE.md) · [Evidence index](../engineering/evidence-index.md)

The existing gallery and images are preserved. This page is the current interpretation of the inspected evidence. A historical number is not silently promoted to a current product guarantee.

[Codex self-report](../reviews/self-reports/scope-and-sources.md)
## ARC-AGI-2 development measurement

| Field | Recorded value |
|---|---|
| Execution date | October 3, 2026 |
| Dataset | ARC-AGI-2 **public training**, revision `f3283f727488ad98fe575ea6a5ac981e4a188e49` |
| Selection | First 50 JSON filenames in lexical order |
| Task result | **19/50 passed; 38.0%** |
| Solver time per test input | Median **13.388 ms**; p95 **102.2288 ms** |
| Evaluation-loop wall time | **1557.8674 ms** |
| Scoring | One attempt; fresh solver per input; exact full-grid equality; all test inputs must pass for a task to pass |
| Exclusions | Startup/import time; no energy or dollar-cost measurement |
| Isolation and exposure | Test labels withheld; prior exposure unknown; provider/network observations null |

Source: [original report](../reports/2026-10-03_Codex_Independent_Benchmark_v1.md), [complete sanitized receipt](../receipts/2026-10-03_Codex_ARC2.json).

The result is a public-training development measurement. It is not an official evaluation score, held-out generalization result, or matched frontier-model comparison. No external model was intentionally invoked by the evaluator, but OS-level network/provider instrumentation was absent. The proprietary evaluator and engine are not publicly reproducible from this receipt alone.

[Codex self-report](../reviews/self-reports/scope-and-sources.md)
## ARC-AGI-3 tooling

The [receipt](../receipts/2026-10-03_Codex_ARC3_Smoke.json) records **four guard self-tests and seven scoring fixtures**, **zero environments**, and **zero games**. No gameplay score exists. A denied loopback bind probe means this is not proof of zero attempted I/O or an air-gapped engine.

[Codex self-report](../reviews/self-reports/scope-and-sources.md)
## Corrections to the historical showcase

| Original headline | Evidence-based reading as of this review |
|---|---|
| ARC “38% evaluation” and “250× faster” | The 38% result is the public-training subset above. No matched competitor runs support the multiplier. Timing is per test input, not necessarily per task. |
| 0.0084 ms latency and equivalent-token throughput | An internal timing claim in a [historical economic report](../reports/QI_1_BILLION_TOKEN_BENCHMARK_REPORT.md). Kernel, IPC, application, and first-token latency are different measurements. The underlying full timing campaign was not recovered and independently verified for this preview. |
| $0.02 per billion tokens | An electricity model and word-to-equivalent-token conversion. It does not demonstrate equal-quality generation of a billion tokens. See the assumptions below. |
| 38-second code refactor with “SWE-bench criteria” | The corresponding official dataset, evaluated instances, harness, and results are not available here. A local authored refactor workload cannot be called an official SWE-bench result. |
| 99.4% security interception and negligible overhead | Not adopted as a verified headline. Corpus, false positives, attack distribution, and matched timing conditions are missing from this public evidence. |
| 4.8-second complete Creator workflow and competitor multipliers | The [historical report](../reports/QI_AUTONOMOUS_CREATOR_BENCHMARK_REPORT.md) is preserved. The October 3 screenshot shows a renderer preview, not the completed workflow. No matched end-to-end competitor campaign was verified. |
| “100% air-gapped” / absolute privacy | Local execution, no external API calls, no model inference, and air-gapped deployment are distinct claims. They require separate observations. |

Historical comparison graphics remain artifacts in the archive; they are not current authoritative charts. The tables here replace their role in the current portfolio. Their competitor pricing, bar heights, typography, and labels should not be used to infer present product performance.

[Codex self-report](../reviews/self-reports/scope-and-sources.md)
## Economic assumptions, explicitly modeled

The old report assumes 250 words per turn, 1.33 equivalent tokens per word, 2.8 ms per turn, 45 W, and $0.16/kWh. Those assumptions imply approximately 3,007,519 turns, 2.339 hours, 0.1053 kWh, and $0.0168 in electricity. At 100 W, the modeled electricity is approximately $0.0374.

These are arithmetic estimates using the report’s assumptions, not a metered billion-token run. They exclude hardware, development, idle consumption, hosting, maintenance, and a demonstrated equal-quality output comparison. The utility rate is an assumed historical input, not a current price lookup. [Calculation record](results/2026-10-25-economic-model.json).

[Codex self-report](../reviews/self-reports/scope-and-sources.md)
## Other bounded engineering evidence

| Area | Result | Scope and source |
|---|---|---|
| Dark Matter candidate checks | 29 passed, one skipped, zero failed | Historical October 18 selected suites; [sanitized summary](results/2026-10-18-selected-checks.json). |
| Website candidate checks | 20 passed, zero failed | Same review; public adapter, match-core, simulated order/save fixtures. No live payment or hosted load test. |
| Snapshot capture | 1,000 → 500 reads in largest historical fixture; hashes preserved | Eight reported scenarios, nonempty captures; fewer reads rather than universal wall-time speedup. [Summary](results/2026-10-18-selected-checks.json). |
| QIOS recovery | Broken signed candidate rejected; known-good slot restored | Historical August 18 VM regression; [receipt](results/2026-08-18-qios-rollback.json). |
| SYNAP native v129 | Packaged incremental delivery; full acceptance incomplete | Single sequential combat observations; [sanitized delivery summary](results/2026-10-24-synap-native-summary.json). |

Passing portfolio link, arithmetic, and integrity checks validates this documentation’s consistency. It does not certify the private software or rerun the historical campaigns.

[Codex self-report](../reviews/self-reports/scope-and-sources.md)

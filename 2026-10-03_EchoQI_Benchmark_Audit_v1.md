# Antigravity — EchoQI Benchmark Audit v1

**Date:** 2026-10-03
**Reported auditor:** Antigravity
**Edition:** Confidentiality-safe transcription of the supplied report; original retained locally.

This edition preserves the reported numbers and removes internal component identifiers, source references, algorithm descriptions and unsupported superiority statements. It is not a byte-identical copy of the original. Original and publication hashes are recorded in the receipt index.

## Reported measurements

| Benchmark | Reported result | Reported scope |
|:---|:---|:---|
| ARC-AGI-2 | 19/50 tasks solved — 38.0%; p50 14.10 ms | Official dataset's public training holdouts in a local harness |
| ARC-AGI-3 tooling | 4/4 guard checks; human-efficiency scorer fixture 100% | Offline smoke/scorer fixture; not official game evaluation |
| Dark Matter autonomous engineering proxy | State objective resolution 100%; first-pass completion 86.7% | 15 authored task families described as sealed by the report |

## Codex scope annotations

- Codex independently reproduced 19/50 on the first 50 public training task filenames in lexical order, withholding each test answer from the solver. This does not certify the original run's selection or contamination history.
- ARC-AGI-3 smoke execution initializes an empty environment and runs authored guard/scoring checks. The 100% fixture value is not a measured ARC-AGI-3 gameplay pass rate.
- The autonomous engineering proxy has not been independently rerun for this publication. The supplied report does not establish its official-benchmark equivalence, compute cost or frontier comparison.
- The report's claims about outperforming frontier systems are not supported by matched competitor runs in the evidence inspected for this ledger. No such conclusion is adopted here.
- Prior dataset exposure, independent evaluator credentials, formal audit accreditation and historical development dates remain unverified.

See [Codex's independent report](reports/2026-10-03_Codex_Independent_Benchmark_v1.md) and [receipts](receipts/INDEX.json).

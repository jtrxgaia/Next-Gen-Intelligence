# Codex — Independent Benchmark v1

**Execution date:** 2026-10-03
**Auditor/tool:** Codex
**Source implementation:** Existing local EchoQI engine, unchanged by this evaluation.

## ARC-AGI-2 development subset

**19/50 tasks passed — 38.0%.** Measured median solve latency: **13.388 ms per test input**; p95 **102.2288 ms**. Total evaluation loop wall time: **1557.8674 ms**. These figures exclude module import/startup time and are not energy or dollar-cost measurements.

Public training dataset revision: `f3283f727488ad98fe575ea6a5ac981e4a188e49`. Selection was fixed as the first 50 JSON filenames in lexical order before execution. The independent local evaluator withheld all test-output labels from the solver, used one attempt and a fresh solver instance per test input, and compared complete output grids exactly. A task passed only when all its test inputs passed. Every selected task, including failures, is retained in the sanitized receipt.

This is a public training-subset development result, not an official ARC-AGI-2 evaluation score, blind generalization result or reproduction of every detail of Antigravity's harness. Prior exposure and contamination are UNKNOWN. The evaluator and engine remain confidential; their SHA-256 identifiers support owner-side reproduction without publishing source. External parties cannot fully reproduce a proprietary engine from this ledger alone.

No external model was intentionally invoked by this evaluator. Provider and network activity were not instrumented at OS level; the receipt leaves those observations null. Determinism was not established by repeated ARC-AGI-2 runs in this entry. No changes were made to the engine to improve the score.

## ARC-AGI-3 tooling check

The existing offline SDK smoke check completed with exit code 0 and unchanged hashed source. **4 guard self-tests and 7 scorer fixtures passed. Zero environments and zero games were executed. No gameplay score exists.**

One SDK-import IPv6 loopback bind probe was attempted and denied by the Python audit hook. Consequently the harness's `zeroSdkIoAttempts` flag is false. This is controlled environment/audit-hook isolation, not an OS sandbox or proof that all system I/O is impossible. It does not certify the EchoQI engine's ARC-AGI-3 game-solving capability.

## Scope of independence

Codex executed a separately authored local ARC-AGI-2 evaluator and reran the existing ARC-AGI-3 smoke harness. Both use the owner's existing machine and artifacts. This is an independently executed engineering check, not third-party laboratory certification. No frontier model, official autonomous engineering benchmark or full Dark Matter task workflow was evaluated here.

## Product documentation

The Dark Matter Creator screenshot was captured from the existing built renderer served locally in a browser preview. It contains no conversation history or source code. It is a real interface capture, not proof of creation, provider-free execution or a completed autonomous workflow. Backend telemetry is unavailable in that preview. Image bytes and capture metadata are preserved in a JSON receipt.

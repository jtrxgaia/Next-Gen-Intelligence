# Verified edit: public reliability reference

This implementation was prepared with Codex assistance for publication and is independent of QI Core and Dark Matter source. It checks a staged UTF-8 candidate before promotion, leaving the target untouched when a check fails, throws, returns an invalid result, or cancellation is observed before promotion.

The checker receives the **staged candidate path**, not the target path. Participating editors share an exclusive advisory lock beside the canonical target. Before promotion, both the staged candidate and original target must retain their expected bytes. Observed outside edits or deletion prevent completion. The checker must actually execute its validator and settle after it finishes.

See the [public architecture and tradeoffs](../ARCHITECTURE.md), [working demonstration](../README.md) and [reproducible policy comparison](../../benchmarks/portfolio/engineering/public-safety-benchmark.md). The comparison qualifies this public reference only.

## Concurrency and recovery boundary

An unrelated writer ignoring the advisory lock can still race the final comparison and rename. Cancellation does not forcibly interrupt an arbitrary callback. A process crash may leave staging or a stale lock for operator inspection. The helper does not provide a multi-file transaction, power-loss recovery, security sandbox, or universal filesystem metadata preservation. A single-file check requiring a fixed basename or workspace-wide context needs an isolated workspace adapter. The target must be a regular, valid UTF-8 file; symlinks are rejected.

The benchmark now exercises the staged implementation preserved from main during PR #14 integration. Failed candidates are discarded rather than promoted and rolled back. Cross-process exclusion and other failure regressions remain automated tests.

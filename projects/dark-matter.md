# Dark Matter
**AI-assisted developer tooling with controlled changes, execution evidence, and recovery.**

[Portfolio](../README.md) · [Evidence index](../engineering/evidence-index.md)

## Product and ownership

Jack designs Dark Matter’s development workflow and interface, integrates coding contributors with workspace services, and directs debugging and validation. The product connects repository understanding, change proposals, file operations, verification, and recovery in a desktop environment.

The engineering objective is precise: completed work must correspond to the intended task, current workspace, actual changed content, and required checks.

## System design

The interface coordinates the task while host-owned services control workspace reads, writes, checks, and completion evidence. Native editing and model-assisted contributions have distinct execution paths.

The inspected source and tests address scope, permissions, workspace revision, content identity, cancellation, and stale completion. Recovery preserves competing edits by checking whether the workflow still owns the content it would restore.

[Implementation walkthrough](../engineering/verified-edit-walkthrough.md).

## Measured engineering results

The October 18 record reports **29 passes, one skip, and zero failures** across four selected reliability suites covering required checks, snapshot consistency, verification scope, and checkpoint boundaries.

Historical nonempty snapshot fixtures reduced file reads from two per file to one. The largest fixture changed from **1,000 to 500 reads**, with identical baseline hashes across eight scenarios. This establishes a file-read reduction within the measured workload.

[Check and fixture evidence](../benchmarks/results/2026-10-18-selected-checks.json).

## Technology and interface

The inspected stack includes Electron, React, Vite, Node.js, local workspace services, and Ollama adapters. Configured coding tiers include Qwen-based generation and a DeepSeek-based reviewer; configured model identity is separate from current service health.

![Dark Matter Creator interface](../media/portfolio/dark-matter-creator.jpg)

*Creator renderer preview, October 3, 2026. Completed workflow evidence is documented separately.*

## Status and capabilities

**Status:** active development with selected source/test inspection and historical candidate checks. Full installed-app journeys and current service readiness require separate acceptance. The benchmark corrections retain the scope of older refactor claims.

**Engineering capabilities:** developer experience, repository analysis, async workflows, concurrency, model integration, execution verification, and recovery.

[Attributed Codex technical review](../reviews/self-reports/dark-matter.md)

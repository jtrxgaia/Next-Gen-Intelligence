# Dark Matter
**AI-assisted developer tooling with controlled changes, execution evidence, and recovery.**

[Portfolio](../README.md) · [Evidence index](../engineering/evidence-index.md)

## Product and ownership

Dark Matter is a desktop development environment created by Jack Rourke. It connects repository analysis, coding contributors, change proposals, file operations, verification, and recovery. Development includes interface design, workspace-service integration, debugging, and validation.

The engineering objective is precise: completed work must correspond to the intended task, current workspace, actual changed content, and required checks.

## System design

The interface organizes the task, while local services read and write files, run checks, and record the result. Direct editing and AI-generated changes use separate paths.

The source and tests cover permissions, changed files, cancellation, and results that are no longer current. Before restoring a file, recovery checks whether another edit has been made since the saved version.

[Implementation walkthrough](../engineering/verified-edit-walkthrough.md).

## Measured engineering results

The October 18 record reports **29 passes, one skip, and zero failures** across four selected reliability suites covering required checks, snapshot consistency, verification scope, and checkpoint boundaries.

Historical nonempty snapshot fixtures reduced file reads from two per file to one. The largest fixture changed from **1,000 to 500 reads**, with identical baseline hashes across eight scenarios. This establishes a file-read reduction within the measured workload.

[Check and fixture evidence](../benchmarks/results/2026-10-18-selected-checks.json).

## Technology and interface

The inspected stack includes Electron, React, Vite, Node.js, local workspace services, and Ollama adapters. Configured coding tiers include Qwen-based generation and a DeepSeek-based reviewer; configured model identity is separate from current service health.

![Dark Matter desktop platform after asking Who is Echo](../media/portfolio/dark-matter-current.jpg)

*Captured from the running desktop platform on October 25, 2026, after asking “Who is Echo?” The generated reply is reproduced as displayed. This capture shows the interface and returned response; it does not independently verify the capabilities described in the reply.*

## Status and capabilities

**Status:** active development. Selected source, tests, and historical results were reviewed. The complete installed application and its current services still need separate testing. Older refactor claims are explained in the benchmark corrections.

**Engineering capabilities:** developer experience, repository analysis, async workflows, concurrency, model integration, execution verification, and recovery.

[Attributed Codex technical review](../reviews/self-reports/dark-matter.md)

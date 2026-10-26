# Dark Matter
**An AI-assisted coding and creation platform.**

[Portfolio](../README.md) · [Evidence index](../engineering/evidence-index.md)

## Product and ownership

Dark Matter is an AI-assisted coding and creation platform for developing software and building projects, similar in purpose to Antigravity, Codex, and Claude Code. Created by Jack Rourke, it brings coding, project development, and creative workflows into a desktop platform.

## System design

The interface organizes the task, while local services read and write files, run checks, and record the result. Direct editing and AI-generated changes use separate paths.

The source and tests cover permissions, changed files, cancellation, and results that are no longer current. Before restoring a file, recovery checks whether another edit has been made since the saved version.

[Implementation walkthrough](../engineering/verified-edit-walkthrough.md).

## Technology and interface

The inspected stack includes Electron, React, Vite, Node.js, local workspace services, and Ollama adapters. Configured coding tiers include Qwen-based generation and a DeepSeek-based reviewer; configured model identity is separate from current service health.

![Dark Matter desktop platform after asking Who is Echo](../media/portfolio/dark-matter-current.jpg)

*Captured from the running desktop platform on October 25, 2026, after asking “Who is Echo?” The generated reply is reproduced as displayed. This capture shows the interface and returned response; it does not independently verify the capabilities described in the reply.*

## Status and capabilities

**Status:** active development. Selected source, tests, and historical results were reviewed. The complete installed application and its current services still need separate testing. Older refactor claims are explained in the benchmark corrections.

**Engineering capabilities:** developer experience, repository analysis, async workflows, concurrency, model integration, execution verification, and recovery.

[Attributed Codex technical review](../reviews/self-reports/dark-matter.md)

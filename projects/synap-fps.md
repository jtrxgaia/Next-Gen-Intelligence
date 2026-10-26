# SYNAP FPS / Dev Snap FPS
**Real-time game systems, visual product development, and a separate native-engine migration.**

[Portfolio](../README.md) · [Evidence index](../engineering/evidence-index.md)

## Project and ownership

SYNAP is a game project created by Jack Rourke. Its development covers gameplay, progression, enemy encounters, customization, interfaces, effects, asset integration, and performance investigation, using AI-assisted development.

The browser edition remains a distinct product while a separate Unreal project develops a native implementation. Engine and third-party asset contributions are attributed dependencies.

## Browser engineering

The reviewed local manifest identifies **0.10.222-dev.1**, using TypeScript, Babylon.js 9.28.0, Rapier 0.21.0, Vite, and Node-based checks.

The source and test inventory covers combat, recoil, input, enemy tactics, progression, persistence, render batching, effects, and browser boundaries. Simulation, presentation, input, progression, and release artifacts retain separate responsibilities.

## Visual presentation

![SYNAP in-game capture](../media/portfolio/synap-gameplay-owner.png)

*Supplied in-game capture showing the Aurelia arena, weapon view, effects, and HUD. The overlay is a momentary performance reading.*

![SYNAP title and menu](../media/portfolio/synap-menu-owner.png)

*Supplied title/menu capture showing the game’s visual identity, character presentation, and navigation. Exact engine/revision is not established from these images.*

## Performance investigation

An October 13 investigation reproduced a telemetry defect that reported a mesh count as milliseconds. The isolated replay established false spike classification and a reporting-frequency issue, allowing those diagnostic problems to be separated from the broader gameplay regression.

The development record also examines rendering workload, enemy presentation, visibility, pooling, and reflections. The engineering contribution is the effort to isolate causes while preserving the intended visual experience.

[Investigation record](../engineering/problems-and-progress.md#synap-diagnostic-units).

## Native migration and delivery

The separate native project uses **Unreal Engine 5.8 and C++**. The October 24 `native-v129-qi-workload` record reports successful packaging and packaged combat playtests, with retained rollback material.

Full migration, normal-input QA, visual acceptance, and performance acceptance remained incomplete for that delivery. Its notes retain 21 historical suite failures, and the full suite was not rerun. Sequential combat observations do not establish a repeatable performance gain.

[Native delivery evidence](../benchmarks/results/2026-10-24-synap-native-summary.json).

## Engineering capabilities

The project integrates real-time gameplay, rendering, persistent progression, interfaces, asset workflows, performance diagnostics, packaging, and migration between engines.

Current development priorities include fixing regressions, repeated matched workloads, normal-input QA, visual acceptance, and versioned migration reconciliation while preserving the browser edition.

[Attributed Codex technical review](../reviews/self-reports/synap.md)

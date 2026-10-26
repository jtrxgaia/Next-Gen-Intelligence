# SYNAP FPS / Dev Snap FPS

[Portfolio](../../../README.md) · [Evidence index](../engineering/evidence-index.md#synap)

Jack Rourke’s science-fiction shooter uses AI-assisted development and established engines/assets. Work covers combat, enemies, equipment, progression, rendering, interfaces, and saved games. Browser and native editions have separate acceptance records.

## Browser engineering

The inspected local manifest identifies **0.10.222-dev.1**, TypeScript, Babylon.js 9.28.0, Rapier 0.21.0, Vite, and Node-based checks. Source/test inventory covers combat, recoil, input, enemy tactics, progression, persistence, render batching, and effects.

## Visual presentation

![SYNAP in-game capture](../media/portfolio/synap-gameplay-owner.png)

*Owner-supplied gameplay capture. Its FPS overlay is a momentary reading.*

![SYNAP title and menu](../media/portfolio/synap-menu-owner.png)

*Owner-supplied menu capture. The images do not establish exact engine/revision.*

## Performance investigation

An October 13 replay reproduced a diagnostic that treated a mesh count as milliseconds, plus a reporting-frequency problem. This explained misleading telemetry; it did not establish the cause of the broader frame-time regression or a repeatable performance gain.

[Investigation](../engineering/problems-and-progress.md#synap-diagnostic-units)

## Native migration and status

The separate project uses **Unreal Engine 5.8 and C++**. The October 24 `native-v129-qi-workload` record reports successful packaging and packaged combat playtests with rollback material.

Feature parity, normal-input QA, visual acceptance, and performance acceptance remained incomplete. Notes retained 21 historical suite failures; the full suite was not rerun. Sequential combat observations do not establish a repeatable speedup.

[Delivery receipt](../../results/2026-10-24-synap-native-summary.json) · [Attributed review](../reviews/self-reports/synap.md)

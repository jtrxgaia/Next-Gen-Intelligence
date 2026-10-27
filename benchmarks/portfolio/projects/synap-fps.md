# SYNAP FPS / Dev Snap FPS

[Portfolio](../../../README.md) · [Evidence index](../engineering/evidence-index.md#synap)

Jack Rourke’s science-fiction shooter: combat, enemies, equipment, progression, rendering, interfaces, and saved games. Built with AI assistance and established engines/assets; browser and native editions have separate acceptance records.

## Browser engineering

**Inspected browser build:** 0.10.222-dev.1, TypeScript, Babylon.js 9.28.0, Rapier 0.21.0, Vite, and Node checks. Source/test inventory covers combat, recoil, input, enemy tactics, progression, persistence, render batching, and effects.

## Visual presentation

https://github.com/user-attachments/assets/1f033242-aed3-45e0-8c7d-77f0e30bf1bf

*1:36 owner-supplied gameplay demo: arena combat, weapon changes, enemies, effects, and HUD updates. [Original 1080p video](https://github.com/jtrxgaia/Next-Gen-Intelligence/releases/download/synap-gameplay-demo-2026-10-27/SYNAP-Gameplay-Demo-Final-v2.mp4) · [Smaller web copy](../media/portfolio/SYNAP-Gameplay-Demo-Web.mp4).*

![SYNAP title and menu](../media/portfolio/synap-menu-owner.png)

*Owner-supplied menu capture. The footage and image do not establish the exact engine/revision or controlled performance. Earlier gameplay screenshots remain in the media archive.*

## Performance investigation

An October 13 replay reproduced a mesh-count/milliseconds mix-up and a reporting-frequency problem. The broader frame-time regression and repeatable performance gains remain unestablished.

[Investigation](../engineering/problems-and-progress.md#synap-diagnostic-units)

## Native migration and status

**Native stack:** Unreal Engine 5.8 and C++. The October 24 `native-v129-qi-workload` record reports successful packaging, packaged combat playtests, and rollback material.

Feature parity, normal-input QA, visual acceptance, and performance acceptance remain incomplete. The record retains 21 historical suite failures; the full suite was not rerun. Sequential combat observations establish no repeatable speedup.

[Delivery receipt](../../results/2026-10-24-synap-native-summary.json) · [Attributed review](../reviews/self-reports/synap.md)

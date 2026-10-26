# Supporting systems and research
**Host integration, boot recovery, technical services, and adjacent product research.**

[Portfolio](../README.md) · [Evidence index](../engineering/evidence-index.md)

## Authenticated host coordination

Host-integration development addresses enrollment, capability authorization, request identity, signed proofs, replay rejection, and verified execution across GAIA, EVE, and Mac.

The reviewed source/tests establish implemented components and targeted checks. The inspected physical-demo acceptance record remains incomplete. This distinction preserves a precise account of what the integration has demonstrated.

## QIOS boot, updates, and recovery

QIOS integrates an existing Linux foundation with a boot-aware shell, voice services, persistent data, signed updates, and A/B recovery. Development includes product behavior, integration, release boundaries, and acceptance requirements.

Historical VM evidence records UEFI/OVMF boot, inactive-slot update staging, and rejection of an unhealthy signed candidate followed by restoration of the known-good version. Physical-device qualification remains distinct from these VM results.

[Recovery receipt](../benchmarks/results/2026-08-18-qios-rollback.json).

## IBM Quantum and Qiskit

The preserved integration record describes Python/Qiskit backend discovery, circuit preparation, transpilation, job submission, and measurement-count handling, with simulation and classical fallbacks identified separately.

This is an external-service integration and experiment-tracking capability. The portfolio review did not submit a hardware job or measure quantum advantage. [Public integration record](../docs/IBM_QUANTUM_RESEARCH.md).

## Additional games

The Stellex/Stellux lineage adds a browser vertical-shooter project using TypeScript, Vite, and Vitest. Its local manifest, launcher, and public discovery entry establish a separate interactive-development strand. Historical naming and release lineage remain to be reconciled.

## Wearable research

QI Glasses is an ecosystem-interface concept presented as coming soon. The reviewed evidence establishes research/product intent; a physical prototype was not verified.

[Attributed Codex technical review](../reviews/self-reports/ecosystem.md)

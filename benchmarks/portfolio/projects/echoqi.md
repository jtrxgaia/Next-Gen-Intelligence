# EchoQI / QI Core
**Proprietary AI architecture, custom learning systems, and persistent application intelligence.**

[Portfolio](../../../README.md) · [Evidence index](../engineering/evidence-index.md)

## Project and ownership

EchoQI is a proprietary AI system created by Jack Rourke. It connects original AI components with persistent state, controlled execution, and desktop/web interfaces. Development covers requirements, system design, AI-assisted implementation, integration, and testing.

The result is an interconnected AI software platform whose core and application layers develop together. Established frameworks and optional upstream models remain attributed dependencies.

## Architecture and tradeoff

As the system grows, each part needs a clear job. Reasoning, conversation, memory, external models, and actions must work together without conflicting over decisions or stored information.

The architecture defines those jobs and connects reasoning and learned behavior to the applications. Older versions are kept for reference while supported operations move toward clearly assigned components. Experimental code does not automatically gain control of the system.

Public documentation describes these responsibilities and results; the proprietary procedures behind the core remain confidential.

## HiveMind

HiveMind describes the QI Core coordinating multiple compatible LLMs at the same time on a shared task. The creator identifies Gemini, GPT, Claude, Kimi, and other compatible models as contributors to this design.

The shared task may involve solving a problem, building software, or developing a system. The neuro-symbolic core coordinates the work and brings contributions into the same workflow. Concurrent work on the same objective is central to the concept.

The scale of parallel work depends on available compute, provider access, and the task. Measurements remain attached to specific workloads and configurations so reviewers can assess the contribution of coordination.

**Definition source:** creator clarification, October 25, 2026. This section records the intended architecture. The clarification did not include a new concurrent execution test or a comparison against individual models; the earlier source and training review retains its original scope.

## Neural learning and model development

The reviewed projects contain custom trainable software, native learning from demonstrations, model-training source, and records of saved trained models. An October 25 experiment explicitly records model initialization from scratch without pretrained weights, followed by application-level fitting and restart checks.

A separate upstream-model adaptation path retains a training manifest and model adapter. These represent distinct capabilities: creating custom AI components, training their parameters, and integrating adapted models where appropriate.

[AI creation and training case study](ai-creation-and-training.md).

## Persistence and integration

EchoQI’s application engineering includes state ownership, continuity between interactions, corrections, guarded changes, and restart behavior. Interfaces and service contracts connect these functions to user-facing software.

This work addresses the practical requirements of stateful AI: retain useful context, preserve controlled changes, identify what actually executed, and support recovery when an operation fails.

## Evidence and current scope

**Current status: maintenance, October 26, 2026.** Dated component evidence remains available while the core is maintained.

A fresh review inspected custom learning and symbolic-processing source, state ownership, finalization, and application integration. Three selected private suites executed from an isolated copy passed **47/47 tests**. A new synthetic probe passed **200/200 exact new-value cases** after three demonstrations, and **200/200 after state restoration**, with learning activation controls verified. These results concern a supported component family.

[Architecture and implementation evidence](../engineering/core-evidence.md) · [Fresh receipt](../../results/2026-10-26-private-core-evidence.json) · [Confidential verification](../engineering/confidential-verification.md).

The public historical ARC record reports **19/50 public-training tasks passed**, with exact-grid scoring and a fresh solver per input. This is a development-subset result. [Report](../reports/2026-10-03_Codex_Independent_Benchmark_v1.md).

The training record documents a check using **34 training examples** and an **eight-output restart comparison** using the same weights. Independent generalization and testing of the complete production workflow remain separate evaluation stages. [Training evidence](../../results/2026-10-25-ai-training-review.json).

**Engineering capabilities:** proprietary AI architecture, custom learning software, model training, persistent state, component integration, evaluation, and recoverability.

[Attributed Codex technical review](../reviews/self-reports/echoqi-core.md)

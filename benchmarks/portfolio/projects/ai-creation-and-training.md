# AI creation and neural-network training
**Custom AI built from code, trained model components, and evidence-backed experimentation.**

[Portfolio](../../../README.md) · [Evidence index](../engineering/evidence-index.md)

## Original AI development

AI development covers trainable components and the software governing their use. The inspected source includes custom trainable implementations, native processing, persistent learning state, and interfaces connecting those capabilities to applications.

The development lifecycle covers requirements, architecture, implementation, training, integration, and validation. AI coding assistance, frameworks, and upstream models are identified as separate contributions.

## Training a custom model from scratch

An October 25 experiment started with **randomly initialized weights rather than a pretrained model**. Its records identify the training job, saved files, dataset, tokenizer, application checks, and restart results.

The defined fitting target covered **34 training-exposed examples** across two task types. The record reports that the target was met for both groups. An **eight-output restart comparison** retained the same weights and consistent outputs apart from elapsed time, without restarting optimization.

These measurements establish the training-fit and artifact-continuity targets. They are recorded separately from independent generalization. [Sanitized evidence](../../results/2026-10-25-ai-training-review.json).

## Custom learning and persistence

The inspected implementations contain parameter initialization and update paths, supported by learning and persistence tests. Native demonstration-learning work also records carrying a taught operation across turns and applying it to different inputs under defined constraints.

This brings together learning behavior, controlled state, ambiguity handling, regression checks, and runtime integration. Neural training, symbolic skill learning, and knowledge retrieval retain distinct roles in the architecture.

## Fresh component learning and persistence verification

On October 26, selected private source and required fixture dependencies were copied into an isolated review directory. **47/47 existing tests passed** across three suites covering learning, supported composition, state handling, and persistence. Source hashes were checked before and after execution.

A reviewer-authored synthetic probe then taught three demonstrations and checked **200 new-value cases** in one supported family. All 200 produced exact results; restoration of learned state retained all 200 results. Activation controls verified the dependence on the taught, enabled component. The separate-process persistence behavior is covered by the selected existing suites.

These observations establish bounded component transfer and continuity. They are distinct from the neural-model fitting experiment above. Codex inspected the source, authored the probe, and prepared this portfolio; the receipt identifies that relationship.

[Fresh evidence receipt](../../results/2026-10-26-private-core-evidence.json) · [Core implementation evidence](../engineering/core-evidence.md).

## Adapting upstream models

A separate Qwen-based development path retains training source, a dated manifest, and a saved adapter artifact. The record documents a model-adaptation workflow with an identified upstream base.

Custom initialization and upstream-model adaptation are separate development paths, with different dependencies and evaluation requirements.

## Experiment lifecycle and status

The records preserve experiment identities, training provenance, trained-artifact references, fitting results, and restart checks. Failed baselines and incomplete acceptance remain part of the engineering record.

**Status:** learning and training software and completed limited experiments. Broader generalization and product qualification require task-specific evaluation.

**Engineering capabilities:** custom AI development, neural-model experimentation, training pipelines, artifact handling, evaluation, and application integration. Proprietary source, data, and training recipes remain private.

[Attributed Codex technical review](../reviews/self-reports/ai-creation.md)

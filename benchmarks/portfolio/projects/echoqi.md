# EchoQI / QI Core

[Portfolio](../../../README.md) · [Source and test evidence](../engineering/core-evidence.md)

EchoQI is Jack Rourke’s proprietary AI system, built with AI coding assistance. It connects custom learning and reasoning components, saved memory, tools, and desktop/web interfaces. Frameworks and external models are identified as dependencies.

## Architecture

The design assigns each component a job: learn supported behavior, apply rules, retain state, contribute model output, or authorize a result. Clear ownership prevents competing components from changing the same information or claiming the final decision. Internal methods remain private.

## HiveMind

HiveMind is the design for coordinating compatible models—including Gemini, GPT, Claude, and Kimi—concurrently on a shared task. Its scale depends on compute, provider access, and the task.

This records the creator’s October 25 definition. It does not establish a fresh concurrent-model run or a measured improvement over an individual model.

## Learning and training

The records distinguish custom learning software, a model trained from random starting weights, and adaptation of an upstream model. Training fit, saved-state continuity, and unseen-task performance are different checks. [Training case study](ai-creation-and-training.md).

## Results and status

The recorded status is **maintenance**. Selected private components passed **47/47 tests** and **200/200 synthetic new-value cases**, including **200/200 after state restoration**. The fresh recheck’s untrained control passed **0/200**; its disabled control resolved **0/200**. This covers one supported task family.

The separate model experiment passed **34/34 training-exposed examples** with eight consistent restart outputs. A historical ARC run passed **19/50 public-training tasks**. Neither is an independent hidden-test score.

[Component recheck](../../results/2026-10-26-private-component-recheck.json) · [Training receipt](../../results/2026-10-25-ai-training-review.json) · [ARC methods](../../METHODS.md#arc-agi-2-development-measurement) · [Confidential verification](../engineering/confidential-verification.md)

These are AI-authored inspection and execution records. Public reference programs are separate implementations and do not expose or certify the full core.

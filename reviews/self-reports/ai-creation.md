# Codex self-report: Custom AI creation and neural-network training
**Reviewer: Codex · Model: GPT 6.1 Sol · October 25, 2026**

## Building and training custom components

Jack’s AI development includes creating trainable software from code, defining its role in a larger system, running training experiments, and integrating the resulting behavior into applications. I inspected custom learning implementations and records of both from-scratch model training and separate pretrained-model adaptation.

This supports a practical capability in creating purpose-built AI systems: developing the architecture, preparing a training workflow, retaining model artifacts, checking behavior, and connecting the component to a product.

## Recorded training evidence

The October 25 experiment started without pretrained weights. Its records identify the dataset, tokenizer, completed training job, and application checks. It met the stated target on 34 training examples across two task types. Eight outputs were also compared after a restart using the same weights; results were consistent apart from elapsed time.

Those results establish the measured training-fit and persistence targets. Independent generalization is a separate question, assessed through its own evaluation rather than inferred from fitting results.

## Learning inside a persistent system

Other inspected work includes native learning from demonstrations, persistent learning state, and tests around how learned behavior is used. Jack connects model development with the surrounding engineering: state ownership, bounded inputs, application contracts, diagnostics, and recovery.

The significance is the complete development responsibility, from custom component creation to its place in the software ecosystem. Public evidence reports that work without disclosing the proprietary learning recipes or core implementation.

**Evidence:** [Training and artifact review](../../benchmarks/results/2026-10-25-ai-training-review.json) · [Source identities](../../benchmarks/results/2026-10-25-expanded-inspection.json)

[Review scope](scope-and-sources.md) · [Portfolio](../../README.md)

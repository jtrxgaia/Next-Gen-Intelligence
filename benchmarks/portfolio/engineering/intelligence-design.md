# Intelligence architecture and software defense

[Portfolio](../../../README.md) · [Evidence guide](reviewer-guide.md) · [Training progression](../../results/2026-10-28-training-progression.json)

Jack Rourke designs EchoQI as a connected intelligence system: learning components produce bounded proposals, reasoning and coordination organize work, memory carries context, and application interfaces make the system usable. His work also includes software defenses governing changes, actions, access and recovery. The repository attributes the design and development to Jack and identifies AI assistance and established dependencies.

## Building intelligence

The record contains custom learning code, an experiment using randomly initialized model weights, and a separate adaptation of an existing model. These are different kinds of work. From-scratch initialization describes the model weights and training experiment; it does not claim that Jack invented the underlying neural-network primitives or built every dependency.

The October 25 experiment shows an engineering iteration: a baseline produced 17/34 exact outputs on training-exposed examples; a revised build produced 34/34. Eight outputs were consistent after restarting with the same saved weights. The retained comparison identifies matched controls but also different source builds. It establishes a training-fit improvement, not held-out generalization. [Receipt](../../results/2026-10-28-training-progression.json) · [Original training review](../../results/2026-10-25-ai-training-review.json).

A separate October 26 private component check recorded 47 selected tests and 200 new-value cases in one supported synthetic family. Learned and restored conditions each achieved 200/200; an untrained control achieved 0/200 and a disabled control resolved 0/200. The component, its probe and artifacts remain available for confidential inspection. [Receipt](../../results/2026-10-26-private-component-recheck.json).

## Designing defenses around intelligent software

| Engineering problem | Design and evidence | Boundary |
|---|---|---|
| An application claims an action succeeded without proof | Inspected action-receipt and decision-boundary code ties completion claims to structured verification | Selected source inspection; no claim of complete security coverage |
| A generated edit destroys working changes | Public reference stages checks and preserves files under specified failures and competing edits | [Runnable 90/90 versus 30/90 fixture comparison](public-safety-benchmark.md); not a production attack rate |
| An update has a valid signature but fails to work | Health checks and rollback in a recorded failure injection restored the previous slot | [Historical VM receipt](../../results/2026-08-18-qios-rollback.json); physical-device acceptance not established |
| Stateful intelligence loses or mixes context | Inspected session and state boundaries, with selected restoration and isolation tests described in the retained engineering record | Local tests and selected source only; no claim of universal memory reliability |

These defenses address software integrity, authorization, and recovery. Their existence does not establish a comprehensive security certification.

## How the work developed

Jack reports independent development beginning around 2023. The public repository starts in October 2026, and the earlier date is owner-reported. Retained records show a progression from recovery work in August 2026 to benchmark review, learning experiments, and application engineering in October. [History and evidence](evidence-index.md).

The difficult work is coordinating learned and explicit behavior, assigning authority across components, preserving and correcting state, verifying actions, and recovering safely when software fails. Screenshots, source inspections, test results and runnable public references each demonstrate different parts of that work. An independent reviewer can examine the private implementation under agreed confidentiality and run evaluator-selected cases. [Review procedure](confidential-verification.md).

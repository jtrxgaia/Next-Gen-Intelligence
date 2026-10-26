# QI Core: architecture and implementation evidence

**Created by Jack Rourke · Evidence reviewed October 26, 2026 · Current product status: maintenance**

[Portfolio](../../../README.md) · [Core case study](../projects/echoqi.md) · [Dated evidence receipt](../../results/2026-10-26-private-core-evidence.json)

QI Core is Jack Rourke's custom-built neuro-symbolic cognitive system. Its development combines learning components, explicit symbolic processing, persistent state, and application integration. Jack defines the architecture, directs AI-assisted implementation, and verifies the resulting software. Established libraries, engines, and optional external models have their own roles.

The October 26 inspection examined private implementation source and executed selected learning and persistence components in an isolated copy. It found custom learning logic, parameter and state updates, symbolic processing, and source connections to the application controller. The implementation evidence extends beyond product descriptions and provider configuration.

The core is currently undergoing maintenance. The results below identify working components and dated observations, allowing a reader to assess the engineering independently of current service availability.

## What “built from the ground up” means here

The claim concerns the design and implementation of the core's own cognitive software: the code that learns within supported tasks, processes structured information, maintains state, and governs how contributions reach an application. These custom implementations were inspected locally. A separate retained experiment records training a custom model from randomly initialized weights.

Original core development, training custom parameters, and integrating an existing model are distinct contributions. The portfolio identifies all three. The development workflow openly attributes AI coding assistance and established dependencies. Project ownership is attributed to Jack; source inspection establishes the implementation present in the reviewed artifacts.

## Verified successful observations

| Evidence | Observation | What a reviewer can conclude |
|---|---|---|
| Fresh private component execution, October 26 | **47/47 tests passed** across three selected suites | The inspected component executes learning, supported composition, state validation, and persistence behaviors on those workloads. |
| Fresh synthetic transfer probe, October 26 | **200/200 exact cases** using new values after three demonstrations | The component applies learned behavior within the tested synthetic family to values absent from its demonstrations. |
| Restoration of that probe's learned state | **200/200 exact cases** after state restoration | The tested learned behavior is retained across restoration. The selected suites also include persistence through a separate Node process. |
| Learning activation controls | Expected control behavior verified | The successful probe depends on the enabled, taught component. |
| Retained custom-model training record, October 25 | **34/34 training-exposed examples**, plus **eight consistent restart outputs** | A custom training experiment met its fitting and continuity targets. This is a separate experiment from the October 26 symbolic-component probe. |
| Private implementation and integration inspection | Custom learning, symbolic processing, state ownership, and application source connections inspected | The project contains implemented core software and application integration, with opaque source identities retained for reinspection. |
| Packaged desktop source inspection | Core entry source present in a Dark Matter development distribution | The inspected development distribution contains the core integration; current desktop operation remains covered by the maintenance status. |

The synthetic probe measures transfer within one supported family. The training experiment measures fitting on exposed examples. Neither measurement is presented as a broad neural generalization score. These are selected successful observations, with their complete workload denominators stated.

## Architecture responsibilities

This is a public description of responsibilities, rather than an internal execution sequence or algorithm.

| Responsibility | Engineering decision supported by the inspected source | Why it matters |
|---|---|---|
| Cognitive ownership | Keep finalization authority explicit while components contribute bounded results. | Gives the application a clear place to decide which result may be committed. |
| Learning and reasoning | Keep learned behavior, explicit symbolic processing, and optional model contributions identifiable. | Makes results attributable to the component that produced them. |
| Persistent state | Keep state ownership, content identity, restoration, and authorization distinct. | Supports continuity while preserving the boundaries governing state changes. |
| Application integration | Connect the core to an application controller and retain a packaged desktop integration. | Shows the relationship between cognitive components and usable software. |
| Experimental development | Preserve dated component evidence separately from current maintenance and release status. | Makes a test result interpretable against its actual software and workload. |

The retained source identities cover the learning implementation and dependencies, the application controller, symbolic contracts, state ownership, finalization, runtime ownership records, and the packaged desktop entry. The [receipt](../../results/2026-10-26-private-core-evidence.json) records hashes and review scope without publishing internal paths, interfaces, or procedures.

## Relevance to an AI systems architect role

The evidence addresses several concrete architectural responsibilities: implementing custom cognitive components, defining authority between contributors, retaining learned state, connecting components to application surfaces, and validating behavior against explicit workloads. The surrounding portfolio adds desktop tooling, web services, real-time applications, and delivery records.

| Work | Supporting evidence |
|---|---|
| Custom neuro-symbolic core | This inspection and its dated execution receipt |
| Model development and training | [AI creation and training](../projects/ai-creation-and-training.md) |
| Desktop AI platform | [Dark Matter](../projects/dark-matter.md) |
| Web application and service integration | [QI Works / EchoQI.me](../projects/echoqi-web.md) |
| Real-time systems and delivery | [SYNAP FPS](../projects/synap-fps.md) |

## Verifying the evidence while protecting the implementation

An evaluator can review the pinned private artifacts under confidentiality, supply fresh black-box tasks after the build is fixed, witness execution, and retain sanitized result receipts. Public publication can remain limited to responsibilities, workload definitions, aggregate outcomes, and reviewer attestations.

[Confidential verification procedure](confidential-verification.md) · [Research evidence](../research/README.md)

**Review attribution:** Codex performed this selected source inspection, component execution, and probe, and prepared this portfolio update. The owner supplied project attribution and maintenance status. This is an AI-assisted technical record; an independent evaluator can use the linked procedure to add a separate attestation. Hashes identify retained bytes and support that reinspection.

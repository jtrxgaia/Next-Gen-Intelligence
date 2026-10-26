# QI Core: what was inspected and tested

[Portfolio](../../../README.md) · [Core case study](../projects/echoqi.md) · [Private source receipt](../../results/2026-10-26-private-core-evidence.json)

QI Core is Jack Rourke’s proprietary AI system. It combines learning from examples, explicit rules and structured reasoning, saved state, and application tools. Development uses AI coding assistance and established dependencies.

## Source inspection

The October 26 review examined selected private learning implementations, parameter/state updates, symbolic processing, state ownership, finalization, application-controller connections, and a packaged desktop core entry. Opaque file identities and hashes are in the receipt; the source and methods remain private.

This supports the presence of those implementations and connections in the inspected artifacts. It does not establish current availability of the complete application. The recorded product status is **maintenance**.

## Executed results

| Check | Result | Meaning |
|---|---|---|
| Three selected component suites | **47/47 passed** | Tested learning, supported composition, state validation, and persistence |
| Synthetic learning probe after three demonstrations | **200/200 new-value cases** | Applies a learned mapping within one supported task family |
| Restore saved state | **200/200 cases retained** | The tested behavior survives restoration; selected suites also test persistence through a fresh Node process |
| Fresh recheck controls | Untrained **0/200 exact**; disabled **0/200 resolved** | Successful results depend on the taught, enabled component |
| Separate October 25 training experiment | **34/34 training-exposed examples**, eight consistent restart outputs | Training fit and saved-model continuity, not held-out generalization |

[Fresh snapshot recheck](../../results/2026-10-26-private-component-recheck.json) · [Original component receipt](../../results/2026-10-26-private-core-evidence.json) · [Separate training record](../../results/2026-10-25-ai-training-review.json)

The recheck used the retained nine-file snapshot, whose identities matched the published record. It did not establish equivalence with current production source. Neither the synthetic probe nor the training-fit experiment proves broad generalization.

## Architectural responsibilities

The inspected work assigns who may finalize an answer, change saved state, contribute a model result, and connect to the application. These are the architecture responsibilities being claimed; the public record does not disclose their proprietary algorithms.

## Confidential verification

An evaluator can inspect pinned artifacts, supply fresh tasks, witness a restart/failure, and ask Jack to explain and change a component. [Procedure](confidential-verification.md).

**Attribution:** Codex inspected selected source, ran component checks, and prepared these records. The owner supplied project attribution and maintenance status. This is an AI-assisted record, not an independent audit. Hashes identify bytes, not the truth of a capability claim.

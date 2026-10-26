# Confidential verification of QI Core

[Core evidence](core-evidence.md) · [Evidence receipt](../../results/2026-10-26-private-core-evidence.json) · [Research evidence](../research/README.md)

This procedure lets a hiring team or research evaluator substantiate implementation and behavior while the core remains proprietary. It is a verification procedure available for future reviews; the October 26 observations retain their own reviewer and scope.

## Implementation and authorship review

With the owner's agreement, a reviewer inspects selected source and development records in a controlled private session. Match artifact hashes to the published opaque source identities. Trace one supported request through its application boundary, cognitive components, state handling, and result. Review the relevant tests and development history. Jack explains the design decisions and makes a small, privately reviewed change to demonstrate his understanding.

The review distinguishes owner-designed code, AI-assisted implementation, established dependencies, and optional external models. Its public attestation can state what was inspected, who witnessed it, the date, and the bounded conclusion without reproducing source or methods.

## Evaluator-controlled execution

1. Agree on the capability and observable success criteria. Identify component-level and application-level evaluation separately.
2. Fix the build, configuration, dependency identities, and model/state artifacts before the evaluator supplies new tasks. Retain their hashes privately or publish opaque identifiers.
3. Have the evaluator select fresh tasks and hold back their answers. Record training exposure, attempt policy, and the full task denominator.
4. Execute through an agreed black-box interface. Record outputs, latency boundaries, resource measurements, and actual provider access when relevant. Use an isolated environment with network observation if the claim concerns provider-free operation.
5. Compare with an appropriate baseline and a component-disabled control. For learning claims, distinguish new values in a familiar family from new structures, new families, and new domains.
6. Repeat state continuity checks through a fresh process. Keep the evaluator's private record tied to the pinned artifacts.
7. Publish an agreed sanitized attestation with workload, denominator, date, configuration scope, reviewer identity, and measured outcomes. Source, recipes, internal representations, model files, private state, and raw diagnostics remain confidential.

## Public evaluator available now

The [runnable evaluator](../../../code/README.md#evaluate-a-private-adapter) accepts a private Node adapter and evaluator-owned grid tasks through a standard JSON subprocess interface. It records task-file and adapter identities, exact scores, attempts, and startup-inclusive wall time. Its adapter protocol is a public evaluation boundary, separate from the core’s private interfaces and methods.

The evaluator retains control of the core build, state, filesystem and network permissions, exposure records, and any descendant workers. The public demonstration uses ordinary synthetic fixtures and a transparent reference adapter. This provides a reproducible evaluation tool while the proprietary core remains under maintenance.

## Public attestation fields

| Field | Contents |
|---|---|
| Reviewer and relationship | Name or organization, role, and relationship to the project |
| Date and artifact identity | Observation date, opaque build identity, and retained hashes |
| Claim examined | A specific implementation or behavioral claim |
| Access and controls | Source inspection, witnessed execution, evaluator task selection, and observation scope |
| Workload and exposure | Total cases, exposure status, attempts, and baseline/control definitions |
| Observed outcome | Measured results with units and denominators |
| Interpretation | The conclusion warranted by those observations |
| Confidentiality | Confirmation that the attestation excludes implementation methods and private material |

A black-box demonstration establishes behavior. Private source inspection substantiates implementation structure. Development history and a technical walkthrough support ownership and engineering understanding. Together they allow stronger evaluation while preserving the public repository's confidentiality boundary.

## Runnable protocol for the next confidential review

The [public evaluation kit](../../../code/evaluation-runner/README.md) accepts evaluator-owned JSON cases and a private local Node adapter. Expected answers are not sent through the adapter protocol; reports omit raw examples and host paths. Use an evaluator-controlled environment to enforce actual label isolation, pin dependencies/state and observe provider access. The runner is not a security sandbox and does not itself provide independent certification. No proprietary adapter or new external attestation is included in this update.

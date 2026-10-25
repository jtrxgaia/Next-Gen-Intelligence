# Implementation walkthrough: when a code edit may be called complete
**An existing Dark Matter workflow, explained without exposing proprietary source.**

[Dark Matter case study](../projects/dark-matter.md) · [Evidence index](evidence-index.md#dark-matter)

[Codex self-report](../reviews/self-reports/dark-matter.md)

## The contract

A developer selects a workspace, file, requested change, permissions, and verification command. The system may produce a completion receipt only for work that still belongs to that task and workspace and has passed its required check.

The October 25 read-only source review inspected the workflow and its tests. The description below summarizes observable boundaries rather than publishing the private algorithm or a runnable replacement. No cleared public implementation sample was identified, so no unrelated demonstration or private source is included.

[Codex self-report](../reviews/self-reports/dark-matter.md)

## Normal path

1. **Validate scope before doing work.** Reject missing permissions, invalid fields, unsupported native requirements, or an obsolete session before invoking a contributor or command.
2. **Establish the baseline.** Read the current file and retain its content identity and workspace revision. The baseline defines what the task is allowed to replace.
3. **Obtain a candidate through the selected route.** The bounded native route and local-model route are distinct. Selecting native must not silently cause a model call.
4. **Apply conditionally.** The write depends on the file still matching the expected baseline. A candidate cannot safely overwrite a newer edit merely because generation started earlier.
5. **Execute the required checks.** Record actual command execution and exit status. Model approval is not equivalent to a command running.
6. **Read back and recheck ownership.** Confirm the expected content remains in the same workspace and the session/task has not been cleared or cancelled.
7. **Issue bounded completion evidence.** A receipt identifies the completed operation and its check rather than asserting unrestricted correctness.

[Codex self-report](../reviews/self-reports/dark-matter.md)

## Three outcomes that matter

| Situation | Required outcome | Why |
|---|---|---|
| Candidate passes the required check and readback remains current | A task-bound success receipt may be issued. | The observed change and verification belong to the intended task. |
| Candidate fails a real check and the workflow still owns its edited bytes | Restore the owned baseline; do not report completion. | Failed generated work should not become the accepted result. |
| Another actor edits the file during verification | Reject completion and avoid clobbering the newer bytes during recovery. | A blind rollback can destroy unrelated work. |

Cancellation introduces another race: an in-flight verification must settle before recovery can safely decide which bytes it owns. Clearing a chat or changing workspaces must also invalidate a late success. The inspected tests explicitly cover these cases.

[Codex self-report](../reviews/self-reports/dark-matter.md)

## How to validate this workflow

In a task-owned fixture workspace, use a known file and independent check. Exercise success, check failure, concurrent modification, workspace revision change, session clear, cancellation, and unsupported native instructions. For each case inspect the final bytes, command record, selected route, and whether a completion receipt exists.

Expected observations are behavioral: passing work can complete; failed or invalidated work cannot; recovery does not overwrite a competing edit. The historical October 18 selected-suite summary supports parts of this reliability story. This documentation review did not rerun the current workflow or publish an installable Dark Matter package.

[Codex self-report](../reviews/self-reports/dark-matter.md)

## Engineering tradeoff

These checks cost more integration effort than a simple generate-and-write loop. They make failure explainable and protect the developer’s workspace. The mechanism is still only as strong as its command isolation, cancellation handling, verification criteria, and actual host integration; all of those need continuing qualification.

[Codex self-report](../reviews/self-reports/dark-matter.md)

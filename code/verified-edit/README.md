# Verified edit: public reliability reference

This is an AI-assisted public implementation of the existing [published contract](../../benchmarks/portfolio/engineering/verified-edit-walkthrough.md). It is not extracted from Dark Matter or QI Core. Its new results qualify this sample only.

## Contract

1. Resolve an existing UTF-8 text file and exclusively create its advisory lock.
2. Read the baseline; generate a candidate while holding the lock.
3. Reject cancellation or an observed competing change before replacement.
4. Write a temporary sibling and rename it over the target.
5. Execute the supplied check; require a command and integer exit code.
6. Observe ownership again. Preserve an external replacement or deletion.
7. Restore owned bytes on a failing, throwing, malformed, or cancelled check.
8. Issue a completion receipt only for a passing check with candidate bytes still present. Release the lock in all ordinary error paths.

```js
import { verifiedEdit } from './verified-edit.mjs';
const result = await verifiedEdit({
  file: '/absolute/path/to/example.mjs',
  produceCandidate: original => original.replace('old', 'new'),
  runCheck: async file => ({ command: 'your executed validator', exitCode: 0 }),
});
```

The caller must actually run its validator. A callback returning zero without execution proves nothing. The [benchmark](../benchmarks/edit-safety.mjs) runs real child-process syntax checks as well as injected failures. Validator quality determines what a successful receipt means.

## Concurrency and recovery boundary

Exclusive lock-file creation prevents overlapping callers that use this protocol, across processes and through canonicalized path aliases. It is an advisory lock, not an operating-system compare-and-swap over arbitrary editors. Observed external edits are preserved; an external write in the gap between readback and rename can still race. The function does not claim universal protection against nonparticipating writers.

The lock stays held while the check runs. The caller must bound or cancel its check; an abort signal is observed at checkpoints and does not forcibly interrupt an arbitrary callback. A process crash may leave candidate bytes, a temporary sibling, or a stale lock. An operator must inspect those artifacts after confirming the process has stopped. Locks are not automatically stolen. There is no crash-recovery journal or power-loss durability guarantee.

This helper operates on one existing UTF-8 file. It does not preserve inode identity, file permissions, ACLs, hard-link relationships, or coordinate a multi-file transaction. Use a task-owned worktree when those properties matter.

## Design decisions

- **Why a lock as well as hashes?** Hashes identify observations; they cannot make a check/write pair atomic. The lock serializes cooperating writers. Test: a second process receives `busy` without calling its candidate generator.
- **Why catch check exceptions?** A process-start failure is an unverified candidate too. The original sample restored only nonzero returned exit codes. This update restores on exceptions and malformed results.
- **Why preserve a deletion?** Resurrecting a deleted file would overwrite a competing decision. Deletion receives the same conflict treatment as replacement.
- **Why temporary-file replacement?** Readers should not see a truncated intermediate file. This reduces partial-write exposure without claiming filesystem-wide transactionality.

These decisions were implemented and measured during the October 26 portfolio extension. They demonstrate this public reference, not undocumented behavior of private products.

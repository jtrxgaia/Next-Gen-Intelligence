# Reproducible engineering workflow

[Portfolio](../README.md) · [Architecture and tradeoffs](ARCHITECTURE.md) · [Private core evidence](../benchmarks/portfolio/engineering/core-evidence.md)

Run a complete reference workflow for checking generated edits, preserving working files, verifying artifact integrity, and evaluating a solver against a baseline. It uses real child processes and executed assertions. Node.js 20 or newer is the only runtime dependency; there is no package installation, provider account, model download, or credential setup.

These public implementations were prepared with Codex assistance. They are independent references, with transparent synthetic fixtures, and contain no proprietary QI Core source or methods. The core's own evidence is linked separately.

## Run it

Preserve committed line endings when cloning so byte-level integrity checks reproduce on Windows and Linux:

```sh
git -c core.autocrlf=false clone https://github.com/jtrxgaia/Next-Gen-Intelligence.git
cd Next-Gen-Intelligence/code
npm run demo
npm test
npm run verify
```

Already cloned: run the three npm commands from `code`. The integrity command verifies exact file bytes, including line endings.

## What the demonstration executes

| Step | Observable result |
|---|---|
| Submit an intentionally unsuitable fixture candidate | The check declines it and the original file remains unchanged. |
| Submit a correct median implementation | Four real child-process checks pass before the file is promoted. The checks include odd/even inputs and input preservation. |
| Cancel a subsequent edit | The accepted file retains its verified bytes. |
| Build and check an artifact manifest | The accepted file matches its SHA-256 and byte count. |
| Score public grid fixtures | The identity baseline solves **1/3**; the transparent reference adapter solves **3/3**, using a fresh process per input. |

`npm run demo` prints a deterministic JSON receipt and cleans up its temporary workspace. A [recorded successful run](../benchmarks/results/2026-10-26-public-workflow.json) is available for comparison. The fixture adapter selects between two ordinary public grid rules. These outcomes demonstrate the engineering workflow, rather than a QI Core capability or a general-intelligence benchmark.

The automated suite also exercises exceptions, cancellation, concurrent participating editors, external edits observed during checks, altered candidate bytes, malformed/sparse grids, input mutation, process startup, time limits, output limits, and the evaluator CLI.

## Components to inspect

| Component | Executable responsibility |
|---|---|
| [Verified edit](verified-edit/verified-edit.mjs) | Stage candidate text, run its check, verify ownership, promote accepted bytes, and issue a bounded receipt. |
| [Evidence verifier](evidence-verifier/verify.mjs) | Validate listed artifact paths and metadata, then compare hashes and sizes from the same read. |
| [Exact scorer](arc-harness/harness.mjs) | Validate dense grids, withhold answers from requests, isolate visible data per attempt, and require every test input to match. |
| [Subprocess boundary](arc-harness/process-solver.mjs) | Start a fresh adapter process with time/output bounds and a JSON protocol. |
| [Evaluator CLI](arc-harness/evaluate.mjs) | Connect evaluator-owned tasks to a private adapter and emit a provenance receipt. |
| [Complete demonstration](demo/run.mjs) | Exercise all components with executed assertions and public fixtures. |

## Evaluate a private adapter

Keep the adapter, core, weights, and evaluator task file outside this repository. From `code`, run:

```sh
npm run evaluate -- --tasks /path/to/private-tasks.json --adapter /path/to/private-adapter.mjs --timeout 5000
```

Use your platform's paths. Both flags accept ordinary local file paths.

The adapter is a trusted Node script implementing a generic public evaluation protocol. It reads one JSON request from stdin containing `train` demonstration pairs and the current `input` grid. It returns one JSON grid on stdout. Test answers are omitted from that request. The private adapter translates this public contract into its own implementation's interfaces; no internal core interface needs to be published.

The task file is an object mapping task IDs to standard `train` and `test` arrays of input/output grid pairs. Supported grids are rectangular, 1–30 rows and columns, with integer colors 0–9. The evaluator starts a fresh process per test input, allows one attempt, and scores a task only when every test input matches exactly. The default combined stdout/stderr output limit is 64 KiB.

The receipt includes task-file and adapter-file SHA-256 identities, runtime, attempt policy, time bound, exact scores, and process-inclusive median wall time. It omits raw answers, predictions, and local paths. Use opaque task IDs when the names are confidential. An adapter-file hash identifies that file; separately pin the core build, dependencies, configuration, and state for a full evaluation.

The process retains the invoking user's access rights. Evaluators manage withheld-file permissions, network access, and descendant-worker cleanup. This boundary is process isolation, not an OS security sandbox. In-process solvers are trusted callbacks. See the [architecture contract](ARCHITECTURE.md) and [confidential verification procedure](../benchmarks/portfolio/engineering/confidential-verification.md).

## Editing guarantees and integration contract

The editor checks a staged single-file candidate before promotion. Rejected checks, checker exceptions, and cancellation before promotion preserve the original target. Participating editors share an exclusive lock; observed edits from outside the workflow prevent promotion. The checker receives the staged path, must wait for its command to finish, and returns a command identity and numeric exit status.

An outside program that ignores the lock can still race the final comparison and rename. Checks requiring a fixed basename or whole-workspace state need an isolated-workspace adapter. Process crashes and I/O errors require host-level recovery and lock inspection. These operating assumptions are part of the public contract, rather than an unconditional promise about unrelated writers or arbitrary executables.

## Continuous verification

GitHub Actions runs tests, the complete demonstration, and publication integrity verification on **Linux and Windows with Node 20 and 22**. No proprietary core, paid service, or private credentials are involved. Results apply to this public reference implementation; the private core's dated observations retain their own scope.

## Additional evidence and reviewer tools

[Claim-by-claim architecture evidence](../benchmarks/portfolio/engineering/reviewer-guide.md) connects existing private observations to public records. The [failure-policy comparison](../benchmarks/portfolio/engineering/public-safety-benchmark.md) exercises the current staged editor against a minimal baseline. Run `npm run benchmark` to reproduce it. A separate [input-only JSON evaluation kit](evaluation-runner/README.md) supports structured outputs beyond ARC grids; run `npm run evaluate:example` for its non-AI protocol smoke example. Neither kit publishes a proprietary core adapter.

The publication manifest covers every tracked file except itself. `.gitattributes` preserves committed bytes across operating systems, including historical line endings. CI uploads a fresh safety result for each supported configuration.

# Run and inspect the public proof

[Portfolio](../README.md) · [Architecture and limits](ARCHITECTURE.md) · [Private core evidence](../benchmarks/portfolio/engineering/core-evidence.md)

These are runnable public examples of checking code changes and scoring results. They were prepared with Codex assistance. They contain no proprietary core code or methods and do not test the full private products.

## Run it

Install Git and Node.js 20 or newer, then run:

```bash
git clone https://github.com/jtrxgaia/Next-Gen-Intelligence.git
cd Next-Gen-Intelligence/code
npm run proof
```

No package installation, API key, paid service, or model download is needed. Already cloned? Run `npm run proof` from `code`. The command stops at the first failed step and returns a nonzero exit status. `.gitattributes` preserves file bytes across Windows and Linux checkouts.

## What should pass

| Command | What it checks | Expected result for this version |
|---|---|---|
| `npm test` | Automated success and failure cases | 67 tests pass |
| `npm run demo` | Real code checks, file preservation, hashes, and subprocess scoring | All demo assertions pass; example adapter 3/3, identity baseline 1/3 |
| `npm run verify` | Every tracked publication file’s recorded bytes | All entries match; manifest excludes itself |
| `npm run benchmark` | Nine editing conditions, ten runs each | Verified editor 90/90; simple baseline 30/90 |
| `npm run evaluate:example` | Input/output protocol using array reversal | 3/3; protocol example only, not an AI result |

`npm run audit:evidence` recomputes published ARC, defense-trial, learning-control and training counts from the retained receipts. It checks internal consistency, not whether the private observations occurred.

`npm run proof` runs all six. Windows/Linux CI uses the same command on Node 20 and 22 and saves its safety result as an artifact. See [CI runs](https://github.com/jtrxgaia/Next-Gen-Intelligence/actions/workflows/checks.yml).

## Inspect the code

| Component | Job |
|---|---|
| [Verified edit](verified-edit/verified-edit.mjs) | Check a staged candidate before replacing the original; coordinate callers using its lock |
| [Evidence verifier](evidence-verifier/verify.mjs) | Validate paths and compare file sizes and SHA-256 fingerprints |
| [ARC scorer](arc-harness/harness.mjs) | Require valid grids and exact answers; copy inputs to prevent test contamination |
| [Process adapter](arc-harness/process-solver.mjs) | Run a fresh solver process with time/output bounds |
| [Demo](demo/run.mjs) | Connect those pieces with real checks and simple public fixtures |
| [Safety benchmark](benchmarks/edit-safety.mjs) | Compare file preservation and completion decisions with a minimal baseline |
| [JSON evaluation kit](evaluation-runner/README.md) | Evaluate structured outputs beyond ARC grids |

The public code has limits: locks coordinate participating editors, process isolation is not a security sandbox, and file hashes establish identity rather than truth. [Full contracts and tradeoffs](ARCHITECTURE.md).

## Evaluate a private adapter

Keep the adapter, core, weights, and evaluator’s tasks outside this repository. From `code`:

```bash
npm run evaluate -- --tasks /path/to/private-tasks.json --adapter /path/to/private-adapter.mjs --timeout 5000
```

Use ordinary paths for your operating system. The task file maps task IDs to `train` and `test` input/output pairs. Supported grids are 1–30 rows and columns with integer colors 0–9. The Node adapter receives `train` and the current `input` on stdin and returns one JSON grid on stdout. The protocol omits test answers. Each input gets one attempt in a fresh process; every test input must match for its task to pass.

The result includes scores, case denominators, runtime, time limits, and task/adapter hashes. It excludes answers, predictions, and local paths; use opaque task IDs if needed. Separately pin the core build, dependencies, and state. The evaluator must control access to answer files, network access, and descendant processes: the adapter retains the current user’s permissions.

[Confidential review procedure](../benchmarks/portfolio/engineering/confidential-verification.md) · [What each result proves](../benchmarks/portfolio/engineering/reviewer-guide.md)

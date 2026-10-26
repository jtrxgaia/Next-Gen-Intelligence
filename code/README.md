# Code samples

[Return to Jack Rourke’s portfolio](../README.md)

Three small, working programs that show how Jack designs the trust layer around AI systems: what counts as proof, when a change may be accepted, and how a score is kept honest. Each has automated tests and runs on any computer with Node.js 20 or newer. No packages are installed.

**What is not here:** QI Core, its learning components, training recipes, prompts, data, and model files. These samples were written for publication. They do not copy or reveal the private implementation.

| Sample | What it shows | Tests |
|---|---|---|
| [Evidence verifier](evidence-verifier/verify.mjs) | Checks every published file against its recorded SHA-256 fingerprint. CI runs it against this repository on every change. | 2 |
| [Verified edit](verified-edit/verified-edit.mjs) | A clean-room version of the [public verified-edit contract](../benchmarks/portfolio/engineering/verified-edit-walkthrough.md): a generated change is accepted only after a real check passes. Failed work is rolled back without overwriting anyone else’s edit. | 5 |
| [ARC scoring harness](arc-harness/harness.mjs) | The scoring rules from [METHODS](../benchmarks/METHODS.md) as code: answers are hidden from the solver, grids must match exactly, and every test input must pass. Includes the do-nothing baseline any solver must beat. | 5 |

## Run it

```bash
cd code
npm test
npm run verify
```

## Why these three

Building a model is only part of building an AI system. The surrounding software decides what to trust. These samples cover the three places where that decision most often goes wrong:

1. **Published claims.** Is this the same file that was reviewed?
2. **Generated changes.** Did the check actually run and pass, and does the change still belong to this task?
3. **Benchmark scores.** Could the solver have seen the answers, and is partial credit being counted as success?

A passing test shows that each sample follows its stated rule. It does not certify the private systems they describe.

# Public engineering samples and reviewer kit

[Return to the portfolio](../README.md) · [Architecture evidence guide](../benchmarks/portfolio/engineering/reviewer-guide.md)

Inspectable, AI-assisted public implementations of verification and evaluation boundaries. These samples were written for publication. They are not QI Core, Dark Matter source, private learning methods, training recipes, prompts, data or model files.

Node.js 20 or newer is required. No dependency installation, API credentials or proprietary downloads are needed.

```bash
cd code
npm test
npm run verify
npm run benchmark
npm run evaluate:example
```

| Sample | What can be inspected and reproduced |
|---|---|
| [Evidence verifier](evidence-verifier/verify.mjs) | Exact-byte SHA-256 and size checks against the publication manifest. Hashes identify content; they do not certify claims. |
| [Verified edit](verified-edit/README.md) | Completion after executed validation, exception recovery, cancellation checkpoints, observed conflict preservation and a cross-process advisory lock. Its documented external-editor and crash limitations are part of the contract. |
| [ARC scoring harness](arc-harness/harness.mjs) | Exact valid-grid scoring, one attempt per input, fresh solver instances, isolated input copies and identity baseline. This includes no proprietary solver and cannot reproduce the historical 19/50 result. |
| [Confidential evaluation kit](evaluation-runner/README.md) | Fresh adapter processes, input-only protocol, exact JSON scoring, time/output bounds, full denominators, artifact hashes and sanitized reports. A private adapter stays outside this repository. |

The safety comparison runs nine conditions ten times per implementation: **90/90** for the verified reference and **30/90** for the deliberately minimal baseline in the [recorded run](../benchmarks/results/2026-10-26-public-edit-safety.json). These are failure-policy fixtures, not a production distribution, model-quality benchmark or competitor comparison. See [methods and per-condition results](../benchmarks/portfolio/engineering/public-safety-benchmark.md).

The evaluator example reverses arrays. It checks the protocol only; no EchoQI capability is inferred from its three smoke cases. No new independent external evaluation is claimed.

## Verification in CI

The test suite covers normal and adverse behavior, including thrown checks, deletions, competing processes, malformed grids, mutation isolation, adapter failures, timeouts, output bounds and adapter changes. CI runs on Windows and Linux with Node 20 and 22, verifies the publication manifest and uploads a newly generated safety result per configuration. The local recorded run used Node v24.16.0 on Windows; workflow success must be checked separately.

The manifest records exact file bytes. `.gitattributes` disables line-ending conversion to preserve historical artifacts and make fresh Windows and Linux checkouts comparable. The manifest excludes itself. Adding new published files requires explicitly adding their identities before publication.

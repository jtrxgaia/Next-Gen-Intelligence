# Architecture evidence: a reviewer’s route through the work

[Portfolio](../../../README.md) · [Evidence index](evidence-index.md) · [Reproduce the public results](../../../code/README.md)

This guide connects the existing AI architecture and product record to inspectable evidence. It keeps three questions separate: what the private source record reports, what selected private components actually did in a fresh run, and what anyone can reproduce from the public repository.

## Start with the evidence

| Engineering claim | Backing record | What can be concluded |
|---|---|---|
| A custom learning component can learn a supported mapping and retain it | [Fresh private snapshot recheck](../../results/2026-10-26-private-component-recheck.json): 47/47 selected tests; 200/200 fresh-value cases learned and restored; 0/200 untrained exact cases; 0/200 disabled resolutions | Bounded component behavior and a learning-activation control in the retained snapshot. The family, probe and implementation remain private; this is an attributed observation, not publicly reproducible or independent. |
| The core has implemented learning, symbolic processing, state ownership and application connections | [Existing source inspection and identities](core-evidence.md) | Selected source was inspected by an AI assistant. A confidential walkthrough can substantiate those connections to an external evaluator. Runtime performance does not follow from source inspection alone. |
| A model was trained from random initialization | [October 25 training record](../../results/2026-10-25-ai-training-review.json) | Retained provenance and successful fitting on 34 training-exposed examples, plus eight restart outputs. This update did not retrain the model or establish unseen-task performance. |
| Verification and recovery are part of the development-tool design | [Existing Dark Matter contract](verified-edit-walkthrough.md), [public reference](../../../code/verified-edit/README.md), [fresh baseline comparison](../../results/2026-10-26-public-edit-safety.json) | A public implementation now passes 90/90 policy trials, versus 30/90 for a minimal write/check baseline. This result belongs to the public reference, not a fresh acceptance run of Dark Matter. |
| Evaluation rules must prevent accidental score inflation | [ARC harness and tests](../../../code/arc-harness/harness.mjs), [confidential evaluator kit](../../../code/evaluation-runner/README.md) | Inspectable scoring code rejects malformed grids, isolates solver inputs and records process failures. The kit supports new private reviews; no external core evaluation using it has yet occurred. |
| The historical ARC result was 19/50 | [Methods and original receipt](../../METHODS.md) | A dated public-training development result. The proprietary solver is absent; the new public harness does not reproduce that historical score. |
| Work spans desktop, web and native game systems | [Project case studies](../projects/), [selected engineering checks](../../results/2026-10-18-selected-checks.json), [native delivery record](../../results/2026-10-24-synap-native-summary.json) | A documented implementation and delivery history with selected tests, images and open acceptance work. Current whole-product availability is not established by those records. |

## Reproduce something in minutes

With Node.js 20 or newer, no dependency installation or API account is needed:

```bash
git clone https://github.com/jtrxgaia/Next-Gen-Intelligence.git
cd Next-Gen-Intelligence/code
npm test
npm run verify
npm run benchmark
npm run evaluate:example
```

The safety benchmark reports nine named conditions, ten repetitions per condition, for both implementations. Review every condition and final-file expectation in [its source](../../../code/benchmarks/edit-safety.mjs). A failure returns a nonzero exit status. Latency includes filesystem and process overhead; aggregate differences are not a speedup claim because the implementations deliberately perform different amounts of work on rejected cases.

The example evaluator reverses arrays only. Its purpose is to verify the confidential evaluation protocol, not to demonstrate EchoQI intelligence. No core source or private adapter is downloaded by these commands.

## Architecture decisions visible to a reviewer

The existing private project records describe responsibilities across learning, symbolic operations, authoritative state, contributor models and application boundaries. Their implementation identities and observed scope are recorded in [core evidence](core-evidence.md). This guide does not disclose the algorithms connecting them.

The public extension makes the surrounding verification decisions inspectable:

| Decision | Failure addressed | Evidence |
|---|---|---|
| Completion depends on executed checks and current candidate bytes | A plausible answer or stale passing result being accepted | Success, failure, exception, cancellation and competing-edit tests; real staged-candidate syntax checks in the safety benchmark |
| Cooperating edits acquire an exclusive advisory lock | Two participants both passing a read-before-write check | Cross-process exclusion test; [documented boundary](../../../code/verified-edit/README.md#concurrency-and-recovery-boundary) for outside editors |
| Check errors reject staged candidates just like failing exit codes | An unverified candidate being left after process-start failure | Throwing and malformed check regressions |
| A scorer receives a fresh copy of permitted inputs | Mutation contaminating later cases or original examples | ARC mutation-isolation regression |
| Private review uses an input-only subprocess protocol | Accidental answer disclosure and missing failure denominators | Runner tests for hidden expected fields, errors, timeouts, output limits, adapter changes and empty workloads |

These public design decisions were implemented during this extension. They should not be read as retroactive proof that every private runtime uses the same mechanism.

## Verify the proprietary work without publishing it

The owner can provide an evaluator-controlled private walkthrough and black-box session under an agreed confidentiality arrangement. Follow the [verification procedure](confidential-verification.md), use fresh tasks selected by the evaluator, pin the build and state, and include baseline and component-disabled conditions. A private adapter can connect the public runner to the agreed interface without entering this repository.

The evaluator should independently witness one supported request, a restart, an intentionally induced failure, and a small owner-explained change. That provides evidence of behavior, architecture understanding and ownership while preserving proprietary implementation details. No such new outside attestation, customer outcome or production-readiness claim is invented here.

## Authorship and scope

The portfolio attributes the existing ecosystem’s design and ownership to Jack Rourke, with AI-assisted development and established dependencies explicitly acknowledged. This extension’s code, benchmark and prose were prepared with Codex at Jack’s request. The private recheck was also run by Codex, which authored this guide; it is not an independent audit. Its snapshot identities match the existing published record. The private application remains under its previously reported maintenance status.

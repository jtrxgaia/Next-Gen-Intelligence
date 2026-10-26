# Confidential black-box evaluation kit

A reviewer can use this public runner with a separately supplied private adapter. No proprietary core source, methods, weights, prompts, or adapter need be committed here. The included array-reversal adapter is a protocol smoke fixture, not an AI capability demonstration.

```bash
cd code
node evaluation-runner/runner.mjs evaluation-runner/example-cases.json evaluation-runner/example-adapter.mjs
# Private review: substitute evaluator-owned cases and a private local adapter.
node evaluation-runner/runner.mjs /private/cases.json /private/adapter.mjs
```

Cases are a nonempty JSON array of `{ "input": ..., "expected": ... }`. The adapter receives only `{ "input": ... }` on stdin and returns exactly one JSON value on stdout. Put any demonstrations or context inside `input`. Every case starts a fresh Node process. Private model services or shared state require separate build/state pinning and reset controls agreed with the reviewer.

The report contains exact-match results, every case's index and status, the full denominator, process-inclusive wall time, and hashes of the cases and adapter. It omits raw examples, answers, paths, and stderr. It records whether the adapter file changed during execution. Hashes identify artifacts; they do not authenticate them. Review reports before sharing, even when inputs were withheld.

## Evaluation boundaries

- This is a protocol boundary, not a security sandbox. The adapter runs as the current user with inherited environment, filesystem and network access. Keeping labels off stdin does not prevent an untrusted adapter reading an accessible cases file. Use evaluator-controlled permissions or a separate container/machine for adversarial reviews.
- The timeout terminates the direct child. It does not guarantee termination of descendant processes or a remote model request. Adapter execution must be authorized and trusted. Output limits bound captured stdout and stderr together.
- A fresh process resets the adapter's in-process globals; it does not reset external services, files, databases or model state. Adapter hashing does not pin its imports or backend.
- JSON exact match is appropriate for structured tasks with an agreed canonical output. Open-ended writing requires a different rubric. This runner makes no network, cost or model-quality measurements.
- Report both baseline and enabled conditions on the same evaluator-selected cases. Pin dependencies and state beforehand. Record exposure, attempts, reviewer relationship, failures and limitations alongside the report.

The existing private component receipt was generated with its retained private probe, not this newly added runner. An external evaluation using this protocol has not yet been performed. See the [confidential verification procedure](../../benchmarks/portfolio/engineering/confidential-verification.md).

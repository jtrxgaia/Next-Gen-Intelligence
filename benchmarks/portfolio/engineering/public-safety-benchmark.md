# Reproducible verification and recovery benchmark

[Reviewer guide](reviewer-guide.md) · [Runnable source](../../../code/benchmarks/edit-safety.mjs) · [Raw public receipt](../../results/2026-10-26-public-edit-safety.json)

## Question and result

Can the public verified-edit reference enforce its completion/recovery policy under intentionally injected failures better than a minimal write-then-check loop?

The October 26 Windows/Node v24.16.0 run produced **90/90 policy passes** for the verified reference and **30/90** for the baseline. Both received the same nine conditions, repeated ten times with varied file values. The baseline writes the candidate and reports the check result; it intentionally has no recovery, cancellation or ownership logic. It is an explanatory control, not another commercial product or a state-of-the-art editing system.

| Condition | Baseline | Verified reference | Expected behavior |
|---|---:|---:|---|
| Valid candidate | 10/10 | 10/10 | Keep candidate and complete |
| Invalid JavaScript | 0/10 | 10/10 | Restore baseline and reject completion |
| Check callback throws | 0/10 | 10/10 | Restore baseline and reject completion |
| Cancel during check | 0/10 | 10/10 | Restore baseline and reject completion |
| External edit during generation | 0/10 | 10/10 | Preserve external bytes and reject completion |
| External edit during successful check | 0/10 | 10/10 | Preserve external bytes and reject completion |
| External edit during failing check | 10/10 | 10/10 | Preserve external bytes and reject completion |
| Deletion during check | 10/10 | 10/10 | Preserve deletion and reject completion |
| Cancel before start | 0/10 | 10/10 | Keep baseline and reject completion |

Success requires both the expected final bytes/deletion and the expected completion decision. Every trial is retained in the receipt. Successful and invalid-code paths execute `node --check` in a real child process; the other conditions inject controlled lifecycle or check failures. Execution order alternates by repetition.

## Reproduction and interpretation

```bash
cd code
npm run benchmark
# Optional: retain a new dated receipt outside the tracked historical result.
node benchmarks/edit-safety.mjs --output local-safety-result.json
```

The receipt includes source hashes, runtime/platform, per-condition counts, individual outcomes and wall times. Source hashes can be checked against the two named public files. CI reruns the comparison on Windows and Linux and publishes its own result artifact.

These are deterministic failure-policy fixtures. Ten repetitions exercise varied file contents, not ten independent discoveries or a representative production distribution. The study does not measure generated-code quality, model inference speed, user productivity, competitor performance, or the private Dark Matter application. Timing differences include early rejections that skip checks, so they must not be advertised as a performance advantage.

Nonparticipating editors can still race between observation and replacement. Cross-process advisory locking is separately tested for participating callers. Process crashes, power loss, filesystem permissions and multi-file transactions remain outside this reference’s guarantee. See the [implementation boundary](../../../code/verified-edit/README.md).

## Relationship to existing work

The existing Dark Matter case study describes verification, ownership and recovery as architectural concerns. This public sample makes a narrow version inspectable without copying private code. The benchmark was designed and executed by the same AI assistant that implemented the extension. It is reproducible engineering evidence, not an independent certification or a new historical product result.

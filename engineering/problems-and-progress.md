# Problems, decisions, and progress
**A software résumé should show what happened when the first approach was not enough.**

[Portfolio](../README.md) · [Evidence index](evidence-index.md)

[Codex self-report](../reviews/self-reports/engineering.md)

## EchoQI: several components cannot all own the final answer

**The struggle:** the system accumulated historical runtimes, hosts, provider paths, and memory implementations. Reachable alternatives made authority ambiguous.

**The response:** define one cognitive/finalization boundary, keep model providers as contributors, and adapt older surfaces to stable contracts. The August authority records retain earlier contradictions as regression targets rather than erasing the history.

**What the evidence establishes:** a dated source-reachability audit reports convergence for its supported routes, with release authority deliberately closed. It does not establish that every currently running process is healthy. The engineering lesson is to make ownership explicit and keep static inspection separate from runtime acceptance.

[Codex self-report](../reviews/self-reports/engineering.md)

## Dark Matter: a convincing explanation cannot substitute for a passing check

**The struggle:** generated code and model review can agree while the actual code is wrong. Local ensemble results retain a failed median-array task even when a model selected a preferred candidate.

**The response:** evaluate actual candidates with executed checks, bind results to the workspace/task, and inspect readback before completion. Source tests cover failed checks, changes during verification, invalidated sessions, and cancellation.

**What the evidence establishes:** selected historical candidate suites and actual source/test paths support the bounded workflow. They do not prove all generated edits succeed. The meaningful improvement is a stronger definition of completion and a safer response to failure.

[Codex self-report](../reviews/self-reports/engineering.md)

## SYNAP diagnostic units

**The struggle:** an on-screen diagnostic reported `scene/meshCount (2254ms)`, suggesting an enormous rendering stall.

**The investigation:** the October 13 record traced a scene mesh count into a duration-oriented reporting interface. An isolated replay of the untouched class with stubbed browser behavior reproduced a false spike: the number of meshes was being treated as elapsed milliseconds. A separate condition could also bypass reporting throttling.

**What was overcome:** the misleading diagnostic interpretation was reproduced and explained. A mesh count is a count, not a duration.

**What remains open:** that reproduction did not quantify real networking/CPU cost or establish the dominant cause of the game’s frame-time regression. The next causal experiment needs matched encounters, resolution/preset records, and separate construction, simulation, and rendering timings. This distinction prevents a diagnostic fix from becoming an unsupported performance victory.

[Codex self-report](../reviews/self-reports/engineering.md)

## QIOS: a valid signature does not mean a candidate is healthy

**The struggle:** a signed development candidate could pass integrity checks yet fail to provide a working shell.

**The response:** stage updates in an inactive slot and require boot-health acceptance before promotion. In the August 18 broken-candidate regression, the candidate’s signature and hash passed, shell-related health checks failed, and automatic recovery restored the prior known-good slot. A healthy follow-up restored the standby reserve.

**What the evidence establishes:** VM-level failure injection and rollback worked in that recorded run. It does not qualify every physical machine or establish that all later releases are healthy. [Sanitized recovery receipt](../benchmarks/results/2026-08-18-qios-rollback.json).

[Codex self-report](../reviews/self-reports/engineering.md)

## The pattern in Jack’s work

Jack keeps the ambition while refining the definition of success. When a claim is too broad, the useful next step is a narrower test, a clearer boundary, or a more observable workflow. That habit is the link between AI architecture, developer tools, game performance, and recovery engineering in these projects.

[Codex self-report](../reviews/self-reports/engineering.md)

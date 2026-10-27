# Jack Rourke
### Founder of EchoQI · AI Systems Architect · Software Engineer

Jack Rourke designs and builds AI systems, desktop tools, web applications, and games with AI-assisted development.

**EchoQI / QI Core** is his main project: custom learning, reasoning, and persistent memory. The core is private and under maintenance.

**Try the public work:** [Run all checks with one command](code/README.md#run-it). No API keys, paid services, or model downloads.

[Contact](mailto:jtrxgaia@gmail.com) · [GitHub](https://github.com/jtrxgaia) · [EchoQI.me](https://echoqi.me)

**Explore:** [Skills](#engineering-specializations) · [AI development](#ai-development) · [Projects](#projects) · [Problem solving](#engineering-investigations) · [Code](#code-samples) · [History](#development-history) · [Reviews](#technical-reviews) · [Repository directory](#repository-directory) · [Client reviews](#client-reviews)

### At a glance

| | |
|---|---|
| **Role** | Founder and software engineer; AI-assisted development |
| **Main project** | EchoQI / QI Core: learning, reasoning, memory, and application tools |
| **Other projects** | Dark Matter · QI Works / EchoQI.me · SYNAP FPS |
| **Public proof** | 59 tests, runnable demo, safety comparison, and gameplay video |
| **Private proof** | Dated source reviews and component results; confidential review available |
| **Start here** | [What the evidence proves](benchmarks/portfolio/engineering/reviewer-guide.md) · [Run the checks](code/README.md) |

## Engineering specializations

| Area | What Jack works on |
|---|---|
| AI architecture | Connecting learning, reasoning, memory, models, and tools |
| Model development | Building trainable components, running experiments, and saving models |
| Desktop and web software | Interfaces, backend services, accounts, and AI integrations |
| Developer tools | Checking code changes and protecting existing work |
| Game development | Combat, enemies, rendering, progression, and saved games |
| Reliability | Finding failures, checking measurements, and recovering working versions |

[Skills and practical applications](benchmarks/portfolio/engineering/strengths.md) · [Development workflow](benchmarks/portfolio/engineering/workflow.md)

## AI development

Work covers custom learning components, models trained from random weights, and adaptation of an existing model.

- **Components:** **47/47 tests** passed. After three demonstrations: **200/200 new-value cases**, retained after state restoration, within one synthetic task family. Untrained: **0/200**; disabled: **0/200 resolved**.
- **Training:** **34/34 training examples** passed; eight checked outputs survived restart. This establishes training fit and saved-model consistency; unseen-task performance is unproven.

Private inspection records are AI-authored; independent verification remains open. [Component receipt](benchmarks/results/2026-10-26-private-component-recheck.json) · [Training receipt](benchmarks/results/2026-10-25-ai-training-review.json) · [Full case study](benchmarks/portfolio/projects/ai-creation-and-training.md)

## Projects

### EchoQI / QI Core

Custom learning and reasoning, persistent memory, and application tools, designed and developed by Jack with AI assistance. [Architecture evidence](benchmarks/portfolio/engineering/core-evidence.md).

#### How the parts work together

The neuro-symbolic architecture combines learning from examples with explicit rules and assigns responsibilities to custom components and external models.

#### Memory that carries across interactions

Selected tests cover context storage, write permissions, and restoration after restart.

#### HiveMind: several models, one shared task

HiveMind is designed to coordinate compatible models—including Gemini, GPT, Claude, and Kimi—on a shared task. Its benefit over one model is unmeasured. [Design and scope](benchmarks/portfolio/projects/echoqi.md#hivemind).

#### Building and training the learning components

Records distinguish example-based learning, model training, and adaptation, with saved artifacts and experiment scope. [Training case study](benchmarks/portfolio/projects/ai-creation-and-training.md).

#### Quantum research

IBM Quantum/Qiskit is a separate research integration. The reasoning software is classical; no quantum advantage is established. [Research record](benchmarks/portfolio/docs/IBM_QUANTUM_RESEARCH.md).

#### Turning the core into usable software

Application integration covers requests, results, permissions, diagnostics, and recovery. Core source, methods, training recipes, and models remain private.

<img src="benchmarks/portfolio/media/portfolio/echo-desktop-dock.png" alt="Echo desktop interaction dock" width="760" />

*Echo desktop interface component.*

[Core case study](benchmarks/portfolio/projects/echoqi.md) · [Source inspection record](benchmarks/results/2026-10-26-private-core-evidence.json) · [Confidential verification](benchmarks/portfolio/engineering/confidential-verification.md)

### Dark Matter

An AI-assisted coding platform with checked file changes, permissions, and recovery.

**Stack:** Electron, React, Vite, Node.js, and local model adapters.

<img src="benchmarks/portfolio/media/portfolio/dark-matter-current.jpg" alt="Current Dark Matter desktop platform showing the question Who is Echo and Echo’s response" width="760" />

*Desktop capture, October 25, 2026. The displayed reply is a self-description.*

[Case study](benchmarks/portfolio/projects/dark-matter.md) · [Verification workflow](benchmarks/portfolio/engineering/verified-edit-walkthrough.md)

### QI Works / EchoQI.me

AI conversations, media tools, accounts, and game access, using Base44 managed services.

**Stack:** React, JavaScript/TypeScript, Vite, Tailwind, TanStack Query, and Base44.

**Checks:** **20/20 selected tests**, including simulated purchases and saves. Live payments and full signed-in acceptance remain unverified.

<img src="benchmarks/portfolio/media/portfolio/echoqi-web.png" alt="QI Works public landing page" width="760" />

*Public page, October 25, 2026. Chat was marked under maintenance.*

[Web application case study](benchmarks/portfolio/projects/echoqi-web.md)

### SYNAP FPS

A science-fiction shooter with combat, enemies, equipment, progression, and saved games. **Browser:** TypeScript, Babylon.js, and Rapier. **Native:** Unreal Engine / C++; development packages exist, with migration and acceptance testing in progress.

https://github.com/user-attachments/assets/1f033242-aed3-45e0-8c7d-77f0e30bf1bf

*1:36 gameplay demo: arena combat, weapons, enemies, effects, and HUD updates. Owner-supplied footage; FPS overlays are not controlled benchmarks. [Original 1080p video](https://github.com/jtrxgaia/Next-Gen-Intelligence/releases/download/synap-gameplay-demo-2026-10-27/SYNAP-Gameplay-Demo-Final-v2.mp4).*

[Game case study and more images](benchmarks/portfolio/projects/synap-fps.md)

## Engineering investigations

Investigations cover failed code checks, competing state owners, a mesh-count/timing diagnostic error, and OS update recovery.

[What failed, what changed, and what remains open](benchmarks/portfolio/engineering/problems-and-progress.md)

## Code samples

Run with Git and Node.js 20+:

```bash
git clone https://github.com/jtrxgaia/Next-Gen-Intelligence.git
cd Next-Gen-Intelligence/code
npm run proof
```

Runs tests, demo, integrity checks, safety comparison, and evaluator example; stops on failure.

- **[Verified edit](code/verified-edit/verified-edit.mjs):** validates staged changes before replacing a file.
- **[Evidence verifier](code/evidence-verifier/verify.mjs):** checks file sizes and SHA-256 hashes.
- **[Scoring and adapters](code/arc-harness/harness.mjs):** exact-answer scoring and solver time/output limits.

**Safety comparison:** **90/90 policy trials**, versus **30/90** for a minimal write/check baseline: nine conditions, repeated ten times. It tests file preservation and completion decisions. These Codex-assisted examples contain no private core source and establish no AI-quality or private-product score.

[Commands and expected results](code/README.md) · [Benchmark methods](benchmarks/portfolio/engineering/public-safety-benchmark.md) · [Architecture and limits](code/ARCHITECTURE.md)

## Related systems

Other work: voice interfaces, host communication, codebase analysis, QIOS, quantum services, and earlier games. QI Glasses remains a concept.

[Ecosystem map](benchmarks/portfolio/engineering/ecosystem.md) · [Supporting systems](benchmarks/portfolio/projects/systems.md)

## Development history

Jack reports development since around 2023. This repository documents work from October 3, 2026; the earlier timeline is unverified.

**Historical ARC run:** **19/50 public-training tasks**; **13.388 ms median per test input**, excluding startup. Hidden-test performance and competitor comparisons remain unestablished.

[Dated results and corrections](benchmarks/METHODS.md) · [Evidence index](benchmarks/portfolio/engineering/evidence-index.md)

## Technical reviews

AI-authored reviews disclose authors, sources, and limits. They are supporting records, not independent audits.

[Codex review](benchmarks/portfolio/reviews/codex-2026-10-25.md) · [Project reviews](benchmarks/portfolio/reviews/README.md)

## Engineering capability profile

Inspect the runnable verification/evaluation tools, gameplay demo, and dated private-component records. Confidential review is available.

[Claim-by-claim evidence](benchmarks/portfolio/engineering/reviewer-guide.md) · [Capabilities](benchmarks/portfolio/engineering/capabilities.md)

## Benchmarks

Current results lead; historical charts retain their corrections in the archive.

[Results and runnable checks](benchmarks/README.md) · [Methods](benchmarks/METHODS.md) · [Historical showcase](benchmarks/original-repository/README.md)

## Repository directory

| Material | Location |
|---|---|
| Code samples and tests | [code](code/README.md) |
| Benchmarks and historical showcase | [benchmarks](benchmarks/README.md) |
| Technical documentation | [docs](benchmarks/portfolio/docs/) |
| Engineering records | [engineering](benchmarks/portfolio/engineering/) |
| Core implementation evidence | [Architecture and verified observations](benchmarks/portfolio/engineering/core-evidence.md) · [Confidential verification](benchmarks/portfolio/engineering/confidential-verification.md) |
| Images and media | [media](benchmarks/portfolio/media/) |
| Project case studies | [projects](benchmarks/portfolio/projects/) |
| Evidence receipts | [receipts](benchmarks/portfolio/receipts/) |
| Historical reports | [reports](benchmarks/portfolio/reports/) |
| Research records | [research](benchmarks/portfolio/research/) |
| Attributed technical reviews | [reviews](benchmarks/portfolio/reviews/README.md) |
| Original benchmark audit | [October 3 audit](benchmarks/portfolio/2026-10-03_EchoQI_Benchmark_Audit_v1.md) |
| Change history | [Changelog](benchmarks/portfolio/CHANGELOG.md) · [History](benchmarks/portfolio/HISTORY.md) |
| Publication policy | [Evidence policy](benchmarks/portfolio/EVIDENCE_POLICY.md) |
| Previous front page | [Legacy showcase](benchmarks/portfolio/LEGACY_SHOWCASE.md) |
| File integrity record | [Publication manifest](benchmarks/portfolio/PUBLICATION_MANIFEST.json) |

## Client reviews

Worked with Jack? Share the project, what he delivered, and the result.

**[Leave a review](https://github.com/jtrxgaia/Next-Gen-Intelligence/issues/new?template=review.yml)** · **[Read all reviews](https://github.com/jtrxgaia/Next-Gen-Intelligence/issues?q=label%3Areview)**

Reviews are public, dated, and posted from the client’s own GitHub account. A free account is required.

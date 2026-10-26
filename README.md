# Jack Rourke
### Founder of EchoQI · AI Systems Architect · Software Engineer

Jack Rourke builds AI systems, desktop tools, web applications, and games. He designs how the parts work together and uses AI-assisted development to build and test them.

His main project is **EchoQI / QI Core**: custom learning and reasoning software with memory that can be saved and restored. The core is private and currently under maintenance.

**Try the public work:** [Run all checks with one command](code/README.md#run-it). No paid services, API keys, or model downloads are needed.

[Contact](mailto:jtrxgaia@gmail.com) · [GitHub](https://github.com/jtrxgaia) · [EchoQI.me](https://echoqi.me)

**Explore:** [Skills](#engineering-specializations) · [AI development](#ai-development) · [Projects](#projects) · [Problem solving](#engineering-investigations) · [Code](#code-samples) · [History](#development-history) · [Reviews](#technical-reviews) · [Repository directory](#repository-directory) · [Client reviews](#client-reviews)

### At a glance

| | |
|---|---|
| **Role** | Founder, system designer, and software engineer using AI-assisted development |
| **Main project** | EchoQI / QI Core: custom AI components connected to desktop and web software |
| **Other projects** | Dark Matter coding tools, QI Works / EchoQI.me web applications, and SYNAP FPS |
| **Public proof** | Runnable code, automated tests, a working demonstration, and a comparison with a simple baseline |
| **Private proof** | Dated source reviews and component test results; confidential review is available |
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

The records cover custom AI components, models trained from random starting weights, and a separate path that adapts an existing model.

- **Component checks:** 47 selected tests passed. After three demonstrations, a component handled **200/200 new-value cases** in one supported synthetic task family and kept that result after restoring saved state. The untrained control passed **0/200**; the disabled control resolved **0/200**.
- **Model training:** a separate experiment passed **34/34 examples used during training** and retained eight checked outputs after restart. That shows training fit and saved-model consistency; unseen-task performance remains unproven.

These are AI-authored private inspection records, not independent audits. [Component receipt](benchmarks/results/2026-10-26-private-component-recheck.json) · [Training receipt](benchmarks/results/2026-10-25-ai-training-review.json) · [Full case study](benchmarks/portfolio/projects/ai-creation-and-training.md)

## Projects

### EchoQI / QI Core

EchoQI combines custom learning and reasoning components with saved memory and application tools. Jack designs the system and directs its AI-assisted development. [Architecture evidence](benchmarks/portfolio/engineering/core-evidence.md).

#### How the parts work together

“Neuro-symbolic” means combining learning from examples with explicit rules and structured reasoning. The architecture assigns responsibilities to these components and to any external models.

#### Memory that carries across interactions

Memory work covers saving context, controlling who may change it, and restoring it after a restart. Selected component tests check these behaviors; they do not test every possible use of memory.

#### HiveMind: several models, one shared task

HiveMind is the design for coordinating compatible models such as Gemini, GPT, Claude, and Kimi on the same task. Its benefit over a single model still needs a measured comparison. [Design and scope](benchmarks/portfolio/projects/echoqi.md#hivemind).

#### Building and training the learning components

The records distinguish learning from examples, training a model, and adapting an existing model. They identify saved artifacts and what each experiment tested. [Training case study](benchmarks/portfolio/projects/ai-creation-and-training.md).

#### Quantum research

IBM Quantum/Qiskit work is a separate research integration. The documented reasoning software runs on classical computers; no quantum advantage is established. [Research record](benchmarks/portfolio/docs/IBM_QUANTUM_RESEARCH.md).

#### Turning the core into usable software

Application work connects requests, results, permissions, diagnostics, and recovery. Core source, methods, training recipes, and model files remain private.

<img src="benchmarks/portfolio/media/portfolio/echo-desktop-dock.png" alt="Echo desktop interaction dock" width="760" />

*Echo desktop interface component.*

[Core case study](benchmarks/portfolio/projects/echoqi.md) · [Source inspection record](benchmarks/results/2026-10-26-private-core-evidence.json) · [Confidential verification](benchmarks/portfolio/engineering/confidential-verification.md)

### Dark Matter

An AI-assisted desktop platform for coding and building projects. Its engineering work covers file changes, executed checks, permissions, and recovery.

**Stack:** Electron, React, Vite, Node.js, and local model adapters.

<img src="benchmarks/portfolio/media/portfolio/dark-matter-current.jpg" alt="Current Dark Matter desktop platform showing the question Who is Echo and Echo’s response" width="760" />

*Desktop capture, October 25, 2026. The displayed reply is not proof of its own claims.*

[Case study](benchmarks/portfolio/projects/dark-matter.md) · [Verification workflow](benchmarks/portfolio/engineering/verified-edit-walkthrough.md)

### QI Works / EchoQI.me

A web application bringing AI conversations, media tools, accounts, and game access together. Base44 provides managed services.

**Stack:** React, JavaScript/TypeScript, Vite, Tailwind, TanStack Query, and Base44.

**Recorded checks:** 20 selected tests passed, including simulated purchase/save workflows. Live payments and all current signed-in features were not verified.

<img src="benchmarks/portfolio/media/portfolio/echoqi-web.png" alt="QI Works public landing page" width="760" />

*Public page, October 25, 2026. Chat was marked under maintenance.*

[Web application case study](benchmarks/portfolio/projects/echoqi-web.md)

### SYNAP FPS

A science-fiction shooter with combat, enemies, equipment, progression, rendering, and saved games. The browser edition uses **TypeScript, Babylon.js, and Rapier**. A separate **Unreal Engine / C++** version has development packages; migration and acceptance testing remain in progress.

<img src="benchmarks/portfolio/media/portfolio/synap-gameplay-owner.png" alt="SYNAP gameplay showing the Aurelia arena, weapon view, holographic structures, and combat HUD" width="900" />

*Owner-supplied gameplay capture. Its FPS display is a momentary reading, not a controlled benchmark.*

[Game case study and more images](benchmarks/portfolio/projects/synap-fps.md)

## Engineering investigations

The records include failed code checks, competing state owners, a game diagnostic that confused mesh counts with milliseconds, and recovery from an unhealthy OS update.

[What failed, what changed, and what remains open](benchmarks/portfolio/engineering/problems-and-progress.md)

## Code samples

Anyone with Git and Node.js 20 or newer can run the public checks:

```bash
git clone https://github.com/jtrxgaia/Next-Gen-Intelligence.git
cd Next-Gen-Intelligence/code
npm run proof
```

The command runs the tests, working demo, file-integrity check, safety comparison, and evaluator example. It stops if a check fails.

- **[Verified edit](code/verified-edit/verified-edit.mjs):** checks a proposed file in a separate staging file before replacing the original.
- **[Evidence verifier](code/evidence-verifier/verify.mjs):** checks file sizes and SHA-256 hashes—fingerprints used to detect changed bytes.
- **[Scoring and adapters](code/arc-harness/harness.mjs):** checks exact answers and runs solver processes with time/output limits.

The safety comparison passed **90/90 policy trials**, versus **30/90** for a simple write/check baseline. It tests file preservation and completion decisions, not AI intelligence or private-product performance. Public examples were prepared with Codex assistance and contain no core source.

[Commands and expected results](code/README.md) · [Benchmark methods](benchmarks/portfolio/engineering/public-safety-benchmark.md) · [Architecture and limits](code/ARCHITECTURE.md)

## Related systems

Other work covers voice interfaces, host communication, codebase analysis, QIOS, quantum-service integration, and earlier games. QI Glasses remains a concept in the reviewed evidence.

[Ecosystem map](benchmarks/portfolio/engineering/ecosystem.md) · [Supporting systems](benchmarks/portfolio/projects/systems.md)

## Development history

Jack reports independent development beginning around 2023. This public repository begins October 3, 2026; it cannot verify the full earlier timeline.

A historical ARC reasoning run passed **19/50 public-training tasks**, with **13.388 ms median solver time per test input**, excluding startup. It is not a hidden-test score or a matched competitor comparison.

[Dated results and corrections](benchmarks/METHODS.md) · [Evidence index](benchmarks/portfolio/engineering/evidence-index.md)

## Technical reviews

AI-authored reviews name their author, sources, and limits. They are supporting records, not independent certifications.

[Codex review](benchmarks/portfolio/reviews/codex-2026-10-25.md) · [Project reviews](benchmarks/portfolio/reviews/README.md)

## Engineering capability profile

The strongest public evidence is runnable verification and evaluation software. Private AI claims have dated component records and a confidential-review procedure.

[Claim-by-claim evidence](benchmarks/portfolio/engineering/reviewer-guide.md) · [Capabilities](benchmarks/portfolio/engineering/capabilities.md)

## Benchmarks

Start with the current result table. Historical charts are archived separately with their corrections.

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

Worked with Jack? Your review helps others understand what working with him is like.

**[Leave a review](https://github.com/jtrxgaia/Next-Gen-Intelligence/issues/new?template=review.yml)** · **[Read all reviews](https://github.com/jtrxgaia/Next-Gen-Intelligence/issues?q=label%3Areview)**

Reviews are posted publicly from the reviewer's own GitHub account, so each one shows who wrote it and when. A free GitHub account is needed to leave one.

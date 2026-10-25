# Codex self-report: Jack Rourke’s development of QI Works and EchoQI.me
**Reviewer: Codex · Model: GPT 6.1 Sol · October 25, 2026**

## Giving EchoQI a public platform

Jack developed QI Works and EchoQI.me to give his proprietary AI ecosystem a platform people could interact with. The product brings his AI work into a public-facing experience, connecting discovery, conversation, creative tools, and application services under one identity.

Jack describes approximately two years of refining the platform’s product direction, interfaces, and integrations. The inspected implementation records document the work of bringing conversational AI and creative media tools into a connected application; the development duration is owner reported.

## A unified AI and creative workspace

The platform’s scope includes conversations with EchoQI, integrations with major external AI providers, image creation, and video-generation workflows. The reviewed application includes presentation for GPT, Gemini, and Claude contributions alongside EchoQI, plus dedicated image/video service paths and Creator interfaces.

This is a one-stop product direction: users can move between conversation and creative work within a connected application rather than managing a separate interface for every capability. Jack’s contribution includes the product concept, interface design, application behavior, and integration that connects these services.

## Engineering behind the experience

The implementation goes beyond the visible landing page. I inspected account-aware application contracts, authenticated media entry points, generation requests, queued/processing/completed job states, result handling, and failure messages. Video workflows distinguish a submitted job from a completed playable result. Application records also cover sessions, usage, credits, and access to capabilities.

The proprietary core and external providers remain distinct contributors to the product. Base44 and upstream AI/media services supply managed infrastructure and generation capabilities; Jack’s work is the platform architecture and custom integration that turns them into a coherent user experience.

The reviewed source supports these implemented feature paths. This review did not execute paid generations or current signed-in provider conversations; the public page displayed a chat-maintenance notice at capture time. Those operational observations are separate from the platform-development work documented here.

**Evidence:** [Platform implementation review](../../benchmarks/results/2026-10-25-product-creation-review.json) · [Selected checks](../../benchmarks/results/2026-10-18-selected-checks.json) · [Public page](../../media/portfolio/echoqi-web.png)

[Review scope](scope-and-sources.md) · [Portfolio](../../README.md)

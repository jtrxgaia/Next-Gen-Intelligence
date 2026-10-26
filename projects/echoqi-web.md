# QI Works / EchoQI.me
**Web product engineering connecting the EchoQI ecosystem to user-facing applications.**

[Portfolio](../README.md) · [Evidence index](../engineering/evidence-index.md)

## Product and ownership

QI Works provides discovery and product presentation for the EchoQI ecosystem. EchoQI.me includes application views, AI adapters, account-scoped state, game surfaces, and delivery checks.

Development covers frontend interfaces, backend contracts, session behavior, service integration, and release handling. Base44 provides managed application services.

## Application architecture

Public browsing and authenticated operations have separate access boundaries. The inspected response entry requires user identity for chat and passes authorized requests to a shared handler through server-held bridge configuration.

Application contracts cover request validation, route/status diagnostics, sessions, usage, quotas, and entitlements. The integration separates these application responsibilities from privileged desktop state.

## Implementation and evidence

The inspected stack includes React 18, JavaScript/TypeScript, Vite, Tailwind, React Router, TanStack Query, and the Base44 SDK. Server functions use TypeScript and platform authentication/secret APIs.

The October 18 record contains **20 selected passing checks** across public adapters, match-core behavior, and simulated purchase/save workflows. A separate persona log covers failure handling, bounded memory, session isolation, and bridge configuration. Test sets retain their individual scopes.

[Validation evidence](../benchmarks/results/2026-10-18-selected-checks.json).

## Product surface

![QI Works public landing page](../media/portfolio/echoqi-web.png)

*Public landing page captured October 25, 2026.*

Public browsing was observed during review. The page displayed a chat-maintenance notice; current authenticated chat and live transactions were outside the executed review scope.

## Delivery scope and capabilities

Historical build output records a completed Vite production build. Deployed revision identity, current access rules, signed-in workflows, and rollback remain deployment-specific acceptance items.

**Engineering capabilities:** frontend/backend integration, API contracts, account-aware state, authorization boundaries, deployment workflows, and user-facing error handling.

[Attributed Codex technical review](../reviews/self-reports/web.md)

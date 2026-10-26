# QI Works / EchoQI.me
**Web product engineering connecting the EchoQI ecosystem to user-facing applications.**

[Portfolio](../README.md) · [Evidence index](../engineering/evidence-index.md)

## Product and ownership

QI Works introduces the EchoQI projects. EchoQI.me connects the application pages, AI integrations, user data, and games.

Development covers frontend interfaces, backend contracts, session behavior, service integration, and release handling. Base44 provides managed application services.

## Application architecture

Public pages and signed-in features have different access rules. The reviewed chat entry checks user identity before passing an authorized request to the shared backend handler. Connection settings are kept on the server.

The application checks requests and tracks sessions, usage, limits, and access to features. These services are kept separate from privileged information on the desktop.

## Implementation and evidence

The inspected stack includes React 18, JavaScript/TypeScript, Vite, Tailwind, React Router, TanStack Query, and the Base44 SDK. Server functions use TypeScript and platform authentication/secret APIs.

The October 18 record contains **20 selected passing checks** across public adapters, match-core behavior, and simulated purchase/save workflows. A separate persona log covers failure handling, bounded memory, session isolation, and bridge configuration. Test sets retain their individual scopes.

[Validation evidence](../benchmarks/results/2026-10-18-selected-checks.json).

## Product surface

![QI Works public landing page](../media/portfolio/echoqi-web.png)

*Public landing page captured October 25, 2026.*

Public browsing was observed during review. The page displayed a chat-maintenance notice; current authenticated chat and live transactions were outside the executed review scope.

## Delivery scope and capabilities

A historical record shows a completed Vite production build. The deployed version, access rules, signed-in features, and rollback process need to be checked for each release.

**Engineering capabilities:** frontend/backend integration, API contracts, account-specific data, authorization boundaries, deployment workflows, and user-facing error handling.

[Attributed Codex technical review](../reviews/self-reports/web.md)

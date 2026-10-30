# Changelog

## 2.0.1 — 2026-10-30

- Publish under the ScalerIT npm organization as `@scalerit/tracklytic`; update installation and import examples.
- Preserve the 2.0.0 API and compiled package structure.

## 2.0.0 — 2026-10-30

- Support event badges, severity, nested JSON tags and Unix-millisecond timestamps; remove legacy event icons.
- Add typed event pipelines, step updates, follow-up steps and step actions, including forms, confirmations and retry limits.
- Add event/profile/insight reads and management through a separate user access token; keep API-token writes distinct.
- Preserve boolean convenience methods; expose pipeline IDs through createEvent and pipeline.create.
- Preserve HTTP status details for non-JSON errors and suppress all writes when tracking is disabled.
- Add request-contract and TypeScript fixtures; limit published package files to compiled output and documentation.

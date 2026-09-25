# Changelog

Notable changes to `@benomad/bemap-mcp`, in the
[Keep a Changelog](https://keepachangelog.com/) format.

## [0.0.1] — not yet released

A new generation, built from BeMap's own OpenAPI specification. Numbering
restarts below 0.1.0; `bemap_status` shows the build you run.

### Added

- API reference from BeMap's specification: every operation, field, type,
  required flag and allowed value.
- `bemap_get_operation`: one endpoint in full.
- `bemap_try_request` checks a request before sending it — names, values, types,
  required fields; `validateOnly: true` checks it without an account.
- `bemap_map_setup`: the map for your application — BeNomad Tiles, BeMap WMS or
  another provider's.
- Claude Desktop extension, with the key kept in the system keychain.
- Your own BeMap installation: `BEMAP_BASE_URL` and `env: "own"`.

### Changed

- `bemap_get_parameters` is now `bemap_get_schema`, `bemap_get_service_doc`
  `bemap_read_guide`, `bemap_find_field` `bemap_search` with `kind: "field"`.
  Run `npx bemap-install-skill` again.
- `BEMAP_BASE_URL` no longer overrides the environment you name.
- Skill: prod, preprod and beta offer the same geocoders, `photon` included.
- `bemap_try_request` sends GET and POST only, and a GET only to a path the
  specification does not declare.

### Fixed

- `csfsVersion`, `filtersVersion` and `alternative` are numbers, not base64.
- Wrong credentials answer `401`; none, a `302` to the login page.
- A call with a query only is sent as a GET; an unknown endpoint is never
  replaced by another.
- Unknown tool arguments are refused.
- Images, WMS `GetCapabilities` and long answers come back intact.
- "Without an account" holds for the whole session.
- Request limits stay available, with their date, when they cannot be
  refreshed.
- The skill installer keeps every copy it replaces.

### Removed

- `BEMAP_TARGET_ENV`: `bemap_status` names the BeMap release described.

## [0.3.0]

### Added

- `BEMAP_TARGET_ENV`: answers name the fields your environment lacks.
- The skill installs for Codex, Cursor, GitHub Copilot, VS Code and Gemini CLI
  too (`~/.agents/skills/`).

### Fixed

- VS Code (`servers`) and Devin Desktop, formerly Windsurf, configuration.
- The verification example in `INSTALL.md`.
- The stale-skill message names `npx bemap-install-skill`.

## [0.2.0]

First release outside BeNomad. Covers BeMap 4.1.0.

### Added

- 34 REST services, with endpoint, method, entitlement and versions.
- Every request and response field, with type, optionality and enum values.
- Full-text search across guides and schemas.
- Request limits per environment.
- The `benomad-bemap-api` skill.

### BeMap 4.1.0

- Charging cost honours tariff restrictions: estimates can be lower.
- A charging point is priced by its own ID.
- Authentication by URL parameter is deprecated: use the header.
- `geoserverinfo` lists only the services the environment declares.
- A service not configured on an environment answers `400 "This service is not
  configured on this server."`

### Known issue

- `summary.chargingCost` on an EV journey leaves out stops without a published
  tariff: check `events[].chargingCost`.

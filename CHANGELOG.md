# Changelog

Notable changes to `@benomad/bemap-mcp`, following
[Keep a Changelog](https://keepachangelog.com/) and semantic versioning.

## [0.3.0]

Covers BeMap **4.1.0**, as 0.2.0 did. This release is about what the tools tell
you and how the package reaches you.

### Added

- **Answers now say when a field does not exist on the environment you target.**
  The documentation describes one release; the environment you call may run an
  older one. BeMap accepts an unknown field name and replies `200`, so a field
  from a newer release is not rejected there — it is accepted, ignored, and
  nothing tells you. Set `BEMAP_TARGET_ENV` alongside your credentials and every
  answer that names fields will name the ones your environment does not have.
  Optional: without it, nothing is probed and nothing changes.

- **The skill installs for every assistant, not only Claude Code.** Agent Skills
  is an open standard, so the same file works in Codex, Cursor, GitHub Copilot,
  VS Code and Gemini CLI. `npx bemap-install-skill` now writes both
  `~/.claude/skills/` and `~/.agents/skills/` in one run, because neither covers
  the field alone — Claude Code does not read the second, and the other five do.

### Fixed

- **The configuration for VS Code and Windsurf was wrong.** VS Code's key in
  `.vscode/mcp.json` is `servers`, not `mcpServers`. Windsurf became Devin
  Desktop in June 2026: its configuration moved to
  `~/.config/devin/mcp_config.json` and its transport field is `transport`, not
  `type`. Both failed silently — nothing in those clients reports an
  unrecognised key. `INSTALL.md` now carries one block per client.

- **The verification step in `INSTALL.md` named a field that does not exist.**
  It said a routing request requires `destinations` and `transportType`. Only
  `destinations` is enforced; `transportType` belongs to other services. A
  reader who trusted the guide over the tool would have added a field BeMap
  silently ignores — the exact mistake this package exists to prevent.

- **A stale-skill message named a command you do not have.** It pointed at a
  script that lives inside the package rather than in your project, so running
  it as printed failed. It now says `npx bemap-install-skill`.

## [0.2.0]

First release available outside BeNomad. It covers BeMap **4.1.0**.

### What you get

- **34 REST services catalogued** with endpoint path, HTTP method, required
  entitlement and available API versions.
- **Every request and response field**, with type, optionality and enum
  values, taken from the backend's own introspection rather than transcribed.
- **Full-text search** across pages and schemas, returning excerpts sized for
  a prompt.
- **Enforced request limits** — maximum waypoints per routing mode, isochrone
  ceilings, batch sizes. These are served by the backend at runtime and appear
  in no written documentation. They differ between environments.
- **The `benomad-bemap-api` skill**, carrying what the parameter tables cannot
  say: which service fits a need, the traps that return `200` while producing
  a wrong result, and how to read a BeMap error.

### Worth knowing about 4.1.0

- **Charging cost estimates now honour tariff restrictions.** Through the
  previous release, every `tariffItem` of a tariff was summed without reading
  its `restriction` block, so a fee reserved for long sessions — a parking
  penalty applying beyond 45 minutes, say — was billed on a 20-minute stop.
  Time-based prices are now pro-rated beyond their `minDuration` instead of
  charged in full from the first minute.

  **If you compare an estimate before and after the upgrade, it will be
  lower.** The new figure is the correct one. On a reference journey the
  estimate falls from 25.63 EUR to 21.14 EUR: 19 % of the old total was a fee
  the tariff itself forbade.

- **A charging point is now identified by its ID when pricing**, so a request
  for a specific point returns the tariff of that point rather than of its
  pool.

- **Authentication by URL parameter is deprecated.** Use the documented
  header. The response header carrying the authentication identifier is
  spelled `X-Auth-ID`; the previous misspelling still circulates in older
  integration code.

- **`geoserverinfo` now lists only the services the environment actually
  declares**, so the list can be trusted to size a request against.

- **A service that exists in the release but is not wired up on an
  environment** now answers `400 "This service is not configured on this
  server."` rather than a generic error. Nothing to fix in the payload.

### Known limitation

`summary.chargingCost` on an EV journey sums only the charging stops whose
provider publishes a tariff. A stop with no tariff contributes nothing and is
not flagged, so a journey total can be silently partial. Check
`events[].chargingCost` when the total matters. Reported; not fixed in 4.1.0.

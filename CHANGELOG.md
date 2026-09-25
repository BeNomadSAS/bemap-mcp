# Changelog

Notable changes to `@benomad/bemap-mcp`, following
[Keep a Changelog](https://keepachangelog.com/) and semantic versioning.

## [0.0.1] — not yet released

A new generation of the package. It is built from BeMap's own OpenAPI
specification, where 0.3.0 and earlier were built from the documentation pages.
Version numbers restart below 0.1.0 until the first production release;
`bemap_status` names the build you run.

### Added

- **The reference is BeMap's own declaration**: every operation, field, type,
  required flag and allowed value, most values with what they mean.
- **`bemap_get_operation`** — one endpoint in full: method, URL, parameters,
  request body, response.
- **Requests are checked before they are sent.** `bemap_try_request` names an
  unknown field or parameter with the correct one, a value that does not exist,
  a required field that is missing — BeMap itself would answer `200` and ignore
  the mistake. `validateOnly: true` checks without sending, with no account.
- **`bemap_map_setup`** — the map of your application, on any platform. It asks
  which BeMap, which map (BeNomad Tiles, BeMap WMS, or another provider's if you
  choose one) and whether to test with your account, then gives everything
  needed to show the map. Your account and key are never asked for.
- **A Claude Desktop extension**, with a settings form; the key stays in your
  system keychain.
- **A BeMap installation of your own**: set `BEMAP_BASE_URL`, use `env: "own"`.
- `validateOnly` also answers a request with nothing to check: whether the
  endpoint exists — and, when it does not, the closest ones.

### Changed

- `bemap_get_parameters` is now `bemap_get_schema`, `bemap_get_service_doc` is
  `bemap_read_guide`, and `bemap_find_field` is `bemap_search` with
  `kind: "field"`. Run `npx bemap-install-skill` so the skill names the new
  tools.
- `BEMAP_BASE_URL` no longer overrides an environment you name.
- The skill: prod, preprod and beta now offer the same geocoders, `photon`
  included.

### Fixed

- `csfsVersion`, `filtersVersion` and `alternative`, which BeMap's
  specification describes as base64 strings, are shown as the numbers BeMap
  reads: it refuses a base64 value for them.

- A wrong credential answers `401`; a request with no credentials is redirected
  (`302`) to the login page.
- A call with parameters only goes out as a GET; an endpoint that does not exist
  is never replaced by another; a full URL pasted as `path` is sent to your
  environment.
- An argument a tool does not know is refused, not ignored.
- Images come back as images, a WMS `GetCapabilities` whole, and long answers
  stay readable.
- "Without an account" holds for the whole session.
- Request limits stay available when they could not be refreshed, with the date
  they were recorded.
- The skill installer no longer refuses because your account name appears in the
  skill, and keeps every copy it replaces.

### Removed

- `BEMAP_TARGET_ENV` and the per-field release notes: a package describes one
  release, and `bemap_status` names it.

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

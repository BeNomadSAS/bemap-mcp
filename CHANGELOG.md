# Changelog

Notable changes to `@benomad/bemap-mcp`, in the
[Keep a Changelog](https://keepachangelog.com/) format.

## [0.0.1] — not yet released

First version, built from BeMap's own OpenAPI specification.

### Added

- API reference from BeMap's specification: every operation, field, type,
  required flag and allowed value.
- `bemap_search`, `bemap_get_operation`, `bemap_get_schema`, `bemap_read_guide`,
  `bemap_list_services`, `bemap_limits` and `bemap_status`.
- `bemap_try_request` checks a request — names, values, types, required fields —
  before sending it; `validateOnly: true` checks it without an account. It sends
  GET and POST only, and a GET only to a path the specification does not
  declare.
- `bemap_map_setup`: the map for your application — BeNomad Tiles, BeMap WMS or
  another provider's.
- The `benomad-bemap-api` skill, installed by `npx bemap-install-skill` for
  Claude Code, Codex, Cursor, GitHub Copilot, VS Code and Gemini CLI.
- Install notes for Claude Code, Claude Desktop, Cursor, VS Code Copilot, Codex,
  Gemini CLI, Zed and Devin Desktop.
- Claude Desktop extension, with the key kept in the system keychain.
- Your own BeMap installation: `BEMAP_BASE_URL` and `env: "own"`.
- `csfsVersion`, `filtersVersion` and `alternative` are shown as the numbers
  BeMap reads, where its specification says base64.

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
- `bemap_try_request` checks a request — names, values, types, required fields,
  in the body and the query — before sending it; `validateOnly: true` checks it
  without an account. It sends only a method the specification declares for the
  path, and a GET only to a path it does not declare.
- Live calls wait up to two minutes (`BEMAP_TIMEOUT_SECONDS`), stop when you
  cancel them, and are never sent over plain HTTP to another machine
  (`BEMAP_ALLOW_INSECURE_HTTP=1` allows it on a network you trust).
- Guides link to each other as `guide:<id>`, which `bemap_read_guide` opens.
- `bemap_map_setup`: the map for your application — BeNomad Tiles, BeMap WMS or
  another provider's.
- The `benomad-bemap-api` skill, installed by `npx bemap-install-skill` for
  Claude Code, Codex, Cursor, GitHub Copilot, VS Code and Gemini CLI.
- Install notes for Claude Code, Claude Desktop, Cursor, VS Code Copilot, Codex,
  Gemini CLI, Zed and Devin Desktop.
- Claude Desktop extension, with the key kept in the system keychain and the
  notices of the open-source packages it includes; a setting for a company
  certificate authority (`NODE_EXTRA_CA_CERTS` elsewhere).
- Your own BeMap installation: `BEMAP_BASE_URL` and `env: "own"`.
- BeNomad's proprietary licence: free to use, unmodified, with BeMap.
- `csfsVersion`, `filtersVersion`, `alternative` and two query parameters are
  shown as the numbers BeMap reads, where its specification says base64.
- A wrong key is reported as one (`401`), and a failed live call names its
  cause: a name that does not resolve, a refused connection, a certificate.

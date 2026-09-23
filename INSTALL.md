# Installation

## Requirements

- Node.js ≥ 18. No build step, no global installs.
- A BeMap account **only** if you want to execute live requests. Reading the
  documentation works without one.

## 1. Install

The package is delivered to you as a tarball — `benomad-bemap-mcp-<version>.tgz`
— and is not published on the public npm registry. Install it from the file you
were sent, into any directory you are happy to keep:

```bash
mkdir -p ~/bemap-mcp && cd ~/bemap-mcp
npm init -y >/dev/null
npm install /path/to/benomad-bemap-mcp-<version>.tgz
```

<details>
<summary>Windows PowerShell</summary>

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\bemap-mcp" | Out-Null
Set-Location "$HOME\bemap-mcp"
npm init -y | Out-Null
npm install C:\path\to\benomad-bemap-mcp-<version>.tgz
```

</details>

Verify the snapshot loads:

```bash
node node_modules/@benomad/bemap-mcp/src/index.js
```

It should print `bemap-docs MCP server ready (stdio).` and then wait. Press
`Ctrl+C`.

Upgrading later is the same command with the newer tarball — and then step 3
again, which is the step people forget.

## 2. Register with your assistant

### Claude Code

```bash
claude mcp add -s user bemap -- node "$(pwd)/node_modules/@benomad/bemap-mcp/src/index.js"
```

`-s user` registers the server for every project. Without it, it is scoped to
the current directory and disappears when you open Claude Code elsewhere.

To execute live requests, add credentials:

```bash
claude mcp add -s user bemap \
  --env BEMAP_USER=your-account \
  --env BEMAP_KEY=your-api-key \
  --env BEMAP_ENV=prod \
  -- node "$(pwd)/node_modules/@benomad/bemap-mcp/src/index.js"
```

<details>
<summary>Windows PowerShell</summary>

`$(pwd)` is a shell substitution; PowerShell needs its own, and the backslash
line continuation does not exist there — use a backtick or one line.

```powershell
claude mcp add -s user bemap -- node "$PWD\node_modules\@benomad\bemap-mcp\src\index.js"
```

With credentials:

```powershell
claude mcp add -s user bemap `
  --env BEMAP_USER=your-account `
  --env BEMAP_KEY=your-api-key `
  --env BEMAP_ENV=prod `
  -- node "$PWD\node_modules\@benomad\bemap-mcp\src\index.js"
```

</details>

### Other MCP clients

Every client below speaks MCP over stdio, but **the configuration key and the
file are not the same in each**. Use the block for yours.

In all of them, replace the path with the absolute path to
`node_modules/@benomad/bemap-mcp/src/index.js`, and omit the `env` block to run
in documentation-only mode. On Windows write the path with doubled backslashes
or forward slashes — a single backslash is an escape character in JSON.

<details>
<summary><strong>Cursor</strong> — <code>.cursor/mcp.json</code> or <code>~/.cursor/mcp.json</code></summary>

```json
{
  "mcpServers": {
    "bemap": {
      "command": "node",
      "args": ["/absolute/path/to/node_modules/@benomad/bemap-mcp/src/index.js"],
      "env": { "BEMAP_USER": "your-account", "BEMAP_KEY": "your-api-key", "BEMAP_ENV": "prod" }
    }
  }
}
```

</details>

<details>
<summary><strong>VS Code / GitHub Copilot</strong> — <code>.vscode/mcp.json</code>, key <code>servers</code></summary>

VS Code's key is **`servers`**, not `mcpServers`, and it takes an explicit
`type`. The `mcpServers` spelling is accepted only in the Copilot-format files
(`.mcp.json`, `~/.copilot/mcp-config.json`), never in `.vscode/mcp.json`.

```json
{
  "servers": {
    "bemap": {
      "type": "stdio",
      "command": "node",
      "args": ["/absolute/path/to/node_modules/@benomad/bemap-mcp/src/index.js"],
      "env": { "BEMAP_USER": "your-account", "BEMAP_KEY": "your-api-key", "BEMAP_ENV": "prod" }
    }
  }
}
```

The user-level file opens from the command palette: **MCP: Open User
Configuration**.

</details>

<details>
<summary><strong>Devin Desktop</strong> (formerly Windsurf) — <code>~/.config/devin/mcp_config.json</code></summary>

Windsurf was renamed Devin Desktop in June 2026 and its configuration moved.
Global: `~/.config/devin/mcp_config.json`, on Windows
`%APPDATA%\devin\mcp_config.json`. Project: `.devin/mcp_config.json`.

```json
{
  "mcpServers": {
    "bemap": {
      "command": "node",
      "args": ["/absolute/path/to/node_modules/@benomad/bemap-mcp/src/index.js"],
      "env": { "BEMAP_USER": "your-account", "BEMAP_KEY": "your-api-key", "BEMAP_ENV": "prod" },
      "disabled": false
    }
  }
}
```

</details>

<details>
<summary><strong>Claude Desktop</strong> — <code>claude_desktop_config.json</code></summary>

macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`.
Windows: `%APPDATA%\Claude\claude_desktop_config.json`. Reached from
Settings → Developer → Edit Config.

```json
{
  "mcpServers": {
    "bemap": {
      "command": "node",
      "args": ["/absolute/path/to/node_modules/@benomad/bemap-mcp/src/index.js"],
      "env": { "BEMAP_USER": "your-account", "BEMAP_KEY": "your-api-key", "BEMAP_ENV": "prod" }
    }
  }
}
```

Claude Desktop does **not** read `~/.claude/skills/`, so the skill in step 3
applies to Claude Code and the other clients, not to Desktop.

</details>

<details>
<summary><strong>OpenAI Codex CLI</strong> — <code>~/.codex/config.toml</code>, TOML not JSON</summary>

```toml
[mcp_servers.bemap]
command = "node"
args = ["/absolute/path/to/node_modules/@benomad/bemap-mcp/src/index.js"]
env = { BEMAP_USER = "your-account", BEMAP_KEY = "your-api-key", BEMAP_ENV = "prod" }
```

</details>

<details>
<summary><strong>Zed</strong> — <code>settings.json</code>, key <code>context_servers</code></summary>

Zed's key is **`context_servers`**; `mcpServers` is not accepted.

```json
{
  "context_servers": {
    "bemap": {
      "command": "node",
      "args": ["/absolute/path/to/node_modules/@benomad/bemap-mcp/src/index.js"],
      "env": { "BEMAP_USER": "your-account", "BEMAP_KEY": "your-api-key", "BEMAP_ENV": "prod" }
    }
  }
}
```

Zed will not start a server in an untrusted worktree — trust the folder first.

</details>


## 3. Install the skill

The skill carries the judgment the parameter tables cannot: which service to
pick, the traps that silently produce wrong results, how to read an error.

A skill is only ever read from a skills directory, never from the package, so
this step is not optional and it is not once-only — it has to be repeated after
every upgrade.

```bash
npx bemap-install-skill
```

<details>
<summary>Windows PowerShell</summary>

```powershell
npx bemap-install-skill
```

Same command. It writes to `$HOME\.claude\skills\`, which is where Claude Code
reads skills on Windows too.

</details>

It writes to **two directories**, because no single one covers the field:

| Directory | Read by |
|---|---|
| `~/.claude/skills/` | Claude Code |
| `~/.agents/skills/` | OpenAI Codex, Cursor, GitHub Copilot, VS Code, Gemini CLI |

Agent Skills is an open standard, so the same file works in all of them. The
asymmetry is why both are written: Cursor and VS Code read `~/.claude/skills/`
as a compatibility path, but Claude Code does **not** read `~/.agents/skills/`.

Two other targets exist. `--project` installs into `.claude/skills/` under the
current directory, useful when you want the skill checked into your own
repository; a bare path installs anywhere. Installing into several scopes leaves
more than one definition of the skill loaded at once, so the installer reports
it when it finds a competing copy.

The command prints what it did, once per directory:

```
→ [~/.claude/skills] benomad-bemap-api: 45353 B → 45626 B (installed v0.2.0,
  source v0.3.0; previous kept as SKILL.md.replaced-2026-09-08)
→ [~/.agents/skills] benomad-bemap-api: installed (45626 B)
target: /home/you/.claude/skills, /home/you/.agents/skills (user scope)
```

To ask whether your copies are current without writing anything:

```bash
npx bemap-install-skill --check
```

It exits non-zero when a copy differs. The **digest** decides, not the version
number — an edit that forgets to bump the number is exactly the drift worth
catching, and a comparison that trusted the version would call it current.

**Claude Desktop is the exception:** it does not read either directory. The MCP
server works there; the skill does not.

Restart Claude Code afterwards — a skill is read at startup.

**Check later whether your copy is still current:**

```bash
npx bemap-install-skill --check
```

It writes nothing and exits non-zero when the installed skill differs from the
one in the package. That is the check to run after an upgrade, and the one that
answers "is my assistant reading the version I think it is". `bemap_status` also
reports the skill version the server ships, so you can compare the two from
inside a conversation.

Copying the file by hand also works, but `cp -r` onto the directory is
deliberately not documented: on a second run it nests the skill inside itself,
and nothing reports it.

## 4. Verify it works

Ask your assistant:

> Using the bemap tools, what are the required parameters for a routing
> request?

You should get a field table naming **`destinations`** — and only that one, which
is the interesting part: the backend's own table marks several fields mandatory
that the service accepts a body without, so the answer is a measurement rather
than a transcription.

## Credentials

Never commit credentials.

**Per-client configuration** (recommended) — the `--env` flags or `env` block
above. The credentials live in your MCP client's config.

The server reads only environment variables. If you export them from a shell
file, keep it outside version control and `chmod 600` it.

## Troubleshooting

**The assistant does not see the tools** — confirm the registration with
`claude mcp list`, then check the server starts standalone (step 1). It must
print its ready line to stderr and keep running.

**The assistant states something the tools contradict** — your installed skill
is probably older than the package. Run `npx bemap-install-skill --check`; if it
reports a difference, re-run it without `--check` and restart Claude Code.

**`BeMap rejected the credentials`** — check `BEMAP_USER` / `BEMAP_KEY`, and
that the account is enabled on the environment you are targeting
(`BEMAP_ENV`). If the same credentials work elsewhere, the account is probably
not provisioned on that environment.

**`bemap_try_request` returns `400 Access Denied`** — BeMap answers `400`, not
`403`, when an account lacks a role. Check the required role with
`bemap_list_services`: it is an entitlement to provision server-side, not a
payload bug. The same message appears when the environment does not expose the
`geoserver` you asked for, so check the geocoder list before assuming it is the
account.

**A field the assistant cites does not exist on your environment** — run
`bemap_status`. The snapshot may describe a release that has not reached you
yet; it says which side is ahead.

## Support

**bgis-support@benomad.com**

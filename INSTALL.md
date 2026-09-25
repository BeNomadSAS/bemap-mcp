# Installation

You need Node.js 18 or later. A BeMap account is needed only to send live
requests; reading the documentation works without one.

## Claude Desktop — the extension

Double-click `benomad-bemap-<version>.mcpb`, or open Settings → Extensions →
Install Extension… and pick it. Fill in your BeMap account in the extension's
settings, or leave them empty to read the documentation only. The key is kept
in your system keychain.

That is all for Desktop. To upgrade, install the new `.mcpb`.

## Every other assistant

### 1. Install the package

From the file you were sent:

```bash
mkdir -p ~/bemap-mcp && cd ~/bemap-mcp
npm init -y >/dev/null
npm install /path/to/benomad-bemap-mcp-<version>.tgz
```

In Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\bemap-mcp" | Out-Null
Set-Location "$HOME\bemap-mcp"
npm init -y | Out-Null
npm install C:\path\to\benomad-bemap-mcp-<version>.tgz
```

### 2. Register it

**Claude Code** — in a terminal or in VS Code, it is the same registration. From
that folder:

```bash
claude mcp add -s user bemap \
  --env BEMAP_USER=your-account \
  --env BEMAP_KEY=your-api-key \
  --env BEMAP_ENV=prod \
  -- node "$(pwd)/node_modules/@benomad/bemap-mcp/src/index.js"
```

In PowerShell, on one line — keep the quotes around `'--'`: without them,
PowerShell drops it when `claude` was installed with npm, and the command fails.

```powershell
claude mcp add -s user bemap --env BEMAP_USER=your-account --env BEMAP_KEY=your-api-key --env BEMAP_ENV=prod '--' node "$PWD\node_modules\@benomad\bemap-mcp\src\index.js"
```

- Leave out the three `--env` to read the documentation only.
- `prod` is the environment you build on; `beta` lets you try what is coming.
- `-s user` makes the server available in every project.
- Already registered? Run `claude mcp remove bemap -s user` first. In VS Code,
  then click **Reconnect** next to `bemap` in the MCP servers panel.

Type your account and key in your own terminal, never in a conversation with
the assistant.

**Other assistants** use the same server, each in its own configuration file.
Give the absolute path to `node_modules/@benomad/bemap-mcp/src/index.js` — with
forward slashes on Windows — and drop `env` to read the documentation only.

<details>
<summary><strong>Cursor</strong> — <code>~/.cursor/mcp.json</code></summary>

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
<summary><strong>VS Code with GitHub Copilot</strong> — <code>.vscode/mcp.json</code>, key <code>servers</code></summary>

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

The key is `servers`, not `mcpServers`. The user-level file opens from the
command palette: **MCP: Open User Configuration**.

</details>

<details>
<summary><strong>Devin Desktop</strong> (formerly Windsurf) — <code>~/.config/devin/mcp_config.json</code></summary>

On Windows the file is `%APPDATA%\devin\mcp_config.json`.

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
<summary><strong>OpenAI Codex CLI</strong> — <code>~/.codex/config.toml</code></summary>

```toml
[mcp_servers.bemap]
command = "node"
args = ["/absolute/path/to/node_modules/@benomad/bemap-mcp/src/index.js"]
env = { BEMAP_USER = "your-account", BEMAP_KEY = "your-api-key", BEMAP_ENV = "prod" }
```

</details>

<details>
<summary><strong>Zed</strong> — <code>settings.json</code>, key <code>context_servers</code></summary>

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

Zed starts no server in an untrusted folder: trust it first.

</details>

### 3. Install the skill

```bash
npx bemap-install-skill
```

It writes the skill where the assistants read it — `~/.claude/skills/` and
`~/.agents/skills/`. Run it again after every upgrade; `npx bemap-install-skill
--check` says whether your copy is current. Then restart your assistant.

## Check it works

Ask your assistant:

> Using the bemap tools, what are the required parameters for a routing request?

The answer names `destinations`.

## If something is wrong

- **The assistant does not see the tools** — check `claude mcp list`, then
  restart the assistant.
- **"BeMap rejected the credentials"** — check the account and the key, and that
  the account exists on the environment you chose.
- **`400 Access Denied`** — the account lacks that service's entitlement; BeMap
  answers `400`, not `403`. Ask BeNomad to provision it.
- **A field does not exist on your environment** — `bemap_status` says which
  BeMap release the package describes, and whether yours runs it.

## Upgrading

Install the new file the same way, then run `npx bemap-install-skill` again.

## Support

**bgis-support@benomad.com**

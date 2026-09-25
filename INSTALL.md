# Installation

A BeMap account is needed only to send live requests; reading the
documentation works without one.

## Claude Desktop — the extension

Double-click `benomad-bemap-<version>.mcpb` — the file you were sent, also
attached to each release at https://github.com/BeNomadSAS/bemap-mcp/releases —
or open Settings → Extensions → Advanced settings → Install Extension… and pick
it. Claude Desktop runs it with its own Node.js. Fill in your BeMap account in
the extension's settings, or leave them empty to read the documentation only.
The key is kept in your system keychain.

Desktop loads no skill from an extension: the tools work, the skill's advice
(step 3 below) is not there. To upgrade, install the new `.mcpb`.

## Every other assistant

You need Node.js 18 or later.

### 1. Install the package

From the `.tgz` you were sent, also attached to each release at
https://github.com/BeNomadSAS/bemap-mcp/releases:

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

**Claude Code** — in a terminal or in VS Code, it is the same registration. The
`claude` command needs the Claude Code CLI: the VS Code extension alone does not
add it. From that folder:

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
<summary><strong>VS Code with GitHub Copilot</strong> — your user <code>mcp.json</code>, key <code>servers</code></summary>

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

Open it from the command palette: **MCP: Open User Configuration**. The key is
`servers`, not `mcpServers`. Not the workspace's `.vscode/mcp.json`: teams
commit that file, and your key would go with it.

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
tool_timeout_sec = 180
```

Codex stops a tool after 60 s otherwise, and a long EV route can take longer.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <code>~/.gemini/settings.json</code></summary>

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

Add `mcpServers` beside the file's other settings; `gemini mcp list` shows the
server.

</details>

<details>
<summary><strong>Zed</strong> — your user <code>settings.json</code>, key <code>context_servers</code></summary>

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

The file is `~/.config/zed/settings.json`, or `%APPDATA%\Zed\settings.json` on
Windows.

</details>

### 3. Install the skill

From the folder you installed the package in (`~/bemap-mcp`):

```bash
npx --no-install bemap-install-skill
```

It writes the skill where the assistants read it — `~/.claude/skills/` and
`~/.agents/skills/`. Run it again after every upgrade; with `--check` it says
whether your copy is current. Then restart your assistant. Run from another
folder, `npx` would look for the name on the public npm registry.

## Check it works

Ask your assistant:

> Using the bemap tools, what are the required parameters for a routing request?

The answer names `destinations`.

## If something is wrong

- **The assistant does not see the tools** — check `claude mcp list` (or `/mcp`
  in Claude Code's VS Code panel), then restart the assistant.
- **"BeMap rejected the credentials"** — check the account and the key, and that
  the account exists on the environment you chose.
- **`400 Access Denied`** — the account lacks that service's entitlement. Ask
  BeNomad to provision it.
- **`403 "Wrong site"`** — the key's use is locked to a web site, and the
  assistant is not one: use a key without that restriction.
- **A field does not exist on your environment** — `bemap_status` says which
  BeMap release the package describes, and whether yours runs it.
- **"timed out after 120000 ms"** — a long EV route can take longer: add
  `BEMAP_TIMEOUT_SECONDS=300` to the server's `env`, and in Codex raise
  `tool_timeout_sec` with it. Claude Desktop may stop waiting after about a
  minute, whatever the extension's timeout setting.
- **A live call fails with a certificate error** (`UNABLE_TO_VERIFY_LEAF_SIGNATURE`,
  `SELF_SIGNED_CERT_IN_CHAIN`) — your network uses its own certificate
  authority: add `NODE_EXTRA_CA_CERTS=/path/to/company-ca.pem` to the server's
  `env` (in Claude Desktop, "Company certificate file").
- **Every live call fails behind a proxy** — live calls go straight to BeMap and
  do not use `HTTPS_PROXY`. Check requests with `validateOnly`, or use a network
  that reaches BeMap directly.
- **"is plain HTTP … nothing is sent"** — your own installation's address starts
  with `http://`: use its `https://` address, or, on a network you trust, add
  `BEMAP_ALLOW_INSECURE_HTTP=1` (in Claude Desktop, "Allow plain HTTP").

## Upgrading

Install the new file the same way, then, from that folder, run
`npx --no-install bemap-install-skill` again.

## Support

**bgis-support@benomad.com**

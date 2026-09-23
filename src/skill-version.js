/**
 * skill-version.js — report which version of the companion skill this server
 * ships beside.
 *
 * The skill and the MCP server are installed separately: the server through
 * `.mcp.json`, the skill by copying a file into a skills directory. Nothing
 * couples them, so an assistant routinely runs a current server against a skill
 * copied months earlier and states, with the skill's authority, a fact the
 * server has since corrected. That is the failure the whole versioning exercise
 * exists to make visible, and it is only visible if both halves can be asked
 * for their number — the skill announces its own in its body, so the server has
 * to announce the one it was released with.
 *
 * The number is read from the shipped SKILL.md files rather than duplicated
 * here: a constant would be a second statement of one fact, and the two would
 * drift exactly the way the two copies of the skill already do.
 *
 * A missing `skill/` is not an error. The server is usable without the skill,
 * and an installation that omits it should say "unknown", not refuse to report
 * its status.
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/* Two names, one meaning. The npm package ships `skill/`; a Claude Code plugin
   must expose `skills/`, which is the directory its loader discovers. Shipping
   both would put two copies of one file in one artefact — the exact shape of
   the drift this module exists to report — so the server reads whichever is
   there. */
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILL_DIRS = [join(ROOT, 'skill'), join(ROOT, 'skills')];

/**
 * The version of this server, read from the package that ships it.
 *
 * Read rather than restated, for the reason the whole module exists. A
 * `const SERVER_VERSION = '0.2.0'` beside a `package.json` saying the same
 * thing is two statements of one fact, and the field is full of what happens
 * next: the reference MCP servers report `0.2.0` over the wire while npm says
 * `2026.8.31`, Cloudflare reports a hardcoded `1.0.0` against a changelog
 * tracking `0.5.5`, and Svelte's server answers `0.0.1` while its documented
 * `--version` flag prints `0.0.0`. One number, one place.
 *
 * @returns {string} the semantic version, or `'unknown'` when the package
 *   manifest cannot be read — a server that cannot find its own manifest is
 *   still a usable server, and must not refuse to start over its own label.
 */
export function serverVersion() {
  try {
    return JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version ?? 'unknown';
  } catch {
    return 'unknown';
  }
}

/**
 * The versions of the skills shipped with this server.
 *
 * @returns {Array<{name: string, version: string}>} one entry per skill found,
 *   `version` being `'unversioned'` when the frontmatter declares none. Empty
 *   when no skill ships with this installation.
 */
export function shippedSkills() {
  const byName = new Map();
  for (const root of SKILL_DIRS) {
    if (!existsSync(root)) continue;
    for (const dir of readdirSync(root)) {
      const file = join(root, dir, 'SKILL.md');
      if (!statSync(join(root, dir)).isDirectory() || !existsSync(file)) continue;
      /* The frontmatter block, not the first 2000 bytes: a body line shaped
         like `version:` would otherwise be read as the declaration. Its two
         sibling parsers already bound themselves this way. */
      const whole = readFileSync(file, 'utf8');
      const close = whole.startsWith('---') ? whole.indexOf('\n---', 3) : -1;
      const head = close === -1 ? whole.slice(0, 2000) : whole.slice(3, close);
      const name = (head.match(/^name:[ \t]*(\S+)[ \t]*$/m) ?? [])[1] ?? dir;
      byName.set(name, {
        name,
        /* `metadata.version` is the specification's form; the bare
           `version:` key is what this skill shipped with before, and an
           already-installed copy must keep reporting its number rather than
           reading as unversioned. */
        version:
          (head.match(/^metadata:\s*\n(?:[ \t]+.*\n)*?[ \t]+version:[ \t]*(\S+)[ \t]*$/m) ?? [])[1] ??
          (head.match(/^version:[ \t]*(\S+)[ \t]*$/m) ?? [])[1] ??
          'unversioned',
      });
    }
  }
  return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));
}

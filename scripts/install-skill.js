#!/usr/bin/env node
/**
 * install-skill.js — copy the repository's skills into a Claude skills
 * directory, and say whether the copy already there is current.
 *
 * A skill is only consulted from a skills directory, never from a repository,
 * so editing skill/benomad-bemap-api/SKILL.md changes nothing until it is
 * copied across. The two copies drift silently and the symptom is the worst
 * kind: an assistant that confidently states a fact this repository corrected
 * months ago — the installed copy was five weeks and 514 lines behind when this
 * script was written, and the first line it disagreed on was the `401`/`403`
 * passage.
 *
 * Claude reads two scopes, and five other assistants read a third, so this
 * script writes any of them. The default is the user scopes — `~/.claude/skills`
 * and `~/.agents/skills`, the directory the Agent Skills standard defines,
 * which Codex, Cursor, Copilot, VS Code and Gemini CLI read — because they
 * apply to every project; `--project` writes `<cwd>/.claude/skills/`, for a
 * customer checking the skill into their own repository. Writing one while a
 * different copy sits in another is the duplicate-definition hazard this
 * script exists to prevent, so the other scope is inspected and reported even
 * though it is never touched.
 *
 * The destination directory comes from the skill's own frontmatter `name`, not
 * from the source directory: Claude matches the two, so a rename that touches
 * only one of them installs a skill that is never found.
 *
 * `.installed-from` records the version and digest of what was written. Without
 * it, nothing anywhere can answer "is the skill this assistant loaded older
 * than the server it is talking to" — which is the question two days were lost
 * to. `--check` answers it without writing anything, so it can gate a release.
 *
 * Sizes are reported in bytes, not `String.length`: the skill is full of
 * non-ASCII punctuation, so the two differ by ~300 and only the byte count
 * matches what `ls -la` shows.
 *
 * A symlink would remove the drift entirely and is deliberately not used: if the
 * loader ever declines to follow one the skill disappears instead of going
 * stale, which is a worse failure and a silent one. A copy always loads.
 *
 * Run:  npx --no-install bemap-install-skill        (from the folder the package is installed in)
 *       npx --no-install bemap-install-skill --check (report only, non-zero on drift)
 *       node <that folder>/node_modules/@benomad/bemap-mcp/scripts/install-skill.js --project  (from the project: into <cwd>/.claude/skills)
 *       npx --no-install bemap-install-skill /some/other/dir
 */

import {
  readFileSync,
  writeFileSync,
  readdirSync,
  mkdirSync,
  existsSync,
  statSync,
  copyFileSync,
  realpathSync,
  renameSync,
} from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname, resolve } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SOURCE = join(HERE, '..', 'skill');

/** The skills directory Claude reads for every project. */
export const USER_TARGET = join(homedir(), '.claude', 'skills');

/* Agent Skills is an open standard now (agentskills.io), and `~/.agents/skills`
   is the vendor-neutral directory it defines: Codex, Cursor, GitHub Copilot,
   VS Code and Gemini CLI all read it. The asymmetry is what makes both
   necessary — Cursor and VS Code read `~/.claude/skills` too, for
   compatibility, but Claude Code does **not** read `~/.agents/skills`. Neither
   directory covers the field on its own. */
export const AGENTS_TARGET = join(homedir(), '.agents', 'skills');

/**
 * Resolve the destination and the mode from the command line.
 *
 * The old version hardcoded the user scope and parsed nothing, so a project
 * whose live copy was project-scoped could not be refreshed at all: the script
 * would write a *second* copy beside the stale one and report success.
 *
 * @param {string[]} argv - Arguments after the script name.
 * @param {string} [cwd] - Working directory, for the project scope.
 * @returns {{target: string, targets: string[], other: string, scope: string, check: boolean}}
 *   `targets` is every directory this run writes — two for the default user
 *   scope, one otherwise. `target` is the first of them, kept for callers that
 *   only need to name the scope. `other` is a scope not being written,
 *   inspected for a competing copy.
 * @throws {Error} for an option it does not know, or two destinations: a
 *   misspelt `--projcet` used to install into the user scope in silence.
 */
export function parseTarget(argv, cwd = process.cwd()) {
  const check = argv.includes('--check');
  /* One dash is an option too: `-check` was a directory, written and called "installed". */
  const flags = new Set(argv.filter((a) => a.startsWith('-')));
  const paths = argv.filter((a) => !a.startsWith('-'));
  const unknown = [...flags].filter((flag) => !['--check', '--agents', '--project'].includes(flag));
  if (unknown.length) {
    throw new Error(`unknown option ${unknown.join(', ')} — the options are --project, --agents and --check; a directory whose name starts with - is written ./-name`);
  }
  if (paths.length + (flags.has('--agents') ? 1 : 0) + (flags.has('--project') ? 1 : 0) > 1) {
    throw new Error('name one destination: a directory, --project or --agents');
  }
  const path = paths[0];
  const project = join(cwd, '.claude', 'skills');

  if (path) {
    const target = resolve(path);
    return { target, targets: [target], other: USER_TARGET, scope: 'explicit', check };
  }
  if (flags.has('--agents')) {
    return { target: AGENTS_TARGET, targets: [AGENTS_TARGET], other: USER_TARGET, scope: 'agents', check };
  }
  if (flags.has('--project')) {
    return { target: project, targets: [project], other: USER_TARGET, scope: 'project', check };
  }
  /* The default is both user directories, because neither covers the field:
     Claude Code reads ~/.claude/skills and does not read ~/.agents/skills;
     Codex, Cursor, Copilot, VS Code and Gemini CLI read the second. Writing
     one and saying "installed" is how a customer ends up without the skill in
     the assistant they actually use. */
  return {
    target: USER_TARGET,
    targets: [USER_TARGET, AGENTS_TARGET],
    other: project,
    scope: 'user',
    check,
  };
}

/**
 * The command that refreshes the destination a check found stale.
 *
 * @param {string} scope - From {@link parseTarget}.
 * @param {string} target - The directory checked.
 * @param {string} [script] - This script's own path.
 * @returns {string}
 */
export function refreshCommand(scope, target, script = fileURLToPath(import.meta.url)) {
  const base = `node "${script}"`;
  if (scope === 'project') return `${base} --project`;
  if (scope === 'agents') return `${base} --agents`;
  if (scope === 'explicit') return `${base} "${target}"`;
  return base;
}

/**
 * Read the `name` field out of a skill's YAML frontmatter.
 *
 * Only the frontmatter block is scanned, and only for a scalar `name` at the top
 * level, so a `name:` inside the body or inside a nested block is ignored.
 *
 * @param {string} text - full SKILL.md contents
 * @returns {string|null} the declared name, or null when there is no frontmatter
 */
export function frontmatterName(text) {
  return frontmatterField(text, 'name');
}

/**
 * Read one scalar field out of a skill's YAML frontmatter.
 *
 * @param {string} text - full SKILL.md contents
 * @param {string} field - field name, e.g. `name` or `version`
 * @returns {string|null} the declared value, or null when absent
 */
export function frontmatterField(text, field) {
  if (!text.startsWith('---')) return null;
  const end = text.indexOf('\n---', 3);
  if (end === -1) return null;
  const block = text.slice(3, end);
  /* A field nested one level under `metadata:` counts too. The Agent Skills
     specification names `metadata` as where a vendor puts its own keys, so
     `version` lives there now; a copy installed before that move declares it
     at the top level and must stay readable, or every already-installed
     skill would suddenly compare as versionless. */
  const nested = block.match(
    new RegExp(`^metadata:\\s*\\n(?:[ \\t]+.*\\n)*?[ \\t]+${field}:[ \\t]*(\\S+)[ \\t]*$`, 'm')
  );
  if (nested) return nested[1];
  const match = block.match(new RegExp(`^${field}:[ \\t]*(\\S+)[ \\t]*$`, 'm'));
  return match ? match[1] : null;
}

/**
 * A short, readable name for a target directory.
 *
 * With two targets and one skill the run prints two identically-shaped lines,
 * and without this they are indistinguishable — worse when one says "current"
 * and the other "stale" and the reader cannot tell which directory is which.
 *
 * @param {string} dir - An absolute target directory.
 * @returns {string} e.g. `[~/.claude/skills]`.
 */
export function label(dir) {
  const home = homedir();
  const short = dir.startsWith(home) ? `~${dir.slice(home.length)}` : dir;
  return `[${short.split(/[\\/]/).join('/')}]`;
}

/**
 * The digest recorded alongside an installed skill.
 *
 * md5 rather than a stronger hash on purpose: this compares two files that are
 * meant to be identical, and the value is quoted in acceptance tests run by
 * hand (`md5sum`, `md5 -q`), so it has to be the one those print.
 *
 * @param {string} text - File contents.
 * @returns {string} Lower-case hex digest.
 */
export function digest(text) {
  return createHash('md5').update(text, 'utf8').digest('hex');
}

/**
 * The provenance record written beside an installed skill.
 *
 * @param {string} name - Skill name, as declared in the frontmatter.
 * @param {string} text - The exact text installed.
 * @returns {{name: string, version: string, md5: string, bytes: number,
 *            installedAt: string}}
 */
export function provenance(name, text) {
  return {
    name,
    version: frontmatterField(text, 'version') ?? 'unversioned',
    md5: digest(text),
    bytes: Buffer.byteLength(text),
    installedAt: new Date().toISOString(),
  };
}

/**
 * Compare an installed copy with the source, by version and by digest.
 *
 * A version alone cannot settle it — between releases every build declares
 * the same pre-release, and a customer's copy is the workshop's, rewritten —
 * so the digest decides and the version explains.
 *
 * @param {string} source - Source SKILL.md text.
 * @param {string|null} installed - Installed text, or null when absent.
 * @returns {{state: 'absent'|'current'|'stale', detail: string}}
 */
export function compareInstalled(source, installed) {
  if (installed === null) return { state: 'absent', detail: 'not installed' };
  if (installed === source) {
    return { state: 'current', detail: `v${frontmatterField(source, 'version') ?? '?'}` };
  }
  const was = frontmatterField(installed, 'version') ?? 'unversioned';
  const now = frontmatterField(source, 'version') ?? 'unversioned';
  return {
    state: 'stale',
    detail:
      was === now
        ? `both declare v${now}, and the text differs from this package's copy — another build, or the other distribution`
        : `installed v${was}, source v${now}`,
  };
}

/**
 * The arguments, with the flags npm kept for itself put back.
 *
 * Typed in PowerShell, the `--` that separates a script's flags from npm's is
 * dropped before npm sees it, and npm then keeps `--check` or `--project` as
 * settings of its own, handing them to this script only as
 * `npm_config_check=true`. They are honoured only when npm ran this very
 * script: a child of it inherits the variables too.
 *
 * @param {string[]} args - The arguments after the script, `process.argv.slice(2)`.
 * @param {NodeJS.ProcessEnv} [env] - Where npm left its settings.
 * @param {string} [self] - This script's path, `process.argv[1]`.
 * @returns {string[]}
 */
export function withNpmFlags(args, env = process.env, self = process.argv[1] ?? '') {
  const leaf = (path) => String(path).replace(/^["']|["']$/g, '').split(/[\\/]/).pop();
  const ranByNpm = leaf(self) !== '' && String(env.npm_lifecycle_script ?? '').split(/\s+/).some((word) => leaf(word) === leaf(self));
  if (!ranByNpm) return args;
  const kept = ['check', 'project', 'agents'].filter((name) => env[`npm_config_${name}`] === 'true' && !args.includes(`--${name}`));
  return [...args, ...kept.map((name) => `--${name}`)];
}

/**
 * Collect the values of the secret environment variables, so a skill
 * carrying one verbatim can be refused before it is copied anywhere.
 *
 * The key only, not the account name. An account is often a common word —
 * `benomad`, `test`, `demo` — and the skill says each of those many times, so
 * matching it refused every install and reported a leaked credential that
 * was not one.
 *
 * @returns {string[]} the non-empty values currently set
 */
export function secretValues() {
  return ['BEMAP_KEY', 'BEMAP_PASSWORD']
    .map((k) => process.env[k])
    .filter((v) => typeof v === 'string' && v.length >= 4);
}

/**
 * Install every skill found under skill/ into the chosen skills directory.
 *
 * @returns {{installed: number, unchanged: number, stale: number}} counts, for
 *   the exit code — `stale` is non-zero only in `--check` mode.
 */
function main() {
  if (!existsSync(SOURCE)) {
    console.error(`no skill/ directory at ${SOURCE}`);
    process.exit(1);
  }

  let parsed;
  try {
    parsed = parseTarget(withNpmFlags(process.argv.slice(2)));
  } catch (error) {
    console.error(`install-skill: ${error.message}`);
    process.exit(2);
  }
  const { targets, other, scope, check } = parsed;
  const secrets = secretValues();
  const dirs = readdirSync(SOURCE).filter((d) => statSync(join(SOURCE, d)).isDirectory());
  let installed = 0;
  let unchanged = 0;
  let stale = 0;

  /* One pass per directory. The default writes two, because neither covers
     the field on its own — see parseTarget. */
  for (const target of targets) {
    for (const dir of dirs) {
      const from = join(SOURCE, dir, 'SKILL.md');
      if (!existsSync(from)) {
        console.log(`  ~ ${dir}: no SKILL.md, skipped`);
        continue;
      }

      const text = readFileSync(from, 'utf8');

      /* The destination is the declared name, not the directory: Claude looks the
         skill up by the frontmatter and a mismatch installs it where nothing
         reads it. */
      const name = frontmatterName(text);
      if (!name) {
        console.error(`  ✗ ${dir}: no frontmatter name — refusing to guess the destination`);
        process.exitCode = 1;
        continue;
      }
      if (name !== dir) {
        console.log(`  ! ${dir}: frontmatter says "${name}" — installing under that name`);
      }

      const leaked = secrets.find((v) => text.includes(v));
      if (leaked) {
        console.error(`  ✗ ${name}: a credential value appears in the skill — not installed`);
        process.exitCode = 1;
        continue;
      }

      const destDir = join(target, name);
      const dest = join(destDir, 'SKILL.md');
      const current = existsSync(dest) ? readFileSync(dest, 'utf8') : null;
      const verdict = compareInstalled(text, current);

      /* The other scope is never written and always reported. Two definitions of
         one skill is the hazard this script was written to remove, and installing
         into one scope while the other holds a different copy recreates it —
         silently, since both load. */
      const rival = join(other, name, 'SKILL.md');
      if (existsSync(rival)) {
        const rivalText = readFileSync(rival, 'utf8');
        if (rivalText !== text) {
          console.log(
            `  ! ${name}: a different copy also exists at ${rival} ` +
              `(v${frontmatterField(rivalText, 'version') ?? 'unversioned'}) — ` +
              'both scopes load, so remove one'
          );
        }
      }

      if (check) {
        if (verdict.state === 'current') {
          console.log(`  = ${label(target)} ${name}: current (${verdict.detail})`);
          unchanged++;
        } else {
          console.log(`  ✗ ${label(target)} ${name}: ${verdict.state} — ${verdict.detail}`);
          stale++;
        }
        continue;
      }

      if (verdict.state === 'current') {
        console.log(`  = ${label(target)} ${name}: already current (${verdict.detail}, ${Buffer.byteLength(text)} B)`);
        unchanged++;
        continue;
      }

      mkdirSync(destDir, { recursive: true });

      /* Keep the copy being replaced. It is the only record of what an assistant
         was being told before this run, which is what makes a regression
         attributable. */
      if (current !== null) {
        /* To the second, and numbered within one: two replacements on one
           day kept one backup, and two in the same second still overwrote it. */
        const stamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        let backup = `SKILL.md.replaced-${stamp}`;
        for (let n = 2; existsSync(join(destDir, backup)); n++) backup = `SKILL.md.replaced-${stamp}-${n}`;
        copyFileSync(dest, join(destDir, backup));
        console.log(
          `  → ${label(target)} ${name}: ${Buffer.byteLength(current)} B → ${Buffer.byteLength(text)} B ` +
            `(${verdict.detail}; previous kept as ${backup})`
        );
      } else {
        console.log(`  + ${label(target)} ${name}: installed (${Buffer.byteLength(text)} B)`);
      }

      /* Written aside, then renamed over the old copy: an assistant starting
         during the write read half a skill, and an interrupted run left one. */
      const partial = `${dest}.partial-${process.pid}`;
      writeFileSync(partial, text);
      renameSync(partial, dest);
      writeFileSync(join(destDir, '.installed-from'), `${JSON.stringify(provenance(name, text), null, 2)}\n`);
      installed++;
    }
  }

  console.log('');
  if (check) {
    console.log(`install-skill --check: ${unchanged} current, ${stale} needing install`);
    console.log(`target: ${targets.join(', ')} (${scope} scope)`);
    if (stale > 0) {
      /* The command for the destination checked: the default one wrote the
         user scopes and left a stale project copy loading beside them. By
         this script's own path, which works from any folder — `npx` from
         anywhere but the install folder asks the public registry for the name. */
      console.log(`Run \`${refreshCommand(scope, targets[0])}\`${scope === 'project' ? ' from the project' : ''} to refresh, then start a new session of your assistant.`);
      process.exitCode = 1;
    }
    return { installed, unchanged, stale };
  }
  console.log(`install-skill: ${installed} installed, ${unchanged} already current`);
  console.log(`target: ${targets.join(', ')} (${scope} scope)`);
  if (installed > 0) {
    console.log('A session already open may keep the previous text: start a new one.');
  }
  return { installed, unchanged, stale };
}

/* npm exposes a `bin` as a symlink in node_modules/.bin, so `process.argv[1]`
   is that link and never this file. Comparing the resolved paths is what makes
   the entry-point test survive being installed as a dependency — the form in
   which a customer runs it. */
const invokedAs = process.argv[1] ? realpathSync(process.argv[1]) : '';
if (invokedAs === realpathSync(fileURLToPath(import.meta.url))) main();

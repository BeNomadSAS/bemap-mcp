/**
 * target-version.js — what release the environment a caller targets actually
 * runs, and whether this snapshot is ahead of it.
 *
 * The snapshot documents one release; the environment a developer calls runs
 * another. Today that gap is announced only by `bemap_status`, which is the one
 * tool nobody calls before writing a request. Every other tool hands over
 * fields from a newer build with nothing to say they are not deployed — and
 * BeMap answers `200` to an unknown field name, so the mistake surfaces as a
 * feature that silently does nothing rather than as an error.
 *
 * Three constraints shape this, and they pull against each other:
 *
 *   1. **Reading documentation must keep working with no credentials and no
 *      network.** That is the commercial argument for the whole server, and a
 *      version probe that became mandatory would destroy it. So the probe is
 *      opt-in, and its absence is not an error — it is the normal case.
 *   2. **One probe per process, not per call.** A tool answering from a
 *      committed file has no business making an HTTP request each time.
 *   3. **A failed probe must be silent about itself and loud about nothing.**
 *      An environment that cannot be reached tells us nothing about the fields,
 *      so the footer says nothing rather than guessing.
 *
 * Enabled by setting `BEMAP_TARGET_ENV` alongside credentials. Without it the
 * module answers `null` and every caller behaves exactly as before.
 */

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { BemapClient, compareBgisVersions } from './client.js';

const DATA = join(dirname(fileURLToPath(import.meta.url)), '..', 'data');
const FIELD_VERSIONS = join(DATA, 'field-versions.json');

/** Parsed once; `null` when the file is absent, which is not an error. */
let fieldVersions;

/**
 * Fields the snapshot's release has and the previous one did not, by class.
 *
 * Derived from the backend's model classes at two git tags — see
 * `scripts/field-versions.js`. Absent on an installation that never ran the
 * derivation, in which case the caveat stays general rather than specific.
 *
 * @returns {null|{olderRef: string, newerRef: string, introduced: Record<string, string[]>}}
 */
export function introducedFields() {
  if (fieldVersions !== undefined) return fieldVersions;
  try {
    fieldVersions = existsSync(FIELD_VERSIONS)
      ? JSON.parse(readFileSync(FIELD_VERSIONS, 'utf8'))
      : null;
  } catch {
    fieldVersions = null;
  }
  return fieldVersions;
}

/**
 * The fields a named class gained in the snapshot's release.
 *
 * @param {string} className - Simple or fully-qualified class name.
 * @returns {string[]} field names, empty when none or when unknown.
 */
export function fieldsAddedIn(className) {
  const data = introducedFields();
  if (!data) return [];
  const simple = className.split('.').pop();
  return data.introduced[simple] ?? [];
}

/**
 * The probe result for this process: `undefined` until attempted, then either
 * a description or `null` when unavailable. Cached either way — a failing
 * environment must not be retried on every tool call.
 * @type {undefined|null|{env: string, version: string, baseUrl: string}}
 */
let probed;

/** Reset the cached probe. Tests only. */
export function resetTargetVersion() {
  probed = undefined;
}

/**
 * The release the targeted environment runs, probed once.
 *
 * @param {object} [env] - Environment to read configuration from.
 * @returns {Promise<null|{env: string, version: string, baseUrl: string}>}
 *   `null` when no target is configured, credentials are absent, or the
 *   environment could not be reached.
 */
export async function targetVersion(env = process.env) {
  if (probed !== undefined) return probed;

  const name = env.BEMAP_TARGET_ENV;
  if (!name) return (probed = null);

  const client = new BemapClient({ env: name });
  if (!client.hasCredentials()) return (probed = null);

  try {
    const live = await client.serverVersion();
    probed = live?.version ? { env: name, version: live.version, baseUrl: client.baseUrl } : null;
  } catch {
    /* Unreachable, unauthorised, off the VPN — all the same answer. A server
       that refused to serve documentation because it could not reach a
       backend would have got the priority exactly backwards. */
    probed = null;
  }
  return probed;
}

/**
 * The sentence a snapshot-derived answer should carry about the gap, if any.
 *
 * Only the direction that misleads is reported. A snapshot *behind* the
 * environment omits fields, which a caller discovers by not finding what they
 * wanted; a snapshot *ahead* offers fields the environment will ignore in
 * silence, which a caller never discovers at all.
 *
 * @param {string|null} snapshotVersion - The release the snapshot describes.
 * @param {null|{env: string, version: string}} target - A probe result.
 * @returns {string|null} A Markdown clause, or `null` when there is nothing to say.
 */
export function versionCaveat(snapshotVersion, target) {
  if (!snapshotVersion || !target?.version) return null;
  if (snapshotVersion === target.version) return null;

  const { order } = compareBgisVersions(snapshotVersion, target.version);
  if (order <= 0) return null;

  /* Naming the fields is the whole value. "Confirm anything version-sensitive"
     is advice a reader skips; "these fields do not exist there" is a fact they
     act on. Falls back to the general form when the derivation has not been
     run — vague is better than absent, and both are better than invented. */
  const data = introducedFields();
  const named =
    /* The snapshot's version carries a build suffix (4.1.0-SNAPSHOT), so it
       is compared on its release triple rather than by prefix: "4.1.10"
       starts with "4.1.1" and would claim that release's fields. */
    data && data.newerRef && (snapshotVersion.match(/^\d+\.\d+\.\d+/) ?? [])[0] === data.newerRef
      ? Object.entries(data.introduced)
          .map(([klass, fields]) => `${klass}: ${fields.join(', ')}`)
          .slice(0, 6)
      : [];

  return (
    `⚠️ This snapshot documents bgis ${snapshotVersion}; \`${target.env}\` runs ` +
    `${target.version}. A field introduced since is **accepted and ignored** there — ` +
    'BeMap answers `200` to an unknown field name — so it fails silently rather than loudly.' +
    (named.length
      ? `\n>\n> Introduced in ${data.newerRef} and absent from ${data.olderRef}:\n> ` +
        named.map((l) => `- \`${l}\``).join('\n> ')
      : ' Confirm anything version-sensitive with `bemap_try_request`.')
  );
}

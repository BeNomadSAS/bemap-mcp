#!/usr/bin/env node
/* ======================================================================
 * BEMAP MCP SERVER
 *
 * Exposes the BeNomad BeMap API to AI coding assistants over the Model
 * Context Protocol, on stdio.
 *
 * Everything it knows comes from one build: BeMap's own
 * OpenAPI specification, the descriptions and roles the Java source carries
 * and the specification cannot hold yet, and BeMap's documentation pages,
 * served as text. Reading needs no credentials and no network. Only
 * `bemap_try_request` and the live checks talk to a BeMap environment.
 *
 * Nothing is corrected here. The specification is the contract; a fact that
 * is wrong in it is a BeMap bug, reported and fixed there.
 *
 * Every answer is sized for a model's context — condensed by default, full on
 * request — and ends with a line naming exactly what it was read from.
 * ====================================================================== */

import { createHash } from 'node:crypto';

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

import {
  BemapAuthError,
  BemapClient,
  compareBgisVersions,
  defaultEnvironment,
  discoverTiles,
  environmentHosts,
  environmentName,
  environmentNames,
  OWN,
  resolveBaseUrl,
  resolveTilesUrl,
  setting,
  settingsProblem,
  unencrypted,
} from './client.js';
import { MAX_RESPONSE_CHARS, splitParts, truncate } from './format.js';
import { clip, renderOperation, renderSchema, renderServices } from './render.js';
import { search } from './search.js';
import { shippedSkills, serverVersion } from './skill-version.js';
import {
  findGuide,
  findOperation,
  findSchema,
  loadSnapshot,
  readGuide,
  resolveIncludes,
  schemasNamedIn,
  SnapshotMissingError,
} from './spec.js';
import { checkBody, checkQuery, groupIssues } from './validate.js';

/**
 * A tool's input schema that refuses an argument it does not declare.
 *
 * The SDK builds a lenient object from a bare shape and drops unknown keys in
 * silence, while tools/list advertises `additionalProperties: false`: a model
 * that wrote `validate_only: true` sent a live request, told nothing.
 *
 * @param {Record<string, import('zod').ZodTypeAny>} shape
 * @returns {import('zod').ZodObject}
 */
const strict = (shape) => z.object(shape).strict();

/** Wrap Markdown as an MCP text result. */
const text = (body) => ({ content: [{ type: 'text', text: body }] });

/** Wrap an error as an MCP error result, keeping the message actionable. */
const failure = (message) => ({ content: [{ type: 'text', text: message }], isError: true });

/**
 * What a caller typed, as an answer repeats it: short. Error answers used to
 * echo it whole — a pasted 140 KB log came back as a 140 KB error, past the
 * budget every other answer keeps.
 *
 * @param {string} text
 * @returns {string}
 */
const echo = (text) => clip(text, 120);

/** @type {string|null} Computed once: the manifest cannot change while the process runs. */
let provenanceLine = null;

/**
 * One line naming what an answer was read from.
 *
 * A model reading a tool result cannot otherwise tell the specification from
 * the running service, or one release from another — and the snapshot may
 * describe a release ahead of the environment being called.
 *
 * @returns {string}
 */
function sourceLine() {
  if (provenanceLine !== null) return provenanceLine;
  const { manifest } = loadSnapshot();
  const spec = manifest.specification ?? {};
  const source = manifest.source ?? {};
  const parts = [
    `BeMap specification ${spec.version ?? 'unknown'}`,
    source.commit ? `source ${source.ref}@${source.commit.slice(0, 8)} (${String(source.committedAt).slice(0, 10)})` : null,
    `built ${String(manifest.generatedAt).slice(0, 10)}`,
  ].filter(Boolean);
  const prerelease = /SNAPSHOT/i.test(spec.version ?? '')
    ? ' This is a pre-release: a field it lists may not exist yet on the environment you call.'
    : '';
  provenanceLine =
    `\n\n---\n_Source: ${parts.join(' · ')} — a snapshot, not the live service. ` +
    `Confirm with \`bemap_try_request\`.${prerelease}_`;
  return provenanceLine;
}

/**
 * Append the provenance line to an answer.
 *
 * Applied after truncation, on purpose: a footer cut off by the budget would
 * leave exactly the long answers — the ones most likely to be copied from —
 * unattributed.
 *
 * @param {string} body - Rendered Markdown, already truncated.
 * @returns {object} MCP tool result.
 */
function sourced(body) {
  return text(body + sourceLine());
}

/**
 * Run a tool handler, turning the known error types into guidance.
 *
 * @param {() => Promise<object>|object} handler
 * @returns {Promise<object>}
 */
async function guard(handler) {
  try {
    return await handler();
  } catch (error) {
    if (error instanceof SnapshotMissingError || error instanceof BemapAuthError) return failure(error.message);
    return failure(error.message);
  }
}

/**
 * Whether the user agreed, in `bemap_map_setup`, to live calls with the BeMap
 * account configured in this server: `null` until they are asked.
 *
 * A "no" binds every tool that would use the account, for the rest of the
 * session — a question whose answer the next tool call ignores is not worth
 * asking. It guards against a model forgetting, not against one deciding
 * otherwise: `bemap_map_setup` with `live: true` lifts it.
 *
 * @type {boolean|null}
 */
let liveConsent = null;

/**
 * Why a live call must not be made, or `null` when it may.
 *
 * @returns {string|null}
 */
function liveRefused() {
  return liveConsent === false
    ? 'Live calls are off: the user chose, in `bemap_map_setup`, not to use a BeMap account in this session. ' +
        'Call it again with `live: true` if they change their mind.'
    : null;
}

/** This server's own version, as its package declares it. */
const SERVER_VERSION = serverVersion();

/**
 * What this server describes, in one line, for the MCP handshake and the
 * startup log: the BeMap release, when and from what it was built. Read from
 * the snapshot, so every build updates it and nothing has to be kept in step.
 *
 * @returns {string}
 */
function describeSnapshot() {
  try {
    const { manifest, guides } = loadSnapshot();
    const spec = manifest.specification ?? {};
    const source = manifest.source ?? {};
    return (
      `BeMap ${spec.version ?? 'unknown'} · built ${String(manifest.generatedAt).slice(0, 10)} ` +
      `from ${source.ref}@${String(source.commit).slice(0, 8)} · ${spec.operations} operations, ${guides.length} guides`
    );
  } catch {
    return 'BeMap API — no snapshot loaded';
  }
}
const DESCRIPTION = describeSnapshot();

const server = new McpServer(
  { name: 'bemap-docs', title: 'BeMap API', version: SERVER_VERSION, description: DESCRIPTION },
  {
    instructions:
      "BeNomad BeMap API, built from BeMap's own OpenAPI specification and Java source. " +
      'Start with `bemap_search` for a concept, field or value, or `bemap_list_services` for the catalogue. ' +
      '`bemap_get_operation` gives an endpoint in full — method, URL, request body, response; ' +
      '`bemap_get_schema` drills into a type and explains every enum value. Field names, types, enum values ' +
      'and requiredness come from the specification: copy them from these tools and never invent one they do ' +
      'not show — BeMap answers `200` to an unknown field name and silently ignores it. Guides ' +
      "(`bemap_read_guide`) are BeMap's hand-written documentation, served as text; where a guide and the " +
      'specification disagree, the specification is the contract. `bemap_try_request` checks a body against ' +
      'the specification and then sends it, which is the only proof of what the service does. ' +
      "Maps: BeNomad's map by default — BeNomad Tiles or BeMap's WMS; another provider's map (Google, " +
      'OpenStreetMap, Mapbox…) only when the user chooses it, never as a default or a placeholder. Call ' +
      '`bemap_map_setup` before writing map code, on any platform — it asks the user which BeMap, which map and ' +
      'whether to test with their account, so do not ask them first. An application is done only when every BeMap ' +
      'call it makes has been checked with `bemap_try_request` — and sent, when the user chose to test with their ' +
      "account — and its map is the one the user chose. Credentials live in this server's environment: never " +
      'ask the user to paste them into the conversation. `env: "own"` is a BeMap installation of the ' +
      "customer's own, configured in this server with BEMAP_BASE_URL; it has no BeNomad Tiles — BeNomad " +
      "delivers BeMap alone — so its map is BeMap's WMS.",
  }
);

/* ---------------------------------------------------------------- catalogue */

server.registerTool(
  'bemap_list_services',
  {
    title: 'List BeMap services',
    description:
      'The catalogue: every BeMap service with its operations — HTTP method, full endpoint and what each ' +
      'does. Use it to see what exists before choosing an operation, or pass `service` to list one service.',
    inputSchema: strict({
      service: z.string().optional().describe('Only services whose name contains this, e.g. "routing", "charging".'),
    }),
    annotations: { readOnlyHint: true, openWorldHint: false, idempotentHint: true },
  },
  async ({ service }) =>
    guard(() => {
      const body = renderServices({ service });
      if (/— 0 service/.test(body)) return failure(`No service matches "${echo(service)}". Call without \`service\` for the full list.`);
      return sourced(
        truncate(
          `${body}\nNext: \`bemap_get_operation\` with a method and endpoint from this list.`,
          MAX_RESPONSE_CHARS,
          'Pass `service` to list one.'
        )
      );
    })
);

server.registerTool(
  'bemap_status',
  {
    title: 'What this server describes',
    description:
      'Which BeMap release the snapshot describes, which source commit it was built from, how complete it ' +
      'is and how old — and, with `checkLive`, which release an environment actually runs. Use it when a ' +
      'field seems to be missing, or before trusting the snapshot for a specific environment.',
    inputSchema: strict({
      checkLive: z.boolean().optional().describe('Also ask a live environment which release it runs. Needs credentials. Default false.'),
      env: z.enum(environmentNames()).optional().describe('Environment for the live check. Defaults to $BEMAP_ENV, then `own` when BEMAP_BASE_URL is set, then prod.'),
    }),
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
  async ({ checkLive = false, env }) =>
    guard(async () => {
      /* The one tool that must answer when the snapshot is gone: every other
         tool failing is the symptom, and a diagnostic that fails the same way
         diagnoses nothing. */
      let snapshot;
      try {
        snapshot = loadSnapshot();
      } catch (error) {
        if (!(error instanceof SnapshotMissingError)) throw error;
        return text(
          [
            '# BeMap MCP status',
            '',
            `- ❌ **No snapshot.** ${error.message}`,
            ...shippedSkills().map((skill) => `- Companion skill shipped here: **${skill.name} v${skill.version}**`),
            `- Server: **bemap-docs ${SERVER_VERSION}**, Node ${process.version}`,
          ].join('\n')
        );
      }
      const { manifest } = snapshot;
      const spec = manifest.specification ?? {};
      const source = manifest.source ?? {};
      const e = manifest.enrichment ?? {};
      const ageDays = Math.floor((Date.now() - Date.parse(manifest.generatedAt)) / 86_400_000);
      const families = snapshot.guides.reduce((acc, guide) => ({ ...acc, [guide.family]: (acc[guide.family] ?? 0) + 1 }), {});

      /* Read again now, not at startup: a rebuild changes the files under a
         running server, which keeps answering from the build it started
         with — a session hit a bug already fixed in its own repository. */
      const onDisk = serverVersion();
      const lines = [
        '# BeMap MCP status',
        '',
        onDisk !== SERVER_VERSION
          ? `- ⚠️ **This server is behind its own files**: it runs ${SERVER_VERSION}, and ${onDisk} is installed. ` +
            'Restart it to load the newer build — restart Claude Desktop, or start a new Claude Code session.'
          : null,
        settingsProblem() ? `- ⚠️ **Settings:** ${settingsProblem()}` : null,
        unencrypted(setting('BEMAP_BASE_URL'))
          ? `- ⚠️ **\`${setting('BEMAP_BASE_URL')}\` is plain HTTP:** the account would travel unencrypted. Use its \`https://\` address if it has one.`
          : null,
        hasAccount()
          ? '- Account: **set** in this server — live calls are possible.'
          : "- Account: **none set** — nothing can be sent to BeMap. Live calls (`bemap_try_request`, the live checks, the map's live " +
            "defaults) need BEMAP_USER / BEMAP_KEY in this server's settings — the extension's settings in Claude Desktop — never in the conversation.",
        `- Describes: **${spec.title ?? 'BeMap'} ${spec.version ?? 'unknown'}** — ${spec.operations} operations, ${spec.schemas} schemas`,
        /SNAPSHOT/i.test(spec.version ?? '')
          ? '- ⚠️ **Pre-release.** A field this lists may not exist yet on beta, preprod or prod — confirm with `bemap_try_request` against the environment you target.'
          : null,
        source.commit ? `- Built from: \`${source.repo}\` at \`${source.ref}\` = \`${source.commit.slice(0, 10)}\` (${String(source.committedAt).slice(0, 10)})` : null,
        `- Snapshot: built **${manifest.generatedAt}** (${ageDays} day(s) ago)`,
        e.enumValues
          ? `- Enum values explained: **${e.enumValuesDescribed} of ${e.enumValues}** (${((100 * e.enumValuesDescribed) / e.enumValues).toFixed(1)}%) — ` +
            `${e.enumsFromSpecification} enums from the specification, ${e.enumsFromSource} from the Java source`
          : null,
        e.operationsWithRole !== undefined ? `- Roles declared at the endpoint: **${e.operationsWithRole} of ${spec.operations}** operations` : null,
        `- Guides: **${snapshot.guides.length}** — ${Object.entries(families).sort().map(([family, n]) => `${family} (${n})`).join(', ')}`,
        manifest.environmentProfile
          ? `- Limits: ${manifest.environmentProfile.limits.length} recorded from **${manifest.environmentProfile.environment}** — see \`bemap_limits\``
          : '- Limits: not recorded in this snapshot — `bemap_limits` with `live: true` reads them from an environment',
        `- Server: **bemap-docs ${SERVER_VERSION}** on Node ${process.version}` +
          (manifest.build
            ? ` — build ${manifest.build.number}, commit \`${manifest.build.commit}\`${manifest.build.uncommitted ? ' with changes not yet committed' : ''}`
            : ''),
        ...shippedSkills().map(
          (skill) =>
            `- Companion skill shipped here: **${skill.name} v${skill.version}**. If the copy you were taught announces a ` +
            'different version, it is out of date — prefer these tools over it and say so.'
        ),
      ];

      lines.push('', '## Environments', '', '| | BeMap API | BeNomad Tiles |', '|---|---|---|');
      for (const host of environmentHosts()) {
        lines.push(`| ${host.env} | \`${host.bemap}\` | ${host.tiles ? `\`${host.tiles}\`` : '—'} |`);
      }

      /* A diagnostic must not fail the way the thing it diagnoses does: a
         mistyped BEMAP_ENV used to replace this whole report with one error. */
      let client = null;
      let unresolved = null;
      if (checkLive && !liveRefused()) {
        try {
          client = new BemapClient({ env });
        } catch (error) {
          unresolved = error.message;
        }
      }
      if (checkLive && liveRefused()) {
        lines.push('', '## Live environment', `- Not checked. ${liveRefused()}`);
      } else if (checkLive && unresolved) {
        lines.push('', '## Live environment', `- Not checked: ${unresolved}`);
      } else if (checkLive) {
        lines.push('', '## Live environment');
        if (!client.hasCredentials()) {
          lines.push('- Not checked: BEMAP_USER / BEMAP_KEY are not set. Everything else here works offline.');
        } else {
          lines.push(`- Target: ${client.baseUrl}`);
          try {
            const live = await client.serverVersion();
            lines.push(`- Runs: **bgis ${live.version ?? 'unknown'}**${live.builtAt ? ` (built ${live.builtAt})` : ''}`);
            if (spec.version && live.version && spec.version !== live.version) {
              const { order } = compareBgisVersions(spec.version, live.version);
              lines.push(
                '',
                order > 0
                  ? `> ⚠️ The snapshot is **ahead** of this environment (${spec.version} against ${live.version}): fields added since are refused there, or ignored — BeMap accepts an unknown field name in silence.`
                  : order < 0
                    ? `> ⚠️ The snapshot is **behind** this environment (${spec.version} against ${live.version}): fields added since are missing here.`
                    : `> The snapshot and this environment are the same release (${spec.version}), different builds.`
              );
            } else if (spec.version && live.version) {
              lines.push(`- The snapshot and this environment agree on ${live.version}.`);
            }
          } catch (error) {
            lines.push(`- Server version: failed — ${error.message}`);
          }
        }
      }
      return text(lines.filter((line) => line !== null).join('\n'));
    })
);

server.registerTool(
  'bemap_limits',
  {
    title: 'Request limits and geocoding back-ends',
    description:
      'The hard limits BeMap enforces per service — waypoints per routing mode, isochrone ceilings, batch ' +
      'sizes, radii — plus the map data release and the geocoding back-ends an environment wires up. None of ' +
      'it is in the specification and it differs between environments. Use it before sizing a request, and ' +
      'whenever a payload works on one environment and not another.',
    inputSchema: strict({
      service: z.string().optional().describe('Only limits of services whose name contains this, e.g. "Routing".'),
      live: z.boolean().optional().describe('Read them from an environment now instead of the snapshot. Needs credentials. Default false.'),
      env: z.enum(environmentNames()).optional().describe('Environment for `live`. Defaults to $BEMAP_ENV, then `own` when BEMAP_BASE_URL is set, then prod.'),
    }),
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
  async ({ service, live = false, env }) =>
    guard(async () => {
      const { manifest } = loadSnapshot();
      const recorded = manifest.environmentProfile;
      let profile = recorded;
      let from = recorded
        ? `snapshot, recorded from **${recorded.environment}** on ${String(recorded.capturedAt).slice(0, 10)}` +
          (recorded.stale ? ` — kept from an earlier build: the capture failed on ${String(recorded.stale).slice(0, 10)}` : '')
        : null;
      if (live) {
        if (liveRefused()) return failure(`${liveRefused()} Without \`live\`, the recorded values are used.`);
        const client = new BemapClient({ env });
        if (!client.hasCredentials()) {
          throw new BemapAuthError('A live limits check needs BEMAP_USER and BEMAP_KEY. Without `live`, the recorded values are used.', 'missing');
        }
        profile = await client.geoServerInfo();
        from = `live from ${client.baseUrl}`;
      }
      if (!profile) {
        return failure('This snapshot recorded no limits. Pass `live: true` to read them from an environment.');
      }
      const needle = String(service ?? '').trim().toLowerCase();
      const limits = needle ? profile.limits.filter((limit) => limit.service.toLowerCase().includes(needle)) : profile.limits;
      if (limits.length === 0) {
        return failure(`No limits for "${echo(service)}". Services with limits: ${[...new Set(profile.limits.map((limit) => limit.service))].sort().join(', ')}.`);
      }
      const out = [
        '# BeMap limits',
        '',
        `- Map data release: **${profile.cartoRelease ?? 'unknown'}**`,
        `- Geocoding back-ends: ${profile.geoservers.map((name) => `\`${name}\``).join(', ')}`,
        `- Source: ${from}`,
        '',
        '| Service | Limit | Value | Unit | Bound |',
        '|---|---|---|---|---|',
        ...limits.map((limit) => `| ${limit.service} | \`${limit.key}\` | **${limit.value}** | ${limit.unit ?? '—'} | ${limit.bound ?? '—'} |`),
      ];
      return sourced(truncate(out.join('\n'), MAX_RESPONSE_CHARS, 'Filter with `service`.'));
    })
);

/* ------------------------------------------------------------------- search */

server.registerTool(
  'bemap_search',
  {
    title: 'Search the BeMap API',
    description:
      'Ranked search across every operation, schema, field, enum value and guide. The entry point for a ' +
      'concept ("isochrone", "toll cost"), a field name ("departureTime"), an enum value ("AVOID_TOLLS") or an ' +
      'error message. Pass `kind: "field"` to find which schemas declare a field and how it is spelled.',
    inputSchema: strict({
      query: z.string().min(2).describe('Search terms. Wrap a phrase in double quotes to require it verbatim.'),
      kind: z
        .enum(['operation', 'schema', 'field', 'value', 'guide'])
        .optional()
        .describe('Only one kind of result. `field` finds a field by name across all schemas; `value` an enum value.'),
      family: z.string().optional().describe('Only guides of one family, e.g. "jsapi_2_0_0", "rest_1_0_0", "general".'),
      limit: z.number().int().min(1).max(40).optional().describe('Maximum results. Default 10.'),
    }),
    annotations: { readOnlyHint: true, openWorldHint: false, idempotentHint: true },
  },
  async ({ query, kind, family, limit = 10 }) =>
    guard(() => {
      /* A family that does not exist is said so: it used to answer "no match",
         and that a field absent from the specification does not exist. */
      const families = [...new Set(loadSnapshot().guides.map((entry) => entry.family))].sort();
      if (family && !families.includes(family)) return failure(`No guides in family "${echo(family)}". Families: ${families.join(', ')}.`);
      const hits = search(query, { kind, family, limit });
      if (hits.length === 0) {
        return failure(
          `No match for "${echo(query)}"${kind ? ` among ${kind}s` : ''}. Try one distinctive term, a field name or an enum value. ` +
            'A field absent from the specification does not exist in this release — BeMap would ignore it.'
        );
      }
      const next = {
        operation: (hit) => `\`bemap_get_operation\` "${hit.id}"`,
        schema: (hit) => `\`bemap_get_schema\` "${hit.id}"`,
        field: (hit) => `\`bemap_get_schema\` "${hit.schema}" property "${hit.id.split('.').pop()}"`,
        value: (hit) => `\`bemap_get_schema\` "${hit.schema}" property "${hit.field}"`,
        guide: (hit) => `\`bemap_read_guide\` "${hit.id}"`,
      };
      const via = hits[0]?.via;
      const out = [
        via
          ? `# Search: "${echo(query)}" — nothing is named that; ${hits.length} result(s) for its words, "${echo(via)}"`
          : `# Search: "${echo(query)}" — ${hits.length} result(s)`,
        '',
      ];
      hits.forEach((hit, rank) => {
        const label =
          hit.kind === 'field'
            ? `**${hit.title}** · field · \`${hit.type}\`${hit.required ? ' · required' : ''}`
            : hit.kind === 'guide'
              ? `**${hit.title}** · guide · \`${hit.id}\``
              : `**${hit.title}** · ${hit.kind}${hit.kind === 'operation' ? ` · \`${hit.id}\`` : ''}`;
        out.push(`## ${rank + 1}. ${label}`);
        if (hit.excerpt) out.push(`> ${clip(hit.excerpt, 300)}`);
        out.push(`→ ${next[hit.kind](hit)}`, '');
      });
      return sourced(truncate(out.join('\n'), MAX_RESPONSE_CHARS, 'Narrow the query or lower `limit`.'));
    })
);

/* ---------------------------------------------------------------- contract */

server.registerTool(
  'bemap_get_operation',
  {
    title: 'Get one BeMap operation',
    description:
      'Everything needed to call one endpoint: HTTP method, full URL, authentication, the role it declares, ' +
      'query parameters, the request body with every field, type, requiredness and allowed value, and the ' +
      'response. Accepts "POST /routing/1.0", a full endpoint ("/bgis/service/routing/1.0") or words ' +
      '("reverse geocoding"). Use it before writing any request.',
    inputSchema: strict({
      operation: z.string().min(2).describe('"METHOD /path", an endpoint, or words. E.g. "POST /routing/1.0", "traceroute".'),
      detail: z
        .enum(['summary', 'full'])
        .optional()
        .describe('`summary` (default) trims prose and names enum values; `full` adds the meaning of every value.'),
    }),
    annotations: { readOnlyHint: true, openWorldHint: false, idempotentHint: true },
  },
  async ({ operation, detail = 'summary' }) =>
    guard(() => {
      const { match, candidates } = findOperation(operation);
      if (!match) {
        if (candidates.length === 0) {
          return failure(`No operation matches "${echo(operation)}". \`bemap_list_services\` shows them all.`);
        }
        return text(
          [`"${echo(operation)}" could mean${candidates.length > 1 ? ' several operations' : ''}:`, '', ...candidates.map((op) => `- \`${op.key}\` — ${clip(op.summary || op.description, 90)}`), '', 'Pass one of them exactly.'].join('\n')
        );
      }
      const samePath = candidates.filter((op) => op.key !== match.key && op.path === match.path);
      const variants = candidates.filter((op) => op.path !== match.path && op.path.startsWith(match.path));
      const body =
        renderOperation(match, { detail }) +
        (samePath.length ? `\n\nThe same path also answers: ${samePath.map((op) => `\`${op.key}\``).join(', ')}.` : '') +
        (variants.length ? `\n\nVariants of this path: ${variants.map((op) => `\`${op.key}\` (${clip(op.summary, 40)})`).join(', ')}.` : '');
      return sourced(truncate(body, MAX_RESPONSE_CHARS, 'Use `detail: "summary"`, or `bemap_get_schema` for one nested type.'));
    })
);

server.registerTool(
  'bemap_get_schema',
  {
    title: 'Get one BeMap schema',
    description:
      'One request or response type: its fields with type, requiredness and description, the operations ' +
      'that use it, and the meaning of each enum value. Use it to drill into a nested type an operation ' +
      'names, or pass `property` for one field in full — the `options` of a routing request has dozens of values, each explained.',
    inputSchema: strict({
      name: z.string().min(2).describe('Schema name, e.g. "RoutingRequest", "RoutingDest". Case does not matter.'),
      property: z.string().optional().describe('Show only this field, in full, with every enum value explained.'),
      detail: z.enum(['summary', 'full']).optional().describe('`summary` (default) or `full` — every enum value explained.'),
    }),
    annotations: { readOnlyHint: true, openWorldHint: false, idempotentHint: true },
  },
  async ({ name, property, detail = 'summary' }) =>
    guard(() => {
      const found = findSchema(name);
      if (!found.schema) {
        return failure(
          found.candidates.length
            ? `No schema named "${echo(name)}". Closest: ${found.candidates.map((candidate) => `\`${candidate}\``).join(', ')}.`
            : `No schema named "${echo(name)}". \`bemap_search\` with \`kind: "schema"\` finds one by topic.`
        );
      }
      return sourced(
        truncate(renderSchema(found.name, found.schema, { detail, property }), MAX_RESPONSE_CHARS, 'Pass `property` to show one field.')
      );
    })
);

/* ------------------------------------------------------------------- guides */

/** Guide text is split into parts of this size, so a long page can be read in turns. */
const GUIDE_PART = 40_000;

server.registerTool(
  'bemap_read_guide',
  {
    title: 'Read a BeMap guide',
    description:
      "BeMap's own documentation pages — tutorials, worked examples, the JavaScript and Flutter SDKs, WMS, " +
      'BeNomad Tiles — served verbatim. Accepts a guide id, a title or words; with no guide, lists what exists. ' +
      'Use it for how and why; use `bemap_get_operation` for the exact contract, which wins where they differ.',
    inputSchema: strict({
      guide: z.string().optional().describe('Guide id ("rest_1_0_0/routing-service.md"), title or words. Omit to list guides.'),
      family: z.string().optional().describe('When listing, only one family — e.g. "jsapi_2_0_0", "flutterapi_1_0_0".'),
      part: z.number().int().min(1).optional().describe(`Which part of a long guide, ${GUIDE_PART.toLocaleString('en-US')} characters each. Default 1.`),
    }),
    annotations: { readOnlyHint: true, openWorldHint: false, idempotentHint: true },
  },
  async ({ guide, family, part = 1 }) =>
    guard(() => {
      const snapshot = loadSnapshot();
      if (!guide) {
        const shown = family ? snapshot.guides.filter((entry) => entry.family === family) : snapshot.guides;
        if (shown.length === 0) {
          const families = [...new Set(snapshot.guides.map((entry) => entry.family))].sort();
          return failure(`No guides in family "${echo(family)}". Families: ${families.join(', ')}.`);
        }
        const out = [`# BeMap guides — ${shown.length}`, ''];
        let current = null;
        for (const entry of [...shown].sort((a, b) => a.family.localeCompare(b.family) || a.id.localeCompare(b.id))) {
          if (entry.family !== current) {
            current = entry.family;
            out.push('', `## ${current}`, '');
          }
          out.push(`- \`${entry.id}\` — ${entry.title}`);
        }
        return text(truncate(out.join('\n'), MAX_RESPONSE_CHARS, 'Pass `family` to list one family.'));
      }

      const { match, candidates } = findGuide(guide);
      if (!match) {
        if (candidates.length === 0) return failure(`No guide matches "${echo(guide)}". Call without \`guide\` to list them, or use \`bemap_search\`.`);
        return text([`"${echo(guide)}" could be:`, '', ...candidates.map((entry) => `- \`${entry.id}\` — ${entry.title}`)].join('\n'));
      }
      const raw = readGuide(match.id);
      const body = resolveIncludes(raw, snapshot);
      const pieces = splitParts(body, GUIDE_PART);
      const parts = pieces.length;
      if (part > parts) return failure(`\`${match.id}\` has ${parts} part(s).`);
      const slice = pieces[part - 1];
      const named = schemasNamedIn(raw);
      const out = [
        `# ${match.title}`,
        '',
        `Guide \`${match.id}\` · ${match.family}${parts > 1 ? ` · part ${part} of ${parts}` : ''}`,
        '',
        '---',
        '',
        slice,
        '',
        '---',
        parts > part ? `Continue with \`part: ${part + 1}\`.` : null,
        named.length ? `Schemas this guide refers to: ${named.map((name) => `\`${name}\``).join(', ')} — \`bemap_get_schema\` for the contract.` : null,
        "_A hand-written guide, served as BeMap wrote it. For field names, types and requiredness the specification is the contract (`bemap_get_operation`, `bemap_get_schema`); where they disagree, trust the specification and confirm with `bemap_try_request`._",
      ].filter((line) => line !== null);
      return sourced(truncate(out.join('\n'), MAX_RESPONSE_CHARS));
    })
);

/* --------------------------------------------------------------------- maps */

/**
 * The maps this snapshot offers, in the order the build configuration gives
 * them — BeNomad's first — each with the guides whose code calls it, as the
 * build found them. Read once, since the snapshot cannot change while the
 * process runs, and empty without a snapshot, so that the server still starts.
 *
 * @returns {Array<{id: string, name: string, summary: string, host: 'tiles'|'bemap'|null, guides: string[]}>}
 */
function mapSources() {
  try {
    const snapshot = loadSnapshot();
    const present = new Set(snapshot.guides.map((guide) => guide.id));
    return (snapshot.manifest.maps?.sources ?? [])
      .filter((source) => source.id)
      .map(({ id, name, summary, host = null, guides = [] }) => ({
        id,
        name,
        summary,
        host,
        guides: guides.map((guide) => guide.id).filter((guide) => present.has(guide)),
      }));
  } catch {
    return [];
  }
}
const MAP_SOURCES = mapSources();

/** How long the user may take over the questions before the tool stops waiting, in milliseconds. */
const QUESTION_TIMEOUT_MS = 10 * 60_000;

/** Whether this server holds an account for live calls — not whether it is valid. */
const hasAccount = () => Boolean(setting('BEMAP_USER') && setting('BEMAP_KEY'));

/** A host without its scheme, for a label. */
const bare = (host) => host.replace(/^https?:\/\//, '');

/**
 * A web address a person typed, without its trailing slash, or `null` when it
 * is not one.
 *
 * @param {string|undefined} value
 * @returns {string|null}
 */
function typedHost(value) {
  const trimmed = String(value ?? '').trim().replace(/\/+$/, '');
  return /^https?:\/\/[^\s/?#]+/i.test(trimmed) ? trimmed : null;
}

/**
 * Whether the account configured in this server may be sent to a host: a
 * BeNomad environment's, or the installation this server is configured for.
 * Never a host that only arrived through a conversation or a form — the
 * account would go wherever was typed, a typo included.
 *
 * @param {string|null} host - Origin.
 * @returns {boolean}
 */
function trusted(host) {
  return Boolean(host) && environmentHosts().some((entry) => entry.bemap === host || entry.tiles === host);
}

/**
 * Ask the user through the client, when it can show a form.
 *
 * @param {string} message - What the form is for.
 * @param {object} requestedSchema - A flat object of primitive fields.
 * @param {object} extra - The tool call's context, so the form is tied to it.
 * @returns {Promise<{action: 'accept'|'decline'|'cancel'|'unsupported', content?: object}>}
 *   `unsupported` when the client cannot show a form, or the form failed or
 *   timed out: the questions are then handed to the model to ask instead.
 */
async function ask(message, requestedSchema, extra) {
  if (!server.server.getClientCapabilities()?.elicitation?.form) return { action: 'unsupported' };
  try {
    return await server.server.elicitInput(
      { mode: 'form', message, requestedSchema },
      { timeout: QUESTION_TIMEOUT_MS, relatedRequestId: extra?.requestId, signal: extra?.signal }
    );
  } catch {
    return { action: 'unsupported' };
  }
}

/**
 * The form asking what `bemap_map_setup` was not told. Its options are this
 * server's own — its environments, the maps the snapshot offers — so it cannot
 * offer a choice the tool refuses.
 *
 * Every field is a choice, so none can carry an account or a key: the MCP
 * specification forbids asking for sensitive information in a form, and
 * credentials never pass through a conversation here. Choices are `enum` +
 * `enumNames`, the one shape both the 2025-06-18 and the 2025-11-25
 * revisions of the specification accept.
 *
 * @param {string[]} open - Which of `env`, `map` and `live` to ask.
 * @returns {object} An elicitation `requestedSchema`.
 */
function questionForm(open) {
  const properties = {};
  if (open.includes('env')) {
    const hosts = environmentHosts();
    const options = hosts.map((host) => [
      host.env,
      `${host.env === OWN ? 'Our own installation' : host.env} — ${bare(host.bemap)}${host.tiles ? '' : ', no BeNomad Tiles'}`,
    ]);
    if (!hosts.some((host) => host.env === OWN)) options.push([OWN, 'Our own BeMap installation — its address is asked next']);
    const usual = environmentName();
    properties.env = {
      type: 'string',
      title: 'Which BeMap?',
      enum: options.map(([value]) => value),
      enumNames: options.map(([, label]) => label),
      ...(options.some(([value]) => value === usual) ? { default: usual } : {}),
    };
  }
  if (open.includes('map')) {
    properties.map = {
      type: 'string',
      title: 'Which map?',
      enum: MAP_SOURCES.map((source) => source.id),
      enumNames: MAP_SOURCES.map((source) => `${source.name} — ${source.summary}`),
      default: MAP_SOURCES[0].id,
    };
  }
  if (open.includes('live')) {
    properties.account = {
      type: 'string',
      title: 'With or without a BeMap account?',
      description: hasAccount()
        ? "The account is the one set in this MCP server's configuration — never typed here, nor in the chat."
        : 'No BeMap account is set in this MCP server yet: "with" tells you where to add one — in its configuration, never here nor in the chat.',
      enum: ['with', 'without'],
      enumNames: ['With my BeMap account — the application is tested live', 'Without — its requests are checked, not sent'],
      default: hasAccount() ? 'with' : 'without',
    };
  }
  return { type: 'object', properties, required: Object.keys(properties) };
}

/**
 * The second form, for an installation of the customer's own that this server
 * does not know. It asks for the BeMap address alone: BeNomad delivers BeMap
 * to these customers, never BeNomad Tiles.
 */
function ownForm() {
  return {
    type: 'object',
    properties: {
      bemapHost: { type: 'string', title: 'BeMap address', description: 'For example https://bemap.example.com' },
    },
    required: ['bemapHost'],
  };
}

/**
 * The same questions, for the model to ask when the client cannot show a form.
 *
 * @param {string[]} open - Which of `env`, `own` (the address of an
 *   installation of the customer's own), `map` and `live` to ask.
 * @param {{noAccount?: boolean}} [context] - `noAccount`: no account is set in
 *   this server, so there is no live testing to offer — said, not asked.
 * @returns {string} Markdown.
 */
function questionsText(open, { noAccount = false } = {}) {
  const out = [
    `# Before the map: ${open.length === 1 ? 'one question' : `${open.length} questions`} for the user`,
    '',
    'Ask the user, then call `bemap_map_setup` again with the answers.',
    '',
  ];
  let n = 0;
  if (open.includes('env')) {
    const hosts = environmentHosts();
    out.push(`${++n}. **Which BeMap?** → \`env\``);
    for (const host of hosts) out.push(`   - \`${host.env}\` — \`${host.bemap}\`${host.tiles ? '' : ', no BeNomad Tiles'}`);
    if (!hosts.some((host) => host.env === OWN)) {
      out.push("   - `own` — the customer's own BeMap installation, BeMap alone with no BeNomad Tiles: pass its address as `bemapHost`");
    }
  }
  if (open.includes('own')) {
    out.push(`${++n}. **Where is their BeMap installation?** → \`bemapHost\``);
  }
  if (open.includes('map')) {
    out.push(`${++n}. **Which map?** → \`map\``);
    for (const source of MAP_SOURCES) out.push(`   - \`${source.id}\` — ${source.name}: ${source.summary}`);
  }
  if (open.includes('live')) {
    out.push(
      `${++n}. **With or without a BeMap account?** → \`live: true\` (with: the application's calls are sent live) or \`false\` (without: they are checked, not sent)`,
      hasAccount()
        ? "   An account is set in this server's configuration."
        : '   No account is set in this server yet; "with" means adding one to its configuration.',
      '   Never ask for the account or the key in the conversation.'
    );
  }
  if (noAccount) {
    out.push(
      '',
      "Tell the user, rather than ask: **no BeMap account is set in this server**, so the application's calls will " +
        "be checked, not tested live. To test live they add their account and key to this server's settings — the " +
        "extension's settings in Claude Desktop. Never ask for the account or the key in the conversation."
    );
  }
  out.push('', "_Offer BeNomad's map first. Another provider's is used only if the user picks it — never chosen for them._");
  return out.join('\n');
}

/**
 * A family's label: the title of its own `index.md` where it has one — "BeMap
 * JS API v2.0", "Flutter API v1.0.0" — else its name. Read from the snapshot,
 * so a family BeMap adds is labelled by its own index page.
 *
 * @param {object} snapshot - As `loadSnapshot()` returns it.
 * @returns {(family: string) => string}
 */
function familyLabels(snapshot) {
  const titles = new Map(snapshot.guides.map((guide) => [guide.id, guide.title]));
  return (family) => (titles.has(`${family}/index.md`) ? `${titles.get(`${family}/index.md`)} (\`${family}\`)` : `\`${family}\``);
}

/**
 * A map's guides, grouped by family — which is to say by SDK or platform —
 * families with the most guides first, each keeping the build's order: most
 * matching code blocks first.
 *
 * @param {string[]} ids - Guide ids.
 * @param {object} snapshot
 * @returns {Array<{family: string, label: string, guides: Array<{id: string, title: string}>}>}
 */
function byFamily(ids, snapshot) {
  const guides = new Map(snapshot.guides.map((guide) => [guide.id, guide]));
  const label = familyLabels(snapshot);
  const groups = new Map();
  for (const id of ids) {
    const guide = guides.get(id);
    if (!guide) continue;
    if (!groups.has(guide.family)) groups.set(guide.family, []);
    groups.get(guide.family).push({ id, title: guide.title });
  }
  return [...groups.entries()]
    .map(([family, list]) => ({ family, label: label(family), guides: list }))
    .sort((a, b) => b.guides.length - a.guides.length || a.family.localeCompare(b.family));
}

/**
 * The answer for the choices made.
 *
 * @param {object} choice
 * @param {string} choice.env - Environment name, `own` included.
 * @param {string|null} choice.bemap - BeMap origin; `null` when it was not given.
 * @param {string|null} choice.tiles - BeNomad Tiles origin; `null` when there is none.
 * @param {Array<object>} choice.sources - The maps to describe: the one chosen, or all of them.
 * @param {boolean} choice.live - Whether the user chose to test with their account.
 * @param {boolean} choice.answered - Whether the user answered the questions.
 * @param {object} snapshot - As `loadSnapshot()` returns it.
 * @returns {Promise<string>} Markdown.
 */
/** The environments paired with a BeNomad Tiles host, as a reader says them: "beta, preprod or prod". */
function withTiles() {
  const names = environmentHosts().filter((host) => host.tiles).map((host) => host.env);
  return names.length > 1 ? `${names.slice(0, -1).join(', ')} or ${names[names.length - 1]}` : names.join('');
}

async function renderMapSetup({ env, bemap, tiles, sources, live, answered, fromSettings = false, noAccount = false }, snapshot) {
  const where = env === OWN ? 'our own installation' : env;
  const one = sources.length === 1 ? sources[0] : null;
  const another = one?.host === null;
  const needsTiles = sources.some((source) => source.host === 'tiles');
  const account = hasAccount();
  const sending = live && account && trusted(bemap);
  const out = [
    one ? (another ? `# The map — ${where}, another provider's` : `# A BeNomad map — ${where}, ${one.name}`) : `# The map — ${where}`,
    '',
    another
      ? "**The user chose another provider's map.** Draw BeMap's results — routes, places, areas — on it; that provider's " +
        "terms and keys are the user's to arrange. BeNomad's own map stays one call away: `map: \"tiles\"` or `\"wms\"`."
      : "**BeNomad's map by default** — BeNomad Tiles or BeMap's WMS. Another provider's map only when the user chooses " +
        'it, never as a default or a placeholder: the map is part of the product.',
    '',
  ];
  if (!answered) out.push('_The user did not answer the questions, so this covers every map on the default BeMap and nothing was read live. Ask before writing code._', '');

  out.push(
    '| | |',
    '|---|---|',
    `| BeMap | ${bemap ? `\`${bemap}\`` : 'their own installation — its address was not given'}${fromSettings ? ` — ${env}, as set in this server's settings` : ''} |`
  );
  if (needsTiles) {
    out.push(
      tiles
        ? `| BeNomad Tiles | \`${tiles}\` — the same BeMap account logs in to both. Keep the two hosts of one environment together: crossed, the tiles login answers \`403\`. |`
        : env === OWN
          ? "| BeNomad Tiles | not delivered with an installation of the customer's own — use BeMap WMS (`map: \"wms\"`), which the installation serves itself |"
          : `| BeNomad Tiles | none is paired with ${env} — build the map against ${withTiles()} |`
    );
  }
  if (one) out.push(`| Map | **${one.name}** — ${one.summary} |`);
  /* Chosen, and not served here: the answer used to say so in the table and
     then list the Tiles guides to read, and "done" meant BeNomad Tiles. */
  if (one?.host === 'tiles' && !tiles) {
    out.push(
      '',
      `## No BeNomad Tiles for ${where}`,
      '',
      env === OWN
        ? "An installation of the customer's own serves no BeNomad Tiles. Ask the user again: BeMap WMS (`map: \"wms\"`), which the installation serves itself, or — only if they choose it — another provider's map."
        : `No BeNomad Tiles host is paired with ${env}. Ask the user again: BeMap WMS (\`map: "wms"\`), or BeNomad Tiles on ${withTiles()}.`
    );
    return out.join('\n');
  }
  const liveRow = noAccount
    ? "not possible — no BeMap account is set in this server. The user adds their account and key to its settings (the extension's settings in Claude Desktop, the server's `env` elsewhere) and restarts it, never in the conversation; until then check each call with `validateOnly: true`"
    : !live
    ? answered
      ? 'without an account, as the user chose — check each call with `bemap_try_request` and `validateOnly: true`; nothing is sent'
      : 'not asked — check each call with `bemap_try_request` and `validateOnly: true` until the user says otherwise'
    : !trusted(bemap)
      ? "not possible yet — this installation is not configured in this server, so no account can be sent to it. Add `BEMAP_BASE_URL` and an account of that installation to the server's configuration and restart it; until then check each call with `validateOnly: true`"
      : !account
        ? "asked for, but no BeMap account is set in this server: add `BEMAP_USER` and `BEMAP_KEY` to its configuration — the extension's settings in Claude Desktop, the server's `env` elsewhere — and restart it; never in the conversation. Until then check each call with `validateOnly: true`"
        : `with the account set in this server — \`bemap_try_request\` with \`env: "${env}"\` sends each call`;
  out.push(`| Live testing | ${liveRow} |`, '');

  if (needsTiles && tiles) {
    if (live && account && trusted(tiles)) {
      try {
        const found = await discoverTiles(tiles);
        out.push(
          `## What ${where} serves — read live now`,
          '',
          `- Default map: \`${found.defaultMap}\` — also served as \`${tiles}/default.pmtiles\` and \`${tiles}/default/{z}/{x}/{y}.pbf\``,
          `- Default style: \`${found.defaultStyle}\` → \`${tiles}/${found.defaultStyle}\``,
          `- Styles: ${found.styles.map((style) => `\`${style}\``).join(', ')}`,
          `- Aliases: ${Object.entries(found.aliases).map(([alias, file]) => `\`${alias}\` → \`${file}\``).join(', ')}`,
          '',
          '_These differ between environments. Read them in the application at runtime — `GET /api/maps` after ' +
            'login — rather than copying these names in._',
          ''
        );
      } catch (error) {
        out.push(
          `## What ${where} serves`,
          '',
          `Not read: ${error.message}. On the tiles login a \`403\` means the account lacks \`ROLE_MAPPING\` or an ` +
            '`osm`/`here` geoserver, or the hosts are crossed.',
          ''
        );
      }
    } else {
      const why = !account ? 'no BeMap account is set in this server' : !live ? 'live testing is off' : 'this installation is not configured in this server';
      out.push(
        `## What ${where} serves`,
        '',
        `_Not read: ${why}. The application discovers it at runtime — \`GET /api/maps\` after login gives the default map and style._`,
        ''
      );
    }
    out.push(
      '## How the application signs in to the map — on any platform',
      '',
      `1. \`POST ${tiles}/api/login\` with HTTP Basic — the same BeMap account and API key as the REST calls — returns \`{ token }\`, valid one hour.`,
      '2. Send it with every style, tile and font request: the `X-Session-Token` header (MapLibre: `transformRequest`), or `?token=`.',
      '3. Load the default style; it references the tiles and the fonts itself. Sign in again before the hour is up.',
      '',
      `In JavaScript, BeMap's SDK does all three: \`new bemap.Context({ host, tilesHost, login, password })\`.`,
      ''
    );
  }

  const servedByBemap = `BeMap serves this map itself, on ${bemap ? `\`${bemap}\`` : 'its own host'}: the guides give the URL, every parameter and how it authenticates.`;
  if (one) {
    const groups = byFamily(one.guides, snapshot);
    if (groups.length) {
      out.push(
        another ? "## BeMap's guides that draw one" : "## BeMap's guides that use it",
        '',
        another
          ? "_Found by the build: each page's code draws another provider's map._"
          : "_Found by the build: each page's code calls this map. Any platform can call it over HTTP; where BeMap has an SDK for yours, its pages are here._",
        ''
      );
      for (const group of groups) {
        out.push(`- **${group.label}**`, ...group.guides.map((guide) => `  - \`${guide.id}\` — ${guide.title}`));
      }
    } else if (another) {
      out.push("## BeMap's guides", '', "BeMap has no guide for another provider's map: use that provider's documentation for the map, and these tools for BeMap's results.");
    }
    if (one.host === 'bemap') out.push('', servedByBemap);
    if (groups.length) out.push('', 'Read them with `bemap_read_guide` before writing the code.');
  } else {
    const count = ['One', 'Two', 'Three', 'Four', 'Five'][sources.length - 1] ?? String(sources.length);
    out.push(`## ${count} maps — and BeMap's guides that use each`, '');
    sources.forEach((source, i) => {
      out.push(`${i + 1}. **${source.name}** (\`map: "${source.id}"\`) — ${source.summary}${source.host === 'bemap' ? `. ${servedByBemap}` : ''}`);
      for (const group of byFamily(source.guides, snapshot)) {
        out.push(`   - ${group.label}: ${group.guides.map((guide) => `\`${guide.id}\``).join(', ')}`);
      }
    });
    out.push('', 'Read one with `bemap_read_guide`.');
  }

  out.push(
    '',
    '## Done means',
    '',
    sending
      ? `- every BeMap call the application makes checked with \`bemap_try_request\`, then sent with \`env: "${env}"\`;`
      : '- every BeMap call the application makes checked with `bemap_try_request` and `validateOnly: true`;',
    another ? "- and its map is the provider's the user chose, with BeMap's results drawn on it." : "- and its map is BeNomad's."
  );
  return out.join('\n');
}

server.registerTool(
  'bemap_map_setup',
  {
    title: 'Set up the map',
    description:
      'Call it before writing any map code, on any platform. It asks the user which BeMap (a BeNomad environment or ' +
      "their own installation), which map — BeNomad Tiles, BeMap's WMS or, only if they choose it, another provider's — " +
      'and whether to test with their BeMap account; then gives the hosts, how the application signs in, the live ' +
      'default map and style, and every BeMap guide whose code uses that map.',
    inputSchema: strict({
      env: z
        .enum(environmentNames())
        .optional()
        .describe("Which BeMap; `own` is an installation of the customer's own. Asked when omitted and not set in this server's settings."),
      bemapHost: z.string().optional().describe('With `own`: its BeMap address, e.g. "https://bemap.example.com".'),
      map: (MAP_SOURCES.length ? z.enum(MAP_SOURCES.map((source) => source.id)) : z.string())
        .optional()
        .describe(`Which map: ${MAP_SOURCES.map((source) => `\`${source.id}\` ${source.name}`).join(', ')}. Asked when omitted.`),
      live: z
        .boolean()
        .optional()
        .describe("With the BeMap account set in this server's configuration (true: calls are sent) or without (false: only checked). Asked when omitted and an account is set."),
    }),
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
  async ({ env, bemapHost, map, live }, extra) =>
    guard(async () => {
      const snapshot = loadSnapshot();
      if (MAP_SOURCES.length === 0) return failure('This snapshot names no map, so it is incomplete: reinstall the server.');
      if (bemapHost !== undefined && !typedHost(bemapHost)) {
        return failure(`\`bemapHost\` "${echo(bemapHost)}" is not a web address: pass one such as "https://bemap.example.com".`);
      }
      if (bemapHost && env && env !== OWN) {
        return failure('`bemapHost` describes an installation of the customer\'s own: pass it with `env: "own"`, or leave it out.');
      }
      /* A BeMap set in this server's settings — BEMAP_ENV, or an installation
         of the customer's own — is an answer already given: asking again
         made a user who had typed "beta" in the extension's settings answer
         twice. A setting that names no environment is ignored and said, not
         obeyed into an error after the user has answered a form. */
      const problem = settingsProblem();
      const configured = !problem && (setting('BEMAP_ENV') || setting('BEMAP_BASE_URL')) ? environmentName() : undefined;
      const choice = { env: env ?? (bemapHost ? OWN : configured), map, live };
      const fromSettings = env === undefined && !bemapHost && configured !== undefined;
      let hosts = { bemap: typedHost(bemapHost), tiles: null };

      /* With no account in this server there is nothing to choose: offering
         "test with your account" and saying only afterwards that there is
         none cost a user a whole run that never reached BeMap. It is said
         first instead, and it is not the user's "no" — nothing binds. */
      const noAccount = choice.live === undefined && !hasAccount();
      if (noAccount) choice.live = false;

      /* The user's answer about the account binds the session from the moment
         it is known — before any return below. It used to be recorded at the
         very end, so an early return (an address typed without https://, a
         second form that failed) dropped a "no" and the next request went out
         with the account. */
      const bind = () => {
        if (typeof choice.live === 'boolean' && !noAccount) liveConsent = choice.live;
      };
      bind();
      /* Said wherever the answer is — above the questions too: a user whose
         BEMAP_ENV was mistyped was asked "Which BeMap?" and never told why. */
      const note = problem && env === undefined ? `> ⚠️ ${problem} It was ignored here; correct it in the settings.\n\n` : '';

      /* 1 ─ what the tool was not told, asked of the user */
      let answered = true;
      const open = ['env', 'map', 'live'].filter((key) => choice[key] === undefined);
      if (open.length) {
        const reply = await ask('Setting up the map for your application.', questionForm(open), extra);
        /* A call the client cancelled applies nothing, even an answer that
           arrives afterwards: the model never saw it. */
        if (extra?.signal?.aborted) return failure('The call was cancelled before the questions were answered: nothing was applied.');
        if (reply.action === 'unsupported') {
          const ownUnknown = choice.env === OWN && !hosts.bemap && !environmentHosts().some((host) => host.env === OWN);
          return text(note + questionsText(ownUnknown ? [...open, 'own'] : open, { noAccount }));
        }
        if (reply.action === 'accept') {
          const { env: pickedEnv, map: pickedMap, account } = reply.content ?? {};
          if (pickedEnv !== undefined) choice.env = pickedEnv;
          if (pickedMap !== undefined) choice.map = pickedMap;
          if (account !== undefined) choice.live = account === 'with';
          bind();
        } else {
          answered = false;
        }
      }
      const name = choice.env ?? (problem ? defaultEnvironment() : environmentName());

      /* 2 ─ an installation of the customer's own needs its address */
      if (name === OWN) {
        const known = environmentHosts().find((host) => host.env === OWN);
        if (!hosts.bemap && known) {
          hosts = { bemap: known.bemap, tiles: null };
        } else if (!hosts.bemap && answered) {
          const reply = await ask('Your own BeMap installation: where is it?', ownForm(), extra);
          if (extra?.signal?.aborted) return failure('The call was cancelled before the questions were answered: nothing else was applied.');
          if (reply.action === 'unsupported') return text(note + questionsText(['own'], { noAccount }));
          if (reply.action === 'accept') {
            const given = reply.content?.bemapHost;
            hosts = { bemap: typedHost(given), tiles: null };
            if (!hosts.bemap) return failure(`"${echo(given)}" is not a web address. Call again, and give one such as "https://bemap.example.com".`);
          }
        }
      } else {
        hosts = { bemap: resolveBaseUrl(name), tiles: resolveTilesUrl(name) };
      }

      const chosen = MAP_SOURCES.filter((source) => source.id === choice.map);
      const body = await renderMapSetup(
        { env: name, ...hosts, sources: chosen.length ? chosen : MAP_SOURCES, live: choice.live === true, answered, fromSettings, noAccount },
        snapshot
      );
      return sourced(truncate(note + body, MAX_RESPONSE_CHARS));
    })
);

/* ---------------------------------------------------------------- execution */

/** The most kinds of issue a check lists, once repeats are grouped; the rest are counted. */
const MAX_ISSUE_LINES = 40;

/** The largest image a live answer returns as an image, in bytes. */
const MAX_IMAGE_BYTES = 1024 * 1024;

/** How each kind of issue is marked. */
const MARK = { unknown: '⚠️', alias: 'ℹ️', missing: '❓', value: '✗' };

/**
 * The lines of one check section: repeats grouped, the list capped.
 *
 * @param {Array<object>} issues - From checkBody or checkQuery.
 * @returns {string[]}
 */
function issueLines(issues) {
  const grouped = groupIssues(issues);
  const lines = grouped
    .slice(0, MAX_ISSUE_LINES)
    .map((issue) => `- ${MARK[issue.kind]} ${issue.message}${issue.count > 1 ? ` (× ${issue.count})` : ''}`);
  if (grouped.length > MAX_ISSUE_LINES) lines.push(`- … and ${grouped.length - MAX_ISSUE_LINES} more kinds of issue, not listed.`);
  return lines;
}

/**
 * The endpoint a `path` names, as it is sent: any scheme and host dropped —
 * the request goes to the environment's host, whatever was pasted — a leading
 * slash, and the service root when it is missing.
 *
 * A pasted full URL used to be sent as `/bgis/service/https://…`, and a path
 * without its slash as `/bgis/service/bgis/service/…`, while the check had
 * matched the right operation.
 *
 * @param {string} text - `path`, or the operation's endpoint.
 * @param {string} basePath - The service root, e.g. `/bgis/service`.
 * @returns {string}
 */
/**
 * The path of an endpoint, relative to the service root, as the
 * specification keys it: `/vehicle/1.1/getbrands`.
 *
 * @param {string} text - An endpoint, with or without host, root or query.
 * @param {string} basePath - The service root, e.g. `/bgis/service`.
 * @returns {string}
 */
function pathOf(text, basePath) {
  let path = String(text).trim().replace(/^https?:\/\/[^/?#]+/i, '').split('?')[0];
  if (!path.startsWith('/')) path = `/${path}`;
  return basePath && path.startsWith(basePath) ? path.slice(basePath.length) || '/' : path;
}

function endpointOf(text, basePath) {
  let endpoint = String(text).trim().replace(/^https?:\/\/[^/?#]+/i, '');
  if (!endpoint.startsWith('/')) endpoint = `/${endpoint}`;
  if (basePath && !endpoint.startsWith(basePath) && !endpoint.startsWith('/bgis/')) endpoint = `${basePath}${endpoint}`;
  return endpoint;
}

server.registerTool(
  'bemap_try_request',
  {
    title: 'Send a real BeMap request',
    description:
      'Check a request body and its query against the specification — every field and parameter name, enum value and required one — ' +
      'then send it to a live environment and return the real status and response. BeMap accepts unknown ' +
      'field names in silence, so the check is what reveals a typo. Needs BEMAP_USER / BEMAP_KEY; every call ' +
      'counts against the account quota, and an operation that records something records it.',
    inputSchema: strict({
      operation: z.string().optional().describe('The operation, as for `bemap_get_operation`: "POST /routing/1.0", "traceroute"…'),
      path: z.string().optional().describe('An explicit endpoint instead, e.g. "/bgis/service/currency/1.0/rate?code=USD".'),
      query: z.string().optional().describe('Query string without the "?", e.g. "code=USD". Appended to the endpoint.'),
      body: z.string().optional().describe('JSON request body, as a string. Omit for GET.'),
      method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional().describe("Override the method the specification declares."),
      env: z.enum(environmentNames()).optional().describe('Target environment. Defaults to $BEMAP_ENV, then `own` when BEMAP_BASE_URL is set, then prod.'),
      validateOnly: z.boolean().optional().describe('Check the body and the query against the specification and stop — nothing is sent. Needs no credentials.'),
      maxChars: z.number().int().min(200).max(MAX_RESPONSE_CHARS).optional().describe('Truncate the response body to this many characters. Default 8000.'),
    }),
    annotations: { readOnlyHint: false, openWorldHint: true, idempotentHint: false },
  },
  async ({ operation, path, query, body, method, env, validateOnly = false, maxChars = 8000 }) =>
    guard(async () => {
      const snapshot = loadSnapshot();
      const hasBody = body !== undefined && body !== '';
      /* GET and POST on one path are two operations. With no method named, the
         shape of the call picks: a body means the one that takes one, no body
         the GET. It used to be the POST either way, so a correct query-only
         call was checked against the POST — its parameters all "unknown" —
         and sent as a POST with no body. */
      const explicit = Boolean(method) || /^(GET|POST|PUT|DELETE|PATCH)\s/i.test(operation ?? '');
      const byShape = (found) => {
        if (!found.match || explicit) return found.match;
        const same = snapshot.operations.filter((candidate) => candidate.path === found.match.path);
        if (same.length < 2) return found.match;
        return (hasBody ? same.find((candidate) => candidate.request) : same.find((candidate) => candidate.method === 'GET')) ?? found.match;
      };

      let op = null;
      /** The lookup of `path`, kept for its candidates when nothing matched. */
      let lookup = null;
      if (operation) {
        const found = findOperation(operation);
        if (!found.match) {
          return failure(
            found.candidates.length
              ? `"${echo(operation)}" could mean: ${found.candidates.slice(0, 6).map((candidate) => `\`${candidate.key}\``).join(', ')}. Pass one exactly.`
              : `No operation matches "${echo(operation)}".`
          );
        }
        op = byShape(found);
      } else if (path) {
        const bare = path.split('?')[0];
        lookup = findOperation(method ? `${method} ${bare}` : bare);
        op = byShape(lookup);
      } else {
        return failure('Provide `operation` or `path`.');
      }
      const pastedHost = String(path ?? '').match(/^https?:\/\/([^/?#]+)/i)?.[1] ?? null;
      let endpoint = endpointOf(path ?? op.endpoint, snapshot.basePath);
      if (query) endpoint += `${endpoint.includes('?') ? '&' : '?'}${query.replace(/^\?/, '')}`;
      const verb = method ?? op?.method ?? (hasBody ? 'POST' : 'GET');

      let parsed;
      if (hasBody) {
        try {
          parsed = JSON.parse(body);
        } catch (error) {
          return failure(`\`body\` is not valid JSON: ${error.message}`);
        }
      }
      if (hasBody && (verb === 'GET' || verb === 'DELETE')) {
        return failure(`\`${verb} ${echo(endpoint)}\` cannot carry a body. Send parameters in \`query\`, or pass \`method: "POST"\` to probe whether the endpoint accepts one.`);
      }

      /* The check. Findings are reported, never enforced: the specification is
         itself wrong in places (docs/BEMAP-BUGS.md), and the service has the
         last word. Repeats are grouped and the list capped: a trace of 2 000
         points with one wrong name once made a half-megabyte answer. */
      const bodyIssues = parsed !== undefined && op?.request?.name ? checkBody(parsed, op.request.name, snapshot) : [];
      if (op?.requestRequired && !hasBody && verb !== 'GET') {
        bodyIssues.push({
          path: '',
          kind: 'missing',
          message: `This operation takes a JSON body${op.request?.name ? `, \`${op.request.name}\`` : ''}, and none was given.`,
        });
      }
      const checkLines = [];
      if ((parsed !== undefined || bodyIssues.length) && op?.request?.name) {
        checkLines.push(`## Checked against \`${op.request.name}\``, '');
        if (bodyIssues.every((issue) => issue.kind === 'alias')) checkLines.push('Every field name and enum value is declared; every required field is present.');
        checkLines.push(...issueLines(bodyIssues), '');
      } else if (parsed !== undefined && !op) {
        checkLines.push('_This endpoint is not in the specification, so the body could not be checked._', '');
      }
      /* The query string, which most GETs carry instead of a body — and where a
         misspelt parameter is dropped as silently as a misspelt field. */
      const queryString = endpoint.includes('?') ? endpoint.slice(endpoint.indexOf('?') + 1) : '';
      const takesQuery = (op?.parameters ?? []).some((parameter) => parameter.in === 'query');
      const queryIssues = op && (queryString || takesQuery) ? checkQuery(queryString, op.parameters ?? [], snapshot) : [];
      if (op && (queryString || takesQuery)) {
        checkLines.push(`## Checked against the query parameters of \`${op.key}\``, '');
        if (queryIssues.length === 0) checkLines.push('Every query parameter is declared, with a declared value; every required one is present.');
        checkLines.push(...issueLines(queryIssues), '');
      } else if (queryString && !op) {
        checkLines.push('_This endpoint is not in the specification, so the query could not be checked._', '');
      }
      const issues = [...bodyIssues, ...queryIssues];

      const refused = validateOnly ? null : liveRefused();
      if (validateOnly || refused) {
        /* Nothing to check still says whether the endpoint exists: a correct
           GET that takes nothing, and a misspelt path, used to get the same
           error. */
        if (!checkLines.length && !op) {
          const near = (lookup?.candidates ?? []).slice(0, 5).map((candidate) => `\`${candidate.key}\``);
          /* The path exists under another method: said as such, never as a
             path the specification does not have. */
          const bare = pathOf(path ?? '', snapshot.basePath);
          const methods = snapshot.operations.filter((candidate) => candidate.path.toLowerCase() === bare.toLowerCase()).map((candidate) => candidate.method);
          if (methods.length) {
            return failure(`\`${verb} ${echo(endpoint)}\` is not in the specification: this path is declared for ${methods.join(' and ')}.${refused ? `\n${refused}` : ''}`);
          }
          return failure(`\`${echo(endpoint)}\` is not in the specification${near.length ? `. Closest: ${near.join(', ')}` : ''}.${refused ? `\n${refused}` : ''}`);
        }
        if (!checkLines.length) {
          checkLines.push(
            op.request
              ? `\`${op.key}\` is in the specification. Its body, \`${op.request.name}\`, is optional: pass \`body\` to check one.`
              : `\`${op.key}\` is in the specification, and takes no body and no query parameter: there is nothing more to check.`,
            ''
          );
        }
        return sourced(
          truncate(
            [`# ${verb} ${endpoint} — checked, not sent`, '', ...checkLines].join('\n') +
              (refused
                ? `\n${refused}`
                : issues.some((issue) => issue.kind !== 'alias')
                  ? '\nFix these, then send it with `validateOnly: false`.'
                  : '\nSend it with `validateOnly: false` to see what the service does.'),
            MAX_RESPONSE_CHARS,
            'Check a smaller body.'
          )
        );
      }

      const client = new BemapClient({ env });
      if (!client.hasCredentials()) {
        throw new BemapAuthError(
          "Sending a request needs BEMAP_USER and BEMAP_KEY in this MCP server's environment. Checking it does not — " +
            'pass `validateOnly: true`. For live calls, ask the user to add both to this server\'s `env` in their MCP ' +
            'client configuration and restart it — never to paste them into the conversation.',
          'missing'
        );
      }
      const auth = Buffer.from(`${client.user}:${client.key}`).toString('base64');
      const started = Date.now();
      const response = await client.request(endpoint, {
        method: verb,
        body: hasBody ? body : undefined,
        headers: { authorization: `Basic ${auth}`, ...(hasBody ? { 'content-type': 'application/json' } : {}) },
      });
      const elapsed = Date.now() - started;
      const ok = response.status >= 200 && response.status < 300;

      let rendered = response.text;
      let image = null;
      if (response.binary) {
        /* Decoded as text, an image was a page of replacement characters: the
           picture and its size were both lost — and WMS paints its errors into
           a 200 image. */
        const size = response.bytes.length;
        const digest = createHash('sha256').update(response.bytes).digest('hex');
        rendered =
          `Binary body: ${size} bytes${response.truncated ? ', cut at the read limit' : ''}, sha256 ${digest.slice(0, 16)}…, ` +
          `first bytes ${response.bytes.subarray(0, 16).toString('hex')}.`;
        if (/^image\//i.test(response.contentType) && size <= MAX_IMAGE_BYTES && !response.truncated) {
          image = { type: 'image', data: response.bytes.toString('base64'), mimeType: response.contentType.split(';')[0].trim() };
          rendered += ' The image follows.';
        }
      } else if (!ok && /^\s*</.test(response.text)) {
        /* An XML error body carries the one useful sentence in <message> — on
           an unknown enum value it lists every accepted one — so keep it whole.
           A successful XML answer — a WMS GetCapabilities, a KML — is the body
           itself, and was being cut to its <title>. */
        const code = response.text.match(/<code>([^<]*)<\/code>/i)?.[1];
        const message = response.text.match(/<message>([\s\S]*?)<\/message>/i)?.[1];
        const title = response.text.match(/<title>([^<]+)<\/title>/i)?.[1];
        rendered = [code, message].filter(Boolean).join('\n\n') || title || response.text.slice(0, 400);
      } else {
        try {
          rendered = JSON.stringify(JSON.parse(response.text), null, 2);
        } catch {
          /* Not JSON — CSV, KML, XML. Leave as is. */
        }
      }

      /* The response first, the check after it: the answer a model needs is
         what the service did, and a long check list must not push it out of
         reach. */
      const out = [
        `# ${verb} ${endpoint} → HTTP ${response.status}${ok ? ' ✓' : ' ✗'}`,
        '',
        `- Environment: ${client.baseUrl}`,
        pastedHost && pastedHost !== new URL(client.baseUrl).host
          ? `- The host in \`path\`, ${pastedHost}, is not this environment's: the request went to ${client.baseUrl}. Pass \`env\` to choose it.`
          : null,
        `- Elapsed: ${elapsed} ms`,
        response.contentType ? `- Content-Type: ${response.contentType}` : null,
        response.truncated ? '- The body was cut at the read limit: what follows is its beginning.' : null,
        op && op.method !== verb ? `- The specification declares **${op.method}** for this path, not ${verb}; a \`405\` means exactly that.` : null,
        '',
        ok ? '## Response' : '## Error',
        '',
        '```',
        truncate(rendered, maxChars, ''),
        '```',
      ].filter((line) => line !== null);
      if (ok && issues.some((issue) => issue.kind === 'unknown')) {
        out.push(
          '',
          '> ⚠️ **A `200` here does not mean every field was read.** BeMap answers `200` whether or not it recognised ' +
            'the fields flagged below — compare against a response without them before relying on one.'
        );
      }
      if (response.status === 302) {
        out.push('', '> `302` means BeMap saw no Basic credentials — none, or a scheme it does not read, such as `Bearer` — and redirected to its login page.');
      }
      if (response.status === 401) {
        out.push('', '> `401` means BeMap read the Basic credentials and refused them: check BEMAP_USER / BEMAP_KEY, and that the account exists on this environment.');
      }
      if (response.status === 400) {
        out.push(
          '',
          /Access Denied/i.test(response.text)
            ? '> `400 "Access Denied"` is a missing entitlement, not a payload error. `GET /bgis/service/acl/1.0/user/details` lists the roles this account holds.'
            : '> `400` is BeMap refusing the payload. The message above is its own verdict — it overrides the specification.'
        );
      }
      if (checkLines.length) out.push('', ...checkLines);
      const answer = truncate(out.join('\n'), MAX_RESPONSE_CHARS, 'Lower `maxChars`, or check a smaller body.');
      return { content: [{ type: 'text', text: answer }, ...(image ? [image] : [])] };
    })
);

/* --------------------------------------------------------------------- boot */

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // stdout carries the protocol; diagnostics go to stderr — where MCP clients
  // write their server logs, so the release a session is using is on record.
  console.error(`bemap-docs ${SERVER_VERSION} ready (stdio) — ${DESCRIPTION}`);
}

main().catch((error) => {
  console.error(`Fatal: ${error.message}`);
  process.exit(1);
});

#!/usr/bin/env node
/* ======================================================================
 * BEMAP MCP SERVER
 *
 * Exposes the BeNomad BeMap REST API documentation to AI coding assistants
 * over the Model Context Protocol, on stdio.
 *
 * Design: documentation is served from the snapshot committed under `data/`,
 * so browsing, searching and reading parameter tables need no credentials and
 * no network. Only `bemap_try_request` talks to the live backend, and only it
 * requires BEMAP_USER / BEMAP_KEY.
 *
 * Every tool answers with Markdown sized for a model's context — excerpts and
 * summaries by default, full tables on request — because the corpus is ~3 MB
 * and a single class can expand past 85 KB (`RoutingResponse`).
 * ====================================================================== */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

import {
  BemapClient,
  BemapAuthError,
  compareBgisVersions,
  environmentNames,
} from './client.js';
import {
  listPages,
  listServices,
  loadManifest,
  readPage,
  readSchema,
  resolvePage,
  resolveSchemas,
  snapshotStatus,
  SnapshotMissingError,
} from './snapshot.js';
import { probedRequired, requiredness } from './required.js';
import { shippedSkills, serverVersion } from './skill-version.js';
import { targetVersion, versionCaveat } from './target-version.js';
import { search, searchFields } from './search.js';
import {
  formatRoleExpression,
  MAX_RESPONSE_CHARS,
  parseSchemaSections,
  renderSchema,
  renderServiceCatalogue,
  truncate,
} from './format.js';

const PAGE_KINDS = ['reference', 'example', 'tutorial', 'glossary', 'other'];

/** Wrap Markdown as an MCP text result. */
const text = (body) => ({ content: [{ type: 'text', text: body }] });

/**
 * One line naming where the answer came from, appended to every response that
 * states a fact about the API.
 *
 * A model reading a tool result has no way to tell a measurement from a
 * transcription, or a snapshot from the running service — and the answers here
 * are all three at once. Without a source line, "the documentation says" and
 * "the service does" are indistinguishable in the transcript, and the
 * distinction is the whole reason this server exists: the snapshot describes a
 * release that may be ahead of the environment being called, and it describes
 * annotations rather than behaviour.
 *
 * Computed once. The manifest does not change while the process runs, and this
 * is appended to every answer, so re-deriving it per call would be a read per
 * tool call for a string that cannot differ.
 */
let provenanceLine = null;

/**
 * The provenance footer for snapshot-derived answers.
 *
 * @returns {Promise<string>} A Markdown line, ready to append.
 */
async function sourceLine() {
  if (provenanceLine !== null) return provenanceLine;
  const manifest = await loadManifest();
  const status = await snapshotStatus();
  const parts = [
    `snapshot ${status.generatedAt.slice(0, 10)} (${status.ageDays}d)`,
    manifest.sourceServerVersion ? `bgis ${manifest.sourceServerVersion}` : null,
    'not the live service',
  ].filter(Boolean);

  /* The gap between what the snapshot documents and what the caller's
     environment runs belongs here rather than only in `bemap_status`: this is
     the footer on the answers that hand over field names, and `bemap_status` is
     the tool nobody calls before writing a request. Opt-in — without
     BEMAP_TARGET_ENV and credentials this probes nothing and adds nothing. */
  const caveat = versionCaveat(manifest.sourceServerVersion, await targetVersion());

  provenanceLine =
    `\n\n---\n_Source: ${parts.join(' · ')} — verify with \`bemap_try_request\`, or \`bemap_status\` for drift._` +
    (caveat ? `\n\n${caveat}` : '');
  return provenanceLine;
}

/**
 * Wrap a snapshot-derived answer, appending its provenance.
 *
 * Applied after truncation on purpose: a footer cut off by the 60 000-character
 * budget would leave exactly the long answers — the ones a model is most likely
 * to copy from — unattributed.
 *
 * @param {string} body - The rendered Markdown.
 * @returns {Promise<object>} MCP tool result.
 */
async function sourced(body) {
  return text(body + (await sourceLine()));
}

/** Wrap an error as an MCP error result, keeping the message actionable. */
const failure = (message) => ({ content: [{ type: 'text', text: message }], isError: true });

/**
 * Run a tool handler, converting the project's known error types into clear
 * guidance rather than stack traces.
 *
 * @param {() => Promise<object>} handler
 * @returns {Promise<object>} MCP tool result.
 */
async function guard(handler) {
  try {
    return await handler();
  } catch (error) {
    if (error instanceof SnapshotMissingError || error instanceof BemapAuthError) {
      return failure(error.message);
    }
    return failure(`${error.message}`);
  }
}

/** This server's own version, reported by `bemap_status`. */
const SERVER_VERSION = serverVersion();

const server = new McpServer(
  { name: 'bemap-docs', version: SERVER_VERSION },
  {
    instructions:
      'BeNomad BeMap API reference. Start with `bemap_search` for a concept or field name, ' +
      'or `bemap_list_services` to see the catalogue. `bemap_get_parameters` carries the ' +
      "backend's own introspection and is the reference for how a field is spelled, typed " +
      'and what it accepts — prefer it over inferring field names from examples, and never ' +
      'invent parameters these tools do not show. It is not authoritative about **meaning ' +
      'or requiredness**: the introspection describes annotations, and where a probe has ' +
      'measured the running service the tools say so. A field shown as `unspecified` is ' +
      'untested, not mandatory; settle one with `bemap_try_request` by deleting it from a ' +
      'body that works.',
  }
);

/* ---------------------------------------------------------------- catalogue */

server.registerTool(
  'bemap_list_services',
  {
    title: 'List BeMap services',
    description:
      'Catalogue of documented BeMap services: endpoint path, the HTTP methods that path ' +
      'accepts, required entitlement role, available API versions and page counts. Use this to ' +
      'discover what exists before drilling into a specific service. A service often serves ' +
      'several endpoints and the row shows one — call `bemap_get_service_doc` for the rest. ' +
      'The role comes from the documentation index, which gates a page behind the entitlement ' +
      'of the product it illustrates; where no page of the service declares one the cell is ' +
      'empty rather than guessed.',
    inputSchema: {
      restOnly: z
        .boolean()
        .optional()
        .describe('Only REST services, excluding the JS and Flutter SDK docs. Default true.'),
      family: z
        .string()
        .optional()
        .describe('Restrict to one documentation family, e.g. "rest_1_0_0" or "jsapi_1_0_0".'),
    },
    annotations: { readOnlyHint: true },
  },
  async ({ restOnly = true, family }) =>
    guard(async () => {
      const status = await snapshotStatus();
      const services = await listServices({ restOnly: restOnly && !family, family });
      if (services.length === 0) return failure('No services matched that filter.');

      return sourced(
        `# BeMap services (${services.length})\n\n` +
          `${renderServiceCatalogue(services)}\n\n` +
          `_${status.notice}_\n\n` +
          'Next: `bemap_get_service_doc` for a service, or `bemap_get_parameters` for its ' +
          'request/response fields.'
      );
    })
);

server.registerTool(
  'bemap_status',
  {
    title: 'BeMap snapshot and environment status',
    description:
      'Report which documentation snapshot is loaded, how old it is, what it covers, and — ' +
      'when credentials are configured — the live server version and current quota state. ' +
      'Use this to check whether the documentation may have drifted from the live API.',
    inputSchema: {
      checkLive: z
        .boolean()
        .optional()
        .describe('Also query the live backend for server version and quotas. Default false.'),
      env: z
        .enum(environmentNames())
        .optional()
        .describe('Environment for the live check. Defaults to $BEMAP_ENV, then prod.'),
    },
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
  async ({ checkLive = false, env }) =>
    guard(async () => {
      /* This is the one tool that must answer when the snapshot is gone. Every
         other tool failing with "no snapshot under data/" is the symptom a user
         reports, and a status tool that fails the same way tells them nothing
         they did not already know — it is exactly when a diagnosis is needed
         that the diagnostic tool must not need the thing that is missing. */
      let manifest;
      try {
        manifest = await loadManifest();
      } catch (error) {
        if (!(error instanceof SnapshotMissingError)) throw error;
        return text(
          [
            '# BeMap MCP status',
            '',
            '- ❌ **No documentation snapshot.** `data/manifest.json` is missing or unreadable, ' +
              'so every tool but this one will fail. The install is incomplete rather than ' +
              'misconfigured: the snapshot ships with the package.',
            ...shippedSkills().map(
              (skill) => `- Companion skill shipped here: **${skill.name} v${skill.version}**`
            ),
            `- Server: **bemap-docs ${SERVER_VERSION}**, Node ${process.version}`,
            '',
            `> ${error.message.split('\n')[0]}`,
            '',
            'Reinstall the package, then restart the MCP client.',
          ].join('\n')
        );
      }
      const status = await snapshotStatus();
      const byFamily = manifest.pages.reduce((acc, page) => {
        acc[page.family] = (acc[page.family] ?? 0) + 1;
        return acc;
      }, {});

      const lines = [
        '# BeMap MCP status',
        '',
        `- Snapshot generated: **${status.generatedAt}** (${status.ageDays} day(s) ago)`,
        `- Source environment: **${status.environment}** (${manifest.sourceBaseUrl})`,
        manifest.sourceServerVersion
          ? `- Describes: **bgis ${manifest.sourceServerVersion}**` +
            (manifest.sourceServerBuiltAt ? ` (built ${manifest.sourceServerBuiltAt})` : '') +
            (manifest.sourceJsApiVersion ? ` · JS API ${manifest.sourceJsApiVersion}` : '')
          : null,
        // A snapshot taken from a pre-release build documents fields that no
        // published environment serves yet. Saying so once, up front, is the
        // difference between "not documented" and "not deployed".
        manifest.sourceServerStatus
          ? `- ⚠️ Pre-release: this documents a **${manifest.sourceServerStatus}** build. ` +
            'Fields it describes may not exist on the environment you are calling — confirm with ' +
            '`bemap_try_request` against the environment you target.'
          : null,
        `- Coverage: **${manifest.counts.pages} pages**, **${manifest.counts.schemas} parameter schemas**`,
        // The skill is installed by hand, separately, and drifts. An assistant
        // that has been taught a skill can compare the number the skill states
        // with this one; without it, a stale skill is indistinguishable from a
        // current one and it is the skill that will be believed.
        `- Server: **bemap-docs ${SERVER_VERSION}** on Node ${process.version}`,
        ...shippedSkills().map(
          (skill) =>
            `- Companion skill shipped here: **${skill.name} v${skill.version}**. ` +
            'If the copy you were taught announces a different version, it is out of ' +
            'date — prefer these tools over it and say so.'
        ),
        manifest.environmentProfile?.cartoRelease
          ? `- Map data at capture: **${manifest.environmentProfile.cartoRelease}** ` +
            `(${manifest.environmentProfile.limits.length} service limits recorded from ` +
            `**${manifest.environmentProfile.environment ?? manifest.sourceEnvironment}** — ` +
            'see `bemap_limits`)'
          : null,
        `- Families: ${Object.entries(byFamily)
          .sort()
          .map(([name, count]) => `${name} (${count})`)
          .join(', ')}`,
        status.isStale ? `\n> ⚠️ ${status.notice}` : '',
      ];

      if (checkLive) {
        const client = new BemapClient({ env });
        lines.push('', '## Live backend');
        if (!client.hasCredentials()) {
          lines.push(
            '- Not checked: BEMAP_USER / BEMAP_KEY are not set. Documentation still works ' +
              'offline from the snapshot; live checks and `bemap_try_request` need credentials.'
          );
        } else {
          lines.push(`- Target: ${client.baseUrl}`);

          try {
            const live = await client.serverVersion();
            lines.push(
              `- Running: **bgis ${live.version ?? 'unknown'}**` +
                (live.builtAt ? ` (built ${live.builtAt})` : '')
            );

            // A snapshot describing a different release than the target is the
            // one failure mode that produces confidently wrong answers:
            // fields documented on a newer build simply do not exist yet.
            const snapshotVersion = manifest.sourceServerVersion;
            if (snapshotVersion && live.version && snapshotVersion !== live.version) {
              const { order } = compareBgisVersions(snapshotVersion, live.version);
              const direction =
                order > 0
                  ? `The snapshot is **ahead** of this environment: it documents ${snapshotVersion} ` +
                    `while ${client.baseUrl} still runs ${live.version}. Newly documented fields ` +
                    'will be rejected here until the environment is upgraded.'
                  : order < 0
                    ? `The snapshot is **behind** this environment: it documents ${snapshotVersion} ` +
                      `while ${client.baseUrl} runs ${live.version}. Fields added since are absent ` +
                      'from the documentation — install a newer release of this package.'
                    : `This snapshot documents bgis ${snapshotVersion} and ${client.baseUrl} runs ` +
                      `bgis ${live.version} — the same release, different builds.`;
              lines.push(
                '',
                `> ⚠️ **Version mismatch.** ${direction} Confirm anything version-sensitive with ` +
                  '`bemap_try_request` against the environment you actually target.'
              );
            } else if (snapshotVersion && live.version) {
              lines.push(`- Snapshot and target agree on bgis ${live.version}.`);
            }
          } catch (error) {
            lines.push(`- Server version: failed — ${error.message}`);
          }

          try {
            const auth = Buffer.from(`${client.user}:${client.key}`).toString('base64');
            const { status: code, text: body } = await client.request(
              '/bgis/service/quotas/1.0/getAllByCurrentAccount',
              { headers: { authorization: `Basic ${auth}` } }
            );
            lines.push(`- Quotas: HTTP ${code} — \`${body.slice(0, 200).trim()}\``);
          } catch (error) {
            lines.push(`- Quotas: failed — ${error.message}`);
          }
        }
      }

      return text(lines.filter(Boolean).join('\n'));
    })
);

server.registerTool(
  'bemap_limits',
  {
    title: 'Request limits, map data release and geocoding back-ends',
    description:
      'Hard limits BeMap enforces per service — maximum waypoints per routing mode, isochrone ' +
      'ceilings, batch sizes, radii — plus the map data release and the list of available ' +
      'geocoding back-ends. None of this is in the written documentation: it is served by the ' +
      'backend at runtime and it differs between environments. Consult it before sizing a ' +
      'request, and whenever a payload works on one environment but not another.',
    inputSchema: {
      service: z
        .string()
        .optional()
        .describe('Filter to one service, e.g. "Routing", "TraceRoute", "Geofencing".'),
      live: z
        .boolean()
        .optional()
        .describe(
          'Query the target environment instead of the snapshot, and flag any limit that ' +
            'differs from it. Needs credentials. Default false.'
        ),
      env: z
        .enum(environmentNames())
        .optional()
        .describe('Environment for the live check. Defaults to $BEMAP_ENV, then beta.'),
    },
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
  async ({ service, live = false, env }) =>
    guard(async () => {
      const manifest = await loadManifest();
      const snapshot = manifest.environmentProfile;

      if (!snapshot && !live) {
        return text(
          'The snapshot holds no environment profile — it predates this feature, or the ' +
            'account used to generate it lacked the geocoding entitlement.\n\n' +
            'Pass `live: true` to query the backend now.'
        );
      }

      let profile = snapshot;
      let liveProfile = null;
      if (live) {
        const client = new BemapClient({ env });
        if (!client.hasCredentials()) {
          throw new BemapAuthError(
            'A live limits check needs BEMAP_USER and BEMAP_KEY. Without them, the snapshot ' +
              'values are still available — call this tool without `live`.',
            'missing'
          );
        }
        liveProfile = await client.geoServerInfo();
        profile = liveProfile;
      }

      const filtered = service
        ? profile.limits.filter((limit) =>
            limit.service.toLowerCase().includes(service.trim().toLowerCase())
          )
        : profile.limits;

      if (filtered.length === 0) {
        const available = [...new Set(profile.limits.map((limit) => limit.service))].sort();
        return text(
          `No limits recorded for "${service}".\n\nServices with limits: ${available.join(', ')}.`
        );
      }

      /** Look up the snapshot counterpart of a live limit, for comparison. */
      const snapshotValue = (limit) =>
        snapshot?.limits.find((l) => l.service === limit.service && l.key === limit.key)?.value;

      const out = [
        '# BeMap limits and environment profile',
        '',
        `- Map data release: **${profile.cartoRelease ?? 'unknown'}**`,
        `- Geocoding back-ends: ${profile.geoservers.map((g) => `\`${g}\``).join(', ')}`,
        profile.truckAttributes !== null
          ? `- Truck attributes: ${profile.truckAttributes ? 'available' : 'not available'}`
          : null,
        `- Source: ${
          live
            ? `live from ${new BemapClient({ env }).baseUrl}`
            : `snapshot, captured from **${snapshot.environment ?? manifest.sourceEnvironment}**` +
              (snapshot.environment && snapshot.environment !== manifest.sourceEnvironment
                ? ` (the documentation itself comes from ${manifest.sourceEnvironment}, which ` +
                  'reports no usable limits)'
                : '')
        }`,
        '',
      ].filter((line) => line !== null);

      // Surface environment drift explicitly: a limit or back-end that differs
      // is exactly what makes a payload pass here and fail there.
      if (live && snapshot) {
        const changed = filtered.filter((limit) => {
          const before = snapshotValue(limit);
          return before !== undefined && before !== limit.value;
        });
        const geoserverDrift =
          JSON.stringify(snapshot.geoservers) !== JSON.stringify(profile.geoservers);
        const cartoDrift = snapshot.cartoRelease !== profile.cartoRelease;

        if (changed.length > 0 || geoserverDrift || cartoDrift) {
          out.push(
            '> ⚠️ **This environment differs from the snapshot** ' +
              `(${snapshot.environment ?? manifest.sourceEnvironment}).`
          );
          if (cartoDrift) {
            out.push(
              `> - Map data: snapshot \`${snapshot.cartoRelease}\` → here \`${profile.cartoRelease}\``
            );
          }
          if (geoserverDrift) {
            const gone = snapshot.geoservers.filter((g) => !profile.geoservers.includes(g));
            const added = profile.geoservers.filter((g) => !snapshot.geoservers.includes(g));
            out.push(
              '> - Geocoding back-ends: ' +
                [
                  gone.length ? `absent here: ${gone.join(', ')}` : null,
                  added.length ? `only here: ${added.join(', ')}` : null,
                ]
                  .filter(Boolean)
                  .join(' · ') +
                '. Passing a `geoserver` this environment does not have will fail.'
            );
          }
          for (const limit of changed) {
            out.push(
              `> - \`${limit.service}.${limit.key}\`: snapshot ${snapshotValue(limit)} → here ${limit.value}`
            );
          }
          out.push('');
        } else {
          out.push(
            `_Identical to the snapshot (${snapshot.environment ?? manifest.sourceEnvironment})._`,
            ''
          );
        }
      }

      out.push('| Service | Limit | Value | Unit | Bound |', '|---|---|---|---|---|');
      for (const limit of filtered) {
        out.push(
          `| ${limit.service} | \`${limit.key}\` | **${limit.value}** | ${limit.unit ?? '—'} | ${limit.bound ?? '—'} |`
        );
      }

      return sourced(truncate(out.join('\n'), MAX_RESPONSE_CHARS, 'Filter with `service`.'));
    })
);

/* ------------------------------------------------------------------- search */

server.registerTool(
  'bemap_search',
  {
    title: 'Search BeMap documentation',
    description:
      'Full-text search across every documentation page and parameter schema, returning ' +
      'ranked excerpts. This is the best entry point for a concept, an option name or an ' +
      'error ("toll cost", "EVT_TRAFFIC", "departureTime format", "isochrone").',
    inputSchema: {
      query: z.string().min(2).describe('Search terms. Wrap a phrase in double quotes to require it verbatim.'),
      limit: z.number().int().min(1).max(40).optional().describe('Maximum results. Default 10.'),
      type: z
        .enum(['page', 'schema'])
        .optional()
        .describe('Restrict to documentation pages or to parameter schemas.'),
      restOnly: z
        .boolean()
        .optional()
        .describe(
          'Restrict to the REST corpus, excluding the JS and Flutter SDK pages. Keeps the ' +
            'root-level REST pages — authentication, WMS, the glossaries. Default false.'
        ),
    },
    annotations: { readOnlyHint: true },
  },
  async ({ query, limit = 10, type, restOnly = false }) =>
    guard(async () => {
      const results = await search(query, { limit, type, restOnly });
      if (results.length === 0) {
        return text(
          `No match for "${query}".\n\nTry a single distinctive term, a field name, or an ` +
            'enum value. `bemap_list_services` shows what is covered.'
        );
      }

      const out = [`# Search: "${query}" — ${results.length} result(s)`, ''];
      for (const [rank, result] of results.entries()) {
        const label =
          result.type === 'page'
            ? `**${result.title}** · \`${result.id}\`` +
              (result.meta.endpoint ? ` · \`${result.meta.endpoint}\`` : '') +
              (result.meta.kind ? ` · ${result.meta.kind}` : '')
            : `**${result.title}** (schema) · \`${result.id}\``;
        out.push(`## ${rank + 1}. ${label}`);
        for (const snippet of result.excerpts) out.push(`> ${snippet}`);
        out.push('');
      }
      out.push(
        '---\nRetrieve a full page with `bemap_get_service_doc`, or a schema with ' +
          '`bemap_get_parameters`.'
      );
      return sourced(truncate(out.join('\n'), MAX_RESPONSE_CHARS, 'Narrow the query or lower `limit`.'));
    })
);

server.registerTool(
  'bemap_find_field',
  {
    title: 'Find a request or response field',
    description:
      'Look up a field by name across the request and response schemas of the documented ' +
      'operations, returning the table row grouped by the class that declares it, with its ' +
      'type, enum values and the same three-state requiredness `bemap_get_parameters` ' +
      'reports — `required` and a probed `optional` were measured live, `unspecified` means ' +
      'untested rather than mandatory. Use this to confirm a field exists and how it is ' +
      'spelled before writing code. The snapshot covers the documented schemas, not every ' +
      'class the backend declares, so a miss means "not documented here" rather than "does ' +
      'not exist".',
    inputSchema: {
      field: z.string().min(2).describe('Field name or fragment, e.g. "departureTime" or "polyline".'),
      limit: z.number().int().min(1).max(80).optional().describe('Maximum rows. Default 25.'),
    },
    annotations: { readOnlyHint: true },
  },
  async ({ field, limit = 25 }) =>
    guard(async () => {
      const rows = await searchFields(field, { limit });
      if (rows.length === 0) {
        return text(
          `No field matching "${field}" in this snapshot's parameter schemas.\n\n` +
            'That is not proof the field does not exist: the snapshot holds the schemas of ' +
            'the documented operations, and the backend declares more classes than that. ' +
            'Check the spelling first (the API uses lowerCamelCase), try `bemap_search` for ' +
            'the concept, and settle existence with `bemap_try_request` — a field the service ' +
            'validates and echoes back is real, while an unknown field name is accepted and ' +
            'silently dropped, so compare two responses rather than reading the status code.'
        );
      }

      /* Key on the fully-qualified name, not the simple one. `v1_0_0` and
         `v2_0_0` both declare an `EvSmartRoutingRequest`, and grouping by
         simple name merged them under one heading that then printed only the
         first FQN — so the two rows appeared to contradict each other
         (`double` and `float` for `initBatLvl`) with nothing saying which
         class each belonged to. */
      const grouped = new Map();
      for (const row of rows) {
        if (!grouped.has(row.className)) grouped.set(row.className, []);
        grouped.get(row.className).push(row);
      }

      /* Requiredness is resolved here the same way the schema renderer resolves
         it, from the same table — this tool used to print the raw table row, so
         a blank cell came back blank here and `**required**` there, for one
         field on one server. Only a document's root section carries its class's
         probed verdict; a nested section is another class entirely. */
      const verdictFor = (entry) =>
        requiredness(
          entry.field,
          entry.optional,
          entry.isRoot ? probedRequired(entry.className) : null
        );

      const out = [`# Field search: "${field}" — ${rows.length} match(es)`, ''];
      if (rows.some((entry) => verdictFor(entry) === 'unspecified')) {
        out.push(
          '> `unspecified` means the introspection left the cell blank and no probe has ' +
            'settled it — **not** that the field is mandatory.',
          ''
        );
      }
      for (const [className, entries] of grouped) {
        out.push(`## ${entries[0].simpleName}`, `\`${className}\``, '');
        out.push('| Field | Declared in | Required? | Description |', '|---|---|---|---|');
        for (const entry of entries) {
          const name = entry.deprecated ? `~~${entry.field}~~` : entry.field;
          const verdict = verdictFor(entry);
          out.push(
            `| \`${name}\` | ${entry.isRoot ? entries[0].simpleName : entry.section} | ` +
              `${verdict === 'required' ? '**required**' : verdict} | ${entry.description} |`
          );
        }
        out.push('');
      }
      return sourced(truncate(out.join('\n'), MAX_RESPONSE_CHARS, 'Use a more specific field name.'));
    })
);

/* ---------------------------------------------------------------- documents */

server.registerTool(
  'bemap_get_service_doc',
  {
    title: 'Read a service documentation page',
    description:
      'Full documentation for one service: description, HTTP method, endpoint URI, and the ' +
      'request and response schemas. Accepts a service name ("routing"), a page id ' +
      '("rest_1_0_0/routing-service.md") or a title. A service name resolves to the reference ' +
      'page, which is the one carrying the endpoint and the schemas. Example and tutorial ' +
      'pages are prose written for the documentation site: most of them hold their sample in ' +
      'an empty `<textarea>` the site fills in with JavaScript, so they show no payload here. ' +
      'For a real request and response body, use `bemap_try_request`.',
    inputSchema: {
      service: z
        .string()
        .describe('Service name, page id, or title. E.g. "routing", "nearpoi", "charging station".'),
      kind: z
        .enum(PAGE_KINDS)
        .optional()
        .describe('Prefer a page kind: reference (default resolution), example or tutorial.'),
      includeRelated: z
        .boolean()
        .optional()
        .describe('Also list the other pages and schemas for this service. Default true.'),
    },
    annotations: { readOnlyHint: true },
  },
  async ({ service, kind, includeRelated = true }) =>
    guard(async () => {
      let page = null;

      if (kind) {
        const candidates = await listPages({ kind });
        const needle = service.trim().toLowerCase();
        page =
          candidates.find((entry) => entry.service === needle) ??
          candidates.find((entry) => entry.file.toLowerCase().includes(needle)) ??
          candidates.find((entry) => entry.title.toLowerCase().includes(needle)) ??
          null;
      }
      page ??= await resolvePage(service);

      if (!page) {
        const services = await listServices({ restOnly: true });
        return text(
          `No documentation page matches "${service}".\n\nKnown services: ` +
            `${services.map((entry) => entry.service).join(', ')}.`
        );
      }

      const body = await readPage(page.id);
      const out = [
        `# ${page.title}`,
        '',
        `- Page: \`${page.id}\` (${page.kind}, ${page.family}${page.isLatest ? ', current version' : ''})`,
        page.endpoint ? `- Endpoint: \`${page.endpoint}\`` : null,
        page.methods?.length > 0 ? `- HTTP method: **${page.methods.join('** or **')}**` : null,
        page.role
          ? `- Required role: **${formatRoleExpression(page.role)}**` +
            (page.roleInferred ? ' *(inferred from a sibling page)*' : '')
          : null,
        '',
        '---',
        '',
        body,
      ].filter((line) => line !== null);

      if (includeRelated) {
        const siblings = (await listPages({ service: page.service })).filter(
          (entry) => entry.id !== page.id
        );
        if (siblings.length > 0) {
          out.push('', '---', '', '## Other pages for this service', '');
          for (const sibling of siblings) {
            out.push(`- \`${sibling.id}\` — ${sibling.title} (${sibling.kind})`);
          }
        }
        if (page.classNames?.length > 0) {
          out.push('', '## Parameter schemas', '');
          for (const className of page.classNames) {
            out.push(`- \`${className}\` — read with \`bemap_get_parameters\``);
          }
        }
      }

      return sourced(
        truncate(out.join('\n'), MAX_RESPONSE_CHARS, 'Set `includeRelated` to false to shorten.')
      );
    })
);

server.registerTool(
  'bemap_get_parameters',
  {
    title: 'Get request/response parameters for a class',
    description:
      "A BeMap request or response class's field names, types, enum values and deprecation, " +
      "generated from the backend's own introspection. Accepts a simple name " +
      '("RoutingRequest") or a fully-qualified class name. Prefer `summary` first — full ' +
      'tables can exceed 40 KB. The **Required?** column has three values and they do not ' +
      'carry equal weight: `required` and a probed `optional` were measured against the live ' +
      'service by removing the field from a request that works, while `unspecified` means the ' +
      'introspection left the cell blank and nothing has settled it. `unspecified` is not ' +
      'mandatory — the introspection is wrong in both directions, over-marking fields the ' +
      'service accepts without and marking optional a handful it refuses. Settle one with ' +
      '`bemap_try_request`.',
    inputSchema: {
      className: z
        .string()
        .describe('Class name, simple or fully-qualified. E.g. "RoutingRequest".'),
      summary: z
        .boolean()
        .optional()
        .describe(
          'Condensed listing grouped into required/optional/deprecated, with prose trimmed and ' +
            'at most the first 12 enum values named, the rest counted — `options` alone has 61. ' +
            'Default true; set false, or pass `section`, for the complete vocabulary.'
        ),
      section: z
        .string()
        .optional()
        .describe('Render only one nested class section, e.g. "CoordinateSat" or "RoutingDest".'),
    },
    annotations: { readOnlyHint: true },
  },
  async ({ className, summary = true, section }) =>
    guard(async () => {
      const matches = await resolveSchemas(className);
      if (matches.length === 0) {
        return text(
          `No schema named "${className}" in the snapshot.\n\n` +
            'Use `bemap_search` with `type: "schema"` to find the right class, or ' +
            '`bemap_get_service_doc` to see which classes a service uses.'
        );
      }

      const chosen = matches[0];
      const body = await readSchema(chosen.className);
      const sections = parseSchemaSections(body);
      const rendered = renderSchema(sections, {
        summary,
        only: section,
        className: chosen.className,
      });

      const out = [
        `# ${chosen.simpleName}`,
        '',
        `\`${chosen.className}\``,
        '',
        chosen.referencedBy?.length > 0
          ? `Used by: ${chosen.referencedBy.map((id) => `\`${id}\``).join(', ')}`
          : null,
        matches.length > 1
          ? `\n> Also matched ${matches.length - 1} other class(es): ` +
            `${matches.slice(1, 5).map((entry) => `\`${entry.className}\``).join(', ')}. ` +
            'Pass a fully-qualified name to pick one.'
          : null,
        '',
        summary && !section
          ? `_Condensed view. ${sections.length} class section(s): ` +
            `${sections.map((entry) => entry.name).join(', ')}. ` +
            'Pass `summary: false` for the full tables, or `section` for one class._\n'
          : null,
        '---',
        '',
        rendered,
      ].filter((line) => line !== null);

      return sourced(
        truncate(
          out.join('\n'),
          MAX_RESPONSE_CHARS,
          'Use `summary: true`, or `section` to target one nested class.'
        )
      );
    })
);

/* ---------------------------------------------------------------- execution */

server.registerTool(
  'bemap_try_request',
  {
    title: 'Execute a real BeMap API request',
    description:
      'Send an actual request to the BeMap backend and return the real status and response. ' +
      'Use it to validate a payload a developer is writing — it turns "I think this field ' +
      'exists" into a verified answer, and surfaces the real error text on rejection. ' +
      'Requires BEMAP_USER / BEMAP_KEY. These are computation services with no side effects, ' +
      'but calls do count against the account quota.',
    inputSchema: {
      service: z
        .string()
        .optional()
        .describe('Service name whose endpoint to resolve from the docs, e.g. "routing".'),
      path: z
        .string()
        .optional()
        .describe('Explicit endpoint path, e.g. "/bgis/service/routing/1.0". Overrides `service`.'),
      body: z
        .string()
        .optional()
        .describe('JSON request body as a string. Omit for GET endpoints.'),
      method: z
        .enum(['GET', 'POST'])
        .optional()
        .describe(
          'HTTP method. Defaults to the one the documentation declares for this endpoint, ' +
            'then to POST when a body is given, else GET.'
        ),
      env: z
        .enum(environmentNames())
        .optional()
        .describe('Target environment. Defaults to $BEMAP_ENV, then prod.'),
      maxChars: z
        .number()
        .int()
        .min(200)
        .max(MAX_RESPONSE_CHARS)
        .optional()
        .describe('Truncate the response body to this many characters. Default 8000.'),
    },
    annotations: { readOnlyHint: false, openWorldHint: true, idempotentHint: true },
  },
  async ({ service, path, body, method, env, maxChars = 8000 }) =>
    guard(async () => {
      let endpoint = path;
      /** @type {object|null} The documentation page backing this endpoint, when known. */
      let page = null;

      if (!endpoint) {
        if (!service) {
          return failure('Provide either `service` or `path`.');
        }
        page = await resolvePage(service);
        endpoint = page?.endpoint ?? null;
        if (!endpoint) {
          return failure(
            `Could not resolve an endpoint for "${service}". ` +
              'Call `bemap_get_service_doc` with that name — its reference page prints the ' +
              'endpoint URI — then pass it here as `path`.'
          );
        }
      } else {
        // An explicit path still benefits from the documented method: match it
        // against the catalogue, ignoring any format suffix or query string.
        const bare = endpoint.split('?')[0].replace(/\.(csv|json|xml)$/, '');
        page =
          (await listPages()).find(
            (entry) => entry.endpoint && entry.endpoint.split('?')[0] === bare
          ) ?? null;
      }

      const documented = page?.methods ?? [];

      if (body) {
        try {
          JSON.parse(body);
        } catch (error) {
          return failure(
            `The \`body\` is not valid JSON: ${error.message}\n\n` +
              'Fix the payload before sending — the backend would reject it anyway.'
          );
        }
      }

      const client = new BemapClient({ env });
      if (!client.hasCredentials()) {
        throw new BemapAuthError(
          'Executing a live request needs BEMAP_USER and BEMAP_KEY in the environment. ' +
            'Reading documentation does not — use `bemap_search`, `bemap_get_service_doc` ' +
            'or `bemap_get_parameters` instead.',
          'missing'
        );
      }

      // Sending POST to a GET-only endpoint returns a bare Tomcat 405 that says
      // nothing about the cause, so prefer what the page declares over the
      // body-presence guess when the documentation is unambiguous.
      const verb = method ?? (documented.length === 1 ? documented[0] : body ? 'POST' : 'GET');

      /* A body on a GET dies inside `fetch`, before any BeMap answer, with
         "Request with GET/HEAD method cannot have body" — which reads as a
         client bug rather than as the documentation disagreeing with the call.
         Probing a GET-documented endpoint with POST is a legitimate thing to
         want (`getlevelvehicleinfo` is documented GET on both versions), so say
         how instead of surfacing the runtime error. */
      if (body && (verb === 'GET' || verb === 'HEAD')) {
        return failure(
          `\`${endpoint}\` is documented as ${verb}-only` +
            `${page ? ` (\`${page.id}\`)` : ''}, and a ${verb} cannot carry a body.\n\n` +
            'Send the parameters in the query string, or pass `method: "POST"` explicitly ' +
            'to probe whether the endpoint accepts one — the documentation and the service ' +
            'do not always agree on the verb.'
        );
      }
      const auth = Buffer.from(`${client.user}:${client.key}`).toString('base64');
      const started = Date.now();
      const response = await client.request(endpoint, {
        method: verb,
        body,
        headers: {
          authorization: `Basic ${auth}`,
          ...(body ? { 'content-type': 'application/json' } : {}),
        },
      });
      const elapsed = Date.now() - started;

      const ok = response.status >= 200 && response.status < 300;
      const isMarkup = /^\s*</.test(response.text);
      let rendered = response.text;
      if (isMarkup) {
        // BeMap rejects payloads with an XML <ErrorResponse>. Its <message> is
        // the single most useful thing in the response — on an unknown enum
        // value it enumerates every accepted value — so keep it whole rather
        // than clipping it like a generic HTML error page.
        const bemapCode = response.text.match(/<code>([^<]*)<\/code>/i)?.[1];
        const bemapMessage = response.text.match(/<message>([\s\S]*?)<\/message>/i)?.[1];
        if (bemapCode || bemapMessage) {
          rendered = [bemapCode, bemapMessage].filter(Boolean).join('\n\n');
        } else {
          // Tomcat-style HTML error page; the status line is all that matters.
          const title = response.text.match(/<title>([^<]+)<\/title>/i)?.[1];
          const message = response.text.match(/Message<\/b>\s*([^<]+)/i)?.[1];
          rendered = [title, message].filter(Boolean).join(' — ') || response.text.slice(0, 400);
        }
      } else {
        try {
          rendered = JSON.stringify(JSON.parse(response.text), null, 2);
        } catch {
          // Not JSON (e.g. the CSV output format) — leave as-is.
        }
      }

      const out = [
        `# ${verb} ${endpoint} → HTTP ${response.status}${ok ? ' ✓' : ' ✗'}`,
        '',
        `- Environment: ${client.baseUrl}`,
        `- Elapsed: ${elapsed} ms`,
        response.contentType ? `- Content-Type: ${response.contentType}` : null,
        documented.length > 0
          ? `- Documented method: ${documented.join(' or ')} (\`${page.id}\`)`
          : null,
        documented.length > 0 && !documented.includes(verb)
          ? `\n> Note: the documentation declares ${documented.join(' or ')} for this endpoint, ` +
            `not ${verb}. A 405 here means exactly that — though the declaration is not always ` +
            'complete: some endpoints accept POST without documenting it.'
          : null,
        '',
      ].filter((line) => line !== null);

      if (!ok) {
        out.push(
          '## Error',
          '',
          '```',
          truncate(rendered, maxChars, ''),
          '```',
          '',
          response.status === 302
            ? '> 302 is how BeMap rejects credentials — it redirects to `login.html` rather ' +
              'than answering 401. Check BEMAP_USER / BEMAP_KEY.'
            : response.status === 400
              ? '> 400 generally indicates a payload problem. Verify field names and types with ' +
                '`bemap_get_parameters`. Note that BeMap also returns 400 "Access Denied" when ' +
                'a role is missing.'
              : ''
        );
      } else {
        out.push('## Response', '', '```json', truncate(rendered, maxChars, ''), '```');
      }

      return text(out.filter(Boolean).join('\n'));
    })
);

/* --------------------------------------------------------------------- boot */

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // stdout carries the protocol; diagnostics must go to stderr.
  console.error('bemap-docs MCP server ready (stdio).');
}

main().catch((error) => {
  console.error(`Fatal: ${error.message}`);
  process.exit(1);
});

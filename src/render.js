/* ======================================================================
 * RENDER
 *
 * Markdown for what the tools return: the service list, one operation, one
 * schema, one field. Written for a model that is about to write code, so the
 * facts it copies — the method, the full endpoint, every field name, its
 * type, whether it is required, the values an enum accepts and what each one
 * means — come first and verbatim, and prose is trimmed before any of them.
 *
 * Nothing here decides a fact. Every value printed is read from the
 * specification as the build wrote it.
 * ====================================================================== */

import { environmentHosts } from './client.js';
import { enumOf, fieldsOf, guideLinks, loadSnapshot, refName, services as listServices, typeOf } from './spec.js';

/**
 * A description as a reader can follow it: BeMap's links into its
 * documentation site — 35 in the specification's descriptions — made links to
 * the guides this server holds. Applied before any cut, so a cut never leaves
 * half a link.
 */
const links = (text) => (text ? guideLinks(String(text)) : text);

/** Said under an answer that carries such a link. */
const LINK_HINT = 'A link written `guide:<id>` is another guide: read it with `bemap_read_guide`.';

/** Collapse whitespace and cut prose at a word boundary. */
export function clip(text, limit) {
  const flat = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (flat.length <= limit) return flat;
  const cut = flat.slice(0, limit);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), limit - 20))}…`;
}

/** Make text safe inside a Markdown table cell. */
const cell = (text) => String(text ?? '').replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ');

/** A field's enum as one table cell: names, and in `full` their meaning. */
function enumCell(values, { full, limit = 10 }) {
  const shown = full ? values.values : values.values.slice(0, limit);
  const parts = shown.map((value) => {
    const meaning = links(values.descriptions[value]);
    return full && meaning ? `\`${value}\` ${clip(meaning, 90)}` : `\`${value}\``;
  });
  const more = values.values.length - shown.length;
  return `${parts.join(full ? ' · ' : ', ')}${more > 0 ? ` … +${more} more` : ''}`;
}

/**
 * The fields of a schema as a table.
 *
 * @param {Array<object>} fields - From `fieldsOf`.
 * @param {{full?: boolean, withRequired?: boolean, descriptionLimit?: number}} [options]
 * @returns {string}
 */
export function fieldTable(fields, { full = false, withRequired = true, descriptionLimit = 220 } = {}) {
  if (fields.length === 0) return '_No fields._';
  const head = withRequired ? '| Field | Type | Required | Description |\n|---|---|---|---|' : '| Field | Type | Description |\n|---|---|---|';
  const rows = fields.map((field) => {
    const name = field.deprecated ? `~~\`${field.name}\`~~ (deprecated)` : `\`${field.name}\``;
    const description = links(field.description);
    const bits = [description ? (full ? description : clip(description, descriptionLimit)) : ''];
    if (field.enum) bits.push(`Values: ${enumCell(field.enum, { full: false, limit: full ? 200 : 10 })}`);
    if (field.defaultValue !== undefined) bits.push(`Default: \`${JSON.stringify(field.defaultValue)}\``);
    if (field.node?.['x-aliases']?.length) {
      bits.push(`Also accepted as ${field.node['x-aliases'].map((alias) => `\`${alias}\``).join(', ')} — prefer \`${field.name}\`.`);
    }
    if (field.readOnly) bits.push('Read-only.');
    const byte = field.node?.['x-javaType'] ? field.node : field.node?.items?.['x-javaType'] ? field.node.items : null;
    if (byte) {
      bits.push(`A JSON number from -128 to 127: the source declares a Java \`${byte['x-javaType']}\`. The specification says a base64 string (\`format: byte\`), which BeMap refuses for it.`);
    }
    const text = cell(bits.filter(Boolean).join(' '));
    return withRequired
      ? `| ${name} | \`${cell(field.type)}\` | ${field.required ? '**required**' : ''} | ${text} |`
      : `| ${name} | \`${cell(field.type)}\` | ${text} |`;
  });
  return `${head}\n${rows.join('\n')}`;
}

/**
 * The meaning of every value of every enum among these fields.
 *
 * @param {Array<object>} fields - From `fieldsOf`.
 * @returns {string} Markdown, empty when no value carries a description.
 */
export function enumSections(fields) {
  const out = [];
  for (const field of fields) {
    if (!field.enum) continue;
    const described = field.enum.values.filter((value) => field.enum.descriptions[value]);
    if (described.length === 0) continue;
    out.push(`### \`${field.name}\` — ${field.enum.values.length} values`, '', '| Value | Meaning |', '|---|---|');
    for (const value of field.enum.values) {
      out.push(`| \`${value}\` | ${cell(links(field.enum.descriptions[value]) ?? '')} |`);
    }
    out.push('');
  }
  return out.join('\n');
}

/** The nested types a set of fields refers to, for "drill into" hints. */
export function nestedTypes(fields) {
  return [...new Set(fields.flatMap((field) => field.refs))];
}

/** One line naming who may call an operation. */
function roleLine(op) {
  if (op.roles?.roles?.length) {
    return `\`${op.roles.expression}\` — declared on the endpoint. Without it BeMap answers \`400 "Access Denied"\`, not \`403\`.`;
  }
  return (
    'Not declared on the endpoint (checked deeper in BeMap). A `400 "Access Denied"` means the account lacks ' +
    "the service's entitlement; `GET /bgis/service/acl/1.0/user/details` lists what the account holds."
  );
}

/** One security scheme, as its own document describes it. */
function schemeText(name, scheme = {}) {
  const how =
    scheme.type === 'http'
      ? `HTTP ${scheme.scheme === 'basic' ? 'Basic' : scheme.scheme}`
      : scheme.type === 'apiKey'
        ? `\`${scheme.name}\` ${scheme.in === 'query' ? 'query parameter' : scheme.in}`
        : scheme.type ?? 'unknown';
  return `\`${name}\` — ${how}${scheme.description ? `: ${clip(scheme.description, 220)}` : ''}`;
}

/**
 * Where another platform's operation is and how it signs in — its hosts and
 * its security, as that platform's own specification states them. BeNomad
 * Tiles' used to be described only in prose, and a model sent its calls to
 * BeMap's service root with BeMap's credentials.
 */
function platformRows(op, snapshot) {
  const schemes = snapshot.spec.components?.securitySchemes ?? {};
  const hosts = op.servers.map((server) => `\`${server.url}\`${server.description ? ` — ${cell(server.description)}` : ''}`).join(' · ') || '—';
  const auth = op.security.length
    ? op.security.map((requirement) => Object.keys(requirement).map((name) => schemeText(name, schemes[name])).join(' and ')).join(' · or ')
    : 'None.';
  return [
    `| Endpoint | \`${op.endpoint}\` — on the ${op.tags[0] ?? op.platform} hosts below, not BeMap's |`,
    `| Hosts | ${hosts} |`,
    `| Service | ${op.tags.join(', ') || '—'} — its own specification, not BeMap's; \`bemap_try_request\` does not send it |`,
    `| Authentication | ${cell(auth)} |`,
  ];
}

/**
 * One operation, everything needed to call it.
 *
 * @param {object} op - From `findOperation` / `snapshot.operations`.
 * @param {{detail?: 'summary'|'full', snapshot?: object}} [options]
 * @returns {string}
 */
export function renderOperation(op, { detail = 'summary', snapshot = loadSnapshot() } = {}) {
  const full = detail === 'full';
  const schemas = snapshot.spec.components?.schemas ?? {};
  const out = [
    `# ${op.method} ${op.endpoint}`,
    '',
    op.summary ? `**${op.summary}**${op.description ? ` — ${links(op.description)}` : ''}` : links(op.description),
    '',
    '| | |',
    '|---|---|',
    `| Method | **${op.method}** |`,
    ...(op.platform
      ? platformRows(op, snapshot)
      : [
          `| Endpoint | \`${op.endpoint}\` — relative to the environment host |`,
          /* The hosts, stated: a model told only "relative to the environment host"
             guessed `bemap-prod.benomad.com` for prod. */
          `| Hosts | ${environmentHosts().map((host) => `${host.env} \`${host.bemap}\``).join(' · ')} |`,
          `| Service | ${op.tags.join(', ') || '—'} |`,
          '| Authentication | HTTP Basic, `base64(account:apikey)`, on every call. No credentials answer `302` to the login page; wrong ones answer `401`. |',
          `| Role | ${roleLine(op)} |`,
        ]),
  ];
  if (op.deprecated) out.push('| Deprecated | **yes** — prefer another operation of this service |');
  out.push('');

  if (op.parameters.length > 0) {
    out.push('## Parameters', '', '| Name | In | Type | Required | Description |', '|---|---|---|---|---|');
    for (const parameter of op.parameters) {
      /* An enum a parameter names by reference showed no values. */
      const node = parameter.schema?.$ref ? schemas[refName(parameter.schema.$ref)] ?? {} : parameter.schema ?? {};
      const values = enumOf(node.type === 'array' && node.items?.$ref ? { items: schemas[refName(node.items.$ref)] ?? {} } : node);
      const description = [
        clip(links(parameter.description ?? node.description ?? ''), full ? 2000 : 220),
        values ? `Values: ${enumCell(values, { full, limit: full ? 200 : 10 })}` : '',
        /* A Java `byte`, which springdoc publishes as a base64 string. */
        node['x-javaType'] ? 'A number from -128 to 127: the source declares a Java `byte`; base64 is refused.' : '',
      ]
        .filter(Boolean)
        .join(' ');
      out.push(
        `| \`${parameter.name}\` | ${parameter.in} | \`${cell(typeOf(parameter.schema ?? {}))}\` | ` +
          `${parameter.required ? '**required**' : ''} | ${cell(description)} |`
      );
    }
    out.push('');
  }

  if (op.request) {
    const schema = op.request.name ? schemas[op.request.name] : op.request.inline;
    const fields = fieldsOf(schema, snapshot);
    out.push(
      `## Request body — ${op.request.name ? `\`${op.request.name}\`` : 'inline'}${op.request.array ? ' (a JSON array of it)' : ''}` +
        `${op.requestRequired ? ', required' : ''}`,
      '',
      `\`Content-Type: ${op.request.mediaType.split(';')[0]}\`${schema?.description ? ` · ${clip(links(schema.description), 300)}` : ''}`,
      '',
      fieldTable(fields, { full }),
      ''
    );
    const required = fields.filter((field) => field.required).map((field) => `\`${field.name}\``);
    out.push(
      required.length
        ? `The specification marks ${required.length} field(s) required: ${required.join(', ')}.`
        : 'The specification marks no field required.',
      ''
    );
    if (full) {
      const sections = enumSections(fields);
      if (sections) out.push('## What each value means', '', sections);
    }
    const nested = nestedTypes(fields);
    if (nested.length) out.push(`Nested types: ${nested.map((name) => `\`${name}\``).join(', ')} — \`bemap_get_schema\` for any of them.`, '');
  } else if (op.method !== 'GET') {
    out.push('## Request body', '', 'None declared.', '');
  }

  if (op.response) {
    const schema = op.response.name ? schemas[op.response.name] : op.response.inline;
    const fields = fieldsOf(schema, snapshot);
    out.push(
      `## Response — \`${op.response.status}\`${op.response.name ? ` \`${op.response.name}\`` : ''}${op.response.array ? ' (a JSON array of it)' : ''}`,
      ''
    );
    if (op.response.mediaType) out.push(`\`${op.response.mediaType.split(';')[0]}\``, '');
    if (fields.length) {
      out.push(fieldTable(fields, { full, withRequired: false, descriptionLimit: full ? 2000 : 140 }), '');
      const nested = nestedTypes(fields);
      if (nested.length && full) out.push(`Nested types: ${nested.map((name) => `\`${name}\``).join(', ')}.`, '');
    } else if (op.response.inline) {
      out.push(`\`${schemaType(op.response.inline)}\``, '');
    } else if (!op.response.mediaType) {
      /* An empty section read as a rendering fault: CSV routing and the KML
         reachable area declare their 200 with no content at all. */
      out.push('The specification declares no response body.', '');
    }
    /* Every success, not the first alone: a tile's `204` means "beyond the
       archive's zoom", and read as a failure it made a map stop drawing. */
    const others = (op.successes ?? []).filter((success) => success.status !== op.response.status);
    if (others.length) {
      out.push('Other successes:', '', ...others.map((success) => `- \`${success.status}\`${success.description ? ` ${success.description}` : ''}`), '');
    }
  }

  if (op.errors.length) {
    out.push('## Errors', '');
    for (const error of op.errors) {
      out.push(`- \`${error.status}\`${error.description ? ` ${error.description}` : ''}${error.name ? ` — \`${error.name}\`` : ''}`);
    }
    if (!op.platform) {
      out.push(
        '',
        'A `400` covers both a payload the service refuses and a missing entitlement (`"Access Denied"`) — read the message, not the status.'
      );
    }
    out.push('');
  }

  if (!full) out.push('_Condensed. Pass `detail: "full"` for complete descriptions and the meaning of every enum value._');
  const rendered = out.join('\n').replace(/\n{3,}/g, '\n\n');
  return rendered.includes('](guide:') ? `${rendered}\n\n${LINK_HINT}` : rendered;
}

/** A type label for a parameter or inline schema. */
function schemaType(node) {
  if (!node) return 'any';
  if (node.$ref) return refName(node.$ref);
  if (node.type === 'array') return `${schemaType(node.items)}[]`;
  return `${node.enum ? 'enum ' : ''}${node.type ?? 'any'}${node.format ? ` (${node.format})` : ''}`;
}

/**
 * The operations whose request or response is a schema, and those whose
 * request or response holds it somewhere inside.
 *
 * Only the root was compared, so of the schemas nested in a request or a
 * response, almost none named an operation: `RoutingDest` did not say it is
 * the destination of a route.
 *
 * @param {string} name - Schema name.
 * @param {object} snapshot
 * @returns {{requests: string[], responses: string[], inRequests: string[], inResponses: string[]}}
 */
export function usedBy(name, snapshot = loadSnapshot()) {
  const requests = snapshot.operations.filter((op) => op.request?.name === name).map((op) => op.key);
  const responses = snapshot.operations.filter((op) => op.response?.name === name).map((op) => op.key);
  const reach = reachable(snapshot);
  const inRequests = reach.filter((entry) => entry.request.has(name) && !requests.includes(entry.key)).map((entry) => entry.key);
  const inResponses = reach.filter((entry) => entry.response.has(name) && !responses.includes(entry.key)).map((entry) => entry.key);
  return { requests, responses, inRequests, inResponses };
}

/** Per snapshot, what each operation's request and response reach. */
const REACH = new WeakMap();

/**
 * The schemas each operation's request and response reach, through every
 * property, array, map and composition.
 *
 * @param {object} snapshot
 * @returns {Array<{key: string, request: Set<string>, response: Set<string>}>}
 */
function reachable(snapshot) {
  if (REACH.has(snapshot)) return REACH.get(snapshot);
  const schemas = snapshot.spec.components?.schemas ?? {};
  const walk = (name, seen) => {
    if (!name || seen.has(name) || !schemas[name]) return seen;
    seen.add(name);
    const visit = (node) => {
      if (!node || typeof node !== 'object') return;
      if (node.$ref) walk(refName(node.$ref), seen);
      for (const key of ['items', 'additionalProperties']) visit(node[key]);
      for (const key of ['allOf', 'oneOf', 'anyOf']) for (const part of node[key] ?? []) visit(part);
      for (const child of Object.values(node.properties ?? {})) visit(child);
    };
    visit(schemas[name]);
    return seen;
  };
  const out = snapshot.operations.map((op) => ({ key: op.key, request: walk(op.request?.name, new Set()), response: walk(op.response?.name, new Set()) }));
  REACH.set(snapshot, out);
  return out;
}

/**
 * One schema: its fields, and in `full` the meaning of every enum value.
 *
 * @param {string} name - Schema name.
 * @param {object} schema - The component schema.
 * @param {{detail?: 'summary'|'full', property?: string, snapshot?: object}} [options]
 * @returns {string}
 */
export function renderSchema(name, schema, { detail = 'summary', property, snapshot = loadSnapshot() } = {}) {
  const full = detail === 'full' || Boolean(property);
  const all = fieldsOf(schema, snapshot);
  const fields = property ? all.filter((field) => field.name === property) : all;
  const { requests, responses, inRequests, inResponses } = usedBy(name, snapshot);
  const keys = (list) => `${list.slice(0, 8).map((key) => `\`${key}\``).join(', ')}${list.length > 8 ? ` and ${list.length - 8} more` : ''}`;

  const out = [`# ${name}`, ''];
  if (schema.description) out.push(links(schema.description), '');
  if (schema['x-javaClass']) out.push(`Java: \`${schema['x-javaClass']}\``, '');
  if (requests.length) out.push(`Request body of: ${requests.map((key) => `\`${key}\``).join(', ')}`, '');
  if (responses.length) out.push(`Response of: ${responses.map((key) => `\`${key}\``).join(', ')}`, '');
  if (inRequests.length) out.push(`Inside the request of: ${keys(inRequests)}`, '');
  if (inResponses.length) out.push(`Inside the response of: ${keys(inResponses)}`, '');

  if (property && fields.length === 0) {
    out.push(`\`${name}\` declares no field \`${property}\`. Its fields: ${all.map((field) => `\`${field.name}\``).join(', ')}.`);
    return out.join('\n');
  }

  out.push(fieldTable(fields, { full }), '');
  const required = all.filter((field) => field.required).map((field) => `\`${field.name}\``);
  if (!property) {
    out.push(required.length ? `Required by the specification: ${required.join(', ')}.` : 'The specification marks no field required.', '');
  }
  if (full) {
    const sections = enumSections(fields);
    if (sections) out.push('## What each value means', '', sections);
  } else {
    /* A description cut with no way to see the rest read as the whole of it. */
    const described = fields.some((field) => field.enum && Object.keys(field.enum.descriptions).length);
    const cut = fields.some((field) => String(links(field.description) ?? '').replace(/\s+/g, ' ').trim().length > 220);
    if (described || cut) {
      out.push(
        `_Condensed: ${[cut ? 'long descriptions are cut' : null, described ? 'enum values are listed by name' : null].filter(Boolean).join(', and ')}. ` +
          'Pass `property` for one field in full, or `detail: "full"`._',
        ''
      );
    }
  }
  const nested = nestedTypes(fields);
  if (nested.length) out.push(`Nested types: ${nested.map((type) => `\`${type}\``).join(', ')}.`);
  const rendered = out.join('\n').replace(/\n{3,}/g, '\n\n');
  return rendered.includes('](guide:') ? `${rendered}\n\n${LINK_HINT}` : rendered;
}

/**
 * The service list.
 *
 * @param {{service?: string, snapshot?: object}} [options]
 * @returns {string}
 */
export function renderServices({ service, snapshot = loadSnapshot() } = {}) {
  const needle = String(service ?? '').toLowerCase().trim();
  const all = listServices(snapshot);
  const shown = needle ? all.filter((entry) => entry.name.toLowerCase().includes(needle)) : all;
  const operationCount = new Set(shown.flatMap((entry) => entry.operations.map((op) => op.key))).size;
  const out = [`# BeMap services — ${shown.length} service(s), ${operationCount} operation(s)`, ''];
  for (const entry of shown) {
    out.push(`## ${entry.name}`, '');
    if (entry.description) out.push(links(entry.description), '');
    /* Another platform's service is on its own hosts: its endpoints are not under BeMap's root. */
    const elsewhere = entry.operations.find((op) => op.platform)?.servers ?? [];
    if (elsewhere.length) out.push(`On its own hosts, with its own sign-in: ${elsewhere.map((server) => `\`${server.url}\``).join(', ')}.`, '');
    out.push('| Method | Endpoint | What it does |', '|---|---|---|');
    for (const op of entry.operations) {
      out.push(`| ${op.method} | \`${op.endpoint}\`${op.deprecated ? ' (deprecated)' : ''} | ${cell(clip(op.summary || op.description, 110))} |`);
    }
    out.push('');
  }
  return out.join('\n');
}

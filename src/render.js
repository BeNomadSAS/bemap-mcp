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
import { enumOf, fieldsOf, loadSnapshot, refName, services as listServices } from './spec.js';

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
    const meaning = values.descriptions[value];
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
    const bits = [field.description ? (full ? field.description : clip(field.description, descriptionLimit)) : ''];
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
    const description = cell(bits.filter(Boolean).join(' '));
    return withRequired
      ? `| ${name} | \`${cell(field.type)}\` | ${field.required ? '**required**' : ''} | ${description} |`
      : `| ${name} | \`${cell(field.type)}\` | ${description} |`;
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
      out.push(`| \`${value}\` | ${cell(field.enum.descriptions[value] ?? '')} |`);
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
    op.summary ? `**${op.summary}**${op.description ? ` — ${op.description}` : ''}` : op.description,
    '',
    '| | |',
    '|---|---|',
    `| Method | **${op.method}** |`,
    `| Endpoint | \`${op.endpoint}\` — relative to the environment host |`,
    /* The hosts, stated: a model told only "relative to the environment host"
       guessed `bemap-prod.benomad.com` for prod. */
    `| Hosts | ${environmentHosts().map((host) => `${host.env} \`${host.bemap}\``).join(' · ')} |`,
    `| Service | ${op.tags.join(', ') || '—'} |`,
    '| Authentication | HTTP Basic, `base64(account:apikey)`, on every call. No credentials answer `302` to the login page; wrong ones answer `401`. |',
    `| Role | ${roleLine(op)} |`,
  ];
  if (op.deprecated) out.push('| Deprecated | **yes** — prefer another operation of this service |');
  out.push('');

  if (op.parameters.length > 0) {
    out.push('## Parameters', '', '| Name | In | Type | Required | Description |', '|---|---|---|---|---|');
    for (const parameter of op.parameters) {
      const values = enumOf(parameter.schema ?? {});
      const description = [
        clip(parameter.description ?? parameter.schema?.description ?? '', full ? 2000 : 220),
        values ? `Values: ${enumCell(values, { full, limit: full ? 200 : 10 })}` : '',
      ]
        .filter(Boolean)
        .join(' ');
      out.push(
        `| \`${parameter.name}\` | ${parameter.in} | \`${cell(schemaType(parameter.schema))}\` | ` +
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
      `\`Content-Type: ${op.request.mediaType.split(';')[0]}\`${schema?.description ? ` · ${clip(schema.description, 300)}` : ''}`,
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
    }
  }

  if (op.errors.length) {
    out.push('## Errors', '');
    for (const error of op.errors) {
      out.push(`- \`${error.status}\`${error.description ? ` ${error.description}` : ''}${error.name ? ` — \`${error.name}\`` : ''}`);
    }
    out.push(
      '',
      'A `400` covers both a payload the service refuses and a missing entitlement (`"Access Denied"`) — read the message, not the status.',
      ''
    );
  }

  if (!full) out.push('_Condensed. Pass `detail: "full"` for complete descriptions and the meaning of every enum value._');
  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}

/** A type label for a parameter or inline schema. */
function schemaType(node) {
  if (!node) return 'any';
  if (node.$ref) return refName(node.$ref);
  if (node.type === 'array') return `${schemaType(node.items)}[]`;
  return `${node.enum ? 'enum ' : ''}${node.type ?? 'any'}${node.format ? ` (${node.format})` : ''}`;
}

/**
 * The operations whose request or response is, or directly contains, a schema.
 *
 * @param {string} name - Schema name.
 * @param {object} snapshot
 * @returns {{requests: string[], responses: string[]}}
 */
export function usedBy(name, snapshot = loadSnapshot()) {
  const requests = snapshot.operations.filter((op) => op.request?.name === name).map((op) => op.key);
  const responses = snapshot.operations.filter((op) => op.response?.name === name).map((op) => op.key);
  return { requests, responses };
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
  const { requests, responses } = usedBy(name, snapshot);

  const out = [`# ${name}`, ''];
  if (schema.description) out.push(schema.description, '');
  if (schema['x-javaClass']) out.push(`Java: \`${schema['x-javaClass']}\``, '');
  if (requests.length) out.push(`Request body of: ${requests.map((key) => `\`${key}\``).join(', ')}`, '');
  if (responses.length) out.push(`Response of: ${responses.map((key) => `\`${key}\``).join(', ')}`, '');

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
  } else if (fields.some((field) => field.enum && Object.keys(field.enum.descriptions).length)) {
    out.push('_Enum values listed by name. Pass `detail: "full"`, or `property`, for what each one means._', '');
  }
  const nested = nestedTypes(fields);
  if (nested.length) out.push(`Nested types: ${nested.map((type) => `\`${type}\``).join(', ')}.`);
  return out.join('\n').replace(/\n{3,}/g, '\n\n');
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
    if (entry.description) out.push(entry.description, '');
    out.push('| Method | Endpoint | What it does |', '|---|---|---|');
    for (const op of entry.operations) {
      out.push(`| ${op.method} | \`${op.endpoint}\`${op.deprecated ? ' (deprecated)' : ''} | ${cell(clip(op.summary || op.description, 110))} |`);
    }
    out.push('');
  }
  return out.join('\n');
}

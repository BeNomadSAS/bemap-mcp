/* ======================================================================
 * OUTPUT FORMATTING
 *
 * Tool results are consumed by a language model, so they are formatted as
 * compact Markdown: tables stay tables, and nothing is padded for looks.
 *
 * The recurring constraint is size. `RoutingRequest` alone expands to ~45 KB
 * of parameter tables because every enum value is documented inline. Dumping
 * that wholesale is usually the wrong answer, so this module provides a
 * summary projection and honest truncation.
 * ====================================================================== */

import { probedRequired, requiredness } from './required.js';

/** Hard ceiling for a single tool response, in characters. */
export const MAX_RESPONSE_CHARS = 60000;

/**
 * Truncate text at a character budget, cutting on a line boundary and saying
 * plainly what was dropped.
 *
 * @param {string} text
 * @param {number} [limit] - Character budget. Defaults to {@link MAX_RESPONSE_CHARS}.
 * @param {string} [hint] - Advice appended to the notice, e.g. how to narrow the query.
 * @returns {string}
 */
export function truncate(text, limit = MAX_RESPONSE_CHARS, hint = '') {
  if (text.length <= limit) return text;
  const cut = text.lastIndexOf('\n', limit);
  const body = text.slice(0, cut > limit * 0.6 ? cut : limit);
  const dropped = text.length - body.length;
  return (
    `${body}\n\n---\n**Output truncated**: ${dropped.toLocaleString('en-US')} of ` +
    `${text.length.toLocaleString('en-US')} characters omitted.` +
    (hint ? ` ${hint}` : '')
  );
}

/**
 * Parse one row of a `buildclass.md` parameter table.
 *
 * Shared with the field search so that a row looked up by name and the same row
 * read inside its class are described identically — the two used to disagree,
 * because the search printed the raw line and the schema renderer printed a
 * verdict computed from it.
 *
 * `optional` reports the introspection's column and nothing more: it is `true`
 * only where the cell literally reads `optional`. A blank cell is not mandatory,
 * and turning it into one is what {@link requiredness} exists to prevent.
 *
 * @param {string} line - A line beginning with `|`.
 * @returns {{field:string, optional:boolean, description:string, deprecated:boolean} | null}
 *   `null` for a header, a separator, or anything too short to be a field row.
 */
export function parseSchemaRow(line) {
  // Rows are not reliably closed with a trailing pipe: the generator omits
  // it on long rows (those documenting every enum value inline). So drop
  // the empty leading cell always, and the trailing one only when empty —
  // slicing blindly would truncate exactly the richest descriptions.
  const cells = line.split('|').slice(1);
  if (cells.length > 0 && cells[cells.length - 1].trim() === '') cells.pop();
  if (cells.length < 3) return null;
  const rawField = cells[0].trim();
  // Skip the header and separator rows.
  if (/^-+$/.test(rawField) || rawField === 'Field') return null;
  const field = rawField.replace(/<\/?s>/g, '').replace(/__/g, '').trim();
  if (!field) return null;
  return {
    field,
    optional: cells[1].trim().toLowerCase() === 'optional',
    description: cells.slice(2).join('|').trim(),
    deprecated: /<s>/.test(rawField),
  };
}

/**
 * Parse a `buildclass.md` document into its per-class sections.
 *
 * The generator emits a leading table for the root class, then one
 * `#### __ClassName__` section per referenced type.
 *
 * @param {string} markdown
 * @returns {Array<{name:string, description:string, rows:Array<{field:string, optional:boolean, description:string, deprecated:boolean}>}>}
 */
export function parseSchemaSections(markdown) {
  const sections = [];
  /** @type {{name:string, description:string, rows:any[]}} */
  let current = { name: '(root)', description: '', rows: [] };

  for (const line of markdown.split('\n')) {
    const heading = line.match(/^####\s+__(.+?)__\s*$/);
    if (heading) {
      sections.push(current);
      current = { name: heading[1], description: '', rows: [] };
      continue;
    }

    if (line.startsWith('|')) {
      const row = parseSchemaRow(line);
      if (row) current.rows.push(row);
      continue;
    }

    if (line.trim() && !line.startsWith('#')) {
      current.description += `${current.description ? ' ' : ''}${line.trim()}`;
    }
  }
  sections.push(current);

  return sections.filter((section) => section.rows.length > 0 || section.name !== '(root)');
}

/**
 * Condense a field description to its essentials: the leading sentence, the
 * declared type, and the enum values named without their prose.
 *
 * @param {string} description - Raw table cell.
 * @returns {string}
 */
function condense(description) {
  const type = description.match(/Type:\s*`([^`]+)`/)?.[1];
  const enumValues = [...description.matchAll(/-\s*<?s?>?`([A-Z][A-Z0-9_]*)`/g)].map((m) => m[1]);

  // First sentence, with markup and the trailing "Type:" clause removed.
  let lead = description
    .replace(/<br\/>[\s\S]*$/, '')
    .replace(/Type:\s*`[^`]+`\.?/, '')
    .replace(/<\/?[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (lead.length > 160) lead = `${lead.slice(0, 157).trimEnd()}…`;

  const parts = [];
  if (type) parts.push(`\`${type}\``);
  if (lead) parts.push(lead);
  if (enumValues.length > 0) {
    const shown = enumValues.slice(0, 12).join(', ');
    parts.push(
      `Values: ${shown}${enumValues.length > 12 ? ` … (+${enumValues.length - 12} more)` : ''}`
    );
  }
  return parts.join(' — ') || '(no description)';
}

/**
 * The label printed for a requiredness verdict.
 *
 * `unspecified` is deliberately plain where `required` is bold: the reader's eye
 * should land on the fields a probe actually measured, not on the majority the
 * introspection says nothing about.
 *
 * @param {'required'|'optional'|'unspecified'} verdict
 * @returns {string}
 */
function requirednessLabel(verdict) {
  if (verdict === 'required') return '**required**';
  return verdict;
}

/**
 * What `unspecified` means, said once per response rather than once per section.
 *
 * A class document expands to twenty-odd sections and most of them carry blank
 * cells, so repeating this under each heading would spend several kilobytes of a
 * 60 000-character budget restating one sentence.
 */
const UNSPECIFIED_NOTE =
  '> `unspecified` means the introspection left the cell blank and no probe has settled ' +
  'it — **not** that the field is mandatory. That column is wrong in both directions; ' +
  'settle one with `bemap_try_request` by deleting the field from a body that works.';

/**
 * The note that explains a probed class's requiredness, so its verdicts are read
 * as what they are: a measurement of the running service, not a transcription.
 *
 * @param {{fields: string[], notRequired?: string[], why: string}} probed
 * @returns {string} One blockquote line.
 */
function probedNote(probed) {
  const measured = probed.fields.length
    ? `**required** marks the ${probed.fields.length} field(s) the live service refuses ` +
      'a body without, each probed by deleting it from a request that works'
    : '**No field is enforced**: every one was probed by deletion and the service ' +
      'answered `200`';
  return `> ${measured}. ${probed.why}`;
}

/**
 * Render schema sections as a compact field listing.
 *
 * @param {ReturnType<typeof parseSchemaSections>} sections
 * @param {object} [options]
 * @param {boolean} [options.summary] - Condense descriptions. Default false.
 * @param {string} [options.only] - Render just this class section.
 * @param {string} [options.className] - Fully-qualified name of the document's root
 *   class, used to look up the probed requiredness. Only the root section is
 *   credited with it: a nested `#### __VehicleFeatureFront__` is a different class
 *   and was never probed on its own.
 * @returns {string} Markdown.
 */
export function renderSchema(sections, options = {}) {
  const { summary = false, only, className } = options;
  const probedRoot = className ? probedRequired(className) : null;
  const selected = only
    ? sections.filter((section) => section.name.toLowerCase() === only.toLowerCase())
    : sections;

  if (selected.length === 0) {
    const available = sections.map((section) => section.name).join(', ');
    return `No class section named "${only}". Available sections: ${available}.`;
  }

  /* Resolve every verdict up front: the `unspecified` note is emitted once for
     the whole response, so whether to print it is not a per-section question. */
  const verdictsBySection = new Map();
  for (const section of selected) {
    const probed = section.name === '(root)' ? probedRoot : null;
    verdictsBySection.set(
      section,
      new Map(section.rows.map((row) => [row.field, requiredness(row.field, row.optional, probed)]))
    );
  }
  const anyUnspecified = [...verdictsBySection.entries()].some(([section, verdicts]) =>
    section.rows.some((row) => !row.deprecated && verdicts.get(row.field) === 'unspecified')
  );

  const out = [];
  if (anyUnspecified) out.push(UNSPECIFIED_NOTE, '');
  for (const section of selected) {
    /* The probe measured the request class as a whole, which is its root
       section. A nested section is a different class the probe never removed a
       field from, so it gets the introspection's column and nothing more. */
    const probed = section.name === '(root)' ? probedRoot : null;
    const verdictOf = (row) => verdictsBySection.get(section).get(row.field);

    out.push(`### ${section.name}`);
    if (section.description) out.push(section.description);
    out.push('');
    if (probed) out.push(probedNote(probed), '');

    if (summary) {
      const live = section.rows.filter((row) => !row.deprecated);
      const deprecated = section.rows.filter((row) => row.deprecated);

      const block = (label, rows) => {
        if (rows.length === 0) return;
        out.push(`**${label}** (${rows.length})`);
        for (const row of rows) out.push(`- \`${row.field}\` — ${condense(row.description)}`);
        out.push('');
      };
      block('Required', live.filter((row) => verdictOf(row) === 'required'));
      block('Optional', live.filter((row) => verdictOf(row) === 'optional'));
      block('Unspecified', live.filter((row) => verdictOf(row) === 'unspecified'));
      block('Deprecated', deprecated);
    } else {
      out.push('| Field | Required? | Description |');
      out.push('|---|---|---|');
      for (const row of section.rows) {
        const name = row.deprecated ? `~~${row.field}~~` : row.field;
        out.push(`| \`${name}\` | ${requirednessLabel(verdictOf(row))} | ${row.description} |`);
      }
      out.push('');
    }
  }
  return out.join('\n');
}

/**
 * Render an entitlement requirement the way the documentation site evaluates it.
 *
 * `data-right` is not a role name but a small boolean expression. The site's own
 * ACL code (`bemap-js-api-acl.js`, `checkRights`) splits on `" or "` for a
 * disjunction, and otherwise on `","` when a comma is present, else on
 * `" and "` — both of which mean *every* role is required. So
 * `ROLE_DOWNLOAD_FILE,ROLE_EVSE_DL_SVS_OUTPUT` is a conjunction, not a list of
 * alternatives, and printing it verbatim reads as one impossible role name.
 * The comma form is normalised to `and` so the cell reads as what it means.
 *
 * @param {string} expression - Raw `data-right` value from the manifest.
 * @returns {string} The same requirement, spelled `A and B` / `A or B`.
 */
export function formatRoleExpression(expression) {
  if (expression.includes(' or ')) {
    return expression
      .split(' or ')
      .map((role) => role.trim())
      .join(' or ');
  }
  const separator = expression.includes(',') ? ',' : ' and ';
  return expression
    .split(separator)
    .map((role) => role.trim())
    .filter(Boolean)
    .join(' and ');
}

/**
 * Render the service catalogue as a table.
 *
 * @param {Array<object>} services - From `listServices`.
 * @returns {string} Markdown.
 */
export function renderServiceCatalogue(services) {
  const out = [
    '| Service | Endpoint | Method | Required role | Versions | Pages |',
    '|---|---|---|---|---|---|',
  ];
  for (const service of services) {
    const role = service.role
      ? `${formatRoleExpression(service.role)}${service.roleInferred ? ' *(inferred)*' : ''}`
      : '—';
    const kinds = service.pages.reduce((acc, page) => {
      acc[page.kind] = (acc[page.kind] ?? 0) + 1;
      return acc;
    }, {});
    const pageSummary = Object.entries(kinds)
      .map(([kind, count]) => `${count} ${kind}`)
      .join(', ');
    out.push(
      `| **${service.service}** | ${service.endpoint ? `\`${service.endpoint}\`` : '—'} | ` +
        `${service.methods?.length > 0 ? service.methods.join(' / ') : '—'} | ` +
        `${role} | ${service.families.join(', ')} | ${pageSummary} |`
    );
  }
  return out.join('\n');
}

/* ======================================================================
 * VALIDATE
 *
 * Check a request body against the specification before it is sent.
 *
 * This exists for one behaviour of BeMap above all others: **an unknown field
 * name is accepted in silence.** `boundingBox` where the field is
 * `boundingbox`, `initBatLevel` for `initBatLvl`, a field from another
 * release — each answers `200` with a complete, plausible result that ignored
 * it. The status code cannot reveal the mistake and the response rarely does,
 * so the only place it can be caught is before the call, against the schema.
 *
 * Everything reported here is read from the specification; nothing is a rule
 * about a particular field. What the specification gets wrong — a field it
 * marks required, or not, against what the service does — this gets wrong
 * too, which is why it reports and never refuses: the service has the last
 * word.
 * ====================================================================== */

import { fieldsOf, loadSnapshot, refName } from './spec.js';

/** How far a name may be from a declared one and still be suggested. */
const NEAR = 3;

/** Edit distance, capped: only near misses are worth suggesting. */
function distance(a, b, cap = NEAR) {
  if (Math.abs(a.length - b.length) > cap) return Infinity;
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    previous = current;
  }
  return previous[b.length];
}

/**
 * The declared name a mistyped one most likely meant: the same name in
 * another case first — the commonest mistake here — then the nearest by edit
 * distance.
 *
 * @param {string} name - What the body used.
 * @param {string[]} declared - What the schema declares.
 * @returns {string|null}
 */
export function nearest(name, declared) {
  const folded = declared.find((candidate) => candidate.toLowerCase() === name.toLowerCase());
  if (folded) return folded;
  let best = null;
  let bestDistance = Infinity;
  for (const candidate of declared) {
    const d = distance(name.toLowerCase(), candidate.toLowerCase());
    if (d < bestDistance) {
      best = candidate;
      bestDistance = d;
    }
  }
  /* Bounded by the cap as well as by the length: a long invented name used to
     be "near" whatever field came first, because the capped distance passed a
     threshold that grows with the name — `departureTimestampInUtc` was told
     to use `geoserver`. */
  return bestDistance <= Math.min(NEAR, Math.max(1, Math.floor(name.length / 4))) ? best : null;
}

/**
 * The shape of a value, as a reader would name it.
 *
 * @param {unknown} value
 * @returns {string}
 */
function shapeOf(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'an array';
  return typeof value === 'object' ? 'an object' : `a ${typeof value}`;
}

/**
 * Collapse issues that repeat across the items of an array into one line
 * each, with a count.
 *
 * A trace of 2 000 points with one wrong name gave 4 000 lines — half a
 * megabyte of answer, with the service's own response pushed after it.
 *
 * @param {Array<{path: string, kind: string, message: string}>} issues
 * @returns {Array<{path: string, kind: string, message: string, count: number}>}
 */
export function groupIssues(issues) {
  const groups = new Map();
  for (const issue of issues) {
    const pattern = issue.path.replace(/\[\d+\]/g, '[*]');
    const message = issue.message.split(issue.path).join(pattern);
    const key = `${issue.kind}|${pattern}|${message}`;
    const group = groups.get(key);
    /* A mistake made once keeps its exact place — `destinations[0]`, not
       `destinations[*]`; one made again names the pattern and the count. */
    if (group) Object.assign(group, { path: pattern, message, count: group.count + 1 });
    else groups.set(key, { ...issue, count: 1 });
  }
  return [...groups.values()];
}

/**
 * The JSON types a property's schema declares, or `null` when it declares none
 * this check can read: a reference or a composition is an object, visited on
 * its own. A Java `byte` the specification calls a base64 string is a number.
 */
function declaredTypes(node) {
  if (!node || node.$ref || node.allOf || node.oneOf || node.anyOf) return null;
  if (node.format === 'byte' && /^(?:byte|Byte)$/.test(node['x-javaType'] ?? '')) return ['integer'];
  const types = Array.isArray(node.type) ? node.type : node.type ? [node.type] : [];
  return types.length ? types : null;
}

/**
 * What is wrong with a value for the type its property declares, as BeMap
 * reads it — `null` when nothing is.
 *
 * BeMap reads a body with Jackson, which converts between scalars by itself.
 * Measured on prod, routing Paris to Lyon (25 September 2026): an epoch number
 * where a string is declared, `"48.8566"` for a number, `"true"` or `1` for a
 * boolean all give the route the declared type gives. Only what it cannot
 * read is refused — `400 INVALID_ARGUMENT` for a string where an array is
 * declared, an array where an object is, `"north"` for a number, `"yes"` for
 * a boolean, base64 for a Java `byte` — and a fraction where an integer is
 * declared is read, and changes the result. Only those are reported: flagging
 * a conversion Jackson makes would send a model to change a request that
 * works.
 *
 * @param {unknown} value
 * @param {object} node - The property's schema.
 * @returns {'unreadable'|'fraction'|null}
 */
function typeProblem(value, node) {
  const types = value === null || value === undefined ? null : declaredTypes(node);
  if (!types) return null;
  const is = (type) => types.includes(type);
  const numeric = (text) => text.trim() !== '' && Number.isFinite(Number(text));
  if (Array.isArray(value)) return is('array') ? null : 'unreadable';
  if (is('array')) return 'unreadable';
  if (typeof value === 'object') return is('object') ? null : 'unreadable';
  if (is('integer') || is('number')) {
    if (typeof value === 'string' && !numeric(value)) return 'unreadable';
    const number = Number(value);
    if (is('integer') && !is('number') && typeof value !== 'boolean' && !Number.isInteger(number)) return 'fraction';
    return null;
  }
  if (is('boolean') && typeof value === 'string' && !/^(?:true|false)$/i.test(value)) return 'unreadable';
  return null;
}

/** A declared type as a reader names it. */
function typeLabel(node) {
  const types = declaredTypes(node) ?? [];
  if (node?.['x-javaType']) return 'a number (a Java byte)';
  const article = (type) => (/^[aeiou]/.test(type) ? `an ${type}` : `a ${type}`);
  return types.filter((type) => type !== 'null').map(article).join(' or ');
}

/** The issue a type problem makes, at its place. */
function typeIssue(problem, value, node, at) {
  const shown = typeof value === 'string' ? `"${value.length > 40 ? `${value.slice(0, 40)}…` : value}"` : shapeOf(value);
  return {
    path: at,
    kind: 'type',
    message:
      problem === 'fraction'
        ? `\`${at}\` is declared ${typeLabel(node)}, and is ${value}: BeMap reads it without its fraction, which changes the result.`
        : `\`${at}\` is declared ${typeLabel(node)}, and is ${shown}: BeMap cannot read it, and refuses the request (\`400 INVALID_ARGUMENT\`).`,
  };
}

/** The single schema name a property points at, when it points at exactly one. */
function objectSchemaOf(node) {
  if (node?.$ref) return refName(node.$ref);
  if (node?.allOf?.length === 1 && node.allOf[0].$ref) return refName(node.allOf[0].$ref);
  return null;
}

/**
 * Check a parsed body against a schema, recursively.
 *
 * @param {unknown} body - The parsed JSON body.
 * @param {string} schemaName - The request schema.
 * @param {object} [snapshot]
 * @returns {Array<{path: string, kind: 'unknown'|'alias'|'missing'|'value'|'type', message: string}>}
 *   empty when every name and enum value is declared, every value is one
 *   BeMap reads as its declared type, and every required field is present.
 */
export function checkBody(body, schemaName, snapshot = loadSnapshot()) {
  const schemas = snapshot.spec.components?.schemas ?? {};
  const issues = [];

  const visit = (value, name, path, depth) => {
    const schema = schemas[name];
    if (!schema || depth > 8) return;
    /* A nested `null` is JSON for "absent"; only the body itself may not be. */
    if (value === null && path) return;
    /* A value that is not an object where an object is declared — a body
       encoded twice, a coordinate written as a string — used to pass as
       "every required field is present". */
    if (value === null || typeof value !== 'object' || Array.isArray(value)) {
      const at = path || 'the body';
      issues.push({
        path: path || '',
        kind: 'value',
        message:
          `${path ? `\`${at}\`` : 'The body'} must be a JSON object \`${name}\`, and is ${shapeOf(value)}` +
          (typeof value === 'string' && /^\s*[{[]/.test(value) ? ' — JSON encoded twice?' : '.'),
      });
      return;
    }
    const fields = fieldsOf(schema, snapshot);
    const byName = new Map(fields.map((field) => [field.name, field]));
    const declared = fields.map((field) => field.name);
    /* `@JsonAlias` names, which the service reads exactly like the declared
       one and springdoc does not publish. The build copies them from the Java
       source into `x-aliases`. */
    const byAlias = new Map();
    for (const field of fields) for (const alias of field.node?.['x-aliases'] ?? []) byAlias.set(alias, field);
    const present = new Set();

    for (const [key, child] of Object.entries(value)) {
      const at = path ? `${path}.${key}` : key;
      let field = byName.get(key);
      if (!field && byAlias.has(key)) {
        field = byAlias.get(key);
        issues.push({
          path: at,
          kind: 'alias',
          message: `\`${at}\` is accepted as an alias of \`${field.name}\`, which is the name the specification publishes — prefer it.`,
        });
      }
      if (!field) {
        const guess = nearest(key, declared);
        issues.push({
          path: at,
          kind: 'unknown',
          message:
            `\`${at}\` is not a field of \`${name}\`` +
            (guess ? ` — did you mean \`${guess}\`?` : '.') +
            ' BeMap does not reject an unknown field: if the service does not read it, nothing will say so.',
        });
        continue;
      }
      present.add(field.name);
      const problem = typeProblem(child, field.node);
      if (problem) {
        issues.push(typeIssue(problem, child, field.node, at));
        continue;
      }
      /* The items of an array of scalars, each at its place. */
      if (Array.isArray(child) && declaredTypes(field.node?.items)) {
        child.forEach((item, i) => {
          const itemProblem = typeProblem(item, field.node.items);
          if (itemProblem) issues.push(typeIssue(itemProblem, item, field.node.items, `${at}[${i}]`));
        });
      }
      if (field.enum && child !== null) {
        const values = Array.isArray(child) ? child : [child];
        for (const item of values) {
          if (typeof item === 'string' && !field.enum.values.includes(item)) {
            issues.push({
              path: at,
              kind: 'value',
              message: `\`${item}\` is not a value of \`${name}.${key}\` (${field.enum.values.length} declared).`,
            });
          }
        }
      }
      const nested = objectSchemaOf(field.node);
      if (nested) visit(child, nested, at, depth + 1);
      const itemSchema = objectSchemaOf(field.node?.items);
      if (itemSchema && Array.isArray(child)) {
        child.forEach((item, i) => visit(item, itemSchema, `${at}[${i}]`, depth + 1));
      }
    }

    for (const field of fields) {
      if (field.required && !present.has(field.name)) {
        const at = path ? `${path}.${field.name}` : field.name;
        issues.push({ path: at, kind: 'missing', message: `\`${at}\` is required by the specification and absent.` });
      }
    }
  };

  /* No request of the specification is an array: a top-level one is a
     mistake to report, not a list of bodies to check one by one. */
  visit(body, schemaName, '', 0);
  return issues;
}

/**
 * Check a query string against the query parameters an operation declares.
 *
 * Spring binds a request parameter by its exact name, so `geoserver` where
 * the operation declares `geoServer` is dropped in silence — the failure an
 * unknown body field has, on the calls that have no body at all. Three of the
 * six calls one EV application made were GETs, which the body check never
 * looked at.
 *
 * @param {string} query - Without the `?`, e.g. `providerName=ecoMovement&geoServer=here`.
 * @param {Array<object>} parameters - The operation's own, from the specification.
 * @param {object} [snapshot]
 * @returns {Array<{path: string, kind: 'unknown'|'missing'|'value', message: string}>}
 */
export function checkQuery(query, parameters, snapshot = loadSnapshot()) {
  const schemas = snapshot.spec.components?.schemas ?? {};
  const declared = parameters.filter((parameter) => parameter.in === 'query');
  const byName = new Map(declared.map((parameter) => [parameter.name, parameter]));
  const resolve = (schema) => (schema?.$ref ? schemas[refName(schema.$ref)] ?? {} : schema ?? {});
  const issues = [];
  const present = new Set();

  for (const [key, value] of new URLSearchParams(query)) {
    const parameter = byName.get(key);
    if (!parameter) {
      const guess = nearest(key, [...byName.keys()]);
      issues.push({
        path: key,
        kind: 'unknown',
        message:
          `\`${key}\` is not a query parameter of this operation` +
          (guess ? ` — did you mean \`${guess}\`?` : declared.length ? '.' : ': it declares none.') +
          ' BeMap ignores an unknown parameter in silence.',
      });
      continue;
    }
    present.add(key);
    const schema = resolve(parameter.schema);
    const allowed = schema.enum ?? resolve(schema.items).enum;
    if (!allowed) continue;
    for (const item of schema.type === 'array' ? value.split(',') : [value]) {
      if (!allowed.includes(item)) {
        issues.push({ path: key, kind: 'value', message: `\`${item}\` is not a value of the query parameter \`${key}\` (${allowed.length} declared).` });
      }
    }
  }
  for (const parameter of declared) {
    if (parameter.required && !present.has(parameter.name)) {
      issues.push({ path: parameter.name, kind: 'missing', message: `\`${parameter.name}\` is a required query parameter, and absent.` });
    }
  }
  return issues;
}

/* ======================================================================
 * OUTPUT FORMATTING
 *
 * Tool results are consumed by a language model, whose context is shared
 * with the code it is writing, so every answer is budgeted.
 *
 * The recurring constraint is size: one schema with every enum value
 * explained runs past 40 KB, and a guide past 100 KB. The tools choose a
 * condensed projection by default; this module is the backstop — a hard
 * ceiling, cut on a line boundary, that always says what it dropped. Silent
 * truncation reads as complete coverage, which is worse than a short answer.
 * ====================================================================== */

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
 * Split a long text into parts of at most `size` characters, on line
 * boundaries, never leaving a fenced code block open across a cut: a part
 * that ends inside one closes it, and the next reopens it with the same
 * fence line.
 *
 * Guides used to be cut at raw offsets — 23 cuts, every one mid-line and most
 * inside a code block — so a part ended in `"providerName": "ec` and the next
 * began inside a fence it never opened, which inverted every fence after it.
 *
 * A single line longer than `size` is kept whole, in a part of its own.
 *
 * @param {string} text
 * @param {number} size - Characters per part.
 * @returns {string[]} At least one part; joining them, fences aside, gives back `text`.
 */
export function splitParts(text, size) {
  const parts = [];
  let current = [];
  let length = 0;
  let open = null;
  for (const line of text.split('\n')) {
    if (length + line.length + 1 > size && current.length > (open ? 1 : 0)) {
      parts.push([...current, ...(open ? [open.marker] : [])].join('\n'));
      current = open ? [open.line] : [];
      length = current.reduce((n, kept) => n + kept.length + 1, 0);
    }
    current.push(line);
    length += line.length + 1;
    const fence = line.match(/^\s*(`{3,}|~{3,})(.*)$/);
    if (fence && !open) open = { marker: fence[1], line };
    else if (fence && open && fence[1].startsWith(open.marker[0]) && fence[1].length >= open.marker.length && !fence[2].trim()) open = null;
  }
  parts.push(current.join('\n'));
  return parts;
}

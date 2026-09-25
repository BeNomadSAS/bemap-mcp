<span class="bemap-tag">Foundations</span>

# Snippet helpers — `bemap.snippet.*`

<p class="bemap-tagline">Three pure functions that render copy-paste-ready JS strings — for "show me the current configuration" admin UIs and for the per-service demo dashboards. Safe to ship.</p>

## At a glance

<ul class="bemap-glance">
<li><code>bemap.snippet.contextLine(ctx)</code> — render a <code>new bemap.Context({…})</code> block. <code>login</code> / <code>password</code> become placeholders.</li>
<li><code>bemap.snippet.jsLiteral(value)</code> — pretty-print any value as a JS literal.</li>
<li><code>bemap.snippet.requestSnippet(className, opts)</code> — wraps <code>jsLiteral(opts)</code> as <code>var req = new bemap.&lt;Class&gt;({…});</code>.</li>
<li>Inject raw code (enum refs, constructor expressions) by prefixing with <code>bemap.snippet.RAW_PREFIX</code> (<code>'/*RAW*/'</code>).</li>
</ul>

## Usage

### `contextLine` — render a Context

```js
var ctx = new bemap.Context({
    login: 'demo-user',
    password: 'demo-pass',
    host: 'bemap-beta.benomad.com',
    secure: true,
    geoserver: 'here',
    chargingStationProvider: 'ecoMovement'
});

console.log(bemap.snippet.contextLine(ctx));
// →
// var ctx = new bemap.Context({
//     login: 'your-login',
//     password: 'your-password',
//     host: 'bemap-beta.benomad.com',
//     secure: true,
//     geoserver: 'here',
//     chargingStationProvider: 'ecoMovement'
// });
```

### `jsLiteral` — pretty-print any value

Handles every JS literal type. Strings prefixed with `bemap.snippet.RAW_PREFIX` (`'/*RAW*/'`) come through as raw code (no quotes) — useful for enum references and constructor expressions.

```js
bemap.snippet.jsLiteral({
    a: 1,
    b: [bemap.snippet.RAW_PREFIX + 'bemap.RoutingCriteria.FASTEST'],
    c: new Date('2026-05-26T00:00:00Z')
});
// →
// {
//     a: 1,
//     b: [bemap.RoutingCriteria.FASTEST],
//     c: new Date('2026-05-26T00:00:00.000Z')
// }
```

### `requestSnippet` — wrap as a request constructor

```js
bemap.snippet.requestSnippet('RoutingRequest', {
    destinations: [
        bemap.snippet.RAW_PREFIX + 'new bemap.Coordinate(2.35, 48.85)',
        bemap.snippet.RAW_PREFIX + 'new bemap.Coordinate(4.83, 45.75)'
    ],
    routingCriterias: [bemap.snippet.RAW_PREFIX + 'bemap.RoutingCriteria.FASTEST']
});
// → var req = new bemap.RoutingRequest({ ... });
```

## Reference

| Function | Purpose |
| --- | --- |
| `bemap.snippet.contextLine(ctx)` | Renders a `new bemap.Context({...})` block from a live Context. Credentials become placeholders so output is safe to paste into docs / chat. |
| `bemap.snippet.jsLiteral(value, indent?)` | Pretty-prints any value as a JS literal — nested objects, arrays, `Date`, numbers, booleans, strings, `null`. |
| `bemap.snippet.requestSnippet(className, opts, varName?)` | Wraps `jsLiteral(opts)` as `var req = new bemap.<Class>({...});`. |
| `bemap.snippet.RAW_PREFIX` | String prefix (`'/*RAW*/'`) that marks a string as raw JS in `jsLiteral` / `requestSnippet`. |

## See also

- [The Context](index.html#subpage-jsapi_2_0_0-the-context.md)
- Per-service demos in the ZIP — [the GitHub repository](https://github.com/BeNomadSAS/bemap-js-api) — each `examples/services-v2/*.html` demo's "Code example" panel uses these helpers live.

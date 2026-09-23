<span class="bemap-tag">Foundations</span>

# Credential-less setup — the `proxy` option

<p class="bemap-tagline">Put your own server in front of BeMap and the browser holds no credential at all<span data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"> — not for services, not for tiles</span>. One Context field, and the SDK stops sending authentication entirely.</p>

<div class="bemap-callout">
<strong>This is the production pattern.</strong> Inline <code>login</code> / <code>password</code> on the Context are readable by anyone who opens DevTools. That is acceptable for a demo or an evaluation and wrong for a shipped application. <code>proxy</code> is the supported way to fix it, and it is the <em>only</em> credential-less mode implemented in 2.0.2.<span data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"> See <em>What about a token provider?</em></span>
</div>

## At a glance

<ul class="bemap-glance">
<li>One field: <code>proxy</code> on <code>bemap.Context</code>. Everything else follows automatically.</li>
<li>Covers <strong>every</strong> authenticated call the SDK makes, REST/WMS service calls included.</li>
<li>When set, the SDK sends <strong>no</strong> <code>Authorization</code> header and <strong>no</strong> <code>appid</code>/<code>appcode</code> parameters — even if <code>login</code>/<code>password</code> are still present in the config.</li>
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES">Tile <strong>bytes</strong> still go direct to <code>tilesHost</code>, so your server carries no tile bandwidth.</li>
<li>Accepts a bare host, a host with a port, or a full URL: <code>'my-proxy.example.com'</code>, <code>'localhost:8787'</code>, <code>'https://my-proxy.example.com/bemap'</code>.</li>
<li>Malformed values <strong>throw at construction</strong> rather than producing a silently wrong request.</li>
</ul>

## Usage

### Configure it

```js
var ctx = new bemap.Context({
    proxy: 'https://my-proxy.example.com',   // your server
    path:  '/'                               // base path on the proxy
});                                          // no login, no password
```

<div data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES">

Rendering with BeNomad Tiles? Add one more field:

```js
    tilesHost: 'mptiles-api.benomad.net'     // still needed — tiles bytes go direct
```

</div>

With `proxy` set, `getBaseUrl()` becomes `proxy + path`, so service calls land on your
server. <span data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><code>getTilesLoginUrl()</code> becomes <code>proxy + '/tiles/login'</code>. </span>Everything else about
your application code is unchanged — the same `bemap.RoutingV2`, `bemap.Geocoder`,
`bemap.MapLibreMap` calls work as they did.

### What your server has to do

Each endpoint is thin: attach the credentials you already hold, forward, return
the response body unchanged.

<table>
<thead><tr><th>Your endpoint</th><th>Forwards to</th><th>Adds</th></tr></thead>
<tbody>
<tr><td><code>&lt;proxy&gt;&lt;path&gt;service/…</code> and <code>…/wms</code></td><td><code>https://&lt;bemap-host&gt;/bgis/…</code></td><td><code>Authorization: Basic</code> (or <code>appid</code>/<code>appcode</code>)</td></tr>
<tr data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><td><code>&lt;proxy&gt;/tiles/login</code></td><td><code>https://&lt;tilesHost&gt;/api/login</code></td><td><code>Authorization: Basic</code> + a real <code>User-Agent</code></td></tr>
</tbody>
</table>

<div data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES">

<p>The tiles login endpoint returns the worker's <code>{ ok, username, token }</code> JSON body
unchanged. The SDK reads <code>token</code> from it and uses it for tile requests.</p>

<h3 id="thetileshalfindetail">The tiles half, in detail</h3>

<p>The tiles worker signs tokens per environment, so the proxy must know which tiles host
the browser is about to read. The SDK communicates that with the <code>X-BeMap-Tiles-Host</code>
request header on the login call.</p>

<p><strong>Allow-list it.</strong> Your proxy must validate that header against a fixed set of BeNomad
tiles hosts and reject anything else. Forwarding an arbitrary attacker-supplied host is
a server-side request-forgery hole — the browser would be choosing where your server
sends its credentials.</p>

<p><strong>Send a real <code>User-Agent</code>.</strong> The tiles gateway filters bot-looking agents
(<code>Python-urllib</code>, default HTTP-library strings). A login that works from a browser but
returns <code>403</code> from your server is almost always this and not a credentials problem.</p>

</div>

### Environment selector

If your proxy fronts more than one BeMap environment, set `bemapEnv` and the SDK adds an
`X-BeMap-Env` header to every call so the proxy can route:

```js
var ctx = new bemap.Context({
    proxy:     'https://my-proxy.example.com',
    bemapEnv:  'preprod'
});
```

<div data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES">

Pair it with the tiles host for that same environment:

```js
    tilesHost: 'mptiles-api-preprod.benomad.net'
```

</div>

The header is only added when `proxy` is also set. Without a proxy, `getProxyHeaders()`
returns `{}`.

## Reference

### Accepted `proxy` values

The scheme is optional. When omitted, the protocol follows the Context's `secure` flag,
exactly as it does for `host`.

| Value | Resolves to (with `secure: true`) |
| --- | --- |
| `'my-proxy.example.com'` | `https://my-proxy.example.com` |
| `'my-proxy.example.com/bemap'` | `https://my-proxy.example.com/bemap` |
| `'https://my-proxy.example.com'` | `https://my-proxy.example.com` |
| `'localhost:8787'` | `https://localhost:8787` |

Normalised once at construction — trailing slashes stripped, canonical `origin[+path]`
stored — so every consumer reads the same form.

### Values that throw

Rejected loudly at construction rather than producing a request to the wrong place.

| Input | Why |
| --- | --- |
| a non-string | `proxy` must be a host or an http(s) URL string |
| anything containing whitespace | browsers disagree — Chrome percent-encodes it into a garbage host, Node rejects it. Decided here so behaviour is identical everywhere. |
| a non-http(s) scheme, e.g. `ftp://…` | |
| `https:/host` (one slash) | would otherwise be re-read as the bare host `https` with path `/host` |

Error messages **redact** the value before interpolating it, so a proxy value that
embeds userinfo — the `user:password@host` form — cannot leak a password into an
`Error` message picked up by an uncaught-error handler or a crash reporter.

### What the SDK stops sending

<table>
<thead><tr><th>Normally</th><th>In proxy mode</th></tr></thead>
<tbody>
<tr><td><code>Authorization: Basic &lt;base64&gt;</code> on service calls</td><td>not sent</td></tr>
<tr><td><code>appid=…&amp;appcode=…</code> on WMS URLs</td><td>empty string</td></tr>
<tr data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><td><code>Authorization: Basic</code> on the tiles login</td><td>not sent — replaced by <code>X-BeMap-Tiles-Host</code></td></tr>
</tbody>
</table>

This holds **even when `login` and `password` are still set on the Context**. A
half-migrated configuration cannot leak them.

### Context fields involved

<table>
<thead><tr><th>Field</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><code>proxy</code></td><td>Your proxy origin, optionally with a path prefix.</td></tr>
<tr><td><code>path</code></td><td>Base path appended to the proxy. Default <code>/bgis/</code>; use <code>'/'</code> if your proxy exposes the services at its root.</td></tr>
<tr data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><td><code>tilesHost</code></td><td>Still required. Tile bytes go direct to this host.</td></tr>
<tr><td><code>bemapEnv</code></td><td>Optional environment selector, sent as <code>X-BeMap-Env</code> (proxy mode only).</td></tr>
</tbody>
</table>

## Notes

<div data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES">

<h3 id="whataboutatokenprovider">What about a token provider?</h3>

<p>Older material describes a <code>tilesTokenProvider</code> / token-provider pattern for the tiles
half. <strong>It is not implemented in 2.0.2.</strong> The string <code>tokenProvider</code> does not occur
anywhere in the shipping bundle, so configuring it has no effect — you get the
credential-carrying default path with no warning.</p>

<p><code>proxy</code> is the credential-less mode that exists, and it covers strictly more: services
as well as tiles. Use it.</p>

<h3 id="whythetilesloginneedsaproxyatall">Why the tiles login needs a proxy at all</h3>

<p>The BeMap services and the tiles worker are <strong>different origins</strong>. Same-origin
deployments can lean on a session cookie for the services, but that cookie is never
sent to <code>mptiles-api*.benomad.net</code>, and the worker does not understand BeMap sessions —
it authenticates with HTTP Basic against <code>POST /api/login</code>. That single call is the
only place a tiles credential is needed, which is why proxying just it is enough.</p>

</div>

### Gotchas

<ul>
<li><strong><code>path</code> left at the default.</strong> With <code>proxy</code> set and <code>path</code> still <code>/bgis/</code>, service calls go to <code>&lt;proxy&gt;/bgis/service/…</code>. That is correct if your proxy mirrors the BeMap layout, and wrong if it serves them at the root. Set <code>path: '/'</code> in that case.</li>
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><strong>Forgetting <code>tilesHost</code>.</strong> <code>proxy</code> does not replace it. Tile bytes are fetched direct; without <code>tilesHost</code> there is nothing to fetch.</li>
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><strong>Forwarding <code>X-BeMap-Tiles-Host</code> blindly.</strong> Allow-list it. This is the one security-relevant decision the proxy has to make.</li>
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><strong>Missing <code>User-Agent</code> on the server side.</strong> Produces a <code>403</code> from the tiles gateway that reads like bad credentials.</li>
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><strong>Assuming the proxy carries tile traffic.</strong> It does not, by design — only the login. Sizing your proxy for tile bandwidth is wasted capacity.</li>
<li><strong>CORS.</strong> The browser now talks to your origin for service calls. If your proxy is on a different origin from your app, it needs the usual CORS response headers.</li>
</ul>

## See also

<ul>
<li><a href="index.html#subpage-jsapi_2_0_0-the-context.md">The Context</a> — every configuration field</li>
<li><a href="index.html#subpage-jsapi_2_0_0-authentication.md">Authentication</a> — how credentials are carried when you are not using a proxy</li>
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><a href="index.html#subpage-jsapi_2_0_0-js-tiles-auth.md">Tiles authentication</a> — the login contract your proxy forwards to</li>
<li><a href="index.html#subpage-jsapi_2_0_0-install.md">Install &amp; setup</a> — getting the bundle onto the page</li>
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><a href="index.html#subpage-jsapi_2_0_0-js-tiles-overview.md">BeNomad Tiles — overview</a></li>
</ul>

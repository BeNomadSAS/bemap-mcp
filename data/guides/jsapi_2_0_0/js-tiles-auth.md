<span class="bemap-tag">BeNomad Tiles</span>

# Sessions &amp; tokens

<p class="bemap-tagline">One HTTP Basic login against the tiles worker returns a JWT valid ~1 hour, and every tile, style, glyph and discovery request must carry it — by cookie, header or query parameter.</p>

<div class="bemap-callout">
<strong>You normally write none of this.</strong> <code>bemap.MapLibreMap</code> instantiates <code>bemap.TilesAuth</code> for you as soon as <code>ctx.tilesHost</code> is set: it logs in, picks the wire mode, waits for the token before the first tile request, renews ahead of expiry and recovers from a <code>401</code>. This page is the contract underneath — read it when you integrate raw MapLibre, a native client, or a backend.
</div>

## At a glance

<ul class="bemap-glance">
<li>Login: <code>POST {tilesBase}/api/login</code> with <code>Authorization: Basic base64(login:password)</code> &rarr; <code>{ ok, username, token }</code>, plus an HttpOnly <code>session</code> cookie.</li>
<li>Token lifetime <strong>~1 hour</strong>. Limits: <strong>100 req/s</strong> per user, <code>Range</code> &le; 10 MB, HTTPS only.</li>
<li>Four wire modes on <code>tilesAuth</code>: <code>auto</code> (default), <code>cookie</code>, <code>header</code>, <code>query</code>.</li>
<li><code>auto</code> resolves once, at construction: same registrable domain as <code>tilesHost</code> &rArr; <code>cookie</code>; cross-site &rArr; <code>X-Session-Token</code> header.</li>
<li>Renewal is automatic — proactive 5 minutes before the <code>exp</code> claim, reactive on <code>401</code>, plus <code>visibilitychange</code> and offline handling.</li>
<li>The token is persisted per <code>ctx.tokenStorage</code>: <code>'session'</code> (default), <code>'local'</code> or <code>'memory'</code>, under the key <code>bemap_tiles_token</code>.</li>
<li>Credential-less integrations: a backend token provider, or the v2.0.2 <code>proxy</code> option.</li>
</ul>

## Usage

The supported path — set `tilesHost` and let the SDK own the session:

```js
var ctx = new bemap.Context({
    login:     'YOUR_LOGIN',
    password:  'YOUR_PASSWORD',
    secure:    true,
    host:      'bemap.benomad.com',
    tilesHost: 'mptiles-api.benomad.net'
});

var map = new bemap.MapLibreMap(ctx, 'map');
map.isTokenValid();   // Boolean      map.getToken();  // String | null
map.refreshToken();   // Promise<String>
```

Pin the wire mode only when `auto` cannot be right for your deployment — for example a native WebView that cannot inject headers:

```js
new bemap.Context({ tilesHost: 'mptiles-api.benomad.net', tilesAuth: 'query' });   // shorthand
new bemap.Context({ tilesHost: '…', tilesAuth: { mode: 'header', tokenHeader: 'X-Session-Token' } });
new bemap.MapLibreMap(ctx, 'map', { tilesAuth: { mode: 'cookie' } });              // per-map override
```

Raw HTTP — log in, then spend the token. Never inline the credentials:

```bash
TOKEN=$(curl -s -X POST "https://mptiles-api.benomad.net/api/login" \
  -u "$LOGIN:$PASS" | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')

# 200 while the session is valid, 401 once it has expired
curl -s -o /dev/null -w '%{http_code}\n' -H "X-Session-Token: $TOKEN" \
  "https://mptiles-api.benomad.net/api/status"

# a z/x/y MVT tile with the same token
curl -s -H "X-Session-Token: $TOKEN" \
  "https://mptiles-api.benomad.net/default/12/2074/1409.pbf" --output tile.pbf
```

## Reference

### Session endpoints

| Endpoint | Method | Auth sent | Response |
| --- | --- | --- | --- |
| `{tilesBase}/api/login` | `POST` | `Authorization: Basic base64(login:password)` | `{ ok, username, token }` + `Set-Cookie: session=…; HttpOnly; Secure; SameSite=None`. Token TTL ~1 h |
| `{tilesBase}/api/status` | `GET` | Current token, any wire mode | `200` session valid / `401` expired or unknown |
| `{tilesBase}/api/logout` | `GET` or `POST` | Current token, any wire mode | `200`. Clears the cookie session. **Does not revoke the JWT** — see below |

`{tilesBase}` is `https://<tilesHost>` — `ctx.getTilesBaseUrl()`, plus `getTilesLoginUrl()` / `getTilesStatusUrl()` / `getTilesLogoutUrl()`.

<div class="bemap-callout">
<strong>Logout does not revoke the token.</strong> Verified against the deployed beta worker: <code>/api/logout</code> accepts <strong>both</strong> <code>GET</code> and <code>POST</code> (both return <code>200</code>), but the JWT stays usable afterwards — <code>/api/status</code> still returns <code>200</code> and tile requests still succeed until the token reaches its own <code>exp</code>. Logout clears the <code>HttpOnly</code> cookie session; it is not a bearer-token revocation. Treat a JWT as valid for its full lifetime once issued, and keep it out of logs and URLs you persist. The SDK sends <code>POST</code> (<code>bemap.TilesAuth.logout({ serverSide: true })</code>); a raw client may use either method.
</div>

### Limits

| Limit | Value | Exceeded &rarr; |
| --- | --- | --- |
| Token lifetime | ~1 hour | `401` on every subsequent request |
| Request rate | 100 req/s per user | `429` |
| `Range` size | ≤ 10 MB per request | `403` |
| Transport | HTTPS only | Request refused |

### Wire modes — `tilesAuth`

Set on the Context, overridable field-by-field per map. Accepts the string shorthand (`'auto'`, `'cookie'`, `'header'`, `'query'`) or the full object. An unrecognised `mode` falls back to `auto`.

| Field | Default | Meaning |
| --- | --- | --- |
| `mode` | `'auto'` | `'auto'` \| `'cookie'` \| `'header'` \| `'query'` |
| `credentials` | `'include'` | Cookie mode only — `'include'` \| `'same-origin'` \| `'omit'` |
| `tokenHeader` | `'X-Session-Token'` | Header mode only |
| `tokenParam` | `'token'` | Query mode only |

| `mode` | How the token rides the request | Cost |
| --- | --- | --- |
| `auto` *(default)* | Resolved once, when `bemap.TilesAuth` is constructed: `bemap.Context._sameSite()` compares the registrable domain (last two labels) of `window.location.hostname` and `tilesHost`. Same &rArr; `cookie`; different &rArr; `header`. `header` is the safe fallback, so `auto` never silently breaks cross-site. | None |
| `cookie` | `credentials: <credentials>` on every request; no custom header, no query parameter, so a `Range` GET stays a CORS-simple request. | No preflight. First-party only — a `SameSite=None` cookie is blocked cross-site by Safari ITP, Firefox TCP and Chrome incognito. |
| `header` | `<tokenHeader>: <jwt>` on every request. | Works without cookies. Preflight is path-dependent: one cached `OPTIONS` per slice URL on the 200-slice path, one per request on the `Range` + `no-store` path. |
| `query` | `?<tokenParam>=<jwt>` appended to the URL. | No preflight, incognito-safe. Token appears in the URL; the browser cache refills on token rotation. |

The resolved mode applies uniformly to the pmtiles `Range` fetch interceptor, MapLibre's `transformRequest` (style, glyphs, sprites, z/x/y), `bemap.TilesStyle.fetch`, and to `login` / `logout`.

### `bemap.TilesAuth(ctx, options)`

Constructed for you by `bemap.MapLibreMap`. Instantiate it directly only in a raw-MapLibre integration.

| Option | Type | Purpose |
| --- | --- | --- |
| `onError` | `Function` | Receives a `bemap.Error` on any auth or network failure |
| `onToken` | `Function` | Receives `{ reason, exp }` — `reason` is `'login'` or `'refresh'`, exactly one event per logical operation |
| `tilesAuth` | `Object \| String` | Per-map wire config, merged over `ctx.tilesAuth` field-by-field |

| Member | Returns | Behaviour |
| --- | --- | --- |
| `login([login], [password])` | `Promise<String>` | Defaults to `ctx.login` / `ctx.password`. Concurrent calls join the single in-flight promise |
| `whenTokenReady()` | `Promise<String\|null>` | Resolves with the current valid token, otherwise starts (or joins) a login. The synchronisation point the fetch interceptor uses |
| `getToken()` | `String \| null` | The raw JWT |
| `isValid()` | `Boolean` | `false` with no token; `true` when `exp` is unparseable (assume valid until a `401`); otherwise `exp > now + 30 s` |
| `refresh()` | `Promise<String>` | Proactive renewal with the original credentials; deduplicated |
| `getHistory()` | `Array<{exp:Number}>` | Last 3 superseded tokens — **`exp` only, never the JWT** |
| `buildTransformRequest()` | `Function` | MapLibre `transformRequest`; only stamps requests whose host equals `ctx.tilesHost`. Captures `getToken`, not the token value, so renewal is transparent |
| `handle401(map, [styleSpec])` | `Promise<String>` | Refresh, then `setStyle(styleSpec, { _internal: true })` to retry pending tiles. N simultaneous `401`s collapse into one refresh and one reload |
| `logout([{ serverSide }])` | `Promise<void>` | Always clears the token, history, storage and renewal timer. `serverSide: true` also calls the logout endpoint |
| `destroy()` | — | Clears the timer, removes the `visibilitychange` / `online` listeners, unregisters from the fetch interceptor |
| `bemap.TilesAuth.STORAGE_KEY` | `String` | `'bemap_tiles_token'` |
| `bemap.TilesAuth.installFetchInterceptor(auth, tilesHost)` | — | Scoped `window.fetch` wrapper that awaits login and stamps auth on requests to `tilesHost`. Idempotent; skips `/api/login`; needed because `pmtiles.js` bypasses `transformRequest` |
| `bemap.TilesAuth.uninstallFetchInterceptor(tilesHost)` | — | Unregisters the host; restores the original `window.fetch` when the registry empties |

### Token storage — `ctx.tokenStorage`

| Value | Backing store | Lifetime |
| --- | --- | --- |
| `'session'` *(default)* | `sessionStorage` | Cleared when the tab closes |
| `'local'` | `localStorage` | Survives reloads and restarts |
| `'memory'` | none | Never persisted |

Key `bemap_tiles_token`, value `{ token, exp }`. Storage failures (private mode, quota, disabled) degrade silently to memory-only.

### Error codes

Raised through `options.onError` when you construct `bemap.TilesAuth` yourself. The map
creates its own instance internally and routes those errors to an internal channel that
**2.0.2 exposes no public subscription for** — in practice you observe them in the
console. See [Map errors](index.html#subpage-jsapi_2_0_0-js-map-events.md).

| Condition | `bemap.Error` code |
| --- | --- |
| HTTP `401`, or no `tilesHost`, or missing credentials, or a login response with no token | `UNAUTHORIZED` |
| HTTP `403` | `FORBIDDEN` |
| HTTP `429` | `RATE_LIMITED` |
| Any other non-2xx, or a transport failure | `NETWORK` |
| `navigator.onLine === false` at call time | `OFFLINE` |

## Notes

**Renewal timeline.** After every successful login the SDK parses the JWT `exp` claim and schedules a refresh at `exp − 5 minutes` (clamped to `[0, 24 h]`); when `exp` cannot be parsed it falls back to a fixed **55 minutes**. A `401` on a tile or style triggers `handle401()` — refresh, then a `setStyle()` reload so pending requests retry with the new token. On `document.visibilitychange` to `visible` the SDK re-logs in if the token has already expired, refreshes if it expires within 5 minutes, and does nothing otherwise. When `navigator.onLine` is `false` the renewal is queued and replayed on the next `online` event.

**Credential-less: backend token provider.** Your server holds the credentials, exposes one authenticated endpoint that forwards `POST /api/login` with the Basic header, and returns the JSON body unchanged; the browser receives only the short-lived JWT and fetches tiles directly from BeNomad. Only the tiles credentials move server-side — see [The Context](index.html#subpage-jsapi_2_0_0-the-context.md).

**Credential-less: `proxy` (v2.0.2).** `new bemap.Context({ proxy: 'your-proxy.example.com', tilesHost: '…' })` routes the REST/WMS calls **and** the tiles login through your server, which injects the credentials; no `Authorization` ever leaves the browser. Tile bytes still go direct to `tilesHost`. Because the login response then comes from the proxy origin, the session cookie could never be sent to `tilesHost` — so the SDK forces the `header` wire, overriding an explicit `tilesAuth: 'cookie'` with a one-shot console warning (`'query'` is honoured). See [The Context](index.html#subpage-jsapi_2_0_0-the-context.md).

### Gotchas

- **`tokenStorage` values are `'session'` / `'local'` / `'memory'`** — not `'sessionStorage'` / `'localStorage'`. An unrecognised value silently falls back to `sessionStorage`.
- **Never patch `window.fetch` yourself** to inject the token. The SDK already owns a scoped, host-checked wrapper; a second patch double-stamps requests or drops the `Range` policy.
- **Pinning `tilesAuth: 'cookie'` on a cross-site app will `401`** in Safari, Firefox and Chrome incognito. That is precisely what `auto` exists to avoid — leave it unset.
- **`getHistory()` is diagnostic only.** It deliberately keeps just the `exp` claim, so logging it cannot exfiltrate a still-valid token. Never log `getToken()`.
- **A missing `login` / `password` produces a one-shot console warning, then `UNAUTHORIZED`** — not a silent blank map. Check the console before debugging CORS.
- **`isValid()` returns `true` when `exp` is unparseable.** A non-JWT token is assumed good until the server answers `401`; the fixed 55-minute renewal covers the rest.
- **`logout()` without `{ serverSide: true }` only clears the client.** The session stays valid on the worker until it expires.
- **A `403` on a `.pmtiles` request is usually not auth.** No `Range` header, a `Range` over 10 MB, or a multi-part `Range` are all rejected with `403` — see [Troubleshooting](index.html#subpage-jsapi_2_0_0-js-tiles-troubleshooting.md).

## See also

- [Overview & access](index.html#subpage-jsapi_2_0_0-js-tiles-overview.md) — the access contract in context, environments, integration paths
- [Web — PMTiles](index.html#subpage-jsapi_2_0_0-js-tiles-web-pmtiles.md) — where the token is attached on the browser path
- [Mobile & fleet z/x/y](index.html#subpage-jsapi_2_0_0-js-tiles-mobile-zxy.md) — the `?token=` query wire for native clients
- [Cache & slices](index.html#subpage-jsapi_2_0_0-js-tiles-cache.md) — why the wire mode changes the preflight and cache behaviour
- [Troubleshooting](index.html#subpage-jsapi_2_0_0-js-tiles-troubleshooting.md) — `401` / `403` / CORS symptom to fix
- [The Context](index.html#subpage-jsapi_2_0_0-the-context.md) — `tilesHost`, `tilesAuth`, `tokenStorage`, `proxy`
- [Error handling](index.html#subpage-jsapi_2_0_0-error-handling.md) — the typed-rejection pattern
- [Error codes](index.html#subpage-jsapi_2_0_0-glossary-error-codes.md) — every `bemap.Error` constant

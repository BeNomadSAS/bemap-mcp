<span class="bemap-tag">BeNomad Tiles</span>

# Mobile &amp; fleet — z/x/y tiles

<p class="bemap-tagline">Delivery mode 2 of 2: classic <code>{z}/{x}/{y}.pbf</code> vector tiles for native mobile apps, fleet backends and batch jobs — the same map data as the browser PMTiles archive, one tile per request.</p>

<div class="bemap-callout">
<strong>Decompress exactly once.</strong> Tiles are served <code>Content-Encoding: gzip</code>. Most HTTP clients inflate the body for you; gunzipping a second time is the single most common integration failure on this endpoint. Read <a href="#thegzipdecisionmatrix">the gzip decision matrix</a> before writing a byte of decoding code.<br>
<strong>No live demo on this page</strong> — this mode is consumed by native and server clients, not by the browser SDK. For the browser path see <a href="index.html#subpage-jsapi_2_0_0-js-tiles-web-pmtiles.md">Web — PMTiles</a>.
</div>

## At a glance

<ul class="bemap-glance">
<li>Endpoint: <code>GET https://&lt;tilesHost&gt;/&lt;map&gt;/{z}/{x}/{y}.pbf?token=&lt;JWT&gt;</code>.</li>
<li>Format: Mapbox Vector Tile (MVT, protobuf) — decode with <code>@mapbox/vector-tile</code>, <code>vtzero</code>, <code>go-mvt</code>, MapLibre Native, …</li>
<li><code>&lt;map&gt;</code> resolves exactly like the PMTiles archive: <code>tilesFile → geoserver → 'default'</code>.</li>
<li>Auth: <code>?token=&lt;JWT&gt;</code> query parameter, or the <code>X-Session-Token</code> header. Missing/invalid → <strong>401</strong>.</li>
<li><strong>204 No Content</strong> on an out-of-data tile (open ocean) is normal — "nothing to draw here", not an error.</li>
<li>Zoom range <code>0–14</code>, scheme <code>xyz</code>. Token TTL ~1 h; rate limit 100 req/s per user; HTTPS only.</li>
</ul>

## Usage

### 1. Get a token

The JWT comes from `POST {tilesBase}/api/login` with HTTP Basic credentials — the full
contract (response shape, TTL, the three ways to attach the token, refresh) lives on
[Tiles authentication](index.html#subpage-jsapi_2_0_0-js-tiles-auth.md). Keep credentials out of the app binary: in
production, fetch the token from your own backend.

```bash
TOKEN=$(curl -s -X POST "https://mptiles-api-beta.benomad.net/api/login" \
  -H "Authorization: Basic $(printf '%s:%s' "$LOGIN" "$PASS" | base64)" \
  -H "User-Agent: YourApp/1.0" | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')
```

### 2. Fetch a tile

```bash
# 200 with a tile body, or 204 when the tile is empty
curl --compressed -s -o tile.mvt -w "%{http_code}\n" \
  -H "User-Agent: YourApp/1.0" \
  "https://mptiles-api-beta.benomad.net/default/12/2074/1409.pbf?token=$TOKEN"
```

`--compressed` makes curl advertise gzip **and** inflate the response, so `tile.mvt`
is plain MVT. Without it, curl writes the raw gzip stream and you must gunzip it
yourself.

### 3. Wire it into a native map

Any MapLibre-compatible native renderer works the same way: fetch the server style, then
repoint its vector source at authenticated z/x/y URLs before handing the style to the map.

Four steps, in whatever language your client is written in:

1. `GET {tilesBase}/api/default-style?token=<JWT>` and parse the JSON.
2. Read `metadata.source_placeholder` (default `TILES_SOURCE`) — that names the source to replace.
3. Replace that source with a vector source pointing at the z/x/y template, and delete the placeholder if you renamed it:

```json
"sources": {
  "tiles": {
    "type":    "vector",
    "tiles":   ["https://<tilesHost>/<map>/{z}/{x}/{y}.pbf?token=<JWT>"],
    "minzoom": 0,
    "maxzoom": 14,
    "scheme":  "xyz"
  }
}
```

4. Walk `layers[]` and repoint every layer whose `source` was the placeholder at the new source name. Then pass the modified style to the map.

The style also carries a `metadata.place_label_placeholder` for bilingual labels —
see [Styles &amp; placeholders](index.html#subpage-jsapi_2_0_0-js-tiles-styles.md).

### 4. Keep the session alive

Mobile sessions routinely outlive a 1 h token. Probe before a map session (and on a
timer), and re-login on 401:

```bash
# 200 = still valid, 401 = expired → re-login and rebuild the style
curl -s -o /dev/null -w "%{http_code}\n" \
  -H "User-Agent: YourApp/1.0" \
  "https://mptiles-api-beta.benomad.net/api/status?token=$TOKEN"
```

Because the token is baked into the tile URL, a refresh is not just swapping a header:
rebuild the style JSON with the new token and hand it back to the map through whatever
"set style" call your renderer exposes.

## Reference

### Endpoint

| Request | Success | Notes |
| --- | --- | --- |
| `GET /<map>/{z}/{x}/{y}.pbf?token=<JWT>` | **200** tile · **204** empty | MVT (protobuf), gzip-encoded. |
| `POST /api/login` (HTTP Basic) | 200 `{ ok, username, token }` | Token TTL ~1 h. |
| `GET /api/status?token=<JWT>` | 200 valid · **401** expired | Cheap liveness probe. |
| `GET /api/default-style?token=<JWT>` | 200 | Style JSON with placeholders to substitute. |
| `GET /fonts/{fontstack}/{range}.pbf` | 200 | Glyphs, same auth. |

### Status codes

| Code | Meaning | What to do |
| --- | --- | --- |
| `200` | Tile body follows | Decode as MVT. |
| `204` | Empty tile, no body | Draw nothing. **Not an error.** |
| `401` | Missing / invalid / expired token | Re-login, rebuild the style. |
| `403` | Map not entitled, or gateway blocked the User-Agent | Send a real UA; if it persists, ask BeNomad to provision the tileset. |
| `429` | Rate limit (100 req/s per user) | Throttle; cap concurrency in bulk jobs. |

### The gzip decision matrix

| Your client | What you receive | What to do |
| --- | --- | --- |
| **Browser** (`fetch`, `XMLHttpRequest`) | Already **decompressed** — the browser handles `Content-Encoding` transparently and even hides the header from JS. | Feed the bytes straight to the MVT decoder. **Do not gunzip.** |
| **HTTP library that manages `Accept-Encoding` itself** — Python `requests`, okhttp default, Go `net/http` default transport | Already **decompressed** — the library advertised gzip and inflated the body for you. | Feed straight to the MVT decoder. **Do not gunzip.** |
| **You set `Accept-Encoding: gzip` manually**, or you use a raw/low-level socket client | **Raw gzip bytes** (magic `1f 8b`) | **Gunzip once**, then decode MVT. |

**Rule of thumb:** if you did *not* set `Accept-Encoding` yourself, your client has
already inflated the body. If you *did* — or you still see `Content-Encoding: gzip`
while reading the raw stream — gunzip exactly once.

### Environments

| Env | Tiles base |
| --- | --- |
| prod | `https://mptiles-api.benomad.net` |
| preprod | `https://mptiles-api-preprod.benomad.net` |
| beta | `https://mptiles-api-beta.benomad.net` |

## Notes

**Why mobile uses z/x/y instead of `pmtiles://`.** Two concrete reasons, not a style
preference. First, MapLibre Native's **SQLite ambient cache only works with classic
`{z}/{x}/{y}` endpoints** — it does not cache through the `pmtiles://` protocol, so a
PMTiles source on mobile means re-downloading everything on every session. Second, several
native map bindings **cannot inject headers on tile requests**, which is why the token
rides as a `?token=` query parameter rather than `X-Session-Token`. If your binding exposes
`transformRequest`, prefer the header — it keeps the JWT out of URLs and logs.

**Server-to-server.** The gateway filters bot-looking User-Agents (`Python-urllib`,
default HTTP-library UAs). Send an explicit, real `User-Agent` on **every** request —
login included. A login that works in a browser but returns `403` from a script is
almost always this, not a credentials problem.

### Gotchas

- **`204` treated as failure.** Clients that only special-case `200` will log errors, retry, and burn rate limit over open ocean. Handle `204` as an empty tile.
- **Invalid MVT / protobuf parse error on bytes starting `1f 8b`** → you handed gzip to the MVT decoder. Decompress first.
- **`not in gzip format` / `incorrect header check`** → you gunzipped bytes the client had already inflated. Decode as MVT directly.
- **okhttp:** the default client auto-decompresses — but the moment you set your *own* `Accept-Encoding` header it stops, and you own the gunzip.
- **Go `net/http`:** with the default transport and no explicit `Accept-Encoding`, `resp.Header.Get("Content-Encoding")` comes back **empty** even though the wire was gzipped. That is normal, not a sign the server skipped compression.
- **Token in the URL.** It appears in proxy and crash logs. Never log the tile URL verbatim in production, and store the JWT in secure storage (Keychain / Keystore), never in plain preferences.
- **Never ship credentials in the app.** `POST /api/login` from a mobile binary means the login/password is extractable — front it with your own token endpoint.
- **Always address the map by its provisioned alias** (typically `default`), never a raw `.pmtiles` filename.

## See also

- [BeNomad Tiles — overview](index.html#subpage-jsapi_2_0_0-js-tiles-overview.md) — the two delivery modes and when to pick which
- [Tiles authentication](index.html#subpage-jsapi_2_0_0-js-tiles-auth.md) — login, token TTL, refresh, the three ways to attach it
- [Web — PMTiles](index.html#subpage-jsapi_2_0_0-js-tiles-web-pmtiles.md) — delivery mode 1 of 2, the browser path
- [Styles &amp; placeholders](index.html#subpage-jsapi_2_0_0-js-tiles-styles.md) — substituting the source and bilingual-label placeholders
- [Tiles troubleshooting](index.html#subpage-jsapi_2_0_0-js-tiles-troubleshooting.md) — symptom → cause → fix

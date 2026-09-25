<span class="bemap-tag">Foundations</span>

# Install &amp; setup

<p class="bemap-tagline">Drop the bundle in, add the script tags for the one engine you use, and build a Context. No bundler, no npm, no build step — the library is a plain browser global.</p>

<div class="bemap-callout">
<strong>Pick only the engine you need.</strong> The package ships Leaflet, OpenLayers and MapLibre side by side so you can choose per project — not so you load all three. Loading one engine is the difference between ~250&nbsp;KB and well over a megabyte.
</div>

## At a glance

<ul class="bemap-glance">
<li>The library is a browser global — <code>window.bemap</code>. No module bundler required, no <code>import</code> needed.</li>
<li><code>bemap-js-api.js</code> (development) or <code>bemap-js-api.min.js</code> (production) — plus <code>bemap-js-api.css</code>, which is <strong>not</strong> optional.</li>
<li>Engine libraries are peers you load yourself: Leaflet 1.9, OpenLayers 10, or MapLibre GL 5.</li>
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><code>pmtiles.js</code> is required whenever <code>tilesHost</code> is set on the Context.</li>
<li>Everything is ordered: engine first, then <code>bemap-js-api.js</code>. The library detects which engines are present at load time.</li>
<li>Current version: <strong>2.0.2</strong>.</li>
</ul>

## Usage

### What's in the package

```
dist/
├── bemap-js-api.js        # full bundle — readable, use in development
├── bemap-js-api.min.js    # minified — use in production
├── bemap-js-api.css       # REQUIRED stylesheet (popups, markers, controls)
├── bemap-sw-tiles.js      # Service Worker — optional, see below
├── doc/                   # generated JSDoc reference
├── leaflet.js / .css               # Leaflet — only if you use LeafletMap
├── leaflet.markercluster.js        # only if you cluster on Leaflet
├── leaflet.draw.js / .css          # only if you draw on Leaflet
├── ol.js / ol.css                  # OpenLayers — only if you use OlMap
├── maplibre-gl.js / .css           # MapLibre GL — only if you use MapLibreMap
└── pmtiles.js                      # REQUIRED when ctx.tilesHost is set
```

Copy `dist/` into whatever directory your app serves static files from — `public/`,
`static/`, `assets/`. Keep only the engine files you actually use.

### Minimum page — WMS path (Leaflet or OpenLayers)

```html
<link rel="stylesheet" href="/bemap/leaflet.css">
<link rel="stylesheet" href="/bemap/bemap-js-api.css">
<script src="/bemap/leaflet.js"></script>
<script src="/bemap/bemap-js-api.js"></script>

<div id="map" style="width:100%;height:420px"></div>
<script>
  var ctx = new bemap.Context({
      host: 'bemap.benomad.com',
      secure: true,
      login: 'your-login',
      password: 'your-password'
  });
  var map = new bemap.LeafletMap(ctx, 'map');
  map.defaultLayers();
  map.move(2.35, 48.85, 12);
</script>
```

Swap `leaflet.*` for `ol.*` and `bemap.LeafletMap` for `bemap.OlMap` to run the same
page on OpenLayers. Nothing else changes — that is the point of the engine abstraction.

<div data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES">

<h3 id="minimumpagebenomadtilespathmaplibre">Minimum page — BeNomad Tiles path (MapLibre)</h3>

<p>Recommended for new applications. Vector tiles, client-side styling, 3D, globe.</p>

```html
<link rel="stylesheet" href="/bemap/maplibre-gl.css">
<link rel="stylesheet" href="/bemap/bemap-js-api.css">
<script src="/bemap/maplibre-gl.js"></script>
<script src="/bemap/pmtiles.js"></script>
<script src="/bemap/bemap-js-api.js"></script>

<div id="map" style="width:100%;height:420px"></div>
<script>
  var ctx = new bemap.Context({
      host: 'bemap.benomad.com',
      secure: true,
      login: 'your-login',
      password: 'your-password',
      tilesHost: 'mptiles-api.benomad.net'
  });
  var map = new bemap.MapLibreMap(ctx, 'map');
  map.move(2.35, 48.85, 12);
</script>
```

<p><code>pmtiles.js</code> must load <strong>before</strong> <code>bemap-js-api.js</code>. If it is
missing, the library prints a red console error naming the exact tag to add rather than
failing silently.</p>

</div>

### The `<div>` needs a height

The single most common "the map doesn't appear" cause. A `<div>` with no height
collapses to zero pixels and the map renders into nothing. Give it an explicit
height (`420px`, `100vh`, a flex child that resolves) — a percentage height only
works if every ancestor also has one.

<div data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES">

<h3 id="environments">Environments</h3>

<p>Always pair an API host with its matching tiles host. Mixing environments produces a
<code>403</code> on the tiles login that looks like a credentials problem but is not.</p>

<table>
<thead><tr><th>Environment</th><th><code>host</code></th><th><code>tilesHost</code></th></tr></thead>
<tbody>
<tr><td><strong>Production</strong> (default)</td><td><code>bemap.benomad.com</code></td><td><code>mptiles-api.benomad.net</code></td></tr>
<tr><td><strong>Preprod</strong></td><td><code>bemap-preprod.benomad.com</code></td><td><code>mptiles-api-preprod.benomad.net</code></td></tr>
<tr><td><strong>Beta</strong></td><td><code>bemap-beta.benomad.com</code></td><td><code>mptiles-api-beta.benomad.net</code></td></tr>
</tbody>
</table>

<h3 id="serviceworkeroptionalusuallyskipit">Service Worker — optional, usually skip it</h3>

<p>By default (<code>tilesSliceMode: '200'</code>) tiles arrive as ordinary cacheable HTTP 200
responses and the browser's own HTTP cache stores them. Repeat visits are free and
there is <strong>no Service Worker to deploy</strong>.</p>

<p>You only need <code>bemap-sw-tiles.js</code> if you opt into the classic HTTP-Range path
(<code>tilesSliceMode: 'range'</code>). It must be served from your <strong>site root</strong>,
not from <code>/bemap/</code>, so its scope covers the origin:</p>

```sh
cp dist/bemap-sw-tiles.js public/bemap-sw-tiles.js
```

<p>See <a href="index.html#subpage-jsapi_2_0_0-js-tiles-cache.md">Cache, slices &amp; resilience</a>
for the trade-off between the two modes.</p>

</div>

## Reference

### Peer library versions

Verified against the 2.0.2 package. Other versions in the same major generally work;
these are what the library is built and tested against.

<table>
<thead><tr><th>Peer</th><th>Version</th><th>Needed for</th></tr></thead>
<tbody>
<tr><td>Leaflet</td><td>1.9.4</td><td><code>bemap.LeafletMap</code></td></tr>
<tr><td>Leaflet.markercluster</td><td>bundled</td><td><code>bemap.ClusterLayer</code> on Leaflet</td></tr>
<tr><td>Leaflet.draw</td><td>bundled</td><td>drawing on Leaflet</td></tr>
<tr><td>OpenLayers</td><td>10.8.0</td><td><code>bemap.OlMap</code></td></tr>
<tr><td>MapLibre GL JS</td><td>5.24.0</td><td><code>bemap.MapLibreMap</code></td></tr>
<tr data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><td>PMTiles</td><td>bundled</td><td>any Context with <code>tilesHost</code></td></tr>
</tbody>
</table>

### Script order

<table>
<thead><tr><th>Order</th><th>File</th><th>Notes</th></tr></thead>
<tbody>
<tr><td>1</td><td>engine CSS + <code>bemap-js-api.css</code></td><td></td></tr>
<tr><td>2</td><td>engine JS (<code>leaflet.js</code> / <code>ol.js</code> / <code>maplibre-gl.js</code>)</td><td>must precede the library</td></tr>
<tr data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><td>3</td><td><code>pmtiles.js</code></td><td>only with <code>tilesHost</code>; must precede the library</td></tr>
<tr><td>4</td><td>engine plugins (markercluster, draw)</td><td>only if used</td></tr>
<tr><td>5</td><td><code>bemap-js-api.js</code></td><td>last</td></tr>
</tbody>
</table>

### Framework notes

The library is a plain global, so integration is the same everywhere: get the script
onto the page before your code runs.

| Framework | How |
| --- | --- |
| **Plain HTML** | `<script>` tags, as above. |
| **Vite** | Put the files in `public/`; reference them with absolute paths. |
| **Webpack** | `<script>` tag, or `import 'bemap-js-api/dist/bemap-js-api.js'` as a side-effect module — `window.bemap` is then available. |
| **Next.js** | `<Script src="/bemap-js-api.js" strategy="beforeInteractive" />`. |
| **Angular** | Add to `architect.build.options.scripts` in `angular.json`. |

Server-rendered frameworks must not touch `bemap` during SSR — it is a browser global
and does not exist on the server. Construct maps in a client-side effect.

## Notes

**Credentials in the browser.** `login` / `password` on the Context are readable by
anyone with DevTools. That is fine for demos and evaluations and wrong for production.
The supported production pattern is the [`proxy` option](index.html#subpage-jsapi_2_0_0-security-proxy.md),
which keeps every credential on your server.

**Getting credentials.** Contact your BeNomad account manager. Accounts are provisioned
per service — WMS, Routing v2, Geocoding v2, EV Smart Routing and so on —
so a login that works for one service can legitimately return `403` on another. Use the
[ACL service](index.html#subpage-jsapi_2_0_0-js-acl-service.md) to discover what your
account actually holds rather than hard-coding assumptions.

### Gotchas

<ul>
<li><strong>Blank map, no errors.</strong> Nine times out of ten the container has no height. Check the computed height in DevTools before anything else.</li>
<li><strong><code>bemap is not defined</code>.</strong> The library tag is missing, loaded after your code, or <code>defer</code>/<code>async</code> reordered it. The library must be fully parsed before you call it.</li>
<li><strong>Markers and popups look unstyled.</strong> <code>bemap-js-api.css</code> is missing. It is required, not cosmetic.</li>
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><strong><code>pmtiles is not defined</code> / red console error.</strong> <code>tilesHost</code> is set but <code>pmtiles.js</code> was not loaded, or was loaded after the library.</li>
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><strong><code>401</code> on every service call, tiles fine (or the reverse).</strong> The two authenticate separately — the tiles worker is a different origin with its own login. One failing while the other works is normal and points at ACL scope, not at broken credentials.</li>
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><strong>Mixed environments.</strong> <code>host</code> on beta with <code>tilesHost</code> on production yields <code>403</code> from the tiles login. Keep them on the same row of the table above.</li>
</ul>

## See also

<ul>
<li><a href="index.html#subpage-jsapi_2_0_0-quick-start.md">Quick start</a> — a working map in a few lines</li>
<li><a href="index.html#subpage-jsapi_2_0_0-the-context.md">The Context</a> — every configuration field</li>
<li><a href="index.html#subpage-jsapi_2_0_0-authentication.md">Authentication</a> — how credentials are carried</li>
<li><a href="index.html#subpage-jsapi_2_0_0-security-proxy.md">Credential-less setup — the <code>proxy</code> option</a> — the production pattern</li>
<li><a href="index.html#subpage-jsapi_2_0_0-js-map-engines.md">Choosing an engine</a> — Leaflet vs OpenLayers vs MapLibre</li>
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><a href="index.html#subpage-jsapi_2_0_0-js-tiles-overview.md">BeNomad Tiles — overview</a> — the vector-tile path</li>
</ul>

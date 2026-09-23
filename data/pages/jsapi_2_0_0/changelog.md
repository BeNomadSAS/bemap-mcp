<span class="bemap-tag">Reference</span>

# What's new

<p class="bemap-tagline">Every release of the BeMap JS API, newest first — what changed, and what it means for your application.</p>

<div class="bemap-callout">
<strong>On the version numbers.</strong> The current line is <strong>2.0.x</strong>. During development this work was numbered <code>2.7.x</code>, and some older documents mention a <code>v2.8</code> that was never published — everything they describe shipped in <strong>2.0.0</strong>. If you see those numbers anywhere, you are looking at a superseded document.
</div>

## At a glance

<ul class="bemap-glance">
<li><strong>2.0.2</strong> — keep your BeMap credentials out of the browser.</li>
<li><strong>2.0.1</strong> — maps pick up new map data on their own.</li>
<li><strong>2.0.0</strong> — the v2 release: modern JavaScript, vector maps, 3D, and every service in one library.</li>
</ul>

---

## 2.0.2 — August 2026

### Your credentials never have to reach the browser

Until now, using the API from a web page meant putting a login and password into JavaScript, where anyone can read them in the browser's developer tools. Fine for a prototype, not for production.

You can now point the library at **your own server** instead. Your server holds the credentials and forwards the request; the browser never sees them.

```js
var ctx = new bemap.Context({
    proxy: 'my-server.example.com'   // no login, no password
});
```

The guarantee is absolute: with `proxy` set, **no BeMap credential is sent anywhere** — even if a login and password are also configured by mistake. Maps, search, routing and EV services all work through it, and map tiles still come straight from BeNomad, so you pay no extra bandwidth and add no latency.

Optionally add `bemapEnv` to tell your server which environment to use, so one deployment can serve test and production.

### Also fixed

- Map background images no longer occasionally request a malformed URL when no credentials are configured.

---

## 2.0.1 — July 2026

### Maps refresh themselves when we publish new data

When BeNomad republished a map, browsers could keep showing the old one — sometimes a blank map — until the user manually cleared their cache. Not something you could fix from your application.

Now every map carries a version stamp. A republished map is a new address as far as the browser is concerned, so it is picked up automatically, with no page reload and nothing for you to do. Where a version stamp isn't available, the library detects the change itself and repairs the view.

Map data still caches aggressively, so this costs nothing in speed.

### Also fixed

- Accounts limited to image-based map servers can now display the base map correctly.

---

## 2.0.0 — May 2026

The v2 release. Modern JavaScript, a new map engine, and every BeMap service available from one library.

### Modern, predictable JavaScript

Every service returns a **Promise**, so calls fit naturally into `async`/`await` and modern frameworks. No callbacks, no raw XHR, no hand-parsing JSON.

```js
var route = await routing.calculate(request);
```

Every service also supports **cancellation** — abandon an in-flight request when the user pans the map or types a new query, instead of waiting for a result you no longer want. And every failure arrives as a **typed error** you can branch on, rather than a string you have to match:

```js
if (err.getCode() === bemap.Error.ROUTING_NO_ROUTE) showNoRouteMessage();
```

There are 22 error codes covering routing, search, electric mobility and mapping. See [Error codes](index.html#subpage-jsapi_2_0_0-glossary-error-codes.md).

### Vector maps, 3D and a globe

A new map engine renders **vector maps on the GPU**: sharp at any zoom, on any screen, and far lighter over the network than image tiles. It brings 3D buildings, 3D terrain and a true globe view, and it reads BeNomad's own map data. <span data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES">See <a href="index.html#subpage-jsapi_2_0_0-js-tiles-overview.md">BeNomad Tiles</a>.</span>

Map styling now lives on the server. Update the look of your maps centrally and **every application picks it up — no redeploy, no new release**. Labels can switch language at runtime.

### Maps that load fast and stay loaded

Map data is delivered in a form the browser caches natively, so a returning visitor loads the map largely from cache — with nothing to install or configure. On a flaky connection the library retries intelligently and repairs tiles that fail, instead of leaving grey squares on the map.

### Every service in one library

Routing, matrix and isochrone calculations. GPS trace matching. Address search, autocomplete and reverse geocoding. Points of interest. Charging-station search, EV journey planning, charging-time estimates, the vehicle catalogue and reachable-area polygons. Plus account and server information.

For electric mobility, journey planning moved to the newer service version, adding toll costs, a printable route sheet and a detailed timeline of the journey — with no change to the code you write.

### Choose your renderer

Three map engines from the same code: **Leaflet**, **OpenLayers** and the new vector engine. Switch by changing one line. OpenLayers was upgraded from the 2017 release to the current one, and applications built on v1 continue to work unchanged.

### Attribution, done for you

A single attribution widget works across all three engines and keeps your map legally compliant without hand-assembling notices.

---

## Upgrading

Applications written against v1 keep working — v1 classes remain available throughout the 2.x line and are scheduled for removal in 3.0. Start with the [v1 → v2 cheat sheet](index.html#subpage-jsapi_2_0_0-migration-from-v1.md), or move service by service.

<p data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES">Coming from image-based map layers, see <a href="index.html#subpage-jsapi_2_0_0-js-tiles-overview.md">WMS → BeNomad Tiles</a>.</p>

<div class="bemap-callout">
<strong>Looking for the engineering detail?</strong> Commit-level release notes — every fix, option and internal change — live with the library source on <a href="https://github.com/BeNomadSAS/bemap-js-api" target="_blank">GitHub</a>.
</div>

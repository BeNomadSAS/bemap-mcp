<span class="bemap-tag">Foundations</span>

# Error handling — `bemap.Error`

<p class="bemap-tagline">Every v2 rejection is a <code>bemap.Error</code>. Inspect <code>.getCode()</code> — the catalogue is stable, HTTP status is an implementation detail.</p>

## At a glance

<ul class="bemap-glance">
<li>Catalogue of typed error codes — switch on <code>err.getCode()</code>, not HTTP status.</li>
<li>Accessors: <code>getCode()</code>, <code>getMessage()</code>, <code>getStatus()</code>, <code>getUrl()</code>, <code>getContext()</code>.</li>
<li>Codes survive endpoint moves; aborted requests don't have an HTTP status at all.</li>
<li>MapLibre-specific codes documented in their own sub-table below.</li>
</ul>

## Usage

```js
service.call(req).catch(function(err) {
    switch (err.getCode()) {
        case bemap.Error.UNAUTHORIZED:     reLogin(); break;
        case bemap.Error.RATE_LIMITED:     backoffAndRetry(); break;
        case bemap.Error.ROUTING_NO_ROUTE: noRouteUI(); break;
        case bemap.Error.ABORTED:          /* user cancelled — silent */ break;
        default:                           genericErrorUI(err);
    }
});
```

### Accessors

```js
err.getCode()      // → one of the constants in the catalogue
err.getMessage()   // → human-readable description
err.getStatus()    // → HTTP status code (when applicable)
err.getUrl()       // → request URL that failed
err.getContext()   // → optional extra payload (validation details, etc.)
```

## Reference

### Catalogue

| Code | Triggers on |
| --- | --- |
| `bemap.Error.UNAUTHORIZED` | HTTP 401. Bad credentials or expired session. |
| `bemap.Error.FORBIDDEN` | HTTP 403. Your account does not have access to this service — contact your administrator. |
| `bemap.Error.RATE_LIMITED` | HTTP 429. |
| `bemap.Error.NETWORK` | Any other non-2xx, or transport failure. |
| `bemap.Error.ABORTED` | `signal.abort()` or `service.cancel(requestId)` was called. |
| `bemap.Error.OFFLINE` | Browser reports the network is offline. |
| `bemap.Error.INVALID_ARGUMENT` | Request object failed client-side validation before sending. |
| `bemap.Error.ROUTING_FAILED` | Server-side routing error — malformed request, unsupported transport, etc. |
| `bemap.Error.ROUTING_NO_ROUTE` | No route exists between the requested points. |
| `bemap.Error.ROUTING_TIMEOUT` | Server-side timeout on the routing engine. |
| `bemap.Error.EV_FAILED` | EV routing computation failed. |
| `bemap.Error.EV_NO_JOURNEY` | EV routing found no viable journey (battery / charging constraints). |
| `bemap.Error.CHARGING_NOT_FOUND` | Charging-station search returned no result for the constraints. |
| `bemap.Error.VEHICLE_NOT_FOUND` | EV vehicle key not in the catalogue. |
| `bemap.Error.CHARGING_TIME_FAILED` | Server-side charging-time estimate failed. |
| `bemap.Error.REACHABLE_AREA_FAILED` | Server-side reachable-area computation failed. |
| `bemap.Error.STYLE_LOAD_FAILED` | (MapLibre) style document failed to load. |
| `bemap.Error.TILE_LOAD_FAILED` | (MapLibre) tile load failed. |
| `bemap.Error.CACHE_HOST_CONFLICT` | (Browser cache) Service Worker has > 4 distinct tile hosts registered. |
| `bemap.Error.MAPLIBRE_ONLY` | API surface that requires the MapLibre engine (3D, globe, vector tiles, heatmap, native clustering). |
| `bemap.Error.MISSING_DEPENDENCY` | A required global is absent at map construction — an engine or optional peer library was not loaded. Thrown, not emitted. |
| `bemap.Error.REQUIRES_GLOBE` | A globe-only call made while the projection is `mercator`. |

### MapLibre errors — what to do

| Code | What to do |
| --- | --- |
| `MAPLIBRE_ONLY` | Switch the map to `bemap.MapLibreMap` or drop the call. See [Display map with MapLibre](index.html#subpage-jsapi_2_0_0-js-map-maplibre.md). |
| `STYLE_LOAD_FAILED` | Verify the style URL, auth headers, and CORS configuration. |
| `TILE_LOAD_FAILED` | Check the tile URL format, zoom bounds, and that the host is reachable. The browser cache will keep serving previously-fetched tiles. |
| `CACHE_HOST_CONFLICT` | Consolidate to ≤ 4 tile hosts, or set `browserCache: false` for the secondary hosts. |

<p data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES">For BeNomad Tiles specifics, see <a href="index.html#subpage-jsapi_2_0_0-js-tiles-web-pmtiles.md">Web — PMTiles</a>.</p>

## Notes

### Why not HTTP status codes?

- HTTP 200 with `{ error: ... }` in the body — the server sometimes returns 2xx with a logical error. The code catalogue normalises that.
- Codes survive endpoint moves. The HTTP layer is hidden behind the typed code.
- Aborted requests don't have an HTTP status at all.

## See also

- [Cancellation](index.html#subpage-jsapi_2_0_0-cancellation.md) — `AbortSignal` + `service.cancel()`
- [Error codes glossary](index.html#subpage-jsapi_2_0_0-glossary-error-codes.md) — alphabetical reference
- [Tiles troubleshooting](index.html#subpage-jsapi_2_0_0-js-tiles-troubleshooting.md) — `STYLE_LOAD_FAILED` / `TILE_LOAD_FAILED` / `CACHE_HOST_CONFLICT`

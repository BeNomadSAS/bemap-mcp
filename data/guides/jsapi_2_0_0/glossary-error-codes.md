<span class="bemap-tag">Glossary</span>

# Error codes

<p class="bemap-tagline">Alphabetical reference for every constant on <code>bemap.Error</code>. For usage patterns and the typed-rejection pattern see <a href="index.html#subpage-jsapi_2_0_0-error-handling.md">Error handling</a>.</p>

## Reference

| Code | Meaning |
| --- | --- |
| `bemap.Error.ABORTED` | Request was cancelled via `AbortSignal.abort()` or `service.cancel(requestId)`. Treat as silent — the user (or your app) asked to stop. See [Cancellation](index.html#subpage-jsapi_2_0_0-cancellation.md). |
| `bemap.Error.CACHE_HOST_CONFLICT` | (Browser tile cache.) Service Worker has > 4 distinct tile hosts registered. Consolidate or disable caching for secondary hosts. |
| `bemap.Error.CHARGING_NOT_FOUND` | `bemap.ChargingStations.search()` ran successfully but no station matched the constraints. |
| `bemap.Error.CHARGING_TIME_FAILED` | Server-side charging-time estimate failed. |
| `bemap.Error.EV_FAILED` | EV routing failed on the server — bad request, vehicle unsupported by the geoserver, etc. |
| `bemap.Error.EV_NO_JOURNEY` | EV routing succeeded but no viable journey with the supplied battery / charging constraints. Show a "tweak battery levels" affordance. |
| `bemap.Error.FORBIDDEN` | HTTP 403. Credentials valid but the account lacks access. Contact your administrator; inspect via [`bemap.AclService`](index.html#subpage-jsapi_2_0_0-js-acl-service.md). |
| `bemap.Error.INVALID_ARGUMENT` | Client-side guard rejected the request before sending — missing required field, wrong argument type, etc. Developer-mistake category. |
| `bemap.Error.MAPLIBRE_ONLY` | API surface requires the MapLibre engine — 3D, globe, vector tiles, heatmap, native clustering. |
| `bemap.Error.MISSING_DEPENDENCY` | A required global is absent when the map is constructed — an engine or optional peer library was not loaded, or was loaded after `bemap-js-api.js`. **Thrown**, not emitted, so the stack points at the constructor. |
| `bemap.Error.NETWORK` | Catch-all for non-2xx HTTP (other than typed codes) and transport failures. |
| `bemap.Error.OFFLINE` | `navigator.onLine === false` at call time. Useful for graceful UX (queue, show offline UI). |
| `bemap.Error.RATE_LIMITED` | HTTP 429. Back off and retry. |
| `bemap.Error.REQUIRES_GLOBE` | A globe-only call was made while the projection is `mercator`. Call `map.setProjection('globe')` first, then re-issue. |
| `bemap.Error.REACHABLE_AREA_FAILED` | Server-side reachable-area computation failed. |
| `bemap.Error.ROUTING_FAILED` | Routing server returned a logical error: malformed request, unsupported transport mode for the active geoserver, etc. |
| `bemap.Error.ROUTING_NO_ROUTE` | No route exists between the requested points. Show a "no route" affordance. |
| `bemap.Error.ROUTING_TIMEOUT` | Routing engine timed out server-side. |
| `bemap.Error.STYLE_LOAD_FAILED` | (MapLibre.) Style document failed to load. |
| `bemap.Error.TILE_LOAD_FAILED` | (MapLibre.) Tile failed to load. |
| `bemap.Error.UNAUTHORIZED` | HTTP 401. Bad credentials or expired session. Force re-login. |
| `bemap.Error.VEHICLE_NOT_FOUND` | EV vehicle key isn't in the catalogue. List available via [`bemap.EvVehicles.list()`](index.html#subpage-jsapi_2_0_0-js-ev-vehicles.md). |

## See also

- [Error handling](index.html#subpage-jsapi_2_0_0-error-handling.md) — typed-rejection pattern + per-error remediation
- [Cancellation](index.html#subpage-jsapi_2_0_0-cancellation.md) — `ABORTED` semantics
- [Authentication](index.html#subpage-jsapi_2_0_0-authentication.md) — `UNAUTHORIZED` / `FORBIDDEN`
- [Tiles troubleshooting](index.html#subpage-jsapi_2_0_0-js-tiles-troubleshooting.md) — `STYLE_LOAD_FAILED` / `TILE_LOAD_FAILED` / `CACHE_HOST_CONFLICT`

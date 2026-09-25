<span class="bemap-tag">Routing</span>

# Routing v2 — `bemap.RoutingV2`

<p class="bemap-tagline">Promise-based wrapper around <code>POST service/routing/1.0</code>. Point-to-point with vias, matrix, and isochrone — one endpoint, three modes.</p>

<div class="bemap-callout">
<strong>Geoserver.</strong> Every BeMap geoserver exposes routing — the default usually works. If a call returns <code>Access is denied</code>, your account isn't provisioned for routing on this deployment.<br>
<strong>Your allowed geoservers:</strong> <span id="allowed_geo_routing">…</span>
</div>

<script>$(document).ready(function(){ bemap.docs.renderAllowed('allowed_geo_routing'); });</script>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_routing","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_routing', {
        onMapReady: function(map, engine) {
            map.defaultLayers().move(2.5, 46.5, 6);

            var routing = new bemap.RoutingV2(bemapMainCtx);
            return routing.calculate(new bemap.RoutingRequest({
                destinations: [
                    new bemap.Coordinate(2.35, 48.85),
                    new bemap.Coordinate(4.83, 45.75)
                ],
                routingCriterias: [bemap.RoutingCriteria.FASTEST],
                options: [bemap.RoutingOptions.POLYLINE]
            })).then(function(response) {
                var route = response.getFirstRoute();
                var poly = route.getPolyline();
                map.addPolyline(new bemap.Polyline(poly, {
                    style: new bemap.LineStyle({ color: new bemap.Color(31, 119, 180), width: 5 })
                }));
                bemap.docs.fitToCoords(map, poly);
                console.log('distance:', route.getLength(), 'm  duration:', route.getDuration(), 's');
            }).catch(function(err) {
                bemap.docs.showError('mapV2_routing', err);
                console.error('Routing failed:', err.getMessage ? err.getMessage() : err);
            });
        }
    });
});
```
<p class="bemap-demo-caption">Paris → Lyon, fastest criterion. Switch the engine in the sidebar to render the same call on Leaflet, OpenLayers, or MapLibre.</p>

## At a glance

<ul class="bemap-glance">
<li>Endpoint: <code>POST service/routing/1.0</code>. Returns a <code>bemap.RoutingResponse</code>.</li>
<li>Three modes: <code>MODE_VIAS</code> (default), <code>MODE_MATRIX</code>, <code>MODE_ISOCHRONE</code>.</li>
<li>Cancellable — <code>{ signal }</code> for <code>AbortSignal</code> or <code>cancel(requestId)</code>.</li>
<li>13 toggles in <code>bemap.RoutingOptions</code>: polyline, route-sheet, instructions, OpenLR, …</li>
<li>See also: <a href="index.html#subpage-jsapi_2_0_0-js-routing-matrix.md">Matrix</a>, <a href="index.html#subpage-jsapi_2_0_0-js-routing-isochrone.md">Isochrone</a>.</li>
</ul>

## Usage

```js
var routing = new bemap.RoutingV2(ctx);

routing.calculate(new bemap.RoutingRequest({
    destinations: [
        new bemap.Coordinate(2.35, 48.85),
        new bemap.Coordinate(4.83, 45.75)
    ],
    routingCriterias: [bemap.RoutingCriteria.FASTEST],
    options: [bemap.RoutingOptions.POLYLINE, bemap.RoutingOptions.ROUTESHEET]
})).then(function(response) {
    var route = response.getFirstRoute();
    drawPolyline(route.getPolyline());        // Array<bemap.Coordinate>
    console.log('distance:', route.getLength(), 'm');
    console.log('duration:', route.getDuration(), 's');
}).catch(function(err) {
    if (err.getCode() === bemap.Error.ROUTING_NO_ROUTE) noRouteUI();
});
```

## Reference

### Methods

| Method | Returns | Notes |
| --- | --- | --- |
| `calculate(request, options?)` | `Promise<bemap.RoutingResponse>` | Generic entry point. `request.routingMode` discriminates. |
| `matrix(originList, destinationList, options?)` | `Promise<bemap.RoutingResponse>` | Builds a `MODE_MATRIX` request internally. See [Matrix](index.html#subpage-jsapi_2_0_0-js-routing-matrix.md). |
| `isochrone(origin, criterion, options?)` | `Promise<bemap.RoutingResponse>` | Builds a `MODE_ISOCHRONE` request internally. See [Isochrone](index.html#subpage-jsapi_2_0_0-js-routing-isochrone.md). |
| `cancel(requestId)` | `Boolean` | Aborts the in-flight request whose `requestId` matches. Returns `true` if one was cancelled. |

`options` is `{ signal?: AbortSignal }`. See [Cancellation](index.html#subpage-jsapi_2_0_0-cancellation.md).

### Request fields — `bemap.RoutingRequest`

Required fields marked **R**.

| Field | Type | Default | Notes |
| --- | --- | --- | --- |
| `destinations` **R** | `Array<bemap.Coordinate \| RoutingDestination>` | `[]` | First = start, last = end, between = vias. Bare coordinates auto-promoted. |
| `routingCriterias` | `Array<String>` | `[FASTEST]` | `bemap.RoutingCriteria.*` — one optimisation + any number of `AVOID_*` flags. |
| `options` | `Array<String>` | `[POLYLINE]` | `bemap.RoutingOptions.*` — 13 flags. |
| `routingMode` | `bemap.RoutingMode.*` | `MODE_VIAS` | `MODE_VIAS` / `MODE_MATRIX` / `MODE_ISOCHRONE`. |
| `outputLanguage` | String (ISO 639-1) | `'en'` | Drives `ROUTESHEET` / `REVGEO_POSTAL_ADDRESS` language. |
| `routingVehicleProfile` | `bemap.RoutingVehicleProfile` | `null` | Transport mode + truck attributes. |
| `preferredRoads` | `Array<Object>` | `null` | Speed coefficients per road attribute. |
| `routingRoadBlocks` | `Array<Object>` | `null` | Forbidden segments. |
| `avoidCountryCodes` | `Array<String>` | `null` | ISO-3166 alpha-3, e.g. `['FRA', 'DEU']`. |
| `xyRadius` | Number (m) | `null` | Maximum snap radius. |
| `departureTime` | `Date \| Number \| String` | `null` | Auto-coerced to epoch ms. |
| `isoChroneLimit` | Number | `null` | Required for `MODE_ISOCHRONE`. Seconds / metres / Wh per criterion. |
| `corridorRadius` | Number (m) | `null` | Half-width of the corridor polygon. |
| `matrixStartCount` | Number | `null` | Required for `MODE_MATRIX` — origin count inside `destinations`. |
| `requestId` | String | auto | Lets `routing.cancel(id)` abort this call. |
| `geoserver` | String | `ctx.geoserver` | Per-request override. |

### Response — `bemap.RoutingResponse`

| Accessor | Returns |
| --- | --- |
| `getRoutes()` | `Array<bemap.RoutingRoute>` |
| `getFirstRoute()` | `bemap.RoutingRoute \| null` |
| `getUsedDestinations()` | `Array<bemap.Coordinate>` |
| `getIsochronePolygon()` | `Array<bemap.Coordinate>` (only for `MODE_ISOCHRONE`) |
| `requestId` | String |

#### `bemap.RoutingRoute`

| Accessor | Returns | Notes |
| --- | --- | --- |
| `getPolyline()` | `Array<bemap.Coordinate>` | Returned when `POLYLINE` option is set. |
| `getEncodedPolyline()` | String | [Google encoded polyline](index.html#subpage-jsapi_2_0_0-glossary-google_encoded_polyline_algorithm_format.md). Returned when `ENCODED_POLYLINE` option is set. |
| `getLength()` | Number (m) | Route length in metres. |
| `getDuration()` | Number (s) | Travel time in seconds. |
| `getBoundingBox()` | `bemap.BoundingBox` | Returned when `BOUNDING_BOX` option is set. |
| `getInstructions()` | `Array<RoutingInstruction>` | Turn-by-turn. Returned when `INSTRUCTIONS` option is set. |
| `getWaypoints()` | `Array<RoutingWaypoint>` | Returned when `WAYPOINTS` option is set. |
| `getSummary()` | `RoutingSummary` | Returned when `SUMMARY` option is set. |

#### `bemap.RoutingInstruction`

| Accessor | Returns |
| --- | --- |
| `getCoordinate()` | `bemap.Coordinate` — where the instruction triggers |
| `getDescription()` | String — localised text (driven by `outputLanguage`) |
| `getDistance()` | Number (m) — distance covered by the instruction |
| `getDuration()` | Number (s) — duration of the instruction |
| `getRoadName()` | String — current road |
| `getSign()` | Object — sign info when `INSTRUCTION_SIGN` option is set |
| `getVoice()` | Object — voice prompt when `INSTRUCTION_VOICE` option is set |
| `getManoeuvre()` | String — direction code (`TURN_LEFT`, `KEEP_RIGHT`, …) |

#### `bemap.RoutingWaypoint`

| Accessor | Returns |
| --- | --- |
| `getCoordinate()` | `bemap.Coordinate` |
| `getDistance()` | Number (m) — cumulative from start |
| `getDuration()` | Number (s) — cumulative from start |
| `getAddress()` | `bemap.PostalAddress` — when `REVGEO_POSTAL_ADDRESS` option is set |

#### `bemap.RoutingSummary`

| Accessor | Returns |
| --- | --- |
| `getTotalLength()` | Number (m) |
| `getTotalDuration()` | Number (s) |
| `getCountryCodes()` | `Array<String>` — every country the route crosses |
| `getTolls()` | Object — toll cost (when available) |
| `getRoadFeatures()` | `Array<Object>` — features the route uses (highways, ferries, …) |

### `bemap.RoutingCriteria.*`

`FASTEST`, `SHORTEST`, `ECO_ENERGY`, `AVOID_TOLLS`, `AVOID_HIGHWAYS`, `AVOID_FERRIES`, `AVOID_UNPAVED`, `AVOID_TUNNELS`, `AVOID_BRIDGES`, `AVOID_BORDERS`.

### `bemap.RoutingOptions.*`

`POLYLINE`, `ENCODED_POLYLINE`, `ROUTESHEET`, `WAYPOINTS`, `BOUNDING_BOX`, `SUMMARY`, `OPENLR`, `INSTRUCTIONS`, `INSTRUCTION_VOICE`, `INSTRUCTION_SIGN`, `REVGEO_POSTAL_ADDRESS`, `LANES`, `MATRIX_FULL`.

## Notes

The full interactive demo (click the map to drop start / end / vias, pick a criterion, live copy-paste code panel) ships with the library — see [the GitHub repository](https://github.com/BeNomadSAS/bemap-js-api), then open `examples/services-v2/routing.html`.

## See also

- [Matrix mode](index.html#subpage-jsapi_2_0_0-js-routing-matrix.md) — many-to-many
- [Isochrone mode](index.html#subpage-jsapi_2_0_0-js-routing-isochrone.md) — reachable area
- [TraceRoute](index.html#subpage-jsapi_2_0_0-js-traceroute.md) — GPS trace matching (shares the response shape)
- [Migration from v1](index.html#subpage-jsapi_2_0_0-migration-routing.md) — `bemap.Routing` → `bemap.RoutingV2`
- REST endpoint: `POST service/routing/1.0`

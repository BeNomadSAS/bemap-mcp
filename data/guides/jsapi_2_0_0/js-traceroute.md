<span class="bemap-tag">Routing</span>

# TraceRoute — `bemap.TraceRoute`

<p class="bemap-tagline">Match a sequence of GPS samples to the road network. Promise-based wrapper around <code>POST service/routing/1.0/traceroute</code>. Same response shape as Routing v2.</p>

<div class="bemap-callout">
<strong>Geoserver.</strong> Works on any routing-capable geoserver. If a call returns <code>Access is denied</code>, your account isn't provisioned for TraceRoute on this deployment. If the body shows <code>"destinations": [{}, {}, …]</code>, you're passing <code>coordinate:</code> instead of the required <code>coordinateSat:</code> field on <code>TraceRouteDestination</code>.<br>
<strong>Your allowed geoservers:</strong> <span id="allowed_geo_trace">…</span>
</div>

<script>$(document).ready(function(){ bemap.docs.renderAllowed('allowed_geo_trace'); });</script>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_traceroute","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_traceroute', {
        onMapReady: function(map, engine) {
            // Start on the sample area, not on all of France — the trace is
            // ~700 m long, so a country-level view shows nothing useful if
            // the call is slow or the account lacks TraceRoute.
            map.defaultLayers().move(7.2703, 43.7110, 15);

            var trace = new bemap.TraceRoute(bemapMainCtx);
            var samples = [
                [7.2660, 43.7090],
                [7.2680, 43.7100],
                [7.2710, 43.7115],
                [7.2745, 43.7130]
            ].map(function(c) {
                return new bemap.TraceRouteDestination({
                    coordinateSat: new bemap.CoordinateSat({ lon: c[0], lat: c[1] })
                });
            });

            return trace.compute(new bemap.TraceRouteRequest({
                destinations: samples,
                options: [bemap.TraceRouteOptions.POLYLINE]
            })).then(function(response) {
                var route = response.getFirstRoute();
                if (!route) return;
                var poly = route.getPolyline();
                map.addPolyline(new bemap.Polyline(poly, {
                    style: new bemap.LineStyle({ color: new bemap.Color(31, 119, 180), width: 5 })
                }));
                bemap.docs.fitToCoords(map, poly);
            }).catch(function(err) {
                bemap.docs.showError('mapV2_traceroute', err);
                console.error('TraceRoute failed:', err.getMessage ? err.getMessage() : err);
            });
        }
    });
});
```
<p class="bemap-demo-caption">4 GPS samples around Nice — the matched road-network polyline is drawn in blue.</p>

## At a glance

<ul class="bemap-glance">
<li>Endpoint: <code>POST service/routing/1.0/traceroute</code>.</li>
<li>Input: array of <code>bemap.TraceRouteDestination</code> wrapping <code>bemap.CoordinateSat</code> GPS samples.</li>
<li>Response shape identical to <a href="index.html#subpage-jsapi_2_0_0-js-routing-v2.md"><code>bemap.RoutingResponse</code></a> — same polyline / instructions / waypoint accessors.</li>
<li>Helper: <code>bemap.traceRouteQuality.score(response)</code> returns a 0–1 quality score from the off-road ratio.</li>
</ul>

## Usage

```js
var trace = new bemap.TraceRoute(ctx);

var samples = [
    new bemap.CoordinateSat({ lon: 2.350, lat: 48.850, alt: 35, heading: 90, speed: 12, time: 1716000000000, satellites: 8 }),
    new bemap.CoordinateSat({ lon: 2.355, lat: 48.852, alt: 36, heading: 92, speed: 11, time: 1716000020000, satellites: 7 }),
    // ...
];

trace.compute(new bemap.TraceRouteRequest({
    destinations: samples.map(function(c) {
        return new bemap.TraceRouteDestination({ coordinateSat: c });
    }),
    options: [bemap.TraceRouteOptions.POLYLINE, bemap.TraceRouteOptions.WAYPOINTS]
})).then(function(response) {
    var matched = response.getFirstRoute();
    drawPolyline(matched.getPolyline());

    var quality = bemap.traceRouteQuality.score(response);
    console.log('match quality:', quality);     // 0–1
});
```

## Reference

### Constructor

```js
new bemap.TraceRoute(context)
```

### Methods

| Method | Returns | Notes |
| --- | --- | --- |
| `compute(request, options?)` | `Promise<bemap.RoutingResponse>` | Same response shape as `bemap.RoutingV2`. |
| `cancel(requestId)` | Boolean | Aborts the in-flight request bound to that id. |

### Request fields — `bemap.TraceRouteRequest`

| Field | Type | Notes |
| --- | --- | --- |
| `destinations` **R** | `Array<TraceRouteDestination>` | GPS samples wrapped as `TraceRouteDestination`. |
| `routingVehicleProfile` | `bemap.RoutingVehicleProfile` | Same shape as Routing v2. |
| `options` | `Array<String>` | `bemap.TraceRouteOptions.*` (16-flag enum). |
| `language` | String (ISO 639-1) | |
| `requestId` | String | Cancellation id. |

### `bemap.TraceRouteDestination`

| Field | Type | Notes |
| --- | --- | --- |
| `coordinate` **R** | `bemap.CoordinateSat` | GPS sample with `lon`, `lat`, optional `alt`, `heading`, `speed`, `time`, `satellites`. |
| `radius` | Number (m) | Per-point snap radius. |

### `bemap.TraceRouteOptions.*` (selection)

The enum is **server-authoritative** — it mirrors the values
`POST service/routing/1.0/traceroute` accepts, and anything else is rejected with a
`400`. The ones you are most likely to want:

`POLYLINE`, `DETAILED_POLYLINE`, `POLYLINE_INDEX`, `WAYPOINTS`, `WAYPOINTS_POLYLINE`,
`ROUTESHEET`, `SEGMENTIDS`, `ROAD_SEGMENTS`, `OFFROADS`, `OPENLR`, `ENERGY_CONSUMPTION`,
`TOLL_COST`.

Full list — 49 values — on [Enums reference](index.html#subpage-jsapi_2_0_0-glossary-enums.md).

**There is no `QUALITY_SCORE` option.** Earlier versions of the JS API shipped one and
the server rejects it with a `400`. Match quality is computed client-side instead, from
the input-versus-matched waypoints:

```js
var quality = bemap.traceRouteQuality.score(response);   // 0–1, or null
```

### Response

Same as `bemap.RoutingResponse` — see [Routing v2](index.html#subpage-jsapi_2_0_0-js-routing-v2.md) for the `RoutingRoute` / `RoutingInstruction` / `RoutingWaypoint` accessors.

## Notes

The full interactive demo (paste GPS samples or use the canned trace, watch the matched route render alongside off-road segments) ships with the library — see [the GitHub repository](https://github.com/BeNomadSAS/bemap-js-api), then open `examples/services-v2/traceroute.html`.

## See also

- [Routing v2](index.html#subpage-jsapi_2_0_0-js-routing-v2.md) — same response model
- REST endpoint: `POST service/routing/1.0/traceroute`

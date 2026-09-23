<span class="bemap-tag">Routing</span>

# Routing — Matrix mode

<p class="bemap-tagline">Compute a many-to-many cost matrix in one request — each cell is a <code>(distance, duration)</code> pair. Same endpoint as Routing v2 with <code>routingMode: MODE_MATRIX</code>.</p>

<div class="bemap-callout">
<strong>Geoserver.</strong> Use <a href="index.html#subpage-jsapi_2_0_0-js-geoserver-info.md"><code>bemap.helpers.getGeoServerInfo(ctx)</code></a> to read the matrix-size limit on the active geoserver — exceeding it returns <code>HTTP 4xx</code>. If a call returns <code>Access is denied</code>, your account isn't provisioned for routing on this deployment.<br>
<strong>Your allowed geoservers:</strong> <span id="allowed_geo_matrix">…</span>
</div>

<script>$(document).ready(function(){ bemap.docs.renderAllowed('allowed_geo_matrix'); });</script>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_matrix","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_matrix', {
        onMapReady: function(map, engine) {
            map.defaultLayers().move(2.5, 46.5, 6);

            var origins = [
                new bemap.Coordinate(2.35, 48.85),
                new bemap.Coordinate(2.40, 48.86)
            ];
            var destinations = [
                new bemap.Coordinate(4.83, 45.75),
                new bemap.Coordinate(5.36, 43.30),
                new bemap.Coordinate(3.88, 43.61)
            ];

            var all = origins.concat(destinations);
            all.forEach(function(c) {
                map.addMarker(new bemap.Marker(c));
            });
            bemap.docs.fitToCoords(map, all);

            var routing = new bemap.RoutingV2(bemapMainCtx);
            return routing.matrix(origins, destinations).then(function(response) {
                response.getRoutes().forEach(function(r, i) {
                    console.log('cell ' + i + ':', r.getLength(), 'm /', r.getDuration(), 's');
                });
            }).catch(function(err) {
                bemap.docs.showError('mapV2_matrix', err);
                console.error('Matrix failed:', err.getMessage ? err.getMessage() : err);
            });
        }
    });
});
```
<p class="bemap-demo-caption">2 origins (Paris area) × 3 destinations (Lyon, Marseille, Montpellier) = 6 cells. Inspect the console for per-cell distance + duration.</p>

## At a glance

<ul class="bemap-glance">
<li>Endpoint: <code>POST service/routing/1.0</code> with <code>routingMode: MODE_MATRIX</code>.</li>
<li>Convenience: <code>routing.matrix(origins, destinations, opts?)</code> builds the request for you.</li>
<li>Response is one <code>bemap.RoutingRoute</code> per <code>(origin, destination)</code> cell, row-major order.</li>
<li>Max matrix size depends on the geoserver — query <a href="index.html#subpage-jsapi_2_0_0-js-geoserver-info.md"><code>bemap.GeoServerInfoService</code></a>.</li>
</ul>

## Usage

```js
var routing = new bemap.RoutingV2(ctx);

var origins = [
    new bemap.Coordinate(2.35, 48.85),
    new bemap.Coordinate(2.40, 48.86)
];
var destinations = [
    new bemap.Coordinate(4.83, 45.75),
    new bemap.Coordinate(5.36, 43.30),
    new bemap.Coordinate(3.88, 43.61)
];

routing.matrix(origins, destinations).then(function(response) {
    response.getRoutes().forEach(function(route) {
        console.log(route.getLength(), 'm —', route.getDuration(), 's');
    });
});
```

For full control, build a `bemap.RoutingRequest` directly:

```js
new bemap.RoutingRequest({
    routingMode: bemap.RoutingMode.MODE_MATRIX,
    matrixStartCount: 2,                         // first 2 = origins
    destinations: origins.concat(destinations),  // origins first, then destinations
    routingCriterias: [bemap.RoutingCriteria.FASTEST],
    options: [bemap.RoutingOptions.MATRIX_COMPLEMENT]
});
```

## Reference

### Method

```
routing.matrix(originList, destinationList, options?) → Promise<bemap.RoutingResponse>
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `originList` | `Array<bemap.Coordinate>` | At least 1. |
| `destinationList` | `Array<bemap.Coordinate>` | At least 1. |
| `options` | `{ signal?, requestId?, geoserver?, routingVehicleProfile?, routingCriterias?, ... }` | All optional. |

### Response

`getRoutes()` returns one route per `(origin, destination)` cell — row-major: `(origin[0], destination[0])`, `(origin[0], destination[1])`, …, `(origin[m−1], destination[n−1])`.

Per `bemap.RoutingRoute`:

| Accessor | Returns |
| --- | --- |
| `getLength()` | Number (m) |
| `getDuration()` | Number (s) |
| `getPolyline()` | `Array<Coordinate>` — only when `POLYLINE` option is set |

## See also

- [Routing v2](index.html#subpage-jsapi_2_0_0-js-routing-v2.md) — same `RoutingResponse` shape
- [Geoserver info](index.html#subpage-jsapi_2_0_0-js-geoserver-info.md) — for per-geoserver matrix-size limits
- REST endpoint: `POST service/routing/1.0` (mode `MATRIX`)

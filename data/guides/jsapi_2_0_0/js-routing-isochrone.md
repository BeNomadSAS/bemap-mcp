<span class="bemap-tag">Routing</span>

# Routing — Isochrone mode

<p class="bemap-tagline">Compute the polygon of all points reachable within a budget — time (seconds), distance (metres), or energy (Wh). Same endpoint as Routing v2 with <code>routingMode: MODE_ISOCHRONE</code>.</p>

<div class="bemap-callout">
<strong>Geoserver.</strong> Every BeMap geoserver supports isochrone — the default usually works. If a call returns <code>Access is denied</code>, your account isn't provisioned for routing on this deployment.<br>
<strong>Your allowed geoservers:</strong> <span id="allowed_geo_iso">…</span>
</div>

<script>$(document).ready(function(){ bemap.docs.renderAllowed('allowed_geo_iso'); });</script>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_isochrone","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_isochrone', {
        onMapReady: function(map, engine) {
            map.defaultLayers().move(2.5, 46.5, 6);

            var routing = new bemap.RoutingV2(bemapMainCtx);
            return routing.isochrone(
                new bemap.Coordinate(2.35, 48.85),
                { budget: 600, criterias: [bemap.RoutingCriteria.FASTEST] }
            ).then(function(response) {
                var coords = response.getIsochronePolygon();
                if (!coords || !coords.length) return;
                map.addPolygon(new bemap.Polygon(coords, {
                    style: new bemap.PolygonStyle({
                        fillColor:   new bemap.Color(31, 119, 180, 0.25),
                        borderColor: new bemap.Color(31, 119, 180),
                        borderWidth: 2
                    })
                }));
                bemap.docs.fitToCoords(map, coords);
            }).catch(function(err) {
                bemap.docs.showError('mapV2_isochrone', err);
                console.error('Isochrone failed:', err.getMessage ? err.getMessage() : err);
            });
        }
    });
});
```
<p class="bemap-demo-caption">10-minute drive-time isochrone from Paris — the polygon shows every point you can reach within 600 seconds on the fastest criterion.</p>

## At a glance

<ul class="bemap-glance">
<li>Endpoint: <code>POST service/routing/1.0</code> with <code>routingMode: MODE_ISOCHRONE</code>.</li>
<li>Convenience: <code>routing.isochrone(origin, { budget, criterias }, opts?)</code>.</li>
<li>Returns a single polygon via <code>response.getIsochronePolygon()</code> — <code>getRoutes()</code> is empty.</li>
<li>Budget unit depends on the criterion: seconds (FASTEST), metres (SHORTEST), Wh (ECO_ENERGY).</li>
<li>EV variant with battery budget: <a href="index.html#subpage-jsapi_2_0_0-js-ev-reachable-area.md"><code>bemap.EvReachableArea</code></a>.</li>
</ul>

## Usage

```js
var routing = new bemap.RoutingV2(ctx);

routing.isochrone(
    new bemap.Coordinate(2.35, 48.85),       // origin
    { budget: 600, criterias: [bemap.RoutingCriteria.FASTEST] }  // 10 minutes
).then(function(response) {
    map.addPolygon(new bemap.Polygon(response.getIsochronePolygon(), {
        style: new bemap.PolygonStyle({
            fillColor:   new bemap.Color(31, 119, 180, 0.25),
            borderColor: new bemap.Color(31, 119, 180),
            borderWidth: 2
        })
    }));
});
```

For full control, build a `bemap.RoutingRequest` directly:

```js
new bemap.RoutingRequest({
    routingMode: bemap.RoutingMode.MODE_ISOCHRONE,
    destinations: [origin],
    routingCriterias: [bemap.RoutingCriteria.FASTEST],
    isoChroneLimit: 600,                       // seconds when FASTEST
    options: [bemap.RoutingOptions.POLYLINE]
});
```

## Reference

### Method

```
routing.isochrone(origin, criterion, options?) → Promise<bemap.RoutingResponse>
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `origin` | `bemap.Coordinate` | Centre point. |
| `criterion` | `{ budget: Number, criterias?: Array<String> }` | Budget value plus optional `criterias` array (defaults to `[FASTEST]`). |
| `options` | `{ signal?, requestId?, geoserver?, routingVehicleProfile?, ... }` | All optional. |

### Budget units

| Criterion | `isoChroneLimit` unit |
| --- | --- |
| `FASTEST` | seconds |
| `SHORTEST` | metres |
| `ECO_ENERGY` | watt-hours |

### Response

`getIsochronePolygon()` returns `Array<bemap.Coordinate>` ready for `new bemap.Polygon(...)`. `getRoutes()` is empty in isochrone mode.

## Notes

The full interactive demo (drop a marker, pick a budget, polygon updates live) ships with the library — see [the GitHub repository](https://github.com/BeNomadSAS/bemap-js-api), then open `examples/services-v2/routing-isochrone.html`.

## See also

- [Routing v2](index.html#subpage-jsapi_2_0_0-js-routing-v2.md)
- [EV reachable area](index.html#subpage-jsapi_2_0_0-js-ev-reachable-area.md) — battery-aware variant
- REST endpoint: `POST service/routing/1.0` (mode `ISOCHRONE`)

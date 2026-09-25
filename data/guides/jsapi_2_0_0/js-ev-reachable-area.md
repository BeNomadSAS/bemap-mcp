<span class="bemap-tag">Electric mobility</span>

# EV Reachable Area — `bemap.EvReachableArea`

<p class="bemap-tagline">Compute the polygon of all points reachable from a start coordinate given a vehicle, weather / load conditions, and a starting battery level. The battery-aware variant of <a href="index.html#subpage-jsapi_2_0_0-js-routing-isochrone.md">routing isochrone</a>.</p>

<div class="bemap-callout">
<strong>Requirements.</strong> The demo discovers a real EV vehicle key via <a href="index.html#subpage-jsapi_2_0_0-js-ev-vehicles.md"><code>bemap.EvVehicles.brands()</code></a> + <code>list()</code> before computing the reachable area. If the demo logs <em>"No EV vehicles available"</em>, your account isn't provisioned for the EV vehicle catalogue on this deployment.<br>
<strong>Your allowed geoservers:</strong> <span id="allowed_geo_evreach">…</span>
</div>

<script>$(document).ready(function(){ bemap.docs.renderAllowed('allowed_geo_evreach'); });</script>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_evreach","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_evreach', {
        onMapReady: function(map, engine) {
            map.defaultLayers().move(2.5, 46.5, 6);

            var evv = new bemap.EvVehicles(bemapMainCtx);
            return evv.brands().then(function(brands) {
                if (!brands || !brands.length) return null;
                return evv.list({ brandId: brands[0].getId() }).then(function(vehicles) {
                    return vehicles && vehicles[0] && vehicles[0].getKey();
                });
            }).then(function(vehicleKey) {
                if (!vehicleKey) {
                    console.warn('No EV vehicles available — check role provisioning.');
                    return;
                }
                var era = new bemap.EvReachableArea(bemapMainCtx);
                return era.compute(new bemap.EvReachableAreaRequest({
                    start: new bemap.Coordinate(2.35, 48.85),
                    vehicle: vehicleKey,
                    initBatteryLevel: 80,
                    temperature: 15,
                    payload: 80
                })).then(function(response) {
                    var poly = response.getPolygon();
                    map.addPolygon(new bemap.Polygon(poly, {
                        style: new bemap.PolygonStyle({
                            fillColor:   new bemap.Color(142, 68, 173, 0.25),
                            borderColor: new bemap.Color(155, 89, 182),
                            borderWidth: 2
                        })
                    }));
                    if (poly && poly.length) bemap.docs.fitToCoords(map, poly);
                });
            }).catch(function(err) {
                bemap.docs.showError('mapV2_evreach', err);
                console.error('Reachable area failed:', err.getMessage ? err.getMessage() : err);
            });
        }
    });
});
```
<p class="bemap-demo-caption">Reachable polygon from Paris with the first vehicle in the catalogue at 80 % battery, 15 °C ambient.</p>

## At a glance

<ul class="bemap-glance">
<li>Endpoint: <code>POST service/evreachablearea/1.0</code>.</li>
<li>Battery-aware — accounts for vehicle, payload, weather, temperature, and AVOID criteria.</li>
<li>Returns a polygon ready for <code>new bemap.Polygon(...)</code>.</li>
<li>Multi-budget convenience: <code>combineMultipleBatteryLevels(req, [50, 70, 90])</code> for concentric overlays.</li>
<li>Pair with <a href="index.html#subpage-jsapi_2_0_0-js-ev-vehicles.md"><code>bemap.EvVehicles</code></a> for the vehicle catalogue.</li>
</ul>

## Usage

```js
var era = new bemap.EvReachableArea(ctx);

era.compute(new bemap.EvReachableAreaRequest({
    start: new bemap.Coordinate(2.35, 48.85),    // Paris
    vehicle: '<vehicle-uuid>',                   // from bemap.EvVehicles
    initBatteryLevel: 80,                        // %  (default 100)
    criterias: [bemap.EvCriterion.AVOID_TOLLS],  // optional AVOID_* flags
    temperature: 15,                             // °C
    payload: 80                                  // kg (default 75)
})).then(function(response) {
    map.addPolygon(new bemap.Polygon(response.getPolygon(), {
        style: new bemap.PolygonStyle({
            fillColor: new bemap.Color(142, 68, 173, 0.2)
        })
    }));
}).catch(function(err) {
    if (err.getCode() === bemap.Error.REACHABLE_AREA_FAILED) noAreaUI();
    else console.error(err.getMessage());
});
```

### Concentric overlay pattern

```js
era.combineMultipleBatteryLevels(req, [50, 70, 90]).then(function(results) {
    results.forEach(function(r) {
        map.addPolygon(new bemap.Polygon(r.response.getPolygon(), {
            style: new bemap.PolygonStyle({
                fillColor: new bemap.Color(142, 68, 173, 0.1 + r.batteryLevel * 0.005)
            })
        }));
    });
});
```

## Reference

### Constructor

```js
new bemap.EvReachableArea(context)
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `context` | `bemap.Context` | Credentials + geoserver. See [The Context](index.html#subpage-jsapi_2_0_0-the-context.md). |

### Methods

| Method | Returns | Notes |
| --- | --- | --- |
| `compute(request, options?)` | `Promise<bemap.EvReachableAreaResponse>` | Single polygon. `options` accepts `{ signal?: AbortSignal }`. |
| `combineMultipleBatteryLevels(request, batteryLevels)` | `Promise<Array<{ batteryLevel, response }>>` | N parallel `compute()` calls. |

### Request fields — `bemap.EvReachableAreaRequest`

| Field | Type | Required | Notes |
| --- | --- | :-: | --- |
| `start` | `bemap.Coordinate` | ✓ | Centre point. `lon = 0` / `lat = 0` are valid. |
| `vehicle` | String | ✓ | EV vehicle key — from [`bemap.EvVehicles`](index.html#subpage-jsapi_2_0_0-js-ev-vehicles.md). |
| `stop` | `bemap.Coordinate` | — | Optional target — biases the polygon toward this point. |
| `initBatteryLevel` | Number (%) | — | Start SOC, 0–100. Default `100`. |
| `temperature` | Number (°C) | — | Ambient temperature; affects consumption. |
| `payload` | Number (kg) | — | Cargo weight. Default `75`. |
| `criterias` | `Array<bemap.EvCriterion.*>` | — | `AVOID_TOLLS`, `AVOID_MOTORWAYS`, `AVOID_FERRIES`, `AVOID_PARKWAYS`, `AVOID_DIRT_ROADS`, `AVOID_HOV_LANES`, `AVOID_TUNNELS`, `AVOID_RESIDENTIALS`, `AVOID_CARPOOL`. |
| `weather` | Boolean | — | Enable weather-aware consumption. |
| `weatherProvider` | String | — | Override the default weather data source. |
| `polyline` | Boolean | — | Return the polygon as `Array<Coordinate>`. Default `true`. |
| `encodedPolyline` | Boolean | — | Return the polygon as a Google encoded polyline string. Default `false`. |
| `geoserver` | String | — | Per-request override of `ctx.geoserver`. |

### Response — `bemap.EvReachableAreaResponse`

| Accessor | Returns | Notes |
| --- | --- | --- |
| `getPolygon()` | `Array<bemap.Coordinate>` | Ready for `new bemap.Polygon(...)`. Empty when `polyline: false` was requested. |
| `getEncodedPolygon()` | String \| null | Google-encoded polyline. Only present when `encodedPolyline: true`. |
| `getBoundingBox()` | `bemap.BoundingBox \| null` | |

## Notes

The full interactive demo ships with the library — see [the GitHub repository](https://github.com/BeNomadSAS/bemap-js-api), then open `examples/services-v2/ev-reachable-area.html`.

## See also

- [Routing isochrone](index.html#subpage-jsapi_2_0_0-js-routing-isochrone.md) — non-EV variant
- [`bemap.EvSmartRouting`](index.html#subpage-jsapi_2_0_0-js-ev-smart-routing.md) — full EV journey planning
- [`bemap.EvVehicles`](index.html#subpage-jsapi_2_0_0-js-ev-vehicles.md) — vehicle catalogue
- REST endpoint: `POST service/evreachablearea/1.0`

<span class="bemap-tag">Electric mobility</span>

# EV Smart Routing — `bemap.EvSmartRouting`

<p class="bemap-tagline">Plan an EV journey with automatic charging stops. The router picks chargers along the way to minimise total trip duration given the vehicle, battery state, weather, and active CSPs.</p>

<div class="bemap-callout">
<strong>Requirements.</strong> The demo pre-calls <code>getVehicles()</code> to find a real EV vehicle key, then plans a journey with charging stops via a <code>chargingStationProvider</code>. On the public beta server use <code>ecoMovement</code>. If the demo logs <em>"No EV vehicles available"</em>, your account isn't provisioned for the EV vehicle catalogue on this deployment.<br>
<strong>Your allowed geoservers:</strong> <span id="allowed_geo_evsmart">…</span><br>
<strong>Your allowed providers:</strong> <span id="allowed_csp_evsmart">…</span>
</div>

<script>$(document).ready(function(){
    bemap.docs.renderAllowed('allowed_geo_evsmart');
    bemap.docs.renderAllowed('allowed_csp_evsmart', { kind: 'provider' });
});</script>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_evsmart","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_evsmart', {
        onMapReady: function(map, engine) {
            map.defaultLayers().move(2.5, 46.5, 6);

            var providers = bemapMainCtx.getChargingStationProvider
                ? [bemapMainCtx.getChargingStationProvider() || 'ecoMovement']
                : ['ecoMovement'];

            var router = new bemap.EvSmartRouting(bemapMainCtx);
            return router.getVehicles().then(function(vehicles) {
                var vehicle = vehicles && vehicles[0] && vehicles[0].key;
                if (!vehicle) {
                    console.warn('No EV vehicles available for this account on this deployment.');
                    return;
                }
                return router.calculate(new bemap.EvSmartRoutingRequest({
                    start: new bemap.Coordinate(2.35, 48.85),
                    stop:  new bemap.Coordinate(7.27, 43.71),
                    vehicle: vehicle,
                    chargingStationProviders: providers,
                    initBatteryLevel: 80,
                    minBatteryLevel: 15,
                    polyline: true
                })).then(function(response) {
                    var poly = response.getPolyline();
                    map.addPolyline(new bemap.Polyline(poly, {
                        style: new bemap.LineStyle({ color: new bemap.Color(155, 89, 182), width: 5 })
                    }));
                    response.getStepPoints().forEach(function(step) {
                        var c = step.getCoordinate();
                        if (c) map.addMarker(new bemap.Marker(c));
                    });
                    if (poly && poly.length) bemap.docs.fitToCoords(map, poly);
                    console.log('total duration (incl. charging):', response.getDuration(), 's');
                });
            }).catch(function(err) {
                bemap.docs.showError('mapV2_evsmart', err);
                console.error('EV routing failed:', err.getMessage ? err.getMessage() : err);
            });
        }
    });
});
```
<p class="bemap-demo-caption">EV route Paris → Nice with the first vehicle from the catalogue. Markers mark each planned charging stop; check the console for the total duration.</p>

## At a glance

<ul class="bemap-glance">
<li>Endpoint: <code>POST service/evsmartrouting/1.0</code>.</li>
<li>Picks charging stops automatically — total duration includes charge time.</li>
<li>Server uses abbreviated wire keys; the JS request maps them to readable names (<code>initBatLvl</code> → <code>initBatteryLevel</code>, <code>csps</code> → <code>chargingStationProviders</code>, …).</li>
<li>Brand / vehicle catalogue: prefer the dedicated <a href="index.html#subpage-jsapi_2_0_0-js-ev-vehicles.md"><code>bemap.EvVehicles</code></a> service over the back-compat helpers on this class.</li>
<li>Pair with <a href="index.html#subpage-jsapi_2_0_0-js-charging-stations.md"><code>bemap.ChargingStations</code></a> to enumerate stations the router will consider.</li>
</ul>

## Usage

```js
var router = new bemap.EvSmartRouting(ctx);

router.calculate(new bemap.EvSmartRoutingRequest({
    start: new bemap.Coordinate(2.35, 48.85),    // Paris
    stop:  new bemap.Coordinate(7.27, 43.71),    // Nice
    vehicle: 'TESLA_MODEL3_LR_2023',
    chargingStationProviders: ['ecoMovement'],
    initBatteryLevel: 80,
    minBatteryLevel: 15,
    minArrivalBatteryLevel: 20,
    polyline: true,
    departureTime: new Date('2026-06-01T08:00:00Z'),
    weather: 'CLEAR',
    temperature: 22
})).then(function(response) {
    console.log('total duration:', response.getDuration(), 's (incl. charging)');
    console.log('charging time:',  response.getChargingTime(), 's');
    console.log('arrival battery:', response.getArrivalBatteryLevel(), '%');
    drawPolyline(response.getPolyline());

    response.getStepPoints().forEach(function(step) {
        console.log(step.getName(), '@', step.getCity(), '—',
                    step.getArrivalBatteryLevel(), '% →',
                    step.getDepartureBatteryLevel(), '% in',
                    step.getChargingTime(), 's');
    });
});
```

## Reference

### Constructor

```js
new bemap.EvSmartRouting(context)
```

### Methods

| Method | Returns | Notes |
| --- | --- | --- |
| `calculate(request, options?)` | `Promise<bemap.EvSmartRoutingResponse>` | `options` accepts `{ signal?: AbortSignal }`. |
| `getBrands(options?)` | `Promise<Array<Object>>` | Back-compat — prefer [`bemap.EvVehicles.brands()`](index.html#subpage-jsapi_2_0_0-js-ev-vehicles.md). |
| `getVehicles({brandId?, vehicle?, signal?})` | `Promise<Array<Object>>` | Back-compat — prefer [`bemap.EvVehicles.list()`](index.html#subpage-jsapi_2_0_0-js-ev-vehicles.md). |

### Request fields — `bemap.EvSmartRoutingRequest`

The server uses abbreviated keys on the wire; the JS request exposes readable names and maps them internally. Required fields marked **R**.

| Wire field | JS option | Notes |
| --- | --- | --- |
| `startLon` / `startLat` **R** | `start` | `bemap.Coordinate` or `{lon, lat}`. |
| `stopLon` / `stopLat` **R** | `stop` | Same. |
| `vias` | `vias` | Array of intermediate waypoints. |
| `vehicle` **R** | `vehicle` | Vehicle key from the EV catalogue. |
| `csps` **R** | `chargingStationProviders` | Allowed CSP keys. Falls back to `ctx.chargingStationProvider`. |
| `csfs` | `chargingStationFilters` | Filter expressions. |
| `csdepcnt` | `chargingStationDeprecatedConnector` | Allow deprecated connectors. |
| `initBatLvl` | `initBatteryLevel` | 0–100. |
| `minBatLvl` | `minBatteryLevel` | 0–50 (capped server-side). |
| `minArrivalBatLvl` | `minArrivalBatteryLevel` | 0–80 (capped). |
| `maxAfterChargeBatLvl` | `maxAfterChargeBatteryLevel` | Vehicle default ≈ 90. |
| `weather` / `wp` | `weather` / `weatherProvider` | |
| `temperature` | `temperature` | °C. |
| `departureTime` | `departureTime` | `Date` / Number / ISO string. Auto-serialised. |
| `payload` | `payload` | kg. |
| `criterias` | `criterias` | EV criteria — `AVOID_TOLLS`, etc. |
| `optimMode` | `optimMode` | |
| `connectorTypes` | `connectorTypes` | |
| `restrictedEvse` | `restrictedEvse` | |
| `pl` / `epl` | `polyline` / `encodedPolyline` | |
| `evt` / `evtFreq` | `events` / `eventFrequency` | Route timeline. |
| `alr` | `alternative` | 0–2. |
| `cur` | `currency` | ISO 4217. |
| `drivingStyle` | `drivingStyle` | |
| `allowNaStatus` / `allowMaxSpdReco` | (same names) | |
| `co2emissions` | `co2Emissions` | |

### Response — `bemap.EvSmartRoutingResponse`

| Accessor | Returns |
| --- | --- |
| `getLogTag()` | String |
| `getDistance()` | Number (m) |
| `getDuration()` | Number (s, includes charging) |
| `getChargingTime()` | Number (s) |
| `getArrivalBatteryLevel()` | Number (%) |
| `getConsumed()` | Number (kWh) |
| `getSavedCo2Emissions()` | Number (kg) — when requested |
| `getStepPoints()` | `Array<bemap.EvStepPoint>` |
| `getPolyline()` | `Array<bemap.Coordinate>` |
| `getEncodedPolyline()` | String |
| `getBoundingBox()` | `bemap.BoundingBox` |

### `bemap.EvStepPoint`

| Accessor | Returns |
| --- | --- |
| `getId()` | String |
| `getName()` | String |
| `getBrand()` | String |
| `getCoordinate()` | `bemap.Coordinate` |
| `getArrivalBatteryLevel()` | Number (%) |
| `getDepartureBatteryLevel()` | Number (%) |
| `getChargingTime()` | Number (s) |
| `getChargingPower()` | Number (kW) |
| `getChargingCost()` | Number |
| `getDistance()` | Number (m) — from the previous stop |
| `getDuration()` | Number (s) |
| `getCity()` | String |
| `getMaxSpeed()` | Number |

## Notes

The full interactive demo (pick a vehicle from the catalogue, set start / stop, see the planned charging stops with battery curves) ships with the library — see [the GitHub repository](https://github.com/BeNomadSAS/bemap-js-api), then open `examples/services-v2/ev-smart-routing.html`.

## See also

- [`bemap.ChargingStations`](index.html#subpage-jsapi_2_0_0-js-charging-stations.md)
- [`bemap.EvVehicles`](index.html#subpage-jsapi_2_0_0-js-ev-vehicles.md) — standalone vehicle catalogue
- [`bemap.ChargingTime`](index.html#subpage-jsapi_2_0_0-js-charging-time.md) — single-stop charging-time estimate
- [`bemap.EvReachableArea`](index.html#subpage-jsapi_2_0_0-js-ev-reachable-area.md) — battery-aware reachable polygon
- [Migration from v1](index.html#subpage-jsapi_2_0_0-migration-evrouting.md) — `bemap.EvseRouting` → v2
- REST endpoint: `POST service/evsmartrouting/1.0`

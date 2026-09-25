<span class="bemap-tag">Migration</span>

# EV Routing — `bemap.EvseRouting` → `bemap.EvSmartRouting`

<p class="bemap-tagline">Same endpoint — only the JS shape changes. Callback → Promise, class renamed, abbreviated wire keys mapped to readable JS field names.</p>

## At a glance

<ul class="bemap-glance">
<li>Class rename: <code>bemap.EvseRouting</code> → <code>bemap.EvSmartRouting</code>.</li>
<li>Callback → Promise.</li>
<li>Wire keys unchanged server-side; the JS request maps readable names to wire keys internally.</li>
<li>Response accessors are getter-style — <code>response.getPolyline()</code> instead of <code>result.polyline</code>.</li>
</ul>

## Usage

### Side-by-side

```js
// v1
new bemap.EvseRouting(ctx).calc({
    startLon: 2.35, startLat: 48.85,
    stopLon:  7.27, stopLat: 43.71,
    vehicle:  'TESLA_MODEL3_LR_2023',
    csps:     ['ecoMovement'],
    initBatLvl: 80,
    minBatLvl: 15,
    minArrivalBatLvl: 20,
    pl: true
}, function(err, result) {
    if (err) return handle(err);
    drawPolyline(result.polyline);
});

// v2
new bemap.EvSmartRouting(ctx).calculate(new bemap.EvSmartRoutingRequest({
    start: new bemap.Coordinate(2.35, 48.85),
    stop:  new bemap.Coordinate(7.27, 43.71),
    vehicle: 'TESLA_MODEL3_LR_2023',
    chargingStationProviders: ['ecoMovement'],
    initBatteryLevel: 80,
    minBatteryLevel: 15,
    minArrivalBatteryLevel: 20,
    polyline: true
})).then(function(response) {
    drawPolyline(response.getPolyline());
}).catch(handle);
```

## Reference

### Field-name translation

The wire shape on `service/evsmartrouting/1.0` is unchanged — the JS layer maps readable names to the abbreviated wire keys.

| Wire field (server) | v1 (also wire-shaped) | v2 (readable) |
| --- | --- | --- |
| `startLon` / `startLat` | same | `start: bemap.Coordinate` |
| `stopLon` / `stopLat` | same | `stop: bemap.Coordinate` |
| `csps` | `csps` | `chargingStationProviders` |
| `csfs` | `csfs` | `chargingStationFilters` |
| `csdepcnt` | `csdepcnt` | `chargingStationDeprecatedConnector` |
| `initBatLvl` | `initBatLvl` | `initBatteryLevel` |
| `minBatLvl` | `minBatLvl` | `minBatteryLevel` |
| `minArrivalBatLvl` | `minArrivalBatLvl` | `minArrivalBatteryLevel` |
| `maxAfterChargeBatLvl` | same | `maxAfterChargeBatteryLevel` |
| `wp` | `wp` | `weatherProvider` |
| `pl` / `epl` | `pl` / `epl` | `polyline` / `encodedPolyline` |
| `evt` / `evtFreq` | same | `events` / `eventFrequency` |
| `alr` | `alr` | `alternative` |
| `cur` | `cur` | `currency` |
| `co2emissions` | same | `co2Emissions` |

Anything not in the table keeps its name.

### Response accessors

| v1 `result.*` | v2 `response.*` |
| --- | --- |
| `result.distance` | `getDistance()` |
| `result.duration` | `getDuration()` |
| `result.chargingTime` | `getChargingTime()` |
| `result.arrivalBatLvl` | `getArrivalBatteryLevel()` |
| `result.polyline` | `getPolyline()` (Array of `bemap.Coordinate`) |
| `result.stepPoints` | `getStepPoints()` (Array of `bemap.EvStepPoint`) |
| `result.consumed` | `getConsumed()` |
| `result.co2Saved` | `getSavedCo2Emissions()` |

## See also

- [EV Smart Routing](index.html#subpage-jsapi_2_0_0-js-ev-smart-routing.md)
- [Charging stations](index.html#subpage-jsapi_2_0_0-js-charging-stations.md)
- [Migration cheat sheet](index.html#subpage-jsapi_2_0_0-migration-from-v1.md)

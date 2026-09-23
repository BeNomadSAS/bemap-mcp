<span class="bemap-tag">Migration</span>

# Migrating from JS API v1 to v2 — cheat sheet

<p class="bemap-tagline">The v1 callback API still works through the v2.x line. v2 is additive: new classes side-by-side with the old ones. Migrate one service at a time.</p>

## At a glance

<ul class="bemap-glance">
<li>Three changes everywhere: <b>renamed classes</b> (some), <b>typed request objects</b> (always), <b>Promises</b> (always).</li>
<li>v1 callbacks keep working — nothing to rip out before adopting v2.</li>
<li>Model classes survive unchanged: <code>Marker</code>, <code>Polyline</code>, <code>Coordinate</code>, <code>Color</code>, …</li>
<li>Map classes unchanged: <code>LeafletMap</code>, <code>OlMap</code>, <code>MapLibreMap</code>.</li>
<li>Start with error handling — works against v1 calls too.</li>
</ul>

## Usage

### 30-second summary

```js
// v1 — callback-style
new bemap.Routing(ctx).calc(start, end, function(err, route) {
    if (err) handle(err);
    else draw(route);
});

// v2 — Promise-style
new bemap.RoutingV2(ctx).calculate(new bemap.RoutingRequest({
    destinations: [start, end]
})).then(draw).catch(handle);
```

### Error handling migration

Old:

```js
service.call(args, function(err, result) {
    if (err) {
        if (err.status === 401) ...
        if (err.message.indexOf('not found') >= 0) ...
    }
});
```

New:

```js
service.call(req).catch(function(err) {
    switch (err.getCode()) {
        case bemap.Error.UNAUTHORIZED:     reLogin(); break;
        case bemap.Error.RATE_LIMITED:     backoffAndRetry(); break;
        case bemap.Error.ROUTING_NO_ROUTE: noRouteUI(); break;
        case bemap.Error.ABORTED:          /* user cancelled */ break;
        default:                           generic(err);
    }
});
```

See [Error handling](index.html#subpage-jsapi_2_0_0-error-handling.md).

### Recommended order

1. Switch error handling to typed `bemap.Error` codes — works against v1 calls too.
2. Add `bemap.AclService` at app start to populate geoserver / CSP dropdowns.
3. Migrate Routing first — biggest payoff (matrix + isochrone are new), one of the easiest API shapes to translate.
4. Migrate Search next — same endpoint, same response shape, only the callback → Promise wrap changes.
5. Migrate EV Smart Routing — biggest readability win (abbreviated wire keys become readable JS names).
6. Adopt the new services (`TraceRoute`, `NearPoiSearch`, `ChargingStations`) as features need them.

## Reference

### Class-by-class map

| v1 (deprecated, still works) | v2 | Notes |
| --- | --- | --- |
| `bemap.Routing` | `bemap.RoutingV2` | Adds `matrix()`, `isochrone()`, in-flight `cancel(requestId)`. See [Routing migration](index.html#subpage-jsapi_2_0_0-migration-routing.md). |
| `bemap.EvseRouting` | `bemap.EvSmartRouting` | Endpoint unchanged; new typed request / response, abbreviated keys mapped to readable JS names. See [EV migration](index.html#subpage-jsapi_2_0_0-migration-evrouting.md). |
| `bemap.Geocoder` (callback) | `bemap.Geocoder` (Promise) | Same class name, refreshed under the hood. Old callback signature still works for one transitional version. See [Geocoding migration](index.html#subpage-jsapi_2_0_0-migration-geocoding.md). |
| `bemap.Autocomplete` (callback) | `bemap.Autocomplete` (Promise + `attachToInput()`) | Same class name. |
| `bemap.GeoAutocomplete` | `bemap.GeoAutocomplete` | Same. |
| *(no v1)* | `bemap.ReverseGeocoder` | New separate class — v1 used `Geocoder.reverse()`. |
| *(no v1)* | `bemap.TraceRoute` | New. |
| *(no v1)* | `bemap.NearPoiSearch` | New. |
| *(no v1)* | `bemap.ChargingStations` | New. |
| *(no v1)* | `bemap.AclService` | New. |
| *(no v1)* | `bemap.GeoServerInfoService` | New. |
| *(no v1)* | `bemap.ChargingTime` | New. |
| *(no v1)* | `bemap.EvVehicles` | New (the richer vehicle catalogue). |
| *(no v1)* | `bemap.EvReachableArea` | New. |

### What stays the same

- **`bemap.Context` constructor.** New optional fields (`chargingStationProvider` and others) are additive — existing init code keeps working.
- **Map classes** — `bemap.Map`, `bemap.LeafletMap`, `bemap.Ol3Map`, `bemap.MapLibreMap` — not touched.
- **Model classes** — `bemap.Marker`, `bemap.Polyline`, `bemap.Polygon`, `bemap.Coordinate`, `bemap.BoundingBox`, `bemap.Color`, `bemap.LineStyle`, … every model class survives.
- **`bemap.ajax`** legacy helper — kept for retrocompat.

## See also

- [Routing migration](index.html#subpage-jsapi_2_0_0-migration-routing.md)
- [EV Routing migration](index.html#subpage-jsapi_2_0_0-migration-evrouting.md)
- [Geocoding migration](index.html#subpage-jsapi_2_0_0-migration-geocoding.md)
- v1 reference: [BeMap JS API v1](index.html#subpage-jsapi_1_0_0-js-authentication.md)

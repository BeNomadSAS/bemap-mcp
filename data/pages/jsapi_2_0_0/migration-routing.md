<span class="bemap-tag">Migration</span>

# Routing — `bemap.Routing` → `bemap.RoutingV2`

<p class="bemap-tagline">v2 is additive — <code>bemap.Routing</code> still works through the v2.x line. Migrate when you want Promises, in-flight cancellation, matrix mode, or isochrone mode.</p>

## At a glance

<ul class="bemap-glance">
<li>Same endpoint, same response shape — only the call signature changes.</li>
<li>Pass a typed <code>bemap.RoutingRequest</code> instead of positional <code>(start, end)</code>.</li>
<li>Returns a <code>Promise</code>; chain <code>.then(response).catch(err)</code>.</li>
<li>Three new modes: <code>matrix()</code>, <code>isochrone()</code>, and in-flight <code>cancel(requestId)</code>.</li>
<li>Response accessors are getter-style — <code>response.getFirstRoute().getPolyline()</code> instead of <code>route.points</code>.</li>
</ul>

## Usage

### Point-to-point

```js
// v1
var v1 = new bemap.Routing(ctx);
v1.calc(start, end, function(err, route) {
    if (err) return handle(err);
    drawPolyline(route.points);
});

// v2
var v2 = new bemap.RoutingV2(ctx);
v2.calculate(new bemap.RoutingRequest({
    destinations: [start, end],
    routingCriterias: [bemap.RoutingCriteria.FASTEST],
    options: [bemap.RoutingOptions.POLYLINE]
})).then(function(response) {
    drawPolyline(response.getFirstRoute().getPolyline());
}).catch(handle);
```

### Matrix (new in v2)

```js
v2.matrix(origins, destinations).then(function(response) {
    response.getRoutes().forEach(function(r) {
        console.log(r.getLength(), r.getDuration());
    });
});
```

### Isochrone (new in v2)

```js
v2.isochrone(origin, { budget: 600 }).then(function(response) {
    map.addPolygon(new bemap.Polygon(response.getIsochronePolygon()));
});
```

### Cancellation (new in v2)

```js
// AbortSignal
var ctrl = new AbortController();
v2.calculate(req, { signal: ctrl.signal });
ctrl.abort();

// Or by requestId
var req = new bemap.RoutingRequest({ destinations: [a, b], requestId: 'trip-1' });
v2.calculate(req);
v2.cancel('trip-1');
```

## Reference

### Field mapping

| v1 argument | v2 field on `RoutingRequest` |
| --- | --- |
| `start` / `end` (positional) | `destinations: [start, end]` |
| `vias` (positional or option) | included in `destinations` |
| `options.criteria` | `routingCriterias` |
| `options.transportMode` | `routingVehicleProfile.transportMode` |
| `options.avoidTolls` | `routingCriterias: [bemap.RoutingCriteria.AVOID_TOLLS]` |
| `options.lang` | `outputLanguage` |
| `callback(err, route)` | `.then(response).catch(err)` |

### Response mapping

| v1 `route.*` | v2 `response.getFirstRoute().*` |
| --- | --- |
| `route.points` | `getPolyline()` (Array of `bemap.Coordinate`) |
| `route.length` | `getLength()` |
| `route.duration` | `getDuration()` |
| `route.instructions` | `getInstructions()` |

See [Routing v2](index.html#subpage-jsapi_2_0_0-js-routing-v2.md) for the full `RoutingRoute` accessor table.

## See also

- [Routing v2](index.html#subpage-jsapi_2_0_0-js-routing-v2.md)
- [Migration cheat sheet](index.html#subpage-jsapi_2_0_0-migration-from-v1.md)

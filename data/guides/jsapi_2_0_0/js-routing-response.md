<span class="bemap-tag">Routing</span>

# The routing response

<p class="bemap-tagline">What comes back from <code>bemap.RoutingV2</code>: the response, its routes, their summaries, turn-by-turn instructions and waypoints — and which of them are only populated when you asked for them.</p>

<div class="bemap-callout">
<strong>Most fields are opt-in.</strong> A route has no polyline unless you requested one, and no instructions unless you asked. A <code>null</code> here almost always means "not requested", not "not available" — see <a href="#whatyouhavetoaskfor">What you have to ask for</a>.
</div>

## At a glance

<ul class="bemap-glance">
<li><code>bemap.RoutingResponse</code> — the envelope. <code>getRoutes()</code>, <code>getFirstRoute()</code>, <code>getWarnings()</code>.</li>
<li><code>bemap.RoutingRoute</code> — one itinerary: geometry, totals, instructions, waypoints.</li>
<li><code>bemap.RoutingSummary</code> — distance, duration, traffic, ETA, tolls, energy.</li>
<li><code>bemap.RoutingInstruction</code> — one manoeuvre of the turn-by-turn list.</li>
<li><code>bemap.RoutingWaypoint</code> — a requested point, matched onto the network.</li>
<li>Matrix and isochrone modes return through the <em>same</em> response object, via <code>getMatrix()</code> and <code>getIsochrone()</code>.</li>
</ul>

## Usage

### The shape of a result

```js
routing.compute(request).then(function(response) {
    var route = response.getFirstRoute();
    if (!route) return;

    var summary = route.getSummary();
    console.log(summary.getDistanceM() + ' m');
    console.log(summary.getDurationS() + ' s');

    // Draw it — polyline must have been requested
    var coords = route.getPolyline();
    if (coords) {
        map.addPolyline(new bemap.Polyline(coords));
        map.moveToBoundingBox(route.getBoundingBox());
    }
});
```

`getPolyline()` hands back an array of `bemap.Coordinate` ready for
`bemap.Polyline`, whatever wire format the server used.

### Alternatives

```js
var routes = response.getRoutes();       // array — may hold several
routes.forEach(function(r, i) {
    var s = r.getSummary();
    console.log('option ' + i + ': ' +
                Math.round(s.getDistanceM() / 1000) + ' km, ' +
                Math.round(s.getDurationS() / 60) + ' min');
});
```

`getFirstRoute()` is shorthand for the best one and returns `null` on an empty result —
always the first thing to check.

### Warnings

```js
(response.getWarnings() || []).forEach(function(w) {
    console.warn('routing warning:', w);
});
```

A response can succeed *and* warn — a closed road avoided, a vehicle restriction that
could not be honoured. Worth surfacing; a route that silently ignored a constraint is
worse than one that says so.

### Turn-by-turn

```js
route.getInstructions().forEach(function(ins) {
    console.log(
        ins.getText(),                     // "Turn right onto Rue de Rivoli"
        ins.getStreetName(),
        ins.getDistanceM() + ' m',
        ins.getDurationS() + ' s'
    );
    var at = ins.getCoordinate();          // where the manoeuvre happens
});
```

Roundabouts carry an exit number:

```js
if (ins.getRoundAboutExitNumber()) {
    console.log('take exit ' + ins.getRoundAboutExitNumber());
}
```

### Waypoints

How your requested points were matched onto the road network — the answer to "why did it
route from *there*?".

The `bemap.RoutingWaypoint` objects hang off the **response**, not the route:

```js
(response.getUsedDestinations() || []).forEach(function(wp) {
    wp.getInputCoordinate();        // what you asked for
    wp.getMatchedCoordinate();      // where it snapped to
    wp.getDistanceFromRequest();    // how far it moved, metres
    wp.isUsed();                    // whether it was honoured
    wp.getInputOrder();             // your order
    wp.getUsedOrder();              // the optimised order
});
```

`route.getStartStopInfo()` is a different thing: it hands back the server's raw
`{ start, stop, distanceFirstMatched, distanceLastMatched, interDests }` object, not an
array of waypoints. Do not call array methods on it.

A large `getDistanceFromRequest()` means the point was nowhere near a routable road.
`getInputOrder()` differing from `getUsedOrder()` means the service reordered stops.

### Traffic

```js
var s = route.getSummary();
s.getDurationS();              // free-flow
s.getDurationInTrafficS();     // with current traffic
route.getTrafficDelay();       // the difference, in seconds
s.getEta();                    // estimated arrival
```

### Cost and energy

Populated only when the request asked for them and the account is entitled.

```js
s.getTollCost();      s.getTollCurrency();
s.getTaxCost();       s.getTaxCurrency();
s.getEnergy();        s.getEnergyUnit();
```

### Matrix and isochrone

Same response class, different accessor.

```js
// MODE_MATRIX
var matrix = response.getMatrix();

// MODE_ISOCHRONE
var iso = response.getIsochrone();
var ring = response.getIsochronePolygon();
if (ring) map.addPolygon(new bemap.Polygon(ring));
```

`getIsochronePolygon()` returns an **array of `bemap.Coordinate`** (or the raw isochrone
object when the server sent one). Despite the name it is not a `bemap.Polygon`, so you
have to construct one. Passing the raw value straight to `map.addPolygon()` silently
adds nothing — that method type-checks its argument and returns early.

### What you have to ask for

| You want | Ask for it | Otherwise |
| --- | --- | --- |
| Route geometry | the polyline option | `getPolyline()` → `null` |
| Turn-by-turn | the instructions option | `getInstructions()` → empty |
| Traffic-aware duration | a traffic-enabled request | `getDurationInTrafficS()` → null/equal to free-flow |
| Tolls | the toll option, plus entitlement | `getTollCost()` → null |
| Energy | an EV request | `getEnergy()` → null |

See [Routing v2](index.html#subpage-jsapi_2_0_0-js-routing-v2.md) for the request side.

## Reference

### `bemap.RoutingResponse`

| Method | Returns |
| --- | --- |
| `getRoutes()` | Array of `bemap.RoutingRoute` |
| `getFirstRoute()` | `bemap.RoutingRoute` or `null` |
| `getWarnings()` | Array |
| `getRequestId()` | String — quote it in support requests |
| `getMatrix()` | Matrix result (`MODE_MATRIX`) |
| `getIsochrone()` | Isochrone result (`MODE_ISOCHRONE`) |
| `getIsochronePolygon()` | Array of `bemap.Coordinate`, or the raw isochrone object — **not** a `bemap.Polygon` |
| `getUsedDestinations()` | Array of `bemap.RoutingWaypoint` — the snap info for each requested point |

### `bemap.RoutingRoute`

| Method | Returns |
| --- | --- |
| `getSummary()` | `bemap.RoutingSummary` |
| `getPolyline()` | Array of `bemap.Coordinate`, or `null` if not requested |
| `getPolylineRaw()` | The server's raw value — array or encoded string |
| `getInstructions()` | Array of `bemap.RoutingInstruction` |
| `getRoutingInstructions()` | Alias of the above |
| `getStartStopInfo()` | Raw server object — `{ start, stop, distanceFirstMatched, distanceLastMatched, interDests }`. **Not** an array. |
| `getBoundingBox()` | `bemap.BoundingBox` — feed to `moveToBoundingBox` |
| `getLength()` | Distance, metres |
| `getDuration()` / `getTotalDuration()` | Seconds |
| `getTrafficDelay()` | Seconds added by traffic |
| `getDepartureTime()` / `getArrivalTime()` | |
| `getAverageSpeed()` / `getMaximumSpeed()` | |
| `getExtra()` | Extra server fields |

### `bemap.RoutingSummary`

| Method | Returns |
| --- | --- |
| `getDistanceM()` | Metres |
| `getDurationS()` | Seconds, free-flow |
| `getDurationInTrafficS()` | Seconds, with traffic |
| `getEta()` | Estimated arrival |
| `getTollCost()` / `getTollCurrency()` | |
| `getTaxCost()` / `getTaxCurrency()` | |
| `getEnergy()` / `getEnergyUnit()` | EV requests |

### `bemap.RoutingInstruction`

| Method | Returns |
| --- | --- |
| `getText()` | Human-readable instruction |
| `getTextDist()` | Instruction with its distance |
| `getStreetName()` | |
| `getFromName()` / `getToName()` | |
| `getCoordinate()` | Where the manoeuvre happens |
| `getDistanceM()` / `getLength()` | Metres to the next manoeuvre |
| `getDurationS()` / `getDuration()` | Seconds |
| `getManoeuvre()` / `getType()` | Manoeuvre kind |
| `getRoundAboutExitNumber()` / `getExitNumber()` | |
| `getRoadShield()` | Road-sign designation |
| `getGeoElementType()` | |
| `getToOn()` / `getToRn()` / `getToSi()` | Destination sign details |

### `bemap.RoutingWaypoint`

| Method | Returns |
| --- | --- |
| `getInputCoordinate()` | What you requested |
| `getMatchedCoordinate()` | Where it snapped to |
| `getDistanceFromRequest()` | Snap distance, metres |
| `getDistanceFromStartM()` | Along-route distance |
| `getDurationFromStartS()` | Along-route time |
| `getInputOrder()` / `getUsedOrder()` | Requested vs optimised order |
| `isUsed()` | Whether it was honoured |
| `getKind()` | Waypoint kind |
| `getName()` | |
| `getPolylineIndex()` | Index into the route polyline |
| `getConfidenceValue()` | Match confidence |
| `getLength()` / `getDuration()` | |

## Notes

**Units are consistent.** Distances in metres, durations in seconds — hence the `M` and
`S` suffixes. Convert at the presentation layer, not in your data model.

**`getSummary()` is synthesised.** It is built from the route-level totals rather than
being a distinct server object. It exists so consumers that expect a `summary` keep
working; the same numbers are reachable directly on the route.

### Gotchas

- **Not checking `getFirstRoute()` for `null`.** An empty result set is a normal outcome — an unroutable point, an impossible vehicle profile. Check before dereferencing.
- **Assuming `getPolyline()` is populated.** It is `null` unless the polyline was requested. This is the single most common surprise on this page.
- **Confusing `getPolyline()` with `getPolylineRaw()`.** The first is always `bemap.Coordinate` objects; the second is whatever the server sent, which may be an encoded string needing `bemap.gep.decode`.
- **Treating a warning as a failure.** A response can succeed and still warn. Surface warnings; do not abort on them.
- **Reading `getDurationInTrafficS()` on a non-traffic request.** Null, or identical to free-flow. Not a traffic-free road.
- **Ignoring `getDistanceFromRequest()`.** A route that starts somewhere unexpected usually means a waypoint snapped a long way to the nearest road.
- **Assuming waypoint order was preserved.** Compare `getInputOrder()` with `getUsedOrder()` before labelling stops "1, 2, 3".
- **Treating `getStartStopInfo()` as an array of waypoints.** It is a raw object; iterating it throws. Waypoints come from `response.getUsedDestinations()`.
- **Passing `getIsochronePolygon()` straight to `map.addPolygon()`.** It is not a `bemap.Polygon`, so the call type-checks and silently does nothing. Wrap it: `new bemap.Polygon(ring)`.

## See also

- [Routing v2](index.html#subpage-jsapi_2_0_0-js-routing-v2.md) — building the request
- [Matrix mode](index.html#subpage-jsapi_2_0_0-js-routing-matrix.md) — `getMatrix()`
- [Isochrone mode](index.html#subpage-jsapi_2_0_0-js-routing-isochrone.md) — `getIsochrone()`
- [Helpers &amp; value types](index.html#subpage-jsapi_2_0_0-js-helpers.md) — `Coordinate`, `BoundingBox`, `bemap.gep`
- [Error handling](index.html#subpage-jsapi_2_0_0-error-handling.md) — when there is no response at all
- [Animation](index.html#subpage-jsapi_2_0_0-js-map-animation.md) — animating a route's geometry

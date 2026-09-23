<span class="bemap-tag">Mapping</span>

# Animation

<p class="bemap-tagline">Moving things: a vehicle travelling a route, a line drawing itself, a camera touring waypoints or orbiting a landmark, a pulse marking an alert.</p>

<div class="bemap-callout">
<strong>Two of these work everywhere.</strong> <code>animateAlongRoute</code> and <code>cameraTour</code> are implemented on Leaflet, OpenLayers <em>and</em> MapLibre — though <code>animateAlongRoute</code> additionally <strong>requires <code>sourceId</code> on MapLibre</strong>. <code>animateLine</code>, <code>animateCameraOrbit</code> and <code>animatePulse</code> are MapLibre-only.
</div>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_anim","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_anim', {
        onMapReady: function(map) {
            map.defaultLayers().move(2.33, 48.857, 13);

            // A short path through central Paris, [lon, lat] pairs.
            var path = [
                [2.2945, 48.8584], [2.3050, 48.8590], [2.3180, 48.8600],
                [2.3290, 48.8608], [2.3376, 48.8606], [2.3450, 48.8570],
                [2.3499, 48.8530]
            ];

            var running = null;

            function on(id, fn) {
                var el = document.getElementById(id);
                if (el) el.onclick = fn;
            }

            on('mapV2_anim_route', function() {
                if (running) running.stop();
                // sourceId is REQUIRED on MapLibre; harmless on the others.
                if (map instanceof bemap.MapLibreMap) {
                    map.addGeoJsonSource('animDemoSrc',
                        { type: 'FeatureCollection', features: [] });
                }
                running = map.animateAlongRoute({
                    coordinates: path,
                    sourceId:    'animDemoSrc',
                    speed:       0.004,
                    loop:        true
                });
            });

            on('mapV2_anim_tour', function() {
                if (running) running.stop();
                running = map.cameraTour({
                    waypoints: [
                        { center: [2.2945, 48.8584], zoom: 15, duration: 2000 },
                        { center: [2.3376, 48.8606], zoom: 15, duration: 2000 },
                        { center: [2.3499, 48.8530], zoom: 15, duration: 2000 }
                    ],
                    loop: true
                });
            });

            on('mapV2_anim_stop', function() {
                if (running) { running.stop(); running = null; }
            });
        }
    });
});
```

<button type="button" class="btn btn-primary" id="mapV2_anim_route">Animate along route</button>
<button type="button" class="btn btn-primary" id="mapV2_anim_tour">Camera tour</button>
<button type="button" class="btn btn-default" id="mapV2_anim_stop">Stop</button>

<p class="bemap-demo-caption">Both of these run on whichever engine the selector is set to. Every animation call returns a handle — keep it, and call <code>stop()</code>.</p>

## At a glance

<ul class="bemap-glance">
<li>Every animation method returns a handle: <code>{ stop() }</code>, usually with <code>resume()</code> too.</li>
<li><code>animateAlongRoute</code> — move a marker along a path. <strong>All engines</strong>, but MapLibre needs a <code>sourceId</code> and a pre-added GeoJSON source.</li>
<li><code>cameraTour</code> — fly through a list of waypoints. <strong>All engines.</strong></li>
<li><code>animateLine</code> — draw a line progressively. MapLibre only.</li>
<li><code>animateCameraOrbit</code> — circle a point. MapLibre only.</li>
<li><code>animatePulse</code> — an expanding ring. MapLibre only; its handle has <code>remove()</code>, not <code>resume()</code>.</li>
<li><code>map.clearAllEffects()</code> stops every registered animation at once.</li>
</ul>

## Usage

### Along a route

```js
var handle = map.animateAlongRoute({
    coordinates: [[2.29, 48.85], [2.33, 48.86], [2.35, 48.85]],
    speed:       0.004,
    loop:        true,
    onUpdate:    function(position) { /* current position */ },
    onComplete:  function() { /* finished — not called when loop is true */ }
});

handle.stop();
```

Coordinates are `[lon, lat]` pairs. `speed` advances the position along the coordinate
list each frame, so the duration follows the number of points, not the physical
distance — a 200 km route drawn with 7 points finishes as quickly as a 2 km one with 7
points. Lower `speed` means slower.

**On MapLibre, `sourceId` is mandatory.** Without it the call logs
`animateAlongRoute: opts.sourceId is required` and returns an inert handle — nothing
moves. Add the source first:

```js
map.addGeoJsonSource('vehicle', { type: 'FeatureCollection', features: [] });
map.animateAlongRoute({ coordinates: path, sourceId: 'vehicle', speed: 0.004 });
```

Leaflet and OpenLayers need no `sourceId` — they create the moving feature themselves.

Feeding it a real route from the routing service is the usual case:

```js
map.animateAlongRoute({
    coordinates: bemap.gep.decode(route.getGeometry()).map(function(c) {
        return [c.getLon(), c.getLat()];
    }),
    speed: 0.002
});
```

### A camera tour

```js
var tour = map.cameraTour({
    waypoints: [
        { center: [2.35, 48.85], zoom: 12, duration: 3000 },
        { center: [4.83, 45.76], zoom: 12, duration: 3000 },
        { center: [5.37, 43.30], zoom: 12, duration: 3000 }
    ],
    loop:       true,
    onComplete: function() { console.log('tour finished'); }
});

tour.stop();
```

With no waypoints it returns an inert handle rather than throwing.

### Drawing a line progressively — MapLibre

```js
var draw = map.animateLine({
    coordinates: path,
    sourceId:    'my-animated-line',
    speed:       0.005,
    onUpdate:    function(i) { /* index reached */ },
    onComplete:  function() { /* fully drawn */ }
});
```

Good for showing a journey being traced rather than a vehicle moving along it.

### Orbiting — MapLibre

```js
var orbit = map.animateCameraOrbit({
    center: [2.3376, 48.8606],
    zoom:   16,
    pitch:  60,
    speed:  0.5
});

orbit.stop();
```

The classic landmark showcase. Pair it with `add3DBuildings()` and a pitch — orbiting a
flat map is not worth the frames.

### Pulsing a point — MapLibre

```js
var pulse = map.animatePulse({
    center:    [2.3376, 48.8606],
    color:     '#e74c3c',
    maxRadius: 40,
    speed:     0.05
});

pulse.stop();      // freeze
pulse.remove();    // stop AND remove the layer and source
```

Note the difference: `stop()` leaves the layer in place, `remove()` cleans up. Use
`remove()` unless you intend to restart it.

### Stopping everything

```js
map.clearAllEffects();
```

Animations register as named effects, so this is the reliable teardown — no need to have
kept every handle.

```js
map.getActiveEffects();     // what is running right now
map.onEffectChange(function(e) { console.log(e.name, e.active); });
```

## Reference

### All engines

| Method | Options | Returns |
| --- | --- | --- |
| `map.animateAlongRoute(options)` | `coordinates`, `speed`, `loop`, `sourceId` (**required on MapLibre**), `onUpdate`, `onComplete` | `{ stop, resume }` |
| `map.cameraTour(options)` | `waypoints`, `loop`, `onComplete` | `{ stop, resume }` |

Waypoints take `{ center: [lon, lat], zoom, duration }`.

### MapLibre only

| Method | Options | Returns |
| --- | --- | --- |
| `map.animateLine(options)` | `coordinates`, `speed`, `sourceId`, `onUpdate`, `onComplete` | `{ stop, resume }` |
| `map.animateCameraOrbit(options)` | `center`, `zoom`, `pitch`, `speed` | `{ stop, resume }` |
| `map.animatePulse(options)` | `center`, `color`, `maxRadius`, `speed` | `{ stop, remove }` |
| `map.spinGlobe(options)` | `speed` | `{ stop, resume }` |

### Defaults

| Option | Default |
| --- | --- |
| `animatePulse.color` | `'#e74c3c'` |
| `animatePulse.maxRadius` | `30` |
| `animatePulse.speed` | `0.05` |
| `animateAlongRoute.speed` | `0.005` |
| `animateAlongRoute.loop` | `true` |
| `spinGlobe.speed` | `0.3` |

### Effect control

| Method | Notes |
| --- | --- |
| `map.getActiveEffects()` | Snapshot of running effect names. |
| `map.clearAllEffects()` | Stops and tears down all of them. |
| `map.onEffectChange(cb)` / `map.offEffectChange(cb)` | `{ name, active }` notifications. |

## Notes

**No-op handles on unsupported engines.** Calling `animatePulse` on Leaflet returns
`{ stop, remove }` where both are empty functions. Your teardown code will not throw —
which is the point, but it also means a silently missing animation looks like working
code. Check the console for the one-time warning.

**`speed` is not a velocity.** It is a per-frame fraction, not km/h. To make a vehicle
appear to move at a plausible speed you have to scale it against the route's real length
yourself.

### Gotchas

- **Omitting `sourceId` on MapLibre.** `animateAlongRoute` warns and hands back a handle that does nothing. The identical code works on Leaflet and OpenLayers, so this only surfaces when someone switches engine.
- **Discarding the handle.** Without it, the only way to stop is `clearAllEffects()`. Keep it.
- **Starting an animation twice.** Two independent animations fight over the same camera or marker. Stop the previous one first — the demo above does exactly that.
- **`onComplete` never firing.** With `loop: true` there is no completion. Set `loop: false` if you need the callback.
- **`animatePulse().stop()` and expecting cleanup.** `stop()` freezes; `remove()` cleans up. Leaked pulse layers accumulate.
- **Animating while the user pans.** Camera animations fight user input. Stop on first interaction.
- **`cameraTour` with an empty waypoint list.** Returns an inert handle and does nothing — check your data rather than the API.
- **Leaving animations running on teardown.** They hold `requestAnimationFrame` or interval callbacks alive. Call `clearAllEffects()` when unmounting.

## See also

- [Camera &amp; viewport](index.html#subpage-jsapi_2_0_0-js-map-camera.md) — `flyTo` and `easeTo` for one-off moves
- [Globe projection](index.html#subpage-jsapi_2_0_0-js-map-globe.md) — `spinGlobe`
- [3D &amp; terrain](index.html#subpage-jsapi_2_0_0-js-map-3d.md) — what an orbit should be orbiting
- [Routing v2](index.html#subpage-jsapi_2_0_0-js-routing-v2.md) — where route geometry comes from
- [Choosing an engine](index.html#subpage-jsapi_2_0_0-js-map-engines.md)

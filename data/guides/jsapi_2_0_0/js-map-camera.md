<span class="bemap-tag">Mapping</span>

# Camera &amp; viewport

<p class="bemap-tagline">Where the map is looking: centre, zoom, rotation, tilt — and the four different ways to get there, from an instant jump to a flight across the country.</p>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_camera","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_camera', {
        onMapReady: function(map) {
            map.defaultLayers().move(2.35, 48.85, 11);

            function on(id, fn) {
                var el = document.getElementById(id);
                if (el) el.onclick = fn;
            }

            on('mapV2_camera_move',  function() { map.move(4.8357, 45.7640, 12); });
            on('mapV2_camera_fly',   function() { map.flyTo(5.3698, 43.2965, 12); });
            on('mapV2_camera_bbox',  function() {
                // France, south-west corner first: minLon, minLat, maxLon, maxLat
                map.moveToBoundingBox(new bemap.BoundingBox(-5.14, 41.33, 9.56, 51.09));
            });
            on('mapV2_camera_rotate', function() {
                map.rotation((map.getRotation() || 0) + 45);
            });
            on('mapV2_camera_where', function() {
                var c = map.getCenter();
                var out = document.getElementById('mapV2_camera_out');
                if (out) {
                    out.textContent = 'lon ' + c.getLon().toFixed(4) +
                                      ', lat ' + c.getLat().toFixed(4) +
                                      ', zoom ' + map.getZoom();
                }
            });
        }
    });
});
```

<button type="button" class="btn btn-primary" id="mapV2_camera_move">Jump to Lyon</button>
<button type="button" class="btn btn-primary" id="mapV2_camera_fly">Fly to Marseille</button>
<button type="button" class="btn btn-primary" id="mapV2_camera_bbox">Fit France</button>
<button type="button" class="btn btn-primary" id="mapV2_camera_rotate">Rotate 45°</button>
<button type="button" class="btn btn-primary" id="mapV2_camera_where">Where am I?</button>

<p class="bemap-demo-caption">Current view: <code id="mapV2_camera_out">—</code>. <b>Jump</b> is instant, <b>Fly</b> animates. <b>Fit France</b> derives both centre and zoom from a bounding box. Rotation is most visible on MapLibre.</p>

## At a glance

<ul class="bemap-glance">
<li><code>map.move(lon, lat, zoom)</code> — set the view. Longitude first.</li>
<li><code>map.flyTo(lon, lat, zoom)</code> — same destination, animated.</li>
<li><code>map.moveToBoundingBox(bbox)</code> — frame a rectangle; centre and zoom are computed for you.</li>
<li><code>map.moveToLayerData(layer)</code> — frame everything currently in a layer.</li>
<li>Read it back: <code>getCenter()</code>, <code>getZoom()</code>, <code>getBoundingBox()</code>, <code>getRotation()</code>.</li>
<li>MapLibre adds true 3D camera control: <code>setPitch()</code>, <code>setBearing()</code>.</li>
</ul>

## Usage

### Setting the view

```js
map.move(2.3522, 48.8566, 12);          // centre + zoom, immediately
map.move(2.3522, 48.8566);              // centre only, keep current zoom
map.zoom(14);                           // zoom only, keep current centre
```

`move` is the workhorse. Longitude comes first — see
[Helpers &amp; value types](index.html#subpage-jsapi_2_0_0-js-helpers.md) if that ordering is new to you.

### Animating

```js
map.flyTo(4.8357, 45.7640, 12);         // curved, zoom-out-then-in flight
map.easeTo({ center: [4.8357, 45.7640], zoom: 12, duration: 1200 });
map.jumpTo({ center: [4.8357, 45.7640], zoom: 12 });   // no animation at all
```

Four verbs, deliberately distinct:

| Verb | Animated | Use when |
| --- | --- | --- |
| `move` | no | Setting an initial view, or responding to a search result. |
| `jumpTo` | no | Same, with MapLibre-style option objects. |
| `easeTo` | yes, linear-ish | Short, controlled transitions where you set the duration. |
| `flyTo` | yes, parabolic | Long distances — the zoom-out-and-back arc keeps context. |

`flyTo` over a short distance looks fussy; `easeTo` over a long one looks slow. Match
the verb to the distance.

### Framing content

Usually better than guessing a zoom level.

```js
// Frame an explicit rectangle
map.moveToBoundingBox(new bemap.BoundingBox(-5.14, 41.33, 9.56, 51.09));

// Frame whatever is in a layer — search results, a route, a set of markers
map.moveToLayerData(resultsLayer);

// Frame a route returned by the routing service
map.moveToBoundingBox(route.getExtent());
```

### Reading the view

```js
var centre = map.getCenter();        // → bemap.Coordinate
var z      = map.getZoom();          // → Number, or -1 if unsupported
var view   = map.getBoundingBox();   // → bemap.BoundingBox of the viewport
var angle  = map.getRotation();      // → degrees
```

`getBoundingBox()` is how you constrain a search to what the user can actually see:

```js
map.on(bemap.Map.EventType.MOVEEND, function() {
    searchWithin(map.getBoundingBox());
});
```

### Rotation, pitch and bearing

```js
map.rotation(45);                    // degrees, all engines
map.setBearing(45);                  // MapLibre — compass rotation
map.setPitch(60);                    // MapLibre — tilt, 0–85
```

`setBearing` and `rotation` genuinely work on all three engines — Leaflet rotates via a
CSS transform, OpenLayers through the view. **`setPitch` does not.** On Leaflet and
OpenLayers it is a stub that warns once and does nothing at all; there is no reduced 2D
tilt. Real pitch is MapLibre-only.

### Interaction controls

```js
map.setZoomControl(false);           // hide the +/- buttons
map.setDragPan(false);               // freeze panning
map.setKeyboard(false);              // disable arrow-key navigation
```

`setZoomControl` is uniform across all three engines — it toggles a container class so
the engine-specific selectors all take effect at once.

## Reference

### Positioning

| Method | Notes |
| --- | --- |
| `map.move(lon, lat, zoom, options)` | Immediate. `zoom` optional. Returns `this`. |
| `map.flyTo(lon, lat, zoom, options)` | Animated flight. |
| `map.easeTo(options)` | `{ center, zoom, bearing, pitch, duration }`. |
| `map.jumpTo(options)` | Same options, no animation. |
| `map.zoom(zoom, options)` | Zoom only. |
| `map.rotation(angle, options)` | Degrees. |
| `map.moveToBoundingBox(bbox, options)` | Fits a `bemap.BoundingBox`. |
| `map.moveToLayerData(layer, options)` | Fits the layer's current contents. **Not implemented on Leaflet** — silent no-op there. |
| `map.refresh(options)` | Force a redraw — after a container resize, for instance. |

### Reading state

| Method | Returns |
| --- | --- |
| `map.getCenter()` | `bemap.Coordinate` |
| `map.getZoom()` | Number — `-1` when the engine cannot report it |
| `map.getBoundingBox()` | `bemap.BoundingBox` of the current viewport |
| `map.getRotation()` | Number, degrees |
| `map.getPitch()` | Number, degrees |
| `map.getBearing()` | Number, degrees |

### 3D camera — MapLibre

| Method | Notes |
| --- | --- |
| `map.setPitch(pitch)` | 0–85 degrees. **MapLibre only** — warns and no-ops elsewhere. |
| `map.setBearing(bearing)` | 0–360 degrees. Works on all three engines. |

### Controls

| Method | Notes |
| --- | --- |
| `map.setZoomControl(enabled)` / `map.getZoomControl()` | Native +/- buttons. |
| `map.setDragPan(active, options)` / `map.isDragPan()` | Mouse/touch panning. |
| `map.setKeyboard(enabled)` / `map.getKeyboard()` | Arrow-key navigation. |

## Notes

**Zoom levels are not a distance.** Level 0 is the whole world; each step doubles the
scale. Roughly: 6 a country, 11 a city, 14 a district, 17 a street, 19 a building.
Vector tiles here go to zoom 14 and the renderer over-zooms past that, so labels stay
sharp but no new detail appears.

**Chaining.** Most camera methods return `this`, so
`map.defaultLayers().move(2.35, 48.85, 11)` is idiomatic and appears throughout these
pages.

### Gotchas

- **Latitude and longitude swapped.** `map.move(48.85, 2.35, 11)` is valid and puts you in the Indian Ocean. Longitude first, always.
- **`moveToBoundingBox` with a degenerate box.** A box built from a single point has zero area; engines respond by zooming to maximum. Pad it, or use `move` for a single point.
- **`moveToLayerData` on Leaflet.** Never does anything — Leaflet has no implementation and the base class is a silent no-op. On OpenLayers and MapLibre it works, but an empty layer still has nothing to frame.
- **Calling camera methods before the map is ready.** Use the `onMapReady` callback (or the `LOAD` event) rather than calling immediately after the constructor.
- **A resized container without `refresh()`.** The engine keeps the old pixel dimensions and the map is clipped or blurry. Call `map.refresh()` after a layout change.
- **`getZoom()` returning `-1`.** Not an error — it means this engine cannot report a zoom level in the current state. Do not feed it straight back into `move`.

## See also

- [Choosing an engine](index.html#subpage-jsapi_2_0_0-js-map-engines.md) — what pitch and bearing really do per engine
- [Events](index.html#subpage-jsapi_2_0_0-js-map-events.md) — `MOVEEND` and friends
- [Helpers &amp; value types](index.html#subpage-jsapi_2_0_0-js-helpers.md) — `Coordinate` and `BoundingBox`
- [3D &amp; terrain](index.html#subpage-jsapi_2_0_0-js-map-3d.md) — pitch in a 3D scene
- [Animation](index.html#subpage-jsapi_2_0_0-js-map-animation.md) — camera tours and orbits

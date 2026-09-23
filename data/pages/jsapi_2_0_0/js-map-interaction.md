<span class="bemap-tag">Mapping</span>

# Interaction — picking &amp; dragging

<p class="bemap-tagline">Reacting to the things on the map rather than the map itself: clicking a marker, dragging a shape, asking what is under the cursor.</p>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_interact","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_interact', {
        onMapReady: function(map) {
            map.defaultLayers().move(2.35, 48.85, 12);

            var out = document.getElementById('mapV2_interact_out');
            function say(t) { if (out) out.textContent = t; }

            var cities = [
                { name: 'Louvre',        lon: 2.3376, lat: 48.8606 },
                { name: 'Notre-Dame',    lon: 2.3499, lat: 48.8530 },
                { name: 'Tour Eiffel',   lon: 2.2945, lat: 48.8584 }
            ];

            cities.forEach(function(c) {
                var marker = new bemap.Marker(new bemap.Coordinate(c.lon, c.lat));
                map.addMarker(marker);

                // Per-object listener: fires only for THIS marker. The SINGULAR
                // form is used here on purpose — onMarkers() is a silent no-op
                // on Leaflet (see "Plural forms are not portable" below).
                map.onMarker(marker, bemap.Map.EventType.CLICK, function(evt) {
                    var at = evt.getCoordinate();
                    say('clicked: ' + c.name + '  —  lon ' + at.getLon().toFixed(4));
                });
            });

            var draggable = new bemap.Marker(new bemap.Coordinate(2.32, 48.87));
            map.addMarker(draggable);
            map.draggableMarker(draggable, function(evt) {
                var c = evt.getCoordinate();
                say('dragged to lon ' + c.getLon().toFixed(4) +
                    ', lat ' + c.getLat().toFixed(4));
            });
        }
    });
});
```

<p class="bemap-demo-caption"><code id="mapV2_interact_out">— click a marker, or drag the north-west one —</code>. Three markers carry per-object click handlers; the fourth is draggable.</p>

## At a glance

<ul class="bemap-glance">
<li><code>map.onMarker(marker, type, cb)</code> — one specific object. <code>map.onMarkers(type, cb)</code> — all of them.</li>
<li>The same pair exists for polylines, polygons, circles and multi-markers.</li>
<li><code>map.draggableMarker(marker, cb)</code> and friends make an object movable; the callback gets the new position.</li>
<li><code>map.queryRenderedFeatures(point)</code> — MapLibre only — asks what vector features are under a pixel.</li>
<li><code>map.onGetFeatureInfo(layer, options)</code> — WMS <code>GetFeatureInfo</code>. <strong>OpenLayers only</strong>; Leaflet warns and does nothing.</li>
<li>Every one of these returns a <code>bemap.Listener</code>.</li>
</ul>

## Usage

### One object versus all objects

```js
// Just this marker — works on all three engines
map.onMarker(marker, bemap.Map.EventType.CLICK, function(evt) {
    console.log('this one');
});

// Every marker on the map — OpenLayers and MapLibre only
map.onMarkers(bemap.Map.EventType.CLICK, function(evt) {
    console.log('some marker:', evt.bemapObject);
});
```

The plural form is convenient when the set is dynamic — it keeps working as markers come
and go, where the singular form needs re-registering per object. **But it is not
portable**, which is the single most important thing on this page.

`evt.bemapObject` is how you find out *which* object was hit in a plural handler.

### Plural forms are not portable

Leaflet implements the singular listeners and omits most of the plural ones. Because the
base class supplies a **silent** stub — it returns a `bemap.Listener` and never fires —
a Leaflet page using the plural form looks correct, logs nothing, and gives you no clue
why.

| Method | Leaflet | OpenLayers | MapLibre |
| --- | --- | --- | --- |
| `onMarker` | yes | yes | yes |
| `onMarkers` | **silent no-op** | yes | yes |
| `onMultiMarkers` | yes | yes | yes |
| `onPolyline` / `onPolylines` | `onPolyline` only — `onPolylines` is a silent no-op | yes | yes |
| `onPolygon` | yes | yes | yes |
| `onPolygons` | **absent — `TypeError`** | yes | yes |
| `onCircle` | yes | yes | yes |
| `draggableMarker` | yes | yes | yes |
| `draggableMarkers` | **silent no-op** | yes | yes |

Two different failure modes, both worth knowing:

- **Silent no-op** — the base `bemap.Map` declares the method and returns an inert listener. Nothing happens, nothing warns.
- **`TypeError`** — `onPolygons` has no base declaration at all, so on Leaflet the call throws outright.

If you need portable code, use the singular form and register per object. If you are on
OpenLayers or MapLibre only, the plural form is the better tool.

### Dragging

```js
map.draggableMarker(marker, function(evt) {
    var c = evt.getCoordinate();       // where it ended up
    savePosition(c.getLon(), c.getLat());
});

map.draggableMarkers(function(evt) {
    console.log('moved:', evt.bemapObject);
});

map.draggablePolyline(polyline, onMoved);
map.draggablePolygon(polygon, onMoved);
map.draggableCircle(circle, onMoved);
```

Restrict dragging to one layer with the `layerFilter` option:

```js
map.draggableMarkers(onMoved, { layerFilter: editableLayer });
```

### Asking what is under a point — MapLibre

```js
var features = map.queryRenderedFeatures({ x: 120, y: 240 }, {
    layers: ['poi-labels']
});

features.forEach(function(f) {
    console.log(f.properties.name);
});
```

Queries the *rendered* vector features, so it sees what the user sees — anything
filtered out or below its zoom range will not appear. Combine with a map click to build
an inspector:

```js
map.on(bemap.Map.EventType.CLICK, function(evt) {
    var hits = map.queryRenderedFeatures({ x: evt.x, y: evt.y });
    if (hits.length) showPopup(hits[0], evt.getCoordinate());
});
```

### WMS `GetFeatureInfo` — OpenLayers only

The raster equivalent: ask the WMS server what is at the clicked point.

```js
map.onGetFeatureInfo(wmsLayer, {
    beforeCallback: function(data) {
        // data has arrived, popup not yet shown — return false to suppress it
    },
    afterCallback: function() {
        // popup is on screen
    }
});
```

### Turning interaction off

```js
map.setDragPan(false);        // freeze panning
map.setKeyboard(false);       // disable arrow keys
map.setZoomControl(false);    // hide the +/- buttons
```

Useful for a thumbnail or a print view where the map should be inert.

## Reference

### Per-object listeners

| Method | Notes |
| --- | --- |
| `map.onMarker(marker, type, cb, options)` | |
| `map.onMarkers(type, cb, options)` | All markers. |
| `map.onMultiMarker(mm, type, cb, options)` | |
| `map.onMultiMarkers(type, cb, options)` | |
| `map.onPolyline(polyline, type, cb, options)` | |
| `map.onPolylines(type, cb, options)` | |
| `map.onPolygon(polygon, type, cb, options)` | Engine-level. |
| `map.onPolygons(type, cb, options)` | Engine-level. |
| `map.onCircle(circle, type, cb, options)` | Engine-level. |

All return a `bemap.Listener`.

### Dragging

| Method | Notes |
| --- | --- |
| `map.draggableMarker(marker, cb, options)` | `options.layerFilter` restricts to a layer. |
| `map.draggableMarkers(cb, options)` | |
| `map.draggableMultiMarkers(cb, options)` | |
| `map.draggablePolyline(polyline, cb, options)` | |
| `map.draggablePolylines(cb, options)` | |
| `map.draggablePolygon(polygon, cb, options)` | Engine-level. |
| `map.draggableCircle(circle, cb, options)` | Engine-level. |

### Feature picking

| Method | Engine | Notes |
| --- | --- | --- |
| `map.queryRenderedFeatures(point, options)` | MapLibre | `options.layers`, `options.filter`. Returns an array. |
| `map.onGetFeatureInfo(layer, options)` | **OpenLayers only** | WMS `GetFeatureInfo`. `beforeCallback` / `afterCallback`. On Leaflet the base class warns *"not supported by this browser"* and returns an inert listener. |
| `map.getXYFromCoordinate(coordinate)` | OpenLayers | Geographic → screen pixels. |

### Input toggles

| Method | Notes |
| --- | --- |
| `map.setDragPan(active, options)` / `map.isDragPan()` | |
| `map.setKeyboard(enabled)` / `map.getKeyboard()` | |
| `map.setZoomControl(enabled)` / `map.getZoomControl()` | |

## Notes

**Moving an object programmatically.** Dragging is user input; to reposition from code
use the setters — `map.setCoordinateMarker(marker)`, `map.setCoordinateCircle(circle)`,
`map.updatePolygonCoordinates(polygon)` — after mutating the object's coordinate. These
are engine-level methods and exist on all three engines.

### Gotchas

- **Registering `onMarker` per marker in a loop over a large set.** Thousands of individual listeners is slow. Use `onMarkers` once and branch on `evt.bemapObject`.
- **`queryRenderedFeatures` returning nothing where you can clearly see something.** It only sees *rendered* features — check the layer id, the zoom range, and any active filter. A feature hidden by `setFilter` is not there as far as this call is concerned.
- **Using `queryRenderedFeatures` on Leaflet or OpenLayers.** MapLibre only; warns once and returns an empty array.
- **Dragging with no callback.** The object moves and your model does not. The callback is where you persist the new position.
- **`onGetFeatureInfo` on Leaflet.** Not implemented — it warns and returns an inert listener. OpenLayers is the only engine with a real implementation.
- **`onGetFeatureInfo` on a layer the server will not query.** The WMS must support `GetFeatureInfo` and the layer must be queryable, or the response is empty.
- **Forgetting `evt.bemapObject` is null for map-level events.** It is only populated when the event came from an object.

## See also

- [Events](index.html#subpage-jsapi_2_0_0-js-map-events.md) — event types, `MapEvent`, error channels
- [Markers](index.html#subpage-jsapi_2_0_0-js-map-markers.md)
- [Popup](index.html#subpage-jsapi_2_0_0-js-map-popup.md) — the usual response to a click
- [Drawing](index.html#subpage-jsapi_2_0_0-js-map-draw.md) — creating geometry by hand
- [Layers](index.html#subpage-jsapi_2_0_0-js-map-layers.md) — `layerFilter` targets

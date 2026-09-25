<span class="bemap-tag">Mapping</span>

# Drawing &amp; editing

<p class="bemap-tagline">Let the user draw. Polygons, polylines, rectangles, circles and markers — created by clicking on the map, returned to you as ordinary BeMap objects.</p>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_draw","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_draw', {
        onMapReady: function(map) {
            map.defaultLayers().move(2.35, 48.85, 12);

            var out = document.getElementById('mapV2_draw_out');
            function say(t) { if (out) out.textContent = t; }

            function on(id, fn) {
                var el = document.getElementById(id);
                if (el) el.onclick = fn;
            }

            on('mapV2_draw_polygon', function() {
                say('click vertices, double-click to finish');
                map.drawPolygon({
                    style: new bemap.PolygonStyle({
                        fillColor:   new bemap.Color(0, 120, 220, 0.3),
                        borderColor: new bemap.Color(0, 80, 160, 1),
                        borderWidth: 2
                    })
                }, function(evt) {
                    say('polygon finished — ' +
                        (evt.bemapObject ? 'bemap.Polygon returned' : 'no object'));
                });
            });

            on('mapV2_draw_line', function() {
                say('click points, double-click to finish');
                map.drawPolyline({}, function() { say('polyline finished'); });
            });

            on('mapV2_draw_circle', function() {
                say('click centre, drag out the radius');
                map.drawCircle({}, function() { say('circle finished'); });
            });

            on('mapV2_draw_marker', function() {
                say('click to place a marker');
                map.drawMarker({}, function() { say('marker placed'); });
            });

            on('mapV2_draw_cancel', function() {
                map.cancelDraw();
                say('cancelled');
            });
        }
    });
});
```

<button type="button" class="btn btn-primary" id="mapV2_draw_polygon">Polygon</button>
<button type="button" class="btn btn-primary" id="mapV2_draw_line">Polyline</button>
<button type="button" class="btn btn-primary" id="mapV2_draw_circle">Circle</button>
<button type="button" class="btn btn-primary" id="mapV2_draw_marker">Marker</button>
<button type="button" class="btn btn-default" id="mapV2_draw_cancel">Cancel</button>

<p class="bemap-demo-caption"><code id="mapV2_draw_out">— pick a tool —</code>. Each drawing mode ends by calling your callback with a <code>bemap.MapEvent</code> whose <code>bemapObject</code> is the finished shape.</p>

## At a glance

<ul class="bemap-glance">
<li>Five modes: <code>drawPolygon</code>, <code>drawPolyline</code>, <code>drawRectangle</code>, <code>drawCircle</code>, <code>drawMarker</code>.</li>
<li>Each takes <code>(options, callback)</code> and returns a <code>bemap.Listener</code>.</li>
<li>The callback receives a <code>bemap.MapEvent</code>; the finished shape is <code>evt.bemapObject</code>.</li>
<li>The shape is <strong>added to the map for you</strong> by default, and polygons become editable. Pass <code>addToMap: false</code> / <code>editable: false</code> to opt out.</li>
<li><code>map.cancelDraw()</code> aborts the mode currently armed.</li>
<li><code>map.editPolygon(polygon, callback)</code> re-opens an existing polygon for vertex editing.</li>
<li><code>map.addDrawControl(options)</code> adds a ready-made toolbar instead of your own buttons.</li>
<li>Available on <strong>all three engines</strong>. Leaflet needs the bundled <code>leaflet.draw</code> plugin.</li>
</ul>

## Usage

### Drawing a shape

```js
map.drawPolygon({
    style: new bemap.PolygonStyle({
        fillColor:   new bemap.Color(0, 120, 220, 0.3),
        borderColor: new bemap.Color(0, 80, 160, 1),
        borderWidth: 2
    })
}, function(evt) {
    var polygon = evt.bemapObject;      // bemap.Polygon — ALREADY on the map
    save(polygon);
});
```

The interaction is the conventional one: click to place each vertex, double-click to
close. `drawPolyline` behaves the same way. `drawCircle` and `drawRectangle` are
click-and-drag. `drawMarker` is a single click.

The finished shape is added to the map automatically unless you pass
`addToMap: false`, and a finished polygon is also made editable unless you pass
`editable: false`:

```js
// Validate or snap the geometry before it appears
map.drawPolygon({ addToMap: false, editable: false }, function(evt) {
    var polygon = evt.bemapObject;
    if (isValid(polygon)) map.addPolygon(polygon);
});
```

The `style` option styles the **preview** as it is being drawn.

### Cancelling

```js
map.cancelDraw();
```

Arm this on the Escape key. A drawing mode left armed will swallow the next map click
and confuse the user.

### Editing an existing polygon

```js
map.editPolygon(polygon, function(evt) {
    var updated = evt.bemapObject;
    save(updated);
});
```

Puts the polygon's vertices into a draggable state. The callback fires as the geometry
changes.

### The built-in toolbar

If you would rather not build your own buttons:

```js
map.addDrawControl({
    polygon:   true,
    polyline:  true,
    rectangle: false,
    circle:    true,
    marker:    true,
    position:  'topright',
    onDrawEnd: function(evt) {
        console.log('drew', evt.bemapObject);
    }
});
```

Only `polygon` defaults to `true`; everything else is off unless you turn it on.

### The drawing lifecycle

Drawing also emits map events, which is how you drive UI that is not tied to one
particular draw call:

```js
map.on(bemap.Map.EventType.DRAWSTART, function() { setCursorBusy(true);  });
map.on(bemap.Map.EventType.DRAWEND,   function() { setCursorBusy(false); });
map.on(bemap.Map.EventType.DRAWABORT, function() { setCursorBusy(false); });
```

### Persisting what was drawn

The returned objects are ordinary BeMap geometry, so getting coordinates out is direct:

```js
map.drawPolyline({}, function(evt) {
    var coords = evt.bemapObject.getCoordinates();
    var plain  = coords.map(function(c) { return [c.getLon(), c.getLat()]; });
    postJson('/api/zones', { geometry: plain });
});
```

## Reference

### Drawing modes

Each returns a `bemap.Listener`.

Common options for every mode: `style` (preview styling), `addToMap` (default `true`),
`editable` (default `true`, polygons only).

| Method | Interaction | `evt.bemapObject` |
| --- | --- | --- |
| `map.drawPolygon(options, cb)` | click vertices, double-click to close | `bemap.Polygon` |
| `map.drawPolyline(options, cb)` | click points, double-click to end | `bemap.Polyline` |
| `map.drawRectangle(options, cb)` | click and drag | `bemap.Polygon` |
| `map.drawCircle(options, cb)` | click centre, drag radius | `bemap.Circle` |
| `map.drawMarker(options, cb)` | single click | `bemap.Marker` |

### Control

| Method | Notes |
| --- | --- |
| `map.cancelDraw()` | Aborts the armed mode. |
| `map.editPolygon(polygon, cb)` | Re-open an existing polygon for editing. |

### `map.addDrawControl(options)`

| Option | Type | Default |
| --- | --- | --- |
| `polygon` | Boolean | `true` |
| `polyline` | Boolean | `false` |
| `rectangle` | Boolean | `false` |
| `circle` | Boolean | `false` |
| `marker` | Boolean | `false` |
| `position` | String | `'topright'` — also `'topleft'`, `'bottomright'`, `'bottomleft'` |
| `onDrawEnd` | Function | Called with the finished shape. |

### Events

| Constant | Value |
| --- | --- |
| `bemap.Map.EventType.DRAWSTART` | `'drawstart'` |
| `bemap.Map.EventType.DRAWEND` | `'drawend'` |
| `bemap.Map.EventType.DRAWABORT` | `'drawabort'` |

## Notes

**The shape is added for you.** By default the finished object is placed on the map
before your callback runs, and polygons additionally enter edit mode. Applications that
want to validate or snap geometry before it appears must opt out explicitly with
`addToMap: false` (and usually `editable: false` too). Verified identical on all three
engines.

**Leaflet needs the plugin.** `leaflet.draw.js` and `leaflet.draw.css` ship in the
package. Without them the draw calls have nothing to drive and quietly do nothing.

### Gotchas

- **Leaving a mode armed.** Calling `drawPolygon` twice without an intervening finish or `cancelDraw()` leaves the map in a confusing state. Wire Escape to `cancelDraw()`.
- **Adding the shape again in your callback.** It is already on the map — a second `map.addPolygon(...)` gives you two overlapping copies. Use `addToMap: false` if you want to control placement.
- **Double-click zoom fighting the finish gesture.** Some configurations zoom on the double-click that ends a polygon. Disable double-click zoom while a draw mode is armed.
- **`drawRectangle` returning a `Polygon`.** There is no rectangle type — it is a four-corner polygon. Treat it as one.
- **Assuming the preview style carries over.** `options.style` styles the preview. Re-apply it when you construct the final object.
- **`addDrawControl` with everything default.** Only polygon is enabled; a toolbar with one button usually means the other flags were not set.

## See also

- [Interaction](index.html#subpage-jsapi_2_0_0-js-map-interaction.md) — dragging existing objects
- [Styling](index.html#subpage-jsapi_2_0_0-js-map-styling.md) — the style objects the preview takes
- [Polyline](index.html#subpage-jsapi_2_0_0-js-map-shapes.md) — the shape classes
- [Events](index.html#subpage-jsapi_2_0_0-js-map-events.md) — the `DRAW*` lifecycle
- [GeoJSON sources](index.html#subpage-jsapi_2_0_0-js-map-geojson.md) — exporting what was drawn

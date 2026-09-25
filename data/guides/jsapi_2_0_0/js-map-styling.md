<span class="bemap-tag">Mapping</span>

# Styling — lines, polygons, circles, text

<p class="bemap-tagline">The four style objects that control how your own geometry looks. Build one, hand it to the shape, done — and they behave identically on all three engines.</p>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_styling","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_styling', {
        onMapReady: function(map) {
            map.defaultLayers().move(2.35, 48.85, 12);

            var route = [
                new bemap.Coordinate(2.2945, 48.8584),
                new bemap.Coordinate(2.3376, 48.8606),
                new bemap.Coordinate(2.3499, 48.8530)
            ];

            function on(id, fn) {
                var el = document.getElementById(id);
                if (el) el.onclick = fn;
            }

            var current = null;
            function draw(style) {
                if (current) map.removePolyline(current);
                current = new bemap.Polyline(route, { style: style });
                map.addPolyline(current);
            }

            on('mapV2_styling_plain', function() {
                draw(new bemap.LineStyle({
                    color: new bemap.Color(0, 90, 200, 1),
                    width: 6,
                    type:  bemap.LineStyle.TYPE.PLANE
                }));
            });

            on('mapV2_styling_dash', function() {
                draw(new bemap.LineStyle({
                    color: new bemap.Color(220, 40, 40, 1),
                    width: 5,
                    type:  bemap.LineStyle.TYPE.DASH
                }));
            });

            on('mapV2_styling_poly', function() {
                var polygon = new bemap.Polygon(route.concat([route[0]]), {
                    style: new bemap.PolygonStyle({
                        fillColor:   new bemap.Color(0, 150, 100, 0.35),
                        borderColor: new bemap.Color(0, 90, 60, 1),
                        borderWidth: 3,
                        borderType:  bemap.PolygonStyle.TYPE.PLANE
                    })
                });
                map.addPolygon(polygon);
            });

            // Draw something on load so the map is not empty.
            draw(new bemap.LineStyle({
                color: new bemap.Color(0, 90, 200, 1),
                width: 6,
                type:  bemap.LineStyle.TYPE.PLANE
            }));
        }
    });
});
```

<button type="button" class="btn btn-primary" id="mapV2_styling_plain">Solid line</button>
<button type="button" class="btn btn-primary" id="mapV2_styling_dash">Dashed line</button>
<button type="button" class="btn btn-primary" id="mapV2_styling_poly">Filled polygon</button>

<p class="bemap-demo-caption">The same three coordinates rendered with different styles. Note the polygon's semi-transparent fill — alpha is the fourth <code>bemap.Color</code> argument, on a 0–1 scale.</p>

## At a glance

<ul class="bemap-glance">
<li><code>bemap.LineStyle</code> — <code>{ color, width, type }</code> for polylines.</li>
<li><code>bemap.PolygonStyle</code> — <code>{ fillColor, borderColor, borderWidth, borderType }</code>.</li>
<li><code>bemap.CircleStyle</code> — same shape as <code>PolygonStyle</code>.</li>
<li><code>bemap.TextStyle</code> — <code>{ color, size, offsetX, offsetY, borderColor, borderWidth }</code> for labels.</li>
<li>Dash patterns come from the shared <code>TYPE</code> enum: <code>PLANE</code>, <code>DASH</code>, <code>DOT</code>, <code>DOT_DASH</code>.</li>
<li>Colours are always <code>bemap.Color</code> objects, never CSS strings.</li>
</ul>

## Usage

### Lines

```js
var style = new bemap.LineStyle({
    color: new bemap.Color(220, 40, 40, 0.9),
    width: 5,
    type:  bemap.LineStyle.TYPE.DASH
});

map.addPolyline(new bemap.Polyline(coords, { style: style }));
```

Defaults if you omit them: black at full opacity, 3 pixels wide, solid.

### Polygons and circles

```js
var area = new bemap.PolygonStyle({
    fillColor:   new bemap.Color(0, 150, 100, 0.35),   // translucent fill
    borderColor: new bemap.Color(0, 90, 60, 1),        // opaque border
    borderWidth: 3,
    borderType:  bemap.PolygonStyle.TYPE.PLANE
});

map.addPolygon(new bemap.Polygon(coords, { style: area }));
map.addCircle(new bemap.Circle(centre, 500, { style: circleStyle }));
```

A fully opaque fill hides the map underneath. Anything meant to be read *through* wants
an alpha somewhere between 0.2 and 0.5.

### Text

```js
var label = new bemap.TextStyle({
    color:       new bemap.Color(0, 0, 0, 1),
    size:        14,
    offsetX:     0,
    offsetY:    -18,       // lift the label clear of the marker
    borderColor: new bemap.Color(255, 255, 255, 1),
    borderWidth: 2         // white halo — keeps text readable over any basemap
});
```

The border here is a **halo**, not a box. It is what makes a label legible over both a
pale field and a dark forest, and it is why the default is a 2-pixel white outline.

### Reusing style objects

Build a style once and share it across many shapes:

```js
var majorRoad = new bemap.LineStyle({ color: new bemap.Color(200, 0, 0), width: 6 });
roads.forEach(function(r) {
    map.addPolyline(new bemap.Polyline(r.coords, { style: majorRoad }));
});
```

Cheaper than constructing one per feature, and it keeps the look consistent.

### Engine-level style builders

**Only OpenLayers implements these.** On Leaflet and MapLibre all five are one-line
no-ops that ignore their arguments and return the map, so they are of no use there. You
rarely need them directly in any case — the `add*` methods do the conversion for you:

```js
// All five: real on OpenLayers, no-ops on Leaflet and MapLibre
map.buildLineStyle(style);
map.buildPolygonStyle(style);
map.buildCircleStyle(style);
map.buildTextStyle(textStyle, name);
map.buildIcon(icon);
```

### Restyling vector tiles — MapLibre

Styling *your* geometry is what this page covers. Restyling the **basemap** is a
different mechanism: the vector-tile style spec, mutated live.

```js
map.setPaintProperty('road-primary', 'line-color', '#ff0000');
map.setLayoutProperty('poi-labels', 'visibility', 'none');
map.setFilter('buildings', ['>', 'height', 20]);
map.setLayerZoomRange('poi-labels', 12, 22);
```

All four are MapLibre-only. See [Styles &amp; BeMaputnik](index.html#subpage-jsapi_2_0_0-js-tiles-styles.md).

## Reference

### `bemap.LineStyle`

| Option | Type | Default |
| --- | --- | --- |
| `color` | `bemap.Color` | black, opaque |
| `width` | Number | `3` |
| `type` | `bemap.LineStyle.TYPE` | `PLANE` |

### `bemap.PolygonStyle`

| Option | Type | Default |
| --- | --- | --- |
| `fillColor` | `bemap.Color` | black, opaque |
| `borderColor` | `bemap.Color` | black, opaque |
| `borderWidth` | Number | `3` |
| `borderType` | `bemap.PolygonStyle.TYPE` | `PLANE` |

### `bemap.CircleStyle`

Identical to `PolygonStyle`: `fillColor`, `borderColor`, `borderWidth`, `borderType`.

### `bemap.TextStyle`

| Option | Type | Default |
| --- | --- | --- |
| `color` | `bemap.Color` | black |
| `size` | Number | `1` |
| `offsetX` / `offsetY` | Number | `0` |
| `borderColor` | `bemap.Color` | white |
| `borderWidth` | Number | `2` |

### The `TYPE` enum

The same four values on `LineStyle.TYPE`, `PolygonStyle.TYPE` and `CircleStyle.TYPE`.

| Constant | Value |
| --- | --- |
| `PLANE` | `'plane'` — solid |
| `DASH` | `'dash'` |
| `DOT` | `'dot'` |
| `DOT_DASH` | `'dot dash'` |

### Style builders

| Method | Real implementation | Elsewhere |
| --- | --- | --- |
| `map.buildLineStyle(style, options)` | OpenLayers | silent no-op |
| `map.buildIcon(icon, options)` | OpenLayers | silent no-op |
| `map.buildPolygonStyle(style, options)` | OpenLayers | silent no-op |
| `map.buildCircleStyle(style, options)` | OpenLayers | silent no-op |
| `map.buildTextStyle(textStyle, name, options)` | OpenLayers | silent no-op |

On MapLibre these are defined but return `this` without reading their arguments; on
Leaflet they are not defined at all and inherit an identical no-op from `bemap.Map`.

## Notes

**`PLANE` means solid.** It is not a typo for "plain", and it is not an aviation
reference — it is the enum value for an unbroken line. Every style class uses the same
four-value enum, so a dash pattern learned in one place transfers.

### Gotchas

- **Passing a CSS string as a colour.** `color: '#ff0000'` is not a `bemap.Color`. Construct the object.
- **Alpha on the wrong scale.** `bemap.Color`'s fourth argument is 0–1. Passing `128` for half transparency gives you a clamped opaque colour.
- **Opaque polygon fills.** A default-constructed `PolygonStyle` fills solid black and hides the map. Always set `fillColor` with an alpha.
- **Mutating a shared style object after adding shapes.** Already-rendered geometry does not necessarily pick up the change; behaviour varies by engine. Build a new style and re-add instead.
- **Expecting `setPaintProperty` to affect your own geometry.** It targets style-spec layer ids in the vector basemap, not `bemap.Polyline` objects you added.
- **`TextStyle.size` default of `1`.** That is not 1 pixel of readable text on every engine — set it explicitly.

## See also

- [Helpers &amp; value types](index.html#subpage-jsapi_2_0_0-js-helpers.md) — `bemap.Color` and `bemap.Icon`
- [Polyline](index.html#subpage-jsapi_2_0_0-js-map-shapes.md) — where `LineStyle` is consumed
- [Markers](index.html#subpage-jsapi_2_0_0-js-map-markers.md) — icons and labels
- [Clustering](index.html#subpage-jsapi_2_0_0-js-map-clustering.md) — `bemap.clusterStyle`
- [Styles &amp; BeMaputnik](index.html#subpage-jsapi_2_0_0-js-tiles-styles.md) — restyling the basemap itself

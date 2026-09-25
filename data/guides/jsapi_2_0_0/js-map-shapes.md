<span class="bemap-tag">Mapping</span>

# Polyline — `bemap.Polyline`

<p class="bemap-tagline">Draw a line through a sequence of coordinates with a configurable line style. Engine-agnostic.</p>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_polyline","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_polyline', {
        onMapReady: function(map, engine) {
            map.defaultLayers();

            // Paris → Lyon → Marseille → Nice (rough hop)
            var coords = [
                new bemap.Coordinate(2.35, 48.85),
                new bemap.Coordinate(4.83, 45.75),
                new bemap.Coordinate(5.37, 43.30),
                new bemap.Coordinate(7.27, 43.71)
            ];

            // whenReady() defers until MapLibre's style is loaded — the
            // lib's addPolyline silently drops on cached-style races
            // (Leaflet / OL just run synchronously).
            bemap.docs.whenReady(map, function() {
                map.addPolyline(new bemap.Polyline(coords, {
                    style: new bemap.LineStyle({
                        color: new bemap.Color(2, 208, 255, 0.85),
                        width: 6
                    })
                }));
                bemap.docs.fitToCoords(map, coords);
            });
        }
    });
});
```
<p class="bemap-demo-caption">Four-segment polyline across France in cyan. Switch the engine to see identical rendering on Leaflet / OpenLayers / MapLibre.</p>

## At a glance

<ul class="bemap-glance">
<li>Class: <code>bemap.Polyline</code>. Constructor takes <code>(coordinates, options)</code>.</li>
<li>Style with <code>new bemap.LineStyle({ color, width, type })</code>. <code>color</code> is a numeric <code>bemap.Color(r, g, b, a)</code>.</li>
<li>Add: <code>map.addPolyline(polyline, opts?)</code> — <code>opts.layer</code> targets a specific layer.</li>
<li>Remove: <code>map.removePolyline(polyline)</code>.</li>
<li>Dash style: <code>bemap.LineStyle.TYPE.DASH</code> passed as <code>type</code>.</li>
</ul>

## Usage

```js
var coords = [
    new bemap.Coordinate(2.35, 48.85),
    new bemap.Coordinate(4.83, 45.75),
    new bemap.Coordinate(5.37, 43.30)
];

var polyline = new bemap.Polyline(coords, {
    style: new bemap.LineStyle({
        width: 10,
        color: new bemap.Color(2, 208, 255, 0.3)
        // type: bemap.LineStyle.TYPE.DASH
    })
});

map.addPolyline(polyline);
```

### Add to a named layer

```js
var vectorLayer = new bemap.VectorLayer({ name: 'routes' });
map.addLayer(vectorLayer);
map.addPolyline(polyline, { layer: vectorLayer });
```

### Remove

```js
map.removePolyline(polyline);
```

## Reference

### Constructor

```js
new bemap.Polyline(coordinates, options?)
```

| Argument | Type | Notes |
| --- | --- | --- |
| `coordinates` | `Array<bemap.Coordinate>` or `Array<{lon, lat}>` | Vertex list. Bare `{lon, lat}` objects are auto-promoted. |
| `options.style` | `bemap.LineStyle` | Width, colour, dash pattern. |

### Map methods

| Method | Notes |
| --- | --- |
| `map.addPolyline(polyline, opts?)` | `opts.layer` targets a [layer](index.html#subpage-jsapi_2_0_0-js-map-layers.md). |
| `map.removePolyline(polyline)` | |

## See also

- [Layers](index.html#subpage-jsapi_2_0_0-js-map-layers.md) — batch hide / show / clear
- [Markers](index.html#subpage-jsapi_2_0_0-js-map-markers.md)
- [Routing v2](index.html#subpage-jsapi_2_0_0-js-routing-v2.md) — service that returns a polyline you can drop directly onto the map

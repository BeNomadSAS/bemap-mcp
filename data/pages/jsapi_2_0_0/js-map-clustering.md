<span class="bemap-tag">Mapping</span>

# Clustering

<p class="bemap-tagline">Thousands of markers become a handful of readable bubbles that split apart as you zoom in. One layer type, one style object, three engines.</p>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_cluster","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_cluster', {
        onMapReady: function(map) {
            map.defaultLayers().move(2.5, 46.5, 6);

            // 300 pseudo-random points over metropolitan France.
            // Deterministic so the demo looks the same on every reload.
            var seed = 42;
            function rnd() {
                seed = (seed * 1103515245 + 12345) % 2147483648;
                return seed / 2147483648;
            }
            var points = [];
            for (var i = 0; i < 300; i++) {
                points.push(new bemap.Coordinate(
                    -4.5 + rnd() * 12.5,
                    42.5 + rnd() * 8.5
                ));
            }

            var clusterLayer = new bemap.ClusterLayer({
                name:     'demoCluster',
                distance: 50,
                style:    new bemap.clusterStyle({
                    color:       new bemap.Color(0, 150, 255, 1),
                    borderColor: new bemap.Color(255, 255, 255, 1),
                    borderSize:  3,
                    size:        22,
                    textColor:   new bemap.Color(255, 255, 255, 1),
                    // Explicit icon on purpose: the DEFAULT bemap.Icon src is an
                    // external openlayers.org URL over plain HTTP, which an HTTPS
                    // page blocks as mixed content. An inline SVG has no such issue.
                    icon: new bemap.Icon({
                        src: 'data:image/svg+xml;utf8,' + encodeURIComponent(
                            '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>'),
                        width: 1, height: 1
                    })
                })
            });
            map.addLayer(clusterLayer);

            if (map instanceof bemap.MapLibreMap) {
                // MapLibre has a native clustering path.
                map.addClusterPoints(clusterLayer, points);
            } else {
                // Leaflet / OpenLayers: add markers into the cluster layer.
                points.forEach(function(c) {
                    map.addMarker(new bemap.Marker(c), { layer: clusterLayer });
                });
            }
        }
    });
});
```

<p class="bemap-demo-caption">300 points clustered. Zoom in and the bubbles split; zoom out and they merge. The number on each bubble is how many points it stands for.</p>

## At a glance

<ul class="bemap-glance">
<li><code>bemap.ClusterLayer</code> — a layer that aggregates instead of drawing every marker.</li>
<li><code>distance</code> is the clustering radius in <strong>pixels</strong>, default <code>40</code>. Bigger radius, fewer bubbles.</li>
<li><code>bemap.clusterStyle</code> — note the <strong>lower-case c</strong> — controls bubble colour, size and label.</li>
<li>Leaflet and OpenLayers: add markers to the layer with <code>map.addMarker(marker, { layer: clusterLayer })</code>.</li>
<li>MapLibre: <code>map.addClusterPoints(layer, points, options)</code> — a native, GPU-side path.</li>
<li><code>map.defaultLayers({ markerAsCluster: true })</code> makes the default marker layer a cluster layer.</li>
</ul>

## Usage

### The quickest route

If you simply want the standard marker layer to cluster:

```js
map.defaultLayers({ markerAsCluster: true });

// Every ordinary addMarker now clusters
map.addMarker(new bemap.Marker(coord));
```

### An explicit cluster layer

```js
var clusterLayer = new bemap.ClusterLayer({
    name:     'stations',
    distance: 50
});
map.addLayer(clusterLayer);

stations.forEach(function(s) {
    map.addMarker(new bemap.Marker(new bemap.Coordinate(s.lon, s.lat)), {
        layer: clusterLayer
    });
});
```

### MapLibre's native path

MapLibre clusters in the renderer rather than in JavaScript, which is dramatically
faster for large sets:

```js
var points = data.map(function(d) {
    return new bemap.Coordinate(d.lon, d.lat);
});

map.addClusterPoints(clusterLayer, points, {
    // Optional per-point properties, index-aligned with `points`
    properties: data.map(function(d) { return { id: d.id, name: d.name }; })
});
```

`addClusterPoints` is MapLibre-only — on the other two engines it warns once and does
nothing. Use the `addMarker`-into-the-layer form there, as above.

### Styling the bubbles

```js
var style = new bemap.clusterStyle({
    color:       new bemap.Color(0, 150, 255, 1),     // bubble fill
    borderColor: new bemap.Color(255, 255, 255, 1),   // ring
    borderSize:  3,
    size:        20,                                   // bubble radius, pixels
    textColor:   new bemap.Color(255, 255, 255, 1),
    textSize:    2,
    icon:        new bemap.Icon({ src: '/img/cluster.png' })   // optional
});

var layer = new bemap.ClusterLayer({ distance: 50, style: style });
```

On MapLibre the count label needs a font the style's glyph endpoint actually serves.
Leave `textFont` unset and the SDK picks one that works; set it only if you know your
glyph endpoint has the font you are asking for.

### Tuning the radius

`distance` is in screen pixels, so its effect is zoom-independent in the way that
matters — the visual density stays roughly constant.

| `distance` | Result |
| --- | --- |
| 20–30 | Many small clusters. Good when precision matters. |
| 40 (default) | Balanced. |
| 60–80 | Few large bubbles. Good for a dense national overview. |

## Reference

### `bemap.ClusterLayer`

```js
new bemap.ClusterLayer({ name, distance, style })
```

| Option | Type | Default | Notes |
| --- | --- | --- | --- |
| `name` | String | `null` | Layer identifier. |
| `distance` | Number | `40` | Cluster radius in pixels. |
| `style` | `bemap.clusterStyle` | a default instance | Bubble appearance. |

Inherits the usual layer surface: `setVisible()`, `isVisible()`, `clear()`, `remove()`.

### `bemap.clusterStyle`

Lower-case `c` — this one is not capitalised like the other style classes.

| Option | Type | Default |
| --- | --- | --- |
| `color` | `bemap.Color` | `rgba(0, 150, 255, 1)` |
| `borderColor` | `bemap.Color` | white |
| `borderSize` | Number | `3` |
| `size` | Number | `20` |
| `textColor` | `bemap.Color` | white |
| `textSize` | Number | `2` |
| `textFont` | Array\|null | `null` — MapLibre only; the SDK picks a served font |
| `icon` | `bemap.Icon` | a default icon — whose own default `src` is an **external `openlayers.org` URL over HTTP**. Pass an explicit `icon` with your own `src`. |
| `properties` | Object | `null` |

### Methods

| Method | Engines |
| --- | --- |
| `map.addLayer(clusterLayer)` | all three |
| `map.addMarker(marker, { layer: clusterLayer })` | all three |
| `map.addClusterPoints(layer, points, options)` | **MapLibre only** |
| `map.defaultLayers({ markerAsCluster: true })` | all three |
| `clusterLayer.clear()` | all three |

## Notes

**Engine mechanics differ.** Leaflet clusters through the bundled
`leaflet.markercluster` plugin; OpenLayers has clustering built in; MapLibre clusters
inside the vector source on the GPU. Same API, three very different implementations —
which is why performance characteristics vary so much between them at high point counts.

**Point count.** Leaflet and OpenLayers do the work in JavaScript and handle a few
thousand points comfortably. Past roughly ten thousand, MapLibre's native path is not a
preference but a requirement.

### Gotchas

- **Leaving `clusterStyle.icon` unset.** It defaults to `new bemap.Icon()`, whose default `src` is `http://openlayers.org/en/v3.18.2/examples/data/icon.png` — third-party, plain HTTP, blocked as mixed content on an HTTPS page. Pass your own icon. See [Helpers &amp; value types](index.html#subpage-jsapi_2_0_0-js-helpers.md).
- **`bemap.ClusterLayer` capital C, `bemap.clusterStyle` lower-case c.** An inconsistency in the library, and an easy `undefined is not a constructor`.
- **`addClusterPoints` on Leaflet or OpenLayers.** MapLibre-only; warns once, does nothing, and you see an empty map. Add markers to the layer instead.
- **Forgetting `{ layer: clusterLayer }`.** The marker goes to the default marker layer and does not cluster.
- **Mixing both approaches on MapLibre.** Either `addClusterPoints` or `addMarker`-into-the-layer, not both — you will get two overlapping representations.
- **Missing `leaflet.markercluster.js`.** `map.addLayer(clusterLayer)` constructs `L.MarkerClusterGroup` with no guard, so an absent plugin throws `TypeError: L.MarkerClusterGroup is not a constructor` and aborts the call. It does not degrade to plain markers.
- **A `distance` so large everything is one bubble.** If you see a single bubble at every zoom, the radius is too big for your data's spread.
- **Setting `textFont` to a font the glyph endpoint lacks.** The count label disappears on MapLibre. Leave it `null` unless you are sure.

## See also

- [Layers](index.html#subpage-jsapi_2_0_0-js-map-layers.md) — `bemap.VectorLayer` and layer management
- [Markers](index.html#subpage-jsapi_2_0_0-js-map-markers.md)
- [Heatmap](index.html#subpage-jsapi_2_0_0-js-map-heatmap.md) — the other way to show density
- [Styling](index.html#subpage-jsapi_2_0_0-js-map-styling.md)
- [Choosing an engine](index.html#subpage-jsapi_2_0_0-js-map-engines.md)

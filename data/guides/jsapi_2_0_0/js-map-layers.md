<span class="bemap-tag">Mapping</span>

# Layers — `bemap.VectorLayer`, `bemap.ClusterLayer`

<p class="bemap-tagline">Group overlays under named layers so you can hide, show, clear, or remove them as a batch. Cluster layers automatically aggregate nearby markers.</p>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_layers","run":true,"hide":true}}
$(document).ready(function() {
    var SAMPLE_POINTS = [
        { lon: 2.35,  lat: 48.85 }, { lon: 4.83,  lat: 45.75 },
        { lon: 5.37,  lat: 43.30 }, { lon: 3.88,  lat: 43.61 },
        { lon: -1.55, lat: 47.22 }, { lon: 7.27,  lat: 43.71 },
        { lon: 4.39,  lat: 50.85 }, { lon: -0.58, lat: 44.84 },
        { lon: 1.44,  lat: 43.60 }, { lon: 5.04,  lat: 47.32 },
        { lon: 3.07,  lat: 50.63 }, { lon: 6.18,  lat: 48.69 },
        { lon: -1.68, lat: 48.11 }, { lon: 4.07,  lat: 49.26 }
    ];

    bemap.docs.attachDemo('mapV2_layers', {
        onMapReady: function(map) {
            map.defaultLayers().move(2.5, 46.5, 6);
            var layer = null;

            // .onclick assignment REPLACES any prior handler — no stacking
            // when the page is rebuilt on engine switch.
            function on(id, fn) {
                var el = document.getElementById(id);
                if (el) el.onclick = fn;
            }

            on('mapV2_layers_create', function() {
                if (layer) {
                    // Layer exists — empty the existing markers then re-add,
                    // so clicking Create twice doesn't stack 28 markers.
                    layer.clear();
                } else {
                    layer = new bemap.VectorLayer({ name: 'sampleLayer' });
                    map.addLayer(layer);
                }
                SAMPLE_POINTS.forEach(function(p) {
                    map.addMarker(
                        new bemap.Marker(new bemap.Coordinate(p.lon, p.lat)),
                        { layer: layer }
                    );
                });
            });
            on('mapV2_layers_clear', function() {
                if (layer) layer.clear();
            });
            on('mapV2_layers_remove', function() {
                // Workaround for a MapLibre-backend gap in the lib: that
                // engine's removeLayer requires layer._maplibreId which is
                // never set for VectorLayer. Calling clear() first does the
                // marker-removal portion uniformly across all 3 engines.
                if (layer) {
                    layer.clear();
                    map.removeLayer(layer);
                    layer = null;
                }
            });
            on('mapV2_layers_show', function() { if (layer) layer.setVisible(true);  });
            on('mapV2_layers_hide', function() { if (layer) layer.setVisible(false); });
        }
    });
});
```

<button type="button" class="btn btn-primary" id="mapV2_layers_create">Create</button>
<button type="button" class="btn btn-primary" id="mapV2_layers_clear">Clear</button>
<button type="button" class="btn btn-primary" id="mapV2_layers_remove">Remove</button>
<button type="button" class="btn btn-primary" id="mapV2_layers_show">Show</button>
<button type="button" class="btn btn-primary" id="mapV2_layers_hide">Hide</button>

<p class="bemap-demo-caption">Click <b>Create</b> — 14 markers added to a named <code>VectorLayer</code>. <b>Hide</b> / <b>Show</b> toggle visibility on the current markers. <b>Clear</b> empties the layer (markers gone — click Create to repopulate, then Hide/Show again). <b>Remove</b> drops the layer entirely.</p>

## At a glance

<ul class="bemap-glance">
<li><code>bemap.VectorLayer</code> — generic named layer for markers / polylines / polygons.</li>
<li><code>bemap.ClusterLayer</code> — aggregates nearby markers; <code>distance</code> option controls cluster radius in pixels.</li>
<li>Default layers are pre-created by <code>map.defaultLayers()</code>: <code>MARKER</code>, <code>POLYGON</code>, <code>CIRCLE</code>, <code>ROUTE</code>, <code>POLYLINE</code>.</li>
<li>Per-layer state: <code>.setVisible(boolean)</code>, <code>.isVisible()</code>, <code>.clear()</code>.</li>
<li>Map-level: <code>map.addLayer(layer)</code>, <code>map.removeLayer(layer)</code>.</li>
</ul>

## Usage

### Default layers

`map.defaultLayers()` pre-creates one named layer per overlay type. Access via `bemap.Map.DEFAULT_LAYER.*`:

```js
bemap.Map.DEFAULT_LAYER.MARKER
bemap.Map.DEFAULT_LAYER.POLYGON
bemap.Map.DEFAULT_LAYER.CIRCLE
bemap.Map.DEFAULT_LAYER.ROUTE
bemap.Map.DEFAULT_LAYER.POLYLINE
```

### Add a custom layer

```js
var vectorLayer = new bemap.VectorLayer({ name: 'myMarkers' });
map.addLayer(vectorLayer);

var clusterLayer = new bemap.ClusterLayer({ name: 'myCluster', distance: 40 });
map.addLayer(clusterLayer);

map.addMarker(marker, { layer: vectorLayer });
map.addMarker(marker, { layer: clusterLayer });
```

### Visibility, clear, remove

```js
vectorLayer.isVisible();         // → Boolean
vectorLayer.setVisible(false);   // hide
vectorLayer.setVisible(true);    // show
vectorLayer.clear();             // drop all overlays from this layer
map.removeLayer(vectorLayer);    // drop the layer itself
```

## Reference

### `bemap.VectorLayer`

```js
new bemap.VectorLayer({ name: 'myLayer' })
```

| Option | Type | Notes |
| --- | --- | --- |
| `name` | String | Identifier — useful for `map.removeLayer(name)`. |

### `bemap.ClusterLayer`

```js
new bemap.ClusterLayer({ name: 'myCluster', distance: 40 })
```

| Option | Type | Notes |
| --- | --- | --- |
| `name` | String | |
| `distance` | Number | Cluster radius in pixels. Default ≈ 60. |

### Map methods

| Method | Notes |
| --- | --- |
| `map.addLayer(layer)` | |
| `map.removeLayer(layer)` | |
| `map.refreshLayer(layer)` | Force a re-render (mainly for WMS layers). |

### Layer methods

| Method | Notes |
| --- | --- |
| `layer.isVisible()` | |
| `layer.setVisible(boolean)` | |
| `layer.clear()` | Drops overlays from the layer; layer itself stays. |

## See also

- [Markers](index.html#subpage-jsapi_2_0_0-js-map-markers.md)
- [Polyline](index.html#subpage-jsapi_2_0_0-js-map-shapes.md)
- [Display map (Leaflet)](index.html#subpage-jsapi_2_0_0-js-map-leaflet.md), [(OpenLayers)](index.html#subpage-jsapi_2_0_0-js-map-openlayers.md), [(MapLibre)](index.html#subpage-jsapi_2_0_0-js-map-maplibre.md)

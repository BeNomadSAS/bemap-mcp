<span class="bemap-tag">Mapping</span>

# Markers — `bemap.Marker`

<p class="bemap-tagline">Drop a point on the map. Works identically on Leaflet, OpenLayers, and MapLibre — switch the engine in the sidebar and watch the same code render.</p>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_markers","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_markers', {
        onMapReady: function(map, engine) {
            map.defaultLayers();

            var coords = [
                [2.35, 48.85],  // Paris
                [4.83, 45.75],  // Lyon
                [5.37, 43.30],  // Marseille
                [-1.55, 47.22]  // Nantes
            ];
            coords.forEach(function(c) {
                var marker = new bemap.Marker(new bemap.Coordinate(c[0], c[1]));
                marker.on(bemap.Map.EventType.CLICK, function(ev) {
                    console.log('marker click at:', ev.coordinate);
                });
                map.addMarker(marker);
            });
            bemap.docs.fitToCoords(map, coords);
        }
    });
});
```
<p class="bemap-demo-caption">Four city markers. Click any one — console logs the coordinate. Switch the engine in the sidebar to see the same code on Leaflet / OpenLayers / MapLibre.</p>

## At a glance

<ul class="bemap-glance">
<li>Class: <code>bemap.Marker</code>. Constructed with a <code>bemap.Coordinate</code> + optional options.</li>
<li>Add: <code>map.addMarker(marker, opts?)</code> — <code>opts.layer</code> places it on a specific layer.</li>
<li>Remove: <code>map.removeMarker(marker)</code>.</li>
<li>Click events: <code>marker.on(bemap.Map.EventType.CLICK, callback)</code>.</li>
<li>Custom icon: pass <code>{ icon: new bemap.Icon({src, …}) }</code> to the constructor.</li>
</ul>

## Usage

```js
var icon = new bemap.Icon({
    src: 'images/map-marker-blue.svg',
    anchorX: 0.26,
    anchorY: 0.9,
    height: 36,
    width: 32,
    anchorXUnits: 'fraction',
    anchorYUnits: 'fraction',
    scale: 1.3
});

var marker = new bemap.Marker(new bemap.Coordinate(2.35, 48.85), {
    icon: icon,
    id: 1,
    properties: { html: '<p>html</p>', info: 'info' }
});

map.addMarker(marker);

marker.on(bemap.Map.EventType.CLICK, function(ev) {
    console.log(ev.bemapObject);   // the marker
    console.log(ev.coordinate);    // bemap.Coordinate
});
```

### On a specific layer

```js
// `layer` must be a LAYER INSTANCE — a bemap.VectorLayer or bemap.ClusterLayer.
// Anything else (a name string, an undefined property) is silently ignored and
// the marker lands on the default MARKER layer instead.
var myLayer = new bemap.VectorLayer({ name: 'myMarkers' });
map.addLayer(myLayer);

map.addMarker(marker, { layer: myLayer });
map.removeMarker(marker, { layer: myLayer });

// Retrieve one you created earlier, or a default layer, by name:
var markerLayer = map.getLayerByName(bemap.Map.DEFAULT_LAYER.MARKER);
```

## Reference

### Constructor

```js
new bemap.Marker(coordinate, options?)
```

| Argument | Type | Notes |
| --- | --- | --- |
| `coordinate` | `bemap.Coordinate` | Position. |
| `options` | Object | `{ icon?, id?, properties? }` |

### Map methods

| Method | Notes |
| --- | --- |
| `map.addMarker(marker, opts?)` | `opts.layer` to target a specific [layer](index.html#subpage-jsapi_2_0_0-js-map-layers.md). |
| `map.removeMarker(marker, opts?)` | |

### Events

| Event | Notes |
| --- | --- |
| `bemap.Map.EventType.CLICK` | Fired with `{ coordinate, bemapObject }`. |

## See also

- [Display map (Leaflet)](index.html#subpage-jsapi_2_0_0-js-map-leaflet.md)
- [Display map (OpenLayers)](index.html#subpage-jsapi_2_0_0-js-map-openlayers.md)
- [Display map (MapLibre)](index.html#subpage-jsapi_2_0_0-js-map-maplibre.md)
- [Layers](index.html#subpage-jsapi_2_0_0-js-map-layers.md) — add markers to a named layer for batch hide / show / clear
- [Popup](index.html#subpage-jsapi_2_0_0-js-map-popup.md)

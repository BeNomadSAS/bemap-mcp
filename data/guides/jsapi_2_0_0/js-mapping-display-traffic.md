<span class="bemap-tag">Mapping</span>

# Traffic overlay — `bemap.BemapLayer`

<p class="bemap-tagline">Live traffic colour-coded over the map. Single WMS layer rendered by the BeMap server — works on Leaflet and OpenLayers; MapLibre uses its own vector-tile path.</p>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_traffic","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_traffic', {
        onMapReady: function(map, engine) {
            map.defaultLayers().move(2.5, 46.5, 6);

            // Live-traffic WMS layer — green / yellow / orange / red road
            // colouring. Identical shape to v1's `BemapLayer` traffic demo;
            // `image/png24` is what the server expects for this style.
            var trafficLayer = new bemap.BemapLayer({
                name:      'trafficWms',
                geoserver: bemapMainCtx.geoserver,
                styles:    'traffic',
                format:    'image/png24'
            });
            map.addLayer(trafficLayer);
        }
    });
});
```
<p class="bemap-demo-caption">Live-traffic WMS rendered over France. Traffic tiles refresh on map pan / zoom; call <code>map.refreshLayer(layer)</code> to force a reload.</p>

## At a glance

<ul class="bemap-glance">
<li>Class: <code>bemap.BemapLayer</code> — a single WMS layer styled <code>'traffic'</code>.</li>
<li>Construct with <code>{ name, geoserver, styles, format }</code> — <code>styles: 'traffic'</code> selects the live-traffic colouring.</li>
<li>Add: <code>map.addLayer(layer)</code>. Refresh: <code>map.refreshLayer(layer)</code>.</li>
<li>Toggle visibility: <code>layer.setVisible(true / false)</code>, <code>layer.isVisible()</code>.</li>
<li>Tile format options: <code>'image/png24'</code> (default), <code>'image/png'</code>, etc.</li>
</ul>

## Usage

```js
var trafficLayer = new bemap.BemapLayer({
    name:      'trafficWms',
    geoserver: ctx.geoserver,
    styles:    'traffic',
    format:    'image/png24'
});

map.addLayer(trafficLayer);
```

### Refresh manually

```js
map.refreshLayer(trafficLayer);
```

### Auto-refresh every 60 s

```js
function reloadTraffic() {
    if (!trafficLayer.isVisible()) return;
    map.refreshLayer(trafficLayer);
}
setInterval(reloadTraffic, 60000);
```

## Reference

### Constructor

```js
new bemap.BemapLayer(options)
```

| Option | Type | Notes |
| --- | --- | --- |
| `name` | String | Layer name — useful for `removeLayer(name)`. |
| `geoserver` | String | Usually `ctx.geoserver`. |
| `styles` | String | `'traffic'` for live traffic. |
| `format` | String | Tile format. `'image/png24'` by default. |
| `transparent` | Boolean | |

### Map methods

| Method | Notes |
| --- | --- |
| `map.addLayer(layer)` | |
| `map.removeLayer(layer)` | |
| `map.refreshLayer(layer)` | Force a tile refresh — call from your refresh button or `setInterval`. |

### Layer methods

| Method | Notes |
| --- | --- |
| `layer.setVisible(boolean)` | |
| `layer.isVisible()` | |

## See also

- [Layers](index.html#subpage-jsapi_2_0_0-js-map-layers.md) — manage multiple layers on the map
- [Display map (Leaflet)](index.html#subpage-jsapi_2_0_0-js-map-leaflet.md)
- [Display map (OpenLayers)](index.html#subpage-jsapi_2_0_0-js-map-openlayers.md)

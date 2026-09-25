<span class="bemap-tag">Mapping</span>

# Popup — `bemap.Popup`

<p class="bemap-tagline">Anchored HTML bubble at a coordinate. Engine-agnostic — same construction works on Leaflet, OpenLayers, and MapLibre.</p>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_popup","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_popup', {
        onMapReady: function(map, engine) {
            map.defaultLayers();

            // Open a popup on every map click.
            map.on(bemap.Map.EventType.CLICK, function(ev) {
                var p = ev.coordinate;
                map.addPopup(new bemap.Popup({
                    coordinate: p,
                    visible: true,
                    information: '<b>Click</b><br>lon: ' + p.getLon().toFixed(4) +
                                 '<br>lat: ' + p.getLat().toFixed(4)
                }));
            });

            // Show one example popup on Paris at load.
            var paris = new bemap.Coordinate(2.35, 48.85);
            map.addPopup(new bemap.Popup({
                coordinate: paris,
                visible: true,
                information: '<b>Paris</b><br>2.35, 48.85'
            }));
            bemap.docs.fitToCoords(map, [paris], { zoom: 12 });
        }
    });
});
```
<p class="bemap-demo-caption">A popup appears on Paris at load — click anywhere on the map to drop another. Coordinates rendered as HTML inside the bubble.</p>

## At a glance

<ul class="bemap-glance">
<li>Class: <code>bemap.Popup</code>. Constructor takes <code>{ coordinate, information, visible }</code>.</li>
<li><code>information</code> accepts HTML — sanitise inputs before passing user-supplied data.</li>
<li>Add: <code>map.addPopup(popup)</code>. Remove: <code>map.removePopup(popup)</code>. Clear all: <code>map.clearPopup()</code>.</li>
<li>Common UI: open popup on map click — wire via <code>map.on(bemap.Map.EventType.CLICK, ...)</code>.</li>
</ul>

## Usage

```js
var coord = new bemap.Coordinate(2.35, 48.85);

var popup = new bemap.Popup({
    coordinate: coord,
    visible: true,
    information: '<p>lon: ' + coord.getLon() + '</p><p>lat: ' + coord.getLat() + '</p>'
});

map.addPopup(popup);

// Remove one
map.removePopup(popup);

// Clear all
map.clearPopup();
```

### Open on map click

```js
map.on(bemap.Map.EventType.CLICK, function(ev) {
    var p = ev.coordinate;
    map.addPopup(new bemap.Popup({
        coordinate: p,
        visible: true,
        information: '<p>lon: ' + p.getLon() + '</p><p>lat: ' + p.getLat() + '</p>'
    }));
});
```

## Reference

### Constructor

```js
new bemap.Popup(options)
```

| Option | Type | Notes |
| --- | --- | --- |
| `coordinate` | `bemap.Coordinate` | Anchor point. |
| `information` | String (HTML) | Inner content. |
| `visible` | Boolean | Render immediately. Default `true`. |

### Map methods

| Method | Notes |
| --- | --- |
| `map.addPopup(popup)` | |
| `map.removePopup(popup)` | |
| `map.clearPopup()` | Clears every popup on the map. |

## See also

- [Markers](index.html#subpage-jsapi_2_0_0-js-map-markers.md) — open a popup on marker click
- [Display map (Leaflet)](index.html#subpage-jsapi_2_0_0-js-map-leaflet.md)
- [Display map (OpenLayers)](index.html#subpage-jsapi_2_0_0-js-map-openlayers.md)
- [Display map (MapLibre)](index.html#subpage-jsapi_2_0_0-js-map-maplibre.md)

<span class="bemap-tag">Mapping</span>

# GeoJSON sources

<p class="bemap-tagline">Push a GeoJSON <code>FeatureCollection</code> straight into MapLibre as a named source, style it with the style spec, and update it in place without a rebuild.</p>

<div class="bemap-callout">
<strong>MapLibre only, and it fails <em>silently</em>.</strong> <code>addGeoJsonSource</code>, <code>updateGeoJsonSource</code>, <code>addImage</code>, <code>removeImage</code> and <code>queryRenderedFeatures</code> are plain no-ops on Leaflet and OpenLayers — no console warning, no error. (Only <code>setPaintProperty</code>, <code>setLayoutProperty</code>, <code>setFilter</code> and <code>setLayerZoomRange</code> warn.) On those engines, convert the GeoJSON into <code>bemap.Marker</code> / <code>bemap.Polyline</code> / <code>bemap.Polygon</code> objects — <a href="#leafletandopenlayers">shown below</a>.
</div>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_geojson","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_geojson', {
        onMapReady: function(map) {
            map.defaultLayers().move(2.35, 48.855, 13);

            var collection = {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: { name: 'Louvre' },
                        geometry: { type: 'Point', coordinates: [2.3376, 48.8606] }
                    },
                    {
                        type: 'Feature',
                        properties: { name: 'Notre-Dame' },
                        geometry: { type: 'Point', coordinates: [2.3499, 48.8530] }
                    },
                    {
                        type: 'Feature',
                        properties: { name: 'Seine' },
                        geometry: {
                            type: 'LineString',
                            coordinates: [
                                [2.3200, 48.8580], [2.3376, 48.8570],
                                [2.3499, 48.8530], [2.3650, 48.8510]
                            ]
                        }
                    }
                ]
            };

            if (map instanceof bemap.MapLibreMap) {
                map.addGeoJsonSource('demo-src', collection);
            } else {
                // Portable fallback: build BeMap objects from the same data.
                collection.features.forEach(function(f) {
                    if (f.geometry.type === 'Point') {
                        var c = f.geometry.coordinates;
                        map.addMarker(new bemap.Marker(new bemap.Coordinate(c[0], c[1])));
                    } else if (f.geometry.type === 'LineString') {
                        map.addPolyline(new bemap.Polyline(
                            f.geometry.coordinates.map(function(p) {
                                return new bemap.Coordinate(p[0], p[1]);
                            })
                        ));
                    }
                });
            }
        }
    });
});
```

<p class="bemap-demo-caption">The same <code>FeatureCollection</code> rendered two ways — as a native MapLibre source, or converted to BeMap objects on the other engines.</p>

## At a glance

<ul class="bemap-glance">
<li><code>map.addGeoJsonSource(id, data)</code> — register a named source. MapLibre only.</li>
<li><code>map.updateGeoJsonSource(id, data)</code> — replace its contents in place. No teardown, no flicker.</li>
<li>GeoJSON coordinates are <code>[longitude, latitude]</code> — the same order <code>bemap.Coordinate</code> uses.</li>
<li>A source holds data; <em>drawing</em> it means adding style-spec layers that reference the source id.</li>
<li>Style those layers with <code>setPaintProperty</code>, <code>setLayoutProperty</code>, <code>setFilter</code>.</li>
<li><code>map.queryRenderedFeatures(point, { layers: [...] })</code> reads features back out.</li>
</ul>

## Usage

### Adding a source

```js
map.addGeoJsonSource('stations', {
    type: 'FeatureCollection',
    features: stations.map(function(s) {
        return {
            type: 'Feature',
            properties: { id: s.id, name: s.name, kW: s.power },
            geometry: { type: 'Point', coordinates: [s.lon, s.lat] }
        };
    })
});
```

Anything you might later want to filter or label on belongs in `properties` — it is the
only thing the style spec can see.

### Updating in place

```js
setInterval(function() {
    fetchLatest().then(function(collection) {
        map.updateGeoJsonSource('stations', collection);
    });
}, 30000);
```

This is the reason to use a source rather than individual markers for live data:
replacing the payload is far cheaper than removing and re-adding hundreds of objects,
and it does not flicker.

### Filtering and restyling

```js
map.setFilter('stations-circles', ['>', 'kW', 50]);
map.setPaintProperty('stations-circles', 'circle-color', '#0066cc');
map.setLayoutProperty('stations-labels', 'visibility', 'none');
map.setLayerZoomRange('stations-labels', 12, 22);
```

These operate on style-spec **layer ids**, not on the source id and not on BeMap
objects.

### Reading features back

```js
map.on(bemap.Map.EventType.CLICK, function(evt) {
    var hits = map.queryRenderedFeatures({ x: evt.x, y: evt.y }, {
        layers: ['stations-circles']
    });
    if (hits.length) {
        showPopup(hits[0].properties.name, evt.getCoordinate());
    }
});
```

### Leaflet and OpenLayers

No GeoJSON source concept — convert to BeMap objects. A reusable loader:

```js
function loadGeoJson(map, collection, layer) {
    collection.features.forEach(function(f) {
        var g = f.geometry;
        if (g.type === 'Point') {
            map.addMarker(
                new bemap.Marker(new bemap.Coordinate(g.coordinates[0], g.coordinates[1])),
                { layer: layer }
            );
        } else if (g.type === 'LineString') {
            map.addPolyline(new bemap.Polyline(toCoords(g.coordinates)), { layer: layer });
        } else if (g.type === 'Polygon') {
            // Outer ring only; holes need engine-specific handling
            map.addPolygon(new bemap.Polygon(toCoords(g.coordinates[0])), { layer: layer });
        }
    });
}

function toCoords(pairs) {
    return pairs.map(function(p) { return new bemap.Coordinate(p[0], p[1]); });
}
```

Put them in a named layer and `layer.clear()` becomes your update mechanism.

### Exporting

The shape classes hand back coordinate arrays, so producing GeoJSON is direct:

```js
function polylineToFeature(polyline, props) {
    return {
        type: 'Feature',
        properties: props || {},
        geometry: {
            type: 'LineString',
            coordinates: polyline.getCoordinates().map(function(c) {
                return [c.getLon(), c.getLat()];
            })
        }
    };
}
```

`getLonLatArrays()` on `bemap.Polyline` and `bemap.Polygon` returns the same nesting
directly, if you would rather not map by hand.

## Reference

### Methods

| Method | Engine | Notes |
| --- | --- | --- |
| `map.addGeoJsonSource(id, data)` | **MapLibre only** | Registers a named source. |
| `map.updateGeoJsonSource(id, data)` | **MapLibre only** | Replaces the data in place. |
| `map.queryRenderedFeatures(point, options)` | **MapLibre only** | Reads rendered features. |
| `map.setPaintProperty(layerId, name, value)` | **MapLibre only** | |
| `map.setLayoutProperty(layerId, name, value)` | **MapLibre only** | |
| `map.setFilter(layerId, filter)` | **MapLibre only** | |
| `map.setLayerZoomRange(layerId, min, max)` | **MapLibre only** | |
| `map.addImage(id, image)` / `map.removeImage(id)` | **MapLibre only** | Sprites for symbol layers. |

### Geometry mapping for the portable path

| GeoJSON type | BeMap class |
| --- | --- |
| `Point` | `bemap.Marker` |
| `MultiPoint` | `bemap.MultiMarker` |
| `LineString` | `bemap.Polyline` |
| `Polygon` | `bemap.Polygon` (outer ring) |
| `MultiLineString` / `MultiPolygon` | loop and add one object per part |

### Shape → coordinates

| Method | Returns |
| --- | --- |
| `polyline.getCoordinates()` | array of `bemap.Coordinate` |
| `polyline.getLonLatArrays()` | `[[lon, lat], …]` |
| `polyline.getLatLonArrays()` | `[[lat, lon], …]` |
| `polygon.getCoordinates()` | array of `bemap.Coordinate` |

## Notes

**A source is not a layer.** `addGeoJsonSource` makes the data available; it does not
draw anything on its own. Drawing requires style-spec layers referencing the source id.
If you add a source and see nothing, that is why — this is MapLibre's model, not a bug.

**Coordinate order.** GeoJSON mandates `[longitude, latitude]`, which is the same order
BeMap uses. If your data came from a lat-first API, swap it once on the way in rather
than compensating everywhere.

### Gotchas

- **`addGeoJsonSource` on Leaflet or OpenLayers.** Does nothing, and says nothing — there is no warning to spot in the console. Feature-detect with `map instanceof bemap.MapLibreMap` and use the conversion path.
- **Adding a source and expecting it to render.** Add style layers too.
- **Properties left out.** `setFilter` and label expressions can only see `properties`. Data outside it is invisible to the style spec.
- **Rebuilding the source on every update.** `updateGeoJsonSource` exists precisely to avoid that.
- **Polygons with holes on the portable path.** `coordinates[0]` is the outer ring; inner rings need engine-specific handling and the simple loop above drops them.
- **Very large collections on Leaflet/OpenLayers.** Converting 50k features into individual objects will not perform. That is MapLibre territory.
- **`queryRenderedFeatures` returning nothing.** It only sees *rendered* features — check the layer id, zoom range and any active filter.

## See also

- [Display map (MapLibre)](index.html#subpage-jsapi_2_0_0-js-map-maplibre.md)
- [Interaction](index.html#subpage-jsapi_2_0_0-js-map-interaction.md) — `queryRenderedFeatures` in context
- [Styling](index.html#subpage-jsapi_2_0_0-js-map-styling.md) — style-spec mutation versus object styling
- [Clustering](index.html#subpage-jsapi_2_0_0-js-map-clustering.md) — clustering a point source
- [Drawing](index.html#subpage-jsapi_2_0_0-js-map-draw.md) — producing geometry to export
- [Layers](index.html#subpage-jsapi_2_0_0-js-map-layers.md)

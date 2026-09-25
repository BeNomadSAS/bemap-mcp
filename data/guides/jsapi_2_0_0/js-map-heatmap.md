<span class="bemap-tag">Mapping</span>

# Heatmap

<p class="bemap-tagline">Density as colour. Where clustering counts points, a heatmap shows concentration — and the API differs meaningfully between MapLibre and the other two engines.</p>

<div class="bemap-callout">
<strong>The signature is not the same on every engine.</strong> MapLibre takes a <code>bemap.HeatmapLayer</code>; Leaflet and OpenLayers take a raw data array plus options. This is the one place in the mapping API where portable code needs a branch — see <a href="#thecrossenginesplit">The cross-engine split</a>.
</div>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_heatmap","run":true,"hide":true}}
// Pinned to MapLibre: heatmap is native there. On Leaflet it needs the
// `leaflet.heat` plugin, which this portal does not ship — the sidebar engine
// selector would give you an empty map. See "Point formats differ" below for
// the Leaflet / OpenLayers path.
var map = new bemap.MapLibreMap(bemapTilesCtx, 'mapV2_heatmap');
bemap['miniweb'].onChangeGeoserver(function(gs) { map.switchBackgroundLayer(gs); });

bemap.docs.whenReady(map, function() {
    try {
        if (map.native.getLayer('background')) {
            map.native.setLayerZoomRange('background', 0, 24);
        }
    } catch (e) {}
    try { map.native._fadeDuration = 50; } catch (e) {}

    map.move(2.35, 48.86, 11);

    // Deterministic pseudo-random points clustered around Paris.
    var seed = 7;
    function rnd() {
        seed = (seed * 1103515245 + 12345) % 2147483648;
        return seed / 2147483648;
    }
    var points = [];
    for (var i = 0; i < 400; i++) {
        points.push({
            lon:    2.30 + (rnd() - 0.5) * 0.18,
            lat:    48.86 + (rnd() - 0.5) * 0.10,
            weight: rnd()
        });
    }

    map.addHeatmap(new bemap.HeatmapLayer({
        points:    points,
        radius:    28,
        intensity: 1,
        opacity:   0.85
    }));
});
```

<p class="bemap-demo-caption">400 weighted points around Paris — blue is sparse, red is dense. Always MapLibre here, because heatmap is native on that engine; the sidebar engine selector does not apply. Leaflet needs the <code>leaflet.heat</code> plugin, which this portal does not load, and OpenLayers needs a different point format — both are covered below.</p>

## At a glance

<ul class="bemap-glance">
<li><code>bemap.HeatmapLayer</code> — MapLibre. Carries the points and the gradient.</li>
<li><strong>The point format differs by engine.</strong> MapLibre wants <code>{ lon, lat, weight }</code>; Leaflet and OpenLayers want <code>[lon, lat, weight]</code> triples and <strong>silently discard</strong> <code>{ lon, lat, weight }</code> objects. See <a href="#pointformatsdiffer">Point formats differ</a>.</li>
<li><code>radius</code> (default <code>20</code>) is the influence of each point in pixels — the main visual control.</li>
<li><code>colors</code> is the gradient ramp, low density first. Default runs transparent blue → red.</li>
<li>MapLibre: <code>addHeatmap(layer)</code>, <code>updateHeatmap(layer, data)</code>, <code>removeHeatmap(layer)</code>.</li>
<li>Leaflet / OpenLayers: <code>addHeatmap(dataArray, options)</code>, <code>removeHeatmap(id)</code>.</li>
</ul>

## Usage

### MapLibre

```js
var layer = new bemap.HeatmapLayer({
    points: [
        { lon: 2.3522, lat: 48.8566, weight: 1.0 },
        { lon: 2.3400, lat: 48.8600, weight: 0.4 }
    ],
    radius:    30,
    intensity: 1,
    opacity:   0.85,
    colors:    ['rgba(0,0,255,0)', 'royalblue', 'cyan', 'lime', 'yellow', 'red']
});

map.addHeatmap(layer);
```

Refresh without rebuilding — the efficient path for live data:

```js
map.updateHeatmap(layer, newPoints);
```

Remove it:

```js
map.removeHeatmap(layer);
```

### Leaflet and OpenLayers

```js
// [lon, lat, weight] triples — NOT {lon, lat, weight} objects
map.addHeatmap([
    [2.3522, 48.8566, 1.0],
    [2.3400, 48.8600, 0.4]
], { radius: 30, opacity: 0.85 });
```

The array is passed directly and the call returns the map. To remove, pass the id the
engine assigned:

```js
map.removeHeatmap('heatmap-1');
```

Leaflet requires the `leaflet.heat` plugin (`L.heatLayer`). If it is not on the page,
`addHeatmap` prints a warning and returns without drawing.

### Point formats differ

This is the trap on this page, and it fails silently.

| Engine | Accepted point shapes |
| --- | --- |
| **MapLibre** | `{ lon, lat, weight }` on a `bemap.HeatmapLayer` |
| **Leaflet / OpenLayers** | `[lon, lat, weight]` array · `{ lat, lng, value }` object · an object with `getLatitude()` / `getLongitude()` |

Leaflet and OpenLayers normalise each point through a three-branch test and **drop
anything that matches none of them**. A `{ lon, lat, weight }` object matches none — it
is not an array, it has no `lng`, and it has no `getLatitude` — so every point is
discarded, the heatmap renders empty, and *nothing warns*: the warning path only fires
when the array itself is empty or the plugin is missing.

Note the key names: those engines want `lng` and `value`, not `lon` and `weight`.

### The cross-engine split

Write it once, branch where it matters:

```js
function showHeatmap(map, points, opts) {
    // `points` in the canonical {lon, lat, weight} shape
    if (map instanceof bemap.MapLibreMap) {
        var layer = new bemap.HeatmapLayer({
            points:  points,
            radius:  opts.radius,
            opacity: opts.opacity
        });
        map.addHeatmap(layer);
        return layer;                   // remove with map.removeHeatmap(layer)
    }
    // Leaflet / OpenLayers: convert to triples or the points are dropped
    return map.addHeatmap(points.map(function(p) {
        return [p.lon, p.lat, p.weight];
    }), opts);                          // remove with map.removeHeatmap(id)
}
```

### Weighting

`weight` decides how much each point contributes. Without it every point counts as 1
and the map shows pure point density.

```js
// Charging stations weighted by power output
var points = stations.map(function(s) {
    return { lon: s.lon, lat: s.lat, weight: s.kW / 350 };
});
```

Keep weights in a sensible range — roughly 0–1. Large values saturate the ramp and the
whole map goes red.

### The colour ramp

```js
colors: [
    'rgba(0,0,255,0)',   // lowest density — transparent, so the map shows through
    'royalblue',
    'cyan',
    'lime',
    'yellow',
    'red'                // highest density
]
```

The array is interpolated evenly across the density range. The first entry should be
transparent; if it is opaque, the entire map is tinted even where there is no data.

## Reference

### `bemap.HeatmapLayer` — MapLibre

```js
new bemap.HeatmapLayer({ points, weightProperty, radius, intensity, colors, opacity })
```

| Option | Type | Default | Notes |
| --- | --- | --- | --- |
| `points` | Array | `[]` | `{ lon, lat, weight }` objects. MapLibre only — the other engines take a different shape, see above. |
| `weightProperty` | String | `'weight'` | Property name to read the weight from. |
| `radius` | Number | `20` | Influence radius, pixels. |
| `intensity` | Number | `1` | Global multiplier. |
| `colors` | Array | blue → red | Gradient ramp, low density first. |
| `opacity` | Number | `0.8` | Layer opacity. |

### Methods

| Method | Engine | Argument |
| --- | --- | --- |
| `map.addHeatmap(layer)` | MapLibre | `bemap.HeatmapLayer` |
| `map.updateHeatmap(layer, data)` | **MapLibre only** | new point array |
| `map.removeHeatmap(layer)` | MapLibre | the layer |
| `map.addHeatmap(data, options)` | Leaflet, OpenLayers | raw array + options |
| `map.removeHeatmap(id)` | Leaflet, OpenLayers | the assigned id |

## Notes

**Heatmap or clustering?** A heatmap answers *"where is the concentration?"*; clustering
answers *"how many, and exactly where?"*. Heatmaps read well zoomed out and lose meaning
zoomed in — there is no density to speak of at street level. Clusters stay useful at
every zoom and can be clicked. For a dashboard overview, heatmap; for something the user
will drill into, clusters.

**`radius` is the control that matters.** Too small and you get disconnected dots; too
large and everything smears into one blob. Tune it against your data's actual spread
rather than copying a number.

### Gotchas

- **Using `{ lon, lat, weight }` on Leaflet or OpenLayers.** Every point is silently discarded and the heatmap renders empty, with no warning. Convert to `[lon, lat, weight]` triples. This is the most common failure on this page.
- **Passing `bemap.Coordinate` objects as points.** A `Coordinate` has no `weight` and its `lon`/`lat` are internal fields — convert explicitly.
- **Calling `addHeatmap(layer)` on Leaflet or OpenLayers.** They expect an array. Passing a `HeatmapLayer` gives you nothing on screen and no useful error.
- **`updateHeatmap` on Leaflet or OpenLayers.** MapLibre-only; warns once. Remove and re-add there.
- **Missing `leaflet.heat`.** `addHeatmap` on Leaflet warns *"only available with bemap.MapLibreMap"* and no-ops. The message is misleading — the real cause is the absent plugin.
- **An opaque first colour.** Tints the entire map. Keep the ramp's first entry transparent.
- **Unbounded weights.** A single point with `weight: 10000` flattens everything else to blue.
- **Expecting removal by id on MapLibre.** It takes the layer object, not an id.

## See also

- [Clustering](index.html#subpage-jsapi_2_0_0-js-map-clustering.md) — the countable alternative
- [Layers](index.html#subpage-jsapi_2_0_0-js-map-layers.md)
- [Choosing an engine](index.html#subpage-jsapi_2_0_0-js-map-engines.md) — where the signatures diverge
- [GeoJSON sources](index.html#subpage-jsapi_2_0_0-js-map-geojson.md) — feeding data in
- [Display map (MapLibre)](index.html#subpage-jsapi_2_0_0-js-map-maplibre.md)

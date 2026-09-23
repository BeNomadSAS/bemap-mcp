<span class="bemap-tag">Mapping</span>

# 3D &amp; terrain

<p class="bemap-tagline">Extruded buildings, elevated terrain, sky and lighting. Tilt the camera and the map stops being a picture of a place and starts being the place.</p>

<div class="bemap-callout">
<strong>MapLibre only.</strong> Every method on this page is MapLibre-exclusive. Some warn once on the other engines; <code>setTerrain</code>, <code>removeTerrain</code> and <code>setSky</code> fail <strong>silently</strong> there. Either way nothing crashes — and nothing happens.
</div>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_3d","run":true,"hide":true}}
// Always MapLibre on this page — the sidebar engine selector does not apply,
// because every method demonstrated here is MapLibre-only.
var map = new bemap.MapLibreMap(bemapTilesCtx, 'mapV2_3d');

bemap.docs.whenReady(map, function() {
    try {
        if (map.native.getLayer('background')) {
            map.native.setLayerZoomRange('background', 0, 24);
        }
    } catch (e) {}
    try { map.native._fadeDuration = 50; } catch (e) {}

    map.move(2.3376, 48.8606, 16);

    function on(id, fn) {
        var el = document.getElementById(id);
        if (el) el.onclick = fn;
    }

    on('mapV2_3d_tilt', function() {
        map.setPitch(60);
        map.setBearing(-20);
    });

    on('mapV2_3d_buildings', function() {
        map.setPitch(60);
        map.add3DBuildings({
            color:   '#b0b8c4',
            opacity: 0.85,
            minZoom: 14          // camelCase Z — 'minzoom' is ignored
        });
    });

    on('mapV2_3d_light', function() {
        map.setLight({
            anchor:    'viewport',
            color:     'white',
            intensity: 0.75,
            position:  [1.15, 210, 30]
        });
    });

    on('mapV2_3d_reset', function() {
        map.remove3DBuildings();
        map.setPitch(0);
        map.setBearing(0);
    });
});
```

<button type="button" class="btn btn-primary" id="mapV2_3d_tilt">Tilt camera</button>
<button type="button" class="btn btn-primary" id="mapV2_3d_buildings">3D buildings</button>
<button type="button" class="btn btn-primary" id="mapV2_3d_light">Relight</button>
<button type="button" class="btn btn-default" id="mapV2_3d_reset">Reset</button>

<p class="bemap-demo-caption">Always MapLibre on this page — the sidebar engine selector does not apply. Centred on the Louvre at zoom 16. Buildings need both a pitch and zoom 14 or above to be visible: flat and zoomed out, there is nothing to see.</p>

## At a glance

<ul class="bemap-glance">
<li><code>map.setPitch(0–85)</code> — tilt. Nothing 3D reads properly at pitch 0.</li>
<li><code>map.add3DBuildings(options)</code> / <code>map.remove3DBuildings()</code> — extruded building footprints.</li>
<li><code>map.setTerrain(options)</code> / <code>map.removeTerrain()</code> — real elevation from a DEM source.</li>
<li><code>map.setSky(options)</code> — atmosphere. Pass nothing to remove it.</li>
<li><code>map.setLight(options)</code> — direction, colour and intensity of the light on extrusions.</li>
<li><code>bemap.BuildingsLayer</code> exists but is <strong>inert</strong> — nothing consumes it. Use <code>add3DBuildings()</code>.</li>
</ul>

## Usage

### Tilt first

```js
map.setPitch(60);       // degrees, 0–85
map.setBearing(-20);    // rotate for a better angle on the extrusions
```

Everything else on this page depends on this. At pitch 0 you are looking straight down
and a 3D building is a footprint.

### 3D buildings

```js
map.add3DBuildings({
    color:   '#b0b8c4',
    opacity: 0.85,
    minZoom: 14          // camelCase Z
});
```

Remove them with `map.remove3DBuildings()`.

The building data has to come from somewhere. The defaults line up with the shipped
style; against a different vector source, name it explicitly:

```js
map.add3DBuildings({
    sourceId:           'my-vector-source',
    sourceLayer:        'building',
    heightProperty:     'render_height',      // feature property holding the height
    baseHeightProperty: 'render_min_height',  // feature property holding the base
    minZoom:            14                    // camelCase Z
});
```

Mind the exact spelling: it is `sourceId` (not `source`), `heightProperty` (not
`height`), `baseHeightProperty` (not `base`) and `minZoom` (not `minzoom`). Anything
else is read as `undefined` and silently falls back to the default. There is no
`layerId` option — the style layer's id is always generated internally.

### `bemap.BuildingsLayer` — do not use

The class exists and constructs cleanly, which makes it look like a declarative
alternative. It is not: nothing in the library ever consumes it. `map.addLayer()`
dispatches on `BemapLayer`, `WmsLayer`, `ClusterLayer`, `VectorTileLayer`, `VectorLayer`
and `OsmLayer` — a `BuildingsLayer` matches none of those branches, so it is recorded as
an inert bookkeeping object and **no buildings are ever rendered**. Verified against
2.0.2: the class name appears three times in the whole bundle — its comment, its
constructor, and its `inherits` call.

`map.add3DBuildings(options)` is the only working path. The constructor is shown here
only so the class is recognisable when you meet it:

```js
var buildings = new bemap.BuildingsLayer({
    sourceId:           'composite',
    sourceLayer:        'building',
    heightProperty:     'height',
    baseHeightProperty: 'min_height',
    color:              '#aaa',
    opacity:            0.6,
    minZoom:            14
});
```

### Terrain

Real elevation, as opposed to extruded buildings. Needs a raster-DEM source in the style:

```js
map.setTerrain({
    source:       'terrain-dem',
    exaggeration: 1.5      // >1 dramatises relief; 1 is true-to-life
});

map.removeTerrain();
```

Exaggeration between 1.2 and 2 usually reads best — true-scale relief looks flatter than
people expect.

### Sky and atmosphere

```js
map.setSky({
    'sky-color':               '#199EF3',
    'sky-horizon-blend':       0.5,
    'horizon-color':           '#ffffff',
    'horizon-fog-blend':       0.5,
    'fog-color':               '#0000ff',
    'fog-ground-blend':        0.5
});

map.setSky();      // no argument → removes the sky entirely
```

Passing no argument really does remove it. An earlier version of the library coerced
`null` into an empty object, which set an empty sky rather than disabling one; that is
fixed in 2.0.

### Lighting

```js
map.setLight({
    anchor:    'viewport',      // or 'map' — whether light follows the camera
    color:     'white',
    intensity: 0.5,
    position:  [1.15, 210, 30]  // [radial, azimuth°, polar°]
});
```

Calling `setLight()` with no argument applies `bemap.MapLibreMap.DEFAULT_LIGHT`, the
values shown above.

`setLight` mutates only the light. It does **not** re-apply the whole style — worth
knowing, because the naive implementation of this (set the whole style back) wipes every
layer, source, marker and polyline you have added.

## Reference

### Camera

| Method | Notes |
| --- | --- |
| `map.setPitch(pitch)` / `map.getPitch()` | 0–85 degrees. |
| `map.setBearing(bearing)` / `map.getBearing()` | 0–360 degrees. |

### 3D buildings

`map.add3DBuildings(options)`

| Option | Type | Default | Notes |
| --- | --- | --- | --- |
| `sourceId` | String | — | Vector source id. Omit and no `source` is set on the layer. |
| `sourceLayer` | String | — | Layer within that source. |
| `heightProperty` | String | `'height'` | Feature property holding building height. |
| `baseHeightProperty` | String | `'min_height'` | Feature property holding base height. |
| `color` | String | `'#aaa'` | CSS colour. |
| `opacity` | Number | `0.6` | 0–1. |
| `minZoom` | Number | — | Below this zoom, nothing is drawn. **camelCase.** |

There is **no `layerId` option** — the created style layer's id is always generated
internally. `map.remove3DBuildings()` removes it.

### `bemap.BuildingsLayer` — non-functional

Nothing consumes this class; adding one renders nothing. Listed for recognition only.

| Option | Type | Default |
| --- | --- | --- |
| `sourceId` | String | `null` |
| `sourceLayer` | String | `null` |
| `heightProperty` | String | `'height'` |
| `baseHeightProperty` | String | `'min_height'` |
| `color` | String | `'#aaa'` |
| `opacity` | Number | `0.6` |
| `minZoom` | Number | `2` — inherited from `bemap.Layer`; the class's own JSDoc claims `14` and is wrong |

### Terrain, sky, light

| Method | Notes |
| --- | --- |
| `map.setTerrain(options)` | `{ source, exaggeration }`. Needs a raster-DEM source. |
| `map.removeTerrain()` | |
| `map.setSky(options)` | Style-spec sky object. No argument removes it. |
| `map.setLight(options)` | `{ anchor, color, intensity, position }`. |
| `bemap.MapLibreMap.DEFAULT_LIGHT` | `{ anchor: 'viewport', color: 'white', intensity: 0.5, position: [1.15, 210, 30] }` |

### Effects

3D features register as named effects, so you can inspect and tear them down centrally:

```js
map.getActiveEffects();     // e.g. ['terrain', 'setSky', 'spinGlobe']
map.clearAllEffects();
map.onEffectChange(function(e) { console.log(e.name, e.active); });
```

## Notes

**Sky, light and the globe.** `setSky` and `setLight` emit a `REQUIRES_GLOBE` hint when
the map is on the mercator projection, where their effect is largely invisible. It is a
hint, not an error — the library deliberately does **not** switch you to globe, because
silently changing the projection under an application would be worse than a warning. The
hint arrives as a one-time `console.info`; there is no public event to subscribe to in
2.0.2 (see [Map errors](index.html#subpage-jsapi_2_0_0-js-map-events.md)). Switch to
globe yourself if you want the effect.

**Performance.** Extruded buildings across a wide viewport are expensive. `minzoom: 14`
is not arbitrary — it keeps thousands of extrusions off screen when zoomed out.

### Gotchas

- **3D at pitch 0.** The most common "it doesn't work". Tilt first.
- **Omitting `minZoom` and expecting a default of 14.** `add3DBuildings` only applies a minimum zoom when you pass one, so leaving it out means no zoom gate at all — buildings are attempted at every zoom. Pass `minZoom: 14` if you want the usual behaviour.
- **Using `bemap.BuildingsLayer`.** It renders nothing; use `add3DBuildings()`.
- **`setTerrain` with no DEM source in the style.** Silently does nothing — the error is swallowed. Confirm the style has a `raster-dem` source.
- **Expecting `setSky(null)` to disable in older builds.** Fixed in 2.0; call with no argument.
- **Any of this on Leaflet or OpenLayers.** Warns once, no-ops. Feature-detect with `map instanceof bemap.MapLibreMap`.
- **`setLight` used to wipe the map.** No longer — but if you are on an older build and your markers vanish when you relight, that is the cause.
- **Exaggeration set very high.** Above about 3 the terrain becomes spikes and labels start floating oddly.

## See also

- [Globe projection](index.html#subpage-jsapi_2_0_0-js-map-globe.md) — where sky and light really pay off
- [Camera &amp; viewport](index.html#subpage-jsapi_2_0_0-js-map-camera.md) — pitch and bearing
- [Animation](index.html#subpage-jsapi_2_0_0-js-map-animation.md) — orbiting a 3D scene
- [Display map (MapLibre)](index.html#subpage-jsapi_2_0_0-js-map-maplibre.md)
- [Styles &amp; BeMaputnik](index.html#subpage-jsapi_2_0_0-js-tiles-styles.md) — sources available in the shipped style
- [Choosing an engine](index.html#subpage-jsapi_2_0_0-js-map-engines.md)

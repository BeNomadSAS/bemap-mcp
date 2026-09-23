<span class="bemap-tag">Mapping</span>

# Globe projection

<p class="bemap-tagline">Render the world as a sphere instead of a rectangle. One call switches projection; the rest of your code does not change.</p>

<div class="bemap-callout">
<strong>MapLibre only.</strong> <code>setProjection</code>, <code>spinGlobe</code> and <code>stopSpinGlobe</code> are MapLibre-exclusive. <code>spinGlobe</code> and <code>stopSpinGlobe</code> warn once on the other engines; <code>setProjection</code> is a <strong>completely silent</strong> no-op there — no warning at all.
</div>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_globe","run":true,"hide":true}}
// Always MapLibre on this page — globe is a MapLibre-only projection.
var map = new bemap.MapLibreMap(bemapTilesCtx, 'mapV2_globe');

bemap.docs.whenReady(map, function() {
    try {
        if (map.native.getLayer('background')) {
            map.native.setLayerZoomRange('background', 0, 24);
        }
    } catch (e) {}
    try { map.native._fadeDuration = 50; } catch (e) {}

    map.move(2.5, 46.5, 2);

    var spinner = null;

    function on(id, fn) {
        var el = document.getElementById(id);
        if (el) el.onclick = fn;
    }

    on('mapV2_globe_on', function() {
        map.setProjection('globe');
        map.move(2.5, 46.5, 2);
    });

    on('mapV2_globe_off', function() {
        if (spinner) { spinner.stop(); spinner = null; }
        map.setProjection('mercator');
    });

    on('mapV2_globe_spin', function() {
        map.setProjection('globe');
        spinner = map.spinGlobe({ speed: 0.08 });
    });

    on('mapV2_globe_stop', function() {
        map.stopSpinGlobe();
        spinner = null;
    });

    on('mapV2_globe_sky', function() {
        map.setProjection('globe');
        map.setSky({
            'sky-color':         '#199EF3',
            'sky-horizon-blend': 0.5,
            'horizon-color':     '#ffffff',
            'horizon-fog-blend': 0.5
        });
    });
});
```

<button type="button" class="btn btn-primary" id="mapV2_globe_on">Globe</button>
<button type="button" class="btn btn-primary" id="mapV2_globe_spin">Spin</button>
<button type="button" class="btn btn-default" id="mapV2_globe_stop">Stop</button>
<button type="button" class="btn btn-primary" id="mapV2_globe_sky">Add sky</button>
<button type="button" class="btn btn-default" id="mapV2_globe_off">Back to flat</button>

<p class="bemap-demo-caption">Always MapLibre here. The globe reads best at low zoom — past roughly zoom 6 the curvature is no longer visible and the projection behaves like mercator.</p>

## At a glance

<ul class="bemap-glance">
<li><code>map.setProjection('globe')</code> — sphere. <code>map.setProjection('mercator')</code> — flat.</li>
<li>The choice <strong>survives style swaps</strong>: the SDK remembers it and re-applies after a <code>setStyle</code>.</li>
<li><code>map.spinGlobe({ speed })</code> — auto-rotate. Returns a handle with <code>stop()</code> and <code>resume()</code>.</li>
<li><code>map.stopSpinGlobe()</code> — stop it from anywhere, without the handle.</li>
<li><code>setSky</code> and <code>setLight</code> are designed for globe; on mercator they emit a <code>REQUIRES_GLOBE</code> hint.</li>
<li>Globe registers as an effect — it appears in <code>map.getActiveEffects()</code>.</li>
</ul>

## Usage

### Switching projection

```js
map.setProjection('globe');
map.setProjection('mercator');
```

Any value other than `'globe'` is treated as `'mercator'`, so a typo lands you flat
rather than in an error state.

### Why it survives a style swap

Loading a style normally resets the projection to whatever the style declares. The SDK
records your explicit choice and re-applies it after every style load, so this works as
you would expect:

```js
map.setProjection('globe');
map.setStyle(someOtherStyle);      // still a globe afterwards
```

There is no public `getProjection()` — track the current state yourself if your UI needs
to show it.

### Spinning

```js
var spinner = map.spinGlobe({ speed: 0.08 });   // degrees per tick

spinner.stop();
spinner.resume();

map.stopSpinGlobe();      // equivalent, and reachable without the handle
```

The default speed is `0.3` degrees, advanced every 50 ms — a full rotation in about a
minute. `0.08` is a gentler "attract mode" for a dashboard; much above the default looks
frantic and fights tile loading.

Calling `spinGlobe` twice does not stack: it stops the existing spin first.

### Atmosphere

The globe is where sky and lighting earn their keep:

```js
map.setProjection('globe');
map.setSky({
    'sky-color':         '#199EF3',
    'sky-horizon-blend': 0.5,
    'horizon-color':     '#ffffff',
    'horizon-fog-blend': 0.5,
    'fog-color':         '#0000ff',
    'fog-ground-blend':  0.5
});
map.setLight({ anchor: 'map', intensity: 0.6 });
```

Call these **after** switching to globe. On mercator they log a one-time
`REQUIRES_GLOBE` hint to the console and have little visible effect — the library
deliberately does not switch projection for you.

### Cleaning up

```js
map.stopSpinGlobe();
map.setProjection('mercator');

// or, to tear down every registered effect at once
map.clearAllEffects();
```

## Reference

| Method | Notes |
| --- | --- |
| `map.setProjection(type)` | `'globe'` or `'mercator'`. Anything else means mercator. |
| `map.spinGlobe(options)` | `{ speed }`, default `0.3` deg per 50 ms tick. Returns `{ stop(), resume() }`. |
| `map.stopSpinGlobe()` | Stops the spin. |
| `map.setSky(options)` | Atmosphere. No argument removes it. |
| `map.setLight(options)` | Lighting. |
| `map.getActiveEffects()` | Includes `'spinGlobe'` while spinning. |
| `map.clearAllEffects()` | Tears down globe spin, sky, terrain, 3D buildings, animations. |

`setProjection`, `spinGlobe`, `stopSpinGlobe`, `setSky` and `setLight` are MapLibre-only.
`getActiveEffects()` and `clearAllEffects()` are **not** — they live on `bemap.Map` and
work on every engine.

## Notes

**When a globe is the right choice.** Genuinely global data — flight networks,
worldwide coverage maps, anything where mercator's polar distortion misleads. For a
national or city-level application it is decoration, and it costs you the familiar
rectangular layout users navigate by reflex.

**Zoom and curvature.** Globe reads at zoom 0–5. Past about zoom 6 MapLibre's globe
behaves essentially like mercator and the sphere is no longer perceptible.

### Gotchas

- **Calling `setSky` before `setProjection('globe')`.** The hint fires and the effect is invisible. Switch first.
- **Looking for `getProjection()`.** It does not exist as a public method. Keep your own flag.
- **Expecting the `REQUIRES_GLOBE` hint to switch projection.** It will not — by design. Silently changing projection under an application would be worse than a warning.
- **Spinning while the user is interacting.** The spin keeps moving the centre and fights their panning. Stop it on first interaction.
- **A fast spin over slow tiles.** The globe outruns tile loading and shows blank sectors. Keep the speed modest.
- **Leaving a spin running on an unmounted map.** The interval keeps firing. Call `stopSpinGlobe()` or `clearAllEffects()` in your teardown.
- **`setProjection` on Leaflet or OpenLayers.** Silently does nothing — no warning, no error. Feature-detect with `map instanceof bemap.MapLibreMap` rather than waiting for a console message that never comes.

## See also

- [3D &amp; terrain](index.html#subpage-jsapi_2_0_0-js-map-3d.md) — sky, light, buildings
- [Animation](index.html#subpage-jsapi_2_0_0-js-map-animation.md) — camera orbits and tours
- [Camera &amp; viewport](index.html#subpage-jsapi_2_0_0-js-map-camera.md)
- [Display map (MapLibre)](index.html#subpage-jsapi_2_0_0-js-map-maplibre.md)
- [Choosing an engine](index.html#subpage-jsapi_2_0_0-js-map-engines.md)

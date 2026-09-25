# 3D map with MapLibre + BeNomad vector tiles

Render the BeNomad vector basemap (PMTiles) through `bemap.MapLibreMap` — the v2 lib's WebGL engine. JWT auth, PMTiles range fetching, and the browser tile cache are handled by the lib; the customer code below is a complete copy-paste template.

<div class="bemap-callout">
<strong>Credentials.</strong> This portal's demos authenticate with a shared demo account against the beta tiles host, configured in <code>context.js</code>. It is for the demos on this site only — use your own credentials in your application, and never ship them to a production browser. See <a href="index.html#subpage-jsapi_2_0_0-authentication.md">Authentication</a> and <a href="index.html#subpage-jsapi_2_0_0-the-context.md">The Context</a> for the full field list.
</div>

Try the BeMap-tile-only knobs below — they all run against the same vector basemap on the map.

<div style="display:flex; flex-wrap:wrap; gap:8px; margin:12px 0;">
    <button type="button" class="btn btn-primary"  id="btnGlobeToggle">Toggle globe projection</button>
    <button type="button" class="btn btn-primary"  id="btnSpinGlobe">Spin globe</button>
    <button type="button" class="btn btn-primary"  id="btnStopSpin">Stop spin</button>
    <button type="button" class="btn btn-primary"  id="btn3DBuildings">Toggle 3D buildings</button>
    <button type="button" class="btn btn-primary"  id="btnSky">Toggle atmosphere</button>
    <button type="button" class="btn btn-primary"  id="btnFlyLyon">Fly to Lyon</button>
    <button type="button" class="btn btn-primary"  id="btnFlyNice">Fly to Nice</button>
    <button type="button" class="btn btn-default"  id="btnClearCache">Clear tile cache</button>
</div>

## JavaScript

```
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":false}}
$(document).ready(function() {
    // bemapTilesCtx is declared in context.js; the portal fills in its
    // tilesHost and authentication at startup from the BeMap session.
    // In your own app, build it explicitly:
    //
    //   var ctx = new bemap.Context({
    //       host:         'bemap-beta.benomad.com',
    //       secure:       true,
    //       login:        '<your-login>',
    //       password:     '<your-password>',
    //       tilesHost:    'mptiles-api.benomad.net',   // production
    //       tokenStorage: 'sessionStorage'   // or 'localStorage' / 'memory'
    //   });

    var map = new bemap.MapLibreMap(bemapTilesCtx, 'map1', {
        zoom:    6,
        pitch:   45,
        bearing: -15
    });

    // Portal only: follow the sidebar Geo-server selector.
    bemap['miniweb'].onChangeGeoserver(function(gs) { map.switchBackgroundLayer(gs); });

    // MapLibre defers source/layer ops until the style is loaded.
    // bemap.docs.whenReady wraps that with a 250 ms safety net for cached
    // style.json resolves that don't re-fire the 'load' event.
    bemap.docs.whenReady(map, function() {
        map.move(2.5, 46.5, 6);

        // BeNomad style paints the background from zoom 10 — fill at every
        // zoom so there's no transparent canvas when zooming out.
        try {
            if (map.native.getLayer('background')) {
                map.native.setLayerZoomRange('background', 0, 24);
            }
        } catch (e) {}

        // Engine-agnostic overlays — same API on Leaflet / OL / MapLibre.
        map.addMarker(new bemap.Marker(new bemap.Coordinate(2.35, 48.85)));
        map.addPolyline(new bemap.Polyline(
            [new bemap.Coordinate(2.35, 48.85), new bemap.Coordinate(4.83, 45.75)],
            { style: new bemap.LineStyle({ color: new bemap.Color(31, 119, 180), width: 5 }) }
        ));
        map.addPopup(new bemap.Popup({
            coordinate:  new bemap.Coordinate(2.35, 48.85),
            visible:     true,
            information: '<b>Paris</b>'
        }));
    });

    // ------------------------------------------------------------------
    // Per-button BeMap-tile feature toggles
    // ------------------------------------------------------------------

    // Globe projection — flip 'mercator' ↔ 'globe' at runtime.
    var globeOn = false;
    $('#btnGlobeToggle').on('click', function() {
        globeOn = !globeOn;
        bemap.docs.whenReady(map, function() {
            map.setProjection(globeOn ? 'globe' : 'mercator');
        });
    });

    // Animated spin around the current centre — globe-only.
    $('#btnSpinGlobe').on('click', function() {
        bemap.docs.whenReady(map, function() {
            if (!globeOn) { map.setProjection('globe'); globeOn = true; }
            map.spinGlobe({ secondsPerRevolution: 60 });
        });
    });
    $('#btnStopSpin').on('click', function() {
        if (typeof map.stopSpinGlobe === 'function') map.stopSpinGlobe();
    });

    // 3D buildings — extruded polygons from the BeNomad tiles.
    var buildingsLayerId = null;
    $('#btn3DBuildings').on('click', function() {
        bemap.docs.whenReady(map, function() {
            if (buildingsLayerId) {
                map.remove3DBuildings({ layerId: buildingsLayerId });
                buildingsLayerId = null;
            } else {
                buildingsLayerId = map.add3DBuildings({ minZoom: 14, opacity: 0.85 });
                map.flyTo(2.295, 48.873, 16);   // Arc de Triomphe area — best 3D building density
            }
        });
    });

    // Atmosphere — sky / horizon haze on top of the vector basemap.
    var skyOn = false;
    $('#btnSky').on('click', function() {
        bemap.docs.whenReady(map, function() {
            if (skyOn) {
                map.setSky(null);
            } else {
                map.setSky({
                    'sky-color':       '#82cfff',
                    'horizon-color':   '#ffefd5',
                    'fog-color':       '#fff8e7',
                    'sky-horizon-blend': 0.6,
                    'horizon-fog-blend': 0.5,
                    'fog-ground-blend':  0.3
                });
            }
            skyOn = !skyOn;
        });
    });

    // Smooth animated camera moves — better than .move() for showcase.
    $('#btnFlyLyon').on('click', function() { map.flyTo(4.83, 45.75, 11, { duration: 2500 }); });
    $('#btnFlyNice').on('click', function() { map.flyTo(7.27, 43.71, 12, { duration: 2500 }); });

    // Clear the local Service-Worker tile cache (forces fresh downloads).
    $('#btnClearCache').on('click', function() {
        if (typeof map.clearBrowserCache !== 'function') return;
        var btn = $(this);
        var prev = btn.text();
        btn.text('Clearing…').prop('disabled', true);
        Promise.resolve(map.clearBrowserCache()).then(function() {
            btn.text('Cache cleared');
            setTimeout(function() { btn.text(prev).prop('disabled', false); }, 1500);
        });
    });
});
```

## HTML

```
{"bemap":{"language":"xml"}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="dist/maplibre-gl.css">
    <link rel="stylesheet" href="dist/bemap-js-api.css">
    <script src="dist/maplibre-gl.js"></script>
    <script src="dist/pmtiles.js"></script>
    <script src="dist/bemap-js-api.min.js"></script>
    <script src="context.js"></script>
</head>
<body>
    <div id="map1" style="height: 500px;"></div>
</body>
</html>
```

Also copy `dist/bemap-sw-tiles.js` to the **root of the page that serves your map** (not under `dist/`). The Service Worker's scope is bounded by its script location, so placing it next to your HTML grants it the right scope to intercept PMTiles range requests.

## BeMap-tile features at a glance

| Feature | API | Notes |
| --- | --- | --- |
| 3D pitch | `pitch: 0..60` (constructor) or `map.setPitch(deg)` | Default 0. Combine with `bearing` for a full 3D view. |
| Bearing (rotation) | `bearing` (constructor) or `map.setBearing(deg)` / `map.rotation(deg)` | Degrees, 0 = north. |
| Globe projection | `map.setProjection('globe' \| 'mercator')` | Re-apply after a style reload. |
| Spin globe | `map.spinGlobe({ secondsPerRevolution })` / `map.stopSpinGlobe()` | Animates rotation around the current centre. Globe-only. |
| 3D buildings | `map.add3DBuildings(opts)` / `map.remove3DBuildings({ layerId })` | Extrudes building polygons from the BeNomad tiles. Best at zoom 14+. |
| Atmosphere / sky | `map.setSky({ 'sky-color', 'horizon-color', 'fog-color', ... })` / `map.setSky(null)` | Adds haze + horizon gradient on top of the vector basemap. |
| Terrain (DEM) | `map.setTerrain({ source, exaggeration })` / `map.removeTerrain()` | Requires a DEM raster source — see [Web — PMTiles](index.html#subpage-jsapi_2_0_0-js-tiles-web-pmtiles.md). |
| Camera animation | `map.flyTo(lon, lat, zoom, opts?)` / `map.easeTo(opts)` / `map.cameraTour(opts)` | Smooth animated moves. `cameraTour` chains multi-stop transitions. |
| Runtime style swap | `map.setStyle(urlOrObject)` | Replace the BeNomad default with a custom style. Overlays are replayed automatically. |
| Per-layer paint / layout | `map.setPaintProperty(layerId, name, value)` / `map.setLayoutProperty(...)` | Re-colour or hide individual basemap layers at runtime. |
| Tile cache | `map.enableBrowserCache()` / `disableBrowserCache()` / `clearBrowserCache()` | Service-Worker-backed cache for PMTiles range requests. |
| Token | `map.getToken()` / `map.isTokenValid()` / `map.refreshToken()` | JWT introspection — for diagnostics. |

## Construction options at a glance

| Option | Default | Notes |
| --- | --- | --- |
| `pitch` | `0` | 0–60° tilt. Set to `45` for an oblique 3D view. |
| `bearing` | `0` | Map rotation in degrees. |
| `projection` | `'mercator'` | `'globe'` activates the 3D-globe projection. |
| `browserCache` | `'auto'` | `true` / `false` / `'auto'` (enabled on HTTPS or localhost). |
| `serviceWorkerPath` | `'/bemap-sw-tiles.js'` | Path to the SW. Override when the file isn't at the server root. |
| `tilesHost` (on `Context`) | — | Required for BeNomad PMTiles. Sets the host for tile range requests. |
| `tokenStorage` (on `Context`) | `'sessionStorage'` | JWT cache backend: `'sessionStorage'` / `'localStorage'` / `'memory'`. |
| `tiles` / `tilesStyle` | — | Custom PMTiles URL + paired style. See [Web — PMTiles](index.html#subpage-jsapi_2_0_0-js-tiles-web-pmtiles.md). |
| `style` | (server default — tiny fallback first, then the live charte from the Worker) | Pass a custom style spec or URL to replace the default. |

## See also

- [`bemap.MapLibreMap` reference](index.html#subpage-jsapi_2_0_0-js-map-maplibre.md) — full method surface (heatmap, clustering, sky, terrain, animation, 3D buildings).
- [Cache, slices & resilience](index.html#subpage-jsapi_2_0_0-js-tiles-cache.md) — `bemap.TilesAuth` + `bemap.BrowserCache` deep-dive.
- [The Context](index.html#subpage-jsapi_2_0_0-the-context.md) — `tilesHost`, `tokenStorage`, all Context fields.
- [Authentication](index.html#subpage-jsapi_2_0_0-authentication.md) — credentials, JWT flow.
- [Error handling](index.html#subpage-jsapi_2_0_0-error-handling.md) — `bemap.Error` codes.

For the WMS-raster Leaflet / OL / MapLibre template via the JS API, see [Map display using BeMap JS API](index.html#page-examples-mapping-display-bemap-api.md).

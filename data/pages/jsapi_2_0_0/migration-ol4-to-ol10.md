<span class="bemap-tag">Migration</span>

# OpenLayers 4 → 10

<p class="bemap-tagline">v2 ships OpenLayers 10.8. If your application was built against the OpenLayers 4 generation, this is what changes — and, more usefully, what does not.</p>

<div class="bemap-callout">
<strong>If you only ever called BeMap methods, there is nothing to do.</strong> Swap the bundled <code>ol.js</code>, keep your code. The work on this page is only for applications that reached past the SDK into OpenLayers itself through <code>map.native</code>.
</div>

## At a glance

<ul class="bemap-glance">
<li>v2 bundles <strong>OpenLayers 10.8.0</strong>. Read it at runtime from <code>bemap.olVersion</code>.</li>
<li><code>bemap.OlMap</code> is the class to use. <code>bemap.Ol3Map</code> still exists and still works — it now extends <code>OlMap</code>.</li>
<li>The BeMap API surface over OpenLayers is <strong>unchanged</strong>: same markers, polylines, popups, events, drawing.</li>
<li>What breaks is direct OpenLayers use — <code>map.native</code>, <code>ol.*</code> globals, custom <code>ol.style</code> objects.</li>
<li>OpenLayers 10 is ES modules upstream; the bundled build still exposes the <code>ol</code> global, so <code>&lt;script&gt;</code> tags keep working.</li>
</ul>

## Usage

### The minimum migration

Replace the OpenLayers files with the ones from the v2 package and reload:

```html
<link rel="stylesheet" href="/bemap/ol.css">
<script src="/bemap/ol.js"></script>          <!-- now 10.8.0 -->
<script src="/bemap/bemap-js-api.js"></script>
```

```js
var map = new bemap.OlMap(ctx, 'map');        // was bemap.Ol3Map
map.defaultLayers();
map.move(2.35, 48.85, 12);
```

`bemap.Ol3Map` is kept as a subclass of `bemap.OlMap`, so existing constructor calls
continue to work. Prefer `OlMap` in new code — the name is what the library actually
calls the engine now.

### Confirming what you are running

```js
bemap.version;         // '2.0.2'
bemap.olVersion;       // '10.8.0'
bemap.maplibreVersion; // '5.24.0'
```

Useful in a support ticket, and in an assertion during the upgrade.

### Where the real work is

Everything routed through BeMap is portable. Find the places that are not:

```sh
grep -rn "\.native" src/          # reaching into the engine
grep -rn "\bol\." src/            # direct OpenLayers globals
```

Each hit is a candidate for either a BeMap equivalent or an OpenLayers 10 update.

### Common direct-OpenLayers changes

| Area | OpenLayers 4 | OpenLayers 10 |
| --- | --- | --- |
| Module access | `ol.Map`, `ol.layer.Tile` globals | ES module imports upstream; the bundled build keeps the `ol` global |
| Projections | `ol.proj.*` | same names, stricter validation of unregistered codes |
| Feature styling | `ol.style.Style` and friends | same concepts, some option renames |
| Vector sources | `ol.source.Vector` | same, with a reworked loading strategy API |
| Overlays | `ol.Overlay` | same |

Rather than reproducing the upstream changelog, the reliable approach is: replace
`ol.js`, run the application, and work through the console. OpenLayers 10 is explicit
about what it no longer accepts.

### Prefer the BeMap equivalent

Wherever a BeMap method exists, moving to it removes the version dependency permanently
and makes the code portable to Leaflet and MapLibre.

| Instead of | Use |
| --- | --- |
| `map.native.getView().setCenter(...)` | `map.move(lon, lat, zoom)` |
| `map.native.getView().fit(extent)` | `map.moveToBoundingBox(bbox)` |
| `new ol.Feature(new ol.geom.Point(...))` | `new bemap.Marker(coordinate)` |
| `new ol.geom.LineString(...)` | `new bemap.Polyline(coordinates)` |
| `map.native.on('click', …)` | `map.on(bemap.Map.EventType.CLICK, …)` |
| `new ol.Overlay(...)` | `new bemap.Popup(...)` |
| custom `ol.style.Style` | `bemap.LineStyle` / `PolygonStyle` / `CircleStyle` |
| `ol.interaction.Draw` | `map.drawPolygon(...)` and friends |

### Suggested order

1. Swap `ol.js` / `ol.css`; leave everything else. Most applications work at this point.
2. Fix console errors from direct `ol.*` use.
3. Rename `bemap.Ol3Map` → `bemap.OlMap`.
4. Replace `map.native` usage with BeMap equivalents where one exists.
5. Only then consider whether MapLibre would serve you better — see below.

## Reference

### Version globals

| Global | Value in 2.0.2 |
| --- | --- |
| `bemap.version` | `'2.0.2'` |
| `bemap.olVersion` | `'10.8.0'` |
| `bemap.maplibreVersion` | `'5.24.0'` |

### Class names

| v1 name | v2 name | Status |
| --- | --- | --- |
| `bemap.Ol3Map` | `bemap.OlMap` | Old name retained as a subclass; both work. |

### OpenLayers-only methods on `bemap.OlMap`

Present on this engine and not part of the portable core:

| Method | Notes |
| --- | --- |
| `map.getXYFromCoordinate(coordinate)` | Geographic → screen pixels. OpenLayers only. |
| `map.buildTextStyle(textStyle, name, options)` | Also on MapLibre. |
| `map.buildPolygonStyle(style, options)` | Also on MapLibre. |
| `map.buildCircleStyle(style, options)` | Also on MapLibre. |

## Notes

**Should you move to MapLibre instead?** If the upgrade is already opening the code up,
it is a fair question. MapLibre brings vector tiles, 3D, globe, native clustering and
the browser tile cache; OpenLayers keeps the richest 2D vector and projection support.
Neither is a general winner — see [Choosing an engine](index.html#subpage-jsapi_2_0_0-js-map-engines.md)
for the capability matrix.

**Do not mix OpenLayers versions.** One `ol.js` per page. Two copies produce
`instanceof` failures that are very hard to read, because the classes look identical
and are not.

### Gotchas

- **Old `ol.css` left behind.** Controls render in the wrong place or not at all. Update both files together.
- **A cached `ol.js`.** Add a cache-buster or hard-reload; a stale bundle looks exactly like a code bug.
- **`instanceof ol.Feature` failing.** Two OpenLayers copies on the page.
- **Custom styles rendering differently.** OpenLayers 10 changed some style defaults. Compare against a v4 screenshot rather than from memory.
- **Assuming `bemap.Ol3Map` is gone.** It is not — it still constructs a working map. There is no urgency to rename beyond clarity.
- **Reaching into `map.native` for something BeMap already does.** Each of those is a place the next upgrade will break again.

## See also

<ul>
<li><a href="index.html#subpage-jsapi_2_0_0-migration-from-v1.md">Migrating from v1 — cheat sheet</a> — the whole-API picture</li>
<li><a href="index.html#subpage-jsapi_2_0_0-js-map-openlayers.md">Display map (OpenLayers)</a></li>
<li><a href="index.html#subpage-jsapi_2_0_0-js-map-engines.md">Choosing an engine</a></li>
<li><a href="index.html#subpage-jsapi_2_0_0-install.md">Install &amp; setup</a> — peer versions and script order</li>
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><a href="index.html#subpage-jsapi_2_0_0-migration-wms-to-tiles.md">WMS → BeNomad Tiles</a> — the other migration worth considering</li>
</ul>

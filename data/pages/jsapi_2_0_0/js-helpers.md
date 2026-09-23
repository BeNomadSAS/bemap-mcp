<span class="bemap-tag">Foundations</span>

# Helpers &amp; value types

<p class="bemap-tagline">The small objects every other page passes around — <code>Coordinate</code>, <code>BoundingBox</code>, <code>Color</code>, <code>Icon</code> — plus the cross-service helper functions and the encoded-polyline codec.</p>

<div class="bemap-callout">
<strong>Longitude comes first.</strong> <code>bemap.Coordinate(lon, lat)</code> and <code>bemap.BoundingBox(minLon, minLat, maxLon, maxLat)</code>. This trips up everyone arriving from a lat/lon API at least once — see <a href="#gotchas">Gotchas</a>.
</div>

## At a glance

<ul class="bemap-glance">
<li><code>bemap.Coordinate(lon, lat)</code> — a WGS84 point. The most-used type in the library.</li>
<li><code>bemap.BoundingBox(minLon, minLat, maxLon, maxLat)</code> — a rectangle, south-west corner first.</li>
<li><code>bemap.Color(r, g, b, a)</code> — RGB 0–255, alpha 0–1.</li>
<li><code>bemap.Icon({ src, width, height, … })</code> — marker imagery and its anchor.</li>
<li><code>bemap.gep.decode(str)</code> — Google-encoded polyline → array of <code>Coordinate</code>.</li>
<li><code>bemap.helpers.*</code> and <code>bemap.geocoderHelpers.*</code> — promise-returning conveniences that wrap several service calls.</li>
</ul>

## Usage

### Coordinate

```js
var paris = new bemap.Coordinate(2.3522, 48.8566);   // lon, lat

paris.getLon();            // → 2.3522
paris.getLat();            // → 48.8566
paris.getLonLatArray();    // → [2.3522, 48.8566]
paris.getLatLonArray();    // → [48.8566, 2.3522]
```

`getLatLonArray()` exists precisely because Leaflet wants `[lat, lon]` while
GeoJSON and OpenLayers want `[lon, lat]`. Use it instead of hand-swapping.

### BoundingBox

```js
// south-west corner, then north-east corner
var france = new bemap.BoundingBox(-5.14, 41.33, 9.56, 51.09);

france.getMinLon();   // → -5.14   (west)
france.getMinLat();   // → 41.33   (south)
france.getMaxLon();   // →  9.56   (east)
france.getMaxLat();   // → 51.09   (north)

map.moveToBoundingBox(france);
```

`getMin()` and `getMax()` return the corner pairs. `map.getBoundingBox()` gives you
the current viewport as a `BoundingBox`, which is the usual way to build a
viewport-constrained search.

### Color

```js
var red      = new bemap.Color(255, 0, 0);        // alpha defaults to opaque
var halfBlue = new bemap.Color(0, 0, 255, 0.5);

halfBlue.getHex();         // → '#0000ff'
halfBlue.getRgbArray();    // → [0, 0, 255]
halfBlue.getRgbaArray();   // → [0, 0, 255, 0.5]
```

Only the **upper** bound is enforced, and only for the RGB components: they are rounded
and capped at 255. There is no lower clamp and no clamping of `alpha` at all, so
`new bemap.Color(-50, 0, 0, 128)` stores `-50` and `128` verbatim. Pass values that are
already in range.

### Icon

```js
var icon = new bemap.Icon({
    src:     '/img/pin.png',
    width:   32,
    height:  32,
    anchorX: 0.5,            // fraction of the width
    anchorY: 1.0,            // fraction of the height — bottom of the image
    anchorXUnits: 'fraction',
    anchorYUnits: 'fraction',
    opacity: 1
});

map.addMarker(new bemap.Marker(paris, { icon: icon }));
```

The anchor is the point of the image that sits on the coordinate. For a classic
teardrop pin that is bottom-centre — `anchorX: 0.5, anchorY: 1.0` in fraction units,
which is already the default. Set it explicitly only when your artwork's tip is
somewhere else, and remember to switch the units if you give pixels.

### Encoded polylines

Routing responses can return geometry as a Google-encoded polyline string. Decode it
into coordinates you can draw:

```js
var coords = bemap.gep.decode(route.getGeometry());   // → [bemap.Coordinate, …]
map.addPolyline(new bemap.Polyline(coords));
```

`decode(str, precision)` takes an optional precision, defaulting to `5`. Pass `6` if
the producer used six-digit precision — a wrong precision decodes to coordinates that
are off by orders of magnitude rather than failing, so it is worth being explicit when
the source is not BeMap.

### Cross-service helpers

Promise-returning wrappers that save you a service round trip you would otherwise
write by hand. Each is documented in full on its own service page.

```js
bemap.helpers.listGeoservers(ctx).then(function(list) { /* … */ });
bemap.helpers.getGeoServerInfo(ctx, 'here').then(function(info) { /* … */ });
bemap.helpers.listChargingStationProviders(ctx).then(function(providers) { /* … */ });
bemap.helpers.snapToRoad(reverseGeocoder, coordinate, { radius: 1000 });
bemap.helpers.attachAutocompleteToInput(/* … */);

bemap.geocoderHelpers.formatAddress(item);   // → printable one-line address
bemap.geocoderHelpers.toCoordinate(item);    // → bemap.Coordinate
```

## Reference

### `bemap.Coordinate`

```js
new bemap.Coordinate(lon, lat)
```

| Method | Returns |
| --- | --- |
| `getLon()` / `setLon(lon)` | Number |
| `getLat()` / `setLat(lat)` | Number |
| `getLonLatArray()` | `[lon, lat]` |
| `getLatLonArray()` | `[lat, lon]` |

### `bemap.BoundingBox`

```js
new bemap.BoundingBox(minLon, minLat, maxLon, maxLat)
```

| Method | Returns |
| --- | --- |
| `getMinLon()` / `setMinLon(v)` | Number — west |
| `getMinLat()` / `setMinLat(v)` | Number — south |
| `getMaxLon()` / `setMaxLon(v)` | Number — east |
| `getMaxLat()` / `setMaxLat(v)` | Number — north |
| `getMin()` / `setMin(v)` | south-west corner |
| `getMax()` / `setMax(v)` | north-east corner |

### `bemap.Color`

```js
new bemap.Color(red, green, blue, alpha)
```

| Argument | Range |
| --- | --- |
| `red`, `green`, `blue` | 0–255 |
| `alpha` | 0–1 — `0` fully transparent, `1` fully opaque |

| Method | Returns |
| --- | --- |
| `getHex()` | `'#rrggbb'` |
| `getRgbArray()` | `[r, g, b]` |
| `getRgbaArray()` | `[r, g, b, a]` |
| `getRed()` / `setRed(v)`, and the same for green, blue, alpha | Number |

### `bemap.Icon`

```js
new bemap.Icon({ src, width, height, anchorX, anchorY, anchorXUnits, anchorYUnits, opacity })
```

| Option | Type | Notes |
| --- | --- | --- |
| `src` | String | Image URL or data URI. **Always set it** — see the default below. |
| `width` / `height` | Number | Pixels. |
| `anchorX` / `anchorY` | Number | The point of the image placed on the coordinate. Defaults `0.5` / `1` — bottom-centre. |
| `anchorXUnits` / `anchorYUnits` | String | `'fraction'` (default) or `'pixels'`. |
| `opacity` | Number | 0–1. |

Every field has a matching `getX()` / `setX()` accessor.

<div class="bemap-callout">
<strong>Never rely on the default <code>src</code>.</strong> Omit it and <code>bemap.Icon</code> falls back to a hardcoded third-party URL — <code>http://openlayers.org/en/v3.18.2/examples/data/icon.png</code> — an OpenLayers 3.18 example asset, served over plain <strong>HTTP</strong>. On an HTTPS page the browser blocks it as mixed content and the marker renders with no image; even where it loads, every map view makes a request to a third-party site you do not control, for a file that may be withdrawn at any time. Verified in 2.0.2. Always pass your own <code>src</code>.
</div>

### `bemap.gep`

| Function | Notes |
| --- | --- |
| `bemap.gep.decode(str, precision)` | → array of `bemap.Coordinate`. `precision` defaults to `5`. |

### Object utilities

| Function | Notes |
| --- | --- |
| `bemap.inherits(child, parent)` | Prototype chaining, used internally. |
| `bemap.inheritsof(obj, type)` | Runtime type test — `bemap.inheritsof(layer, bemap.HeatmapLayer)`. Several map methods use it to reject the wrong layer type. |

## Notes

### Gotchas

- **Longitude first.** `new bemap.Coordinate(48.85, 2.35)` is syntactically fine and puts you in the Indian Ocean. If your markers land in the sea off Somalia, the arguments are swapped.
- **The generated JSDoc for `BoundingBox` lists its parameters lat-first.** That comment is wrong. The real signature is `(minLon, minLat, maxLon, maxLat)`, and every call site inside the library — including `map.getBoundingBox()` — builds it west, south, east, north. Trust the signature, not the comment.
- **`bemap.Color` alpha is 0–1, not 0–255.** Passing `128` expecting half transparency stores `128` unchanged — it is not clamped — and the engines then render it unpredictably.
- **A default-constructed `bemap.Icon()`.** Its `src` points at an `openlayers.org` example image over HTTP. Blocked as mixed content on HTTPS, and an external dependency everywhere else. Always set `src`.
- **Icon anchor units.** The default anchor *is* bottom-centre (`anchorX: 0.5`, `anchorY: 1`, both in `'fraction'` units), so a plain pin sits correctly without configuration. If a marker looks offset, the usual cause is setting `anchorX`/`anchorY` in pixels while leaving the units at `'fraction'`.
- **Decoding with the wrong precision.** `bemap.gep.decode` will not error — it returns plausible-looking coordinates in the wrong place. Match the producer's precision.
- **`bemap.Object` exists and is not `Object`.** It is the library's internal base class. Do not confuse the two when reading stack traces.

## See also

- [Coordinate system](index.html#subpage-jsapi_2_0_0-glossary-coordinate_system.md) — WGS84, projections, axis order
- [Encoded polyline](index.html#subpage-jsapi_2_0_0-glossary-google_encoded_polyline_algorithm_format.md) — the format itself
- [Snippet helpers](index.html#subpage-jsapi_2_0_0-snippet-helpers.md) — `bemap.snippet.*`, for rendering copy-paste code
- [Styling](index.html#subpage-jsapi_2_0_0-js-map-styling.md) — where `Color` is consumed
- [Markers](index.html#subpage-jsapi_2_0_0-js-map-markers.md) — where `Icon` is consumed
- [The Context](index.html#subpage-jsapi_2_0_0-the-context.md)

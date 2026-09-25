<span class="bemap-tag">Search</span>

# Reverse Geocoder — `bemap.ReverseGeocoder`

<p class="bemap-tagline">Resolve a coordinate to the nearest address or road feature. Commonly used to translate a map click into a real-world location.</p>

<div class="bemap-callout">
<strong>Geoserver.</strong> Calls <code>POST service/geocoding/1.0/reverse</code> — needs a geoserver exposing <code>ReverseGeocoding</code>. Most geoservers do; change <code>bemapMainCtx.geoserver</code> in <a href="../context.js">context.js</a> if yours doesn't.<br>
<strong>Your allowed geoservers:</strong> <span id="allowed_geo_revgeo">…</span>
</div>

<script>$(document).ready(function(){ bemap.docs.renderAllowed('allowed_geo_revgeo'); });</script>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_revgeo","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_revgeo', {
        onMapReady: function(map, engine) {
            map.defaultLayers().move(2.5, 46.5, 6);

            var rev = new bemap.ReverseGeocoder(bemapMainCtx);
            return rev.revGeo(new bemap.ReverseGeocodingRequest({
                coordinate: new bemap.Coordinate(2.337, 48.860),
                radius: 200,
                language: 'en',
                maxResult: 1
            })).then(function(response) {
                var items = response.getGeocodingItems();
                if (!items || !items.length) return;
                var item = items[0];
                var coord = bemap.geocoderHelpers.toCoordinate(item) || new bemap.Coordinate(2.337, 48.860);
                map.addMarker(new bemap.Marker(coord));
                console.log('Resolved address:', bemap.geocoderHelpers.formatAddress(item));
            }).catch(function(err) {
                bemap.docs.showError('mapV2_revgeo', err);
                console.error('Reverse-geocoding failed:', err.getMessage ? err.getMessage() : err);
            });
        }
    });
});
```
<p class="bemap-demo-caption">Reverse-geocodes a fixed point near the Louvre. The resolved address is logged to the console.</p>

## At a glance

<ul class="bemap-glance">
<li>Endpoint: <code>POST service/geocoding/1.0/reverse</code>.</li>
<li>Method: <code>rev.revGeo(request, opts?)</code> returns the same <code>bemap.GeocodingResponse</code> as the forward geocoder.</li>
<li>Set <code>radius</code> (metres) to control the snap distance.</li>
<li>Helper: <code>bemap.helpers.snapToRoad(rev, coord, opts)</code> — drop a click onto the nearest road before passing it to routing.</li>
<li>Options: <code>ROAD_FEATURE</code>, <code>URBAN_AREA</code>, <code>POSTAL_ADDRESS</code>, …</li>
</ul>

## Usage

```js
var rev = new bemap.ReverseGeocoder(ctx);

rev.revGeo(new bemap.ReverseGeocodingRequest({
    coordinate: new bemap.Coordinate(2.35, 48.85),
    radius: 200,
    language: 'fr',
    maxResult: 1,
    options: [bemap.RevGeocodingOptions.ROAD_FEATURE, bemap.RevGeocodingOptions.URBAN_AREA]
})).then(function(response) {
    var first = response.getGeocodingItems()[0];
    if (!first) { notFoundUI(); return; }
    console.log(bemap.geocoderHelpers.formatAddress(first));
});
```

### Snap a map click to a road

When a user clicks the map and you want to use that point as a routing waypoint, snap it first — the routing engine rejects free-form points with `"Via not match"`.

```js
bemap.helpers.snapToRoad(rev, clickCoord, { radius: 200, transportMode: bemap.TransportMode.CAR })
    .then(function(snapped) {
        if (!snapped) { offRoadUI(); return; }
        routingDestinations.push(snapped);
    });
```

`bemap.helpers.snapToRoad` is a thin wrapper around `ReverseGeocoder.revGeo()`.

## Reference

### Constructor

```js
new bemap.ReverseGeocoder(context)
```

### Methods

| Method | Returns | Notes |
| --- | --- | --- |
| `revGeo(request, options?)` | `Promise<bemap.GeocodingResponse>` | Same response shape as the forward geocoder. |

### Request fields — `bemap.ReverseGeocodingRequest`

| Field | Type | Notes |
| --- | --- | --- |
| `coordinate` **R** | `bemap.Coordinate \| bemap.CoordinateSat` | The point to resolve. |
| `radius` | Number (m) | Max snap distance. |
| `transportMode` | `bemap.TransportMode.*` | Drives which road network is consulted. |
| `maxResult` | Number | |
| `language` | String (ISO 639-1) | |
| `options` | `Array<String>` | `bemap.RevGeocodingOptions.*` — `ROAD_FEATURE`, `URBAN_AREA`, `POSTAL_ADDRESS`, … |
| `geoserver` | String | Per-request override. |

### Response

`getGeocodingItems()` returns `Array<bemap.GeocodingItem>` — the same shape as the [Geocoder](index.html#subpage-jsapi_2_0_0-js-geocoding.md).

## Notes

The full interactive demo (click the map to resolve the address) ships with the library — see [the GitHub repository](https://github.com/BeNomadSAS/bemap-js-api), then open `examples/services-v2/reverse-geocoder.html`.

## See also

- [Geocoder](index.html#subpage-jsapi_2_0_0-js-geocoding.md) — forward geocoding
- REST endpoint: `POST service/geocoding/1.0/reverse`

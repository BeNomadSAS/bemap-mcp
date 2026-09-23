<span class="bemap-tag">Search</span>

# Geocoder — `bemap.Geocoder`

<p class="bemap-tagline">Forward geocoding — free-form address or place name to ranked matches with coordinates and structured addresses. Promise-based wrapper around <code>POST service/geocoding/autocomplete/1.0</code>.</p>

<div class="bemap-callout">
<strong>Geoserver.</strong> <code>Geocoder.geocode()</code> routes through the autocomplete endpoint with <code>addressDetails: true</code> — so it needs a geoserver with a working autocomplete connector. On the public beta server use <code>nominatim</code>; change <code>bemapMainCtx.geoserver</code> in <a href="../context.js">context.js</a> to switch.<br>
<strong>Your allowed geoservers:</strong> <span id="allowed_geo_geocoder">…</span>
</div>

<script>$(document).ready(function(){ bemap.docs.renderAllowed('allowed_geo_geocoder'); });</script>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_geocoder","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_geocoder', {
        onMapReady: function(map, engine) {
            map.defaultLayers().move(2.5, 46.5, 6);

            var geocoder = new bemap.Geocoder(bemapMainCtx);
            return geocoder.geocode(new bemap.GeocodingRequest({
                place: '12 rue de Rivoli, Paris',
                maxResult: 1
            })).then(function(response) {
                var items = response.getGeocodingItems();
                if (!items || !items.length) return;
                var coord = bemap.geocoderHelpers.toCoordinate(items[0]);
                if (!coord) return;
                map.addMarker(new bemap.Marker(coord));
                map.move(coord.getLon(), coord.getLat(), 17);
            }).catch(function(err) {
                bemap.docs.showError('mapV2_geocoder', err);
                console.error('Geocoding failed:', err.getMessage ? err.getMessage() : err);
            });
        }
    });
});
```
<p class="bemap-demo-caption">Geocodes "12 rue de Rivoli, Paris" and drops a marker on the resolved coordinate.</p>

## At a glance

<ul class="bemap-glance">
<li>Endpoint: <code>POST service/geocoding/autocomplete/1.0</code> — forward geocoding rides the autocomplete endpoint server-side.</li>
<li>Method: <code>geocoder.geocode(request, opts?)</code> returns <code>Promise&lt;bemap.GeocodingResponse&gt;</code>.</li>
<li>Helpers: <code>bemap.geocoderHelpers.toCoordinate(item)</code> and <code>formatAddress(item)</code>.</li>
<li>Bias results with <code>proximity</code> (point) or constrain with <code>boundingBox</code>.</li>
<li>See also: <a href="index.html#subpage-jsapi_2_0_0-js-autocomplete.md">Autocomplete</a> (typeahead), <a href="index.html#subpage-jsapi_2_0_0-js-reversegeocoding.md">Reverse geocoder</a>.</li>
</ul>

## Usage

```js
var geocoder = new bemap.Geocoder(ctx);

geocoder.geocode(new bemap.GeocodingRequest({
    place: '12 rue de Rivoli, Paris',
    language: 'fr',
    maxResult: 5
})).then(function(response) {
    response.getGeocodingItems().forEach(function(item) {
        var coord   = bemap.geocoderHelpers.toCoordinate(item);
        var address = bemap.geocoderHelpers.formatAddress(item);
        console.log(address, coord);
    });
});
```

## Reference

### Constructor

```js
new bemap.Geocoder(context)
```

### Methods

| Method | Returns | Notes |
| --- | --- | --- |
| `geocode(request, options?)` | `Promise<bemap.GeocodingResponse>` | `options` accepts `{ signal?: AbortSignal }`. |

### Request fields — `bemap.GeocodingRequest`

| Field | Type | Notes |
| --- | --- | --- |
| `place` **R** | String | Free-form query. |
| `language` | String (ISO 639-1) | |
| `maxResult` | Number | |
| `searchType` | `bemap.GeocodingSearchType.*` | Optional filter — `STREET`, `CITY`, `POI`, … |
| `address` | `bemap.Address` | Structured filter, e.g. `{ country: 'FR' }`. |
| `proximity` | `bemap.Coordinate` | Bias toward this point. |
| `boundingBox` | `bemap.BoundingBox` | Limit results to this rectangle. |
| `geoserver` | String | Per-request override. |

### Response — `bemap.GeocodingResponse`

| Accessor | Returns |
| --- | --- |
| `getGeocodingItems()` | `Array<bemap.GeocodingItem>` |

Each `GeocodingItem` exposes structured fields (`getName()`, `getCity()`, `getCountry()`, `getCoordinate()`, …). Prefer the helpers:

```js
bemap.geocoderHelpers.toCoordinate(item)   // → bemap.Coordinate
bemap.geocoderHelpers.formatAddress(item)  // → String
```

## Notes

The full interactive demo (type a query, see ranked matches plotted on the map) ships with the library — see [the GitHub repository](https://github.com/BeNomadSAS/bemap-js-api), then open `examples/services-v2/geocoder.html`.

## See also

- [Autocomplete](index.html#subpage-jsapi_2_0_0-js-autocomplete.md) — typeahead suggestions (different UX, same endpoint)
- [Reverse geocoder](index.html#subpage-jsapi_2_0_0-js-reversegeocoding.md) — coordinate → address
- [Migration from v1](index.html#subpage-jsapi_2_0_0-migration-geocoding.md) — callback-style `Geocoder` → Promise-style
- REST endpoint: `POST service/geocoding/autocomplete/1.0`

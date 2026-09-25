<span class="bemap-tag">Migration</span>

# Geocoding — callback → Promise

<p class="bemap-tagline">Class names unchanged: <code>bemap.Geocoder</code>, <code>bemap.Autocomplete</code>, <code>bemap.GeoAutocomplete</code>. Method shapes change: callbacks → Promises, typed requests, getter-style response accessors.</p>

## At a glance

<ul class="bemap-glance">
<li>Class names unchanged — same identifiers, refreshed under the hood.</li>
<li>The callback signature still works for one transitional version (warns to console).</li>
<li>The Promise signature is the new default — same method names.</li>
<li><code>bemap.Geocoder.reverse()</code> is gone — use the new standalone <a href="index.html#subpage-jsapi_2_0_0-js-reversegeocoding.md"><code>bemap.ReverseGeocoder</code></a>.</li>
<li>Autocomplete adds <code>attachToInput()</code> — bring-your-own-debounce becomes built-in.</li>
</ul>

## Usage

### Forward geocoding

```js
// v1 — callback
new bemap.Geocoder(ctx).geocode({
    place: '12 rue de Rivoli, Paris',
    maxResult: 5
}, function(err, response) {
    if (err) return handle(err);
    response.geocodingItems.forEach(...);
});

// v2 — Promise
new bemap.Geocoder(ctx).geocode(new bemap.GeocodingRequest({
    place: '12 rue de Rivoli, Paris',
    maxResult: 5
})).then(function(response) {
    response.getGeocodingItems().forEach(...);
}).catch(handle);
```

### Autocomplete

```js
// v1 — manual debounce + manual XHR cancel + manual list rendering
input.addEventListener('input', debounce(function() {
    new bemap.Autocomplete(ctx).complete({ place: input.value }, function(err, r) {
        if (err) return;
        renderList(r.geocodingItems);
    });
}, 200));

// v2 — same class, attach-to-input helper
var ac = new bemap.Autocomplete(ctx);
ac.attachToInput(input, {
    proximity: new bemap.Coordinate(2.35, 48.85),
    debounceMs: 200,
    minChars: 2,
    onSelect: function(item) { /* user picked one */ }
});
```

The helper handles debounce, in-flight abort, keyboard navigation (Up/Down/Enter/Esc), and click-outside-to-close.

### Reverse geocoding

```js
// v1
new bemap.Geocoder(ctx).reverse({ xy: '2.35,48.85', radius: 200 }, function(err, r) { ... });

// v2 — separate class
new bemap.ReverseGeocoder(ctx).revGeo(new bemap.ReverseGeocodingRequest({
    coordinate: new bemap.Coordinate(2.35, 48.85),
    radius: 200,
    language: 'fr',
    maxResult: 1
})).then(function(r) { ... });
```

### Use the helpers

For the two operations 90 % of callers want, prefer the helpers over walking the structure:

```js
bemap.geocoderHelpers.toCoordinate(item)   // → bemap.Coordinate
bemap.geocoderHelpers.formatAddress(item)  // → String
```

## Reference

### Response accessor mapping

| v1 field | v2 accessor |
| --- | --- |
| `response.geocodingItems` | `getGeocodingItems()` |
| `item.name` | `getName()` (or `bemap.geocoderHelpers.formatAddress(item)`) |
| `item.coordinate` | `getCoordinate()` (or `bemap.geocoderHelpers.toCoordinate(item)`) |
| `item.address.*` | `getCity()`, `getPostalCode()`, `getCountry()`, … |

## See also

- [Geocoder](index.html#subpage-jsapi_2_0_0-js-geocoding.md)
- [Autocomplete](index.html#subpage-jsapi_2_0_0-js-autocomplete.md)
- [GeoAutocomplete](index.html#subpage-jsapi_2_0_0-js-geoautocomplete.md)
- [Reverse geocoder](index.html#subpage-jsapi_2_0_0-js-reversegeocoding.md)
- [Migration cheat sheet](index.html#subpage-jsapi_2_0_0-migration-from-v1.md)

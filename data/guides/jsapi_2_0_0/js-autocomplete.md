<span class="bemap-tag">Search</span>

# Autocomplete — `bemap.Autocomplete`

<p class="bemap-tagline">Lightweight typeahead suggestions for a search input — no postal address details, no resolved coordinates. For full PostalAddress + Coordinate per item, use <code>bemap.GeoAutocomplete</code>.</p>

<div class="bemap-callout">
<strong>Geoserver.</strong> Calls <code>POST service/geocoding/autocomplete/1.0</code> — needs a geoserver wired to a working autocomplete connector. If you see <code>ServiceException: no protocol: /selectSignatures</code>, the current geoserver doesn't have it. On the public beta server use <code>nominatim</code>. Change <code>bemapMainCtx.geoserver</code> (in <a href="../context.js">context.js</a>) to switch.<br>
<strong>Your allowed geoservers:</strong> <span id="allowed_geo_autocomplete">…</span>
</div>

<script>$(document).ready(function(){ bemap.docs.renderAllowed('allowed_geo_autocomplete'); });</script>

## Try it

<div style="margin: 0 0 12px 0;">
    <input id="mapV2_autocomplete_input" type="text" placeholder="Start typing an address…" style="padding: 6px 10px; font-size: 14px; width: 320px; border: 1px solid #ccc; border-radius: 4px;" />
</div>

```
{"bemap":{"language":"javascript","mapid":"mapV2_autocomplete","run":true,"hide":true}}
$(document).ready(function() {
    // Module-scoped binding — survives across engine-switch rebuilds so we
    // can destroy() the previous attach before binding a new one. Without
    // this, every engine swap STACKS another listener on the <input>.
    var binding = null;

    bemap.docs.attachDemo('mapV2_autocomplete', {
        onMapReady: function(map, engine) {
            map.defaultLayers().move(2.5, 46.5, 6);

            if (binding && typeof binding.destroy === 'function') binding.destroy();

            var input = document.getElementById('mapV2_autocomplete_input');
            if (!input) return;
            var ac = new bemap.Autocomplete(bemapMainCtx);
            binding = ac.attachToInput(input, {
                proximity: new bemap.Coordinate(2.5, 46.5),
                maxResult: 8,
                debounceMs: 200,
                minChars: 2,
                onSelect: function(item) {
                    console.log('selected:', item.getPlace ? item.getPlace() : item);
                },
                onError: function(err) {
                    bemap.docs.showError('mapV2_autocomplete', err);
                    console.error('Autocomplete failed:', err.getMessage ? err.getMessage() : err);
                }
            });
        }
    });
});
```
<p class="bemap-demo-caption">Type in the input — suggestions stream in as you type, biased toward the centre of France. Selection logs to the console.</p>

## At a glance

<ul class="bemap-glance">
<li>Endpoint: <code>POST service/geocoding/autocomplete/1.0</code>.</li>
<li>Helper: <code>ac.attachToInput(input, opts)</code> — debounce, in-flight abort, keyboard nav, click-outside-to-close.</li>
<li>Returned handle has a <code>.destroy()</code> method — call it before re-attaching.</li>
<li>For full PostalAddress per suggestion, use <a href="index.html#subpage-jsapi_2_0_0-js-geoautocomplete.md"><code>bemap.GeoAutocomplete</code></a>.</li>
<li>CSS hooks: <code>.bemap-autocomplete-list</code>, <code>.bemap-autocomplete-item</code>, <code>.bemap-autocomplete-active</code>.</li>
</ul>

## Usage

```js
var ac = new bemap.Autocomplete(ctx);

// Programmatic single-shot call
ac.autocomplete(new bemap.AutocompleteGeocodingRequest({
    place: 'rue de la',
    proximity: new bemap.Coordinate(2.35, 48.85),
    maxResult: 8
})).then(function(response) {
    response.getGeocodingItems().forEach(function(item) {
        console.log(item.getPlace());
    });
});

// Or wire to an <input>
var binding = ac.attachToInput(document.getElementById('search'), {
    proximity: new bemap.Coordinate(2.35, 48.85),
    maxResult: 8,
    debounceMs: 200,
    minChars: 2,
    onSelect:  function(item)  { console.log('selected:', item.getPlace()); },
    onResults: function(items) { /* optional */ },
    onError:   function(err)   { /* optional */ }
});

// Later, to tear down:
binding.destroy();
```

## Reference

### Constructor

```js
new bemap.Autocomplete(context)
```

### Methods

| Method | Returns | Notes |
| --- | --- | --- |
| `autocomplete(request, options?)` | `Promise<bemap.AutocompleteGeocodingResponse>` | |
| `attachToInput(inputEl, opts)` | `{ destroy() }` | Wires debounce + keyboard nav. Always store the handle and `.destroy()` before re-attaching. |

### Request fields — `bemap.AutocompleteGeocodingRequest`

| Field | Type | Notes |
| --- | --- | --- |
| `place` **R** | String | Partial query, typically the contents of the `<input>`. |
| `proximity` / `coordinate` | `bemap.Coordinate` | Bias toward this point. |
| `language` | String (ISO 639-1) | |
| `maxResult` | Number | |
| `boundingBox` | `bemap.BoundingBox` | Constrain results to this area. |

### Response

`getGeocodingItems()` returns `Array<bemap.GeocodingItem>` (the same shape as [Geocoder](index.html#subpage-jsapi_2_0_0-js-geocoding.md)). For full PostalAddress + Coordinate per item, use [`bemap.GeoAutocomplete`](index.html#subpage-jsapi_2_0_0-js-geoautocomplete.md).

## Notes

The full interactive demo (typeahead with code panel) ships with the library — see [the GitHub repository](https://github.com/BeNomadSAS/bemap-js-api), then open `examples/services-v2/autocomplete.html`.

## See also

- [GeoAutocomplete](index.html#subpage-jsapi_2_0_0-js-geoautocomplete.md) — typeahead with full address per item
- [Geocoder](index.html#subpage-jsapi_2_0_0-js-geocoding.md) — single-shot forward geocoding
- REST endpoint: `POST service/geocoding/autocomplete/1.0`

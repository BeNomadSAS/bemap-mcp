<span class="bemap-tag">Search</span>

# GeoAutocomplete — `bemap.GeoAutocomplete`

<p class="bemap-tagline">Typeahead suggestions with full <code>PostalAddress</code> and a resolved <code>Coordinate</code> on every result — no second round-trip to the geocoder. Use this when the selection drives a real action.</p>

<div class="bemap-callout">
<strong>Geoserver.</strong> Same endpoint as <a href="index.html#subpage-jsapi_2_0_0-js-autocomplete.md"><code>bemap.Autocomplete</code></a> — needs a geoserver with a working autocomplete connector. On the public beta server use <code>nominatim</code>; change <code>bemapMainCtx.geoserver</code> in <a href="../context.js">context.js</a> if your default doesn't expose autocomplete.<br>
<strong>Your allowed geoservers:</strong> <span id="allowed_geo_geoac">…</span>
</div>

<script>$(document).ready(function(){ bemap.docs.renderAllowed('allowed_geo_geoac'); });</script>

## Try it

<div style="margin: 0 0 12px 0;">
    <input id="mapV2_geoac_input" type="text" placeholder="Start typing an address…" style="padding: 6px 10px; font-size: 14px; width: 320px; border: 1px solid #ccc; border-radius: 4px;" />
    <ul id="mapV2_geoac_results" style="list-style: none; padding: 0; margin: 6px 0 0 0; max-width: 420px; background: #fff; border: 1px solid #eee; border-radius: 4px; max-height: 220px; overflow-y: auto; font-size: 13px; display: none;"></ul>
</div>

```
{"bemap":{"language":"javascript","mapid":"mapV2_geoac","run":true,"hide":true}}
$(document).ready(function() {
    var typingTimer = null;
    var controller = null;

    bemap.docs.attachDemo('mapV2_geoac', {
        onMapReady: function(map, engine) {
            map.defaultLayers().move(2.5, 46.5, 6);

            var input  = document.getElementById('mapV2_geoac_input');
            var listEl = document.getElementById('mapV2_geoac_results');
            if (!input || !listEl) return;
            var ga = new bemap.GeoAutocomplete(bemapMainCtx);
            var marker = null;

            function pick(item) {
                var coord = bemap.geocoderHelpers.toCoordinate(item)
                         || (typeof item.getCoordinate === 'function' ? item.getCoordinate() : null);
                listEl.innerHTML = '';
                listEl.style.display = 'none';
                if (!coord) return;
                if (marker) { try { map.removeMarker(marker); } catch (e) {} }
                marker = new bemap.Marker(coord);
                map.addMarker(marker);
                map.move(coord.getLon(), coord.getLat(), 16);
                input.value = (typeof item.getPlace === 'function') ? item.getPlace() : input.value;
            }

            function render(items) {
                listEl.innerHTML = '';
                if (!items.length) { listEl.style.display = 'none'; return; }
                items.forEach(function(el) {
                    var li = document.createElement('li');
                    li.style.cssText = 'padding:6px 10px; cursor:pointer; border-top:1px solid #f1f1f1;';
                    li.textContent = (typeof el.getPlace === 'function') ? el.getPlace() : '(no place)';
                    li.addEventListener('mousedown', function(ev) { ev.preventDefault(); pick(el); });
                    listEl.appendChild(li);
                });
                listEl.style.display = 'block';
            }

            input.oninput = function() {
                if (typingTimer) clearTimeout(typingTimer);
                typingTimer = setTimeout(function() {
                    var value = input.value;
                    if (!value || value.length < 2) { render([]); return; }
                    if (controller && typeof controller.abort === 'function') {
                        try { controller.abort(); } catch (e) {}
                    }
                    controller = (typeof AbortController === 'function') ? new AbortController() : null;
                    ga.autocomplete(new bemap.AutocompleteGeocodingRequest({
                        place: value,
                        coordinate: new bemap.Coordinate(2.5, 46.5),
                        language: 'en'
                    }), { signal: controller ? controller.signal : undefined })
                    .then(function(response) { render(response.getItems()); })
                    .catch(function(err) {
                        if (err && err.getCode && err.getCode() === bemap.Error.ABORTED) return;
                        bemap.docs.showError('mapV2_geoac', err);
                        console.error('GeoAutocomplete failed:', err.getMessage ? err.getMessage() : err);
                    });
                }, 220);
            };
        }
    });
});
```
<p class="bemap-demo-caption">Type to see suggestions — selection drops a marker at the resolved coordinate and zooms in.</p>

## At a glance

<ul class="bemap-glance">
<li>Same endpoint + request shape as <a href="index.html#subpage-jsapi_2_0_0-js-autocomplete.md"><code>bemap.Autocomplete</code></a>, with <code>addressDetails: true</code> forced server-side.</li>
<li>Every result item carries a full <code>PostalAddress</code> + a <code>Coordinate</code> — no second geocode round-trip.</li>
<li>One-shot Promise API: <code>ga.autocomplete(request)</code>. Drive your own input (debounce + abort).</li>
<li>For a built-in typeahead helper see <a href="index.html#subpage-jsapi_2_0_0-js-autocomplete.md"><code>bemap.Autocomplete.attachToInput()</code></a> — but its items don't carry a coordinate.</li>
<li>Heavier per-result payload than <code>Autocomplete</code> — use only when you need the address fields.</li>
</ul>

## Usage

```js
var ga = new bemap.GeoAutocomplete(ctx);

ga.autocomplete(new bemap.AutocompleteGeocodingRequest({
    place: '12 rue de Rivoli',
    proximity: new bemap.Coordinate(2.35, 48.85)
})).then(function(response) {
    var first = response.getGeocodingItems()[0];
    var coord = bemap.geocoderHelpers.toCoordinate(first);
    var addr  = bemap.geocoderHelpers.formatAddress(first);
    placeMarker(coord, addr);
});

// Drive your own input with debounce + abort (no attachToInput on GeoAutocomplete):
var typingTimer = null, controller = null;
input.addEventListener('input', function() {
    if (typingTimer) clearTimeout(typingTimer);
    typingTimer = setTimeout(function() {
        if (controller && controller.abort) controller.abort();
        controller = (typeof AbortController === 'function') ? new AbortController() : null;
        ga.autocomplete(new bemap.AutocompleteGeocodingRequest({
            place: input.value,
            coordinate: new bemap.Coordinate(2.35, 48.85),
            language: 'en'
        }), { signal: controller ? controller.signal : undefined })
        .then(function(response) { renderSuggestions(response.getItems()); })
        .catch(function(err) {
            if (err.getCode && err.getCode() === bemap.Error.ABORTED) return;
            console.error(err.getMessage());
        });
    }, 220);
});
```

## Reference

### Constructor

```js
new bemap.GeoAutocomplete(context)
```

### Methods

| Method | Returns | Notes |
| --- | --- | --- |
| `autocomplete(request, opts?)` | `Promise<AutocompleteGeocodingResponse>` | Promise-based. Every request carries `addressDetails: true` so every item resolves to a structured address + coordinate. |

Unlike [`bemap.Autocomplete`](index.html#subpage-jsapi_2_0_0-js-autocomplete.md), there is no `attachToInput()` helper on `GeoAutocomplete` — drive your own debounced input (see the Usage snippet above).

### Request fields

Same shape as `bemap.AutocompleteGeocodingRequest`. See [Autocomplete](index.html#subpage-jsapi_2_0_0-js-autocomplete.md).

## Notes

The full interactive demo ships with the library — see [the GitHub repository](https://github.com/BeNomadSAS/bemap-js-api), then open `examples/services-v2/geo-autocomplete.html`.

## See also

- [Autocomplete](index.html#subpage-jsapi_2_0_0-js-autocomplete.md) — lightweight variant
- [Geocoder](index.html#subpage-jsapi_2_0_0-js-geocoding.md) — single-shot forward geocoding
- REST endpoint: `POST service/geocoding/autocomplete/1.0`

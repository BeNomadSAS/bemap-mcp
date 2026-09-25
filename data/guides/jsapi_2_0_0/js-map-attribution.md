<span class="bemap-tag">Mapping</span>

# Attribution widget — `bemap.AttributionWidget`

<p class="bemap-tagline">Cross-engine attribution UI — a discreet ⓘ icon at the corner of the map, click to reveal every open-source library and data supplier the BeMap stack uses. New in v2.</p>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_attribution","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_attribution', {
        onMapReady: function(map, engine) {
            map.defaultLayers().move(2.5, 46.5, 6);

            // The widget is enabled by default — look for the small ⓘ at
            // the corner of the map. There is no public getter for the
            // instance, so runtime customisation goes through the private
            // field; the SUPPORTED route is the `attribution` constructor
            // option, shown under Usage below.
            var w = map._attributionWidget;
            if (w && typeof w.setCustomLines === 'function') {
                w.setCustomLines([
                    '© My Company 2026',
                    'Data: My Custom Dataset under CC-BY-4.0'
                ]);
                w.refresh();
            }
        }
    });
});
```
<p class="bemap-demo-caption">Look for the ⓘ icon at the map corner — click to expand the popover with the open-source notices + your custom lines.</p>

## At a glance

<ul class="bemap-glance">
<li>Class: <code>bemap.AttributionWidget</code>. Works on Leaflet, OpenLayers, MapLibre.</li>
<li>Enabled by default on every <code>bemap.*Map</code> constructor.</li>
<li>Hides the engine-native control on OL / MapLibre. Leaflet keeps both by design.</li>
<li>Content sourced from <code>OPEN_SOURCE_NOTICES.md</code> + customer-added lines.</li>
<li>Configured through the map's <code>attribution</code> constructor option — <code>false</code> disables it. There is <strong>no public getter</strong> for the instance in 2.0.2; it is held privately as <code>map._attributionWidget</code>.</li>
</ul>

## Usage

```js
// Default — widget on, native control off on OL/MapLibre, on for Leaflet
new bemap.LeafletMap(ctx, 'map');
new bemap.OlMap(ctx, 'map');
new bemap.MapLibreMap(ctx, 'map');

// Opt out — engine-native control takes over
new bemap.LeafletMap(ctx, 'map', { attribution: false });

// Neither — only if your data-supplier terms allow
new bemap.LeafletMap(ctx, 'map', { attribution: false, nativeAttribution: false });
```

```js
// Customise at construction — the supported route
new bemap.LeafletMap(ctx, 'map', {
    attribution: {
        position:    'bottomright',
        customLines: [
            '© My Company 2026',
            'Data: My Custom Dataset under CC-BY-4.0'
        ]
    }
});

// Customise at runtime. 2.0.2 exposes no public getter for the widget, so this
// reaches a private field — it works, but it is not a stable API.
var w = map._attributionWidget;
w.setCustomLines([
    '© My Company 2026',
    'Data: My Custom Dataset under CC-BY-4.0'
]);
w.setPosition('bottom-right');
w.refresh();
```

## Reference

### Constructor options (cross-engine)

| Option | Default | Notes |
| --- | --- | --- |
| `attribution` | `true` | Enable the BeMap widget. Pass an object `{ position, customLines, hideNotices }` for inline configuration. |
| `nativeAttribution` | `false` when `attribution !== false`, else `true` | Show/hide the engine-native control. |
| `zoomControl` | `'top-left'` | `false` / `true` / position string (`'top-left'`, `'top-right'`, `'bottom-left'`, `'bottom-right'`) / `{ position }`. |

### Engine-specific defaults

| Engine | Native control class | When BeMap widget is enabled (default) |
| --- | --- | --- |
| Leaflet | `.leaflet-control-attribution` | Shown alongside the BeMap widget. Set `nativeAttribution: false` to hide it. |
| OpenLayers | `.ol-attribution` | Hidden — BeMap widget only. Set `nativeAttribution: true` to show both. |
| MapLibre | `.maplibregl-ctrl-attrib` | Hidden — BeMap widget only. Set `nativeAttribution: true` to show both. |

Resolved by `bemap.Map._resolveControlOptions(opts)` — customers pass intent, the library picks the right per-engine flag.

### Programmatic methods

There is no public getter in 2.0.2 — the instance is held privately as
`map._attributionWidget`. Prefer the `attribution` constructor option above; reach for
the private field only when you genuinely have to change the widget after construction.

| Method | Returns | Purpose |
| --- | --- | --- |
| `show()` | self | Reveal the widget if hidden. |
| `hide()` | self | Hide without disabling. |
| `setPosition(corner)` | self | Move to a corner — `'top-left'` / `'top-right'` / `'bottom-left'` / `'bottom-right'` or `bemap.Map.ZoomPosition.*`. |
| `setCustomLines(lines)` | self | Add brand / data-source attributions. `lines: Array<String>`. |
| `refresh()` | self | Re-render after `setCustomLines()`. |

### CSS hooks

```css
.bemap-attribution-icon { /* the ⓘ button */ }
.bemap-attribution-popover { /* popover content */ }
.bemap-attribution-popover a { /* links */ }
.bemap-attribution-top-left { /* ... */ }
.bemap-attribution-bottom-right { /* ... */ }
```

The widget floats above the map at `z-index: 1001`.

## Notes

The position vocabulary is shared via `bemap.Map.ZoomPosition` (`TOP_LEFT`, `TOP_RIGHT`, `BOTTOM_LEFT`, `BOTTOM_RIGHT`) — the same enum used by the `zoomControl` constructor option.

## See also

- [Open-source notices](index.html#subpage-jsapi_2_0_0-credits.md) — full text of the bundled attributions
- [Display map with Leaflet](index.html#subpage-jsapi_2_0_0-js-map-leaflet.md)
- [Display map with OpenLayers](index.html#subpage-jsapi_2_0_0-js-map-openlayers.md)
- [Display map with MapLibre](index.html#subpage-jsapi_2_0_0-js-map-maplibre.md)

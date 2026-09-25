<span class="bemap-tag">Mapping</span>

# Events — `map.on`, `bemap.MapEvent`

<p class="bemap-tagline">Everything the map tells you: clicks, movement, the drawing lifecycle — and, since it is the question this page gets asked most, where map errors actually surface.</p>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_events","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_events', {
        onMapReady: function(map) {
            map.defaultLayers().move(2.35, 48.85, 11);

            var log = document.getElementById('mapV2_events_log');
            function say(text) {
                if (log) log.textContent = text;
            }

            map.on(bemap.Map.EventType.CLICK, function(evt) {
                var c = evt.getCoordinate();
                say('click at lon ' + c.getLon().toFixed(4) +
                    ', lat ' + c.getLat().toFixed(4) +
                    '  (screen ' + evt.x + ',' + evt.y + ')');
                map.addMarker(new bemap.Marker(c));
            });

            map.on(bemap.Map.EventType.MOVEEND, function() {
                var b = map.getBoundingBox();
                say('viewport now ' +
                    b.getMinLon().toFixed(2) + ',' + b.getMinLat().toFixed(2) + ' → ' +
                    b.getMaxLon().toFixed(2) + ',' + b.getMaxLat().toFixed(2));
            });
        }
    });
});
```

<p class="bemap-demo-caption">Latest event: <code id="mapV2_events_log">— click or pan the map —</code>. Clicking drops a marker at the clicked coordinate; panning reports the new viewport.</p>

## At a glance

<ul class="bemap-glance">
<li><code>map.on(eventType, callback, options)</code> — returns a <code>bemap.Listener</code> you can later remove.</li>
<li>Event names live on <code>bemap.Map.EventType.*</code>. Use the constants, not raw strings.</li>
<li>The callback receives a <code>bemap.MapEvent</code>: coordinate, screen position, the originating object, and the native event.</li>
<li>Map errors reach you through <strong>promise rejections</strong> and the console — <em>not</em> through <code>map.on('error', …)</code>. See <a href="#maperrors">Map errors</a>.</li>
<li><code>map.removeListener(listener)</code> detaches. Keep the return value if you will need it.</li>
<li>Object-scoped variants: <code>onMarker</code>, <code>onMarkers</code>, <code>onPolyline</code>, <code>onPolygon</code>, <code>onCircle</code>, … — see <a href="index.html#subpage-jsapi_2_0_0-js-map-interaction.md">Interaction</a>.</li>
</ul>

## Usage

### Listening

```js
var listener = map.on(bemap.Map.EventType.CLICK, function(evt) {
    var coord = evt.getCoordinate();     // bemap.Coordinate
    console.log(coord.getLon(), coord.getLat());
});
```

### Stopping

```js
map.removeListener(listener);
```

Listeners survive as long as the map does. Long-lived single-page applications that
attach on every route change and never detach will leak — and, worse, will run the
handler several times per event.

### What is in a `MapEvent`

```js
map.on(bemap.Map.EventType.CLICK, function(evt) {
    evt.getCoordinate();   // bemap.Coordinate — the geographic point
    evt.x;                 // screen X in pixels
    evt.y;                 // screen Y in pixels
    evt.map;               // the bemap.Map that fired it
    evt.bemapObject;       // the marker / polyline / polygon involved, when there is one
    evt.native;            // the underlying engine event, if you need to escape the abstraction
    evt.properties;        // custom properties, engine- and source-dependent
});
```

Drag events additionally carry `startX`, `startY` and `startCoordinate` — where the
gesture began.

### Map errors

Map failures — an expired tiles token, a style that will not load, a call made on the
wrong engine — are asynchronous and happen deep inside the renderer, so there is nothing
to wrap in `try`. Here is how to actually observe them in 2.0.2.

**Service calls reject.** Routing, geocoding, EV and the rest reject their promises with
a typed `bemap.Error`. This is the supported, working mechanism:

```js
routing.compute(request).catch(function(err) {
    switch (err.getCode()) {
        case bemap.Error.UNAUTHORIZED: reLogin(); break;
        case bemap.Error.RATE_LIMITED: backoff();  break;
        default: showError(err.getMessage());
    }
});
```

**Tiles errors have a callback.** `bemap.TilesAuth` takes `onError` and `onToken`:

```js
var auth = new bemap.TilesAuth(ctx, {
    onError: function(err) { console.warn(err.getCode(), err.getMessage()); },
    onToken: function(tok) { /* renewed */ }
});
```

**Everything else goes to the console.** `MAPLIBRE_ONLY`, `REQUIRES_GLOBE`,
`CACHE_HOST_CONFLICT`, tile- and style-load failures are reported with `console.warn` /
`console.info`, once per method per map instance.

<div class="bemap-callout">
<strong><code>map.on('error', …)</code> does not give you a <code>bemap.Error</code>.</strong> The library builds a typed error internally and fires it into listener buckets, but <strong>2.0.2 exposes no public way to subscribe to them</strong> — no <code>on()</code> implementation routes to that channel. On MapLibre the call instead attaches to MapLibre GL's <em>own</em> <code>error</code> event, so your callback receives a <code>bemap.MapEvent</code>; calling <code>err.getCode()</code> on it throws, because <code>MapEvent</code> has no such method. The filtered names <code>'error:auth'</code>, <code>'error:network'</code> and <code>'error:maplibre-only'</code> match no engine event and never fire at all. Verified against the shipping 2.0.2 bundle.
</div>

If you do want MapLibre's native render errors, reach through the wrapper explicitly and
treat it as engine-specific code:

```js
if (map instanceof bemap.MapLibreMap) {
    map.on('error', function(evt) {
        // evt is a bemap.MapEvent; MapLibre's error object is on evt.native
        console.warn('maplibre:', evt.native && evt.native.error);
    });
}
```

### Effect notifications — MapLibre

3D buildings, terrain, sky, globe spin and the animations register themselves as named
"effects". Subscribe to know what is currently on:

```js
map.onEffectChange(function(e) {
    console.log(e.name, e.active ? 'on' : 'off');
});

map.getActiveEffects();    // → array of names — a snapshot, not live
map.clearAllEffects();     // tear every one of them down
```

`clearAllEffects()` is the reliable way to get back to a clean map without rebuilding it.

## Reference

### `bemap.Map.EventType`

| Constant | Value | Notes |
| --- | --- | --- |
| `LOAD` | `'load'` | Map ready. Wait for this before manipulating layers. |
| `CLICK` | `'click'` | |
| `SINGLECLICK` | `'singleclick'` | Fires only once double-click is ruled out. |
| `DBLCLICK` | `'dblclick'` | |
| `MOVESTART` | `'movestart'` | |
| `MOVEEND` | `'moveend'` | The one to use for viewport-driven searches. |
| `CHANGE` | `'change'` | |
| `CHANGE_SIZE` | `'change:size'` | |
| `CHANGE_VIEW` | `'change:view'` | |
| `RESIZE` | `'resize'` | |
| `POINTERUP` | `'pointerup'` | |
| `POINTERDOWN` | `'pointerdown'` | |
| `POINTERDRAG` | `'pointerdrag'` | |
| `POINTERMOVE` | `'pointermove'` | High frequency — throttle. |
| `WHEEL` | `'wheel'` | |
| `KEYDOWN` | `'keydown'` | |
| `KEYPRESS` | `'keypress'` | |
| `TOUCHSTART` | `'touchstart'` | |
| `TOUCHMOVE` | `'touchmove'` | |
| `TOUCHEND` | `'touchend'` | |
| `DRAWSTART` | `'drawstart'` | See [Drawing](index.html#subpage-jsapi_2_0_0-js-map-draw.md). |
| `DRAWEND` | `'drawend'` | |
| `DRAWABORT` | `'drawabort'` | |
| `PRECOMPOSE` | `'precompose'` | Render hooks — OpenLayers heritage. |
| `POSTCOMPOSE` | `'postcompose'` | |
| `POSTRENDER` | `'postrender'` | |
| `PROPERTYCHANGE` | `'propertychange'` | |

Not every engine emits every one of these. The render-hook events in particular come
from OpenLayers and have no MapLibre equivalent.

### `bemap.MapEvent`

| Member | Type | Notes |
| --- | --- | --- |
| `getCoordinate()` | `bemap.Coordinate` | The geographic point. |
| `x` / `y` | Number | Screen pixels. |
| `startX` / `startY` | Number | Drag origin, screen pixels. |
| `startCoordinate` | `bemap.Coordinate` | Drag origin, geographic. |
| `map` | `bemap.Map` | |
| `bemapObject` | `bemap.Object` | The marker/polyline/polygon concerned, when applicable. |
| `native` | Object | The engine's own event. |
| `properties` | Object | Custom properties. |

### `bemap.Listener`

Returned by every `on*` method. Opaque — pass it back to `removeListener`.

| Member | Notes |
| --- | --- |
| `native` | The engine's listener handle. |
| `callback` | Your function. |
| `bemapObject` | The object the listener is bound to, if any. |

### Methods

| Method | Returns |
| --- | --- |
| `map.on(eventType, callback, options)` | `bemap.Listener` |
| `map.removeListener(listener, options)` | `this` |
| `map.onEffectChange(callback)` / `map.offEffectChange(callback)` | MapLibre effects |
| `map.getActiveEffects()` | Array of names |
| `map.clearAllEffects()` | `this` |

## Notes

**`CLICK` versus `SINGLECLICK`.** `CLICK` fires immediately. `SINGLECLICK` waits out
the double-click interval and fires only if no second click arrives. If you handle both
a single and a double click, use `SINGLECLICK` for the single one or it will fire on the
first half of every double-click.

**`MOVEEND`, not `MOVESTART`.** Viewport-driven searches belong on `MOVEEND`. Firing on
`MOVESTART` issues a request for a viewport the user is in the middle of leaving.

### Gotchas

- **Attaching listeners before `LOAD`.** The engine may not have a map to attach to yet. Use `onMapReady` (as the demos here do) or listen for `LOAD`.
- **Discarding the returned `Listener`.** Without it there is no way to detach. Keep it if the handler's lifetime is shorter than the map's.
- **Re-attaching on every render.** A component that calls `map.on(...)` in a render path stacks handlers; by the tenth render, one click runs ten handlers.
- **`POINTERMOVE` unthrottled.** Fires on every pixel of movement. Anything expensive inside it will make the map feel broken.
- **Expecting every event on every engine.** `PRECOMPOSE`/`POSTCOMPOSE` are OpenLayers render hooks. Feature-detect rather than assuming.
- **Reaching for `evt.native`.** Fine as an escape hatch, but it ties that code to one engine and silently breaks when you switch.

## See also

- [Interaction](index.html#subpage-jsapi_2_0_0-js-map-interaction.md) — object-scoped events, dragging, feature picking
- [Error handling](index.html#subpage-jsapi_2_0_0-error-handling.md) — the full `bemap.Error` code list
- [Camera &amp; viewport](index.html#subpage-jsapi_2_0_0-js-map-camera.md) — reading the viewport in a `MOVEEND` handler
- [Drawing](index.html#subpage-jsapi_2_0_0-js-map-draw.md) — the `DRAW*` lifecycle
- [Choosing an engine](index.html#subpage-jsapi_2_0_0-js-map-engines.md) — where `MAPLIBRE_ONLY` comes from

<span class="bemap-tag">Foundations</span>

# Quick start

<p class="bemap-tagline">From "I have a login and password" to a rendered route — in five steps and under five minutes. Promise-based, typed errors, engine-agnostic.</p>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_quickstart","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_quickstart', {
        onMapReady: function(map, engine) {
            map.defaultLayers().move(2.5, 46.5, 6);
        }
    });
});
```
<p class="bemap-demo-caption">A blank map of France. Step 4 below shows the same kind of code that powers every service page.</p>

## At a glance

<ul class="bemap-glance">
<li>5 steps: load library → build Context → show map → call service → handle errors.</li>
<li>Engine-agnostic — swap <code>LeafletMap</code> for <code>OlMap</code> or <code>MapLibreMap</code>, the rest stays.</li>
<li>Promise-based throughout — no callbacks, no XHR, no raw JSON.</li>
<li>Typed errors via <code>bemap.Error</code> — inspect <code>.getCode()</code> not HTTP status.</li>
</ul>

## Usage

### 1. Load the library

Self-host the files (from the [GitHub](https://github.com/BeNomadSAS/bemap-js-api) or a cloned repo):

```html
<link rel="stylesheet" href="dist/leaflet.css">
<link rel="stylesheet" href="dist/bemap-js-api.css">
<script src="dist/leaflet.js"></script>
<script src="dist/bemap-js-api.min.js"></script>
```

> Replace `leaflet` with `ol` (OpenLayers) or `maplibre-gl` if you prefer those engines.

### 2. Build a Context

```js
var ctx = new bemap.Context({
    login:    'your-login',
    password: 'your-password',
    host:     'bemap-beta.benomad.com',
    secure:   true,
    geoserver: 'here',
    chargingStationProvider: 'ecoMovement'
});
```

See [The Context](index.html#subpage-jsapi_2_0_0-the-context.md) for the full field list.

<div data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES">

Rendering with MapLibre and BeNomad Tiles? Add two more fields:

```js
    tilesHost:    'mptiles-api.benomad.net',
    tokenStorage: 'session'          // or 'local' / 'memory'
```

</div>

### 3. Show a map

```html
<div id="map" style="height:500px;"></div>
```

```js
var map = new bemap.LeafletMap(ctx, 'map')
    .defaultLayers()
    .move(2.5, 46.5, 6);
```

### 4. Call a service

Every v2 service follows the same shape: build a typed request, call a typed method, get a Promise back.

```js
var routing = new bemap.RoutingV2(ctx);

routing.calculate(new bemap.RoutingRequest({
    destinations: [
        new bemap.Coordinate(2.35, 48.85),    // Paris
        new bemap.Coordinate(4.83, 45.75)     // Lyon
    ],
    routingCriterias: [bemap.RoutingCriteria.FASTEST],
    options: [bemap.RoutingOptions.POLYLINE, bemap.RoutingOptions.ROUTESHEET]
})).then(function(response) {
    var route = response.getFirstRoute();
    console.log('distance:', route.getLength(), 'm');
    console.log('duration:', route.getDuration(), 's');

    map.addPolyline(new bemap.Polyline(route.getPolyline(), {
        style: new bemap.LineStyle({ color: new bemap.Color(31, 119, 180), width: 5 })
    }));
}).catch(function(err) {
    console.error(err.getCode(), err.getMessage());
});
```

### 5. Handle errors

Every rejection is a typed `bemap.Error`:

```js
.catch(function(err) {
    switch (err.getCode()) {
        case bemap.Error.UNAUTHORIZED:     loginAgain(); break;
        case bemap.Error.RATE_LIMITED:     backoffAndRetry(); break;
        case bemap.Error.ROUTING_NO_ROUTE: noRouteUI(); break;
        case bemap.Error.ABORTED:          /* user cancelled */ break;
        default:                           genericErrorUI(err);
    }
});
```

See [Error handling](index.html#subpage-jsapi_2_0_0-error-handling.md) for the full code catalogue.

## Next steps

- Get the library — from **[GitHub](https://github.com/BeNomadSAS/bemap-js-api)** (clone or *Download ZIP*, or browse the `examples/` and API reference online) or as a **[GitHub](https://github.com/BeNomadSAS/bemap-js-api)** — then open `examples/index.html`: the demo dashboard lets you switch engines, switch geoservers, copy code, and try every service.
- Pick a service and read its reference: [Routing](index.html#subpage-jsapi_2_0_0-js-routing-v2.md), [Geocoder](index.html#subpage-jsapi_2_0_0-js-geocoding.md), [EV Smart Routing](index.html#subpage-jsapi_2_0_0-js-ev-smart-routing.md), …
- Coming from v1? Read [Migration from v1](index.html#subpage-jsapi_2_0_0-migration-from-v1.md).

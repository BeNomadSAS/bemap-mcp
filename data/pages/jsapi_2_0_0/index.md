<span class="bemap-tag">Overview</span>

# BeMap JS API v2.0

<p class="bemap-tagline">Modern Promise-based JavaScript SDK for BeMap services. Every REST endpoint as a typed service — typed request, typed response, typed errors, uniform cancellation. No callbacks, no XHR, no raw JSON.</p>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_index","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_index', {
        onMapReady: function(map, engine) {
            map.defaultLayers().move(2.5, 46.5, 6);
        }
    });
});
```
<p class="bemap-demo-caption">A neutral map of France. Pick the engine in the sidebar — same code, three renderers. Open any service page to see the matching service in action.</p>

<div class="bemap-callout">
<strong>Looking for v1?</strong> The previous callback-style API is still available — start at <a href="index.html#subpage-jsapi_1_0_0-js-authentication.md">BeMap JS API v1</a>, or pick <em>v1 (historical)</em> in the API-version selector. v1 classes stay deprecated through the v2.x line; removal in v3.0.
</div>

## The v2 contract

```js
var ctx = new bemap.Context({
    login:    'your-login',
    password: 'your-password',
    host:     'bemap-beta.benomad.com',
    secure:   true,
    geoserver: 'here',
    chargingStationProvider: 'ecoMovement'  // only for EV/CS services
});

var routing = new bemap.RoutingV2(ctx);
routing.calculate(new bemap.RoutingRequest({
    destinations: [
        new bemap.Coordinate(2.35, 48.85),
        new bemap.Coordinate(4.83, 45.75)
    ],
    routingCriterias: [bemap.RoutingCriteria.FASTEST],
    options: [bemap.RoutingOptions.POLYLINE]
})).then(function(response) {
    var route = response.getFirstRoute();
    drawPolyline(route.getPolyline());
}).catch(function(err) {
    if (err.getCode() === bemap.Error.ROUTING_NO_ROUTE) noRouteUI();
});
```

Every v2 service follows this shape. See [Quick start](index.html#subpage-jsapi_2_0_0-quick-start.md) for a step-by-step walk-through.

<div data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES">

Rendering with MapLibre and BeNomad Tiles? Add two more Context fields:

```js
    tilesHost:    'mptiles-api.benomad.net',
    tokenStorage: 'session'          // or 'local' / 'memory'
```

</div>

## Sections

### Foundations
- [Install & setup](index.html#subpage-jsapi_2_0_0-install.md) — bundle, script tags, peer versions
- [Quick start](index.html#subpage-jsapi_2_0_0-quick-start.md)
- [Authentication](index.html#subpage-jsapi_2_0_0-authentication.md)
- [The Context](index.html#subpage-jsapi_2_0_0-the-context.md)
- [Credential-less setup — the `proxy` option](index.html#subpage-jsapi_2_0_0-security-proxy.md) — the production pattern
- [Error handling — `bemap.Error`](index.html#subpage-jsapi_2_0_0-error-handling.md)
- [Cancellation — `AbortSignal`](index.html#subpage-jsapi_2_0_0-cancellation.md)
- [Helpers & value types](index.html#subpage-jsapi_2_0_0-js-helpers.md) — `Coordinate`, `BoundingBox`, `Color`, `Icon`
- [Snippet helpers](index.html#subpage-jsapi_2_0_0-snippet-helpers.md)

<div data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES">
<h3 id="benomadtiles">BeNomad Tiles</h3>
<ul>
<li><a href="index.html#subpage-jsapi_2_0_0-js-tiles-overview.md">Overview &amp; access</a> — what it is, and which integration path to take</li>
<li><a href="index.html#subpage-jsapi_2_0_0-js-tiles-auth.md">Sessions &amp; tokens</a> — one login, a one-hour session</li>
<li><a href="index.html#subpage-jsapi_2_0_0-js-tiles-web-pmtiles.md">Web — PMTiles</a> — the browser path</li>
<li><a href="index.html#subpage-jsapi_2_0_0-js-tiles-mobile-zxy.md">Mobile &amp; fleet — z/x/y tiles</a> — native apps and server-to-server</li>
<li><a href="index.html#subpage-jsapi_2_0_0-js-tiles-styles.md">Styles &amp; BeMaputnik</a> — change the look of every map centrally</li>
<li><a href="index.html#subpage-jsapi_2_0_0-js-tiles-cache.md">Cache, slices &amp; resilience</a></li>
<li><a href="index.html#subpage-jsapi_2_0_0-js-tiles-troubleshooting.md">Troubleshooting</a></li>
</ul>
</div>

### Mapping
- [Choosing an engine](index.html#subpage-jsapi_2_0_0-js-map-engines.md) — the capability matrix, and the 24 MapLibre-only methods
- [Display map (Leaflet)](index.html#subpage-jsapi_2_0_0-js-map-leaflet.md)
- [Display map (OpenLayers)](index.html#subpage-jsapi_2_0_0-js-map-openlayers.md)
- [Display map (MapLibre)](index.html#subpage-jsapi_2_0_0-js-map-maplibre.md) — 3D, globe, vector tiles, heatmap, native clustering
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><a href="index.html#subpage-jsapi_2_0_0-js-tiles-web-pmtiles.md">Web — PMTiles</a></li>
- [Camera & viewport](index.html#subpage-jsapi_2_0_0-js-map-camera.md) — move, fly, fit, rotate, tilt
- [Backgrounds & basemaps](index.html#subpage-jsapi_2_0_0-js-map-backgrounds.md) — WMS, geoservers, raster tiles
- [Layers](index.html#subpage-jsapi_2_0_0-js-map-layers.md)
- [Events](index.html#subpage-jsapi_2_0_0-js-map-events.md) — event types, `MapEvent`, error channels
- [Interaction](index.html#subpage-jsapi_2_0_0-js-map-interaction.md) — picking, dragging, feature queries
- [Markers](index.html#subpage-jsapi_2_0_0-js-map-markers.md)
- [Polyline](index.html#subpage-jsapi_2_0_0-js-map-shapes.md)
- [Popup](index.html#subpage-jsapi_2_0_0-js-map-popup.md)
- [Drawing & editing](index.html#subpage-jsapi_2_0_0-js-map-draw.md)
- [Styling](index.html#subpage-jsapi_2_0_0-js-map-styling.md) — lines, polygons, circles, text
- [GeoJSON sources](index.html#subpage-jsapi_2_0_0-js-map-geojson.md)
- [Clustering](index.html#subpage-jsapi_2_0_0-js-map-clustering.md)
- [Heatmap](index.html#subpage-jsapi_2_0_0-js-map-heatmap.md)
- [3D & terrain](index.html#subpage-jsapi_2_0_0-js-map-3d.md) — buildings, terrain, sky, light
- [Globe projection](index.html#subpage-jsapi_2_0_0-js-map-globe.md)
- [Animation](index.html#subpage-jsapi_2_0_0-js-map-animation.md) — routes, tours, orbits, pulses
- [Traffic overlay](index.html#subpage-jsapi_2_0_0-js-mapping-display-traffic.md)
- [Attribution widget](index.html#subpage-jsapi_2_0_0-js-map-attribution.md)

### Routing
- [`bemap.RoutingV2` — point-to-point](index.html#subpage-jsapi_2_0_0-js-routing-v2.md)
- [Matrix mode](index.html#subpage-jsapi_2_0_0-js-routing-matrix.md)
- [Isochrone mode](index.html#subpage-jsapi_2_0_0-js-routing-isochrone.md)
- [`bemap.TraceRoute` — GPS trace matching](index.html#subpage-jsapi_2_0_0-js-traceroute.md)
- [The routing response](index.html#subpage-jsapi_2_0_0-js-routing-response.md) — routes, summaries, instructions, waypoints

### Search
- [`bemap.Geocoder`](index.html#subpage-jsapi_2_0_0-js-geocoding.md)
- [`bemap.Autocomplete`](index.html#subpage-jsapi_2_0_0-js-autocomplete.md)
- [`bemap.GeoAutocomplete`](index.html#subpage-jsapi_2_0_0-js-geoautocomplete.md)
- [`bemap.ReverseGeocoder`](index.html#subpage-jsapi_2_0_0-js-reversegeocoding.md)
- [`bemap.NearPoiSearch`](index.html#subpage-jsapi_2_0_0-js-near-poi.md)

### Electric Mobility
- [`bemap.ChargingStations`](index.html#subpage-jsapi_2_0_0-js-charging-stations.md)
- [`bemap.EvSmartRouting`](index.html#subpage-jsapi_2_0_0-js-ev-smart-routing.md)
- [`bemap.ChargingTime`](index.html#subpage-jsapi_2_0_0-js-charging-time.md)
- [`bemap.EvVehicles`](index.html#subpage-jsapi_2_0_0-js-ev-vehicles.md)
- [`bemap.EvReachableArea`](index.html#subpage-jsapi_2_0_0-js-ev-reachable-area.md)

### ACL & Admin
- [`bemap.AclService`](index.html#subpage-jsapi_2_0_0-js-acl-service.md)
- [`bemap.GeoServerInfoService`](index.html#subpage-jsapi_2_0_0-js-geoserver-info.md)

### Migration from v1
- [v1 → v2 cheat sheet](index.html#subpage-jsapi_2_0_0-migration-from-v1.md)
- [Routing](index.html#subpage-jsapi_2_0_0-migration-routing.md)
- [EV Routing](index.html#subpage-jsapi_2_0_0-migration-evrouting.md)
- [Geocoding](index.html#subpage-jsapi_2_0_0-migration-geocoding.md)
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><a href="index.html#subpage-jsapi_2_0_0-migration-wms-to-tiles.md">WMS → BeNomad Tiles</a> — raster basemap to vector tiles</li>
- [OpenLayers 4 → 10](index.html#subpage-jsapi_2_0_0-migration-ol4-to-ol10.md)

### Glossaries
- [Charging-station connectors](index.html#subpage-jsapi_2_0_0-glossary-chargingstation-connectors.md)
- [Coordinate system](index.html#subpage-jsapi_2_0_0-glossary-coordinate_system.md)
- [Google encoded polyline format](index.html#subpage-jsapi_2_0_0-glossary-google_encoded_polyline_algorithm_format.md)
- [Error codes](index.html#subpage-jsapi_2_0_0-glossary-error-codes.md)
- [Enums reference](index.html#subpage-jsapi_2_0_0-glossary-enums.md) — all 17 enumerations

### Reference
- [JSDoc reference](../dist/doc/index.html) — generated reference for every public class.
- [What's new](index.html#subpage-jsapi_2_0_0-changelog.md) — release highlights
- [Credits & licences](index.html#subpage-jsapi_2_0_0-credits.md)
- [Contact](index.html#subpage-jsapi_2_0_0-contact.md)

## Get the library

Get it from **GitHub** — [github.com/BeNomadSAS/bemap-js-api](https://github.com/BeNomadSAS/bemap-js-api). Clone it, or use *Download ZIP*, or browse the `examples/` and API reference online. The package contains `dist/bemap-js-api.min.js`, the engine bundles (Leaflet / OpenLayers / MapLibre), `examples/`, and the API reference.

Open `examples/index.html` for the demo dashboard. The JSDoc API reference is also browseable directly: [`dist/doc/`](../dist/doc/index.html).

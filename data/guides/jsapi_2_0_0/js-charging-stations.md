<span class="bemap-tag">Electric mobility</span>

# Charging Stations — `bemap.ChargingStations`

<p class="bemap-tagline">Search for EV charging pools / stations / points around a coordinate, along a corridor, or inside a bounding box. Promise-based wrapper around <code>POST service/chargingstation/search/1.0</code>.</p>

<div class="bemap-callout">
<strong>Provider.</strong> Charging stations are scoped by <code>chargingStationProvider</code> (NOT a geoserver). On the public beta server use <code>ecoMovement</code>.<br>
<strong>Your allowed providers:</strong> <span id="allowed_csp_chargingstations">…</span>
</div>

<script>$(document).ready(function(){ bemap.docs.renderAllowed('allowed_csp_chargingstations', { kind: 'provider' }); });</script>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_chargingstations","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_chargingstations', {
        onMapReady: function(map, engine) {
            // Start at the search centre (Paris, zoom 12) so the user sees
            // the right area immediately — fitToCoords refines once pools land.
            var searchCentre = new bemap.Coordinate(2.35, 48.85);
            map.defaultLayers().move(searchCentre.getLon(), searchCentre.getLat(), 12);

            var providers = bemapMainCtx.getChargingStationProvider
                ? [bemapMainCtx.getChargingStationProvider() || 'ecoMovement']
                : ['ecoMovement'];

            var cs = new bemap.ChargingStations(bemapMainCtx);
            return cs.search(new bemap.ChargingStationSearchRequest({
                providers: providers,
                coordinate: searchCentre,
                radius: 3000,
                mode: bemap.ChargingStationMode.LOCAL_OR_REMOTE,
                options: [bemap.ChargingStationOption.PATH_POOL_MAP],
                maxPoolResult: 30
            })).then(function(response) {
                var pts = [];
                response.getPools().forEach(function(pool) {
                    var c = pool.getCoordinate();
                    if (!c) return;
                    pts.push(c);
                    map.addMarker(new bemap.Marker(c));
                });
                // Fit to whatever came back; on empty result keep the
                // search-centre view (already set above).
                if (pts.length) bemap.docs.fitToCoords(map, pts);
            }).catch(function(err) {
                bemap.docs.showError('mapV2_chargingstations', err);
                console.error('Charging-station search failed:', err.getMessage ? err.getMessage() : err);
            });
        }
    });
});
```
<p class="bemap-demo-caption">Up to 30 charging-station pools within 3 km of Paris, drawn as markers. Uses <code>ctx.chargingStationProvider</code> if set, otherwise falls back to <code>ecoMovement</code>.</p>

## At a glance

<ul class="bemap-glance">
<li>Endpoint: <code>POST service/chargingstation/search/1.0</code>.</li>
<li>Three search shapes: circular (<code>coordinate + radius</code>), corridor (<code>corridor + radius</code>), or rectangular (<code>boundingBox</code>) — exactly one required.</li>
<li>Provider gating: <code>request.providers</code> MUST be drawn from the user's ACL. Discover via <code>bemap.helpers.listChargingStationProviders(ctx)</code>.</li>
<li>Hierarchy: response → pools → stations → points; each layer adds more detail.</li>
<li>Companion: <code>cs.getConnectorTypes()</code> for the connector-type catalogue.</li>
</ul>

## Usage

```js
var cs = new bemap.ChargingStations(ctx);

cs.search(new bemap.ChargingStationSearchRequest({
    providers: ['ecoMovement'],
    coordinate: new bemap.Coordinate(2.35, 48.85),
    radius: 5000,
    mode: bemap.ChargingStationMode.LOCAL_OR_REMOTE,
    options: [bemap.ChargingStationOption.PATH_POOL_MAP, bemap.ChargingStationOption.AVAILABLE_CONNECTOR_TYPES],
    maxPoolResult: 50
})).then(function(response) {
    response.getPools().forEach(function(pool) {
        console.log(pool.getName(), '—', pool.getMaxNominalPower(), 'kW');
    });
});
```

## Reference

### Constructor

```js
new bemap.ChargingStations(context)
```

### Methods

| Method | Returns | Notes |
| --- | --- | --- |
| `search(request, options?)` | `Promise<bemap.ChargingStationSearchResponse>` | `options` accepts `{ signal?: AbortSignal }`. |
| `getConnectorTypes(options?)` | `Promise<Array<Object>>` | Wraps `GET service/chargingstation/connector/list/1.0`. See [Connector types glossary](index.html#subpage-jsapi_2_0_0-glossary-chargingstation-connectors.md). |

### Request fields — `bemap.ChargingStationSearchRequest`

| Field | Type | Notes |
| --- | --- | --- |
| `providers` **R** | `Array<String>` | E.g. `['ecoMovement']`. Drawn from the user's ACL. Falls back to `ctx.chargingStationProvider`. |
| `mode` | `bemap.ChargingStationMode.*` | 7-value enum (`LOCAL_OR_REMOTE` default). |
| `options` | `Array<String>` | `bemap.ChargingStationOption.*` — `PATH_POOL_MAP`, `PATH_POOL`, `PATH_STATION`, `PATH_POINT`, `PATH_AUTO`, `AVAILABLE_CONNECTOR_TYPES`, `DEPRECATED_CONNECTOR`. |
| `coordinate` + `radius` | `Coordinate` + Number (m) | Circular search. |
| `corridor` + `radius` | `Array<Coordinate>` + Number (m) | Corridor search. |
| `boundingBox` | `bemap.BoundingBox` | Rectangular search. |
| `maxPoolResult` | Number | |
| `connectorIdFilters` | `Array<Number>` | Connector type IDs. |
| `language` | String (ISO 639-1) | For address fields. |
| `geoserver` | String | Per-request override. |

Exactly one of `coordinate+radius`, `corridor+radius`, or `boundingBox` must be set.

### Response — `bemap.ChargingStationSearchResponse`

| Accessor | Returns |
| --- | --- |
| `getPools()` | `Array<bemap.ChargingStationPool>` |

### `bemap.ChargingStationPool`

| Accessor | Returns |
| --- | --- |
| `getId()` | String |
| `getName()` | String |
| `getBrand()` | String |
| `getCoordinate()` | `bemap.Coordinate` |
| `getFormattedAddress()` | String |
| `getMaxNominalPower()` | Number (kW) |
| `getNumberOfChargingPoint()` | Number |
| `getAvailabilityStatus()` | String |
| `getChargingStations()` | `Array<bemap.ChargingStation>` |

### `bemap.ChargingStation` → `bemap.ChargingPoint`

`ChargingStation.getChargingPoints()` returns `Array<ChargingPoint>`. Each `ChargingPoint` exposes `getPower()`, `getConnectorTypes()`, `getCurrentType()` (AC/DC), `getVoltage()`, `getAmpere()`.

## Notes

The full interactive demo (drop a search centre, pick a radius and providers, see pools render with availability colour-coding) ships with the library — see [the GitHub repository](https://github.com/BeNomadSAS/bemap-js-api), then open `examples/services-v2/charging-stations.html`.

## See also

- [EV Smart Routing](index.html#subpage-jsapi_2_0_0-js-ev-smart-routing.md)
- [Connector types glossary](index.html#subpage-jsapi_2_0_0-glossary-chargingstation-connectors.md)
- [ACL service](index.html#subpage-jsapi_2_0_0-js-acl-service.md) — discover allowed providers
- REST endpoint: `POST service/chargingstation/search/1.0`

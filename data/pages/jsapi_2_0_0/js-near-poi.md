<span class="bemap-tag">Search</span>

# Near POI Search — `bemap.NearPoiSearch`

<p class="bemap-tagline">Find points of interest near a coordinate, ranked by distance or driving duration. Each result carries name, type, coordinate, telephone, and an optional snap polyline back to the search centre.</p>

<div class="bemap-callout">
<strong>Geoserver.</strong> Calls <code>POST service/nearpoi/1.0</code> — needs a geoserver with POI data plumbed in. On the public beta server <code>here</code> works. Change <code>bemapMainCtx.geoserver</code> in <a href="../context.js">context.js</a> to switch.<br>
<strong>Your allowed geoservers:</strong> <span id="allowed_geo_nearpoi">…</span>
</div>

<script>$(document).ready(function(){ bemap.docs.renderAllowed('allowed_geo_nearpoi'); });</script>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_nearpoi","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_nearpoi', {
        onMapReady: function(map, engine) {
            map.defaultLayers().move(2.5, 46.5, 6);

            var nearPoi = new bemap.NearPoiSearch(bemapMainCtx);
            return nearPoi.nearPoi(new bemap.NearPoiRequest({
                coordinate: new bemap.Coordinate(2.349, 48.853),
                distance: 1000,
                orderBy: bemap.NearPoiOrder.DISTANCE_ASC,
                maxResult: 20
            })).then(function(response) {
                var pts = [];
                response.getPoints().forEach(function(p) {
                    var c = p.getCoordinate();
                    if (!c) return;
                    pts.push(c);
                    map.addMarker(new bemap.Marker(c));
                });
                if (pts.length) bemap.docs.fitToCoords(map, pts);
            }).catch(function(err) {
                bemap.docs.showError('mapV2_nearpoi', err);
                console.error('Near POI search failed:', err.getMessage ? err.getMessage() : err);
            });
        }
    });
});
```
<p class="bemap-demo-caption">Up to 20 POIs within 1 km of Notre-Dame, drawn as markers, sorted by distance.</p>

## At a glance

<ul class="bemap-glance">
<li>Endpoint: <code>POST service/nearpoi/1.0</code>.</li>
<li>Returns <code>Array&lt;bemap.NearPoint&gt;</code> via <code>response.getPoints()</code>.</li>
<li>Order by <code>DISTANCE_ASC</code> or <code>DURATION_ASC</code> via <code>bemap.NearPoiOrder.*</code>.</li>
<li>Filter by <code>categories</code> and <code>transportType</code>.</li>
<li>Set <code>enablePolyline: true</code> to receive the snap polyline back to the search centre per POI.</li>
</ul>

## Usage

```js
var nearPoi = new bemap.NearPoiSearch(ctx);

nearPoi.nearPoi(new bemap.NearPoiRequest({
    coordinate: new bemap.Coordinate(2.35, 48.85),
    distance: 1500,                                       // metres
    transportType: bemap.TransportMode.CAR,
    orderBy: bemap.NearPoiOrder.DURATION_ASC,
    enablePolyline: true
})).then(function(response) {
    response.getPoints().forEach(function(p) {
        console.log(p.getName(), '—', p.getDistance(), 'm,', p.getDuration(), 's');
    });
});
```

## Reference

### Constructor

```js
new bemap.NearPoiSearch(context)
```

### Methods

| Method | Returns | Notes |
| --- | --- | --- |
| `nearPoi(request, options?)` | `Promise<bemap.NearPoiResponse>` | `options` accepts `{ signal?: AbortSignal }`. |

### Request fields — `bemap.NearPoiRequest`

| Field | Type | Notes |
| --- | --- | --- |
| `coordinate` **R** | `bemap.Coordinate` | Search centre. |
| `distance` **R** | Number (m) | Radius. |
| `transportType` | `bemap.TransportMode.*` | Filter by reachability (`CAR`, `PEDESTRIAN`, …). |
| `orderBy` | `bemap.NearPoiOrder.*` | `DISTANCE_ASC`, `DURATION_ASC`, … |
| `enablePolyline` | Boolean | Include the snap polyline to each POI. |
| `categories` | `Array<String>` | Filter by POI category. |
| `maxResult` | Number | |
| `language` | String (ISO 639-1) | |

### Response — `bemap.NearPoiResponse`

| Accessor | Returns |
| --- | --- |
| `getPoints()` | `Array<bemap.NearPoint>` |

### `bemap.NearPoint`

| Accessor | Returns |
| --- | --- |
| `getName()` | String |
| `getType()` | String — POI category code |
| `getCoordinate()` | `bemap.Coordinate` |
| `getDistance()` | Number (m) |
| `getDuration()` | Number (s) |
| `getTelephone()` | String |
| `getPolyline()` | `Array<Coordinate>` — when `enablePolyline: true` |

## Notes

The full interactive demo (drop a search centre, pick a radius, see ranked POIs) ships with the library — see [the GitHub repository](https://github.com/BeNomadSAS/bemap-js-api), then open `examples/services-v2/near-poi.html`.

## See also

- [Reverse geocoder](index.html#subpage-jsapi_2_0_0-js-reversegeocoding.md) — for snapping clicks to roads
- REST endpoint: `POST service/nearpoi/1.0`

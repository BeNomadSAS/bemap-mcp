<span class="bemap-tag">Glossary</span>

# Enums reference

<p class="bemap-tagline">Every enumeration in the library, in one place. Read from the shipping 2.0.2 bundle rather than transcribed, so the values here are the values your code will see.</p>

<div class="bemap-callout">
<strong>Use the constants, not the strings.</strong> Every value happens to equal its own name, which makes <code>'MODE_VIAS'</code> look as good as <code>bemap.RoutingMode.MODE_VIAS</code>. It is not: a typo in a constant is an immediate <code>undefined</code>, a typo in a string is a server-side rejection much later, with a worse message.
</div>

## At a glance

<ul class="bemap-glance">
<li><strong>17 enumerations</strong> across mapping, routing, search and EV.</li>
<li>Mapping: <code>bemap.Map.EventType</code>, <code>bemap.Map.DEFAULT_LAYER</code>, <code>bemap.Map.PROJ</code>, the three <code>TYPE</code> enums.</li>
<li>Routing: <code>RoutingMode</code>, <code>RoutingCriteria</code>, <code>RoutingOptions</code>, <code>RoutingInstructionType</code>, <code>TransportMode</code>.</li>
<li>Search: <code>GeocodingSearchType</code>, <code>AssetSearchType</code>, <code>NearPoiOrder</code>, <code>RevGeocodingOptions</code>.</li>
<li>EV: <code>ChargingStationMode</code>, <code>ChargingStationOption</code>.</li>
<li>Error codes live on <code>bemap.Error.*</code> — 22 of them, on their own page.</li>
</ul>

## Mapping

### `bemap.Map.EventType`

27 values. Listed in full on [Events](index.html#subpage-jsapi_2_0_0-js-map-events.md).

`LOAD`, `CHANGE`, `CHANGE_SIZE`, `CHANGE_VIEW`, `RESIZE`, `CLICK`, `SINGLECLICK`,
`DBLCLICK`, `MOVESTART`, `MOVEEND`, `POINTERUP`, `POINTERDOWN`, `POINTERDRAG`,
`POINTERMOVE`, `POSTCOMPOSE`, `POSTRENDER`, `PRECOMPOSE`, `PROPERTYCHANGE`, `WHEEL`,
`KEYDOWN`, `KEYPRESS`, `TOUCHSTART`, `TOUCHMOVE`, `TOUCHEND`, `DRAWSTART`, `DRAWEND`,
`DRAWABORT`

### `bemap.Map.DEFAULT_LAYER`

The layers `map.defaultLayers()` creates.

| Constant | Value |
| --- | --- |
| `BACKGROUND` | `'background'` |
| `MARKER` | `'marker'` |
| `POLYLINE` | `'polyline'` |
| `POLYGON` | `'polygon'` |
| `CIRCLE` | `'circle'` |
| `ROUTE` | `'route'` |

### `bemap.Map.PROJ`

| Constant | Value | Notes |
| --- | --- | --- |
| `EPSG_WGS84` | `'EPSG:4326'` | Longitude/latitude in degrees — what the API speaks. |
| `EPSG_MERCATOR` | `'EPSG:3857'` | Web Mercator — what tiles are rendered in. |

Not to be confused with `map.setProjection('globe' | 'mercator')`, which is a MapLibre
rendering mode and takes plain strings, not these constants.

### `bemap.LineStyle.TYPE`, `bemap.PolygonStyle.TYPE`, `bemap.CircleStyle.TYPE`

The same four values on all three.

| Constant | Value |
| --- | --- |
| `PLANE` | `'plane'` — solid |
| `DASH` | `'dash'` |
| `DOT` | `'dot'` |
| `DOT_DASH` | `'dot dash'` |

## Routing

### `bemap.RoutingMode`

| Constant | Meaning |
| --- | --- |
| `MODE_VIAS` | Point to point, through any vias. The default. |
| `MODE_1_TO_N` | One origin, many destinations. |
| `MODE_N_TO_1` | Many origins, one destination. |
| `MODE_N_TO_N` | Many to many. |
| `MODE_MATRIX` | Distance/duration matrix — read with `response.getMatrix()`. |
| `MODE_ISOCHRONE` | Reachable area — read with `response.getIsochrone()`. |

### `bemap.RoutingCriteria`

| Constant | Meaning |
| --- | --- |
| `FASTEST` | Minimise time. |
| `FASTER` | Bias toward time. |
| `SHORTEST` | Minimise distance. |
| `ECO_ENERGY` | Minimise energy use. |
| `AVOID_FERRIES` | |
| `AVOID_MOTORWAYS` | |
| `AVOID_TOLLS` | |
| `AVOID_UNPAVED` | |
| `AVOID_CROSSING_BORDER` | |
| `CARPOOL` | Allow carpool lanes. |

`AVOID_*` are preferences, not guarantees — when no alternative exists the route uses
the avoided feature and says so in `response.getWarnings()`.

### `bemap.TransportMode`

| Constant |
| --- |
| `CAR` |
| `PEDESTRIAN` |
| `BICYCLE` |
| `MOTORCYCLE` |
| `TAXI` |
| `PUBLIC_BUS` |
| `EMERGENCY` |
| `DELIVERY_TRUCK` |
| `TRUCK` |

### `bemap.RoutingInstructionType`

The manoeuvre kinds in turn-by-turn output.

| Group | Constants |
| --- | --- |
| Endpoints | `DEPART`, `ARRIVE`, `WAYPOINT` |
| Straight on | `CONTINUE` |
| Turns | `TURN_LEFT`, `TURN_RIGHT`, `TURN_SLIGHT_LEFT`, `TURN_SLIGHT_RIGHT`, `TURN_SHARP_LEFT`, `TURN_SHARP_RIGHT`, `UTURN` |
| Lane keeping | `KEEP_LEFT`, `KEEP_RIGHT` |
| Roundabouts | `ROUNDABOUT_ENTER`, `ROUNDABOUT_EXIT` |
| Motorways | `HIGHWAY_ENTER`, `HIGHWAY_EXIT` |
| Ferries | `FERRY_ENTER`, `FERRY_EXIT` |

### `bemap.RoutingOptions`

67 flags controlling what the response contains. Grouped by what they add:

| Group | Constants |
| --- | --- |
| Geometry | `POLYLINE`, `DETAILED_POLYLINE`, `POLYLINE_INDEX`, `WAYPOINTS_POLYLINE`, `FENCE_SHAPE` |
| Waypoints | `WAYPOINTS`, `MINIMAL_WAYPOINTS`, `NO_MINIMAL_WAYPOINTS`, `USED_DESTINATIONS_OFF`, `STARTSTOPINFO_WITHVIA`, `SORTBY_USED_ORDER` |
| Turn-by-turn | `ROUTESHEET`, `ROUTESHEET_VERBOSE_LOW`, `ROUTESHEET_VERBOSE_MEDIUM`, `ROUTESHEET_VERBOSE_HIGH` |
| Network references | `OPENLR`, `SEGMENTIDS`, `ROAD_SEGMENTS`, `JUNCTION_NODES` |
| Off-road | `OFFROADS`, `OFFROADS_RAWDATA` |
| Cost &amp; energy | `ENERGY_CONSUMPTION`, `TOLL_COST`, `TAX_COST`, `ECO_TAX` |
| Reverse geocoding | `REVGEO_POSTAL_ADDRESS`, `REVGEO_STRICT_DISABLE` |
| Trip optimisation | `OPTIMIZED_TRIP`, `OPTIMIZED_TRIP_CLOSE`, `OPTIMIZED_TRIP_ROUND`, `OPTIMIZED_TRIP_UNDEFSTOP`, `OPTIMIZED_ROUTE_FOR_CHARGING_STATION` |
| Isochrone | `ISOCHRONE_FORWARD`, `ISOCHRONE_BACKWARD` |
| Matrix | `MATRIX_COMPLEMENT`, `MATRIX_FOR_ROUND_OPTIM` |
| Map matching | `MAPMATCH_AVOID_BRIDGE`, `MAPMATCH_AVOID_TUNNEL` |
| Traffic | `TRAFFIC`, `TRAFFIC_PATTERNS`, `TRAFFIC_PREDICTIVE` |
| Events | `EVENT`, `EVT_DUPLICATE_FILTER`, `EVT_ENTRY_VALUE_AS_OBJECT`, `EVT_ROAD_FEATURE`, `EVT_PROHIBITED_DRIVING`, `EVT_ELEVATION`, `EVT_ELEVATION2`, `EVT_OBJECTID_BASE64`, `EVT_SEGMENT_INFO`, `EVT_GEOELEMENT_TYPE`, `EVT_POLYLINE`, `EVT_ENCODED_POLYLINE`, `EVT_LENGTH`, `EVT_DURATION`, `EVT_ENERGY_CONSUMPTION`, `EVT_ENERGY_CONSUMPTION_SAMPLE`, `EVT_CHARGING_STATION`, `EVT_CHARGING_STATION_DYNAMIC`, `EVT_TOLL_COST`, `EVT_TAX_COST`, `EVT_TRAFFIC`, `EVT_TRAFFIC_PREDICTIVE`, `EVT_TRAFFIC_HISTORICAL`, `EVT_ROUTESHEET`, `EVT_TRAFFIC_SIGNS`, `EVT_WAYPOINTS` |

Every option costs response size and computation. Ask for what you will read — see
[The routing response](index.html#subpage-jsapi_2_0_0-js-routing-response.md).

### `bemap.TraceRouteOptions`

49 flags for GPS-trace matching. Largely the same vocabulary as `RoutingOptions` — the
geometry, waypoint, cost and `EVT_*` groups are shared — minus the trip-optimisation,
isochrone and matrix families, which do not apply to a trace. See
[TraceRoute](index.html#subpage-jsapi_2_0_0-js-traceroute.md).

## Search

### `bemap.GeocodingSearchType`

| Constant | Meaning |
| --- | --- |
| `FREE_TEXT` | Unstructured single-line query. |
| `HOUSENUMBER` | Street-number level. |
| `POSTCODE` | |
| `PLACE` | Town, city, locality. |
| `CONTAINS` | Substring match. |
| `FUZZY` | Tolerates typos. |
| `STRICT` | Exact match. |
| `STRICT_BEGINNING` | Exact prefix. |
| `WORD_BEGINNING` | Any word's prefix — the usual choice for autocomplete. |
| `KEY_SEARCH` | Search by key. |

### `bemap.AssetSearchType`

| Constant |
| --- |
| `ADDRESS` |
| `ROAD` |
| `PLACE` |
| `POINT_OF_INTEREST` |

### `bemap.NearPoiOrder`

| Constant | Meaning |
| --- | --- |
| `DISTANCE_ASC` | Nearest first. |
| `DISTANCE_DESC` | Furthest first. |
| `DURATION_ASC` | Quickest to reach first. |
| `DURATION_DESC` | Slowest first. |

Distance is as-the-crow-flies; duration is drive time. For "the closest station" they
frequently disagree, and duration is usually what the user means.

### `bemap.RevGeocodingOptions`

| Constant |
| --- |
| `START_AT_RADIUS` |
| `THROUGH_POINT_ADDRESS` |
| `SKIP_EMPTY_STREETNAME` |
| `OPPOSITE_POSTAL_ADDRESS` |
| `OPPOSITE_POSTAL_ADDRESS_ALWAYS` |
| `URBAN_AREA` |
| `ROAD_FEATURE` |
| `SEGMENTID` |
| `POLYLINE` |
| `TRAFFIC` |
| `TRAFFIC_PREDICTIVE` |
| `TRAFFIC_HISTORICAL` |

## Electric mobility

### `bemap.ChargingStationMode`

How local and remote (operator-live) data are combined.

| Constant | Meaning |
| --- | --- |
| `LOCAL` | Local dataset only. |
| `REMOTE` | Operator data only. |
| `LOCAL_AND_REMOTE` | Both, merged. |
| `LOCAL_OR_REMOTE` | Local, falling back to remote. |
| `REMOTE_OR_LOCAL` | Remote, falling back to local. |
| `LOCAL_IFNOPOOLS_REMOTE` | Local; remote only when no pools were found. |
| `REMOTE_IFNOPOOLS_LOCAL` | Remote; local only when no pools were found. |

Remote modes are live and therefore slower and dependent on the operator's availability.

### `bemap.ChargingStationOption`

| Constant |
| --- |
| `AVAILABLE_CONNECTOR_TYPES` |
| `DEPRECATED_CONNECTOR` |
| `PATH_POOL_MAP` |
| `PATH_POINT_MAP` |
| `PATH_POOL` |
| `PATH_STATION` |
| `PATH_POINT` |
| `PATH_AUTO` |

## Errors

`bemap.Error` carries 22 flat string constants rather than a nested enum object —
`bemap.Error.UNAUTHORIZED`, `bemap.Error.MAPLIBRE_ONLY`, and so on. Full list with
causes and remedies on [Error codes](index.html#subpage-jsapi_2_0_0-glossary-error-codes.md).

## Notes

**Values equal their names.** Every enum here maps a constant to a string identical to
the constant. That is why using the constant matters: misspell `MODE_VIAS` as
`MODE_VAIS` on `bemap.RoutingMode` and you get `undefined` the instant you write it,
whereas the bare string `'MODE_VAIS'` sails through your code and fails at the server —
much later, with a much worse message.

**Enums are not entitlements.** A constant existing in the bundle says nothing about
whether your account may use the feature. `TRAFFIC` compiles for everyone and returns
`403` without the grant. Check with the [ACL service](index.html#subpage-jsapi_2_0_0-js-acl-service.md).

### Gotchas

- **`bemap.Map.PROJ` versus `setProjection()`.** `PROJ` holds EPSG coordinate-system codes. `setProjection` takes `'globe'` or `'mercator'`. Unrelated.
- **`bemap.clusterStyle` is lower-case.** Not an enum, but the same class of surprise — see [Clustering](index.html#subpage-jsapi_2_0_0-js-map-clustering.md).
- **`PLANE` means solid.** Not "plain", not an aircraft.
- **Requesting every `RoutingOptions` flag.** Response size and latency both suffer. Ask for what you read.
- **Assuming every `EventType` fires on every engine.** The render hooks are OpenLayers heritage.
- **Treating `AVOID_*` as absolute.** They are preferences; check `getWarnings()`.

## See also

- [Error codes](index.html#subpage-jsapi_2_0_0-glossary-error-codes.md) — the 22 `bemap.Error` constants
- [Events](index.html#subpage-jsapi_2_0_0-js-map-events.md) — `EventType` in context
- [Routing v2](index.html#subpage-jsapi_2_0_0-js-routing-v2.md) — modes, criteria and options in use
- [The routing response](index.html#subpage-jsapi_2_0_0-js-routing-response.md) — what each option populates
- [Coordinate system](index.html#subpage-jsapi_2_0_0-glossary-coordinate_system.md) — the EPSG codes
- [Charging connectors](index.html#subpage-jsapi_2_0_0-glossary-chargingstation-connectors.md)

| Field  | Optional | Description |
|--------|----------|-------------|
| __criterias__ |             | This field is a list of criteria used by the routing calculator, e.g.: "`AVOID_MOTORWAYS`", "`AVOID_TOLLS`".<br/> Available values:<br/> - `AVOID_CROSSING_BORDER`: Find a route without country border crossing (makes sence only when the start and stop points are in the same country).<br/> - `AVOID_FERRIES`: Find a route with no ferry.<br/> - `AVOID_MOTORWAYS`: Find a route without motorways.<br/> - `AVOID_TOLLS`: Find a route with no toll.<br/> - `AVOID_UNPAVED`: Find a route with no unpaved roads.<br/> - <s>`LESS_EXPENSIVE`</s>: Find the less expensive charging stations. Only with algorithm v2. Deprecated.<br/> - `TRAFFIC`: Use traffic info for route calculation.
| __startLat__ |             | Departure latitude in decimal degrees (WGS84). Type: `double`. |
| __startLon__ |             | Departure longitude in decimal degrees (WGS84). Type: `double`. |
| __temperature__ |             | Temperature in Celsius. Type: `int`. |
| __egeo__ |    optional | Set to `true` to enable the encoded geometry of the reachable area's polygon. By default `false`. See `Google Encoded Polyline Algorithm Format` in glossary. Type: `boolean`. |
| <s>__extraPayload__</s> |    optional | Additional load weight in kg (like passengers, luggage or tools). Deprecated and not supported anymore, use the `payload` field. Default value: '0'. Type: `int`. |
| __geo__ |    optional | Set to `true` to enable the geometry of the reachable area's polygon. By default `true`. Default value: 'true'. Type: `boolean`. |
| __geoserver__ |    optional | Geoserver name. Type: `String`. |
| __initBatLvl__ |    optional | Initial battery level in percent. Available value 0 to 100. 100% if not defined. Default value: '100'. Type: `double`. |
| __payload__ |    optional | Vehicle's extra load (consumables or passengers weight for example) (in kg). 75kg by default. Default value: '75'. Type: `int`. |
| __stopLat__ |    optional | Arrival latitude in decimal degrees (WGS84). Type: `Double`. |
| __stopLon__ |    optional | Arrival longitude in decimal degrees (WGS84). Type: `Double`. |
| <s>__swidx__</s> |    optional | Switch index. Type: `int`. |
| __vehicle__ |    optional | Vehicle model (UUID key). Type: `String`. |
| __weather__ |    optional | Enable the weather information. Type: `boolean`. |
| __wp__ |    optional | Enable the weather information. Type: `String`. |

| Field  | Optional | Description |
|--------|----------|-------------|
| __bbox__ |    optional | Bounding box in degrees decimal (WGS84) represent the corridor of research. Type: `[BoundingBox]`. See details below. |
| __connectorIdFilters__ |    optional | List of connector type ID to perform a filtration based on those values. Type: `list or array of Integer`. |
| __coordinate__ |    optional | Coordinate research center in degrees decimal (WGS84). Type: `[Coordinate]`. See details below. |
| __corridor__ |    optional | List of coordinate in degrees decimal (WGS84) represent the corridor of research. Type: `list or array of [Coordinate]`. See details below. |
| __filters__ |    optional | Filters, return only the points matching the filters. [Documentation of available filters](index.html#page-chargingstation-filter-v1.md#filtersparameter). Type: `list or array of String`. |
| __filtersVersion__ |    optional | Represents the version of the filtering logic used in the charging station search query. This field determines which filtering implementation or algorithm is applied during processing. The default is 1.  The available values are: 1, 2. Default value: '1'. Type: `byte`. |
| __geoserver__ |    optional | Geoserver name. Type: `String`. |
| __language__ |    optional | Define the language that will be used to perform the address lookup. Type: `String`. |
| __maxPoolResult__ |    optional | Define the maximum pools will be returned in response. Type: `int`. |
| __maxProviderResult__ |    optional | Define the maximum of provider item researched. Type: `int`. |
| __mode__ |    optional | Mode of charging station research.<br/> Available values:<br/> - `LOCAL`: Perform the research only with the local database or cache.<br/> - `LOCAL_AND_REMOTE`: Perform the research on local database/cache and on provider database (remote), the results are merged in single response.<br/> - `LOCAL_IFNOPOOLS_REMOTE`: Capability preference between local and remote request. If the provider have the local capability mode, the request will executed on local database in first. If not pools are found, the remote mode will be used (if remote is available too).<br/> - `LOCAL_OR_REMOTE`: Capability preference between local and remote request. If the provider have the local capability mode, the request will executed only in local. If not, the remote mode will be used (if remote is available too).<br/> - `REMOTE`: Transfer and perform the request research to the provider database.<br/> - `REMOTE_IFNOPOOLS_LOCAL`: Capability preference between remote and local request. If the provider have the remote capability mode, the request will be send to remote provider in first. If not pools are found, the local mode will be used (if local is available too).<br/> - `REMOTE_OR_LOCAL`: Capability preference between remote and local request. If the provider have the remote capability mode, the request will be send to remote provider. If not, the local mode will be used (if local is available too).
| __options__ |    optional | Options of charging station service.<br/> Available values:<br/> - `AVAILABLE_CONNECTOR_TYPES`: Return the list of available connector type supported by the server.<br/> - `DEPRECATED_CONNECTOR`: Include all deprecated connector types.<br/> - `PATH_POINT`: Depth of path limited to the charging point information.<br/> - `PATH_POINT_MAP`: Depth of path limited to the minimal pool information to show on map. But allow filtering based on charging point.<br/> - `PATH_POOL`: Depth of path limited to the pool information.<br/> - `PATH_POOL_MAP`: Depth of path limited to the minimal pool information to display on map. Limited filtering capacity.<br/> - `PATH_STATION`: Depth of path limited to the station information.
| __pathAutoMaxPool__ |    optional | Define the maximum of pool found by request to automatic switching between DepthOfPath. The depth of a path limits the charging point information. See the option PATH_AUTO. 20 by default. Type: `int`. |
| __pointIdFilter__ |    optional | Point ID filter, return only the point with the input ID. Type: `String`. |
| __poolIdFilter__ |    optional | Pool ID filter, return only the pool with the input ID. Type: `String`. |
| __providers__ |    optional | Provider names used by BeMap (bgis). Type: `list or array of String`. |
| __radius__ |    optional | Define the radius in meters of search. Required by the center or corridor parameters. Type: `int`. |
| __stationIdFilter__ |    optional | Station ID filter, return only the station with the input ID. Type: `String`. |
| <s>__swidx__</s> |    optional | Switch index. Type: `int`. |

#### __Coordinate__
Describe a coordinate which consists of a latitude and longitude. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |

#### __BoundingBox__
This a model class for creating a rectangle that includes the whole trip which is defined with 4 coordinates. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __maxLat__ |             | Maximum latitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __maxLon__ |             | Maximum longitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __minLat__ |             | Minimum latitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __minLon__ |             | Minimum longitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |

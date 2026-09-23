| Field  | Optional | Description |
|--------|----------|-------------|
| __locConf__ |             | Percentage reflecting the confidence in the map-matching process. Type: `double`. |
| __spdLim__ |             | Applicable speed limit in the unit used on road signs of the current country (either km/h or mph). In case map-matching failed or no applicable speed limit, returned value is 0. Type: `float`. |
| __spdLimConf__ |             | Percentage reflecting the confidence in the speed limit value assuming location is correct. Type: `double`. |
| __spdLimUnit__ |             | Unit used for speed limit fields available value kph or mph. Type: `String`. |
| __spdRange__ |             | Minimum validity distance in meters of current applicable speed limit. Range is calculated assuming that vehicle will not make a U-Turn and that it will comply with traffic rules including prohibited maneuvers such as turn restrictions. Type: `long`. |
| __cc__ |    optional | Country code ([ISO 3166 alpha 3](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)) of current location. ‘XXX’ if undefined (e.g. vehicle on ferry line in international waters). Type: `String`. |
| __curWtr__ |    optional | Current weather. Type: `[RouteHorizonWeather]`. See details below. |
| __nxtSpdLim__ |    optional | Applicable speed limit in the unit used on road signs of the current country (either km/h or mph). In case map-matching failed or no applicable speed limit, or multiple possible values, returned value is 0. Type: `Float`. |
| __nxtSpdLimConf__ |    optional | Percentage reflecting the confidence in the next speed limit value assuming location and speed range are correct. Type: `Double`. |
| __traf__ |    optional | Traffic information. Type: `[RouteHorizonTraffic]`. See details below. |

#### __RouteHorizonTraffic__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __curAvrSpeed__ |    optional | Current average speed in km/h. Type: `Float`. |
| __freeAvrSpeed__ |    optional | Free flow average speed in km/h. Type: `Float`. |
| __jamFactor__ |    optional | Percent (%) of traffic jam. Between 0.00 (free way) to 100.00 (full jam). Type: `float`. |
| __length__ |    optional | Length in meters of traffic element. Type: `Integer`. |
| __reason__ |    optional | Traffic reason. Type: `String`. |
| __reasonCoord__ |    optional | Coordinate of the reason event. Type: `[Coordinate]`. See details below. |

#### __Coordinate__
Describe a coordinate which consists of a latitude and longitude. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |

#### __RouteHorizonWeather__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __cloud__ |    optional | Cloudiness in percent. Type: `Float`. |
| __conditions__ |    optional | Weather conditions. Type: `list or array of [RouteHorizonWeatherCondition]`. See details below. |
| __datetime__ |    optional | Time of data forecasted, unix, UTC, in milliseconds. Type: `Long`. |
| __datetimeTxt__ |    optional | Data/time of calculation, UTC. Type: `String`. |
| __humidity__ |    optional | humidity in percent. Type: `Float`. |
| __pressure__ |    optional | Atmospheric pressure on the sea level by default, hPa. Type: `Float`. |
| __rainVolume3h__ |    optional | Rain volume for last 3 hours in mm. Type: `Float`. |
| __snowVolume3h__ |    optional | Snow volume for last 3 hours. Type: `Float`. |
| __temperature__ |    optional | Temperature, Unit Celsius. Type: `Float`. |
| __windHeading__ |    optional | Wind direction, degrees (meteorological). Type: `Float`. |
| __windSpeed__ |    optional | Wind speed. Unit meter/sec. Type: `Float`. |

#### __RouteHorizonWeatherCondition__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __condition__ |             |  Type: `String`. |
| __description__ |             |  Type: `String`. |

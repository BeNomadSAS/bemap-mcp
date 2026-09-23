| Field  | Optional | Description |
|--------|----------|-------------|
| __currentWeather__ |             | Current weather. Type: `[WeatherService]`. See details below. |
| __filteredCurrentWeather__ |             |  Type: `boolean`. |
| __filteredForecast__ |             | Filtered forecast. Type: `boolean`. |
| __forecast__ |             | Weather forecast. Type: `[ForecastService]`. See details below. |

#### __WeatherService__
Class representing a weather service. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __cloud__ |             | Cloudiness, %. Type: `Float`. |
| __conditions__ |             | Weather conditions. Type: `list or array of [WeatherCond]`. See details below. |
| __datetime__ |             | Time of data forecasted, UNIX, UTC, in milliseconds. Type: `long`. |
| __datetimeTxt__ |             | Data/time of calculation, UTC. Type: `String`. |
| __humidity__ |             | Humidity, %. Type: `Float`. |
| __location__ |             | Location. Type: `[WeatherLoc]`. See details below. |
| __pressure__ |             | Weather pressure. Type: `[WeatherPress]`. See details below. |
| __rainVolume3h__ |             | Rain volume over the last 3 hours, measured in millimeters. Type: `Float`. |
| __snowVolume3h__ |             | Snow volume over the last 3 hours, measured in millimeters. Type: `Float`. |
| __temperature__ |             | Weather temperature. Type: `[WeatherTemp]`. See details below. |
| __timezone__ |             | Shift in milliseconds from UTC. Type: `long`. |
| __visibility__ |             | Visibility in meter. Type: `Integer`. |
| __wind__ |             | Weather wind. Type: `[WeatherWnd]`. See details below. |

#### __WeatherLoc__
Class representing a weather location. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __city__ |             | City name. Type: `String`. |
| __coordinate__ |             | City geo location, latitude. Type: `[Coordinate]`. See details below. |
| __providerId__ |             | City/Place ID of provider.. Type: `String`. |

#### __Coordinate__
Describe a coordinate which consists of a latitude and longitude. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |

#### __WeatherCond__
Class representing a weather condition. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __category__ |             | <br/> Available values:<br/> - `BROKEN_CLOUDS_51_84`: Broken clouds: 51-84%.<br/> - `CLEAR_SKY`: Clear sky.<br/> - `DRIZZLE`: Drizzle.<br/> - `DRIZZLE_RAIN`: Drizzle rain.<br/> - `DUST`: Dust.<br/> - `EXTREME_RAIN`: Extreme rain.<br/> - `FEW_CLOUDS_11_25`: Few clouds: 11-25%.<br/> - `FOG`: Fog.<br/> - `FREEZING_RAIN`: Freezing rain.<br/> - `HAZE`: Haze.<br/> - `HEAVY_INTENSITY_DRIZZLE`: Heavy intensity drizzle.<br/> - `HEAVY_INTENSITY_DRIZZLE_RAIN`: Heavy intensity drizzle rain.<br/> - `HEAVY_INTENSITY_RAIN`: Heavy intensity rain.<br/> - `HEAVY_INTENSITY_SHOWER_RAIN`: Heavy intensity shower rain.<br/> - `HEAVY_SHOWER_RAIN_AND_DRIZZLE`: Heavy shower rain and drizzle.<br/> - `HEAVY_SHOWER_SNOW`: Heavy shower snow.<br/> - `HEAVY_SNOW`: Heavy snow.<br/> - `HEAVY_THUNDERSTORM`: Heavy thunderstorm.<br/> - `LIGHT_INTENSITY_DRIZZLE`: Light intensity drizzle.<br/> - `LIGHT_INTENSITY_DRIZZLE_RAIN`: Light intensity drizzle rain.<br/> - `LIGHT_INTENSITY_SHOWER_RAIN`: Light intensity shower rain.<br/> - `LIGHT_RAIN`: Light rain.<br/> - `LIGHT_RAIN_AND_SNOW`: Light rain and snow.<br/> - `LIGHT_SHOWER_SLEET`: Light shower sleet.<br/> - `LIGHT_SHOWER_SNOW`: Light shower snow.<br/> - `LIGHT_SNOW`: Light snow.<br/> - `LIGHT_THUNDERSTORM`: Light thunderstorm.<br/> - `MIST`: Mist.<br/> - `MODERATE_RAIN`: Moderate rain.<br/> - `NOT_SUPPORTED_VALUE`: Not supported value.<br/> - `OVERCAST_CLOUDS_85_100`: Overcast clouds: 85-100%.<br/> - `RAGGED_SHOWER_RAIN`: Ragged shower rain.<br/> - `RAGGED_THUNDERSTORM`: Ragged thunderstorm.<br/> - `RAIN_AND_SNOW`: Rain and snow.<br/> - `SAND`: Sand.<br/> - `SAND_DUST_WHIRLS`: Sand/dust whirls.<br/> - `SCATTERED_CLOUDS_25_50`: Scattered clouds: 25-50%.<br/> - `SHOWER_DRIZZLE`: Shower drizzle.<br/> - `SHOWER_RAIN`: Shower rain.<br/> - `SHOWER_RAIN_AND_DRIZZLE`: Shower rain and drizzle.<br/> - `SHOWER_SLEET`: Shower sleet.<br/> - `SHOWER_SNOW`: Shower snow.<br/> - `SLEET`: Sleet.<br/> - `SMOKE`: Smoke.<br/> - `SNOW`: Snow.<br/> - `SQUALLS`: Squalls.<br/> - `THUNDERSTORM`: Thunderstorm.<br/> - `THUNDERSTORM_WITH_DRIZZLE`: Thunderstorm with drizzle.<br/> - `THUNDERSTORM_WITH_HEAVY_DRIZZLE`: Thunderstorm with heavy drizzle.<br/> - `THUNDERSTORM_WITH_HEAVY_RAIN`: Thunderstorm with heavy rain.<br/> - `THUNDERSTORM_WITH_LIGHT_DRIZZLE`: Thunderstorm with light drizzle.<br/> - `THUNDERSTORM_WITH_LIGHT_RAIN`: Thunderstorm with light rain.<br/> - `THUNDERSTORM_WITH_RAIN`: Thunderstorm with rain.<br/> - `TORNADO`: Tornado.<br/> - `UNKNOWN`: Unknown.<br/> - `VERY_HEAVY_RAIN`: Very heavy rain.<br/> - `VOLCANIC_ASH`: Volcanic ash.
| __condition__ |             | Group of weather parameters (Rain, Snow, Extreme etc.). Type: `String`. |
| __description__ |             | Weather condition within the group. Type: `String`. |
| __providerIcon__ |             | Weather icon id of provider. Type: `String`. |
| __providerId__ |             | Weather condition id. Type: `String`. |

#### __WeatherTemp__
Class representing a weather temperature. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __maximum__ |             | Maximum temperature at the moment of calculation. This is deviation from 'temperature' that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Celsius.. Type: `Float`. |
| __minimum__ |             | Minimum temperature at the moment of calculation. This is deviation from 'temperature' that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Celsius.. Type: `Float`. |
| __temperature__ |             | Temperature, Unit Celsius. Type: `Float`. |

#### __WeatherPress__
Class representing a weather pressure. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __groundLevel__ |             | Atmospheric pressure on the ground level, hPa. Type: `Float`. |
| __pressure__ |             | Atmospheric pressure on the sea level by default, hPa. Type: `Float`. |
| __seaLevel__ |             | Atmospheric pressure on the sea level, hPa. Type: `Float`. |

#### __WeatherWnd__
Class representing a weather wind. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __heading__ |             | Wind direction, degrees (meteorological). Type: `float`. |
| __speed__ |             | Wind speed, measured in meters per second (m/s). Type: `float`. |

#### __ForecastService__
Class representing a weather forecast. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __weathers__ |             | Weather. Type: `list or array of [WeatherService]`. See details below. |

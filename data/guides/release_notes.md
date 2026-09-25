# BeNomad BeMap Release Notes



## 2026-09-03 4.1.0

**Autocomplete / Geocoding:**
- Improvements:
  - BEMAP-1886 Added an explicit error message when the Autocomplete service is not configured on a client's account to facilitate troubleshooting.
- Fixes:
  - BEMAP-1887 Added an explicit error message when the required `place` parameter is missing from an Autocomplete request.

**Mapping:**
- New features:
  - BEMAP-1821 New version 2 of the BeMap JS API library. This version adds a BeNomad Tiles vector display through a new MapLibre rendering engine. Leaflet and OpenLayers are unchanged. This version ships with the customizable default BeNomad map style, a browser cache for better performance, and a unified attribution widget that gathers legal notices. The three engines are interchangeable through a common API (`flyTo`, `easeTo`, `jumpTo`…). The v2.0 documentation and its tutorials are provided.
- Documentation:
  - Added a tutorial for retrieving a satellite image via WMS.

**Routing:**
- New features:
  - BEMAP-1847 New `startUTurnThreshold` field in the request: forces the departure angle (heading) of a route to be taken into account, even when honoring it requires a significant detour. Previously, the angle could be ignored beyond a certain threshold.
  - BEMAP-1871 New `routingCrossPenaltiesCoefficients` field in the request: allows adjusting the weighting of the penalties applied at intersections during route calculation, in order to refine the estimated travel time (ETA), which could be overestimated on some networks.
- Documentation:
  - BEMAP-1520 Added, in the Routing integration example, an address search field (autocomplete) allowing a start or end point to be entered by its address rather than by coordinates.
  - Added UI support for the `startUTurnThreshold` parameter in the documentation interface, and documentation for configuring the cross-penalties coefficient.

**EV Smart Routing:**
- New features:
  - BEMAP-1847 Support for the `startUTurnThreshold` parameter in the planner (same setting as the Routing field above, now available for EV Smart Routing).
  - BEMAP-1871 Support for the cross-penalties coefficient in the planner (same setting as `routingCrossPenaltiesCoefficients`).
- Fixes:
  - EVMOVE-465 Fixed the charging cost calculation: the charging point is now identified by its ID, ensuring the correct tariff is applied.
- Documentation:
  - Added UI support for the `startUTurnThreshold` parameter in the documentation interface, and documentation for configuring the cross-penalties coefficient.

**Charging cost:**
- Improvements:
  - Charging cost calculation now takes into account tariff rules including: VAT (`tax_included`), tariff validity periods, time bands (e.g. day/night tariff) and duration or energy tiers. Cost estimates now more closely match the amount actually billed to the driver.
- Documentation:
  - BEMAP-1892 Updated the charging cost request example.
  - BEMAP-1896 Added timezone retrieval; a clarification on how to obtain tariffs; and a tutorial of the full process to build a request from the Charging Station and Tariffs services.

**Vehicles:**
- New features:
  - Support for both GET and POST methods on the `getlevelvehicleinfo` endpoint (new `LevelVehicleInfoRequest` model), which allows parameters to be sent in the request body.
  - Added support for the `variant` parameter on `getlevelvehicleinfo`, to target a specific vehicle variant.
- Documentation:
  - BEMAP-1893 Added request examples for the Vehicle 1.1 endpoints, including `getmotortypes` (MotorType).

**GeoServer Info:**
- Improvements:
  - BEMAP-1853 Added `servicesInfo` support for the `herehlp` geoserver and filtering of exposed services according to the server configuration (each deployment only exposes the services actually declared).
- Fixes:
  - BEMAP-1884 Fixed the `serviceName` returned by `geoserverinfo` for the ChargingTime and OpenLrParser services.

**Land feature:**
- Fixes:
  - BEMAP-1875 Fixed invalid JSON output from the Land Feature service (BND v1) where an unmapped feature was returned.

**General documentation:**
- Reworked the authentication documentation (reorganized sections, enriched examples, auth API details), deprecated URL-based authentication and clarified session reuse options. Fixed a typo: `X-Aith-ID` → `X-Auth-ID`.
- BEMAP-1893 Additions to the internal REST reference: added missing HTTP methods and request examples; fixed the Traffic example; and renamed `reversegeocodingbacth` → `reversegeocodingbatch`.



## 2026-07-24 4.0.3

**Charging stations:**
- BEMAP-1859 Improved stability of the charging station download process for certain data providers.



## 2026-07-09 4.0.2

**Charging stations:**
- BEMAP-1803 Improved stability of the charging station download process for certain data providers.



## 2026-07-06 4.0.1

- Minor configuration fix.



## 2026-07-01 4.0.0

Release 4.0.0 is a significant upgrade to BeMap's technical foundation. Implemented to strengthen security and improve long-term maintainability, this release brings BeMap's dependencies up to their latest stable versions.

This version includes the following updates:

**Autocomplete geocoding:**

- BEMAP-1817 Improved accuracy of geocoding results from the OSM/Nominatim provider. When a place name matches several OpenStreetMap entries at different administrative levels, for example a town and a broader administrative area sharing the same name, the service now uses the `place_rank` field from the Nominatim API to prioritize the most specific result. The returned coordinates now correspond more closely to the expected location, rather than the geographic center of a broader area.
- BEMAP-1833 Added a new geocoder, Photon, self-hosted by BeNomad and available as an alternative provider for both autocomplete and reverse geocoding (selected via the geoserver parameter).

**Charging time:**

- JSIV-28 The Charging Time service now factors in each vehicle's specific charging curve. By using the vehicle's own charging profile, the service provides more accurate charging time estimates that are fully aligned with those produced by the EV route calculation service, EVSmartRouting.

**Charging cost:**

- BEMAP-1837 The Charging Cost service now takes the charging station's time zone into account (the timeZone field) when evaluating tariffs subject to time-based restrictions, such as a day/night tariff. Previously, these time windows were evaluated using Paris local time, which could cause the wrong tariff to be applied to stations located in other time zones. The applied tariff now reflects the station's local time.
- BEMAP-1838 Improved cost calculation for duration-tiered tariffs, whose brackets are defined by the minDuration and maxDuration fields. The final open-ended bracket (with no maxDuration) is now correctly taken into account: time spent beyond the last bounded bracket is properly billed, as in the case of a parking tariff with an uncapped overtime penalty.

**EV Smart Routing:**

- BEMAP-1836 The EV Smart Routing API version 2.0.0 now supports the following parameters for the departure point, destination point, and waypoints, already available in the standard route calculation service:
  - radius: search radius around a point
  - ignorePoint: skip a waypoint
  - ignoreTrafficDirections: ignore one-way directions
  - ignoreRestrictions: ignore routing restrictions
  - avoidUTurn: avoid U-turns
  - useStartAngle: use the specified departure heading
  - useStopRoadSide: use the specified side of the road for arrival

**Traffic:**

- BEMAP-1841 Improved filtering of the traffic information used by the routing engine, for better routing results and performance.

**Vehicles:**

- BEMAP-1822 Fixed a 400 error returned by the `getlevelvehicleinfo` 1.0.0 API when retrieving the list of AC chargers for certain vehicles. The endpoint now returns the correct list of AC chargers.



## 2026-05-07 3.51.1

**Routing:**
- CORESDK-1246: Fixed missing detour between 2 points with sames coordinates but with opposite angle in Routing API (useStartAngle property was ignored).
- CORESDK-1253: Fixed possible data race in route calculations (multi-threading).
- CORESDK-1261: Routing mode Matrix fails to calculate all coefficients when some points are matched on a same road element.

**Traceroute:**
- CORESDK-1223: Fixed an issue in TraceRoute API with minimal waypoints (when 2 points with same coordinates and the first one is a U-turn waypoint).
- CORESDK-1235: Fixed an issue in TraceRoute API when removing a small U-turn near the start can cause the minimal waypoint to fail.



## 2026-03-31 3.51.0

**Charging stations:**
- BEMAP-1784 Fixed the search for truck charging stations (see `filters` array for filter system version 2).

**EV Smart Routing:**
- BEMAP-1784 Fixed the search for truck charging stations (see `filters` array for filter system version 2).
- BEMAP-1788 Fixed unused `csfsVersion` parameter in EV SmartRouting API v2.0.0.

**Reverse-Geocoding:**
- BEMAP-1789 Added new `THROUGH_POINT_ADDRESS` option to search for the nearest Point Address.

**Roads Extractor:**
- BEMAP-1769 Added a new `Roads Extractor` service which performs a map-matching on all road segments inside a given polygon.

**Routing:**
- BEMAP-1782 Added support of `arrivalTime` option to Routing API version 1.0.0.
- BEMAP-1800 Permit the start and stop coordinates on blocked roads when real-time traffic (option `TRAFFIC`) is enabled.

**Documentation**:
- BEMAP-1786 Added a tutorial demonstrating trip planning with a truck transport type in EV Smart Routing API v2.0.0.
- BEMAP-1769 Added documentation for the new Roads Extractor service (v1.0.0).



## 2026-03-12 3.50.1

**Charging stations:**
- BEMAP-1777 Fixed the extra memory consumption issue when too many pools with tariffs are found.

**Routing:**
- BEMAP-1764 Fixed an issue where traffic data for blocked roads was not refreshing after OpenLR updates.



## 2026-02-27 3.50.0

**Charging stations:**
- BEMAP-1619 Added support of heavy vehicle profiles to factor in limited parking restrictions (Charging Station Search API only).
- BEMAP-1215 Added new APIs for retrieving:
  - List of charge passes.
  - AD/HOC, MSP and Sub-CPO charge pass tariffs.  
  - Added new `filterVersion` parameter to Charging StationSearch API to improve charging station searches.

**EV Smart Routing:**
- BEMAP-1215 Added charge cost computation to the EV Smart Routing service, based on selected charge passes and AD/HOC tariffs. The service returns the lowest computed cost and charge pass used (or AD/HOC) information.



## 2026-02-19 3.49.7

**Charging Station:**
- BEMAP-1688 Fixed the null pointer exception error on RFID Auth filter test.

**Geofencing:**
- BEMAP-1649 Updated API to support polygons and circle fences.

**LandFeature**:
- BEMAP-1722 Updated interactive example page to display the geometry.

**NearPOI:**
- BEMAP-1690 Replaced the "internal error"message by the original error message.

**Routing:**
- BEMAP-1693 Added `stopDuration` and `totalDuration` fields in response of Routing API.
- BEMAP-1699 Added localisation of the routesheet in Dutch (NL) and Polish (PL) languages (see `RoutingInstruc.text` field  in Routesheet response of Routing API.

**Traceroute:**
- BEMAP-1693 Added `totalDuration` field in response of Traceroute API.
- BEMAP-1699 Added localisation of the routesheet in Dutch (NL) and Polish (PL) languages (see `RoutingInstruc.text` field in Routesheet response of Routing API.

**Traffic:**
- BEMAP-1715 Fixed to avoid unexpected line returns and double quotes in CSV traffic export file.



## 2026-01-16 3.49.6

**Core:**
- BEMAP-1686 Updated JSIV version from 3.24.5 to 3.24.6 based on CoreSDK 6.37.1.
- CORESDK-1174 Fixed potential stack-buffer-overflow and heap-buffer-overflow issues in Planner.
- CORESDK-1182 Fixed a length inconsistency between TraceRoute/SetMinimalWaypoint and routing API.
- CORESDK-1183 Fixed OpenLR encoding issues.
- CORESDK-1184 Fixed an issue where off-road waypoints were incorrectly map-matched in TraceRoute.

**Documentation:**
- BEMAP-1685 Updated the documentation for the `useStartAngle` parameter in the Routing and TraceRoute APIs.



## 2025-12-18 3.49.5

**Charging stations:**
- Added support for new `GBT AC/DC`  charging connector for OCPI providers.

**Geocoding:**
- CORESDK-1163 Fixed possible deadlock issue when running mixed geocoder/traceroute APIs concurrently.
- CORESDK-1149 Fixed an issue where the Geocoder did not return the city name when two cities were found in the same postcode (e.g. `Country = "France", City = "Rambures", Zip = "80140"`)
- CORESDK-1145 Fixed possible multithreading issue when running mixed geoserver/geocoding APIs concurrently.

**Traceroute:**
- CORESDK-1162 Fixed incorrect map-matching of points in offroad sections.
- CORESDK-1146 Fixed incorrect map-matching of points in offroad sections (backward).



## 2025-12-15 3.49.4.1

**Traceroute:**
- BEMAP-1650 Fixed the segmentId value of segmentInfo object in event structure.

**Routing:**
- BEMAP-1650 Fixed the segmentId value of segmentInfo object in event structure.



## 2025-11-04 3.49.4

**Geocoding:**
- CORESDK-1129: Fixed missing street names in geocoding responses (in FUZZY mode, when one word is missing in the street's name).

**GeoServerInfo:**
- BEMAP-1636 Added  the list of available services for the selected GeoServer in response.

**Traceroute:**
- CORESDK-1127: Fixed possible crash with support of toll booth names (toll booth names will be available starting with HERE 2025.4 maps)

**Routing:**
- CORESDK-1127: Fixed possible crash with support of toll booth names (toll booth names will be available starting with HERE 2025.4 maps)



## 2025-10-27 3.49.3

**Core:**
- BEMAP-1624 Updated JSIV version from 3.24.2 to 3.24.3 (based on CoreSDK 6.36.0).
- BEMAP-1622 Updated Spring Session Data Redis library and Spring Data Redis libraries.

**Traceroute:**
- CORESDK-1123 Fixed heap-buffer-overflow issue in multithreading context and memory leaks.

**Routing:**
- CORESDK-1123: Fixed heap-buffer-overflow issue in multithreading context and memory leaks.



## 2025-10-08 3.49.2

**Traceroute:**
- CORESDK-1117 Fixed possible crash in TraceRoute. 
- BEMAP-1607 Fixed multiple routes in TraceRoute response (Replaced by an error message).



## 2025-09-29 3.49.1

**Routing:**
- CORESDK-1110: SVS cache expends indefinitely.

**EV Smart Routing:**
- CORESDK-1106: Division by 0 in slope calculation which leads to infinite energy consumption estimation.



## 2025-09-01 3.49.0

**Charging Stations:**
- BEMAP-1529 Fixed the availabilityStatus value of Pool. The value is now `IN_SERVICE_FREE` when only one of station's availability status is `IN_SERVICE_FREE` and others are not `IN_SERVICE_FREE` (e.g., `IN_SERVICE_BUSY`).
- BEMAP-1550 Updated to make optional the station id filtering when an point id filter is set in API version 1.0.0.

**Routing:**    
- BEMAP-1422 Added new `MATRIX_FOR_ROUND_OPTIM` option. When using the `MODE_MATRIX` routing mode, this option allows faster matrix computations (by ignoring some coefficients of the matrix) if the returned matrix is intended to be consumed by an external Round Trip Optimization service. 
- BEMAP-1595 Fixed used destination index of Waypoint when 2 (or more) via element are on the same point.

**Traceroute:**
- BEMAP-1503 Added new `allowOffRoad` parameter to specify whether the returned route can be include off-roads sections or not (default is true).
- BEMAP-1595 Fixed used destination index of Waypoint when 2 (or more) via element are on the same point.
- CORESDK-962 Faster and more robust Traceroute algorithm.

**EV Smart Routing:**
- BEMAP-1514 Fixed route geometry discontinuities around events (via-points and charging stations).
- BEMAP-1519 Added toll booth details to the events list and total toll cost to trip summaries.
- BEMAP-1548 Fixed charging cost. If no currency is specified in the request, the first currency found along the route (from toll costs or charging stations) will be used.
- BEMAP-1592 Restore fields longitude, latitude, and altitude in route details (API v2) / event details (API v1) and limit to 60 seconds the minimal frequency.

**Documentation:**
- BEMAP-1523 Added new tutorials for the Routing API.



## 2025-06-18 3.48.2

**Charging Station:**
- BEMAP-1512 Fixed OCPI tariffs for `REMOTE` mode. Avoid the full download of tariffs during the call.


**EV Smart Routing:**
- BEMAP-1508 Fixed `batteryLevel` values in`routeConsumptions` in response to an EV Smart Routing with via-points (the battery level was reset to the initial battery level after each via-point).

**Routing:**
- BEMAP-1510 Fixed `distanceFromRequest` value of Routing API v1.0.0.

**Traceroute:**
- BEMAP-1509 Fixed the error of "Internal error : Index: n, Size: n". More check on `keptIndexes` list.



## 2025-06-11 3.48.1

**Administration:**
- BEMAP-1505 Fixed account creation. Some fields in HMI are no longer working when creating new accounts.
- BEMAP-1507 Fixed charging station provider list in account creation.



## 2025-05-30 3.48.0

**Autocomplete:**
- BEMAP-1470 For Nominatim use the parameter `bound` is set to 1 only when the bounding box is defined in input request. otherwise the `bound` is set to 0 (when the coordinate is used in input request too).

**Charging cost:**
- BEMAP-1488 Fixed possible negative estimated charging cost (when the final SoC is less than the current SoC).

**Charging Station:**
- BEMAP-1455 Added support of "Reliability Score" (Only available for some providers).

**Core:**
- BEMAP-1444 Added request quota system (by hour, day, week and month and by API). When a quota limit is reached, the concerned API is blocked and an alert notification is sent by email.

**EV Smart Routing:**
- BEMAP-1261 Added support of explicit load curves.
- BEMAP-1414 Review of the `ECO`, `NORMAL` and `SPORT` driving modes.
- BEMAP-1460 Fixed wrong unit value of departureTime field in StartEvent.
- BEMAP-1476 Fixed (API v1.0.0 version only) abnormal response times (and invalid travel duration and distance between step points) when using a vehicle with a low battery capacity on a long journey.

**Routing:**
- BEMAP-1315 Added `waypointIndex` field in `usedDestinations` objects when the `WAYPOINTS_POLYLINE` option is used.
- BEMAP-1370 Updated Routing API v1.0.0 documentations.

**Traceroute:**
- BEMAP-1370 Updated Traceroute API v1.0.0 documentations.

**Vehicle:**
- BEMAP-1261 Added support of explicit load curves.



## 2025-04-14 3.47.5

**EV Smart Routing:**
- BEMAP-1460 Fixed wrong unit value of departureTime field in StartEvent.



## 2025-04-09 3.47.4

**Core:**
- BEMAP-1458 Internal fix.



## 2025-03-04 3.47.3

**Documentation:**
- BEMAP-1370 Updated Routing and Traceroute (API v1.0.0) documentation.

**EV Smart Routing:**
- BEMAP-1410 Removed wrong departureTime field in StopEvent.

**Geocoding:**
- CORESDK-964: RoadMatch does not return administrative path when matched on an unamed road.

**Mapping:**
- BEMAP-1420 Fixed configuration packages of WMS capabilities XML files to restore WMS GetCapabilities service.

**Routing:**
- BEMAP-1408 Added new values to VehicleEmissionClass : `EURO0`, `EURO2_PRC`, `EURO3_PRC`, `EURO6_CO2_1`, `EURO6_CO2_2`, `EURO6_CO2_3`, `EURO6_CO2_4` and `EURO6_CO2_5`.
- BEMAP-1418 Updated toll cost sum fees (min and max) by rounding to 2 decimals.
- CORESDK-958: Fixed possible invalid toll cost calculations (caused by missing information in SVS maps or when fee is applied to all emission types).
- CORESDK-952: PlanRoute may return an incorrect route with unexpected U-turn.

**Traceroute:**
- BEMAP-1408 Added new values to VehicleEmissionClass : `EURO0`, `EURO2_PRC`, `EURO3_PRC`, `EURO6_CO2_1`, `EURO6_CO2_2`, `EURO6_CO2_3`, `EURO6_CO2_4, EURO6_CO2_5, EURO6_CO2_3`, `URO6_CO2_4` and `EURO6_CO2_5`.
- BEMAP-1418 Updated toll cost sum fees (min and max) by rounding to 2 decimals.
- CORESDK-958: Fixed possible invalid toll cost calculations (caused by missing information in SVS maps or when fee is applied to all emission types).
- CORESDK-952: PlanRoute may return an incorrect route with unexpected U-turn.



## 2025-02-13 3.47.2

**Documentation:**
- BEMAP-1403 Fixed display issue with some sections in main left menu in compliance with logged account rights and API versions.



## 2025-02-11 3.47.1

**Geocoding:**
- CORESDK-932 Optimize search of streets in some big cities such as Roma (Italy).

**Routing:**
- CORESDK-951 Fixed possible crash when requesting toll cost (This happens with inconsistent toll structures in map data: a Pay per ticket toll followed by a Fix fee toll).

**Documentation:**
- BEMAP-1391 Added new value `LOW_EM_ZONE` (1500) to the class ID list.
- BEMAP-1394 Fixed charging station documentation link.
- BEMAP-1370 Updated documentation about the Routing and Traceroute API version 1.0.0.
- Updated documentation about Autocharge and Plug and charge features.
- Added a dash before any enumeration.
- Fixed other various typos in documentation.



## 2025-01-21 3.47.0

**EV Smart Routing:**
- Added support of Weather in EV Routing calculations.
- BEMAP-1210 Fixed driving time in response of EV Smart Routing (Removed plugging time addition from the driving time).
- Assign a default value of 1000 meters to `maxWalkingDistance` parameter (API version 2.0).
- Updated documentation of Route Details parameters (`routeDetails`) in EV Smart Routing API version 2.0.0.
- Changed default`allowNaStatus` option to `true` in EV Smart Routing interactive example page.
- Updated duration of charge time slots to mandatory in EV Smart Routing API version 2.0.0.
- The `maxAcc` and `maxDec` parameters can by override in all driving modes.

**Land feature:**
- BEMAP-1350 Fixed missing fields type and values in response of land feature API version 1.0.0.

**Mapping:**
- Updated URLs of WMS capabilities URLs.
- BEMAP-1376 Fixed the HTTP header `CacheControl` for WMS, BND, and GNS mapping APIs to allow the Internet browsers to cache the image of map tiles.

**NearPOI:**
- BEMAP-1305 Fixed `geoserver` parameter was not taking account in NearPOI API.

**Routing:**
- Removed `stringValue` in entry event of Routing response.
- Added new `EVT_ENTRY_VALUE_AS_OBJECT` option to Routing API.
- Updated documentation of `cial` field of Routing Vehicle Feature (`RoutingVehicleFtr`).

**Traceroute:**
- Removed and added  deprecated fields from Traceroute request.
- BEMAP-1242 Fixed mandatory indexes when input coordinates are not matched.
- Added new option `EVT_ENTRY_VALUE_AS_OBJECT` option to Traceroute API.

**Vehicle:**
- Added new `consumptionWhPerKm` field in response of Vehicle API v1.1.0, to expose the consumption of vehicle in Wh per km (Only callculated when the WLTP full cycle is available).
- Added support of `variant` and `year` to Get Level Vehicle Info API in version 1.1.0.
- Added new `plugAndAutoCharge` field in response of Vehicle API version 1.1.0.

**Weather:**
- Added Weather API documentation.
- Added date and time filter on current weather and forecast. The returned response contains only the time slot for an asked date and time. Empty array and no object when no time slot is found in data source.

**Documentation:**
- Improved documenation of (Autocomplete API)`addressDetails` and `coordinate` parameters.
- Improved documenation of cookie session (`SESSION` and `JSESSIONID`).
- Fixed typos in Authentication documentation.
- Fixed display of enumeration list in table cell of documentations.
- Removed SOAP-RPC in documentation. The API XML SOAP-RPC is now deprecated and it will be removed in future releases.
- Removed Swagger support. It will be replaced by a new Swagger library in a future release.
- Fixed other various typos in documentation.



## 2024-10-08 3.46.6

**Autocomplete:**
- BEMAP-1265 Updated configuration of Nominatim to define the HTTP Referer.



## 2024-08-23 3.46.5

**EV Smart Routing:**
- BEMAP-1247 Restore extraPayload parameter in EV Smart Routing API version 1.0.0.



## 2024-08-08 3.46.4  ![Build passed](images/badge-build-passed.svg)

**Traceroute:**
- BEMAP1242 Fixed mandatories index when the input coordinates are not matched at start of computed route.



## 2024-08-02 3.45.5

**Traceroute:**
- BEMAP-1224 Fixed values of usedDestinationIdx field when waypoint polyline option is enabled. When input coordinates cannot be match on road, the used destination index was wrong in some weypoints.



## 2024-07-31 3.46.3

**Geocoding:**
- BEMAP-1232 Fixed maximumResult(s) field name in API v1.0.0. Added field name alternatives "maximumResults" and "maximumResult" in request.

**Traceroute:**
- BEMAP-1224 Fixed values of usedDestinationIdx field when waypoint polyline option is enabled. When input coordinates cannot be match on road, the used destination index was wrong in some weypoints.



## 2024-07-24 3.46.2

**Core**
- CORESDK-805 Fixed geocoder issue with multiple roads in a same city but in different postal code areas : only one result returned if no postal code specified in the request.
- CORESDK-799 Fixed car pool routes were not authorized in trace route. Also car pool routes should be authorized for all routings in emergency mode.



## 2024-07-24 3.45.4

**Core**
- CORESDK-805 Fixed geocoder issue with multiple roads in a same city but in different postal code areas : only one result returned if no postal code specified in the request.



## 2024-06-26 3.46.1

> Notes: The Swagger will be removed in next release 3.47.0.

**Autocomplete:**
- BEMAP-1188 Upgrade Nominatim in compliance with last usage policies.

**Charging Station:**
- BEMAP-1187 Removed additional id from the `operatorId` field for DeftPower provider.

**Core:**
- BENAVJO24-274 Prevent brute-force attack authentication.

**Documentation:**
- The Swagger will be removed in next release 3.47.0.
- BENAVJO24-275 Strengthen security of Swagger.



## 2024-05-31 3.46.0

> Notes: The right and role `Natural Geocoding` are automatically upgraded in new rights and roles `Autocomplete` and `Use autocomplete as autosuggest` for all accounts. The right and role `Natural Geocoding` keep existing but do not give access to the autocomplete service, but only the natural-geocoding service.

**Admin:**
- BEMAP-1171 Fixed show button in report section for customer accounts.

**Charging Station:**
- BEMAP-1146 Fixed DeftPower `facilities` field.
- BEMAP-1160 Added new field site category and mapped to OCPI providers and other providers.

**Charging Cost:**
- BEMAP-1029 Fixed the charging cost time-zone.

**Core:**
- BEMAP-1069 Updated versions of Spring Framework, Spring Data and MongoDB driver.
- BEMAP-1102 Added log when CoreSDK raise IllegalStateException.
- BEMAP-1086 Database migration of `Natural geocoding` right to `Autocomplete` and `Use autocomplete as autosuggest` rights and roles.
- BEMAP-1118 Added new right and service role `Autocomplete` and new right and option role `Use autocomplete as autosuggest`.
- Updated database version to 23.
- Updated JSIV version 3.20.0 to version 3.21.0.

**Documentation:**
- Fixed chargeMaxDistance field support for interactive example of EV Smart Routing API version 2.
- BEMAP-41 Updated Routing and Traceroute interactive examples to support the encoded polyline.
- BEMAP-1129 Added language of user browser to auto-complete request.
- BEMAP-1130 Added brand logo API documentation.
- BEMAP-1159 Updated forced charge / time slots: If forced charges are defined, they take priority over charge times.
- Updated Traceroute interactive example to avoid display of huge response.
- Added Flutter API and documentation.

**EV Smart Routing:**
- Prevent from empty geometry or geometry with single coordinate.

**NearPOI:**
- BEMAP-1173 Fixed Internal error during NearPOI.

**Reports:**
- BEMAP-1142 Use `Autosuggest lookup` term instead `Autosuggest search`.

**Traffic:**
- BEMAP-1138 Add documentation of internal formats.

**Vehicles:**
- BEMAP-1120 Raise a message when battery equals 0.
- BEMAP-1150 Added WLTP in vehicle API 1.1.0.



## 2024-04-25 3.45.3

**Core**
- Fixed telemetric for BND and WMS protocols.
- Added telemetric for mapping cache store.



## 2024-02-27 3.45.2

**Documentation:**
- Fixed API reference of EV Smart Routing API version 1.0.0.

**EV Smart Routing:**
- BEMAP-1124 Fixed weather at start. When the `weather` parameter is set to `true`, now the weather provider is used to get the temperature for the start of initial routing. Otherwise the `temperature` parameter is used.
- BEMAP-1125 Fixed `departureTime` parameter to ensure it is properly taken into account in API version 2.0.0.
- BEMAP-1126 Fixed `maxSpeed` parameter on last route event for API version 1.0.0 and version 2.0.0.



## 2024-02-16 3.45.1

**Autocomplete**
- BeMap-1116 Added internal feature of language parameter support.

**EV Smart Routing:**
- BEMAP-1115 Fixed issue when two contiguous via have the same coordinates. 



## 2024-02-08 3.45.0

**Core:**
- Updated geo-server configuration to disable the old HERE HLP implementation API.

**Charging Station:**
- BEMAP-1021 Fixed generation of summary data in Pool object for fields `summaryOfConnectorTypeIds`, `maxNominalPower` and `numberOfChargingPoint`.

**Documentation:**
- BEMAP-1043 Added new interactive example for new API EV Smart Routing version 2.0.0.
- BEMAP-1044 Updated EV Smart Routing tutorial in compliance with EV Smart Routing API version 2.0.0.

**EV Smart Routing:**
- BEMAP-885 Added new API version 2.0.0, this API expose the journey with events along the route. An event can be the start point, the route, a charge step, and more.

**Routing:**
- BEMAP-1080 Added an exception message when a road-block not match a road of map data.



## 2024-01-30 3.44.1

**Admin:**
- Better management of multiple environments order.
- The HTML reports kept now the display order (removed async load o f HTML components).

**Charging Station:**
- BEMAP-1067 Fixed Deftpower request generation with connectortypes parameter.



## 2023-12-01 3.44.0

**Mapping:**
- Updated `bnd_browserqt-chart-1_0` graphic chart to display countries and fixed the incorrect order of TEXT, PEN, and BRUSH elements. 

**Charging Stations:**
- Fix of wrong values exposed in summaryOfConnectorTypeIds field
- Added new Chinese connector types GB-T AC and GB-T DC
- Update of the connector type list: The maximum power for Type 2 plug is set to 43kW.

**EV Smart Routing:**
- Change: If no driving style is defined in the request, the normal mode is used as default.
- Fix for Incorrect route results due to bad vehicle weight conversion between what was stored in the database and what was provided to the engine for the route calculation.
- Core: Correction of behavior: if "No motorway option" is selected; motorways should not be suggested, even to reach pools at rest stops.
- Core: Fix for returning the alternative routes in the right order (fastest first).
- Core: Fix for potential crash during calculations when 2 waypoints are closed to each other
- Core- Change:  Increased map-matching radius applied to charge pools for EV route computation to avoid `NO_REACHABLE_STEP_POINT` as much as possible.
- Core: Fix for potential use cases where the returned energy consumption was “NaN”

**EV vehicles:**
- New: Brand logo images are now supported in the database and a new API has been created to retrieve brand images.
- Fix for `getbrands` API that did not take group configuration filtering into account. 

**Routing:**
- Add an error message if the route is not possible to execute (related to SUPPORT-229)
- SUPPORT-209: Added new options to the routing service to avoid tunnel, bridge during map matching.
- Fixed returned value of `usedOrder` field of API Routing v1.0.0.
- Core: Time to response Improvement for route calculations with alternative routes option.
- Core: Fix for routes calculations failures when a route contains one or more off-road sections
- Core: Correction of blocked passages where all are ignored with emergency mode. But only those that do not apply to emergency should be ignored
- Core: Fix for closed roads that were not considered in emergency mode use cases.

**TraceRoute:**
- Correction of mandatory waypoints that were not included in the response.
- Core: Fix for Route computation fail when a via-point is located on a road segment closed for all vehicle types.

**Traffic flow:**
- Added capability to define default traffic info highlighters.

**Documentation:**
- Update of the documentation with restructured chapters
- Logout button added.
- Response time to interactive sample of Charging stations has been added.
- SUPPORT-269: Fix of documentation enumeration values list.
- Updated Traceroute interactive sample by adding the input coordinates polyline.
- Typo corrections.
- Minor bug fix for interactive samples.



## 2023-07-18 3.43.2

**Charging Station:**
- Hotfix (API breaking change of a charging station provider)



## 2023-06-26 3.43.1

**EvSmartRouting:**
- Fixed virtual memory leak during EV-Routings when the Max Speed recommendation is enabled.

**Routing:**
- Fixed routing criteria display in routing example



## 2023-06-13 3.43.0

**Mapping:**
- Fixed display of duplicate labels such as street names.

**XML-RPC protocol:**
- Fixed typo that caused an error when using the "maximumResult" variable.

**EV Smart Routing:**
- Added provider rights validation before EV routing calculation.
- Implementation change: When using the forced charge functionality, the load could reach 100% if the user imposed stop time was significant.
- Fixed EvSmartRouting scenario where an EV route was not returned when maximum speed recommendation was enabled and no charge was required.
- Fixed possible segmentation error when calculating EV routes with alternatives.
- Improved EV routing algorithm (with alternate routes) when 'no motorway' criteria is specified.

**Routing:**
- Fixed problem with traceRoute API (Avoid UTurn restriction on via points was ignored).
- Fixed possible inconsistent travel times when calculating matrices (i.e. routing service with MODE_MATRIX option).
- Fixed routing v1.0.0 example. The map now zooms to the response bounding box.

**Documentation:**
- Fixed some missing fields in the FindVehicles API documentation.



## 2023-04-26 3.42.0

**Mapping:**
- A new gray level graphic chart has been added.

**Traceroute:**
- Sample (v1.0.0): Fixed incorrect zoom on the itinerary bounding box.

**EvVehicles database:**
- Evolution of the Ev Vehicle database to ease its use and improve the content in several use cases such as:
  - Ev Truck profiles
  - Quality controls
  - Automatic and manual database updates

**Charging Station:**
- The radius of the charging stations search is now limited to 150 kilometers.
- New EVSE tags to non-standard OCPI model: This tag is a custom field that can be completed to add any kind of additional information related to the charging station

**EV Smart Routing:**
- Fixed possible error in SoC calculation (SoC at arrival may be inferior to expected arrival SoC).
- New Optimisation criteria: The economic Mode. By going with this option, the system will provide a list of classified routes starting from the most to the least economic one.
- Please note that the `extraPayload` field used in an evSmartRouting request has been replaced by `payload` field.



## 2023-03-29 3.41.3

**Reverse Geocoding:**
- Fixed possible memory leak.

**Docker:**
- Added NODAEMON start mode.



## 2023-03-08 3.41.1

**EV Smart Routing:**
- Fixed BEMAP-692: fixed HERE remote search radius.

**Core:**
- Updated JSIV to 3.18.0 (Core SDK 6.27.0).

**Documentation:**
- Removed old routing examples.
- Fixed various typos and English mistakes.



## 2023-02-13 3.41.0

**Routing:**
- Fixed BEMAP-593: fixed wrong step points arrival and departure times by using the native SDK stop time value to set the departure time of each step point. Added departure time for each step point in example of EV Smart Routing.
- Fixed BEMAP-592: updated max value of chargeMaxDistance from 5000m to 3000m.
- Added plugging duration total in EV smart routing example.
- Fixed BEMAP-617: added `EVT_PROHIBITED_DRIVING` option in Routing and Traceroute services.
- Fixed BEMAP-590: fixed mixed use of local and epoch time in EV smart routing.

**Documentation:**
- Fixed BEMAP-549: better wording of Key in Class ID list page.

**Core:**
- Disabled cache for isAlive API.

**Admin:**
- Added WLTP information in Vehicles interface.
- Added API to estimate WLTP from the vehicle info.



## 2023-01-16 3.40.0

**Charging Station:**
- Fixed support of corridor request in example documentation page.
- Updated HTTP Helper library to 1.7.0 (better HTTP redirection support).
- Updated connector types.
- Added tags field in stations and charging points.
- Added API `Charging Station/brand/1.0/list` to retrieve the list of available station brands for a given provider.

**Routing:**
- Fixed BEMAP-563: added plugging time in journey duration.
- Fixed saved CO2 estimation for EV smart routing.

**Mapping:**
- Reduced size of city POIs in BeNomad Light graphical chart.
- Fixed BEMAP-480: fixed display of ocean polygons in BeNomad Light graphical chart when some countries of a continent are not deployed.
- Added ability to clear map-tile caches by JMX.



## 2022-12-15 3.39.0

**Charging Station:**
- Added management of invalid parse format in OCPI.
- Added new mode `LOCAL_IFNOPOOLS_REMOTE`.
- Updated connector types

**Traceroute:**
- Fixed BEMAP-539: manage not matched coordinate on off-road (used).

**NearPoi:**
- Fixed BEMAP-538 by adding the error message management and display.
- Allow POI filtering by category
- Display POI class id instead of UNKNOWN

**Routing:**
- Fixed BEMAP-128: hide minimal battery levels field for algorithm v3.
- Fixed BEMAP-536: API service v1.0.0 adding default transport type CAR.
- Updated max value of payload slider with non linear values.

**Documentation:**
- Added API version selector
- Updated sample examples to reflect API service v1.0.0

**Core:**
- Admin:
  - Display of EV terminal suppliers already assigned



## 2022-11-22 3.38.0

**Charging Station:**
- Support authentication mode in charging station filters.
- Added support of filter with list of String.
- Add tags field to pools.

**Routing:**
- Add CO2 emission estimation option for EV smart routing.

**Download:**
- Fixed issue BEMAP-491, remove files recursively during charging station export.



## 2022-11-04 3.37.0

**Mapping:**
- Fixed wrong order of TEXT, PEN, and BRUSH in BrowserQT chart.

**Routing:**
- Fixed issue BEMAP-465, inverted value of statistic jam factor.
- Fixed issue BEMAP-466 about the event marker time value.
- Fixed issue BEMAP-467, missing statisticJamFactor field.
- Fixed routesheet text with double quote.
- Added length from segment length to the traffic element for statistic (BEMAP-462).
- Added traffic signs information in event array with new option `EVT_TRAFFIC_SIGNS`.
- Added routesheet verbosity levels with new options `ROUTESHEET_VERBOSE_LOW`, `ROUTESHEET_VERBOSE_MEDIUM`, `ROUTESHEET_VERBOSE_HIGH`.
- Added capability to return the prohibited driving maneuvers with new option `EVT_PROHIBITED_DRIVING`.
- Updated documentation

**Traceroute:**
- Fixed issue BEMAP-465, inverted value of statistic jam factor.
- Fixed issue BEMAP-466 about the event marker time value.
- Fixed issue BEMAP-467, missing statisticJamFactor field.
- Fixed routesheet text with double quote.
- Added length from segment length to the traffic element for statistic (BEMAP-462).
- Added traffic signs information in event array with new option `EVT_TRAFFIC_SIGNS`.
- Added routesheet verbosity levels with new options `ROUTESHEET_VERBOSE_LOW`, `ROUTESHEET_VERBOSE_MEDIUM`, `ROUTESHEET_VERBOSE_HIGH`.
- Added capability to return the prohibited driving maneuvers with new option `EVT_PROHIBITED_DRIVING`.
- Updated documentation

**Documentation sample:**
- Updated Routing sample page by adding a marker at the exact place from the URL request (xy parameter).

**Core:**
- Updated default limitation of maximum bounding box side for geocoding Country and City levels.
- Added support of logstash.



## 2022-09-29 3.36.0

**Charging Station:**
- Fixed OCPI end page detection.



## 2022-09-20 3.35.1

**Core:**
- Fixed and added diff of configuration files during update process.



## 2022-09-19 3.35.0

**Charging Station:**
- Added support of OCPI sub operator.

**Documentation:**
- Updated documentation of Land feature by adding the introduce text.

**Traffic:**
- Rename the current thread only when traffic is debug level.

**Vehicles:**
- Added maxSpeed and chargingBatteryLevelTo fields to vehicle data sheet.

**Core:**
- Added migration to database version 15.
- Added new role `ROLE_VEHICLE`.
- Admin:
  - Add vehicle duplicate button in admin vehicle interface.
  - Bug correction of modal message.
  - Bug correction of duplicate button.
  - Modal title and body configuration.
  - Close edit window after vehicle deletion.
  - Duplicate message correction and scroll to top when duplicate.



## 2022-09-08 3.34.1

**Documentation:**
- Updated documentation examples to use addressLabel field of autocompplete.

**Core:**
- Fixed Update/Install script when the diff is prompted.



## 2022-09-07 3.34.0

**Autocomplete:**
- Added support of address label and more fields (highlights, categories, references, etc.) from HERE HLP server.

**Charging Station:**
- Fixed next offset computation of OCPI full download.
- Fixed target of stable symbolic link of SVS splitter tool, used by the EVSE SVS export.
- Added support of charing pool max results with local base (MongoDB).
- Added support and log of OCPI X-Total-Count header.
- Added more log to OCPI provider for debug.
- Added more log to OCPI PATCH API input request for debug. Capability to detect and log one location id, EVSE id, and connector id.
- Changed the frequency of EVSE merging (mix pool of BeNomad EVSE database) to `EVERY_MONTH`.

**Core:**
- Admin:
  - Added new fields transport type, height, width, length, and weight to the vehicle from (in configuration group section).



## 2022-08-31 3.33.2

**Charging Station:**
- Fixed pool availability status update.
- Fixed next offset computation of OCPI full download.
- Added operator id support to station when the data is available.
- Added new field operator id to the charging station class.

**Routing:**
- Added support of custom data in API Service 1.0 of routing.

**Traceroute:**
- Added support of custom data in API Service 1.0 of traceroute.

**Core:**
- Updated documentation of customData fields (Routing and Traceroute).



## 2022-08-16 3.33.1

**Charging Station:**
- Fixed too verbose log when an pool was updated from OCPI dynamic update.
- Fixed the samples in documentation of geocoding for batch job service (version 1.0). 



## 2022-08-10 3.33.0

**Charging Station:**
- Modify update date during pool local update.

**Download:**
- Fix config for downloadable SVS files.

**OCPI Protocol:**
- Fix response format.
- Fix versions API.
- Implement version details API.

**Core:**
- Fix token authentication.



## 2022-08-02 3.32.0

**Charging Station:**
- Fix frequency parsing for exporter and mixer trigger.
- Add updateDate field to BeNomad mixed pools.
- Exporter:
  - Fix null pointer exception during SVS attribute generation.
  - Add timestamp in SVS export path.
  - Clean up old exports after generation.

**Download:**
- Updated list of providers for downloadable SVS files.
- Added support of multiple files download in one request.
- Added new option arguments for file listing API: file name filter, optional hash, last files since date, access to subtree.
- Rename vpath with scale.
- Support both get and post for file list API.

**Core:**
- Update download documentation.



## 2022-07-27 3.31.2

**Core:**
- Renamed documentations of GCP.
- Added setup documentation for bemap with database support.
- Added new documentation of Docker image installation.
- Fixed Docker entry point with NODAEMON option.
- Added Docker compose script of distdb.



## 2022-07-18 3.31.1

**Charging Station:**
- Disable export pool patcher when building Docker image.



## 2022-07-11 3.31.0

**Charging Station:**
- Add retry mechanism for OCPI download.
- Save charge passes in dedicated table at download to reduce response time.
- Fix DB-361: added new ISO country code finder base on map matching.
- Set pool country code when available for remote providers.
- Added full tariffs download into cache for OCPI, kept the one-by-one tariff download if full download is not supported.
- Exporter:
  - Simplify time domain expressions for SVS export.
  - Use brand and number of parking space for SVS export.
  - Fix DB-350: fix use of svssplitter command on linux.

**Vehicles:**
- Add vehicleFeatureProfile info to vehicle datasheet.

**Core:**
- Updated OSM to 210510.
- Updated HERE 2022.2.
- Updated database version to 14: added new indices to charge pass.
- Updated Docker image based on Debian bullseye.
- Added more time for socket connection of first start of bgis.
- Replaced the MongoDB auto index creation system.
- Added a name space to spring session for Redis keys.
- Updated documentation of Routing API v1.0.0.



## 2022-06-28 3.30.1

**Vehicles:**
- Fixed the issue BEMAP-362 removed duplicates returned values of charger power.



## 2022-06-13 3.30.0

**Charging Station:**
- Fixed DW-1237: fix time domain in SVS export.
- Fixed DW-1244: fix connector power and current type for SVS export.
- Add truck attributes with parking restrictions in SVS export.
- Add new fields customerId and vehicleAccess in charging stations.
- Support vehicle access fields in charging station filters.

**Vehicles:**
- Added charger power (AC1,AC2,DC) information to findvehicles API.

**Routing:**
- Added new route-sheet translations (DE, ES, and IT).
- Add support for statistic traffic.
- Updated isochrone option to use forward by default.

**Core:**
- Updated version of docker entry-point script to avoid bad parsing of --deref option on Debian 11.
- Fixed DW-1127: deserialization of ObjectID when find filename of SVS.
- Documentation:
  - Updated documentation of Routing API Service v1.
  - Added version number of server software in bottom of main menu.
  - Minor UI and typo fixes.



## 2022-06-03 3.27.1

**Core**:
- Fix Core SDK:
 - Fixed Jira DW-1127 Deserialization of ObjectID when find filename of SVS.



## 2022-05-17 3.29.0

**Charging Station:**
- Added charge pass information to charging station model.
- Add new API to retrieve the list of charge passes for a provider.
- Fixed DW-982: add check on boolean and number filter value format
- Add availability filter for pools
- Fixed some OCPI field types.
- Added OCPI API structure.
- Refactor text autocomplete
- Added new field 'key' to the connector type API list.
- Added new mandatory field 'provider' to the pool brand autocomplete API.

**ChargingTime:**
- Added support of vehicle parameter to Charging time service API.
- Fixed DW-1161: convert remaining battery level to capacity.
- Fixed DW-1117: adjust the charge power to the vehicle charger.

**Core:**
- Updated library Spring Session Redis from 2.4.4 to 2.6.3.
- Updated BeNomad JSIV library version from 3.16.0 to 3.17.0.
- Fixed --rm=true of Docker build command.
- Fixed ACL third party cron.
- Updated Spring configuration to use Authorization HTTP header.
- Updated configuration of BeMap-Test to enable the support of connect.
- Disabled automatic download of some EV station providers for BeMap-Alpha and Windows Dev.
- Documentation:
  - Moved vehicle APIs to a dedicated section of main menu.
  - Updated documentations of vehicle API.
- Admin:
  - Updated user form by changing text Main customer contact.
  - Added new column update to charging station providers of user form.



## 2022-03-30 3.28.0

**Mapping**:
- Fixed DW-638: removed text over POI icons

**Charging Station**:
- Added new fields to Frontend ConnectorType class.
- Fixed DW-743: more precise availability status at station and pool level.
- Create different ids if two HereHLP pools have the same coordinates
- Support case insensitive modifier for regex filters
- Support OR operations in filters
- Refactor filter documentation

**EvSmartRouting**:
- Added support of new field Only Physical of vehicle feature.

**Routing**:
- Fixed DW-952: support undefined value of transport mode to avoid modifying transportation mode during routing calculation.

**Traceroute**:
- Add support of RNC format as `Traceroute` response.
- Fixed DW-871: removed `STOP_VIA` instruction with `Traceroute` API.

**Download**:
- Add new EV POI download API.

**Core**:
- Updated HTTP Helper library from 1.0.0 to 1.2.0
- Updated HTTP Helper library from 1.0.0 to 1.1.0.
- Updated PreProd configuration to enable connect file.
- Updated dev configuration to use HERE 2022.1
- Remove intermediate Docker containers after a successful build.
- Admin:
  - Added new right `ROLE_DOWNLOAD_FILE`.
  - Removed right `ROLE_BEMAP_JS_API_DOC` for REST API v1.0
- Documentation:
  - Updated documentation of EV Reachable area API.
  - Updated documentation of EV Smart Routing API.



## 2022-03-07 3.27.0

**Mapping**:
- Fix BeNomad Light graphical chart.

**Charging Station**:
- Add new filter action mechanism to support preferred coefficients

**Core**:
- Refactor unit tests.
- Documentation:
  - Update documentation.
  - Use markdown documentation builder for all service pages.
  - Display fields alphabetically and mandatory-first in generated markdown documentation.
  - Remove right `ROLE_BEMAP_JS_API_DOC` for REST API v1.0.



## 2022-02-21 3.26.1

**EvSmartRouting**:
- Fixed DW-701: Manage UTC and local time. Fixed on both algorithms v2 and v3. Departure time can be set in UTC or local time, the date and time outputs now respect the input behavior (UTC or local time).

**Charging Station**:

**Core**:
- Admin:
  - Fixed DW-570: Case-insensitive sorting of EV brands and EV Brands Set.



## 2022-02-10 3.26.0

**EvSmartRouting**:
- Prevent from internal error with algorithm v3 when same start and stop coordinates.
- Added support of alternative route for EV planner calculation with algorithm v3.
- Added new algo v3 forced stop feature via new field `stepPointTimeSlots`.
- Added new algo v3 forced stop near service POI feature via `stepPointTimeSlots` fields (time slots and service category).
- Updated documentation and sample page for time slots.
- Added autocomplete of service category for EV smart routing only used by documentation sample.
- Updated charging station example page to show operator ID of charging point.

**Geocoding**:
- Fixed bug DW-679: support alternative jsonp callback endings.
- Added a new feature Opposite Postal Address for reverse-geocoding.
- Updated HERE HLP geoserver with autosuggestGeocodingBean as default.

**Mapping**:
- Fixed mapping transparent layers of here geoserver.
- Added support of default layers for land feature and WMS GetFeatureInfo.
- Set BeNomad Light graphical chart defined as default.
- Updated BeNomad Light graphical chart.
- Updated mapping sample page to display the previous default chart.

**LandFeature**:
- Added support of default layers for land feature and WMS GetFeatureInfo.

**Charging Station**:
- Added remote charging field in stations.
- Added missing field bookable in stations.
- Added new option `PATH_POINT_MAP`, it will be used to display charging station pool on map with more details than `PATH_POOL_MAP`.

**Core**:
- Fixed charset UTF-8 (replaced utf8 by utf-8).
- Replaced HTTP Helper source code by a dédicated library HTTP Helper.
- Added jmx remote rmi port defined to 8998.
- Added configuration model properties to simplify the configuration.
- Updated bgis env scripts.
- Updated version number, improve new Watchdog restart, replaced wget by curl, and add more logs with date and time.
- Updated documentation by adding `START_MODE` feature.
- Updated change log format.
- Admin:
  - Added capability to enable/disable the imporation of vehicles as CSV file format.



## 2021-12-08 3.25.0

**Mapping**:
- Updated BeNomad Light graphical chart.

**Trace route**:
- Bug fixed: adding `EVT_GEOELEMENT_TYPE` to Trace route option of API v1.0.

**Charging Station**:

**EvSmartRouting**:
- Fixed bug #3506: Fixed the wrong calculation of road side. 
- Fixed displaying of algorithm v3 section at first page load.
- Algorithm v3:
  - Fixed NPE when corridor have a single coordinate.
  - Added support of new native enumeration `NOT_ENOUGH_MEMORY` and `TOO_MANY_CHARGES` used in error message process.
  - Added new feature forced charge.
  - Added parameters of forced charge in via.
  - Updated arrivalTime by using the new native SDK method `getTotalTime()` of route.

**Documentation**:
- Fixed bug #3561: The via settings is used even another tab is selected.
- Updated EV smart routing sample page to support new fields of via.
- Updated documentation.
- Updated documentation of vias field with engery routing destination.
- Updated rendering of step-point address in EV smart routing example.

**Core**:
- Updated timeout of Watchdog.
- Updated maintenance mail template and form.
- Updated EV upload of administration part by adding UUID check.



## 2021-11-10 3.24.0

**Mapping:**
- Added new graphical chart called `benomadLight` and stored in chart folder `chart-benomad-light-1_0`.

**Autocomplete:**
- Added support of other error description come from HERE HLP server.

**Charging Station:**
- Fixed bug #3464: fix Here HLP charging stations current type.

**EvSmartRouting:**
- Updated EV smart routing sample to use v3 by default.
- Updated API of algorithms list to expose the default algorithm name key.

**Documentation:**
- Added example to display map using BeMap API licked to the selected geoserver and graphical style..
- Updated example of display map styles using OpenLayer 4.
- Updated mapping example menu.



## 2021-10-19 3.23.0

**Autocomplete:**
- Fixed bug #3450: fixed issue when addressDetails is enable and HERE HLP APIv7 lookup return not found address (400) error.
- Fixed bug: when addressDetails is enable, the HERE HLP APIv7 lookup is called now with id parameter URL encoding.

**Charging Station:**
- Updated EVSE SVS exporter by replacing the attribute header info provider by extra provider.
- Added a maximum corridor radius to remote provider. If the request radius is over accepted radius server provider the system switch to a virtual corridor (multiple request based on circle).
- Updated HERE HLP provider to respect the maximum URL length (2048 characters) by simplifying the coordinates.

**EvSmartRouting:**
- Fixed bug #3428: remove comparison of connector current type and charging point current type.
- Fixed bug #3427: in V3, support validation of pools with null station id or null charging point id (Here).
- Added new field `stepPointPlugingTime` in request to taking into account of pluging time in each stop.
- Added new field `allowMaxSpdReco` in request to allow the calculated maximum speed.
- Added new field `maxSpeed` in response object `stepPoint` and `matchedInfo` to expose the calculated maximum speed.

**Currency:**
- Fixed issue when the downloading raise an exception, the currencies already stored in database is now available.
- Updated the frequency of new download data from every day to every week.

**Documentation:**
- Added example to display real-time info traffic with OpenLayers in  mapping section.
- Added new tutorial about enabling traffic info.
- Renamed previous configuration example with `tutorial` prefix.

**Core:**
- Fixed bug #3462: BeMap 3.22 distributed version cannot start. The EvCriterion class is move into common model package (front-end).
- Added new tutorial about enabling traffic info.
- Renamed previous configuration example with `tutorial` prefix.
- Updated sample of EV smart routing.
- Updated Java JVM from `AdoptOpenJDK 1.8.0_292` to `AdoptOpenJDK 1.8.0_302`
- Fixed bug #3463 and #3489: Fixed and updated BeNomad native SDK.



## 2021-09-23 3.22.0

> WARNING! EV Smart Routing propose more early a reduced minimal battery level. You can use minBatStrict parameter for strict respect of minimal battery level values.


**Autocomplete:**
- Added new version of HereHlp Auto-suggest service with new calls to Here API : auto-suggest and lookup for more address details.

**Mapping:**
- Updated graphical chart `bnd_g-server-chart-4_0` with country name display at scale 2250.000 (1250.000 before update).

**RouteHorizon:**
- Added new service to calculation the horizon information of road.
- Added new right `ROLE_ROUTEHORIZON`.

**Charging Station:**
- Updated API v1.0.0 for more back-end abstraction.

**EvSmartRouting:**
- Fixed bug #3396: Add operator id pool filter for algo v3 pool validation.
- Updated algorithm v2 to propose a non-strict minimal battery level.
- Added new field `allowOverVehSpdLim` to used `limitMaxSpeed` value over speed limit of database vehicles.
- Added round of 1-2 decimals for total consumed and battery level at arrival.
- Fixed bug #3404 (part 1): with algorithm v3, the right weight is now used.
- Fixed bug #3404 (part 2): wrong value of max acceleration and max deceleration of driving style. Now use correctly decimal values.
- Fixed #3422: use cached data indices instead of up-to-date provider data indices to access items in cache lists.

**Vehicles:**
- Add new field battery name and set battery capacity field as deprecated for vehicle search API.
- Fix bug #3412: Fix group config filtering.

**Reverse-Geocoding:**
- Fixed bug #3417: The returned value of street number field is now support alpha-numeric with BenomadReverseGeocodingService.
- Fixed: Opposite street number value of postal address object of service version 1.0.0.

**IsAlive:**
- Added support of is alive with GET and POST in API version 1.0.0.

**Core:**
- Fixed test on enable field of ClearFolderByDayAction class used in `backend-scheduler.cfg.xml` configuration file.
- Added server name to maintenance section of administration part.
- Added support of connect.ncf file. If the file cannot exist it will be created at first start. Disable by default.
- Updated maintenance e-mail template.
- Updated Docker entry point script to prevent from 0 environment variables.
- Updated Docker updater script to perform a copy of configuration files keeping owner for files that do not exist in the destination.



## 2021-08-23 3.21.1

**Core:**
- Fixed automatic login performance issue whit BeMap server without database support.



## 2021-08-17 3.21.0

**Charging Station:**

**EvSmartRouting:**
- Return empty array instead of null when no charging station found (v3).

**Core:**
- Added Redis support without CONFIG initialization, for more details see documentation https://github.com/spring-projects/spring-session/issues/124.
- Updated Spring Data Redis version from 2.4.2 to 2.4.4.
- Updated configuration properties documentation.
- Added experimental error logger by mail. Disable by default.



## 2021-08-12 3.20.0

**Charging Station:**
- Added support of deprecated connector when connector is filtered from local database.
- Added new JMX exposed method checkChargingPointDuplicate.

**EvSmartRouting:**
- Fixed bug #3378: Reinitialize event distance and time at step point.
- Fixed bug #3379: Update event battery level at step point.
- Fixed bug #3370: Accept null current type if connector is valid.
- Fixed bug #3392: Fix current time calculation.
- Fixed bug #3389: Add smart routing new option to allow pools, station and charging point with unknown (NA) availability status.



## 2021-07-30 3.19.0

**EVSmartRouting:**
- Fixed wrong lon, lat field of error response. Replaced by longitude and latitude fields name in compliance with previous service version.

**Core:**
- Added support of date and time with decimal, e.i.: 2020-09-10T14:30:00.0693777.
- Updated native SDK JSIV.



## 2021-07-13 3.18.0

**Geocoding:**
- Added support of HERE HLP LocationId to API v1.0 of Natural geocoding.

**Charging Station:**
- Added parsing of HERE HLP error messages.

**EVSmartRouting:**
- Fixed bug #3367: Fixed battery regeneration feature.
- Fixed bug #3369: Fixed weight of vehicle profile.
- Fixed event frequency for v3 algorithm.
- Fixed event battery level and consumption for v3 algorithm.
- Fixed step point arrival time for v3 algorithm.
- Fixed journey arrival time for v3 algorithm.
- Fixed bug #3380: Fixed pool status validation for v3 algorithm.
- Fixed bug #3362: Event battery level adjustment in compliance with step-point departure battery level.
- Fixed bug #3366: Event battery level adjustment in compliance with step-point departure battery level.

**Vehicle:**
- Fixed findVehicule charger power filter.



## 2021-07-01 3.17.0

> WARNING! In service version 1.0 of Geocoding and Geocoding for batch, the wrong field name `postalCode` of `GeocodingItem` element is renamed by `postalAddress`.


**Geocoding:**
- Fixed bug #3359: added support of postal code and road number fields for Geocoding API version 1.0.
- Fixed wrong postalCode field name of Geocoding and Geocoding for batch response elements. Replacing field name from postalCode to postalAddress.

**Charging Station:**
- Fixed possible issue with OCPI providers and field name of AdditionalGeoLocation used by `related_locations` field of Location.
- Fixed providers with `responseTimeWarning` configuration variables. Removed duplicate fields, this configuration variable is provider by an abstract class.

**EVSmartRouting:**
- Updated vehicle energy profile with regenerative braking feature.
- Added new service and API to expose the list of algorithm.

**Core:**
- Fixed export EV vehicle as CSV or JSON: The character `,` in export file name are replaced by `_`.
- Fixed SMTP TLS protocol connection used by mailing (reports, user account expiration, monitoring SVS files expiration, etc). This issue appear in version 3.14 with the switch from Java JVM from `Oracle 1.8.0_191` to `AdoptOpenJDK 1.8.0_292`.
- Added new field to override the configuration default geo-server for an user. When the logged user send a request without geo-server or with 'default' value, the geo-server defined in user account will be used.
- Added vehicle search by UUID in administration part.
- Added automatic clean of TaskSync database entries.
- Updated Docker updater to version 1.2.0.
- Updated Docker updater with argument to `LOCAL_CP` and `LOCAL_LN` source mode, example: `LOCAL_CP --deref`.
- Removed un-sed library org.apache.cxf / cxf-rt-ws-security.

**Documentation:**
- Fixed Currency section of REST API v0.9.
- Updated Environment variables documentation.
- Updated sample of EV smart routing to support the new `algo` field.



## 2021-06-02 3.16.0

**Routing:**
- Added support of non-numeric exit number to text route-sheet generator.

**EVSmartRouting:**
- Added new field 'algo' to select algorithm will be used to perform the route calculation.

**Core:**
- Added new configuration capability to merge keys and values of configuration.meta file to configuration.properties file.
- Moved default geo-server configuration aliases into a dedicated file "geoserver-default.cfg.xml.

**Documentation:**
- Added comment to Data-set expiration's monitor section.



## 2021-19-05 3.15.0

> NOTE: The clearing of Pool collection is removed from database upgrade process. The Pool data are kept even if the database version is lower than 13.


**Charging Station:**
- Fixed charging station mixer by define the field "dbId" to null to force the creation of new pool in database.

**EVSmartRouting:**
- Set to ignore valid field of coordinate in error response.

**Core:**
- Removed unused rights when the BeMap running without database.
- Database upgrade to version 13. The clearing of Pool collection is removed from database upgrade process. The Pool data are kept even if the database version is lower than 13.



## 2021-05-17 3.14.0

> WARNING: If your database version is under 12 (with all BeMap under 3.13) the Pool collection will be cleared.


**Charging Station:**
- Updated brand mix csv file.

**Service API:**
- Catch HttpMessageNotReadableException to expose the cause message in error output.

**Traffic:**
- Updated Open LR geometry parser to log a OpenLrBase64 field with null value only when the debug level is set.

**Core:**
- Updated Apache Tomcat from 8.5.35 to 8.5.65.
- Updated Java JVM from `Oracle 1.8.0_191` to `AdoptOpenJDK 1.8.0_292`.
- Updated MaxMind GeoIP Lite tools to log only non private LAN warning.
- Added creation of Monitoring account when the database is new.
- Added custom HTTP 404 page.



## 2021-04-28 3.13.0

> WARNING: If your database version is under 12 (with all BeMap under 3.13) the Pool collection will be cleared.


**Charging Station:**
- Updated availability status management of providers.
- Updated IRVE provider to prevent from wrong coordinates and updated connector type names.
- Added payment mode support for Here remote provider.
- Added spatial coordinates to each Pool object.

**EVReachableArea:**
- Added support of isochrone calculation with round trip (beta).
- Added exception when the isochrone calculation cannot be feasible.

**EVSmartRouting:**
- Fix bug #3308: Exclude charging station with from available status set to NA.
- Added new parameter minBatStrict. If set to `true`, the minBatLvl and minArrivalBatLvl parameters will applied strictly. The values cannot be reduced when next step-point is available in near km. False by default.

**Routing:**
- Added support of native SDK method isochrone with 2 coordinates to build the isochrone polygon representing the area that can be reached through the road network starting from start, ending at stop, and with a given limit of time or distance or energy.
- Updated API v0.9 by change type string to boolean for field "used" in "usedDestination" entries.
- Updated to prevent from NPE when the route-sheet start on a roundabout.

**Documentation:**
- Added comment (Beta) to `TRAFFIC_HISTORICAL` option.
- Added `mandatory` tags.

**Core:**
- Added new key "bgis.cluster.name" in configuration properties file to force the name of server name used in e-mail reports.
- Bug fix on update MaxMind GeoIP Lite database (close and reopen database properly).
- Added new rights `ROLE_OPT_ROUTING_ISOCHRONE_ROUNDTRIP` and `ROLE_OPT_EVREACHABLEAREA_ROUNDTRIP`.
- Database upgrade to version 12. WARNING: If your database version is under 12 (with all BeMap under 3.13) the Pool collection will be cleared.



## 2021-04-08 3.12.0

**Charging Station:**
- Updated Ocpi provider by replacing the clear all data and after download/save process by the download/update/clear not updated process.
- Updated charging station connector list, fixed max power values when the value is type float.
- Added credit card payment filter.
- Enhance filter autocomplete.

**EVSmartRouting:**
- Fix bug #3305: Added capability to propose à different minimal charge level to reduce the number of charge when the first found step-point is to near from the start or previous step-point. 

**API service v1.0.0:**
- Added value `; charset=utf-8` to the HTTP header Content-type. Example for JSON format: `Content-type: application/json; charset=utf-8`

**Monitoring:**
- Added new API Monitoring to get the server system state information.

**Documentation:**
- Added in Glossary section the list of connector types.



## 2021-03-22 3.11.0

**Charging Station:**
- Added validation of location coordinate for OCPI protocol, the valid longitude range is -180 to 180 and the valid latitude range is -90 to 90. If the coordinate is not validated the location (pool) will be ignored.

**EVSmartRotuing:**
- Added more accuracy on polyline for the first, vias, and last coordinates.

**Routing:**
- Added more accuracy on polyline for the first, vias, and last coordinates.

**Traceroute:**
- Added more accuracy on polyline for the first, vias, and last coordinates.

**Documentation:**
- Added Land Feature service example.

**Core:**
- Fix wrong address returned by Geocoding service for Rome Italia region.



## 2021-03-05 3.10.0

**ServerVersion:**
- Added new API ServerVersion to get the software version information.

**Core:**
- Added support of storage Spring Security session in Redis server.
- Added report graph by country or vehicle in administration part.
- Updated Docker updater to version 1.1.0.



## 2021-02-26 3.9.0

**Charging Station:**

**Routing:**
- Added insertion of instruction in route-sheet when the via destination is reached.

**Core:**
- Added support of max power field by the connector manager. The max power of connector will be used to limit to charge power.



## 2021-02-11 3.8.0

**Reverse Geocoding:**
- Added new option `START_AT_RADIUS` to start research directly at radius passed in parameter.

**EVSmartRouting:**
- Fix bug #3257: Updated capability to find start or stop coordinates on another roads when the input coordinates match a road cannot be accessible by the routing network (OSM).
- Added the field operatorId to step-point. 

**Routing:**
- Added to instruction of route-sheet a literal text can be used by a text-to-speech engine.



## 2021-02-02 3.7.0

**LandFeature:**
- Removed the postal code is the reverse-geocoding cannot found any items and the postal address is build from the find native SDK method.

**NearPoi:**
- Added support of polyline and encoded polyline geometry of route, between start coordinate and POI.

**Core:**
- Added support of country code of client IP address to ACL Audit Log system.
- Updated ACL audit e-mail report by adding the third party, country sort and vehicle.



## 2021-01-11 3.6.0

**Charging Station:**
- Updated charging station example page, added auto-complete search tool to find longitude/latitude from postal address.
- Bug fix in charging station with depthOfPath set to `POOL_MAP` and connectors filters parameter.
- Added country code to pool are stored into the local database. 
- Bug fix on regex operator of filters parameter.

**EVSmartRouting:**
- Added support to disable the maximum route length test (`OVER_ALLOWED_DISTANCE`).

**Routing:**
- Added a dedicated limit on maximum number of coordinates can be performed in matrix mode.

**Documentation:**
- Added charging cost example.



## 2020-12-18 3.5.0

**Routing:**
- Added support of request caching. Disabled by default.

**Core:**
- Added experimental caching of GeoRequest. Disabled by default. See the key "bgis.cache.request.enable" in configuration.properties file.
- Fix the database project of method reportPerRate.



## 2020-12-16 3.4.2

**Charging Station:**
- Added annotation @Charging StationFilterField to operatorId of Pool  class.
- Updated charging station connectors list by removing the AC three flag for Type 2 Combo CSS connector.

**EVSmartRouting:**
- Added logs on sorting phases.



## 2020-12-15 3.4.1

**Charging Station:**

**EVSmartRouting:**
- Updated parsing of charging station, by default exclude private and reserved pools.



## 2020-12-11 3.4.0

**Charging Station:**
- Added generic depth of path filter into the charging station service.
- Added new value `PATH_POOL_MAP` to depth of path level, will be use for display pool on map.
- Added bbox parameter to define the bounding box can be used with `PATH_POOL_MAP` for display pool on map.
- Updated charging station example page, removed the depth of path JavaScript filter.

**Documentation:**
- Added SDK JSIV Class ID list.



## 2020-12-07 3.3.2

**Charging Station:**
- Fix downloading every days.

**Core:**
- Added API to send an maintenance e-mail to users.
- Added maintenance section in administration part with mailing information for maintenance period.



## 2020-12-03 3.3.1

**EVSmartRouting:**
- Prevent from 0 charge time during the charge time optimization.

**Core:**
- Added ACL log when vehicle is saved or deleted.



## 2020-12-02 3.3.0

**ChargingCost:**
- Updated to support the new EV vehicles database model.

**Charging Station:**
- Added support of power feed type field of HERE HLP EV provider. 

**EVReachableArea:**
- Updated to support the new EV vehicles database model.
- Added KML output format.

**EVSmartRouting:**
- Updated to support the new EV vehicles database model.

**Core:**
- Updated database data model of EV vehicles.
- Updated administration part to support the new EV vehicles database model.



## 2020-11-18 3.2.0

**Charging Station:**
- Updated HERE HLP provider to round the value of nominal power.
- Added support to update local EVSE database every 5 minutes.

**ChargingTime:**
- Fix wrong optimistic charge time when the vehicle have a charger AC three phases and the connector is AC single phase.

**EVSmartRouting:**
- Added new field cnnTypeId to step point -> chargingPower object.
- Added a filter on selected connectorTypes of step point -> charging point object.
- Updated EV Smart Routing algorithm to prefer an step-point of journey forward.
- Added Special case to select the charge power for Combo CSS Type 1/2 DC connector. This connector is compliance with DC and AC.

**Core:**
- Updated database data model of EV vehicles.
- Added export/import feature from EV vehicles.



## 2020-10-22 3.1.0

**Mapping:**
- Updated HERE HLP mapping service to support the terrain.day and hybrid.day layers.

**Geocoding:**
- Added to configuration properties file the service limit of geocoding place beans.

**LandFeature:**
- Change the default maximum result to 0. Now can limit the feature and geocoding elements.

**Charging Station:**
- Bug fix in OCPI parser for logo field of BusinessDetails type. Also prevent from NPE.
- Added support of updating local database at predefined frequency every day, week, and month.
- Added new field "filters" that can contains a list of charging station filter to return only the points matching the filters.
- Updated accuracy of local search with coordinate and radius. 

**Routing:**
- Added support of matrix complement.
- Added new options `MATRIX_COMPLEMENT`.
- Added new parameter matrixStartCount.
- Added support of `REVGEO_STRICT_DISABLE` option.
- Added exception management in CSV output format.
- Added support of new SDK departureTime text format and EPOCH format (UTC).
- Added new exception when the corresponding minimum coordinate is not reached.
- Added support of traffic info around all start coordinates when `MODE_MATRIX` mode is set.

**EV Smart Routing:**
- Added support of new SDK departureTime text format and EPOCH format (UTC).
- Added new parameter csdepcnt to enable the deprecated connector types.
- Added new field "csfs" that can contains a list of charging station filter to return only the points matching the filters.

**Traffic:**
- Added support of HTTP client certificate.

**Documentation:**
- Added support of white labeling of documentation interface.
- Added support of charging station filters to EV smart routing example page.

**Core:**
- Added password encrypt of ACL user with available hash algorithms pbkdf2, bcrypt, scrypt, argon2, and plain.
- Updated MongoDB driver: fix the memory leak with Replica Set configuration and MongoDB 4.x.
- Added automatic detection of JMX server full DNS name set to the JVM for RMI connections.
- Added company name mandatory field in configuration.properties file. 



## 2020-07-20 3.0.0

**Geoserver:**

**Charging Station:**
- Added OCPI provider.
- Added BeNomad Country Switch provider (can switch between providers based on request coordinate in detected country).

**EVSmartRouting:**
- Bug fix #3137: Exclude all step-points during the parsing of charging stations.
- Added enableDatasheet and datasheet field to vehicle info list service to expose in encrypted data the vehicle model data.

**Routing:**
- Added new mode `MODE_MATRIX` can computes a n x n matrix of path weights between every pairs of a set of points. path weights are defined in seconds if fastest mode, meters if shortest mode, and Wh if eco mode. This mode only fill the length, duration, and energyConsumption fields.
- Added Geo-element type to events to get the road administrative level like main road, secondary road, etc.

**Trace route:**
- Added Geo-element type to events to get the road administrative level like main road, secondary road, etc.
- Added adjustEta parameter to defines if the ETAs match with time stamps defined in destinations.
- Added support of traffic info found on route segment.

**Rebuild route:**
- Added Geo-element type to events to get the road administrative level like main road, secondary road, etc.

**Core:**
- Replace support of SQL database (MySQL, PosgreSQL, etc.) by MongoDB.
- Updated administration part.
- Replaced default Tomcat port:
  - HTTP port from 8080 to 8380.
  - HTTPS port from 8443 to 8343.
  - AJP13 port from 8009 to 8309.
  - Shutdown port from 8005 to 8305.  
- Ignore errors on unresolved placeholder of configuration.properties used in XML configuration files.
- Added ability to throw an exception when a user make more than x requests in 1 hour.



## 2020-03-05 2.13.0

**ChargingCost:**
- Added support of minAmount in calculation of charging cost.

**AutocompleteGeocoding:**
- Added switch service for auto-complete service.
- Updated HERE HLP geo-server configuration to use the auto-complete switch service. 

**Traffic:**
- Added capability to export the traffic info data to files (one per country code).
- Re-factoring of traffic high-lighter and create an traffic geometry parser.
- Re-factoring of merge process.
- Added dedicated merge tool for City of New-York to Tomtom and HERE ML Incident to ML Realtime.
- Updated traffic configuration to use the multi-polyline and merge tool (parsed).



## 2020-01-03 2.12.0

**ChargingCost:**
- Bug fix on energy calculation.

**Charging Station:**
- Added support of corridor research for charging station service.

**EVReachableArea:**
- Bug fix #3045: used only the max speed of vehicle when value is superior to 0 and inferior or equal to the routing maximum speed.

**EVSmartRouting:**
- Added support of charging station search by corridor.
- Bug fix on events battery level, use the current level of battery for first element.
- Bug fix #3046: prevent from negative charge.
- Bug fix #3045: used only the max speed of vehicle when value is superior to 0 and inferior or equal to the routing maximum speed.
- Bug fix #3038: don't use the radius charging station request if a valid step-point is found.

**Traffic:**
- Added parser of New-York City Open Data, https://data.cityofnewyork.us/.
- Added trace route high-lighter.

**Core::**
- Added OEM Data for EV.



## 2019-11-08 2.11.1

**Core:**
- Updated BeNomad JSIV library from 3.14 to 3.15.



## 2019-11-08 2.11.0

**ChargingCost:**
- Added new service to calculate the charging cost and time for a vehicle and list of charge information.

**Charging Station:**
- Added new option `DEPRECATED_CONNECTOR` to include all deprecated connector types.
- Added new field current type (AC/DC).
- Changed Prices structure, by adding a level Tariffs list and tariff objects.

**EVReachableArea:**
- Added support EV Brand filtered by ACL user.
- Increase precision.

**EVSmartRouting:**
- Added support EV Brand filtered by ACL user.
- Added summary calculation of journey arrival time.
- Added more precision of arrival time for each step-ppoints.
- Added duration of travel between the current step-point and previous step-point or start point in seconds.
- Added driving style/mode; ECO, NORMAL, SPORT, and CUSTOM to define the max acceleration, deceleration, limit the maximum of speed and speed ponderations.
- Added support of AD / DC.

**Routing:**
- Added support of negative value of energy consumption in routing response (XML and JSON).

**OpenLR Parser:**
- Added new service called openlrparser. Can parse and extract the route information from an OpenLR code.

**Core:**
- Updated some returned coordinates to double precision.



## 2019-06-10 2.10.0

**EVReachableArea:**
- Added new service to perform a calculation of reachable area dedicated to electrical vehicle. This service return a geometry of are.

**EVSmartRouting:**
- Added new service to perform a routing calculation dedicated to the electrical vehicle. Returns the rout with all needed step points charger.

**NatGeocoding:**
- Added new service natgeocoding to perform a geocoding from a textual postal address (free text).

**AutocompleteGeocoding:**
- Added new service autocomplete geocoding to suggest some textual postal address (free text).

**EV Smart Routing:**
- Added new service to perform a calculation of travel dedicated to electrical vehicle. This service return the trip planner with all charging stops will be need to reach the trip.

**Routing:**
- Added support of toll cost and tax cost in event structure.
- Added support of Google encoded polyline.
- Added support of reversed direction of road segment for isochrone service.
- Added support of route-sheet instructions in event structure.

**Trace route:**
- Added support of toll cost and tax cost in event structure.
- Added support of Google encoded polyline.
- Added support of route-sheet instructions in event structure.

**Traffic:**
- Added BeNomad JSON 1.1 to support OpenLR and TPEG OpenLR formats.

**Currency:**
- Added currency services.

**Weather:**
- Added weather service.



## 2018-09-19 2.9.1 (44202.44154.44154) ![Build passed](images/badge-build-passed.svg)

**Core:**
- Bug fix, infinite loop in trace route when heading and speed are set to 0.



## 2018-09-19 2.9.0 ![Build passed](images/badge-build-passed.svg)

**IsAlive:**
- Added new service called "IsAlive" will be used for HTTP monitoring, with quick test of internal components.

**Charging time:**
- Added a new service called ChargingTime to perform a calculation of charging time for a electrical vehicle.

**Charging station:**
- Added a new field called numberOfParkingSpace in outputs of charging station service.
- Added filtration on pool ID, station ID, and point ID.

**Geocoding:**
- Disable the limitation of mandatory country value when the bounding box is set.
- Added angle of road segment in XML and JSON outputs of geocoding element.
- Added some limitation on bounding box, see GeoServerInfo service to get the limitation values.
- Added new field exact street number to indicate if the location corresponds exactly to the required street number.
- Added support of alpha street number.
- Added support of language code on 3 digits (also available on 2 digits).
- Added the exact coordinate of a POI or street number (if address points are available).
- Added state and county values in output of geocoding service.
- Added details of relevance score for country, city, postal code and street (place) fields.

**Geocoding for batch:**
- Added new service.

**Reverse Geocoding:**
- Ticket #002246: Added new field OppositeStreetNumber.
- Optimization when the option `SKIP_EMPTY_STREETNAME` is set.
- Optimization when the maxResult parameter is > 0.

**Reverse Geocoding for batch:**
- Ticket #002246: Added new field OppositeStreetNumber.
- Optimization when the option `SKIP_EMPTY_STREETNAME` is set.
- Optimization when the maxResult parameter is > 0.

**LandFeature:**
- Added predictive traffic info.
- Added support research by polygon. By default circle.

**Routing:**
- Remove limitation in isochrone for `ECO_ENERGY` criteria.
- Disable by default the avoid U-Turn for all Via routing calculation.
- Replaced the simple corridor geometry by a several polygons. The corridor can be composed of several polygons, the first is the main geometry of the corridor. the next is the extrusion hole.
- Bug fix: Correction of length nd duration value in used destinations when the first and second destinations are the same.
- Bug fix: Prevent from out of index when no route is found.
- Added new field maxSpeed to define the maximum speed and type (ETA, CAL, or ALL).
- Added new fields in used destination: z, zIsSet, heading, headingIsSet, speed, speedIsSet, time, sat, radius, ignorePoint, ignoreTrafficDirections, ignoreRoadBlocks, ignoreRestrictions, avoidUTurn, useStartAngle, useStopRoadSide, and mandatory.
- Added new minimal limit of xy radius (by default 1 meter).
- Added support of energy vehicle profile for routing calculation.
- Added length and duration in last used destination when the routing have only 2 destinations (start and stop).
- Added OpenLR representation of route geometry.
- Added cumulative consumption in EnergySample of event structure.
- Added real-time traffic, predictive traffic, and historical traffic.
- Added a work around to disable the hole in corridor geometry.
- Added optimized function of optimization trip options.
- Added capability to return the postal address of matched input coordinates, use the new option `REVGEO_POSTAL_ADDRESS` to enable.

**Trace route:**
- Removed criteria feature of trace route service.
- Removed first algorithm version of trace route (option `ALGO_EXP0`).
- Tagged criteria parameter as deprecated.
- Tagged options `ALGO_EXP0` and `ALGO_EXP1` as deprecated.
- Replaced the simple corridor geometry by a several polygons. The corridor can be composed of several polygons, the first is the main geometry of the corridor. the next is the extrusion hole.
- Added new field maxSpeed to define the maximum speed and type (ETA, CAL, or ALL).
- Added new fields in used destination: z, zIsSet, heading, headingIsSet, speed, speedIsSet, time, sat, radius, ignorePoint, ignoreTrafficDirections, ignoreRoadBlocks, ignoreRestrictions, avoidUTurn, useStartAngle, useStopRoadSide, and mandatory.
- Added OpenLR representation of route geometry.
- Added two new options `ONLY_BLOCKED_ROAD` and `EXCLUDE_BLOCKED_ROAD` to perform a filtration on traffic element with road blocked or non-blocked reason.
- Added support to keep a GPS coordinate with mandatory set to true when is on the first route element.
- Added capability to return the postal address of matched input coordinates, use the new option `REVGEO_POSTAL_ADDRESS` to enable.

**Rebuild route:**
- Added new fields in used destination: z, zIsSet, heading, headingIsSet, speed, speedIsSet, time, sat, radius, ignorePoint, ignoreTrafficDirections, ignoreRoadBlocks, ignoreRestrictions, avoidUTurn, useStartAngle, useStopRoadSide, and mandatory.
- Added OpenLR representation of route geometry.

**GeoServerInfo:**
- Added information about the unit.

**Tools:**
- Geocoding:
  - Added in output file a new field called "relevanceScore".
- Web interface:
  - Replaced API documentation page by a new one based on Markdown, HTML/CSS, and JavaScript. 

**Core:**
- Removed class CoordinateGpsInfo, the time and sat fields are moved into the CoordinateGps class.
- Bug fix of (JSIV) #2154: The methods valueOfIsoCode2 and valueOfIsoCode3 of LanguageCode class not work.
- Prevent from map data file name without any extension.
- Replace the remote procedural call used by ACL audit logger by a simple database insertion (Hibernate save), new fields server, cluster and transport type.
- Optimization on login authentication process.
- Added CORS support via Tomcat CORS filter and custom BeNomad CORS filter.



## 2017-06-29 2.8.9 (39397.patch_jsiv_3.12.1) ![Build passed](images/badge-build-released.svg)


**Geocoding:**
- Bug fix #2007: Prevent from crash when too much possibilities are found during the research.



## 2017-05-15 2.8.8 (39397.39145.39145) ![Build passed](images/badge-build-released.svg)

**Mapping:**
- Bug fix #1956: By default the simple rule of mapping cache let pass through (don't use the cache) when no styles parameters is set. Now the styles or layers parameters is not required by the simple rule mapping cache to work.



## 2017-05-11 2.8.7 (39364.39145.39145) ![Build passed](images/badge-build-released.svg)

**Routing:**
- Added new option `MINIMAL_WAYPOINTS` to enable the minimal way-points algorithm.

**Trace route:**
- Added new option `NO_MINIMAL_WAYPOINTS` to disable the minimal way-points algorithm.

**Traffic:**
- Bug fix #1955: Prevent from Java memory leak in clear old snapshots method used by the historical info traffic memory store.



## 2017-04-05 2.8.6 (39286.39145.39145) ![Build passed](images/badge-build-released.svg)

**Routing:**
- Prevent from out of index when optimization and waypoint polyline are enable.



## 2017-03-21 2.8.5 (39162.39145.39145) ![Build passed](images/badge-build-released.svg)

**Routing:**
- Added new option `OPTIMIZED_TRIP_CLOSE`.



## 2017-03-21 2.8.4 (38823.38822.38822) ![Build passed](images/badge-build-released.svg)

**Core:**
- Update JSIV version to 3.12.0.



## 2017-03-21 2.8.3 (38823.38822.38822) ![Build passed](images/badge-build-released.svg)

**Core:**
- Update JSIV version to 3.12.0.



## 2017-03-20 2.8.2 (38800.38798.38798) ![Build passed](images/badge-build-released.svg)

**Routing:**
- Bug fix #1943: NPE only when 2 destinations coordinates are set and the options `WAYPOINTS` and `WAYPOINTS_POLYLINE` are set.
- Bug fix #1945: Wrong field in JSON output of Trace route service. The field `polylineIndex` are duplicate. Renamed the first field `polylineIndex` to `usedDestinationIndex`.

**Trace route:**
- Bug fix #1943: NPE only when 2 destinations coordinates are set and the options `WAYPOINTS` and `WAYPOINTS_POLYLINE` are set.
- Bug fix #1945: Wrong field in JSON output of Trace route service. The field "polylineIndex" are duplicate. Renamed the first field "polylineIndex" to "usedDestinationIndex".



## 2017-03-02 2.8.1 (38558.38543.38543) ![Build passed](images/badge-build-released.svg)

**Routing:**
- Bug fix: clear the exclusion zones after routing calculation.
- Bug fix: wrong indexes in used destination index of way-point.
- Added support of avoid country codes. Set a list of country codes will be excluded by routing calculation.



## 2017-02-23 2.8.0 (38469.38371.38371) ![Build passed](images/badge-build-released.svg)

**Rebuild route:**
- This service is now deprecated and replaced by Trace route service.

**Charging Station:**
- Added new service charging station.

**Routing:**
- Bug fix #1928: Wrong value "NaN" in filed average speed. When the trip is too short, the route time and/or length are 0 values. The calculation of average speed result of NaN.
- Added energy consumption with end of autonomy calculation and energy consumption samples.
- Added speedType to defines if max speed should be used for route calculation and/or for route time estimation (ETA) (default = ALL).

**Trace route:**
- Bug fix #1927: "Used destination" indexes of waypoints in response are wrong when the trip begin by a several unmatched coordinates (like off-road or private area).
- Bug fix #1928: Wrong value "NaN" in filed average speed. When the trip is too short, the route time and/or length are 0 values. The calculation of average speed result of NaN.
- Added energy consumption with end of autonomy calculation and energy consumption samples.
- Added speedType to defines if max speed should be used for route calculation and/or for route time estimation (ETA) (default = ALL).

**Traffic:**
- Remove CBConseil parser.
- Change the merging process between HERE real-time and HERE incident XML flux. 

**Core:**
- Removed BeNomad Licensing certificate support.
- Removed Cluster session replication and concurrent session counter (Hazelcast).
- Updated Oracle Java JVM from 1.7 u74 to 1.8 u112.
- Updated Apache Tomcat from 7.0.68 to 8.5.6.



## 2016-10-20 2.7.0 (37178.37178.37178) ![Build passed](images/badge-build-released.svg)

**Reverse-Geocoding:**
- Added support of new conditional speed limit type, SCHOOL and ADVISORY.

**Batch Reverse-Geocoding:**
- Added support of new conditional speed limit type, SCHOOL and ADVISORY.

**Geocoding:**
- Added support of new conditional speed limit type, SCHOOL and ADVISORY.

**Routing:**
- Remove old French eco-taxe option and feature.
- Added new output structure called "event" can replace the old "detailed polyline".
- Added elevation of route geometry exposed by the new event structure.
- Added new options for routing, trace route, and rebuild route services: `EVENT`, `EVT_DUPLICATE_FILTER`, `EVT_ROAD_FEATURE`, `EVT_ELEVATION`, `EVT_SEGMENT_INFO`, `EVT_POLYLINE`, `EVT_CHARGING_STATION`.
- Added support to search charging station when the electrical vehicle was out of range and returns the list in output.
- Added new criteria `ECO_ENERGY`.
- Return the traffic delay only when the Traffic or Traffic Patterns options is set.

**Trace route:**
- Remove old French eco-taxe option and feature.
- Added new output structure called "event" can replace the old "detailed polyline".
- Added elevation of route geometry exposed by the new event structure.
- Added new options for routing, trace route, and rebuild route services: `EVENT`, `EVT_DUPLICATE_FILTER`, `EVT_ROAD_FEATURE`, `EVT_ELEVATION`, `EVT_SEGMENT_INFO`, `EVT_POLYLINE`, `EVT_CHARGING_STATION`.
- Added support to search charging station when the electrical vehicle was out of range and returns the list in output.
- Added new criteria `ECO_ENERGY`.

**Rebuild route:**
- Remove old French eco-taxe option and feature.
- Added new output structure called "event" can replace the old "detailed polyline".
- Added elevation of route geometry exposed by the new event structure.
- Added new options for routing, trace route, and rebuild route services: `EVENT`, `EVT_DUPLICATE_FILTER`, `EVT_ROAD_FEATURE`, `EVT_ELEVATION`, `EVT_SEGMENT_INFO`, `EVT_POLYLINE`, `EVT_CHARGING_STATION`.
- Added support to search charging station when the electrical vehicle was out of range and returns the list in output.
- Added new criteria `ECO_ENERGY`.

**Protocols:**
- Added support of authentication by URL parameters, by default appid and appcode parameters can receive the login and password.

**Core:**
- Updated Spring Framework to 4.3.3 and Spring Security to 4.1.3.
- Updated Apache CXF to 3.1.7. 



## 2016-08-01 2.6.2 (36266.36060.36060) ![Build passed](images/badge-build-released.svg)

**Trace route:**
- Bug fix #1863: Correction for some trace route with no stop point found (prevent from index out of bounds in vias array).



## 2016-07-05 2.6.1 (36061.36060.36060) ![Build passed](images/badge-build-released.svg)

**Trace route:**
- Bug fix #1845: waypoints polyline wrong coordinate insert of used destination.



## 2016-07-04 2.6.0 (36041.36039.36039) ![Build passed](images/badge-build-released.svg)

**Reverse-Geocoding:**
- Added classId to the reverse-geocoding response.

**Geocoding:**
- Added classId to the geocoding response.
- Update geocoding response for POI to return a complete postal address.

**Routing:**
- Bug fix #1827: Toll polyline index values.
- Added delay in seconds due to real time traffic and speed patterns. Takes into account ETA speed ponderations and vehicle's maximum speed. See field TrafficDelay in results.
- Added length in meters from start point to the used destination (via point).
- Added duration time (ETA) in second from start point to the used destination (via point).
- Added energy consumption API.

**Trace route:**
- Bug fix #1827: Toll polyline index values.
- Bug fix: waypoint plolyline indexes on some very complex trace with speed and time-stamp.
- Added index polyline of waypoints polyline in used destinations array when waypoints are used.
- New Algorithm.
- Added energy consumption API.

**Rebuild route:**
- Bug fix #1827: Toll polyline index values.
- Added energy consumption API.

**GeoServerInfo:**
- Added list of available geo-server names.

**Download static files:**
- Added new downloading static file with ACL control.

**Tools:**
- POI converter:
  - Added support of postal code.
  - Use the new geocoding algorithm.
  - Use the original file name with the SVS extension at end of new file name.
- Geocoding:
  - Use the new geocoding algorithm.
  - Remove the limitation about entries with empty street name.

**Core:**
- Update Java JRE to 1.7.0 update 80.
- Update Apache Tomcat to 7.0.68.
- Added support to write the traffic info stream to file(s), store by URL path, date and time.
- Added stat (like Ok, error, last exception) exposed by JMX of download streams like traffic info XML file.
- Added clear old files task, like delete old downloaded traffic info file.



## 2016-02-11 2.5.0 (34481.33928.33928) ![Build passed](images/badge-build-released.svg)

**Reverse-Geocoding:**
- Bug fix #1710: The transportType parameter value is not propagated to the back-end.
- Added support of traffic and traffic historical options.

**Batch Reverse-Geocoding:**
- Bug fix #1711: The transportType parameter value is not propagated to the back-end.
- Added support of traffic and traffic historical options.

**LandFeature:**
- Added class code (id) name for each feature element.
- Added support of layers parameter with text or number value.
- Added support of attributes parameter with text or number value.
- Added support of speed category in km/h, length in meters, and truck attributes decoded value.
- Added support of traffic and traffic historical options.

**Geofencing:**
- Added geo-fencing test between circle fences and a circle, polyline, or polygon.

**Geofencing Manager:**
- Bug fix #1707: Geofencing Manager and ISO chrone return an exception when the icTransportType (transport type) parameter is defined.

**Routing:**
- Bug fix #1672: No polyline index in route sheet instructions come from version 2.x.x.
- Added support road segments list of isochrone calculation.

**Traffic:**
- Added support of polyline option base on the SVS form used by highlighter.
- Added support of TomTom traffic info.
- Added support of OpenLR.
- Added new output format (BNDJSON10) for BeNomad embedded application.
- Added support of average speed in outputs.
- Added support of average speed weighting in routing calculation.
- Added support of textual comments in multi-languages support.
- Added new OPENLR value in traffic option.
- Added traffic element research by country code, element id, and direction.
- Remove unused synchronization feature.
- Code re-factoring of traffic info scheduler and XML converter to improve the merging of different data sources for a same country code.
- Configuration re-factoring of traffic info to split the traffic data and update process into different threads.

**Protocol WMS:**
- Added class code (id) for each feature element.
- Added support of traffic with GetFeatureInfo.

**Demo pages:**
- Update OpenLayers demo interface to display on get feature request only activated layers attributes, like traffic info or truck attributes.

**Core:**
- Added ACL geoservers constrains.
- Update stored procedure for ACL Audit Logger.

**Back-Office:**
- Update user form and list to support geoserver constrains information.



## 2015-09-11 2.4.0 (32926.32924.32924) ![Build passed](images/badge-build-released.svg)

**Geocoding:**
- Added support of search type, like fuzzy, contains, word beginning, etc.

**Reverse-Geocoding:**
- Added new DualCarriageway field. A flag that indicates if road is part of a dual carriageway (e.g. with physical separation between opposite traffic sides).

**Routing:**
- Added new options `ISOCHRONE_FORWARD` and `ISOCHRONE_BACKWARD`.

**Server Info:**
- Bug fix: Coverage bounding box, wrong minimal values.
- Added Copyright URL, supplier terms and supplier terms URL.
- Added statistics counters of coverage SVS files.
- Sort coverage list by alphabetic order.

**Traffic:**
- Force Alert-C code value to 437 when jam percent is 100%.
- Added support of more traffic level for Alert-C code.



## 2015-08-03 2.3.0 (32718.32717.32717) ![Build passed](images/badge-build-released.svg)

**Routing:**
- Added information about the start and stop coordinates found by the routing calculation.
- Return an VehicleProfileIsRequireException if the RoutingVehicleProfile is set to null, (prevent from SOAP and JSON-RPC).

**Trace route:**
- Added information about the start and stop coordinates found by the routing calculation.
- Return an VehicleProfileIsRequireException if the RoutingVehicleProfile is set to null, (prevent from SOAP and JSON-RPC).

**Rebuild route:**
- Added information about the start and stop coordinates found by the routing calculation.
- Return an VehicleProfileIsRequireException if the RoutingVehicleProfile is set to null, (prevent from SOAP and JSON-RPC).



## 2015-06-30 2.2.1 (32490.32550.32550) ![Build passed](images/badge-build-released.svg)

**Core:**
- Bug fix #1630: BuildPolyline with inSingleForm set to true returns an invalid CBForm.



## 2015-06-25 2.2.0 (32490.32288.32288) ![Build passed](images/badge-build-released.svg)

**Reverse-Geocoding:**
- Added support of road levels hierarchy and types.
- Added built up area information.
- Added support of matching direction (matchdir field) of road feature element.

**Batch Reverse-Geocoding:**
- Added support of road levels hierarchy and types.
- Added built up area information.
- Added support of matching direction (matchdir field) of road feature element.

**LandFeature:**
- Optimization of object research (`OTHER_SEARCH` option) when the radius is set to 0.

**Trace route:**
- Change the default transport type to `EMERGENCY`.

**Traffic info:**
- Bugfix: Improve network stability.
- Bugfix: Some icons never disappear on map with HERE MLIncident XML flux.
- Bugfix: Change the "Jam section style" values of bean "traffic.objectIdHighlighterBean" to prevent from hole between two style.
- Added support for the new version 3.1.2 of HERE MLRealtimer XML flux.
- Added server configuration filter on low jam factor element, define a minimal value of jam factory, under this value the element will be ignored.
- Added new parameter "minJamFactor" of traffic HTTP Rest API to define a minimal value of jam factory, under this value the element will be ignored.

**Layers Info:**
- Added country names for coverage list.

**Geofencing:**
- Added new Geo-fencing service ("geofencing") to check list of positions and list of fences.

**Protocol BND:**
- Mapping:
  - Bugfix: Layers parameter is not used.
  - Added new fields to get an picture from center coordinate and radius.
  - Added new fields to get an picture from X, Y, and Z tile coordinate.

**Tools:**
- POI converter:
  - Bugfix: Cluster data replication issue, cause un-accessibility to the tool.

**Core:**
- Remove support of JSR94 and JDrools for mapping cache "validators". 
- Update JSIV to 3.11.0.



## 2015-03-25 2.1.1 (31693.31697.31697) ![Build passed](images/badge-build-released.svg)

**Core:**
- SDK C/C++ Patched



## 2015-03-24 2.1.0 (31693.31677.31677) ![Build passed](images/badge-build-released.svg)

**Reverse-Geocoding:**
- Added support of extended postal codes. The research of extended postal codes was only enable for country with the right class id in map data.
- Added new field, distance from the request coordinate.

**Batch Reverse-Geocoding:**
- Added support of extended postal codes. The research of extended postal codes was only enable for country with the right class id in map data.
- Added new field, distance from the request coordinate.

**LandFeature:**
- Bugfix: Attributes output of Json format.
- Disable SVS output format.
- Added new field "codeValue" to return the numeric code value of an attribute.

**Routing:**
- Added corridor polygon in results with the corridorRadius parameter.
- Added road segments in results with `ROAD_SEGMENTS` option.
- Added new field, distance from the request coordinate.
- Added GPX file format to output of route calculation.
- Added road administrative level and type in data field of detailed polyline.
- Added fence intersection test between route and fence shape.

**Trace route:**
- Added corridor polygon in results with the corridorRadius parameter.
- Added road segments in results with `ROAD_SEGMENTS` option.
- Added new field, distance from the request coordinate.
- Added GPX file format to output of route calculation.
- Added road administrative level and type in data field of detailed polyline.
- Added possibility to avoid used destinations output.
- Added fence intersection test between route and fence shape.

**Rebuild route:**
- Added corridor polygon in results with the corridorRadius parameter.
- Added road segments in results with `ROAD_SEGMENTS` option.
- Added new field, distance from the request coordinate.
- Added GPX file format to output of route calculation.
- Added road administrative level and type in data field of detailed polyline.
- Added fence intersection test between route and fence shape.

**Traffic info:**
- Added new key "bgis.traffic.enable" in "configuration.properties" file to enable or disable the traffic info part.
- Core: For the link id high-lighter, use the reverse direction when the angle is not set.

**Protocol BND:**
- Added support of JSONP format.

**Protocol WMS:**
- Bugfix: Invalid character encoding for some value of "gml:name" XML tag.



## 2015-02-20 2.0.1 (31158.31150.31091) ![Build passed](images/badge-build-released.svg)

**Traffic info:**
- Bugfix #1552: Wrong value of jam percent factor in traffic element.



## 2015-01-29 2.0.0 (31158.31150.31091) ![Build passed](images/badge-build-released.svg)

**Mapping:**
- Bugfix #1456: The accepted value of BGCOLOR parameter does't respect the standard WMS 1.1.1 or 1.3.0. Now the it's OK. Examples of possible values: FEFFFF, 0xFEFFFF, 0XFEFFFF, #FEFFFF, #0xFEFFFF, #0XFEFFFF.
- Added MappingSwitchService to select the mapping renderer by the layers name.

**Reverse-Geocoding:**
- Disable the test of longitude and latitude with zero values. The native SDK will not returns any exception when the longitude and latitude are set to zero.
- Added limitation of maximum radius value.
- New algorithm for radius increment step-by-step when no item are found.
- Change the behavior of maxResult parameter: If not defined the parameter maxResult is equals to 1. If maxResult is inferior to 1 no limits will be used.

**Batch Reverse-Geocoding:**
- Disable the test of longitude and latitude with zero values. The native SDK will not returns any exception when the longitude and latitude are set to zero.
- Added limitation of maximum radius value.
- New algorithm for radius increment step-by-step when no item are found.
- Change the behavior of maxResult parameter: If not defined the parameter maxResult is equals to 1. If maxResult is inferior to 1 no limits will be used.

**LandFeature:**
- Bugfix: By default the all class superior to 1852 is used.
- Bugfix: Add CDATA to gml:name tag XML of BND protocol.
- Ignore the non-numeric layers names for filter of SVS classes used by the Land Feature service.

**Routing:**
- Bugfix: taxSectionIdx data. Resolve the issue when the first index and last index are the same.
- Bugfix #0001263: In mode 1 to N, N to 1, N to N: Catch the exceptions for inclusion in the list of results.
- Disable the test of longitude and latitude with zero values. The native SDK will not returns any exception when the longitude and latitude are set to zero.
- Update limitation of maximum radius value.
- Added support of ignore restrictions, u-turn, etc for routing destination (Waypoint).
- Added support of ADR tunnel categories.
- Added new field exceptionMessage for each RoutingRoute object.
- Added Vehicle's number of trailers field in Vehicle profile.
- Added index of polyline point for each used destinations. Option `POLYLINE_INDEX`.
- Added duplicates filter for detailed polyline points.
- Added custom data field in destination and used destination.
- Added polyline index for each routing instructions.
- Added `REVGEO_STRICT_DISABLE` option to change the behavior when a coordinate (via) does't can be found for modes: 1 to n, n to 1, and n to n. The exception `ViaNotMatchException` is replace by the `exceptionMessage` field of the UsedDestinations.
- Added support of way-points used by the embedded devices.
- Added support of way-points polyline used by the embedded devices.

**Trace route:**
- Added support of ADR tunnel categories.
- Added Vehicle's number of trailers field in Vehicle profile.
- Added support of GPS time stamp in coordinates.
- Added support of GPX file format (waypoint and track tags).
- Added support of CSV file format with custom data and time format.
- Added duplicates filter for detailed polyline points.
- Added custom data field in destination and used destination. Option `POLYLINE_INDEX`.
- Added polyline index for each routing instructions.
- Added support of way-points used by the embedded devices.
- Added support of way-points polyline used by the embedded devices.
- Added support of off-roads segments.

**Rebuild route:**
- Added support of ADR tunnel categories.
- Added polyline index for each routing instructions.
- Added support of way-points used by the embedded devices.
- Added support of way-points polyline used by the embedded devices.

**Traffic info:**
- Skip a update process if the country coverage is not found in the source data-set.

**GeoServerInfo (new service for soap-rpc and json-rpc):**
- Added list of service limit.

**Protocol BND:**
- Routing:
  - Added new field countryCode in tax section.
  - Added Vehicle's number of trailers in vf parameter.
- Trace route:
  - Added Vehicle's number of trailers in vf parameter.
- Traffic Info:
  - Bugfix #1302: Fix the AlertC code value return in the BeNomad binary file format (binac10).
  - Added Alertc fields (code, country code, location, etc) in the XML and JSON outputs formats.

**Demo pages:**
- Routing:
  - Sort the vias (icons and list) when the optimized trip is enable. 
- Trace route:
  - Added CSV file format support.

**Core:**
- Bug fix: When an image cannot be rendered an image with error message will be generated with the right output file format.
- Bug fix: Dead lock on traffic info and other services.
- Prevent from dead lock when Traffic info service is enable and massive request are called at same time.
- Update configuration model.
- Update all java libraries.
- Update JVM to 1.7.x.
- Update Tomcat to 7.x.
- Update JSIV to 3.10.0.
- Added Hits counter average by hours and storage to the database or log file.
- Added Auto login feature.



## 2014-06-06 1.7.1

**Protocol BND:**
- Traffic Info:
  - Bugfix #1302: Fix the AlertC code value return in the BeNomad binary file format (binac10).

**Core:**
- Added Auto login feature.



## 2014-03-19 1.7.0.28130.27818

**Mapping:**
- Update the default graphical chart.
- Added Here (HLP/NLP) mapping proxy. 

**Reverse-Geocoding:**
- Added support of satellites number for gps coordinates.

**Batch Reverse-Geocoding:**
- Added support of satellites number for gps coordinates.

**Routing:**
- Mark as deprecated the euroEmiClass field. This field is replaced by a value of "vf" parameter (RoutingVehicleFeature).
- The `ECO_TAX` option calculate the eco-tax only for French country.
- Added support of Tax cost.
- Added support of satellites number for gps coordinates.

**Trace route:**
- Mark as deprecated the euroEmiClass field. This field is replaced by a value of "vf" parameter (RoutingVehicleFeature).
- The `ECO_TAX` option calculate the eco-tax only for French country.
- Added support of Tax cost.
- Added support of satellites number for gps coordinates.

**Rebuild route:**
- Mark as deprecated the euroEmiClass field. This field is replaced by a value of "vf" parameter (RoutingVehicleFeature).
- The `ECO_TAX` option calculate the eco-tax only for French country.
- Added support of Tax cost.
- Added support of satellites number for gps coordinates.

**LandFeature:**
- Added support of satellites number for gps coordinates.

**Protocol BND:**
- Mapping:
  - Added support of layers field.

**Protocol WMS:**
- Mapping:
  - Added support of layers field.

**Web service SOAP-RPC/JSON-RPC:**
- Added new WsAclSessionMgr WSDL for session management.
- Geocoding:
  - Rename OutputLanguage to Language
- Routing:
  - Replace the int field "euroEmissionClass" of "RoutingVehicleProfile" class by an enum "emissionClass" of "RoutingVehicleFeature" class.

**Core:**
- Added limitation of concurrent sessions for a same login.
- Added session manager and expose over JMX.



## 2014-01-29 1.6.0.27698

**Mapping:**
- Added new mapping cache grid with big off-screen to draw and split into small tiles.
- Added compatibility with ZXY cache.
- Added new "transparency" tag for Simple Rules Validator (sample: mappingCacheSimpleRules.xml).
- Enable the "gbcolor" parameters in BNG and WMS protocols.
- Bug fix: Coordinates inversion in `EX_GeographicBoundingBox` of WMS 1.1.1 and 1.3.0 protocols.
- Bug fix: Issue #1016: GIF format with transparency color.
- Bug fix: Wrong error message when the Crs/Srs are not found.
- Bug fix: Add SRS and CRS tags in Layrs part of getCapabilities service for the protocols WMS 1.1.1 and WMS 1.3.0. 
- Bug fix #1128: fix the inversion of westBoundLongitude, eastBoundLongitude value of `EX_GeographicBoundingBox` tag. Add SRS and CRS tag for each layers in WMS 1.1.1 and 1.3.0 protocols.

**Geocoding:**
- Added new geocoding research algorithm.
- Added Extent bounding box in outputs.
- Added for each fields of address, a trim filter and set to null if the string is empty.

**Reverse-Geocoding:**
- Added country code in XML output in postalAddress field area.
- Added Extent bounding box in outputs.
- Added support for multi conditional speed limit.
- Added in outputs the segment id of polyline.
- Bug fix: In web service, replace all byte type by short in road feature element.
- Bug fix: Outputs of conditional speed limit fields.
- Replace all double type by float for all speed value.
- Replace the native numeric value with a string containing the name of the enum or number for the conditional speed limit.
- Rename DirictionFlow to DirectionFlow in road feature section.
- Word fixing for options in reverse geocoding documentation.
- Replace ConditionalMaxSpeed1 and ConditionalMaxSpeed2 by the new array ConditionalMaxSpeeds in XML and JSON outputs.

**Batch Reverse-Geocoding:**
- Added Extent bounding box in outputs.
- Bug fix: Wrong construction of the table containing the "Elements" tags. Add a new tag called "BatchResults" to encapsulate all "Elements" sub-tags.

**Routing:**
- Added urbanArea value in data field.
- Added routing calculation mode: vias (default), 1 to n, n to 1 and n to n (matrix).
- Added road block feature.
- Added xyRadius parameter.
- Added the country code value in data of detailed polyline.
- Added GeoJson output format.
- Added in outputs the segment ids list.
- Added `OPTIMIZED_TRIP_ROUND` options.

**Trace route:**
- Added urbanArea value in data field.
- Added road block feature.
- Added the country code value in data of detailed polyline.
- Added GeoJson output format.
- Added in outputs the segment ids list.

**Rebuild route:**
- Added support of segment ids (Link ID), can rebuild a route with a list of ids.
- Added urbanArea value in data field.
- Added GeoJson output format.

**LandFeature:**
- Added country code in XML output in postalAddress field area.
- Continue the research of address reverse geocoding on each styles if no address are found.

**Layers Info:**
- Added list of coverage with country code and bonding box for each entry.

**Demo pages:**
- Bug fix: Wrong time of route. Fix the around bug in the timeFormat part of XSLT files (fr and en).
- Update javascript API to support Microsoft IE 10 for Windows 7.
- Upgrade OpenLayers client.
- Added Leaflet client.

**Protocol BND:**
- Remove double quote for all numeric value in all JSON outputs.

**Protocol WMS:**
- Added a waring if REQUEST is forget.

**Core:**
- Bug fix: Fix correlation for type VT (`VEHICLE_TYPE`) of conditional speed limit.
- Use default protocol version (1.1.1) for WMS if the "version" parameter is not set.
- Rename DirictionFlow to DirectionFlow in class model.
- Added possibility to change the filename of template for the WMS GetCapabilities service protocols. 
- Added more precision on speed values when the unity is imperial system.
- Added file (backend-geocore.cfg.xml) with list of country uses imperial system for speed limit.
- Added right `ROLE_TRACEROUTE`.
- Added support for HTTP POST with multi-part mime type.
- Core SDK:
  - Update JSIV library to 3.7.0 (see changelog-jsiv.html).
  - Added change log of Java SDK (JSIV) changelog-jsiv.html.



## 2013-01-28 1.5.0

**Trace route (New service):**
- Performs a road-matching and routing process for a specified type of vehicle.
- Road-matching consists in correcting uncertainties related to GPS measurements by repositioning a vehicle on the most accurate segment of neighboring roads. 
- This service assumes that an input position corresponds to a chronological sequence of positions of a given vehicle driving on the road network.

**Reverse-Geocoding:**
- Added support of Road feature (Network data).
- Added support of right side of road when the left side is empty in particular case.

**Routing:**
- Added eco-tax support.
- Added detailed polyline element in response XML, JSON, and WebService.
- Added preferred road feature (pf parameter).
- Added CARPOOL criteria.
- Bug fix: support the empty string value for language parameter.
- Turn the option avoid U Turns to true for plan route with multi-vias.
- Prevent from memory leak.

**Traffic info:**
- Bug fix: When the TMC code are not found in the reference table.
- Bug fix: JSON output.

**Tools:**
- POI converter:
  - Added support of GPX file format (only waypoint tags).
  - Remove the `KB_ATT_ANY_LANG` attribute for a name of POI.
  - Word fixing.

**Demo pages:**
- Move javascript part of SampleCltApi into a separate file (.js).

**Core:**
- Added JSON-RPC support.
- Added BeMap (bgis) Java API.
- Fix problem with HTTP POST method request and add compliance with Post URL encoding.
- Core SDK:
  - Update JSIV library to 3.6.0.
  - Added logs.
  - Added change log of Java SDK (JSIV) changelog-jsiv.html.



## 2012-07-17 1.4.0

**Licensing:**
- Added licensing support for Microsoft Windows platform.

**Mapping:**
- Cache Level 2 is now compliance with Mercator projection.

**Geocoding:**
- Bug fix: invalid longitude in polyline result of reverse geocoding (revgeocoding).

**Traffic info:**
- Compliance with TMC id or segment id (LinkId).
- Update Navteq parser.

**Core SDK:**
- Update Core SDK Java to 3.5.0.
- Update Core SDK C/C++ to 5.8.x.
- Added support of SVS format v10.
- Added licensing support on Windows platforms (see new LicenseMgr class).
- Fixed core SDK issue #704: Pattern matching issue with Russian 'IO' character (0x0401).
- Fixed core SDK issue #534: Arrows drawn at end of a segment are displayed with a random direction.
- Fixed core SDK issue #593: Wrong name displayed on map.
- Fixed core SDK issue #707: Labelling issue with texts that contain a comma.
- The polygons are now antialiased.
- Improved rendering of half-width polylines.
- Added support of the !& operator (ie bitwise NAND operator) for signed and unsigned attribute conditions (ie "1234 !& H0F").
- Fixed core SDK issue #587: Multi-threading issue in Planner class (Planning routes from different threads could lead to a crash).
- Fixed core SDK issue #582: In very rare cases the RouteSheet.build may return false.
- Fixed core SDK issue #601: avoidUTurns argument of Planner.planRoute with waypoints is not welled handled.
- Fixed core SDK issue #616: The "toSI" field of a route instruction is sometimes invalid.
- Fixed core SDK issue #615: Chained restrictions are sometimes ignored (Route may go through a chained restriction).
- Fixed core SDK issue #635: Routing makes a useless detour (When start point and stop point are on two connected road elements with a gate in the middle and there is
- Fixed core SDK issue #653: Routes takes useless detours (On some short distance routes, planner computes a route with a useless detour).
- Fixed core SDK issue #671: Possible stack overflow exception in RoadNetwork.build method.
- Fixed core SDK issue #681: Planner.PlanRoute method fails (`NO_PATH` error) from Helsinki (Finland) to Edinburgh (Scotland) on Navteq 2011.3 maps.
- Fixed core SDK issue #682: Planner class ignores argument useStartAngle when start and stop points are on same road element.
- Fixed core SDK issue #705: Short paths (when start and stop point are near) are sometimes not optimal or sometimes not found (`NO_PATH` error).
- Added support of Traffic Patterns/speed Profiles (see new setDepartureTime method).
- Made some improvements in route sheet by adding instructions when vehicle is on secondary roads.



## 2011-11-30 1.3.2
- Fix scoring for alert-c correlation code.
- Add Geocoding File Analyser tool.
- Add Geo-fencing Services (GeofencingChk and GeofencingMgr).
- Traffic info (beta): support of two lanes on a road for high-lighter, but some bug still exists on the small segments.
- Traffic info (beta): fix update process of high-lighter part.
- Traffic info (beta): Adjustment of jam percent values.
- Traffic info (beta): Re-factor the interface of TrafficStore.
- Traffic info (beta): Replace warn log level by debug for `LANE_TYPE` and `TRAVEL_TIME` tags in Navteq parser.
- Add JUnit Test.
- Geo-coding: Unlock research for county when the state is empty.
- Add input text case of county research for geo-coding process in sample client page.
- Update `proxy_apj` sample with: New time out for long time execution and Load balancing sample.
- Update CSS and pictures for front-end progress bar.
- Update translations and wording fix.



## 2011-10-17 1.3.1
- Update documentation.
- Update WMS/GetFeatureInfo 1.1.1 / 1.3.0 and BND/Feature.
- Replace InvalidCrsException by the new exception InvalidSrsException for the protocol WMS version 1.1.1.
- Update JSIV library to 3.5.0.
- Replace used constant (Planner) by the "enum" Planner.RouteCriteria.
- Update the sample of BND/Feature.
- Add bgis.tools.scheduler.dynPoiUpdateTask.delay in configuration.properties.
- Add SVS output format for Land Feature request.
- Re-factor the selection of geoOuputFormat.
- Add dynamic POI Navteq Fuel Station XML flux parser.
- Add dynamic POI container.
- Re-factor the build of attribute string.
- Add Traffic binary file format BINAC10.
- Add PoiMaker.
- Add JUnit Test for PoiMaker.
- Add Front-end for PoiMaker: Upload CSV, XLS and convert to SVS.



## 2011-07-15 1.3.0
- Replace OpenLayers 2.8 per OpenLayers 2.11RC1.
- Add OpenScales 1.2.1 sample.
- Add compatibility with web browser cache.
- Add Multi-output format support for the same protocol/service.
- Add JSON output.
- Add Custom Service support into the BND protocol.
- Add Custom Service support into the Web Service.
- Add Traffic Info Service, available for BND Protocol and Web Service (beta).
- Add Traffic Info container and scheduler for Navteq, Bnd and v-Trafic (beta).
- Add v-trafic protocol output (beta).
- Add TmcId / ObjectId cache.
- Add Junit Test for Traffic Info system.
A- Add Junit Test for GeoCoding with Csv file support.
- Update Junit Test.
- Bug fixing:- Memory leak in JSIV 3.3.0 replaced by JSIV 3.4.0.



## 2010-05-25 1.2.1final
- Bug fixing:- Memory leak in JSIV 3.2.0 replaced by JSIV 3.3.0.
- Add in the configuration file the SVS Cache boolean switch for use VM or Resident RAM.  



## 2010-05-05 1.2.0final
- Pooling for GeoCoding, reverse GeoCoding, and routing.



## 2010-03-18 1.2.0beta2
- Connector for Navteq TraficML.
- Bug fixing.



## 2010-03-10 1.2.0beta1
- Compliance with Wms-C.
- Add rule engine for Mapping Cache Level2 with Simple Rule Validator, JSR94, and Drools.
- Mapping Cache Level2 Pre-build Tool.
- Add Rebuild Route service.
- Add of Authentication/Roles and Back Office Interface for Service access control.
- Reorganization of configuration files.
- Reorganization of Html page with Spring Mvc.
- Upgrade Samples Html pages.
- Replace Spring 2.5.x per Spring 3.0.0.
- Replace OpenLayers 2.7 per OpenLayers 2.8.
- Add Hibernate 3.3.2.
- Bug fixing.



## 2009-12-16 1.1.1final
- Upgrade Natural GeoCoding.
- Upgrade Mapping Cache Level2.
- Bug fixing.



## 2009-11-24 1.1.0final
- Upgrade Samples Html pages.
- Bug fixing.



## 2009-11-05 1.1.0beta
- Add services: Natural GeoCoding, Layers Info, Land feature.
- Add Mapping Cache Level2.



## 2009-09-17 1.0.0final
- First final releases.
- Add Routing service.
- Bug fixing.



## 2009-07-29 1.0.0beta
- First beta releases.
- Protocols: Bnd, Wms, Gns, Web Service.
- Services:  Mapping, GeoCoding, Reverse GeoCoding.

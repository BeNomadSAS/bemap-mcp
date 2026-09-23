# REST API, Service version 1.0.0


## Geoserverinfo service
Expose the information, limitations and statistics of map data about the Geo-server(s).

### Summary
1. Request
 1. Mandatory parameters
 2. Optional parameters
2. Response
 1. Details of fields
 2. Response samples


### Request
The request must be sent with the HTTP method `POST` and the HTTP header `Content-Type` set to `application/json`. 

Sample:
URI: `/bgis/service/1.0/geoserverinfo`

POST data:
```
{"bemap":{"language":"javascript"}}
{
  "geoserver": "default",
  "language": "fr",
  "options": [
    "COUNTRY_NAME"
  ]
}
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Parameters__

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geoServerInfo.GeoServerInfoRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geoServerInfo.GeoServerInfoRequest"}}
```


### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geoServerInfo.GeoServerInfoResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geoServerInfo.GeoServerInfoResponse"}}
```


#### Response samples
JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
    "availableGeoServerNames": [
        "here",
        "herehlp",
        "nominatim",
        "addok",
        "photon"
    ],
    "globalCopyright": "Here Maps 2026.1",
    "globalCopyrightUrl": "https://company.here.com/here/",
    "globalSupplierTerms": "Supplier Terms Applicable to Location Content",
    "globalSupplierTermsUrl": "http://corporate.navteq.com/supplier_terms.html",
    "transportTypes": [
        "PEDESTRIAN",
        "BICYCLE",
        "MOTORCYCLE",
        "CAR",
        "TAXI",
        "PUBLIC_BUS",
        "EMERGENCY",
        "DELIVERY_TRUCK",
        "TRUCK"
    ],
    "truckAttributes": true,
    "servicesInfo": [
        {
            "fieldName": "isAliveService",
            "serviceName": "IsAlive",
            "title": "Is alive",
            "description": "Allow to test the server health"
        },
        {
            "fieldName": "geoServerInfoService",
            "serviceName": "GeoServerInfo",
            "title": "GeoServerInfo",
            "description": "Allow to get the information about the selected geoserver, like copyright of map data, limits, etc."
        },
        {
            "fieldName": "customService",
            "serviceName": "Custom",
            "title": "Custom",
            "description": "Allow access to custom service (only for demonstration)"
        },
        {
            "fieldName": "mappingService",
            "serviceName": "Mapping",
            "title": "Mapping",
            "description": "Allow to access the map rendering"
        },
        {
            "fieldName": "geocodingService",
            "serviceName": "Geocoding",
            "title": "Geocoding",
            "description": "Allow to convert a formatted postal address to geographic coordinates"
        },
        {
            "fieldName": "geocodingBatchService",
            "serviceName": "GeocodingBatch",
            "title": "Geocoding batch",
            "description": "Allow to convert a list of formatted postal addresses to geographic coordinates"
        },
        {
            "fieldName": "autocompleteGeocodingService",
            "serviceName": "AutocompleteGeocoding",
            "title": "Autocomplete",
            "description": "Allow access to the autocomplete service"
        },
        {
            "fieldName": "geocodingNaturalService",
            "serviceName": "GeocodingNatural",
            "title": "Geocoding natural",
            "description": "Enter a free-text postal address to receive a suggested address and its corresponding geographic coordinates."
        },
        {
            "fieldName": "reverseGeocodingService",
            "serviceName": "ReverseGeocoding",
            "title": "Reverse geocoding",
            "description": "Convert geographic coordinates into a formatted postal address"
        },
        {
            "fieldName": "revGeoBatchService",
            "serviceName": "RevGeoBatch",
            "title": "Reverse geocoding batch",
            "description": "Convert a list of geographic coordinates into formatted postal addresses."
        },
        {
            "fieldName": "roadsExtractorService",
            "serviceName": "RoadsExtractor",
            "title": "Roads extractor",
            "description": "Performs a Road-Matching (or Map-Matching) process for a specified type of vehicle within a specified polygon."
        },
        {
            "fieldName": "geofencingChkService",
            "serviceName": "GeofencingChk",
            "title": "DEPRECATED Geofencing checker",
            "description": "Deprecated replaced by Geofencing"
        },
        {
            "fieldName": "geofencingMgrService",
            "serviceName": "GeofencingMgr",
            "title": "DEPRECATED Geofencing manager",
            "description": "Deprecated replaced by Geofencing"
        },
        {
            "fieldName": "geofencingService",
            "serviceName": "Geofencing",
            "title": "Geofencing",
            "description": "Define a geometric shape and compare it with another shape to determine their intersection points."
        },
        {
            "fieldName": "landFeatureService",
            "serviceName": "LandFeature",
            "title": "Land feature",
            "description": "Allow to get any information from the map data like postal address, shape of area, etc."
        },
        {
            "fieldName": "layersInfoService",
            "serviceName": "LayersInfo",
            "title": "layers info",
            "description": "Allow to get information about the layer."
        },
        {
            "fieldName": "routingService",
            "serviceName": "Routing",
            "title": "Routing",
            "description": "Allow to perform routing computation"
        },
        {
            "fieldName": "traceRouteService",
            "serviceName": "TraceRoute",
            "title": "Traceroute",
            "description": "Allows mapping a list of GPS coordinates to map data."
        },
        {
            "fieldName": "routeHorizonService",
            "serviceName": "RouteHorizon",
            "title": "Route horizon",
            "description": "Obtain information about what lies ahead of the vehicle."
        },
        {
            "fieldName": "trafficService",
            "serviceName": "Traffic",
            "title": "Traffic",
            "description": "Retrieve traffic information for a specific country or based on geographic coordinates"
        },
        {
            "fieldName": "chargingStationService",
            "serviceName": "ChargingStationSearch",
            "title": "Charging station search",
            "description": "Allow to get the charging station information"
        },
        {
            "fieldName": "chargingTimeService",
            "serviceName": "ChargingStationSearch",
            "title": "ChargingTime",
            "description": "charging time calculation service."
        },
        {
            "fieldName": "chargingCostService",
            "serviceName": "ChargingCost",
            "title": "Charging cost",
            "description": "Allow to compute the charge cost of charging station"
        },
        {
            "fieldName": "evReachableAreaService",
            "serviceName": "EvReachableArea",
            "title": "EV reachable area",
            "description": "Allow to compute the reachable area for a electric vehicle"
        },
        {
            "fieldName": "evSmartRoutingService",
            "serviceName": "EvSmartRouting",
            "title": "EV smart routing",
            "description": "Allow to compute a trip for a electric vehicle"
        },
        {
            "fieldName": "weatherService",
            "serviceName": "Weather",
            "title": "Weather",
            "description": "Allow to get weather information"
        },
        {
            "fieldName": "nearPoiService",
            "serviceName": "NearPoi",
            "title": "Near POI",
            "description": "Allow to compute routes between the starting point and POI(s)."
        },
        {
            "fieldName": "openLrParserService",
            "serviceName": "Routing",
            "title": "OpenLrParser",
            "description": "Open LR convertor."
        }
    ],
    "serviceLimits": [
        {
            "serviceName": "BenomadGeocodingPlaceService",
            "key": "MaximumBBoxSideForCity",
            "argument": "MAX",
            "type": "INT",
            "value": "200000",
            "unit": "METER"
        },
        {
            "serviceName": "BenomadGeocodingPlaceService",
            "key": "MaximumBBoxSideForCountry",
            "argument": "MAX",
            "type": "INT",
            "value": "1150000",
            "unit": "METER"
        },
        {
            "serviceName": "BenomadGeocodingPlaceBatchService",
            "key": "LimitMaxAddress",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "NA"
        },
        {
            "serviceName": "BenomadReverseGeocodingService",
            "key": "LimitRadius",
            "argument": "MAX",
            "type": "INT",
            "value": "250000",
            "unit": "METER"
        },
        {
            "serviceName": "BenomadRevGeoBatchService",
            "key": "LimitMaxCoordinate",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "NA"
        },
        {
            "serviceName": "BenomadRevGeoBatchService",
            "key": "LimitRadius",
            "argument": "MAX",
            "type": "INT",
            "value": "250000",
            "unit": "METER"
        },
        {
            "serviceName": "BenomadRoadsExtractorService",
            "key": "MaxAllowedAreaM2",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "SQUARE_METER"
        },
        {
            "serviceName": "BenomadGeofencingService",
            "key": "LimitMaxCoordinate",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "NA"
        },
        {
            "serviceName": "BenomadGeofencingService",
            "key": "LimitMaxFence",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "NA"
        },
        {
            "serviceName": "BenomadLandFeatureService",
            "key": "SvsRadiusLimit",
            "argument": "MAX",
            "type": "LONG",
            "value": "10000",
            "unit": "METER"
        },
        {
            "serviceName": "BenomadRoutingService",
            "key": "LimitMaxRadius",
            "argument": "MAX",
            "type": "INT",
            "value": "10000",
            "unit": "METER"
        },
        {
            "serviceName": "BenomadRoutingService",
            "key": "LimitMaxFence",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "NA"
        },
        {
            "serviceName": "BenomadRoutingService",
            "key": "LimitModeViaMaxVia",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "NA"
        },
        {
            "serviceName": "BenomadRoutingService",
            "key": "LimitModeMatrixMaxVia",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "NA"
        },
        {
            "serviceName": "BenomadRoutingService",
            "key": "LimitMode1ToNMaxVia",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "NA"
        },
        {
            "serviceName": "BenomadRoutingService",
            "key": "LimitModeNTo1MaxVia",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "NA"
        },
        {
            "serviceName": "BenomadRoutingService",
            "key": "LimitMinRadius",
            "argument": "MIN",
            "type": "INT",
            "value": "1",
            "unit": "METER"
        },
        {
            "serviceName": "BenomadRoutingService",
            "key": "LimitModeNToNMaxVia",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "NA"
        },
        {
            "serviceName": "BenomadRoutingService",
            "key": "LimitMaxIsochroneMeters",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "METER"
        },
        {
            "serviceName": "BenomadRoutingService",
            "key": "LimitMaxIsochroneSeconds",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "SECOND"
        },
        {
            "serviceName": "BenomadRoutingService",
            "key": "LimitModeIsoChroneMaxVia",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "NA"
        },
        {
            "serviceName": "BenomadTraceRouteService",
            "key": "LimitMaxCoordinate",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "NA"
        },
        {
            "serviceName": "BenomadTraceRouteService",
            "key": "LimitMaxFence",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "NA"
        },
        {
            "serviceName": "BenomadRouteHorizonService",
            "key": "LimitMaxCoordinate",
            "argument": "MAX",
            "type": "INT",
            "value": "50",
            "unit": "NA"
        },
        {
            "serviceName": "BenomadNearPoiService",
            "key": "MaxDistance",
            "argument": "MAX",
            "type": "LONG",
            "value": "1000",
            "unit": "NA"
        }
    ]
}
```
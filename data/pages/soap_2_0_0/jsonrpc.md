# JSON-RPC

BeMap can provider also a JSON-RPC feature. The end point is directly connected to the core of BeMap data model. Currently, this protocol does't have any versioning.

See the [authentication page](index.html#page-authentication.md) for the login, password process.

End point URL is `/bgis/wsjson/geoServerMgr.json`.

The requests and responses are in JSON-RPC format and HTTP POST method.

## Example

An example of JSON-RPC request to obtain the geo-server information:
```
{"bemap":{"language":"javascript"}}
{
	"jsonrpc": "2.0",
	"id": 0,
	"method": "geoServerInfoExecute",
	"params": [{
			"geoServerName": "default"
		}
	]
}
```

Response:
```
{"bemap":{"language":"javascript"}}
{
   "jsonrpc": "2.0",
   "id": 0,
   "result":    {
      "availableGeoServerNames":       [
         "gireve",
         "benomad"
      ],
      "serviceLimits":       [
                  {
            "serviceName": "BenomadGeocodingPlaceService",
            "key": "MaximumBBoxSideForCity",
            "argument": "MAX",
            "type": "INT",
            "value": "29647",
            "unit": "METER"
         },
                  {
            "serviceName": "BenomadGeocodingPlaceService",
            "key": "MaximumBBoxSideForCountry",
            "argument": "MAX",
            "type": "INT",
            "value": "1139129",
            "unit": "METER"
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
            "key": "LimitModeViaMaxVia",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "NA"
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
            "key": "LimitModeNTo1MaxVia",
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
            "key": "LimitModeNToNMaxVia",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "NA"
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
            "serviceName": "BenomadRoutingService",
            "key": "LimitMinRadius",
            "argument": "MIN",
            "type": "INT",
            "value": "1",
            "unit": "METER"
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
            "key": "LimitMaxFence",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "NA"
         },
                  {
            "serviceName": "BenomadRebuildRouteService",
            "key": "LimitMaxCoordinate",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "NA"
         },
                  {
            "serviceName": "BenomadRebuildRouteService",
            "key": "LimitMaxSegmentId",
            "argument": "MAX",
            "type": "INT",
            "value": "0",
            "unit": "NA"
         },
                  {
            "serviceName": "BenomadRebuildRouteService",
            "key": "LimitRadius",
            "argument": "MAX",
            "type": "INT",
            "value": "1000",
            "unit": "METER"
         },
                  {
            "serviceName": "BenomadRebuildRouteService",
            "key": "LimitMaxFence",
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
         }
      ],
      "globalCopyright": "Here Maps 2017.4",
      "globalCopyrightUrl": "https://company.here.com/here/",
      "globalSupplierTerms": "Supplier Terms Applicable to Location Content",
      "globalSupplierTermsUrl": "http://corporate.navteq.com/supplier_terms.html",
      "transportTypes":       [
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
      "truckAttributes": true
   }
}

```
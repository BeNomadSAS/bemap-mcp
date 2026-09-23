# REST API, Service version 1.0.0


## OpenLR Parser service
Can parse and extract the route information from an OpenLR code.


### Summary
1. Request
 1. Parameters
2. Response
 1. Details of fields
 2. Response samples


### Request
The request must be sent with the HTTP method `POST` and the HTTP header `Content-Type` set to `application/json`.

Sample:
URI: `/bgis/service/openlrparser/1.0`

POST data:
```
{"bemap":{"language":"javascript"}}
{
	"format": "STANDARD",
	"openLrs": [ "CwGq3SK+nxv6Af+sABwbaiVD", "CwGrvyK+VRv6BP68AGsbagsR", "CwGsDiK+PRv6DvwGAUobahES" ]
}
```

#### __Parameters__

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.openLrParser.OpenLrParserRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.openLrParser.OpenLrParserRequest"}}
```

### Response
Return the list of POI around the input coordinate.

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.openLrParser.OpenLrParserResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.openLrParser.OpenLrParserResponse"}}
```


#### Response samples

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{"openLrRoutes": [
      {
      "length": 40,
      "duration": 30,
      "boundingBox":       {
         "minXLongitude": 2.34423,
         "minYLatitude": 48.85965,
         "maxXLongitude": 2.34471,
         "maxYLatitude": 48.85981
      },
      "polyline":       [
                  {
            "longitude": 2.34471,
            "latitude": 48.85965
         },
                  {
            "longitude": 2.34423,
            "latitude": 48.85981
         }
      ],
      "segmentIds": ["737177805"]
   },
      {
      "length": 238,
      "duration": 119,
      "boundingBox":       {
         "minXLongitude": 2.34665,
         "minYLatitude": 48.85807,
         "maxXLongitude": 2.34953,
         "maxYLatitude": 48.85902
      },
      "polyline":       [
                  {
            "longitude": 2.34953,
            "latitude": 48.85807
         },
                  {
            "longitude": 2.34943,
            "latitude": 48.8581
         },
                  {
            "longitude": 2.3491,
            "latitude": 48.85821
         },
                  {
            "longitude": 2.34847,
            "latitude": 48.85843
         },
                  {
            "longitude": 2.3482,
            "latitude": 48.85852
         },
                  {
            "longitude": 2.34756,
            "latitude": 48.85872
         },
                  {
            "longitude": 2.34716,
            "latitude": 48.85885
         },
                  {
            "longitude": 2.34668,
            "latitude": 48.85901
         },
                  {
            "longitude": 2.34665,
            "latitude": 48.85902
         }
      ],
      "segmentIds":       [
         "1212935368",
         "1212935369",
         "1212935971",
         "1212935972",
         "56244788",
         "1212798073",
         "1212798320",
         "1212798321"
      ]
   },
      {
      "length": 718,
      "duration": 363,
      "boundingBox":       {
         "minXLongitude": 2.3419,
         "minYLatitude": 48.85771,
         "maxXLongitude": 2.35067,
         "maxYLatitude": 48.86058
      },
      "polyline":       [
                  {
            "longitude": 2.35067,
            "latitude": 48.85771
         },
                  {
            "longitude": 2.35065,
            "latitude": 48.85772
         },
                  {
            "longitude": 2.3502,
            "latitude": 48.85787
         },
                  {
            "longitude": 2.35007,
            "latitude": 48.8579
         },
                  {
            "longitude": 2.3498,
            "latitude": 48.85798
         },
                  {
            "longitude": 2.34967,
            "latitude": 48.85802
         },
                  {
            "longitude": 2.34943,
            "latitude": 48.8581
         },
                  {
            "longitude": 2.3491,
            "latitude": 48.85821
         },
                  {
            "longitude": 2.34847,
            "latitude": 48.85843
         },
                  {
            "longitude": 2.3482,
            "latitude": 48.85852
         },
                  {
            "longitude": 2.34756,
            "latitude": 48.85872
         },
                  {
            "longitude": 2.34716,
            "latitude": 48.85885
         },
                  {
            "longitude": 2.34668,
            "latitude": 48.85901
         },
                  {
            "longitude": 2.34643,
            "latitude": 48.85909
         },
                  {
            "longitude": 2.34565,
            "latitude": 48.85935
         },
                  {
            "longitude": 2.3452,
            "latitude": 48.8595
         },
                  {
            "longitude": 2.34484,
            "latitude": 48.85961
         },
                  {
            "longitude": 2.34406,
            "latitude": 48.85987
         },
                  {
            "longitude": 2.344,
            "latitude": 48.85989
         },
                  {
            "longitude": 2.34341,
            "latitude": 48.86009
         },
                  {
            "longitude": 2.34232,
            "latitude": 48.86044
         },
                  {
            "longitude": 2.34221,
            "latitude": 48.86048
         },
                  {
            "longitude": 2.3419,
            "latitude": 48.86058
         }
      ],
      "segmentIds":       [
         "1212935228",
         "732237657",
         "732237198",
         "732237199",
         "732237197",
         "1212935368",
         "1212935369",
         "1212935971",
         "1212935972",
         "56244788",
         "1212798073",
         "1212798320",
         "1212798321",
         "56243516",
         "56243454",
         "56243425",
         "737177805",
         "737177806",
         "59121917",
         "56243296",
         "56243965",
         "763603973"
      ]
   }
]
}
```

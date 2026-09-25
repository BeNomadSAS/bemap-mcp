<span class="float-right shadow">![Fences on map](images/geofencing-bnd-fences_on_map.png =300x*)</span>

# REST API, Service version 1.0.0


## Geo-fencing service

A geo-fence is a virtual perimeter for a real-world geographic area. A geo-fence could be dynamically generated-as in a radius around a point location, or a geo-fence can be a predefined set of boundaries (such as school zones or neighborhood boundaries).

_For more details: [Wikipedia](https://en.wikipedia.org/wiki/Geo-fence)_

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
URI: `/bgis/service/geofencing/1.0`

POST data:
```
{"bemap":{"language":"javascript"}}
{
    "fenceShapes": [
        {
            "id": "1",
            "type": "CIRCLE",
            "center": {
                "lon": 7.42806,
                "lat": 43.75272
            },
            "radius": 3000
        }
    ],
    "positionType": "POLYGON",
    "positions": [
        {
            "lon": 7.41888,
            "lat": 43.73252
        },
        {
            "lon": 7.41806,
            "lat": 43.73272
        },
        {
            "lon": 7.41537,
            "lat": 43.73169
        },
        {
            "lon": 7.41516,
            "lat": 43.73184
        },
        {
            "lon": 7.41461,
            "lat": 43.73224
        }
    ]
}
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Parameters__

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geofencing.GeofencingRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geofencing.GeofencingRequest"}}
```


### Response
Return a list in same order of xy parameters (list of coordinates) with state INSIDE, OUTSIDE or INTERSECT.

#### Result of compare test
* positionStates: The status of result. Available values below.

| Values     | Illustration | Description |
|:----------:|:------------:|-------------|
| `INSIDE` | ![inside](images/geofencing-bnd-inside.svg =164x*) | Defines if the tested coordinate is in fence. |
| `OUTSIDE`    | ![outside](images/geofencing-bnd-outside.svg =164x*) | Defines if the tested coordinate is out of fence. |
| `INTERSECT` | ![intersect](images/geofencing-bnd-intersect.svg =164x*) | Position is not completely inside or outside but the shapes are intersected. |


#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geofencing.GeofencingResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geofencing.GeofencingResponse"}}
```


#### Response samples

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
    "fenceResults": [
        {
            "id": 1,
            "type": "CIRCLE",
            "positionStates": [
                "OUTSIDE"
            ]
        }
    ]
}
```

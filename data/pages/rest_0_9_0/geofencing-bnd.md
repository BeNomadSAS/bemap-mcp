<span class="float-right shadow">![Fences on map](images/geofencing-bnd-fences_on_map.png =300x*)</span>

# REST API, BND version 0.9 (Deprecate see API v1.x)


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
Sample:
```
/bgis/bnd?geoserver=default&version=1.0.0&action=geofencing&format=json&fence=1,CIRCLE,7.41537,43.73169,1000&xyType=CIRCLE&xy=7.42537,43.73569,200&xy=7.42537,43.73269,50&xy=7.42537,43.73869,100
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Mandatory parameters__

##### __action__: Name of service (action), here is `geofencing`.

##### __fence__: Define a fence shape to perform a intersection test between the route and fence.
This parameters can be repeated.
* Example: `fence=1,POLYGON,7.07863,43.61533,7.07863,43.61533,7.08136,43.61156,7.0786,43.6153`.
* Possible exception is `NotValidFenceParameterException`.

Main fields: `fence=id,type`.
* id: your fence id. if negate value the server set it with an auto-incrementing number.
* type: define the type of geometric shape of fence, like CIRCLE or POLYGON.

Geometric fields for CIRCLE type: `fence=id,type,longitude,latitude,radius`.
* longitude: longitude in degrees ([WGS84](index.html#page-glossary-coordinate_system.md)).
* latitude: latitude in degrees ([WGS84](index.html#page-glossary-coordinate_system.md)).
* radius: radius of circle in meters.
* Example:`fence=1,CIRCLE,7.4173,43.73165,150`.
 
Geometric fields for POLYGON type: `fence=id,type,longitude,latitude,longitude,latitude,longitude,latitude,etc`.
* longitude: longitude in degrees ([WGS84](index.html#page-glossary-coordinate_system.md)).
* latitude: latitude in degrees ([WGS84](index.html#page-glossary-coordinate_system.md)).

##### __version__: Version of BND protocol, here is `1.0.0`.

##### __xy__: The coordinates will be compared with the fences. This parameters can be repeated.
This parameter is comma-separated list, see below the details of parameter format in order of fields value:
1. longitude: longitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
2. latitude: latitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
3. altitude: (optional) altitude in meters.
4. radius: (optional) radius in meters.

Format:
* URL format: `&xy=longitude,latitude,altitude,radius`.
* URL Example: `&xy=2.36136,48.81349`.
* Possible exceptions are `MissingCoordinateParameterException` and `NotValidCoordinateParameterException`.

#### __Optional parameters__

##### __callback__: Define the JSONP callback name.

##### __format__: Define the format of output.
* Default value is `XML`.
* Available values are `XML`, `JSON` and `JSONP`.   
* Possible exception is `FormatNotSupportedException`.

##### __geoserver__: Geo server name. Set the name of the server configuration that will be used to perform the request.

##### __options__: Comma-separated list of one or more geo-fencing options.
* Available values:
 * `SEARCH`: Enable to search the fences with the `xy` coodinates, in this case the `xy` parameter can be use the radius, like `&xy=7.41692,43.73223,150`.
* Possible exception is `NotValidOptionsParameterException`.

##### __xslt__: Add xml-stylesheet element in the header of generated XML. e.i. `<?xml-stylesheet type="text/xsl" href="/bgis/html/clt-api/xslt/en/routing.xsl"?>`.

##### __xyType__: Define type of xy parameter used to perform a comparison between fence shapes and xy coordinates.
* Available values:
 * `CIRCLE`: Define type of xy parameter as circle to perform a comparison between fence shapes and a circle.
 * `POLYLINE`: Define the interpretation of coordinates of xy parameter to perform a comparison between fence shapes and a polyline.
 * `POLYGON`: Define the interpretation of coordinates of xy parameter to perform a comparison between fence shapes and a polygon.


### Response
Return a list in same order of xy parameters (list of coordinates) with state INSIDE, OUTSIDE or INTERSECT.

#### Details of fields

##### __BND__: Header of BND format response.
* action: performed action (the name of called service).
* version: version of protocol used.

##### __Geofencing__: List of geo-fencing.

##### __Fence__: Fence compared.
* id: unique identification number of the fence. By default the value is a number auto-incremented in order of the `fence` input parameters.
* type: type of geometry. Available values `CIRCLE`, `POLYGON`.

##### __Test__: Result of compare test.
* state: The status of result. Available values below.

| Values     | Illustration | Description |
|:----------:|:------------:|-------------|
| `INSIDE` | ![inside](images/geofencing-bnd-inside.svg =164x*) | Defines if the tested coordinate is in fence. |
| `OUTSIDE`    | ![outside](images/geofencing-bnd-outside.svg =164x*) | Defines if the tested coordinate is out of fence. |
| `INTERSECT` | ![intersect](images/geofencing-bnd-intersect.svg =164x*) | Position is not completely inside or outside but the shapes are intersected. |

##### __CircleShape__: Circle geometry information of fence.
* longitude: longitude of center of circle ([WGS84](index.html#page-glossary-coordinate_system.md)).
* latitude:	latitude of center of circle ([WGS84](index.html#page-glossary-coordinate_system.md)).
* radius: radius of circle in meter.
* radiusUnity: used unit. `m` for meter.

##### __PolygonShape__: Polygon geometry of fence.
* points: number of vertex coordinate.
* x: longitude [WGS84](index.html#page-glossary-coordinate_system.md).
* y: latitude [WGS84](index.html#page-glossary-coordinate_system.md).


#### Response samples

XML Sample:
```
{"bemap":{"language":"xml"}}
<?xml version="1.0" encoding="UTF-8"?>
<BND action="geofencing" version="1.0.0">
	<Geofencing count="1">
		<Fence id="1" type="CIRCLE">
			<Test state="INTERSECT"/>
			<Test state="INSIDE"/>
			<Test state="OUTSIDE"/>
		</Fence>
	</Geofencing>
</BND>
```

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
	"BND": {
		"action": "geofencing",
		"version": "1.0.0",
		"Geofencing": {
			"count": 1,
			"fences": [{
					"id": "1",
					"type": "CIRCLE",
					"test": [{
							"state": "INTERSECT"
						}, {
							"state": "INSIDE"
						}, {
							"state": "OUTSIDE"
						}
					]
				}
			]
		}
	}
}
```

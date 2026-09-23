# WMS version 1.1.1
A Web Map Service (WMS) is a standard protocol for serving (over the Internet) georeferenced map images which a map server generates using data from a GIS database. The Open Geospatial Consortium developed the specification and first published it in 1999.


## GetFeatureInfo service
If a layer is marked as 'queryable' then you can request data about a coordinate of the map image.


### Summary
1. Request
 1. Mandatory parameters
 2. Optional parameters
 3. Extra parameters of WMS standard
2. Response


### Request
Sample of WMS GetFeatureInfo request:
```
/bgis/wms?LAYERS=&VERSION=1.1.1&FORMAT=text%2Fxml&SRS=EPSG%3A4326&EXCEPTIONS=application%2Fvnd.ogc.se_xml&SERVICE=WMS&REQUEST=GetFeatureInfo&STYLES=&BBOX=7.2660000000000045,43.702,7.268000000000004,43.704&WIDTH=872&HEIGHT=512&X=25&Y=25
```

#### __Mandatory parameters__

##### __BBOX__: The mandatory BBOX parameter allows a Client to request a particular Bounding Box. The value of the BBOX parameter in a GetMap request is a list of comma-separated real numbers in the form "minx,miny,maxx,maxy". These values specify the minimum X, minimum Y, maximum X, and maximum Y values of a region in the Layer CRS of the request. The units, ordering and direction of increment of the X and Y axes are as defined by WGS84. The four bounding box values indicate the outside limits of the region. The relation of the Bounding Box to the map pixel matrix is that the bounding box goes around the "outside" of the pixels of the map rather than through the centers of the map's border pixels. In this context, individual pixels represent an area on the ground. If a request contains an invalid BBOX (e.g., one whose minimum X is greater than or equal to the maximum X, or whose minimum Y is greater than or equal to the maximum Y) the server shall throw a service exception. If a request contains a BBOX whose area does not overlap at all with the "BoundingBox" element in the service metadata for the requested layer, the server shall return empty content (that is, a blank map or an graphic element file with no elements) for that map. Any features that are partly or entirely contained in the Bounding Box shall be returned in the appropriate format.
 * Parameters example: `&BBOX=minx,miny,maxx,maxy`.
 * Possible exceptions are `MissingDimensionValueException` or `InvalidDimensionValueException`.  

##### __HEIGHT__: The mandatory WIDTH and HEIGHT parameters specify the size in integer pixels of the map to be produced. If the request is for a picture format, the returned picture, regardless of its MIME type, shall have exactly the specified width and height in pixels. In the case where the aspect ratio of the BBOX and the ratio width/height are different, the WMS shall stretch the returned map so that the resulting pixels could themselves be rendered in the aspect ratio of the BBOX. In other words, it shall be possible using this definition to request a map for a device whose output pixels are the selves non-square, or to stretch a map into an image area of a different aspect ratio. Map distortions will be introduced if the aspect ratio WIDTH/HEIGHT is not commensurate with X, Y and the pixel aspect. Client developers should minimize the possibility that users will inadvertently request or unknowingly receive distorted maps. If a request is for a graphic element format that does not have explicit width and height, the client shall include the WIDTH and HEIGHT values in the request and a server may use them as helpful information in constructing the output map.
* Default value: `-1`.
* Possible exceptions are `MissingDimensionValueException` or `InvalidDimensionValueException`.

##### __QUERY_LAYERS__: Comma-separated list of one or more layers name (or BeNomad class id) to be queried.
* Possible exception is `LayerNotDefinedException`.

##### __REQUEST__: The nature of the required REQUEST parameter is specified in the Basic Service Elements section of OGC documentation. For GetMap, the value `GetMap` shall be used. 

##### __SERVICE__: Name of protocol, here is `WMS`.

##### __SRS__: Spatial Reference System (SRS) identifier the map is returned in. Identifiers correspond to coordinate system ID codes found in the ArcXML Programmer's Reference Guide.
* Example: `SRS=EPSG:4326`.
* Possible exception is `InvalidSrsException`.

##### __VERSION__: The protocol version of WMS, here is `1.1.1`.

##### __WIDTH__: The mandatory WIDTH and HEIGHT parameters specify the size in integer pixels of the map to be produced. If the request is for a picture format, the returned picture, regardless of its MIME type, shall have exactly the specified width and height in pixels. In the case where the aspect ratio of the BBOX and the ratio width/height are different, the WMS shall stretch the returned map so that the resulting pixels could themselves be rendered in the aspect ratio of the BBOX. In other words, it shall be possible using this definition to request a map for a device whose output pixels are the selves non-square, or to stretch a map into an image area of a different aspect ratio. Map distortions will be introduced if the aspect ratio WIDTH/HEIGHT is not commensurate with X, Y and the pixel aspect. Client developers should minimize the possibility that users will inadvertently request or unknowingly receive distorted maps. If a request is for a graphic element format that does not have explicit width and height, the client shall include the WIDTH and HEIGHT values in the request and a server may use them as helpful information in constructing the output map.
* Default value: `-1`.
* Possible exceptions are `MissingDimensionValueException` or `InvalidDimensionValueException`.

##### __X__: The mandatory X and Y request parameters are integers that indicate a point of interest on the map that was produced by the embedded GetMap request (the "map request part". Therefore: the value of X shall be between 0 and the maximum value of the X axis; the value of Y shall be between 0 and the maximum value of the Y axis; the point X=0, Y=0 indicates the pixel at the upper left corner of the map; X increases to the right and Y increases downward. The point (X,Y) represents the center of the indicated pixel. If the value of X or of Y is invalid, the server shall issue a service exception (code = InvalidPoint).
* Default value: `-1`.
* Possible exceptions are `MissingDimensionValueException` or `InvalidDimensionValueException`.  


##### __Y__: The mandatory X and Y request parameters are integers that indicate a point of interest on the map that was produced by the embedded GetMap request (the "map request part". Therefore: the value of X shall be between 0 and the maximum value of the X axis; the value of Y shall be between 0 and the maximum value of the Y axis; the point X=0, Y=0 indicates the pixel at the upper left corner of the map; X increases to the right and Y increases downward. The point (X,Y) represents the center of the indicated pixel. If the value of X or of Y is invalid, the server shall issue a service exception (code = InvalidPoint). 
* Default value: `-1`.
* Possible exceptions are `MissingDimensionValueException` or `InvalidDimensionValueException`.  


#### __Optional parameters__

##### __EXCEPTIONS__: The optional EXCEPTIONS parameter states the manner in which errors are to be reported to the client. The default value is `application/vnd.ogc.se_xml` if this parameter is absent from the request. A Web Map Service shall offer one or more of the following exception reporting formats by listing them in separate <Format> elements inside the <Exceptions> element of its Capabilities XML. The entire MIME type string in <Format> is used as the value of the EXCEPTIONS parameter. The first of these formats is required to be offered by every WMS; the others are optional.
 * Default value is `application/vnd.ogc.se_xml`.
 * Possible exception is `OperationNotSupportedException`.
 * Available values are:
  * `application/vnd.ogc.se_xml`: This is the default exception format if none is specified in the request. The MIME type of the XML document containing the error message(s) shall be `application/vnd.ogc.se_xml`. The remaining exception formats are optional. A server may issue an exception in the default `application/vnd.ogc.se_xml` format if a request specifies a different format not supported by the server.`
  * `application/vnd.ogc.se_inimage`: In the case of a Picture format, error messages are graphically returned as part of the content. This would usually take the form of text containing the message being painted into the returned map. In Graphic Element output formats, the response to this value is experimental and no specific use is required or suggested by this specification. `application/vnd.ogc.se_inimage` is a pseudo MIME type; the format and MIME type of the returned content with embedded error messages is actually that given in the FORMAT parameter.
  * `application/vnd.ogc.se_blank`: In the case of a Picture format, if the EXCEPTIONS parameter is set to `application/vnd.ogc.se_blank`, the WMS shall, upon detecting an error, return an object of the type specified in FORMAT whose content is uniformly "off". In the case of an image format such as GIF or JPEG, that would be an object containing only pixels of one color (the background color if BACKGROUND is specified). In the case of a picture format supporting transparency, if `TRANSPARENT=TRUE` is specified the pixels shall all be transparent. In Graphic Element output formats, such as vector-based formats, this specification suggests that no visible graphic elements be returned. `application/vnd.ogc.se_blank` is a pseudo MIME type; the format and MIME type of the returned content with embedded error messages is actually that given in the FORMAT parameter.

##### __INFO_FORMAT__: The mandatory `INFO_FORMAT` parameter indicates what format to use when returning the feature information. Supported values for a GetFeatureInfo request on a WMS server are listed as MIME types in one or more elements of its service metadata. The entire MIME type string in is used as the value of the `INFO_FORMAT` parameter. In an HTTP environment, the MIME type shall be set on the returned object using the Content-type entity header. If the request specifies a format not supported by the server, the server shall issue a service exception (code = InvalidFormat). EXAMPLE The parameter `INFO_FORMAT=text/xml` requests that the feature information be formatted in XML.
* Default value: `text/xml`.
* Possible exception is `InvalidFormatException`.

#### __Extra parameters of WMS standard__

##### __ANGLE__: Orientation angle of vehicle. Use it to have more precision during the research. Use it with "speed" parameter.
* Default value: `-1.0`.

##### __ATTRIBUTES__: Comma-separated list of BeNomad attribute codes.

##### __FEATURECOUNT__: Number of features about which to return information (default=1).
* Default value: `1`.
* Possible exceptions is `InvalidFormatException`.

##### __FEATUREOPTIONS__
* Available values are:
 * `REVGEOCODING_SEARCH`: Enable the road match search by reverse geocoding to return a postal address.
 * `POLYGON_SEARCH`: Enable the research on polygon layer type.
 * `OTHER_SEARCH`: Enable the research on any layers type (POI, park, etc.). See the layers parameter.
 * `VISIBLE_FILTER`: Return only the objects visible on the map.
 * `POLYGON`: Return the list of coordinate of geo-fencing.
 * `DISTANCE_FROMCENTER`: Calculate the distance in meters between the request center and each element.
 * `FILTERBY_RADIUS`: Exclude all out side element of request radius.
 * `SORTBY_NEARTOFAR_FROMCENTER`: Can return a sorted list by distance between the request center and element, add the distance from the request center value in response. Value is in meters.
 * `TRAFFIC`: Return the real-time traffic information.
 * `TRAFFIC_PREDICTIVE`: Return the predictive traffic information. the time stamp defined in each coordinates are used.
 * `TRAFFIC_HISTORICAL`: (Beta) Return the historical traffic information. the time stamp defined in each coordinates are used.
 * `RAWDATA`: Returns the native value of map data base (like SVS attributes).

##### __GEOSERVER__: Geo server name. Set the name of the server configuration that will be used to perform the request.

##### __LANGUAGE__: Define the language that will be used. Objects for which defined language code is not available, default language will be used. Values language Code - An US-ASCII string that defines an ISO 639-1 (2-letter) language code. The special "IC" (or "ic") language code allows you to search for a country depending on its ISO-3166 Alpha-3 or Alpha-2 country code.
* Example for French : `&LANGUAGE=FR`.

##### __SPEED__: Speed of vehicle. Use it to have more precision during the research. Use it with "angle" parameter.
* Default value: `-1.0`.

##### __STYLES__: Comma-separated list of one rendering style names.
* Possible exception is `StyleNotDefinedException`.

##### __XSLT__: Add xml-stylesheet element in the header of generated XML. e.i. `<?xml-stylesheet type="text/xsl" href="/bgis/html/clt-api/xslt/en/routing.xsl"?>`.


### Response

```
{"bemap":{"language":"xml"}}
<?xml version="1.0" encoding="UTF-8"?>
<WmsGetFeatureInfo version="1.1.1"
 xmlns:gml="http://www.opengis.net/gml"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xmlns:xlink="http://www.w3.org/1999/xlink"
 xsi:schemaLocation="http://www.opengis.net/gml ../crsSchemas/base/coordinateReferenceSystems.xsd">
	<GeocodingElements count="1">
		<GeocodingElement>
			<Coordinate x="7.266" y="43.70388" />
			<PostalAddress>
				<Country>FRANCE</Country>
				<State>PROVENCE-ALPES-CÔTE D'AZUR</State>
				<County>ALPES-MARITIMES</County>
				<City>NICE</City>
				<District/>
				<PostalCode>06000</PostalCode>
				<RoadNumber/>
				<Street>AVENUE JEAN MÉDECIN</Street>
				<StreetNumber>52</StreetNumber>
			</PostalAddress>
			<Angle>-24.0</Angle>
			<SpeedLimit>0.0</SpeedLimit>
			<RelevanceScore>0.18599103657655047</RelevanceScore>
		</GeocodingElement>
	</GeocodingElements>
	<FeatureElements count="6">
		<gml:feature code="BUILT_UP_AREA" classId="1300">
			<gml:featureMember>
				<gml:CodeType>NAME</gml:CodeType>
				<gml:name>
					<![CDATA[]]>
				</gml:name>
				<gml:location>
					<gml:Point>
						<gml:pos>7.24935 43.703965</gml:pos>
					</gml:Point>
				</gml:location>
			</gml:featureMember>
		</gml:feature>
		<gml:feature code="BUILDING" classId="3900">
			<gml:featureMember>
				<gml:CodeType>NAME</gml:CodeType>
				<gml:name>
					<![CDATA[]]>
				</gml:name>
				<gml:location>
					<gml:Point>
						<gml:pos>7.26614 43.703945000000004</gml:pos>
					</gml:Point>
				</gml:location>
			</gml:featureMember>
		</gml:feature>
		<gml:feature code="CINEMA" classId="9120">
			<gml:featureMember>
				<gml:CodeType>NAME</gml:CodeType>
				<gml:name>
					<![CDATA[PATHÉ PARIS]]>
				</gml:name>
				<gml:location>
					<gml:Point>
						<gml:pos>7.26601 43.7039</gml:pos>
					</gml:Point>
				</gml:location>
			</gml:featureMember>
		</gml:feature>
		<gml:feature code="SHOP" classId="9361">
			<gml:featureMember>
				<gml:CodeType>NAME</gml:CodeType>
				<gml:name>
					<![CDATA[JULES]]>
				</gml:name>
				<gml:location>
					<gml:Point>
						<gml:pos>7.26603 43.70388</gml:pos>
					</gml:Point>
				</gml:location>
			</gml:featureMember>
		</gml:feature>
		<gml:feature code="SHOP" classId="9361">
			<gml:featureMember>
				<gml:CodeType>NAME</gml:CodeType>
				<gml:name>
					<![CDATA[PANOÏ]]>
				</gml:name>
				<gml:location>
					<gml:Point>
						<gml:pos>7.26603 43.70388</gml:pos>
					</gml:Point>
				</gml:location>
			</gml:featureMember>
		</gml:feature>
		<gml:feature code="SHOP" classId="9361">
			<gml:featureMember>
				<gml:CodeType>NAME</gml:CodeType>
				<gml:name>
					<![CDATA[H&M]]>
				</gml:name>
				<gml:location>
					<gml:Point>
						<gml:pos>7.26602 43.7039</gml:pos>
					</gml:Point>
				</gml:location>
			</gml:featureMember>
		</gml:feature>
	</FeatureElements>
</WmsGetFeatureInfo>
```

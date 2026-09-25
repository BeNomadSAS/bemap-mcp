# WMS version 1.3.0
A Web Map Service (WMS) is a standard protocol for serving (over the Internet) georeferenced map images which a map server generates using data from a GIS database. The Open Geospatial Consortium developed the specification and first published it in 1999.


## GetMap service
Returns a map image. Parameters include: width and height of the map, coordinate reference system, rendering style, image format in a bitmap format, e.g. PNG, GIF or JPEG.


### Summary
1. Request
 1. Mandatory parameters
 2. Optional parameters
 3. Extra parameters of WMS standard
2. Response


### Request
Sample of WMS Getmap request:
```
/bgis/wms?LAYERS=&VERSION=1.3.0&FORMAT=image%2Fpng&CRS=EPSG%3A4326&EXCEPTIONS=INIMAGE&SERVICE=WMS&REQUEST=GetMap&STYLES=&BBOX=40.75561640931422,1.1334246139713233,46.13342461397133,6.511232818628431&WIDTH=512&HEIGHT=512
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Mandatory parameters__

##### __BBOX__: The mandatory BBOX parameter allows a Client to request a particular Bounding Box. The value of the BBOX parameter in a GetMap request is a list of comma-separated real numbers in the form "minx,miny,maxx,maxy". These values specify the minimum X, minimum Y, maximum X, and maximum Y values of a region in the Layer CRS of the request. The units, ordering and direction of increment of the X and Y axes are as defined by WGS84. The four bounding box values indicate the outside limits of the region. The relation of the Bounding Box to the map pixel matrix is that the bounding box goes around the "outside" of the pixels of the map rather than through the centers of the map's border pixels. In this context, individual pixels represent an area on the ground. If a request contains an invalid BBOX (e.g., one whose minimum X is greater than or equal to the maximum X, or whose minimum Y is greater than or equal to the maximum Y) the server shall throw a service exception. If a request contains a BBOX whose area does not overlap at all with the "BoundingBox" element in the service metadata for the requested layer, the server shall return empty content (that is, a blank map or an graphic element file with no elements) for that map. Any features that are partly or entirely contained in the Bounding Box shall be returned in the appropriate format.
 * Parameters example: `&BBOX=minx,miny,maxx,maxy`.
 * Possible exceptions are `MissingDimensionValueException` or `InvalidDimensionValueException`.   

##### __CRS__: The CRS parameter (WMS 1.3.0) specifies the spatial reference system (coordinate system) for MapViewer to use. The value must be one of the following: SDO:srid-value (where srid-value is a numeric Oracle Spatial SRID value), EPSG:4326 (equivalent to SDO:8307), or none.
* Example: `CRS=EPSG:4326`.
* Possible exception is `InvalidCrsException`.

##### __HEIGHT__: The mandatory WIDTH and HEIGHT parameters specify the size in integer pixels of the map to be produced. If the request is for a picture format, the returned picture, regardless of its MIME type, shall have exactly the specified width and height in pixels. In the case where the aspect ratio of the BBOX and the ratio width/height are different, the WMS shall stretch the returned map so that the resulting pixels could themselves be rendered in the aspect ratio of the BBOX. In other words, it shall be possible using this definition to request a map for a device whose output pixels are the selves non-square, or to stretch a map into an image area of a different aspect ratio. Map distortions will be introduced if the aspect ratio WIDTH/HEIGHT is not commensurate with X, Y and the pixel aspect. Client developers should minimize the possibility that users will inadvertently request or unknowingly receive distorted maps. If a request is for a graphic element format that does not have explicit width and height, the client shall include the WIDTH and HEIGHT values in the request and a server may use them as helpful information in constructing the output map.
* Default value: `256`.
* Possible exceptions are `MissingDimensionValueException` or `InvalidDimensionValueException`. 

##### __REQUEST__: The nature of the required REQUEST parameter is specified in the Basic Service Elements section of OGC documentation. For GetMap, the value `GetMap` shall be used. 

##### __SERVICE__: Name of protocol, here is `WMS`.

##### __VERSION__: The protocol version of WMS, here is `1.3.0`.

##### __WIDTH__: The mandatory WIDTH and HEIGHT parameters specify the size in integer pixels of the map to be produced. If the request is for a picture format, the returned picture, regardless of its MIME type, shall have exactly the specified width and height in pixels. In the case where the aspect ratio of the BBOX and the ratio width/height are different, the WMS shall stretch the returned map so that the resulting pixels could themselves be rendered in the aspect ratio of the BBOX. In other words, it shall be possible using this definition to request a map for a device whose output pixels are the selves non-square, or to stretch a map into an image area of a different aspect ratio. Map distortions will be introduced if the aspect ratio WIDTH/HEIGHT is not commensurate with X, Y and the pixel aspect. Client developers should minimize the possibility that users will inadvertently request or unknowingly receive distorted maps. If a request is for a graphic element format that does not have explicit width and height, the client shall include the WIDTH and HEIGHT values in the request and a server may use them as helpful information in constructing the output map.
* Default value: `256`.
* Possible exceptions are `MissingDimensionValueException` or `InvalidDimensionValueException`. 

#### __Optional parameters__

##### __BGCOLOR__: The optional BGCOLOR parameter specifies the color to be used as the background of the map. The general format of BGCOLOR is a hexadecimal encoding of an RGB value where two hexadecimal characters are used for each of Red, Green, and Blue color values. The values can range between 00 and FF for each (0 and 255, base 10). The format is  0xRRGGBB ; either upper or lower case characters are allowed for RR, GG, and BB values. The "0x" prefix shall have a lower case ‘x’.  The default value is  `0xFFFFFF` (corresponding to the color white) if this parameter is absent from the request. When FORMAT is a Picture format, a WMS shall render its output on a background whose pixels were initially uniformly of the color encoded in BGCOLOR.  When FORMAT is a Graphic Element format (which does not have an explicit background), a WMS should avoid use of the BGCOLOR value for foreground elements because they would not be visible against a background picture of the same color. When the Layer has been declared as "opaque", then significant portions, or the entirety, of the map may not show any background at all. 
* By default the background color is defined by graphical chart of server.
* Example `0xFFFFFF` for a white background or `0x0000FF` for a blue background.

##### __EXCEPTIONS__: The optional EXCEPTIONS parameter states the manner in which errors are to be reported to the client. The default value is `application/vnd.ogc.se_xml` if this parameter is absent from the request. A Web Map Service shall offer one or more of the following exception reporting formats by listing them in separate <Format> elements inside the <Exceptions> element of its Capabilities XML. The entire MIME type string in <Format> is used as the value of the EXCEPTIONS parameter. The first of these formats is required to be offered by every WMS; the others are optional.
 * Default value is `application/vnd.ogc.se_xml`.
 * Possible exception is `OperationNotSupportedException`.
 * Available values are:
  * `application/vnd.ogc.se_xml`: This is the default exception format if none is specified in the request. The MIME type of the XML document containing the error message(s) shall be `application/vnd.ogc.se_xml`. The remaining exception formats are optional. A server may issue an exception in the default `application/vnd.ogc.se_xml` format if a request specifies a different format not supported by the server.`
  * `application/vnd.ogc.se_inimage`: In the case of a Picture format, error messages are graphically returned as part of the content. This would usually take the form of text containing the message being painted into the returned map. In Graphic Element output formats, the response to this value is experimental and no specific use is required or suggested by this specification. `application/vnd.ogc.se_inimage` is a pseudo MIME type; the format and MIME type of the returned content with embedded error messages is actually that given in the FORMAT parameter.
  * `application/vnd.ogc.se_blank`: In the case of a Picture format, if the EXCEPTIONS parameter is set to `application/vnd.ogc.se_blank`, the WMS shall, upon detecting an error, return an object of the type specified in FORMAT whose content is uniformly "off". In the case of an image format such as GIF or JPEG, that would be an object containing only pixels of one color (the background color if BACKGROUND is specified). In the case of a picture format supporting transparency, if `TRANSPARENT=TRUE` is specified the pixels shall all be transparent. In Graphic Element output formats, such as vector-based formats, this specification suggests that no visible graphic elements be returned. `application/vnd.ogc.se_blank` is a pseudo MIME type; the format and MIME type of the returned content with embedded error messages is actually that given in the FORMAT parameter. 

##### __FORMAT__: The mandatory FORMAT parameter states the desired format of the map. Supported values for a `GetMap` request on a WMS server are listed in one or more "Request" "GetMap" "Format" elements of its service metadata. The entire MIME type string in "Format" is used as the value of the `FORMAT` parameter. There is no default format. In an HTTP environment, the MIME type shall be set on the returned object using the Content-type entity header. If the request specifies a format not supported by the server, the server shall issue a service exception (code = InvalidFormat). 
 * Default value is `image/png`.
 * Possible exception is `InvalidFormatException`.  
 * Available values are `image/png`, `image/png24`, `image/gif` and `image/jpeg`.

##### __LAYERS__: Comma-separated list of one or more map layer names.
* Possible exception is `LayerNotDefinedException`.

##### __STYLES__: Comma-separated list of one rendering style names.
* Possible exception is `StyleNotDefinedException`.

##### __TRANSPARENT__: The optional TRANSPARENT parameter specifies whether the map background is to be made transparent or not. `TRANSPARENT` can take on two values, "TRUE" or "FALSE". The default value is `FALSE` if this parameter is absent from the request. The ability to return pictures drawn with transparent pixels allows results of different Map requests to be overlaid, producing a composite map. It is strongly recommended that every WMS offer a format that provides transparency for layers that could sensibly be overlaid above others. NOTE The `image/gif` format provides transparency and is properly displayed by common web clients. The `image/png` format provides a range of transparency options but support in viewing applications is less common. The `image/jpeg` format does not provide transparency at all. When `TRANSPARENT` is set to TRUE and the `FORMAT` parameter contains a Picture format (e.g., `image/gif`), then a WMS shall return (when permitted by the requested format) a result where all of the pixels not representing features or data values in that Layer are set to a transparent value. For example, a "roads" layer would be transparent wherever no road is shown. If the picture format does not support transparency, then the server shall respond with a non-transparent image (in other words, it is not an error for the client to always request transparent maps regardless of format). When the Layer has been declared "opaque", then significant portions, or the entirety, of the map may not be able to made transparent. Clients may still request `TRANSPARENT=true` When the `FORMAT` parameter contains a Graphic Element format, the `TRANSPARENT` parameter may be included in the request but its value shall be ignored by the WMS.
* Available values are `TRUE` or `FALSE`.

#### __Extra parameters of WMS standard__

##### __GEOSERVER__: Geo server name. Set the name of the server configuration that will be used to perform the request.

##### __LANGUAGE__: Define the language that will be used to perform the map rendering. Objects for which defined language code is not available, default language will be used. Values language Code - An US-ASCII string that defines an ISO 639-1 (2-letter) language code. The special "IC" (or "ic") language code allows you to search for a country depending on its ISO-3166 Alpha-3 or Alpha-2 country code.
* Example for French : `&LANGUAGE=FR`.


### Response
Sample:
<center>
![By bounding box](images/mapping-bnd-bbox.png)
</center>

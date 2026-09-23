# REST API, BND version 0.9 (Deprecate see WMS API)


## Mapping service
Returns a map image. Parameters include: width and height of the map, coordinate reference system, rendering style, image format in a bitmap format, e.g. PNG, GIF or JPEG.


### Summary
1. Request
 1. Mandatory parameters
 2. Optional parameters
2. Response


### Request
Sample:
```
/bgis/bnd?geoserver=default&version=1.0.0&action=mapping&bbox=1.13342,40.75561,6.51123,46.13342&width=512&height=512&format=png
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Mandatory parameters__
The parameters `bbox`, `center`/`radius` or `tiles(X, Y, Z)` can used alternately, but the presence of one of them in the request is mandatory.
To perform a map rendering of a specific area, three options are available:
* To define the area by a bounding box use the `bbox` parameter.
 * Example: `/bgis/bnd?geoserver=default&version=1.0.0&action=mapping&projection=epsg:900913&bbox=1.077978,40.979898,22.500000,55.776573&width=256&height=256&format=png`
* To define the area by a circle use the `center` and `radius` parameters.
 * Example: `/bgis/bnd?geoserver=default&version=1.0.0&action=mapping&projection=epsg:900913&center=7.202222,43.761058&radius=5000&width=256&height=256&format=png`
* To define the area by a column, row and zoom level use the `tileX`, `tileY` and `tileZ` parameters.
 * Example: `/bgis/bnd?version=1.0.0&action=mapping&projection=epsg:900913&tileX=8&tileY=5&tileZ=4&reverseTileY=true&width=256&height=256&format=png`

See below for more details of parameters.

##### __action__: Name of service (action), here is `mapping`.

##### __bbox__: Define the bounding box in WGS84 format. Performs a zoom operation inside the specified screen rectangular area.
The bounding box parameter is contains a couple of coordinates that represent the bottom left corn and the top right corn of renderer map.
First couple of coordinates is composed by minimal values of longitude (X axis) and latitude (Y axis).
Second couple of coordinates is composed by maximal values of longitude (X axis) and latitude (Y axis).
* URL Format: `&bbox=minimal X,minimal Y,maximal X,maximal Y`.
* Example: `&bbox=1.13342,40.75561,6.51123,46.13342`.
* Possible exceptions are `MissingBBoxParameterException` and `NotValidBBoxParameterException`.

##### __center__: Define the center of area, also use the radius parameter.
* URL Format: `&center=longitude,latitude`.
* Possible exceptions are `MissingCoordinateParameterException` and `NotValidCoordinateParameterException`.

##### __radius__: Define the radius of area in meters, also work with center parameter.
* Possible exceptions are `MissingRadiusParameterException` and `NotValidRadiusParameterException`.

##### __tileX__: Define the column (X axis) of tile. This coordinate can be revert by using the `reverseTileX` parameter.
* Possible exceptions are `MissingCoordinateParameterException` and `NotValidCoordinateParameterException`.

##### __tileY__: Define the row (Y axis) of tile. This coordinate can be revert by using the `reverseTileY` parameter.
* Possible exceptions are `MissingCoordinateParameterException` and `NotValidCoordinateParameterException`.

##### __tileZ__: Define the zoom level (Z axis) of tile.
* Possible exceptions are `MissingCoordinateParameterException` and `NotValidCoordinateParameterException`.

##### __version__: Version of BND protocol, here is `1.0.0`.

#### __Optional parameters__

##### __width__: Define width in pixels of the image.
* Default value is `256`.
* Possible exceptions are `MissingWidthParameterException` and `NotValidWidthParameterException`.

##### __height__: Define height in pixels of the image.
* Default value is `256`.
* Possible exceptions are `MissingHeightParameterException` and `NotValidHeightParameterException`.

##### __format__: Define the file format of image.
* Default value is `PNG`.
* Possible exceptions are `FormatNotSupportedException` and `FormatNotSupportedException`.

##### __layers__: Comma-separated list of one or more map layer names.
* Possible exceptions are `NotValidLayersParameterException` and `NotValidLayersParameterException`.

##### __styles__: Comma-separated list of one rendering style names. Set the style name (defined in geoserver.cfg.xml file).
* Possible exceptions are `NotValidStylesParameterException` and `NotValidStylesParameterException`.

##### __transparent__: The optional `transparent` parameter specifies whether the map background is to be made transparent or not. `TRANSPARENT` can take on two values, "TRUE" or "FALSE". The default value is `FALSE` if this parameter is absent from the request.
* Available values are `TRUE` or `FALSE`.

##### __bgcolor__: The optional `bgcolor` parameter specifies the color to be used as the background of the map. The general format of `bgcolor` is a hexadecimal encoding of an RGB value where two hexadecimal characters are used for each of Red, Green, and Blue color values. The values can range between 00 and FF for each (0 and 255, base 10). The format is  0xRRGGBB ; either upper or lower case characters are allowed for RR, GG, and BB values. The "0x" prefix shall have a lower case ‘x’. The default value is `0xFFFFFF` (corresponding to the color white) if this parameter is absent from the request. When FORMAT is a Picture format, a WMS shall render its output on a background whose pixels were initially uniformly of the color encoded in `bgcolor`. When the Layer has been declared as "opaque", then significant portions, or the entirety, of the map may not show any background at all. Define the color key of transparency support.
* By default the background color is defined by graphical chart of server.
* Example `0xFFFFFF` for a white background or `0x0000FF` for a blue background.

##### __icon__: Comma-separated list of one or more icon names or codes.
* Example: `&icon=2.2,43.8,ffffff00`. You can repeat this parameter to draw more icon.
* Possible exceptions are `NotValidIconParameterException` and `NotValidIconParameterException`.

##### __geoserver__: Geo server name. Set the name of the server configuration that will be used to perform the request.

##### __language__: Define the language that will be used to perform the map rendering. Objects for which defined language code is not available, default language will be used. Values language Code - An US-ASCII string that defines an ISO 639-1 (2-letter) language code. The special "IC" (or "ic") language code allows you to search for a country depending on its ISO-3166 Alpha-3 or Alpha-2 country code.
* Example for French : `&LANGUAGE=FR`.

##### __projection__: Defines the projection of map.
* Available values:
 * `EPSG:4326` is a Mercator projection.
 * `EPSG:900913` is a Mercator projection.
 * `EPSG:4326` is a WGS84 projection (ISO).
 * `EPSG:4979` is a WGS84 projection (ISO).
* Example: `&projection=EPSG:900913`.

##### __reverseTileX__; Reverse value of column (X axis) of tile. Used with the `tileX` parameter.

##### __reverseTileY__; Reverse value of row (Y axis) of tile. Used with the `tileY` parameter.


### Response
Samples:
<center>
| Bounding box | Coordinate and radius | Tiles XYZ |
|:------------:|:---------------------:|:---------:|
|![By bounding box](images/mapping-bnd-bbox.png)|![By coordinate and radius](images/mapping-bnd-coordinate_radius.png)|![By column and row of tile](images/mapping-bnd-tilesxyz.png)
</center>

# URL samples

## WMS

### 1.1.1
WMS services:
* [GetCapabilities](/bgis/wms?REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS)
* [GetMap](/bgis/wms?LAYERS=&VERSION=1.1.1&FORMAT=image%2Fpng&SRS=EPSG%3A4326&EXCEPTIONS=application%2Fvnd.ogc.se_inimage&SERVICE=WMS&REQUEST=GetMap&STYLES=&BBOX=1.1334246139713233,40.75561640931422,6.511232818628431,46.13342461397133&WIDTH=512&HEIGHT=512)
* [GetFeatureInfo](/bgis/wms?LAYERS=&VERSION=1.1.1&FORMAT=text%2Fxml&SRS=EPSG%3A4326&EXCEPTIONS=application%2Fvnd.ogc.se_xml&SERVICE=WMS&REQUEST=GetFeatureInfo&STYLES=&BBOX=7.2660000000000045,43.702,7.268000000000004,43.704&WIDTH=872&HEIGHT=512&X=25&Y=25)

### 1.3.0
WMS services:
* [GetCapabilities](/bgis/wms?REQUEST=GetCapabilities&VERSION=1.3.0&SERVICE=WMS)
* [GetMap](/bgis/wms?LAYERS=&VERSION=1.3.0&FORMAT=image%2Fpng&CRS=EPSG%3A4326&EXCEPTIONS=INIMAGE&SERVICE=WMS&REQUEST=GetMap&STYLES=&BBOX=40.75561640931422,1.1334246139713233,46.13342461397133,6.511232818628431&WIDTH=512&HEIGHT=512)
* [GetFeatureInfo](/bgis/wms?LAYERS=&VERSION=1.3.0&FORMAT=text%2Fxml&CRS=EPSG%3A4326&EXCEPTIONS=XML&SERVICE=WMS&REQUEST=GetFeatureInfo&STYLES=&BBOX=43.702,7.2660000000000045,43.704,7.268000000000004&WIDTH=872&HEIGHT=512&I=25&J=25)


## BND protocol

### Mapping
For more details see the [documentation of mapping](index.html#page-mapping-bnd.md).

Tiles coordinate systems:
* [Bounding box](/bgis/bnd?geoserver=default&version=1.0.0&action=mapping&projection=epsg:900913&bbox=1.077978,40.979898,22.500000,55.776573&width=256&height=256&format=png)
* [Radius](/bgis/bnd?geoserver=default&version=1.0.0&action=mapping&projection=epsg:900913&center=7.202222,43.761058&radius=5000&width=256&height=256&format=png)
* [XYZ](/bgis/bnd?geoserver=default&version=1.0.0&action=mapping&projection=epsg:900913&tileX=8&tileY=5&tileZ=4&reverseTileY=true&width=256&height=256&format=png)

Supported output file format:
* [PNG (8bit)](/bgis/bnd?geoserver=default&version=1.0.0&action=mapping&bbox=1.13342,40.75561,6.51123,46.13342&width=512&height=512&format=png)
* [PNG (24bit + alpha)](/bgis/bnd?geoserver=default&version=1.0.0&action=mapping&bbox=1.13342,40.75561,6.51123,46.13342&width=512&height=512&format=png24)
* [GIF](/bgis/bnd?geoserver=default&version=1.0.0&action=mapping&bbox=1.13342,40.75561,6.51123,46.13342&width=512&height=512&format=gif)
* [JPEG](/bgis/bnd?geoserver=default&version=1.0.0&action=mapping&bbox=1.13342,40.75561,6.51123,46.13342&width=512&height=512&format=jpeg)

Transparent color:
* [PNG (8bit with transparent color)](/bgis/bnd?geoserver=default&version=1.0.0&action=mapping&bbox=1.13342,40.75561,6.51123,46.13342&width=512&height=512&format=png&transparent=true&bgcolor=B2D0FE)
* [GIF (with transparent color)](/bgis/bnd?geoserver=default&version=1.0.0&action=mapping&bbox=1.13342,40.75561,6.51123,46.13342&width=512&height=512&format=gif&transparent=true&bgcolor=B2D0FE)

### Geocoding
For more details see the [documentation of geocoding](index.html#subpage-rest_0_9_0-geocoding-bnd.md).

Supported output format:
* [XML](/bgis/bnd?geoserver=default&version=1.0.0&action=geocoding&country=France&city=paris&street=villa%20des%20pyr%C3%A9n%C3%A9es&language=xx&maxresult=2&format=xml&searchType=FUZZY)
* [XML (UTF-8)](/bgis/bnd?geoserver=default&version=1.0.0&action=geocoding&countryCode=GRC&city=%CE%91%CE%B8%CE%AE%CE%BD%CE%B1&street=%CE%91%CE%BB%CF%8C%CF%80%CE%B7%CF%82&streetnumber=4&language=xx&maxresult=2&format=xml&searchType=FUZZY)
* [JSON](/bgis/bnd?geoserver=default&version=1.0.0&action=geocoding&country=France&city=paris&street=villa%20des%20pyr%C3%A9n%C3%A9es&language=xx&maxresult=2&format=json&searchType=FUZZY)
* [JSONP](/bgis/bnd?geoserver=default&version=1.0.0&action=geocoding&country=France&city=paris&street=villa%20des%20pyr%C3%A9n%C3%A9es&language=xx&maxresult=2&format=jsonp&callback=geocodingCallback&searchType=FUZZY)

Search modes:
* [Contains](/bgis/bnd?geoserver=default&version=1.0.0&action=geocoding&country=France&city=paris&street=pyr%C3%A9n%C3%A9es&language=xx&maxresult=2&format=json&searchType=CONTAINS)
* [Fuzzy](/bgis/bnd?geoserver=default&version=1.0.0&action=geocoding&country=France&city=paris&street=vill%20de%20pyr%C3%A9n%C3%A9e&language=xx&maxresult=2&format=json&searchType=FUZZY)
* [Strict](/bgis/bnd?geoserver=default&version=1.0.0&action=geocoding&country=France&city=paris&street=villa%20des%20pyr%C3%A9n%C3%A9es&language=xx&maxresult=2&format=json&searchType=STRICT)
* [Strict beginning](/bgis/bnd?geoserver=default&version=1.0.0&action=geocoding&country=France&city=paris&street=villa%20des%20py&language=xx&maxresult=2&format=json&searchType=STRICT_BEGINNING)
* [Word beginning](/bgis/bnd?geoserver=default&version=1.0.0&action=geocoding&country=France&city=paris&street=villa%20des%20py&language=xx&maxresult=2&format=json&searchType=WORD_BEGINNING)

POI search:
* [POI search](/bgis/bnd?geoserver=default&version=1.0.0&action=geocoding&country=France&city=paris&street=metro-chatelet&language=xx&maxresult=2&format=json)

### Geocoding for batch job
For more details see the [documentation of geocoding for batch](index.html#subpage-rest_0_9_0-geocodingbatch-bnd.md).

Supported output format:
* [XML](/bgis/bnd?geoserver=default&version=1.0.0&action=geocodingBatch&language=xx&maxresult=2&format=xml&searchType=FUZZY&query=france,,,,paris,,villa des&query=france,,,,bordeaux,,rue de labrede, 2)
* [JSON](/bgis/bnd?geoserver=default&version=1.0.0&action=geocodingBatch&language=xx&maxresult=2&format=json&searchType=FUZZY&query=france,,,,paris,,villa des&query=france,,,,bordeaux,,rue de labrede, 2)

### Reverse geocoding
For more details see the [documentation of geocoding](index.html#subpage-rest_0_9_0-reversegeocoding-bnd.md).

Supported output format:
* [XML](/bgis/bnd?geoserver=default&version=1.0.0&action=revgeocoding&xy=7.202222,43.761058&radius=50&language=fr&options=POLYLINE,ROAD_FEATURE&format=xml)
* [XML (UTF-8)](/bgis/bnd?geoserver=default&version=1.0.0&action=revgeocoding&xy=23.716784,37.97986&radius=50&language=oc&options=POLYLINE,ROAD_FEATURE&format=xml)
* [JSON](/bgis/bnd?geoserver=default&version=1.0.0&action=revgeocoding&xy=7.202222,43.761058&radius=50&language=fr&options=POLYLINE,ROAD_FEATURE&format=json)
* [JSONP](/bgis/bnd?geoserver=default&version=1.0.0&action=revgeocoding&xy=7.202222,43.761058&radius=50&language=fr&options=POLYLINE,ROAD_FEATURE&format=jsonp&callback=revgeocodingCallback)

Specific options:
* [Conditional max speed](/bgis/bnd?geoserver=default&version=1.0.0&action=revgeocoding&transportType=TRUCK&xy=7.13891,43.647749&radius=50&language=fr&options=ROAD_FEATURE&format=json)
* [Skip street without name](/bgis/bnd?geoserver=default&version=1.0.0&action=revgeocoding&xy=7.0531,43.6243&radius=1000&language=fr&options=SKIP_EMPTY_STREETNAME&maxResult=1&format=json)
* [Urban built up area](/bgis/bnd?geoserver=default&version=1.0.0&action=revgeocoding&transportType=TRUCK&xy=7.13333,43.64599&radius=50&language=fr&options=URBAN_AREA,ROAD_FEATURE&format=json)

Traffic information:
* [Traffic](/bgis/bnd?geoserver=default&version=1.0.0&action=revgeocoding&transportType=CAR&language=fr&options=TRAFFIC&format=json&radius=50&xy=2.29555,48.87384)
* [Historical traffic](/bgis/bnd?geoserver=default&version=1.0.0&action=revgeocoding&transportType=CAR&language=fr&options=TRAFFIC_HISTORICAL&format=json&radius=50&xy=2.29555,48.87384,0,0,0,1456234994000)

### Reverse geocoding for batch job
For more details see the [documentation of reverse-geocoding for batch](index.html#subpage-rest_0_9_0-reversegeocodingbatch-bnd.md).

Supported output format:
* [XML](/bgis/bnd?geoserver=default&version=1.0.0&action=revgeoBatch&radius=50&language=fr&options=polyline&format=xml&xy=7.202222,43.761058,0,180,50&xy=4.82962,45.75856)
* [JSON](/bgis/bnd?geoserver=default&version=1.0.0&action=revgeoBatch&radius=50&language=fr&options=polyline&format=json&xy=7.202222,43.761058,0,180,50&xy=4.82962,45.75856)
* [JSONP](/bgis/bnd?geoserver=default&version=1.0.0&action=revgeoBatch&radius=50&language=fr&options=polyline&format=jsonp&callback=revgeoBatchCallback&xy=7.202222,43.761058,0,180,50&xy=4.82962,45.75856)

Traffic information:
* [Traffic](/bgis/bnd?geoserver=default&version=1.0.0&action=revgeoBatch&radius=50&language=fr&options=TRAFFIC&format=json&xy=2.29555,48.87384&xy=2.29258,48.87474)
* [Historical traffic](/bgis/bnd?geoserver=default&version=1.0.0&action=revgeoBatch&radius=50&language=fr&options=TRAFFIC_HISTORICAL&format=json&xy=2.29555,48.87384,0,0,0,1456234994000&xy=2.29258,48.87474,0,0,0,1456234994000)

### Geofencing
For more details see the [documentation of geofencing](index.html#subpage-rest_0_9_0-geofencing-bnd.md).

#### Test between circle fence and a circle:
* [XML](/bgis/bnd?geoserver=default&version=1.0.0&action=geofencing&format=xml&fence=1,CIRCLE,7.41537,43.73169,1000&xyType=CIRCLE&xy=7.42537,43.73569,200&xy=7.42537,43.73269,50&xy=7.42537,43.73869,100)
* [JSON](/bgis/bnd?geoserver=default&version=1.0.0&action=geofencing&format=json&fence=1,CIRCLE,7.41537,43.73169,1000&xyType=CIRCLE&xy=7.42537,43.73569,200&xy=7.42537,43.73269,50&xy=7.42537,43.73869,100)
* [JSONP](/bgis/bnd?geoserver=default&version=1.0.0&action=geofencing&callback=geofencing&format=jsonp&fence=1,CIRCLE,7.41537,43.73169,1000&xyType=CIRCLE&xy=7.42537,43.73569,200&xy=7.42537,43.73269,50&xy=7.42537,43.73869,100)

#### Test between circle fence and a polyline:
* [Outside](/bgis/bnd?geoserver=default&version=1.0.0&action=geofencing&format=json&fence=1,CIRCLE,7.42806,43.75272,1000&xyType=POLYLINE&xy=7.41888,43.73252&xy=7.41806,43.73272&xy=7.41781,43.73234&xy=7.41761,43.73205&xy=7.41753,43.73195&xy=7.41745,43.73183&xy=7.4174,43.73179&xy=7.4173,43.73165&xy=7.41722,43.73164&xy=7.41697,43.73208&xy=7.417,43.73212&xy=7.41692,43.73223&xy=7.41678,43.73217&xy=7.4168,43.7321&xy=7.41639,43.7317&xy=7.41588,43.73133&xy=7.41537,43.73169&xy=7.41516,43.73184&xy=7.41461,43.73224)
* [Intersect](/bgis/bnd?geoserver=default&version=1.0.0&action=geofencing&format=json&fence=1,CIRCLE,7.42806,43.75272,2500&xyType=POLYLINE&xy=7.41888,43.73252&xy=7.41806,43.73272&xy=7.41781,43.73234&xy=7.41761,43.73205&xy=7.41753,43.73195&xy=7.41745,43.73183&xy=7.4174,43.73179&xy=7.4173,43.73165&xy=7.41722,43.73164&xy=7.41697,43.73208&xy=7.417,43.73212&xy=7.41692,43.73223&xy=7.41678,43.73217&xy=7.4168,43.7321&xy=7.41639,43.7317&xy=7.41588,43.73133&xy=7.41537,43.73169&xy=7.41516,43.73184&xy=7.41461,43.73224)
* [Inside](/bgis/bnd?geoserver=default&version=1.0.0&action=geofencing&format=json&fence=1,CIRCLE,7.42806,43.75272,3000&xyType=POLYLINE&xy=7.41888,43.73252&xy=7.41806,43.73272&xy=7.41781,43.73234&xy=7.41761,43.73205&xy=7.41753,43.73195&xy=7.41745,43.73183&xy=7.4174,43.73179&xy=7.4173,43.73165&xy=7.41722,43.73164&xy=7.41697,43.73208&xy=7.417,43.73212&xy=7.41692,43.73223&xy=7.41678,43.73217&xy=7.4168,43.7321&xy=7.41639,43.7317&xy=7.41588,43.73133&xy=7.41537,43.73169&xy=7.41516,43.73184&xy=7.41461,43.73224)

#### Test between circle fence and a polygon:
* [Outside](/bgis/bnd?geoserver=default&version=1.0.0&action=geofencing&format=json&fence=1,CIRCLE,7.42806,43.75272,2000&xyType=POLYGON&xy=7.41888,43.73252&xy=7.41806,43.73272&xy=7.41781,43.73234&xy=7.41761,43.73205&xy=7.41753,43.73195&xy=7.41745,43.73183&xy=7.4174,43.73179&xy=7.4173,43.73165&xy=7.41722,43.73164&xy=7.41697,43.73208&xy=7.417,43.73212&xy=7.41692,43.73223&xy=7.41678,43.73217&xy=7.4168,43.7321&xy=7.41639,43.7317&xy=7.41588,43.73133&xy=7.41537,43.73169&xy=7.41516,43.73184&xy=7.41461,43.73224)
* [Intersect](/bgis/bnd?geoserver=default&version=1.0.0&action=geofencing&format=json&fence=1,CIRCLE,7.42806,43.75272,2500&xyType=POLYGON&xy=7.41888,43.73252&xy=7.41806,43.73272&xy=7.41781,43.73234&xy=7.41761,43.73205&xy=7.41753,43.73195&xy=7.41745,43.73183&xy=7.4174,43.73179&xy=7.4173,43.73165&xy=7.41722,43.73164&xy=7.41697,43.73208&xy=7.417,43.73212&xy=7.41692,43.73223&xy=7.41678,43.73217&xy=7.4168,43.7321&xy=7.41639,43.7317&xy=7.41588,43.73133&xy=7.41537,43.73169&xy=7.41516,43.73184&xy=7.41461,43.73224)
* [Inside](/bgis/bnd?geoserver=default&version=1.0.0&action=geofencing&format=json&fence=1,CIRCLE,7.42806,43.75272,3000&xyType=POLYGON&xy=7.41888,43.73252&xy=7.41806,43.73272&xy=7.41781,43.73234&xy=7.41761,43.73205&xy=7.41753,43.73195&xy=7.41745,43.73183&xy=7.4174,43.73179&xy=7.4173,43.73165&xy=7.41722,43.73164&xy=7.41697,43.73208&xy=7.417,43.73212&xy=7.41692,43.73223&xy=7.41678,43.73217&xy=7.4168,43.7321&xy=7.41639,43.7317&xy=7.41588,43.73133&xy=7.41537,43.73169&xy=7.41516,43.73184&xy=7.41461,43.73224)

#### Search fences from a circle:
* [Xml (Search fence)](/bgis/bnd?geoserver=default&version=1.0.0&action=geofencing&format=xml&options=SEARCH&fence=1,CIRCLE,7.41537,43.73169,200&xy=7.42537,43.73169,500)
* [Json (Search fence)](/bgis/bnd?geoserver=default&version=1.0.0&action=geofencing&format=json&options=SEARCH&fence=1,CIRCLE,7.41537,43.73169,200&xy=7.42537,43.73169,500)
* [Jsonp (Search fence)](/bgis/bnd?geoserver=default&version=1.0.0&action=geofencing&format=jsonp&callback=geofencing&options=SEARCH&fence=1,CIRCLE,7.41537,43.73169,200&xy=7.42537,43.73169,500)
* [Xml (Search fence with polygon)](/bgis/bnd?geoserver=default&version=1.0.0&action=geofencing&format=json&options=SEARCH&fence=2,POLYGON,7.41037,43.73069,7.41937,43.73069,7.41937,43.73969,7.41937,43.73069&xy=7.41515,43.73530,5000)

### Feature area
For more details see the [documentation of feature-area](index.html#subpage-rest_0_9_0-feature-bnd.md).

Supported output format:
* [XML](/bgis/bnd?geoserver=default&version=1.0.0&action=feature&xy=2.29489,48.85803&radius=50&language=fr&format=xml)
* [JSON](/bgis/bnd?geoserver=default&version=1.0.0&action=feature&xy=2.29489,48.85803&radius=50&language=fr&format=json)
* [JSONP](/bgis/bnd?geoserver=default&version=1.0.0&action=feature&xy=2.29489,48.85803&radius=50&language=fr&format=jsonp&callback=featureCallback)

Specific options:
* [Polygon](/bgis/bnd?geoserver=default&version=1.0.0&action=feature&xy=2.29489,48.85803&radius=50&viewBbox=7.2660000000000045,43.702,7.268000000000004,43.704&viewWidth=872&viewHeight=512&options=REVGEOCODING_SEARCH,POLYGON_SEARCH,OTHER_SEARCH,POLYGON&language=fr&format=json)
* [Filter on visible layers](/bgis/bnd?geoserver=default&version=1.0.0&action=feature&xy=2.29489,48.85803&radius=50&viewBbox=7.2660000000000045,43.702,7.268000000000004,43.704&viewWidth=872&viewHeight=512&options=REVGEOCODING_SEARCH,POLYGON_SEARCH,OTHER_SEARCH,VISIBLE_FILTER&language=fr&format=json)

Specific research:
* [Complex research with specific layer](/bgis/bnd?geoserver=default&version=1.0.0&action=feature&xy=2.29489,48.85803&radius=500&language=fr&format=json&options=OTHER_SEARCH,POLYGON&layers=2000)
* [Complex research with attributes](/bgis/bnd?geoserver=default&version=1.0.0&action=feature&xy=2.3538198,48.754084&radius=50000&language=fr&format=json&options=OTHER_SEARCH,POLYGON&layers=4816&attributes=21332&attCompares=21332%3C50)
* [Searching by polygon geometry](/bgis/bnd?geoserver=default&version=1.0.0&action=feature&xyShape=POLYGON&xy=2.29489,48.85803&xy=2.29789,48.85803&xy=2.29689,48.85950&language=fr&format=json)
* [Searching by polygon geometry with complex filters](/bgis/bnd?geoserver=default&version=1.0.0&action=feature&xyShape=POLYGON&xy=2.29489,48.85803&xy=2.29789,48.85803&xy=2.29689,48.85950&language=fr&format=json&options=OTHER_SEARCH,POLYGON&layers=ROAD_ELEMENT_MAX&attributes=KEY,NAME,LENGTH,HOUSE_NUMBER_LEFT,HOUSE_NUMBER_RIGHT)

Traffic information:
* [Traffic)](/bgis/bnd?geoserver=default&version=1.0.0&action=feature&xy=2.29555,48.87384&radius=50&language=fr&format=json&options=TRAFFIC)
* [Historical traffic](/bgis/bnd?geoserver=default&version=1.0.0&action=feature&xy=2.29555,48.87384,0,0,0,1456234994000&radius=50&language=fr&format=json&options=TRAFFIC_HISTORICAL)

### Routing
For more details see the [documentation of routing](index.html#subpage-rest_0_9_0-routing-bnd.md).

Supported output format:
* [XML](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=ROUTESHEET,POLYLINE,POLYLINE_INDEX&format=xml&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [XML + XSLT](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=ROUTESHEET&format=xml&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986&xslt=/bgis/html/clt-api/xslt/en/routing.xsl)
* [JSON](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=ROUTESHEET,POLYLINE,POLYLINE_INDEX&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [JSONP](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=ROUTESHEET,POLYLINE,POLYLINE_INDEX&format=jsonp&callback=routingCallback&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [GPX](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=POLYLINE&format=gpx&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)

Specific mode:
* [Vias](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&mode=MODE_VIAS&language=fr&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [1 to n](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&mode=MODE_1_TO_N&language=fr&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [n to 1](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&mode=MODE_N_TO_1&language=fr&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [n to n](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&mode=MODE_N_TO_N&language=fr&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [matrix n to n](/bgis/bnd?geoserver=here&version=1.0.0&action=routing&mode=MODE_MATRIX&language=fr&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [matrix n to m](/bgis/bnd?geoserver=here&version=1.0.0&action=routing&mode=MODE_MATRIX&language=fr&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986&matrixStartCount=4)
* [Isochrone](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&mode=MODE_ISOCHRONE&options=ISOCHRONE_FORWARD&language=fr&format=json&criterias=FASTER&isoChroneLimit=600&xy=7.41059,43.73446)

Specific options:
* [Via with alternative routes](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&mode=MODE_VIAS&maxAlter=2&language=fr&format=json&xy=7.24795,43.69353&xy=2.34393,48.85898)
* [Polyline](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=POLYLINE,POLYLINE_INDEX&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [Event Polyline](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=EVENT,EVT_DUPLICATE_FILTER,EVT_POLYLINE&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [Encoded polyline](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=EVENT,EVT_DUPLICATE_FILTER,EVT_ENCODED_POLYLINE&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [Event Route-sheet](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=EVENT,EVT_DUPLICATE_FILTER,EVT_ROUTESHEET&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [Detailed polyline](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=DETAILED_POLYLINE,POLYLINE_INDEX&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [Junction nodes](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=JUNCTION_NODES&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [Segment ids](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=SEGMENTIDS&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [Waypoints](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=WAYPOINTS,WAYPOINTS_POLYLINE&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [Road block](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=DETAILED_POLYLINE&rb=7.41537,43.73169,0,true,320&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [Avoid countries](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&acc=AUT,ITA&options=EVENT,EVT_DUPLICATE_FILTER&format=json&xy=2.34131,48.85702&xy=15.96746,45.8074)
* [Soft-waypoint](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=POLYLINE&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189,0,180,50,0,0,152&xy=7.15092,43.66244,0,0,0,0,0,0,false,false,false,false,UNDEF,UNDEF,UNDEF,true&xy=7.12901,43.62986)
* [Corridor](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&corridorRadius=150&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189,0,180,50,0,0,152&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [Fences](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&format=json&options=POLYLINE&fence=1,CIRCLE,7.4173,43.73165,150&fence=2,POLYGON,7.07863,43.61533,7.07863,43.61533,7.08136,43.61156,7.0786,43.6153&fence=3,CIRCLE,7.41537,43.73169,200&xy=7.41888,43.73252&xy=7.41461,43.73224)
* [Road segments](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=ROAD_SEGMENTS&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [Speed ponderation](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&options=ROUTESHEET,POLYLINE&format=json&language=fr&transportType=TRUCK&criterias=&sp=1,1,ALL,CAL&sp=0.7,2,ALL,CAL&sp=0.3,3,ALL,CAL&sp=0.1,4,ALL,CAL&xy=2.34121,48.85692&xy=4.82898,45.75939)
* [Vehicle profile](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=ROUTESHEET,POLYLINE&vf=412,183,650,32,12,NONE,TRUCK,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,0,0,0,0,0,0,0,EURO3,1,CAT_B&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [Return the postal address of matched input coordinates](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=REVGEO_POSTAL_ADDRESS&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)

Toll cost calculation:
* [Toll cost](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=EVENT,EVT_DUPLICATE_FILTER,EVT_TOLL_COST&transportType=CAR&vf=0,0,0,0,0,NONE,AUTO,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,0,0,0,0,0,0,0,EURO3&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [For motorcycle](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=EVENT,EVT_DUPLICATE_FILTER,EVT_TOLL_COST&transportType=MOTORCYCLE&vf=0,0,0,0,0,NONE,MOTORCYCLE,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,0,0,0,0,0,0,0,EURO3&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [For truck](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=EVENT,EVT_DUPLICATE_FILTER,EVT_TOLL_COST&transportType=TRUCK&vf=0,0,0,0,0,NONE,TRUCK,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,0,0,0,0,0,0,0,EURO3&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)

Tax cost calculation:
* [Tax cost](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=EVENT,EVT_DUPLICATE_FILTER,EVT_TAX_COST&vf=0,0,0,0,0,NONE,TRUCK,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,0,0,0,0,0,0,0,UNDEFINED,-1&format=json&xy=13.3907,52.51725&xy=2.35717,48.85613&xy=-4.43771,48.41613)

Traffic information:
* [(Lyon - Paris) without Traffic Info](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&transportType=CAR&format=json&xy=4.82898,45.75939&xy=2.3412,48.85693)
* [(Lyon - Paris) with Traffic Info](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&transportType=CAR&options=TRAFFIC&format=json&xy=4.82898,45.75939&xy=2.3412,48.85693)
* [Real-time traffic info along the route](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=EVENT,EVT_DUPLICATE_FILTER,EVT_TRAFFIC&cf=5,80&evf=0.75,0.012,0.693,22,1468,100,300,2.1,-2,20,22,31&format=json&xy=2.34144,48.85721&xy=4.82898,45.75939)
* [Predictive traffic info along the route](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=EVENT,EVT_DUPLICATE_FILTER,EVT_TRAFFIC_PREDICTIVE&cf=5,80&evf=0.75,0.012,0.693,22,1468,100,300,2.1,-2,20,22,31&format=json&xy=2.34144,48.85721&xy=4.82898,45.75939)

Trip optimization:
* [Simple](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=OPTIMIZED_TRIP,SORTBY_USED_ORDER&format=json&xy=2.40195,48.8359&xy=2.35091,48.83009&xy=2.40254,48.83936&xy=2.34872,48.83507&xy=2.40297,48.84326&xy=2.35453,48.84608&xy=2.35075,48.83884&xy=2.38918,48.84939)
* [Round](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=OPTIMIZED_TRIP_ROUND,SORTBY_USED_ORDER&format=json&xy=2.40195,48.8359&xy=2.35091,48.83009&xy=2.40254,48.83936&xy=2.34872,48.83507&xy=2.40297,48.84326&xy=2.35453,48.84608&xy=2.35075,48.83884&xy=2.38918,48.84939)
* [Round and close](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=OPTIMIZED_TRIP_ROUND,OPTIMIZED_TRIP_CLOSE,SORTBY_USED_ORDER&format=json&xy=2.40195,48.8359&xy=2.35091,48.83009&xy=2.40254,48.83936&xy=2.34872,48.83507&xy=2.40297,48.84326&xy=2.35453,48.84608&xy=2.35075,48.83884&xy=2.38918,48.84939)
* [Undefined stop](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=OPTIMIZED_TRIP_UNDEFSTOP,SORTBY_USED_ORDER&format=json&xy=2.40195,48.8359&xy=2.35091,48.83009&xy=2.40254,48.83936&xy=2.34872,48.83507&xy=2.40297,48.84326&xy=2.35453,48.84608&xy=2.35075,48.83884&xy=2.38918,48.84939)
 Isochrone:
* [Isochrone (forward)](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&mode=MODE_ISOCHRONE&options=ISOCHRONE_FORWARD&language=fr&format=json&criterias=FASTER&isoChroneLimit=600&xy=2.28882,48.89232)
* [Isochrone (backward)](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&mode=MODE_ISOCHRONE&options=ISOCHRONE_BACKWARD&language=fr&format=json&criterias=FASTER&isoChroneLimit=600&xy=2.28882,48.89232)
* [Isochrone (Road segments)](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&mode=MODE_ISOCHRONE&options=ISOCHRONE_FORWARD,ROAD_SEGMENTS&language=fr&format=json&criterias=FASTER&isoChroneLimit=600&xy=2.28882,48.89232)

Energy consumption:
* [Energy consumption](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=ENERGY_CONSUMPTION&transportType=CAR&evf=0.75,0.012,0.693,22,1468,100,300,2.1,-2,15&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [Energy consumption with end of autonomy](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=EVENT,EVT_DUPLICATE_FILTER,EVT_ENERGY_CONSUMPTION,EVT_POLYLINE&transportType=CAR&evf=0.75,0.012,0.693,22,1468,100,300,2.1,-2,15&format=json&xy=7.41059,43.73446&xy=7.15376,43.72189&xy=7.15092,43.66244&xy=7.12901,43.62986)
* [Find the optimized route through charging stations](/bgis/bnd?geoserver=default&version=1.0.0&action=routing&language=fr&options=OPTIMIZED_ROUTE_FOR_CHARGING_STATION,EVENT,EVT_DUPLICATE_FILTER,EVT_CHARGING_STATION,EVT_POLYLINE&cfProviders=ocm&cf=5,80&cfCnnTypeIdFilters=8,9,10,11,12&evf=0.75,0.012,0.693,22,1468,100,300,2.1,-2,20,22,31&format=json&xy=2.34144,48.85721&xy=4.82898,45.75939)

### Trace route
For more details see the [documentation of trace-route](index.html#subpage-rest_0_9_0-traceroute-bnd.md).

Supported output format:
* [XML](/bgis/bnd?geoserver=default&version=1.0.0&action=traceRoute&language=fr&options=ROUTESHEET,POLYLINE,POLYLINE_INDEX&format=xml&xy=7.41888,43.73252&xy=7.41806,43.73272&xy=7.41781,43.73234&xy=7.41761,43.73205&xy=7.41753,43.73195&xy=7.41745,43.73183&xy=7.4174,43.73179&xy=7.4173,43.73165&xy=7.41722,43.73164&xy=7.41697,43.73208&xy=7.417,43.73212&xy=7.41692,43.73223&xy=7.41678,43.73217&xy=7.4168,43.7321&xy=7.41639,43.7317&xy=7.41588,43.73133&xy=7.41537,43.73169&xy=7.41516,43.73184&xy=7.41461,43.73224)
* [XML+XSLT](/bgis/bnd?geoserver=default&version=1.0.0&action=traceRoute&language=fr&options=ROUTESHEET,POLYLINE,POLYLINE_INDEX&format=xml&xy=7.41888,43.73252&xy=7.41806,43.73272&xy=7.41781,43.73234&xy=7.41761,43.73205&xy=7.41753,43.73195&xy=7.41745,43.73183&xy=7.4174,43.73179&xy=7.4173,43.73165&xy=7.41722,43.73164&xy=7.41697,43.73208&xy=7.417,43.73212&xy=7.41692,43.73223&xy=7.41678,43.73217&xy=7.4168,43.7321&xy=7.41639,43.7317&xy=7.41588,43.73133&xy=7.41537,43.73169&xy=7.41516,43.73184&xy=7.41461,43.73224&xslt=/bgis/html/clt-api/xslt/en/routing.xsl)
* [JSON](/bgis/bnd?geoserver=default&version=1.0.0&action=traceRoute&language=fr&options=ROUTESHEET,POLYLINE,POLYLINE_INDEX&format=json&xy=7.41888,43.73252&xy=7.41806,43.73272&xy=7.41781,43.73234&xy=7.41761,43.73205&xy=7.41753,43.73195&xy=7.41745,43.73183&xy=7.4174,43.73179&xy=7.4173,43.73165&xy=7.41722,43.73164&xy=7.41697,43.73208&xy=7.417,43.73212&xy=7.41692,43.73223&xy=7.41678,43.73217&xy=7.4168,43.7321&xy=7.41639,43.7317&xy=7.41588,43.73133&xy=7.41537,43.73169&xy=7.41516,43.73184&xy=7.41461,43.73224)
* [JSONP](/bgis/bnd?geoserver=default&version=1.0.0&action=traceRoute&language=fr&options=ROUTESHEET,POLYLINE,POLYLINE_INDEX&format=jsonp&callback=traceRouteCallback&xy=7.41888,43.73252&xy=7.41806,43.73272&xy=7.41781,43.73234&xy=7.41761,43.73205&xy=7.41753,43.73195&xy=7.41745,43.73183&xy=7.4174,43.73179&xy=7.4173,43.73165&xy=7.41722,43.73164&xy=7.41697,43.73208&xy=7.417,43.73212&xy=7.41692,43.73223&xy=7.41678,43.73217&xy=7.4168,43.7321&xy=7.41639,43.7317&xy=7.41588,43.73133&xy=7.41537,43.73169&xy=7.41516,43.73184&xy=7.41461,43.73224)
* [GPX](/bgis/bnd?geoserver=default&version=1.0.0&action=traceRoute&language=fr&options=POLYLINE&format=gpx&xy=7.41888,43.73252&xy=7.41806,43.73272&xy=7.41781,43.73234&xy=7.41761,43.73205&xy=7.41753,43.73195&xy=7.41745,43.73183&xy=7.4174,43.73179&xy=7.4173,43.73165&xy=7.41722,43.73164&xy=7.41697,43.73208&xy=7.417,43.73212&xy=7.41692,43.73223&xy=7.41678,43.73217&xy=7.4168,43.7321&xy=7.41639,43.7317&xy=7.41588,43.73133&xy=7.41537,43.73169&xy=7.41516,43.73184&xy=7.41461,43.73224)

Specific options:
* [GPS time](/bgis/bnd?geoserver=default&version=1.0.0&action=traceRoute&language=fr&options=ROUTESHEET,POLYLINE,POLYLINE_INDEX&format=json&xy=7.066,43.616,130.0,17.6,23.1,1396241966000,11&xy=7.0664,43.6162,132.0,95.0,29.3,1396241972000,11&xy=7.0786,43.6153,128.0,119.0,61.9,1396242062000,11&xy=7.0805,43.6147,123.0,200.9,50.6,1396242077000,11&xy=7.0785,43.6117,104.0,115.8,38.1,1396242104000,11&xy=7.0787,43.6118,104.0,15.6,26.0,1396242107000,11&xy=7.0793,43.6128,111.0,76.0,26.6,1396242128000,11&xy=7.0814,43.6116,112.0,269.9,5.6,1396242172000,11&xy=7.0811,43.6117,114.0,338.7,7.5,1396242182000,11&xy=7.0812,43.6119,114.0,47.3,14.9,1396242188000,11&xy=7.0815,43.6119,112.0,127.1,8.5,1396242198000,11&xy=7.0816,43.6118,114.0,0.0,0.0,1396242288000,11)
* [Speed Ponderation](/bgis/bnd?geoserver=default&version=1.0.0&action=traceRoute&options=ROUTESHEET,POLYLINE,POLYLINE_INDEX&format=json&language=fr&transportType=CAR&criterias=&sp=1,1,ALL,CAL&sp=0.7,2,ALL,CAL&sp=0.3,3,ALL,CAL&sp=0.1,4,ALL,CAL&xy=7.41888,43.73252&xy=7.41806,43.73272&xy=7.41781,43.73234&xy=7.41761,43.73205&xy=7.41753,43.73195&xy=7.41745,43.73183&xy=7.4174,43.73179&xy=7.4173,43.73165&xy=7.41722,43.73164&xy=7.41697,43.73208&xy=7.417,43.73212&xy=7.41692,43.73223&xy=7.41678,43.73217&xy=7.4168,43.7321&xy=7.41639,43.7317&xy=7.41588,43.73133&xy=7.41537,43.73169&xy=7.41516,43.73184&xy=7.41461,43.73224)
* [Toll cost](/bgis/bnd?geoserver=default&version=1.0.0&action=traceRoute&language=fr&options=EVENT,EVT_DUPLICATE_FILTER,EVT_TOLL_COST&vf=0,0,0,0,0,NONE,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,2,2,0,0,0,0,0,EURO3&format=json&xy=7.21009,43.66523&xy=7.2047,43.66768&xy=7.20294,43.67018&xy=7.19838,43.66854&xy=7.18136,43.6645&xy=7.16393,43.66024&xy=7.15062,43.6608)
* [Corridor](/bgis/bnd?geoserver=default&version=1.0.0&action=traceRoute&language=fr&corridorRadius=150&format=json&xy=7.41888,43.73252&xy=7.41806,43.73272&xy=7.41781,43.73234&xy=7.41761,43.73205&xy=7.41753,43.73195&xy=7.41745,43.73183&xy=7.4174,43.73179&xy=7.4173,43.73165&xy=7.41722,43.73164&xy=7.41697,43.73208&xy=7.417,43.73212&xy=7.41692,43.73223&xy=7.41678,43.73217&xy=7.4168,43.7321&xy=7.41639,43.7317&xy=7.41588,43.73133&xy=7.41537,43.73169&xy=7.41516,43.73184&xy=7.41461,43.73224)
* [Fences](/bgis/bnd?geoserver=default&version=1.0.0&action=traceRoute&format=json&options=FENCE_SHAPE,POLYLINE&fence=1,CIRCLE,7.4173,43.73165,150&fence=2,POLYGON,7.07863,43.61533,7.07863,43.61533,7.08136,43.61156,7.0786,43.6153&fence=3,CIRCLE,7.41537,43.73169,200&xy=7.41888,43.73252&xy=7.41806,43.73272&xy=7.41781,43.73234&xy=7.41761,43.73205&xy=7.41753,43.73195&xy=7.41745,43.73183&xy=7.4174,43.73179&xy=7.4173,43.73165&xy=7.41722,43.73164&xy=7.41697,43.73208&xy=7.417,43.73212&xy=7.41692,43.73223&xy=7.41678,43.73217&xy=7.4168,43.7321&xy=7.41639,43.7317&xy=7.41588,43.73133&xy=7.41537,43.73169&xy=7.41516,43.73184&xy=7.41461,43.73224)
* [Road segments](/bgis/bnd?geoserver=default&version=1.0.0&action=traceRoute&language=fr&options=ROAD_SEGMENTS&format=json&xy=7.41888,43.73252&xy=7.41806,43.73272&xy=7.41781,43.73234&xy=7.41761,43.73205&xy=7.41753,43.73195&xy=7.41745,43.73183&xy=7.4174,43.73179&xy=7.4173,43.73165&xy=7.41722,43.73164&xy=7.41697,43.73208&xy=7.417,43.73212&xy=7.41692,43.73223&xy=7.41678,43.73217&xy=7.4168,43.7321&xy=7.41639,43.7317&xy=7.41588,43.73133&xy=7.41537,43.73169&xy=7.41516,43.73184&xy=7.41461,43.73224)
* [Waypoints](/bgis/bnd?geoserver=default&version=1.0.0&action=traceRoute&language=fr&options=WAYPOINTS,OFFROADS&format=json&xy=7.41888,43.73252&xy=7.41806,43.73272&xy=7.41781,43.73234&xy=7.41761,43.73205&xy=7.41753,43.73195,0,0,0,0,0,0,false,false,false,false,UNDEF,UNDEF,UNDEF,true&xy=7.41745,43.73183&xy=7.4174,43.73179&xy=7.4173,43.73165&xy=7.41722,43.73164&xy=7.41697,43.73208&xy=7.417,43.73212&xy=7.41692,43.73223&xy=7.41678,43.73217&xy=7.4168,43.7321&xy=7.41639,43.7317&xy=7.41588,43.73133&xy=7.41537,43.73169&xy=7.41516,43.73184&xy=7.41461,43.73224&xy=7.41461,43.73324,0,0,0,0,0,0,false,false,false,false,UNDEF,UNDEF,UNDEF,true&xy=7.41461,43.73334&xy=7.41461,43.73344&xy=7.41571,43.73354,0,0,0,0,0,0,false,false,false,false,UNDEF,UNDEF,UNDEF,true&xy=7.41671,43.73864)
* [Return the postal address of matched input coordinates](/bgis/bnd?geoserver=default&version=1.0.0&action=traceRoute&language=fr&options=REVGEO_POSTAL_ADDRESS&format=json&xy=7.41888,43.73252&xy=7.41806,43.73272&xy=7.41781,43.73234&xy=7.41761,43.73205&xy=7.41753,43.73195&xy=7.41745,43.73183&xy=7.4174,43.73179&xy=7.4173,43.73165&xy=7.41722,43.73164&xy=7.41697,43.73208&xy=7.417,43.73212&xy=7.41692,43.73223&xy=7.41678,43.73217&xy=7.4168,43.7321&xy=7.41639,43.7317&xy=7.41588,43.73133&xy=7.41537,43.73169&xy=7.41516,43.73184&xy=7.41461,43.73224)

Energy consumption:
* [Energy consumption](/bgis/bnd?geoserver=default&version=1.0.0&action=traceRoute&language=fr&options=ENERGY_CONSUMPTION&transportType=CAR&evf=0.75,0.012,0.693,22,1468,100,300,2.1,-2,15&format=json&xy=7.41888,43.73252&xy=7.41806,43.73272&xy=7.41781,43.73234&xy=7.41761,43.73205&xy=7.41753,43.73195&xy=7.41745,43.73183&xy=7.4174,43.73179&xy=7.4173,43.73165&xy=7.41722,43.73164&xy=7.41697,43.73208&xy=7.417,43.73212&xy=7.41692,43.73223&xy=7.41678,43.73217&xy=7.4168,43.7321&xy=7.41639,43.7317&xy=7.41588,43.73133&xy=7.41537,43.73169&xy=7.41516,43.73184&xy=7.41461,43.73224)
* [Energy consumption with end of autonomy](/bgis/bnd?geoserver=default&version=1.0.0&action=traceRoute&language=fr&options=EVENT,EVT_DUPLICATE_FILTER,EVT_ENERGY_CONSUMPTION,EVT_POLYLINE&transportType=CAR&evf=0.75,0.012,0.693,2,1468,100,300,2.1,-2,15&format=json&xy=7.41888,43.73252&xy=7.41806,43.73272&xy=7.41781,43.73234&xy=7.41761,43.73205&xy=7.41753,43.73195&xy=7.41745,43.73183&xy=7.4174,43.73179&xy=7.4173,43.73165&xy=7.41722,43.73164&xy=7.41697,43.73208&xy=7.417,43.73212&xy=7.41692,43.73223&xy=7.41678,43.73217&xy=7.4168,43.7321&xy=7.41639,43.7317&xy=7.41588,43.73133&xy=7.41537,43.73169&xy=7.41516,43.73184&xy=7.41461,43.73224)

### Traffic Information
For more details see the [documentation of traffic Information](index.html#subpage-rest_0_9_0-traffic-bnd.md).

Supported output format:
* [XML](/bgis/bnd?geoserver=default&version=1.0.0&action=traffic&language=fr&format=xml&countryCode=FRA)
* [JSON](/bgis/bnd?geoserver=default&version=1.0.0&action=traffic&language=fr&format=Json&countryCode=FRA)
* [JSONP](/bgis/bnd?geoserver=default&version=1.0.0&action=traffic&language=fr&format=Jsonp&callback=trafficCallback&countryCode=FRA)
* [Bnd Binary AlertC 1.0](/bgis/bnd?geoserver=default&version=1.0.0&action=traffic&language=fr&format=BinAc10&countryCode=FRA)
* [Bnd Json OpenLR 1.0](/bgis/bnd?geoserver=default&version=1.0.0&action=traffic&language=fr&format=BndJson10&countryCode=FRA)

Specific options:
* [Country code request](/bgis/bnd?geoserver=default&version=1.0.0&action=traffic&language=fr&format=json&countryCode=FRA)
* [Bounding Box request](/bgis/bnd?geoserver=default&version=1.0.0&action=traffic&language=fr&format=json&bbox=2.24801,48.80938,2.42045,48.90529)
* [Element id request](/bgis/bnd?geoserver=default&version=1.0.0&action=traffic&language=fr&format=json&options=STATS,ALERTC&countryCode=FRA&elementId=520407517&reverseDirection=false&timestamp=1454407008000)

* [Stat](/bgis/bnd?geoserver=default&version=1.0.0&action=traffic&language=fr&options=STATS&format=json&countryCode=FRA)
* [Polyline](/bgis/bnd?geoserver=default&version=1.0.0&action=traffic&language=fr&options=STATS,POLYLINE&format=json&countryCode=FRA)
* [OpenLR](/bgis/bnd?geoserver=default&version=1.0.0&action=traffic&language=fr&options=STATS,OPENLR&format=json&countryCode=FRA)

* [Historical traffic](/bgis/bnd?geoserver=default&version=1.0.0&action=traffic&language=fr&format=json&options=TRAFFIC_HISTORICAL&timestamp=1456234994000&bbox=2.24801,48.80938,2.42045,48.90529)

### Charging Station
For more details see the [documentation of charging Station](index.html#subpage-rest_0_9_0-chargingstation-bnd.md).

Supported output format:
* [XML](/bgis/bnd?geoserver=default&version=1.0.0&action=chargingStation&mode=REMOTE&providers=ocm&options=PATH_POINT&radius=500&maxProviderResult=10&xy=7.2727,43.6982&format=xml)
* [JSON](/bgis/bnd?geoserver=default&version=1.0.0&action=chargingStation&mode=REMOTE&providers=ocm&options=PATH_POINT&radius=500&maxProviderResult=10&xy=7.2727,43.6982&format=json)
* [JSONP](/bgis/bnd?geoserver=default&version=1.0.0&action=chargingStation&mode=REMOTE&providers=ocm&options=PATH_POINT&radius=500&maxProviderResult=10&xy=7.2727,43.6982&format=jsonp&callback=chargingStationCallback)

Connector types:
* [Get the connector type list](/bgis/bnd?geoserver=default&version=1.0.0&action=chargingStation&mode=LOCAL&providers=ocm&options=AVAILABLE_CONNECTOR_TYPES&radius=1&maxProviderResult=1&xy=0,0&format=json)

### Charging Time
For more details see the [documentation of charging Time](index.html#subpage-rest_0_9_0-chargingtime-bnd.md).

Supported output format:
* [XML](/bgis/bnd?geoserver=default&version=1.0.0&action=chargingTime&chargingPointPower=55&chargingBatteryLevel=80&evf=0.75,0.012,0.693,22,1468,100,300,2.1,-2,15,12,23&format=xml)
* [JSON](/bgis/bnd?geoserver=default&version=1.0.0&action=chargingTime&chargingPointPower=55&chargingBatteryLevel=80&evf=0.75,0.012,0.693,22,1468,100,300,2.1,-2,15,12,23&format=json)
* [JSONP](/bgis/bnd?geoserver=default&version=1.0.0&action=chargingTime&chargingPointPower=55&chargingBatteryLevel=80&evf=0.75,0.012,0.693,22,1468,100,300,2.1,-2,15,12,23&format=jsonp&callback=chargingTimeCallback)

Specific options:
* [Optimum battery charge](/bgis/bnd?geoserver=default&version=1.0.0&action=chargingTime&options=OPTIMUM_BATTERY_CHARGE&chargingPointPower=55&evf=0.75,0.012,0.693,22,1468,100,300,2.1,-2,15,12,23&format=json)

### Geo-server information
For more details see the [documentation of geo-server information](index.html#subpage-rest_0_9_0-geoserverinfo-bnd.md).

Supported output format:
* [XML](/bgis/bnd?geoserver=default&version=1.0.0&action=geoserverinfo&format=xml)
* [JSON](/bgis/bnd?geoserver=default&version=1.0.0&action=geoserverinfo&format=json)
* [JSONP](/bgis/bnd?geoserver=default&version=1.0.0&action=geoserverinfo&format=jsonp&callback=geoserverinfoCallback)

Specific options:
* [Country names in french](/bgis/bnd?geoserver=default&version=1.0.0&action=geoserverinfo&format=json&layersInfoOptions=COUNTRY_NAME&language=fr)

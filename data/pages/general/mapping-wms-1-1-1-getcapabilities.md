# WMS version 1.1.1
A Web Map Service (WMS) is a standard protocol for serving (over the Internet) georeferenced map images which a map server generates using data from a GIS database. The Open Geospatial Consortium developed the specification and first published it in 1999.


## GetCapabilities service
Returns parameters about the WMS (such as map image format and WMS version compatibility) and the available layers (map bounding box, coordinate reference systems, URI of the data and whether the layer is mostly opaque or not).


### Summary
1. Request
 1. Mandatory parameters
 2. Optional parameters
 3. Extra parameters of WMS standard
2. Response


### Request
Sample of WMS Getmap request:
```
/bgis/wms?REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS
```

#### __Mandatory parameters__

##### __REQUEST__: The nature of the required REQUEST parameter is specified in the Basic Service Elements section of OGC documentation. For GetCapabilities, the value `GetCapabilities` shall be used. 

##### __SERVICE__: Name of protocol, here is `WMS`.

##### __VERSION__: The protocol version of WMS, here is `1.1.1`.

#### __Optional parameters__

##### __FORMAT__: The optional FORMAT parameter states the desired format of the service metadata. Supported values for a GetCapabilities request on a WMS server are listed in one or more elements of its service metadata. Every server shall support the default `text/xml` format. Support for other formats is optional. The entire MIME type string in is used as the value of the FORMAT parameter. In an HTTP environment, the MIME type shall be set on the returned object using the HTTP Content-type entity header. If the request specifies a format not supported by the server, the server shall respond with the default `text/xml` format.
* Default value: `text/xml`.
* Possible exceptions is `InvalidFormatException`.   

#### __Extra parameters of WMS standard__

##### __GEOSERVER__: Geo server name. Set the name of the server configuration that will be used to perform the request.

##### __LANGUAGE__: Define the language that will be used. Objects for which defined language code is not available, default language will be used. Values language Code - An US-ASCII string that defines an ISO 639-1 (2-letter) language code. The special "IC" (or "ic") language code allows you to search for a country depending on its ISO-3166 Alpha-3 or Alpha-2 country code.
* Example for French : `&LANGUAGE=FR`.


### Response

```
{"bemap":{"language":"xml"}}
<?xml version="1.0" encoding="utf-8" standalone="no"?>
<WMT_MS_Capabilities version="1.1.1">
	<Service>
		<Name>WMS</Name>
		<Title>BeNomad Server</Title>
		<Abstract>BeNomad Server maintained by BeNomad SARL. Contact: bgis-support@benomad.com.</Abstract>
		<Keywords>benomad,server</Keywords>
		<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://bgis.benomad.com:80/" xlink:type="simple"/>
		<Fees>none</Fees>
		<AccessConstraints>none</AccessConstraints>
		<ContactInformation>
			<ContactPersonPrimary>
				<ContactPerson>Support</ContactPerson>
				<ContactOrganization>BeNomad SARL</ContactOrganization>
			</ContactPersonPrimary>
			<ContactElectronicMailAddress>bgis-support@benomad.com</ContactElectronicMailAddress>
		</ContactInformation>
	</Service>
	<Capability>
		<Request>
			<GetCapabilities>
				<DCPType>
					<HTTP>
						<Get>
							<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://localhost:8380/bgis/wms?" xlink:type="simple"/>
						</Get>
					</HTTP>
				</DCPType>
				<Format>text/xml</Format>
			</GetCapabilities>
			<GetMap>
				<DCPType>
					<HTTP>
						<Get>
							<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://localhost:8380/bgis/wms?" xlink:type="simple"/>
						</Get>
					</HTTP>
				</DCPType>
				<Format>image/png</Format>
				<Format>image/png24</Format>
				<Format>image/gif</Format>
				<Format>image/jpeg</Format>
			</GetMap>
			<GetFeatureInfo>
				<DCPType>
					<HTTP>
						<Get>
							<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="http://localhost:8380/bgis/wms?" xlink:type="simple"/>
						</Get>
					</HTTP>
				</DCPType>
				<Format>text/xml</Format>
			</GetFeatureInfo>
		</Request>
		<Exception>
			<Format>application/vnd.ogc.se_xml</Format>
			<Format>application/vnd.ogc.se_inimage</Format>
			<Format>application/vnd.ogc.se_blank</Format>
		</Exception>
		<Layer>
			<Layer opaque="1" queryable="1">
				<Name>maxCoverage</Name>
				<Title>Maximum coverage available</Title>
				<SRS>epsg:4326</SRS>
				<SRS>epsg:4979</SRS>
				<SRS>epsg:3785</SRS>
				<SRS>epsg:900913</SRS>
				<SRS>epsg:3857</SRS>
				<EX_GeographicBoundingBox>
					<westBoundLongitude>-180.0</westBoundLongitude>
					<eastBoundLongitude>180.0</eastBoundLongitude>
					<southBoundLatitude>-90.0</southBoundLatitude>
					<northBoundLatitude>90.0</northBoundLatitude>
				</EX_GeographicBoundingBox>
				<BoundingBox SRS="epsg:4326" maxx="180.0" maxy="90.0" minx="-180.0" miny="-90.0"/>
			</Layer>
		</Layer>
	</Capability>
</WMT_MS_Capabilities>
```
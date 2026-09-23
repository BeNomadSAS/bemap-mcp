# WMS version 1.3.0
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
/bgis/wms?REQUEST=GetCapabilities&VERSION=1.3.0&SERVICE=WMS
```

#### __Mandatory parameters__

##### __REQUEST__: The nature of the required REQUEST parameter is specified in the Basic Service Elements section of OGC documentation. For GetCapabilities, the value `GetCapabilities` shall be used. 

##### __SERVICE__: Name of protocol, here is `WMS`.

##### __VERSION__: The protocol version of WMS, here is `1.3.0`.

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
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<WMS_Capabilities xmlns="http://www.opengis.net/wms" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.3.0" xsi:schemaLocation="http://www.opengis.net/wms http://schemas.opengis.net/wms/1.3.0/capabilities_1_3_0.xsd">
	<Service>
		<Name>WMS</Name>
		<Title>BeNomad Server</Title>
		<Abstract>BeNomad Server maintained by BeNomad SARL. Contact: bgis-support@benomad.com.</Abstract>
		<KeywordList>
			<Keyword>benomad</Keyword>
			<Keyword>server</Keyword>
		</KeywordList>
		<OnlineResource xlink:href="http://bgis.benomad.com:80/" xlink:type="simple"/>
		<ContactInformation>
			<ContactPersonPrimary>
				<ContactPerson>Support</ContactPerson>
				<ContactOrganization>BeNomad SARL</ContactOrganization>
			</ContactPersonPrimary>
			<ContactPosition>Technical Support</ContactPosition>
			<ContactAddress>
				<AddressType>postal</AddressType>
				<Address>8 av de Dr Lefebvre</Address>
				<City>Villeneuve Loubet</City>
				<StateOrProvince>06</StateOrProvince>
				<PostCode>06270</PostCode>
				<Country>France</Country>
			</ContactAddress>
			<ContactVoiceTelephone>+33 (0) 493 730 496</ContactVoiceTelephone>
			<ContactElectronicMailAddress>bgis-support@benomad.com</ContactElectronicMailAddress>
		</ContactInformation>
		<Fees>none</Fees>
		<AccessConstraints>none</AccessConstraints>
		<LayerLimit>16</LayerLimit>
		<MaxWidth>800</MaxWidth>
		<MaxHeight>600</MaxHeight>
	</Service>
	<Capability>
		<Request>
			<GetCapabilities>
				<DCPType>
					<HTTP>
						<Get>
							<OnlineResource xlink:href="http://localhost:8380/bgis/wms?" xlink:type="simple"/>
						</Get>
						<Post>
							<OnlineResource xlink:href="http://localhost:8380/bgis/wms?" xlink:type="simple"/>
						</Post>
					</HTTP>
				</DCPType>
				<Format>text/xml</Format>
			</GetCapabilities>
			<GetMap>
				<DCPType>
					<HTTP>
						<Get>
							<OnlineResource xlink:href="http://localhost:8380/bgis/wms?" xlink:type="simple"/>
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
							<OnlineResource xlink:href="http://localhost:8380/bgis/wms?" xlink:type="simple"/>
						</Get>
					</HTTP>
				</DCPType>
				<Format>text/xml</Format>
			</GetFeatureInfo>
		</Request>
		<Exception>
			<Format>XML</Format>
			<Format>INIMAGE</Format>
			<Format>BLANK</Format>
		</Exception>
		<Layer>
			<Layer opaque="1" queryable="1">
				<Name>maxCoverage</Name>
				<Title>Maximum coverage available</Title>
				<CRS>epsg:4326</CRS>
				<CRS>epsg:4979</CRS>
				<CRS>epsg:3785</CRS>
				<CRS>epsg:900913</CRS>
				<CRS>epsg:3857</CRS>
				<EX_GeographicBoundingBox>
					<westBoundLongitude>-180.0</westBoundLongitude>
					<eastBoundLongitude>180.0</eastBoundLongitude>
					<southBoundLatitude>-90.0</southBoundLatitude>
					<northBoundLatitude>90.0</northBoundLatitude>
				</EX_GeographicBoundingBox>
				<BoundingBox CRS="epsg:4326" maxx="180.0" maxy="90.0" minx="-180.0" miny="-90.0"/>
			</Layer>
		</Layer>
	</Capability>
</WMS_Capabilities>

```
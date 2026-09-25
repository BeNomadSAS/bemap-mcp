# REST API, BND version 0.9 (Deprecate see API v1.x)


## Charging Station service
Returns the list of charging station (EVSE) around a coordinate.

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
/bgis/bnd?geoserver=default&version=1.0.0&action=chargingStation&mode=REMOTE&options=PATH_POINT&radius=500&maxProviderResult=10&xy=7.2727,43.6982&format=json
```

#### __Mandatory parameters__

##### __action__: Name of service (action), here is `chargingStation`.

##### __radius__: Define the radius in meters of search, will be used with `xy` or `corridor` parameters.

##### __version__: Version of BND protocol, here is `1.0.0`.

##### __xy__: Coordinate of center of research, will be used with `radius` parameter.
The `xy` parameter is optional if the `corridor` parameter is set.
This parameter is comma-separated list, see below the details of parameter format in order of fields value:
1. longitude: Longitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
2. latitude: Latitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
3. altitude: Altitude in meter (optional).

##### __corridor__: List of coordinate in degrees decimal (WGS84) represent the corridor of research, will be used with `radius` parameter.
The `corridor` parameter is optional if the `xy` parameter is set.
This parameter is comma-separated list, see below the details of parameter format in order of fields value:
1. longitude: Longitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
2. latitude: Latitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
3. altitude: Altitude in meter (optional).

Format:
* URL format: `&xy=longitude,latitude,altitude`.
* URL Example: `&xy=2.36136,48.81349`.
* Possible exceptions are `MissingCoordinateParameterException` and `NotValidCoordinateParameterException`.

#### __Optional parameters__

##### __callback__: Define the JSONP callback name.

##### __cnnTypeIdFilters__: Comma-separated list of one or more connector type ID, used to perform a filtration based on those connector.

##### __format__: Define the format of output.
* Default value is `XML`.
* Available values are `XML`, `JSON` and `JSONP`.   
* Possible exception is `FormatNotSupportedException`.

##### __geoserver__: Geo server name. Set the name of the server configuration that will be used to perform the request.

##### __maxPoolResult__: Define the maximum pools will be returned in response.

##### __maxProviderResult__: Define the maximum of provider item researched.

##### __mode__: Mode of charging station research.
* Available values:
 * `LOCAL`: Perform the research only with the local database or cache.
 * `REMOTE`: Transfer and perform the request research to the provider database.
 * `LOCAL_AND_REMOTE`: Perform the research on local database/cache and provider database, the results are merged in single response.
 * `LOCAL_OR_REMOTE`: Capability preference between local and remote request. If the provider have the local capability mode, the request will executed only in local. If not, the remote mode will be used (if remote is available too).
 * `REMOTE_OR_LOCAL`: Capability preference between remote and local request. If the provider have the remote capability mode, the request will be send to remote provider. If not, the local mode will be used (if local is available too).
* Default value is `LOCAL`.

##### __options__: Comma-separated list of one or more options.
* Available values:
 * `AVAILABLE_CONNECTOR_TYPES`: Return the list of available connector type supported by the server.
 * `DEPRECATED_CONNECTOR`: Include all deprecated connector types.
 * `PATH_POOL`: Depth of path limited to the pool information.
 * `PATH_STATION`: Depth of path limited to the station information.
 * `PATH_POINT`: Depth of path limited to the charging point information.
* Possible exception is `NotValidOptionsParameterException`.

##### __pointIdFilter__: Point ID filter, return only the point with the input ID.

##### __poolIdFilter__: Pool ID filter, return only the pool with the input ID.

##### __providers__: Define the provider name or list of provider name will be used for the research of charging stations. Comma-separated list of one or more providers. If not defined, all available providers will be called.

##### __stationIdFilter__: Station ID filter, return only the station with the input ID.

##### __xslt__: Add xml-stylesheet element in the header of generated XML. e.i. `<?xml-stylesheet type="text/xsl" href="/bgis/html/clt-api/xslt/en/routing.xsl"?>`.


### Response

#### Details of fields

##### __BND__: Header of BND format response.
* action: performed action (the name of called service).
* version: version of protocol used.

##### __ConnectorTypes__: List of connector type.
* count: number of connector type.

##### __ConnectorType__: Information about connector type.
* Available values:
 * id: BeMap unique identifier of connector.
 * name: Name of connector.
 * norm: Norm of connector.
 * bndSvsCodes: Array of BeNomad SVS unique identifier of connector.
 * ocmCodes: Array of Open Charge Map unique identifier of connector.
 * gireveCode: Array of Gireve unique identifier of connector.

##### __Pools__: List of pool.
* count: number of pool.

##### __Pool__: Define the pool of charging station (like a parking area):
* id: Unique identifier of pool.
* providerName: Provider name used by BeMap (bgis).
* sourceProvider: Name of the original provider.
* brand: Brand of pool.
* name: Name of pool.
* siteType: Textual description of site.
* accessibility: Define the accessibility of a pool of charging station. Available values below:
 * `NA`: Unspecified access to the area.
 * `PUBLIC: Publicly accessible area.
 * `RESTRICTED`: Controlled or restricted area access.
* availabilityStatus: Define the status of availability. Available values below:
 * `NA`: Not specified.
 * `OUT_OF_ORDER`: Out Of Order.
 * `IN_SERVICE`: In service.
 * `IN_SERVICE_FREE`: In service and free.
 * `IN_SERVICE_BUSY`: In service but busy.
 * `IN_SERVICE_RESERVED`: In service but reserved.
 * `FUTURE`: Future.
* longitude: Longitude of entrance gateway to pool access.
* latitude: Latitude of entrance gateway to pool access.
* countryCode: ISO country code.
* country: Country name.
* state: State name.
* county: County name.
* city: City name.
* postalCode: Postal code.
* district: district name.
* roadNumber: Road number.
* street: Street name.
* streetNumber: House number.
* addressComplement: Information about address.
* floorNumber: Floor number.
* phoneNumber: Phone number.
* open24x7: Pool is opened 24x7 hours.
* numberOfParkingSpace: Number of parking space in the pool (parking).
* maxNominalPower: Nominal power in kW.
* numberOfChargingPoint: Summarized of number of charging point present in pool.
* comment: Comment.
* OpeningHour: Define the opening hour (Date and time) of a pool of charging station. It's an array in JSON output format. See details below:
 * dayOfweek: Day of week.
 * start: Start time of opened pool.
 * end: End time of opened pool.
* Stations: List of stations in pool:

##### __Stations__: Define a station in a pool of charging station.
* count: number of station.

##### __Station__:
* id: Unique identifier.
* availabilityStatus: Define the status of availability. Available values below:
 * `NA`: Not specified.
 * `OUT_OF_ORDER`: Out Of Order.
 * `IN_SERVICE`: In service.
 * `IN_SERVICE_FREE`: In service and free.
 * `IN_SERVICE_BUSY`: In service but busy.
 * `IN_SERVICE_RESERVED`: In service but reserved.
 * `FUTURE`: Future.
* longitude: Longitude of station.
* latitude: Latitude of station.
* bookable: Set to true if the station is bookable.
* authenticationModes: Authentication mode. Available values below:
 * `NA`: Not specified.
 * `NO`: No Authentication.
 * `RFID_BADGE`: RFID Badge.
 * `RFID_ULTRALIGHT`: RFID Ultralight.
 * `RFID_MIFARE_CLASSIC`: RFID Badge / NFC Phone - Mifare Classic.
 * `RFID_MIFARE_DESFIRE`: RFID Badge / NFC Phone - Mifare Desfire.
 * `RFID_CALYPSO`: Calypso RFID Badge.
 * `KEYBOARD`: Keyboard key.
 * `APPS`: Applications.
 * `PHONE`: Phone.
 * `CPL_15118`: CPL 15118.
 * `RADIO_15118`: Radio 15118.
 * `PHONE_PLATFORM`: Phone (via platform).
 * `SMS`: SMS.
 * `QR_CODE`: QR Code.
 * `BARCODE`: BarCode.
 * `OTHER`: Other.
 * `NOT_FOUND`: Not found, not supported new value.
* authenticationInformation: Information about the authentication.
* paymentModes: Payment mode. Available values below:
 * `NA`: Unspecified means of payment.
 * `FREE`: Free charging service.
 * `OPERATOR_CONTRACT`: Paid charging service, operator contract.
 * `CREDIT_CARD`: Paid charging service, credit card.
 * `CASH`: Paid charging service, cash.
 * `PREPAID_CARD`: Paid charging service, prepaid card.
* paymentInformation: Information about the payment mode.
* chargingPoints: List of charging points:

##### __ChargingPoints__: List of charging points:
* count: number of charging point.

##### __ChargingPoint__: Charging point.
* id: Unique identifier.
* operatorId: Operator unique identifier.
* availabilityStatus: Define the status of availability. Available values below:
 * `NA`: Not specified.
 * `OUT_OF_ORDER`: Out Of Order.
 * `IN_SERVICE`: In service.
 * `IN_SERVICE_FREE`: In service and free.
 * `IN_SERVICE_BUSY`: In service but busy.
 * `IN_SERVICE_RESERVED`: In service but reserved.
 * `FUTURE`: Future.
* availabilityUntil: Availability available until time (Time stamp in milliseconds).
* currentType: Current type (AC/DC).
* voltage: Voltage of current.
* ampere: Ampere of current.
* nominalPower: Nominal power in kW.
* chargingSpeed: Category of charging speed. Available values below:
 * `NA`: Not available.
 * `NORMAL`: Normal.
 * `FAST`: Fast.
 * `VERY_FAST`: Very fast.
 * `ULTRA`: Ultra.
* connectorTypeIds: List of connector type id, see the ConnectorTypes list for the mapping with name or norm of the connector.
* currency: Currency ISO 4217 Code.
* tariffs: List of tariff.

##### __Tariff__:
* restriction: Price restriction, this feature will be available in next release.
* prices: List of prices.

##### __priceRestriction__:
* startTime: Start time of day (format `hh:mm`).
* endTime: End time of day (format `hh:mm`).
* startDate: Start date (format `AAAA-MM-DD`).
* endDate: End date (format `AAAA-MM-DD`).
* minKwh: Minimum used energy in kWh for this tariff to be valid.
* maxKwh: Maximum used energy in kWh for this tariff to be valid.
* minPower: Minimum power in kW for this tariff to be valid.
* maxPower: Maximum power in kW for this tariff to be valid.
* minDuration: Minimum duration in seconds for this tariff to be valid.
* maxDuration: Maximum duration in seconds for this tariff to be valid.
* dayOfWeek: List of day of the week for this tariff to be valid. Available values can be `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`.

##### __Price__:
* type: Type of price dimension. Possible values are: 
  * `FLAT`: flat fee, no unit.
  * `PARKING_TIME`: time not charging, defined in hours.
  * `ENERGY`: defined in kWh.
  * `TIME`: time charging, defined in hours.
* unit: Unit of price. Possible values are: `NA`, `PER_HOUR`, `PER_KWH`.
* price: Price per unit (excluding VAT) for this tariff dimension.
* vat: Applicable VAT percentage for this tariff dimension. If omitted, no VAT is applicable.
* minAmount: Minimum amount to be billed.


#### Response samples

XML Sample:
```
{"bemap":{"language":"xml"}}
<?xml version="1.0" encoding="UTF-8"?>
<BND action="chargingStation" version="1.0.0">
	<ConnectorTypes count="29">
		<ConnectorType id="0" name="Unspecified" norm="Unspecified" gireveCode="0" />
		<ConnectorType id="1" name="Attached cable Type 2-one phase" norm="EN62196-2" gireveCode="1" />
		<ConnectorType id="2" name="Attached cable CHAdeMO" norm="EN62196-3" gireveCode="2" />
		<ConnectorType id="3" name="Attached cable Combo-Type 2" norm="EN62196-3" gireveCode="3" />
		<ConnectorType id="4" name="Socket Domestic E, F, E+F" norm="CEE 7/5, CEE 7/4, CEE 7/7" gireveCode="4" />
		<ConnectorType id="5" name="Socket IEC60309 Industrial Blue" norm="EN60309" gireveCode="5" />
		<ConnectorType id="6" name="Socket IEC60309 Industrial Red" norm="EN60309" gireveCode="6" />
		<ConnectorType id="7" name="Attached cable Type 1" norm="EN62196-2" gireveCode="7" />
		<ConnectorType id="8" name="Socket Type 2-one phase" norm="EN62196-2" gireveCode="8" />
		<ConnectorType id="9" name="Socket Type 2-three phases" norm="EN62196-2" gireveCode="9" />
		<ConnectorType id="10" name="Socket Type 3c-three phases" norm="EN62196-2" gireveCode="10" />
		<ConnectorType id="11" name="Attached cable Type 2-three phases" norm="EN62196-2" gireveCode="11" />
		<ConnectorType id="12" name="Socket Type 3a" norm="EN62196-2" gireveCode="12" />
		<ConnectorType id="14" name="Attached cable AVCON Connector" norm="Avcon" gireveCode="14" />
		<ConnectorType id="15" name="Attached cable Tesla-Model S" norm="Tesla" gireveCode="15" />
		<ConnectorType id="16" name="Attached cable Tesla-Roadster" norm="Tesla" gireveCode="16" />
		<ConnectorType id="17" name="Socket Type 3c-one phase" norm="EN62196-2" gireveCode="17" />
		<ConnectorType id="18" name="Socket Domestic G" norm="BS 1363, IS 401 &amp; 411, MS 58" gireveCode="18" />
		<ConnectorType id="19" name="Socket Domestic J" norm="SEV 1011" gireveCode="19" />
		<ConnectorType id="20" name="Socket Domestic K" norm="Section 707-2-D1" gireveCode="20" />
		<ConnectorType id="21" name="Socket Domestic L" norm="CEI 23-16 /VII" gireveCode="21" />
		<ConnectorType id="22" name="Wireless induction" norm="Wireless induction" gireveCode="0" />
		<ConnectorType id="23" name="Other" norm="Other" gireveCode="0" />
		<ConnectorType id="24" name="Socket Domestic B" norm="Domestic B" gireveCode="0" />
		<ConnectorType id="25" name="Socket Nema 14 / 30" norm="Nema 14 / 30" gireveCode="0" />
		<ConnectorType id="26" name="Socket Nema 14 / 50" norm="Nema 14 / 50" gireveCode="0" />
		<ConnectorType id="27" name="Socket Domestic C" norm="Domestic C" gireveCode="0" />
		<ConnectorType id="28" name="Socket Nema 6 / 20" norm="Nema 6 / 20" gireveCode="0" />
		<ConnectorType id="29" name="Socket Nema 6 / 15" norm="Nema 6 / 15" gireveCode="0" />
	</ConnectorTypes>
	<Pools count="3">
		<Pool id="8E7B8BAD-23CE-4658-A938-2E9190013668" providerName="Open Charge Map Contributors" sourceProvider="OpenChargeMap" brand="Auto Bleue" name="Place Wilson" accessibility="NA" availabilityStatus="IN_SERVICE" longitude="7.273249" latitude="43.700673" countryCode="FR" country="France" city="NICE" postalCode="06000" street="Place Wilson, 2 allÃ©e Sandro Pertini" numberOfParkingSpace="2" maxNominalPower="4.0" numberOfChargingPoint="1" >
			<Stations count="1">
				<Station id="8E7B8BAD-23CE-4658-A938-2E9190013668-Station1" bookable="false" >
					<ChargingPoints count="1">
						<ChargingPoint id="13970" nominalPower="4.0" connectorTypes="27" />
					</ChargingPoints>
				</Station>
			</Stations>
		</Pool>
		<Pool id="8BDD26C7-E141-4685-A8BD-71C25A807F25" providerName="Open Charge Map Contributors" sourceProvider="OpenChargeMap" brand="Auto Bleue" name="Deloye" accessibility="NA" availabilityStatus="IN_SERVICE" longitude="7.26965389999998" latitude="43.6993942" countryCode="FR" country="France" city="NICE" postalCode="06000" street="5 rue Gustave Deloye" numberOfParkingSpace="2" maxNominalPower="4.0" numberOfChargingPoint="1" >
			<Stations count="1">
				<Station id="8BDD26C7-E141-4685-A8BD-71C25A807F25-Station1" bookable="false" >
					<ChargingPoints count="1">
						<ChargingPoint id="13966" nominalPower="4.0" connectorTypes="27" />
					</ChargingPoints>
				</Station>
			</Stations>
		</Pool>
		<Pool id="8AEF7F36-C21C-402E-877B-678E8EBCC91C" providerName="Open Charge Map Contributors" sourceProvider="OpenChargeMap" brand="Auto Bleue" name="Saint FranÃ§ois de Paule" accessibility="NA" availabilityStatus="IN_SERVICE" longitude="7.27072290000001" latitude="43.6957202" countryCode="FR" country="France" city="NICE" postalCode="06300" street="11 rue Saint FranÃ§ois de Paule" numberOfParkingSpace="2" maxNominalPower="4.0" numberOfChargingPoint="1" >
			<Stations count="1">
				<Station id="8AEF7F36-C21C-402E-877B-678E8EBCC91C-Station1" bookable="false" >
					<ChargingPoints count="1">
						<ChargingPoint id="14101" nominalPower="4.0" connectorTypes="27" />
					</ChargingPoints>
				</Station>
			</Stations>
		</Pool>
	</Pools>
</BND>
```

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
	"BND": {
		"action": "chargingStation",
		"version": "1.0.0",
		"connectorTypes": [{
				"id": "0",
				"name": "Unspecified",
				"norm": "Unspecified",
				"gireveCode": "0"
			}, {
				"id": "1",
				"name": "Attached cable Type 2-one phase",
				"norm": "EN62196-2",
				"gireveCode": "1"
			}, {
				"id": "2",
				"name": "Attached cable CHAdeMO",
				"norm": "EN62196-3",
				"gireveCode": "2"
			}, {
				"id": "3",
				"name": "Attached cable Combo-Type 2",
				"norm": "EN62196-3",
				"gireveCode": "3"
			}, {
				"id": "4",
				"name": "Socket Domestic E, F, E+F",
				"norm": "CEE 7\/5, CEE 7\/4, CEE 7\/7",
				"gireveCode": "4"
			}, {
				"id": "5",
				"name": "Socket IEC60309 Industrial Blue",
				"norm": "EN60309",
				"gireveCode": "5"
			}, {
				"id": "6",
				"name": "Socket IEC60309 Industrial Red",
				"norm": "EN60309",
				"gireveCode": "6"
			}, {
				"id": "7",
				"name": "Attached cable Type 1",
				"norm": "EN62196-2",
				"gireveCode": "7"
			}, {
				"id": "8",
				"name": "Socket Type 2-one phase",
				"norm": "EN62196-2",
				"gireveCode": "8"
			}, {
				"id": "9",
				"name": "Socket Type 2-three phases",
				"norm": "EN62196-2",
				"gireveCode": "9"
			}, {
				"id": "10",
				"name": "Socket Type 3c-three phases",
				"norm": "EN62196-2",
				"gireveCode": "10"
			}, {
				"id": "11",
				"name": "Attached cable Type 2-three phases",
				"norm": "EN62196-2",
				"gireveCode": "11"
			}, {
				"id": "12",
				"name": "Socket Type 3a",
				"norm": "EN62196-2",
				"gireveCode": "12"
			}, {
				"id": "14",
				"name": "Attached cable AVCON Connector",
				"norm": "Avcon",
				"gireveCode": "14"
			}, {
				"id": "15",
				"name": "Attached cable Tesla-Model S",
				"norm": "Tesla",
				"gireveCode": "15"
			}, {
				"id": "16",
				"name": "Attached cable Tesla-Roadster",
				"norm": "Tesla",
				"gireveCode": "16"
			}, {
				"id": "17",
				"name": "Socket Type 3c-one phase",
				"norm": "EN62196-2",
				"gireveCode": "17"
			}, {
				"id": "18",
				"name": "Socket Domestic G",
				"norm": "BS 1363, IS 401 & 411, MS 58",
				"gireveCode": "18"
			}, {
				"id": "19",
				"name": "Socket Domestic J",
				"norm": "SEV 1011",
				"gireveCode": "19"
			}, {
				"id": "20",
				"name": "Socket Domestic K",
				"norm": "Section 707-2-D1",
				"gireveCode": "20"
			}, {
				"id": "21",
				"name": "Socket Domestic L",
				"norm": "CEI 23-16 \/VII",
				"gireveCode": "21"
			}, {
				"id": "22",
				"name": "Wireless induction",
				"norm": "Wireless induction",
				"gireveCode": "0"
			}, {
				"id": "23",
				"name": "Other",
				"norm": "Other",
				"gireveCode": "0"
			}, {
				"id": "24",
				"name": "Socket Domestic B",
				"norm": "Domestic B",
				"gireveCode": "0"
			}, {
				"id": "25",
				"name": "Socket Nema 14 \/ 30",
				"norm": "Nema 14 \/ 30",
				"gireveCode": "0"
			}, {
				"id": "26",
				"name": "Socket Nema 14 \/ 50",
				"norm": "Nema 14 \/ 50",
				"gireveCode": "0"
			}, {
				"id": "27",
				"name": "Socket Domestic C",
				"norm": "Domestic C",
				"gireveCode": "0"
			}, {
				"id": "28",
				"name": "Socket Nema 6 \/ 20",
				"norm": "Nema 6 \/ 20",
				"gireveCode": "0"
			}, {
				"id": "29",
				"name": "Socket Nema 6 \/ 15",
				"norm": "Nema 6 \/ 15",
				"gireveCode": "0"
			}
		],
		"pools": [{
				"id": "8E7B8BAD-23CE-4658-A938-2E9190013668",
				"providerName": "Open Charge Map Contributors",
				"sourceProvider": "OpenChargeMap",
				"brand": "Auto Bleue",
				"name": "Place Wilson",
				"accessibility": "NA",
				"availabilityStatus": "IN_SERVICE",
				"longitude": 7.273249,
				"latitude": 43.700673,
				"countryCode": "FR",
				"country": "France",
				"city": "NICE",
				"postalCode": "06000",
				"street": "Place Wilson, 2 all\u00C3\u00A9e Sandro Pertini",
				"numberOfParkingSpace": "2",
				"maxNominalPower": 4.0,
				"numberOfChargingPoint": 1,
				"stations": [{
						"id": "8E7B8BAD-23CE-4658-A938-2E9190013668-Station1",
						"bookable": false,
						"chargingPoints": [{
								"id": "13970",
								"nominalPower": 4.0,
								"connectorTypes": [27]
							}
						]
					}
				]
			}, {
				"id": "8BDD26C7-E141-4685-A8BD-71C25A807F25",
				"providerName": "Open Charge Map Contributors",
				"sourceProvider": "OpenChargeMap",
				"brand": "Auto Bleue",
				"name": "Deloye",
				"accessibility": "NA",
				"availabilityStatus": "IN_SERVICE",
				"longitude": 7.26965389999998,
				"latitude": 43.6993942,
				"countryCode": "FR",
				"country": "France",
				"city": "NICE",
				"postalCode": "06000",
				"street": "5 rue Gustave Deloye",
				"numberOfParkingSpace": "2",
				"maxNominalPower": 4.0,
				"numberOfChargingPoint": 1,
				"stations": [{
						"id": "8BDD26C7-E141-4685-A8BD-71C25A807F25-Station1",
						"bookable": false,
						"chargingPoints": [{
								"id": "13966",
								"nominalPower": 4.0,
								"connectorTypes": [27]
							}
						]
					}
				]
			}, {
				"id": "8AEF7F36-C21C-402E-877B-678E8EBCC91C",
				"providerName": "Open Charge Map Contributors",
				"sourceProvider": "OpenChargeMap",
				"brand": "Auto Bleue",
				"name": "Saint Fran\u00C3\u00A7ois de Paule",
				"accessibility": "NA",
				"availabilityStatus": "IN_SERVICE",
				"longitude": 7.27072290000001,
				"latitude": 43.6957202,
				"countryCode": "FR",
				"country": "France",
				"city": "NICE",
				"postalCode": "06300",
				"street": "11 rue Saint Fran\u00C3\u00A7ois de Paule",
				"numberOfParkingSpace": "2",
				"maxNominalPower": 4.0,
				"numberOfChargingPoint": 1,
				"stations": [{
						"id": "8AEF7F36-C21C-402E-877B-678E8EBCC91C-Station1",
						"bookable": false,
						"chargingPoints": [{
								"id": "14101",
								"nominalPower": 4.0,
								"connectorTypes": [27]
							}
						]
					}
				]
			}
		]
	}
}
```

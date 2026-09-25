# REST API, Service version 1.0.0

## Connector of charging Station 
Returns the list of connector type used by charging station (EVSE).

### Summary
1. Request
2. Response
 1. Details of fields
 2. Response samples

### Request
The request must be sent with the HTTP method `GET`.

Sample:
```
/bgis/service/chargingstation/connector/list/1.0
```

#### __Optional parameters__

##### __deprecatedConnector__: Set `true` to include all deprecated connector types.
Default value is `false`.


### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingStation.ConnectorTypeResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingStation.ConnectorTypeResponse"}}
```


#### Response samples

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
	"types": [{
			"id": 0,
			"deprecated": true,
			"name": "Unspecified",
			"norm": "Unspecified",
			"cable": false
		}, {
			"id": 1,
			"deprecated": true,
			"name": "Attached cable Type 2-one phase",
			"norm": "EN62196-2",
			"cable": true
		}, {
			"id": 2,
			"deprecated": true,
			"name": "Attached cable CHAdeMO",
			"norm": "EN62196-3",
			"cable": true
		}, {
			"id": 3,
			"deprecated": true,
			"name": "Attached cable Combo-Type 2",
			"norm": "EN62196-3",
			"cable": true
		}, {
			"id": 4,
			"deprecated": true,
			"name": "Socket Domestic E, F, E+F",
			"norm": "CEE 7/5, CEE 7/4, CEE 7/7",
			"cable": false
		}, {
			"id": 5,
			"deprecated": true,
			"name": "Socket IEC60309 Industrial Blue",
			"norm": "EN60309",
			"cable": false
		}, {
			"id": 6,
			"deprecated": true,
			"name": "Socket IEC60309 Industrial Red",
			"norm": "EN60309",
			"cable": false
		}, {
			"id": 7,
			"deprecated": true,
			"name": "Attached cable Type 1",
			"norm": "EN62196-2",
			"cable": true
		}, {
			"id": 8,
			"deprecated": true,
			"name": "Socket Type 2-one phase",
			"norm": "EN62196-2",
			"cable": false
		}, {
			"id": 9,
			"deprecated": true,
			"name": "Socket Type 2-three phases",
			"norm": "EN62196-2",
			"cable": false
		}, {
			"id": 10,
			"deprecated": true,
			"name": "Socket Type 3c-three phases",
			"norm": "EN62196-2",
			"cable": false
		}, {
			"id": 11,
			"deprecated": true,
			"name": "Attached cable Type 2-three phases",
			"norm": "EN62196-2",
			"cable": true
		}, {
			"id": 12,
			"deprecated": true,
			"name": "Socket Type 3a",
			"norm": "EN62196-2",
			"cable": false
		}, {
			"id": 14,
			"deprecated": true,
			"name": "Attached cable AVCON Connector",
			"norm": "Avcon",
			"cable": true
		}, {
			"id": 15,
			"deprecated": true,
			"name": "Attached cable Tesla-Model S",
			"norm": "Tesla",
			"cable": true
		}, {
			"id": 16,
			"deprecated": true,
			"name": "Attached cable Tesla-Roadster",
			"norm": "Tesla",
			"cable": true
		}, {
			"id": 17,
			"deprecated": true,
			"name": "Socket Type 3c-one phase",
			"norm": "EN62196-2",
			"cable": false
		}, {
			"id": 18,
			"deprecated": true,
			"name": "Socket Domestic G",
			"norm": "BS 1363, IS 401 & 411, MS 58",
			"cable": false
		}, {
			"id": 19,
			"deprecated": true,
			"name": "Socket Domestic J",
			"norm": "SEV 1011",
			"cable": false
		}, {
			"id": 20,
			"deprecated": true,
			"name": "Socket Domestic K",
			"norm": "Section 707-2-D1",
			"cable": false
		}, {
			"id": 21,
			"deprecated": true,
			"name": "Socket Domestic L",
			"norm": "CEI 23-16 /VII",
			"cable": false
		}, {
			"id": 22,
			"deprecated": true,
			"name": "Wireless induction",
			"norm": "Wireless induction",
			"cable": false
		}, {
			"id": 23,
			"deprecated": true,
			"name": "Other",
			"norm": "Other",
			"cable": false
		}, {
			"id": 24,
			"deprecated": true,
			"name": "Socket Domestic B",
			"norm": "Domestic B",
			"cable": false
		}, {
			"id": 25,
			"deprecated": true,
			"name": "Socket Nema 14 / 30",
			"norm": "Nema 14 / 30",
			"cable": false
		}, {
			"id": 26,
			"deprecated": true,
			"name": "Socket Nema 14 / 50",
			"norm": "Nema 14 / 50",
			"cable": false
		}, {
			"id": 27,
			"deprecated": true,
			"name": "Socket Domestic C",
			"norm": "Domestic C",
			"cable": false
		}, {
			"id": 28,
			"deprecated": true,
			"name": "Socket Nema 6 / 20",
			"norm": "Nema 6 / 20",
			"cable": false
		}, {
			"id": 29,
			"deprecated": true,
			"name": "Socket Nema 6 / 15",
			"norm": "Nema 6 / 15",
			"cable": false
		}, {
			"id": 30,
			"deprecated": false,
			"name": "Undefined",
			"norm": "",
			"cable": false
		}, {
			"id": 31,
			"deprecated": false,
			"name": "Attached cable Type 1",
			"norm": "IEC 62196 / SAE J1772-2009",
			"cable": true
		}, {
			"id": 32,
			"deprecated": false,
			"name": "Attached cable Type 2",
			"norm": "IEC 62196-2 / Mennekes",
			"cable": true
		}, {
			"id": 33,
			"deprecated": false,
			"name": "Type 2",
			"norm": "IEC 62196-2 / Mennekes",
			"cable": false
		}, {
			"id": 34,
			"deprecated": false,
			"name": "Type 3A",
			"norm": "EC 62196 / Scame (single phase)",
			"cable": false
		}, {
			"id": 35,
			"deprecated": false,
			"name": "Type 3C",
			"norm": "EC 62196 / Scame (single or three phases)",
			"cable": false
		}, {
			"id": 36,
			"deprecated": false,
			"name": "Attached cable Type 4 / CHAdeMO",
			"norm": "IEC 62196   / CHAdeMO",
			"cable": true
		}, {
			"id": 37,
			"deprecated": false,
			"name": "Cable Combo1",
			"norm": "CCS with type 1 (North-America)",
			"cable": true
		}, {
			"id": 38,
			"deprecated": false,
			"name": "Cable Combo2",
			"norm": "CCS with type 2 (Europe)",
			"cable": true
		}, {
			"id": 39,
			"deprecated": false,
			"name": "Tesla S",
			"norm": "Tesla Model S (oval, 5 pin)",
			"cable": true
		}, {
			"id": 40,
			"deprecated": false,
			"name": "Tesla Supercharger US",
			"norm": "Proprietary Tesla's connector, essentially used in North-America",
			"cable": false
		}, {
			"id": 41,
			"deprecated": false,
			"name": "Industrial Blue",
			"norm": "IEC 60309 Blue (3 pin)",
			"cable": false
		}, {
			"id": 42,
			"deprecated": false,
			"name": "Industrial Red",
			"norm": "IEC 60309 red (5 pin)",
			"cable": false
		}, {
			"id": 43,
			"deprecated": false,
			"name": "Domestic Type A",
			"norm": "(aka NEMA 1-15) USA, MEX, CAN & JPN",
			"cable": false
		}, {
			"id": 44,
			"deprecated": false,
			"name": "Domestic Type B",
			"norm": "(aka NEMA 5-15, 5-20) USA, MEX, CAN & JPN",
			"cable": false
		}, {
			"id": 45,
			"deprecated": false,
			"name": "Domestic Type C",
			"norm": "EUR, Sth AM & ASIA",
			"cable": false
		}, {
			"id": 46,
			"deprecated": false,
			"name": "Domestic Type D",
			"norm": "INDIA",
			"cable": false
		}, {
			"id": 47,
			"deprecated": false,
			"name": "Domestic Type E",
			"norm": "FRA, BEL, POL, SVK, CZE",
			"cable": false
		}, {
			"id": 48,
			"deprecated": false,
			"name": "Domestic Type F",
			"norm": "(aka CEE 7/4 \"Schuko\") EUR, RUSSIA",
			"cable": false
		}, {
			"id": 49,
			"deprecated": false,
			"name": "Domestic Type G",
			"norm": "(aka BS1363 ) GBR, IRL, MLT, MAS, SIN",
			"cable": false
		}, {
			"id": 50,
			"deprecated": false,
			"name": "Domestic Type H",
			"norm": "ISRAEL",
			"cable": false
		}, {
			"id": 51,
			"deprecated": false,
			"name": "Domestic Type I",
			"norm": "(aka AS 3112/CPCS-CCC) AUS, ARG, CHN, NZL...",
			"cable": false
		}, {
			"id": 52,
			"deprecated": false,
			"name": "Domestic Type J",
			"norm": "(aka T13, SEC1011) SUI, LIE, RWA...",
			"cable": false
		}, {
			"id": 53,
			"deprecated": false,
			"name": "Domestic Type K",
			"norm": "DNK & GRL",
			"cable": false
		}, {
			"id": 54,
			"deprecated": false,
			"name": "Domestic Type L",
			"norm": "ITA, CHL",
			"cable": false
		}, {
			"id": 55,
			"deprecated": false,
			"name": "Domestic Type M",
			"norm": "ZAF, LSO, SWZ...",
			"cable": false
		}, {
			"id": 56,
			"deprecated": false,
			"name": "Domestic Type N",
			"norm": "BRA, ZAF",
			"cable": false
		}, {
			"id": 57,
			"deprecated": false,
			"name": "Domestic Type O",
			"norm": "THA",
			"cable": false
		}, {
			"id": 58,
			"deprecated": true,
			"name": "Marechal",
			"norm": "Old cars, deprecated connector",
			"cable": true
		}, {
			"id": 59,
			"deprecated": false,
			"name": "CH 15",
			"norm": "",
			"cable": false
		}, {
			"id": 60,
			"deprecated": false,
			"name": "CH 23",
			"norm": "",
			"cable": false
		}, {
			"id": 61,
			"deprecated": false,
			"name": "CH 25",
			"norm": "",
			"cable": false
		}, {
			"id": 62,
			"deprecated": false,
			"name": "NEMA 6 15",
			"norm": "",
			"cable": false
		}, {
			"id": 63,
			"deprecated": false,
			"name": "NEMA 6 20",
			"norm": "",
			"cable": false
		}, {
			"id": 64,
			"deprecated": false,
			"name": "NEMA14 30",
			"norm": "",
			"cable": false
		}, {
			"id": 65,
			"deprecated": false,
			"name": "NEMA 14 50",
			"norm": "",
			"cable": false
		}, {
			"id": 66,
			"deprecated": false,
			"name": "Wireless / Induction",
			"norm": "",
			"cable": false
		}, {
			"id": 67,
			"deprecated": false,
			"name": "Tesla Supercharger EU",
			"norm": "Tesla Supercharger located in Europe, with Type 2 connector",
			"cable": false
		}, {
			"id": 68,
			"deprecated": false,
			"name": "Other",
			"norm": "",
			"cable": false
		}
	]
}
```
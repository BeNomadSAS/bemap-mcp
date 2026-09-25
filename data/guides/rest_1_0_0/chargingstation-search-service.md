# REST API, Service version 1.0.0


## Charging Station service
Returns the list of charging station (EVSE) around a coordinate.

### Summary
1. Request
 1. Mandatory parameters
2. Response
 1. Object hierarchy
 2. Matching between Charging Station API objects and OCPI objects
 3. Details of fields
 4. Response samples



### Request
The request must be sent with the HTTP method `POST` and the HTTP header `Content-Type` set to `application/json`.

Sample:
URI: `/bgis/service/chargingstation/search/1.0`

POST data:
```
{"bemap":{"language":"javascript"}}
{
 "geoserver": "default",
 "providers": ["ocm"],
 "mode": "LOCAL_OR_REMOTE",
 "options": ["PATH_POINT"],
 "radius": 500,
 "coordinate": {
  "lon":2.3411999999999997,
  "lat":48.85693161206461
 }
}
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.


#### __Parameters__

The parameters `coordinate`, `corridor`, and `boundingBox` are mutually exclusive. Use one of them is required.

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingStation.ChargingStationSearchRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingStation.ChargingStationSearchRequest"}}
```

### Response

#### Object hierarchy

<table style="background-color:#F6F6F6;">
 <tr>
  <td>
   <p>
    <p>The response contains a list of <code>ChargingStationPool</code> objects.</p>
    <p>The <code>ChargingStationPool</code> object represents a group of stations like a parking (but not always). Each <code>ChargingStationPool</code> contains a list of <code>ChargingStation</code> objects.</p>
    <p>The <code>ChargingStation</code> object represents the physical charging station but not always, depending on the provider data. The field <code>nature</code> specifies if it is a real station or a simple hierarchical group. Each <code>ChargingStation</code> contains a list of <code>ChargingPoint</code>.</p>
    <p>The <code>ChargingPoint</code> object represents a charging point that can deliver the power charge. And each <code>ChargingPoint</code> contains a list of <code>ConnectorTypes</code>.</p>
    <p>The <code>ConnectorTypes</code> object represents the connector plug that can be plugged to the vehicle.</p>
   </p>
   <center>
```
{"bemap":{"language":"mermaid","graphid":"tree1"}}
%%{init: {'theme':'forest'}}%%
flowchart TB
pool[ChargingStationPool]
station[ChargingStation]
point[ChargingPoint]
connector[ConnectorType]
pool --o|1..n| station --o|1..n| point --o|1..n| connector
```
   </center>
  </td>
  <td align="center"><img src="images/chargingstation-station-illustration.svg"/></td>
 </tr>
</table>



#### Matching between Charging Station API objects and OCPI objects

|  Charging Station   |   OCPI    |
|:-------------------:|:---------:|
| ChargingStationPool | Location  |
| ChargingStation     | -         |
| ChargingPoint       | EVSE      |
| ConnectorType       | Connector |

>NOTE: OCPI has no mapping for the ChargingStation object.



#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingStation.ChargingStationSearchResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingStation.ChargingStationSearchResponse"}}
```

#### Response samples

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{"pools": [
      {
      "id": "670AA62E-AA71-446F-9EA9-F3037FF33BD8",
      "brand": "Tesla Motors (Worldwide)",
      "nameOfPool": "Relais Christine",
      "accessibility": "NA",
      "availabilityStatus": "IN_SERVICE",
      "longitude": 2.340142,
      "latitude": 48.854369,
      "countryCode": "FR",
      "country": "France",
      "postalCode": "75006",
      "city": "Paris",
      "street": "3 Rue Christine",
      "phoneNumber": "+33 1 40 51 60 80",
      "chargingStations": [      {
         "id": "670AA62E-AA71-446F-9EA9-F3037FF33BD8-Station1",
         "availabilityStatus": "NA",
         "chargingPoints": [         {
            "id": "138680",
            "availabilityStatus": "NA",
            "type": 39,
            "connectorTypes": [            {
               "id": 39,
               "deprecated": false,
               "name": "Tesla S",
               "norm": "Tesla Model S (oval, 5 pin)",
               "cable": true
            }],
            "currentType": "AC_THREE_PHASES",
            "voltage": 400,
            "ampere": 16,
            "power": 11
         }]
      }]
   },
      {
      "id": "D8EC81E8-6B4A-4A72-BDC5-4118B8852342",
      "nameOfPool": "Rue de l'Amiral de Coligny",
      "accessibility": "NA",
      "availabilityStatus": "NA",
      "longitude": 2.3403485000000046,
      "latitude": 48.8599749,
      "countryCode": "FR",
      "country": "France",
      "postalCode": "",
      "city": "Paris",
      "street": "Rue de l'Amiral de Coligny",
      "phoneNumber": "+33 01 53 20 09 69 "
   },
      {
      "id": "ACA8D787-975D-400F-8291-37C2EE556D0A",
      "brand": "Belib’",
      "nameOfPool": "Quai du Marche Neuf",
      "accessibility": "NA",
      "availabilityStatus": "FUTURE",
      "longitude": 2.34556,
      "latitude": 48.854057,
      "countryCode": "FR",
      "country": "France",
      "postalCode": "75004",
      "city": "Paris",
      "street": "4 QUAI DU MARCHE NEUF",
      "chargingStations": [      {
         "id": "ACA8D787-975D-400F-8291-37C2EE556D0A-Station1",
         "availabilityStatus": "NA",
         "chargingPoints":          [
                        {
               "id": "111798",
               "availabilityStatus": "NA",
               "type": 23,
               "connectorTypes": [               {
                  "id": 23,
                  "deprecated": true,
                  "name": "Other",
                  "norm": "Other",
                  "cable": false
               }],
               "currentType": "AC_THREE_PHASES",
               "power": 3
            },
                        {
               "id": "111799",
               "availabilityStatus": "NA",
               "type": 36,
               "connectorTypes": [               {
                  "id": 36,
                  "deprecated": false,
                  "name": "Attached cable Type 4 / CHAdeMO",
                  "norm": "IEC 62196   / CHAdeMO",
                  "cable": true
               }],
               "currentType": "AC_THREE_PHASES",
               "voltage": 400,
               "ampere": 32,
               "power": 22
            },
                        {
               "id": "111800",
               "availabilityStatus": "NA",
               "type": 38,
               "connectorTypes": [               {
                  "id": 38,
                  "deprecated": false,
                  "name": "Cable Combo2",
                  "norm": "CCS with type 2 (Europe)",
                  "cable": true
               }],
               "currentType": "AC_THREE_PHASES",
               "voltage": 400,
               "ampere": 32,
               "power": 22
            },
                        {
               "id": "111801",
               "availabilityStatus": "NA",
               "type": 35,
               "connectorTypes": [               {
                  "id": 35,
                  "deprecated": false,
                  "name": "Type 3C",
                  "norm": "EC 62196 / Scame (single or three phases)",
                  "cable": false
               }],
               "currentType": "AC_THREE_PHASES",
               "voltage": 400,
               "ampere": 32,
               "power": 22
            },
                        {
               "id": "111802",
               "availabilityStatus": "NA",
               "type": 32,
               "connectorTypes": [               {
                  "id": 32,
                  "deprecated": false,
                  "name": "Attached cable Type 2",
                  "norm": "IEC 62196-2 / Mennekes",
                  "cable": true
               }],
               "currentType": "AC_THREE_PHASES",
               "voltage": 400,
               "ampere": 32,
               "power": 22
            },
                        {
               "id": "111803",
               "availabilityStatus": "NA",
               "type": 35,
               "connectorTypes": [               {
                  "id": 35,
                  "deprecated": false,
                  "name": "Type 3C",
                  "norm": "EC 62196 / Scame (single or three phases)",
                  "cable": false
               }],
               "currentType": "AC_THREE_PHASES",
               "power": 3
            },
                        {
               "id": "111804",
               "availabilityStatus": "NA",
               "type": 36,
               "connectorTypes": [               {
                  "id": 36,
                  "deprecated": false,
                  "name": "Attached cable Type 4 / CHAdeMO",
                  "norm": "IEC 62196   / CHAdeMO",
                  "cable": true
               }],
               "currentType": "DC",
               "power": 3
            },
                        {
               "id": "111805",
               "availabilityStatus": "NA",
               "type": 38,
               "connectorTypes": [               {
                  "id": 38,
                  "deprecated": false,
                  "name": "Cable Combo2",
                  "norm": "CCS with type 2 (Europe)",
                  "cable": true
               }],
               "currentType": "AC_THREE_PHASES",
               "voltage": 400,
               "ampere": 32,
               "power": 22
            }
         ]
      }]
   }
]}
```

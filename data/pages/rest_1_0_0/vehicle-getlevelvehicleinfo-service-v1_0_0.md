# REST API, Service version 1.0.0



### Get level vehicle info

This API returns the list of available vehicle information for a specified brand (by ID) and level.
It can be used to populate dropdown lists (combo-boxes).
The determined parameter values will be sent to the "find vehicle" API.


HTTP method `GET`.
URI: `/bgis/service/vehicle/1.0/getlevelvehicleinfo`


Please note that when asking for an info level, all lower level info has to be provided in the request (unless they're optional ; see the specified order below), and higher level info present in the request will not be taken into account.
For example, when you try to get the available battery capacity values :
* if you do not provide a name value, the service will not work.
* if you provide a DC charge power value, it will be ignored. 


Info level priority:
1. `NAME`: select this level to retrieve a list of vehicle models.
2. `BATTERY_NAME`: select this level to retrieve a list of battery names.
3. `MOTOR_TYPE`: select this level to retrieve a list of motor types.
4. `CHARGE_POWER_DC`: select this level to retrieve a list of charge powers with DC current type.
5. `CHARGE_POWER_AC`: select this level to retrieve a list of charge powers with AC current type.


Mandatory parameters:
* `level`: defines the type of information to retrieve. Can be one of `NAME`, `BATTERY_NAME`, `MOTOR_TYPE`, `CHARGE_POWER_DC` or `CHARGE_POWER_AC`.
* `brandId`: id of the brand.


Optional parameters:
* `name`: model name of the vehicle.
* `batteryName`: battery name, a simple commercial capacity or name of battery.
* <s>`batteryCapacity`</s>: (deprecated) numeric value of the battery capacity.
* `motorType`: must be among `EV` (Electric Vehicle), `HEV` (Hybrid Electric Vehicle), `PHEV` (Plug-in Hybrid Electric Vehicle).
* `chargerPowerDC`: numeric value of the DC charger power in kW.
* `chargerPowerAC`: numeric value of the AC charger power in kW.



#### Requests sample

##### Vehicles model name

For `level` parameter set to `NAME` and `brandId` of `Audi`.

Request:
```
/bgis/service/vehicle/1.0/getlevelvehicleinfo?level=NAME&brandId=<brandId>
```

Response:
```
{"bemap":{"language":"javascript"}}
[
  "Q4 e-tron 35",
  "Q4 e-tron 40",
  "R8 e-tron",
  "e-tron 50 Quattro",
  "e-tron 55 Quattro",
  "e-tron GT Quattro",
  "e-tron GT RS",
  "e-tron Sportback 35",
  "e-tron sportback 50",
  "e-tron sportback 55"
]
```

##### Battery names

For `level` parameter set to `BATTERY_NAME`, `brandId` of `Audi` and `name` parameter set to `R8 e-tron`.

Request:
```
/bgis/service/vehicle/1.0/getlevelvehicleinfo?level=BATTERY_NAME&brandId=<brandId>&name=R8 e-tron5
```

JSON Sample:
```
{"bemap":{"language":"javascript"}}
[
  "84"
]
```
# REST API, Service version 1.1.0



### Get level vehicle info

This API returns the list of available vehicle information for a specified brand (by ID) and level.
It can be used to populate dropdown lists (combo-boxes).
The determined parameter values will be sent to the "find vehicle" API.


HTTP method `GET`.
URI: `/bgis/service/vehicle/1.1/getlevelvehicleinfo`


Please note that when requesting information for a specific level, all lower-level details must be provided in the request.
Any higher-level information included in the request will be ignored.
For example, to get a list of battery names, the level must be set to `BATTERY_NAME`, and parameters such as `brandId`, `name`, `variant` and `year` need to be defined.
It is also possible to make the same request without specifying the variant and year by defining the level at `BATTERY_NAME` and only providing the `brandId` and `name`.


Mandatory parameters:
- `level`: Defines the type of information to be returned. Available values:
  - `MOTOR_TYPE`: Returns the list of motor types.
  - `NAME`: Returns the list of vehicle model names.
  - `VARIANT`: Returns the list of vehicle model variants.
  - `YEAR`: Returns the list of vehicle model years.
  - `BATTERY_NAME`: Returns the list of vehicle battery commercial names.
  - `CHARGE_POWER_DC`: Returns the list of charging power specifications for DC current types.
  - `CHARGE_POWER_AC`: Returns the list of charging power specifications for AC current types (single-phase and three-phase).
  - `CHARGE_POWER_AC1`: Returns the list of charging power specifications for AC current (single-phase only).
  - `CHARGE_POWER_AC3`: Returns the list of charging power specifications for AC current (three-phase only).
- `brandId`: The ID of the brand.


Optional parameters:
- `name`: model name of the vehicle.
- `variant`: variant model name of the vehicle.
- `year`: year of the vehicle.
- `batteryName`: battery name, a simple commercial capacity or name of battery.
- <s>`batteryCapacity`</s>: (deprecated) numeric value of the battery capacity.
- `motorType`: must be among `EV` (Electric Vehicle), `HEV` (Hybrid Electric Vehicle), `PHEV` (Plug-in Hybrid Electric Vehicle).
- `chargerPowerDC`: numeric value of the DC charger power in kW.
- `chargerPowerAC`: numeric value of the AC charger power in kW.



#### Requests sample

##### Vehicles model name

For `level` parameter set to `NAME` and `brandId` of `Audi`.

Request:
```
/bgis/service/vehicle/1.1/getlevelvehicleinfo?level=NAME&brandId=<brandId>
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

##### Variant list

For `level` parameter set to `BATTERY_NAME`, `brandId` of `Audi` and `name` parameter set to `Q4 e-tron 4`.

Request:
```
/bgis/service/vehicle/1.1/getlevelvehicleinfo?level=VARIANT&brandId=<brandId>&name=Q4 e-tron 45&year=2023
```

Response:
```
{"bemap":{"language":"javascript"}} 
[
  "Design"
]
```

##### Battery names

For `level` parameter set to `BATTERY_NAME`, `brandId` of `Audi` and `name` parameter set to `R8 e-tron`.

Request:
```
/bgis/service/vehicle/1.1/getlevelvehicleinfo?level=BATTERY_NAME&brandId=<brandId>&name=R8 e-tron5&year=2023&variant=Design
```

Response:
```
{"bemap":{"language":"javascript"}}
[
  "84"
]
```

# REST API, BND version 0.9 (Deprecate see API v1.x)


## Charging Time service
Computes an estimated charging time, based on energy vehicle feature (evf), connector power and charge need.

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
/bgis/bnd?geoserver=defaultd&version=1.0.0&action=chargingTime&chargingPointPower=55&chargingBatteryLevel=80&evf=0.75,0.012,0.693,22,1468,100,300,2.1,-2,15,12,23&format=json
```

#### __Mandatory parameters__

##### __action__: Name of service (action), here is `chargingTime`.

##### __evf__: Energy vehicle feature used for energy consumption estimation.
This parameter is comma-separated list, see below the details of parameter format in order of fields value:
1.  scx: Product of vehicle's front area and aerodynamic coefficient (in m²).
2.  crr: Vehicle's tire rolling resistance coefficient (dimension-less, in interval ]0, 1[).
3.  engineEfficiency: Vehicle's efficiency coefficient between engine and gear (dimension-less, in interval ]0, 1[).
4.  batCapacity: Vehicle's capacity of the battery (in kWh, only if electric vehicle or hybrid re-chargeable, 0 otherwise).
5.  dryWeight: Vehicle's weight without any consumables or passengers (in kg).
6.  payload: Vehicle's extra load (consumables and passengers weight) (in kg).
7.  auxConsumption: Vehicle's instantaneous auxiliary equipments consumption (in W).
8.  maxAccel: Maximum acceleration (> 0.1, in m/s², based on vehicle's acceleration capacity and expected driving behavior).
9.  maxDecel: Maximum deceleration (< -0.1, in m/s², based on vehicle's braking capacity and expected driving behavior).
10. extTemp: Outside temperature (in °C).
11. energyLoad: Vehicle's current energy load, state of charge (in kWh).
12. maxChargePowerAc1: Maximum charge power AC single phase authorized by the vehicle (in kW).
13. maxChargePowerAc3: Maximum charge power AC three phases authorized by the vehicle (in kW).
14. maxChargePowerDc: Maximum charge power DC authorized by the vehicle (in kW).
15. regenerativeBraking: Defines if the vehicle supports regenerative braking. By default is set to `true`.
* URL format `&evf=scx,crr,engineEfficiency,batCapacity,dryWeight,payload,auxConsumption,maxAccel,maxDecel,extTemp,energyLoad,maxChargePowerAc1,maxChargePowerAc3,maxChargePowerDc,regenerativeBraking`.
* URL example `&evf=0.75,0.012,0.693,22,1468,100,300,2.1,-2,15,12,23`.
* Possible exception is `NotValidEnergyVehicleFeatureParameterException`.

##### __chargingPointPower__: Nominal power of connector of the charging station (in kW).
For a charging station can deliver 50 kW, set the value to `50`.

##### __chargingCurrentType__: Define the current type of charging point power.
* Default value is `NA`.
* Available values:
 * `NA`: Not available.
 * `AC`: Alternating current (AC), but the number of phases is not available.
 * `AC_SINGLE_PHASE`: Alternating current (AC), single phase.
 * `AC_THREE_PHASES`: Alternating current (AC), three phases.
 * `DC`: Direct current (DC).

##### __chargingBatteryLevel__: Desired level of battery after charging (in percent), 100% for a full battery charge.
For a full charge, set the value to `100`. For a charge to 80% of battery capacity set the value to `80`.

##### __version__: Version of BND protocol, here is `1.0.0`.

#### __Optional parameters__

##### __callback__: Define the JSONP callback name.

##### __format__: Define the format of output.
* Default value is `XML`.
* Available values are `XML`, `JSON` and `JSONP`.   
* Possible exception is `FormatNotSupportedException`.

##### __geoserver__: Geo server name. Set the name of the server configuration that will be used to perform the request.

##### __options__: Comma-separated list of one or more options.
* Available values:
 * `OPTIMUM_BATTERY_CHARGE`: Calculate the optimum charge level (in %) of the vehicle battery at the given charge point; Above this level, the power delivered by the charge point decreases, and the charge takes more time.
* Possible exception is `NotValidOptionsParameterException`.

##### __xslt__: Add xml-stylesheet element in the header of generated XML. e.i. `<?xml-stylesheet type="text/xsl" href="/bgis/html/clt-api/xslt/en/routing.xsl"?>`.


### Response
The calculated charging time for an electrical vehicle.

#### Details of fields

##### __BND__: Header of BND format response.
* action: performed action (the name of called service).
* version: version of protocol used.

##### __ChargingTime__: Estimated charging time (in second).

##### __OptimumBatteryChargeLevel__: The optimal charge level (in %) of the vehicle at the given charge point; Above this level, the power delivered by the charge point decreases, and the charge takes more time.


#### Response samples

XML Sample:
```
{"bemap":{"language":"xml"}}
<?xml version="1.0" encoding="UTF-8"?>
<BND action="chargingTime" version="1.0.0">
	<ChargingTime>1301</ChargingTime>
	<OptimumBatteryChargeLevel>88.0</OptimumBatteryChargeLevel>
</BND>
```

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
	"BND": {
		"action": "chargingTime",
		"version": "1.0.0",
		"chargingTime": 1301,
		"optimumBatteryChargeLevel": 88.0
	}
}
```

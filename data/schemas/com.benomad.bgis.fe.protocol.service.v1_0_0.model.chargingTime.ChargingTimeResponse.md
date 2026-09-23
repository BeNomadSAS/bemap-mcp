| Field  | Optional | Description |
|--------|----------|-------------|
| __chargingTime__ |             | The estimated charging time, based on energy vehicle profile (in seconds) or -1 in case of error (that is, if battery capacity = 0, or Connector power inferior or equals to 0, or Maximum charge power inferior or equals to 0). Type: `long`. |
| __optimumBatteryChargeLevel__ |             | The optimal charge level (in %) of the vehicle at the given charge point; Above this level, the power delivered by the charge point decreases, and the charge takes more time. Type: `double`. |

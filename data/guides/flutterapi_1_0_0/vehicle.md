# VehicleServer Class Documentation

The `VehicleServer` class is used to manage requests to the BeMap service related to vehicle information.

## Class Usage

To use the `VehicleServer` class, you don't need to create an instance of it. Since all the methods in this class are static, you can call them directly on the class itself without creating an instance.

```dart
// No need to create an instance
// VehicleServer vehicleServer = new VehicleServer();
```

### Sequential Function Calls for Vehicle Retrieval:

1. `getBrandList`: This is the first function to be called. It returns a list of vehicle brands, each with a unique brand ID.
2. `getModels(brandId)`: This function takes a brand ID as an argument and returns the models available for that brand.
3. `getBatteryCapacity(brandId, model)`: This function takes a brand ID and a model as arguments and returns the battery capacity for that model.
4. `getDc(brandId, model, batteryCapacity)`: This function takes a brand ID, a model, and a battery capacity as arguments and returns some value related to DC (Direct Current).
5. `getAc(brandId, model, batteryCapacity, dc)`: This function takes a brand ID, a model, a battery capacity, and a DC value as arguments and returns some value related to AC (Alternating Current).
6. `findVehicle(brandId, model, batteryCapacity, dc, ac)`: This is the final function in the chain. It takes a brand ID, a model, a battery capacity, a DC value, and an AC value as arguments and returns a vehicle that matches these parameters.

This chain of function calls suggests a process of narrowing down vehicle options based on brand, model, battery capacity, and electrical characteristics. Each function depends on the output of the previous one and the parameters passed to it.

## Methods

### getBrandList

This method retrieves a list of vehicle brands.

#### Parameters

None.

#### Returns

A `Future` that resolves to a list of `BrandInfo` objects.

#### Usage


```dart
try {
  Future<List<BrandInfo>> brands = VehicleServer.getBrandList();
  brands.then((brandList) {
    // Process the brands
    for (BrandInfo brand in brandList) {
      print(brand);
    }
  });
} catch (error) {
  print('An error occurred: $error');
}
```

#### Explanation

The `getBrandList` method sends a HTTP GET request to the "service/vehicle/1.0/getbrands" endpoint. The response is then processed to return a list of `BrandInfo` objects. Each `BrandInfo` object is created by calling the `fromJson` factory method on the `BrandInfo` class with the corresponding data from the response.



### getModels

This method retrieves the vehicle models for a specific brand.

#### Parameters

- `id`: The ID of the brand for which to retrieve the vehicle models.

#### Returns

A `Future` that resolves to a `ModelInfo` object.

#### Usage

```dart
String id = "someBrandId";

try {
  Future<ModelInfo> modelInfo = VehicleServer.getModels(id);
  modelInfo.then((model) {
    // Process the model
    print(model);
  });
} catch (error) {
  print('An error occurred: $error');
}
```

#### Explanation

The `getModels` method sends a HTTP GET request to the "service/vehicle/1.0/getlevelvehicleinfo" endpoint with the `level` query parameter set to "NAME" and the `brandId` query parameter set to the provided brand ID. The response is then processed to return a `ModelInfo` object. If an error occurs during the HTTP request, an empty `ModelInfo` object is returned.

### getBatteryCapacity 

The getBatteryCapacity method in the VehicleServer class retrieves the battery capacities for a specific vehicle model of a brand.

#### Parameters

- `id`: The ID of the brand for which to retrieve the battery capacities.
- `name`: The name of the model for which to retrieve the battery capacities.

#### Returns

A `Future` that resolves to a `BatteryCapacities` object.

#### Usage
```dart
String id = "someBrandId";
String name = "someModelName";

try {
  Future<BatteryCapacities> batteryCapacities = VehicleServer.getBatteryCapacity(id, name);
  batteryCapacities.then((bcs) {
    // Process the battery capacities
    print(bcs);
  });
} catch (error) {
  print('An error occurred: $error');
}
```

#### Explanation

The `getBatteryCapacity` method sends a HTTP GET request to the "service/vehicle/1.0/getlevelvehicleinfo" endpoint with the `level` query parameter set to "BATTERY_CAPACITY", the `brandId` query parameter set to the provided brand ID, and the `name` query parameter set to the provided model name. The response is then processed to return a `BatteryCapacities` object. Each `BatteryCapacities` object is created by calling the `fromJson` factory method on the `BatteryCapacities` class with the corresponding data from the response.


### getDc  

The `getDc` method in the `VehicleServer` class retrieves the DC charging information for a specific vehicle model of a brand.

#### Parameters

- `id`: The ID of the brand for which to retrieve the DC charging information.
- `name`: The name of the model for which to retrieve the DC charging information.
- `batteryCapacity`: The battery capacity of the model for which to retrieve the DC charging information.

#### Returns

A `Future` that resolves to a `DcChargingInfo` object.

#### Usage
```dart
String id = "someBrandId";
String name = "someModelName";
String batteryCapacity = "someBatteryCapacity";

try {
  Future<DcChargingInfo> dcChargingInfo = VehicleServer.getDc(id, name, batteryCapacity);
  dcChargingInfo.then((dcInfo) {
    // Process the DC charging information
    print(dcInfo);
  });
} catch (error) {
  print('An error occurred: $error');
}
```

#### Explanation

The `getDc` method sends a HTTP GET request to the "service/vehicle/1.0/getlevelvehicleinfo" endpoint with the `level` query parameter set to "DC", the `brandId` query parameter set to the provided brand ID, the `name` query parameter set to the provided model name, and the `batteryCapacity` query parameter set to the provided battery capacity. The response is then processed to return a `DcChargingInfo` object. Each `DcChargingInfo` object is created by calling the `fromJson` factory method on the `DcChargingInfo` class with the corresponding data from the response.



### getAc  

The `getAc` method in the `VehicleServer` class retrieves the AC charging information for a specific vehicle model of a brand.

#### Parameters

- `id`: The ID of the brand for which to retrieve the AC charging information.
- `name`: The name of the model for which to retrieve the AC charging information.
- `batteryCapacity`: The battery capacity of the model for which to retrieve the AC charging information.
- `dc`: The DC charging information of the model for which to retrieve the AC charging information.

#### Returns

A `Future` that resolves to an `AcChargingInfo` object.

#### Usage
```dart
String id = "someBrandId";
String name = "someModelName";
String batteryCapacity = "someBatteryCapacity";
String dc = "someDcInfo";

try {
  Future<AcChargingInfo> acChargingInfo = VehicleServer.getAc(id, name, batteryCapacity, dc);
  acChargingInfo.then((acInfo) {
    // Process the AC charging information
    print(acInfo);
  });
} catch (error) {
  print('An error occurred: $error');
}
```

#### Explanation

The `getAc` method sends a HTTP GET request to the "service/vehicle/1.0/getlevelvehicleinfo" endpoint with the `level` query parameter set to "AC", the `brandId` query parameter set to the provided brand ID, the `name` query parameter set to the provided model name, the `batteryCapacity` query parameter set to the provided battery capacity, and the `dc` query parameter set to the provided DC charging information. The response is then processed to return an `AcChargingInfo` object. Each `AcChargingInfo` object is created by calling the `fromJson` factory method on the `AcChargingInfo` class with the corresponding data from the response.



### findVehicle   

The `findVehicle` method in the `VehicleServer` class retrieves the vehicle information for a specific vehicle model of a brand.

#### Parameters

- `id`: The ID of the brand for which to retrieve the AC charging information.
- `name`: The name of the model for which to retrieve the AC charging information.
- `batteryCapacity`: The battery capacity of the model for which to retrieve the AC charging information.
- `dc`: The DC charging information of the model for which to retrieve the AC charging information.
- `ac`: The AC charging information of the model for which to retrieve the AC charging information.

#### Returns

A `Future` that resolves to a `Vehicle` object.

#### Usage
```dart
String brandId = "someBrandId";
String modelName = "someModelName";
String batteryCapacity = "someBatteryCapacity";
String dc = "someDcInfo";
String ac = "someAcInfo";

try {
  Future<Vehicle> vehicle = VehicleServer.findVehicle(brandId: brandId,
                                                      modelName: modelName,
                                                      batteryCapacity: batteryCapacity,
                                                      dc: dc,
                                                      ac: ac,);
  vehicle.then((v) {
    // Process the vehicle information
    print(v);
  });
} catch (error) {
  print('An error occurred: $error');
}
```

#### Explanation

The `findVehicle` method sends a HTTP GET request to the "service/vehicle/1.0/findvehicle" endpoint with the `brandId` query parameter set to the provided brand ID, the `modelName` query parameter set to the provided model name, the `batteryCapacity` query parameter set to the provided battery capacity, the `dc` query parameter set to the provided DC charging information, and the `ac` query parameter set to the provided AC charging information. The response is then processed to return a `Vehicle` object. Each `Vehicle` object is created by calling the `fromJson` factory method on the `Vehicle` class with the corresponding data from the response.


### getConnectorsList    

The `getConnectorsList` method in the `VehicleServer` class retrieves a list of all available connectors for electric vehicles.

#### Parameters

- This method does not take any parameters.

#### Returns

A `Future` that resolves to a `List<Connector>` object.

#### Usage
```dart
try {
  Future<List<Connector>> connectorsList = VehicleServer.getConnectorsList();
  connectorsList.then((connectors) {
    // Process the connectors list
    connectors.forEach((connector) {
      print(connector);
    });
  });
} catch (error) {
  print('An error occurred: $error');
}
```

#### Explanation

The `getConnectorsList` method sends a HTTP GET request to the "service/vehicle/1.0/getconnectors" endpoint. The response is then processed to return a list of `Connector` objects. Each `Connector` object is created by calling the `fromJson` factory method on the `Connector` class with the corresponding data from the response.


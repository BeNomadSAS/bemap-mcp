# ChargingStationsServer Class Documentation

The `ChargingStationsServer` class is used to manage requests to the BeMap service related to charging stations.

## Class Usage

To use the `ChargingStationsServer` class, you don't need to create an instance of it. Since all the methods in this class are static, you can call them directly on the class itself without creating an instance.

``````dart
// No need to create an instance
// ChargingStationsServer chargingStationsServer = new ChargingStationsServer();
``````

## Methods

### getChargingStationPools

This method retrieves a list of charging station pools based on the provided search request.

#### Parameters

- `csr`: The `ChargingStationSearchRequest` object to be sent to the server.

#### Returns

A `Future` that resolves to a list of `ChargingStationPool` objects.

#### Usage

```dart
ChargingStationSearchRequest csr = new ChargingStationSearchRequest(/* parameters */);

try {
  Future<List<ChargingStationPool>> chargingStationPools = ChargingStationsServer.getChargingStationPools(
        chargingStationSearchRequest: request,
  );
  chargingStationPools.then((pools) {
    // Process the pools
    for (ChargingStationPool pool in pools) {
      print(pool);
    }
  });
} catch (error) {
  print('An error occurred: $error');
}
```

#### Explanation

The `getChargingStationPools` method sends a HTTP POST request to the "service/chargingstation/search/1.0" endpoint with the JSON-encoded `ChargingStationSearchRequest` object. The response is then processed to return a list of `ChargingStationPool` objects. Each `ChargingStationPool` object is created by calling the `fromJson` factory method on the `ChargingStationPool` class with the corresponding data from the response.

### getChargingStationPoolsWithFilters

This method retrieves a list of charging station pools based on the provided search request and filters.

#### Parameters

- `csr`: The `ChargingStationSearchRequest` object to be sent to the server.
- `filters`: The `ChargingStationFiltersRequest` object to be used for filtering the results.

#### Returns

A `Future` that resolves to a list of `ChargingStationPool` objects.

#### Usage

```dart
ChargingStationSearchRequest csr = new ChargingStationSearchRequest(/* parameters */);
ChargingStationFiltersRequest filters = new ChargingStationFiltersRequest(/* parameters */);

try {
  Future<List<ChargingStationPool>> chargingStationPools = ChargingStationsServer.getChargingStationPoolsWithFilters(csr, filters);
  chargingStationPools.then((pools) {
    // Process the pools
    for (ChargingStationPool pool in pools) {
      print(pool);
    }
  });
} catch (error) {
  print('An error occurred: $error');
}
```

#### Explanation

The `getChargingStationPoolsWithFilters` method sends a HTTP POST request to the "service/chargingstation/search/1.0" endpoint with the JSON-encoded `ChargingStationSearchRequest` object, which includes the filters parsed from the `ChargingStationFiltersRequest` object. The response is then processed to return a list of `ChargingStationPool` objects. Each `ChargingStationPool` object is created by calling the `fromJson` factory method on the `ChargingStationPool` class with the corresponding data from the response.


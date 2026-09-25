# RoutingServer Class Documentation

The `RoutingServer` class is used to manage requests to the BeMap service related to standard routing calculations for various transportation modes.

## Class Usage

To use the `RoutingServer` class, you don't need to create an instance of it. Since all the methods in this class are static, you can call them directly on the class itself without creating an instance.

```dart
// No need to create an instance
// RoutingServer routingServer = new RoutingServer();
```

## Methods

### getRoute

This method retrieves a route based on the provided routing request.

#### Parameters

- `routingRequest`: The `RoutingRequest` object to be sent to the server.
- `id`: (optional) The ID to be appended to the URL as a query parameter.

#### Returns

A `Future` that resolves to a `RoutingResponse` object.

#### Usage

```dart
RoutingRequest request = RoutingRequest(
  destinations: [
    RoutingDestination(
      coordinateSat: CoordinateSat(lat: 48.8566, lon: 2.3522), // Paris
    ),
    RoutingDestination(
      coordinateSat: CoordinateSat(lat: 52.5200, lon: 13.4050), // Berlin
    ),
  ],
  routingCriterias: [RoutingCriteria.FASTEST],
  options: [RoutingOptions.POLYLINE, RoutingOptions.ROUTESHEET],
  outputLanguage: 'en',
);

try {
  Future<RoutingResponse> response = RoutingServer.getRoute(
    routingRequest: request,
    id: "route-123",
  );
  response.then((route) => {
    // Process the route
    print(route.routingRoutes?.first.length);
  });
} catch (error) {
  print('An error occurred: $error');
}
```

### getMatrix

This method calculates a distance/time matrix between multiple points.

#### Parameters

- `routingRequest`: The `RoutingRequest` object configured for matrix calculation.

#### Returns

A `Future` that resolves to a `RoutingResponse` object containing matrix results.

#### Usage

```dart
RoutingRequest matrixRequest = RoutingRequest(
  routingMode: RoutingMode.MODE_MATRIX,
  destinations: [
    RoutingDestination(coordinateSat: CoordinateSat(lat: 48.8566, lon: 2.3522)),
    RoutingDestination(coordinateSat: CoordinateSat(lat: 52.5200, lon: 13.4050)),
    RoutingDestination(coordinateSat: CoordinateSat(lat: 41.9028, lon: 12.4964)),
  ],
  routingCriterias: [RoutingCriteria.FASTEST],
  options: [RoutingOptions.POLYLINE],
  outputLanguage: 'en',
  matrixStartCount: 2, // First 2 points as origins
);

try {
  RoutingResponse response = await RoutingServer.getMatrix(routingRequest: matrixRequest);
  // Process matrix results
} catch (error) {
  print('Matrix calculation failed: $error');
}
```

### getIsochrone

This method generates isochrone polygons showing reachable areas within a time or distance limit.

#### Parameters

- `routingRequest`: The `RoutingRequest` object configured for isochrone calculation.

#### Returns

A `Future` that resolves to a `RoutingResponse` object containing isochrone data.

#### Usage

```dart
RoutingRequest isochroneRequest = RoutingRequest(
  routingMode: RoutingMode.MODE_ISOCHRONE,
  destinations: [
    RoutingDestination(coordinateSat: CoordinateSat(lat: 48.8566, lon: 2.3522)),
  ],
  routingCriterias: [RoutingCriteria.FASTEST],
  options: [RoutingOptions.POLYLINE],
  outputLanguage: 'en',
  isoChroneLimit: 1800, // 30 minutes
);

try {
  RoutingResponse response = await RoutingServer.getIsochrone(routingRequest: isochroneRequest);
  // Process isochrone polygon
} catch (error) {
  print('Isochrone generation failed: $error');
}
```

## Routing Modes

The routing service supports several calculation modes:

- **MODE_VIAS**: Standard route with waypoints (default)
- **MODE_1_TO_N**: One origin to multiple destinations
- **MODE_N_TO_1**: Multiple origins to one destination  
- **MODE_N_TO_N**: Multiple origins to multiple destinations
- **MODE_MATRIX**: Distance/time matrix calculation
- **MODE_ISOCHRONE**: Reachable area polygon generation

## Routing Criteria

Available routing criteria for optimization:

- **FASTEST**: Minimize travel time
- **SHORTEST**: Minimize distance
- **ECO_ENERGY**: Minimize energy consumption
- **AVOID_TOLLS**: Avoid toll roads
- **AVOID_MOTORWAYS**: Avoid highways
- **AVOID_FERRIES**: Avoid ferry routes
- **AVOID_UNPAVED**: Avoid unpaved roads

## Vehicle Profiles

For specialized routing, you can specify vehicle characteristics:

```dart
RoutingVehicleProfile vehicleProfile = RoutingVehicleProfile(
  routingVehicleFeature: RoutingVehicleFeature(
    height: 400,  // 4m height in cm
    width: 250,   // 2.5m width in cm
    length: 1200, // 12m length in cm
    weight: 400,  // 40 tons (in tens of metric tons)
  ),
);
```

## Explanation

The `getRoute` method sends an HTTP POST request to the "service/routing/1.0" endpoint with the JSON-encoded `RoutingRequest` object. If an `id` is provided, it is appended to the URL as a query parameter. The response is processed to return a `RoutingResponse` object containing route information, waypoints, and additional data based on the requested options.

For matrix and isochrone calculations, the same endpoint is used with different routing modes specified in the request. The service automatically detects the calculation type and returns appropriate results.

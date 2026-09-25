# ReverseGeocodingServer Class Documentation

The `ReverseGeocodingServer` class is used to manage requests to the BeMap service related to reverse geocoding.

## Class Usage

To use the `ReverseGeocodingServer` class, you don't need to create an instance of it. Since all the methods in this class are static, you can call them directly on the class itself without creating an instance.
```dart
// No need to create an instance
// ReverseGeocodingServer reverseGeocodingServer = new ReverseGeocodingServer();
```

## Methods

### revGeo

This method retrieves a list of geocoding items based on the provided reverse geocoding request.

#### Parameters

- `rgr`: The `ReverseGeocodingRequest` object to be sent to the server.

#### Returns

A `Future` that resolves to a list of `GeocodingItem` objects.

#### Usage

```dart
ReverseGeocodingRequest rgr = new ReverseGeocodingRequest(/* parameters */);

try {
  Future<List<GeocodingItem>> geocodingItems = ReverseGeocodingServer.revGeo(reverseGeocodingRequest: rgr);
  geocodingItems.then((items) {
    // Process the items
    for (GeocodingItem item in items) {
      print(item);
    }
  });
} catch (error) {
  print('An error occurred: $error');
}
```

#### Explanation

The `revGeo` method sends a HTTP POST request to the "service/geocoding/1.0/reverse" endpoint with the JSON-encoded `ReverseGeocodingRequest` object. The response is then processed to return a list of `GeocodingItem` objects. Each `GeocodingItem` object is created by calling the `fromJson` factory method on the `GeocodingItem` class with the corresponding data from the response.

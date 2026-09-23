# NearPoiServer Class Documentation

The `NearPoiServer` class is used to manage requests to the BeMap service related to points of interest (POIs) near a certain location.

## Class Usage

To use the `NearPoiServer` class, you don't need to create an instance of it. Since all the methods in this class are static, you can call them directly on the class itself without creating an instance.
```dart
// No need to create an instance
// NearPoiServer nearPoiServer = new NearPoiServer();
```

## Methods

### getNearPois

This method retrieves a list of points of interest (POIs) near a certain location based on the provided request.

#### Parameters

- `npr`: The `NearPoiRequest` object to be sent to the server.

#### Returns

A `Future` that resolves to a list of `NearPoint` objects.

#### Usage

```dart
NearPoiRequest npr = new NearPoiRequest(/* parameters */);

try {
  Future<List<NearPoint>> nearPois = NearPoiServer.getNearPois(nearPoiRequest: npr);
  nearPois.then((pois) {
    // Process the pois
    for (NearPoint poi in pois) {
      print(poi);
    }
  });
} catch (error) {
  print('An error occurred: $error');
}
```

#### Explanation

The `getNearPois` method sends a HTTP POST request to the "service/nearpoi/1.0" endpoint with the JSON-encoded `NearPoiRequest` object. The response is then processed to return a list of `NearPoint` objects. Each `NearPoint` object is created by calling the `fromJson` factory method on the `NearPoint` class with the corresponding data from the response.

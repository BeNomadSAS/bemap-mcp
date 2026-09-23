# AutocompleteServer Class Documentation

The `AutocompleteServer` class is used to perform geographical research based on a textual address and suggest some textual postal addresses.

## Class Usage

To use the `AutocompleteServer` class, you need to create an instance of it. However, since all the methods in this class are static, you can call them directly on the class itself without creating an instance.

```dart
// No need to create an instance
// AutocompleteServer autocompleteServer = new AutocompleteServer();
```

## Methods

### autocompleteGeocoding

This method sends a geocoding autocomplete request to a specified URL and processes the response.

#### Parameters

- `request`: The `AutocompleteGeocodingRequest` object to be sent to the server.

#### Returns

A `Future` that resolves to a list of `AutocompleteElem` objects.

#### Usage

```dart
AutocompleteGeocodingRequest request = new AutocompleteGeocodingRequest(/* parameters */);

try {
  Future<List<AutocompleteElem>> autocompleteElements = AutocompleteServer.autocompleteGeocoding(
    autocompleteGeocodingRequest: request
    );
  autocompleteElements.then((elements) {
    // Process the elements
    for (AutocompleteElem element in elements) {
      print(element);
    }
  });
} catch (error) {
  print('An error occurred: $error');
}
```

#### Explanation

The `autocompleteGeocoding` method sends a HTTP POST request to the "service/geocoding/autocomplete/1.0" endpoint with the JSON-encoded request object. If the request is successful, the function processes the `items` field from the response data. It maps over each item, converting it to an `AutocompleteElem` object using the `fromJson` factory method. It filters out any items where the `elemType` is "chainQuery". If an error occurs during the HTTP request, it is logged and rethrown as an `Exception`.

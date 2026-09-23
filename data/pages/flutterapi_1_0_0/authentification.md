# BeMapConexion Class Documentation

The `BeMapConexion` class is used to manage the connection to the BeMap service.

## Class Usage

To use the `BeMapConexion` class, you need to create an instance of it. However, since all the methods in this class are static, you can call them directly on the class itself without creating an instance.

```dart
// No need to create an instance
// BeMapConexion beMapConexion = new BeMapConexion();
```

## Methods

### connect

This method sets up the connection to the BeMap service.

#### Parameters

- `bemapContext`: The `BemapContext` object to be used for the connection.

#### Returns

Does not return a value.

#### Usage
```dart
BemapContext bemapContext = new BemapContext(/* parameters */);

try {
  BeMapConexion.connect(
    bemapContext: bemapContext
    );
} catch (error) {
  print('An error occurred: $error');
}
```

#### Explanation

The `connect` method sets the `bemapContext` static field to the provided `BemapContext` object. It then calls the `getDirectoryForLogRecord` method and when it completes, it sets up a `FileOutput` object with the file returned by `getDirectoryForLogRecord`. It also sets up a `ConsoleOutput` object. Both of these are added to a list of `LogOutput` objects.

A new `Logger` object is then created with the debug level set based on the `debug` field of the `bemapContext` object. The logger is also set up with a `PrettyPrinter` and a `MultiOutput` with the list of `LogOutput` objects.



### getContext

This method retrieves the BeMap context.

#### Returns

A `BemapContext` object.

#### Usage

```dart
BemapContext context = BeMapConexion.getContext();
```


### getAppId

This method retrieves the application ID.

#### Returns

A `String` representing the application ID.

#### Usage
```dart
String appId = BeMapConexion.getAppId();
```



### getAppCode

This method retrieves the application code.

#### Returns

A `String` representing the application code.

#### Usage
```dart
String appCode = BeMapConexion.getAppCode();
```


### getUrl

This method retrieves the URL.

#### Returns

A `String` representing the URL.

#### Usage
```dart
String url = BeMapConexion.getUrl();
```


### getChargingStationsGeoserver

This method retrieves the charging stations geoserver.

#### Returns

A `String` representing the charging stations geoserver.

#### Usage
```dart
String geoserver = BeMapConexion.getChargingStationsGeoserver();
```


### getChargingStationsProvider

This method retrieves the charging stations provider.

#### Returns

A `String` representing the charging stations provider.

#### Usage
```dart
String provider = BeMapConexion.getChargingStationsProvider();
```

# Flutter API v1.0.0

This flutter librairy was based and mapped on BeMap 3.40.

## Sections

### Getting started
- [Authentication](index.html#subpage-flutterapi_1_0_0-authentification.md) — connect to BeMap

### Mapping
- [Mapping](index.html#subpage-flutterapi_1_0_0-mapping.md) — display a map

### Search
- [Autocomplete](index.html#subpage-flutterapi_1_0_0-autocomplete.md)
- [Reverse geocoding](index.html#subpage-flutterapi_1_0_0-reverse_geocoding.md)
- [Near POI](index.html#subpage-flutterapi_1_0_0-near_poi.md)

### Routing
- [Routing](index.html#subpage-flutterapi_1_0_0-routing.md)
- [EV smart routing](index.html#subpage-flutterapi_1_0_0-ev_smart_routing.md)

### Electric mobility
- [Charging stations](index.html#subpage-flutterapi_1_0_0-charging_stations.md)
- [Vehicles](index.html#subpage-flutterapi_1_0_0-vehicle.md)

## Project Setup and Requirements
- [Flutter](https://flutter.dev/docs/get-started/install) SDK installed
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for version control

## Flutter BeMap API Library

### Overview
This Flutter library serves as a proxy for calling BeMap APIs. It provides a convenient and unified way for Flutter applications to communicate with BeMap APIs. 

### Technical Details
The Flutter BeMap library communicates with the BeMap APIs through HTTP requests. The HTTP requests are made using the `dart:io` library and the `http` package. The response from the BeMap APIs is then parsed and returned as a BeMap object.

### Usage
To use the Flutter BeMap API Library, follow the steps below:

1. Add the following dependency to your `pubspec.yaml` file: (for this moment is only possible to do this by url)
<!-- ```be_map_flutter_api: <latest_version>``` -->
```be_map_flutter_api:```
    ```path: '../bemap-flutter-api'```

2. Call connexion methode and pass the BeMapContext request with required parameters to connect to the BeMap:

```BemapContext```

```BeMapConexion.connect(bemapContext);```  

2. Import the library in your Flutter code:

```import 'package:be_map_flutter_api/your_desired_class.dart';```

3. Call the desired BeMap API method by passing in the necessary parameters and retrieving the response

## Documentation
To generate static documentation you can use command ```dart doc```







# Mapping

## Using flutter_map Dependency for Mapping

To integrate mapping functionality into your Flutter application, you need to install the `flutter_map` dependency. This package provides the necessary tools and components to incorporate interactive maps seamlessly into your application.


## What is flutter_map?

`flutter_map` is a Flutter package that provides a convenient way to display interactive maps in Flutter applications. It allows you to integrate maps from various providers, customize map layers, markers, and controls, and handle user interactions with the map.

## How to Use flutter_map

### 1. Add flutter_map Dependency

First, you need to add the `flutter_map` dependency to your Flutter project. You can do this by adding the following line to your `pubspec.yaml` file under the `dependencies` section:

```yaml
dependencies:
  flutter_map: ^6.1.0
```

After adding the dependency, run flutter pub get in your terminal to install the package.

### 2. Import flutter_map Package
Next, import the flutter_map package in your Dart code where you want to use maps. Add the following import statement at the beginning of your Dart file:

```yaml
import 'package:flutter_map/flutter_map.dart';
```
### 3. Use flutter_map Widget
Now, you can use the FlutterMap widget provided by flutter_map to display maps in your application. Here's a basic example of how to use it:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

class MapScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Map Example'),
      ),
      body: FlutterMap(
        options: MapOptions(
          center: LatLng(51.5, -0.09),
          zoom: 13.0,
        ),
        layers: [
            TileLayerOptions(
                wmsOptions: WMSTileLayerOptions(
                    baseUrl: '${BeMapConexion.getUrl()}wms?&STYLES=',
                    format: "image/png",
                    layers: ["default"],
                    otherParameters: {
                    "appid": BeMapConexion.getAppId(),
                    "appcode": BeMapConexion.getAppCode(),
                    "LAYERS": "",
                    "VERSION": "1.1.1",
                    "FORMAT": "image%2Fpng",
                    "SRS": "EPSG%3A4326",
                    "EXCEPTIONS": "application%2Fvnd.ogc.se_inimage",
                    "SERVICE": "WMS",
                    "REQUEST": "GetMap",
                    },
                ),
            );
        ],
      ),
    );
  }
}
```
## Conclusion

By using the `flutter_map` dependency, you can easily integrate maps into your Flutter application even if you don't have access to a proper mapping API. Explore the `flutter_map` documentation and examples to customize your maps according to your application's needs.

## Additional Resources

- [flutter_map GitHub Repository](https://github.com/fleaflet/flutter_map)
- [flutter_map Documentation](https://pub.dev/packages/flutter_map)
- [flutter_map Examples](https://github.com/fleaflet/flutter_map#examples)

Feel free to reach out if you have any questions or need further assistance in integrating maps into your Flutter application using `flutter_map`.


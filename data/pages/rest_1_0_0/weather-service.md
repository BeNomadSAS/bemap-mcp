# REST API, Service version 1.0.0



## Weather service
Get the weather forecast for a location (city and coordinates).



### Request
The request must be sent with the HTTP method `POST` and the HTTP header `Content-Type` set to `application/json`.

**Sample:**

End-point URI: `/bgis/service/weather/1.0`.

HTTP header: `Content-Type: application/json`.

POST data:
```
{"bemap":{"language":"javascript"}}
{
    "provider": "owm",
    "current": true,
    "forecast": false,
    "coord": {
        "lon": 2.3412,
        "lat": 48.85693
    }
}
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.



#### __Parameters__

The parameters `coord`, `city`, `cp` and `id` is listed below at optional, but, one of it must be used in request.

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.weather.WeatherRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.weather.WeatherRequest"}}
```



### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.weather.WeatherResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.weather.WeatherResponse"}}
```



#### Response samples

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
    "currentWeather": {
        "datetime": 1721229428000,
        "datetimeTxt": "Wed Jul 17 17:17:08 CEST 2024",
        "location": {
            "providerId": "6269531",
            "city": "Paris 01 Louvre",
            "coordinate": {
                "lon": 2.3412,
                "lat": 48.8569
            }
        },
        "conditions": [
            {
                "providerId": "01d",
                "condition": "Clear",
                "description": "clear sky",
                "providerIcon": "01d"
            }
        ],
        "temperature": {
            "temperature": 26.0,
            "minimum": 24.55,
            "maximum": 27.24
        },
        "humidity": 38.0,
        "pressure": null,
        "cloud": 0.0,
        "wind": {
            "speed": 2.06,
            "heading": 300.0
        },
        "rainVolume3h": null,
        "snowVolume3h": null
    },
    "forecast": {
        "weathers": [
            {
                "datetime": 1721239200000,
                "datetimeTxt": "Wed Jul 17 20:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "01d",
                        "condition": "Clear",
                        "description": "clear sky",
                        "providerIcon": "01d"
                    }
                ],
                "temperature": {
                    "temperature": 25.87,
                    "minimum": 25.59,
                    "maximum": 25.87
                },
                "humidity": 38.0,
                "pressure": null,
                "cloud": 9.0,
                "wind": {
                    "speed": 1.35,
                    "heading": 92.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721250000000,
                "datetimeTxt": "Wed Jul 17 23:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "04n",
                        "condition": "Clouds",
                        "description": "broken clouds",
                        "providerIcon": "04n"
                    }
                ],
                "temperature": {
                    "temperature": 23.52,
                    "minimum": 22.27,
                    "maximum": 23.52
                },
                "humidity": 51.0,
                "pressure": null,
                "cloud": 55.0,
                "wind": {
                    "speed": 1.9,
                    "heading": 97.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721260800000,
                "datetimeTxt": "Thu Jul 18 02:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "04n",
                        "condition": "Clouds",
                        "description": "overcast clouds",
                        "providerIcon": "04n"
                    }
                ],
                "temperature": {
                    "temperature": 20.06,
                    "minimum": 20.06,
                    "maximum": 20.06
                },
                "humidity": 62.0,
                "pressure": null,
                "cloud": 93.0,
                "wind": {
                    "speed": 1.29,
                    "heading": 90.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721271600000,
                "datetimeTxt": "Thu Jul 18 05:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "04n",
                        "condition": "Clouds",
                        "description": "overcast clouds",
                        "providerIcon": "04n"
                    }
                ],
                "temperature": {
                    "temperature": 18.56,
                    "minimum": 18.56,
                    "maximum": 18.56
                },
                "humidity": 71.0,
                "pressure": null,
                "cloud": 100.0,
                "wind": {
                    "speed": 1.33,
                    "heading": 84.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721282400000,
                "datetimeTxt": "Thu Jul 18 08:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "04d",
                        "condition": "Clouds",
                        "description": "overcast clouds",
                        "providerIcon": "04d"
                    }
                ],
                "temperature": {
                    "temperature": 19.13,
                    "minimum": 19.13,
                    "maximum": 19.13
                },
                "humidity": 66.0,
                "pressure": null,
                "cloud": 100.0,
                "wind": {
                    "speed": 1.46,
                    "heading": 96.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721293200000,
                "datetimeTxt": "Thu Jul 18 11:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "04d",
                        "condition": "Clouds",
                        "description": "overcast clouds",
                        "providerIcon": "04d"
                    }
                ],
                "temperature": {
                    "temperature": 24.28,
                    "minimum": 24.28,
                    "maximum": 24.28
                },
                "humidity": 49.0,
                "pressure": null,
                "cloud": 96.0,
                "wind": {
                    "speed": 1.9,
                    "heading": 94.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721304000000,
                "datetimeTxt": "Thu Jul 18 14:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "04d",
                        "condition": "Clouds",
                        "description": "broken clouds",
                        "providerIcon": "04d"
                    }
                ],
                "temperature": {
                    "temperature": 28.41,
                    "minimum": 28.41,
                    "maximum": 28.41
                },
                "humidity": 36.0,
                "pressure": null,
                "cloud": 72.0,
                "wind": {
                    "speed": 2.33,
                    "heading": 105.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721314800000,
                "datetimeTxt": "Thu Jul 18 17:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "03d",
                        "condition": "Clouds",
                        "description": "scattered clouds",
                        "providerIcon": "03d"
                    }
                ],
                "temperature": {
                    "temperature": 29.68,
                    "minimum": 29.68,
                    "maximum": 29.68
                },
                "humidity": 34.0,
                "pressure": null,
                "cloud": 45.0,
                "wind": {
                    "speed": 3.01,
                    "heading": 119.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721325600000,
                "datetimeTxt": "Thu Jul 18 20:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "04d",
                        "condition": "Clouds",
                        "description": "broken clouds",
                        "providerIcon": "04d"
                    }
                ],
                "temperature": {
                    "temperature": 28.02,
                    "minimum": 28.02,
                    "maximum": 28.02
                },
                "humidity": 40.0,
                "pressure": null,
                "cloud": 53.0,
                "wind": {
                    "speed": 3.2,
                    "heading": 121.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721336400000,
                "datetimeTxt": "Thu Jul 18 23:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "04n",
                        "condition": "Clouds",
                        "description": "overcast clouds",
                        "providerIcon": "04n"
                    }
                ],
                "temperature": {
                    "temperature": 24.26,
                    "minimum": 24.26,
                    "maximum": 24.26
                },
                "humidity": 60.0,
                "pressure": null,
                "cloud": 100.0,
                "wind": {
                    "speed": 1.58,
                    "heading": 95.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721347200000,
                "datetimeTxt": "Fri Jul 19 02:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "04n",
                        "condition": "Clouds",
                        "description": "overcast clouds",
                        "providerIcon": "04n"
                    }
                ],
                "temperature": {
                    "temperature": 22.2,
                    "minimum": 22.2,
                    "maximum": 22.2
                },
                "humidity": 70.0,
                "pressure": null,
                "cloud": 99.0,
                "wind": {
                    "speed": 1.41,
                    "heading": 81.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721358000000,
                "datetimeTxt": "Fri Jul 19 05:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "04n",
                        "condition": "Clouds",
                        "description": "overcast clouds",
                        "providerIcon": "04n"
                    }
                ],
                "temperature": {
                    "temperature": 20.73,
                    "minimum": 20.73,
                    "maximum": 20.73
                },
                "humidity": 75.0,
                "pressure": null,
                "cloud": 96.0,
                "wind": {
                    "speed": 1.23,
                    "heading": 78.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721368800000,
                "datetimeTxt": "Fri Jul 19 08:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "04d",
                        "condition": "Clouds",
                        "description": "overcast clouds",
                        "providerIcon": "04d"
                    }
                ],
                "temperature": {
                    "temperature": 21.49,
                    "minimum": 21.49,
                    "maximum": 21.49
                },
                "humidity": 72.0,
                "pressure": null,
                "cloud": 97.0,
                "wind": {
                    "speed": 1.24,
                    "heading": 91.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721379600000,
                "datetimeTxt": "Fri Jul 19 11:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "04d",
                        "condition": "Clouds",
                        "description": "broken clouds",
                        "providerIcon": "04d"
                    }
                ],
                "temperature": {
                    "temperature": 26.96,
                    "minimum": 26.96,
                    "maximum": 26.96
                },
                "humidity": 51.0,
                "pressure": null,
                "cloud": 83.0,
                "wind": {
                    "speed": 1.19,
                    "heading": 84.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721390400000,
                "datetimeTxt": "Fri Jul 19 14:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "04d",
                        "condition": "Clouds",
                        "description": "broken clouds",
                        "providerIcon": "04d"
                    }
                ],
                "temperature": {
                    "temperature": 32.02,
                    "minimum": 32.02,
                    "maximum": 32.02
                },
                "humidity": 32.0,
                "pressure": null,
                "cloud": 51.0,
                "wind": {
                    "speed": 0.5,
                    "heading": 112.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721401200000,
                "datetimeTxt": "Fri Jul 19 17:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "01d",
                        "condition": "Clear",
                        "description": "clear sky",
                        "providerIcon": "01d"
                    }
                ],
                "temperature": {
                    "temperature": 33.3,
                    "minimum": 33.3,
                    "maximum": 33.3
                },
                "humidity": 28.0,
                "pressure": null,
                "cloud": 8.0,
                "wind": {
                    "speed": 0.4,
                    "heading": 179.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721412000000,
                "datetimeTxt": "Fri Jul 19 20:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "01d",
                        "condition": "Clear",
                        "description": "clear sky",
                        "providerIcon": "01d"
                    }
                ],
                "temperature": {
                    "temperature": 30.71,
                    "minimum": 30.71,
                    "maximum": 30.71
                },
                "humidity": 37.0,
                "pressure": null,
                "cloud": 10.0,
                "wind": {
                    "speed": 1.27,
                    "heading": 324.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721422800000,
                "datetimeTxt": "Fri Jul 19 23:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "02n",
                        "condition": "Clouds",
                        "description": "few clouds",
                        "providerIcon": "02n"
                    }
                ],
                "temperature": {
                    "temperature": 26.96,
                    "minimum": 26.96,
                    "maximum": 26.96
                },
                "humidity": 54.0,
                "pressure": null,
                "cloud": 11.0,
                "wind": {
                    "speed": 2.26,
                    "heading": 30.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721433600000,
                "datetimeTxt": "Sat Jul 20 02:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "01n",
                        "condition": "Clear",
                        "description": "clear sky",
                        "providerIcon": "01n"
                    }
                ],
                "temperature": {
                    "temperature": 24.54,
                    "minimum": 24.54,
                    "maximum": 24.54
                },
                "humidity": 64.0,
                "pressure": null,
                "cloud": 6.0,
                "wind": {
                    "speed": 1.69,
                    "heading": 84.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721444400000,
                "datetimeTxt": "Sat Jul 20 05:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "03n",
                        "condition": "Clouds",
                        "description": "scattered clouds",
                        "providerIcon": "03n"
                    }
                ],
                "temperature": {
                    "temperature": 23.15,
                    "minimum": 23.15,
                    "maximum": 23.15
                },
                "humidity": 70.0,
                "pressure": null,
                "cloud": 42.0,
                "wind": {
                    "speed": 1.3,
                    "heading": 136.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721455200000,
                "datetimeTxt": "Sat Jul 20 08:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "04d",
                        "condition": "Clouds",
                        "description": "broken clouds",
                        "providerIcon": "04d"
                    }
                ],
                "temperature": {
                    "temperature": 23.72,
                    "minimum": 23.72,
                    "maximum": 23.72
                },
                "humidity": 71.0,
                "pressure": null,
                "cloud": 71.0,
                "wind": {
                    "speed": 1.25,
                    "heading": 144.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721466000000,
                "datetimeTxt": "Sat Jul 20 11:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "10d",
                        "condition": "Rain",
                        "description": "light rain",
                        "providerIcon": "10d"
                    }
                ],
                "temperature": {
                    "temperature": 27.93,
                    "minimum": 27.93,
                    "maximum": 27.93
                },
                "humidity": 58.0,
                "pressure": null,
                "cloud": 64.0,
                "wind": {
                    "speed": 2.51,
                    "heading": 157.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721476800000,
                "datetimeTxt": "Sat Jul 20 14:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "03d",
                        "condition": "Clouds",
                        "description": "scattered clouds",
                        "providerIcon": "03d"
                    }
                ],
                "temperature": {
                    "temperature": 31.96,
                    "minimum": 31.96,
                    "maximum": 31.96
                },
                "humidity": 43.0,
                "pressure": null,
                "cloud": 36.0,
                "wind": {
                    "speed": 3.68,
                    "heading": 193.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721487600000,
                "datetimeTxt": "Sat Jul 20 17:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "03d",
                        "condition": "Clouds",
                        "description": "scattered clouds",
                        "providerIcon": "03d"
                    }
                ],
                "temperature": {
                    "temperature": 31.83,
                    "minimum": 31.83,
                    "maximum": 31.83
                },
                "humidity": 42.0,
                "pressure": null,
                "cloud": 37.0,
                "wind": {
                    "speed": 4.32,
                    "heading": 225.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721498400000,
                "datetimeTxt": "Sat Jul 20 20:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "10d",
                        "condition": "Rain",
                        "description": "light rain",
                        "providerIcon": "10d"
                    }
                ],
                "temperature": {
                    "temperature": 28.52,
                    "minimum": 28.52,
                    "maximum": 28.52
                },
                "humidity": 48.0,
                "pressure": null,
                "cloud": 23.0,
                "wind": {
                    "speed": 5.25,
                    "heading": 255.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721509200000,
                "datetimeTxt": "Sat Jul 20 23:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "10n",
                        "condition": "Rain",
                        "description": "light rain",
                        "providerIcon": "10n"
                    }
                ],
                "temperature": {
                    "temperature": 25.28,
                    "minimum": 25.28,
                    "maximum": 25.28
                },
                "humidity": 59.0,
                "pressure": null,
                "cloud": 52.0,
                "wind": {
                    "speed": 4.29,
                    "heading": 271.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721520000000,
                "datetimeTxt": "Sun Jul 21 02:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "10n",
                        "condition": "Rain",
                        "description": "light rain",
                        "providerIcon": "10n"
                    }
                ],
                "temperature": {
                    "temperature": 22.19,
                    "minimum": 22.19,
                    "maximum": 22.19
                },
                "humidity": 76.0,
                "pressure": null,
                "cloud": 69.0,
                "wind": {
                    "speed": 2.77,
                    "heading": 282.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721530800000,
                "datetimeTxt": "Sun Jul 21 05:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "04n",
                        "condition": "Clouds",
                        "description": "overcast clouds",
                        "providerIcon": "04n"
                    }
                ],
                "temperature": {
                    "temperature": 20.65,
                    "minimum": 20.65,
                    "maximum": 20.65
                },
                "humidity": 81.0,
                "pressure": null,
                "cloud": 100.0,
                "wind": {
                    "speed": 2.32,
                    "heading": 252.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721541600000,
                "datetimeTxt": "Sun Jul 21 08:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "04d",
                        "condition": "Clouds",
                        "description": "overcast clouds",
                        "providerIcon": "04d"
                    }
                ],
                "temperature": {
                    "temperature": 20.05,
                    "minimum": 20.05,
                    "maximum": 20.05
                },
                "humidity": 79.0,
                "pressure": null,
                "cloud": 94.0,
                "wind": {
                    "speed": 2.65,
                    "heading": 268.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721552400000,
                "datetimeTxt": "Sun Jul 21 11:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "10d",
                        "condition": "Rain",
                        "description": "light rain",
                        "providerIcon": "10d"
                    }
                ],
                "temperature": {
                    "temperature": 23.21,
                    "minimum": 23.21,
                    "maximum": 23.21
                },
                "humidity": 63.0,
                "pressure": null,
                "cloud": 63.0,
                "wind": {
                    "speed": 2.7,
                    "heading": 252.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721563200000,
                "datetimeTxt": "Sun Jul 21 14:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "10d",
                        "condition": "Rain",
                        "description": "light rain",
                        "providerIcon": "10d"
                    }
                ],
                "temperature": {
                    "temperature": 25.74,
                    "minimum": 25.74,
                    "maximum": 25.74
                },
                "humidity": 49.0,
                "pressure": null,
                "cloud": 72.0,
                "wind": {
                    "speed": 3.6,
                    "heading": 269.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721574000000,
                "datetimeTxt": "Sun Jul 21 17:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "04d",
                        "condition": "Clouds",
                        "description": "broken clouds",
                        "providerIcon": "04d"
                    }
                ],
                "temperature": {
                    "temperature": 26.23,
                    "minimum": 26.23,
                    "maximum": 26.23
                },
                "humidity": 46.0,
                "pressure": null,
                "cloud": 71.0,
                "wind": {
                    "speed": 4.36,
                    "heading": 274.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721584800000,
                "datetimeTxt": "Sun Jul 21 20:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "10d",
                        "condition": "Rain",
                        "description": "light rain",
                        "providerIcon": "10d"
                    }
                ],
                "temperature": {
                    "temperature": 22.77,
                    "minimum": 22.77,
                    "maximum": 22.77
                },
                "humidity": 66.0,
                "pressure": null,
                "cloud": 77.0,
                "wind": {
                    "speed": 3.66,
                    "heading": 301.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721595600000,
                "datetimeTxt": "Sun Jul 21 23:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "03n",
                        "condition": "Clouds",
                        "description": "scattered clouds",
                        "providerIcon": "03n"
                    }
                ],
                "temperature": {
                    "temperature": 20.84,
                    "minimum": 20.84,
                    "maximum": 20.84
                },
                "humidity": 67.0,
                "pressure": null,
                "cloud": 44.0,
                "wind": {
                    "speed": 3.45,
                    "heading": 302.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721606400000,
                "datetimeTxt": "Mon Jul 22 02:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "04n",
                        "condition": "Clouds",
                        "description": "broken clouds",
                        "providerIcon": "04n"
                    }
                ],
                "temperature": {
                    "temperature": 18.89,
                    "minimum": 18.89,
                    "maximum": 18.89
                },
                "humidity": 76.0,
                "pressure": null,
                "cloud": 59.0,
                "wind": {
                    "speed": 3.51,
                    "heading": 285.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721617200000,
                "datetimeTxt": "Mon Jul 22 05:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "02n",
                        "condition": "Clouds",
                        "description": "few clouds",
                        "providerIcon": "02n"
                    }
                ],
                "temperature": {
                    "temperature": 16.28,
                    "minimum": 16.28,
                    "maximum": 16.28
                },
                "humidity": 73.0,
                "pressure": null,
                "cloud": 11.0,
                "wind": {
                    "speed": 3.45,
                    "heading": 275.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721628000000,
                "datetimeTxt": "Mon Jul 22 08:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "01d",
                        "condition": "Clear",
                        "description": "clear sky",
                        "providerIcon": "01d"
                    }
                ],
                "temperature": {
                    "temperature": 15.66,
                    "minimum": 15.66,
                    "maximum": 15.66
                },
                "humidity": 72.0,
                "pressure": null,
                "cloud": 9.0,
                "wind": {
                    "speed": 3.19,
                    "heading": 281.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721638800000,
                "datetimeTxt": "Mon Jul 22 11:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "04d",
                        "condition": "Clouds",
                        "description": "broken clouds",
                        "providerIcon": "04d"
                    }
                ],
                "temperature": {
                    "temperature": 19.96,
                    "minimum": 19.96,
                    "maximum": 19.96
                },
                "humidity": 49.0,
                "pressure": null,
                "cloud": 78.0,
                "wind": {
                    "speed": 3.12,
                    "heading": 265.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721649600000,
                "datetimeTxt": "Mon Jul 22 14:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "04d",
                        "condition": "Clouds",
                        "description": "broken clouds",
                        "providerIcon": "04d"
                    }
                ],
                "temperature": {
                    "temperature": 24.09,
                    "minimum": 24.09,
                    "maximum": 24.09
                },
                "humidity": 39.0,
                "pressure": null,
                "cloud": 73.0,
                "wind": {
                    "speed": 3.68,
                    "heading": 253.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            },
            {
                "datetime": 1721660400000,
                "datetimeTxt": "Mon Jul 22 17:00:00 CEST 2024",
                "location": {
                    "providerId": "6269531",
                    "city": "Paris 01 Louvre",
                    "coordinate": {
                        "lon": 2.3412,
                        "lat": 48.8569
                    }
                },
                "conditions": [
                    {
                        "providerId": "03d",
                        "condition": "Clouds",
                        "description": "scattered clouds",
                        "providerIcon": "03d"
                    }
                ],
                "temperature": {
                    "temperature": 24.91,
                    "minimum": 24.91,
                    "maximum": 24.91
                },
                "humidity": 44.0,
                "pressure": null,
                "cloud": 46.0,
                "wind": {
                    "speed": 4.28,
                    "heading": 255.0
                },
                "rainVolume3h": null,
                "snowVolume3h": null
            }
        ]
    }
}
```



All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

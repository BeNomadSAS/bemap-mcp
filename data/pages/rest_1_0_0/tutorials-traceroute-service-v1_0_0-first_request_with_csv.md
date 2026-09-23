# 📄 TraceRoute – Beginner Tutorial with a CSV Route
*“How to convert a CSV file into a routing request”*
---
## 🎯 What We Want to Do
“I have a list of GPS points in a CSV file and I want to build a route from it using TraceRoute.”
---
### 🗂 Step 1: Understand Your CSV
Here’s a sample of the CSV you might have:
```css
latitude;longitude;date;section;speed;time;heading
43.7316541;7.4207476;23/10/2020;1;6;09:43:35;90.0
43.7310649;7.4184731;23/10/2020;1;6;09:43:38;93.0
...

```
What we care about:

- `latitude` and `longitude` → GPS position
- `speed` → speed in km/h
- `time` → the hour/minute/second
- `heading` → optional direction
We will ignore `date`, `section`, etc. for now.
---
### 🛠 Step 2: Convert CSV to JSON Coordinates
Each row becomes a **destination** in the request. For example:
```
{
  "coordinateSat": {
    "lon": 7.4207476,
    "lat": 43.7316541,
    "speed": 6.0,
    "time": 1603446215000,
    "heading": 90.0
  }
}
```
> 🕒 The `time` must be converted into **Unix timestamp in milliseconds**. If you don’t know how to do this, just use tools or ask for help — it’s usually okay to reuse existing examples.
---
### ⚙️ Step 3: Build the Full Request
We will add:

- A **transport mode** (e.g. CAR)
- **Options** like `ROUTESHEET` and `POLYLINE`
- The list of destinations from your CSV
---
## ✅ Final JSON Request Example
Here’s a complete JSON built from the first 10 rows of your CSV:
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": ["ROUTESHEET", "POLYLINE"],
  "destinations": [
    {
      "coordinateSat": {
        "lon": 7.4207476,
        "lat": 43.7316541,
        "speed": 6.0,
        "time": 1603446215000,
        "heading": 90.0
      }
    },
    {
      "coordinateSat": {
        "lon": 7.4184731,
        "lat": 43.7310649,
        "speed": 6.0,
        "time": 1603446218000,
        "heading": 93.0
      }
    },
    {
      "coordinateSat": {
        "lon": 7.4166278,
        "lat": 43.7298245,
        "speed": 6.0,
        "time": 1603446230000,
        "heading": 77.8
      }
    },
    {
      "coordinateSat": {
        "lon": 7.4155120,
        "lat": 43.7290182,
        "speed": 6.0,
        "time": 1603446236000,
        "heading": -33.4
      }
    },
    {
      "coordinateSat": {
        "lon": 7.4143962,
        "lat": 43.7279638,
        "speed": 6.0,
        "time": 1603446244000,
        "heading": -31.4
      }
    },
    {
      "coordinateSat": {
        "lon": 7.4138383,
        "lat": 43.7273746,
        "speed": 6.0,
        "time": 1603446254000,
        "heading": -33.4
      }
    },
    {
      "coordinateSat": {
        "lon": 7.4128512,
        "lat": 43.7279328,
        "speed": 6.0,
        "time": 1603446269000,
        "heading": -37.6
      }
    },
    {
      "coordinateSat": {
        "lon": 7.4137954,
        "lat": 43.7286461,
        "speed": 6.0,
        "time": 1603446333000,
        "heading": -34.7
      }
    },
    {
      "coordinateSat": {
        "lon": 7.4137954,
        "lat": 43.7297935,
        "speed": 6.0,
        "time": 1603446348000,
        "heading": -21.2
      }
    },
    {
      "coordinateSat": {
        "lon": 7.4123792,
        "lat": 43.7311890,
        "speed": 6.0,
        "time": 1603446360000,
        "heading": -28.3
      }
    }
  ]
}
```
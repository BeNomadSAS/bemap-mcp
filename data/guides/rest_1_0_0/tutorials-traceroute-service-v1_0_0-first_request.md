# 🚗 TraceRoute – Step-by-Step Beginner Tutorial
*“How to build your first route request in JSON”*

## 🎯 What We Want to Do
We want to ask the API:

> “Give me the best route by car from point A to point B.”

To do this, we’ll build a small JSON file that the API understands.

### 📦 Step 1: Define the Transport Mode
Start by saying **what kind of vehicle** you're using.

In our case, we use a car:
```
"routingVehicleProfile": {
  "transportMode": "CAR"
}
```
🔍 This tells the API to compute a route suitable for a car.

### 📦 Step 2: Add Useful Options
You can ask the API to return useful data, such as:

- `POLYLINE` → the route on the map

- `ROUTESHEET` → step-by-step instructions (like GPS)

We add them in a list:
```
"options": ["POLYLINE", "ROUTESHEET"]
```

### 📦 Step 3: Add the Coordinates (Start and End)
Now give the **GPS positions** for the start and end of the trip.

Each point must include:

- `lon` → longitude
- `lat` → latitude
- `speed` → estimated speed at that moment
- `time` → timestamp in milliseconds (you can copy/paste this part)

```
"destinations": [
  {
    "coordinateSat": {
      "lon": 2.3488,
      "lat": 48.8534,
      "speed": 20.0,
      "time": 1720519200000
    }
  },
  {
    "coordinateSat": {
      "lon": 2.3600,
      "lat": 48.8580,
      "speed": 35.0,
      "time": 1720519260000
    }
  }
]
```
## ✅ Final Complete Request
Now put all the pieces together:
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": ["POLYLINE", "ROUTESHEET"],
  "destinations": [
    {
      "coordinateSat": {
        "lon": 2.3488,
        "lat": 48.8534,
        "speed": 20.0,
        "time": 1720519200000
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3600,
        "lat": 48.8580,
        "speed": 35.0,
        "time": 1720519260000
      }
    }
  ]
}
```
## 🧪 How to Use This Request
**1.** Open your favorite API testing tool (e.g. Postman, Insomnia, or curl).

**2.** Paste this JSON in the body of a POST request.

**3.** Send the request to your TraceRoute API endpoint.

**4.** Read the response: you'll get a map polyline and a route sheet.

## 💡 Tips for New Users
- Don’t worry too much about `speed` or `time` values — just copy them from examples for now.

- You can add more points to create a route with stops.

- You can always test with `transportMode: "CAR"` first.
# 🚗 TraceRoute – Step-by-Step Beginner Tutorial
*“How to build your first route request in JSON”*

## 🎯 What We Want to Do
We want to ask the API:

> “Here are GPS positions recorded by a car: match them to the road network and give me the route the car drove.”

That is what TraceRoute does: it road-matches a recorded GPS trace. To plan a route from point A to point B, use the routing service instead.

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

⚠️ Both are required: without `routingVehicleProfile` the API answers `400` “Vehicle profile (vp) is required!”, and without `transportMode` a `400 MISSING_PARAMETER` whose message is a Java NullPointerException.

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

and may include (optional):

- `speed` → speed at that moment, in km/h
- `time` → GPS timestamp in milliseconds

We leave `speed` and `time` out here: they belong to a real recorded trace (see the tips below).

```
"destinations": [
  {
    "coordinateSat": {
      "lon": 2.3488,
      "lat": 48.8534
    }
  },
  {
    "coordinateSat": {
      "lon": 2.3600,
      "lat": 48.8580
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
        "lat": 48.8534
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3600,
        "lat": 48.8580
      }
    }
  ]
}
```
## 🧪 How to Use This Request
**1.** Open your favorite API testing tool (e.g. Postman, Insomnia, or curl).

**2.** Paste this JSON in the body of a POST request.

**3.** Send the request to `https://bemap.benomad.com/bgis/service/routing/1.0/traceroute`, with the header `Content-Type: application/json` and HTTP Basic authentication: `Authorization: Basic <base64 of account:apikey>`.

**4.** Read the response: you'll get a map polyline and a route sheet.

## 💡 Tips for New Users
- Leave out `speed` and `time` until you send a real recorded trace, with points a few seconds apart (like the CSV tutorial’s). Measured on production: with a `time` on each of this page’s two points, about 1 km apart, TraceRoute matched both onto the second point and still answered `200` — with `length: 0`, an empty `polyline`, a `boundingBox` of zeros, and the first point moved 969 m with `confidenceValue: 1`. Check `length` and `usedDestinations[].distanceFromRequest` before you trust an answer.

- You can add more points: TraceRoute reads them as the chronological sequence of positions of one vehicle.

- You can always test with `transportMode: "CAR"` first.

---

_BeNomad MCP: a corrected copy of BeMap's page, served until BeMap publishes the correction (BEMAP-1938)._

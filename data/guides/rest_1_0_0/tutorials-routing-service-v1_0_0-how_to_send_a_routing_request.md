# 📬 How to Send a Routing Request

You’ve built your JSON request body — now let’s send it using **Postman** or **cURL**, with the proper headers.

---

## 🧾 Required Headers

Whether using Postman or cURL, make sure to include these HTTP headers:

| Header Name       | Value                        |
|-------------------|------------------------------|
| `Content-Type`    | `application/json`           |
| `accept`          | `application/json`           |
| `Authorization`   | `Bearer <your_access_token>` |

> 🛡️ You must first authenticate using the `/authenticate` endpoint to get a valid token.  
> See the [authentication tutorial](index.html#page-authentication.md).

---

## 🧪 Using Postman

1. Open **Postman** and create a new `POST` request.
2. Set the URL to:

https://bemap-beta.benomad.com/bgis/service/routing/1.0


1. Under the **Headers** tab, add:

| KEY            | VALUE                         |
|----------------|-------------------------------|
| Content-Type   | application/json              |
| accept         | application/json              |
| Authorization  | Bearer `your_access_token`    |

4. Under the **Body** tab:
   - Select `raw` and choose `JSON`.
   - Paste your routing request JSON body.
```
{
  "geoserver": "here",
  "routingMode": "MODE_VIAS",
  "outputLanguage": "fr",
  "destinations": [
    {
      "coordinateSat": {
        "lon": 2.32158,
        "lat": 48.86533
      }
    },
    {
      "coordinateSat": {
        "lon": 4.35655,
        "lat": 50.8447
      }
    }
  ],
  "options": [
    "POLYLINE"
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```
5. Click **Send**. 🎯

---

## 💻 Using cURL

```
curl -X POST "https://bemap-beta.benomad.com/bgis/service/routing/1.0" \
  -H "Content-Type: application/json" \
  -H "accept: application/json" \
  -H "Authorization: Bearer <your_access_token>" \
  -d '{
    "destinations": [
      { "coordinateSat": { "lon": 2.3522, "lat": 48.8566 } },
      { "coordinateSat": { "lon": 5.0415, "lat": 47.3220 } }
    ],
    "routingVehicleProfile": {
      "transportMode": "CAR"
    },
    "routingCriterias": ["AVOID_MOTORWAYS"],
    "options": ["POLYLINE"]
  }'
```

📌 Make sure to replace <your_access_token> with a valid token retrieved from the /authenticate endpoint.

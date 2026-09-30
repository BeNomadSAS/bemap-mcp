# 📬 How to Send a Routing Request

You’ve built your JSON request body — now let’s send it using **Postman** or **cURL**, with the proper headers.

---

## 🧾 Required Headers

Whether using Postman or cURL, make sure to include these HTTP headers:

| Header Name       | Value                              |
|-------------------|------------------------------------|
| `Content-Type`    | `application/json`                 |
| `accept`          | `application/json`                 |
| `Authorization`   | `Basic <base64 of account:apikey>` |

> 🛡️ BeMap uses HTTP Basic authentication: join your account and your API key with `:` and encode the result in Base64. There is no token to fetch first.  
> A request without Basic credentials is redirected (`302`) to the login page; wrong credentials answer `401`.  
> See the [authentication tutorial](index.html#page-authentication.md).

---

## 🧪 Using Postman

1. Open **Postman** and create a new `POST` request.
2. Set the URL to:

   ```
   https://bemap.benomad.com/bgis/service/routing/1.0
   ```

3. Under the **Headers** tab, add:

| KEY            | VALUE                              |
|----------------|------------------------------------|
| Content-Type   | application/json                   |
| accept         | application/json                   |
| Authorization  | Basic `<base64 of account:apikey>` |

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
curl -X POST "https://bemap.benomad.com/bgis/service/routing/1.0" \
  -H "Content-Type: application/json" \
  -H "accept: application/json" \
  -H "Authorization: Basic <base64 of account:apikey>" \
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

📌 Make sure to replace `<base64 of account:apikey>` with your account and API key, joined by `:` and encoded in Base64 — or let cURL build the header with `-u "<account>:<apikey>"` in place of the `Authorization` line.

---

_BeNomad MCP: a corrected copy of BeMap's page, served until BeMap publishes the correction (BEMAP-1938)._

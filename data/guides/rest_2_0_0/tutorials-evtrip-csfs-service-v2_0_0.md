# 🚧 Building an EV Smart Routing Request with Charging Station Filters (csfs)

This tutorial explains how to construct a request for the **EV Smart Routing API** that includes **charging station filters (csfs)**.
A filter without an action restricts which charging stations are considered during route planning: every station it does not match is left out. A filter with an action (`-> prefCoeff=…;`) keeps every station and weights the ones it matches — under `csfsVersion` 1, the default. Under `csfsVersion` 2 an action leaves out the stations it does not match, like a filter without one (see Actions below).

## 🧱 Basic Structure with csfs

A request including charging station filters looks like this:

```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "csfs": [
    "chargingPoint.nominalPower >= 50",
    "pool.brand != Electra"
  ],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "chargePluggingTime": 300
  }
}
```
---
## 🧩 1. csfs — Charging Station Filters

The `csfs` parameter is an array of string filters.
Each filter follows the syntax:
```
CLASS.FIELD OPERATOR VALUE
```
- **CLASS** → `pool`, `station`, `chargingPoint`, `vehicleAccess`
- **FIELD** → a supported field (e.g. `brand`, `nominalPower`, `creditCardPayment`)
- **OPERATOR** → `==`, `!=`, `>=`, `/=/` (regex), …
- **VALUE** → the value to compare against
👉 Multiple filters can be listed in the array: they are joined with AND, so a station must match every one of them.
👉 Use `||` inside one string for OR conditions: `"pool.brand == IONITY || pool.brand == Allego"` keeps the stations of either brand, where `"pool.brand == IONITY", "pool.brand == Allego"` as two strings keeps only the stations that are both — none.
---
✅ Example: Keep only fast charging stations
```
"csfs": [
  "chargingPoint.nominalPower >= 50"
]
```
> ➡️ Keeps only stations with at least 50 kW.
---
✅ Example: Keep only IONITY or Tesla stations
```
"csfs": [
  "pool.brand /= /.*(IONITY|Tesla).*/i"
]
```
> ➡️ Keeps only stations whose brand holds IONITY or Tesla, in any case, and leaves out every other one. A `/= /…/` pattern is anchored (`/Tesla/` does not match `Tesla Supercharger`, `/.*Tesla.*/` does) and case-sensitive unless it ends with `/i`. To prefer these brands without leaving out the others, give the filter an action (under `csfsVersion` 1, the default): see `prefCoeff` below.
---
✅ Example: Exclude a specific brand
```
"csfs": [
  "pool.brand != Electra"
]
```
> ➡️ Excludes stations operated by Electra.
---
✅ Example: Select stations based on the total number of charging points available in the pool.
```
"csfs": [
  "pool.numberOfChargingPoint >= 4"
]
```
> ➡️ Keeps only pools that have at least 4 charging points.
---
✅ Example: Keep only charging stations currently reported as available
```
"csfs": [
  "station.available == true"
]
```
➡️ Excludes stations flagged as unavailable.
---
## 🎯 2. Actions in CSFS

Besides simple filters, you can also define **actions** that are executed when a condition is matched. Under `csfsVersion` 1, the default, a filter with an action no longer excludes the stations it does not match; it applies the action to those it matches. Under `"csfsVersion": 2` an action excludes the stations it does not match, like a filter without one: `"pool.brand /= /.*(nosuchbrand).*/i -> prefCoeff=10.0;"` answers `200` by default and `400 NO_REACHABLE_STEP_POINT` with `"csfsVersion": 2`. `csfsVersion` is sent as a number, although the specification shows it as a base64 string, which the service refuses. The syntax is:

```
Filter pattern -> ACTION_KEY = ACTION_VALUE;
```

Multiple actions can be chained with `->`.

---

### ⚖️ `prefCoeff`

The `prefCoeff` (**preference coefficient**) is used to **prioritize** or **deprioritize** charging stations when a filter matches.  
Under `csfsVersion` 1, the default, it does not exclude stations but adjusts their **weight** in the selection process.  

- **Neutral value:** `1.0` → default, no preference.  
- **Preferred:** `]1.0, 10.0]` → increases priority.  
  - Example: `prefCoeff=5.0;` → a strong preference.  
- **Avoided:** `[0.1, 1.0[` → decreases priority.  
  - Example: `prefCoeff=0.5;` → a mild avoidance.  
- **Bounds:**  
  - Minimum: `0.1` (cannot be 0 or negative).  
  - Maximum: `10.0`.  

✅ Use `prefCoeff > 1` to **encourage** preferred partners/networks.  
❌ Use `prefCoeff < 1` to **discourage** costly or unwanted stations. 


📊 **Quick reference**
| **Value** | **Meaning** | **Example usage** |
|-----------|-------------|--------------------|
| `1.0`     | Neutral (default, no preference) | No preference |
| `0.5`     | Avoid | Discourage expensive networks |
| `0.1`     | Strongly avoid (minimum) | Last resort only |
| `2.0`     | Prefer | Encourage trusted partners |
| `5.0`     | Strong preference | Prioritize one network |
| `10.0`    | Maximum preference (cap) | Strongest preference: still a weight, and it will not force a large detour |

---

### 🧩 Example with `prefCoeff`

```
"csfs": [
  "pool.brand == IONITY -> prefCoeff=5.0;"
]
```
➡️ In this case, IONITY stations are prioritized.

Another combined example:
```
"csfs": [
  "chargingPoint.nominalPower >= 7",
  "chargingPoint.nominalPower >= 50 -> prefCoeff=6.0;",
  "pool.brand == IONITY -> prefCoeff=5.0;"
]
```
➡️ Under `csfsVersion` 1, the default, this keeps only charging points with **≥7 kW**, prefers **fast chargers (≥50 kW)**, and gives higher priority to the **IONITY** network.

**Full Example with prefCoeff**
```
{
  "geoserver": "osm",
  "csps": [
    "ecoMovement"
  ],
    "csfs": [
    "chargingPoint.nominalPower >= 50",
    "pool.brand /= /Electra/-> prefCoeff=9.0;"
  ],
  "vehicle": {
    "initBatLvl": 40,
    "key": "4d4f1d56-5014-4840-b5cf-7c42aad2d309",
    "payload": 75
  },
  "start": {
    "lon": 7.23521295426402,
    "lat": 44.0040293
  },
  "stop": {
    "lon": -4.48656,
    "lat": 48.39043
  },
  "condition": {
    "minBatLvl": 10,
    "minArrivalBatLvl": 15,
    "temperature": 20,
    "currency": "EUR",
    "encodedGeometry": true,
    "departureTime": 1758877080000,
    "chargePluggingTime": 300,
    "allowNaStatus": true
  }
}
```
---

## 🚗 3. vehicle
```
"vehicle": {
  "initBatLvl": 100,
  "key": "d729502b-12ba-4adb-89bd-cff6a2d00919",
  "payload": 75
}
```
---
## 🗺️ 4. start & stop
```
"start": {
  "lon": 7.27768,
  "lat": 43.70032
},
"stop": {
  "lon": 1.44863,
  "lat": 43.60579
}
```
---
## ⚙️ 5. condition
```
"condition": {
  "minBatLvl": 10,
  "minArrivalBatLvl": 15,
  "chargePluggingTime": 300
}
```
----
## 📌 Full Example
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "csfs": [
    "chargingPoint.nominalPower >= 50",
    "pool.brand /= /IONITY/"
  ],
  "vehicle": {
    "initBatLvl": 100,
    "key": "d729502b-12ba-4adb-89bd-cff6a2d00919",
    "payload": 75
  },
  "start": {
    "lon": 7.27768,
    "lat": 43.70032
  },
  "stop": {
    "lon": 1.44863,
    "lat": 43.60579
  },
  "condition": {
    "minBatLvl": 10,
    "minArrivalBatLvl": 15,
    "temperature": 20,
    "chargePluggingTime": 300
  }
}
```

---

_BeNomad MCP: a tutorial BeMap does not publish yet, served until it does (BEMAP-1938)._

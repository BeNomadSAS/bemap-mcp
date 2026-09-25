# REST API, BND version 0.9


## Response of Traffic service in BNDJSON10 format.



**Summary:**

[TOC]



## BeNomad JSON Format

This format uses a JSON structure to reduce the finalized file size and must be readable in streaming by an embedded device. The format is based on Alert-C / TMC codes.

### Header of File

All fields of file header are separated by the Record Separator character symbolized by `[R]` and the last field is ended by two.

| Name | Description                                                  | Type            | Sample  |
| ---- | ------------------------------------------------------------ | --------------- | ------- |
| sig  | Signature of BeNomad Traffic File. This field must be never change. | String          | BndJson |
| ver  | The version umber of format.                                 | Number (int)    | 1       |
| els  | Array of traffic information elements.                       | Array of object |         |

### Entries

The entries are divided in two types: Information and Event.

#### Information Entry

These fields provide the information about series following event.

| Name | Description                                                  | Type          | Sample                      |
| ---- | ------------------------------------------------------------ | ------------- | --------------------------- |
| cc   | Countrycode of followed data.                                | String        | BndJson                     |
| cr   | Copyright of followed data.                                  | String        | Provider HD Traffic Service |
| rd   | (Optional) Release time stamp of followed data. Like UNIX timestamp but in milliseconds. | Number (long) | 1449829367353               |
| lu   | (Optional)Last update time stamp of followed data. Like UNIX timestamp but in milliseconds. | Number (long) | 1449829367353               |

#### Event Entry

Contains the traffic information of roads or points.

| Name | Description                          | Type            | Sample                                                       |
| ---- | ------------------------------------ | --------------- | ------------------------------------------------------------ |
| id   | Unique identifier of entry.          | String          | TTI-7bc8ce4d-564e-4271-b6fb-ed1c5ada3f7d-TTR124013086208176-1 |
| olr  | OpenLR location encoded in base 64.  | String          | C/5tUiGdNRtjCQIbAQYbEA==                                     |
| lg   | (Optional) Length in meters.         | Number (int)    | 18                                                           |
| acc  | Alert-C code.                        | Number(int)     | 108                                                          |
| as   | (Optional) Average speed in km/h.    | Number(float)   | 8.0                                                          |
| dt   | (Optional) Duration time in seconds. | Number (long)   | 152                                                          |
| cmts | (Optional) Comments.                 | Array of String |                                                              |

## Example

>  NOTE: This example of response if trunked.

Request:

```
/bgis/bnd?action=traffic&version=1.0.0&language=en&format=BNDJSON10&bbox=1.555125,48.642277,2.468625,49.242275
```

Response:

```json
{
  "sig": "BndJson",
  "ver": 1,
  "els": [
    {
      "cc": "FRA",
      "cr": "92e5395e-5c88-4b11-8a2d-d2459c6231e228362f0d-TomTom Traffic Service",
      "rd": 1711710461000
    },
    {
      "id": "FRA-CwG/MyK1sRt9KfSyAfQbeAT+rP/yG28C/9D/kxsC@0",
      "olr": "CwG/MyK1sRt9KfSyAfQbeAT+rP/yG28C/9D/kxsC",
      "lg": 2811,
      "acc": 0,
      "as": 0.0,
      "dt": 361
    },
    {
      "id": "FRA-CwGofSLBsSv3Df50AnEzTgk=@0",
      "olr": "CwGofSLBsSv3Df50AnEzTgk=",
      "lg": 758,
      "acc": 0,
      "as": 0.0,
      "dt": 119
    },
. . .
    {
      "id": "FRA-CwGdSCK+Yxt1B/3S/6MbSgU=@0",
      "olr": "CwGdSCK+Yxt1B/3S/6MbSgU=",
      "lg": 449,
      "acc": 0,
      "as": 0.0,
      "dt": 73
    }
  ]
}
```


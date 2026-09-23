# REST API, Service version 1.0.0


## Quotas system

All Services and API can raise an error if a "hard" limit is reached.

Example of returned message :

```json
{"code":"RequestsQuotasExceededException","message":"Requests quotas exceeded for usage b7177792-a6f7-43bf-b269-c9866f8fa47f 'b7177792-a6f7-43bf-b269-c9866f8fa47f' and service 'ReverseGeocoding'. Will be unlocked at the beginning of the next hour."}
```

Fields description :

- `code` : The code of error. In this case the quotas was exceeded.
  - Can be used by the application code to catch the error. 
  - Is a String type.
- `message` : The textual message of error than explain the issue.
  - Can be used by the developers of application to know more about the issue.
  - Is a String type.



## Quotas service
Get the current quotas limits



### Request
The request must be sent with the HTTP method `GET`.

**Sample:**

End-point URI: `/bgis/service/quotas/1.0/getAllByCurrentAccount`.



### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.quotas.QuotasResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.quotas.QuotasResponse"}}
```



#### Response samples

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
    "jails": [
        {
            "creation": "2025-05-21T16:50:13Z",
            "usageUuid": "b7177792-a6f7-43bf-b269-c9866f8fa47f",
            "serviceName": "Mapping",
            "range": "HOUR",
            "type": "SOFT",
            "autoUnlock": true
        },
        {
            "creation": "2025-05-21T16:50:13Z",
            "usageUuid": "b7177792-a6f7-43bf-b269-c9866f8fa47f",
            "serviceName": "ReverseGeocoding",
            "range": "HOUR",
            "type": "HARD",
            "autoUnlock": true
        }
    ]
}
```



# REST API, Service version 1.0.0


## Currency convert service
Convert a currency to another.

### Summary
1. Request
 1. Mandatory parameters
2. Response
 1. Details of fields
 2. Response samples


### Request
The request must be sent with the HTTP method `GET`; or `POST` with the HTTP header `Content-Type` set to `application/json`. 

Sample:
URI: `/bgis/service/currency/1.0/convert`

POST data:
```
{"bemap":{"language":"javascript"}}
{
  "from": "EUR",
  "value": 1000,
  "to": "MAD"
}
```

GET data:

```
`/bgis/service/currency/1.0/convert?from=FJD&value=1.0&to=USD`
```

#### __Parameters__

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.currency.CurrencyConvertRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.currency.CurrencyConvertRequest"}}
```

### Response
Return the converted value amount.

#### Details of fields

##### __lastUpdate__: time stamp of data will be updated.

##### __value__: converted value amount.


#### Response samples

JSON Sample:
```
{
  "lastUpdate": 1670507755480,
  "value": 11096.038
}
```

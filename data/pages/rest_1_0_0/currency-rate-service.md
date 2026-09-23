# REST API, Service version 1.0.0


## Currency rate service
To get single currency rate for a currency code.

### Summary
1. Request
 1. Parameters
2. Response
 1. Details of fields
 2. Response samples


### Request
The request must be sent with the HTTP method `GET`. 

URI: `/bgis/service/currency/1.0/rate`

Sample: `/bgis/service/currency/1.0/rate?code=FJD`


#### __Parameters__
No parameters are required by this service.


### Response
Return the currency rate of the input currency code.

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.currency.CurrencyRateResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.currency.CurrencyRateResponse"}}
```


#### Response samples

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
    "lastUpdate":1559896137641,
    "rate":{
        "base":"EUR",
        "code":"FJD",
        "rate":2.416988,
        "label":"Fijian Dollar"
    }
}
```

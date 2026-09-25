# REST API, Service version 1.0.0


## Currency rates service
To get all currency rates.

### Summary
1. Request
 1. Parameters
2. Response
 1. Details of fields
 2. Response samples


### Request
The request must be sent with the HTTP method `GET`. 

URI: `/bgis/service/currency/1.0/rates`


#### __Parameters__
No parameters are required by this service.


### Response
Return a list of currency rates.

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.currency.CurrencyRatesResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.currency.CurrencyRatesResponse"}}
```


#### Response samples

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
    "lastUpdate":1559896137641,
    "rates":[
        {
            "base":"EUR",
            "code":"FJD",
            "rate":2.416988,
            "label":"Fijian Dollar"
        },
        {
            "base":"EUR",
            "code":"STD",
            "rate":23718.713,
            "label":"São Tomé and Príncipe Dobra"
        },
...
        {
            "base":"EUR",
            "code":"BRL",
            "rate":4.371604,
            "label":"Brazilian Real"
        }
    ]
}
```

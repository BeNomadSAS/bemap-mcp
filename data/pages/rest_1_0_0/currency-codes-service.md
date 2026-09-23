# REST API, Service version 1.0.0


## Currency codes service
To get the currency codes used by the currency utilities.

### Summary
1. Request
 1. Parameters
2. Response
 1. Details of fields
 2. Response samples


### Request
The request must be sent with the HTTP method `GET`. 

URI: `/bgis/service/currency/1.0/codes`


#### __Parameters__
No parameters are required by this service.


### Response
Return a list of currency code and label.

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.currency.CurrencyCode">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.currency.CurrencyCode"}}
```


#### Response samples

JSON Sample:
```
{"bemap":{"language":"javascript"}}
[
    {
        "code":"FJD",
        "label":"Fijian Dollar",
        "byDefault":false
    },
    {
        "code":"MXN",
        "label":"Mexican Peso",
        "byDefault":false
    },
    {
        "code":"STD",
        "label":"São Tomé and Príncipe Dobra",
        "byDefault":false
    },
    {
        "code":"LVL",
        "label":"Latvian Lats",
        "byDefault":false
    },
    {
        "code":"SCR",
        "label":"Seychellois Rupee",
        "byDefault":false
    },
    {
        "code":"CDF",
        "label":"Congolese Franc",
        "byDefault":false
    },
    {
        "code":"BBD",
        "label":"Barbadian Dollar",
        "byDefault":false
    },
    {
        "code":"GTQ",
        "label":"Guatemalan Quetzal",
        "byDefault":false
    },
    {
        "code":"CLP",
        "label":"Chilean Peso",
        "byDefault":false
    },
    {
        "code":"HNL",
        "label":"Honduran Lempira",
        "byDefault":false
    },
    {
        "code":"UGX",
        "label":"Ugandan Shilling",
        "byDefault":false
    },
    {
        "code":"ZAR",
        "label":"South African Rand",
        "byDefault":false
    },
    {
        "code":"TND",
        "label":"Tunisian Dinar",
        "byDefault":false
    },
    {
        "code":"CUC",
        "label":"Cuban Convertible Peso",
        "byDefault":false
    },
    {
        "code":"BSD",
        "label":"Bahamian Dollar",
        "byDefault":false
    },
    {
        "code":"SLL",
        "label":"Sierra Leonean Leone",
        "byDefault":false
    },
    {
        "code":"SDG",
        "label":"Sudanese Pound",
        "byDefault":false
    },
    {
        "code":"IQD",
        "label":"Iraqi Dinar",
        "byDefault":false
    },
    {
        "code":"CUP",
        "label":"Cuban Peso",
        "byDefault":false
    },
    {
        "code":"GMD",
        "label":"Gambian Dalasi",
        "byDefault":false
    },
    {
        "code":"TWD",
        "label":"New Taiwan Dollar",
        "byDefault":false
    },
    {
        "code":"RSD",
        "label":"Serbian Dinar",
        "byDefault":false
    },
    {
        "code":"DOP",
        "label":"Dominican Peso",
        "byDefault":false
    },
    {
        "code":"KMF",
        "label":"Comorian Franc",
        "byDefault":false
    },
    {
        "code":"MYR",
        "label":"Malaysian Ringgit",
        "byDefault":false
    },
    {
        "code":"FKP",
        "label":"Falkland Islands Pound",
        "byDefault":false
    },
    {
        "code":"XOF",
        "label":"CFA Franc BCEAO",
        "byDefault":false
    },
    {
        "code":"GEL",
        "label":"Georgian Lari",
        "byDefault":false
    },
    {
        "code":"BTC",
        "label":"Bitcoin",
        "byDefault":false
    },
    {
        "code":"UYU",
        "label":"Uruguayan Peso",
        "byDefault":false
    },
    {
        "code":"MAD",
        "label":"Moroccan Dirham",
        "byDefault":false
    },
    {
        "code":"CVE",
        "label":"Cape Verdean Escudo",
        "byDefault":false
    },
    {
        "code":"TOP",
        "label":"Tongan Paʻanga",
        "byDefault":false
    },
    {
        "code":"AZN",
        "label":"Azerbaijani Manat",
        "byDefault":false
    },
    {
        "code":"OMR",
        "label":"Omani Rial",
        "byDefault":false
    },
    {
        "code":"PGK",
        "label":"Papua New Guinean Kina",
        "byDefault":false
    },
    {
        "code":"KES",
        "label":"Kenyan Shilling",
        "byDefault":false
    },
    {
        "code":"SEK",
        "label":"Swedish Krona",
        "byDefault":false
    },
    {
        "code":"BTN",
        "label":"Bhutanese Ngultrum",
        "byDefault":false
    },
    {
        "code":"UAH",
        "label":"Ukrainian Hryvnia",
        "byDefault":false
    },
    {
        "code":"GNF",
        "label":"Guinean Franc",
        "byDefault":false
    },
    {
        "code":"ERN",
        "label":"Eritrean Nakfa",
        "byDefault":false
    },
    {
        "code":"MZN",
        "label":"Mozambican Metical",
        "byDefault":false
    },
    {
        "code":"SVC",
        "label":"Salvadoran Colón",
        "byDefault":false
    },
    {
        "code":"ARS",
        "label":"Argentine Peso",
        "byDefault":false
    },
    {
        "code":"QAR",
        "label":"Qatari Rial",
        "byDefault":false
    },
    {
        "code":"IRR",
        "label":"Iranian Rial",
        "byDefault":false
    },
    {
        "code":"MRO",
        "label":"Mauritanian Ouguiya",
        "byDefault":false
    },
    {
        "code":"CNY",
        "label":"Chinese Yuan",
        "byDefault":false
    },
    {
        "code":"THB",
        "label":"Thai Baht",
        "byDefault":false
    },
    {
        "code":"UZS",
        "label":"Uzbekistan Som",
        "byDefault":false
    },
    {
        "code":"XPF",
        "label":"CFP Franc",
        "byDefault":false
    },
    {
        "code":"BDT",
        "label":"Bangladeshi Taka",
        "byDefault":false
    },
    {
        "code":"LYD",
        "label":"Libyan Dinar",
        "byDefault":false
    },
    {
        "code":"BMD",
        "label":"Bermudan Dollar",
        "byDefault":false
    },
    {
        "code":"KWD",
        "label":"Kuwaiti Dinar",
        "byDefault":false
    },
    {
        "code":"PHP",
        "label":"Philippine Peso",
        "byDefault":false
    },
    {
        "code":"RUB",
        "label":"Russian Ruble",
        "byDefault":false
    },
    {
        "code":"PYG",
        "label":"Paraguayan Guarani",
        "byDefault":false
    },
    {
        "code":"ISK",
        "label":"Icelandic Króna",
        "byDefault":false
    },
    {
        "code":"JMD",
        "label":"Jamaican Dollar",
        "byDefault":false
    },
    {
        "code":"COP",
        "label":"Colombian Peso",
        "byDefault":false
    },
    {
        "code":"MKD",
        "label":"Macedonian Denar",
        "byDefault":false
    },
    {
        "code":"USD",
        "label":"United States Dollar",
        "byDefault":false
    },
    {
        "code":"DZD",
        "label":"Algerian Dinar",
        "byDefault":false
    },
    {
        "code":"PAB",
        "label":"Panamanian Balboa",
        "byDefault":false
    },
    {
        "code":"GGP",
        "label":"Guernsey Pound",
        "byDefault":false
    },
    {
        "code":"SGD",
        "label":"Singapore Dollar",
        "byDefault":false
    },
    {
        "code":"ETB",
        "label":"Ethiopian Birr",
        "byDefault":false
    },
    {
        "code":"JEP",
        "label":"Jersey Pound",
        "byDefault":false
    },
    {
        "code":"KGS",
        "label":"Kyrgystani Som",
        "byDefault":false
    },
    {
        "code":"SOS",
        "label":"Somali Shilling",
        "byDefault":false
    },
    {
        "code":"VEF",
        "label":"Venezuelan Bolívar Fuerte",
        "byDefault":false
    },
    {
        "code":"VUV",
        "label":"Vanuatu Vatu",
        "byDefault":false
    },
    {
        "code":"LAK",
        "label":"Laotian Kip",
        "byDefault":false
    },
    {
        "code":"BND",
        "label":"Brunei Dollar",
        "byDefault":false
    },
    {
        "code":"ZMK",
        "label":"Zambian Kwacha (pre-2013)",
        "byDefault":false
    },
    {
        "code":"XAF",
        "label":"CFA Franc BEAC",
        "byDefault":false
    },
    {
        "code":"LRD",
        "label":"Liberian Dollar",
        "byDefault":false
    },
    {
        "code":"XAG",
        "label":"Silver (troy ounce)",
        "byDefault":false
    },
    {
        "code":"CHF",
        "label":"Swiss Franc",
        "byDefault":false
    },
    {
        "code":"HRK",
        "label":"Croatian Kuna",
        "byDefault":false
    },
    {
        "code":"ALL",
        "label":"Albanian Lek",
        "byDefault":false
    },
    {
        "code":"DJF",
        "label":"Djiboutian Franc",
        "byDefault":false
    },
    {
        "code":"ZMW",
        "label":"Zambian Kwacha",
        "byDefault":false
    },
    {
        "code":"TZS",
        "label":"Tanzanian Shilling",
        "byDefault":false
    },
    {
        "code":"VND",
        "label":"Vietnamese Dong",
        "byDefault":false
    },
    {
        "code":"XAU",
        "label":"Gold (troy ounce)",
        "byDefault":false
    },
    {
        "code":"AUD",
        "label":"Australian Dollar",
        "byDefault":false
    },
    {
        "code":"ILS",
        "label":"Israeli New Sheqel",
        "byDefault":false
    },
    {
        "code":"GHS",
        "label":"Ghanaian Cedi",
        "byDefault":false
    },
    {
        "code":"GYD",
        "label":"Guyanaese Dollar",
        "byDefault":false
    },
    {
        "code":"KPW",
        "label":"North Korean Won",
        "byDefault":false
    },
    {
        "code":"BOB",
        "label":"Bolivian Boliviano",
        "byDefault":false
    },
    {
        "code":"KHR",
        "label":"Cambodian Riel",
        "byDefault":false
    },
    {
        "code":"MDL",
        "label":"Moldovan Leu",
        "byDefault":false
    },
    {
        "code":"IDR",
        "label":"Indonesian Rupiah",
        "byDefault":false
    },
    {
        "code":"KYD",
        "label":"Cayman Islands Dollar",
        "byDefault":false
    },
    {
        "code":"AMD",
        "label":"Armenian Dram",
        "byDefault":false
    },
    {
        "code":"BWP",
        "label":"Botswanan Pula",
        "byDefault":false
    },
    {
        "code":"SHP",
        "label":"Saint Helena Pound",
        "byDefault":false
    },
    {
        "code":"TRY",
        "label":"Turkish Lira",
        "byDefault":false
    },
    {
        "code":"LBP",
        "label":"Lebanese Pound",
        "byDefault":false
    },
    {
        "code":"TJS",
        "label":"Tajikistani Somoni",
        "byDefault":false
    },
    {
        "code":"JOD",
        "label":"Jordanian Dinar",
        "byDefault":false
    },
    {
        "code":"AED",
        "label":"United Arab Emirates Dirham",
        "byDefault":false
    },
    {
        "code":"HKD",
        "label":"Hong Kong Dollar",
        "byDefault":false
    },
    {
        "code":"RWF",
        "label":"Rwandan Franc",
        "byDefault":false
    },
    {
        "code":"EUR",
        "label":"Euro",
        "byDefault":true
    },
    {
        "code":"LSL",
        "label":"Lesotho Loti",
        "byDefault":false
    },
    {
        "code":"DKK",
        "label":"Danish Krone",
        "byDefault":false
    },
    {
        "code":"CAD",
        "label":"Canadian Dollar",
        "byDefault":false
    },
    {
        "code":"BGN",
        "label":"Bulgarian Lev",
        "byDefault":false
    },
    {
        "code":"MMK",
        "label":"Myanma Kyat",
        "byDefault":false
    },
    {
        "code":"MUR",
        "label":"Mauritian Rupee",
        "byDefault":false
    },
    {
        "code":"NOK",
        "label":"Norwegian Krone",
        "byDefault":false
    },
    {
        "code":"SYP",
        "label":"Syrian Pound",
        "byDefault":false
    },
    {
        "code":"IMP",
        "label":"Manx pound",
        "byDefault":false
    },
    {
        "code":"ZWL",
        "label":"Zimbabwean Dollar",
        "byDefault":false
    },
    {
        "code":"GIP",
        "label":"Gibraltar Pound",
        "byDefault":false
    },
    {
        "code":"RON",
        "label":"Romanian Leu",
        "byDefault":false
    },
    {
        "code":"LKR",
        "label":"Sri Lankan Rupee",
        "byDefault":false
    },
    {
        "code":"NGN",
        "label":"Nigerian Naira",
        "byDefault":false
    },
    {
        "code":"CRC",
        "label":"Costa Rican Colón",
        "byDefault":false
    },
    {
        "code":"CZK",
        "label":"Czech Republic Koruna",
        "byDefault":false
    },
    {
        "code":"PKR",
        "label":"Pakistani Rupee",
        "byDefault":false
    },
    {
        "code":"XCD",
        "label":"East Caribbean Dollar",
        "byDefault":false
    },
    {
        "code":"ANG",
        "label":"Netherlands Antillean Guilder",
        "byDefault":false
    },
    {
        "code":"HTG",
        "label":"Haitian Gourde",
        "byDefault":false
    },
    {
        "code":"BHD",
        "label":"Bahraini Dinar",
        "byDefault":false
    },
    {
        "code":"KZT",
        "label":"Kazakhstani Tenge",
        "byDefault":false
    },
    {
        "code":"SRD",
        "label":"Surinamese Dollar",
        "byDefault":false
    },
    {
        "code":"SZL",
        "label":"Swazi Lilangeni",
        "byDefault":false
    },
    {
        "code":"LTL",
        "label":"Lithuanian Litas",
        "byDefault":false
    },
    {
        "code":"SAR",
        "label":"Saudi Riyal",
        "byDefault":false
    },
    {
        "code":"TTD",
        "label":"Trinidad and Tobago Dollar",
        "byDefault":false
    },
    {
        "code":"YER",
        "label":"Yemeni Rial",
        "byDefault":false
    },
    {
        "code":"MVR",
        "label":"Maldivian Rufiyaa",
        "byDefault":false
    },
    {
        "code":"AFN",
        "label":"Afghan Afghani",
        "byDefault":false
    },
    {
        "code":"INR",
        "label":"Indian Rupee",
        "byDefault":false
    },
    {
        "code":"AWG",
        "label":"Aruban Florin",
        "byDefault":false
    },
    {
        "code":"KRW",
        "label":"South Korean Won",
        "byDefault":false
    },
    {
        "code":"NPR",
        "label":"Nepalese Rupee",
        "byDefault":false
    },
    {
        "code":"JPY",
        "label":"Japanese Yen",
        "byDefault":false
    },
    {
        "code":"MNT",
        "label":"Mongolian Tugrik",
        "byDefault":false
    },
    {
        "code":"AOA",
        "label":"Angolan Kwanza",
        "byDefault":false
    },
    {
        "code":"PLN",
        "label":"Polish Zloty",
        "byDefault":false
    },
    {
        "code":"GBP",
        "label":"British Pound Sterling",
        "byDefault":false
    },
    {
        "code":"SBD",
        "label":"Solomon Islands Dollar",
        "byDefault":false
    },
    {
        "code":"BYN",
        "label":"New Belarusian Ruble",
        "byDefault":false
    },
    {
        "code":"HUF",
        "label":"Hungarian Forint",
        "byDefault":false
    },
    {
        "code":"BYR",
        "label":"Belarusian Ruble",
        "byDefault":false
    },
    {
        "code":"BIF",
        "label":"Burundian Franc",
        "byDefault":false
    },
    {
        "code":"MWK",
        "label":"Malawian Kwacha",
        "byDefault":false
    },
    {
        "code":"MGA",
        "label":"Malagasy Ariary",
        "byDefault":false
    },
    {
        "code":"XDR",
        "label":"Special Drawing Rights",
        "byDefault":false
    },
    {
        "code":"BZD",
        "label":"Belize Dollar",
        "byDefault":false
    },
    {
        "code":"BAM",
        "label":"Bosnia-Herzegovina Convertible Mark",
        "byDefault":false
    },
    {
        "code":"EGP",
        "label":"Egyptian Pound",
        "byDefault":false
    },
    {
        "code":"MOP",
        "label":"Macanese Pataca",
        "byDefault":false
    },
    {
        "code":"NAD",
        "label":"Namibian Dollar",
        "byDefault":false
    },
    {
        "code":"NIO",
        "label":"Nicaraguan Córdoba",
        "byDefault":false
    },
    {
        "code":"PEN",
        "label":"Peruvian Nuevo Sol",
        "byDefault":false
    },
    {
        "code":"NZD",
        "label":"New Zealand Dollar",
        "byDefault":false
    },
    {
        "code":"WST",
        "label":"Samoan Tala",
        "byDefault":false
    },
    {
        "code":"TMT",
        "label":"Turkmenistani Manat",
        "byDefault":false
    },
    {
        "code":"CLF",
        "label":"Chilean Unit of Account (UF)",
        "byDefault":false
    },
    {
        "code":"BRL",
        "label":"Brazilian Real",
        "byDefault":false
    }
]
```

| Field  | Optional | Description |
|--------|----------|-------------|
| __chargePasses__ |             | List of charge pass. Type: `list or array of [ChargingTariffChargePassFront]`. See details below. |

#### __ChargingTariffChargePassFront__
Class representing charge pass. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __hashId__ |             | Unique identifier of charge pass. Type: `String`. |
| __title__ |             | Name of charge pass. Type: `String`. |
| __androidAppUrl__ |    optional | URL link to the Android application of charge network. Type: `String`. |
| __currency__ |    optional | Currency used for the subscription fee. This field stores the currency code or symbol used for the subscription fee. Type: `String`. |
| __description__ |    optional | A brief description or summary of the station charge pass. Type: `String`. |
| __iosAppUrl__ |    optional | URL link to the iOS application of charge network. Type: `String`. |
| __networkName__ |    optional | Unique name of charge network. Type: `String`. |
| __networkUrl__ |    optional | URL link to the website of charge network. Type: `String`. |
| __subscriptionFeeExclVat__ |    optional | Subscription fee excluding VAT. This field stores the fee amount charged for a subscription before any value-added tax is applied. Type: `Float`. |
| __subscriptionType__ |    optional | Type of subscription associated with the entity. This may denote the specific subscription model or tier for accessing the station service. Type: `String`. |

| Field  | Optional | Description |
|--------|----------|-------------|
| __jails__ |             | Defines a list of requests quotas exceeded limits. Type: `list or array of [QuotasJailFront]`. See details below. |

#### __QuotasJailFront__
Class representing a Requests quotas exceeded limits. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __autoUnlock__ |             | Defines the automatic unlocked. Enabled if set to `true` otherwise `false`. Type: `boolean`. |
| __creation__ |             | Creation date and time of event. Type: `[Instant]`. See details below. |
| __range__ |             | Defines time range.<br/> Available values:<br/> - `DAY`: By day.<br/> - `HOUR`: By hour.<br/> - `MONTH`: By month.<br/> - `WEEK`: By week.
| __serviceName__ |             | Impacted service name. Type: `String`. |
| __type__ |             | Defines the action type of exceeded limits.<br/> Available values:<br/> - `HARD`: Hard, an alert (e-mail) was raised and the service is blocked.<br/> - `SOFT`: Soft, an alert (e-mail) was raised. The service keep to works.
| __usageUuid__ |             | Project name (usage name). Type: `String`. |

#### __Instant__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __nanos__ |             |  Type: `int`. |
| __seconds__ |             |  Type: `long`. |

| Field  | Optional | Description |
|--------|----------|-------------|
| __types__ |             | Types. Type: `list or array of [ConnectorTypeFront]`. See details below. |

#### __ConnectorTypeFront__
Class representing a connector type. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __acSingle__ |             | AC single phase. Type: `boolean`. |
| __acThree__ |             | Current type AC three phases. Type: `boolean`. |
| __ampere__ |             | Ampere of current. Type: `Float`. |
| __cable__ |             | The connector have a cable. Type: `boolean`. |
| __dc__ |             | Current type DC. Type: `boolean`. |
| __deprecated__ |             | Set to true if the information is deprecated. Type: `boolean`. |
| __id__ |             | BeMap unique identifier of connector. Type: `int`. |
| __key__ |             | BeMap unique identifier text key of connector. Same as id field but with string value. Type: `String`. |
| __maxPower__ |             | Maximal power in kW of connector. Unlimited is `0`. Type: `double`. |
| __name__ |             | Name of connector. Type: `String`. |
| __norm__ |             | Norm of connector. Type: `String`. |
| __operatorId__ |             | Operator unique identifier like eMI3 format. Type: `String`. |
| __power__ |             | Available power in kW can be delivered by the station or charge point. Type: `Double`. |
| __voltage__ |             | Voltage of current. Type: `Float`. |

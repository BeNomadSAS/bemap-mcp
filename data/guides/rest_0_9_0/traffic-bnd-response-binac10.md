# REST API, BND version 0.9


## Response of Traffic service in BINAC10 binary format.



**Summary:**

[TOC]



## Binary Format
This format uses a binary structure to reduce the finalized file size and must be readable in streaming by an embedded device. The format is based on the Alert-C / TMC codes.

The Record Separator is symbolized by `[R]` (ASCII* Code = 0x1E).
All integer values will be encoded in Network Byte Order (Big Endian).

### Header of File
All fields of file header are separated by the Record Separator character symbolized by `[R]` and the last field is ended by two `[R][R]`.

| Name        | Description                                                  | Type   | Size (bytes) | Sample     |
| ----------- | ------------------------------------------------------------ | ------ | ------------ | ---------- |
| Signature   | Signature of BeNomad Traffic File. This field must be never change. | String | 10 (fixed)   | BNDTRAFFIC |
| Format      | Format information.                                          | String | Var          | ALERTC     |
| Version     | The first Byte is use for Major version.The second byte is use for Minor version. | Byte   | 2            | 10         |
| Sync Mode   | Synchronization mode F = Full  (Default) I = Incremental (For later use). | Char   | 1            | F          |
| Update Freq | Update frequency in minutes. Available values: 0 to 255.     | Byte   | 1            | 5          |

Sample:`BNDTRAFFIC[R]ALERTC[R]10[R]F[R]5[R][R]`

### Entries

The entries are divided in two types: Information and Event.

#### Information Entry

These fields provide the information about series following event.

The first part of this entry use a fixed size, except the last one which can be a series of delimited records (All extra fields must be separated by the Record Separator character symbolized by `[R]` and the last field is ended by two `[R][R]`.

| Name               | Description                                                  | Type   | Size (bytes) | Sample    |
| ------------------ | ------------------------------------------------------------ | ------ | ------------ | --------- |
| Country Code       | ISO country code.                                            | Char   | 3            | FRA       |
| TMC CC             | TMC country code. Use ASCII* values, 0 to 9 and A to F. (0-F). | Char   | 1            | F         |
| TMC LTN            | LTN (Location Table Number).                                 | Byte   | 1            | 32        |
| Event Count        | Number of following Events.                                  | Long   | 8            | 1537      |
| Provider Date Time | UTC Time of the last data update from the traffic information provider. | Long   | 8            | 701184650 |
| Provider Name      | Name of traffic information provider. This field contents an UTF-8 string. | String | Var          | Navteq    |

#### Event Entry

All fields of this entry use a fixed size and match 40 bit in all.

| Name        | Description                                                  | Type | Size (bits) | Sample |
| ----------- | ------------------------------------------------------------ | ---- | ----------- | ------ |
| Location Id |                                                              | Num  | 16          | 52335  |
| TMC Code    |                                                              | Num  | 11          | 1126   |
| Extend      |                                                              | Num  | 5           | 2      |
| Direction   | Two values are available 0, 1 to indicate the direction of event. 0 for reverse direction (-). 1 for positive direction (+). | Bool | 1           | 1      |
| *Reserved*  | *See the Reserved Fields Description.*                       | -    | 7           | -      |

```
1234567890123456789012345678901234567890 = bit number
|               |          |    ||*    |
|               |          |    ||Reserved
|               |          |    |Direction
|               |          |Extend
|               |Code
|Location Id
```



##### Reserved Fields Description

| Name | Description                                                  | Type | Size  | Sample |
| ---- | ------------------------------------------------------------ | ---- | ----- | ------ |
| Sync | (Optional) Use when the value of Sync Mode field is set to 1. Three values are available: 1 for add event. 2 for update event. 3 for remove event. | Num  | 2 bit | 1      |



## Abbreviated Terms

ASCII	The American Standard Code for Information Interchange is a character-encoding scheme based on the ordering of the English alphabet. ASCII codes represent text in computers, communications equipment, and other devices that use text. Most modern character-encoding schemes are based on ASCII, though they support many more characters than ASCII does.

## Documentation source

From documentation internal file `Traffic_Info_Service-Binary_Format-Spec-1.0.4` at 2011-07-26.

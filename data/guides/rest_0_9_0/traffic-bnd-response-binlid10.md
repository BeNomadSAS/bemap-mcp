# REST API, BND version 0.9


## Response of Traffic service in BINLID binary format.



**Summary:**

[TOC]



## Binary Format

This format uses a binary structure to reduce the finalized file size and must be readable in streaming by an embedded device. The format is LinkID localization.

The Record Separator is symbolized by `[R]` (ASCII* Code = 0x1E).
All integer values will be encoded in Network Byte Order (Big Endian).

### Header of File

All fields of file header are separated by the Record Separator character symbolized by [R] and the last field is ended by two `[R][R]`.

| Name        | Description                                                  | Type   | Size (bytes) | Sample     |
| ----------- | ------------------------------------------------------------ | ------ | ------------ | ---------- |
| Signature   | Signature of BeNomad Traffic File. This field must be never change. | String | 10 (fixed)   | BNDTRAFFIC |
| Format      | Format information.                                          | String | Var          | LinkId     |
| Version     | The first Byte is use for Major version. The second byte is use for Minor version. | Byte   | 2            | 10         |
| Sync Mode   | Synchronization mode F = Full  (Default). I = Incremental (For later use). | Char   | 1            | F          |
| Update Freq | Update frequency in minutes. Available values: 0 to 255.     | Byte   | 1            | 5          |

Sample: `BNDTRAFFIC[R]LINKID[R]10[R]F[R]5[R][R]`.

### Entries

The entries are divided in two types: Information and Event.

#### Information Entry

These fields provide the information about series following event.

The first part of this entry use a fixed size, except the last one which can be a series of delimited records (All extra fields must be separated by the Record Separator character symbolized by `[R]` and the last field is ended by two `[R][R]`.

| Name               | Description                                                  | Type   | Size (bytes) | Sample                |
| ------------------ | ------------------------------------------------------------ | ------ | ------------ | --------------------- |
| Country Code       | ISO country code.                                            | Char   | 3            | FRA                   |
| Event Count        | Number of following Events.                                  | Num    | 4            | 1537                  |
| Provider Date Time | UTC Time of the last data update from the traffic information provider. | Num    | 8            | 701184650             |
| Provider Name      | Name of traffic information provider. This field contents an UTF-8 string. | String | Var          | Carte Blanche Conseil |

```
1234567890123456789012345678901234567890 = bit number
|                               |  | Average speed
|                               |Heading
|Link Id
```

#### Event Entry

All fields of this entry use a fixed size and match 24 bit in all.

| Name           | Description          | Type | Size (bits) | Sample |
| -------------- | -------------------- | ---- | ----------- | ------ |
| Next Sub-Event | 0-511                | Num  | 9           | 4      |
| TMC Code       |                      | Num  | 11          | 701    |
| Traffic state  | 0-8, Real value -1–7 | Num  | 4           | 3      |

```
123456789012345678901234 = bit number
|        |          |Traffic state
|        |TMC Code
|Next Sub-Event
```

#### Sub-Event Entry

All fields of this entry use a fixed size and match 40 bit in all.

| Name          | Description                                                  | Type | Size (bits) | Sample    |
| ------------- | ------------------------------------------------------------ | ---- | ----------- | --------- |
| Link Id       | Link id from data set.                                       | Num  | 32          | 705798850 |
| Heading       | 0-7. This value must be divided by 45 for write. To find the real value multiplied by 45. Real value: 0-360. | Num  | 3           | 5         |
| Average speed | 0-31. This value must be divided by 5 for write. To find the real value multiplied by 5. Real value: 0-155. The value 31 is use for unavailable average speed. | Num  | 5           | 12        |



## Abbreviated Terms

ASCII	The American Standard Code for Information Interchange is a character-encoding scheme based on the ordering of the English alphabet. ASCII codes represent text in computers, communications equipment, and other devices that use text. Most modern character-encoding schemes are based on ASCII, though they support many more characters than ASCII does.

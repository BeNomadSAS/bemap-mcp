# REST API, Service version 1.0.0



## EV POI SVS download



### Summary

1. Specific file generation
 1. Charging station export to SVS
2. To get the list of available files
 1. Details of request fields
 2. Request sample
 3. Details of response fields
 4. Response sample
3. To download a single file
4. To download multiple files in one request
  1. Details of request fields
  2. Request sample
  3. Response format



### Specific file generation

#### Charging station export to SVS
The export of charging stations into SVS is triggered once a week. The stations are separated into distinct files depending on the provider and country. Country files bigger than 10Mo are split (potentially multiple times).



### To get the list of available files

You can get the list of stored files by using the `/bgis/service/download/1.0/list` URI. The request must be sent with the HTTP method `GET` or `POST` and the HTTP header `Content-Type` set to `application/json`. The response is a list of the available files.

#### Details of request fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.download.DownloadFileListRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.download.DownloadFileListRequest"}}
```

In the case of SVS files, the `vpath` must match `evpoi/SCALE` or `evpoi/SCALE/PROVIDER` where `SCALE` is either `100000` or `40000` and the `PROVIDER` is the desired provider.

#### Request sample
```
{
	"vpath": "evpoi/40000/gireve",
	"namefilter": "FRA|MCO"
}
```

#### Details of response fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.download.DownloadDescription">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.download.DownloadDescription"}}
```

#### Response sample
```
{
    "currentFolder": {
        "vpath": "evpoi/40000/gireve",
        "lastModified": "2021-12-28T22:23:33Z"
    },
    "files": [
        {
            "vpath": "evpoi/40000/gireve",
            "filename": "FRA_EVPOI_00_00.svs",
            "size": 101572,
            "lastModified": "2021-12-28T22:21:57Z",
            "hashFormat": "MD5",
            "hash": "6dd6b5c7080fbbf55ce7d1a3e34df342"
        },
        {
            "vpath": "evpoi/40000/gireve",
            "filename": "FRA_EVPOI_10_10.svs",
            "size": 139672,
            "lastModified": "2021-12-28T22:22:01Z",
            "hashFormat": "MD5",
            "hash": "85c464062d21ea61bf77acc270656e68"
        }
    ]
}
```



### To download a single file

An SVS file can be downloaded by using the `/bgis/service/download/1.0/file?vpath=VIRTUAL_PATH` URI, where `VIRTUAL_PATH` is the `virtualPath` value for the desired file. The request must be sent with the HTTP method `GET`.



### To download multiple files in one request

Several SVS files can be downloaded at once by using the `/bgis/service/download/1.0/files` URI with the HTTP method `POST`.

#### Details of request fields
```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.download.DownloadMultipleFilesRequest"}}
```

In the case of SVS files, the `vpath` must match `evpoi/SCALE/PROVIDER` where `SCALE` is either `100000` or `40000` and the `PROVIDER` is the desired provider.

#### Request sample
```
{
	"vpath": "evpoi/40000/gireve",
	"filenames": [
		"BEL_EVPOI_00.svs",
		"BEL_EVPOI_10.svs"
	]
}
```

#### Response format
The response is sent through a byte stream. File order is the same as in the request. Data from each file is preceded with metadata:

##### Header

| Offset | Bytes | Example | Description                        |
| ------ | ----- | ------- | ---------------------------------- |
| 0      | 6     | BNDBDL  | Title of file format.              |
| 6      | 1     | 1       | Version of format. Value 0 to 255. |

##### For each file

| Offset | Bytes | Example    | Description                                                  |
| ------ | ----- | ---------- | ------------------------------------------------------------ |
| 7      | 1     | 0          | `errorCode`: 0 successful. 1 File not found on server side. IF the value is superior to 0 then all fields below will be avoided. |
| 8      | 4     | 1656409370 | `lastModified`: Last modification date and time of file. The value is an EPOCH format in seconds, the time zone must be GMT. The binary value is big-endian. |
| 12     | 16    | -          | `hash`: (Optional) Hash of file data in MD5 format. This field is only available when the parameter `hash` is set to `true` in request. |
| 28     | 8     | 27539      | `size`: File size. Binary value in big-endian.               |
| 36     | -     | -          | Data of file. The number of bytes will be send is mentioned in previous field `size`. |
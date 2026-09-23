| Field  | Optional | Description |
|--------|----------|-------------|
| __currentFolder__ |             | Information about the asked directory. Type: `[DownloadFolderDescription]`. See details below. |
| __files__ |             | File list of asked directory. When the `subtree` parameter is defined to `true`, the returned list can be contains the files of sub-folders. Type: `list or array of [DownloadFileDescription]`. See details below. |

#### __DownloadFolderDescription__
Class describing a folder available for download. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lastModified__ |             | Last modification date of the file. Type: `String`. |
| __vpath__ |             | The virtual path of the file, to be used for downloading. Type: `String`. |

#### __DownloadFileDescription__
Class describing a file available for download. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __filename__ |             | Name of the file. Type: `String`. |
| __lastModified__ |             | Last modification date of the file. Type: `String`. |
| __size__ |             | File size in bytes. Type: `Long`. |
| __vpath__ |             | The virtual path of the file, to be used for downloading. Type: `String`. |
| __hash__ |    optional | Hash value in the hash format. Can be used after download to check for byte errors. Type: `String`. |
| __hashFormat__ |    optional | Hash format used, MD5 by default. Type: `String`. |

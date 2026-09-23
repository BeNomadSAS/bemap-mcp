| Field  | Optional | Description |
|--------|----------|-------------|
| __vpath__ |             | Virtual path of the files to search. Type: `String`. |
| __namefilter__ |    optional | Regular expression filter on the files' name. Type: `String`. |
| __hash__ |    optional | Whether the file hash should be included in the response. Default value: 'false'. Type: `boolean`. |
| __getlastsince__ |    optional |  Date in ISO format (eg 2022-06-14T17:25:13Z). Only the most recent file or subdirectory of the vpath will be listed, if it has been modified since this date. HTTP code 304 (Not Modified) will be returned if there is none. Type: `String`. |
| __subtree__ |    optional | Whether to look into subfolders for the requested files. Default value: 'false'. Type: `boolean`. |

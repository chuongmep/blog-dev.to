## Introduction

I am excited to announce a significant development in data interaction and retrieval processes using [Autodesk Platform Services](https://aps.autodesk.com/) from Autodesk. Today, I am officially releasing the first version of a toolkit designed to facilitate data access, aiming to support AI processes, Data Analysts, LLM, and explore the boundaries where APS may fall short in providing for end-users.

![APSToolkit](https://github.com/chuongmep/aps-toolkit/raw/dev/docs/APSToolkit.png)

[APSToolkit](https://github.com/chuongmep/aps-toolkit) is open-source, ensuring accessibility to all engineers, BIM developers, and data scientists. I am actively working on refining it further. Please feel free to provide any feedback in the comments below this post, and I will consider all suggestions.

## APS Toolkit

[APSToolkit](https://github.com/chuongmep/aps-toolkit) (Former is Forge) is powerful for you to explore `Autodesk Platform Services`(APS). It's built on top of [Autodesk.Forge](https://www.nuget.org/packages/Autodesk.Forge/) and [Newtonsoft.Json](https://www.nuget.org/packages/Newtonsoft.Json/). Forge Toolkit includes some features allow you to read, download and write data from `Autodesk Platform Services` and export to CSV, Excel, JSON, XML, etc.

## 🔦 Features

- Read/Download SVF Model
- Read/Query Properties Database SQLite
- Read/Download Properties Without Viewer
- Read Geometry Data 
- Read Metadata
- Read Fragments
- Read MeshPacks
- Read Images
- Export Data to CSV
- Export Data to Excel
- Export Data to Parquet

...



## 🦴 Installation

Please follow latest update at [APSToolkit Nuget](https://www.nuget.org/packages/APSToolkit)

```bash
<PackageReference Include="APSToolkit" Version="1.*" />
```

Before start you need setup your environment:

```bash
APS_CLIENT_ID = <your client id>
APS_CLIENT_SECRET = <your client secret>
APS_REFRESH_TOKEN = <your refresh token>
```

## ⭐ Getting Started

I want export Revit Data To Excel 👇

### .NET

```csharp
using APSToolkit;
using Autodesk.Forge;
using APSToolkit.Database;
using APSToolkit.Auth;
var token = Authentication.Get2LeggedToken().Result;
string urn = "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLk9kOHR4RGJLU1NlbFRvVmcxb2MxVkE_dmVyc2lvbj0z";
var RevitPropDbReader = new PropDbReaderRevit(urn, token);
RevitPropDbReader.ExportAllDataToExcel("result.xlsx");
```

### Python

```python
from aps_toolkit import Auth
from aps_toolkit import PropDbReaderRevit
auth = Auth()
token = auth.auth2leg()
urn = "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLk9kOHR4RGJLU1NlbFRvVmcxb2MxVkE_dmVyc2lvbj0z"
prop_reader = PropDbReaderRevit(urn, token)
df = prop_reader.get_data_by_category("Ducts")
df.save_to_excel("result.xlsx")
```

## Tutorials

- Please follow the latest update at [APSToolkit](https://github.com/chuongmep/aps-toolkit)

## Contributing

Please read `CONTRIBUTING.md` for details on our code of conduct, and the process for submitting pull requests to us.


## Access Open Source 

- [APSToolkit](https://github.com/chuongmep/aps-toolkit)


## Disclaimer

This is not an official Autodesk product to support for Autodesk Platform Services. Use it at your own risk. 

I'm not responsible for any data loss or any other issues caused by using this library, some features need require cost for using. Please read carefully the [Autodesk Forge](https://forge.autodesk.com/) and [Autodesk Platform Services](https://www.autodesk.com/platform-services) terms of use. I'm just doing, testing , maintaining in free time, so feel free to contribute and make it better. 
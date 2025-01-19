
## Introduction

Lately, I’ve been working extensively with data in Revit models. One of my main tasks is accessing this data efficiently, and I discovered that the Revit Extractor is an excellent tool for extracting SVF files from Revit models. This tool is especially helpful because it allows me to extract SVF files without needing to open Revit. Moreover, the extraction process can run in the background, freeing me up to focus on other tasks.

If you're familiar with the [APS Toolkit](https://github.com/chuongmep/aps-toolkit), you'll understand how seamlessly the Revit Extractor integrates to extract SVF files from Revit models.

In this post, I'll walk you through the process of using the Revit Extractor to extract SVF files from Revit models. This is offical tool from Autodesk, I'm just recommend use it for learning purpose only, please use [Design Automation](https://aps.autodesk.com/en/docs/design-automation/v3/tutorials/revit/) or official support services from Autodesk like [AEC Data Model API](https://aps.autodesk.com/autodesk-aec-data-model-api) for production in case you need to extract data from Revit files to have more control and support from Autodesk.

## Understanding Revit Extractor

Revit Extractor is a powerful tool that allows you to extract SVF files from Revit models. SVF (Simple Vector Format) is used to display Revit models directly in a web browser. You can see an example of this on my demo site: [https://forge.chuongmep.com/](https://forge.chuongmep.com/).

The path to access the Revit Extractor tool is typically:

```
"C:\Program Files\Autodesk\Revit <Revit Version>\RevitExtractor\RevitExtractor.exe"
```

## How to Use Revit Extractor

Follow these steps to extract SVF files using Revit Extractor:

1. **Open the Command Line** and navigate to the folder where Revit Extractor is installed:

   ```bash
   cd "C:\Program Files\Autodesk\Revit <Revit Version>\RevitExtractor\"
   ```

2. **Run the following command** to extract the SVF file from your Revit model:

```bash
RevitExtractor "<Revit Model Path>" "<Output Path>"
```

For example, you can run:

```bash
RevitExtractor "C:\Users\vho2\3D Objects\rac_basic_sample_project.rvt" "D:\_WIP\output"
```

![](./pic/cmd_DOpPTVCdqM.png)

3. **Wait for the extraction process** to complete.

4. Once finished, you will find the SVF files in the specified output folder.

![](./pic/explorer_3RwOo9Zj0O.png)

5. Now, you can try see the report and explore local data from folder extracted.

```json
{
    "name": "Autodesk Design Description",
    "version": "0.1",
    "designDescription": {
        "id": "ADFFE347-AF8F-48E7-8EC1-4BA7F40E4A53",
        "name": "My XRef File Design",
        "currentVersion": "1",
        "designGraphs": [
            {
                "creationDate": "2024-09-25 10:43:06",
                "creatingService": "RVT LMV Extractor XRef",
                "rootIds": [
                    1
                ],
                "designObjectRefs": [],
                "designObjects": [
                    {
                        "id": 1,
                        "version": 0,
                        "about": "",
                        "relativePath": "rac_basic_sample_project.rvt",
                        "displayName": "rac_basic_sample_project.rvt",
                        "contentType": ".rvt",
                        "shareInfo": null,
                        "references": [],
                        "metadata": {}
                    }
                ]
            }
        ]
    }
}
```

## How to Read SVF Data

- **SVF Viewer**: To view SVF files in the browser, visit the example at [https://forge.chuongmep.com/](https://forge.chuongmep.com/).

### Reading SVF Data Locally

#### 1. Using C#

```csharp
string path = @"\MyRoom.svf";
ISvfContent svfContent = SvfReader.ReadSvf(path);
PropDbReader properties = svfContent.properties;
// Process the properties as needed
```

#### 2. Using Python

Please make sure you upgrade library in latest version large than `1.0.7`

```bash
pip install aps-toolkit --upgrade
```

This is how you can read SVF data in Python and try to get all categories :  
```python
from aps_toolkit import PropDbReaderRevit
path = r"C:\Users\vho2\3D Objects\output\output\Resource\3D View\{3D} 960621\{3D}.svf"
prop = PropDbReaderRevit.read_from_resource(path)
## get all categories
import pandas as pd
cate_dict = prop.get_all_categories()
df = pd.DataFrame.from_dict(cate_dict, orient='index')
df.head(10)
```
---

![](./pic/Code_XZgNd5bA28.png)


## Revit Extractor

[Revit Extractor](https://github.com/chuongmep/revit-extractor) is a library that allows you to export native data from Revit files without needing to open Revit. It’s particularly useful for extracting data from Revit files and integrating it into other systems.

Requirements with Revit Extractor

- Make sure you have Revit installed on your machine.
- Make sure you have Python installed on your machine version `3.9` or later.

How to use Revit Extractor

1. Install the library by using pip:
```bash
pip install revit-extractor --upgrade
```

2. Get Revit Version 

```
from revit_extract import RevitExtractor
rvt_path = r"D:\_WIP\Download\Sample Office Building Model V1.rvt"
version = RevitExtractor.get_version(rvt_path)
print(version)
```

3. Use the library in your code:

- Extract all categories from Revit file:

```python
from revit_extract import RevitExtractor
rvt_path = r"D:\_WIP\Download\Sample Office Building Model V1.rvt"
prodb = RevitExtractor(rvt_path).read_prob_data()
categories = prodb.get_all_categories()
for key in categories:
    print(key, categories[key])
```

- Extract data by categories and parameters from Revit file:
```python
from revit_extract import RevitExtractor
rvt_path = r"D:\_WIP\Download\Sample Office Building Model V1.rvt"
prodb = RevitExtractor(rvt_path).read_prob_data()
categories =["Walls", "Doors"]
params = ["Name", "Type", "Level"]
data_frame = prodb.get_data_by_categories_and_params(categories, params)
data_frame.to_excel("output.xlsx", index=False)
```


## Limitations

Sometime RevitExtractor show issue doesn't support the Revit file version 2024 which is later than Revit 2022 even same version, I'm also don't know why. I'm not sure about the reason, but you can see the error message below:

```bash
- 2024-09-25 16:02:11,696 build_commit:88813c592a996475176658ce000a392b686ad6f9 INFO Application Version: 88813c592a996475176658ce000a392b686ad6f9
- 2024-09-25 16:02:11,711 build_commit:88813c592a996475176658ce000a392b686ad6f9 INFO          Input File: C:\Users\chuongho\Downloads\rac_basic_sample_projec2024t.rvt
- 2024-09-25 16:02:11,711 build_commit:88813c592a996475176658ce000a392b686ad6f9 INFO           File Size: 18.8203125MB
- 2024-09-25 16:02:11,778 build_commit:88813c592a996475176658ce000a392b686ad6f9 INFO     Resume On Error: True
- 2024-09-25 16:02:11,778 build_commit:88813c592a996475176658ce000a392b686ad6f9 INFO Time Keeper Enabled: True
- 2024-09-25 16:02:11,778 build_commit:88813c592a996475176658ce000a392b686ad6f9 INFO         WER Enabled: True
[[extractor-metrics]]:{"rvt-BuildCommit":"88813c592a996475176658ce000a392b686ad6f9"}
- 2024-09-25 16:02:11,796 build_commit:88813c592a996475176658ce000a392b686ad6f9 INFO         Output Root: C:\Users\chuongho\AppData\Local\Temp\output
- 2024-09-25 16:02:11,796 build_commit:88813c592a996475176658ce000a392b686ad6f9 INFO No index.json provided, default settings will be used.
- 2024-09-25 16:02:11,796 build_commit:88813c592a996475176658ce000a392b686ad6f9 INFO           Temp Root: C:\Users\chuongho\AppData\Local\Temp\RevitExtractor\
- 2024-09-25 16:02:11,804 build_commit:88813c592a996475176658ce000a392b686ad6f9 INFO Spooler service started: True
- 2024-09-25 16:02:11,804 build_commit:88813c592a996475176658ce000a392b686ad6f9 WARN Failed to enable Error Recovery.
[[extractor-metrics]]:{"rvt-VersionNumber":"2024"}
- 2024-09-25 16:02:11,820 build_commit:88813c592a996475176658ce000a392b686ad6f9 ERROR RevitExtractor doesn't support the Revit file version 2024 which is later than Revit 2022.
- 2024-09-25 16:02:11,926 build_commit:88813c592a996475176658ce000a392b686ad6f9 INFO Total Time: 00:00:00.6997873
[[extractor-metrics]]:{"rvt-ElapsedTime":"699"}
- 2024-09-25 16:02:11,926 build_commit:88813c592a996475176658ce000a392b686ad6f9 INFO RevitExtractor exit with error code UnsupportedVersionLater(-536870931).
```

## Conclusion

The Revit Extractor is a valuable tool for extracting SVF files from Revit models. By following the steps outlined in this post, you can easily extract SVF files without needing to open Revit. This tool is especially useful for automating the extraction process and saving time. I hope this post has been helpful in guiding you through the process of using the Revit Extractor to extract SVF files from Revit models.

Some topics to consider reading:

- [revit-extractor](https://github.com/chuongmep/revit-extractor)

- [Starting Back With APS Part 1 - Getting Started](https://chuongmep.com/posts/2023-10-30-Let-Back-To-Forge.html#starting-back-with-aps-part-1-getting-started)

- [Starting Back With APS Part 2 - Load Viewer](https://chuongmep.com/posts/2023-12-17-Let-Back-To-Forge-Part2.html#starting-back-with-aps-part-2-load-viewer)

- [How to convert Revit files to SVF without an APS account](https://e-verse.com/learn/how-to-convert-revit-files-to-svf-without-an-aps-account/)

## Disclaimer

This is not an official method recommended by Autodesk, for academic purposes only, please use [Design Automation](https://aps.autodesk.com/en/docs/design-automation/v3/tutorials/revit/) or official support services from Autodesk like [AEC Data Model API](https://aps.autodesk.com/autodesk-aec-data-model-api)
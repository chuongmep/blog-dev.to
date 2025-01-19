
## Introduction

I think what **Autodesk** needs to do primarily is to minimize the number of annual **Revit** updates and, instead, provide supplementary updates to each version. This reminds me of the Office versions; they listened to users and reduced the number of versions, now only having [Office 365](https://www.office.com/). I believe this would make it easier for users to choose the Revit version that suits them.

![](pic/womanyellingcat-1573233850.jpg)

Furthermore, the tasks involved also include updating Revit versions to the latest, which would incur additional costs for companies in terms of updating [Revit](https://www.autodesk.com.sg/products/revit/overview) versions and maintaining plugins for the new Revit versions. Not only Revit, but other software like Naviswork, Civil 3D, etc., are also facing this issue. Fortunately, Rhino has handled this well by changing versions every 2-3 years. Recently, [Rhino 8](https://www.rhino3d.com/8/new/) introduced many attractive new features.

Returning to our story today, I am facing a headache in having to redefine definitions on **Design Automation** to execute on different Revit versions. This issue makes me repeat the work many times and takes up more time. So, I've been trying to find a way to solve this problem, but it only reduces the workload to some extent.

You can take a look at an official guide from Autodesk on how to create App Bundles and Activity [Register the AppBundle](https://aps.autodesk.com/en/docs/design-automation/v3/tutorials/revit/step4-publish-appbundle/): 

```bash {7}
curl -X POST \
  'https://developer.api.autodesk.com/da/us-east/v3/appbundles' \
  -H 'Authorization: Bearer <YOUR_ACCESS_TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": "DeleteWallsApp",
  "engine": "Autodesk.Revit+2024",
  "description": "Delete Walls AppBundle based on Revit 2024"
}'
```
In the context above, if we have multiple versions of Revit, we would need to create multiple different `App Bundles` to execute the wall deletion action. So, how can we address this issue?

## Get Revit Version Without Open Revit

Some people said with me trust Version with Name of model and standard version of Revit. But I don't trust it, because I can change name of model and standard version of Revit. So I need to get version of Revit from model file. Some people will forget rename or missing update Model, ...

If you want to get the Revit version without opening Revit in your computer, you can use the following python code:


```python
import os.path as op
import olefile
import re

def get_rvt_file_version(rvt_file):
  if op.exists(rvt_file):
    if olefile.isOleFile(rvt_file):
      rvt_ole = olefile.OleFileIO(rvt_file)
      bfi = rvt_ole.openstream("BasicFileInfo")
      file_info = bfi.read().decode("utf-16le", "ignore")
      pattern = re.compile(r"\d{4}")
      rvt_file_version = re.search(pattern, file_info)[0]
      return rvt_file_version
    else:
      print("file does not apper to be an ole file: {}".format(rvt_file))
  else:
    print("file not found: {}".format(rvt_file))
path = r'C:\Users\chuongho\OneDrive\Documents\Autodesk_Platform-Services\Tasks\MetadataExtract\MyHouseRCP_2024.rvt'
version = get_rvt_file_version(path)
print(version)
```

OUTPUT

```bash
2024
```
In the case you have a list folder with many Revit files, you can use `pandas` library to get all files and their version, and then show the dataframe summary.
Let's the following python code:

```python
import os
import pandas as pd
import os.path as op
import olefile
import re

def get_rvt_file_version(rvt_file):
  if op.exists(rvt_file):
    if olefile.isOleFile(rvt_file):
      rvt_ole = olefile.OleFileIO(rvt_file)
      bfi = rvt_ole.openstream("BasicFileInfo")
      file_info = bfi.read().decode("utf-16le", "ignore")
      pattern = re.compile(r"\d{4}")
      rvt_file_version = re.search(pattern, file_info)[0]
      return rvt_file_version
    else:
      print("file does not apper to be an ole file: {}".format(rvt_file))
  else:
    print("file not found: {}".format(rvt_file))
def get_files():
    all_files = []
    for folder, sub_folders, files in os.walk(".", topdown=False):
        for f in files:
            if f.endswith('.rvt'):
                file_path = os.path.join(folder, f)
                file_size = os.path.getsize(file_path)
                revit_version = get_rvt_file_version(file_path)
                all_files.append({"file": f, "size": file_size, "folder": folder, "revit_version": revit_version})
    return all_files
files = get_files()

# Create DataFrame
df = pd.DataFrame(files, columns=["file", "size", "folder", "revit_version"])
print("Total files found: ", len(df))
print(df)
df_sum = df
df_sum['size'] = df_sum['size'] / (1024 * 1024)
df_sum['size'] = df['size'].round(2)
df_sum['size'] = df['size'].astype(str) + ' MB'
df_sum = df_sum.sort_values(by=['file'])
df_sum.head(20)
```


Or you can use C# code below:

```csharp
void Main()
{
	string path = @"C:\Users\chuongho\OneDrive\Documents\Autodesk_Platform-Services\Tasks\MetadataExtract\MyHouseRCP_2024.rvt";
	var version = GetVersion(path);
	Console.WriteLine(version);
}
private const string MatchVersion = @"((?<=Autodesk Revit )20\d{2})|((?<=Format: )20\d{2})";
public static string GetVersion(string filePath)
{
	var version = string.Empty;
	Encoding useEncoding = Encoding.Unicode;
	using (FileStream file = new FileStream(filePath, FileMode.Open))
	{
		for (int i = 0; i < 20; i++)
		{
			byte[] buffer = new byte[2000];
			file.Seek(i, SeekOrigin.Begin);
			while (file.Read(buffer, 0, buffer.Length) != 0)
			{
				var head = useEncoding.GetString(buffer);
				Regex regex = new Regex(MatchVersion);
				var match = regex.Match(head);
				if (match.Success)
				{
					version = match.ToString();
					return version;
				}
			}
		}
	}

	return version;
}
```
OUTPUT

```bash
2024
```
The above approach would be suitable for those who want to retrieve the Revit version without opening Revit. However, that doesn't make sense for Design Automation. Therefore, we will use a different method.

## Get Revit Version From Design Automation

Indeed, executing tasks in the cloud demands considerable effort when creating distinct App Bundles for various versions to perform the same task. For instance, if I have 4 Revit files on BIM 360 with different versions, I would need to define 4 separate App Bundles for execution. It seems like quite a challenging task, doesn't it?

![](pic/KNOWYOURMEME-sad-cat-crying-1120.jpg)

There seems to be no alternative other than creating 4 distinct App Bundles. However, we can determine the version through the information returned by the Rest API in the API version.

```csharp {7}
using Autodesk.Forge;
public static async Task<Version> GetRevitVersion(string token,string projectId,string versionId)
{
    VersionsApi versionApi = new VersionsApi();
    versionApi.Configuration.AccessToken = token;
    dynamic version = await versionApi.GetVersionAsync(projectId, versionId).ConfigureAwait(false);
    long revitVersion = version.data.attributes.extension.data.revitProjectVersion;
    // return enum match with revitversion like v2020, v2021, v2022,... . Revitversion is 2020, 2021, 2022,...
    return (Version)Enum.Parse(typeof(Version), $"v{revitVersion}");

}
// easier to custom for my project.
public enum Version
{
    v2020 = 2020,
    v2021 = 2021,
    v2022 = 2022,
    v2023 = 2023,
    v2024 = 2024,
    v2025 = 2025,
}
```

Below is the location where we can retrieve the Revit version through the API version. The location version.data.attributes.extension.data.revitProjectVersion allows us to obtain the main version of Revit files on [BIM 360](https://www.autodesk.com/bim-360/).

```json {36}
{
  "jsonapi": {
    "version": "1.0"
  },
  "links": {
    "self": {
      "href": "https://developer.api.autodesk.com/data/v1/projects/b.ca790fb5-141d-4ad5-b411-0461af2e9748/versions/urn:adsk.wipprod:fs.file:vf.HX2O7xKUQfukJ_hgHsrX_A%3Fversion\u003d35"
    }
  },
  "data": {
    "type": "versions",
    "id": "urn:_____",
    "attributes": {
      "name": "_____.rvt",
      "displayName": "_____.rvt",
      "createTime": "2023-12-13T10:02:43Z",
      "createUserId": "_____",
      "createUserName": "Van Chuong Ho",
      "lastModifiedTime": "2023-12-13T10:15:56Z",
      "lastModifiedUserId": "_____",
      "lastModifiedUserName": "Van Chuong Ho",
      "versionNumber": 35,
      "mimeType": "application/vnd.autodesk.r360",
      "storageSize": 126599168,
      "fileType": "rvt",
      "extension": {
        "type": "versions:autodesk.bim360:C4RModel",
        "version": "1.3.1",
        "schema": {
          "href": "https://developer.api.autodesk.com/schema/v1/versions/versions:autodesk.bim360:C4RModel-1.3.1"
        },
        "data": {
          "modelVersion": 39,
          "isCompositeDesign": false,
          "mimeType": "application/vnd.autodesk.r360",
          "revitProjectVersion": 2022,
          "projectGuid": "f10b5c85-fd34-435a-9206-e5a8c21d762c",
          "publishType": "WithLinks",
          "originalItemUrn": "_____",
          "modelType": "multiuser",
          "latestEpisodeGuid": "_____",
          "modelGuid": "_____",
          "processState": "PROCESSING_COMPLETE",
          "extractionState": "SUCCESS",
          "splittingState": "NOT_SPLIT",
          "reviewState": "NOT_IN_REVIEW",
          "revisionDisplayLabel": "35",
          "sourceFileName": "_____",
          "conformingStatus": "NONE"
        }
      }
    },
.....................

```

## Conclusion

I have successfully addressed the issue of having to create multiple `App Bundles` for execution across different versions of Revit. However, this does not resolve the challenge of needing to create numerous `Activity` instances for execution on various Revit versions. Therefore, I will continue exploring this issue in upcoming articles. If you have any updates, I would be delighted to hear from you and incorporate additional information into this article. Thank you for reading.

If I could make a wish, I wish Autodesk takes heed of this.

**I can think a few solution for this issue:**

- Create Bundle App for each version of Revit and delete Bundle App after use. 

- Create Bundle App for each version of Revit and keep Bundle App for next use (I'm using this solution).

- Don't create Bundle App, don't use Design Automation.

## Reference

- [Basic File Info and RVT File Version](https://thebuildingcoder.typepad.com/blog/2013/01/basic-file-info-and-rvt-file-version.html)
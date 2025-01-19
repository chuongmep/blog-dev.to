
## Introduction

Today I'd like to share a small tool I just developed that has been very helpful for me whenever I need to connect to the API services of Autodesk Platform Services.

This is a simple extension allows you to get the APS ACC URL details include: 

- Project Id : A Project in Autodesk Forge is a specific workspace within a Hub. It's where the actual design and construction data is stored. Each project contains folders, items, and versions. The project id is unique for each project within a hub.

- Folder Urn : The folder urn is the unique identifier for a folder in a project. It is used to identify the folder in the project.
- Entity Id : The entity id is the unique identifier for an entity in a folder. It is used to identify the entity/item in the folder.
- Model View Id : The model view id is the unique identifier for a model view in a folder. It is used to identify the model view in the folder.

## Installation

- Chrome / Edge: Install From [Chrome Store](https://chromewebstore.google.com/detail/url-details-acc-extension/jjjpiegllaokfphbppbfenphdfmdhbjc)

- Firefox Install From [Firefox Store](https://addons.mozilla.org/en-US/firefox/addon/url-details-acc/)

## How to use 

- Install the extension
- Open the Project in `Autodesk Construction Cloud` and click on the icon to get the URL details

![](https://raw.githubusercontent.com/chuongmep/acc-urn-extension/master/docs/firefox_yumhE9fZ2D.gif)

- Copy the URL details and share it with others, you can quickly use it in [APS Toolkit](https://github.com/chuongmep/aps-toolkit)

```py
from aps_toolkit import BIM360
bim360 = BIM360(token)
bim360.batch_report_item_versions(projects_id, itemId)
```

## Development

### Firefox

- Manual Install :
    - Clone the repository
    - Open `about:debugging#/runtime/this-firefox`
    - Click on `Load Temporary Add-on...`
    - Select the `manifest.json` file from the cloned repository
    - The extension will be installed and you can see the icon in the toolbar
    - Open ACC Project and click on the icon to get the URL details

- Addon Online Store : [URL Details](https://addons.mozilla.org/en-US/firefox/addon/url-details-acc/)

### Chrome / Edge

- Manual Install :
    - Clone the repository
    - Open `chrome://extensions/`
    - Click on `Load unpacked`
    - Select the cloned repository
    - The extension will be installed and you can see the icon in the toolbar
    - Open ACC Project and click on the icon to get the URL details

## Documentation 

- [Firefox Developer](https://addons.mozilla.org/en-US/developers/addon/url-details-acc/edit)
- [Chrome Developer](https://chrome.google.com/webstore/devconsole/)
- [Edge Developer](https://partner.microsoft.com/en-us/dashboard/microsoftedge/overview)

## How to get Urn from ACC

With urn, you just need use this command from console to get the info urn detail:

```bash
NOP_VIEWER.model.myData.urn
```
output: "you derivative urn"

![](pic/iShot_2024-04-02_21.50.13.png)

Now you can quick check with APS Toolkit or another tool to get the info from urn:

```py
from aps_toolkit import Auth
from aps_toolkit import PropDbReaderRevit
auth = Auth()
token = auth.auth2leg()
urn = "<Derivative URN>"
prop_reader = PropDbReaderRevit(urn, token)
df = prop_reader.get_data_by_category("Ducts")
df.save_to_excel("result.xlsx")
```

## How to get URN from Bucket Uploaded

With Bucket, you need to do three step to get the urn:

1. Upload file to bucket

```cs
using Autodesk.Forge;
using Autodesk.Forge.Core;
using Autodesk.Forge.DesignAutomation;
using Autodesk.Forge.Model;
using NUnit.Framework;
 [TestCase("chuong_1212121", "./Resources/rac_basic_sample_project.rvt")]
    public async Task UploadFileToBucket(string bucketKey, string filePath)
    {
        // Create a bucket if it doesn't exist
        BucketsApi bucketsApi = new BucketsApi();
        bucketsApi.Configuration.AccessToken = Token.AccessToken;
        var bucketPayload = new PostBucketsPayload(bucketKey, null, PostBucketsPayload.PolicyKeyEnum.Transient);
        // check if bucket exists
        dynamic bucketExists = await bucketsApi.GetBucketDetailsAsync(bucketKey);
        if (bucketExists == null)
        {
            dynamic bucket = await bucketsApi.CreateBucketAsync(bucketPayload, "US");
        }
        else
        {
            Console.WriteLine("Bucket already exists");
        }
        // Upload file to the bucket
        ObjectsApi objectsApi = new ObjectsApi();
        objectsApi.Configuration.AccessToken = Token.AccessToken;
        using (StreamReader streamReader = new StreamReader(filePath))
        {
            string fileFullPath = Path.GetFullPath(filePath);
            if (!File.Exists(fileFullPath))
            {
                throw new Exception("The file does not exist");
            }
            string name = Path.GetFileName(filePath);
            streamReader.BaseStream.Seek(0, SeekOrigin.Begin);
            dynamic upload = await objectsApi.UploadObjectAsync(bucketKey,name ,
                (int)streamReader.BaseStream.Length, streamReader.BaseStream, "application/octet-stream");
            Console.WriteLine("File uploaded to bucket");
        }
    }
```

2. Translate file to derivative

```cs
using Autodesk.Forge;
using Autodesk.Forge.Core;
using Autodesk.Forge.DesignAutomation;
using Autodesk.Forge.Model;
using NUnit.Framework;
[TestCase("urn:adsk.objects:os.object:chuong_1212121/rac_basic_sample_project.rvt")]
public async Task CreateTranslationJob(string objectId)
{

    DerivativesApi derivativesApi = new DerivativesApi();
    derivativesApi.Configuration.AccessToken = Token.AccessToken;
    // get translation job
    objectId = Base64Encode(objectId);
    JobPayload job = new JobPayload(
        new JobPayloadInput(objectId),
        new JobPayloadOutput(
            new List<JobPayloadItem>
            {
                new JobPayloadItem(JobPayloadItem.TypeEnum.Svf, new List<JobPayloadItem.ViewsEnum> { JobPayloadItem.ViewsEnum._3d })
            }));
    dynamic jobResult = await derivativesApi.TranslateAsync(job);
    Console.WriteLine("Translation job created");
}
private static string Base64Encode(string str)
{
    var bytes = System.Text.Encoding.UTF8.GetBytes(str);
    return System.Convert.ToBase64String(bytes).TrimEnd('=');
}
```

3. Get the urn from the derivative

```cs{14}
using Autodesk.Forge;
using Autodesk.Forge.Core;
using Autodesk.Forge.DesignAutomation;
using Autodesk.Forge.Model;
using NUnit.Framework;
[TestCase("urn:adsk.objects:os.object:chuong_1212121/rac_basic_sample_project.rvt")]
    public async Task GetManifest(string objectId)
    {
        DerivativesApi derivativesApi = new DerivativesApi();
        derivativesApi.Configuration.AccessToken = Token.AccessToken;
        objectId = "urn:adsk.wipprod:fs.file:vf.Od8txDbKSSelToVg1oc1VA?version=33";
        objectId = Base64Encode(objectId);
        dynamic manifest = await derivativesApi.GetManifestAsync(objectId);
        string urn = manifest.urn;
        Console.WriteLine(manifest);
    }
```

Let's look to the json output from manifest to see more details.

```json{7}
{
  "type": "manifest",
  "hasThumbnail": "true",
  "status": "success",
  "progress": "complete",
  "region": "US",
  "urn": "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLk9kOHR4RGJLU1NlbFRvVmcxb2MxVkE_dmVyc2lvbj0zMw",
  "version": "1.0",
  "derivatives": [
    {
      "name": "MyHouse.rvt",
      "hasThumbnail": "true",
      "status": "success",
      "progress": "complete",
      "properties": {
        "Document Information": {
          "RVTVersion": "2024",
          "Project Name": "Project Name",
          "Project Number": "Project Number",
          "Author": "",
          "Project Address": "Enter address here",
          "Project Issue Date": "Issue Date",
          ...
```
## How to snoop model name ? 

let's use this command from console :

```bash
NOP_VIEWER.model.getData().loadOptions.bubbleNode.getRootNode().children[0].name()
```

## Convert URN To Meaning 

With the urn, you can convert to meaning with this command from console:

```cs
static string Base64Decode(string base64EncodedData)
{
// Validate Base64 string
if (string.IsNullOrEmpty(base64EncodedData))
  throw new ArgumentNullException(nameof(base64EncodedData), "Input cannot be null or empty.");

// Use regex to check if the string is a valid Base64
if (!Regex.IsMatch(base64EncodedData, @"^[a-zA-Z0-9\+/]*={0,2}$"))
  throw new FormatException("Input is not a valid Base64 string.");

// Pad the Base64 string to ensure it is a valid length
base64EncodedData = base64EncodedData.PadRight(base64EncodedData.Length + (4 - base64EncodedData.Length % 4) % 4, '=');

// Decode the Base64 string
var base64EncodedBytes = Convert.FromBase64String(base64EncodedData);
return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
}
```

Note: In the case you have character "_" in urn, you need to replace it with "/"

```cs
var result = Base64Decode("dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLk9kOHR4RGJLU1NlbFRvVmcxb2MxVkE/dmVyc2lvbj0zMw");
Console.WriteLine(result);
string afterBase = Base64Encode(result);
Console.WriteLine(afterBase);
```
The output meaning will be : `urn:adsk.wipprod:fs.file:vf.Od8txDbKSSelToVg1oc1VA?version=33`

## Open Source

This extension is open source and available on [GitHub](https://github.com/chuongmep/acc-urn-extension). I'm so lazy to write more feature, but if you have any idea, please feel free to contribute.

## Change Log 

1.1.0 - Initial release, ACC URL Details

1.2.0 - Add support BIM360-ACC URL Details
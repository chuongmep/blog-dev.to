The **[Autodesk Platform Services](https://aps.autodesk.com/)** (APS) SDK for .NET helps .NET developer create applications that leverage the various APS services: Model Derivative, Data Management, OSS, Webhooks. More services soon.

**Buckets** are virtual container within the **Object Storage Service** (OSS), which you can use to store and manage objects (files) in the cloud.

First, you need to install the package [aps-sdk-net](https://github.com/autodesk-platform-services/aps-sdk-net) library : 

```bash
  <PackageReference Include="Autodesk.Oss" Version="2.0.0" />
```
## Create a Bucket
So now you can use some code like this to create an bucket: 

```cs
using Autodesk.Oss.Model;
using Autodesk.SDKManager;
var sdkManager = SdkManagerBuilder
			.Create()
			.Add(new ApsConfiguration())
			.Add(ResiliencyConfiguration.CreateDefault())
			.Build();
var _ossClient = new OssClient(sdkManager);
Bucket bucket = await _ossClient.CreateBucketAsync(
			accessToken: token,
			xAdsRegion: Region.US,
			bucketsPayload: new CreateBucketsPayload()
			{
				BucketKey = bucketKey,
				PolicyKey = PolicyKey.Temporary
			});
```
## Get Bucket Details 

```cs
Bucket bucket = await _ossClient.GetBucketDetailsAsync(
			 accessToken: token,
			 bucketKey: bucketKey);
```

## Get Bucket : 
```cs
Buckets buckets = await _ossClient.GetBucketsAsync(accessToken: token);
```

## Delete Bucket 
```cs
HttpResponseMessage httpResponseMessage = await _ossClient.DeleteBucketAsync(
			 accessToken: token,
			 bucketKey: bucketKey);
```

## Upload an object to bucket 

```cs
ObjectDetails objectDetails = await _ossClient.UploadObjectAsync(
			accessToken: token,
			bucketKey: bucketKey,
			objectKey: objectKey,
			sourceToUpload: sourceToUpload,
			cancellationToken: CancellationToken.None);
```

## Copy object from bucket

```cs 
ObjectDetails objectDetails = await _ossClient.CopyToAsync(
			accessToken: token,
			bucketKey: bucketKey,
			objectKey: objectKey,
			newObjName: newObjName);
```

## Download Bucket Object

```cs
	await _ossClient.DownloadObjectAsync(
			accessToken: token,
			bucketKey: bucketKey,
			objectKey: objectKey,
			filePath: filePath,
			cancellationToken: CancellationToken.None);
```

## Get Object Info

```cs
BucketObjects bucketObjects = await _ossClient.GetObjectsAsync(
			accessToken: token,
			bucketKey: bucketKey);
```

## Detele Object Info 

```cs
HttpResponseMessage httpResponseMessage = await _ossClient.DeleteObjectAsync(
			accessToken: token,
			bucketKey: bucketKey,
			objectKey: objectKey);
```

## Reference 
- [aps-sdk-net](https://github.com/autodesk-platform-services/aps-sdk-net)
- [Create an App-Managed Bucket and Upload a File](https://aps.autodesk.com/en/docs/data/v2/tutorials/app-managed-bucket/)
- [Data Management API](https://aps.autodesk.com/en/docs/data/v2/reference/http/buckets-POST/)

## Introduction

This is a rather intriguing article that will help you unravel the mystery behind the sequence of `urn` derivatives use `Autodeks Platform Services`. Through this exposition, you will gain insight into how to encode and decode this numerical sequence, making it applicable for various purposes.

For Example:

```json {2,10}
{
"urn": "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLk40dXBJT3ZNUkJ5UUR0MXU4dmE0Qnc_dmVyc2lvbj0y",
"derivatives": [
{
"extractorVersion": "2025.4.0.1298",
"hasThumbnail": "true",
"overrideOutputType": "svf2",
"children": [
{
    "urn": "urn:adsk.viewing:fs.file:dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLk40dXBJT3ZNUkJ5UUR0MXU4dmE0Qnc_dmVyc2lvbj0y/output/Resource/model.sdb",
    "role": "Autodesk.CloudPlatform.PropertyDatabase",
    "mime": "application/autodesk-db",
    "guid": "6fac95cb-af5d-3e4f-b943-8a7f55847ff1",
    "type": "resource",
    "status": "success"
},
```

Or in another example like this:

```json {4}
"derivatives": {
    "data": {
        "type": "derivatives",
        "id": "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLjEzLVdVN2NBU2kyQThVdUNqQVFmUkE_dmVyc2lvbj0x"
    },
    "meta": {
        "link": {
            "href": "https://developer.api.autodesk.com/modelderivative/v2/designdata/dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLjEzLVdVN2NBU2kyQThVdUNqQVFmUkE_dmVyc2lvbj0x/manifest?scopes=b360project.fd732111-54d2-4f3c-84a8-27a7db278c65,O2tenant.8495666"
        }
    }
},
```

Below is a quick snapshot captured from the Postman results using the APS API:

![](pic/Postman_k01WbIGC6s.png)

In reality, this sequence of numbers is encoded in [Base64](https://vi.wikipedia.org/wiki/Base64).

[Base64](https://vi.wikipedia.org/wiki/Base64) is a group of binary-to-text encoding schemes that represent binary data (specifically, 8-bit byte sequences) in ASCII string format by translating the data into a base-64 representation. The term Base64 originates from a MIME content transfer encoding. Each Base64 digit does not represent precisely 6 bits of data. Therefore, three 8-bit bytes (24 bits) can be represented by four Base64 digits of 6 bits each.

## Decoder Derivative Urn

To decode this sequence of numbers, you can use a few simple lines of code in C# as follows:

- Replace the character `_` with `/`

- We get a new result: `dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLk40dXBJT3ZNUkJ5UUR0MXU4dmE0Qnc/dmVyc2lvbj0y`

- Now, we will convert this string into a byte array and then transform this byte array into a readable string.

```csharp
// The Base64-encoded string
string base64EncodedString = "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLk40dXBJT3ZNUkJ5UUR0MXU4dmE0Qnc/dmVyc2lvbj0y";
// Decode the Base64-encoded string to bytes
byte[] bytes = Convert.FromBase64String(base64EncodedString);
// Convert the bytes to a readable string
string decodedString = Encoding.UTF8.GetString(bytes);

// Print the result
Console.WriteLine("Original Base64 String: " + base64EncodedString);
Console.WriteLine("Decoded String: " + decodedString);
```

You can use similar way with python:

```python
import base64
import urllib.parse
base64EncodedString = "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLk40dXBJT3ZNUkJ5UUR0MXU4dmE0Qnc/dmVyc2lvbj0y"
decodedString = base64.b64decode(urllib.parse.unquote(base64EncodedString)).decode('utf-8')
print(decodedString)

```

The returned result will be `urn:adsk.wipprod:fs.file:vf.N4upIOvMRByQDt1u8va4Bw?version=2`. This URN represents a path to a file on BIM 360 Docs, and the file's version is 2. This information provides insight into the context of the decoded sequence.

## Encode Derivative Urn

Similarly to the method described above, to encode a path to a file on BIM 360 Docs, you can use a few simple lines of code in C# as follows:

- Retrieve the path to the file on BIM 360 Docs and its version.
- Convert the string into a byte array, then transform this byte array into a Base64 string.
- Replace the character `/` with `_`
- Convert the string into a byte array, then transform this byte array into a Base64 string.

```csharp
string origin = "urn:adsk.wipprod:fs.file:vf.N4upIOvMRByQDt1u8va4Bw?version=2";
Console.WriteLine("Original String: " + origin);
var result = Convert.ToBase64String(Encoding.UTF8.GetBytes(origin));
Console.WriteLine("Encoder String: " + result);
// replace character "/" with "_"
result = result.Replace("/", "_");
Console.WriteLine("Encoder String: " + result);
```
You can use similar way with python:

```python
import base64
import urllib.parse
origin = "urn:adsk.wipprod:fs.file:vf.N4upIOvMRByQDt1u8va4Bw?version=2"
print("Original String: " + origin)
result = base64.b64encode(origin.encode('utf-8'))
print("Encoder String: " + result.decode('utf-8'))
# replace character "/" with "_"
result = result.decode('utf-8').replace("/", "_")
print("Replace Encoder String: " + result)
```

Returned result:

```bash
Original String: urn:adsk.wipprod:fs.file:vf.13-WU7cASi2A8UuCjAQfRA?version=1
Encoder String: dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLjEzLVdVN2NBU2kyQThVdUNqQVFmUkE/dmVyc2lvbj0x
Replace Encoder String: dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLjEzLVdVN2NBU2kyQThVdUNqQVFmUkE_dmVyc2lvbj0x
```

::: tip
If you are using Revit, you can take `urn` from the `Document` object as follows API Method `GetCloudModelUrn`
:::

![](pic/Revit_fAegnukMPy.png)

In ACC Docs, you can view from here : 

![](pic/msedge_qOqQnfAhI4.png)

## But Wrong URN 

I don't know why, but you should read this post : https://stackoverflow.com/questions/78118458/convert-urn-from-item-version-have-problem/78120646#78120646

Sorry, I don't know exactly why ! Let's visit this link to see detail how to fix it : https://github.com/chuongmep/aps-toolkit/blob/dev/APSToolkitPython/Tutorials/08.%20Explore%20URL%20ACC%20Extract.ipynb

## Conclusion

Through this article, you have learned how to decode and encode the sequence of numbers in the `Derivative Urn`. This knowledge will help you to understand the context of the `Derivative Urn` and apply it to your projects.

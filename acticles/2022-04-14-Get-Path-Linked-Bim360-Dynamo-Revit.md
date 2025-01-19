
## Giới thiệu

Đây cũng là một câu hỏi khá thú vị từ người dùng trên diễn đàn Dynamo.Trước đây rất nhiều người hỏi mình về vấn đề này khi muốn lấy đường dẫn trên cloud bim360 lại không nhận được.Điều mà chúng ta cần chú ý ở đây chính là sự khác biệt rõ ràng giữa hàm **GetExternalFileReference** và hàm ấy về Resource là **GetExternalResourceReferences** để biết được dùng đúng chỗ.Khi nào dùng và dùng trong trường hợp nào.

## Sử dụng GetExternalResourceReferences


Với đường dẫn trên đĩa hoặc server nội bộ, bạn có thể dễ dàng sử dụng **GetExternalFileReference** để lấy về [GetAbsolutePath](https://www.revitapidocs.com/2022/4aa39d4e-9d44-6271-aa9c-71b6ab7515ae.htm)

```py
import clr
clr.AddReference('RevitAPI')
from Autodesk.Revit.DB import *

def GetExtFileRefPath(item):
	try: return ModelPathUtils.ConvertModelPathToUserVisiblePath(item.GetExternalFileReference().GetAbsolutePath())
	except: return None

items = UnwrapElement(IN[0])

if isinstance(IN[0], list): OUT = [GetExtFileRefPath(x) for x in items]
else: OUT = GetExtFileRefPath(items)
```


Với Dynamo cách đơn giản là bạn sử dụng các thư viện sẵn có để lấy về đường dẫn liên kết BIM360.Ở đây, bạn cần sử dụng [GetExternalResourceReferences](https://www.revitapidocs.com/2022/7df4341b-5102-8016-d6fa-45bc27e8c3af.htm) để làm được điều này.

```py
# Load the Python Standard and DesignScript Libraries
import clr
clr.AddReference('RevitAPI')
from Autodesk.Revit.DB import *
# Import DocumentManager and TransactionManager
clr.AddReference("RevitServices")
import RevitServices
from RevitServices.Persistence import DocumentManager
paths = []
def GetExtFileRefPath(item):
	try :
	   dirRefs = item.GetExternalResourceReferences()
	   for i,v in enumerate(dirRefs):
	       return v.Value.InSessionPath
	except Exception as e: return e.ToString()
doc = DocumentManager.Instance.CurrentDBDocument
items = FilteredElementCollector(doc).OfClass(RevitLinkType).ToElements()
OUT = [GetExtFileRefPath(x) for x in items]
```

Một điều lưu ý là cho dù bạn sử dụng type hay instance thì các tham chiếu đều là như nhau 

![Get Path Linked From Type And Instance](pic/a12dd827c552b00a1c8e73712c93a7e8dd681753.png)

Với RevitAPI sử dụng .NET, bạn cũng cần làm điều tương tự như đã làm với dynamo script.

```cs
public void Action()
{
    StringBuilder sb = new StringBuilder();
    IList<Element> elements = new FilteredElementCollector(DB.Doc).OfClass(typeof(RevitLinkType)).ToElements();
    foreach (Element element in elements)
    {
        sb.AppendLine(GetExtFileRefPath(element));
    }

    MessageBox.Show(sb.ToString());
}

string GetExtFileRefPath(Element item)
{
    IDictionary<ExternalResourceType,ExternalResourceReference> resourceReferences = item.GetExternalResourceReferences();
    foreach (KeyValuePair<ExternalResourceType,ExternalResourceReference> valuePair in resourceReferences)
    {
        var path = valuePair.Value.InSessionPath;
        return path;
    }
    return string.Empty;
}
```

Thật không may sự khác biệt này thường bị ghi chú không rõ ràng trong document nên nhiều người đã nhầm lẫn nó, lớp **ExternalFileUtils** chỉ sử dụng trong trường hợp liên kết của bạn trên ổ đĩa còn với **GetExternalResourceReferences** cũng có thể xem là một trường hợp mở rộng cho phép bạn lấy về đầy đủ các tham chiếu bên ngoài được tham chiếu bởi element.Trong trường hợp này là revit link.

![](pic/giphy.gif)

Điều đặc biệt là bạn hoàn toàn có thể sử dụng  **GetExternalResourceReferences** để lấy luôn đường dẫn trên máy hoặc server cũng được, như vậy có thể nói **GetExternalResourceReferences** sử dụng cho bao quát.

![](pic/Revit_wcHa4D6bad.png)

## Mở rộng

Bài viết hỗ trợ trên diễn đàn tại đây, bạn nên xem qua để hiểu thêm về vấn đề

<a href="https://forum.dynamobim.com/t/how-to-get-the-revit-links-file-path-type-instance-of-autodesk-desktop-connector-bim360-in-current-project-document/75406/9" target="_blank">https://forum.dynamobim.com/t/how-to-get-the-revit-links-file-path-type-instance-of-autodesk-desktop-connector-bim360-in-current-project-document/75406/9</a>

<a href="https://www.revitapidocs.com/2022/4aa39d4e-9d44-6271-aa9c-71b6ab7515ae.htm" target="_blank">https://www.revitapidocs.com/2022/4aa39d4e-9d44-6271-aa9c-71b6ab7515ae.htm</a> 

<a href="https://www.revitapidocs.com/2015/ccc02107-01c2-622a-38d4-f231d4df7bf4.htm" target="_blank">https://www.revitapidocs.com/2015/ccc02107-01c2-622a-38d4-f231d4df7bf4.htm</a>  

<a href="https://forums.autodesk.com/t5/revit-api-forum/externalfileutils-not-working-with-c4r/m-p/6939236" target="_blank">https://forums.autodesk.com/t5/revit-api-forum/externalfileutils-not-working-with-c4r/m-p/6939236</a> 

## Tại sao bạn hay trì hoãn

Tham lam trong quá trình làm là một trong những nguyên nhân điển hình nhất của sự trì hoãn. Chúng ta dự định đạt được mục tiêu của mình càng nhanh càng tốt bằng cách leo lên một chiếc thang khổng lồ trở nên thử thách hơn đối với bộ não của chúng ta mỗi ngày. Thay vào đó, hãy tập trung vào việc hình thành thói quen bằng cách thực hiện các biện pháp nhỏ hàng ngày. Nếu bạn muốn hoàn thành một cuốn sách 350 trang. Bắt đầu bằng cách đọc 10 trang mỗi ngày, không phải 50 trang mỗi ngày.

![](pic/_Image_95ae65cd-c3cc-4919-806f-4c4404ab2e7b.png)



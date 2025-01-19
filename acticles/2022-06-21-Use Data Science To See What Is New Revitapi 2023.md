
## Giới thiệu 

Bài viết này đáng lẽ ra mình sẽ không viết đâu, nhưng khi ra được kết quả thì mình cảm thấy bất ổn vô cùng nên quyết định đưa lên đây cho mọi người xem thử là đúng hay sai.Có lẽ có nhiều người sẽ cảm thấy vui mừng, một số sẽ thất vọng và một số sẽ đắn đo do dự. Bài viết hôm nay chúng ta sẽ thử đi cào dữ liệu xem liệu Autodesk đã cập gì cho Revit 2023 nhé. Tất nhiên cách mình làm cũng không giống ai trên thế giới này và cũng mang mục đính tham khảo học thuật là chính.

## Tìm thông tin dữ liệu

Là một người chơi Revit lâu năm, nên mình quyết định không cào dữ liệu từ bộ Assembly nữa để giang hồ chê bai mà sẽ quyết định sử dụng thuần python 100% để làm điều này. Mình chợt nghĩ ngay đến doc. Bộ doc `RevitAPI.chm` của Autodesk có lẽ là nơi chứa toàn bộ các tin tức mới nhất nên không cần phải kiếm đâu xa. Vậy thì phải mổ xẻ nó ra thôi.

![](pic/_Image_3416ea79-fcbd-4a19-94f5-7e8831fa3567.png)

Đầu tiên để làm được điều này, bạn phải mở tệp này với 7zip, định dạng chm là định dạng nén chứa các html nội dung, vì vậy mấu chốt dữ liệu sẽ tập trung ở trong thư mục html này.

![](pic/7zFM_ZqtJr7GUNX.png)

Được rồi, tiếp theo ta sẽ giải nén chúng ra một thư mục để tiện phân tích dữ liệu.Ở đây mình sẽ lưu ra thư mục Data2023 nhé.

![](pic/explorer_AolKmOdSVo.png)

Vậy là cơ bản ta đã có một mớ dữ liệu chính thống để phân tích rồi đấy, coi như bước chuẩn bị dữ liệu đã xong.

## Phân tích dữ liệu

Lúc này bạn hãy thử mở tệp html ra xem bên trong có gì.

``` html
<head>
        <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8" />
        <META NAME="save" CONTENT="history" />
        <title>JoinType Property </title>
        <meta name="Language" content="en-us" />
        <meta name="System.Keywords" content="JoinType property" />
        <meta name="System.Keywords" content="LocationCurve.JoinType property" />
        <meta name="Microsoft.Help.F1" content="Autodesk.Revit.DB.LocationCurve.JoinType" />
        <meta name="Microsoft.Help.F1" content="Autodesk.Revit.DB.LocationCurve.get_JoinType" />
        <meta name="Microsoft.Help.F1" content="Autodesk.Revit.DB.LocationCurve.set_JoinType" />
        <meta name="Microsoft.Help.Id" content="P:Autodesk.Revit.DB.LocationCurve.JoinType(System.Int32)" />
        <meta name="Description" content="Get/change the type of the join at the specified end." />
        <meta name="Microsoft.Help.ContentType" content="Reference" />
        <link rel="stylesheet" type="text/css" href="../styles/Presentation.css" />
        <link rel="stylesheet" type="text/css" href="ms-help://Hx/HxRuntime/HxLink.css" />
        <script type="text/javascript" src="../scripts/EventUtilities.js"> </script>
        <script type="text/javascript" src="../scripts/SplitScreen.js"> </script>
        <script type="text/javascript" src="../scripts/Dropdown.js"> </script>
        <script type="text/javascript" src="../scripts/script_manifold.js"> </script>
        <script type="text/javascript" src="../scripts/script_feedBack.js"> </script>
        <script type="text/javascript" src="../scripts/CheckboxMenu.js"> </script>
        <script type="text/javascript" src="../scripts/CommonUtilities.js"> </script>
        <meta name="container" content="Autodesk.Revit.DB" />
        <meta name="file" content="00b7a1a8-0e12-d02e-7e25-4716baf6dcdc" />
        <meta name="guid" content="00b7a1a8-0e12-d02e-7e25-4716baf6dcdc" />
        <xml>
                <MSHelp:Attr Name="AssetID" Value="P:Autodesk.Revit.DB.LocationCurve.JoinType(System.Int32)" />
                <MSHelp:TOCTitle Title="JoinType Property " />
                <MSHelp:RLTitle Title="LocationCurve.JoinType Property  (Autodesk.Revit.DB)" />
                <MSHelp:Keyword Index="A" Term="P:Autodesk.Revit.DB.LocationCurve.JoinType(System.Int32)" />
                <MSHelp:Keyword Index="A" Term="frlrfAutodeskRevitDBLocationCurveClassJoinTypeTopic" />
                <MSHelp:Keyword Index="K" Term="JoinType property" />
                <MSHelp:Keyword Index="K" Term="LocationCurve.JoinType property" />
                <MSHelp:Keyword Index="F" Term="Autodesk.Revit.DB.LocationCurve.JoinType" />
                <MSHelp:Attr Name="APIType" Value="Managed" />
                <MSHelp:Attr Name="APILocation" Value="RevitAPI.dll" />
                <MSHelp:Attr Name="APIName" Value="Autodesk.Revit.DB.LocationCurve.JoinType" />
                <MSHelp:Attr Name="APIName" Value="Autodesk.Revit.DB.LocationCurve.get_JoinType" />
                <MSHelp:Attr Name="APIName" Value="Autodesk.Revit.DB.LocationCurve.set_JoinType" />
                <MSHelp:Attr Name="DevLang" Value="CSharp" />
                <MSHelp:Attr Name="DevLang" Value="VB" />
                <MSHelp:Attr Name="Locale" Value="en-us" />
                <MSHelp:Attr Name="TopicType" Value="kbSyntax" />
                <MSHelp:Attr Name="TopicType" Value="apiref" />
                <MSHelp:Attr Name="Abstract" Value="Get/change the type of the join at the specified end." />
                <MSHelp:Attr Name="AssemblyVersion" Value="23.0.0.0" />
        </xml>
</head>
```

Sau một hồi loay hoay trông ngóng dữ liệu khủng khiếp này thì mình bắt đầu thấy rằng, có vẻ thẻ head là nơi tập trung thứ mình cần nhất. Mình sẽ tiến hành phân tách dữ liệu ở đoạn này.Các thông số rình mò sẽ bao gồm : 

Title : Tên của method, class, property, enum, struct, interface, event, delegate,...

Keywords : Từ khoá tìm kiếm cho tên của API

APIName : Tên định danh của API

Description : Mô tả thông tin của API

Namespace : Lớp namespace đặc trưng

Guid : Guid nhận dạng để kết nối cơ sở dữ liệu đến trang <a href="https://www.revitapidocs.com/" target="_blank">https://www.revitapidocs.com/</a> 

## Trích xuất dữ liệu

BeautifulSoup chính là thư viện giúp mình dễ dàng lụm từng thẻ trong html dễ dàng mà không gặp bất cứ trục trặc nào.Đồng thời mình sẽ kết hợp với pandas và json để xem xét dữ liệu cũng như đánh giá.

Hãy nhập một vài thông tin thư viện quan trọng sau 

```py
from bs4 import BeautifulSoup
from pandas import DataFrame
import os
import json
import pandas as pd
```

Tiếp theo chúng ta sẽ bắt đầu parser tệp html về lớp soup khởi tạo để sử dụng thư viện này.

```py
def extract_data_from_report3(filename):
    html_report_part1 = open(filename,'r',encoding="utf8",errors='ignore')
    soup = BeautifulSoup( html_report_part1, "html.parser")
    return soup
```

Bây giờ thì chúng ta sẽ sẵn sàn lọc mớ dữ liệu của các thẻ với các thông tin đã ghi sẵn bên trên, đó là các thông tin chính yếu mà mình cần lấy.

```py
def GetInfo(htmFile):
    dic = {"Title":"","Keywords":"","APIName":"","Description":"","Namespace":"","Guid":""}
    sup = extract_data_from_report3(htmFile)
    title = sup.title.string.split()[0]
    dic["Title"] = title
    for tag in sup.find_all("meta"):
        name = tag.get("name")
        if(name=="Description"):
            Description = tag.get("content")
            dic["Description"] = Description
        if(name=="System.Keywords"):
            Keywords = tag.get("content")
            dic["Keywords"] = Keywords
        if(name=="Microsoft.Help.F1" or name=="Microsoft.Help.Id"):
            APIName  = tag.get("content")
            sp = APIName.split(".")
            if(dic["Keywords"].endswith("property") and len(sp)>1): 
                sp[-1] = title
                sk = ".".join(sp)
                dic["APIName"] = sk
            else: dic["APIName"] = APIName
        if(name=="guid"): 
            Guid = tag.get("content")
            dic["Guid"] = Guid
        if(name=="container"):
            Namespace = tag.get("content")
            dic["Namespace"] = Namespace
    return list(dic.values())
```

Bây giờ công việc tiếp theo là đọc tiếp cho mớ dữ liệu từ cây thư mục đã trích xuất ban đầu. Đó là toàn bộ dữ liệu mà ta có được.

``` py
 # input folder containt all file htm extracted from file chm guide
folder = r"C:\Users\Chuong.Ho\3D Objects\RevitAPIGen\Data2023"

datas = []
def ReadFilesFolder(folder):
    files = []
    for file in os.listdir(folder):
        if file.endswith(".htm"):
            filePath = os.path.join(folder, file)
            files.append(filePath)
            try:
                metadata = GetInfo(filePath)
                datas.append(metadata)
            except Exception as e:
                print(e)
                continue
    return files
results = ReadFilesFolder(folder)
    
```
Dữ liệu đã xong xuôi, giờ mình sẽ tiến hành đổ dữ liệu và DataFrame để xem chúng thiệt sự ổn không, mọi thứ như thế nào thông qua việc hiển thị 10 dòng dữ liệu đầu tiên có được.

``` py
header = ["Title","Keywords","APIName","Description","Namespace","Guid"]
df = DataFrame(datas,columns=header,dtype=str)
df = df.dropna()
df.head(10)
```

Bạn có thể thấy, mớ hỗn độn mà ta lụm nhặt bây giờ đã có thể hiển thị đễ dễ quan sát từng API một với tiêu đề định sẵn như từ trước .

![](pic/Code_YUOOgH49pH.png)

Do mình vẫn chưa thoả mãn nhu cầu quan sát nên mình quyết định tách ra thêm một cột nữa để xem liệu chúng là property hay method hay là bất cứ thứ gì.Dữ liệu này mình thấy được từ cột Search và quyết định phân tách nhỏ nó ra.

```py
#add a column to indicate the type of API
df["Type"] = df["Keywords"].str.split(" ").str[-1]

```
Và cũng thử nhòm ngó dữ liệu lại lần nữa xem có ổn không đã.Đến đây thì mình cũng cảm thấy dữ liệu khá ổn.

![](pic/Code_BboiqDdVIQ.png)


Thử xem tổng cộng có bao nhiêu dòng API được fill vào bảng, kết quả là có 29545 dòng và 7 cột.

```
print(df.shape)
print(df.count())
```

Mình cũng sẵn tiện tham khảo qua mô tả của dữ liệu, nói chung cũng không đánh giá được gì nhiều ở chỗ này.

![](pic/Code_es98kV80JS.png)

Và cái cuối cùng mình muốn xem là cái này để so sánh với bản 2022 cũ: 

```
sr = df["Type"].value_counts()
sr
```

![](pic/Revit2023.png)

Như vậy là ta đã quan sát được tổng các method,properties,.... Vậy thì bây giờ hãy làm lại điều này với bản 2022 và so sánh thử xem.

## Có gì mới trong Revit API 2023

Để xem có gì mới trong năm 2023, rất đơn giản bạn chỉ cần so sánh hai bản dữ liệu giữa 2022 và 2023. Nếu dữ liệu không có trong 2022 thì chắc chắn rằng nó là mới.Đầu tiên bạn cần đọc cả hai dữ liệu từ hai phiên bản lên.

``` py
#read json to dataframe
import json
from pandas import DataFrame
with open('RevitAPI2022.json') as f:
    data = json.load(f)
df2022 = DataFrame(data)
df2022 = df2022.dropna()
df2022.head(5)
sr2022 = df2022["Type"].value_counts()
with open('RevitAPI2023.json') as f:
    data = json.load(f)
df2023 = DataFrame(data)
df2023 = df2023.dropna()
df2023.head(5)
sr2023 = df2023["Type"].value_counts()

```

Sau đó lấy về những dữ liệu có trong DataFrame của 2023

``` py
merged = df2023.merge(df2022, on=["APIName"])
result = df2023[~df2023.APIName.isin(merged.APIName)]
result
```
![](pic/Code_FjASWS9Zhv.png)

Thử kiểm nghiệm với hàm `ToposolidSlopeExceedsThreshold` trong doc thì thấy đúng là đây là API mới trên 2023. Như vậy ta nên lưu dữ liệu này về csv để tiện xem xét sau. Và bảng csv này cũng được lưu trữ lại để cho bạn có thể dễ dàng xem xét ở <a href="https://github.com/chuongmep/RevitAPIDocGen/blob/master/RevitAPI2023_WhatIsNew.csv" target="_blank">RevitAPI2023_WhatIsNew.csv</a> 

``` py
# save to csv
result.to_csv("RevitAPI2023_WhatIsNew.csv",index=False, encoding='utf-8')
```
Dữ liệu thu được là kết quả của những gì mới với 698 dòng cho toàn bộ API mới, chi tiết từng phần như sau : 
``` py
result["Type"].value_counts()
```
![](pic/newinrevitapi2023.png)

## Những gì bị xoá bỏ trong Revit 2023

Tất nhiên thiên thời địa lợi bên trên, mình cũng dễ dàng biết được những gì đã bị xoá bỏ bên trong Revit 2023.Bạn cũng có thể truy cập dữ liệu mình đã xuất bản ở <a href="https://github.com/chuongmep/RevitAPIDocGen/blob/master/RevitAPI2023_WhatIsRemoved.csv" target="_blank">RevitAPI2023_WhatIsRemoved</a>  để xem cho đầy đủ. Nhìn chung cũng có khá nhiều thứ bị xoá bỏ và đặt biệt là ParameterType quan trọng sẽ không dùng nữa.

![](pic/EXCEL_ChOTgEy5zy.png)

## Kết quả

Rõ ràng theo góc nhìn cá nhân với dữ liệu của mình, có lẽ đang có một sự cập nhật nhỏ giọt ở đây chăng, không quá nhiều sự khác biệt về dữ liệu.Rõ ràng sự khác biệt mạnh mẽ ở đây là có tổng 302 dòng tức bao gồm toàn bộ API chung chung bị xoá đi và thêm vào đó là gần 700 dòng mới API chung chung được thêm vào. Bạn cảm thấy gì từ dữ liệu này? Mã nguồn này mình mở lâu rồi mà giờ mới có thời gian để viết cho bản 2023. Bạn có thể truy cập tại <a href="https://github.com/chuongmep/RevitAPIDocGen" target="_blank">RevitAPIDocGen</a>.

Một vài bảng đồ thị để bạn dễ dàng quan sát.

![Biểu đồ cột so sánh mức độ số lượng các type trong API](pic/outputdatarevit2023.png)

![](pic/outputhor.png)

![Biểu đồ so sánh trực quan hoá dữ liệu theo kde](pic/outputkde.png)

![](pic/outputarea.png)

Với dữ liệu bên trên, có thể đoán chính xác được rằng phần mềm đang rơi vào tình trạng bảo trì tích cực, có nhiều API cũ bị xoá đi và cũng có rất nhiều API mới được thêm vào. Có lẽ cần làm thêm các dữ liệu cũ của những năm trước sẽ biết chính xác được mức độ cập nhật cho mỗi năm là bao nhiêu. Tương lai cũng rất khó biết được Revit sẽ đi về đâu khi càng ngày có nhiều tính năng mới được thêm vào trong một phần mềm đã trên 20 năm tuổi. Như vậy dung lượng mỗi năm sẽ tăng lên, dòng mã tăng lên và chi phí cho bảo trì, mức độ thêm mới mã cũng là một điều rất khó khăn mà không bất cứ nhà phát triển phần mềm nào tránh khỏi.
## Mở rộng

Với dữ liệu đã trích xuất ở trên, bạn có thể dễ dàng sử dụng tệp json có chứa guid của các method và mã, điều này sẽ cho phép bạn liên kết trực tiếp đến trang <a href="https://www.revitapidocs.com/" target="_blank">https://www.revitapidocs.com/</a>. Mã nguồn mở <a href="https://github.com/weianweigan/RevitLookupWpf" target="_blank">RevitLookupWPF</a> cũng đã được bổ sung tính năng này.

![](pic/Revit_tlmkRROQE0.gif)

Và một dự án <a href="https://github.com/weianweigan/yourCADAPITools" target="_blank">yourCADAPITools</a> cũng cho phép bạn xem document của revit api từ visual studio 2022 ngay trên con trỏ mã khi bạn đang viết mã với cơ sở là từ bài toán này. Không những vậy còn có thể sử dụng cho cả **SolidWorks** và **Rhino Common**

![](pic/devenv_0j7wxl4AOp.gif)

Bạn đang nghĩ gì? Hãy chia sẻ cảm nhận bên dưới bài viết này nhé.


## Tài nguyên

<a href="https://github.com/ADN-DevTech/revit-api-chms" target="_blank">https://github.com/ADN-DevTech/revit-api-chms</a>

<a href="https://github.com/chuongmep/RevitAPIDocGen" target="_blank">RevitAPIDocGen</a>

<a href="https://github.com/weianweigan/RevitLookupWpf" target="_blank">RevitLookupWPF</a>

<a href="https://github.com/weianweigan/yourCADAPITools" target="_blank">yourCADAPITools</a>

## Mở đầu

Mặc dù F # là tuyệt vời cho các lĩnh vực chuyên gia như phân tích khoa học hoặc dữ liệu, nó cũng là một lựa chọn tuyệt vời cho việc phát triển doanh nghiệp.Hôm nay mình muốn giới thiệu phổ biến đến các bạn về ngôn ngữ F# này.Mình là người đang sử dụng C# và Python để áp dụng cho công việc và mình cảm thấy F# chính là ngôn ngữ mà sẽ bổ sung các nhược điểm cho hai ngôn ngữ lập trình này.

Với sự hỗ trợ mạnh mẽ trong việc phát triển Trí Tuệ Nhân Tạo, Học Máy, Phân Tích Dữ Liệu thì F# sẽ còn nhiều không gian khẳng định mình trong tương lai.

## F# có thực sự có lợi thế hơn so với C# và Python không?
1.  F# làm cho nhiều tác vụ lập trình phổ biến trở nên đơn giản hơn. Điều này có thể đòi hỏi việc như tạo và sử dụng các định nghĩa kiểu phức tạp, thực hiện danh sách các quy trình, so sánh bình đẳng, và nhiều hơn nữa.

2.  Không có dấu chấm phẩy, dấu ngoặc nhọn, trong F# bạn hầu như không bao giờ phải chỉ định loại đối tượng do sự hiện diện của hệ thống suy luận mạnh mẽ. Nó cũng mất ít dòng mã hơn để giải quyết cùng một vấn đề.
3.  F# là một ngôn ngữ chức năng, nhưng nó hỗ trợ các kiểu khác hoàn toàn thuần túy, giúp tương tác dễ dàng hơn với các lĩnh vực không thuần túy của cơ sở dữ liệu, trang web, v.v. Đặc biệt, F# được thiết kế như một ngôn ngữ lai, do đó, nó có thể thực hiện mọi thứ như C# và Python. Mặc dù F# tích hợp liền mạch với hệ sinh thái .NET cho phép bạn truy cập tất cả các công cụ và thư viện .NET của bên thứ ba.
4.  F# là một phần của Visual Studio cho phép bạn có được một trình soạn thảo tốt với sự hỗ trợ của IntelliSense, trình gỡ lỗi và nhiều plugin để thực hiện unit test, kiểm soát mã nguồn và các tác vụ phát triển khác.

## Những điều cầu biết khi bắt đầu Với RevitAPI

Có hai kiểu trong viết mã ta nên biết với viết Addin Là `IExternalCommand` và `IExternalApplication`
1.  Autodesk.Revit.DB.IExternalCommand thực thi một lần khi được kích hoạt. 
2.  Autodesk.Revit.DB.IExternalApplication thực thi khi khởi động Revit và chạy cho đến khi Revit được đóng lại.

Tất cả các thông tin sản phẩm,dll,tác giả,... quan trọng được lưu trong các tệp xml có phần mở rộng `.addin`.  Các tệp này được gọi là bản kê khai bổ trợ và chứa đường dẫn đến dll bổ trợ.Ngoài ra ta có thể tuỳ chỉnh với một tệp .xml cho tác vụ với nhiều phiên bản Revit.

## Bắt đầu viết mã RevitAPI với ngôn ngữ FSharp

Như đã bài trước mình đã hướng dẫn bắt đầu với <a href="https://chuongmep.com/Start-With-RevitAPI" target="_blank">Start-With-RevitAPI</a>.Hôm nay mình sẽ nối tiếp phần cấu trúc mã của ngôn ngữ lập trình này.

Bắt đầu đơn giản với một cú pháp chào hỏi nhẹ nhàng

```fs
namespace FsharpDemo

open Autodesk.Revit.Attributes
open Autodesk.Revit.UI

[<TransactionAttribute(TransactionMode.Manual)>]
type ASimpleMessage() =
    interface IExternalCommand with
        member x.Execute(cdata, msg, elset) =

            TaskDialog.Show("Title", "Hello World") |> ignore
            Result.Succeeded
```

Lựa chọn các đối tượng đang chọn trong Revit

```fs
namespace FsharpDemo

open Autodesk.Revit.Attributes
open Autodesk.Revit.UI
open Autodesk.Revit.DB

[<TransactionAttribute(TransactionMode.Manual)>]
type SelectedElement() = 
    interface IExternalCommand with
        member this.Execute(cdata:ExternalCommandData, msg, elset) =
            let uiapp = cdata.Application
            let uidoc = uiapp.ActiveUIDocument
            let selected = 
                uidoc.Selection.GetElementIds() |> Seq.cast
                |> Seq.map (fun(eid:ElementId) -> uidoc.Document.GetElement(eid))
            let msg =
                selected
                |> Seq.map (fun(e:Element) -> e.Name)
                |> String.concat "\n"
            TaskDialog.Show("Title", msg) |> ignore
            Result.Succeeded
```

Tệp xml .addin thực thi một mã dll

``` xml
?xml version="1.0" encoding="utf-8"?>
<RevitAddIns>
  <AddIn Type="Command">
    <Name>Chuongmep</Name>
    <Assembly>FsharpDemo.dll</Assembly>
    <Publisher>Hồ Văn Chương</Publisher>
    <FullClassName>FsRevit.FsharpDemo.ASimpleMessage</FullClassName>
    <ClientId>f07b29f2-0661-4ab7-a633-94113fda5edc</ClientId>
    <Isuer>Chuongmep.com</Isuer>
    <VendorId>chuongpqvn@gmail.com</VendorId>
  </AddIn>
</RevitAddIns>
```
Cuối cùng ta thử sao chép hai tệp dll và .addin vào đường dẫn `C:\Users\UserName\AppData\Roaming\Autodesk\Revit\Addins\2021`(đường dẫn thay đổi tuỳ theo phiên bản và tên người dùng)

Bạn sẽ thấy một thông báo hỏi thăm như bài trước mình có viết và cuối cùng là mình sẽ tìm thấy tiện ích command trong tab bổ trợ và chạy nó.

## Mở rộng

Nếu bạn là một người thích cái mới và thích đổi gió thì hãy thử với ngôn ngữ này xem sao nhé, biết đâu bạn sẽ thành công hoặc ít nhất tìm ra được ý tưởng cho riêng mình.Mình có để lại thông tin học thuật và viết mã chi tiết bên dưới.Nếu muốn xem chi tiết hãy tham khảo nhé.Cám ơn các bạn đã ghé thăm và đọc bài trên blog.

## Tham khảo

<a href="https://github.com/tailoryourbim/fs-revit" target="_blank">fs-revit</a>

<a href="https://fsharpforfunandprofit.com/why-use-fsharp/" target="_blank">why-use-fsharp</a>   


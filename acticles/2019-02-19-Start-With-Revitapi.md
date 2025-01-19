
## Bắt đầu
Không phải chỉ riêng mình các bác mới tìm hiểu cảm thấy rối rắm, khó hiểu với C# cho Revit đâu, mình cũng đã từng trải qua đau khổ có , thất vọng có nên hiểu được tâm trạng của người tự học, mày mò tìm hiểu các kiểu rồi đâm ra nản chí, với bài viết dài thòn lòn này hi vọng giúp cho bác nào chưa biết gì hoặc mới tiếp xúc với lập trình RevitAPI có những đổi mới và có cái nhìn chung nhất. Giờ đi thôi 😁

### Ngôn ngữ hỗ trợ

Bên dưới đây là một bức hình có lẽ là tổng quát nhất nếu các bác muốn lựa cho mình một ngôn ngữ để tiếp cận .

![](pic/LanguagRevitAPI.png)

Theo quan điểm cá nhân của mình thì tiếp cận với mã Python sau đó đến C# là hay nhất đối với một người mới bắt đầu. Python mạch lạc ngắn gọn, mã nguồn mở và triển khai nhanh ý tường nhưng lớn thì hơi mệt , C# thủ tục chạy nhanh đặc biệt là vấn đề với dự án lớn và bảo vệ mã hóa khi mình làm trong một doanh nghiệp.

Ở bài này mình sẽ hướng dẫn các bác tiếp cận RevitAPI với ngôn ngữ `C#`, còn `Python` thì các bác có thể tham khảo một bài viết của mình ở  <a href="https://chuongmep.com/Start-With-PyRevit/" target="_blank">đây</a> với một cách tiệp cận khác hơn.


## Cần cài đặt những gì ?

- Một cái máy tính **Windows** đủ để cài đặt **Revit** các bản mới
- <a href="http://go.microsoft.com/fwlink/?linkid=825298" target="_blank">Microsoft .NET Framework</a> : Thằng này trong máy cũng rất quan trọng nhé : 

|Revit Version   | .Net Farmwork Version  |
|:-|:-|
|  Revit 2015 | .Net 4.5  |
|  Revit 2016 | .Net 4.5  |
|  Revit 2017 | .Net 4.6  |
|  Revit 2018 | .Net 4.6  |
|  Revit 2019 | .Net 4.7  |
|  Revit 2020 | .Net 4.7  |
|  Revit 2021 | .Net 4.8  |
|  Revit 2022 | .Net 4.8  |

Bài này mình sử dụng luôn Revit 2020 để theo kịp thời đại nhé .

- Visual Studio : Tất nhiên là để code rồi, trong Revit cũng có một cái để code đó là **Macro Manager** nhưng tốt nhất là kiểu gì mình cũng sẽ cài thôi, thời điểm viết bài viết này mình đang sử dụng Visual Studio 2017 vì bản 2019 chưa được ổn đinh.Nếu máy các bác chưa có thì có thể bế em nó về ở <a href="https://visualstudio.microsoft.com/vs/older-downloads/" target="_blank">đây</a>.

![](pic/InstallVisualStudio.png)

Có tổng cộng đến ba bản, mình là người của công chúng nên cứ chọn bản đầu tiên đi, mấy bản sau vòi key đó các bác, có thì kéo về sài nhé.

Nếu mà các bác muốn cài bản cũ hơn thì có một cái danh sách con bên dưới, rồi lựa cho mình cái nào nhắm là ổn định nhất phù hợp với máy tình thì lôi về nhé.

![](pic/vsstudiolod.png)

Sau khi tải về , mình mở lên và chọn như bên dưới hình nhé, lỡ sau này mình có code **Python** nữa thì lỡ rồi làm một lần luôn, đặc biệt là .NET Framework thì phải chú ý cài cho kĩ nhé các bác , không thì sau này có nhiều lỗi phát sinh lắm.

![](pic/InstallRevitAPI001.png)

- Máy có cài Revit : Nếu mình viết mã cho em nó mà không có phần mềm trên máy thì thật là ngố phải không? Tốt nhất thì mình cứ vào <a href="https://www.autodesk.com/education/free-software/revit" target="_blank">Autodesk Student</a> kiếm một bản ngon lành rồi tải về nhé, cũng bao gồm luôn key sinh viên ba năm cho mình sài luôn , đỡ phải crack gì mệt.

![](pic/DownloadRevit2018.png)

## Tạo một dự án

Đầu tiên các bác mở Visual Studio lên → File → New → Project → Class Library (.NET Framework) và chọn **OK** để khởi tạo dự án.

![](pic/OpenVisualStudio.png)

Tiếp theo mình sẽ nhìn vào thanh bên phải có mục **References** các bác chuột phải vào và chọn AddReferences.References thật ra chính là liên kết thư viện, việc này cũng giống như tải các gói thư viện của python thông qua pip.Có thể hiểu các bộ thư viện dll được đóng gói và đưa vào dự án gọi lên sử dụng lại được thông qua vị trí này.

![](pic/AddReference.png)

Tiếp theo mình sẽ thêm hai thư viện của Revit vào là **RevitAPI** và **RevitAPIUI** trong vị trí : `“C:\Program Files\Autodesk\Revit 202x“`.Đừng có lầy mà phiên bản thấp hơn cũng chép nguyên cái đường dẫn vào nha các bác, phiên bản Revit nào thì load thư mục đó sẽ có nhé !

![](pic/AddReference002.png)

Xong rồi quay lại cái chỗ hồi nãy thêm thư viện, tắt Copy hai thư viện đó vào đường dẫn Local để lúc Build mình khỏi phải thấy một đống như đống núi nhé.Nếu không làm việc này, đường dẫn đầu cuối sẽ rất hỗn loạn với hàng tá thư viện từ Autodesk.

![](pic/AddReferenceLocal.png)

Coi như bước đầu đã xong, giờ mình mở vào cái Class1.cs để triển khai một cái gì đó nhẹ nhẹ xem chơi nào.Đầu tiên mình khai báo một ít thư viện cho Revit nhé : 

![](pic/HelloRevitAPI.png)

Giờ mình sẽ triển khai cái class đó kế thừa từ **IExternalCommand**.Các bác cứ hiểu đơn giản là để Revit nó nhận ra cái lớp mình đang khai báo thực thi một cái gì đó ví dụ thực thi giao diện người dùng trong Revit chẳng hạn, hiểu đơn giản hơn là đi massage cũng phải có tấm vé vào cổng vậy đó.

Gõ xong nó hiện màu đỏ các bác rê qua chỗ cái bóng đèn màu đỏ và chọn cái đầu tiên, mình sẽ tiếp tục giải thích bên dưới.

![](pic/HelloRevitAPI001.png)

Khi chọn vào như trên mình sẽ thấy nó tự sinh ra môt phương thức **Execute ()** có nghĩa là các bác đã thi hành những gì kế thừa từ **IExternalCommand** nó sẽ trả về các kết quả : Thành công, không thành công, hay hủy luôn hành động đã làm từ bên trong lớp kế thừa kia.Những hành động này chỉ là để trả về kết quả như vậy, giả sử mã của mình là ngon cơm thì mình sẽ trả về là `Result.Succeeded;` còn lỗi rồi thì trả về `Result.Failed`.

![](pic/Result.Succeeded.png)

Như mọi ngôn ngữ lập trình thì luôn có câu chào cửa miệng là **Hello Word** nghe nhức cả nách, vậy thì mình thử khai báo cho nó để thực thi trong Revit thử xem thế nào.Lưu ý quan trọng ở đây là trên mỗi class cần khai báo thuộc tính bắt buộc của giao dịch thực hiện.Các giao dịch có 3 loại nhưng phổ biến nhất nên chọn Transaction.Manual để có thể được dùng một cách bình thường hóa nhất.

![](pic/XinChao.png)

Với VB thì có thể viết như này : 

```vb
Imports System

Imports Autodesk.Revit.UI
Imports Autodesk.Revit.DB

<Autodesk.Revit.Attributes.Transaction(Autodesk.Revit.Attributes.TransactionMode.Automatic)> _
Public Class Class1
Implements IExternalCommand
        Public Function Execute(ByVal revit As ExternalCommandData, ByRef message As String, _
                                                        ByVal elements As ElementSet) As Autodesk.Revit.UI.Result _
                                                        Implements IExternalCommand.Execute

                TaskDialog.Show("Revit", "Hello World")
                Return Autodesk.Revit.UI.Result.Succeeded

        End Function
End Class
```

Trên thanh công cụ của Visual Studio, mình chọn vào **Build** và chọn **Build Solution**.Kết quả sau đây hiện lên tức là mình đã cài đặt thành công.

![](pic/thanhcong.png)

Nếu chỗ này mà Build ra lỗi đỏ que thì là do làm sao, đó chính là do .NET đó.Các bác có thể sửa bằng cách chọn lại vào Project của mình, Đổi lại .NET đã cài đặt và Build lại nhé ! 

![](pic/ErrorBuildRevitAPI.png)

Ngon lành, giờ làm sao để có thể kiểm tra là dll mình Build ra có chạy không? Có một cách rất đơn giản để biến được điều này là tiến hành cài đặt thêm một tiện ích con vào. Tiện ích này có tên là **Addin Manager**. Các bác cứ cài đặt như mình thường nhé, link mình để ở <a href="data/Add-In Manager.rar" target="_blank">Đây</a>.Toàn bộ giải nén ra có video hướng dẫn luôn nha các bác.

Giao diện cài đặt sau khi thành công:

![](pic/AddinManagerRevitAPI.png)

Xong mình kích vào cái đầu tiên luôn sẽ thấy mở lên một giao diện, phần Loaded Commands mình chọn Load cái dll nãy mình vừa buid xong nhé, tiện tay nhấn nút Run luôn xem nó như nào . 

![](pic/AddinManagerRevitAPI001.png)

Nếu chẳng may có thông báo lên như này thì tích chọn No nhé.Nếu chọn Yes cũng không sao cả nhưng nếu bạn chọn nhiều lần với một dự án khá lớn thì bộ nhớ sẽ chép liên tục vào bộ nhớ đệm, điều này là không cần thiết.

![](pic/AddinManagerRevitAPINo.png)

Kết quả trả về : 

![](pic/XinChaoRevitAPI.png)

Đấy thế là can thiệp được vào Revit rồi nhé, nhưng không lẽ mỗi lần chạy mình lại sài cái công cụ đó sao.Tất nhiên là không rồi, đó chỉ là công cụ giúp mình kiểm tra code nhanh mà thôi, giờ thì mình làm thêm vài bước nữa để khỏi phụ thuộc vào cái kiểm thử Addin Manager kia luôn.

Mình sẽ tiến Hành khai báo addin với tệp ban đầu là xml và đổi đuôi thành .addin để Revit nó biết là mình định danh cho một addin 

``` html
<?xml version="1.0" encoding="utf-8"?>
<RevitAddIns>
  <AddIn Type="Command">
    <Name>Chuongmep</Name>
    <Assembly>ClassLibrary1.dll</Assembly>
    <Publisher>Hồ Văn Chương</Publisher>
    <FullClassName>HelloRevit.Hello</FullClassName>
    <ClientId>f07b29f2-0661-4ab7-a633-94113fda5edc</ClientId>
    <Isuer>Chuongmep.com</Isuer>
    <VendorId>chuongpqvn@gmail.com</VendorId>
  </AddIn>
</RevitAddIns>
```
Nhìn bên trên mình có thể dễ dàng nhìn ra, **ClassLibrary1.dll** chính là cái tên mình build ra, **HelloRevit.Hello**
chính là tên Namespace chấm tới cái class mình đặt tên.ClientId chính là guid mình có thể lấy ở <a href="https://www.guidgenerator.com/" target="_blank">đây</a> cho nhanh .Xong mọi thứ rồi, bây giờ mình sẽ lưu tệp đó lại thành đuôi.addin và dán cùng với tệp dll đã Build vào đường dẫn :

Tất cả người dùng 
```
C:\Program Files\Autodesk\Revit 2020x\AddIns

```
Riêng cho ai đó 

```
C:\Users\<Your User Name>\AppData\Roaming\Autodesk\Revit\Addins\202x

```
Sau khi chép xong mình sẽ khởi động lại Revit phát để nó nhận cái tệp dll kia và yêu cầu mình quyền ghi danh vào revit.Điều này cũng có thể vượt qua sau này nhưng không loại bỏ được bảng thông báo trừ khi bạn có đăng kí chứng chỉ nhận dạng phần mềm.

![](pic/LoadAddinRevitAPI.png)

Rồi giờ mình vào Tab Add-ins mục **External tools** xem có thấy của mình không. 

![](pic/ResultAPI.png)

Nếu nhấn vào nó hiện lên tên NameSpace.Class và bảng thông báo sau khi click vào tức là mình đã thành công !

![](pic/XinChaoRevitAPI.png)

## Tổng kết

Đây chính là sự khởi đầu hướng dẫn rất chi tiết để một người bình thường có thể làm theo và thực hiện được.Nếu các bác thấy bài này quá cơ bản và chưa đủ độ khó với các bác thì hãy theo dõi tiếp những phần sau nhé.Sẽ còn nhiều điều háp dẫn nữa.

Xin cám ơn đé ghé thăm blog.


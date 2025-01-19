## Mở đầu 

Hôm nay vào một ngày đẹp trời, bống nhiên xuất hiện một lỗi mà mình thấy khá lạ sau khi bị báo cáo từ người dùng của mình, vấn để ở đây nó khiến mình đau đầu hơn cả nhưng vấn đề khác, mặc dù đây lại là vấn đề phổ biến và đơn giản.Bắt đầu thôi

## ID và GetTypeId

### Điểm chung : 

Cả hai đều trả về một <a href="https://www.revitapidocs.com/2018.2/44f3f7b1-3229-3404-93c9-dc5e70337dd6.htm" target="_blank">ElementId</a> đại diện cho một đối tượng trong Revit.

### Điểm khác

ID : ta có thể hiểu đơn giản đây chính là mã số định danh duy nhất cho một phần tử trong dự án Revit.Không thể có hai đối tượng có cùng chung một mã định danh được.Điều đó thể hiện tính nhất quán trong từng đối tượng đại diện trong Revit.

GetTypeId : Trả về mã định danh của loại phần tử đó trong Revit.

## Tạo Sheet

Ở đây đối tượng làm việc chính là titleblock, một titleblock đơn giản chính là đại diện cho một **Familyinstance**.Như vậy ta có thể xem đây là một đối tượng nhưng duy nhất hay không thi ta vẫn chưa thể kết luận.Với mỗi Family đều cho phép tải vào một Family con.

![](pic/_Image_beb8875e-b48c-43ae-9f0c-24a4efa6ea9b.png)

Ta có thể dễ dàng tạo ra một sheet mới với method cơ bản như sau :

```cs
public static ViewSheet CreateSheet(this Document doc, string sheetname,
            string sheetnumber, Autodesk.Revit.DB.Element titleblock)
        {
            try
            {
                using (SubTransaction subtran= new SubTransaction(doc))
                {
                    subtran.Start();
                    string SheetNameFix = RemoveInvalidChars(sheetname);
                    ViewSheet viewSheet = ViewSheet.Create(doc, titleblock.Id);
                    viewSheet.Name = SheetNameFix;
                    viewSheet.SheetNumber = sheetnumber;
                    subtran.Commit();
                    return viewSheet;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Have Sheet Number Null or Empty,\n Please Check Again\n{ex}",sheetname);
            }
            return null;
        }
```

Nếu thử nghiệm với titleblock thông thường, việc này chả có lỗi lầm gì. Nhưng ở đây lại có thêm một điểm lạ mới đó chính là titleblock được tùy chỉnh và tạo mới từ người dùng. Lúc này đối tượng vẫn là đại diện cho một FamilyInstance nhưng sẽ có vài điểm khác biệt khiến cho mã trên dừng hoạt động.Điều không thể nhận ra được ở đây chính là việc so sánh giữa một bản titleblock tiêu chuẩn từ Autodesk và bản từ người dùng trông nó chả khác gì cả.

Và lúc này, nó hiện lên một lỗi khá khó hiểu ở đây : 

![](pic/_Image_4ab966e2-3fae-467a-a824-89a7000a8475.png)

Cả hai cùng cho ra kết quả giống nhau, đều có thể tạo ra được, ta sử dụng method kia mang lên Dynamo để kiểm thử xem luôn sao nhưng với sheet lỗi kia lại có thể tạo ra được bình thường, vấn đề này mình sẽ giải thích chi tiết ở phần dưới.

![](pic/_Image_7144e3b5-ed97-420c-8375-bc3dcbd08dac.png)

Trông nó hoạt động khá ổn mà chả có lỗi gì xảy ra luôn, bắt đầu đau đầu rồi đây.Có lẽ mã mình sai sao, thôi thử luôn với vài mã python xem sao !

```py
#Author Package RIE
import clr
clr.AddReference('RevitAPI')
from Autodesk.Revit.DB import *
clr.AddReference("RevitNodes")
import Revit
clr.ImportExtensions(Revit.Elements)
clr.AddReference("RevitServices")
import RevitServices
from RevitServices.Persistence import DocumentManager
from RevitServices.Transactions import TransactionManager
def tolist(obj):
    if isinstance(obj, list):
        return UnwrapElement(obj)
    else:
        return [UnwrapElement(obj)]
doc = DocumentManager.Instance.CurrentDBDocument
sheetnames = tolist(IN[0])
sheetnumbers = tolist(IN[1])
titleblock = tolist(IN[2]) 
sheetlist = []
notcreated = []
TransactionManager.Instance.EnsureInTransaction(doc) 
for number in range(len(sheetnumbers)):
    if len(titleblock) > 1:
        newsheet = ViewSheet.Create(doc,titleblock[number].Id)
    else:
        newsheet = ViewSheet.Create(doc,titleblock[0].Id) 
    newsheet.Name = sheetnames[number]
    try:
        newsheet.SheetNumber = sheetnumbers[number]
        sheetlist.append(newsheet.ToDSType(False))
    except:
        notcreated.append(number) 
        doc.Delete(newsheet.Id)
TransactionManager.Instance.TransactionTaskDone()
OUT = sheetlist, notcreated
```

Nó cũng chạy luôn nè, cái title block lỗi kia nó cũng tạo ngon lành luôn, vậy mình lỗi ở đâu ta ?

![](pic/_Image_18d7a2bb-46bf-4e78-88f9-c197dbee0d59.png)

## Nguyên nhân vì sao lại thế? 

Tất nhiên gì cũng có nguyên nhân của nó phải không, nguyên nhân kết luận đến hiện giờ của mình đến hiện tại chính là biến định nghĩa về Family. 

Đến đây thì việc định hình lại `FamilyInstance` và `FamilySymbol` đã bắt đầu rõ ràng hơn rất nhiều :

**FamilySymbol** : Một phần tử đại diện cho một kiểu duy nhất với một Family.

**FamilyInstance** : Đối tượng này đại diện cho một đối tượng duy nhất của kiểu Family.

Để dễ hình dung hơn, xem hình bên dưới nhé.

![](pic/ec4ca401a032ce6d449facf0e501110df016d544.png)

Element : Đại diện cho các đối tượng tồn tại trong Revit.Có thể hình dung đây là ông tổ của mọi đối tượng.Trường hợp này thì **FamilySymbol** và **FamilyInstance** chính là mấy đưa con nuôi.

Và để tổng hợp cho 3 khái niệm trên ta có hình như sau :

Đầu tiên Trong một căn nhà nhỏ bé của chúng ta (Category Structural Columns) đẻ ra hai người con tên là Conrete Tròn(Family) và Conrete Vuông (Family), có thể nói là mẹ tròn con vuông luôn, sau đó mấy đứa con của ông ta lại đi cua gái và cuối cùng cưới về mấy cô vợ rồi lại tiếp tục đẻ và đặt tên cho các con là ([450mm,600mm], [600mm,750mm]) mỗi đứa một kiểu (Type).Và thế là chúng nó mỗi ngày một lớn khôn nếu như đứa nào ngoan thì được cho vào chạy dự án (FamilyInstance), đứa nào học kém thì ở nhà bú sữa ngồi hóng chuyện(FamilySymbol)

![](pic/4f287e50542d3da9566102a600ede7f2613274a3.png)


Vậy thì ta kết luận được gì từ sự việc trên ? Rõ ràng thì mấy đứa con (Titleblock) ở đây khi mới tạo dự án chúng vẫn đang mới bú bình nên chưa đứa nào xuất hiện cho chạy dự án cả.Chúng chỉ vừa mới đẻ ra thôi :(.

Và cách đặt tên đầu vào của mình đang đại diện chung chung (Element) tức là em là ai cũng chịu.Thực ra thì em là em thôi chứ là ai nữa.
## Cách giải quyết.

Hãy cùng quay lại ví dụ trên RevitAPIDocs vì chúng có sẵn.

![](pic/_Image_45a9fe80-5dfb-4e1e-aeef-89217f00a9dc.png)


Ta chỉ việc sửa đổi mã sang **GetTypeId()**.

```cs
public static ViewSheet CreateSheet(this Document doc, string sheetname,
            string sheetnumber, Autodesk.Revit.DB.Element titleblock)
        {
            try
            {
                using (SubTransaction subtran= new SubTransaction(doc))
                {
                    subtran.Start();
                    string SheetNameFix = RemoveInvalidChars(sheetname);
                    ViewSheet viewSheet = ViewSheet.Create(doc, titleblock.GetTypeId());
                    viewSheet.Name = SheetNameFix;
                    viewSheet.SheetNumber = sheetnumber;
                    subtran.Commit();
                    return viewSheet;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Have Sheet Number Null or Empty,\n Please Check Again\n{ex}",sheetname);
            }
            return null;
        }
```

Và cũng đồng thời sửa đổi luôn trên Dynamo 

```py
#Author Package RIE
import clr
clr.AddReference('RevitAPI')
from Autodesk.Revit.DB import *
clr.AddReference("RevitNodes")
import Revit
clr.ImportExtensions(Revit.Elements)
clr.AddReference("RevitServices")
import RevitServices
from RevitServices.Persistence import DocumentManager
from RevitServices.Transactions import TransactionManager
def tolist(obj):
    if isinstance(obj, list):
        return UnwrapElement(obj)
    else:
        return [UnwrapElement(obj)]
doc = DocumentManager.Instance.CurrentDBDocument
sheetnames = tolist(IN[0])
sheetnumbers = tolist(IN[1])
titleblock = tolist(IN[2]) 
sheetlist = []
notcreated = []
TransactionManager.Instance.EnsureInTransaction(doc) 
for number in range(len(sheetnumbers)):
    if len(titleblock) > 1:
        newsheet = ViewSheet.Create(doc,titleblock[number].GetTypeId())
    else:
        newsheet = ViewSheet.Create(doc,titleblock[0].GetTypeId()) 
    newsheet.Name = sheetnames[number]
    try:
        newsheet.SheetNumber = sheetnumbers[number]
        sheetlist.append(newsheet.ToDSType(False))
    except:
        notcreated.append(number) 
        doc.Delete(newsheet.Id)
TransactionManager.Instance.TransactionTaskDone()
OUT = sheetlist, notcreated
```

## Mở rộng

Ngoài ra ta có thể tạo sheet với method này.Cũng rất hay tuy có phần diễn giải hơi phức tạp một chút.

![](pic/_Image_ecfa876f-6026-41fc-b99c-0ba32341ac2e.png)

Và một điểm vẫn chưa đề cập đến sâu xa ở phần trên chính là tại sao Dynamo API sử dụng ngay từ đầu mã cũ nhưng lại không bị lỗi ? Tất nhiên là vẫn luôn có màn cửa bí mật phía sau phải không :D. Các bác thử tìm ra xem.

Không phải lúc nào **FamilySymbol** cũng hoạt động hoàn hảo với đa số.Hãy sử dụng linh hoạt trong nhiều trường hợp.

## Tham khảo

Một số hình ảnh được mượn từ : <a href="https://giobel.github.io/Dynamo-Python/">giobel</a>, đây cũng là một liên kết giúp bạn **DynamoAPI** rất hữu ích




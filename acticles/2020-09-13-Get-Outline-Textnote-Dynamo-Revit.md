## Mở đầu

Bài viết này giúp bạn sửa lỗi lấy đường bao **TextNote** không đúng với thực tế, cụ thể ở đây text note của bạn đang bị nghiêng ở một góc nào đó.Đây là một bài viết sửa lỗi cho câu hỏi đặt ra trên nhóm Dynamo Việt Nam.

## Sửa lỗi


Đầu tiên hơn hết ở trường hợp cơ bản, ta rất dễ dàng để lấy được đường bao qua boundingbox và lấy về  các điểm tạo thành một hình chữ nhật hoàn hảo.

```py
#Copyright(c) 2020, chuongho
# @chuongmep, https://chuongmep.com/
import clr
clr.AddReference('ProtoGeometry')
from Autodesk.DesignScript.Geometry import *

clr.AddReference("RevitServices")
import RevitServices
from RevitServices.Persistence import DocumentManager
from RevitServices.Transactions import TransactionManager

clr.AddReference('RevitAPI')
from Autodesk.Revit.DB import *

clr.AddReference("RevitNodes")
import Revit ,Autodesk
clr.ImportExtensions(Revit.Elements)
clr.ImportExtensions(Revit.GeometryConversion)
doc = DocumentManager.Instance.CurrentDBDocument
TransactionManager.Instance.EnsureInTransaction(doc)
textnote = UnwrapElement(IN[0])
bbox = textnote.get_BoundingBox(None)
if bbox==None:
	View = doc.GetElement(textnote.OwnerViewId)
	bb = textnote.get_BoundingBox(View).ToProtoType(True)
P1 =  Autodesk.DesignScript.Geometry.Point.ByCoordinates(bb.MinPoint.X,bb.MinPoint.Y,0)
P2 =  Autodesk.DesignScript.Geometry.Point.ByCoordinates(bb.MaxPoint.X,bb.MinPoint.Y,0)
P3 =  Autodesk.DesignScript.Geometry.Point.ByCoordinates(bb.MaxPoint.X,bb.MaxPoint.Y,0)	
P4 =  Autodesk.DesignScript.Geometry.Point.ByCoordinates(bb.MinPoint.X,bb.MaxPoint.Y,0)	
OUT = [bb],[P1,P2,P3,P4]
```

Kết quả 

![](pic/119026550_10223478759824013_3650379044129609110_o.jpg)

Nhưng hãy nhìn kĩ lại một chút , dường như khi text note bị thay đổi , có gì đó không đúng với hình học thông thường nữa, đường bao của boudingbox lúc này không còn là hoàn hảo để chúng ta có thể tận dụng chúng nữa.

![](pic/_PH_6b382104-ebba-418c-8bb0-18416ab749d1.png)

Bạn thấy đó, cái đáng ra ta muốn lấy chính là cái viền tô màu đỏ kia chứ không phải boudingbox của chúng nữa, lúc này một đúng một sai với trường hợp chuẩn và không chuẩn.Bạn sẽ nghĩ ngay đến việc đưa về trường hợp chuẩn rồi tính tiếp phải không nào.Tất nhiên sự lươn lẹo của ta ngay lúc này là cần thiết.Góc xoay lúc này sẽ được ta chủ động tính lại để trừ bù cho việc xoay lại vị trí cũ.

Việc đầu tiên chính là liệt kê các trường hợp có thể xảy ra góc đúng hướng và góc ở hướng âm.Như hình bên dưới ta sẽ liệt kê được 5 trường hợp cho góc xoay này.

![](pic/_Image_4dfba8ce-1302-4d7b-9a8a-12d2e489a609.png)

Mọi thứ xong xuôi, giờ công việc của mình là kiểm thử và tiến hành chạy xem như thế nào ?

```cs
  public static double Angle(Autodesk.Revit.DB.TextNote textnote)
        {
            XYZ direction = textnote.UpDirection;
            XYZ coordinate = new XYZ(0, 1, 0);
            double angle = direction.AngleTo(coordinate) * 180 / Math.PI;
            double baseX = textnote.BaseDirection.X;
            double baseY = textnote.BaseDirection.Y;
            double upX = textnote.UpDirection.X;
            double upY = textnote.UpDirection.Y;
            if (baseX <= 0 && baseY >= 0 && upX >= 0 && upY >= 0) return angle;
            
            if (baseX >= 0 && baseY >= 0 && upX <= 0 && upY >= 0) return angle;
            
            if (baseX <= 0 && baseY >= 0 && upX <= 0 && upY <= 0) return angle;

            if (baseX <= 0 && baseY <= 0 && upX >= 0 && upY <= 0) return 360 - angle;

            if (baseX >= 0 && baseY <= 0 && upX >= 0 && upY >= 0) return 360- angle;
            
            return angle;
        }
```

![](pic/_PH_9948a664-010e-4b08-9953-284d952a0f59.png)

Việc còn lại phía sau là ta quay chúng trở lại vị trí cũ mà thôi

![](pic/_PH_e93d7b69-fb26-4708-ba59-7cd2933c21a6.png)

Kết quả sau khi tính toán và rút gọn node để cho tất cả mọi người đều có thoải mái sử dụng dễ dàng hơn Với Package **DynaMEP** 1.2.4 và tên node `Textnote.OutLine`

![](pic/119060566_10223502892267309_7887914515910137565_o.jpg)

Hy vọng với vài cách sửa lỗi đơn giản bên trên có thể giúp bạn bớt được gánh nặng trong công việc hằng ngày của mình.Chúc các bạn thành công.

Hôm nay thật sự là một ngày tẻ nhạt đối với tôi xung quanh những dòng code tẻ nhạt và cúi mặt hàng giờ trước máy tính, cảm giác thiếu vắng đi ai đó bầu bạn dần xâm lấn cuộc đời tôi.Cánh cửa nào sẽ mở ra và cánh cửa nào sẽ khép lại, nó vẫn là điều mà tôi cần phải khám phá ...
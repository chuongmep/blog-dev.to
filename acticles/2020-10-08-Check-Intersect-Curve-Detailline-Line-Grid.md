
## Mở đầu

Bài viết này sẽ giúp bạn kiểm tra tính giao nhau của các đối tượng như curve, detailine, line và grid.

Trong hình học không gian ba chiều , nếu hai đường thẳng không nằm trong cùng một mặt phẳng thì chúng được gọi là đường xiên và không có giao điểm. Nếu chúng nằm trong cùng một mặt phẳng thì có ba khả năng để xảy ra: 
1.  Nếu chúng trùng nhau (không phải là các đường thẳng phân biệt) thì chúng có vô số điểm chung.
2.  Nếu chúng khác biệt nhưng có cùng hệ số góc thì chúng được cho là song song và không có điểm chung. 
3.  Nếu không phải hai trường hợp bên trên chúng sẽ có một điểm giao nhau.

![](pic/400px-Line-Line_Intersection.png)

Với giao cơ bản trên cùng một mặt phẳng, đơn giản nhất để nhìn nhận ra chính là : Giao bên trên, Giao trong line và cuối cùng là giao bên dưới.

![](pic/_Image_75c6ace1-a995-4775-aec7-16150e086b34.png)

Thông thường chúng ta sẽ sử dụng hàm có sẵn để tìm ra điểm giao, ở đây mình sẽ áp dụng **IntersectionResultArray** cho hàm để tìm ra điểm này

```cs
public static XYZ Intersection(this Autodesk.Revit.DB.Line line1, Autodesk.Revit.DB.Line line2)
        {
            IntersectionResultArray iResult = new IntersectionResultArray();
            SetComparisonResult setComparisonResult = line1.Intersect(line2, out iResult);
            if (setComparisonResult != SetComparisonResult.Disjoint)
                return iResult.get_Item(0).XYZPoint;
            return null;
        }
```

Với Dynamo có thể sử dụng node **intersect** để tìm ra điểm giao nhanh chóng

![](pic/_Image_fb4acf7e-2da8-4597-a4ea-87f90eb9d9e9.png)

Hoặc sử dụng hàm IntersectionResultArray tương tự bên trên

```py
import clr
clr.AddReference("RevitAPI")
clr.AddReference("RevitAPIUI")
from Autodesk.Revit.DB import Line, XYZ
from Autodesk.Revit.DB import SetComparisonResult, IntersectionResultArray

def get_intersection(line1, line2):
	results = clr.Reference[IntersectionResultArray]()		
    # See ironpython.net/documentation/dotnet for clr.Reference

	result = line1.Intersect(line2, results)
    # http://www.revitapidocs.com/2018/51961478-fb36-e00b-2d1b-7db27b0a09e6.htm
    # https://forum.dynamobim.com/t/translating-to-python/13481/6
	
	if result != SetComparisonResult.Overlap:
		print('No Intesection')
	
	intersection = results.Item[0]
	return intersection.XYZPoint


line1 = Line.CreateBound(XYZ(0,0,0), XYZ(10,0,0))
line2 = Line.CreateBound(XYZ(5,-5,0), XYZ(5,5,0))
point = get_intersection(line1, line2)
OUT = point
```

Tìm điểm giao giữa mặt phẳng và line hoặc curve với **IntersectionResultArray**

```cs
 public static XYZ Intersection(this Autodesk.Revit.DB.Plane plane, Autodesk.Revit.DB.Line line)
        {
            UV uv1, uv2;
            plane.Project(line.Origin, out uv1, out double d);
            plane.Project(line.Origin + line.Direction, out uv2, out double b);

            XYZ xyz1 = plane.Origin + (uv1.U * plane.XVec) + (uv1.V * plane.YVec);
            XYZ xyz2 = plane.Origin + (uv2.U * plane.XVec) + (uv2.V * plane.YVec);

            Line projectedLine = Line.CreateUnbound(xyz1, xyz2 - xyz1);

            IntersectionResultArray iResult = new IntersectionResultArray();
            SetComparisonResult setComparisonResult = line.Intersect(projectedLine, out iResult);
            if (setComparisonResult != SetComparisonResult.Disjoint)
                return iResult.get_Item(0).XYZPoint;
            return null;
        }
```

Kết quả : Mình thử pick điểm và tìm ra điểm để xem điểm giao và kết quả đi sau sẽ là kết quả so sánh với điểm giao vừa tính toán để xem đúng không nhé.

![](pic/CheckPointInterSect.gif)

Trường hợp trên rất khả thi, nhưng vấn đề với người đi làm thường chỉ sử dụng trường hợp này cho tìm các đối tượng bị giao như tường chéo hoặc đối tượng ống,...Nhưng nếu hai đường line hoặc curve của chúng giao với nhau khi kéo dài ra thì sao, lúc này bạn sẽ không thể dùng cách  trên để giải quyết được nữa .

![](pic/CheckPointInterSect2.gif)

Như hình dưới đây bạn có thể thấy chỉ có s4 và s3 là giao, tuy nhiên chúng ta còn muốn tìm ra các s khác nữa vì các s này đang lơ lửng giữa không trung đâu đó.

![](pic/_Image_b49b7b2a-567f-4bdb-8d4a-a6906a9c47f7.png)

Lúc này mình sẽ phải làm tiếp công việc tiếp theo là giải bài toán phức tạp hơn một chút, sử dụng tính chất ma trận để tìm ra được  điểm giao thay vì chiếu hoặc kéo dài đường line hoặc curve ra.

```cs
/// <summary>
        /// Check  Intersect Between Two Curve
        /// </summary>
        /// <param name="c1"></param>
        /// <param name="c2"></param>
        /// <returns></returns>
        public static XYZ Intersection(this Curve c1, Curve c2)
        {
            XYZ p1 = c1.GetEndPoint(0);
            XYZ q1 = c1.GetEndPoint(1);
            XYZ p2 = c2.GetEndPoint(0);
            XYZ q2 = c2.GetEndPoint(1);
            XYZ v1 = q1 - p1;
            XYZ v2 = q2 - p2;
            XYZ w = p2 - p1;
            XYZ p5 = null;
            double c = (v2.X * w.Y - v2.Y * w.X)
                       / (v2.X * v1.Y - v2.Y * v1.X);
            if (!double.IsInfinity(c))
            {
                double x = p1.X + c * v1.X;
                double y = p1.Y + c * v1.Y;
                p5 = new XYZ(x, y, 0);
            }
            return p5;
        }
```

![](pic/CheckPointInterSect3.gif)

Trường hợp Line Trùng nhau : Tất nhiên là ta sẽ không thể giao hoán ma trận rồi và chúng tất nhiên sẽ bị overlap

![](pic/_Image_52ba9b5b-a430-466d-9942-89b461954fdb.png)

Trường hợp song song cũng thế, chúng không thể tìm ra bất cứ điểm nào cho bạn nên sẽ không trả về cho bạn bất cứ đối tượng điểm nào bị giao 

![](pic/_Image_13dff289-95d9-49c5-9ef0-ffb252bac08a.png)

Ngoài ra mình còn một nho nhỏ cần giải quyết ở cuối bài này rất hay sử dụng đó là việc tìm ra đường line hoặc curve đó đang nằm đứng hay đang nằm ngang 

```cs
public static bool IsHorizontal(this Line Line)
        {
            double TOLERANCE = 0.0000001;
            XYZ p1 = Line.GetEndPoint(0);
            XYZ p2 = Line.GetEndPoint(1);
            return Math.Abs(p1.Y - p2.Y) < TOLERANCE;
        }
public static bool IsVertical(this Line Line)
        {
            double TOLERANCE = 0.0000001;
            XYZ p1 = Line.GetEndPoint(0);
            XYZ p2 = Line.GetEndPoint(1);
            return Math.Abs(p1.X - p2.X) < TOLERANCE;
        }
```

## Mở rộng

Với các trường hợp kiểm tra giao nhau trên Dynamo và bị cảnh báo.

![](pic/_Image_fdaef92c-ae96-4043-8f10-6c25d88346f0.png)

Thông thường các điểm sẽ vượt ra ngoài giới hạn (Range) thông thường nên có bị cảnh báo màu vàng bạn cũng đừng nên hoang mang mà hãy cài đặt thay đổi thông số Range lên cao là được rồi.

![](pic/_Image_136363fb-2dac-4ea8-a36c-5f6ff53c431b.png)

## Tham khảo

<a href="https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection" target="_blank">wikipedia</a> 
<a href="https://thebuildingcoder" target="_blank">thebuildingcoder</a>
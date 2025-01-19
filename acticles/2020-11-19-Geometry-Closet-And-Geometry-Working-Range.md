## Mở đầu 

Bài viết hôm nay sẽ là một chủ đề khá thú vị xung quanh việc giới hạn giá trị geometry, điều này đã gây ra một số lỗi đáng kể với việc tính toán và dựng mô hình tham số.

Như đã biết thì cho phép ta lựa chọn 4 giới hạn khoanh vùng giá trị : Thấp, vừa, lớn và cực lớn.Việc thay đổi vùng cũng khiến hiệu suất tính toán trở nên nhanh hơn.

![](pic/_Image_17e6a037-078f-4402-801e-521fcb1491ae.png)

## Lỗi là do đâu

Hãy thử nhìn hình đầu tiên này xem chuyện gì đang xảy ra :

![](pic/_Image_5ebd0812-5185-4ba1-a40c-025f7a08ef49.png)

Trông nó có vẻ ổn nhưng thực ra không ổn tí nào, vùng đang được chọn ở chế độ **Medium**, nó đã làm thiếu đi mất giá trị điểm nằm ngoài vùng **Large** của mình.Cùng xem hình bên dưới giải thích rõ hơn.

![](pic/_Image_828d723e-7c46-49a6-bc66-95cbb1cb9d8b.png)

Khi chuyển về vùng **Large**, toạ độ điểm nhận về là đầy đủ với hai điểm ở giới hạn vùng **Large** có thể đọc được.Tuy nhiên nhìn kĩ hơn một chút, việc tính toán sau đó tìm điểm gần nhất chúng đã tính toán sai mất giá trị,khoảng cách xa hơn lại là điểm gần nhất ?.Kết quả phải trả về một con số điểm không âm thì lúc này mới đúng.Chốt ở đây lỗi này trước sau đó mình sẽ tiếp tục đi xử lí tiếp.

Ta quay trở lại với việc chia mặt trên đường, lúc này ta đang ở vùng **Large** và Curve lại bé nên cuối cùng ta lại bị cảnh báo và bắt quay lại về vùng **Medium**.Ta xem đây là vấn đề số 2 nhé.

![](pic/_Image_abd4339b-d8f6-490b-acf2-0fc7954603ff.png)

## Như thế nào mới là đúng bây giờ 

Ta thử một ví dụ đơn giản nhé.
Hình dưới cho phép tìm ra điểm gần nhất so với một điểm, có thể thấy khoảng cách 16 ngắn hơn nên kết quả trả về sẽ là điểm có toạ độ X = 12 từ danh sách.Lúc này kết quả là chính xác.

![](pic/_Image_c686c708-be5f-4564-86ff-b80886fa797a.png)

## Giải quyết 

Tuỳ chỉnh lại một chỗ :

Ta có thể viết một thư viện nhỏ để sửa lỗi cho việc này thông qua việc so sánh khoảng cách trước rồi mới tính điểm gần nhất, và vùng chuyển đổi sẽ là vùng **Large**.Tuy nhiên nó chỉ giải quyết cho ta được vấn đề thứ nhất nhưng không thể giải quyết triển để vấn đề số 2.

![](pic/_Image_76249e67-fbac-44d1-971f-ac013b5a871b.png)

Viết lại cách tính khoảng cách bằng tuỳ chỉnh riêng :

Lấy một điểm xa nhất hoặc một điểm gần nhất đi so sánh với các điểm đang có.

```cs
public static Autodesk.DesignScript.Geometry.Point ClosestPointTo(Point point, List<Point> points)
        {
            XYZ psrc = point.ToXyz();
            XYZ pclosest = null;
            double num = Double.MaxValue;
            foreach (Point p in points)
            {
                var xyz = p.ToXyz();
                double dis = xyz.DistanceTo(psrc);
                if (dis<num)
                {
                    pclosest = xyz;
                    num = dis;
                }
            }
            return pclosest.ToPoint();
        }
```

```py
def calculate_distance(p1, p2):
    return ((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)**0.5
  
def find_nearest_point(start_point, points):
    min_distance = math.inf
    index = 0
    for i, point in enumerate(points):
        distance = calculate_distance(start_point, point)
        if min_distance > distance:
            min_distance = distance
            index = i
    if points:
        next_point = points.pop(index)
        stack.append(next_point)
        find_nearest_point(next_point, points)
```

Lúc này trông kết quả có vẻ ổn hơn rồi.

![](pic/_Image_4354295f-3085-4097-844b-a0e0150a4494.png)

Cùng xem hai bức hình trước khi sửa và sau khi sửa một chỗ nhỏ : 

Trước khi bị lỗi: Vòng tròn tính toán không đúng điểm gần nhất, hai đường vẽ từ điểm chia của mỗi vòng tròn chia sai so với vòng tròn bên cạnh tiếp nó.

![](pic/_Image_f011b6f0-6570-4087-b0ee-5284ecc994fa.png)

Sau khi tính toán và làm lại thì mọi thứ trông đẹp hơn và tính toán đúng.Các điểm lúc này bố trí đều đặn với mặt phẳng pháp tuyến của nó và khoảng cách giữa các điểm được phân bổ đều nhau cho mỗi danh sách.Hai điểm nối đại diện cho một  <a href="https://knowledge.autodesk.com/support/revit-products/learn-explore/caas/CloudHelp/cloudhelp/2020/ENU/Revit-Model/files/GUID-6E0ECA27-AF40-4B1D-9E0B-1DE5FBBD45F2-htm.html">Adaptive</a> tuỳ biến. 

![](pic/_Image_c8846cc4-bb6e-4048-8127-c98e0ded382f.png)

## Tổng kết 

Việc tính toán từ máy tính là rất nguy hiểm chứ không phải không , đôi khi một phép toán sai dù đúng công dụng của node, vì vậy hãy cẩn thận với `Geometry Setting Range` trong **Dynamo**.

## Giới thiệu

Đây là một tin xấu và cũng là tin tốt cho những ai sắp sử dụng `Revit 2024` bởi vì họ sẽ phải nâng cấp một điều cơ bản cốt lõi trong mã của họ đó chính là thiết lập số trả về `int64` của ElementId. Điều này sẽ gây rất nhiều lỗi cũng như cho những ai sắp đang phải đối mặt với bản nâng cấp tiếp theo. Nhưng cũng là một lợi thế cho việc lưu trữ nhiều đối tượng hơn trong một mô hình.

## Int32 vs Int64 ? 

Một số nhà phát triển nghĩ rằng int đại diện cho một số nguyên 32 bit khi ứng dụng đang chạy trên hệ điều hành 32 bit và nó đại diện cho một số nguyên 64 bit khi ứng dụng đang chạy trên hệ điều hành 64 bit. Điều này là hoàn toàn sai lầm. Int là một kiểu dữ liệu nguyên thủy và nó luôn được ánh xạ tới System.Int32 cho dù hệ điều hành là 32-bit hay 64-bit.

Thông thường, các lập trình viên trước đây sử dụng đa phần kiểu dữ liệu của đối tượng (ElementId) dưới dạng Int, cũng có thể hiểu ngầm đó chính là Int32 tức là 32 bit. Vậy việc đưa **ElementId** từ 32bit sang 64bit cũng chính là tăng phạm vì giá trị sử dụng. Lý do ở đây chính là việc mô hình ngày càng trở nên phức tạp và độ chi tiết yêu cầu ngày càng cao. Khi giá trị lưu trữ vượt ngưỡng 32bit sẽ là một sự cố lớn đối với các mô hình và thông tin giá trị lưu trữ trong mô hình.

Cụ thể ngưỡng giá trị của các kích thước như sau :

- Dải Int16 : 2 byte = 16 bit = 2 ^ 16 = 65536 = 65536/2 = -32768 đến 32767

- Dải Int32 : 4 byte = 32 bit = 2 ^ 32 = 4294967296 = 4294967296/2 = -2147483648 đến 2147483647

- Dải Int64 : 8 byte = 64 bit = 2 ^ 64 = 18446744073709551616 = 18446744073709551616/2 = -9223372036854775808 đến 9223372036854775807

Một bài viết trao đổi về việc hiệu suất giữa Int32 và Int64 rất thú vị <a href="https://www.reddit.com/r/golang/comments/kxej0b/int64_vs_int32_performance_in_synthetic_test" target="_blank">Int64 vs Int32 performance in synthetic test</a>. Tạm thời mình chưa có bình luận gì về việc này, nhưng chắc chắc cũng sẽ có một số thay đổi về hiệu suất đáng kể. Bởi vì Revit đã không còn hỗ trợ x86 từ lâu, vì vậy việc chúng ta cần xem xét bât giờ là int64 có hoạt động hiệu quả trên hệ thông x64 hay không mà thôi.

## Sự thay đổi và nâng cấp cơ bản.

Chính vì sự thay đổi cơ bản này sẽ dẫn đến cần phải thiết kế lại các công cụ bổ trợ (Addin) ảnh hưởng đến giá trị lưu trữ. Bạn có thể nhìn thấy RevitLookup không còn trả về con số chính xác nữa.Lý do chính ở đây là kiểu giá trị cơ bản thiết kế int.

Bạn sẽ dễ dàng nhìn thấy sự thay đổi này thông qua việc xem xét id của phần tử.

![](pic/firefox_twrr936bTU.png)

Chính sự thay đổi này đã làm các phần bổ trợ không còn chính xác nữa khi liên quan đến **ElementId**.

![](pic/firefox_ygBERGUF6k.png)

Và kể cả công cụ **RevitLookupWpf** cũng sẽ như vậy 

![](pic/firefox_eT07dQCnTc.png)


## Thay đổi kiểu giá trị lưu trữ

Tất nhiên, để không bị ảnh hưởng trong bản 2024 sắp tới, việc các nhà phát triển cần làm chính là cập nhật trước cho kiểu dữ liệu giá trị lưu trữ.

- Trước đây

```cs
[Transaction(TransactionMode.Manual)]
    public class TestCommand : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
           UIDocument uidoc = commandData.Application.ActiveUIDocument;
           Document doc = uidoc.Document;
           Element element = doc.GetElement(uidoc.Selection.PickObject(ObjectType.Element));
           ElementId elementId = element.Id;
           int id = elementId.IntegerValue;
           MessageBox.Show(id.ToString());
           return Result.Succeeded;
        }
    }
```

- Sau này

```cs
 [Transaction(TransactionMode.Manual)]
    public class TestCommand : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            UIDocument uidoc = commandData.Application.ActiveUIDocument;
            Document doc = uidoc.Document;
            Element element = doc.GetElement(uidoc.Selection.PickObject(ObjectType.Element));
            ElementId elementId = element.Id;
#if R24
            long id = elementId.Value;
#else
            int id = elementId.IntegerValue;
#endif
            MessageBox.Show(id.ToString());
            return Result.Succeeded;
        }
    }
```

## Kết luận

Việc thay đổi cơ bản này nhìn qua có vẻ cơ bản và dễ dàng nhưng đằng sau đó là hàng loạt các nâng cấp và có thể sẽ là hàng loạt các ứng dụng và thay đổi từ các nhà phát triển bên thứ ba, hệ thống tích hợp, cơ sở dữ liệu, hiệu suất ứng dụng và cả cách trao đổi dữ liệu trong tương lai.

## Cuộc sống 

Bàn tính <a href="https://en.wikipedia.org/wiki/Soroban" target="_blank">Soroban</a> của người Trung Quốc có cấu tạo phía trên thanh ngang có một hạt quy ước với giá trị là 5.
Phía dưới thanh ngang gồm 4 hạt, quy ước mỗi hạt có giá trị là 1. Mình vẫn đang học hỏi về cách sử dụng thành thạo bàn tính Soroban này.

![](pic/_Image_3d40f328-3e70-48de-9370-14eef5021b8b.png)
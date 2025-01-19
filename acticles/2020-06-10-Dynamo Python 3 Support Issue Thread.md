## Mở đầu

Đây là một tin khá quan trọng vì trước giờ **Dynamo** cứ đứng mãi ở phiên bản 2.7.x phát hành đến cả khi viết bài viết này, có lẽ đây sẽ là một cải tiến quan trọng và cập nhật đáng mong nhờ nhất giành cho người dùng yêu thích **Dynamo**.

Tại sao chúng ta cần python 3 : 
- Những tính năng mới của bản cao sẽ hỗ trợ rất nhiều vấn đề liên quan đến cú pháp
- Hỗ trợ mạnh mẽ về dữ liệu và máy học thông qua các thư viện
- Dễ dàng đưa các thư viện bên thứ ba vào làm việc

## Python nodes

Tại phần python script bạn sẽ thấy thêm hai tùy chọn để lựa chọn để phân biệt giữa IronPython2(2.7.3) và Cpython3.

![](https://aws1.discourse-cdn.com/business6/uploads/dynamobim/original/3X/1/1/113a6354aebbcd86321f315575329eae4e36f568.png)

## Context Menu

Tại mục Context Menu bạn có thể dễ dàng chuyển đổi qua lại nhằm mục đích hỗ trợ cho các script cũ đã viết tương thích cao với các bản sau mà không phải chỉnh sửa quá nhiều.

![](https://aws1.discourse-cdn.com/business6/uploads/dynamobim/original/3X/1/a/1a8b189f0602a837aecc7fc47f91e23cef75be77.png)

## Editor

Bên trong trình Editor cũng sẽ có chế độ chuyern đổi này.Ngoài ra bạn sẽ thấy thêm một nút nữa là learn more để xem sự khác nhau giữa chúng.

![](https://aws1.discourse-cdn.com/business6/uploads/dynamobim/optimized/3X/7/c/7c554701a8f099687d23f540b20f4c1a8f38ad42_2_690x460.gif)

## Cài đặt 

Để biết được cài đặt thêm bất cứ phiên bản python nào mà không bị nhầm lẫn, trước hơn hết bạn phải kiểm tra ngay chính trong python script xem liệu bạn đang ở phiên bản python hiện tại nào.

![](pic/_Image_88707dde-1125-45b0-b17c-62f051eee180.png)

Bên trên bạn có thể thấy phiên bản cần tải về để phù hợp chính là phiên bản 3.8.3.Vì vậy lúc này chúng ta sẽ vào <a href="https://www.python.org/downloads/release/python-383/" target="_blank">Trang chủ</a>  chính thức để tải về và cài đặt chúng.Hãy sáng suốt lựa chọn phiên bản phù hợp nhé vì sẽ có rất nhiều sự lựa chọn ở đây.Tốt hơn hết bạn nên lựa chọn phiên bản web để trong quá trình thiếu hoặc lỗi máy sẽ tự động tải về và vá luôn cho bạn.

![](pic/_Image_3304074a-ee13-420a-884b-bc89a5edbb74.png)

Sau khi cài đặt xong, bạn cần tải và cài thêm một công cụ pip để tiện cho việc cài đặt các thư viện thông qua lệnh sau : 

```
python get-pip.py
```

Giờ mình sẽ tiến hành cài đặt thêm thư viện numpy để sử dụng, thư viện này được sử dụng rất nhiều trong khoa học dữ liệu để phân tích thậm chí là học máy với một số lượng lớn thư viện có sẵn.Ở đây lệnh sẽ phân biệt để cài cho phiên bản đặc biệt.Vì cơ bản máy mình đang sử dụng rất nhiều phiên bản python để làm việc.Với lệnh bên dưới máy sẽ cài thư viện numpy cho python 3.8 như đã kiểm tra bên trên.

``` 
python -3.8 -m pip install numpy
```

Đường dẫn kiểm tra xem mình đã cài hay chưa, giờ thì mình sẽ đưa đường dẫn này vào Dynamo để sử dụng nhé :

![](pic/_Image_6c7fad97-67f7-4023-b20b-d1e7268c4b74.png)

Thử một cái gì đó đơn giản với thư viện numpy nhé, hãy nhớ là thay đổi thành đường dẫn cài đặt thư viện trong máy của bạn và đảm bảo rằng các bước trên của bạn đã cài đặt thành công.Ví dụ bên dưới sẽ sử dụng zeros từ numpy để tạo ra mảng một chiều với số lượng là 5.Việc bạn cần lưu ý là bạn phải thêm đường dẫn ánh xạ đến thư viện mà bạn đã cài đặt trước đó.Nhớ là thay đổi đường dẫn theo đường dẫn trên máy của các bạn nhé.

```py
import sys
import clr
sys.path.append(r'C:\Users\Chuong.Ho\appdata\local\programs\python\python38\lib\site-packages')
import numpy

zeros = numpy.zeros(5)
output = zeros.tolist()

OUT = output
```
Kết quả sau khi thực hiện hoàn tất.

![](pic/_Image_8172ff46-d725-4724-87c3-82f47e2cb36a.png)

Đến đây sẽ có một số bạn không chạy mà sẽ báo lỗi không tương thích phiên bản numpy.Hãy quay lại bước cài đặt bằng việc gỡ bỏ phiên bản numpy mới nhất và thay vào đó phiên bản được yêu cầu.

Sử dụng lệnh gỡ bỏ : `py -3.8 -m pip uninstall numpy`

Và tiến hành cài đặt lại bằng lệnh này với phiên bản yêu cầu chính xác : `py -3.8 -m pip install numpy==1.18.1` 

![](pic/_Image_755f749d-5fd5-4cf2-aeb6-45b552dc2a94.png)

Cuối cùng hãy thử chạy lại một lần nữa, may mắn sẽ mỉm cười với bạn.

## Mở rộng

Còn rất nhiều thư viện khác mà mình không giới thiệu trong bài viết này.Nếu bạn muốn cài thêm nữa hãy thay đổi tên gói bằng tên thư viện mà bạn muốn cài đặt mới.

Rồi giờ đây sắp sửa chúng ta sẽ có thêm mớ hỗn độn giữa 2 và 3, stub python cập nhật ba la mây mây.Liệu đây sẽ là cải tiến giúp cho người dùng không.Cùng đợi vài tháng nữa nhé.Cám ơn các bạn đã ghé thăm và đọc bài viết.Để xem chi tiết về nội dung này, các bạn có thể xem tại link tham khảo để ở cuối bài viết.

## Tham khảo

<a href="https://forum.dynamobim.com/t/new-feature-preview-python-3-support-issue-thread/51649" target="_blank">Dynamo Forum</a>  

<a href="https://github.com/DynamoDS/Dynamo/wiki/Customizing-Dynamo's-Python-3-installation" target="_blank">Customizing-Dynamo's-Python-3</a> 

<a href="https://www.notion.so/Create-Your-First-CPython-Command-b8a7718c554645d1a18454c0b363e3c9" target="_blank">pyrevit cpython</a> 
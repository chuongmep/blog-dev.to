## Mở đầu

Bài viết hôm nay sẽ là một thông báo cập nhật lớn trên gói **DynaMEP 1.2.2**.Vì đây là cập nhật quan trọng và thay đổi bố cục hỗ trợ dữ liệu mở rộng.

Tôi cũng đã đắn đo suy nghĩ rất nhiều và quyết định mạnh dạng nâng cấp đổi mới toàn bộ.

## Cập nhật mới

Cập nhật lần này sẽ thêm biến đầu vào là **doc** ở tất cả các node thực thi.Vì sao lại như thế ?

![](pic/AddDocPackageDynaMEP.png)

Tôi có khoảng thời gian may mắn làm việc và tiếp xúc với các dự án nước ngoài làm việc theo kiểu module.Việc mở mỗi module để làm một công việc rất tốn thời gian.Ở Việt Nam các loại hình đa số làm theo kiểu này vấn còn ít và hạn chế vì việc lắp đặt và sản xuất thi công nhanh chưa chắc là sẽ đảm bảo chi phí thấp hơn.

![](pic/ModuleAssembler.png)

Ví dụ bạn muốn gán giá trị **Parameter** cho dự án của bạn, bắt buộc bạn phải mở dự án đó lên.Với tổng số module là trên 20 thì bạn sẽ làm như thế nào ? **Doc** sẽ xử lý được nhiệm vụ này bao gồm cả việc bạn có đang ở vị trí của mô hình chính và bạn có thể lấy tất cả các file dự án chưa mở lên để xử lý cũng được, một công đôi chuyện.

![](pic/ModuleAssemblerMEP.png)

Bạn có tổng thể trên 20 tệp được linked trong BIM360 với một file chính, bạn muốn xử lý gán dữ liệu tự động cho các file linked kia, bạn không có cách nào ngoài việc mở từng tệp một lên rồi chạy Dynamo.Nhưng các tác giả ở các gói hỗ trợ hiện tại, rất ít tác giả phát triển nghĩ đến điều này, vì vậy bạn sẽ chẳng thể sử dụng được node nào phù hợp để gán dữ liệu.

![](pic/BIM3602020-08-27_9-46-17.png)

Hình trên ví dụ bạn có một module và bao gồm các hệ được link lại với nhau, như vậy tổng số mô hình bạn sẽ sắp mở là trên 20 mô hình nhân tổng số link có trong module.Như vậy module bạn sắp mở để thay đổi dữ liệu sẽ là (20*7) = 140 Module 🥵.

Giả sử đặc bạn là một người làm 8 tiếng và bạn sẽ phải làm công việc này, bạn nghĩ lúc đó bạn sẽ như thế nào ?

## Hạn chế bản cập nhật

Một vấn đề hạn chế ở bản cập nhật lần này chính là việc xem lại dữ liệu các script mà các bạn đã khởi tạo từ trước, tôi đã kiểm tra trên bản revit 2021 dynamo 2.6 và kết quả là Autodesk họ vẫn chưa cho phép cập nhật node theo chuẩn phiên bản được nâng cấp, hy vọng trong tương lai họ sẽ suy nghĩ sớm đến điều này.

Để xử lý với các vấn đề với các script có sử dụng Package **DynaMEP** ở phiên bản cũ, bạn vui lòng thêm **doc** là **Documents.Curent** để khắc phục sự cố.

![](pic/AddDocPackageDynaMEP001.png)

Nếu bạn không muốn xử lý các file dự án chưa mở hoặc linked trong mô hình, bạn hoàn toàn có thể không truyền vào biến gì cho **doc**(`Đảm bảo script bạn viết là khởi tạo mới mà không copy lại node đã viết ở script sử dụng package DynaMEP bản thấp hơn`).Tức là bạn vẫn sử dụng như lúc chưa có thông tin **doc** bổ sung và chức năng tương tự.

Nếu bạn vẫn còn đang hoang mang chưa hiểu tôi thêm doc để làm gì thì có thể xem bài viết xuất IFC cho các dự án hàng loạt tại <a href="https://chuongmep.com/IFC-And-Export-IFC-By-Dynamo" target="_blank">IFC-And-Export-IFC-By-Dynamo</a> 






## Mở đầu 

Bạn đã từng nghe qua kiểm thử phần mềm chưa. Đúng vậy , việc tạo ra sản phẩm đối với mỗi lập trình viên là quan trọng và tốn nhiều công sức, bên cạnh đó công việc kiểm thử cũng không kém phần quan trọng.Hôm nay mình sẽ trình bày những lý do sau đây để một người kỹ thuật có thể áp dụng kĩ năng này để làm tốt cho sản phẩm của mình.

## Tại sao lại có Tester

Từ trước nay có lẽ chúng ta đã quá quen thuộc với khái niệm Tester, một người chuyên kiểm thử phần mềm trước khi chúng được phát hành và đưa đến tay khách hàng.Ở bộ phận IT chuyên biệt , điều này là rất quan trọng.Nhưng với những người làm về kỹ thuật.Đôi khi điều này lại không đáng bận tâm vì sao lại vậy?

Một số người bạn mình còn đâm ra chán Tester vì họ cứ báo cáo lỗi hoài, mà nói thật Tester có gì xấu đâu, bạn viết tốt thì chẳng sợ ai cả.Chỉ có bạn viết mã xấu bạn mới sợ thôi.

Các công ty hiện tại không gửi gắm quá nhiều lập trình viên vào một công ty làm kỹ thuật, với số lượng ít ỏi như vậy thì việc tạo ra sản phẩm, họp hành, đào tạo đã là quá sức với một lập trình viên ở mảng này.Tuy vậy cũng có lúc ta cần nhìn nhận lại những vấn đề quan trọng dưới đây.

### Kiểm thử quan trọng và cần thiết cho việc bảo trì

Bạn viết ra một tháng nhưng bạn phải bảo trì mã của mình cả một thời gian dài phía sau.Đó là những ngày tháng ngồi đọc lại mớ code cũ của mình, xem vẻ lúc này bạn sẽ thấy việc kiểm thử trước đây của mình quan trọng đến nhường nào.

### Khả năng cộng tác

Sẽ có lúc bạn sẽ cần đến đồng đội trợ giúp vào làm chung dự án với mình nhưng khi nhìn lại thì mình cũng không hiểu rõ nội dung mình viết thì làm sao người khác có thể giúp mình được.Mình đã từng gặp cảnh những người làm chung công ty nhưng lại làm ở hai mã nguồn khác nhau, làm độc lập nhau.

### Giúp dự án của bạn chạy suôn sẻ

Khi bạn kiểm tra mã, bạn chắc chắc được bạn viết có đúng không ngay từ lần đầu tiên, nếu các phiên bản phần mềm kĩ thuật nâng cấp ở bản cao hơn, bạn chạy theo và bắt lỗi nhanh hơn bao giờ hết.

### Nâng cấp tính năng

Một khi đã xông pha vào dự án thì bất kì người nào đó, dù là người mới thì họ cũng có thể dễ dàng hiểu được và tiếp cận mã của bạn, bạn sẽ không phải dạy họ tham gia dự án bởi vì tài liệu của bạn viết đã là quá đủ với họ.

### Mức độ tin cậy của phần mềm

Nếu phần mềm nào đó trải qua việc kiểm thử mã thì chắc chắc khách hàng của bạn và những người đang sử dụng sản phẩm của bạn sẽ không giành hàng giờ để nghi ngờ về công cụ của bạn.

## Test trong Visual Studio

Bạn có thể thực hiện nhiều công việc tìm kiếm, tổ chức và chạy thử nghiệm các method cơ bản từ thanh công cụ Test Explorer .

![](pic/_Image_7efbaf0f-6c29-4b83-9c1e-da8a020a0672.png)

Các hàm sẽ được kiểm nghiệm với các thuộc tính được định sẵn, một vài toán tử đơn giản có thể giúp ta trả về kết quả có giống với mong muốn thực tế không.

![](pic/_Image_d932d994-5627-43a2-a957-8b03bbe351e8.png)

Xem một kết quả kiểm tra đơn giản 

![](pic/_Image_5797c7b9-6aa1-49dc-b51b-792af22239b2.png)

## Revit TestRunner

Dự án này hoạt động như một công cụ addin trong Revit, mình sẽ can thiệp mã test từ ngoài vào trong khi dự án đang mở

Sau khi cài đặt xong

![](pic/_Image_8fe5fec7-badf-44e8-a308-eef1ddfa1f5c.png)

Để kiểm thử bạn cần mở Revit.TestRunner.App từ ngoài vào để thực thi một lắp ráp dll, cây thư mục sẽ hiện lên các funtion đã được định sẵn để Test 

![](pic/_Image_335b20fb-dbf4-4d8e-a804-77cff310b3bf.png)

Và giờ thì cây thư mục sẽ hiện lên các hàm lựa chọn tuỳ theo mức độ bạn muốn kiểm tra riêng cho Funtion

![](pic/_Image_09a0ba6b-f3c9-47cc-bf79-429b2e713308.png)

Hình ảnh sau khi kiểm thử thành công.

![](pic/_Image_5328da86-73df-43e0-bb77-6b7c2d8a1b49.png)

## RevitTestFramework

Công cụ này hay hơn ở chỗ bạn không phải cài như một Addin mà có thể lựa chọn phiên bản revit để tự động hoàn tất quả trình kiểm tra.Kết quả sẽ được lưu lại dưới dạng tệp xml.Riêng mình thì mình lại thích sài công cụ bên trên hơn vì nó nhanh mà không phải chạy nhiều lần để mở.

![](pic/_Image_53afa163-1930-4d93-994c-7c6b02af4b8c.png)

## xUnitRevit

Công cụ này với nhiều chức năng hơn có lẽ là sẽ phù hợp với nhu cầu của bạn.

![](pic/88958499-77809980-d298-11ea-84b6-e0749790ffc5.gif)

## Mở rộng

Vì đây đều là các công cụ mã nguồn mở nên mình có để lại đường dẫn tham khảo bên dưới cho bạn nào cần tiếp cận và áp dụng quy trình này vào quá trình kiểm thử các adđin trong công ty hoặc cá nhân.

## Tham Khảo

<a href="https://github.com/geberit/Revit.TestRunner">Revit.TestRunner</a> 

<a href="https://github.com/DynamoDS/RevitTestFramework">RevitTestFramework</a>

<a href="https://github.com/chuongmep/RvtUnit">RvtUnit</a> 

<a href="https://docs.microsoft.com/en-us/visualstudio/test/run-unit-tests-with-test-explorer?view=vs-2019">Microsoft</a>

<a href="https://github.com/specklesystems/xUnitRevit">xUnitRevit</a> 
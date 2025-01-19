
## Bắt đầu 

Việc lấy về thông tin thuộc tính của đối tượng là việc quan trọng nhất trong các khâu xử lí đối tượng, bởi vì dữ liệu là quan trọng.Vì vậy bài viết hôm nay sẽ tập trung giúp bạn lấy về tất các các thông tin thuộc tính đang có trong **Navisworks** từ Clash Test mà bạn muốn lấy.Việc lấy dữ liệu đòi hỏi người lấy cần có kinh nghiệm và người cho dữ liệu cần chính xác để kết quả thống kê không bị sai lệch.Thường thì các công việc lấy thuộc tính đối tượng được sử dụng rất nhiều cho các mục đích khác nhau như: 

- Thống kê dữ liệu 
- Phân tích dữ liệu
- Thêm mới thuộc tính 
- Sử dụng dữ liệu chuyển đổi sang một bên thứ ba
- Thay đổi dữ liệu.
- ...

Bạn có thể xem một mẫu danh sách thuộc tính đối tượng cần lấy như sau:

![Data Properties](pic/_Image_8d5976db-b2e2-4bee-b6f3-0afd003524cc.png)

## Tìm hiểu dữ liệu

Cào data: Đây cũng là một khái niệm không mấy xa lạ với các Data Science chuyên cào dữ liệu.Đối với một mô hình lớn, vô tình dữ liệu này khiến chúng trở nên to lớn hơn bao giờ hết.Chúng ta hãy thử tính nhẩm một đối tượng bao gồm hàng trăm thông tin thuộc tính và một mô hình chứa hàng triệu đối tượng.

Để hiểu về API và cách làm việc để lấy về các thuộc tính đối tượng, ta cần hiểu và nắm rõ các thông tin cơ bản như : 

1.Category: Là loại thuộc tính đối tượng cần lấy.

2.Property: Là tên thuộc tính đối tượng cần lấy.

3.Value: Là giá trị dữ liệu của thuộc tính đối tượng cần lấy.

![](pic/_Image_80af1b62-6ac3-4eab-96b0-c1893f9d40c2.png)

Đối với Clash Test, ta cũng cần làm rõ các thông tin đối tượng nhận biết trước khi tham chiếu đến API:

1.Clash(Clash Result) giao nhau giữa các đối tượng trong một Clash Test.

2.Clash(Clash Test) Test cho người dùng tạo ra để kiểm tra xung đột, bao gồm hiển thị số lượng Clash Result, Status,Resolved, ...

Dựa vào các thông tin cơ bản đã nắm , bạn có thể dễ dàng triển khai API để lấy về các thuộc tính đối tượng.

![](pic/_Image_eb066b3a-70a9-45fc-8963-7ed7df8cb090.png)

## Kiểm tra thuộc tính đối tượng

Bạn có thể dùng **NavisLookup** để kiểm tra nhanh thông tin thuộc tính cần lấy để biết được vị trí API cần lấy.

![](pic/_Image_0be2310a-d730-4474-978d-d8bc9c26b79d.png)

Đối với công cụ **AppInfo**, bạn cũng có thể kiểm tra nhanh chóng và dễ dàng.Ở đây sẽ có 5 Categories được tìm thấy và nhiệm vụ của chúng ta là viết mã để lấy dữ liệu thông tin từ chúng.

![](pic/_Image_170d52a6-8dd6-47d8-9a3a-91fc95ec4052.png)

1.Clash Test.

2.Các kết quả kiểm tra của một Clash Test(Clash Result).

3.Hàm lấy về thông tin thuộc tính đối tượng.

![](pic/_Image_f8bd972d-f647-4962-9700-5fa223c9427f.png)

Một mã đơn giản sẽ được viết như sau: 

`gist:c78b05a387492f4c2172096dbc6007e5`

Chúng ta sử xem một vài kết quả thu được từ việc lấy thông tin đối tượng.

![](pic/_Image_fb48e60b-521a-4049-b6ec-bb4811568f8c.png)

## Lấy về chính xác dữ liệu

Thoạt nhiên, các thuộc tính không bao giờ có kiểu dữ liệu là một mà sẽ có rất nhiều kiểu dữ liệu của các giá trị trả về.Vì vậy để đảm bảo đồng nhất kết quả giá trị lấy về, ta sẽ thống nhất chuyển đổi toàn bộ giá trị sang chuỗi để làm việc.

`gist:6ae584cafae3facaed1569132ad2166d`

Nếu nhìn kĩ thông tin bên trên.Do bạn lấy thông tin từ **Children** Item của **Clash Result**.Chính vì vậy nếu các loại thuộc tính là loại bên ngoài hoặc thuộc tính tuỳ chỉnh sẽ không thể lấy hết.Do đó bạn cần sửa đổi một chút trong mã của mình.Thuộc tính **CompositeItem1** sẽ cho phép bạn lấy về đầy đủ thông tin hơn bao giờ hết.

![Compsiteitem1 vs Item1](pic/mspaint_xynsorTOQp.png)

## Cào dữ liệu

Các công việc đã thực hiện xong, bây giờ công việc chính xác của mình là cào dữ liệu về và sử dụng, các thông tin sẽ được ngăn cách nhau bởi một kí tự đặc biệt.

`gist:42d57dca6e6f7e0616e4edea052dc5c2`

Kết quả thật là hoàn hảo phải không nào.Và để làm cho hàng triệu đối tượng, có lẽ mình phải treo máy hàng giờ đồng hồ mất.Để hiểu rõ hơn vê các mã bên trên bạn cũng có thể tham khảo mã hoàn chỉnh tại [Source Code Sample](https://github.com/chuongmep/NavisAddinManager/blob/9473e27a3ce0e475a158970ff348e9e25222b5c5/Test/GetPropertiesFromClashTest.cs#L59-L71)

![](pic/_Image_9b748c29-ddbe-4165-841a-3e684691eaee.png)

## Đánh giá dữ liệu

Nhìn chung các dữ liệu khá lớn vì vậy có lẽ mình sẽ viết tiếp ở phần sau nếu có thời gian!

## Mã nguồn mở cuối tuần

- Say Hello to PyScript : Hãy chào đón https://pyscript.net/, cho phép bạn viết python bên trong HTML
- RhodoniteTS : Một mã nguồn mở https://github.com/actnwit/RhodoniteTS sử dụng Web3D trong TypeScript rất đáng xem. 
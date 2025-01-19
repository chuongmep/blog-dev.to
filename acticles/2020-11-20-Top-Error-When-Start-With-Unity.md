### Mở đầu 

Bài viết của hôm nay sẽ điểm danh qua một số lỗi khi bắt đầu với Unity mà rất nhiều người gặp phải, hôm nay mình sẽ tổng hợp một số lỗi cơ bản để ai cũng có thể vượt qua và tiếp cận dễ dàng.

![](pic/_Image_788b77ae-8e61-4c3e-8f40-0a688c1e1529.png)

### Những lỗi thường gặp

**1.Không hỗ trợ thiết bị AR**

Điều đầu tiên củ chuối nhất đó là thiết bị của bạn không hỗ trợ việc bạn tạo ra các ứng dụng AR.Người ta nói có thực mới dực được đạo, đạo chưa thấy mà điện thoại đã không hỗ trợ rồi, thế có điên không chứ.Bạn có thể kiểm tra danh sách các thiết bị android hỗ trợ tại:

ARCore : <a href="https://developers.google.com/ar/discover/supported-devices">https://developers.google.com/ar/discover/supported-devices</a>

**2.Camera AR không nhìn thấy vật thể sau khi đã đặt**

Việc này tưởng chừng như khá đơn giản nguyên nhân của việc này bắt nguồn từ góc nhìn bị đặt sai vị trí nên cách sửa đơn giản là chỉnh lại giới hạn xa gần của camera và đối tượng nằm trong vùng nhìn thấy của camera.

![](pic/_Image_8595fdf0-e8fa-49d9-a7ed-d363fe628a8a.png)

**3.Camera đen thui**

Chỉnh sửa lại thông số các điểm này, biết đâu may mắn sẽ mỉm cười với bạn.

1.Edit -> Project Settings -> Player -> Resolution and Presentation -> disabled the check in "Use 32-bit Display Buffer"

2.Edit -> Project Settings -> Player -> Resolution and Presentation -> enabled the check in "Disable Depth and Stencil"

3.Edit -> Project Settings -> Quality -> Rendering -> changed "Anti Aliasing" option to "Disabled".

**4.Gõ font chữ việt bị lỗi**

Trông việc này có vẻ rối với ai đang đặt tên của object tiếng việt, chỉ cân vào unikey tích thêm nút này:

![](pic/_Image_24f3829f-2d2b-4067-9a78-3a635a9addc9.png)

**5.Viết mã không hiển thị gợi ý**

Sửa bằng cách để cho Unity tự động nhận diện extention là xong.Với các bản Unity đời 2017 trở xuống thì còn Monosharp Developer còn đời mới thì dùng Visual Studio.

![](pic/_Image_646c5c59-c5b6-4f0e-89f6-66c63cf2864f.png)

**6.Lỗi thiếu JDK và SDK**

Thiếu hai trình bổ trợ để build sản phẩm thì xem như ăn cám.

![](pic/_Image_73f2a010-df4c-471b-865a-8721752ce29f.png)

**7.Unity thoát đột ngột**

Nguyên nhân : Trong quá trình cài đặt có phát sinh lỗi hoặc thiết lập sai thông số trong quá trình làm.

Cách sửa : Gỡ đi cài lại là giải pháp tốt nhất hiện giờ mình từng làm.

![](pic/_Image_e6429085-3822-4997-bab6-9bec63b15fb2.png)

**8.Thiết bị iOS hỗ trợ nhưng báo không hỗ trợ**

Gặp trường hợp này đúng là cay không thể tả nổi mặc dù thiết bị hỗ trợ nhưng không làm được.

Cứu mạng : Xóa đi build support iOS thư mục đã tạo iOS phiên bản gần với phiên bản ios trên máy đang dùng hoặc chuyển đổi về phiên bản cũ
Ví dụ mình đang dùng iOS 12.3

1.Chuyển đến thư mục `/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/DeviceSupport`

2.Tạo một thư mục có tên " 12.3".

3.Sao chép thư mục tập tin 12.2 vào thư mục " 12.3".

![](pic/_Image_92b01ed3-6f1c-4d8e-a1b7-395aea8db4f0.png)

**9.Giới hạn thiết bị**

Giải pháp là xoá bớt thiết bị đi là được.Nhớ là develop trên iOS thì vài ngày là phải cài lại nhé, chứng chỉ hết hạn khá nhanh chóng.

![](pic/_Image_caecf997-3166-4af8-866f-b34b3cc62f92.png)

### Tổng kết

Trên đây chỉ là một số lỗi liệt kê cơ bản, trong quá trình làm việc còn có cả trăm ngàn lỗi khác liên quan đến sản phẩm và kể cả các tính năng.Hi vọng những kiến thức bên trên sẽ hữu ích.
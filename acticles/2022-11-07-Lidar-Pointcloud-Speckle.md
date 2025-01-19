
## Tổng quan

Hai năm trước đây khi mình bắt đầu chia sẻ xử lý Point Cloud với `LiDAR` cho di động trên IPad hoặc Iphone, mình nhận ra rằng có rất nhiều điểm thú vị với nó và mang đến cho bạn một cái nhìn mới mẻ về Point Cloud. Tuy nhiên chưa bao giờ có thời gian để chia sẻ điều thú vị này. Và ngày đó cũng không có ai quan tâm nhiều về bài nghiên cứu này nên mình cũng cho lui dần lãng quên vào quá khứ. Đến ngày hôm nay thì mình đã đủ thời gian để chia sẻ với bạn về bài nghiên cứu này đồng thời thêm một số thông tin thú vị khác. Khi ai đó nhắc đến Scan-to-BIM thì bạn nên đọc bài viết này để hiểu về cách mà đằng sau bức tường đó hoạt động.

Bài viết này sẽ giới thiệu một số điều thú vị mà mình đã làm với LiDAR Ipad và cách chuyển đổi để đưa lên nền tảng [Speckle](https://speckle.systems/).

![](pic/ScanToBIM2.png)

Do mình cũng không có nhiều thời gian để đi scan bên ngoài nên quyết định sử dụng chính căn phòng đang ở ở Singapore để Scan luôn, và giá của căn phòng này cũng không hề rẻ tí nào nên thôi quét lại làm kỉ niệm, xem như là số hóa nó để sau này còn xem lại và vận hành cho căn phòng thuê đầu tiên của mình ở nước bạn.Và cũng biết đâu có thể dùng hữu ích cho việc gì đó sau này.

![My Room](pic/300561580_10228115792026920_7698315508427189535_n.jpg)

## Giới thiệu LiDAR

Lidar, là viết tắt của thuật ngữ phát hiện và phạm vi ánh sáng (Light Detection and Ranging), là một phương pháp viễn thám sử dụng ánh sáng dưới dạng laser xung để đo phạm vi (khoảng cách thay đổi) với bề mặt. Các xung ánh sáng này kết hợp với các dữ liệu khác được ghi lại bởi hệ thống tạo ra thông tin ba chiều chính xác về hình dạng của đối tượng và các đặc điểm vật liệu, biến dạng bề mặt của nó.

Hệ thống LiDAR trên di động được Apple tích hợp vào các dòng Iphone, Ipad thế hệ mới. Điều này làm cho cộng việc quét 3D trở nên dễ dàng tiếp cận hơn bao giờ hết so với các thiết bị quét 3D đắt tiền như hiện nay.

![](pic/POWERPNT_ADUuubuEN6.png)

Để nhận diện được chính xác và chất lượng tốt hơn, một số thiết bị đi kèm với nó điển hình như dòng sản phẩm đến từ <a href="https://structure.io/structure-core" target="_blank">structure.io</a> cải thiện khả năng cảm nhận độ sâu của đối tượng vật thể về mọi mặt: Nhiều khung hình trên giây hơn ở độ phân giải cao hơn, cải thiện độ chính xác và độ chính xác cũng như màn trập để xử lý các đối tượng và cảnh chuyển động nhanh. 

![](pic/POWERPNT_zwYYFaboQs.png)

Định dạng cho Point Cloud rất phổ biến với một số phần mềm như Recap, Meshlab, Revit, CyClone, .... Bên dưới đây để mô tả chi tiết hơn thì <a href="https://www.falconviz.com/" target="_blank">falconviz</a> cũng có một số hình ảnh cụ thể để bao quát rõ hơn về các định dạng phổ biến trong các phần mềm. 

![](pic/_Image_c4e8197a-8b93-4c20-85a3-86d6cbb2c93a.png)

## Sử dụng LiDAR 

Hiện nay đã có rất nhiều ứng dụng cải thiện độ chính xác cao, cho phép xuất khẩu nhiều định dạng khác nhau. So với những năm trước đây thì các ứng dụng dã dần trở nên phong phú hơn rất nhiều, bạn có thể sử dụng từ khóa `LiDAR` để tìm kiếm hoặc sử dụng một số App mình khuyến nghị dưới đây :

<a href="https://apps.apple.com/us/app/3d-scanner-app/id1419913995" target="_blank">3d-scanner-app</a>

<a href="https://apps.apple.com/us/app/sitescape-lidar-3d-scanner/id1524700432" target="_blank">sitescape-lidar-3d-scanner</a>   

<a href="https://apps.apple.com/us/app/polycam-lidar-3d-scanner/id1532482376" target="_blank">polycam-lidar-3d-scanner</a>

<a href="https://apps.apple.com/app/sakura3d-scan/id1527410156" target="_blank">sakura3d-scan</a>

<a href="https://apps.apple.com/us/app/scandy-pro/id1388028223?ls=1" target="_blank">scandy-pro</a>

<a href="https://canvas.io/#get-canvas" target="_blank">canvas.io</a>

Ở bài viết này mình sẽ sử dụng <a href="https://apps.apple.com/us/app/3d-scanner-app/id1419913995" target="_blank">3d-scanner-app</a> để hướng dẫn cũng như xuất khẩu các tệp.

Việc quét LiDAR rất đơn giản, việc của bạn chỉ cần giơ Camera xung quanh đối tượng muốn quét như quay một video. Di chuyển chậm giúp bạn quét tốt hơn ở các góc nhọn nên lưu ý.

![](pic/ApplicationFrameHost_Ub8bjVWFFH.png)

Việc xem trước màu sắc để cân nhắc nên quét lại hay không giúp bạn không mất quá nhiều thời gian cho các công đoạn ghép nối điểm dữ liệu sau này.

![](pic/ApplicationFrameHost_E7MPGWywcf.gif)

Điểm lưu ý cuối cùng là bạn hãy xuất khẩu chúng sang định dạng `e57` để xử lý trên máy tính. Đây được xem là định dạng mình cảm thấy màu sắc được giữ lại hài hòa nhất và mình khuyến nghị bạn nên sử dụng định dạng này.

![](pic/icglElMnnu.png)

Như vậy là công đoạn trên di động/ Ipad đã xong, việc của bạn tiếp theo bây giờ là tập trung vào xử lý dữ liệu.

## Xử lý dữ liệu quét từ LiDAR

Trong phần mềm [Recap Pro](https://www.autodesk.com.sg/products/recap/overview) Chọn khởi tạo dự án mới và bắt đầu nhập tệp dữ liệu es7, 

![](pic/ReCap_2IDhemgySM.png)

Điều bạn có thể dễ dàng nhận ra ngay bây giờ chính là màu sắc của nó. Đó không phải là màu sắc gốc mà chúng ta mong muốn. Bên cạnh đó, việc quét từ di động rất dễ bị đảo chiều con quay hồi chuyển với hệ trục tọa độ trong không gian, điều này dẫn đến căn phòng quét của bạn đôi khi sẽ bị lộn ngược hoặc nghiêng không đúng với thực tế mong muốn. Màu sắc RGB là cực kì quan trọng, vì vậy chúng ta cần phải xử lý thêm vài bước trước khi quay trở lại làm việc với phần mềm này.

![](pic/ReCap_2vJZ0ym4Rn.gif)

Việc bây giờ bạn cần làm là thêm một phần mềm trung gian mã nguồn mở nữa để xử lý, qua phần mềm này cũng giúp bạn cân chỉnh lại tọa độ mặt phẳng bị sai lệch và màu sắc, sau đó dọn dẹp và xuất ra định dạng để Recap xử lý lại một lần nữa. [Point Cloud Compare](https://www.danielgm.net/cc/) chính là phần mềm tốt để làm điều này.

1. Chuyển đổi các vùng xem của 6 mặt phẳng làm việc.
2. Chọn lại tọa độ điểm mới cho Point Cloud.
3. Thay đổi lại tọa độ và dịch chuyển góc quay tọa độ mới cho phù hợp.

![](pic/CloudCompare_hF4Kklvwce.png)

Ngoài ra, sau khi xử lý tọa độ xong, hãy cân nhắc xử lý Noise (nhiễu) điểm dữ liệu. Điều này giúp bạn loại bỏ các điểm dữ liệu không cần thiết, giúp dữ liệu quét trở nên sạch sẽ hơn.

![](pic/CloudCompare_vv7NTKWq0H.png)

Sau khi xử lý với Point Cloud Compare, màu sắc RGB đã được trở lại. Đồng thời trục xoay ở vị trí góc nhìn từ trên xuống cũng đã cân chỉnh lại đúng hướng. Bây giờ bạn có thể tiếp tục làm việc với Recap Pro, định dạng được lưu ở định dạng `e57` như xuất khẩu từ di động.
Lưu ý rằng, định dạng `.rcs` và `.rcp` là hai định dạng được ưu tiên chèn trong `Revit` nên bạn phải cố gắng xuất ra định dạng này. `Recap Pro` cho phép bạn xóa bỏ đi các vùng điểm dư không cần thiết cho nên nếu bạn cảm thấy các điểm trừ ở quá xa hoặc chúng không nằm trong phạm vi cần mô hình hóa, bạn nên xóa bỏ chúng để có chất lượng và kích thước Point Cloud tốt nhất.

![](pic/ReCap_ifkQDvBNWI.gif)

So sánh màu sắc trước và sau khi cân chỉnh trở lại RGB. Với bước này thì việc cuối cùng của bạn chỉ là xuất tệp ra Rcp để gom tệp với rcs là troa đổi trung gian như một support. Dễ nhìn thấy, tệp bên trái màu sắc trông giống như những gì chúng ta đang mong đợi với màu sắc RGB, trong khi tệp bên phải màu sắc trông không đúng với màu sắc RGB từ di động đã xuất khẩu.

![](pic/ReCap_sqBAqJaPEP.png)

Với Revit, bạn có thể dễ dàng dưa tệp Point Cloud vào để xem trước và tiến hành mô hình hóa lại cho căn phòng của mình đã thuê, đó cũng là điểm cuối đầu ra mà chúng ta đang mong muốn.

![](pic/Revit_cUJ3auQfgZ.png)

So sánh trước khi chỉ sử dụng Recap và sau khi sử dụng Point Cloud Compare kết hợp với dọn dẹp đống tro tàn để đưa vào Revit.

![](pic/ameWjfCfLC.png)

Cuối cùng là bạn có thể xem xét chúng trên Speckle.

<iframe src="https://speckle.xyz/embed?stream=ce16dcdd66&commit=dc9af7c2b8" width="780" height="450" frameborder="0"></iframe>

Việc xem xét này mình thấy Speckle đang đưa chưa hết dữ liệu Point Cloud lên đã đặt một vài câu hỏi nghi vấn trên diễn đàn, bạn có thể xem xét cập nhật tài bài viết [này](https://speckle.community/t/speckle-dont-send-all-dada-point-cloud-from-lidar-mobile/4034/5). Cũng may là <a href="https://speckle.community/u/gokermu/summary" target="_blank">gokermu</a> cũng đã giúp mình xét vấn đề và hy vọng sẽ được sửa trong tương lai. Đây cũng là một phần mới với Speckle nên việc thiếu sót là điều đương nhiên. Kết quả là phát hiện ra điểm sai sót khi mô hình xoay đi một góc 90 với góc 180 sẽ cho ra các kết quả khác nhau.

![](pic/firefox_W82AzhXLz7.png)

Và công đoạn tiếp theo là mô hình hóa chúng rồi đưa lên lại speckle, việc mô hình hóa này đòi hỏi bạn am hiểu về Revit và sử dụng chuyên môn trong lĩnh vực kiến trúc để dựng lại mô hình này. Mình cũng không có thời gian trau chuốt nhiều nên việc đắp thông tin lên cho đủ dùng là được.Bạn có thể dễ dàng xem các đối tượng ở dạng điểm ảnh, việc đặt một chiết ghế vào đúng vị trí là khá dễ dàng.

1. Ghế
2. Laptop và màn hình

![](pic/Revit_VxNM4EOWXz.png)

Và đây là kết quả sau khi mà mình đã dọn dẹp và mô hình hóa lại.

<iframe src="https://speckle.xyz/embed?stream=ce16dcdd66&commit=cfe1539a5c&overlay=dc9af7c2b8&c=%5B5.14355%2C6.92276%2C6.0896%2C7.79152%2C2.0474%2C1.71114%2C0%2C1%5D" width="780" height="450" frameborder="0"></iframe>

Và cuối cùng nữa là ở lần Stream Commit tiếp theo, bạn có thể ẩn Point Cloud và chỉ giữ lại mô hình hóa để để quay lại Speckle. Mình cũng sử dụng thêm Filters lại một chút cho dễ quan sát thành quả. Để xem toàn bộ Stream này, bạn có thể xem toàn bộ trên nhánh main tại [đây](https://speckle.xyz/streams/ce16dcdd66/branches/main).

<iframe src="https://speckle.xyz/embed?stream=ce16dcdd66&commit=f3898b8a82&c=%5B3.03771%2C7.24403%2C5.1433%2C7.54%2C2.12362%2C1.59114%2C0%2C1%5D&filter=%7B%22hiddenIds%22%3A%5B%223c371c5d9bbf8b90aaac7808c2daa28c%22%2C%2200a3484a4b137fb3b262284f436f33e6%22%2C%2277c1f66fb18f3c04c907006b8d3d1295%22%2C%22f07346a1a8165bb6319545d1a0c32a52%22%2C%2224d2381a761e3696cebb6dced8aa8491%22%2C%22654d9358dc9684a66c1c34344a04f8c6%22%2C%228285d29e8fb448915d066daaf5e32e5d%22%2C%2288aec62486ea424f04df4bcbadabd656%22%2C%22b77e15e29da4a0557901a36b758f67cc%22%2C%225bfcd27be0e066fe4e4fcc103a54fe04%22%2C%22b221271decb63022400a1ccd4f443b50%22%2C%22339eedbae4bef02166e2c2a868a56af7%22%2C%220644cb15f14e7cbb88eaf3fe2bbc38c0%22%2C%220740deef8c1ef4ed6619b7664f578a0f%22%2C%22091e39b706c52be93193d769b6e7378a%22%2C%2215dd338d50dafe4e4c3064f6418b5b95%22%2C%221cbb954b20634f0a91a182030e4e40b9%22%2C%221d3d86320f8ec4780651afcf9aa097c0%22%2C%2231760459b9dd7f8875f9807e8f89234a%22%2C%223620ed4b6536c8d96e6748192920f3b1%22%2C%223e5d700cb8e6fdbde6ffd4edb7fa8cc6%22%2C%2242dc7d784ccd3ed9171a96d1c46ceedc%22%2C%224a6cac3a5310a5ac865a06a7c7a28952%22%2C%2260198d28c5e01c188198139b9bda77c5%22%2C%22614ad2ad8c3aa77de24c8677dd589713%22%2C%22641d4c16813421ed297781ce047c4ed7%22%2C%226d34cc12a63c5d6683c731b8e575c0e4%22%2C%2272a48bb4ffcf8e995bc9e5a8bef90954%22%2C%227b7e4f04b3800ec18c9fb62a7c346421%22%2C%2283217ab437d28391bfdb71ac46032fd9%22%2C%2286f0a341ccbe150106fb01c5da0cbc37%22%2C%228a8e74a97f79fc449e0e70a3feffef51%22%2C%229b7cf57d13653be339c0ff7d5b57168c%22%2C%229ecaad4f0a8bb434f3f005f4ddea4ed8%22%2C%22a16f425cf3cef4344766c2d99f000ac9%22%2C%22b6db1085b27eb96100bc3e6b64ca8699%22%2C%22bbf6c8dc7d87b7be3f8775ec061cc3a9%22%2C%22c63e520f632b4e99ec3a5571bedee40f%22%2C%22c8c097cc1beeaa04e4c928c8f5d0827a%22%2C%22d3c67a1b66a918ce735e49084dbaa85c%22%2C%22dfc72437a7c21807acfe43a6b684aeb1%22%2C%22e5e8646aa1a3755c62c6e3983a95eef6%22%2C%22ed433e84c1ca061ea7c94622d36f263b%22%2C%22f003948e5ca5c6c9cb429c4a36acb61d%22%2C%22f209c5d31c95d3f7b05758b23360f20a%22%2C%22f2906de8fcf71e1df375eeb348bec2f6%22%2C%22f2e6717ce3fdb1bf60f638030c28d14d%22%5D%7D" width="780" height="450" frameborder="0"></iframe>


Tổng kết lại để dễ dàng hình dung hơn, bạn đã tạo ra 3 commit lên Speckle, mỗi commit là một bước tiến nhảy vọt, giờ đây bạn đã sẵn sàng cho bước tiếp theo khai phá dữ liệu mô hình của mình.

![](pic/firefox_IhoZ2rwOYp.png)

Để lấy dữ liệu từ Speckle, bạn có thể sử dụng xác thực bởi token ngay lúc này, ở bên dưới mình sẽ ví dụ nhanh để giúp bạn xác thực qua token và đếm số lượng tường có trong commit cuối cùng:

```py
from specklepy.transports.memory import MemoryTransport
from specklepy.api import operations
from specklepy.transports.server import ServerTransport
from specklepy.objects import Base
from specklepy.api.wrapper import StreamWrapper
import pandas as pd
stream_id = "ce16dcdd66"
commitid = "f3898b8a82"
branchName = "main"
token = "bfb80523abfe4d6f48fe845fb53cdc9b1c1c402ccf"
url = f"https://speckle.xyz/streams/{stream_id}/commits/{commitid}"
print("Url:",url)
wrapper = StreamWrapper(url)
client = client = SpeckleClient(host="speckle.xyz")
client.authenticate_with_token(token)
print("Auth State: ",client)
transport = ServerTransport(client=client, stream_id=stream_id)
commit = client.commit.get(stream_id, commitid)
res = operations.receive(commit.referencedObject, transport)
print("Total Walls:",len(res["@Walls"]))
```
Kết quả: 
```bash
Url: https://speckle.xyz/streams/ce16dcdd66/commits/f3898b8a82
Auth State:  SpeckleClient( server: https://speckle.xyz, authenticated: True )
Total Walls: 6
```

Để rõ hơn về phân tích và sử dụng dữ liệu phòng, tốt nhất bạn nên theo đuổi bài viết <a href="https://chuongmep.com/Use-Speckle-Visualization-Room-Data" target="_blank">Use Speckle To Visualization Room Data</a>. Đó là một bài viết liền mạnh gắn liền với bài viết này sau khi bạn đã có dữ liệu của một căn phòng thực tế thay vì những phòng đươc đưa lên từ mô hình Revit đơn giản.

## Mở rộng

Gần đây, tác giả <a href="https://github.com/dominikganghofer" target="_blank">Dominik Ganghofer </a> cũng đã xuất bản một ứng dụng ấn tượng, cho phép trực tiếp di chuyển **PointCloud** di động IOS sang **Speckle**, bạn có thể xem qua ứng dụng <a href="https://github.com/dominikganghofer/ar2speckle" target="_blank">ar2speckle</a> của anh ấy đang phát triển để tìm hiểu thêm.

![](pic/ioslidar.gif)

## Tổng kết

Như vậy là chỉ với chiếc Ipad hỗ trợ **LiDAR** nhỏ nhỏ mang bên mình, mình đã có thể làm vài điều hay ho rồi. Bạn cũng nên thử vài lần xem sao. Nếu bạn có bất kì cải tiến nào thì bạn có thể bình luận bên dưới bài viết này để trao đổi thêm.

Với việc chuyển đổi định dạng lên máy tính, việc mang PointCloud từ bất cứ phần mềm AEC như Revit, Rhino, ... lên Speckle dễ dàng như trở bàn tay, và bạn cũng có thể tạo ra một trình kết nối PointCloud độc lập không bị phụ thuộc vào bất kì phần mềm AEC nào với các thư viện mã nguồn mở sẵn có.

Việc đưa mô hình nhà mình lên **Speckle** từ việc mô hình hóa lại `Point Cloud` vẫn còn tiếp diễn ở các giai đoạn thú vị sau này. Hãy cùng chờ xem các phần tiếp theo.
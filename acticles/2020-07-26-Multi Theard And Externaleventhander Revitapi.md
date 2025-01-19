## Mở đầu

Đây là một bài viết khiến bạn đáng suy nghĩ về hiệu suất và tương tác với phần mềm, cụ thể là đa luồng, lập trình bất đồng bộ và sự kiện External Event Hander.Chúng ta sẽ cùng bắt đầu thảo luận với một câu hỏi ngắn đơn giản như sau : 

::: info Câu chuyện
Tôi phải sử dụng Revit cho công việc, có rất nhiều cửa sổ đang mở và lồng các menu, nhưng hiệu suất hiển thị của nó rất tệ. Có phải Autodesk chỉ hy vọng chờ máy xử lý trong khi bộ xử lý nhanh hơn?
:::
## Bình luận tác giả

Trả lời: 

Đây là một câu hỏi rất phổ biến vào thời điểm này, nhưng thực lòng tôi có một khoảng thời gian khó khăn trong việc xoay quanh giao diện của Revit xấu xí và cách nhìn của nó hoạt động chậm như thế nào(Các dự án với PointCloud). Giao diện không nhất thiết phải là điều quan trọng nhất về nền tảng BIM, nhưng nó có thể là một trong những điều có thể thay đổi. Mặt khác, tốc độ xem và tốc độ chung của phần mềm, tôi đoán là một vấn đề do liên quan đến các lỗi cơ bản trong phần mềm - mọi thứ đều được nhấp, tạm dừng, được chọn!

Trả lời:

Không phải tất cả mọi thứ có thể được chia thành nhiều nhiệm vụ độc lập. Nếu bạn chia một nhiệm vụ lớn thành một loạt các nhiệm vụ nhỏ hơn, nếu mỗi nhiệm vụ phải đợi một trong những nhiệm vụ khác hoàn thành trước khi bắt đầu thì không có lợi ích gì cho xử lý đa luồng. Trong thực tế, chi phí quản lý các tiến trình có thể làm cho nó mất nhiều thời gian hơn. Ví dụ, kết xuất có thể xử lý từng pixel một cách độc lập để công cụ kết xuất dựa trên CPU có thể sử dụng nhiều luồng như nó có thể làm.

Trả lời: 

Không phải tất cả mọi thứ là về phần cứng. Quản lý dữ liệu tốt làm cho các dự án nhanh hơn đáng kể, trong khi những dự án không có tổ chức tốt có thể khiến phần cứng bị xệ xuống trầm trọng ngay cả khi bạn có một con máy mạnh.

Trả lời :

Không phải mọi thứ đều có thể được chia thành nhiều nhiệm vụ độc lập, nhưng phần mềm có khả năng làm tốt hơn sẽ có lợi thế đáng kể so với phần mềm không thể làm điều này. Khi tôi bật Archicad, rõ ràng mọi thứ sẽ chạy nhanh hơn và mượt mà hơn, mặc dù các đối tượng được hiển thị tốt hơn. Nếu tôi xem thử có bao nhiêu lõi đang chạy với một khung nhìn cơ bản thì tôi thấy rằng hầu như tất cả các lõi của tôi (tôi có 8 lõi) dường như đang tham gia - trong khi chỉ có 1-2 lõi đang làm như vậy nếu tôi kiểm tra với khung nhìn Revit cơ bản. Như vậy, có thể sử dụng nhiều lõi cho các tác vụ cơ bản và điều hướng khung nhìn, Archicad và các phần mềm khác chứng minh điều đó. Vấn đề là ở Autodesk, không phải là những hạn chế của phần mềm nói chung. Tôi đang tự hỏi điều đó là gì? Điều gì về kiến trúc của nó hoặc cách thức hoạt động của nó ngăn nó đạt được những điều đó (Đối thủ cạnh tranh trực tiếp có thể làm). Tôi yêu cầu bởi vì tôi phải sử dụng phần mềm này và thật tuyệt nếu nó có thể xử lý các khung nhìn lớn - khả năng xử lý là có.

Trả lời:

Revit, giống như nhiều sản phẩm Autodesk – 3ds max có lẽ là kẻ tồi tệ nhất do nhu cầu vốn có của nó - nói chung là không thể tận dụng các bộ xử lý mới. Hầu hết trong số đó có một số lõi đã bỏ trống. Autodesk đã có hơn mười năm để giải quyết và thực hiện rất ít. Nếu Autodesk không có tiếp thị tốt như vậy và gần như độc quyền, nó sẽ không thể tạo ra các loại lỗi này mà không có hậu quả đáng kể. Họ cũng không thể đánh lạc hướng khỏi những vấn đề này tương đương với - đó là một điều khó thực hiện.Làm đa luồng rất phức tạp ,sẽ có một rủi ro tài chính rất lớn và thời gian chuyển đổi từ mã cũ sang một mô hình khác, vì vậy các công ty viết mã chỉ sử dụng những gì hoạt động và nâng cấp theo mã đó.

Trả lời:

Đây là công việc của tôi, chúng tôi chạy AMD R7 2700x với 32gbs và Vega 64 gpu. Tôi chỉ ước rằng ít nhất họ sẽ sử dụng GPU nhiều hơn khi ở chế độ 3D, trong các dự án BIM lớn như bệnh viện và tòa nhà đại học, máy tính của tôi chỉ bị chậm. CPU không được sử dụng quá 10% và thậm chí không cho tôi bắt đầu sử dụng GPU của mình (3-30%). Có vẻ như họ không thực sự quan tâm đến một số điều này nữa. Các chương trình khác mà tôi đã sử dụng không thể có đủ nhưng khi tôi chỉnh sửa, có vẻ như chương trình không quan tâm đến những gì tôi đang làm trong đó. Autodesk cần đánh giá lại quan điểm của họ về những gì mọi người đang sử dụng ngày nay. Không có nhiều người đang chạy xe điện 4 lõi với quadro 600. Họ cần phải có thời gian và những người dùng cao cấp hơn có thể sử dụng chương trình tốt hơn.

## Quan điểm cá nhân

1. Multi Theard

![](pic/110942783_10223053657276715_5563518296154454760_n.jpg)

Đầu tiên mình cùng xem lại cách giải quyết cũ với các bản Revit cũ một xíu.mình có thể hiểu đơn giản như thế này.Mình muốn máy tính chạy nhanh và xử lí nhiều tác vụ cùng một lúc.Lúc này mình sẽ nghĩ ngay đến đa luồng.Vậy thì ở đây sẽ nhiều bạn nghĩ ngay đến lập trình bất đồng bộ(Asynchronous programing) khá phổ biến trong giới lập trình.
Ví dụ đơn giản cho bạn dễ hình dung hơn: Nhà bạn đang làm bánh, bạn thuê một đám nhân viên làm ra bánh và đem bán giúp bạn.Như vậy mỗi nhân viên làm ra cái bánh chả ai đụng ai cả.Nhưng để hiệu suất và hiệu quả công việc bạn cần họ làm việc đồng thời với nhau.

![](pic/6293ad14-e0e0-4553-9b97-11bb2a394404.png)

Cùng xem một hình minh hoạ cũ kĩ cho các bản Revit

![](pic/_PH_df826693-6ca7-4f5a-9ef1-9490c5c17544.png)

Mình đã thử chạy đa luồng với hệ thống RevitAPI và phát sinh một số lỗi không thành công như sau:

![](pic/picturemessage_tyxcvrdz.xyj.png)

2.  Revit API External Event

Nếu bạn đã từng gặp qua cái lỗi ngoại lệ `"Cannot execute Revit API outside of Revit API context"` Khi làm việc với RevitAPI thì có lẽ bạn sẽ chằng còn xa lạ gì với sự kiện này.Thường thì khi gặp lỗi này, mình nên nghĩ ngay đến **IExternalEventHandler** nếu không chương trình của bạn sẽ dừng và hiện lỗi recovery táo bạo nếu bạn không xử lý bắt lỗi kĩ.
Và tất nhiên, với việc thực thi sự kiện bên trên đồng nghĩa với việc xếp hàng và đợi gọi lệnh.Tuy nhiên bạn sẽ không thể nào biết được khi nào thì lệnh đó của bạn kết thúc vì bạn muốn xem bạn phải đưa sự kiện trở lại đồng nghĩa việc bạn đã xử lí xong.Giống như việc bạn muốn dọn cơm cho gia đình bạn nhưng bạn phải đợi tất cả mọi người ăn xong vậy, mà cũng không biết là cụ thể khi nào thì anh trai, em gái, mẹ bạn sẽ ăn xong và tới lượt bạn đem đi dọn.

Đấy.Chính vì thế mà mình lại có thể tận dụng lập trình bất đồng bộ trong xử lý chỗ này.Thứ nhất nó tiết kiệm thời gian viết mã của bạn.Thứ hai bạn sẽ biết được anh trai của bạn sẽ la lên cho bạn biết là ăn xong sau khi hoàn thành.

![](pic/RevitExternalEvent.png)

Với cách lập trình đồng bộ thì công việc thứ nhất không thể bất đầu cho đến khi công việc thứ hai hoàn thành. Trong lập trình bất đồng bộ, phương thức được gọi sẽ được chạy trong tác vụ ngầm và việc gọi Thread là không bị block. Sau khi gọi phương thức thực thi, luồng trở lại gọi và thực thi những tác vụ khác. Thông thường chúng sử dụng với Thread hoặc Task.Như vậy việc áp dụng cho External Event xử lý xử kiện Raise sẽ giảm thiểu thời gian code hơn.Code cũng trông gọn gàng và có vẻ ít phức tạp với sự che đậy bên ngoài.

![](pic/Revit.Async.png)

3.  Kết quả 

Như bạn thấy hình bên dưới code của bạn vừa gọn vừa có thể xử lý được IExternal Event Handler nhưng lại là xử lý cho mỗi nhiệm vụ, và mỗi nhiệm vụ là xử lý lần lượt nhưng lại không được đồng thời cùng một lúc(ThenAll) với RevitAPI.

![](pic/110645800_10223053656676700_2795706206539346203_n.jpg)

Kết quả xem xét trên máy của tôi  AMD R7 2700x với 32gbs và Vega 64 gpu

![](pic/110156947_10223053657956732_8629022943755004727_n.jpg)

## Mô tả ngắn thú vị

Nếu bạn có hàng ngàn vấn đề bổ sung, 100 học sinh lớp năm sẽ nhanh hơn so với người có bằng Tiến Sĩ Toán học. Nhưng nếu bạn đang làm Xác suất hoặc Động lực học, đa luồng cho những học sinh lớp 5 đó sẽ không giúp ích gì cả.


## Một số lời khuyên cho bạn

- RAM nhanh cải thiện điểm số
- SSD tốt cải thiện điểm số
- GPU chơi game cao cấp dường như vượt trội hơn GPU máy trạm(Hãy xem xét giá thành và điều kiện kinh tế của bạn)
- Đơn giản hóa các mô hình của bạn và sử dụng các workset riêng biệt ,tắt các workets mà bạn không cần nhìn thấy trong bất kỳ chế độ xem cụ thể nào.
- Sử dụng các Family đơn giản hơn.
- Hạn chế làm việc với Group ít nhất có thể
- Chia nhỏ mô hình và sử dụng linked nếu cần thiết
- Tắt các phân tích cấu trúc nếu bạn không làm việc với nó.
- Nếu bạn sử dụng laptop, hãy cắm pin và sử dụng phần mềm khi cần thiết.

## Một số tài liệu để bạn xem thêm 

<a href="https://thebuildingcoder.typepad.com/blog/2012/11/drive-revit-through-a-wcf-service.html" target="_blank">thebuildingcoder</a>

<a href="https://adndevblog.typepad.com/aec/2012/06/multi-threading-with-revit.html" target="_blank">adndevblog</a> 

<a href="https://github.com/KennanChan/Revit.Async" target="_blank">Revit.Async</a>   
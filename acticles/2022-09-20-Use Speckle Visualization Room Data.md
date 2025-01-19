
## Giới thiệu

Như đã giới thiệu ở bài trước <a href="https://chuongmep.com/How-To-Start-With-SpeckleBIM" target="_blank">How To Start With Speckle</a> để các đọc giả có cái nhìn bao quát về sức mạnh của speckle mang lại, cũng như việc lên kết siêu dữ liệu và cách lưu trữ chia sẻ dữ liệu hiệu quả. Hôm nay chúng ta sẽ cùng đi sâu vào xem liệu Speckle lưu trữ dữ liệu và hoạt động như thế nào.

Dữ liệu chính là cốt lõi trong thông tin mô hình BIM, chính vì điều này chúng ta cần biết cách khai thác dữ liệu và sử dụng đúng mục đích thì mới đạt được hiệu quả nhất định.

Ở bài viết này, chúng ta sẽ cùng đi vào một bài toán cực kì đơn giản. Đó là lấy dữ liệu phòng và trực quan hóa dữ liệu với nguồn từ Phần mềm Revit. Sau đó chúng ta sẽ khai phá tùy chỉnh cách kết nối với các hệ sinh thái khác, trực quan hóa và tùy chỉnh độc lập. Bắt đầu thôi.

## Cài đặt

Đầu tiên để làm được điều này, Bạn cần cài đặt một trình kết nối cho phép kết nối giữa Revit và **Speckle** nhằm mục đích luân chuyển thông tin dữ liệu. Việc cài đặt cũng rất đơn giản. Hãy nhớ là ở thời điểm này, bạn cũng đã tạo xong tài khoản Speckle rồi nhé. Việc tạo tài khoản rất dễ dàng nên sẽ không có trong quy trình hướng dẫn bên dưới.

![](pic/firefox_v6U2KOjrDo.png)

_Lưu ý :_ Đây chỉ là một phần nhỏ của trình kết nối, việc kết nối hỗ trợ rất nhiều vào các phần mềm khác, nhưng Revit được sử dụng cho ví dụ này do tính phổ biến của chúng.

Nếu bạn là một người lười như mình thì tốt nhất nên sử dụng trình Manager của speckle để quản lý và kiểm soát. Hãy đi đến <a href="https://releases.speckle.systems/" target="_blank">releases.speckle.systems</a> để    

lấy liên kết tải về, vì máy mình là máy windows nên sẽ sử dụng liên kết windows.

![](pic/_Image_eaa2aaaa-74fd-4d2e-8ef6-30c50c13af51.png)

Sau khi đã tải về xong hết, việc bạn cần làm là tìm trình kết nối Revit và cài đặt. Hình ảnh hiển thị như bên dưới tức là bạn đã thành công.

![](pic/Manager_GwwYdCacau.png)

## Kết nối với Speckle

Bây giờ, công việc của bạn tiếp theo là mở chương trình revit 20 năm tuổi lên, thực hiện tạo thống kê phòng xem thử như thế nào.Kết quả của bảng trông có vẻ ổn.Nhưng công việc tiếp theo mình sẽ không sử dụng Schedule để tạo bảng tính nữa mà sẽ sử dụng Speckle để lưu trữ và tạo lại bảng này.

![](pic/Revit_cfli6YGijq.png)

Hãy mở trình kết nối Speckle lên, tạo cho mình một Stream đến  Speckle. Stream ở đây có thể hiểu đơn giản là một luồng lưu trữ dữ liệu.

![](pic/Revit_pe3KgnQAon.png)

Đặt tên và mô tả, mình sẽ chọn public luôn để sử dụng như một tài liệu công khai tham khảo cho tất cả mọi người trên thé giới có thể truy cập và sử dụng dữ liệu chia sẻ.

![](pic/Revit_W0OpI8jbcc.png)

Do mình muốn làm thống kê Room nên sẽ chọn theo Categories là Rooms và sử dụng nút chọn bên dưới để tiến hành đưa dữ liệu từ Revit lên Stream Speckle.

![](pic/Revit_QkJkYer4N1.png)

Một thông báo xanh thành công xuất hiện, việc của bạn bây giờ là mở lên để xem như thế nào.

![](pic/_Image_3b3c928e-1223-4eba-8384-7426ff25e74f.png)

Tada, bây giờ bạn sẽ thấy một cái gì đó trông như bên dưới trên trình duyệt web, giờ đây bạn có thể xem toàn bộ thông tin của phòng thông qua 3D trên trình duyệt, sử dụng thanh bên để xem thuộc tính của đối tượng. Đó là kết quả của quá đình chạy một luồng Stream với thông tin dữ liệu của 14 phòng kiến trúc.

<iframe src="https://speckle.xyz/embed?stream=0cc1692ab7&commit=7617918499" width="780" height="450" frameborder="0"></iframe>

## Sử dụng thông tin dữ liệu.

Như đã đề cập ở đầu bài viết, việc bạn đưa một mô hình 3D để nhìn không có ý nghĩa nhiều bằng việc sử dụng hiệu quả và khai thác dữ liệu có trong mô hình. Phần này sẽ giúp bạn làm thế nào để bắt đầu sử dụng dữ liệu phòng vào xem xét và trực quan hóa dữ liệu.Toàn bộ mẫu bên dưới được sử dụng bên trong Jupyter Note Book. Dự án Jupyter là một dự án với mục tiêu phát triển phần mềm mã nguồn mở, các tiêu chuẩn mở và các dịch vụ cho tính toán tương tác trên nhiều ngôn ngữ lập trình. Nó đã được tách ra khỏi IPython vào năm 2014 bởi Fernando Pérez và Brian Granger.

Sử dụng dòng lệnh `!pip install  specklepy` cho phép bạn cài đặt trình sdk của speckle để tương tác với dữ liệu và tùy chỉnh mọi thứ (không hẳn).Nếu hiện ra thông báo bên dưới chính là kết quả của việc cài lần 2, nếu lần đầu tiên sẽ hiện thông báo là gói đã được cài thành công. Rất nhiều bạn đến giờ vẫn chưa hiểu pip là gì, đó là tác hại của viết tắt, đó là `Package Install Python`.

![](pic/_Image_1463ce99-32be-4de6-8e0d-67d2be754189.png)


Chúng ta sẽ sử dụng StreamWrapper như một cách để lấy về xác thực client, đó là cách nhanh nhất để xác thực vì hiện tại mình đang sử dụng trên máy local. Streamid và Commitid được sinh ra ở mỗi lần tạo streams và mỗi lần commits trên streams đó.

```py
from specklepy.api.wrapper import StreamWrapper
streamid = "0cc1692ab7"
commitid = "7617918499"
# provide any stream, branch, commit, object, or globals url
wrapper = StreamWrapper("https://speckle.xyz/streams/0cc1692ab7/commits/7617918499")

# get an authenticated SpeckleClient if you have a local account for the server
client = wrapper.get_client()

# get an authenticated ServerTransport if you have a local account for the server
transport = wrapper.get_transport()
```

Nếu kết quả trả về True tức là đã xác thực thành công.

![](pic/Code_N0R4HeBRG5.png)

Hãy thử xem qua danh sách xác streams đã đưa lên Speckle. Ở đây xuất hiện tên của một streams gần nhất là RoomSchedule, đó là tên streams mình đã đặt tên ở hướng dẫn trên.Bảng bên dưới sử dụng thư viện **Pandas** để xem trên DataFrame cho trực quan là chính.

![](pic/Code_GK5Hlaz5EX.png)

Ghi chú : Ngoài việc tìm tất cả, bạn cũng có thể sử dụng `results = client.stream.search("room")` để tìm theo tên của những stream đã đưa lên Speckle.

Bạn cũng có thể sử dụng bộ thư viện Speckle SDK để tạo ra một Stream mới 

``` py
import pandas as pd
# create a stream
new_stream_id = client.stream.create(name="Minion")
# get a stream
new_stream = client.stream.get(id=new_stream_id)
pd.DataFrame(new_stream)
```

![](pic/Code_zzvLE98tpj.png)

Bạn nên quay lại trang chủ của speckle để xem stream của bạn đã thực sự được tạo hay chưa, và may là cũng đã được tạo ra bằng SDK rồi.

![](pic/firefox_gr6cNzvEfX.png)

Một điều khác thường tiếp theo là bạn hoàn toàn định nghĩa được đối tượng do bạn định nghĩa. Bên dưới chính là định nghĩa một đối tượng block, Base chính là lớp trong speckle định nghĩa như một đối tượng cơ sở nhất quán. Bên dưới chúng ta đang tạo ra một block tự định nghĩa và commit chúng lên một tream mới là minions vừa được tạo. operations.receive cho phép nhận về đối tượng vừa được gửi.
```py
from specklepy.transports.memory import MemoryTransport
from specklepy.api import operations
from specklepy.objects import Base
from specklepy.objects.geometry import Point
from specklepy.api import operationstransport
class Block(Base):
    length: float
    width: float
    height: float
    origin: Point = None

    def __init__(self, length=1.0, width=1.0, height=1.0, origin=Point(), **kwargs) -> None:
        super().__init__(**kwargs)
        # mark the origin as a detachable attribute
        self.add_detachable_attrs({"origin"})

        self.length = length
        self.width = width
        self.height = height
        self.origin = origin
# here's the data you want to send
block = Block(length=2, height=4)

# next create a server transport - this is the vehicle through which you will send and receive
transport = ServerTransport(client=client, stream_id=new_stream_id)

# this serialises the block and sends it to the from specklepy.transports.server import ServerTransport

hash = operations.send(base=block, transports=[transport])

# you can now create a commit on your stream with this object
commid_id = client.commit.create(
    stream_id=new_stream_id, 
    object_id=hash, 
    message="this is a block I made in speckle-py",
    )
#  this receives the object back from the transport.
# the received data will be deserialised back into a `Block` 
received_base = operations.receive(obj_id=hash, remote_transport=transport)
received_base
```

Hãy thử đọc một thông tin kết quả đối tượng vừa trả về vừa được định nghĩa của chính mình. Kết quả = 4 là hoàn toàn chính xác với height đã định nghĩa.

![](pic/Code_K4ZiLo2xHW.png)

Như vậy với các thông tin bên trên, việc nắm rõ đối tượng trong Speckle là hoàn toàn trong tầm tay, vậy với thông tin Room chúng ta đã tải lên thì sao ?

## Làm việc với Stream Speckle

Để làm việc với thông tin Stream Rooms đã tải lên, bây giờ việc của mình đơn giản là đọc danh sách base từ trên stream về. Việc này tương đối đơn giản. Res chính là result cũng chính là danh sách base object chứa toàn bộ thông tin đối tượng.

``` py
from specklepy.transports.server import ServerTransport
from specklepy.api import operations
# create an authenticated server transport from the client and receive the commit obj
stream_id = "0cc1692ab7"
transport = ServerTransport(client=client, stream_id=stream_id)
res = operations.receive(commit.referencedObject, transport)

```

Hãy đếm thử có bao nhiêu đối tượng room được đưa lên, tổng cộng là 14 chính xác với những gì chúng ta đã đưa lên từ Revit.

![](pic/Code_upl2HzQxqT.png)

Tò mò hơn một chút để làm sáng tỏ các base object, đó chính là lớp cở sở định nghĩa của Speckle mình đã giải thích ở phần trên.

![](pic/Code_LiNVNMv3kA.png)

Thử lấy thông tin Room Name ra xem thử, lưu ý bạn cần sử dụng thêm thư viện pandas để sử dụng Series

``` py
# get all room names
room_names = [0]*len(rooms) 
for i in range(len(rooms)):
    room_names[i] = rooms[i].name
pd.Series(room_names)
```

Kết quả chính xác cho từng phòng, bạn có thể tự dò lại.

![](pic/Code_pmDXtvgp3d.png)

Việc đã đến đây, vậy thì chúng ta cũng nên tạo lại bảng Room Schedule đã có như trong Revit rồi.
``` py
#ok try get table info rooms like area,volume,name,id,... 
totalrooms = []
for i in range(len(rooms)):
    roominfos = {}
    roominfos["Element Id"] = rooms[i].elementId
    roominfos["Area"] = rooms[i].area
    roominfos["Name"] = rooms[i].name
    roominfos["Number"] = rooms[i].number
    roominfos["Volume"] = rooms[i].parameters["ROOM_VOLUME"].value
    roominfos["Floor Finish"] = rooms[i].parameters["ROOM_FINISH_FLOOR"].value
    roominfos["Unbounded Height"] = rooms[i].parameters["ROOM_UPPER_OFFSET"].value
    roominfos["Level"] = rooms[i].parameters["LEVEL_NAME"].value
    totalrooms.append(roominfos)   
df =  pd.DataFrame(totalrooms).sort_values(by = "Area", ascending = False)
df
```
Trông kết quả cũng khá hoành tráng đấy chứ

![](pic/Code_dHcRTeDdSs.png)

Cuối cùng ta cũng nên trực quan hóa một xíu để xem tổng thể các phòng đã nhận trên stream. Nhớ sử dụng thêm thư viện **matplotlib** để trực quan hóa dữ liệu.

```py
import matplotlib.pyplot as plt
fig = plt.figure(figsize = (10, 5))
ax = fig.add_axes([0,0,1,1])
plt.bar(df.Name, df.Area, color ='r',
        width = 0.4)
plt.title("Visualization Data Rooms")
plt.xlabel("Room Name")
plt.ylabel("Area")
plt.show()
```
Trông ảnh hơi phèn nhưng mà cũng tạm chấp nhận được 

![](pic/Code_4G63ZQZx1c.png)

## Tương tác với Power BI

Nhìn chung đây chỉ mới là bản beta nên mình chỉ hiển thị kết quả xem trước, bài viết này khá dài nên sẽ dừng lại ở đây trước. Bạn có thể dễ dàng tham gia bản trải nghiệm beta tại <a href="https://github.com/specklesystems/speckle-powerbi#install" target="_blank">https://github.com/specklesystems/speckle-powerbi#install</a>  và mã nguồn mở được đặt tại <a href="https://github.com/specklesystems/speckle-powerbi" target="_blank">https://github.com/specklesystems/speckle-powerbi</a>   

Cơ sở dữ liệu quan hệ được lấy từ máy chủ Speckle thông qua Url Stream.

![](pic/PBIDesktop_g7sSUlt3pU.png)

Và cuối cùng bạn có thể trình bày một cách trực quan trên PowerBI rồi.

![](pic/PBIDesktop_WYSsBtFBlW.gif)

## Tổng kết.

Như vậy là mình đã hoàn tất việc biến một bản Schedule trong Revit chuyển hóa thành công sang chỗ mới để sử dụng dữ liệu, đồng thời thực hiện một vài xử lý nhỏ để phần nào giúp các đọc giả hiểu được tầm quan trọng của dữ liệu trong thời đại số và từng bước chinh phục dữ liệu dưới góc nhìn của một nhà cần cù lù xù bù như mình.

Toàn bộ dữ liệu demo đượ lưu trữ trực tuyến và ai cũng có thể chạy thử để nghiên cứu tại <a href="https://colab.research.google.com/drive/1TQGaGdtWR-e_IWGRG28-8YCK5ypcyay4?usp=sharing" target="_blank">colab.research.google.com</a>  

Hi vọng bạn thấy bài viết này hữu ích. Hôm nào có thời gian mình lại chia sẻ tiếp. Bài viết này cũng đã quá dài rồi.Bên dưới là một số liên kết bạn có thể tham khảo thêm.

<a href="https://speckle.guide/dev/py-sample.html" target="_blank">https://speckle.guide/dev/py-sample.html</a>   

<a href="https://speckle.guide/dev/py-examples.html#sending-receiving" target="_blank">https://speckle.guide/dev/py-examples.html#sending-receiving</a> 


## Cuộc sống 

Mình đang tò mò và cực kì ấn tượng về cách <a href="https://vi.wikipedia.org/wiki/%C4%90%E1%BA%A5u_c%E1%BB%A7ng" target="_blank">đấu củng</a>(tiếng Trung: 斗拱) thực sự phức tạp của người trung hoa, bên ngoài là một những đấu đối theo khớp ăn nối với nhau mà không dùng đinh, keo hay bất cứ thứ gì khác. Chắc mình sẽ hỏi lại một vài người bạn Trung Quốc đang làm việc trong công ty về văn hóa này xem sao, điều này lóe lên cho mình rất nhiều ý tưởng trong đầu.

![](pic/1470386474232.jpg)
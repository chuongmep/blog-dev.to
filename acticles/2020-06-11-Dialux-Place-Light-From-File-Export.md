## Mở đầu

Câu chuyện xuất phát từ ông anh lớn nhắn tin hỏi mình đặt mấy cái đèn từ dữ liệu tính toán bên DIALux qua, mình làm cũng lâu rồi nhưng hôm nay mới có dịp viết bài chi tiết để chia sẻ lại cho mọi người.

Câu chuyện thú vị này với tiêu chí giúp mình đặt được đám đèn chia theo từng phòng, đặt góc xoay, nhận toạ độ xử lí từ DIALux trong môi trường Dynamo đưa vào Revit.Bắt đầu thôi :D

## Tổng quan

![](pic/e0979f7c1b39e667bf28.jpg)


Xuất tệp để triển khai 

![](pic/Dialux-importfromfile_Room00.png)

Nhìn chung thì ruột tỏi ta sẽ có một tệp dữ liệu truy xuất từ phần mềm này với đuôi **.stf** trông có vẻ khá cool ngầu nhưng thực ra bên trong toàn là đống text.Mình đọc vào nhé.

![](pic/Dialux-importfromfile.png)


## Mở rộng tệp 

Thấy đám lằng nhằng quá mình lọc ra mớ tên room để phân tách đám dữ liệu với cấu trúc [NameRoom] này xem sao 

```py
import sys
import clr
clr.AddReference('ProtoGeometry')
from Autodesk.DesignScript.Geometry import *
arr = IN[0]

posArr = list(filter(lambda a: ("Room" in a), arr))

def splitFn(a):
  return a.split("=")[1]

def joinPoints(p):
  return ','.join(p)

def splitPoints(c):
  return c.split()
coords = list( map(splitFn, posArr) )
pointsArr = []
print(coords)
for s in coords:
  splittedArr = splitPoints(s)
  pointsArr.append(joinPoints(splittedArr))

OUT = ["["+x+"]" for x in pointsArr]
```   

![](pic/Dialux-importfromfile_Room.png)


Giờ để tiếp tục công việc cho mỗi phòng thì mình chia luôn danh sách ra đám con với tiêu chí cứ đến mỗi item trên **[NameRoom]** sẽ ngắt ra và đưa dồn vào một list con phục vụ để tiện cho viện lấy góc xoay và điểm cho sau này.Code một chút nhé.

```py
#Copyright(c) 2020, chuongho
# @chuongmep, https://chuongmep.com/
data = IN[0]
item = IN[1]
newlst = []
i=0
for n in item:
	i = i+1
	try:
		lst = data[data.index(n):data.index(item[i])]
		newlst.append(lst)
	except:
		lst = data[data.index(n):-1]
		newlst.append(lst)
OUT = newlst
```

![](pic/Dialux-importfromfile_Room2.png)

Công việc tiếp theo của mình là sẽ tái tạo lại các điểm lộn xộn trong đám list con này sang toạ độ điểm revit đã, với tiêu chí ban đầu là đơn vị mét từ phần mềm DIALux xuất qua tương tự như lọc cái room kia nhưng lần này hơi khác một xíu.

```py
import sys
import clr
clr.AddReference('ProtoGeometry')
from Autodesk.DesignScript.Geometry import *
dataEnteringNode = IN
arr = IN[0]
posArr = list(filter(lambda a: ("Pos" in a), arr))
def splitFn(a):
  return a.split("=")[1]
def joinPoints(p):
  return ','.join(p)
def splitPoints(c):
  return c.split()
coords = list( map(splitFn, posArr) )
pointsArr = []
print(coords)
for s in coords:
  splittedArr = splitPoints(s)
  pointsArr.append(joinPoints(splittedArr))
print(pointsArr)

OUT = pointsArr
```

Ok con gà rồi, tiếp đến làm việc yêu thích là tách điểm và chuyển về đơn vị milimet để hoạt động hiệu quả và tái tạo lại điểm cho Revit 

![](pic/Dialux-importfromfile_Room3.png)

Sau khi lọc tất nhiên là phải ngắm nhìn thành quả đã đến một xíu nhé :D 

![](pic/Dialux-importfromfile_Room4.png)

Với góc xoay thì ta vẫn làm tương tự với Scripts kia nhé.

![](pic/Dialux-importfromfile_Room5.png)

Khác một chỗ là lấy về góc của Z thôi, đừng lấy nhiều quá xoay tứ lung tung thì phiền lắm.

![](pic/Dialux-importfromfile_Room6.png)

Tới đây vẫn chưa thấm vào đâu, tiếp tục lọc thêm cái đám đèn trích xuất ra thử với  loại cơ bản để kiểm thử xem sao nhé.

![](pic/Dialux-importfromfile_Room7.png)

Cơm cò đã đủ, giờ ta bóp cò và đặt family tương thích vào mỗi phòng tương ứng với mỗi điểm được tạo ra

![](pic/Dialux-importfromfile_Room8.png)


Nhiệm vụ cuối cùng của mình còn nốt là xoay cái đám đèn này lại với góc xoay yêu cầu nữa rồi nhâm ly cafe đang còn giang dở nằm trên bàn.

![](pic/Dialux-importfromfile_Room9.png)

## Kết quả

Mớ đèn đã được đưa vào mỗi phòng ứng với mỗi loại đèn, thế là hoàn tất quy trình rồi nè.Quá nhanh quá nguy hiểm phải không :D
![](pic/Dialux-importfromfile_Room10.png)

Download : <a href="http://www.mediafire.com/folder/xlyhligg4qvuc/DiaLux_Revit_Place_Family" target="_blank">Here</a>    

## Tham khảo
 



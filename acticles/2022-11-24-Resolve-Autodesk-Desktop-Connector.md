
## Tổng quan

Mình cũng không biết chuyện gì đã diễn ra ở phía sau nữa, nhưng chắc chắn đây là một sự cố đã đến với mình trong hơn gần một năm và Autodesk vẫn chưa khắc phục nó khi nhận bản cập nhật của [Autodesk Desktop Connector](https://www.autodesk.com/bim-360/desktop-connector/). Điều này đã khiến mình cảm thấy khó chịu và mình sẽ chỉ bạn cách nhanh nhất để không phải bị làm phiền bởi những vấn đề nhỏ nhặt này. 

Khi bạn nhận được một bản cập nhật mới, bạn có một thanh nhỏ bên dưới thanh Ribbon bên phải như sau:

![](pic/firefox_jN1fDXeZTb.png)

Và khi bạn tải về cập nhật thì nó sẽ xuất hiện một cửa sổ như sau:

![](pic/Autodesk_Access_UI_Host_GDvIsKSoHq.png)

Desktop Connector là một dịch vụ máy tính để bàn tích hợp nguồn quản lý dữ liệu Autodesk (hoặc nguồn dữ liệu) với cấu trúc tệp và thư mục máy tính để bàn của bạn để quản lý tệp dễ dàng. Để biết thêm thông tin về Desktop Connector, hãy xem [tại đây](https://knowledge.autodesk.com/support/desktop-connector?sort=score).

## Cách khắc phục

Đây là một vấn đề liên quan đến tiến trình đang mở trên máy, cụ thể là tiến trình của `Autodesk Desktop Connector`. Nhưng thật không may là khi bạn tắt tiến trình này bằng **Task Manager** vẫn chưa thể cài đặt cập nhật. Một số máy tắt bên dưới thanh tác vụ và tắt thông qua các biểu tượng icon dưới màn hình được, nhưng một số lại bị treo không rõ nguyên nhân. Khi quay lại **Task Manager** và tiếp tục nhìn thấy không có thanh tìm kiếm, đúng là bực bội hết sức.

Và với những lý do đó, để mọi thứ dễ dàng hơn là xem tất cả các tiến trình nhanh trên máy và việc tiếp thep của bạn là chỉ cần mở thanh `powershell` lên và gõ lệnh sau, các tiến trình đang chay trong máy sẽ lần lượt được hiển thị:

```powershell
Get-Process
```
`Mẹo` : Bạn có thế sử dụng tổ hợp phím `Win + X` để mở nhanh thanh tùy chọn có chứa `powershell` lên.

Toàn bộ  tiến trình sẽ hiển thị đển bạn xem xét, điều này giúp bạn xem rõ ràng mà không bị trượt lên trượt xuống như **Task Manager**.

![](pic/powershell_KH8vT4gTOh.png)

Để lấy chính xác về `Desktop Connector`, bạn có thể gõ lệnh sau:

```powershell
Get-Process | Where-Object {$_.ProcessName -like "*DesktopConnector*"}
```

![](pic/powershell_rIAV3cBf3b.png)

Nhưng một điều khá buồn cười là khi bạn tắt DesktopConnector cũng chưa thể giải quyết được vấn đề, bạn cần phải tắt luôn cả **AutodeskDesktopApp** đang chạy song song nếu có.
Và thứ cuối cùng là bạn hãy dùng lệnh này để tắt hai tiến trình bị ảnh hưởng là `AutodeskDesktopApp` và `AutodeskDesktopConnector` với một dòng duy nhất:

```powershell
Get-Process | Where-Object {$_.ProcessName -like "*AutodeskDesktopApp*" -or $_.ProcessName -like "*DesktopConnector*"} | Stop-Process -Force
```

Và bây giờ bạn đã thoải mái với trình cập nhật rồi, thật là khó khăn khi viết ra bài này.

![](pic/Autodesk_Access_UI_Host_dFUfZqob6U.png)

Nếu bạn là một người thích dùng lệnh `bat` không thích dùng `powershell` thì bạn có thể sử dụng tệp sau để chạy 

```bat
REM Program: kill.bat
REM Purpose: Kill process boring autodesk
REM Author:  Chuong.Ho
REM Date:    2022-11-24
REM Version: 1.0
REM
REM get all process 
tasklist /fo csv > process.csv 
REM show process.csv
type process.csv
REM get process name AutodeskDesktopApp.exe and DesktopConnector.Applications.Tray.exe
findstr "AutodeskDesktopApp.exe" process.csv > process1.csv
findstr "DesktopConnector.Applications.Tray.exe" process.csv >> process2.csv
REM show process_name.csv
type process1.csv
type process2.csv
REM KILL process
taskkill /f /im "AutodeskDesktopApp.exe"
taskkill /f /im "DesktopConnector.Applications.Tray.exe"
del process1.csv
del process2.csv
```

Kết quả cũng sẽ giết chết hai dịch vụ này để bạn nhanh chóng cài đặt cập nhật.

![](pic/Code_OUWwN0KjTJ.png)

## Tổng kết 

Hi vọng qua bài viết này thì Autodesk sẽ cập nhật một xíu để không bị lỗi này nữa. Nó thực sự gây khó chịu cho người dùng. Và mình cũng là một người quý trọng thời gian nên cứ thấy gì đó không ổn thì lại tự động hóa nó. Hy vọng nó giúp ích cho bạn.

## Đặt vấn đề

Tuần vừa rồi có một người bạn nhắn với mình trên <a href="https://www.linkedin.com/" target="_blank">Linkedin</a> nhờ tư vấn rằng : Hiện anh ta đang gặp một vấn đề rất nghiêm trọng trong việc từ một kỹ sư kết cấu (Structural Engineer) tự học lập trình và bắt đầu con đường trở thành một kỹ sư làm công việc tự động hóa và nghiên cứu, và giờ anh ta đang rất hoang mang vì anh ta đã học quá nhiều thứ nhưng cũng không thể nào tiếp thu hết và làm ra một sản phẩm được. Liệu anh ta có nên tiếp tục hay dừng lại với sự nghiệp làm kỹ sư của mình, hay học tiếp rồi chuyển đổi sang một ngành nghề mới.

Với câu hỏi này, mình đã nhận được không biết là bao nhiêu người hỏi như vậy, và một điều hơn nữa là chúng là câu hỏi được rất nhiều các kỹ sư trên khắp các quốc gia khác cũng đặt câu hỏi tương tự như vậy cho mình. Đó cũng chính là lý do thúc đẩy mình viết một bài chi tiết để trình bày và giải thích những vấn đề sâu xa bên trong đó. Với bản thân cũng là một người đã từng trải qua những đau khổ đó, hy vọng qua những thông tin dưới đây sẽ giúp những ai đang gặp phải tình trạng tương tự tìm ra lối thoát cho mình.

## Tại Sao ?

Vì sao lại có rất nhiều người trong ngành AEC(Architecture, Engineering & Construction) lại đặt ra câu hỏi này? Có phải họ đã hết yêu công việc của họ phải không? Xác nhận vấn đề là không. Đó chính là sự mong muốn giải thoát những quá trình lặp đi lặp lại nhàm chán, đó là những mong muốn cải thiện một hiệu suất và hiệu quả công việc tốt hơn, đó là sự đi lên tiến bộ thay thế việc sử dụng sức lao động của máy móc thay thế cho con người.

Chúng ta đang đứng trên thời điểm mà chuyển đổi số đang tăng tốc nhanh hơn bao giờ hết, và các phần mềm thiết kế đang trở nên già nua với bề dày lịch sử đáng nể của nó như Revit, Autocad, Rhino,... Phần mềm sẽ luôn khó có thể thay đổi và bắt kịp theo xu hướng, sự đổi mới mỗi ngày. Bạn có thể nhìn nhận thực tế rằng vừa đây <a href="https://techcrunch.com/2022/09/15/adobe-is-buying-figma-for-20b-taking-out-one-of-its-biggest-rivals-in-digital-design/" target="_blank">Adobe đã dám bỏ ra mua lại Figma với giá 20 triệu đô</a>, bạn có thể tưởng tượng được sức mạnh của đồng tiền và công nghệ. Chính vì lý do đó, những công việc bắt đầu trở nên lặp lại. Phần mềm trở nên chậm chạp, nhiều vấn đề mà những người lâu năm hoặc những người trẻ tuổi mới bắt đầu nhận thấy điều này khi họ càng ngày lấn sâu vào lĩnh vực chuyên môn của họ.

Chính vì sự mâu thuẫn đó, trong mỗi công ty ở mỗi quốc gia, nhân tài luôn xuất hiện và giải quyết chúng theo một số cách khác thường mà chúng ta hay gọi đó là đột phá. Đó là việc áp dụng công nghệ, sử dụng kỹ thuật lập trình, sử dụng các mưu mẹo, các kinh nghiệm để giải quyết các vấn đề đó. Những người tiên phong đang âm thầm làm công việc đó chính là những người đã đặt cho mình những câu hỏi bên trên.


## Những sai lầm không đáng có.

Mình đã phải ngồi nhớ lại toàn bộ câu chuyện này, ghi lại hồi ký trong quá khứ về những sai lầm đã diễn ra đằng sau bức tường vô hình đó. Vậy thực sự thì những người đang bước chân vào một lĩnh vực mới đang gặp những sai lầm gì? Cụ thể mình sẽ liệt kê một vài nguyên nhân để trả lời cho câu hỏi này.

#### Về phía bạn

1. Sợ cú pháp lập trình giống như sợ học môn ngôn ngữ mới.

Nỗi sợ này không đến từ một người mà chúng đến từ nhiều người. Phần lớn các kỹ sư phần mềm họ không sợ cú pháp, điều họ sợ nhất là cấu trúc dữ liệu và mối quan hệ của họ. Chính vì nỗi sợ đó, những người mới tham gia vào học một ngôn ngữ lập trình cố gắng nhớ toàn bộ cú pháp và bắt đầu nhức đầu chóng mặt với vòng quay lẩn quẩn đó.

![](pic/plane.png)

Thực tế nên làm : Đừng nghĩ đến cú pháp quá nhiều, nghĩ đến vấn đề và tìm cách giải quyết chúng, tìm ra trình tự thủ công trước. Lúc nào không nhớ thì tìm kiếm lại chúng trên google, chia nhỏ vấn đề giải quyết rồi làm, cú pháp chỉ là chuyện nhỏ, logic mới là chuyện lớn.

Hãy thử xem một ví dụ vẽ tam giác đều nửa trái dưới đây với số * là 5 với ngôn ngữ **Python** đơn giản :

Kết quả chúng ta muốn : 
``` py
*         
* *       
* * *     
* * * *   
* * * * *
``` 
- Đầu tiên với cách làm (1) của một người mới học suy nghĩ bình thường sẽ là : 

```py
print("*")
print("* *")
print("* * *")
print("* * * *")
print("* * * * *")      
```

Và sau đó bạn tra google thì tìm được cách giải (1) trên internet đại loại như thế này : 

```py
n = int(input("Nhap vao n tam giac: "))
for i in range(n):
  for j in range(n):
    if i>=j:
      print(end="* ")
    else:
      print(end = "  ")
  print()
```
![](pic/firefox_4zNf3oI09U.png)

Rõ ràng với cách làm (2) hiệu quả hơn nhiều khi bạn muốn thay đổi bao nhiêu số * để tạo ra tam giác cân nửa trái tùy ý cũng được nhưng cấp độ là khó hơn. Vấn đề là rất nhiều người đã học được vòng lặp for, if, else nhưng rất ít người có thể viết được những cú pháp đó. Đó chính là vấn đề logic đối với họ. Thật ra ý nghĩa logic đằng sau rất đơn giản bạn có thể hiểu như thế này : 

Trông có vẻ thì tam giác nửa trái chính là thu nhỏ của hình chữ nhật, mà hình chữ nhật thì được tạo ra thông qua hai vòng lặp để duyệt mảng 2 chiều. Với người mới chưa biết thì excel chính là mảng hai chiều, hai  chiều ở đây chính là dòng và cột. Bây giờ mình thử bỏ vào excel để giải thích nhé.Bây giờ mình sẽ đi đánh số cho dòng và cột trước. Trong lập trình thì số 0 là số bắt đầu nên mình đánh từ số 0 do dòng và cột. Ở đây mình sẽ ví dụ là nhập vào * tam giác với số * của tam giác đều là 4

![](pic/EXCEL_ehAYK43F9a.png)

Và bây giờ mình gắn thêm `i` chính là định nghĩa để gọi cho dòng và `j` được gán để gọi cho cột. Làm như vậy để rõ ràng cho dòng và cột vì dòng và cột đều được đánh số. Trong mỗi ô kế bên mình đánh gióng theo số dòng và cột ví dụ dòng 0 cột 0 thì là **00**, dòng 0 cột 1 thì là **01**. Cứ như vậy có như hình bên dưới.

![](pic/EXCEL_tCds6bCJg2.png)

Và bây giờ mình sẽ tô màu thứ mình muốn tạo ra, bạn có nhận ra được điều gì để phân biệt giữa phía màu đỏ và phía màu vàng không ? Làm như thế nào để phân chia chúng ra. Rõ ràng ta thấy số dòng `i` ở vị trí cột thứ `j` miễn là `i` >= `j` thì chính là kết quả màu đỏ và xanh muốn lấy và ngược lại cho tam giác nửa kia là kết quả của màu vàng và màu xanh.

![](pic/EXCEL_CaDmhgKJlG.png)

Như vậy bây giờ công việc của bạn rất dễ dàng đó là duyệt qua hai mảng ghi ra bảng, rõ ràng với quan sát, cứ với vị trí dòng `i` >= vị trí dòng `j` thì in ra màn hình là `*` ( ô màu đỏ và xanh). Vậy thì sẽ tạo ra được tam giác như  bên trên. Và đó chính là thứ mà mình muốn như bài toán trên. Hãy cùng xem lại một lần nữa diễn giải tổng thể cách mà logic được tạo ra. 

![](pic/EXCEL_Ji0Hl7BBgi.png)

Và với việc này thì mình cũng có thể dễ dàng vẽ lại một nửa tam giác bên kia với logic ngược nhau.

```py
n = int(input("Nhap vao n tam giac: "))
for i in range(n):
  for j in range(n):
    if i<=j:
      print(end="* ")
    else:
      print(end = "  ")
  print()
```
![](pic/firefox_2SEJgBh4Nu.png)

Tới đây thì bạn đã hiểu vấn đề tại sao ai cũng học được cú pháp nhưng rất ít người tư duy logic được để giải quyết một vấn đề rồi chứ, lập trình phải nghĩ trước là vậy đó. Và rõ ràng vẽ tam giác không phải là để chơi mà là để hiểu và áp dụng vào cuộc sống, hãy xem cách mà tam giác giúp bạn trong việc đảo cột dòng kết quả từ tệp csv cũng chính từ logic đã trình bày bên trên để hoán đổi dòng sang cột, và kỹ sư hoàn toàn có thể áp dụng để viết một thứ gì đó trong Dynamo cho công việc của mình như thế này. 

``` py
# Load the Python Standard and DesignScript Libraries
import sys
import clr
clr.AddReference('ProtoGeometry')
from Autodesk.DesignScript.Geometry import *
datas = IN[0]
newdatas = [[0]*len(datas) for i in range(len(datas[0]))]
for i in range(len(datas)):
    for j in range(len(datas[i])):
        newdatas[j][i] = datas[i][j]
OUT = newdatas
```
![](pic/DynamoSandbox_ky9v2O1eg1.png)

2. Hoang mang ngôn ngữ muốn học.

Bởi vì có quá nhiều ngôn ngữ và quá nhiều lời đề nghị trên internet. Một người chơi mới đặt chân vào sẽ hoang mang tột độ đến nỗi có thể học xong một ngôn ngữ lập trình trong vòng một đêm và nhanh chóng lướt sang một ngôn ngữ mới để bắt kịp với thế giới internet. Một tháng sau đó là bỏ ngang học bắt đầu hoang mang và bắt đầu lại từ con số 0, và cứ thế vòng lặp cứ bắt đầu lặp lại liên tục ở con số 0 tròn trĩnh.

![](pic/maxresdefault.jpg)

Thực tế nên làm : Học chậm lại, tập trung vào một thứ bạn cần ngay bây giờ. Rõ ràng bên trên bạn có thể dễ dàng tạo ra tam giác ở phía bên trái với ngôn ngữ **Python**. Vậy chắc chắn khi bạn chuyển qua ngôn ngữ mới thì logic chẳng thay đổi đi dâu được cả, việc của bạn bây giờ chỉ cần là học cú pháp và mang logic đó sang ngôn ngữ mới. 

Hãy thử với ngôn ngữ  **C#**:

```cs
Console.WriteLine("Input n tam giac:");
string? n = Console.ReadLine();
Console.WriteLine($"Ban da nhap so n tam giac la {n}");
int.TryParse(n,out int m);
for (int i = 0; i < m; i++)
{
    for (int j = 0; j < m; j++)
    {
        if (i >= j)
        {
            Console.Write("* ");
        }
        else
        {
            Console.Write(" ");
        }
    }
    Console.WriteLine();
}
Console.ReadKey();

```
![](pic/rider64_LVZFFRTxkv.png)

Và với ngôn ngữ **JavaScript** cũng không khác là mấy : 

```javascript
var ninput = prompt(" nhap gia tri n tam giac")
n = parseInt(ninput);
for (i = 0; i < n; i++) {
  for (j = 0; j <= n; j++) {
    if (i >= j) {
     document.write(" * ");
    } 
    else {
      document.write(" ");
    }
  }
  document.writeln("<br/>");
}

```
Ở đây mình sử dụng trang <a href="https://playcode.io/javascript" target="_blank">playcode.io</a> để demo nhanh kết quả từ ngôn ngữ javascripts.   

![](pic/firefox_Apy1dabbPk.png)

Kết quả đầu ra mong muốn của bạn mấu chỗt vẫn là từ logic cũ với `i>=j` để tạo ra tam giác cân nửa trái mà thôi. Cho dù là ngôn ngữ nào đi chăng nữa thì việc bạn không tìm ra logic `i>=j` thì bạn cũng chả viết được gì nữa. Đó là lý do mà rất nhiều lập trình viên hay nhìn chăm chăm vào màn hình chứ không như những hacker trong phim mà bạn thường thấy.

3. Thiếu thực hành.

Do việc mới bắt đầu nên việc tìm các thực hành thực tế là không có nhiều, chính vì vậy sẽ dẫn đến việc học lý thuyết quá nhiều sau đó lãng quên vào quá khứ mà không đọng lại một chút gì trong đầu.

Thực tế nên làm: Thực hành càng nhiều càng tốt, nếu không rõ về một khái niệm, hãy bắt tay làm ngay một ví dụ về nó. Hầu hết kết kỹ sư phần mềm đều giành phần lớn thời gian ngồi trước máy tính để thực hành bởi tính tò mò vốn có của họ. Với ví dụ bên trên, bạn thử suy nghĩ cách vẽ lại các tam giác đục lỗ như này xem được không, không có bất cứ cú pháp mới lạ nào để tạo ra những tam giác bên dưới cả ? Chỉ là ở đây mình sẽ không cung cấp bài giải mà bạn phải tự nghĩ ra nó rồi viết thử xem bạn mất bao lâu để tìm ra đáp án và bao lâu đề viết được cú pháp in ra 4 kiểu tam giác này.

![](pic/firefox_1sWEBpXTCM.png)


4. Xem video quá nhiều.

Việc xem lập trình như xem một bộ phim thực sự điều này đang diễn ra mỗi ngày một nhiều bởi hàng loạt các video được công bố rộng rãi trên mạng xã hội. Rất nhiều người mới nhanh chóng xem nó như một phần công việc của các kỹ sư giàu kinh nghiệm rồi xem như là đã biết.

![](pic/catsee.jpg)

Thực tế nên làm : Việc xem video quá nhiều không giúp ích gì cho người mới, tìm một chủ đề mà bạn quan tâm, xem chúng nhiều lần rồi hoàn thành nó là một cách tốt nhất để xem video cho người mới, việc xem qua loa chỉ giành cho cấp độ cao cấp. Xem nhiều mà không làm thì dù bạn có xem mấy cuốn phim đi nữa cũng không tồn đọng được gì.

5. Copy Paste.

Copy paste là vấn đề rất phổ biến, nhưng đôi khi chúng đã giết chết những người mới khi có nhiều bài giải có sẵn trên internet.

![](pic/d39e4129213942008d4151e375bf7b0a.png)

Thực tế nên làm : Với người mới đến, hãy học cách gõ chậm, tìm hiểu ý nghĩa và đọc các bình luận giải thích từ những chuyên gia, đọc thêm tài liệu trên trang web trước khi copy bất cứ thứ gì vì có thể bạn sẽ phải viết lại toàn bộ những thứ đó. Thực tế khi bạn hiểu toàn bộ vấn đề thì copy paste chỉ là vấn đề một sớm một chiều, vì vậy với những người đã làm việc lâu như vậy thì họ làm vậy, còn bạn mới đến thì hãy chậm lại một chút.

6. Muốn học mọi thứ

Nhiều người đã theo đuổi lộ trình học hết mọi thứ khi mới bắt đầu. Đó là nỗi ám ảnh của người mới khi có quá nhiều thứ hay ho ở một mảng mới. Và lao vào học mọi thứ mỗi ngày với hi vọng là mình sẽ đạt được cấp độ master trong thời gian ngắn.

Thực tế nên làm : Tập trung vào một vấn đề, giải quyết và thành thạo nó thay vì học mỗi thứ một ít. Nếu muốn học mọi thứ thì bạn không phù hợp với ngành này. Cho dù đối với bất cứ lĩnh vực nào, thời gian bạn bỏ ra cũng rất nhiều và để đạt được một số thành tựu nhỏ đó là một sự nỗ lực rất lớn.

## Về phía doanh nghiệp

Doanh nghiệp mong muốn có quá nhiều thứ tuyệt vời trước mắt nhưng chưa cởi mở. Liệu doanh nghiệp có tạo điều kiện để bạn tham gia vào học hỏi các vấn đề này hay không. Đừng nghĩ rằng văn hóa doanh nghiệp là không ảnh hưởng. Chính đồng nghiệp và văn hóa của một danh nghiệp là một sự thúc đẩy tiềm năng lớn với nhân viên. Vì vậy bạn cũng nên xem lại liệu doanh nghiệp của bạn có đang hỗ trợ bạn đạt được hay tạo điều kiện để bạn có thẻ làm được việc này không. Nếu không hãy mạnh dạng đề xuất và trao đổi chia sẻ chính kiển của bản thân về những ý tưởng và cách bạn muốn hướng đến. Nếu cảm thấy quá khó khăn, hãy tìm một nơi phù hợp với bạn để phát triển khả năng mong muốn của bạn.

## Về phía cộng đồng

Việc kết nối cộng đồng giúp bạn có cái nhìn tổng thể về xu hướng ngành và các đồng nghiệp, bạn bè mới trên khắp thế giới. Nếu bạn là một trong số ít có thể hiểu được thì hãy chia sẻ chúng với cộng đồng càng sớm càng tốt, sẽ có một gã châu á hay châu âu nào đó xuất hiện và khuấy động cuộc sống của bạn. Đừng ngần ngại chia sẻ những ý tưởng điên rồ của bạn lên Internet !


## Tổng kết

Việc chuyển đổi công việc là một hành trình rất khó khăn, và chuyển đổi lĩnh vực lại càng khó khăn hơn, vì vậy nên cân nhắc. Một số bạn bè mình biết đã bỏ việc học lên master, thạc sĩ, tiến sĩ, một số thì chuyển qua làm nhà phát triển toàn thời gian, còn việc nên chuyển đổi hay không, đó là quyết định của bạn. Khi càng có nhiều kỹ sư tham gia vào chuyển đổi số điều đó là rất tốt, nhưng mặt trái cũng cho thấy rằng mức độ xuống cấp của ngành ngày càng một lớn và cần có giải pháp kịp thời để khắc phục điều này.

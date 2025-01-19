
## Tổng quan

Hệ thống GPT3 mới từ Open AI đã cho thấy sức mạnh mà chúng ta có thể xử lý với ngôn ngữ tự nhiên (NLP). Chat GPT tạo ra một mô hình đối thoại giữa người và máy, thừa nhận lỗi lầm trước đó của mình và trả lời những câu hỏi tiếp theo tương tự như con người. Hôm nay chúng ta sẽ cùng tìm hiểu xem liệu ứng dụng của mô hình này trong tương lai cũng như các điểm lợi và hại của nó.

Việc sử dụng ChatGPT là miễn phí ngay bây giờ. Bạn có thể thử ngay bây giờ tại <a href="https://chat.openai.com/chat" target="_blank">chat.openai.com</a>. Trong tương lai mình không đảm bảo rằng nó là miễn phí nữa, Github Copilot cũng là một minh chứng cho điều này.   

![](pic/photo_2022-12-11_10-47-21.jpg)

## Sử dụng GPT-3

Việc sử dụng API của GPT-3 là một việc đơn giản, bạn chỉ cần đăng ký tài khoản và tạo một API key. Sau đó bạn có thể sử dụng API key để gọi API của GPT-3.

- Hãy đảm bảo rằng bạn đã tạo cho mình một API key để kết nối và tạo một biến môi trường trong máy tính của mình : 

![](pic/SystemPropertiesAdvanced_E9WBLumLUI.png)

- Sau đó bạn có thể sử dụng API key để gọi API của GPT-3. Việc cài đặt thư viện vô cùng đơn giản với cú pháp `pip install openai`

![](pic/Code_Atmc5azAgX.png)

- Chúng ta hãy thử với một ví dụ đơn giản như sau, hãy thay thế cú pháp `openai.api_key` bằng key của bạn nếu bạn đã thiết lập trong biến môi trường với `OPENAI_API_KEY` là tên biến môi trường của bạn, giá trị là API key của bạn.

```py
import os
import openai
openai.api_key = os.getenv("OPENAI_API_KEY")
```

Dưới đây là một ví dụ đơn giản để gọi mô hình **text-davinci-003** với các tham số thiết lập mặc định.

```py
import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

response = openai.Completion.create(
  model="text-davinci-003",
  prompt="The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I'd like to cancel my subscription.\nAI:",
  temperature=0.9,
  max_tokens=150,
  top_p=1,
  frequency_penalty=0.0,
  presence_penalty=0.6,
  stop=[" Human:", " AI:"]
)
```
Kết quả phản hồi của mô hình :

![](pic/Code_ywip2oO1LW.png)

Tệp mẫu bên trên được chia sẻ tại <a href="https://gist.github.com/chuongmep/91e24e3976e44b2d39286a9cd7f90b4a" target="_blank">gits</a>   

## ChatGPT Dynamo

Hãy xem thử một đoạn chat bên dưới yêu cầu tạo ra một điêm trong Dynamo Revit với Python Script, Chat GPT đã giải thích từ công đoạn khởi tạo đến cho ra kết quả hoàn chỉnh.

![](pic/iShot_2022-12-27_22.09.08.png)

Việc tích hợp vào [Dynamo](https://dynamobim.org/) là một việc hết sức quan trọng và cần thiết, điều này mở ra nhiều cơ hội với các kĩ sư thích học hỏi các khái niệm kỹ thuật, chúng hoạt động hiệu quả như một trợ lý, một chuyên gia giúp bạn đưa ra những câu trả lời chính xác đến kinh ngạc, đôi khi những khái niệm quá mới mẻ, mô hình phản hồi khiến bạn phải suy nghĩ ngờ vực đến mức bạn khó nhận ra sự sai sót của mô hình.

![](pic/DynamoSandbox_c6OkXRjDIR.png)

Hãy suy nghĩ hơn về hình ảnh này và nó đã đúng sự thật, đôi lúc nó giải quyết giúp bạn nhanh chóng vấn đề bạn cần nhanh hơn 90%, nhưng đôi lúc nó khiến bạn phát điên và đắn đo lưỡng lự với những câu trả lời mà OpenAI mang lại. Vì vậy việc công khai một thứ gì đó như này mình vẫn đang đắn đo và do dự cho đến khi nó hoàn thiện hơn, việc điều chỉnh các tham số để phù hợp với kết quả dự đoán cho ngành AEC là khó ngay lúc này.

![](pic/_Image_0ef63bea-0ce1-41da-8418-d85b786ca3ad.png)

Sẽ thế nào nếu chúng ta đẩy BIM lên một tầm cao mới, nơi mà kỹ sư tập trung vào công việc của mình, AI trợ giúp kỹ sư làm các công việc tự động hóa lặp đi lặp lại mỗi ngày, đưa ra các lời khuyên hữu ích và đó cũng là một trong những mục tiêu mà OpenAI đang cố gắng đạt được.

## ChatGPT RevitPythonShell

Hãy xem nó chính xác đế mức nào, việc của mình là chỉ cần sao chép và dán vào thôi. Đây là trưởng hợp được xem là gợi ý hoàn hảo nhất. Tuy nhiên không phải trường hợp nào được mong đợi như vậy.

![](pic/firefox_SFTSSsstTv.png)

Và đây là kết quả sau khi dán đoạn mã vào. 

![](pic/Revit_Det7zi54p1.png)


## ruGPT3Small trên IFC và dữ liệu Revit

Gần đây bài [báo](https://www.kaggle.com/code/artemboiko/5000-projects-in-ifc-and-rvt-format-opendatabim) tác giả [Artem Boiko](https://www.linkedin.com/in/boikoartem/) cũng đã thử nghiệm một quá trình phân tích dữ liệu hiệu quả với bộ dataset bao gồm 4,596 file IFC và 6,471 file Revit, tác giả đã trình bày và hướng dẫn rất rõ nên mình cũng không muốn trình bày chúng ở đây, chỉ mang tính giới thiệu cho bạn vì đó là tuyệt vời ngay lúc này. 

![](pic/Presentation-OpenDataBIM-40-1-scaled.jpg)

Vấn đề lớn nhất với BIM ngay lúc này đó chính là giải quyết mớ dữ liệu hỗn độn từ mô hình, trong khi mô hình ở mỗi công ty là không được công khai và chia sẻ với nhau. Làm thế nào mà chúng ta có thể tập hợp được bộ dữ liệu lớn, đó là vấn đề lớn mà chúng ta cần phải làm.

![](pic/SINGLE-FILES-6.gif)

Tệp hướng dẫn google colab được chia sẻ tại [đây](https://colab.research.google.com/drive/1P6HsLnFkd75ir7pUmdmOQTKrAE4vJuao#scrollTo=p6dPamYCxAuJ&uniqifier=1)

**Thông tin thêm :** Việc ChatGPT có thể giúp bạn tạo ra mô hình chính xác hơn với các mô hình khác chính là sự kết hợp của các thuật toán và bộ siêu dữ liệu, nhưng đối với ngành xây dựng, điều đó chưa tốt với ngành vì giờ đây dữ liệu chúng ta đủ lớn để có tạo ra một mô hình ở thế hệ sau tốt hơn, tuy nhiên chúng đang bị rời rạc và bị chi phối kiểm soát bởi các tệp đóng từ các phần mềm khác nhau và sự không sẵn sàng chia sẻ bởi các công ty cho nhau vì lợi thế cạnh tranh. Điều này khiến cho việc tạo ra một mô hình chính xác trở nên khó khăn hơn. Hãy nhìn xem bộ dữ liệu đào tạo GPT-3 thật sự lớn đến cỡ nào,  175 tỷ tham số là một con số rất ấn tượng.

![https://beta.openai.com/docs/model-index-for-researchers](pic/firefox_tmFh0jHrI6.png)

# Github Copilot

Khi mình viết bài viết này, AI cũng đang làm điều giúp mình, Github [Copilot](https://github.com/features/copilot) chính là thứ đó. Việc bạn phải trả 10$/ tháng cho thứ này thật đáng nếu bạn muốn làm việc với một năng suất cao nhất có thể. Cũng xin tiết lộ với bạn rằng 20% chữ trong bài viết này đã được Github Copilot viết ra, và mình chỉ cần chỉnh sửa lại một chút để nó phù hợp với bài viết.

![](pic/Code_4Dt0RxPgt1.png)

Nơi mà github copilot có thể giúp bạn dễ dàng hơn là hiểu sâu về sự phát tạp bên trong cách mà xử lý ngôn ngữ tự nhiên đạt đến đỉnh cao (NLP) của nó.

![](pic/Code_X0boxGXzWk.png)

Điều đáng bận tâm bây giờ là **Github Copilot** đang tính phí người dùng và mô hình tiếp theo này sẽ tính phí người dùng như cách mà Copilot đã làm. Thời gian dùng thử gần một năm đã đưa mình từ sự tốt đẹp này đến nỗi sợ hãi khác.

![](pic/_Image_d9cc2c4b-1bdf-4673-b295-759de7b719d9.png)

## SWAPP

SWAPP gần đây đã áp dụng các thuật toán tiên tiến, thông minh để cung cấp các tài liệu xây dựng chính xác, chi tiết và đầy đủ nhanh hơn bao giờ hết. Nó giúp các kĩ sư giảm được thời gian cho các công việc tẻ nhạt như tạo các trang bản vẽ hoặc thực hiện các công đoạn xây dựng tài liệu. Cho đến nay, giải pháp này đã được 4 tuổi và đang trên đà tăng trưởng mạnh mẽ, có khả năng thúc đẩy ngành phát triển và mang lại những lợi ích năng suất mới. Việc đưa ra các giải pháp này có thể giúp các kĩ sư xây dựng tài liệu xây dựng chính xác, chi tiết và đầy đủ nhanh hơn bao giờ hết.

 Các nhà nghiên cứu tại OpenAI hy vọng sẽ sử dụng `Video Pre-Training` để dạy các bot đạt được trong không gian 3D những gì GPT-3 đã làm để bắt chước văn bản của con người như cách mà một nghiên cứu đào tạo cho một AI có thể tự chơi được [Minecraft](https://www.technologyreview.com/2022/11/25/1063707/ai-minecraft-video-unlock-next-big-thing-openai-imitation-learning). Sẽ không thể tưởng tượng được nếu AI học và hiểu được toàn bộ các video hướng dẫn và tài liệu trực tuyến để giúp bạn xây dựng nội dung hiệu quả. Chắc chắn sẽ có nhiều kết quả mà chúng ta khó có thể tưởng tượng ra vào thời điểm này đối với ngành AEC.

<iframe width="750" height="450" src="https://www.youtube.com/embed/h-D5-6koRf8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Các mối lo ngại

Các mối lo ngại về việc AI có thể thay thế được con người trong tương lai không còn là một vấn đề mới, nhưng với sự phát triển mạnh mẽ của AI, các mối lo ngại này có thể sẽ trở thành hiện thực trong tương lai gần. Điều này không phải là lo ngại việc AI sẽ thay thế con người, điều mình lo lắng nhất chính là sự đạo văn, đạo nhạc, một số tin tức giả mạo, các hệ thống spam sẽ được tạo ra bởi AI, và nó sẽ làm cho mọi người khó khăn trong việc phân biệt giữa thực tế và giả mạo. Đó chỉ là một vài ví dụ, nhưng nếu bạn nghĩ kỹ, bạn sẽ thấy rằng có rất nhiều vấn đề khác mà AI có thể gây ra.

Dấu hiệu đáng mừng là trang <a href="https://stackoverflow.com/" target="_blank">stackoverflow</a> cúng đã thông báo không cho phép sao chép nội dung từ ChatGPT vào Stackoverflow. Điều này có thể cho thấy rằng các nhà phát triển đang nhận ra được vấn đề này và đang cố gắng để giải quyết nó, dù thế nào đi chăng nữa thì chúng ta luôn cảnh giác và kiểm định trước khi giúp đỡ người khác dưới sự trợ giúp của AI.

![](pic/firefox_UW7Leiw6If.png)

Nhưng cũng với mô hình này, cũng đã mở ra một cách tiến triển mới AI đạt được. Đó chính là việc AI có thể tự học được các ngôn ngữ mới, và có thể phản hồi được với các câu hỏi của người dùng. Điều này có thể giúp cho các ngôn ngữ mới có thể phát triển nhanh hơn, và có thể giúp cho các ngôn ngữ giao tiếp phát triển một cách hiệu quả hơn, giảm thiểu thời gian học tập, giảm thiểu và bù đắp các lỗi thiếu sót của con người.

## Nguồn tham khảo

Một số nguồn mà bạn có thể bắt đầu khám phá ngay bây giờ.

<a href="https://github.com/f/awesome-chatgpt-prompts" target="_blank">Awesome ChatGPT Prompts</a>

<a href="https://github.com/humanloop/awesome-chatgpt" target="_blank">Awesome ChatGPT</a>

## Cuộc sống 

Sao tôi lại có thể bỏ qua giọng hát của một cô gái tuyệt vời như vậy được, tôi đã tò mò rất nhiều về cô gái này và tôi rất thích nghe nhạc của cô ấy, còn bạn thì sao ? 

Mẹ cô ấy mất khi cô ấy mới 9 tuổi. Cô ấy đã hát rong và biểu diễn khắp nơi kể từ đó cho đến bây giờ, đúng là một động lực thật mạnh mẽ, tuyệt vời.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/uOR-yhLsZ4o?si=PEfuX1NCUG6Kbc4V" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
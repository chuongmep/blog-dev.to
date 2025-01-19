
## Tổng quan

Chủ đề hôm nay khá thú vị, đó là việc chạy các ứng dụng trên **macOS** trên M1 chip. Đây là một chủ đề rất hot và được nhiều người quan tâm. Mình cũng đã thử nghiệm và chia sẻ kết quả cho các bạn với một số phần mềm. Lưu ý rằng đây là một bài viết chia sẻ kết quả thực tế, không phải là một bài viết chuyên sâu về M1 chip.

Các con chip mới của Apple Silicon như M1 và M2 là những con chip di động mạnh mẽ nhưng cũng đi kèm với nhiều giới hạn khi các phần mềm chưa bắt kịp sự thay đổi của ARM. Hôm nay có lẽ là thời gian tuyệt vời nhất để chúng ta cùng nhìn lại khoảng thời gian hơn 1 năm sau khi con chip này ra mắt và các phần mềm đã bắt kịp như thế nào. Việc thúc đẩy ARM cũng không mới nhưng Apple đôi khi là công ty đã thành công hơn Microsoft trong việc thúc đẩy nó, và trình biên dịch Rosetta cũng đã làm tốt nhiệm vụ của nó giúp biên dịch các ứng dụng x86 ha x64 sang tương thích mới con chip mới này.

Đây không phải là một bài viết của một gã cuồng **Apple** mà là một gã mọt công nghệ, vì vậy nếu bạn có bất cứ tranh luận gì thì không nên bình luận và bài viết này. Bài viết này chỉ mang tính chia sẻ cá nhân và những nhu cầu đáp ứng cơ bản của một chiếc laptop cho công việc.

## Cấu hình

Đây là chi tiết cấu hình máy của mình : 

```
Name: MacBook Pro 14" 2021 M1 Max
Memory: 32GB RAM
GPU: 24 Core GPU
Storage: 512GB SSD
```

![](pic/iShot_2022-12-18_18.10.31.png)

Ngoài ra mình còn sỡ hữu thêm phiên bản [Parallels Desktop](https://www.parallels.com/) phiên bản 18.1.1 để chay hai máy ảo là **Windows** và **Linux** cho các tác vụ cần đến cho 3 hệ điều hành. Và tất nhiên bạn cũng cần phải trả một cái giá khá đắt cho phần mềm này.

![](pic/iShot_2022-12-25_14.29.12.png)

Nhìn chung thì với cấu hình này, chúng đủ để cho mình có thể làm những điều mình muốn và những điều mà mình sẽ tiếp tục hướng tới trong tương lai dài hạn. Nhiều bạn đôi khi có những suy nghĩ trái chiều khác nhau về việc mua một chiếc **MacBook** cho công việc của một kỹ sư **BIM**. Nhưng rất tiếc đó là không phải mình, và mình sẽ bắt đầu với một số lý do sau để quyết định chọn mua. Hãy mang thân phận của một kỹ sư BIM ra khỏi bài viết này, mình chỉ là một gã biết làm phần mềm, am hiểu về các công nghệ và có thể làm việc với các công nghệ đó.

## Lý do chọn mua

Pin là yếu tố đầu tiên khiến mình việc lựa chọn một chiếc máy tính, mình đã chán ngấy với các máy tính laptop **Windows** với thường lượng pin tệ đến mức suốt thập kỷ hay những cấu hình mạnh thì lại đi với một trọng lượng khá to lớn. Đối với các máy MacBook, mình có một thời lượng pin dài hơn trông thấy, mình có thể thoải mái mang laptop ra ngoài cafe mà không phải quá lo lắng về việc pin sẽ hết trong thời gian ngắn. Đây là một điểm rất quan trọng khi mình phải di chuyển quá nhiều. Hãy xem thời gian mình dùng hỗn hợp bên dưới, sạc thật sự nhanh và thời gian đủ để đáp ứng trong làm việc hiệu suất cao từ trưa đến 6h tối.

![](pic/iShot_2022-12-18_19.35.42.png)

Những tính năng hữu ích mà **Windows** khó đáp ứng với mình. Một trong số đó phải kể đến như việc tích hợp cho phép sao chép chữ trong ảnh, chữ trong video, nhập ảnh thông qua camera chia sẻ, chia sẻ màn hình nhanh qua hệ sinh thái, đồng bộ hóa tức thời, một nhấn để sử dụng wifi điện thoại, sao chép tách nhanh đối tượng, ... Đó là hàng tá thứ mà mình thường xuyên sử dụng và mình thấy rất hữu ích.

Hãy xem bức hình bên dưới, việc lấy một bức ảnh từ điện thoại chụp nhanh nó dễ dàng đến mức nào, phải nói là nó tức thời và quá tuyệt vời, bạn chỉ cần chọn vào tính năng, Iphone tự động mở Camera sẵn chụp từ điện thoại và ảnh sẽ đi đến thư mục bạn đang cần làm việc hoặc nhập ngay lập tức khi bạn nhấn đồng ý từ phía điện thoại. Điều mà **MacOS** đã vượt xa **Windows** rất nhiều.

![](pic/iShot_2022-12-18_15.44.12.png)

Hệ sinh thái phầm mềm là ly do chính. Mình có Ipad, Có Iphone, vậy thì việc có **Mac book** sẽ đồng bộ với hệ sinh thái. Điều mà bạn nên biết là một khi người dùng đã gắn bó với hệ sinh thái của **Apple** thì rất khó để thoát ra khỏi. Và mình cũng là kẻ đã nối gót đặt chân vào hệ sinh thái này. Trước đây, mình là một kẻ khá thích thú với **Windows Phone** và đã sống trong một thời kỳ khá bùng nổ của hệ điều hành này trước khi chúng trở nên biến mất khỏi thế giới vào năm 2022.

Đã từng trải qua hàng tá thứ lỗi windows và hỗ trợ cho hàng nghìn người thậm chí là hơn đối với mình, đã đến lúc mình phải di chuyển sang một hệ điều hành mới. Nơi mà mình không phải lo lắng quá nhiều về việc cập nhật tức thời chết chóc trong buổi họp hay vô số lỗi khác mà chúng đến một cách khá bất ngờ.

![](pic/d09.png)

Không còn phải suy nghĩ về thời gian tắt máy và mở máy như windows. Khi mình dùng mình gập laptop lại, khi mình mở lên thì mình dùng luôn, nó giống như trải nghiệm của một chiếc Ipad và giảm thời gian chờ của mình rất nhiều. Những điều mà dường như đôi với Windows phải là như vậy nhưng với Mac book thì không phải là như vậy.

Bây giờ mình đã có thể thỏa sức chia sẻ toàn bộ khía cạnh quan trọng của của cả ba hệ điều hành **Windows**, **Macos**, **Linux** về những khía cạnh tuyệt vời và những khía cạnh thiếu sót của chúng trên cùng một chiếc máy. Điều đó chắc chắn bạn sẽ thấy trong các bài viết tương lai.

![](pic/3platform.png)
## Một số đau khổ mà bạn phải chấp nhận

Hãy lưu ý rằng, không phải ai cũng dễ dàng rời bỏ hệ điều hành **Windows** để đến với một hệ điều hành mới như **Linux** hay **MacOS**. Mình đã từng dùng Linux và cũng đã từng dùng MacOS, nhưng mình vẫn chọn **Windows** vì nó dễ dàng hơn trong suốt những năm tháng của một kỹ sư một thực thụ.

Hãy làm quen với một số đau khổ mà bạn phải chấp nhận khi chuyển sang MacOS như các phím tắt, thiếu các nút cơ bản, **Finder** thao tác với tệp và thư mục tệ theo cách của Windows, hay thậm chí là các ứng dụng bạn yêu thích trả phí quá cao để sở hữu thay vi chúng là miễn phí và dễ dàng có được trên **windows**. Đó chỉ là một số thứ nhỏ mà bạn phải học cách làm quen với nó và cuộc sống mới.

ARM đối với dân mạng khi mình nghe thổi vào tai mình là mạnh hơn Intel, nhưng không phải lúc nào cũng như vậy đối với các ứng dụng đơn luồng và đa luồng, và đó còn là một con chip mà nó chưa thật sự tốt cho các ứng dụng phổ biến và mang nó lên Mac book, bạn phải chấp nhận rất nhiều sự thiếu sót phần mềm và những lỗi không thể tránh khỏi. Nó cũng chỉ là một con chip di động ARM và cũng đừng nên thần thánh hóa quá. Nhưng cũng không thể phủ nhận rằng, nó là một con chip mạnh mẽ và tiết kiệm pin hơn rất nhiều so với Intel.

Hãy tập làm quen với những phím tắt mới như `Command + S` để lưu không phải `Crt + S` để lưu mặc dù vẫn có phím `Control` hay một số thứ kì quặc khác mà bạn phải biết như không có phím **Backspace**, thanh ribbon quản lý quá nhức đầu,... Hay thậm chí phím enter cũng biến mất và thay vào đó là `Command + O` để mở, và với hầu như tất cả các phím tắt để sử dụng đều bị thay đổi. Điều này không quá khó khăn với một người như mình nhưng chắc chắn điều đó sẽ làm đảo lộn cuộc sống của rất nhiều người khi mới làm quen với hệ điều hành **macOS**.

Mình không biết mô tả thêm cho bạn thế nào nữa nhưng chắc chắn bạn nên xem qua video của anh chàng này, nó là một video trung thực nhất từ trước đến nay.

<iframe width="700" height="450" src="https://www.youtube.com/embed/cfsNO14hikA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Các phần mềm AEC

Rất tiếc, **Revit** không phải là một phần mềm gắn bó quá nhiều đối với mình nữa, giờ đây nó chỉ như là một phần mềm mà mình hỗ trợ cho các kỹ sư **BIM** chuyên dụng hay hỗ trợ tự động hóa cho các công cụ trên **Dynamo**. Nhìn chung việc chạy giả lập thông qua [Parallel Desktop](https://www.parallels.com/) là một giải pháp tốt nhất đối với người dùng **macOS M1** muốn chạy **Revit**. Nhưng nếu bạn là một cao bồi **Revit** thì hãy chọn **Windows**, đừng nghĩ đến việc mua Macbook để chạy Revit. Hiệu suất mà nó mang lại chấp nhận được chứ không nhanh. Tổng thể có thể chạy được với các tác vụ thông thường nhưng nếu dự án của bạn lớn hơn 200mb, chăc chắn sẽ có rất nhiều điều xảy ra với nó. Việc cân nhắc một chiếc máy như dell xps 15 sẽ giải quyết tốt hơn nhiều.

![](pic/iShot_2022-12-18_14.50.18.png)

**Autocad** và **Civil3D** cũng chạy khỏe với giả lập thông qua **Parallel Desktop**. Nó chạy tương đối ổn định và không có bất cứ sự cố nào đối với mình tại thời điểm này. Hiệu suất cũng không nhanh bằng các laptop window với cùng cấu hình. Vì vậy đừng mong chờ về hiệu suất vượt trội từ con chip M1 như quảng cáo cho các máy ảo này.

![](pic/SCR-20221215-s8m.png)

**Archicad** là một phần mềm có hỗ trợ cho **MacOS** nhưng **Windows** là quá tốt, một thời gian trước đây cụ thể là 4 năm trước khi làm việc với **Unreal Engine ** và Archicad, mình cũng có ấn tượng với hiệu suất đa luồng và đa nền tảng. Vì vậy không có quá nhiều hạn chế đối với Archicad trên MacOS. Không có bất cứ lý do gì để chạy phần mềm này bên trong máy ảo, trừ khi bạn là một người khác với phần còn lại của thế giới.

![](pic/IMG_0417.jpeg)

**Navisworks** 2023 cũng chạy bình thường mà không xảy ra sự cố nào đối với mình macOS M1 chip thông qua **Parallel**. Đôi khi mình còn có cảm giác là nó chạy nhanh hơn trên laptop **Windows** của mình ở lúc khởi động. Tuy nhiên đến khi vào mô hình thì chúng vẫn có cảm giác trễ đồ họa khi thử xem ỏ chế độ mô hình 3D.

![](pic/SCR-20221215-spz.png)

Việc đưa mô hình Navisworks lên [Speckle](https://speckle.community/) thông qua Navisworks Connector cũng không gặp chút trở ngại nào.

![](pic/iShot_2022-12-18_11.51.44.png)

Blender là quá tốt, chạy khỏe trên `MacOS` M1 chip. Mình cũng có thể sử dụng [BlenderBIM](https://blenderbim.org/) để tạo mô hình BIM. Việc cài đặt và sử dụng Blender không cần thông qua bất cứ máy ảo nào.

![](pic/iShot_2022-12-18_15.34.13.png)

Những phần mềm khác rất nhiều như Rhino, Grasshopper, vì theo mình nó đã quá tốt trên macOS và không có gì phải kể đến ở đây nữa bởi vì chúng cớ thể chạy bình thường, da nền tảng mà không cần thông qua máy ảo. Vì mình không có bản quyền với phần mềm này trên Mac nên tạm thời chưa chia sẻ chi tiết giúp bạn được. Hi vọng sẽ có ai đó trải nghiệm và thêm vào bên dưới bài viết này.

## Lập trình cho AEC

[Visual Studio 2022](https://visualstudio.microsoft.com/vs/mac/) cũng chạy khỏe trên Macbook M1. Theo cảm nhận cá nhân, các dự án build nhanh trông thấy. Video so sánh về Visual Studio ARM với X64 của anh chàng [này](https://www.youtube.com/watch?v=B9C_cv8R_7U) trên Youtube đáng tin cậy. Một điều đáng chú ý là chúng chạy được với các dự án có .Net Framework 4.8, Net6 , Net Core trên máy ảo nhưng với phiên bản Native chạy trên Mac thì thật thực sự không ổn tí nào, nhất là với ai đó đang bảo trì cho các dự án cũ hay dự án phức tạp. Vì vậy Window vẫn là lựa chọn số một ở thời điểm này khi bạn làm việc với Visual Studio 2022.

![](pic/iShot_2022-12-18_10.11.17.png)

Và đây là kết quả là cũng thành công Debug và sửa lỗi cho [RevitAddinManager](https://github.com/chuongmep/RevitAddInManager/issues/40) đã báo cáo khi chạy với macOS M1 chip vài tháng trước. Debug hoạt động bình thường trên máy ảo không có sự cố, chỉ là khi chạy và mở Revit, nó hơi chậm.

![](pic/iShot_2022-12-17_23.39.46.png)

[Rider](https://www.jetbrains.com/rider/download/) chạy khỏe và còn nhanh hơn cả **Visual Studio 2022**. Có thể nói là Rider là một phần mềm lập trình tốt nhất cho MacOS đối với ai làm việc với **.NET**. Và nó giành cho những người thích nhanh, nhẹ và đẹp mắt. Có thể bạn cần phải trả một ít phí để sử dụng thay vì **Visual Studio 2022** có bản **Community** miễn phí. Một điều đáng lưu ý ở đây là nếu các dự án của bạn cũ với các phiên bản từ Net6 trở xuống sẽ gặp rất nhièu sự cố và bạn không thể làm việc với nó thông qua Rider. Nhưng khi bạn cài song song Visual Studio 2022 và thay thế Build với Visual Studio thì bạn sẽ làm việc được cho các dự cũ đòi hỏi .NET Framework <6.0>. Một điều ý nữa là các dự án khởi tạo với Revit hay Autocad, bạn không thể làm việc với lớn hơn .NET6. Điều đó sẽ khiến bạn phát điên và chết chắc với `Rider`.

![](pic/iShot_2022-12-18_15.05.52.png)

Với [Visual Studio Code](https://code.visualstudio.com/download) để làm việc với các dự án web với `React` hoặc `Vue` hoặc thuần `Javascript` thì cũng không có gì phải nói. Việc cài đặt Nodejs diễn ra nhanh chóng mà không có bất cứ sự cố nào. Đối với macOS, sử dụng [Homebrew](https://brew.sh/) để cài đặt luôn diễn ra nhanh chóng. Hãy thả những dòng lộn xộn này vào terminal để cài đặt.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Và bạn có thể dễ đàng cài đặt nodejs thông qua lệnh : 

```
brew install node
```

![](pic/iShot_2022-12-25_22.09.09.png)

Nó chạy khỏe và không có bất cứ sự cố nào đối với mình điển hình như chính blog build với `React` này.

![](pic/iShot_2022-12-18_15.11.10.png)

Và rõ ràng nếu bạn muốn mua một chiếc máy có thể đa năng như thế này thì Ram tối thiểu `32GB` là có khả năng, vì vậy khoảng ram từ dưới 32 chắc chắn sẽ có vấn đề với bộ nhớ. Ở đây mình thử mở Rider, Visual Studio, Parallel, Visual Studio Code , Firefox, Revit, ... kết hợp như một lần làm việc thông thường thì bộ nhớ tiêu thụ như bên dưới. Trông ổn khi chia máy ảo là 16GB và Macos là 16GB.

![](pic/iShot_2022-12-18_22.55.12.png)

## Học máy và khoa học dữ liệu

Cài đặt các gói python package cũng dễ dàng, sau khi cài đặt python, bạn cài thêm pip (python package install để nhanh chóng tải các gói)

``` cmd
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python3 get-pip.py
```

![](pic/iShot_2022-12-18_16.27.08.png)

Thử chơi một chút với thư viện numpy,pandas, seaborn để trực quan hóa dữ liệu, tốc độ nhanh bất ngờ. Khi nào có thời gian mình sẽ thử đào tạo lại một số mô hình học máy để xem xét khả năng của 24GPU mà chiếc laptop này mang lại.

![](pic/iShot_2022-12-18_16.37.25.png)

Với Tensorflow, bạn cần xem tại [https://developer.apple.com/metal/tensorflow-plugin/](https://developer.apple.com/metal/tensorflow-plugin/) để biết thêm thông tin, sử dụng tensorflow là được nhưng hiệu suất như thế nào mình sẽ làm ở một bài viết chi tiết khác. Còn nếu bạn muốn xem nhanh hướng dẫn cài đặt tensorflow trên macOS M1 thì bạn hãy xem qua bài viết [How To Install TensorFlow on M1 Mac](https://caffeinedev.medium.com/how-to-install-tensorflow-on-m1-mac-8e9b91d93706) (The Easy Way).
## Tổng kết

Nhìn chung với 16GB ram cho máy ảo thì cũng không đến nỗi, tuy nhiên việc chạy máy ảo window với ARM nó khiến máy nóng lên trông thấy và pin tuột dốc phông phanh. Vì vậy đó sẽ là ý tưởng tôì cho ai đó làm việc nhiều với **Windows** trên **Macbook**.

Macbook là một con quái vật nếu bạn muốn khám phá những thứ mới mẻ và tận hưởng những gì mà nó mang lại. Nhưng nếu bạn là một kỹ sư **BIM** thì hãy chọn **Windows** cho mình, đừng nghĩ đến việc mua Macbook để chạy Revit.

![](pic/SCR-20221215-cx.png)

Tóm lại : Đừng mua **macOS** để chạy **Windows** với các phần mềm giành cho kỹ sư mà không hỗ trợ trên **macOS** nếu bạn làm việc quá thường xuyên với các phần mềm **Windows**, và cũng đừng theo phong trào mà mua `macOS` với một số tiền lớn bỏ ra mà không biết cách tận dụng sức mạnh của nó cũng như cách mà chúng hoạt động. Hãy tiết kiệm tiền của bạn vào những thứ khác tốt hơn, sử dụng đúng nhu cầu và những gì thật sự cần cho bạn.

Nếu bạn vẫn còn đắn đo do dự thì xem video của anh chàng bên dưới, đó chính là thật sự những lời khuyên đúng đắn và hữu ích của một người am hiểu kiến thức. Chúc bạn có những sự lựa chọn đúng đắn cho hành trình tiếp theo của mình.

<iframe width="750" height="450" src="https://www.youtube.com/embed/PIG2NgzAl4o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
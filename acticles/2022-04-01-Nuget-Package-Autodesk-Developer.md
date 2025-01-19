## Giới thiệu

![](pic/nuget-hacking.jpg)

Nhắc đến [nuget](https://www.nuget.org/), giang hồ sẽ nghĩ ngay tới thư viện.Nhưng việc dùng thư viện từ Autodesk từ lâu đã trở thành nổi ám ảnh không ít của nhiều lập trình viên từ cổ đại đến hiện đại.Vấn đề ở đây là, việc tìm ra một nuget chứa đựng những bộ thư viện có sẵn và đầy đủ cho người dùng đối với các thư viện phần mềm từ Autodesk như mò kim đáy bể.Nếu bạn đang viết web mà chưa biết nuget thì nuget cũng tương tự như [NPM](https://www.npmjs.com/) vậy.

![](pic/addref.png)

Và cứ thế qua mỗi năm, các lập viên bắt đầu gánh trên vai mình tải từng phiên bản một, gán từng bộ thư viện cho các sản phẩm của mình.Chúng bắt đầu trở thành cực hình khi bạn bảo trì cho quá nhiều phiên bản và sự thay đổi của mỗi API làm cho điều đó càng trở nên phức tạp hơn.Chính vì vậy, nuget chính là thứ để giúp chúng ta hoàn thành mọi thứ.

![](pic/deploy.png)

## Tại sao lại là Nuget

Khi bạn tải lên một nuget, bạn đồng nghĩa với việc chia sẻ nó và quản trị không cho phép bạn xóa bừa bãi.Điều đó đảm bảo cho những người dùng đã tải các gói không bị mắt kẹt trong việc tìm kiếm.Điều này cũng tương tự như việc Autodesk không chp phép bạn xóa bỏ các package đã tải lên [Dyanmo Packages](https://dynamopackages.com/).

Việc Quản lý thư viện đồng nghĩa với việc quản lí phiên bản, bạn chỉ cần chọn đúng phiên bản để tải về mà không cần tải về phần mềm từ Autodesk.

Nuget giúp bạn tự động hóa quy trình một cách hoàn hảo nhất có thể.Nếu bạn là một người lười như mình thì đến cả việc tin nhắn cho bạn gái mình cũng phải tự động hóa 😛.

![](pic/cicd.png)

Các công ty lớn hoặc các mã nguồn lớn sử dụng .NET đều quản lý theo cách này.Giúp người dùng nhanh chóng tải xuống bản cập nhật mà không phải thông qua bất cứ bước phức tạp nào.Công việc của bạn chỉ đơn giản là vào Nuget Package Manager và kéo nó.

![](pic/nugetmanager.png)

Thư viện tự động khôi phục khi có ai đó muốn làm chung với bạn, đừng để ai đó khóc thầm chỉ vì những điều nhỏ nhặt này.

Và điều tất nhiên cuối cùng đó là tốc độ, sản phẩm của bạn sẽ phát hành sớm trong nháy mắt mà thôi.

## Làm thế nào để sử dụng

**Revit** : Nếu bạn đang sử dụng và phát triển phần mềm với Revit thì [Niced3Point](https://github.com/Nice3point) là người hậu duệ đứng sau bạn.Anh ta có rất nhiều quy trình tự động hóa tốt đẹp.Bạn có thể tìm các gói có sẵn của anh ta, khả dụng từ 2014 đến 2023 bao gồm các bản beta mới nhất.Mình đã nhiều lần khuyên anh ta chuyển sang **Nice10Point** nhưng anh ta cứ cười trừ thôi.

![](pic/revitapi.png)

**Navisworks** : Navis cũng là sản phẩm không ngoại lệ, mình đã chính thức hét lên ối dồi ôi vì không có thứ gì như Revit cả.Navis vẫn là một phần mềm rất tuyệt vời để bạn làm các công việc liên quan đến kiếm tra xung đột hoặc kiểm tra nhanh bất cứ thứ gì có trong mô hình.

![](pic/navisworks.png)

**Autocad** : Mặc dù nó đã có tuổi đời quá lớn so với những đồng đội cùng trang lứa nhưng đây là phần mềm không thể thiếu được.Cho dù bạn có chuyển sang làm gì đi chăng nữa thì chắc chắn **AutoCad** sẽ còn theo bạn trong một khoảng thời gian cả thập kỷ nữa. Chỉ có điều chúng hiện diện theo cách của công nghệ đám mây hiện đại mà thôi.

![](pic/acad.png)

**Civil3D** : Vẫn còn nhiều điều thú vị với phần mềm này mặc dù công việc của mình không liên quan lắm đến chúng, nhưng bạn bè mình và cộng đồng hỏi quá nhiều khiến mình phải support.Bạn chiến thì mình cũng chiến.

![](pic/civil3d.png)

**Dynamo** : Một công cụ lập trình trực quan, xu thế low code và no code ngày càng trở nên phổ biến, đây là sự kết hợp hoàn hảo giữa code, low code và no code.Chỉ vài năm nữa thôi, các lập trình viên tốt sẽ ít đi và nhường chỗ cho các kĩ sư nhiều hơn.Đó cũng là mặt tối sẽ có ở những phần sau của blog này.

![](pic/firefox_kZjqjGq51Y.png)

## Làm thế nào để duy trì nhiều phiên bản khi đã tải nuget

Đầu tiên bạn sẽ thấy các nuget được tải về có dạng phiên bản như sau : 

``` html
<ItemGroup>
	  <PackageReference Include="Chuongmep.Navis.Api.AdWindows" Version="2023.0.3" />
	  <PackageReference Include="Chuongmep.Navis.Api.Autodesk.Navisworks.Api" Version="2023.0.3" />
	  <PackageReference Include="Chuongmep.Navis.Api.Autodesk.Navisworks.Clash" Version="2023.0.3" />
	  <PackageReference Include="Chuongmep.Navis.Api.Autodesk.Navisworks.ComApi" Version="2023.0.3" />
	  <PackageReference Include="Chuongmep.Navis.Api.Autodesk.Navisworks.Takeoff" Version="2023.0.3" />
	  <PackageReference Include="Chuongmep.Navis.Api.navisworks.gui.roamer" Version="2022.0.2" />
	</ItemGroup>
```

Bây giờ để bảo trì các phiên bản khác nhau, công việc của bạn chỉ cần định nghĩa lại phiên bản tùy theo config ứng với mỗi phiên bản mà bạn đang làm.Như vậy thông tin nuget sẽ thay đổi thành `Version="$(NavisVersion).*" ` với  RevitVersion là biến bạn tạo để theo phiên bản.Như vậy thông tin định nghĩa trong csproj sẽ trở thành :

``` html
<ItemGroup>
	  <PackageReference Include="Chuongmep.Navis.Api.AdWindows" Version="$(NavisVersion).*" />
	  <PackageReference Include="Chuongmep.Navis.Api.Autodesk.Navisworks.Api" Version="$(NavisVersion).*" />
	  <PackageReference Include="Chuongmep.Navis.Api.Autodesk.Navisworks.Clash" Version="$(NavisVersion).*" />
	  <PackageReference Include="Chuongmep.Navis.Api.Autodesk.Navisworks.ComApi" Version="$(NavisVersion).*" />
	  <PackageReference Include="Chuongmep.Navis.Api.Autodesk.Navisworks.Takeoff" Version="$(NavisVersion).*" />
	  <PackageReference Include="Chuongmep.Navis.Api.navisworks.gui.roamer" Version="$(NavisVersion).*"/>
	</ItemGroup>
```
Hãy làm tương tự với các sản phẩm phần mềm khác của Autodesk.Nếu bạn đọc bài viết mà vẫn thấy mơ hồ thì hãy xem dự án <a href="https://github.com/chuongmep/NavisAddinManager/blob/3cc4f71b2b23f4efec4e2f1ccf657b1b93b07696/NavisAddinManager/NavisAddinManager.csproj#L68-L70" target="_blank">https://github.com/chuongmep/NavisAddinManager</a> , chúng được làm với cách như đã giới thiệu ở bài viết này.Bạn sẽ cảm thấy cuộc sống sẽ nhẹ nhàng hơn rất nhiều.

## Tôi không thể tải gói hoặc gói bị thiếu

Hãy kiểm tra lại phiên bản của bạn, các framework trên máy của bạn, đặt câu hỏi hoặc yêu cầu bên dưới phần bình luận.Tất nhiên mình và các developer cũng không thể làm hoàn hảo 100% được.

## Mở rộng 

Sử dụng nuget tuy nhìn bề ngoài có vẻ đơn giản nhưng để quản lý được chúng thì là cả một nghệ thuật.Hãy tiếp tục khám phá và nhảy vào nuget, chúc bạn có một ngày mới thật tốt đẹp.Hãy đón chờ các số sau với các phần hấp dẫn hơn.

Hôm nay có một bạn hỏi mình tại sao lại thích chia sẻ nhiều đến vậy?  Sao không giữ cho riêng mình ? 

`Trả lời` : Thành thật mà nói, mình không quan tâm nếu người khác sử dụng sản phẩm của mình để làm gì. Chia sẻ là quan tâm, là lưu trữ kiến thức, tổng kết lại. Thêm vào đó, hãy nhớ rằng kho báu của một người nào đó có thể là thùng rác của người khác.



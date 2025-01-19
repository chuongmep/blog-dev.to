
## Tổng quan

Tính từ thời điểm viết bài này thì [Autodesk Forge](https://aps.autodesk.com/blog/what-forge), một dịch vụ đám mây của Autodesk đã dịch chuyển sang một cái tên mới là [Autodesk Platform Services](https://aps.autodesk.com/) (APS).

Gần đây vào ngày 07/12/2022, **Autodesk** đã chính thức mở cửa [cho phép tài khoản miễn phí](https://aps.autodesk.com/blog/goodbye-cloud-credits-hello-flex-tokens) có quyền dùng các dịch vụ API nền tảng và chuyển sang thanh toán với Token Flex. Khi thời gian dùng thử 90 ngày kết thúc, bạn sẽ tự động được chuyển sang truy cập đầy đủ. Điều đó có nghĩa là bạn có thể truy cập tất cả các API của Forge để sử dụng cho mục đích thương mại (commercial). Điều đó đồng nghĩa với việc mở rộng cho phép bạn nghiên cứu hơn so với trước đây. Và việc sử dụng các API cao cấp, tính đến thời điểm này mình cũng chưa thể rõ ràng API nào là cao cấp và API nào là không cao cấp. Nhưng chắc chắn là những API sẽ yêu cầu bạn trả phí. Nhưng việc này giúp mình đủ can đảm để chia sẻ giúp người đọc có thể tự đăng ký miễn phí và theo dõi bài viết cho mục đích nghiên cứu.

## Tại sao nên sử dụng Forge?

Forge hay cái tên mới **Autodesk Platform Services** là một nền tảng cho phép dễ dàng truy cập vào dữ liệu mô hình ở các định dạng khác nhau như RVT, IFC, DWG, DWF, ... và có thể thực hiện các thao tác trên dữ liệu đó như đọc, ghi, xóa, sửa, ... thông qua các API của nó. Điển hình với một số dịch vụ như : 

- [Autodesk Forge Viewer](https://aps.autodesk.com/viewer-cover-page) : cho phép hiển thị thiết kế của bạn trong trình duyệt web. 

![](pic/v_1.png)

- [Autodesk Construction Cloud](https://aps.autodesk.com/acc-cover-page) : Tích hợp với nền tảng xây dựng thống nhất thông qua API điển hình như Rest API và GraphQL API.

![](pic/acc.gif)

- [Design Automation API](https://aps.autodesk.com/design-automation-api) : Sử dụng như một dịch vụ tự động hóa thiết kế.

![https://twitter.com/AutodeskAPS/status/1304674861978128384](pic/designautomation.jpeg)

- [Data Exchange](https://aps.autodesk.com/data-exchange-cover-page) : Trình kết nối trao đổi dữ liệu giữa các ứng dụng khác nhau.

![Data Exchange](pic/de-0.png)

## Forge tốt cho ai ?

- Những người muốn tìm hiểu về các API của Forge.

- Những người cần khai thác dữ liệu AEC trên quy mô lớn mà không cần truy cập vào các phần mềm thiết kế như Revit, AutoCAD, Navisworks, ...

- Công ty hoặc doanh nghiệp cần tạo ra hệ thống phân tích dữ liệu AEC liền mạch với BIM 360.

- Những người muốn tạo ra các ứng dụng trên nền tảng Forge.


## Khai thác mẫu dịch vụ BIM 360 API ? 

Ở bài viết lần trước <a href="https://chuongmep.com/ForgeAPI-Connect-Speckle" target="_blank">How To Connect Forge API With Speckle</a>  mình cũng đã trình bày khá rõ ràng cách bạn tạo tài khoản và sử dụng một vài Python API của Forge để kết nối đến **[Speckle](https://speckle.community/)** thông qua `FORGE_CLIENT_ID` và `FORGE_CLIENT_SECRET`. Hôm nay để dễ dàng hơn cho ví dụ sử dụng Autodesk Forge API với BIM 360, mình sẽ sử dụng một số API của Forge để khai thác dữ liệu mô hình BIM 360. Phần mềm trình bày mẫu sẽ là **Postman**. Postman là phần mềm trình bày API, cho phép bạn tạo các yêu cầu và trả lời API. Nó cũng cho phép bạn tạo các biến môi trường, các tập lệnh và các tập lệnh chạy thử. Bạn có thể tải Postman tại đây : <a href="https://www.postman.com/downloads/" target="_blank">https://www.postman.com/downloads/</a>

Chúng ta vẫn sử dụng ngôi nhà cũ của mình để tiếp tục cho công việc này. Nó giúp bạn dễ dàng đối chiếu và so sánh với bài viết <a href="https://chuongmep.com/Lidar-PointCloud-Speckle" target="_blank">Convert Point Cloud From LiDAR Mobile To Speckle</a> mô hình là tương tự. 

![](pic/firefox_OWTXjLz5L3.gif)


Lưu ý rằng để làm được theo bài viết này, bạn cần có tài khoản đã đăng ký BIM 360 và có quyền admin để khởi tạo trình kết nối đến Forge API.Và việc tiếp theo là bạn cần tạo ra các biến môi trường trên **Postman** thay vì tạo biến môi trường trên máy tính cục bộ.

![](pic/Postman_fAHyAHX4DC.png)

Tiếp theo bạn xác thực thông qua API <a href="https://developer.api.autodesk.com/authentication/v1/authenticate" target="_blank">https://developer.api.autodesk.com/authentication/v1/authenticate</a>. Các tham số đầu vào được liệt kê tại <a href="https://aps.autodesk.com/en/docs/oauth/v2/reference/http/authorize-GET/" target="_blank">https://aps.autodesk.com/en/docs/oauth/v2/reference/http/authorize-GET/</a>. Đó là bước khởi đầu để bạn có được một token để sử dụng các API khác của Forge. Bạn có thể xem qua một Post API trả về một `ascess_token` như sau :

![](pic/Postman_waO209p2sB.png)

Thông thường để chắc chắn đầu ra là xác thực thành công và gán vào `AccessToken` để sử dụng cho lần gọi API tiếp theo, chúng ta sẽ sử dụng thêm một số **Test** với mã `javascript` để liên kết cho các biến môi trường đã tạo, từ đó nhanh chóng thực hiện ở API tiếp theo. Nếu xác thực thanh công giá trị từ access_token sẽ được gán vào biến môi trường `AccessToken` và test sẽ trả về `true`. Nếu không thì test sẽ trả về `false` và dừng lại.

``` js
try {
    var jsonData = JSON.parse(responseBody);
    postman.setEnvironmentVariable("AccessToken", jsonData.access_token);
    tests["Access token request"] = true;
} catch (ex) {
    tests["Access token request"] = false;
    
     // Stop workflow
    postman.setNextRequest(null);
}

```

Hubs API bạn có thể hiểu nó như một hub của máy tính, nơi đầu tiên mà bên trong nó chứa các dự án và các lưu trữ khác.

![https://aps.autodesk.com/en/docs/data/v2/overview/basics](pic/entities_and_domains.png)

Để lấy về tất cả các hub, bạn sử dụng API <a href="https://developer.api.autodesk.com/project/v1/hubs" target="_blank">https://developer.api.autodesk.com/project/v1/hubs</a>  với các tham số tại  <a href="https://aps.autodesk.com/en/docs/data/v2/reference/http/hubs-GET" target="_blank">https://aps.autodesk.com/en/docs/data/v2/reference/http/hubs-GET</a> . Hãy lưu ý rằng bạn đã thêm Header `Authorization` để xác thực với giá trị `Bearer` và `AccessToken` đã lấy được từ API trước đó.

![https://aps.autodesk.com/en/docs/data/v2/overview/basics](pic/Postman_WmM7EPORJG.png)

Để dễ dàng cho kết nối đến API dự án, hãy tạo thêm một **Test** với **javascript** kết nối đến biến môi trường `Hub_Id` để lưu trữ giá trị trả về:

``` js
try {
    var jsonData = JSON.parse(responseBody);
    console.log("jsonData",jsonData.data[0].id);
    postman.setEnvironmentVariable("Hub_Id", jsonData.data[0].id);
    tests["Get Hub_Id request"] = true;
} 
catch (ex) {
     tests["Get Hub_Id request"] = false;
    postman.setNextRequest(null);
}
```
Với **Hub_Id** đã có bên trên, việc lấy về tất cả các dự án sẽ sử dụng thông qua API <a href="https://aps.autodesk.com/en/docs/data/v2/reference/http/hubs-hub_id-projects-GET/" target="_blank">https://aps.autodesk.com/en/docs/data/v2/reference/http/hubs-hub_id-projects-GET/</a>.

Lúc này bạn có thể dễ dàng xem hình bên dưới, `host` đã được gán vào biến môi trường thay cho `https://developer.api.autodesk.com` vì chúng lặp lại nhau ở mỗi API.

![](pic/POWERPNT_odmAalz6KY.png)

Tương tự bên trên, hãy tạo một phép gán cho biến môi trường `Project_Id` ở mục **Test** để lưu trữ giá trị trả về, tùy vào index của dự án bạn muốn lấy về mà thay đổi giá trị của `data[1].id`:

``` js
var jsondata = JSON.parse(responseBody);
var data = jsondata.data;
console.log(data);   
postman.setEnvironmentVariable("Project_Id",data[1].id);
```

Get Folder Contents là API sẽ cho phép bạn xem chính xác các thư mục bên trong hoặc dự án bên trong thư mục thông qua `ProjectId` và `FolderId` của thư mục bạn cần gọi. Ở đây bạn dễ dàng thấy được các thông tin dữ liệu của dự án, với Model Guid là trọng tâm, phiên bản sửa đổi,... Sử dụng API <a href="https://aps.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-folders-folder_id-contents-GET/" target="_blank">https://aps.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-folders-folder_id-contents-GET/</a> 

![](pic/GetFolderContent.png)

Đối với công việc tiếp theo của bạn, để đặt chân đến được siêu dữ liệu bao gồm đối tượng (object) và các thông tin (parameter) thuộc tính cỉa đối tượng (object), bạn cần phải lấy về được **urn** của mô hình. Hãy xem xét các đoạn json trả về và bạn sẽ thấy một đoạn tại `derivative` có chứa thông tin `urn` của mô hình.

![](pic/urn.png)

Đối với phiên bản, bạn cũng thể sử dụng API get <a href="https://aps.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-items-item_id-versions-GET" target="_blank">https://aps.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-items-item_id-versions-GET</a> để xem xét kỹ lưỡng và đối chiếu với phiên bản hiện có.

![](pic/POWERPNT_tPR9mFKOrL.png)

Việc lấy về danh sách các view của model đảm bảo rằng trước đó bản đã publish mô hình của mình với các set thiết lập từ trước, kết quả của danh sách này sẽ là thông tin của các view đã được xuất bản trước đó.

Bạn sử dụng API <a href="https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/metadata/urn-metadata-GET/" target="_blank">https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/metadata/urn-metadata-GET/</a> để xem xét và đối chiếu. Lưu ý rằng `guid` bạn cần lấy ra để sử dụng cho công việc lấy về thông tin đối tượng (object) hoặc thông tin tham số của mô hình (parameter). Tùy thuộc vào mỗi View (2D & 3D) bạn sẽ thấy có mỗi `guid` riêng biệt, và việc lấy thông tin đối tượng và tham số sẽ ảnh hưởng vào chính `guid` mà bạn sẽ truyền vào. Rất nhiều người đã nhầm lẫn guid này với `model guid` hoặc `project guid` nhưng đó là sai lầm không đáng có.

![](pic/POWERPNT_GYdbY3hHjm.png)

Nếu bạn đã đi được đến đây thì chắc chắn bạn đã nỗ lực hết mình để đạt được điều này và tiếp theo bạn sẽ bị dừng lại vì tài liệu hiện có không có phần này đối với bạn. Đó là trước khi bạn muốn lấy được thông tin đối tượng và các thuộc tính đối tượng, bạn phải translate sang svf/svf2. Đó là một chuyện rất khó hiểu với những người vừa mới tham gia vào Forge. Và điều đó sẽ xuất hiện một trả về 403 với chi tiết như `Forbidden`.

![](pic/firefox_S6SO4860ZI.png)

Hãy thực hiện với API <a href="https://aps.autodesk.com/en/docs/model-derivative/v2/reference/http/jobs/job-POST/" target="_blank">https://aps.autodesk.com/en/docs/model-derivative/v2/reference/http/jobs/job-POST/</a> trong đó urn chính là `urn` từ derivatives có được từ từ API <a href="https://aps.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-folders-folder_id-contents-GET/" target="_blank">https://aps.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-folders-folder_id-contents-GET/</a>.

Có hai loại định định dạng để translate là **svf** và **svf2** bạn có thể thay đổi giá trị và so sánh, hai loại định dạng này sẽ có hiệu suất và sự ổn định khác nhau, lời khuyên của mình là hãy sử dụng **svf** tại thời điểm này.

```json
{
    "input": {
        "urn": "{{urn}}"
    },
    "output": {
        "destination": {
            "region": "us"
        },
        "formats": [
            {
                "type": "svf",
                "views": [
                    "2d",
                    "3d"
                ]
            }
        ]
    }
}
```
Bạn có thể xem nhanh qua một ảnh chụp bên trong postman cho công việc này, nếu API này được đổi tên sang translate có lẽ sẽ không bị nhầm lẫn cho một số người.

![](pic/Postman_uJRbvV0WhR.png)

Hãy kiểm tra lại công việc một lần nữa với API <a href="https://aps.autodesk.com/en/docs/model-derivative/v2/reference/http/manifest/urn-manifest-GET/" target="_blank">https://aps.autodesk.com/en/docs/model-derivative/v2/reference/http/manifest/urn-manifest-GET/</a> để chắc chắn rằng quá trình translate của bạn là thành công. Dãy `urn` từ derivatives có được từ từ API <a href="https://aps.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-folders-folder_id-contents-GET/" target="_blank">https://aps.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-folders-folder_id-contents-GET/</a>.

![](pic/Postman_5p2DS6IQ9F.png)

Giờ thì bạn có thể thoải mái sử dụng API lấy về thông tin đối tượng có trong view với `guid` được trả về từ các view của quá trình publish dự án lên BIM 360. Kết quả của `guid` là từ API  <a href="https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/metadata/urn-metadata-GET/" target="_blank">https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/metadata/urn-metadata-GET/</a>

Bạn có thể nhanh chóng đối chiếu và xem quá các thuộc tính loại của đối tượng

![](pic/POWERPNT_otZsfELmW2.png)

Và điều cuối cùng hơn hết chính là các tham số của đối tượng đó. Điều này sẽ giúp bạn có thể xem xét và đối chiếu với các thông tin của đối tượng trong BIM 360. Hãy sử dụng API <a href="https://aps.autodesk.com/en/docs/acc/v1/overview/field-guide/model-properties/" target="_blank">https://aps.autodesk.com/en/docs/acc/v1/overview/field-guide/model-properties/</a> để lấy về toàn bộ thông tin thuộc tính của đối tượng có trong dự án, mẫu bên dưới cho phép bạn so sánh giữa Forge, Postman  và BIM 360, cả ba đều cho kết quả giống nhau với đối tượng là chiếc ghế mình đang ngồi làm việc.

![](pic/POWERPNT_EB1zcMYJUa.png)

Như vậy là mình đã giúp bạn giải quyết được tất cả các quy trình mà Autodesk Forge lấy thuộc tính đối tượng, thiệt là có chút gian nan nhưng cũng gọi là có thành quả. Đến đây thì chúng ta có thể nhận định được những gì sẽ tiếp tục viết dưới đây rồi.

## Tương lai của Forge (APS)

- Chắc chắn rằng trong những năm tiếp theo, chúng ta sẽ thấy sự diễn ra mạnh mẽ của hệ sinh thái bao quanh **APS** cũng như các ứng dụng và các trình kết nối đa dạng, một môi trường trao đổi dữ liệu chung tuyệt vời với sự hỗ trợ mạnh mẽ của các kỹ sư phần mềm và các chuyên gia trên toàn thế giới.

- Dịch vụ Autodesk Platform Services(APS) sẽ tiếp tục phát triển mà sẽ không dừng lại ở đó. Nhưng cần làm gì đó để cải thiện hiệu quả với các nhà phát triển. Việc triển khai tài liệu hướng dẫn nên có người kiểm tra và bảo trì chúng thường xuyên hơn. Và một điều đáng chú ý là việc cải thiện việc truy cập dữ liệu, cải thiện việc khai thác dữ liệu. Có thể nói đây là một trong những điểm mà mình thấy rất cần thiết.

- Tương lai của một dịch vụ lớn tất nhiên không phải do blog này quyết định mà chính là hệ sinh thái bao quanh nền tảng và người dùng cuối quyết định. Khi một hệ sinh thái đủ lớn và có các dịch vụ nền tảng đa dạng bao quanh và số lượng người dùng lớn thì đó là một nền tảng cực kỳ thành công.

## Tài liệu 

<a href="https://aps.autodesk.com/developer/documentation" target="_blank">https://aps.autodesk.com/developer/documentation</a>

## Mở rộng 

Vậy là tuần này, mình sẽ chính thức sở hữu sức mạnh của máy tính **Mac book Pro M1 14**, một chiếc máy tính xách tay mà mình nghĩ nó có ý nghĩa đối với mình và những người đam mê sức mạnh tính toán **GPU** của một chiếc laptop cho học máy và khoa học dữ liệu đẹp nhỏ gọn. Tất nhiên mình sẽ bắt đầu làm thử và nhảy múa với kiến trúc **ARM**, xem xét lại toàn bộ những video đánh giá trung thực trên youtube về **ARM** cho ngành **AEC** và việc kết nối máy ảo, đa nền tảng và các xung đột khác. Điều đó chắc chắn sẽ diễn ra trong vài tuần tới. [New iRhino 3D for iPad and iPhone ](https://www.rhino3d.com/ios/) là một tin hấp dẫn với người dùng IOS. Bạn có thể tải về tại <a href="https://apps.apple.com/us/app/irhino-3d/id373666504" target="_blank">https://apps.apple.com/us/app/irhino-3d/id373666504</a>   

![](pic/rhinoipad.png)

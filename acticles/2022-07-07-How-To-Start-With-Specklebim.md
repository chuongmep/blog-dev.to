
## Giới thiệu 

Trước đây khi thảo luận về chủ đề <a href="https://chuongmep.com/Top-Open-Source-In-AEC" target="_blank">Top Software Open Source In AEC</a> mình cũng đã nhắc qua một dự án tên `Speckle` được liệt kê vào trong top những dự án mã nguồn mở có ảnh hưởng vào thời điểm 2020. Sau hai năm, chúng ta hãy cùng nhìn lại một chút và thông qua bài viết này sẽ giúp bạn đi cụ thể liệu Speckle đã làm gì và chúng ta sẽ sử dụng Speckle như thế nào trong tương lai dưới góc nhìn của một người sử dụng và ủng hộ mã nguồn mở.

Đối với mình có cơ hội xem và hiểu được dự án từ lúc chớm nở đến thời điểm hiện tại nên cũng sẽ khái quát lại những gì chân thực nhất.

## Bắt đầu

Để hình dung về Speckle đã làm, đầu tiên hết chính là việc mang một mô hình 3D lên Web.

<iframe src="https://speckle.xyz/embed?stream=33c4891d20&commit=1a1552ea78&c=%5B11.48322%2C16.74051%2C21.56828%2C3.47623%2C1.21575%2C5.92654%2C0%2C1%5D" width="780" height="450" frameborder="0"></iframe>


Một số lợi thế đằng sau đó bao gồm: 

- [x] Dễ dàng truy xuất dữ liệu thông tin mô hình 3D.
- [x] Sử dụng hàng nghìn thư viện phân tích dữ liệu sẵn có.
- [x] Dễ dàng tích hợp vào các nền tảng.
- [x] Mã nguồn mở mang lại sự minh bạch rõ ràng trong ngành AEC
- [x] Lợi thế từ việc kết nối các nền tảng khác và có một môi trường trao đổi dữ liệu chung.
- [x] Tạo tài liệu hướng dẫn kết hợp phân tích dữ liệu : Đây là một điều chưa bao giờ có thể thấy trước đây, giờ đây mình có thể dễ dàng sử dụng Notion hoặc thậm chí là JupyterNotebook để trình bày một bảng phân tích lớn cho toàn bộ mô hình.
- [x] Tích hợp vào các hệ thống nội bộ.
- [x] Speckle là nền tảng dựa trên đối tượng đầu tiên cho ngành AEC.
- [x] Kiểm soát phiên bản.
- [x] ...

## Truy xuất thông tin dữ liệu mô hình

Chúng ta hãy thử nhìn vào một mẫu lấy về thông tin thuộc tính của từng đối tượng trong mô hinh, việc lấy thông tin chưa bao giờ là dễ dàng hơn vậy. Mô hình được phân chia và chia sẻ rõ ràng giữa các chế độ công khai và riêng tư, việc trao đổi và thiết lập chưa bao giờ có một sự trở ngại nào cho một lập trình viên.

Bên dưới mình đang dùng hai thư viện là `Speckle.Core` và `Speckle.Objects` bản 2.6.0 để lấy về thông tin của tường, cửa sổ, level, và tru xuất số lượng phần tử theo tầng.

```cs
// See https://aka.ms/new-console-template for more information

using System.Collections;
using Speckle.Core.Models;
using Speckle.Core.Api;

// Note: some boilerplate code removed.

// Receive a revit commit (note: you will need a local account on speckle.xyz for this to work!)
var data = Helpers.Receive("https://speckle.xyz/streams/33c4891d20/commits/1a1552ea78").Result;
var flatData = data.Flatten().ToList();

var timberWalls = flatData.FindAll(obj => obj is Objects.BuiltElements.Revit.RevitWall wall);

var windows = flatData.FindAll(obj => (string)obj["category"] == "Windows");


var rooms = flatData.FindAll(obj => obj is Objects.BuiltElements.Room);


// Note: to get only the unique levels, we need to de-duplicate them.
var levels = flatData.FindAll(obj => obj is Objects.BuiltElements.Level).Cast<Objects.BuiltElements.Level>().GroupBy(level => level.name).Select(g => g.First()).ToList();


var elementsByLevel = flatData.FindAll(obj => obj["level"] != null).GroupBy(obj => ((Base)obj["level"])["name"]);
foreach(var grouping in elementsByLevel) {
    Console.WriteLine($"On level {grouping.Key} there are {grouping.Count()} elements.");
}



public static class Extensions
{
    // Flattens a base object into all its constituent parts.
    public static IEnumerable<Base> Flatten(this Base obj)
    {
        yield return obj;

        var props = obj.GetDynamicMemberNames();
        foreach (var prop in props)
        {
            var value = obj[prop];
            if (value == null) continue;

            if (value is Base b)
            {
                var nested = b.Flatten();
                foreach (var child in nested) yield return child;
            }

            if (value is IDictionary dict)
            {
                foreach (var dictValue in dict.Values)
                {
                    if (dictValue is Base lb)
                    {
                        foreach (var lbChild in lb.Flatten()) yield return lbChild;
                    }
                }
            }

            if (value is IEnumerable enumerable)
            {
                foreach (var listValue in enumerable)
                {
                    if (listValue is Base lb)
                    {
                        foreach (var lbChild in lb.Flatten()) yield return lbChild;
                    }
                }
            }
        }
    }
}

```

Hãy thử xem kết quả trong quá trình gỡ lỗi. Rõ ràng, tất cả các thông tin chúng ta đều dễ dàng lấy được và dễ dàng truy xuất thông qua API, các đối tượng tường được lấy về toàn bộ thông tin thuộc tính cần thiết khi nhận dữ liệu chuyển đổi thuần tuý từ phần mềm Revit. Điều đặc biệt là việc lấy thông tin hoàn toàn là tương đối dễ dàng.

![](pic/rider64_iTKfe5catn.png)

Bên dưới là kết quả của việc truy xuất số lượng phần tử ứng với mỗi cao độ của toà nhà.Trước đây mình sử dụng [ifcopenshell](https://github.com/IfcOpenShell/IfcOpenShell) để có thể làm điều này nhưng bây giờ đối với mình chúng còn dễ dàng hơn bao giờ hết.

![](pic/LINQPad7_N0v254Nk7B.png)

Với [ifcopenshell](https://github.com/IfcOpenShell/IfcOpenShell)  trước đây sử dụng mô hình ifc, việc lấy thông tin và phân tích vẫn được tuy nhiên chúng khá khó khăn và không như speckle bây giờ.

![IFCOpenShell with google colab 2019](pic/171584079_10225198918586907_751267346907433106_n.jpg)

## Phân tích dữ liệu và học máy

Nếu dữ liệu có thể dễ dàng lấy được, việc sử dụng các thư viện bên thứ ba như numpy, pandas, matplotlib, tensorflow, scikit-learn,... là điều mà chúng ta mong chờ. Máy móc đang giúp cho chúng ta làm được những điều mà chúng ta chưa từng nghĩ trước đây như việc phỏng đoán gần đúng giá nhà, hoặc phỏng đoán tên phòng cho một dự án kiến trúc và trực quan hoá dữ liệu cụ thể. Chỉ một vài năm nữa thôi, chúng ta sẽ chứng kiến sự bùng nổ về phân tích dữ liệu trong ngành này khi có quá nhiều dữ liệu được lấp đầy.

![](pic/dataml.png)

## Đa nền tảng, đa kết nối

Với lợi thế nền tảng web mang lại, điều này đã mở rộng hơn cuộc chơi cho các nhà phảt triển đa nền tảng, không những vậy với trình kết nối Speckle, chúng ta đang trao đổi dữ liệu giữa các phần mềm bao gồm cả đóng và cả mở với nhau.

![](https://user-images.githubusercontent.com/2679513/132021739-15140299-624d-4410-98dc-b6ae6d9027ab.png)

Việc đa nền tảng vẫn chưa là cốt lõi bởi vì cốt lõi nhất vẫn là một môi trường trao đổi chứa thông tin dữ liệu thống nhất, rõ ràng điều này đang giải thích rằng, dữ liệu của chúng ta đang còn quá rời rạc và cần có một nền tảng có thể giúp thống nhất lại.Nếu bạn đã từng nghe qua mô hình dữ liệu tập trung và phân tán như github thì chắn hẳn speckle cũng tương tự. Speckle cho phép bạn tạo ra nhiều luồng tập trung dữ liệu tại một nơi và phân tán dữ liệu qua api hoặc đưa đến các phần mềm kết nối với mỗi người sử dụng.

![](pic/_Image_d700fb7f-53aa-49b8-9054-64dad3b9f1c9.png)

## Khả năng cộng tác thời gian thực

Nói đến [collaboration](https://speckle.systems/features/collaboration/) từ lâu đã trở thành nỗi ám ảnh không kém với ngành, việc cộng tác là một thứ không thể thiếu trong thời đại này, mang lại một lợi thế về năng suất và đường cong học tập nhóm lớn. Sẽ rất khác biệt nếu chúng ta làm việc cộng tác thay vì làm việc độc lập. Một số nền tảng đi đầu trong vấn đề này phải nói đó là Figma,Notion,Word Online ,... đến từ các nhà phát triển và các công ty lớn.

![](pic/collab2.png)

Việc thấy ai đó đang làm việc chung và bình luận về dự án là một phần xem trước cho điều này.

<iframe width="780" height="400" src="https://www.youtube.com/embed/RfJjLqtjBLY" title="Speckle Comments Preview" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Với [webhooks](https://speckle.guide/dev/server-webhooks.html), speckle hoàn toàn cho phép bạn tạo riêng một địa chỉ và dễ dàng nhận thông báo hoặc gửi thông báo qua một kênh như discord, slack, microsoft team ,...

## IFC với Speckle

IFC từ lâu đã trở thành tiêu chuẩn chung cho ngành, việc Speckle đã cho phép làm việc với mô hình <a href="https://speckle.guide/user/ifc.html#ifc-import-service" target="_blank">IFC</a>  là một điểm mạnh vô cùng to lớn.

![](pic/drag-drop-new-file.b51ebedf.gif)

## Speckle đối với hệ sinh thái mã nguồn mở.

Lợi thế từ mã nguồn mở với một cộng đồng được tạo ra từ Speckle là một lợi thế không thể chối cãi. <a href="https://speckle.community/" target="_blank">speckle.community</a> đã tạo ra một sân chơi trao đổi lớn mạnh không những giữa những chuyên gia mà còn là toàn bộ những ai đang tham gia vào quá trình thúc đẩy sự tiến bộ của ngành AEC.

## Tương lai của Speckle

Chắc chắc với sự phát triển và chớm nở về sân chơi mã nguồn mở trong ngành AEC, Speckle sẽ là một môi trường trao đổi dữ liệu chung lớn mạnh trong tương lai dài hạn.Đến thời điểm hiện tại, chúng ta vẫn rất khó để nói trước được điều gì nhưng tìm năng là có cho dự án này, cơ bản dự án này chỉ mới là một sử khởi đầu và vẫn còn rất nhiều thách thức phía sau đó.

Đây là một bài viết từ chính người trải nghiệm và làm việc với Speckle vì vậy công bằng mà nói, không có bất cứ trả phí hay lợi ích cá nhân nào cho bài viết này. Chúng đến từ lợi ích chung và mong muốn mở ra một tương lai tốt đẹp cho ngành AEC.


## Tài nguyên 

Tài nguyên ví dụ cho bài viết này được xuất bản tại <a href="https://github.com/chuongmep/SpeckleSample" target="_blank">https://github.com/chuongmep/SpeckleSample</a> 

Các hướng dẫn tổng quát đa ngôn ngữ sẽ được viết tại <a href="https://speckle.guide" target="_blank">https://speckle.guide</a> 

Đây là một bài viết thô vì bị giới hạn khá nhiều về mặt thời gian, sẽ có rất nhiều cập nhật sẽ bổ sung hoàn thiện phía sau.

<a href="https://speckle.systems" target="_blank">https://speckle.systems</a>

<a href="https://speckle.community" target="_blank">https://speckle.community</a>

<a href="https://speckle.xyz" target="_blank"> https://speckle.xyz</a>

<a href="https://speckle.works " target="_blank">https://speckle.works </a> 
    

## Giới thiệu

Bài viết hôm nay sẽ thử `hack` một chút bằng cách kiểm soát dữ liệu của các **Clash** kiểm tra từ **Navisworks** với các lược sử phiên bản được kiểm soát thông qua Speckle mà không gặp bất cứ sự cố nào. Chúng ta sẽ thử đi hết một vòng của dữ liệu xem thử chúng ta sẽ đi được đến đâu đối với dữ liệu. Đây là bài viết trong kì nghỉ lễ của mình, vì vậy cũng không có gì đảm bảo với bạn rằng đó là một hướng dẫn đầy đủ vì không có quá nhiều thời gian để kiểm tra lại.

Ý tưởng của bài viết **Hackathon** trong vòng một ngày lần này là: 

1. Chúng ta sẽ lưu trữ nhanh và kiểm soát các thông tin **Clash Test** : 

![](pic/Roamer_cgUItsyh86.png)

2. Chúng ta sẽ lưu trữ nhanh và kiểm soát các **Clash** trong **Clash Test** : 

![](pic/Roamer_uHd6UKA2i5.png)

3. Kiểm soát phiên bản của mỗi lần gửi dữ liệu để sử dụng cho tương lai. 

4. Sử dụng [Control Version](https://speckle.systems/features/versioning/) Speckle tìm và thể hiện thông tin của **Clash Test** và **Clash**.

![](pic/firefox_J5VVe6QV56.png)

5. So sánh sự khác nhau của các phiên bản sửa đổi.

## Bắt đầu

Để bắt đầu, đơn giản là bạn sẽ khởi tạo một dự án `Class Library` tạo ra một plugin [Navisworks](https://www.autodesk.ca/en/products/navisworks/overview) .NET với các gói phụ thuộc sau để nhanh chóng bắt đầu, phiên bản để kiểm tra cho bản hack này sử dụng navisworks 2023.0.6 và Speckle 2.11.0.

```xml
<PackageReference Include="Chuongmep.Navis.Api.Autodesk.Navisworks.Api" Version="2023.0.6" />
<PackageReference Include="Chuongmep.Navis.Api.Autodesk.Navisworks.Clash" Version="2023.0.6" />
<PackageReference Include="Speckle.Core" Version="2.11.0" />
<PackageReference Include="Speckle.Objects" Version="2.10.3" />
<PackageReference Include="System.Runtime.CompilerServices.Unsafe" Version="7.0.0-preview.2.22152.2" />
```
Thiết lập dự án phụ thuộc vào Net Framework 4.8 và định nghĩa một số phiên bản toàn cục cho dự án của bạn. Điều này đảm bảo việc sao chép đường dẫn bên dưới của bạn là chính xác.

```xml
 <PropertyGroup>
    <TargetFramework>net48</TargetFramework>
    <LangVersion>10</LangVersion>
    <NavisVersion>2023</NavisVersion>
    <Nullable>enable</Nullable>
</PropertyGroup>

```

Thiết lập cho đường dẫn Output của các Assembly đầu ra cho dự án của bạn 

```xml
 <ItemGroup>
    <OutFilesAssembly Include="$(ProjectDir)$(OutDir)**\*.*" />
</ItemGroup>
```

Tạo ra một tệp định nghĩa `PackageContents.xml` cho Navisworks Plugin của bạn, điều này cho phép phần mềm navisworks nhận diện được plugin của bạn đúng với phiên bản và đường dẫn lắp ráp đã định nghĩa. Ở đây bởi vì chỉ kiểm tra cho phiên bản 2023 nên chỉ cần định nghĩa một phần tử `Components` cho phiên bản 2023. Ngoài ra bạn cũng có thể định nghĩa thêm co các phiên bản khác của navisworks nếu có.

```xml
<?xml version="1.0" encoding="utf-8"?>
<ApplicationPackage >
    <Components Description="2023 parts">
        <RuntimeRequirements OS="Win64" Platform="NAVMAN|NAVSIM" SeriesMin="Nw20" SeriesMax="Nw20" />
        <ComponentEntry AppType="ManagedPlugin" ModuleName="./Contents/2023/NavisAddin.dll"/>
    </Components>
    <Components Description="2022 parts">
        <RuntimeRequirements OS="Win64" Platform="NAVMAN|NAVSIM" SeriesMin="Nw19" SeriesMax="Nw19"  />
        <ComponentEntry AppType="ManagedPlugin" ModuleName="./Contents/2022/NavisAddin.dll"/>
    </Components>
</ApplicationPackage>
```

Tiếp theo, bạn định nghĩa đường dẫn tự động sao chép vào thư mục plugin để tiện cho việc thường xuyên cập nhật mới, build, sửa đổi plugin của bạn. Các thiết lập bên dưới nhằm mục đích sao chép tự động các đầu ra của dự án của bạn vào thư mục plugin (SendDataSpeckle.bundle) của bạn bao gồm các tệp định nghĩa và toàn bộ các Assembly(*.dll, *.xml).

```xml
<PropertyGroup>
    <PackageDefined>$(ProjectDir)PackageContents.xml</PackageDefined>
    <BundleFolder>C:\ProgramData\Autodesk\ApplicationPlugins\SendDataSpeckle.bundle\</BundleFolder>
</PropertyGroup>
<Target Name="MakeMyDir" AfterTargets="Build">
    <MakeDir Directories="$(BundleFolder)" />
</Target>
<Target Name="CopyFiles" AfterTargets="Build">
    <Copy SourceFiles="$(PackageDefined)" DestinationFolder="$(BundleFolder)" />
    <Copy SourceFiles="@(OutFilesAssembly)" DestinationFolder="$(BundleFolder)Contents\$(NavisVersion)\%(RecursiveDir)" />
</Target>
```
Nếu toàn bộ quá trình bên trên có thể giúp bạn tạo ra một đầu ra thư mục hướng đến vị trí trông như thế này thì bạn hãy thực hiện đên bước tiếp theo.

![](pic/explorer_W22wqjH7yX.png)

## Lấy dữ liệu từ Navisworks

Trước tiên lấy dữ liệu, chúng ta cần suy nghĩ về thiết kế một chút, đây là sơ đồ tuần tự hoá mà chúng ta sẽ triển khai nhanh trong dự án demo lần này, Plugin làm nhiệm vụ đưa dữ liệu Clash và Clash Test lên Speckle Server, sau đó chúng ta sẽ sử dụng Blazor để hiển thị dữ liệu đó, bạn có thể sử dụng bất cứ Framework nào khác như Angular, React, Vue, … để hiển thị dữ liệu sau này nếu cần. Model sẽ lưu trữ các lớp chung để chuyển đổi dữ liệu ngược lại từ Server về App.

![](pic/firefox_TzaK9otKzu.png)


Bây giờ chúng ta hãy nhanh chóng khởi tạo cho mình một luồng (Stream) từ Speckle để đưa dữ liệu lên. Việc khởi tạo chưa bao giờ là đơn giản như vậy, công việc của bạn chỉ cần làm là tạo mới một tài khoản, truy cập vào <a href="https://speckle.xyz/" target="_blank">speckle.xyz</a> và thực hiện khởi tạo nhanh cho mình một stream như hình dưới đây.

![StreamId : 14568be237](pic/firefox_W0GOGYCJH6.png)

Lưu ý rằng, hãy ghi nhớ các thông tin quan trọng về stream như `Stream Id` để chúng ta có thể sử dụng trong plugin navisworks và gửi dữ liệu từ navisworks lên Speckle.

![](pic/streamid.png)

Và giờ đây, việc của bạn ngay lúc này đây chính là hãy bắt đầu định nghĩa lại một số lớp để lưu trữ dữ liệu tương tự như cách mà bảng navisworks đã thể hiện trong phần mềm. Ở đây mình sẽ khởi tạo lại hai lớp tương đối đơn giản bao gồm định nghĩa cho clash và Clash Test bên trong `Model`.

```cs
using System;
using System.Collections.Generic;
using Speckle.Core.Models;
namespace ClashModel;

public class ClashTest : Base
{
    public string Name { get; set; }
    public string Guid { get; set; }
    public string Status { get; set; }
    public int ClashCount { get; set; }
    public DateTime? LastRun { get; set; }
    public List<Clash> Clashes { get; set; } = new List<Clash>();
}

public class Clash : Base
{
    
    public string Name { get; set; }
    public string Status { get; set; }
    public string Level { get; set; }
    public string GridIntersect { get; set; }
    public double Distance { get; set; }
    public string Guid { get; set; }
}

```
Việc lấy về thông tin dữ liệu phải đảm bảo rằng dự án bạn đang mở có các clash test và clash được tạo ra, nếu không thì bạn sẽ không thể lấy được dữ liệu. Sau đó, chúng ta sẽ sử dụng một số hàm để lấy dữ liệu từ navisworks và đưa lên Speckle Server.

Đầu tiên, để Navisworks hiểu được một class định nghĩa là một plugin, bạn cần khởi tạo một `class` và đi kèm các thuộc tính cho `class` như sau:

```cs
[PluginAttribute("MyPlugin", "ChuongMep",DisplayName = "Send Clash Speckle", ToolTip = "Send Clash Data Control To Speckle")]
public class HelloWorld : AddInPlugin
{
    public override int Execute(params string[] parameters)
    {
        //Code Here
        MessageBox.Show("Hello World",Application.Title);
        return 0;
    }
}
```
Bây giờ bạn hãy thử build lại, khởi động navisworks và kiểm tra, nếu navisworks 2023 thể hiện như hình bên dưới là bạn đã thành công trong việc tạo ra một plugin đơn giản cho navisworks.

![](pic/Roamer_JMZXpr7ZWe.png)

Lấy thông tin dữ liệu cho Clash Test và Clash. Sử dụng công cụ <a href="https://github.com/chuongmep/NavisAppInfo" target="_blank">NavisAppInfo</a> bạn có thể kiểm tra nhanh rằng việc lấy `clashresult` clash test dựa vào hai thư viện API của navisworks là :

```
Autodesk.Navisworks.Api.Clash
Autodesk.Navisworks.Api.Clash
```

![](pic/Roamer_x4D4lEsx9T.png)

Như vậy chúng ta có thể viết đại loại như thế này để  lấy về thông tin các clash test và clash.

```cs
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Windows.Forms;
using Autodesk.Navisworks.Api;
using Autodesk.Navisworks.Api.Clash;
using Autodesk.Navisworks.Api.Plugins;
using ClashModel;
using Speckle.Core.Api;
using Speckle.Core.Credentials;
using Speckle.Core.Models;
using Speckle.Core.Transports;
using Application = Autodesk.Navisworks.Api.Application;
using ClashTest = ClashModel.ClashTest;
private List<Clash> GetClashData(Autodesk.Navisworks.Api.Clash.ClashTest clashTest)
{
    List<Clash> clashes = new List<Clash>();
    List<ClashResult?> clashResults = new List<ClashResult?>();
    SavedItemCollection itemCollection = clashTest.Children;
    if (!itemCollection.Any()) return clashes;
    foreach (SavedItem savedItem in itemCollection)
    {
        if (savedItem == null) continue;
        if (savedItem is ClashResultGroup g)
        {
            clashResults.AddRange(g.Children.Select(item => (ClashResult) item));
        }

        if (savedItem is ClashResult)
        {
            clashResults.Add(savedItem as ClashResult);
        }
    }

    clashResults.ForEach(x => clashes.Add(SetClashInfo(x)));
    return clashes;
}
Clash SetClashInfo(ClashResult? clashResult)
{
    Clash clash = new Clash()
    {
        Name = clashResult.DisplayName,
        Status = clashResult.Status.ToString(),
        Distance = clashResult.Distance,
        Guid = clashResult.Guid.ToString(),
        Level = GetLevel(clashResult) ?? String.Empty,
        GridIntersect = GetGridIntersect(clashResult) ?? String.Empty,
    };
    return clash;
}
```

Do thông tin Level và GridIntersect không có sẵn trong `ClashResult` nên chúng ta phải tạo thêm một số hàm để lấy thông tin này. Con số 0.3048 là đơn vị đo chuyển đổi thực tế với dự án hiện tại của navisworks trên máy mình, bạn có thể thay đổi nó tùy theo đơn vị đo của bạn.

```cs
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Windows.Forms;
using Autodesk.Navisworks.Api;
using Autodesk.Navisworks.Api.Clash;
using Autodesk.Navisworks.Api.Plugins;
using ClashModel;
using Speckle.Core.Api;
using Speckle.Core.Credentials;
using Speckle.Core.Models;
using Speckle.Core.Transports;
using Application = Autodesk.Navisworks.Api.Application;
using ClashTest = ClashModel.ClashTest;
private string GetGridIntersect(ClashResult? clashResult)
{
    if (clashResult == null) return String.Empty;
    GridSystem gridSystem = Autodesk.Navisworks.Api.Application.ActiveDocument.Grids.ActiveSystem;
    if (gridSystem != null)
    {
        GridIntersection oGridIntersection = gridSystem.ClosestIntersection(clashResult.Center);
        if (oGridIntersection != null)
            return oGridIntersection.FormatIntersectionDisplayString(clashResult.Center, 0.3048) ??
                    String.Empty;
    }

    return String.Empty;
}

private string GetLevel(ClashResult? clashResult)
{
    if (clashResult == null) return String.Empty;
    GridSystem gridSystem = Autodesk.Navisworks.Api.Application.ActiveDocument.Grids.ActiveSystem;
    if (gridSystem != null)
    {
        GridIntersection oGridIntersection = gridSystem.ClosestIntersection(clashResult.Center);
        if (oGridIntersection != null)
            return oGridIntersection.Level.DisplayName ?? String.Empty;
    }

    return String.Empty;
}
```

Vì một vấn đề phát sinh với việc tải các assembly nên bạn cần thêm `CurrentDomain_AssemblyResolve` vào dưới hàm thực thi để tải được assembly `System.Runtime.CompilerServices.Unsafe`

```cs
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Windows.Forms;
using Autodesk.Navisworks.Api;
using Autodesk.Navisworks.Api.Clash;
using Autodesk.Navisworks.Api.Plugins;
using ClashModel;
using Speckle.Core.Api;
using Speckle.Core.Credentials;
using Speckle.Core.Models;
using Speckle.Core.Transports;
using Application = Autodesk.Navisworks.Api.Application;
using ClashTest = ClashModel.ClashTest;
public override int Execute(params string[] parameters)
{
    try
    {
        AppDomain.CurrentDomain.AssemblyResolve +=
            new ResolveEventHandler(CurrentDomain_AssemblyResolve);
        SQLitePCL.Batteries.Init();
        // Do something with send data
    }
    catch (Exception e)
    {
        MessageBox.Show(e.ToString());
    }

    return 0;
}
Assembly? CurrentDomain_AssemblyResolve(object sender, ResolveEventArgs args)
{
var name = new AssemblyName(args.Name);
if (name.Name == "System.Runtime.CompilerServices.Unsafe")
{
return typeof(System.Runtime.CompilerServices.Unsafe).Assembly;
}
return null;
}
```

Hàm `RunProcess` sẽ cho phép bạn gửi nhanh một danh sách các clash test lên Speckle Server với tài khoản mặc định thông qua việc bạn đã cài đặt <a href="https://speckle.guide/user/manager.html" target="_blank">Manager for Speckle</a> và đăng nhập trước đó, nếu không, bạn có thể tạo riêng cho mình một token và thay thế  `Account defaultAccount = AccountManager.GetDefaultAccount();` bằng một định nghĩa `Account` mới với [token](https://speckle.guide/dev/tokens.html) thiết lập. 

Bên dưới sẽ sử dụng cách mặt định để Demo cho bài viết này. Vì đây là một [thread](https://learn.microsoft.com/en-us/dotnet/standard/threading/using-threads-and-threading) khá nguy hiểm nên cân nhắc một Try Catch để bắt lỗi. Cơ bản Navisworks là một chương trình đã cũ và sẽ rất hạn chế với các xử lý có đa luồng, nên việc sử dụng `async` và `await` sẽ giúp bạn giảm thiểu tối đa việc bị treo chương trình.

```cs
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Windows.Forms;
using Autodesk.Navisworks.Api;
using Autodesk.Navisworks.Api.Clash;
using Autodesk.Navisworks.Api.Plugins;
using ClashModel;
using Speckle.Core.Api;
using Speckle.Core.Credentials;
using Speckle.Core.Models;
using Speckle.Core.Transports;
using Application = Autodesk.Navisworks.Api.Application;
using ClashTest = ClashModel.ClashTest;
private async Task<string> RunProcess(string streamId, List<ClashTest> clashTests)
{
    // define the base object
    Account defaultAccount = AccountManager.GetDefaultAccount();
    var client = new Client(defaultAccount);
    string branchName = "main";
    var branch = client.BranchGet(streamId, branchName).Result;
    ServerTransportV2 transport = new ServerTransportV2(defaultAccount, streamId);
    Base data = new Base();
    data["ClashTests"] = clashTests;
    try
    {
        var objectId = await Operations.Send(data, new List<ITransport>() {transport});
        var commitId = await client.CommitCreate(
            new CommitCreateInput
            {
                streamId = streamId,
                branchName = branch.name,
                objectId = objectId,
                message = $"Send {clashTests.Count} clashes test from Navisworks",
                sourceApplication = "Navisworks",
                totalChildrenCount = clashTests.Count,
            });
        return commitId;
    }
    catch (Exception e)
    {
        MessageBox.Show(e.ToString());
    }
    return null;
}
```

Như vậy, mỗi lần hàm **RunProcess** được chạy, trên speckle sẽ tạo ra một `Commit` mới tương ứng với dữ liệu mới mà bạn đã gửi lên và trả về kết quả Id của commit đó.

Ngay lúc này đây, công việc của bạn tiếp theo là hãy nhảy vào hàm thực thi (Execute) của navisworks và đưa các thư viện Speckle vào, kết nối với Stream đã tạo và tiến hành gửi dữ liệu lên Speckle server. Hãy thay thế `streamId` với biến được định nghĩa bằng `streamId` của bạn đã tạo trước đó. Việc định nghĩa `Progress` bên trong hàm execute cho phép bạn theo dõi tiến trình gửi dữ liệu cho đỡ nhàm chán, ngoài ra chúng không có ý nghĩa gì thêm.

```cs
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Windows.Forms;
using Autodesk.Navisworks.Api;
using Autodesk.Navisworks.Api.Clash;
using Autodesk.Navisworks.Api.Plugins;
using ClashModel;
using Speckle.Core.Api;
using Speckle.Core.Credentials;
using Speckle.Core.Models;
using Speckle.Core.Transports;
using Application = Autodesk.Navisworks.Api.Application;
using ClashTest = ClashModel.ClashTest;

public override int Execute(params string[] parameters)
{
try
{
    AppDomain.CurrentDomain.AssemblyResolve +=
        new ResolveEventHandler(CurrentDomain_AssemblyResolve);
    SQLitePCL.Batteries.Init();
    List<ClashTest> clashes = new List<ClashTest>();
    Progress progressBar = Application.BeginProgress("Send to Speckle.");
    DocumentClash documentClash = Application.ActiveDocument.GetClash();
    if(documentClash.TestsData==null || documentClash.TestsData.Tests.Count==0) return 0;
    foreach (var savedItem in documentClash.TestsData.Tests)
    {
        if (savedItem == null) continue;
        var clash = (Autodesk.Navisworks.Api.Clash.ClashTest) savedItem;
        clashes.Add(new ClashTest()
        {
            Name = clash.DisplayName,
            Status = clash.Status.ToString(),
            ClashCount = clash.Children.Count,
            Guid = clash.Guid.ToString(),
            LastRun = clash.LastRun,
            Clashes = GetClashData(clash) ?? new List<Clash>(),
        });
    }

    progressBar.Update(0.5);
    if (progressBar.IsCanceled)
    {
        return 0;
    }
    // change to your StreamId Created
    string streamId = "14568be237";
    string commitId = Task.Run(() => RunProcess(streamId, clashes)).Result;
    progressBar.Update(1);
    Application.EndProgress();
    progressBar.Dispose();
    DialogResult dialogResult = MessageBox.Show("Done. Do you want open in speckle?", "Sent to Speckle",
        MessageBoxButtons.YesNo,
        MessageBoxIcon.Information);
    if (dialogResult == DialogResult.Yes)
        Process.Start($"https://speckle.xyz/streams/{streamId}/commits/{commitId}");
}
catch (Exception e)
{
    MessageBox.Show(e.ToString());
}

return 0;
}
```

Chúng ta hãy thử quay lại Navisworks và thực hiện công việc gửi dữ liệu đầu tiên lên Speckle, Việc gửi chỉ mất vài giây để hoàn tất. bạn có thể nhấn đồng ý để đi đến nhanh một Commit tương ứng với một version mà bạn đã gửi lên Speckle.

![](pic/Roamer_0PkdRVz5C5.gif)

Và với mỗi lần gửi , giờ đây bạn đã có thể kiểm tra nhanh chóng toàn bộ các phiên bản được gửi thông qua Stream của Speckle. Nhiệm vụ của chúng ta tiếp theo sẽ là làm sao để lấy được các thông tin từ Commit cuối cùng đó trên App.

![](pic/firefox_vDgVAb5n5p.png)

## Khởi tạo App

Việc tạo ra một app để lấy dữ liệu ngay lúc này bạn hoàn toàn có thể làm với vô số công nghệ. Ở bài viết này, chúng ta sẽ đi với **Blazor** để lấy dữ liệu Demo cho bạn nhanh với kiến trúc đã dựng lên mà không phải suy nghĩ quá nhiều về công nghệ lựa chọn, bạn có thể lựa chọn bất cứ Framework nào mà bạn muốn để thực hiện như ASP.NET MVC, ASP.NET Core, Angular, React, Vue, ….

Hiệu suất của [Blazor](https://csharp-wasm-benchmark.acmion.com/) phải nói là đáng kinh ngạc so với những gì nó có, và với ví dụ này khi sử dụng Blazor bạn cũng không cần phải viết lại Model ở phía client nữa. Đây đúng là tương lai phát của web về hiệu suất.

![](pic/firefox_figUvoj6KL.png)

Hãy tạo ra nhanh một Class `SpeckleServices.cs` để lấy về dữ liệu commit cuối cùng của Stream từ Speckle, lưu ý rằng bạn cần tạo ra cho mình một [Token](https://speckle.guide/dev/tokens.html) bên trong `https://speckle.xyz/profile` để có thể truy cập vào Stream của mình. Bên dưới hãy thay thế `streamId` và `token` của bạn vào đoạn code. Nếu nhánh thay đổi hãy thay đổi để phù hợp với commit hiện có của bạn trên Speckle Server.

```cs
using Speckle.Core.Api;
using Speckle.Core.Credentials;

namespace ClashBlazorApp.Data;

public class SpeckleServices
{
    public async Task<string> GetLatestCommit()
    {
        // replace with your stream id
        var streamId = "14568be237";
        var branchName = "main";
        Account Account = new Account()
        {
            // replace with your token
            token = "7538e4c3aa5c2763217408a0d0d46c5c72574d2b85",
        };
        Account.serverInfo = new ServerInfo
        {
            url = "https://speckle.xyz/"
        };
        //Account defaultAccount = AccountManager.GetDefaultAccount();
        Client client = new Client(Account);
        if (client == null) throw new ArgumentException(nameof(client));
        var branch = client.BranchGet(streamId, branchName, 1).Result;
        if(branch == null) throw new ArgumentException(nameof(branch));
        // take last object commit
        if(branch.commits.totalCount<=0) return await Task.FromResult(String.Empty);
        var objectId = branch.commits.items[0].referencedObject; 
        if(objectId == null) throw new ArgumentException(nameof(objectId));
        string url = $"https://speckle.xyz/objects/{streamId}/{objectId}";
        return await Task.FromResult(url);
    }
}
```

Khởi tạo cho mình một lớp `SpeckleObject.cs` Speckle data để lấy dữ liệu trả về từ Json. Hãy xem qua mô tả định dạng bạn đã gửi lên Speckle.

![](pic/notepad++_2HCd32nCCT.png)

Vậy là kế hoạch là chúng ta sẽ `Standardize` dữ liệu json của mình về một lớp `SpeckleData` danh sách và lấy các `ClashTests` từ đó.

```cs
using ClashModel;
using Speckle.Core.Models;

namespace ClashBlazorApp.Data;

public class SpeckleData  :Base
{
    public List<ClashTest> ClashTests { get; set; }
}
```

Tiếp theo hãy tạo tạo ra một lớp dịch vụ `ClashServices.cs` để lấy dữ liệu `Clash` về từ Speckle Server.

```cs
using ClashModel;
using Speckle.Newtonsoft.Json;

namespace ClashBlazorApp.Data;

public  class ClashServices
{
    public async Task<ClashTest[]?> GetClashDataAsyn()
    {
        string lasturl = new SpeckleServices().GetLatestCommit().Result;
        var  client =  new  HttpClient();
        var  response = await client.GetAsync( lasturl );
        var  jsonstring = await response.Content.ReadAsStringAsync();
        var  speckleData = JsonConvert.DeserializeObject<List<SpeckleData>>(jsonstring)!;
        return speckleData.FirstOrDefault()!.ClashTests.ToArray();
    }

    public static void SetData()
    {
        //TODO
        throw new NotImplementedException();
    }
}
```

Tại thư mục `Pages`, chúng ta hãy khởi tạo mới một trang `FetchClashTest.razor` để thể hiện dữ liệu lấy từ Clash Test dưới dạng bảng.

``` cs
@page "/fetchclashtest"
@using ClashModel
@using ClashBlazorApp.Data
@using BlazorBootstrap;
<PageTitle>Clash Test</PageTitle>

<h1>Clash Test Data</h1>

<p>This component demonstrates fetching data from Speckle</p>

@if (ClashDatas == null)
{
    <p>
        <em>Loading...</em>
        <ProgressBar Width="20" Label="20%"/>
    </p>
}
else
{
    <table class="table">
        <thead>
        <tr>
            <th>Clash Name</th>
            <th>Guid</th>
            <th>Clash Count</th>
            <th>Status</th>
            <th>LastRun</th>
        </tr>
        </thead>
        <tbody>
        @foreach (var clashTest in ClashDatas)
        {
            <tr>
                <td>@clashTest.Name</td>
                <td>@clashTest.Guid</td>
                <td>@clashTest.ClashCount</td>
                <td>@clashTest.Status</td>
                <td>@clashTest.LastRun</td>
            </tr>
        }
        </tbody>
    </table>
}

@code {
    private ClashTest[]? ClashDatas;

    protected override async Task OnInitializedAsync()
    {
        ClashServices clashServices = new ClashServices();
        ClashTest[]? clashes = await clashServices.GetClashDataAsyn();
        ClashDatas = clashes;
    }
}
```

Bây giờ thì khi bạn khởi chạy App lần đâu tiên, toàn bộ thông tin về Test của bạn sẽ được hiển thị bên trên App. Bạn có thể thử so sánh lại với kết quả từ phía navisworks

![](pic/firefox_Crus5u8fFr.png)

Tương tự như vậy hãy tạo ra một trang mới `FetchClash.razor` để thể hiện dữ liệu lấy từ Clash Test dưới dạng bảng.

```cs
@page "/fetchclash"
@using ClashModel
@using ClashBlazorApp.Data
<h3>Test</h3>
<h1>Clash Data</h1>

<p>This component demonstrates fetching latest clash data from Speckle</p>

@if (ClashDatas == null)
{
    <p>
        <em>Loading...</em>
    </p>
}
else
{
    <table class="table" datapagesize="10">
        <thead>
        <tr>
            <th>Clash Name</th>
            <th>Guid</th>
            <th>Status</th>
            <th>Distance</th>
        </tr>
        </thead>
        <tbody>
        @foreach (var clashTest in ClashDatas)
        {
            <tr>
                <td>@clashTest.Name</td>
                <td>@clashTest.Guid</td>
                <td>@clashTest.Status</td>
                <td>@clashTest.Distance</td>
            </tr>
        }
        </tbody>
    </table>
}

@code {
    private Clash[] ClashDatas;

    protected override async Task OnInitializedAsync()
    {
        ClashServices clashServices = new ClashServices();
        ClashTest[]? clashTests = await clashServices.GetClashDataAsyn();
        List<Clash>[] clashes = clashTests.Select(x=>x.Clashes).ToArray();
        List<Clash> clashesList = new List<Clash>();
        foreach (List<Clash> clash in clashes)
        {
            clashesList.AddRange(clash);
        }
        ClashDatas = clashesList.ToArray();
    }

}
```

Kết quả hiển thị cũng sẽ tương ứng với các Clash đang có trong Navisworks của bạn.

![](pic/firefox_DvZDkvN0gF.png)

Bạn có thể xem qua cách mà chúng ta gửi dữ liệu và xem kết quả từ app trong thời gian thực thông qua Speckle Server. Ở đây mình sẽ thử xoá một vài test để kiểm tra kết quả.

![](pic/hLmSIe8IYM.gif)
## Trực quan hoá dữ liệu

Để trực quan hoá dữ liệu ở thời điểm này, đối với các kỹ sư thì PowerBi chính là tuyệt vời nhất, bạn có thể nhanh chóng trực quan hoá dữ liệu Clash của mình và trình bày một cách hiệu quả, đối với bài viết này vì vấn đề thời gian nên sẽ chỉ cho bạn cách tương tác và làm việc với Speckle sau khi đã đẩy các dữ liệu mong muốn mà bạn có lên Speckle Server.

Đầu tiên bạn cần cài đặt một trình PowerBi Desktop, sau đó bạn cài đặt một tiện ích mở rộng từ Speckle tại <a href="https://github.com/specklesystems/speckle-powerbi/releases" target="_blank">speckle-powerbi</a> và đưa vào vị trí : 

Tệp `Speckle.mez` sẽ được sao chép đến vị trí này.
```bash
`C:\Users\{username}\Documents\Power BI Desktop\Custom Connectors`
```
Tiếp theo bạn vào Option và tuỳ chỉnh lại quyền cho phép tiện ích mở rộng Speckle được sử dụng.

![](pic/PBIDesktop_ERxWwNSvt5.png)

Bây giờ là từng bước khi bạn nhập xong Url thông qua Get Data, bạn tiến hành tìm từ khoá Speckle

![](pic/PBIDesktop_b3W8kfLskp.png)

Sau đó chọn connect và dán địa chỉ commit cuối cùng mà bạn đã tải lên vào. Nếu địa chỉ của bạn là riêng tư, bạn cần làm thêm một bước xác thực trước khi tuần tự hoá lại dữ liệu Clash Test.

![](pic/PBIDesktop_xDnCUWKgbS.png)

Đối với Clash Test : Sources => Convert Clash Test To Table => Expand Column => Rename Table To ClashTest

![](pic/PBIDesktop_MU2FLe4hX7.png)

Đối với Clash : From Clash Test Table => Select Row Clashes => As new Query => Convert List To Table => Expand New Row => Expand Column => Rename Table To Clashes

![](pic/PBIDesktop_vOOBjCmX3U.png)

Sau khi hoàn tất, bây giờ bạn có thể thoải mái tuỳ chỉnh dữ liệu trên **PowerBI** phụ thuộc vào nhu cầu của bạn. Mình cũng thử thêm vào một số thông tin để hiển thị khả năng trước.

![](pic/PBIDesktop_EzKgQEhu9l.gif)

## Phân tích dữ liệu nâng cao 

Để phân tích dữ liệu chuyên sâu, lúc này có vẻ power bi vẫn chưa đủ với những người thích phân tích dữ liệu, chúng ta hãy cùng chơi với một số thư việc phân tích dữ liệu tuyệt vời với khoa học dữ liệu như numpy, pandas, seaborn hay matplotlib.

Để làm được việc này, trước hết bạn hãy cài đặt các gói cần thiết để phân tích dữ liệu trước và bao gồm cả thư viện specklepy để lấy dữ liệu từ Speckle Server. Do bài viết này thực hiện dưới jupyter notebook nên mình sẽ sử dụng lệnh `!` để thực thi lệnh trong jupyter notebook.

```bash
!pip install specklepy --upgrade
!pip install numpy --upgrade
!pip install pandas --upgrade
!pip install seaborn --upgrade
!pip install matplotlib --upgrade
```

Bây giờ điều đầu tiên là chúng ta sẽ tạo ra một xác thực từ phía máy chủ Speckle như chúng ta đã làm ở trên. Để làm được điều này, chúng ta sẽ sử dụng thư viện `specklepy` và hàm `authenticate_with_token` để xác thực. Ngoài ra bạn cũng có thể sử dụng hàm `get_default_account` trong trường hợp bạn đã có trinh quản lý Speckle và đăng nhập duới máy.

```py 
from specklepy.api.client import SpeckleClient
from specklepy.api.credentials import get_default_account
# replace with your host
host = "https://speckle.xyz/"
client = SpeckleClient(host=host)
# replace with your token
token = "2c502e6c05d55ed80942583c6fa6775f96db91ee1e"
client.authenticate_with_token(token=token)
```
Lấy về Stream và dữ liệu từ Speckle Server

```py
from specklepy.transports.server import ServerTransport
# replace with your stream id
streamId = "14568be237"
# get your stream from id
stream = client.stream.get(id=streamId)
# create transport to get data from stream 
transport = ServerTransport(client=client, stream_id=streamId)
transport
```
Kết quả :

``` bash
ServerTransport(url='https://speckle.xyz', stream_id='14568be237', account=Account(email: chuongpqvn@gmail.com, server: https://speckle.xyz, isDefault: True), saved_obj_count=0, session=<requests.sessions.Session object at 0x00000227E7CEC7C0>, _batch_sender=<specklepy.transports.server.batch_sender.BatchSender object at 0x00000227E7CECBE0>)
```

Tiếp theo chúng ta sẽ lấy về điểm cuối phiên bản mà chúng ta đã đẩy dữ liệu lên, vị trí index thứ 0 đồng nghĩa với việc lấy về commit mới nhất từ stream đó. Và để đảm bảo chắc chắn điều này, bạn có thể nhanh chóng sử dụng cách như sau để kiểm tra với ngày đã được commit lên.

```py
from specklepy.api import operations
commits = client.commit.list(stream_id=streamId)
for i in commits:
    print(i.createdAt)
```

Như vậy rõ ràng, vị trí đầu tiên chính là commit mới nhất, mã bên dưới đây sẽ cho phép bạn lấy về commit mới nhất từ stream đó và lấy về dữ thiệu thông qua tuần tự hoá dữ liệu.

```py
from specklepy.api import operations
commit = client.commit.list(stream_id=streamId)[0]
print(commit)
received_base = operations.receive(commit.referencedObject, remote_transport=transport)
received_base
```
Kết quả : 
```bash
Commit( id: 92afa8cd3f, message: Send 6 clashes test from Navisworks, referencedObject: afc8470062c5fa4fe96aa8bba1049797, authorName: Hồ Văn Chương, branchName: main, createdAt: 2023-01-19 03:55:16.067000+00:00 )
Base(id: afc8470062c5fa4fe96aa8bba1049797, speckle_type: Base, totalChildrenCount: 0)
```

Được rồi, giờ chúng ta hãy tiến hành lấy dữ liệu ClashTests đã định nghĩa để tuần tự hoá lại dữ liệu : 

```py
clashtests = received_base["ClashTests"]
clashtests
```
Kết quả : 
```bash
[Base(id: 0cb02822a70ad66b61b8a784c9d845b1, speckle_type: ClashModel.ClashTest, totalChildrenCount: 0),
 Base(id: d2eed40c3a5bc712c46059ee7e7ac83d, speckle_type: ClashModel.ClashTest, totalChildrenCount: 0),
 Base(id: 4f311331c7614b6d97a435cf90d67b9a, speckle_type: ClashModel.ClashTest, totalChildrenCount: 0),
 Base(id: 722148628d8c266b7c424923fcc79948, speckle_type: ClashModel.ClashTest, totalChildrenCount: 0),
 Base(id: 7434242d668d3a8749cb8f4645bd71da, speckle_type: ClashModel.ClashTest, totalChildrenCount: 0),
 Base(id: 9b27bf88496faa8877e482b2680891af, speckle_type: ClashModel.ClashTest, totalChildrenCount: 0)]
```

Và giờ đây chúng ta hãy tiến hành tuần tự hoá dữ liệu ClashTests và sắp xếp kết quả theo tên của **ClashTests** : 

```py
import pandas as pd
tests = []
for i in range(len(clashtests)):
    test = {}
    test["Name"] = clashtests[i].Name
    test["Count"] = clashtests[i].ClashCount
    test["Guid"] = clashtests[i].Guid
    test["LastRun"] = clashtests[i].LastRun
    tests.append(test)   
dfClashTests =  pd.DataFrame(tests).sort_values(by = "Name", ascending = True)
dfClashTests
```
Kết quả : 

![](pic/Code_qEweBIAKNg.png)

Hãy thử trực quan hoá kết quả một chút đễ ta dễ dàng xem xét dưới góc nhìn thực tế : 

```py
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
sns.set(style="whitegrid")
plt.figure(figsize=(10, 5))
ax = sns.barplot(x="Name", y="Count", data=dfClashTests)
ax.set_xticklabels(ax.get_xticklabels(), rotation=40, ha="right")
plt.tight_layout()
plt.show()
```

![](pic/clashtests.png)

Tương tự cho cách làm bên trên, chúng ta cũng tuần tự hoá dữ liệu **Clashs**, sau khi có kết quả chúng ta cũng hiện thị một dataframe để xem kết quả đồng thời sắp xếp theo tên của cột clash. 

```py
import pandas as pd
clashs = []
for i in range(len(clashtests)):
    clashsData = clashtests[i].Clashes
    for j in range(len(clashsData)):
        clashsdic = {}
        clashsdic["Name"] = clashsData[j].Name
        clashsdic["Guid"] = clashsData[j].Guid
        clashsdic["Level"] = clashsData[j].Level
        clashsdic["Status"] = clashsData[j].Status
        clashsdic["Distance"] = clashsData[j].Distance
        clashsdic["GridIntersect"] = clashsData[j].GridIntersect
        clashs.append(clashsdic)
dfClashes = pd.DataFrame(clashs).sort_values(by = "Name", ascending = True)
dfClashes.head(10)
```

![](pic/Code_EbIp1e8JFQ.png)

Chúng ta cũng có thể nhóm theo `Level` để xem xét kết quả : 

```py
# group dfClashes by Level 
dfClashes.groupby("Level").value_counts()
```
![](pic/Code_GrSp0QLQJg.png)

Trông kết quả chưa có ý nghĩa gì, chúng ta hãy đếm nhanh xem tổng số lượng lưới giao nhau của các Clashs là bao nhiêu : 

```py
# series of grid intersect 
dfClashes["GridIntersect"].value_counts()
```

![](pic/Code_jUClJnIsRh.png)

Tương tự như vậy, chúng ta cũng nhanh chóng đếm được số lượng Clashs theo mỗi level là bao nhiêu:

```
# series of grid intersect 
dfClashes["Level"].value_counts()
```
![](pic/Code_xR5wngADKa.png)

Tiếp theo chúng ta hãy lấy về thử các clash thuộc level 1 để phân tích dữ liệu và hiển thị kết quả 10 dòng đầu tiên của dữ liệu. 

```py
dfClashLevel1 = dfClashes[dfClashes["Level"] == "Level 1"]
print("Count Clash Level 1: ", len(dfClashLevel1))
dfClashLevel1.head(10)
```

![](pic/Code_2Ko7aQdMkW.png)

Và giờ đây, chúng ta cũng sẽ nhanh chóng kiểm tra xem các clash trên `Level 1`, bao nhiêu clash đã được giải quyết (Resolved) dựa vào cột Status, sau đó hiển thị 10 dòng đầu tiên của dữ liệu.

```py
# check how many clashes "Resolved" In Level 01
dfClashLevel1Resolved = dfClashLevel1[dfClashLevel1["Status"] == "Resolved"]
print("Number of Clash Resolved: ", len(dfClashLevel1Resolved))
dfClashLevel1Resolved.head(10)
```

![](pic/Code_sIcFWThoCb.png)

Sau khi có kể quả tổng thể, hãy thử trực quan hoá dữ liệu này để dễ minh họa hơn. 

```py
# Visualize the dfClashLevel1 by category column Status
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
sns.set(style="whitegrid")
plt.figure(figsize=(10, 5))
ax = sns.countplot(x="Status", data=dfClashLevel1)
ax.set_xticklabels(ax.get_xticklabels(), rotation=40, ha="right")
plt.tight_layout()
plt.show()
```

![](pic/clashlevel1resovled.png)

Để kiểm tra sự thay đổi của hai commi gần nhất, bây giờ áp dụng các nguyên tắt như trên, chúng ta sẽ tạo ra các hàm để so sánh giữa hai phiên bản gần nhất xem có sự thay đổi gì không ? Hàm bên dưới sẽ trả về 4 kết quả bao gồm : 
1. ClashsTests ở Version mới nhất
2. ClashsTests ở Version cũ hơn gần nhất
3. Clashs ở version mới nhất.
4. Clash ở version cũ hơn gần nhất.

![](pic/firefox_Gd6EfiDDCL.png)

```py
def GetClashTest(base):
    clashtests = base["ClashTests"]
    tests = []
    for i in range(len(clashtests)):
        test = {}
        test["Name"] = clashtests[i].Name
        test["Count"] = clashtests[i].ClashCount
        test["Guid"] = clashtests[i].Guid
        test["LastRun"] = clashtests[i].LastRun
        tests.append(test)   
    dfClashTests =  pd.DataFrame(tests).sort_values(by = "Name", ascending = True)
    return dfClashTests
def GetClash(base):
    clashs = []
    clashtests = base["ClashTests"]
    for i in range(len(clashtests)):
        clashsData = clashtests[i].Clashes
        for j in range(len(clashsData)):
            clashsdic = {}
            clashsdic["Name"] = clashsData[j].Name
            clashsdic["Guid"] = clashsData[j].Guid
            clashsdic["Level"] = clashsData[j].Level
            clashsdic["Status"] = clashsData[j].Status
            clashsdic["Distance"] = clashsData[j].Distance
            clashsdic["GridIntersect"] = clashsData[j].GridIntersect
            clashs.append(clashsdic)
    dfClashes = pd.DataFrame(clashs).sort_values(by = "Name", ascending = True)
    return dfClashes
def compareVersion(streamId):
    transport = ServerTransport(client=client, stream_id=streamId)
    commitA = client.commit.list(stream_id=streamId)[0]
    commitB = client.commit.list(stream_id=streamId)[1]
    BaseA = operations.receive(commitA.referencedObject, remote_transport=transport)
    BaseB = operations.receive(commitB.referencedObject, remote_transport=transport)
    clashtestsA = GetClashTest(BaseA)
    clashtestsB = GetClashTest(BaseB)
    clashsA = GetClash(BaseA)
    clashsB = GetClash(BaseB)
    return clashtestsA,clashtestsB,clashsA,clashsB
dfTestA,dfTestB,dfClashA,dfClashB = compareVersion(streamId=streamId)
```
Chúng ta hãy thử tạo ra một kết quả biết trước bằng việc thay đổi 5 dòng dữ liệu bên trong Navisworks từ "Resolved" thành "Approved" và thực hiện commit lên Speckle Server.

![](pic/Roamer_OnjO7cj4XI.png)

Và ngay giờ đây chúng ta có thể dễ dàng so sánh được sự thay đổi của **dfClashA** đối với **dfClashB**. 

```py
merged = dfClashA.merge(dfClashB, indicator=True, how='outer')
merged[merged['_merge'] == 'left_only']
```
![](pic/Code_92xYl7491h.png)

Tương tự như vậy chúng ta cũng có thể so sanh sự thay đổi tương quan ngược lại giữa **dfClashB** và **dfClashA**. 

```py
merged = dfClashA.merge(dfClashB, indicator=True, how='outer')
merged[merged['_merge'] == 'right_only']
```
![](pic/Code_Sx9EtptU1v.png)

Để tìm ra sự khác biệt nhanh chóng bạn có thể sử dụng hàm compare đơn giản bên dưới : 

```py
clashA.compare(clashB)
```

![](pic/Code_gcYdqSfCxK.png)

Và để lấy về toàn bộ các dữ liệu khác nhau giữa hai phiên bản, bạn có thể sử dụng phương pháp drop_duplicates() như sau : 

```py
df_diff = pd.concat([dfClashA,dfClashB]).drop_duplicates(keep=False)
df_diff
```

![](pic/Code_rJPZAvwyAA.png)

Như vậy là mình đã hoàn tất trình bày giúp bạn hiểu cách chúng ta so sánh và kiểm soát phiên bản ở mức cơ bản rồi. Và mục đích kiểm soát phiên bản là vô cùng phức tạp chứ không phải đơn giản gì cả, vẫn còn rất nhiều điều phía sau bạn có thể tự nghiên cứu thêm.

### Tổng kết 

Như vậy là thông qua bài viết này, mình đã trình bày cho bạn cách mà Speckle hoạt động với Version cũng như cách sử dụng dữ liêu của bạn có mục đích cho AEC thông qua kiểm soát các Clash xung đột, điều này giúp các kĩ sư có thể theo dõi nhanh chóng ở khắp mọi nơi mà không cần thông qua bất cứ sự phức tạp nào. Chúc các bạn một năm mới vui vẻ và thành công.

Vì thời gian của mình có hạn nên mình chỉ làm đến đây, vẫn còn rất nhiều điều thú vị phía sau mà bạn có thể tự khám và và tạo cho mình một trình kết nối quản lý dữ liệu riêng, một số cải tiến mà bạn có thể nghĩ cho bài viết này bao gồm : 

- So sánh sự khác nhau giữa các phiên bản (Delete, Changed, Modify)
- Trực quan hoá dữ liệu thông qua app
- Truy vấn tham số có điều kiện 
- Kiểm soát người sử dụng. 
- Tăng cường dữ liệu hiện có
- Mở rộng hệ sinh thái phần mềm.
...

Mã nguồn mở hướng dẫn được đặt tại : <a href="https://github.com/chuongmep/SpeckleClashControlDemo" target="_blank">SpeckleClashControlDemo</a> 

Để thảo luận chi tiết, bạn có thể tham gia tại : <a href="https://speckle.community/t/control-clash-data-navisworks-speckle/4664" target="_blank">Speckle Community</a>

## Bắt đầu

Đây là một vấn đề rất nan giải nếu ai đó đang bảo trì cho các dự án cũ của Dynamo mà muốn tận dụng các tính năng tốt nhất của NET 6 SDK mang lại. Vì vậy, trong bài viết này sẽ giúp bạn xử lý sự cố với Dynamo Package từ .Net Framework sang .Net 6 SDK sử dụng Framework 4.8.

Một số mã nguồn mở đã tiên phong trong việc đi lên .NET 6 SDK bao gồm : 

- [RevitAddInManager](https://github.com/chuongmep/RevitAddInManager)

- [RevitLookup](https://github.com/jeremytammik/RevitLookup)

- [RevitLookupWpf](https://github.com/weianweigan/RevitLookupWpf)

- [CadAddinManager](https://github.com/chuongmep/CadAddinManager)

- [CadPythonShell](https://github.com/chuongmep/CadPythonShell)

- [NavisAddinManager](https://github.com/chuongmep/NavisAddinManager)

- [RevitPythonShell](https://github.com/architecture-building-systems/revitpythonshell)

## Tại sao nên dùng .NET SDK 6.0

- Bạn có một tệp cấu hình `csproj` ngắn gọn hơn. Điều đó cũng có nghĩa là việc cấu hình của bạn đơn giản hơn.

- Bạn có thể sử dụng các tính năng mới của C#.

- Bạn có thể sử dụng các tính năng mới nhất của .NET 6.0.

- Bạn đã sẵn sàng để theo đuổi những cải tiến công nghệ và bảo trì dài hạn.

- Bạn được hỗ trợ với vòng đời dài hạn 3 năm kể từ năm phát hành .

![](pic/firefox_151FKNZabW.png)

- Net 6 hướng đến đa nền tảng.

![](pic/dotnet-unified-platform.png)


- Bạn có một [hiệu suất](https://devblogs.microsoft.com/dotnet/announcing-net-6/) tốt hơn.

## Thay đổi

Với bài viết gốc hướng dẫn bạn thực hiện với net framework 4.8  [Add Icons for a Zero Touch Assembly or NodeModel assembly](https://github.com/DynamoDS/Dynamo/wiki/Add-Icons-for-a-Zero-Touch-Assembly-or-NodeModel-assembly)

```cs
 <Target Name="AfterBuild">
    <GetReferenceAssemblyPaths TargetFrameworkMoniker=".NETFramework, Version=v4.8">
      <Output TaskParameter="FullFrameworkReferenceAssemblyPaths" PropertyName="FrameworkAssembliesPath" />
    </GetReferenceAssemblyPaths>
    <GetAssemblyIdentity AssemblyFiles="$(OutDir)$(TargetName).dll">
      <Output TaskParameter="Assemblies" ItemName="AssemblyInfo" />
    </GetAssemblyIdentity>
    <GenerateResource SdkToolsPath="$(TargetFrameworkSDKToolsDirectory)" UseSourcePath="true" Sources="$(ProjectDir)\Resources\DynaMEPimages.resx" OutputResources="$(ProjectDir)\Resources\DynaMEPimages.resources" References="$(FrameworkAssembliesPath)System.Drawing.dll" />
    <AL SdkToolsPath="$(TargetFrameworkSDKToolsDirectory)" TargetType="library" EmbedResources="$(ProjectDir)\Resources\DynaMEPimages.resources" OutputAssembly="$(OutDir)DynaMEP.customization.dll" Version="%(AssemblyInfo.Version)" />
  </Target>
```

Và nếu bạn nâng cấp lên .NET 6 SDK thì bạn sẽ thấy nó không hoạt động nữa. Đó là lúc bạn cần thay đổi sang :

```cs
<Target Name="GenerateCustomization" BeforeTargets="Build">
    <GetReferenceAssemblyPaths TargetFrameworkMoniker=".NETFramework, Version=v4.8">
      <Output TaskParameter="FullFrameworkReferenceAssemblyPaths" PropertyName="FrameworkAssembliesPath" />
    </GetReferenceAssemblyPaths>
    <GenerateResource SdkToolsPath="$(TargetFrameworkSDKToolsDirectory)" UseSourcePath="true" Sources="$(ProjectDir)\Resources\DynaMEPimages.resx" OutputResources="$(ProjectDir)\Resources\DynaMEPimages.resources" References="$(FrameworkAssembliesPath)System.Drawing.dll" />
    <AL SdkToolsPath="$(TargetFrameworkSDKToolsDirectory)" TargetType="library" EmbedResources="$(ProjectDir)\Resources\DynaMEPimages.resources" OutputAssembly="$(TargetDir)DynaMEP.customization.dll" />
  </Target>
```


## Tổng kết 

Tất cả các công cụ hỗ trợ, add-in, plugin viết bằng .NET trên các phần mềm Autodesk nên được cân nhắc nâng cấp lên NET6 SDK để có thể sử dụng các tính năng mới nhất từ môi trường .NET và theo kịp tốc độ phát triển.

## Cuộc sống

Cám ơn người bạn ở Singapore đã giải thích giúp mình từ `Yeet`, đó là từ được sử dụng nhiều ở Sin nhưng không được sử dụng nhiều ở Việt Nam và các nước như Anh hoặc Mỹ. Bạn có nghe qua từ này chưa ?

Ngoài ra còn có thêm một từ tương quan nữa là `Yee`. Từ Yee thường được dùng như để xác nhận mọi thứ còn từ Yeet thì có vẻ phức tap hơn, thường dùng như một cảm thán mức độ đồng ý hoặc đôi khi còn là một meme trò đùa trên mạng.

Tiếc là mình chỉ tìm hiểu thêm cho biết, chứ mình sài `Yeah` là chủ yếu 🥱

![](pic/_Image_05fb829a-f39e-485c-97fd-636a16eb0938.png)

## Introduction

When you are developing a plugin for an AEC software, you may encounter a problem that your plugin cannot be loaded by the software. This article will show you how to solve this problem.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-05-11-Solving-Load-Assembly-In-AEC/pic/exportdadadaw.png?raw=true){data-zoomable}

## What is an Assembly?

Before diving into load assembly issues, it's important to understand what an assembly is. In C#, an assembly is a collection of types and resources that are built to work together as a logical unit. Assemblies can be either dynamically or statically linked.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-05-11-Solving-Load-Assembly-In-AEC/pic/_Image_ac0b160f-3f3f-42a5-a3ab-a18df9e3f270.png?raw=true)

## Common Causes of Load Assembly Issues

- Version Mismatch: One of the most common causes of load assembly issues is version mismatch. This occurs when the version of an assembly that your application depends on does not match the version that is installed on the system. This can cause the application to fail or produce unexpected results.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-05-11-Solving-Load-Assembly-In-AEC/pic/_Image_25a524ba-f533-4695-9dd9-2785dd86a85d.png?raw=true)

- Missing Dependencies: Another common cause of load assembly issues is missing dependencies. An assembly may depend on other assemblies or libraries to function properly. If these dependencies are missing, the application may fail to load the assembly or produce unexpected results.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-05-11-Solving-Load-Assembly-In-AEC/pic/_Image_b85e09b4-8771-4183-a061-b0c5facc5e5a.png?raw=true)

- File Not Found: If the assembly file cannot be found, the application will fail to load the assembly. This can occur if the file has been moved or deleted, or if the application is looking in the wrong directory.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-05-11-Solving-Load-Assembly-In-AEC/pic/_Image_002a30cc-6825-4b94-926a-869e269f9f12.png?raw=true)

- Security Restrictions: If the assembly is not signed or does not have the appropriate permissions, the application may fail to load the assembly. This can occur if the assembly is not trusted by the system.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-05-11-Solving-Load-Assembly-In-AEC/pic/_Image_9ff7861a-0e19-4fe1-b47e-12cdfcb6a0d5.png?raw=true)

## How to Solve Load Assembly Issues

Check for Version Mismatch: To resolve version mismatch issues, you can use the Assembly Binding Log Viewer tool (Fuslogvw.exe) to diagnose the problem. This tool will provide detailed information about which assembly versions are being loaded and where they are being loaded from. You can also use the AssemblyVersion attribute in the assembly's metadata to specify a specific version.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-05-11-Solving-Load-Assembly-In-AEC/pic/_Image_56933bd6-d35a-43b1-b3b7-0556a5ad8119.png?raw=true)

Install Missing Dependencies: To resolve missing dependency issues, you can install the required dependencies on the system or include them with your application. You can also use the Assembly Binding Log Viewer tool to diagnose the problem and determine which dependencies are missing.

Check File Path: To resolve file not found issues, you can check the file path to ensure that the assembly is in the correct directory. You can also use the Assembly Binding Log Viewer tool to determine where the application is looking for the assembly.

Adjust Security Settings: To resolve security restriction issues, you can sign the assembly or give it the appropriate permissions. You can also use the Assembly Binding Log Viewer tool to diagnose the problem and determine which security settings are preventing the assembly from loading

Let's say you have an application that depends on a third-party assembly called "MyLibrary.dll". The application was built to work with version 1.0.0.0 of the assembly, but you have version 2.0.0.0 installed on your system. When you run the application, you get an error message saying that the assembly could not be loaded.

To resolve this issue, you can specify in your application's configuration file that it should use version 1.0.0.0 of "MyLibrary.dll". Here's how you can do that:

1. Open your application's configuration file (App.config or Web.config, depending on whether you're building a desktop or web application).
2. Add a `<runtime>` section inside the `<configuration>` section, if one doesn't already exist.
3. Inside the `<runtime>` section, add an `<assemblyBinding>` section.
4. Inside the `<assemblyBinding>` section, add a `<dependentAssembly>` element that specifies the name, public key token, and version of the assembly you want to bind to.
5. Set the `<bindingRedirect>` element to specify the version of the assembly you want to use.

Here's an example of what the configuration file might look like:

```xml
<configuration>
  <runtime>
    <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
      <dependentAssembly>
        <assemblyIdentity name="MyLibrary" publicKeyToken="123456789abcdef" />
        <bindingRedirect oldVersion="0.0.0.0-2.0.0.0" newVersion="1.0.0.0" />
      </dependentAssembly>
    </assemblyBinding>
  </runtime>
</configuration>

```

In this example, we're specifying that our application should use version 1.0.0.0 of "MyLibrary.dll" instead of any version between 0.0.0.0 and 2.0.0.0.

By adding this configuration to your application, you should be able to resolve the version mismatch issue and run your application successfully.

## How To Solve Load Assembly Issues In AEC Software

Some of solutions are listed below:

1. Check the version of the assembly that is installed on the system. If it is not the correct version, install the correct version.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-05-11-Solving-Load-Assembly-In-AEC/pic/_Image_7e77080e-dc0d-4e8f-a489-0402185baa98.png?raw=true)

1. Check the bitness of the assembly. If it is not the correct bitness, install the correct bitness.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-05-11-Solving-Load-Assembly-In-AEC/pic/_Image_40f46716-a351-45cd-a303-f1acd6df0e8c.png?raw=true)

1. Check the folder structure of the assembly. If it is not in the correct folder structure, move it to the correct folder structure.
2. Check the name of the assembly. If it is not in the correct name, rename it to the correct name.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-05-11-Solving-Load-Assembly-In-AEC/pic/_Image_c4e24219-f1d4-43b5-af10-ac3fa8200ee7.png?raw=true)

1. Check the dependencies of the assembly. If it is missing dependencies, install the dependencies.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-05-11-Solving-Load-Assembly-In-AEC/pic/_Image_3b095e53-a368-4a69-bc69-5d58a1106192.png?raw=true)

1. Check the security settings of the assembly. If it is not signed or does not have the appropriate permissions, sign it or give it the appropriate permissions.

2. Remove some Add-in from AEC Software, because some Add-in may be conflict with your assembly.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-05-11-Solving-Load-Assembly-In-AEC/pic/5352342342342324.png?raw=true)

Use C# Code to Load Assembly when your add-in or application loading to software, this is a sample code:

```cs:line-numbers

string assPath = Assembly.GetExecutingAssembly().Location;
string? dirPath = Path.GetDirectoryName(Path.GetFullPath(assPath)) ?? null;
AppDomain.CurrentDomain.AssemblyResolve += (sender, args) =>
{
    var assemblyName = new AssemblyName(args.Name);
    if (!string.IsNullOrEmpty(dirPath))
    {
        var assemblyPath = Path.Combine(dirPath, assemblyName.Name + ".dll");
        if (File.Exists(assemblyPath) == false) return null;
        var assembly = Assembly.LoadFrom(assemblyPath);
        return assembly;
    }
    return null;
};
```

## Conclusion

Load assembly issues can be frustrating and time-consuming to resolve, but by following the tips outlined in this article, you should be able to diagnose and fix these issues quickly and effectively. By understanding the common causes of load assembly issues and knowing how to resolve them, you can save time and improve the performance of your applications.
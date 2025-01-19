
## Introduction

COM API stands for [Component Object Model](https://en.wikipedia.org/wiki/Component_Object_Model) Application Programming Interface. It's a Microsoft technology that enables software components to communicate with each other in a networked environment, regardless of the language they were originally written in.

In AutoCAD API, it means that you can use .NET Interoperability (often referred to as .NET interop) to access and interact with AutoCAD's functionality from .NET languages like C# or VB.NET.

So, when we talk about using COM API via .NET interop in AutoCAD API, we're referring to the ability to write .NET code (such as C# or VB.NET) to access and control AutoCAD's functionality through its COM-based API. This allows developers to create custom applications, automate tasks, and integrate AutoCAD with other software systems using the familiar syntax and features of .NET languages.

AutoCAD .NET applications also use the same version-dependent ProgID for the CreateObject, GetObject, and GetInterfaceObject functions.

You can use the product ProgID to create a new instance of the AutoCAD application ("AutoCAD.Application"), and specify the major and minor number of the release to restrict your application to a specific release or all the releases that are binary compatible with each other.

For example,

- CreateObject("AutoCAD.Application.24.2") attempts to create a new instance of AutoCAD 2023, even if another release that shares the same major version of the product is installed.
- CreateObject("AutoCAD.Application.24.1") attempts to create a new instance of AutoCAD 2022, even if another release that shares the same major version of the product is installed.
- CreateObject("AutoCAD.Application.24") attempts to create a new instance of AutoCAD 2021, AutoCAD 2022, or AutoCAD 2023.
- CreateObject("AutoCAD.Application.23.1") attempts to create a new instance of AutoCAD 2020, even if another release that shares the same major version of the product is installed.
- CreateObject("AutoCAD.Application.23") attempts to create a new instance of AutoCAD 2019 or AutoCAD 2020.
- CreateObject("AutoCAD.Application.22") attempts to create a new instance of AutoCAD 2018.
- CreateObject("AutoCAD.Application.21") attempts to create a new instance of AutoCAD 2017.
- CreateObject("AutoCAD.Application.20.1") attempts to create a new instance of AutoCAD 2016, even if another release that shares the same major version of the product is installed.
- CreateObject("AutoCAD.Application.20") attempts to create a new instance of AutoCAD 2015 or AutoCAD 2016.

A recent issue that developers are facing is that since **Autocad 2025**, Autodesk has switched to `.NET 8`, which means .NET Framework applications will no longer be compatible with the new version of AutoCAD, and interacting with AutoCAD through the COM API will require some adjustments. 


## Using COM API AutoCAD with .NET Framework

To use the COM API AutoCAD with .NET Framework, you need to add a reference to the AutoCAD COM library to your project. To do this, you'll use the `GetActiveObject` method of the `Marshal` class in the `System.Runtime.InteropServices` namespace. 

The `ProgId` for AutoCAD is `AutoCAD.Application`. We don't append version numbers at the end of the ProgId to specify a particular version of AutoCAD. This allows us to quickly call any open version of AutoCAD without needing to specify it explicitly.

```cs
using System.Runtime.InteropServices;
using System.Text;
string ProgId = "AutoCAD.Application";
dynamic App = Marshal.GetActiveObject(ProgId);
Console.WriteLine(App.FullName);
```

## Using COM API AutoCAD with .NET 8

Due to the transition to .NET 8, the `GetActiveObject` method will no longer be available in .NET 8. Instead, we may need to directly call functions from the AutoCAD COM library via DllImport. Below is an example of how to call the `GetActiveObject` function from the AutoCAD COM library using DllImport.

The Marshal.GetActiveObject() API is a simple wrapper over the [Running Object Table (ROT)](https://learn.microsoft.com/en-us/windows/win32/com/registering-objects-in-the-rot) and relies on specific [Win32](https://learn.microsoft.com/en-us/windows/win32/api/oleauto/nf-oleauto-getactiveobject) APIs that can easily be called via DllImport, as shown below.

```cs
using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using System.Security;
using Autodesk.DesignScript.Runtime;

public static class MarshalForCore
{
    internal const String OLEAUT32 = "oleaut32.dll";
    internal const String OLE32 = "ole32.dll";

    [DllImport(OLE32, PreserveSig = false)]
    [ResourceExposure(ResourceScope.None)]
    [SuppressUnmanagedCodeSecurity]
    [System.Security.SecurityCritical]
    private static extern void CLSIDFromProgIDEx([MarshalAs(UnmanagedType.LPWStr)] String progId, out Guid clsid);


    [DllImport(OLE32, PreserveSig = false)]
    [ResourceExposure(ResourceScope.None)]
    [SuppressUnmanagedCodeSecurity]
    [System.Security.SecurityCritical]
    private static extern void CLSIDFromProgID([MarshalAs(UnmanagedType.LPWStr)] String progId, out Guid clsid);

    [DllImport(OLEAUT32, PreserveSig = false)]
    [ResourceExposure(ResourceScope.None)]
    [SuppressUnmanagedCodeSecurity]
    [System.Security.SecurityCritical]
    private static extern void GetActiveObject(ref Guid rclsid, IntPtr reserved, [MarshalAs(UnmanagedType.Interface)] out Object ppunk);
    [System.Security.SecurityCritical]
    public static Object GetActiveObject(String progID)
    {
        Object obj = null;
        Guid clsid;
        try
        {
            CLSIDFromProgIDEx(progID, out clsid);
        }
        catch (Exception)
        {
            CLSIDFromProgID(progID, out clsid);
        }

        GetActiveObject(ref clsid, IntPtr.Zero, out obj);
        return obj;
    }
}
```

And now you can use the `GetActiveObject` method from the `MarshalForCore` class created to retrieve the AutoCAD object similarly as before in .NET Framework.

```cs
string ProgId = "AutoCAD.Application";
dynamic App = MarshalForCore.GetActiveObject(ProgId);
Console.WriteLine(App.FullName);
```

That's it!

## Conclusion

I hope this article has helped you understand how to upgrade your example code to use COM API AutoCAD from .NET Framework to .NET 8. If you have any questions or feedback, feel free to leave a comment below. Thank you for reading!

If you haven't read the previous article on using COM API AutoCAD with .NET Framework, you can refer to it [here](https://www.keanw.com/2006/09/com_vs_net_in_a.html).

Actually, you can consider the idea of using COM API AutoCAD with .NET Core to communicate between server and client, but it's not easy to implement. Using COM API requires a lot of experience and knowledge, which can increase the complexity of your project. Therefore, only consider it if it's really necessary.

## References

- https://en.wikipedia.org/wiki/Component_Object_Model
- https://learn.microsoft.com/en-us/answers/questions/1073368/net-5-0-method-not-found-system-object-system-runt
- https://learn.microsoft.com/en-us/windows/win32/api/oleauto/nf-oleauto-getactiveobject
- https://www.keanw.com/2006/09/com_vs_net_in_a.html
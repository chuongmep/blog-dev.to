The Revit API provides an External Events framework to accommodate the use of modeless dialogs. It is tailored for asynchronous processing and operates similarly to the Idling event with default frequency.

You can look at the official document from [Revit API Revit API Developers Guide Advanced Topics External Events ](https://help.autodesk.com/view/RVT/2024/ENU/?guid=Revit_API_Revit_API_Developers_Guide_Advanced_Topics_External_Events_html): 

But we can use more simple than with [Revit.Async](https://github.com/KennanChan/Revit.Async)
 
## Use In IExternalCommand

1. Dowload Library Revit.Async from package nuget API manager

```cs
<PackageReference Include="Revit.Async" Version="2.1.*" />
```

2. Add Test Code:
```cs
using Autodesk.Revit.Attributes;
using Autodesk.Revit.DB;
using Autodesk.Revit.UI;
using Revit.Async;
 
namespace UpdateAssemblyCodeAddIn;
 
[Transaction(TransactionMode.Manual)]
public class Command : IExternalCommand
{
    public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
    {
        var externalCommandData = commandData;
        string zipFilePath = string.Empty;
        RevitTask.Initialize(externalCommandData.Application);
        RevitTask.RunAsync(async () =>
        {
            UIDocument uidoc = externalCommandData.Application.ActiveUIDocument;
            Document doc = uidoc.Document;
            await Task.Delay(1000);
             
        });
        return Result.Succeeded;
    }
 
}
```

## Use In ExternalEventHandler 

```cs 
public Result OnStartup(UIControlledApplication application)
{
    UIApplication uiapp = application.GetUIApplication();
    RevitTask.Initialize(uiApp);
    return Result.Succeeded;
}
```
Some diffrence way to get UIApplication is can use a method follow with topic [Revit API Forum](https://forums.autodesk.com/t5/revit-api-forum/how-to-get-uiapplication-from-iexternalapplication/m-p/13261780#M83343)

```cs
/// <summary>
/// Get <see cref="Autodesk.Revit.UI.UIApplication"/> using the <paramref name="application"/>
/// </summary>
/// <param name="application">Revit UIApplication</param>
public static UIApplication GetUIApplication(this UIControlledApplication application)
{
    var type = typeof(UIControlledApplication);
 
    var propertie = type.GetFields(BindingFlags.Instance | BindingFlags.NonPublic)
        .FirstOrDefault(e => e.FieldType == typeof(UIApplication));
 
    return propertie?.GetValue(application) as UIApplication;
}
```

## Use In [IExternalDBApplication](https://help.autodesk.com/view/RVT/2024/ENU/?guid=Revit_API_Revit_API_Developers_Guide_Introduction_Add_In_Integration_External_Application_html)

```cs
public Result OnStartup(UIControlledApplication application)
   {
       application.ControlledApplication.ApplicationInitialized  += test;
       return Result.Succeeded;
   }
 
   private void test(object sender, ApplicationInitializedEventArgs e)
   {
       if (sender is Application application)
       {
           var uiApp = new UIApplication(application);
           RevitTask.Initialize(uiApp);
       }
   }
```

## Use Await Async Revit Design Automation

You know that Revit Design Automation not allow you run with User Interface Add-in, so that could be a limit if you want run and use Await Async in code. That why you will see some meesage like Could not load file or assembly 'RevitAPIUI,....

```bash
[01/15/2025 06:01:03] Found an addIn for registration: DataSetParameter.addin
[01/15/2025 06:01:03] Language not specified, using English-United States(ENU) as default.
[01/15/2025 06:01:14] Get RCE: (VersionBuild) 24.2.10.64 (VersionNumber) 2024 (SubVersionNumber) 2024.2.10
[01/15/2025 06:01:16] System.IO.FileNotFoundException: Could not load file or assembly 'RevitAPIUI, Version=22.0.0.0, Culture=neutral, PublicKeyToken=null' or one of its dependencies. The system cannot find the file specified.
[01/15/2025 06:01:16] File name: 'RevitAPIUI, Version=22.0.0.0, Culture=neutral, PublicKeyToken=null'
[01/15/2025 06:01:16] at UpdateAssemblyCodeAddIn.App.DoJob(DesignAutomationReadyEventArgs e)
[01/15/2025 06:01:16] at UpdateAssemblyCodeAddIn.App.HandleDesignAutomationReadyEvent(Object sender, DesignAutomationReadyEventArgs e)
[01/15/2025 06:01:16] at DesignAutomationFramework.DesignAutomationBridge.RaiseDesignAutomationReadyEvent(DesignAutomationReadyEventArgs e)
```
### Restrictions from Autodesk for Design Automation API for Revit

The **Design Automation API for Revit** imposes the following restrictions on your AppBundles, Activities, and Workitems:

- No access to Revit’s UI interfaces. Your application must be a RevitDB application only.
- Writing to the disk is restricted to Revit’s current working directory.
- There is no access to the ActiveView or ActiveDocument property for AppBundles that run on the Design Automation API for Revit.
- Export to Navisworks functionality is not available.
- Autodesk Desktop Connector is not supported.

### Firewall Configuration for Callbacks

In order to process the `onComplete` or `onProgress` callback behind a firewall, the following IPs need to be allowed for Revit:

- `3.229.167.149`
- `44.207.230.78`
- `54.175.193.194`

To work with Async/Task you need to force the Task to wait, I always use the GetAwaiter().GetResult() to convert something async to synchronous. 

Here is a sample: 

```cs
var task = Task.Run(async () =>
{
    await Task.Delay(1000);
    return "Task message";
});
var message = task.GetAwaiter().GetResult();
```
 This works fine in Revit, but you cannot have any Revit API calls inside the Task to prevent RevitAddin context issues.

So what is best idea to can use Await/ Async is :

    Design Code Revit API and Code for call some web api seperate function and call it.

Thank for reading the post, Cheers !

## Reference 

- [Revit Developer API ](https://help.autodesk.com/view/RVT/2024/ENU/?guid=Revit_API_Revit_API_Developers_Guide_Advanced_Topics_External_Events_html)
- https://ricaun.com/revit-api-context/
- https://github.com/ricaun-io/ricaun.Revit.UI.Tasks
- [The Building Coder-Revit API Context and Form Creation Errors ](https://thebuildingcoder.typepad.com/blog/2015/08/revit-api-context-and-form-creation-errors.html)

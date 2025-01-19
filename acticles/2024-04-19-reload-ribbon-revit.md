
## Introduction

It was quite a long time I don't have so much time to play with [Revit API ](https://help.autodesk.com/view/RVT/2024/ENU/?guid=Revit_API_Revit_API_Developers_Guide_Introduction_Getting_Started_Using_the_Autodesk_Revit_API_html) and look to the issue of Revit API.

Today, I have an interesting discovery to share with you that I recently came across. It's a rather annoying glitch in the Revit API regarding hot reloading the Ribbon. This will be addressed through this article, providing you with an overview of how to hot reload a button or panel from the Ribbon within the Revit API.

## Remove Panel 

Removing a panel is relatively straightforward, as you can easily see in the example below, but it won't work as expected.

```csharp
using AW = Autodesk.Windows;
using Autodesk.Revit.UI;
public static void RemovePanel(string tabName, AW.RibbonPanel panel)
    {
        AW.RibbonControl ribbon = AW.ComponentManager.Ribbon;
        foreach (AW.RibbonTab tab in ribbon.Tabs)
        {
            if (tab.Name == tabName)
            {
                tab.Panels.Remove(panel);
            }
        }
    }
```
Although the removal command is executed, you'll encounter an error when attempting to add a panel with a similar name back to the Ribbon. This is due to the fact that the Revit API has a Private Dictionary to store RibbonItemDictionary. What you need to do is add a cleanup step for `RibbonItemDictionary` after removing the panel. Many thanks to [@Nice3Point](https://github.com/Nice3point/Nice3point) for this brilliant idea.

```cs
using AW = Autodesk.Windows;
using Autodesk.Revit.UI;
public static void RemovePanelClear(string tabName, string panelName)
{
    AW.RibbonControl ribbon = AW.ComponentManager.Ribbon;
    AW.RibbonPanel ribbonPanel = GetPanel(tabName, panelName);
    //Remove panel
    foreach (AW.RibbonTab tab in ribbon.Tabs)
    {
        if (tab.Name == tabName)
        {
            tab.Panels.Remove(ribbonPanel);
            var uiApplicationType = typeof(UIApplication);
            var ribbonItemsProperty = uiApplicationType.GetProperty("RibbonItemDictionary",
                BindingFlags.NonPublic | BindingFlags.Static | BindingFlags.DeclaredOnly)!;
            var ribbonItems =
                (Dictionary<string, Dictionary<string, Autodesk.Revit.UI.RibbonPanel>>)ribbonItemsProperty
                    .GetValue(typeof(UIApplication));
            if (ribbonItems.TryGetValue(tab.Id, out var tabItem)) tabItem.Remove(panelName);
        }
    }
}
```

Searching for a panel is also easily done within the Revit API:

```cs
using AW = Autodesk.Windows;
public static AW.RibbonPanel GetPanel(string tabName, string panelName)
{
    AW.RibbonControl ribbon = AW.ComponentManager.Ribbon;

    foreach (AW.RibbonTab tab in ribbon.Tabs)
    {
        if (tab.Name == tabName)
        {
            foreach (AW.RibbonPanel panel in tab.Panels)
            {
                if (panel.Source.Title == panelName)
                {
                    return panel;
                }
            }
        }
    }

    return null;
}
```

## UIControlledApplication vs UIApplication

With the [UIControlledApplication](https://www.revitapidocs.com/2016/4638c568-a118-1d57-ceed-a57595202644.htm) class used in [IExternalApplication](https://www.revitapidocs.com/2016/196c8712-71de-03e8-b30d-a9625bd626d2.htm) interface emplementation and [UIApplication](https://www.revitapidocs.com/2016/51ca80e2-3e5f-7dd2-9d95-f210950c72ae.htm) used in [IExternalCommand](https://www.revitapidocs.com/2016/e9aab085-720f-b924-3ace-1f3c33d95d44.htm), it's important to note that you should use [UIApplication](https://www.revitapidocs.com/2016/51ca80e2-3e5f-7dd2-9d95-f210950c72ae.htm) to make changes in the Ribbon if you intend to trigger changes for a panel from a button. However, both can accomplish this task.

You can identify the Ribbon you are working with through [UIApplication](https://www.revitapidocs.com/2016/51ca80e2-3e5f-7dd2-9d95-f210950c72ae.htm).

```csharp
var uiApplication = commandData.Application;
var TabName = "Test";
application.GetRibbonPanels(TabName);
```

Or through [UIControlledApplication](https://www.revitapidocs.com/2016/4638c568-a118-1d57-ceed-a57595202644.htm) via [IExternalApplication](https://www.revitapidocs.com/2016/196c8712-71de-03e8-b30d-a9625bd626d2.htm) like code below:

```csharp
public Result OnStartup(UIControlledApplication a)
{

    var TabName = "Test";
    application.GetRibbonPanels(TabName);
    return Result.Succeeded;
}
```

To write a unified function between [UIApplication](https://www.revitapidocs.com/2016/51ca80e2-3e5f-7dd2-9d95-f210950c72ae.htm) and [UIControlledApplication](https://www.revitapidocs.com/2016/4638c568-a118-1d57-ceed-a57595202644.htm), you can use a common function through the [dynamic](https://learn.microsoft.com/en-us/dotnet/csharp/advanced-topics/interop/using-type-dynamic) approach supported in C# with the [Microsoft.CSharp](https://www.nuget.org/packages/Microsoft.CSharp/) NuGet library, it will be easier to write a function that can be used in both [UIApplication](https://www.revitapidocs.com/2016/51ca80e2-3e5f-7dd2-9d95-f210950c72ae.htm) and [UIControlledApplication](https://www.revitapidocs.com/2016/4638c568-a118-1d57-ceed-a57595202644.htm), let's see the example below:

```csharp
public static void Reload(dynamic application){
    var TabName = "Test";
    application.GetRibbonPanels(TabName);
}
```


## Remove Button

And now, to be clearer, you can easily remove any unwanted button directly without needing to restart Revit.

```cs
using AW = Autodesk.Windows;
public void RemoveItem(string tabName, string panelName, string itemName)
{
    AW.RibbonControl ribbon = AW.ComponentManager.Ribbon;

    foreach (AW.RibbonTab tab in ribbon.Tabs)
    {
        if (tab.Name == tabName)
        {
            foreach (AW.RibbonPanel panel in tab.Panels)
            {
                if (panel.Source.Title == panelName)
                {
                    AW.RibbonItem findItem = panel.FindItem("CustomCtrl_%CustomCtrl_%"
                                                            + tabName + "%" + panelName + "%" + itemName,
                        true);
                    if (findItem != null)
                    {
                        panel.Source.Items.Remove(findItem);
                    }
                }
            }
        }
    }
}
public AW.RibbonTab GetTab(string tabName)
{
    AW.RibbonControl ribbon = AW.ComponentManager.Ribbon;

    foreach (AW.RibbonTab tab in ribbon.Tabs)
    {
        if (tab.Name == tabName)
        {
            return tab;
        }
    }

    return null;
}
```

## Track User Click Button

This is bonus update for question from user in post [Find ribbon tabs and or panels and delete](https://forums.autodesk.com/t5/revit-api-forum/find-ribbon-tabs-and-or-panels-and-delete/m-p/12797667/highlight/false#M79117) in Revit API forum. 

If it possible to ask, tell us if we can get the name of the button, its description, or some kind of indicator after clicking it?

You can do it with some step like this :

1. Add assembly reference AdWindows.dll

2. Add a event tracking user click to the button at IExternalApplication when user click to any button

```cs
using AW = Autodesk.Windows;
Autodesk.Windows.ComponentManager.UIElementActivated += RibbonUtils.ComponentManagerOnUIElementActivated;

public static void ComponentManagerOnUIElementActivated(object sender, AW.UIElementActivatedEventArgs e)
        {
            try
            {
                var id = e.Item.Id;
                // match with id string contents here and set to some where, after thatm match with all command exist in your plugin
        }
```

3. Call the action from external command match with id return from the event clicked

## Conclusion

I hope that through this article, I have helped you address the issue of removing Ribbon Panels and Buttons within the Revit API. If you have any questions or contributions, please feel free to leave a comment below. Wishing you a wonderful day ahead!
## Introduction

[Pyrevit](https://pyrevitlabs.notion.site/pyrevitlabs/pyRevit-bd907d6292ed4ce997c46e84b6ef67a0) is a rapid application prototyping environment for Autodesk Revit. This environment enables users to quickly turn automation ideas into fully functional add-ins using any programming language they are most comfortable with. When you install pyRevit, it also includes **CLI** utilities for reusing and customizing your deployments further—there’s no need to rebuild from scratch.

What Pyrevit can do:

- Add a custom Ribbon to the toolbar in Revit.
- Quickly develop ideas with a few lines of code without complex builds.
- Write custom add-ins using Python (IronPython or CPython), C#, or VB.Net.
- Integrate seamlessly with tools like Dynamo, Grasshopper, and more.
- Share your projects with the community on platforms like GitHub, allowing others to learn from or even help scale your ideas.

---

## How to Install

To install, visit <a href="https://github.com/eirannejad/pyRevit/releases" target="_blank">this page</a> and download the file with the `.exe` extension. Installing is as simple as clicking "Next" like with most software. 😁

![](pic/pyrevit-install.png)

After installation, launch Revit. A notification will prompt you to load pyRevit. Like other add-ins, select "Always Load" to avoid this pop-up in the future.

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ffe8ed854-a0cc-48a7-b8b8-9ec060e84d26%2F2018-06-28_16_56_45-Window.png?table=block&id=cb879840-10dd-40a1-959c-d16c7619b2b0&width=1060&cache=v2)

If successful, your Ribbon will look like this:

![](pic/pyrevit-ribbon.png)

And that’s it! The installation is complete. 😊 Simple, right?

---

## Using and Writing Code

To start writing code, let’s first take a quick look at the structure and approach.

![](pic/pyrevit-1-copy.png)

If you just want to use the provided functionality, leave everything as-is and use the available tools in the **Ribbon**. However, if you’re curious and want to tinker, it’s not as straightforward.

To view the code behind a tool, hover over it and hold `Alt + Left Click`. This will open the directory containing the author’s code.

![](pic/pyrevit-scripts.png)

As you can see, the hard work is already done. Your job is to duplicate the path and modify or create your own scripts. To do this, **copy** the folder **pyRevitTools.extension**, create a new directory, and rename **pyRevit.tab** to something like **HVC**. Save your changes.

![](pic/pyrevit-copy.png)

Reload the add-in—no building required. If prompted, select **Yes** to load the new Ribbon.

![](pic/pyrevit-reload.png)

Done! You’ll now see a new Ribbon with your custom name. From here, you can remove unnecessary tools, edit existing ones, or start writing your own scripts. It’s that easy! 😍

---

## Trying Something Out

After setting up, let’s try creating something simple to ensure it works. Here’s an example I created:

![](pic/pyrevit-start.png)

This is the code for **script.py**. If you don’t have an IDE installed, check out recommended IDEs in [this article](https://chuongmep.com/Autocomplete-stubs-for-common-IronPython-NET-libraries/).

```python
__doc__ = 'Pick Object Element'
__author__ = 'https://chuongmep.com/'
__title__ = 'Element'
from Autodesk.Revit.UI import*
from Autodesk.Revit.UI.Selection import*
from Autodesk.Revit.DB import Element
from Autodesk.Revit.Attributes import*
# Get UIDocument
uidoc = __revit__.ActiveUIDocument
# Get Document
doc = uidoc.Document
# Pick Object
pick = uidoc.Selection.PickObject(ObjectType.Element)
# Retrieve Element
eleid = pick.ElementId
ele = doc.GetElement(eleid)
# Get Element Type
def id(idname):
    ElementType = doc.GetElement(ele.GetTypeId()) 
# Display Element ID
print("ID of element is:", eleid.ToString())
print("Category is:", ele.Category.Name)
print("Instance is:", ele.Name)
```

Once done, **reload** the add-in like before to load it into Revit. Test the button you created by selecting an object in Revit and see the results.

![](pic/pyrevit-result.png)

It works! The test was successful. Now, what’s stopping you from creating something bigger? 😁

---

## Additional Resources

Here are some open-source projects for reference:

- <a href="https://github.com/CyrilWaechter/pyRevitMEP" target="_blank">pyRevitMEP</a> - Add-ins for MEP workflows.
- <a href="https://github.com/htlcnn/pyrevitscripts" target="_blank">pyrevitscripts</a> - Structural add-ins by Hoàng Thanh Long.
- <a href="https://github.com/apex-project/pyApex" target="_blank">pyApex</a>
- <a href="https://github.com/antonbondarchuk/pyL_R/tree/master/pyL_R.tab" target="_blank">pyL_R</a>

---

## Conclusion

And that wraps up another story! Whenever I find something fun or interesting, I like to share it with everyone. If you have any suggestions for improving this process, feel free to comment below, and I’ll update the guide to make it even better. Thanks for visiting my blog!

---

## References

<a href="https://www.notion.so/Install-pyRevit-98ca4359920a42c3af5c12a7c99a196d" target="_blank">Install pyRevit</a>  
<a href="https://www.notion.so/pyRevit-bd907d6292ed4ce997c46e84b6ef67a0" target="_blank">pyRevit</a>
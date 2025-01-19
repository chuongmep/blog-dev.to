### What is this?

[RevitPythonShell](https://github.com/architecture-building-systems/revitpythonshell) (RPS) is essentially a small add-in for Autodesk Revit that allows users to write plugins using the **Python** programming language. The standout feature of RPS is its ability to display results immediately after you write the code, making it incredibly efficient. Combined with tools like <a href="https://github.com/jeremytammik/RevitLookup" target="_blank">RevitLookup</a>, it enhances your capabilities with the Revit API significantly—like adding wings to a dragon!

---

### How to Install?

Like any other add-in for Revit, installation is straightforward using the provided `.exe` files. Here are the links to download the setup files for different Revit versions:

- <a href="data/2017.03.07_Setup_RevitPythonShell_2016.exe" target="_blank">Autodesk Revit 2016</a>  
- <a href="data/2017.04.06_Setup_RevitPythonShell_2017.exe" target="_blank">Autodesk Revit 2017</a>  
- <a href="data/2017.07.24_Setup_RevitPythonShell_2018.exe" target="_blank">Autodesk Revit 2018</a>  
- <a href="data/2018.09.19_Setup_RevitPythonShell_2019.exe" target="_blank">Autodesk Revit 2019</a>  
- <a href="data/2020.01.19_Setup_RevitPythonShell_2020.exe" target="_blank">Autodesk Revit 2020</a>  

Once installed, you will find a new yellow icon in the **Ribbon** tab of Revit. That’s your RevitPythonShell! 😎

![](pic/startRPS.png)

---

### How to Use and Write Code?

Now that it’s installed, let’s play around with it. Start by opening the `Interactive Python Shell` from the Ribbon.

![](pic/RPS_Interact.png)

It looks quite sleek! Let’s type a simple "Hello, World!" to see if it works.

![](pic/RPS_Hello.png)

Boom! It works instantly—pretty impressive, right? Time to show this off to my spouse! 🤣

Next, let’s try something more advanced, like interacting with elements in Revit using a simple script. You can click **Run** to execute the code.

```python
from Autodesk.Revit.UI.Selection import *
uidoc = __revit__.ActiveUIDocument
doc = __revit__.ActiveUIDocument.Document
selection = [doc.GetElement(elId) for elId in __revit__.ActiveUIDocument.Selection.GetElementIds()]
ElementID = []
ElementName = []
Category = []
for i in selection:
    ElementID.append(i.Id)
    ElementName.append(i.Name)
    Category.append(i.Category.Name)
print(ElementID, ElementName, Category)
```

The result looks like this:

![](pic/result.png)

If you’ve reached this point and find it tricky, don’t panic—you’re just getting started. 😎 RPS is incredibly useful for testing or implementing new ideas. Below, I’ve included some additional learning resources that may help you refine your skills and discover new possibilities.

---

### Additional Tips

Currently, there’s a library called **Revit Python Wrapper**, which simplifies coding with Revit even further. You can explore it here: <a href="https://revitpythonwrapper.readthedocs.io/en/latest/index.html" target="_blank">Revit Python Wrapper Documentation</a>. Give it a try—it might make your life even easier!

---

### Conclusion

That’s all for now! I just shared a cool tool that I thought could be helpful for the community. If you have any ideas for improving workflows or speeding things up, feel free to comment below, and I’ll update the article to make it even better. Thanks for visiting my blog!

---

### References

- <a href="https://github.com/architecture-building-systems/revitpythonshell" target="_blank">RevitPythonShell</a>  
- <a href="https://daren-thomas.gitbooks.io/scripting-autodesk-revit-with-revitpythonshell/content/" target="_blank">Scripting Autodesk Revit with RevitPythonShell</a>  
- <a href="http://thebuildingcoder.typepad.com/files/cp3837-l_scripting_revitpythonshell_handout.pdf" target="_blank">Scripting RevitPythonShell Handout</a>  
- <a href="https://stackoverflow.com/questions/54325392/modify-selection-to-first-element-by-selection-setelementids" target="_blank">Selection Element Revit API</a>  
- <a href="https://revitpythonwrapper.readthedocs.io/en/latest/index.html" target="_blank">Revit Python Wrapper</a>  
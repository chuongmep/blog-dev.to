
## Introduction

In today's article, I will share with you an idea about a connectivity tool that opens up countless opportunities related to data analysis, AI, Machine Learning, and much more. That is how to connect Revit with Jupyter Notebook.

Before we dive in, I'd like to share some basic information about Jupyter Notebook and why it's important for the construction industry.

## Jupyter Notebook - Revit API

- **Jupyter Notebook** is an open-source tool, application, programming environment that allows you to create and share interactive documents containing code, equations, images, and descriptive text. What's special is that you can write code, execute it, and view the results right at the moment you write the code. This helps you save time and increase work efficiency. Additionally, you can directly write documentation within [Jupyter Notebook](https://jupyter.org/), enabling you to create descriptions, guides, and reports easily and quickly.

- **Revit** is a software for designing and managing construction projects, developed by Autodesk. Revit provides a range of powerful tools to help you design, analyze, and manage construction projects efficiently. What's particularly notable is that Revit provides a powerful API, allowing you to interact with data, designs, and manage construction projects flexibly and effectively. However, interacting with [Revit's API](https://help.autodesk.com/view/RVT/2022/ENU/?guid=Revit_API_Revit_API_Developers_Guide_html) is not always easy, especially when exchanging and analyzing data with other tools like Python, R, Matlab, and many more.
## Connecting Revit with Jupyter Notebook

If you're working with Grasshopper, you can easily use `gh-python-remote` to connect Grasshopper with [Jupyter Notebook](https://www.youtube.com/watch?v=fTGwIoCwtCI).

![](https://pypi-camo.freetls.fastly.net/ddad7e24ffe1eb1d8b23a33282e7b5c769245e5e/68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f4469676974616c2d537472756374757265732f6768707974686f6e72656d6f74652f396436373733666263306363333163633034326235363232616164643630373731366539353266372f47485f707974686f6e5f72656d6f74655f706c742e706e67)

However, if you're working directly with the Revit API, you can now use the open-source [bim-net-interactive](https://github.com/jowsy/bim-net-interactive) by [Joel Waldheim Saury](https://github.com/jowsy). This is a powerful tool that helps you connect Revit with Jupyter Notebook easily and effectively, with the latest connection source code under the C# language at the time of writing.

To connect Revit with Jupyter Notebook, you need to follow these steps:

- Download and install [bim-net-interactive](https://github.com/jowsy/bim-net-interactive). Installing ensures that you've correctly built the Revit version and .NET Framework.

- In Revit: Click "Add-ins" > NET Interactive > Show Dockable Pane.
Press the "start" button.

![](pic/Revit_pedjUx4hFc.png)


- Install the [.NET Interactive](https://devblogs.microsoft.com/dotnet/net-interactive-is-here-net-notebooks-preview-2/) Jupyter Notebook extension by running the following command in your terminal:

```bash
dotnet tool install -g Microsoft.dotnet-interactive
```

- Install extension for [Jupyter Notebook](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) and [Polyglot Notebooks](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-interactive-vscode)   

- Open Jupyter Notebook and connect to Revit through `bim-net-interactive`. Then connect to Autodesk Revit by using the #connect directive.But first, you need to install the RevitInteractive package by running the following command in your Jupyter Notebook:

```csharp
#r "nuget:RevitInteractive"
```

```csharp
#!connect revit --kernel-name revit24 --revit-version 2024
```

:::tip
Depending on the version of Revit you are using, you can change the `--revit-version` parameter accordingly.
:::

When a connection is established, look in the variable view and you'll find variables associated with the current context or model. The variable view shows variables available for referencing and sharing.

![](pic/variables-view.png)

Below we have added a C#-cell but is executing the code in Revit by using #!revit24-directive.

```csharp
#!revit24
var collector = new FilteredElementCollector(doc, uidoc.ActiveView.Id);
 
var listOfElements = collector
            .WhereElementIsNotElementType()
            .WhereElementIsViewIndependent()
            .ToElements();
display(listOfElements.Count());
```

Let's try to get the ProjectInformation from the current model.

```csharp
#!revit24
display(doc.ProjectInformation);
```
![](pic/Code_1gMASHYupu.png)

Let's try to pick an object element and see the element information:

```csharp
#!revit24
var refers  = uidoc.Selection.PickObject(Autodesk.Revit.UI.Selection.ObjectType.Element, "Select elements to refer");
var element = doc.GetElement(refers);
display(element);
```
![](https://private-user-images.githubusercontent.com/31106432/306116765-1934f4cf-3262-40cb-8718-abaeb5ef1e86.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDg4NjUwMTYsIm5iZiI6MTcwODg2NDcxNiwicGF0aCI6Ii8zMTEwNjQzMi8zMDYxMTY3NjUtMTkzNGY0Y2YtMzI2Mi00MGNiLTg3MTgtYWJhZWI1ZWYxZTg2LmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMjUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjI1VDEyMzgzNlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWYxYzIwNGNmYTE2MjJmMWQyYmZmZGY3MTAxYzhhZjMwMGRkNWE1N2E3NWZjNmVkMjM0MTJkY2Q4NWZkNWRlYjQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.Ovw1LXMaPTJN10R0SIyS-8Mm1HanHa-SUPzyZfCpJwE)

You can see the documentation example at [bim-net-interactive](https://github.com/jowsy/bim-net-interactive/tree/main/samples).

## The Future of Revit API and Jupyter Notebook

- **Revit API** is becoming increasingly powerful and flexible, allowing you to interact with data, designs, and manage construction projects more efficiently and flexibly. This opens up countless opportunities related to data analysis, AI, Machine Learning, and much more.

- Integration between Chatbots and Revit API enables you to interact with data, designs, and manage construction projects more easily and effectively.

- Utilizing multiple languages, this allows you to comfortably choose your preferred programming language while flexibly connecting with rich libraries from different programming language ecosystems.

- Training and learning about Revit API and Jupyter Notebook. 

- Data Exchange and Analysis with Revit API and Jupyter Notebook.

- Use power of Libray in [FSharp](https://fsharp.org/) language to Analyze and Visualize data in Revit.

- You now allready have the idea for your next project, right?

...

## Resources

* [bim-net-interactive](https://github.com/jowsy/bim-net-interactive/tree/main/samples)
* [IPython](https://ipython.org/ipython-doc/stable/overview.html#ipythonzmq)
* [NET Interactive](https://github.com/dotnet/interactive)
* [Literate Programming with LLMs](https://matt-rickard.com/literate-programming-with-llms)
* [Jupyter BIM](https://github.com/chuongmep/JupyterBIM)
* [ChatGPT System Prompts](https://github.com/mustvlad/ChatGPT-System-Prompts/tree/main)
* [dnMerge](https://github.com/CCob/dnMerge)


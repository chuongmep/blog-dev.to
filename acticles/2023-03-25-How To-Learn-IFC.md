
## Introduction

Recently, I have noticed an increase in people seeking advice on how to learn IFC. This article aims to provide helpful steps and resources to enable you to learn IFC efficiently. Let's begin!

![](pic/iShot_2023-03-25_22.29.11.png)

# What is IFC?

## 1. IFC is not a programming language

IFC is not a programming language. Rather, it is an open, neutral file format used for exchanging digital data between different software applications in the architecture, engineering, and construction (AEC) industry.

While programming languages are used to create software applications and define how they work, IFC is not a programming language in itself. Instead, it is a standard developed by buildingSMART, a global alliance of industry stakeholders that works to improve the productivity, sustainability, and safety of the built environment.

## 2. IFC is a file format for Building Information Modeling

IFC is a file format for Building Information Modeling (BIM). It is designed to support the interoperability of BIM software tools and applications, allowing stakeholders involved in a construction project to collaborate and share information seamlessly, regardless of the software they are using.

## 3. IFC is a standard

IFC is a standard developed by buildingSMART, a global alliance of industry stakeholders that works to improve the productivity, sustainability, and safety of the built environment. It is designed to support the interoperability of BIM software tools and applications, allowing stakeholders involved in a construction project to collaborate and share information seamlessly, regardless of the software they are using.

## Why use IFC?

Being open and neutral, the IFC standard is vendor agnostic, and can be supported across various software platforms, interfaces and applications. The standard acts as a common language to enhance information exchange and collaboration.

IFC also serves as data preservation against obsolescence of software versions, and with information being captured in a structured manner, it facilitates analysis and extraction of information.

for more information, you can read [BCA IFC](https://www1.bca.gov.sg/regulatory-info/building-control/corenet-x/resources/technical-knowledge-pages/ifc).

# How to learn IFC?

## 1. Learn from documentation

With the help of documentation, you can learn IFC very easily. Some of the popular documentation for IFC are:

- [IFC Documentation](https://standards.buildingsmart.org/IFC/RELEASE/IFC4/ADD2_TC1/HTML/) - The IFC documentation is the official documentation for IFC. It is a comprehensive guide that covers all aspects of the IFC standard, including the schema, links, and the IFC file format.

![](pic/iShot_2023-03-26_00.10.35.png)

- [Revit IFC Manual](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwjIqvrXpPf9AhXpcGwGHeHZAEMQFnoECAsQAQ&url=https%3A%2F%2Fforums.autodesk.com%2Fautodesk%2Fattachments%2Fautodesk%2F311%2F12625%2F1%2FRevit%2520IFC%2520Manual%2520202.0.pdf&usg=AOvVaw1exk_sFIzqhiySERUeWt79) - The Revit IFC Manual is a comprehensive guide that covers all aspects of the IFC standard, including the schema, links, and the IFC file format.

![](pic/iShot_2023-03-26_00.12.02.png)

- [IFC Reference Guide For Archicad](https://gsdownloads-cdn.azureedge.net/cdn/ftp/techsupport/documentation/IFC/IFC%20Reference%20Guide%20for%20ARCHICAD%2020.pdf) - The IFC Reference Guide For Archicad is a comprehensive guide that covers all aspects of the IFC standard, including the schema, links, and the IFC file format.

![IFC Scheme Setup](pic/iShot_2023-03-26_00.14.15.png)

## 2. Learn detail the schema

In the context of IFC, a schema refers to a standardized set of rules that defines the structure and contents of an IFC file. It specifies the properties and relationships that each building component can have, as well as how these components relate to each other in a building model.

The schema is defined using [EXPRESS](https://standards.buildingsmart.org/documents/Implementation/The_EXPRESS_Definition_Language_for_IFC_Development.pdf), a data modeling language that allows for the creation of precise and unambiguous definitions of data structures. This ensures that all software applications that use IFC files can interpret and exchange the data consistently and accurately, regardless of the software vendor or version.

A link in the context of IFC refers to the relationships between different building components in a building model. Links specify how different components are connected or related to each other, and they allow software applications to understand the physical and logical connections between components.

For example, a wall may be linked to a floor or a roof, and a window may be linked to a wall. By understanding these links, software applications can perform tasks such as energy analysis, clash detection, cost estimation, and facility management.

Overall, the schema and links are essential components of the IFC standard that enable interoperability between different software applications in the AEC industry.

## 2. Learn with Open Viewer

- Open Viewer is a free and open-source software that allows you to view IFC files. It is written in C++ and it is available for Windows, Linux, and macOS. You can download it [here](https://openifcviewer.com/) and learn IFC with it.

![](pic/iShot_2023-03-25_22.45.53.png)

- [BIN Vision](https://bimvision.eu/) - BIMvision is a freeware IFC model viewer. It allows to view the virtual models coming from CAD systems like Revit, Archicad, BricsCAD BIM, Advance, DDS-CAD, Tekla, Nemetschek VectorWorks, Bentley, Allplan, Strakon and others without necessity of having commercial licenses of these systems or having each of particular vendor’s viewer. BIMvision visualizes the BIM models created in IFC format 2×3 and 4.0. It has many built-in features and is the first viewer with plugin interface.

![](pic/iShot_2023-03-25_23.01.54.png)

## 3. Lean by Programming Language

Now, IFC supported by many programming languages. You can learn IFC by programming language. Example, you can learn IFC by C#, C++, Python, Java, etc. But I recommend you to learn IFC by Python. Because Python is very easy to learn and it is very popular programming language. Some of the popular libraries for IFC in Python are:

- [IfcOpenShell](https://ifcopenshell.org/) - IfcOpenShell is a free and open-source software library that allows you to read, write, and convert IFC files. It is written in C++ and Python, and it is available for Windows, Linux, and macOS. I also have write a example for [How to use IfcOpenShell in Python](https://gist.github.com/chuongmep/dee8eebeac64908d0f54a152f4d0a69b), you can read it.

![](pic/iShot_2023-03-25_22.37.31.png)

- [Blender BIM](https://blenderbim.org/) - BlenderBIM is a Blender add-on that allows you to create and edit IFC files. It is written in Python and it is available for Windows, Linux, and macOS use on Blender. Blender BIM also have [documentation](https://blenderbim.org/docs/) for learning IFC.

![](pic/iShot_2023-03-25_22.03.42.png)

- [sverchok](http://nortikin.github.io/sverchok/docs/main.html) - Scerchok is good to combine with Blender BIM. It includes a set of nodes that allow you to create parametric geometry and BIM data.

![](pic/iShot_2023-03-25_23.32.49.png)

- [Speckle Blender](hhttps://speckle.systems/tutorials/getting-started-with-speckle-for-blender/) - The Speckle Blender add-on is connector allows you can easily send and receive data from Speckle. It is written in Python and it is available for Windows, Linux, and macOS use on Blender.

![](pic/iShot_2023-03-26_11.07.34.png)

Let quick look to the example below, you can see how easy to use Speckle Blender to send and receive data from Speckle.

<iframe src="https://speckle.xyz/embed?stream=7c7fbebbf3&commit=56ba583015&c=%5B18.43877%2C3.00186%2C4.96196%2C9.23714%2C-5.61345%2C-2.09243%2C0%2C1%5D&autoload=true&noscroll=true&hidesidebar=true" width="680" height="400" frameborder="0"></iframe>

- [Omniverse](https://www.nvidia.com/en-us/omniverse/) - Omniverse is a free and open-source software that allows you to create, collaborate, and visualize 3D content. It is written in C++ and Python, and it is available for Windows, Linux, and macOS. It also have [documentation](https://docs.omniverse.nvidia.com/) for learning IFC.

![](pic/iShot_2023-03-26_10.54.53.png)

With some people familiar with C# Language, you can learn IFC by C# Language. Some of the popular libraries for IFC in C# are:

- [Xbim toolkit](https://docs.xbim.net/) - Xbim is a free and open-source software library that allows you to read, write, and convert IFC files. It is written in C# and it is available for Windows, Linux, and macOS.

![](pic/visualization_pipeline.png)

- [Hypar](https://github.com/hypar-io/Elements) - The library must be able to serialize data to formats that are useful to architects, engineers, contractors, and people building real-time visualization applications for AEC, like JSON, IFC,and glTF.

![](pic/iShot_2023-03-25_22.35.24.png)

- [Speckle IFC](https://speckle.guide/user/ifc.html) - Speckle is a free and open-source allow you to send and receive data from Speckle can use with IFC by import and use Speckle IFC to send and receive data from Speckle.

![](pic/iShot_2023-03-25_22.41.18.png)

- [DotBIM](https://www.dotbim.net/) - DotBIM is a free and open-source software library that allows you to transfer triangulated meshes with dictionary attached to it.

<iframe width="640" height="480" style="border:1px solid #eeeeee;" src="https://3dviewer.net/embed.html#model=https://raw.githubusercontent.com/paireks/dotbim/master/test/ExampleFiles/TestFilesFromGh/BeamBridgeExample.bim$camera=-35.59741,145.63725,129.34746,65.81832,24.83887,-32.54234,0.00000,1.00000,0.00000,45.00000$cameramode=perspective$envsettings=fishermans_bastion,off$backgroundcolor=255,255,255,255$defaultcolor=200,200,200$edgesettings=off,0,0,0,1"></iframe>

- [Autodek Platform Services](https://forge.autodesk.com/en/docs/model-derivative/v2/tutorials/convert-ifc-to-3d/) - The Forge Model Derivative API allows you can use with many formats like Dwg, Rvt,,..., including IFC, to explore metadata and viewer model. Project [Forge-revit.ifc.scheduler](https://github.com/Autodesk-Forge/forge-revit.ifc.scheduler) also good example for learning IFC.

![](pic/forge-revit-ifc-schedule.png)

- [AtomIfc](https://github.com/QonicOpen/AtomIfc) - AtomIFC is an open-source library for merging IFC files, developed and maintained by Qonic. AtomIFC is to allow architects, engineers, and other building professionals to work with BIM data as atomized, external objects, which can be packaged, versioned, merged, etc. The library will be made open-source, available under an MIT license, and will remain so forever.

With some people familiar than with Web Language like JavaScript, you can learn IFC by JavaScript Language. Some of the popular libraries for IFC in JavaScript are:

- [IfcJs](https://ifcjs.github.io/info/) - IFC.js is a JavaScript library to load, display and edit IFC models in the browser. It is written in JavaScript and it is available for Windows, Linux, and macOS. If you is new to JavaScript, you can learn JavaScript by [JavaScript Tutorial](https://www.w3schools.com/js/default.asp) or join IFC.js Crash Course 2023 from author by [collaborate](https://opencollective.com/ifcjs) donate with 100$.

![](pic/iShot_2023-03-25_22.59.37.png)

## Problem with IFC

Recently, I also see some problem with IFC. I think it is important to know about these problems. So, I will explain some of the problems with IFC.

- May be with name class like `Ifc<Name>` can we change to `Name` to make it more clear.

- Schema is very big and it is hard to learn. I think we should have a small schema for learning and a big schema for production.

I think blog [constructingdata.wordpress.com](https://constructingdata.wordpress.com/2019/05/06/streamlining-ifc/) and [ttps://forums.buildingsmart.org](https://forums.buildingsmart.org/t/what-would-you-like-to-see-most-in-the-modernization-of-ifc/1460) is good place to discuss about these problems.

## Conclusion

In this article, I have explained what is IFC and how to learn IFC. I hope you have enjoyed this article. If you have any questions, please leave a comment below. I will try to answer your questions as soon as possible. Thank you for reading this article.

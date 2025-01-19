
## Introduction

Three years ago, I wrote an article about [Revit Test Runner](https://chuongmep.com/posts/2021-02-01-RevitTestFuntion.html#revit-testrunner), which ended up being quite complicated. Today, I want to share a simpler approach to running unit tests for Revit projects using Visual Studio and Rider. This resource will be valuable if you are a Revit developer. Don't worry, I'll guide you through the process step by step.

Understanding this process is essential if you're a Revit developer. It will make your work more professional and efficient, ensure your code is clean, and maintain high quality.

I won't provide a detailed tutorial here, as it's available in the [Readme](https://github.com/ricaun-io/RevitTest). Instead, I'll help you understand how to customize it, encouraging you to follow the latest updates from the repository.

## Visual Studio

With Visual Studio, you can use the [NUnit Test Adapter](https://marketplace.visualstudio.com/items?itemName=NUnitDevelopers.NUnit3TestAdapter) extension to run unit tests for Revit projects. Here are the steps to do this, and fortunately, it's quite simple with the project provided by [ricaun](https://github.com/ricaun) called [RevitTest](https://github.com/ricaun-io/RevitTest). Just follow these steps:

1. Clone the RevitTest project:

```bash
git clone https://github.com/ricaun-io/RevitTest.git
```

2. Open the project in Visual Studio.
3. Build the solution.
4. Run the tests.

You should see the output like this:

![](pic/335409902-1fc84c37-63b7-4a1e-b83e-39e0740a0c44.png)

If you want to interact with the currently open project in Revit, you need to change the path of the working project by modifying the `FileName` property in your test class:

```csharp
protected override string FileName => @"<your path to the .rvt file>";
```

Make sure to replace `"<your path to the .rvt file>"` with the actual path to your Revit project file. This ensures that your tests will run against the correct Revit project file.

## Rider

1. In Rider, you can use the same GitHub project to run tests, but it requires a few additional configuration steps. Follow these instructions to set it up:

1.1 Open the project in Rider.

1.2 Navigate to `File` > `Settings`.

1.3 In the `Settings` menu, go to `Unit Testing`.

1.4 Enable the `VS Code Adapter Support`.

By following these steps, you will be able to run unit tests for Revit projects in Rider using the RevitTest project from GitHub.

![](pic/335779871-b051327a-dbaf-4ab9-b71d-568dc961a9d8.png)

2. Change Build To Visual Studio Code (In Case .NET SDK not working)

![](pic/335779866-7425326a-68ad-4a2b-a088-06ad8e0c687b.png)

3. From tab Nunit, need change option `Metadata` to `TestRunner` : 

![](pic/335810729-9b875e0d-1bba-493b-b566-4f7a34950d72.png)

Remember that you need `Refresh Unit Test Tree` to ignore case load duplicate if it exits. 

4. Here you go, you can run and testing your test : 

![](pic/335810833-11348efc-5248-4197-89dc-88bed080111f.png)

In case make you confuse, you can follow the video step by step : 

<iframe width="720" height="400" src="https://www.youtube.com/embed/4_7ZqZCj7jE?si=ipRoVag8OQlKE310" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Conclusion

I hope in this post, will help you more intersecting and help improvement you process and have fun with develop something cool inside Revit.

And still have many resouce you can explore with recomend from author like : 

Ricaun RevitTest - https://github.com/ricaun-io/RevitTest

Dynamo's Revit Tester Framework - https://github.com/DynamoDS/RevitTestFramework

Geberit's Revit Test Runner - https://github.com/geberit/Revit.TestRunner

Speckle's Revit Test Runner - https://github.com/specklesystems/xUnitRevit

NeVeSpl's RevitTestLibrary - https://github.com/NeVeSpl/RevitTestLibrary

## Nothing Related

Recenlly, I'm trying to understand what is meaning of life, and I founded a lot of interesting things. I will share with you soon.

## Introduction

Recently, I have received many questions about maintaining the [Dynamo Script](https://forum.dynamobim.com/) files that I created about 5 years ago. It's been quite a long time, and I have forgotten some things. Today, technology has changed a lot, and when it becomes frustrating, I will write this article to share with you how you can easily maintain the Dynamo Script files you have created.

I hope this article will help you understand the current state of the Dynamo Script files you are using and make it easier for you to maintain them.

![](pic/Dynamo_Problem_Change.png)

## Low Code, Code, and No Code

If you are not familiar with [Dynamo](https://dynamobim.org), I can give you a brief introduction. [Dynamo](https://dynamobim.org) is a visual programming software that allows you to create scripts without needing to know how to code. This enables those without programming knowledge to create scripts effortlessly. However, if you have programming experience, you can also create complex libraries and scripts comparable to those in a conventional programming language.

::: tip Note
This versatility makes Dynamo exciting for engineers, as it enables rapid problem-solving and development, reducing the time required for project changes and adaptations in the construction industry.
:::

## 1. Problems with Dynamo Script

The first headache I want to mention is that Dynamo scripts are often written by individuals with very little collaboration. Additionally, the structure of the connections complicates maintenance. This complexity makes maintaining these scripts more challenging.

![Example Dynamo Script](pic/94143692_10222161469892588_8660716812679249920_n.jpg)

Over time, even you might not understand why you wrote the scripts the way you did, further complicating maintenance. When we talk about code, we have [classes](https://en.wikipedia.org/wiki/Class_(computer_programming)), [functions](https://en.wikipedia.org/wiki/Functional_programming), [methods](https://en.wikipedia.org/wiki/Method_(computer_programming)), [design pattern](https://refactoring.guru/design-patterns) and many other elements that make code maintenance easier.

![](pic/bkzgzfme71441.jpg)

In the context of Dynamo Script, we deal with [nodes](https://primer.dynamobim.org/03_Anatomy-of-a-Dynamo-Definition/3-1_dynamo_nodes.html), the connections between [nodes](https://primer.dynamobim.org/03_Anatomy-of-a-Dynamo-Definition/3-1_dynamo_nodes.html), and the values we pass between nodes. How to group nodes effectively, how to organize functions logically, and other similar considerations are crucial for efficient script management.

## 2. Problems with .NET Framework and .NET Core

Another major issue developers face when maintaining [Upgrade Dynamo](https://forum.dynamobim.com/t/dynamo-upgrading-to-net-6) Script files is the transition from .NET Framework to [.NET Core](https://thebuildingcoder.typepad.com/blog/2023/08/15-years-polygon-areas-and-net-core.html). Many libraries and scripts you previously created may no longer function as they used to. This complicates maintenance significantly. You will have two choices:

1. Completely stop supporting older versions.
2. Maintain both old and new scripts compatible with [.NET Core](https://dotnet.microsoft.com/en-us/download) and [.NET Framework](https://dotnet.microsoft.com/en-us/download/dotnet-framework).

I recommend following the second approach because, typically, construction projects cannot easily switch software versions. Some reasons for this include:

- The duration of a construction project often aligns with the project completion timeline, which can take 1-2 years or even longer.
- The cost of transitioning from one version to another is not cheap.
- Issues related to stability, flexibility, and security of the new version can arise.

Therefore, maintaining Dynamo Script files requires careful consideration. Neglecting this can alienate your loyal users and create new conflicts that you have not encountered before. The post [Resource](https://forum.dynamobim.com/t/share-resource-to-help-package-authors-upgrade-to-net8-for-revit-2025/99723) to help package authors upgrade to .NET8 for Revit 2025 I wrote on the Dynamo Forum will help you understand how to do this.

## 3. Problems with the Package Library Store

One issue I've been vocal about over the years is the flexibility in releasing versions of Dynamo [packages](https://dynamopackages.com). Let me elaborate on this:

- You have users on two versions with different compatibilities, and you want all your users to receive the latest updates.

- You want to insert a patch in between annual releases, but you can't do this because the Package Store limits the number of versions higher than lower versions.

## 4. Problems with Zero Touch Node

Yes, all the aforementioned complexities are further compounded by the maintenance of [Zero Touch Node](https://developer.dynamobim.org/03-Development-Options/3-4-zerotouch-nodes.html) libraries. This approach allows you to write your core functions in a strongly-typed language, ensuring that your end users face minimal risks while using them.

![](pic/DynamoScriptVersion.png)

However, once again, you cannot update these on the Store. This is why I released the [OpenMEP](https://github.com/chuongmep/OpenMEP) package on GitHub, to make it easier for you to update to new versions through packaging in an MSI installer.

A couple months ago, I wrote a post on the Dynamo Forum about [Resource to help package authors upgrade to .NET8 for Revit 2025](https://forum.dynamobim.com/t/share-resource-to-help-package-authors-upgrade-to-net8-for-revit-2025/99723) to help you understand how to update your Zero Touch Node libraries to the latest version.

## 5. Problems with Python Script

If you remember the post [Dynamo Support Python 3]( https://chuongmep.com/posts/2020-06-10-Dynamo-Python-3-Support-Issue-Thread.html) and [Awesome Dynamo](https://chuongmep.github.io/Awesome-Dynamo/DynamoML/intro.html) meaning you is a fan of my blog long time ago. I also talked alot about worries that the Engine Python version in Dynamo will be upgraded to Python 3, and warned that this would cause many problems for users. And now, it has happened.

The transition from [IronPython 2.7](https://ironpython.net/) to [CPython 3](https://forum.dynamobim.com/t/ironpython-to-cpython/85413/8) is, in my opinion, a partly correct decision but not fully realized as expected. Upgrading wouldn't be an issue if Python scripts weren't broken in the process. I can see numerous users encountering errors with no solutions on the new versions. This might take the Dynamo team a long time to resolve.

![](pic/DynamoPythonProblem.png)

The [DSIronPython3](https://github.com/DynamoDS/DSIronPython3) library might serve as an alternative solution in the future to ensure compatibility between different versions of Dynamo Script.

## How to Solve

Nevertheless, we have no choice but to make the best of their limitations. Here are some effective ways to address the current issues:

- **Continue using the [IronPython 2.7](https://github.com/DynamoDS/DSIronPython) Engine for Python Script commands.**
  
- **Share your Dynamo Script commands widely and as soon as possible.** If you keep them to yourself, there may come a day when no one can help you. I hope that won't be you. Keeping knowledge on the internet is better than keeping it in your head.

- **Use [Zero Touch Node](https://developer.dynamobim.org/03-Development-Options/3-4-zerotouch-nodes.html) to minimize risk for end users.**

- **Train end users** to avoid current issues with alternative solutions, and regularly update them with changes from the Dynamo Team.

- **Replace them with other solutions** such as Add-ins, Macros, or other software as needed.

## Conclusion

There is nothing guaranteed today and a perfect lifecycle in 3-4 years in software development and maintenance in Architecture, Engineering, and Construction (AEC). Therefore, be careful and mindful of the changes you are making. I hope this helps you avoid overload issues and maintain stability in maintaining your favorite scripts.

I learned a talk I like recently, "

::: tip Quote
You can't control the wind, but you can adjust the sails. 
:::
I hope you can adjust your sails to navigate the stormy seas of software development.
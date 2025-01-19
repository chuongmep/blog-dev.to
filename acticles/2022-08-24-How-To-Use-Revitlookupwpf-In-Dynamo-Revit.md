
## Introduce

Hi all, today I want introduce something small trick to help you understand and explore Dynamo API with properties, method,... in Dynamo Revit. What makes me think of this is that the geometry objects in Dyanmo are defined separately and some objects you have no way of looking up their details.This is a big plus for everyone who wants to explore automation, dynamo, RevitAPI,... and more.

![](pic/_Image_6f45e26b-26b0-434f-b754-8c98f8d1b309.png)

###  RevitLookupWpf

RevitLookupWpf is a application allow user to look up properties, method in Revit API. But when user use Dynamo Revit and want lookup like that, we need go back to Revit and use some tools common like : 

- [Revit lookup](https://github.com/jeremytammik/RevitLookup)
- [RevitLookupWpf](https://github.com/weianweigan/RevitLookupWpf)
- [RevitDBExplorer](https://github.com/NeVeSpl/RevitDBExplorer)

Last week, I tried build a package connect with assembly revitlookupwpf and use clr to interactive with API inside Dynamo Revit. If you wants use now, let download revitlookupwpf [latest version](https://github.com/weianweigan/RevitLookupWpf/releases) in github first.

![](pic/_Image_8f25316b-5244-4a93-aea5-02ad55abdb85.png)

Then install a package with name **RevitlookupWpf** in Dynamo Package Manager.

![](pic/_Image_77c46ad0-6628-4f83-acbe-b76e625217ce.png)

If you are using Revit **2023** or higher, please download package **Dynamo Ironpython 2.7** included before run.

![](pic/_Image_1a3dcd0b-6b44-40d1-b667-594bb2ff87a4.png)

If screen show something image with tick mark blue is sucessfully.
![](pic/_Image_6d70b174-422c-40c8-bccd-3f84a69d0c7c.png)

If node init return is True is mean can use RevitlookupWpf inside Dynamo Revit.

Okays, let access to the dynamo and try snoop elements from node inside package download,

- Snoop Element and Snoop Multiple Elements

![](pic/Revit_kalf9eQI5h.gif)

- Snoop Element By Id

![](pic/Revit_UOAHn01vHO.gif)

- Snoop Current Selected In Revit

![](pic/Revit_YfLBpUjATi.gif)

- Snoop Any Object you want.

![](pic/xBl3B2i6pQ.gif)

## Conclusion

In this post we resolved the problem confuse about api information use snoop information to explore, hope it useful with people is learning Dynamo 🤗. If you have any issues, please comment in post: [https://github.com/weianweigan/RevitLookupWpf/pull/52https://github.com/weianweigan/RevitLookupWpf/pull/52](https://github.com/weianweigan/RevitLookupWpf/pull/52)
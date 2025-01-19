
## Introduction

If you are working with Autodesk [Design Automation](https://aps.autodesk.com/design-automation-apis), this article is an ideal resource for you to explore its underlying aspects further. In this article, we will delve into the execution code of **Design Automation** automatically, along with the automatic results retrieval through **GitHub Actions**. This way, we can minimize risks and ensure integrity during the transition, extracting data from the developer side before the official release to users.

![](pic/firefox_aaJ4lHLlru.png)

## Why Github Action 

Yes, we can run test at the local machine, but bellow is some reason why we should use Github Action for test **Design Automation** : 

- We can run test on multiple platform (Windows, Linux, MacOs)
- We can run test on multiple version of .NET (5.0, 6.0)
- Easier to collaborate with other developer.
- We don't need setup environment for each developer machine, just need to setup once for Github Action.

- We know issue early, when we push code to repository, Github Action will run test automatically and send result to us.

- Protect your secret intergrade on cloud .

In this article, we will use .NET 6.0 and [Ubuntu](https://ubuntu.com/) 20.04 for test **Design Automation**. In real case project we should test on multiple platform and multiple version of .NET depend on your setting configuration.

## Project Setup

Ensure that your project includes executable functions through [Unit Test](https://learn.microsoft.com/en-us/visualstudio/test/getting-started-with-unit-testing?view=vs-2022&tabs=dotnet%2Cmstest). 

Let's take an example where I want to test the automatic extraction of room data from [BIM 360](https://www.autodesk.com/bim-360/) during the development process:

```cs {6}
[TestCase("b.ca790fb5-141d-4ad5-b411-0461af2e9748", "urn:adsk.wipprod:fs.file:vf.HX2O8xKUxfukJ_hgHsrX_A",35,35)]
[Test]
public async Task RevitDesignAutomateRoomTest(string projectId, string urn,int startVersion,int endVersion)
{
       string forgeToken = await ForgeService.Get2LeggedToken(configuration.ClientId,configuration.ClientSecret);
        Status executeJob = // DO SOMETHING With YOUR TEST HERE
        Assert.IsTrue(executeJob == Status.Success);
}
```

## Github Action

Below is a template that allows the execution of code automatically through GitHub Action. To use this template, you need to provide information such as `APS_CLIENT_ID` and `APS_CLIENT_SECRET` through **GitHub Secrets**.

![](pic/firefox_hzR67oJXtA.png)

The `workflow.yml` file should be placed in the .github/workflows directory of your repository. Now, let's include environment variables in the [workflow.yml](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions) file:

```bash
env:
  APS_CLIENT_ID: ${{ secrets.APS_CLIENT_ID }}
  APS_CLIENT_SECRET: ${{ secrets.APS_CLIENT_SECRET }}
```

This is how the `workflow.ym`l file looks like:

```yaml {28-29}
name: .NET

on:
  push:
    branches: [ "dev" ]
  pull_request:
    branches: [ "dev" ]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: 6.0.x
    - name: Restore dependencies
      run: dotnet restore
    - name: Build
      run: dotnet build --no-restore
    - name: Test
      run:
        dotnet test --no-build --verbosity normal
      env:
        APS_CLIENT_ID: ${{ secrets.APS_CLIENT_ID }}
        APS_CLIENT_SECRET: ${{ secrets.APS_CLIENT_SECRET }}
```

The returned test results will be displayed as follows, depending on your Console.WriteLine adjustments. Below is an example of a test executed on the Ubuntu platform through GitHub Action with the RevitDesignAutomateRoomTest method:

```bash {26-28}
Starting test execution, please wait...
A total of 1 test files matched the specified pattern.
NUnit Adapter 4.3.0.0: Test execution started
Running all tests in /home/runner/work/forge-client/forge-client/AutomationUnitTest/bin/Debug/net6.0/AutomationUnitTest.dll
   NUnit3TestExecutor discovered 2 of 2 NUnit test cases using Current Discovery mode, Non-Explicit run
  Passed TestAuthentication [1 s]
Is Composite Design: False
Retrieving app bundles
Found existing app bundle: chuong.ExtractRoomAppNew+dev
Start Retrieving activity
Found existing activity, id : chuong.ExtractRoomAppNewActivity+dev
ActivityId: chuong.ExtractRoomAppNewActivity+dev
Download URL: https://developer.api.autodesk.com/oss/v2/buckets/wip.dm.prod/objects/7c62b949-4b30-4c13-a8f0-4635a9f4fb75.rvt
TreeArgument: https://developer.api.autodesk.com/oss/v2/signedresources/3ccca991-5428-402f-b9a8-73073268a73b?region=US
Start Create WorkItem
WorkItemStatus: Pending
Working Item Id: e2b90b36d2574ac4baff59315790e807
Status: Pending
WorkItemStatus: Success
Result:https://dasprod-store.s3.amazonaws.com/workItem/chuong/e2b90b36d2574ac4baff59315790e807/report.txt?X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQCIHHt3FNfeOF4R8wBeoE6%2B6LwQ9As1ciV%2F5Dl2acS2RAIhANXAGCP8FqMHfXw%2BqtQf6JYQhc09tQf%2Bj%2BbCMxczia8dKoADCHMQBBoMMjIwNDczMTUyMzEwIgyz7ePWgqN%2BTDs91MUq3QJaR6vkLznBHYciQJTFXMo2457hyB9PNb%2FsNzTFmhtOKxse5MJopcR8MEY9P0nz7ftEs%2FE7ZBmzfdHWcmumubVMiZKNF4SUAC7dDzAwUzYaNH9qEsMYAwAjJ6nB226bBiKeUjDQsc6dyiVasG%2FF7W%2BMnVh8wXrVHnUog%2BTvDD3exXxUoTtDfbZzvRgtLHFNpI6o4yjXF6csLvGYdKS%2FhSj9bTxOBCtdgmcgl2FUu9BxtIB9oybbpMyeZ43Bz1DCzvHJfMLwPwtsqU1Q%2FrqLKLJh%2FcDGLmIFzXereXmOTjG17AWVlX5ehYcpXCtXTF6aAtg9bnvxImxWD1FbU3OHvmlvy239FramNC7vYFGOdRnUlRNFMBKrtKVmJFTJS8XMkTg5sm3IB53uNTbFyayGXeh%2FJpDZ0wM0GMaBDFKS7TYZOCHe%2F7d2HhD2Mz9UoWJav9KFm463jkksbZ89frAFMMPI8KsGOp0BiXhrpshoXKSPnefOTrYzZSov%2BDY2vN3rmB965gomaXI3E%2BRCRFo%2Fltmrl2VJ3ESFh2xexbPUmscm1CmjmHsLx0zs2mYUa34WLx5JgDutZWy0U%2FmjoMh7vAVSmj0Tsu02UVQqKh1MGCuLzDzrnZjtbIgH3Cb8f3yW1uyKMSqMtkktzTtxy%2BF1A38FYSaP6gZNQppuPjzhN7DRODUVfw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIATGVJZKM3NXTS4OYP%2F20231215%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231215T101008Z&X-Amz-SignedHeaders=host&X-Amz-Signature=5c4b8b0faec341def9440ffbe9a8895e73fc5dd98715a9c0d56b09132cb8e2fc

NUnit Adapter 4.3.0.0: Test execution complete
  Passed RevitDesignAutomateRoomTest("b.ca790fb5-141d-4ad5-b411-0461af2e9748","urn:adsk.wipprod:fs.file:vf.HX2O7xKUQfukJ_hgHsrX_A",35,35) [2 m 7 s]

Test Run Successful.
Total tests: 2
     Passed: 2
 Total time: 2.1915 Minutes
```

This is how Github Action look like : 

![](pic/firefox_geqIFErptB.png)

You can use for test Authentication, Create Activity, Create WorkItem, Get Result, etc.

```cs {9-10}
 [Test]
    public void TestAuthentication()
    {
        string clientId = Environment.GetEnvironmentVariable("APS_CLIENT_ID");
        Assert.IsNotNull(clientId);
        string clientSecret = Environment.GetEnvironmentVariable("APS_CLIENT_SECRET");
        Assert.IsNotNull(clientSecret);
        // Your Code Here
        //Task<string> get2LeggedToken = ForgeService.Get2LeggedToken(clientId, clientSecret);
        //string token = get2LeggedToken.Result;
        Assert.IsNotNull(token);
    }
```

::: tip Note
Note that automatically executed code also implies incurring corresponding costs for Design Automation during execution. Therefore, careful consideration is necessary before usage, along with thoughtful consideration of employing crucial test templates.
:::
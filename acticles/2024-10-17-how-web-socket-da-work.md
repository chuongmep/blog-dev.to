
## Introduction

When using Design Automation directly from a client device (for example, a desktop machine, mobile phone, or laptop) you cannot set up onComplete or onProgress arguments that point back to the client device. This forces these applications to make repeated GET requests to find the progress of a workitem. This is inefficient and, due to increased energy use, contributes to global warming. Therefore Design Automation offers WebSocket endpoints.

WebSocket with Design Automation can use Authentication 2legged or 3legged. In this post, I will show you how to use WebSocket with Design Automation to start a work item and receive the result.


## Run Web Socket With Work Item

This C# code establishes a WebSocket connection to a server, sends data, and then listens for responses asynchronously.

1. Connection: It uses ClientWebSocket to connect to a secure WebSocket endpoint.
2. Sending Data: A workItem object is serialized into JSON format and sent along with an authorization token.
3. Receiving: It calls a method to handle incoming messages (presumably in a continuous loop).
4. Closing: Once the task is complete, the WebSocket connection is closed gracefully, and a log message is printed to indicate disconnection.


```cs
private async void StartWebsocket(WorkItem workItem)
    {
        using (ws = new ClientWebSocket())
        {
            await ws.ConnectAsync(new Uri("wss://websockets.forgedesignautomation.io"), CancellationToken.None);

            JObject wsClientData = new JObject(new JProperty("action", "post-workitem"),
                new JProperty("data", JObject.FromObject(workItem)),
                new JProperty("headers",
                    new JObject(new JProperty("Authorization", $"Bearer {_configuration.Token!.AccessToken}"))));
            var data = JsonConvert.SerializeObject(wsClientData, Formatting.Indented);
            await ws.SendAsync(new ArraySegment<byte>(Encoding.UTF8.GetBytes(data)), WebSocketMessageType.Text, true,
                CancellationToken.None);
            //receiving loop
            await Receiving();
            //close
            await ws.CloseAsync(WebSocketCloseStatus.NormalClosure, string.Empty, CancellationToken.None);
            Console.WriteLine("\tDisconnected...");
        }
    }
```

This is Receiving

```cs
/// <summary>
/// The Receiving.
/// </summary>
/// <returns>The <see cref="Task"/>.</returns>
private static async Task Receiving()
{
    var buffer = new byte[4096];
    var shouldExit = false;
    while (!shouldExit)
    {
        var result = await ws.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

        if (result.MessageType == WebSocketMessageType.Text)
        {
            var wsRes = Encoding.UTF8.GetString(buffer, 0, result.Count);
            wsresp = JsonConvert.DeserializeObject<WSResponse>(wsRes);
            if (wsresp == null) continue;
            if (wsresp.Action.Equals("error"))
            {
                Console.WriteLine(wsRes);
                break;
            }

            if (wsresp.Action.Equals("status"))
            {
                Console.WriteLine($"\tWorkitem Id: {wsresp.Data.Id}..{wsresp.Data.Status}");
                switch (wsresp.Data.Status)
                {
                    case Status.Cancelled:
                    case Status.FailedDownload:
                    case Status.FailedInstructions:
                    case Status.FailedUpload:
                    {
                        Console.WriteLine($"\t\tReport Downloaded {wsresp.Data.ReportUrl}");
                        shouldExit = true;
                        break;
                    }
                    case Status.Success:
                    {
                        Console.WriteLine($"\t\tReport Downloaded {wsresp.Data.ReportUrl}");
                        shouldExit = true;
                        break;
                    }
                }
            }
        }

        if (result.MessageType == WebSocketMessageType.Close)
        {
            await ws.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, "ok", CancellationToken.None);
            break;
        }
    }
}
```

This pattern allows real-time, full-duplex communication with a server, often used for updates or task management systems.

### Execute Work Item

In workitem setting, you need to remove the `onComplete` and `onError` event, and use a websocket to receive the result. 

```cs
private async Task<Report> ExecuteWorkItem(string forgeToken, string versionId, string callBackUrl)
    {
        Console.WriteLine("ActivityId: " + _configuration.ActivityFullName);
        (XrefTreeArgument xrefTreeArgument, string modelName) buildInputFileUrl =
            await BuildInputFileURL(forgeToken, _configuration.ProjectId, versionId).ConfigureAwait(false);
        Console.WriteLine("Download URL: " + buildInputFileUrl.xrefTreeArgument.Url);
        XrefTreeArgument treeArgument = await BuildUploadURL(forgeToken).ConfigureAwait(false);
        Console.WriteLine("TreeArgument: " + treeArgument.Url);
        XrefTreeArgument inputJsonArgument = BuildInputJsonArgument(versionId);
        WorkItem workItem = new WorkItem()
        {
            ActivityId = _configuration.ActivityFullName,
            Arguments = new Dictionary<string, IArgument>()
            {
                { "inputFile", buildInputFileUrl.xrefTreeArgument },
                { "result", treeArgument },
                { "inputJson", inputJsonArgument },
                // {"onComplete", new XrefTreeArgument
                // {
                //     Verb = Verb.Post,
                //     Url = callBackUrl
                // }}
            },
            LimitProcessingTimeSec = 3600,
        };
        Console.WriteLine("Start Create WorkItem");
        WorkItemStatus workItemStatus = await _designAutomation.CreateWorkItemAsync(workItem).ConfigureAwait(false);
        StartWebsocket(workItem);
        //Console.WriteLine("WorkItemStatus: " + workItemStatus.Status);
        //Console.WriteLine("Working Item Id: " + workItemStatus.Id);
        // wait until the work item is finished
        // while (!workItemStatus.Status.IsDone())
        // {
        //     await Task.Delay(TimeSpan.FromSeconds(2)).ConfigureAwait(false);
        //     workItemStatus = await _designAutomation.GetWorkitemStatusAsync(workItemStatus.Id).ConfigureAwait(false);
        //     if (workItemStatus.Status != Status.Success && workItemStatus.Status != Status.Inprogress)
        //     {
        //         Console.WriteLine("Status: " + workItemStatus.Status);
        //         Console.WriteLine(workItemStatus.ReportUrl);
        //     }
        // }

        Console.WriteLine("WorkItemStatus: " + workItemStatus.Status);
        Report report = new Report()
            { Status = workItemStatus, Result = DownloadOutputStream(forgeToken, treeArgument) };
        return report;
    }
```

If not, you will get an error like this:

```bash
{
  "conversationId": "null",
  "action": "error",
  "data": "Invalid payload. Specified argument was out of the range of valid values. (Parameter \u0027Workitem should not have an onComplete argument.\u0027)"
}
```

## Output

Let's see the output when you run the code above, this is result in console include all the steps from create nickname, create app bundle, create activity, create work item, and receive the result use websocket.

```bash
Start Create NickName
NickName: chuong is exist
Created NickName: chuong
Retrieving app bundles
Start Create new app bundle
Created new bundle: chuong.ExtractRoomNameTestAppv2023
Created new alias version: dev pointing to 1
Uploaded app bundle: D:\API\Forge\TestDesignAutomationConsole\DesignAutomationAddIn\DesignAutomation\ExportRoomName.zip
Start Retrieving activity
Created new activity: chuong.TestExtractRoomNamev2023
Created new alias for activity Version: 1 ID: dev: 
ActivityId: chuong.TestExtractRoomNamev2023+dev
Download URL: https://developer.api.autodesk.com/oss/v2/buckets/wip.dm.prod/objects/9cd6d12c-fa22-4494-9962-3d78539c6daa.rvt
TreeArgument: https://cdn.us.oss.api.autodesk.com/oss/v2/signedresources/9e8a6d6a-2896-4651-833d-6d607365ae24?region=US
Start Create WorkItem
WorkItemStatus: Pending
Downloading result file...
        Workitem Id: b9da1c9747d04a788add3564fa9dbd66..Pending
Delete Design Automation Job Activity
Delete Design Automation Job Bundle
Status:
{
  "status": "pending",
  "stats": {
    "timeQueued": "2024-10-17T02:54:25.2258828Z"
  },
  "id": "3d3353341f8a44299c08eff90028d9a9"
}
```

### Issue with use diffrence account:

If you use a different account to create a work item and receive the result, you will get an error like this:

```bash
{
  "conversationId": "null",
  "action": "error",
  "data": "\"User\u003dCDyOiNsaxB40g7hxSr0TeCWfGVZXW0VS cannot access a resource owned by Owner\u003dchuong.\""
}
```

In case you have a susscess work item, you will get a response like this:

```bash
{
	"conversationId": "null",
	"action": "status",
	"data": {
		"status": "pending",
		"activityId": "chuong.TestWebsocketv2023+dev",
		"stats": {
			"timeQueued": "2024-10-17T02:49:18.1485352Z"
		},
		"id": "40ce5dcedc6e4adfaad05468bd6e133d"
	}
}
```

### Reference

- [WebSocket API](https://aps.autodesk.com/en/docs/design-automation/v3/developers_guide/websocket-api/)

- [Websocket API Reference](https://aps.autodesk.com/en/docs/design-automation/v3/reference/websocket/)

- [UploadUtilFor-ACC](https://github.com/MadhukarMoogala/UploadUtilFor-ACC)
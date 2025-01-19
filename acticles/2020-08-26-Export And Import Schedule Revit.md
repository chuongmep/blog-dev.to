## Description

This revit add-in (Excel Export-Import) allows users to export Schedule from Revit to Excel. Users can change the data information from the exported Excel file and put the information back into the Schedule Revit, the data in Revit will update automatically according to the changed data. The information modification is accurately controlled and easily synchronized.

## Benefits

- Strict information management to avoid errors.
- Data storage, easy access, export quickly and optimize.
- Reduce human cost risk, speed up the project.

## Limitation

1.	Do not work with the elements inside a “Group” on the Model.

![](pic/GroupModelExport.png)

2.	Not support import with the Materials Schedule.

![](pic/MissMaterial.png)

## Installation sequence

1. Save the API to local drive or Server. Double click the ***APISetup.msi file submitted to start install.

![](pic/SetupBOMSchedule00.png)

2. Click “Next” to continue

![](pic/SetupBOMSchedule.png)

- Click “Browse” to choose the path save the data will be installed, if you don’t want to set it you can ignore and use the default path.
- Choose install for Everyone user or only your user.

![](pic/SetupBOMSchedule001.png)

`Note: If you see an error as below during the install process, you need to uninstall the old version and run install again from step 1.`

![](pic/SetupBOMSchedule002.png)

## Export Schedule From Revit To Excel

1. In the Revit environment, open the “BOM Schedule” addin as below:

![](pic/SetupBOMSchedule003.png)

2. Setup to export:
- Click the “Export” Tab
- Select the BOM schedule you need to export at “Check column”
- Choose option :

    - One File Excel: All BOM schedules will be exported to only one excel file

    - Event File Excel: Each BOM schedule will be exported to each excel file

- Click “Export” to continue

![](pic/SetupBOMSchedule004.png)

Note: You can select from “Search” bar the required.

![](pic/SetupBOMSchedule005.png)

3. Select the path will save the excel file after export and click “OK” to continue.

![](pic/SetupBOMSchedule006.png)

`Note: When it shows the notification as below, the process export completed.`

![](pic/SetupBOMSchedule007.png)

Go to the folder you choose to save the exported file. Open and work with it.

![](pic/SetupBOMSchedule008.png)

`Note: Only the “gray color” columns can change information and auto import into Revit.`

![](pic/SetupBOMSchedule009.png)

## Import schedule information changed from excel to Revit

1. After the information in the Excel file changed, you can follow the steps below to auto-update that information into Revit.

- In the Revit environment, open the “BOM Schedule” addin as below:

![](pic/SetupBOMSchedule003.png)

- Click the “Import” Tab.

![](pic/SetupBOMSchedule0010.png)

- Click “Browse” to choose the Excel file need to import

![](pic/SetupBOMSchedule0011.png)

- Select the schedule need to import into Revit and click “Import” to implement

![](pic/SetupBOMSchedule0012.png)

- Waiting process complete.

![](pic/SetupBOMSchedule0013.png)

`Note: When it shows the notification as below, the process export completed.`

![](pic/SetupBOMSchedule0014.png)

## Demo

<iframe width="750" height="422" src="https://www.youtube.com/embed/JlRvYg_W9Ek" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Log Changed

**V1.0.1:** 

First Demo

**V1.0.2:** 

First Release

![](pic/BOM_Schedule1.0.0.png)

**V1.0.3:**

Update UI And Logic
Update Performance, Operating Speed

![](pic/UpdateBOMSchedule1.0.3.png)

**V1.0.4:**

Update Export Schedule Support Include File Revit Linked In Model.

![](pic/SetupBOMSchedule0015.png)


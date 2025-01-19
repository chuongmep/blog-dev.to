
## Introduction

Block is a group of objects that are combined into a single named object. The objects in a block retain their original properties, such as layer, color, linetype, and lineweight. You can explode them into their component objects by using the EXPLODE command or you can edit them with the REFEDIT command. Today, we will learn how to extract a block from a drawing, and resolve some issues that may occur during the process with data extraction.

## Extract CAD Block

Here are various approaches to extract information from CAD blocks:

1.Data Extraction Command: Utilize the built-in "Data Extraction" command in AutoCAD to extract block information. This command allows you to define the properties and filters for extraction and save the data in a table format.

2.Autocad API with .NET: Employ the Autocad API with .NET programming languages such as C# or VB.NET to interact with AutoCAD programmatically. This API provides extensive functionality to access block data, iterate through entities, and extract the desired information.

3.AutoLISP: Use AutoLISP, a dialect of Lisp programming language specifically designed for AutoCAD, to extract block information. AutoLISP enables you to create custom programs and scripts within AutoCAD, allowing for efficient manipulation of block data.

4.VBA: Utilize VBA (Visual Basic for Applications) to automate AutoCAD and extract block information. VBA enables you to write macros and custom programs that interact with AutoCAD's object model to retrieve block data.

5.Autocad Python Script: Leverage the power of Python programming language by using the Autocad Python Script (pyautocad) library. This library provides a Python interface to AutoCAD, allowing you to write scripts to extract block information and perform various operations.

6.Autocad Com API: Interact with AutoCAD using the Component Object Model (COM) API. This API allows you to automate AutoCAD through COM-compatible programming languages like Visual Basic, C++, or C#. You can access block information, extract data, and perform other operations programmatically.

Consider the specific requirements of your project, programming skills, and desired level of automation when choosing the most appropriate method for extracting CAD block information.

This article focuses on utilizing the Data Extraction command to extract dynamic CAD block information while addressing potential issues that may arise during the extraction process. By employing this command, we aim to explore the intricacies and challenges associated with extracting dynamic data from CAD blocks.

Step 1: Create a new Data Extraction by using Data Extraction command

![](https://github.com/chuongmep/DataBlog/blob/master/2023-06-27-Extract-CAD-Block-Dynamic/pic/acad_3LIL3dgLBY.png?raw=true)

Step 2 : Set up to save the Data Extraction to a file

![](https://github.com/chuongmep/DataBlog/blob/master/2023-06-27-Extract-CAD-Block-Dynamic/pic/acad_sFhyZvrFMB.png?raw=true)

Step 3: Select the source file to extract

![](https://github.com/chuongmep/DataBlog/blob/master/2023-06-27-Extract-CAD-Block-Dynamic/pic/acad_UcXMmjsEEN.png?raw=true)

Step 4 : Select the object type to extract

![](https://github.com/chuongmep/DataBlog/blob/master/2023-06-27-Extract-CAD-Block-Dynamic/pic/acad_fiOoj6JH5W.png?raw=true)

Step 5 : Select the properties to extract

![](https://github.com/chuongmep/DataBlog/blob/master/2023-06-27-Extract-CAD-Block-Dynamic/pic/acad_4dNkmOC4FR.png?raw=true)

Step 6 : Predefine the output format

![](https://github.com/chuongmep/DataBlog/blob/master/2023-06-27-Extract-CAD-Block-Dynamic/pic/acad_u2tFsI9gIE.png?raw=true)

Step 7: Select the output file and finish the process

![](https://github.com/chuongmep/DataBlog/blob/master/2023-06-27-Extract-CAD-Block-Dynamic/pic/EXCEL_lOnfjzqMNo.png?raw=true)

Now that the process is complete, we can examine the results in the Excel file. However, it's important to note that this ideal case applies primarily to simple blocks. Let's now delve into some potential issues that may arise during this process.

## Name of Anonymous Block

When using the Data Extraction command, it's important to note that the list of blocks to extract may not include the Anonymous Block Names. Therefore, only information related to blocks with explicit names will be extracted. For instance, in the provided image, the block is named "No host family," while its Anonymous Block Name is "*U183."

![](https://github.com/chuongmep/DataBlog/blob/master/2023-06-27-Extract-CAD-Block-Dynamic/pic/EXCEL_apHbpIDdrI.png?raw=true)

To retrieve the anonymous block name and other relevant information, we can utilize the Autocad API with .NET. The code snippet provided below demonstrates how to accomplish this task. The program prompts the user for the input layer name and output file path when executing the command. The obtained data, including the anonymous block name, block name, and location coordinates (x, y, z), is then written to a CSV file.

The process of extracting block information using the Autocad API with .NET is as follows:

- Prompt the user for the layer name
- Display the Save File dialog
- Open the block table for read
- Open the current space block table record for read
- Iterate through all the entities in the current space
- Check if the entity is a block reference
- Open the block reference for read
- Check if the block reference is on the specified layer
- Get the anonymous block name
- Get the block name
- Get the location coordinates (x, y, z)
- Write the data to the CSV file

```cs:line-numbers

[CommandMethod("ExportBlockCoordinate")]
public void Export()
{
    Document doc = Application.DocumentManager.MdiActiveDocument;
    Editor editor = doc.Editor;
    Database db = doc.Database;

    // Prompt the user for the layer name
    PromptResult promptResult = editor.GetString("\nEnter the layer name: ");
    if (promptResult.Status != PromptStatus.OK)
    {
        editor.WriteMessage("\nInvalid input. Layer name not provided.");
        return;
    }
    string layerName = promptResult.StringResult;

    // Display the Save File dialog
    SaveFileDialog saveFileDialog = new SaveFileDialog();
    saveFileDialog.Filter = "CSV Files (*.csv)|*.csv";
    saveFileDialog.Title = "Save Block Information";
    // save file name with current datetime 
    saveFileDialog.FileName = $"BlockCoordinate_{DateTime.Now.ToString("yyyyMMddHHmmss")}";
    DialogResult dialogResult = saveFileDialog.ShowDialog();

    if (dialogResult != DialogResult.OK)
    {
        editor.WriteMessage("\nInvalid input. Output file path not provided.");
        return;
    }
    string filePath = saveFileDialog.FileName;

    using (Transaction tr = db.TransactionManager.StartTransaction())
    {
        // Open the block table for read
        BlockTable blockTable = tr.GetObject(db.BlockTableId, OpenMode.ForRead) as BlockTable;

        // Open the current space block table record for read
        BlockTableRecord spaceRecord = tr.GetObject(db.CurrentSpaceId, OpenMode.ForRead) as BlockTableRecord;

        using (StreamWriter writer = new StreamWriter(filePath))
        {
            // Write the CSV header
            writer.WriteLine("Anonymous Name,Block Name,X,Y,Z,Rotation");

            // Iterate through all the entities in the current space
            foreach (ObjectId entityId in spaceRecord)
            {
                Entity entity = tr.GetObject(entityId, OpenMode.ForRead) as Entity;

                // Check if the entity is a block reference and on the specified layer
                if (entity is BlockReference blockRef && blockRef.Layer.Equals(layerName, StringComparison.OrdinalIgnoreCase))
                {
                    string AnonymousName = String.Empty;
                    // Get name of anonymous block
                    if (blockRef.IsDynamicBlock)
                    {
                        BlockTableRecord? blockTableRecord = tr.GetObject(blockRef.DynamicBlockTableRecord, OpenMode.ForRead) as BlockTableRecord;
                        AnonymousName = blockTableRecord?.Name?? String.Empty;
                        string blockName = blockRef.Name;
                        Point3d location = blockRef.Position;
                        double rotation = ToDeg(blockRef.Rotation);
                        // Write the block information to the CSV file
                        writer.WriteLine($"{blockName},{AnonymousName},{location.X},{location.Y},{location.Z},{rotation}");
                        editor.WriteMessage(blockName);
                    }
                    else
                    {
                        string blockName = blockRef.Name;
                        Point3d location = blockRef.Position;
                        double rotation = ToDeg(blockRef.Rotation);
                        // Write the block information to the CSV file
                        writer.WriteLine($"{blockName},{AnonymousName},{location.X},{location.Y},{location.Z},{rotation}");
                    }
                }
            }
        }

        tr.Commit();
    }
    editor.WriteMessage($"\nBlock information exported to: {filePath}");
    Process.Start(filePath);

}
double ToDeg(double rad)
{
    return rad * (180.0 / Math.PI);
}
```

![](https://github.com/chuongmep/DataBlog/blob/master/2023-06-27-Extract-CAD-Block-Dynamic/pic/EXCEL_wEi6Hg95Ho.png?raw=true)

This code snippet can available in the following GitHub repository: [CadAddinManager](https://github.com/chuongmep/CadAddinManager/blob/dev/Test/ExportBlockCoordinate.cs)

For those interested in utilizing AutoLISP, the following code snippet provides a quick way to access information about Anonymous block names:

```lisp:line-numbers
(if (setq ss (ssget "_X" (list (cons 0 "INSERT"))))

    (progn

      (while (setq en (ssname ss 0))

        (progn

          (setq bna (vla-get-effectivename (vlax-ename->vla-object en)))

          (setq na (vla-get-name (vlax-ename->vla-object en)))

          (princ (strcat bna "\n"))

          (princ (strcat na "\n"))

          (ssdel en ss)

        );progn

      );while

    );progn

)
```

# Extract with Speckle BIM 

Speckle is a powerful platform designed to facilitate the extraction and exchange of information from various software programs used in the architecture, engineering, and construction (AEC) industry, such as Revit, AutoCAD, Rhino, and ArchiCAD. By leveraging Speckle, you can effortlessly transfer data from AutoCAD to the platform and access it using the provided API, enabling seamless utilization of the data from anywhere you need it.

<iframe src="https://speckle.xyz/embed?stream=088f1b9f0d&commit=11ad702ec5&c=%5B8.49789%2C9.03194%2C7.0343%2C3.96914%2C3.28025%2C0%2C0%2C1%5D&transparent=true&hidecontrols=true&hidesidebar=true" width="750" height="450" frameborder="0"></iframe>

To begin, it is essential to utilize the Speckle AutoCAD Plugin to send data from your [AutoCAD](https://speckle.systems/tag/autocad/) software.

This is some process to save your data to csv 

- Download package Specklepy

```bash
# Install update Specklepy 
!pip install --upgrade pip
!pip install --upgrade specklepy
```

- Authentication

```py:line-numbers
# Import Library Specklepy
import specklepy
from specklepy.api.client import SpeckleClient
from specklepy.api.credentials import get_default_account
# Get your account info
account = get_default_account()
print("Name of account: " + account.userInfo.name)
client = SpeckleClient(host="speckle.xyz")
client.authenticate_with_account(account)
```

- Get your stream with commit contains your data 

```py:line-numbers
# Get your stream sent from Autocad
# url = https://speckle.xyz/streams/088f1b9f0d/commits/11ad702ec5
streamId = "088f1b9f0d" 
stream = client.stream.get(streamId)
print("Name of stream: " + stream.name)
# Get all commit from your stream 
# get list of commits
commits = client.commit.list(streamId)
print("Number of commits: " + str(len(commits)))
# Get specific commit
commitId = "11ad702ec5"
commit = client.commit.get(streamId, commitId)
from specklepy.transports.server import ServerTransport
from specklepy.api import operations
transport = ServerTransport(client=client, stream_id=streamId)
res = operations.receive(commit.referencedObject, transport)
blocks = res["@Blocks"]

```
- Transpose your data to DataFrame

```py:line-numbers
# Create a dictionary with information of blocks
data = []
for block in blocks:
    dictBlocks = {}
    dictBlocks["Name"] = block.definition.name
    dictBlocks["X"] = block.transform.matrix[3]
    dictBlocks["Y"] = block.transform.matrix[7]
    dictBlocks["Z"] = block.transform.matrix[11]
    data.append(dictBlocks)
```

![](https://github.com/chuongmep/DataBlog/blob/master/2023-06-27-Extract-CAD-Block-Dynamic/pic/iShot_2023-06-30_13.33.47.png?raw=true)

- Use numpy library to transpose to DataFrame and save csv file

```py:line-numbers
# Create a dataframe with information of blocks
import pandas as pd
df = pd.DataFrame(data)
print(df.head(10))
# Save dataframe to csv file
df.to_csv("blocks.csv", index=False)

```

How about rotation of block ?

Yes, by calculate angle with transformation matrix 4x4, we can calculate the angle of rotation, let me try send a block with location is :

```
x = 957.49
y = 15.0643969 
z = 0
rotation_angles = (20, 0, 0)  # Roll = 20 degrees
```

now, we will try create again [Spatial Transformation Matrices](https://www.brainvoyager.com/bv/doc/UsersGuide/CoordsAndTransforms/SpatialTransformationMatrices.html) from location of block and rotation angles to test what happens with data result from speckle server. A rotation matrix rotates an object about one of the three coordinate axes, or any arbitrary vector. The rotation matrix is more complex than the scaling and translation matrix since the whole 3x3 upper-left matrix is needed to express complex rotations. It is common to specify arbitrary rotations with a sequence of simpler ones each along one of the three cardinal axes. In each case, the rotation is through an angle, about the given axis. The following three matrices RX , RY and RZ and represent transformations that rotate points through the angle θ in radians about the coordinate origin:

![](https://github.com/chuongmep/DataBlog/blob/master/2023-06-27-Extract-CAD-Block-Dynamic/pic/firefox_djTZf10iHx.png?raw=true)

```py:line-numbers
import numpy as np
import math

def create_transform_matrix(x, y, z, rotation_angles):
    # Convert rotation angles to radians
    rotation_angles_radians = np.radians(rotation_angles)
    roll, pitch, yaw = rotation_angles_radians

    # Create rotation matrices for each axis
    rotation_x = np.array([
        [1, 0, 0, 0],
        [0, math.cos(roll), -math.sin(roll), 0],
        [0, math.sin(roll), math.cos(roll), 0],
        [0, 0, 0, 1]
    ])

    rotation_y = np.array([
        [math.cos(pitch), 0, math.sin(pitch), 0],
        [0, 1, 0, 0],
        [-math.sin(pitch), 0, math.cos(pitch), 0],
        [0, 0, 0, 1]
    ])

    rotation_z = np.array([
        [math.cos(yaw), -math.sin(yaw), 0, 0],
        [math.sin(yaw), math.cos(yaw), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ])

    # Create the translation matrix
    translation = np.array([
        [1, 0, 0, x],
        [0, 1, 0, y],
        [0, 0, 1, z],
        [0, 0, 0, 1]
    ])

    # Combine rotation and translation matrices
    transform_matrix = np.dot(translation, np.dot(rotation_z, np.dot(rotation_y, rotation_x)))

    return transform_matrix

# Example input
x = 957.49
y = 15.0643969 
z = 0
rotation_angles = (20, 0, 0)  # Roll = 20 degrees

# Create and print the transformation matrix
transform_matrix = create_transform_matrix(x, y, z, rotation_angles)
print("Transformation Matrix:\n", transform_matrix)

```

Result : 

```text
Transformation Matrix:
 [[ 1.00000000e+00  0.00000000e+00  0.00000000e+00  9.57490000e+02]
 [ 0.00000000e+00  9.39692621e-01 -3.42020143e-01  1.50643969e+01]
 [ 0.00000000e+00  3.42020143e-01  9.39692621e-01  0.00000000e+00]
 [ 0.00000000e+00  0.00000000e+00  0.00000000e+00  1.00000000e+00]]
```

But you can do with this way better.In this updated function, we create a 4x4 rotation matrix that includes the additional row and column for homogeneous coordinates. The translation matrix is also expanded to include the homogeneous coordinates.We then compute the transformation matrix by multiplying the translation matrix with the rotation matrix using np.dot(), but in the reversed order compared to the previous function. This is because the transformation matrix should first apply the rotation and then the translation.

```py:line-numbers
import math
import numpy as np

def create_transformation_matrix(x, y, z, angle):
    # Convert the angle to radians
    angle_rad = math.radians(angle)
    
    # Create the rotation matrix
    rotation_matrix = np.array([[math.cos(angle_rad), -math.sin(angle_rad), 0, 0],
                                [math.sin(angle_rad), math.cos(angle_rad), 0, 0],
                                [0, 0, 1, 0],
                                [0, 0, 0, 1]])
    
    # Create the translation matrix
    translation_matrix = np.array([[1, 0, 0, x],
                                   [0, 1, 0, y],
                                   [0, 0, 1, z],
                                   [0, 0, 0, 1]])
    
    # Compute the transformation matrix
    transformation_matrix = np.dot(translation_matrix, rotation_matrix)
    
    return transformation_matrix
x = 957.49
y = 15.0643969
z = 0
angle = 20

transformation_matrix = create_transformation_matrix(x, y, z, angle)
print(transformation_matrix)

```
Result : 

```text
[[ 9.39692621e-01 -3.42020143e-01  0.00000000e+00  9.57490000e+02]
 [ 3.42020143e-01  9.39692621e-01  0.00000000e+00  1.50643969e+01]
 [ 0.00000000e+00  0.00000000e+00  1.00000000e+00  0.00000000e+00]
 [ 0.00000000e+00  0.00000000e+00  0.00000000e+00  1.00000000e+00]]
```

Now, we also can create a function to check weather input matrix can be calculate with result is 20 degrees or not ?

```py:line-numbers
import numpy as np
import math

def get_rotation_angles(matrix):
    # Extract the rotation submatrix
    rotation_matrix = matrix[:3, :3]

    # Calculate the rotation angles using the axis-angle representation
    axis_angle = rotation_matrix_to_axis_angle(rotation_matrix)
    rotation_angle = np.linalg.norm(axis_angle)
    rotation_axis = axis_angle / rotation_angle

    # Convert the rotation angle to degrees
    rotation_angle_degrees = math.degrees(rotation_angle)

    return rotation_axis, rotation_angle_degrees

def rotation_matrix_to_axis_angle(matrix):
    trace = np.trace(matrix)
    angle = math.acos((trace - 1) / 2.0)

    axis = np.array([
        matrix[2, 1] - matrix[1, 2],
        matrix[0, 2] - matrix[2, 0],
        matrix[1, 0] - matrix[0, 1]
    ])

    axis /= (2 * math.sin(angle))

    return axis * angle

# Example matrix
matrix = np.array([
    [0.9396926, -0.342020154, 0, 957.49],
    [0.342020154, 0.9396926, 0, 15.0643969],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
])

# Calculate and print the rotation angles
print("Test with Example:")
rotation_axis, rotation_angle = get_rotation_angles(matrix)
print("Rotation Axis:", rotation_axis)
print("Rotation Angle (Degrees):", round(rotation_angle, 2))

# Test with result transformation
print("Test result transformation:")
# Calculate and print the rotation angles
rotation_axis, rotation_angle = get_rotation_angles(transformation_matrix)
print("Rotation Axis:", rotation_axis)
print("Rotation Angle (Degrees):", round(rotation_angle, 2))
```
Result:

```text
Test with Example:
Rotation Axis: [0. 0. 1.]
Rotation Angle (Degrees): 20.0
Test result transformation:
Rotation Axis: [0. 0. 1.]
Rotation Angle (Degrees): 20.0

```

Demo file download at : [SpeckleGetBlock.ipynb](https://github.com/chuongmep/chuongmep.github.io/blob/master/.Ipynb/SpeckleGetBlock.ipynb)

## Extract with Cad Com API

The CAD Com API is a powerful COM-based interface that enables seamless automation of AutoCAD and various CAD applications. In this example, we will demonstrate the utilization of the [OpenMEP](https://github.com/chuongmep/OpenMEP) package to extract essential block information from a drawing file.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-06-27-Extract-CAD-Block-Dynamic/pic/firefox_VjHCacQyaT.png?raw=true)

To begin, we should install the [OpenMEP](https://github.com/chuongmep/OpenMEP) package via the Dynamo Package Manager. Once installed, we can leverage the `BlockReference.Name` node to extract the names of the block information from the drawing file. It is important to note that this operation necessitates having the drawing file open in AutoCAD.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-06-27-Extract-CAD-Block-Dynamic/pic/DynamoBlockName.png?raw=true)

For the anonymous block name, we can use the `BlockReference.EffectiveName` property to get the anonymous block name. The `EffectiveName` property returns the name of the block reference, or the name of the anonymous block definition if the block reference is inserted from an anonymous block definition.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-06-27-Extract-CAD-Block-Dynamic/pic/DynamoBlockEffName.png?raw=true)


## Conclusion

In this article, we have delved into the complexities and obstacles involved in extracting dynamic data from CAD blocks. We have thoroughly examined the challenges that arise when attempting to retrieve block information from a drawing file. To address these hurdles, we have provided a comprehensive demonstration of extracting block information utilizing two approaches: the Data Extraction command and the Cad Com API. By exploring these methods, readers can gain valuable insights into effectively extracting data from CAD blocks, see you in the next article.

## References

Please follow the links below for more information: [With which node is it possible to identify a block specifically from the cad link?](https://forum.dynamobim.com/t/with-which-node-is-it-possible-to-identify-a-block-specifically-from-the-cad-link/90283/1)

[SpatialTransformationMatrices](https://www.brainvoyager.com/bv/doc/UsersGuide/CoordsAndTransforms/SpatialTransformationMatrices.html)
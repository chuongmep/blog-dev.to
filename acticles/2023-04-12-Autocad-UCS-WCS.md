

## Introduction

Transforming points between the World Coordinate System (WCS) and the User Coordinate System (UCS) is a common operation in AutoCAD programming, especially when working with 3D models or complex drawings. In this post, we will explain how to perform this transformation using the AutoCAD API.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-04-12-Autocad-UCS-WCS/pic/WCS-UCS.png?raw=true)

## Convert Points From WCS To UCS

In AutoCAD, you can use the AutoCAD API to transform points from World Coordinate System (WCS) to User Coordinate System (UCS) or vice versa. Here's an example of how to transform a point from WCS to UCS using C#:

```cs:line-numbers
using Autodesk.AutoCAD.ApplicationServices;
using Autodesk.AutoCAD.DatabaseServices;
using Autodesk.AutoCAD.Geometry;

public static Point3d ConvertPointWcsToUcs(Point3d pointWcs)
{
    Document doc = Application.DocumentManager.MdiActiveDocument;
    Database db = doc.Database;
    Editor ed = doc.Editor;

    // Get the current UCS
    Matrix3d ucsMatrix = ed.CurrentUserCoordinateSystem;

    // Invert the UCS matrix to get the WCS matrix
    Matrix3d wcsMatrix = ucsMatrix.Inverse();

    // Transform the point from WCS to UCS
    Point3d pointUcs = pointWcs.TransformBy(wcsMatrix);

    return pointUcs;
}

```

This code retrieves the current UCS matrix using the Editor.CurrentUserCoordinateSystem property, and then inverts the matrix using the Matrix3d.Inverse() method to get the WCS matrix. It then transforms the input point from WCS to UCS using the Point3d.TransformBy() method with the WCS matrix as the transformation matrix, and returns the transformed point in UCS.

## Convert Points From UCS To WCS

You can also transform a point from UCS to WCS using the same approach, but using the UCS matrix instead of the inverse UCS matrix:

```cs:line-numbers
public static Point3d ConvertPointUcsToWcs(Point3d pointUcs)
{
    Document doc = Application.DocumentManager.MdiActiveDocument;
    Editor ed = doc.Editor;

    // Get the current UCS
    Matrix3d ucsMatrix = ed.CurrentUserCoordinateSystem;

    // Transform the point from UCS to WCS
    Point3d pointWcs = pointUcs.TransformBy(ucsMatrix);

    return pointWcs;
}
```
This code retrieves the current UCS matrix and transforms the input point from UCS to WCS using the Point3d.TransformBy() method with the UCS matrix as the transformation matrix, and returns the transformed point in WCS.

## Convert Point From Xref To UCS

If you are working with Xrefs, you can also transform a point from the Xref coordinate system to UCS. Here's an example of how to do this using C#. This code assumes that the Xref is loaded in the current drawing and that the Xref name is "sub.dwg", now I want get correct location of the block defined in the Xref in the current drawing. Block Name: "Sub" at point, X=-61688.363  Y=58443.779  Z=    0.000

![](https://github.com/chuongmep/DataBlog/blob/master/2023-04-12-Autocad-UCS-WCS/pic/_Image_2f49c7a2-3665-418f-b082-372858ff5443.png?raw=true)

We can try open the Xref and get the block location in the Xref. Block Name: "Sub$0$test" at point, X= 1518.856  Y= 2544.455  Z=    0.000

![](https://github.com/chuongmep/DataBlog/blob/master/2023-04-12-Autocad-UCS-WCS/pic/LRFNzOQnwF.png?raw=true)

This is the code example to get correct location of the block defined in the Xref in the current drawing:

```cs:line-numbers
try
{
    Document doc = Application.DocumentManager.MdiActiveDocument;
    Editor ed = doc.Editor;
    Database database = doc.Database;
    PromptSelectionResult selRes = ed.GetSelection();
    Matrix3d wcs = doc.Editor.CurrentUserCoordinateSystem.Inverse();
    using Transaction tr = database.TransactionManager.StartTransaction();
    if (selRes.Status == PromptStatus.OK)
    {
        SelectionSet selSet = selRes.Value;
        ObjectId[] objectIds = selSet.GetObjectIds();
        ed.WriteMessage("User Picked :"+objectIds.Length.ToString());
        Point3d curPt = default;
        Point3d stepPt = default;
        foreach (ObjectId objectId in objectIds)
        {
            BlockReference blockReference =
                (BlockReference) doc.TransactionManager.GetObject(objectId, OpenMode.ForRead);
            // Get position of block reference
            Point3d position = blockReference.Position;
            curPt = position.TransformBy(wcs);
            // Get the block table record
            BlockTableRecord tableRecord =
                (BlockTableRecord) doc.TransactionManager.GetObject(blockReference.BlockTableRecord, OpenMode.ForRead);
            // Get Entity of block table record
            foreach (ObjectId id3 in tableRecord)
            {
                Entity entity3 = (Entity) doc.TransactionManager.GetObject(id3, OpenMode.ForRead);
                if (entity3 is BlockReference)
                {
                    BlockReference blockReference2 = (BlockReference) entity3;
                    // Get position of block reference
                    Point3d position2 = blockReference2.Position;
                    stepPt = position2.TransformBy(wcs);
                }
            }
            // curPt add stepPt
            curPt = curPt.Add(stepPt.GetAsVector());
            MessageBox.Show(curPt.ToString());
            return;
            
        }
    }
    tr.Commit();
}
catch (Exception e)
{
    MessageBox.Show(e.ToString());
}
```
Result: 

```xml
Point, X=-60169.522  Y=60988.222  Z=    0.000
```
![](https://github.com/chuongmep/DataBlog/blob/master/2023-04-12-Autocad-UCS-WCS/pic/_Image_7d625028-f70f-4b29-aeff-918fe70b3263.png?raw=true)

## Conclusion

Transforming points between WCS and UCS is a simple but powerful operation that can help you manipulate and analyze 3D models and complex drawings. By using the CoordinateSystem3d class and the `ConvertPointWcsToUcs` and `ConvertPointUcsToWcs` methods, you can easily perform this transformation in your AutoCAD programs.

## Explore More

[https://spacio.ai/](https://spacio.ai/), The all-in-one tool for designing buildings.Spacio is a cutting-edge building design tool in the browser. Built for architects and engineers.Speed up your design process by getting access to thousands of existing floor plans which adapts to your design. Spacio is trained on a vast training set of floor plans in order to automate and assist the design process.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-04-12-Autocad-UCS-WCS/pic/msedge_wiugrjkkAS.gif?raw=true)

## References

Demo File : [TransformPointsFromWCSToUCS.zip](https://1drv.ms/u/s!AmKukXZ0HxiElq99cTuXnHrlaQfaQw?e=JmCO86)
## Giới thiệu

Đây là một trong những dự án ngẫu hứng trong lúc làm việc của mình, lúc đầu mình cũng không nghĩ là mình sẽ làm ra dự án này để hỗ trợ cho Autocad nữa vì nhiều lý do thời gian.Nhưng việc ngứa ngáy tay chân với ironpython nên mình quyết định thử với nó.Kết quả là chạy rất ổn với ironpython 2.7.Trong tương lai sẽ tiếp tục nâng cấp và hỗ trợ với các bản python đời cao.Có lẽ là sẽ với PythonNET hoặc ironpython3.

![Ribbon Python Shell](pic/Ribbon.png)

CADPythonShell (CPS), cho phép bạn viết các plugin cho Autocad bằng Python, cung cấp cho bạn một trình bao bọc tương tác, cho phép bạn xem kết quả mã của mình khi bạn nhập mã. Điều này rất tốt để khám phá API Autocad. 

![Console](pic/console.gif)

## Các Tính năng chính.

1.Trình thông dịch IronPython tương tác để khám phá API.Với đánh dấu cú pháp và tự động hoàn thành (chỉ trong bảng điều khiển console).

![](pic/ironpyn.jpg)

2.Toàn quyền truy cập vào khung công tác .NET của Autocad API và Civil3D API.

![](pic/MainApp.png)

3.Lưu lệnh và thực thi tại chỗ, giúp bạn chia sẻ hoặc tạo ra các scripts đơn giản và tuyệt vời.

![](pic/saveas.png)

4.Snoop : Hỗ trợ tra cứu nhanh chóng thuộc tính đối tượng Autocad và Civil3D.

![](pic/snoop.png)

5.Snoop Advanced : Hỗ trợ tra cứu đầy đủ Database,Editor,Entities,Events,Handle,...

## Cài đặt

Bạn có thể tải xuống bản cài đặt cuối cùng ổn định (msi) từ <a href="https://github.com/chuongmep/CADPythonShell/releases/latest" target="_blank">releases</a> 

![](pic/welcomeinstall.png)

Sử dụng lệnh `PythonConsole` để mở Bảng điều khiển hoặc sử dụng lệnh `PythonShellSetting` để mở cài đặt biểu mẫu.

Bạn có thể xem chi tiết hướng dẫn cài đặt tại <a href="https://github.com/chuongmep/CadPythonShell/wiki/How-to-Install-CadPythonShell" target="_blank">How-to-Install-CadPythonShell</a> 

`_Lưu ý_`: Hỗ trợ 4 phiên bản mới nhất (2020-2023) Autocad hoặc Civil 3D. Các phiên bản cũ hơn có thể được sử dụng nhưng sẽ không đảm bảo hiệu suất như mong đợi.

## Cách sử dụng cơ bản 

<kbd>PythonConsole</kbd>: Mở bảng điều khiển Python

![](pic/pythoncmd.png)

<kbd>PythonShellSetting</kbd> :  Mở bảng điều khiển cấu hình cài đặt.

<kbd>Snoop</kbd> : Snoop Đối tượng trong CAD hoặc Civil3D

<kbd>SnoopDB</kbd> - Snoop đầy đủ Database trong CAD hoặc Civil3D

![](pic/SnoopDB.png)

<kbd>SnoopEd</kbd> - Snoop đầy đủ Editor trong CAD hoặc Civil3D

![](pic/SnoopEditor.png)

<kbd>SnoopEnts</kbd> - Snoop đầy đủ Entities trong CAD hoặc Civil3D

![](pic/SnoopEntities.png)

<kbd>SnoopNEnts</kbd> - Snoop đầy đủ Entities Nested trong CAD hoặc Civil3D

<kbd>SnoopByHandle</kbd> - Snoop đầy đủ Handle trong CAD hoặc Civil3D

![](pic/SnoopByHandle.png)

<kbd>SnoopEvents</kbd> - Theo dõi sự kiện bên trong CAD hoặc Civil3D

![](pic/SnoopEvents.png)

Theo dõi Database thay đổi tức thời

![](pic/EventChangeDatabase.gif)

<kbd>Các hàm snoop bên trong python console :</kbd>

`sn.Snoop(obj)` : Snoop Object bằng Python Console Trong CAD hoặc Civil3D

`snoop(obj)` : Snoop Object bằng Python Console hoặc Thực thi mã python trong CAD hoặc Civil3D

## Một số ví dụ cơ bản

### Xoá đối tượng :

Đối với Ironpython Console : 

```py
#Copyright(c) 2021, Hồ Văn Chương
# @chuongmep, https://chuongmep.com/
import clr
import sys
sys.path.append('C:\Program Files (x86)\IronPython 2.7\Lib')
import os
import math
clr.AddReference('acmgd')
clr.AddReference('acdbmgd')
clr.AddReference('accoremgd')
# Import references from AutoCAD
from Autodesk.AutoCAD.Runtime import *
from Autodesk.AutoCAD.ApplicationServices import *
from Autodesk.AutoCAD.EditorInput import *
from Autodesk.AutoCAD.DatabaseServices import *
from Autodesk.AutoCAD.Geometry import *
doc = Application.DocumentManager.MdiActiveDocument
ed = doc.Editor
db = doc.Database
result = ed.GetEntity("Please Select Object To Delete")
if(result.Status==PromptStatus.OK): objId = result.ObjectId
#Code Here : 
with doc.LockDocument():
	with doc.Database as db:
		with db.TransactionManager.StartTransaction() as t:
			obj = t.GetObject(objId, OpenMode.ForWrite)
			obj.Erase()
			t.Commit()
			print("Object Deleted")
```

Đối với .NET : 

```cs
CommandMethod("DeleteEntity")]
        public void cmdDeleteEntity()
        {
            var doc = AcApp.DocumentManager.MdiActiveDocument;
            var ed = doc.Editor;
            var db = doc.Database;

            var result = ed.GetEntity("Please select an entity to delete");
            if (result.Status != PromptStatus.OK) return;

            using (var tr = db.TransactionManager.StartTransaction())
            {
                var obj = tr.GetObject(result.ObjectId, OpenMode.ForWrite);
                obj.Erase();

                tr.Commit();
            }
        }
```

### Tạo Line

Đối với Ironpython Console : 

```py
#Copyright(c) 2021, Hồ Văn Chương
# @chuongmep, https://chuongmep.com/
import clr
import sys
sys.path.append('C:\Program Files (x86)\IronPython 2.7\Lib')
import os
import math
clr.AddReference('acmgd')
clr.AddReference('acdbmgd')
clr.AddReference('accoremgd')
# Import references from AutoCAD
from Autodesk.AutoCAD.Runtime import *
from Autodesk.AutoCAD.ApplicationServices import *
from Autodesk.AutoCAD.EditorInput import *
from Autodesk.AutoCAD.DatabaseServices import *
from Autodesk.AutoCAD.Geometry import *
doc = Application.DocumentManager.MdiActiveDocument
ed = doc.Editor
db = doc.Database
#Code Here : 
objects = []
p1 = Point3d(0,0,0)
p2 = Point3d(100,100,0)
line1 = Line(p1,p2)
with doc.LockDocument():
	with doc.Database as db:
		with db.TransactionManager.StartTransaction() as t:
			bt = t.GetObject(db.BlockTableId,OpenMode.ForRead)
			btr  = t.GetObject(bt[BlockTableRecord.ModelSpace],OpenMode.ForWrite)
			btr.AppendEntity(line1)
			t.AddNewlyCreatedDBObject(line1,True)
			t.Commit()
			print("Line Created")
```

Đối với .NET : 

```cs
[CommandMethod("AutoCADSamples", "CreateLine", CommandFlags.Modal)]
        public void CreateLineCommand()
        {
            var document = Application.DocumentManager.MdiActiveDocument;
            var database = document.Database;
            var editor = document.Editor;

            try
            {
                using (var transaction = database.TransactionManager.StartTransaction())
                {
                    var blockTable = (BlockTable)transaction.GetObject(database.BlockTableId, OpenMode.ForRead);
                    var modelSpace =
                        (BlockTableRecord)
                            transaction.GetObject(blockTable[BlockTableRecord.ModelSpace], OpenMode.ForWrite);

                    var startPt = new Point3d(0.0, 0.0, 0.0);
                    var endPt = new Point3d(100.0, 100.0, 0.0);

                    var line = new Line(startPt, endPt);

                    modelSpace.AppendEntity(line);
                    transaction.AddNewlyCreatedDBObject(line, true);

                    transaction.Commit();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
```

### Tạo Box3D

Đối với Ironpython Console : 

```py
#Copyright(c) 2021  Hồ Văn Chương
# @chuongmep  https://chuongmep.com/
import clr
import sys
sys.path.append('C:\Program Files (x86)\IronPython 2.7\Lib')
import os
import math
clr.AddReference('acmgd')
clr.AddReference('acdbmgd')
clr.AddReference('accoremgd')
# Import references from AutoCAD
from Autodesk.AutoCAD.Runtime import *
from Autodesk.AutoCAD.ApplicationServices import *
from Autodesk.AutoCAD.EditorInput import *
from Autodesk.AutoCAD.DatabaseServices import *
from Autodesk.AutoCAD.Geometry import *
doc = Application.DocumentManager.MdiActiveDocument
ed = doc.Editor
db = doc.Database
# Write Code Below

with doc.LockDocument():
	with doc.Database as db:
		with db.TransactionManager.StartTransaction() as t:
			bt = t.GetObject(db.BlockTableId,OpenMode.ForRead)
			btr = t.GetObject(bt[BlockTableRecord.ModelSpace], OpenMode.ForWrite)
			# Do action here
			box = Solid3d()
			box.CreateBox(1000,2000,3000)
			matrix = ed.CurrentUserCoordinateSystem
			matrix = matrix * Matrix3d.Displacement(Vector3d(111, 222, 333))
			box.TransformBy(matrix)
			btr.AppendEntity(box)
			t.AddNewlyCreatedDBObject(box, True)
			t.Commit()
			print("Created Box")
```

Đối với .NET : 

```cs
[CommandMethod("CreateBox")]
        public void cmdCreateBox()
        {
            var doc = AcApp.DocumentManager.MdiActiveDocument;
            var ed = doc.Editor;
            var db = doc.Database;

            using (var tr = db.TransactionManager.StartTransaction())
            {
                var bt = tr.GetObject(db.BlockTableId, OpenMode.ForRead) as BlockTable;
                var btr = tr.GetObject(bt[BlockTableRecord.ModelSpace], OpenMode.ForWrite) as BlockTableRecord;
                var box = new Solid3d();
                box.CreateBox(100, 200, 300);

                var matrix = ed.CurrentUserCoordinateSystem;
                matrix = matrix * Matrix3d.Displacement(new Vector3d(111, 222, 333));
                box.TransformBy(matrix);

                btr.AppendEntity(box);
                tr.AddNewlyCreatedDBObject(box, true);

                tr.Commit();
            }
        }
```

![](pic/box3d.png)

### Hiển thị một cảnh báo

Đối với Ironpython Console : 

```py
#Copyright(c) 2021, Hồ Văn Chương
# @chuongmep, https://chuongmep.com/
import clr
import sys
sys.path.append('C:\Program Files (x86)\IronPython 2.7\Lib')
import os
import math
clr.AddReference('acmgd')
clr.AddReference('acdbmgd')
clr.AddReference('accoremgd')
# Import references from AutoCAD
from Autodesk.AutoCAD.Runtime import *
from Autodesk.AutoCAD.ApplicationServices import *
from Autodesk.AutoCAD.EditorInput import *
from Autodesk.AutoCAD.DatabaseServices import *
from Autodesk.AutoCAD.Geometry import *
doc = Application.DocumentManager.MdiActiveDocument
ed = doc.Editor
db = doc.Database
# Write Code Below
Application.ShowAlertDialog("An error occurred!")
```

### Tạo ra một Polyline

Đối với Ironpython Console : 

```py
#Copyright(c) 2021, Hồ Văn Chương
# @chuongmep, https://chuongmep.com/
import clr
import sys
sys.path.append('C:\Program Files (x86)\IronPython 2.7\Lib')
import os
import math
clr.AddReference('acmgd')
clr.AddReference('acdbmgd')
clr.AddReference('accoremgd')
# Import references from AutoCAD
from Autodesk.AutoCAD.Runtime import *
from Autodesk.AutoCAD.ApplicationServices import *
from Autodesk.AutoCAD.EditorInput import *
from Autodesk.AutoCAD.DatabaseServices import *
from Autodesk.AutoCAD.Geometry import *
doc = Application.DocumentManager.MdiActiveDocument
ed = doc.Editor
db = doc.Database
# Write Code Below
with doc.LockDocument():
	with doc.Database as db:
		with db.TransactionManager.StartTransaction() as t:
			bt = t.GetObject(db.BlockTableId,OpenMode.ForRead)
			btr  = t.GetObject(bt[BlockTableRecord.ModelSpace],OpenMode.ForWrite)
			# Do action here
			pl = Polyline()
			pl.AddVertexAt(0,Point2d(0.0, 0.0), 0.0, 0.0, 0.0)
			pl.AddVertexAt(1,Point2d(100.0, 0.0), 0.0, 0.0, 0.0)
			pl.AddVertexAt(2,Point2d(100.0, 100.0), 0.0, 0.0, 0.0)
			pl.AddVertexAt(3,Point2d(0.0, 100.0), 0.0, 0.0, 0.0)
			btr.AppendEntity(pl)
			t.AddNewlyCreatedDBObject(pl,True)
			t.Commit()
```

Đối với .NET : 

```cs
[CommandMethod("AutoCADSamples", "CreatePolyLine", CommandFlags.Modal)]
        public void CreatePolyLineCommand()
        {
            var document = Application.DocumentManager.MdiActiveDocument;
            var database = document.Database;

            try
            {
                using (var transaction = database.TransactionManager.StartTransaction())
                {
                    var blockTable = (BlockTable)transaction.GetObject(database.BlockTableId, OpenMode.ForRead);
                    var modelSpace = (BlockTableRecord)transaction.GetObject(blockTable[BlockTableRecord.ModelSpace], OpenMode.ForWrite);

                    var polyLine = new Polyline();
                    polyLine.AddVertexAt(0, new Point2d(0.0, 0.0), 0.0, 0.0, 0.0);
                    polyLine.AddVertexAt(1, new Point2d(100.0, 0.0), 0.0, 0.0, 0.0);
                    polyLine.AddVertexAt(2, new Point2d(100.0, 100.0), 0.0, 0.0, 0.0);
                    polyLine.AddVertexAt(3, new Point2d(0.0, 100.0), 0.0, 0.0, 0.0);
                    polyLine.Closed = true;

                    modelSpace.AppendEntity(polyLine);
                    transaction.AddNewlyCreatedDBObject(polyLine, true);

                    transaction.Commit();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
```

Còn rất nhiều ví dụ khác mà bạn có thể xem tại <a href="https://github.com/chuongmep/CadPythonShell/tree/dev/Script%20Examples" target="_blank">Script Examples. </a> Bạn có thể bắt đầu khám phá và tạo ra các scripts sáng tạo của riêng bạn rồi đấy !

## Mã nguồn mở

Đây là dự án mở giành cho bất cứ ai có nhu cầu tự học và khám phá, bạn có thể thoải mái tạo và gửi yêu cầu tính năng mới 

<a href="https://github.com/chuongmep/CadPythonShell" target="_blank">https://github.com/chuongmep/CadPythonShell</a> 


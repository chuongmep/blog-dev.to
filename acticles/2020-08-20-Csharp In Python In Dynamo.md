## Mở đầu

Bài viết này là một bài khá thú vị giành cho bạn nào muốn làm khó mình một chút.Đó là việc viết mã pha trộn giữa ngôn ngữ **C#** và **Python** trong Dynamo.

Cụ thể ta sẽ dùng Dynamo để thực thi một mã C# được viết từ ngoài vào viết bằng C# chạy ngon lành mà không một chút ảnh hưởng nào :D.

![](pic/81890635_177506943334867_6931385257857908736_n.jpg)

Lưu ý : Nếu bạn chỉ để trải nghiệm cho biết cách thực hiện thì được, mình vẫn không khuyên bạn viết theo kiểu này vì mã của bạn rất khó để bảo trì và sửa chữa, còn bạn muốn bán công cụ viết trên **Dynamo** của bạn cho một ai đó thì đây có lẽ sẽ là một ý không tồi phải không , bắt đầu thôi.

### Package cần sử dụng

1. DynaMEP

Bao gồm node **Views.Active** để lấy về view hiện hành để kiểm thử.

![](pic/_PH_7b899ec6-c599-40f7-bf67-39fe63d69f1a.png)

2. Prorubim

 Gồm node **ForceChildsEval** buộc thực thi các nút con trên không gian làm việc tiếp theo đang chạy lặp lại.

![](pic/_PH_b14673dd-f65b-4265-a8f8-7b6ac14f3ac1.png)


## Khởi tạo dự án Visual Studio

Điều đầu tiên là bạn cần khởi tạo một dự án Visual Studio .NET nhỏ đơn giản với thư viện **RevitAPI** để làm việc.Ở đây mình sẽ tạo một dự án với :
1. **NameSpace** : SheduleToExcelDll
2. **Class** :  Class1
3. **Hàm thực thi** : test

Xem hình bên dưới này mình sẽ hiểu vấn đề hơn.Nhiệm vụ tiếp theo của mình ở bước sau sẽ gọi dll ra và thực thi **test** để trả về kết quả là `HelloWorld`

![](pic/_PH_5860c23b-0a71-4741-a118-4b0fb1c8df8a.png)

## Khởi tạo script trên Dynamo

Với những package đã tải về ở bên trên, bạn hoàn toàn lấy về được một view hiện hành và thực hiện với hành động lặp lại.

![](pic/_PH_55688858-932f-45d6-a675-3478f05e10da.png)

Hình bên trên cho thấy đoạn script đã thực thi khối mã lệnh bên dự án **Visual Studio** mà mình đã khởi tạo bên trên, ở đây mình sẽ sử dụng trình bao bọc **clr** để làm điều này.Với việc gọi đường dẫn dll vào và import các NameSpace và tên Class, sau đó là đến hàm xử lý.Cùng xem thử bên trong có gì nhé.

```py
import clr

# Import DocumentManager and TransactionManager
clr.AddReference("RevitServices")
import RevitServices
from RevitServices.Persistence import DocumentManager
from RevitServices.Transactions import TransactionManager
doc = DocumentManager.Instance.CurrentDBDocument

clr.AddReferenceToFileAndPath(r"F:\revit\Dynamo\API\2.Debug Python Dynamo\SheduleToExcelDll\SheduleToExcelDll\SheduleToExcelDll\bin\Debug1\SheduleToExcelDll.dll")
import SheduleToExcelDll
from SheduleToExcelDll import Class1

#TransactionManager.Instance.ForceCloseTransaction()
TransactionManager.Instance.EnsureInTransaction(doc)
TestClass = Class1()
#TestClass.FilterSelect()
#TestClass.RotateAll()
#TestClass.CreateSweepWithMultipleLoops()
#TestClass.ExportAllSchedulesToOneExcel()
TransactionManager.Instance.TransactionTaskDone()

OUT = TestClass.test#dir(TransactionManager.Instance)
```

Bạn có thể hoàn toàn thấy được cách khai báo **SheduleToExcelDll**(NameSpace), Class1(Class) và **TestClass.test** chính là đầu ra kết thúc xử lí method test

## Thử với xoay đối tượng

```cs
#region RotateAll https://sites.google.com/site/revitapi123/sharp-develop-c-rotateall-example
        public void RotateAll()
        {
            //Autodesk.Revit.DB.Transaction t = new Autodesk.Revit.DB.Transaction(doc, "Rotate");
            //t.Start();
            try
            {
                // Select some elements in Revit before invoking this command
                // Get the element selection of current document.
                Selection selection = uidoc.Selection;
                ICollection<ElementId> selectedIds = uidoc.Selection.GetElementIds();
                Element element = null;
                if (0 == selectedIds.Count)
                {
                    TaskDialog.Show("Revit", "You haven't selected any elements.");
                }
                else
                {
                    foreach (ElementId id in selectedIds)
                    {
                        element = doc.GetElement(id);
                        BoundingBoxXYZ box = element.get_BoundingBox(doc.ActiveView);
                        if (null == box)
                        {
                            throw new Exception("Selected element doesn't contain a bounding box.");
                        }
                        //string info = "Bounding box is enabled: " + box.Enabled.ToString() + box.Max.ToString() + box.Min.ToString();
                        //TaskDialog.Show("Revit",info);
                        XYZ p1 = new XYZ((box.Min.X + box.Max.X) / 2, (box.Min.Y + box.Max.Y) / 2, 0);
                        XYZ p2 = new XYZ((box.Min.X + box.Max.X) / 2, (box.Min.Y + box.Max.Y) / 2, 10);
                        //XYZ p1 = new XYZ (0,0,0);
                        //XYZ p2 = new XYZ(0,0,10);
                        Line axis = Line.CreateBound(p1, p2);
                        ElementTransformUtils.RotateElement(doc, id, axis, Math.PI / 2);
                    }
                    ///ICollection<ElementId> copiedIds = ElementTransformUtils.CopyElements(doc, selectedIds, new XYZ(10,10,0));
                }
            }
            catch
            {
                //MessageBox.Show("Revit Error", "Error copying elements.");
            }
            //t.Commit();
        }
        #endregion
```

Kết quả 

![](pic/RotateElementDynamo.gif)

## Mở rộng

Bên trên là toàn bộ mô tả về cách làm của tác giả người nga **Alexey Babinoff**, để biết thêm thông tin chi tiết hoặc theo dõi về anh ta, bạn có thể xem liên kết của mình bên dưới. Liên kết bao gồm video hướng dẫn, mã nguồn của tác giả.
Ngoài những lệnh cơ bản mình đã trình bày bên trên, mã nguồn cũng bao gồm các xử lý như dim lưới trục, Export All Schedules To One Excel,... bạn có thể từ từ trải nghiệm. 

## Tham khảo

<a href="https://www.youtube.com/watch?v=5Ge7E5JVQmY" target="_blank">Alexey Babinoff</a>

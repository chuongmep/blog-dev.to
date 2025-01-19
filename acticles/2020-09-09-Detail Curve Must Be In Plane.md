## Mở đầu

Bài viết này giúp bạn hình dung ra vẽ một đoạn thẳng trên một phẳng phẳng và sửa lỗi Detail Curve Must be in Plane.

Nguyên nhân cơ bản chính là bạn phải tạo ra một mặt phẳng để vẽ được một đường line trên một mặt 2D.Cụ thể ở đây mình đang làm việc với Floorplan và section

## Sửa lỗi

Một đoạn mã mẫu giúp bạn tạo ra DetailCurve bình thường

```cs
DetailCurve CreateModelCurve(Document doc, Autodesk.Revit.DB.View view, Autodesk.Revit.DB.XYZ point1, Autodesk.Revit.DB.XYZ point2)
        {
            using (Transaction tran = new Transaction(doc))
            {
                tran.Start("change");
                Line line = Line.CreateBound(point1, point2);
                DetailCurve detailCurve1 = doc.Create.NewDetailCurve(view, line);
                tran.Commit();
                return detailCurve1;
            }
        }
```

Nếu bình thường ta tạo chúng trên 3D mặc nhiên ta sẽ được một đoạn thẳng nhưng với khung nhìn 2d, ta cần dời đường và chiếu đoạn thẳng lên mặt phẳng trước khi muốn tạo một đường DetailCurve.Nếu không bạn sẽ xuất hiện và nhìn thấy lỗi sau

![](pic/_PH_3d6169cd-c0c8-4eb5-ba8c-a2365f13d916.png)

Cách tiếp theo mình sẽ tạo ra thêm một mặt phẳng và chiếu các điểm lên sau đó mới tạo ra đường kẻ từ điểm này đến điểm kia để khắc phục cho lỗi bên trên.

```cs
public static ModelCurve CreateModelLine(Document doc,
            XYZ p,
            XYZ q)
        {
            double _eps = 1.0e-9;
            if (p.DistanceTo(q) < _eps) return null;
            XYZ v = q - p;
            double dxy = Math.Abs(v.X) + Math.Abs(v.Y);
            XYZ w = (dxy > _eps)
                ? XYZ.BasisZ
                : XYZ.BasisY;
            XYZ norm = v.CrossProduct(w).Normalize();
            XYZ temp = new XYZ(p.X,p.Y,0);
            Plane plane = Autodesk.Revit.DB.Plane.CreateByNormalAndOrigin(norm, p);
            //MessageBox.Show(plane.Origin.ToString());
            SketchPlane sketchPlane = Autodesk.Revit.DB.SketchPlane.Create(doc, plane);
            Line line = Line.CreateBound(p, q);
            ModelCurve modelCurve = doc.Create.NewModelCurve(line, sketchPlane);
            return modelCurve;
        }
```

Nhưng nếu hai điểm của bạn vẫn chưa chắc cùng nằm trên một mặt phẳng bạn vẫn có thể tạo được thông qua mặt phẳng đã tạo từ trước nhưng sẽ hiện thêm cảnh báo về toạ độ của đường line kia 

![](pic/_PH_85876b7d-3b5e-4529-85bb-383cf08b79ac.png)

Hình ảnh miêu tả cho bạn thấy được đường line đang bị kẻ xiên với mặt bằng mặt dù hiện cảnh báo trước khi được tạo

![](pic/_PH_6fe7d43f-cac8-451e-aa1d-10d12e6898d5.png)

Để khắc phục tiếp bước trên, tất nhiên di chuyển toạ độ của cả hai điểm tạo line trên cùng một mặt phẳng sẽ nhanh chóng khắc phục được điều này

```cs
public static ModelCurve CreateModelLine(Document doc,
            XYZ pmin,
            XYZ pmax)
        {
            double _eps = 1.0e-9;
            if (pmin.DistanceTo(pmax) < _eps) return null;
            XYZ v = pmax - pmin;
            double dxy = Math.Abs(v.X) + Math.Abs(v.Y);
            XYZ w = (dxy > _eps)
                ? XYZ.BasisZ
                : XYZ.BasisY;
            XYZ norm = v.CrossProduct(w).Normalize();
            XYZ tpmin = new XYZ(pmin.X,pmin.Y,0);
            Plane plane = Autodesk.Revit.DB.Plane.CreateByNormalAndOrigin(norm, tpmin);
            SketchPlane sketchPlane = Autodesk.Revit.DB.SketchPlane.Create(doc, plane);
            //MessageBox.Show(tpmin+"\n"+pmax);
            Line line = Line.CreateBound(tpmin, pmax);
            ModelCurve modelCurve = doc.Create.NewModelCurve(line, sketchPlane);
            return modelCurve;
        }
```

## Tham khảo

<a href="https://thebuildingcoder.typepad.com/blog/2010/05/detail-curve-must-be-in-plane.html" target="_blank">thebuildingcoder</a> 

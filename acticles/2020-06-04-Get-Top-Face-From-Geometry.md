## Mở đầu

Bài viết này sẽ giúp các bạn tìm ra bề mặt trên, dưới hoặc các mặt bên của một khối Geometry từ mô hình.Thường được sử dụng trong rất nhiều trường hợp như dựng hình, tạo dim đối tượng, tính diện tích sàn,đặt một đối tượng lên bề mặt,tính toán khối lượng,...

## Cách xử Lý
**Revit API**

Việc này rất đơn giản, ứng với mỗi solid, bạn sẽ thấy một vector hướng ra từ bền mặt của mỗi mặt, như vậy việc của bạn chỉ cần đi so sánh hướng để tìm ra mặt cần lấy.

```cs
public static PlanarFace GetTopFace(Solid solid)
        {
            PlanarFace topFace = null;
            FaceArray faces = solid.Faces;
            foreach (Face f in faces)
            {              
                PlanarFace pf = f as PlanarFace;
                if (pf.FaceNormal.IsAlmostEqualTo(new XYZ(0, 0, 1)))
                {
                    topFace = pf;
                }
            }
            return topFace;
        }
```

Tuy nhiên ta còn có một cách được viết sẵn bằng hàm ở đây, bạn có thể tìm hiểu thêm

![](pic/_Image_289439a3-4075-49b2-b54b-7f4d21bd1b83.png)

**Dynamo**

1.Scripts đơn giản lấy về Top Surface
![](pic/GetTopSurFace.png)

2.Sử dụng Codeblock tuỳ chỉnh từ **Clockwork**
``` cs
almostzero=0.000000001;
ZNeg=Vector.ByCoordinates(0,0,-1);
vec = surf.NormalAtParameter(0.5,0.5);
z = vec.Z;
// Vertical
mask1 = z >= (0 - almostzero) && z <= (0 + almostzero);
DSCore.List.FilterByBoolMask(surf,mask1)["in"];
// Horizontal up
mask2 = vec.IsAlmostEqualTo(Vector.ZAxis());
DSCore.List.FilterByBoolMask(surf,mask2)["in"];
// Horizontal down
mask3 = vec.IsAlmostEqualTo(ZNeg);
DSCore.List.FilterByBoolMask(surf,mask3)["in"];
```
![](pic/GetTopSurFaceCodeBlock.png)

**DynamoAPI**

Ví dụ đơn giản lấy về Top Surface

1.C#

```cs
public static List<Autodesk.DesignScript.Geometry.Surface> GetTop(Autodesk.DesignScript.Geometry.Geometry geometry)
        {
            List<Autodesk.DesignScript.Geometry.Surface> TopSurface = new List<Autodesk.DesignScript.Geometry.Surface>();
            Autodesk.DesignScript.Geometry.Geometry[] geometries = geometry.Explode();
            foreach (Autodesk.DesignScript.Geometry.Surface g in geometries)
            {
                double d = g.NormalAtParameter(0.5, 0.5).Z;
                if (d>0.1)
                {
                    TopSurface.Add(g);
                }
            }
            return TopSurface;
        }
```

2.Ngoài ra với những bề mặt hình học phức tạp hơn đôi khi gây ra lỗi với bề mặt không trơn lán, mình có thể sử dụng thêm ma thuật từ tác giả **Data-shapes**

![](pic/ca17b13e3fb67e4e327516fed4a452e11dac93ef.png)

```py
import clr
clr.AddReference('ProtoGeometry')
from Autodesk.DesignScript.Geometry import Surface as DSSurf
clr.AddReference('RevitAPI')
from Autodesk.Revit.DB import*
clr.AddReference('RevitNodes')
import Revit
clr.ImportExtensions(Revit.GeometryConversion)
import sys
pyt_path = r'C:\\Program Files (x86)\\IronPython 2.7\\Lib'
sys.path.append(pyt_path)
import collections

def tolist(input):
	if isinstance(input,list):
		return UnwrapElement(input)
	else:
		return [UnwrapElement(input)]

def flatten(l):
    for el in l:
        if isinstance(el, collections.Iterable) and not isinstance(el, basestring):
            for sub in flatten(el):
                yield sub
        else:
            yield el

def tostring(x):
	return x.ToString()
def getgeomlist(x,opt):
	return list(x.get_Geometry(opt))
def getlength(c):
	return c.Length

def getfaces(x,opt):
	#getting geometryelements as list
	geomelems = getgeomlist(x,opt)
	#getting nested instance geometry for all geometry instances
	while any('GeometryInstance' in g for g in map(tostring,geomelems)):
		for index,i in enumerate(geomelems):
			if 'GeometryInstance' in i.ToString():
				geomelems[index] = i.GetInstanceGeometry()
			else:
				continue
	geomelems = list(flatten(geomelems))
	#getting all faces, keeping meshes
	faces = []
	for i in geomelems:
		if 'Solid' in i.ToString():
			faces.append(list(i.Faces))
		eli
```

## Mở rộng

Nếu bạn đã chai lì với những thử thách từ Geometry đóng trên Dynamo, hãy thử tìm giải pháp cho bài toán này xem, biết đâu bạn lại tìm ra ý tưởng riêng cho mình 😁.
Xin cám ơn rất nhiều tác giả đã giúp mình hoàn thiện bài viết tổng kết này.

## Tham khảo
<a href="https://forum.dynamobim.com/t/modified-floor-top-surface/16196/2" target="_blank">Dynamo Forum</a> 
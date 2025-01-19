
## Mô tả lỗi   

Lỗi xuất hiện khi có quá nhiều đường cong không khép kín được tạo ra , lỗi này phát hiện khi sử dụng đối tượng model in place chuyển đổi sang family với nhu cầu người dùng, tuy nhiên cái người dùng vẽ phức tạp không đơn giản như các cấu kiện thông thường.

Trường hợp 1 : Không lấy về được Geometry

![](pic/trim_with_edge_loops-requires.png)

Trường hợp 2 : Đường cong Arc nhận diện sai với tính toán vòng cung.

![](pic/trim_with_edge_loops-requires_fix2.png)


## Cách sửa lỗi

```py
# Created By Karam Baki, karam@aecedx.vom
# Inspired By @5devene, dimitar.ven@gmail.com
# Clone Chuongmep.com
import clr
import System
from System.Collections.Generic import *

from itertools import repeat

pf_path = System.Environment.GetFolderPath(System.Environment.SpecialFolder.ProgramFilesX86)
import sys
sys.path.append('%s\IronPython 2.7\Lib' %pf_path)
import traceback
import random
import string

clr.AddReference('ProtoGeometry')
from Autodesk.DesignScript.Geometry import *
from Autodesk.DesignScript.Geometry import Point as DynPoint
from Autodesk.DesignScript.Geometry import Line as DynLine
from Autodesk.DesignScript.Geometry import Curve as DynCurve

clr.AddReference('RevitServices')
import RevitServices
from RevitServices.Persistence import DocumentManager
from RevitServices.Transactions import TransactionManager
doc = DocumentManager.Instance.CurrentDBDocument

clr.AddReference('RevitAPI')
from Autodesk.Revit.DB import *
from Autodesk.Revit.DB.Structure import StructuralType

clr.AddReference('RevitNodes')
import Revit
clr.ImportExtensions(Revit.Elements)
clr.ImportExtensions(Revit.GeometryConversion)

def tolist(obj1):
	if hasattr(obj1,'__iter__'): return obj1
	else: return [obj1]

def flatten(x):
    result = []
    try:
    	for el in x:
        	if hasattr(el, "__iter__") and not isinstance(el, basestring):
        	    result.extend(flatten(el))
        	else:
        	    result.append(el)
    except:
    	result = x
    return result

geom = UnwrapElement(IN[0])
if geom != None:
	geom = tolist(geom)
else:
	pass

temp_path = System.IO.Path.GetTempPath()
satOpt = SATExportOptions()
opt1 = Options()
opt1.ComputeReferences = True

#Find a 3D view type
collector1 = FilteredElementCollector(doc)
viewFamilyTypes = collector1.OfClass((ViewFamilyType))
for e in viewFamilyTypes:
	if str(e.ViewFamily) == "ThreeDimensional":
		viewType = e.Id
		break

def NewForm_background(s1):
	try:
		randomname = ''.join([random.choice(string.ascii_letters + string.digits) for n in xrange(5)])
		TransactionManager.Instance.EnsureInTransaction(doc)
		sat_path = '%s%s.sat' % (temp_path, randomname)
		status = True
		finalres = []
		resultgeom = []
		threedeeview = View3D.CreateIsometric(doc, viewType)
		threedeeviewid = threedeeview.Id
		kilist = List[ElementId]([threedeeviewid])
		tid = []
		for each in s1:
			tid.append(each.Id)
		ielements = List[ElementId](tid)
		threedeeview.IsolateElementsTemporary(ielements)
		collectorinside = FilteredElementCollector(doc,threedeeviewid).ToElements()
		elemento = []
		for k in collectorinside:
			elemento.append(int(str(k.Id)))
		for each in s1:
			if int(str(each.Id)) in elemento:
				doc.Export(temp_path, randomname, kilist, satOpt)
				eachlist = Geometry.ImportFromSAT(sat_path)
				tmplist = []
				for e in eachlist:
					tmplist.append(e)
				resultgeom.append(tmplist)
				System.IO.File.Delete(sat_path)
			else:
				resultgeom = [None]
			break
		doc.Delete(threedeeview.Id)
		finalres.append(flatten(resultgeom))
		TransactionManager.Instance.TransactionTaskDone()
		return finalres
	except:
		return traceback.format_exc(),''

result = NewForm_background(geom)
OUT = flatten(result)
satOpt.Dispose()
opt1.Dispose()
```

## Kết quả

Trường hợp 1:

![](pic/trim_with_edge_loops-requires_fix.png)

Trường hợp 2 :

![](pic/trim_with_edge_loops-requires_fix3.png)

![](pic/101780350_252105876113166_8406925636085481472_n.jpg)

Download Source Test1 : <a href="http://www.mediafire.com/file/zz773zhwjdzjkq4/Furniture_Towers_RVT2021.rvt/file" target="_blank">Furniture_Towers_RVT2021.rvt</a>   
Download Source Test2 : <a href="http://www.mediafire.com/file/9c425e37gamszqb/Circular_arc_sweep_RVT2020.rvt/file" target="_blank">Circular_arc_sweep_RVT2020.rvt</a> 

## Cập nhật : 

Hiện tại [c.poupin](https://forum.dynamobim.com/u/c.poupin) cũng có một cách giải rất hay ho sử dụng phương pháp tái tạo curve tại bài viết [này](https://forum.dynamobim.com/t/revitapi-geometry-got-empty-list/74334/14) nhưng kết quả vẫn chưa đảm bảo với các đường cong tròn, hãy cẩn thận nhưng bạn có thể thử . Anh ta cũng có một [blog voltadynabim](https://voltadynabim.blogspot.com/) rất tuyệt vời.

``` py
import clr
import System
import sys
clr.AddReference('ProtoGeometry')
from Autodesk.DesignScript.Geometry import *
import Autodesk.DesignScript.Geometry as DS
clr.AddReference('RevitAPI')
from Autodesk.Revit.DB import *
clr.AddReference("RevitNodes")
import Revit
clr.ImportExtensions(Revit.Elements)
clr.ImportExtensions(Revit.GeometryConversion)
clr.AddReference("RevitServices")
import RevitServices
from RevitServices.Persistence import DocumentManager
from RevitServices.Transactions import TransactionManager

def get_AllSolid(lst_elem, inc = 0):
	# sub functon
	def populate_lstGeo(g):
		if isinstance(g, Solid) and g.Volume > 0: 
			solids.append(g)
		elif isinstance(g, GeometryInstance):
			geoInst.append(g)
		else:pass
	#
	# main  recursive function		
	global opt
	solids = []
	geoInst = []
	lst_elem = lst_elem if hasattr(lst_elem, "__iter__") else [lst_elem]
	if len(lst_elem) > 0 and inc < 2000:
		for elem in lst_elem:
			if isinstance(elem, GeometryInstance):
				for j in elem.GetInstanceGeometry():
					populate_lstGeo(j)			
			else:
				geoSet = elem.get_Geometry(opt)
				for i in geoSet:
					populate_lstGeo(i)
		return solids + get_AllSolid(geoInst, inc + 1)
	else:
		return []
		
elem = UnwrapElement(IN[0])
opt = Options()
solids = get_AllSolid(elem)
ds_Solids = []
for s in solids:
	try:
		ds_Solid = s.ToProtoType()
		ds_Solids.append(ds_Solid)
	except:
		# failed conversion DB.Solid to Solid Prototype -> try get make Solid with ByJoinedSurfaces 
		ds_face = []
		for f in s.Faces:
			try:
				ds_face.extend(f.ToProtoType())
			except:
				# failed conversion DB.Face to Prototype -> try get make Surface with PolyCurves.Patch() 
				ds_edges = [c.ToProtoType() for curveloop in f.GetEdgesAsCurveLoops() for c in  curveloop]
				ds_poly_edges = PolyCurve.ByJoinedCurves(ds_edges)
				ds_face.append(ds_poly_edges.Patch())
		ds_Solid = DS.Solid.ByJoinedSurfaces(ds_face)
		ds_Solids.append(ds_Solid)
OUT = ds_Solids
```

## Tham khảo

<a href="https://github.com/DynamoDS/DynamoRevit/issues/2494" target="_blank">DynamoDS</a>   
<a href="https://forum.dynamobim.com/t/revitapi-geometry-got-empty-list/74334/14" target="_blank">revitapi-geometry-got-empty-list</a>  


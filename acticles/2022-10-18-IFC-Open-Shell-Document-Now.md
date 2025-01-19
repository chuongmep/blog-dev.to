## Mở đầu

Tài liệu hướng dẫn sử dụng `IfcOpenShell` tuyệt vời đã trở lại. Một vài năm trước đây, khi mình sử dụng `IfcOpenShell` điều khó chịu nhất chính là cài đặt package, chúng rất khó khăn đến mức làm cho nhiều người bỏ cuộc. Và ngày đó mình nhớ là mình đã thử chúng trên **google colab** nhưng hướng dẫn vẫn quá khó khăn với người mới bắt đầu. Hôm nay mọi thứ có vẻ suôn sẻ và rất mượt mà đối với mình mà nói.

![Thiết lập package sử dụng trên google colab rất phức tạp của mình thời 2019](pic/firefox_w6Drgv3waN.png)

Giờ đây chúng ta có một tài liệu tốt hơn và cài đặt cũng trơn tru hơn.
![](pic/firefox_lyfCjJq3SR.png)

## IfcOpenShell

Cài đặt trong một nốt nhạc với các gói trên các nền tảng khác nhau 🙂

![](pic/firefox_8k92i4PJvw.png)

Sử dụng trong JupyterNotebook mọi thứ đều hoạt động rất trơn tru.

![](pic/firefox_rWo6sxZDML.png)

Lấy dữ liệu phân tích chưa bao giờ là nhanh đến thế. Ở đây thử lấy về tất cả thông tin tường để phân tích.

![](pic/firefox_M7eIZAbjZk.png)

Hãy xem tất cả các thuộc tính và đại lượng liên quan đến bức tường cụ thể:

![](pic/firefox_5uo4sdeirm.png)

Bạn cũng có thể chia tệp ifc ra đồng nghĩa với việc tạo ra tệp mới và đưa thông tin một bức tường vào tệp mới .

```py
# Create a simple model from scratch
import ifcopenshell
from ifcopenshell.api import run

# Create a blank model
model = ifcopenshell.file()

# All projects must have one IFC Project element
project = run("root.create_entity", model, ifc_class="IfcProject", name="My Project")

# Geometry is optional in IFC, but because we want to use geometry in this example, let's define units
# Assigning without arguments defaults to metric units
run("unit.assign_unit", model)

# Let's create a modeling geometry context, so we can store 3D geometry (note: IFC supports 2D too!)
context = run("context.add_context", model, context_type="Model")
# In particular, in this example we want to store the 3D "body" geometry of objects, i.e. the body shape
body = run(
    "context.add_context", model,
    context_type="Model", context_identifier="Body", target_view="MODEL_VIEW", parent=context
)

# Create a site, building, and storey. Many hierarchies are possible.
site = run("root.create_entity", model, ifc_class="IfcSite", name="My Site")
building = run("root.create_entity", model, ifc_class="IfcBuilding", name="Building A")
storey = run("root.create_entity", model, ifc_class="IfcBuildingStorey", name="Ground Floor")

# Since the site is our top level location, assign it to the project
# Then place our building on the site, and our storey in the building
run("aggregate.assign_object", model, relating_object=project, product=site)
run("aggregate.assign_object", model, relating_object=site, product=building)
run("aggregate.assign_object", model, relating_object=building, product=storey)

# Let's create a new wall
wall = run("root.create_entity", model, ifc_class="IfcWall")
# Add a new wall-like body geometry, 5 meters long, 3 meters high, and 200mm thick
representation = run("geometry.add_wall_representation", model, context=body, length=5, height=3, thickness=0.2)
# Assign our new body geometry back to our wall
run("geometry.assign_representation", model, product=wall, representation=representation)

# Place our wall in the ground floor
run("spatial.assign_container", model, relating_structure=storey, product=wall)

# Write out to a file
model.write("newmodel.ifc")
```

Bức tường sau khi được tìm kiếm và chia sẻ sang một tệp ifc mới, sau đó đưa lên <a href="https://speckle.xyz/" target="_blank">Speckle</a> để xem thông tin 

<iframe src="https://speckle.xyz/streams/b54b0939aa/commits/262cf8ecdf" width="780" height="450" frameborder="0"></iframe>

## Sử dụng 

Hãy xem tài liệu IfcOpenShell tuyệt vời ngay bây giờ <a href="https://blenderbim.org/docs-python/ifcopenshell-python/hello_world.html" target="_blank">/ifcopenshell-python</a>

Xem thêm mẫu demo tại <a href="https://github.com/chuongmep/JupyterIfcOpenShell/blob/master/IfcOpenShellNow.ipynb" target="_blank">chuongmep/ifcopenshelldemo</a>

Học viện IfcOpenShell, nơi giúp bạn làm những điều mà bạn chưa dám làm : <a href="https://github.com/IfcOpenShell/academy" target="_blank">IfcOpenShellAcademy</a>   

Thư viện khá nhiều với IfcOpenShell để bạn khám phá <a href="https://www.kaggle.com/datasets/claytonmiller/example-ifc-file" target="_blank">example-ifc-file</a>   
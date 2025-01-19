## Giới thiệu

COMPAS là một thư viện mã nguồn mở cung cấp các khung cơ sở để giúp cho chúng ta dễ dàng truy cập vào các thư viện hình học.Ngoài ra thư viện còn được tích hợp vào các phần mềm khác như Blender, Rhino, RhinoMac và Grasshopper.

![](pic/_Image_71a6503e-fffe-45a7-a0a0-430515014415.png)

Thư viện chính của COMPAS cung cấp cấu trúc dữ liệu khá linh hoạt và rất nhiều xử lý hình học sẵn có, các nguyên tắc cơ bản của robot, bộ giải số và các thành phần khác làm khung cơ sở cho nghiên cứu tính toán.

Ở bài này chúng ta sẽ sử dụng một số hàm để làm quen với thư viện này nhé.

Đây là thư viện mới và đang trong tiến trình hoàn thiện vì vậy chắc chắc sẽ ra mở ra một sự trao đổi dữ liệu khác biệt cho ngành xây dựng và việc giao thoa hội nhập với các nền tảng công nghệ khác.

## Sử dụng và cài đặt

Bài viết này được hướng dẫn chạy thử và code mẫu trên Google colab, rất đơn giản bạn chỉ cần cài đặt bộ thư viện này và sử dụng thêm thư viện numpy để các vector, point ,... trông dễ nhìn hơn nhé.

``` py
!pip install COMPAS
import compas
import numpy as np
```

Cộng hoặc cross hai vector đơn giản

``` py
from compas.geometry import add_vectors, cross_vectors
a = [1, 0, 0]
b = [0, 1, 0]
add_vectors(a,b)
cross_vectors(a,b)
```

Bạn có thể thử triển khai thư viện với việc tính toán điểm và vector

``` py
#Point
from compas.geometry import Point, Vector
point = Point(1, 0, 0)
point.x
p1 = Point(1,2,3)
p2 = Point(4,5,6)
p3 = p1+p2
print("Total two Point:",np.array(p3))
u = Vector(1, 0, 0)
v = u*3
print("Scale Vector :",np.array(v))

x = Vector(1,2,3)
dot = v.dot(x)
print("Dot Vector",dot)
cross = v.cross(x)
print("Cross Vector",np.array(cross))
angle = v.angle(x)
print("Angle Vector",angle)
# Total two Point: [5. 7. 9.]
# Scale Vector : [3. 0. 0.]
# Dot Vector 3.0
# Cross Vector [ 0. -9.  6.]
# Angle Vector 1.3002465638163236

```

Show một mạng kết nối **NetworkPlotter**

``` py
import compas
from compas.datastructures import Network
from compas_plotters import NetworkPlotter

network = Network.from_obj(compas.get('lines.obj'))

plotter = NetworkPlotter(network)
plotter.draw_nodes(
     text='key',
     facecolor={key: '#ff0000' for key in network.leaves()},
     radius=0.15
 )
plotter.figure_size = (2,2)
plotter.draw_edges()
plotter.show()
```
![](pic/4346t567687896gdfgdrfw.png)

Show một số MeshPlotter 

``` py
import compas
from compas.datastructures import Mesh
from compas_plotters import MeshPlotter

mesh = Mesh.from_obj(compas.get('faces.obj'))

plotter = MeshPlotter(mesh)
plotter.draw_vertices(text='key', radius=0.15)
plotter.draw_edges()
plotter.draw_faces()
plotter.show()
```

![](pic/2443554767896787546342.png)

Trên đây chỉ là một số demo cơ bản để bạn hiểu hơn về thư viện này, ngoài ra việc can thiệp tùy chỉnh với các phần mềm thứ ba đang chờ bạn khám phá bên dưới liên kết đính kèm.Mình cũng có đính kèm tệp chạy thử để bạn xem qua kết quả của mã bên dưới.

## Tham khảo

<a href="https://colab.research.google.com/drive/1eV1p5WNNGGWrY_hzh3r6DnTPFjDMbPvb?usp=sharing" target="_blank">COMPAS Demo</a>

<a href="https://compas.dev/index.html" target="_blank">compasdev</a>

<a href="https://pypi.org/project/COMPAS/" target="_blank">pypi</a>
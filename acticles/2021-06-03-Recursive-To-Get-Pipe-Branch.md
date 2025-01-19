## Giới thiệu

Nếu bạn đã từng viết mã thì chắc chắn một điều tồi tệ là rồi sẽ có ngày bạn sẽ gặp một bài toán yêu cầu đệ quy rồi.

Nghe nói đệ quy có vẻ cao siêu lắm, vậy hôm nay chúng ta sẽ cùng làm một ví dụ ứng dụng thực tế xem thực hư như thì đệ quy làm được gì.Hy vọng là trước khi đọc xong bài này bạn nên tập trung mắt trước đã nhé.

## Đệ quy

Rất đơn giản, đệ quy chính là làm cho công việc giống nhau được làm thứ n lần trong điều kiện cho phép với chính nó, sau khi gặp đúng điều kiện dừng thì không làm nữa.

Ví dụ đơn giản như sau : Mẹ bạn bắt bạn xem bức tranh, bạn lại bắt con bạn xem bức tranh đó, sau đó con bạn lại bắt cháu bạn xem bức tranh đó, rồi cháu bạn lại bắt bạn của bạn của cháu bạn xem bức tranh đó,... cho đến khi nào không có ai xem bức tranh đó nữa thì thôi.Đệ quy cũng chính là như thế đấy.Đừng nhìn vào hình bên dưới lâu quá đấy nhé.

![](pic/dequy.gif)

Như vậy, xem bức tranh chính là hành động cần làm còn mỗi người xem bức tranh chính là n đối tượng liên tiếp thực hiện công việc đó.Và nếu cứ xem bức tranh mãi thì bạn biết như nào rồi đấy.Trong lập trình đây gọi là tràn ngăn xếp(Stack) rất nguy hiểm vì không thể thoát khỏi vòng lặp.

## Đệ quy để chọn ống

Vấn đề cần giải quyết ở đây chính là làm sao để chọn được tất cả các ống từ A đến B ở nhánh kết nối liên tục với nhau, mỗi ống sẽ được kết nối với nhau thông qua 1 đến 2 co và cứ liên tục như vậy cho đến hết.Người dùng có thể chọn bất kì vị trí nào trên nhánh để lấy về các phần tử thuộc nhánh này bao gồm cả các co, thiết bị,các ống đã kết nối....

![](pic/_Image_026df015-5aa2-49b3-bb23-3b652fac28c3.png)

Tất nhiên bài toán này rất giống như ví dụ trên phải không? Đúng vậy, kết quả cuối cùng chúng ta mong muốn là chọn 1 ống, tất cả các ống đi cùng tuyến có kết nối sẽ được chọn.Vậy các bước sẽ như sau:

- **Chọn ống (1)**

Điểm chọn ống có thể nằm bất cứ nơi đâu trên nhánh.Đơn giản là vì đó là điều mà chúng ta muốn, chọn ở đâu cũng được nhưng phải chọn hết nhánh.

- **Lấy về điểm kết nối của ống đã chọn (2)**

Việc này để chúng ta có căn cứ để tiếp tục tìm đối tượng tiếp theo và xét liên tục thông qua kết nối.

- **Tìm kết nối của ống tiếp theo kết nối với ống đã chọn.(3)**

Sau khi đã có được kết nối liên tục thì việc tìm đối tượng tiếp theo cũng không là vấn đề.

```cs
public static List<Element> GetElementConnectedWith(this Element e)
        {
            List<Element> elements = new List<Element>();
            List<Connector> connectors = e.GetConnectors();
            if (connectors == null) return elements;
            if (connectors.Count == 0) return elements;
            elements = GetElementConnectedWith(connectors);
            return elements;
        }
 public static List<Element> GetElementConnectedWith(this List<Connector> connectors)
        {
            List<Element> elements = new List<Element>();
            foreach (Connector connector in connectors)
            {
                if (connector.IsConnected)
                {
                    List<Element> nextElement = connector.GetElementsConnected();
                    nextElement.ForEach(delegate (Element ele) { elements.Add(ele); });
                }
            }
            return elements;
        }
 public static List<Element> GetElementsConnected(this Connector conn)
        {
            List<Element> elements = new List<Element>();
            ConnectorSetIterator connectorSetIterator = conn.AllRefs.ForwardIterator();
            while (connectorSetIterator.MoveNext())
            {
                Connector connref = connectorSetIterator.Current as Connector;
                Element elem = connref.Owner;
                if (elem != null)
                {
                    elements.Add(elem);
                }
            }

            return elements;
        }
```

- **Đưa ống vừa chọn vào danh sách(4)**

Nếu danh sách đã tồn tại rồi thì sẽ không đưa vào nữa, và điều kiện đảm bảo để lọc hết chính là số lượng của chính nhánh đó.

- **Quay lại bước 1 ống đã chọn là ống vừa tìm ra**

Nơi này chính là nơi ta cần đệ quy vì đây chính là mấu chốt của bài toán này.

![](pic/274de584e24b65e772a330c217e917d1.gif)

```cs
private static List<Element> Collector(Element e, Dictionary<string, Element> OutElements)
        {
            double count = 0;
            List<Element> elements = e.GetElementConnectedWith();
            foreach (Element item in elements)
            {
                if (OutElements.ContainsKey(item.Id.ToString()))
                {
                    count += 1;
                }
                else
                {
                    OutElements[item.Id.ToString()] = item;
                    Collector(item, OutElements);
                }
            }
            if (Math.Abs(count - elements.Count) < 0.0001)
            {
                return new List<Element>(OutElements.Values);
            }
            return new List<Element>(OutElements.Values);
        }
```

Và cuối cùng ta đã có một vòng đệ quy khá hoàn hảo

```cs
public static List<Element> GetElementConnectedContinuous(this Element e)
        {
            Dictionary<string, Element> OutElements = new Dictionary<string, Element>();
            List<Element> collector = Collector(e, OutElements);
            return collector;
        }
```

Cuối cùng cũng xong nhưng cũng đừng quá đau đầu nhé.

## Đệ quy với Dynamo

Làm việc với Dynamo cách làm cũng tương tự nhưng nội dung cũng hơi khác chỉ vì viết bằng ngôn ngữ khác mà thôi.

```py
import clr
import math
import sys
pyt_path = r'C:\Program Files (x86)\IronPython 2.7\Lib'
sys.path.append(pyt_path)
import System
clr.AddReference("RevitServices")
import RevitServices
from RevitServices.Persistence import DocumentManager
from RevitServices.Transactions import TransactionManager
doc = DocumentManager.Instance.CurrentDBDocument
clr.AddReference("RevitAPI")
import Autodesk
from Autodesk.Revit.DB import *
clr.AddReference("RevitNodes")
import Revit
clr.ImportExtensions(Revit.Elements)
clr.ImportExtensions(Revit.GeometryConversion)
import collections
#The inputs to this node will be stored as a list in the IN variables.
if isinstance(IN[0],list):
	element = UnwrapElement(IN[0])
	toggle = 0
else:
	element = [UnwrapElement(IN[0])]
	toggle = 1
  
def nextElements(elem):
	listout = []
	try:
		connectors = elem.ConnectorManager.Connectors
	except:
		connectors = elem.MEPModel.ConnectorManager.Connectors
	for conn in connectors:
		for c in conn.AllRefs:
			if c.Owner.Id.Equals(elem.Id):
				continue
			elif c.Owner.GetType() == Mechanical.MechanicalSystem:
				continue
			else:
				newelem = c.Owner
			listout.append(newelem)
	return listout

def systemcheck(elem):
	if elem.GetType() == Mechanical.MechanicalSystem or elem.GetType() == Plumbing.PipingSystem:
		return True
	else:
		return False
	
def collector(elem):
	cont = 0
	elements = nextElements(elem)
	for x in elements:
		if x.Id in lookup:
			cont += 1
		else:
			item = doc.GetElement(x.Id)
			if systemcheck(item):
				return elem
			else:
				lookup[x.Id] = item
				collector(x)
	if cont == len(elements):
		return elem
listout = []
for x in element:
	lookup = collections.OrderedDict()
	collector(x)
	listout.append(lookup.Values)
#Assign your output to the OUT variable.
if toggle:
	OUT = lookup.Values
else:
	OUT = listout
```

Kiểm tra kết quả

Như hình ảnh mô tả bên dưới, cho dù bạn có chọn ở vị trí nào đi chăng nữa thì các ống liên tiếp nhau vẫn đảm bảo được chọn đầy đủ.

![](pic/2021-06-03_15-59-08.gif)

## Mở rộng

Công việc mỗi ngày đều đơn giản như vậy đấy! Mỗi ngày làm là một niềm vui.

Chúc các bạn thành công.
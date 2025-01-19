## Mở đầu

Bài viết hôm nay sẽ tổng hợp những gì liên quan đến Flatten.Node được sử dụng rất phổ biến trong Dynamo giúp bạn duỗi danh sách ra để làm việc.

## Sử dụng Node

![](pic/FlattentDynamo1.png)

## Dùng CodeBlock

![](pic/FlattenCodeBlock.png)

## Viết Script tùy chỉnh

Ở đây mình sẽ giới thiệu hai phương pháp, một với dựng lại và một với tận dụng thư viện đã có sẵn(DSCoreNodes).

```py
# Load the Python Standard and DesignScript Libraries
import sys
import clr
clr.AddReference('DSCoreNodes')
from DSCore.List import Flatten
OUT = Flatten(IN[0])
```
Hoặc : 

```py
import collections

def flattenList(unflattened_list):
	if isinstance(unflattened_list,collections.Iterable):
		return [sub_element for element in unflattened_list for sub_element in flattenList(element)]
	else:
		return [unflattened_list]
OUT = flattenList(IN[0])
```

Hoặc : 

```py

# The inputs to this node will be stored as a list in the IN variables.
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
OUT = flatten(IN[0])
```

![](pic/FlattentDynamo.png)

Ngoài những cách ở bên trên thì có một cách đơn giản hơn bao giờ hết, bạn có thể viết ngắn gọn đại loại như này.Lưu ý là vấn đề này chỉ dùng danh sách từ hai cấp trở xuống thôi đấy.

``` py
lst = [[2, 2], [4], [1, 2, 3, 4], [1, 2, 3]]
# ... Flatten the list here ...
lst = [x for l in lst for x in l]
print(lst)
# [2, 2, 4, 1, 2, 3, 4, 1, 2, 3]
```
Hoặc dùng với itertools

![](pic/FCnuZ6cXEAgZu3E.jpg)

Hoặc dùng tuyệt chiêu cuối

![](pic/FCnj4i_X0AQTMPG.jpg)


## Tổng kết

Các kết quả trên đều cho ra cùng một kết quả giống nhau, như vậy mình sẽ có cái nhìn tổng thể và bao quát hơn thông qua 4 cách viết này.Hi vọng sẽ bổ sung kiến thức cho bạn về vấn đề này.Chúc các bạn có một ngày làm việc vui vẻ.

## Tham khảo

<a href="https://twitter.com/mathsppblog" target="_blank">mathsppblog</a>

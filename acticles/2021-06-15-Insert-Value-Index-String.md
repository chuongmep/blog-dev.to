## Giới thiệu

Đây là một câu hỏi khá thú vị của đọc giả thắc mắc, vấn đề cần xử lý là chèn dữ liệu vào phía sau của vị trí chuỗi phần tử thứ i, nếu chuỗi liên tiếp nhau thì chèn ở cuối chuỗi đó.
Mình post lên đây để mọi người cùng tham khảo cách giải.

Hình ảnh được mô tả như sau : 

![](https://user-images.githubusercontent.com/31106432/122057662-12348900-ce15-11eb-83f3-52f3e60076c9.png)


## Giải quyết vấn đề

Cách giải quyết ở đây chính là tìm ra vị trí chuỗi và sau đó so sánh vị trí các số liền kề nhóm bởi n phần tử, phần tử thứ [-1] ở cuối +1 phần tử chính là vị trí cần ghi đè.

```py
from itertools import groupby, count
bol = [None, "2018",None,None,None,"2018","2019","2020",None,None]
value = "Data"
def get_bol(a):
    index = []
    for i in range(len(a)-1):
        if isinstance(a[i], str):
            index.append(i)
    return index
def set_bol(a,intervals,value): 
    for i in intervals:
        a[i] = value
    return a   
def intervals(data):
    out = []
    counter = count()
    for key, group in groupby(data, key = lambda x: x-next(counter)):
        block = list(group)
        out.append(block[-1]+1)
    return out
id = intervals(get_bol(bol))

print(set_bol(bol,id,value))
#Output
# [None, '2018', 'Data', None, None, '2018', '2019', '2020', 'Data', None]
```

## Mở rộng

Nhắc đến thư viện **itertools** lại làm mình nhớ đến vài thứ hay ho có thể kể đến như : 

- Lặp lại một giá trị nào đó n lần.

``` py
from itertools import *
for i in repeat('over-and-over', 5):
print(i)
#output
$python3 itertools_repeat.py
over-and-over
over-and-over
over-and-over
over-and-over
over-and-over
```
- Cũng có thể lặp lại với nhãn index

``` py
from itertools import *
for i, s in zip(count(), repeat('over-and-over', 5)):
print(i, s)
$ python3 itertools_repeat_zip.py
0 over-and-over
1 over-and-over
2 over-and-over
3 over-and-over
4 over-and-over
```

- Sử dụng để tính tích lũy thừa liên tiếp

``` py
from itertools import *
print(list(accumulate(range(5))))
print(list(accumulate('abcde')))

$ python3 itertools_accumulate.py
[0, 1, 3, 6, 10]
['a', 'ab', 'abc', 'abcd', 'abcde']

```

- Tính hoán vị

``` py
from itertools import *
def show(iterable):
first = None
for i, item in enumerate(iterable, 1):
if first != item[0]:
if first is not None:
print()
first = item[0]
print(''.join(item), end=' ')
print()
print('All permutations:\n')
show(permutations('abcd'))
print('\nPairs:\n')
show(permutations('abcd', r=2))

$ python3 itertools_permutations.py
All permutations:
abcd abdc acbd acdb adbc adcb
bacd badc bcad bcda bdac bdca
cabd cadb cbad cbda cdab cdba
dabc dacb dbac dbca dcab dcba
Pairs:
ab ac ad
ba bc bd
ca cb cd
da db dc
```
## Tổng kết

Trên đây chỉ là một vấn đề nho nhỏ nhưng giúp bạn mở rộng vấn đề học tập rất tốt.Để tìm hiểu thêm về thư viện này, bạn có thể xem chi tiết tại đường link.

<a href="https://pymotw.com/2/itertools/">itertools</a>  

Chúc bạn học tốt.
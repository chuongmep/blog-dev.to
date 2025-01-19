
## Mở đầu

Trong quá trình làm việc ta thường làm việc với các chuỗi số **string** và **number** lẫn lộn, đôi khi xảy ra sai sót trong quá trình lọc và tính toán.Với hai node này sẽ giúp bạn cảm thấy thoải mái hơn cho công việc tách biệt giữa số và chữ tồn tại trong danh sách hoặc một chuỗi.

Vấn đề sẽ được xử lý tách biệt ở hai node:

1.Gộp chuỗi số thành đoạn số

2.Tách biệt các chuỗi số bởi dấu cách

## Cách xử lý

```cs
   /// <summary>
        /// Return Number Join In String Example : (hello 23 my 28) return [2328]
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        
         public static IEnumerable<string> NumberInString(string str)
        {
            string b = string.Empty;
            string[] spearator = {"."};
            List<double> result = new List<double>();
            for (int i=0; i< str.Length; i++)
            {
                if (char.IsDigit(str[i]))
                    b += str[i];
            }

            if (b.Length > 0)
            {
                if (int.TryParse(b,out int int32))
                {
                    result.Add(int32);
                }
                else if (double.TryParse(b,out double val))
                {
                    result.Add(val);
                }
            }
            return result.Select(x => x.ToString(CultureInfo.InvariantCulture));
        }
```

Hoac : 

```cs
  /// <summary>
        /// Return Number split In String : Example : (hello 23 my 28) return [23,28]
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        
        public static IEnumerable<string> NumberInStrings (string str)
        {
            var nums = new List<double>();
            var start = -1;
            for (int i = 0; i < str.Length; i++)
            {
                if (start < 0 && char.IsDigit(str[i]))
                {
                    start = i;
                }
                else if (start >= 0 && !char.IsDigit(str[i]))
                {
                    nums.Add(double.Parse(str.Substring(start, i - start)));
                    start = -1;
                }
            }
            if (start >= 0)
                nums.Add(double.Parse(str.Substring(start, str.Length - start)));
            return nums.Select(x=>x.ToString(CultureInfo.InvariantCulture));
        }
```

Đối với người dùng python, có thể mở rộng thông qua mã ví dụ đơn giản sau :

```py
from itertools import groupby
my_str = "hello 12 hi 89"

l = [int(''.join(i)) for is_digit, i in groupby(my_str, str.isdigit) if is_digit]
print(l)
#output =[12,89]
```


## Kết quả

Tải về Package <a href="https://chuongmep.com/DynaMEP-Package-Dynamo" target="_blank">DynaMEP</a>   

Ví dụ chung :

![](pic/NumberInStringExxample.png)

Ví dụ cho việc lấy số Level :

![](pic/NumberInString.png)

Ví dụ cho lấy về Element trong danh sách từ Excel : 

![](pic/20116ff140ce34995ebb688d460b41f7893f4f20.png)

Một trường hợp ngoại lệ bỏ kí tự 0 phía sau các số khi bạn muốn lấy số ra để sử dụng, đến nay vẫn nhiều vấn đề tranh luận xung quanh vấn đề này, có thể giải quyết luôn : 

![](pic/713a76fe58e75b5dc96ab06f6b688e1746948aea.png)

## Mở rộng

Đối với trường hợp ngược lại làm thế nào để sử dụng các chuỗi bên trong bao gồm số.Mình sẽ giới thiệu cách đơn giản nhất:

``` py
output = []
for x in IN[0]:
	output.append(filter(lambda v: not str.isdigit(v), x))
OUT = output
```
![](pic/54f31195d8763cce313e0eb578ab9bf5507bfeac.png)

Tải về : <a href="http://www.mediafire.com/file/5jd0e0fmuqdq0xj/NumberInString.dyn/file" target="_blank">NumberInString.dyn</a>   

## Tham khảo

<a href="https://forum.dynamobim.com/t/get-filtered-elements-pinned/52341/4" target="_blank">Dynamo Forum</a>   


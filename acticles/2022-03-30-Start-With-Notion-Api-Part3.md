## Chào mừng

Ở các bài trước, chúng ta đã cùng chạy qua một loạt các tính năng hiện đại, các tiện ích cũng như các công cụ bổ trợ sức mạnh cho Notion.Vậy ở phần này có gì đặc biệt ? Chính là API, API chính là nơi chúng ta khám phá không những toàn bộ mà chính là  nơi chúng ta tung hoành với Notion.

Bạn có thể thỏa thích can thiệp như một chuyên gia vào dữ liệu Notion, hay thậm chí tạo ra một blog Notion của riêng mình.

## Bắt đầu 

Để can thiệp được vào API của Notion, trước tiên bạn cần tham gia vào [developer](https://developers.notion.com/docs/getting-started) và khởi tạo một Integrations.Việc này giúp bạn có khóa bí mật để sử dụng cho xác thực kết hợp với khóa id của trang hoặc Database để tương tác.

![](pic/2ec137d-093ad49-create-integration.gif)

Tiếp theo bạn cần chia sẻ Integrations cấp quyền vào trang của bạn như một tài khoản ẩn danh, việc này đảm bảo cho an toàn dữ liệu tuyệt đối, nếu khóa của bạn bị lộ hoặc bị hack bạn có thể dễ dàng xóa bỏ và tạo mới , sau đó thêm quyền lại bình thường.Thông thường tùy vào việc bạn muốn làm gì mà bạn sẽ giới hạn truy cập cho chính ntegrations đó.

![](pic/0a267dd-share-database-with-integration.gif)

## Thử viết một vài mã kiểm tra

Được rồi, mình sẽ thử qua một chút kiểm tra với .NET xem có tương tác được không 

Với .NET ta có thư viện cũng sài tạm ổn tại thời điểm này là [notion-sdk-net ](https://github.com/notion-dotnet/notion-sdk-net), cùng thử một chút mã xem sao nhé.Hãy nhớ là thay các khóa theo tiêu chuẩn được yêu cầu tại [developer](https://developers.notion.com/docs/getting-started), mình cũng đổi vài số bên dưới nếu bạn tìm ra khóa của mình cũng hơi mệt đấy.

```cs
class Program
    {
        static async Task Main(string[] args)
        {
            var client = new NotionClient(new ClientOptions
            {
                AuthToken = "secret_d6dNtdaIffTAGhDXRhha4ddsdsy0dAfsr27ct3acszPnNOmGIY"
            });
            var databasesQueryParameters = new DatabasesQueryParameters();
            var databaseId = "8a71f62d45aaf24e8dbdsdsd9090f703181e33";
            var queryResult = await client.Databases.QueryAsync(databaseId,databasesQueryParameters);
            Console.WriteLine(queryResult.Results.Count);
            foreach (var result in queryResult.Results)
            {
                Console.WriteLine("Page Id: " + result.Id);
                foreach (var property in result.Properties)
                {
                    Console.WriteLine(property.Key + " " + GetValue(property.Value));
                }
            }
            Console.ReadKey();
        }
        static object GetValue(PropertyValue p)
        {
            switch (p)
            {
                case RichTextPropertyValue richTextPropertyValue:
                    return richTextPropertyValue.RichText.FirstOrDefault()?.PlainText;
                default:
                    return null;
            }
        }
    }
```

Kết quả khá khả quan khi thông tin cả page id và các thông tin khác có trả về.Vậy là bạn có thể thoải mái đưa dữ liệu vào và đưa dữ liệu ra tự động với API rồi

![Notion API With .NET](pic/notionapi.net.png)

Bạn có thể thử một số mã để lấy về database nếu bạn sử dụng python, bên dưới là một ví dụ lấy dữ liệu ra từ database và sau đó đưa vào dataframe thử từ thư viện pandas, một thư viện hỗ trợ khoa học dữ liệu rất phổ biến.Kêt quả cuối cùng sẽ in ra dữ kích thước của database

```py
import requests
import pandas as pd
import json
DATABASE_ID_TEST = "a296bd16b7284bc494aa91f50ad64d30" #https://www.notion.so/a296bd16b7284bc494aa91f50ad64d30?v=d37af84a3a6744fb957002073a267c44

PAGE_ID = "e2e8b31737174dbe86b9ae65f9b8eb9c" #click on Page and Get ID : https://www.notion.so/Mary-Meeks-2d822179eb59451e91e83086cdd74e5c

INTEGRATION_TOKEN = "secret_gF6bJPSyOgt5oZgb2sgT1yiMxfS4LqNmWmd2M8S5vzl"
NOTION_DB_URL = "https://api.notion.com/v1/databases/"

NOTION_PAGE_URL = "https://api.notion.com/v1/pages/"

NOTION_PAGE_CONTENT = "https://api.notion.com/v1/blocks/"
# get database
database_url = NOTION_DB_URL + DATABASE_ID_TEST 

response = requests.get(database_url, headers={"Authorization": f"{INTEGRATION_TOKEN}"})
# query
print (response.json())
database_url = NOTION_DB_URL + DATABASE_ID_TEST + "/query"

query = {"filter": {"property": "High Priority", "checkbox": {"equals": True}}}
query = {"filter": {"property": "Cost of next trip", "number": {"greater_than_or_equal_to": 0.5}}}

headers = {"Authorization": f"{INTEGRATION_TOKEN}", "Notion-Version": "2021-05-13"}

response = requests.post(database_url, headers=headers, data=query)

# Show result response
print((response.json()['results']))
df_structure = pd.DataFrame.from_dict(response.json()['results'])

print("The size of the df is", df_structure.shape)
df_structure.head()
```

## Tạo ra một blog với Notion

Ý tưởng lấy dữ liệu vào ra là có, vậy tại sao ta không lợi dụng chính cơ sở dữ liệu của Notion để viết blog, thật là một điều thú vị phải không.Thật không may đó là ý tưởng không phải do mình nghĩ ra trước mà những người đi trước đã nghĩ ra từ rất lâu.Bạn hoàn toàn có thể làm một blog và gán tên miền, tạo ra một website cho mình chỉ với 5 phút.

![](pic/firefox_pAPpCRImmd.png)

Đó là [NotaBlog](https://github.com/dragonman225/notablog), một mã nguồn mở cho phép bạn làm điều đó.Tất nhiên còn rất nhiều mã nguồn mở hay ho ngoài kia nhưng mình không đề xuất ở đây.

Công việc của bạn rất đơn giản, chỉ là sửa đổi thông tin và làm theo các bước như được ghi trong mã nguồn.Lưu ý phần quan trọng để bạn làm thành công chính là các id chính xác và chuẩn format của trang là không được thay đổi vì tác giả  căn cứ vào đó để phân loại cho trang.

![](pic/v0.6.0_manage.jpg)

## Mở rộng 

Bên trên chỉ là một vài gợi ý nhỏ giúp bạn hình dung được cách can thiệp vào API của Notion, nơi mà bạn sẽ tỏa sáng trong tương lai, mình sẽ để lại đây một số mã nguồn bên dưới là kho tàng giúp bạn khám phá toàn bộ bí ẩn đằng sau API đó.

<a href="Awesome-notebooks" target="_blank">https://github.com/jupyter-naas/awesome-notebooks</a>

<a href="https://developers.notion.com/" target="_blank">Notion official documentation</a>

<a href="https://zenn.dev/keiwatanabe/articles/notionapi-grasshopper" target="_blank">notionapi-grasshopper</a>



## Introduction

The [AEC data model](https://aps.autodesk.com/developer/overview/aec-data-model-api) is a set of capabilities and data structures that establishes a shared language across the lifecycle of a project, connecting planning to design to construction to operations. It delivers open data access to enable fluid data collaboration across propriety tools. 

The [AEC Data Model API](https://aps.autodesk.com/en/docs/aecdatamodel/v1/developers_guide/overview/) is a set of [GraphQL](https://graphql.org/) APIs that provides direct cloud access to granular design data without the need to write application plugins or additional processing to retrieve data.

Although the beta version has been released for quite some time, I haven't had much free time to share with you the details on how to use it and its limitations. Today, we will explore some interesting basics of the AEC Data Model API.

![Data Model Constructor](pic/iShot_2024-08-27_23.38.44.png)

## Why AEC Data Model & GraphQL ?

- Fetch the exact required data: With [REST](https://www.ibm.com/topics/rest-apis), endpoints often return a fixed set of data. However, with [GraphQL](https://graphql.org/), you can specify exactly what data you want from the server. This reduces unnecessary data and makes the application more efficient.

![](pic/iShot_2024-08-27_23.35.49.png)

- Reduce the number of requests: In [REST](https://www.ibm.com/topics/rest-apis), you may need to send multiple requests to different endpoints to gather enough data for a page or feature. With GraphQL, you can combine multiple data sources into a single request, reducing the load on both the client and the server.

- Suitable for complex data structures: If your application has complex data relationships (e.g., an article with many comments, and each comment with a user), GraphQL allows you to query this data structure easily without needing multiple requests.

- Eliminate under-fetching and over-fetching: Under-fetching happens when an API doesn’t return enough data, forcing you to make additional requests to gather what’s needed. Over-fetching happens when the API returns too much unnecessary data. GraphQL allows you to fetch the exact amount of data you need, no more, no less.

- Automatic documentation: The GraphQL schema is self-describing, meaning tools like GraphQL can automatically generate documentation for your API without additional effort.

- Easily extendable: With REST, extending the API can be complex, requiring the creation of multiple new endpoints. With GraphQL, you can simply add new fields to the schema without changing how existing queries function.

## What you need to do make sure it work well ? 

- Make sure you setup your project with Revit version 2024 or later 

- Make sure you are using [authentication 3 leggend ](https://aps.autodesk.com/developer/learn/threelegged-auth/understand-code)

- Make sure you active [AEC Data Model](https://aps.autodesk.com/en/docs/aecdatamodel/v1/developers_guide/overview/) in Acc Admin Account.

- Make sure you tune on allow `AEC Data Model API` in Autodesk Platform Services App.

- Make sure you added `clientid` `HKVjhUXySDGLGJimolxAgDdpoCuZLlql` to integration.

- Make sure region is supported with your account.

To know more about details, please visit [Before Begin](https://aps.autodesk.com/en/docs/aecdatamodel/v1/tutorials/before_you_begin/)

## Try with AEC Model API 

Let's try with basic api, what we need to do just is focus on change query and variable input with same endpoint.

- With Authentication 3Leg, you can use [aps-toolkit](https://github.com/chuongmep/aps-toolkit) to easy get token by install with command `pip install aps-toolkit --upgrade`
```py
from aps_toolkit import Auth
token = Auth().auth3leg()  # Assuming this fetches a valid token
```
And then now, you can try with `GetHubs` : 

![](pic/iShot_2024-08-27_22.39.32.png)

```py
import requests

url = 'https://developer.api.autodesk.com/aec/graphql'
# Define headers with Authorization and Content-Type
headers = {
    'Authorization': f'Bearer {token.access_token}',
    'Content-Type': 'application/json',
    'Region': 'US'  # Optional, depending on your API setup
}

# GraphQL query for fetching hubs
data = {
    "query": """
        query GetHubs {
            hubs {
                results {
                    id
                    name
                }
            }
        }
    """
}
response = requests.post(url, headers=headers, json=data)
data = response.json()

```

Try with get `GetProjects` :

![](pic/iShot_2024-08-27_22.35.32.png)

```py
url = 'https://developer.api.autodesk.com/aec/graphql'

# Set the headers
headers = {
    'Authorization': f'Bearer {token.access_token}',  # Replace with your actual token
    'Content-Type': 'application/json'
}

# Set the GraphQL query and variables in the payload
data = {
    "query": """
        query GetProjects($hubId: ID!) {
            projects(hubId: $hubId) {
                results {
                    id
                    name
                    hub {
        id
        name
      }
                }
            }
        }
    """,
    "variables": {
        "hubId": f"{hub_id}"  # Replace with your actual hubId
    }
}

# Make the POST request
response = requests.post(url, headers=headers, json=data)
data = response.json()['data']['projects']['results']
```

Try with `GetElementGroupsByProject`

```py
headers = {
    'Authorization': f'Bearer {token.access_token}',
    'Content-Type': 'application/json',
    'Region': 'US'  # Optional, depending on your API setup
}
query = """
    query GetElementGroupsByProject($projectId: ID!) {
        elementGroupsByProject(projectId: $projectId) {
            pagination {
                cursor
            }
            results {
                name
                id
                alternativeIdentifiers {
                    fileUrn
                    fileVersionUrn
                }
            }
        }
    }
"""

# Set the projectId you want to query
variables = {
    "projectId": f"{project_id}"  # Replace with your actual project ID
}

# Send the POST request with the query and variables
response = requests.post(url, headers=headers, json={'query': query, 'variables': variables})
response.raise_for_status()  # Raise an error for bad HTTP responses

# Parse the JSON response
json_data = response.json()
```

Try with get elements from category, in this case I try get all `Furniture` elements.

![](pic/iShot_2024-08-27_22.44.00.png)

```py
headers = {
    'Authorization': f'Bearer {token.access_token}',
    'Content-Type': 'application/json',
    'Region': 'US'  # Optional, depending on your API setup
}
# Define the GraphQL query and variables
query = """
    query GetElementsFromCategory($elementGroupId: ID!, $propertyFilter: String!) {
        elementsByElementGroup(elementGroupId: $elementGroupId, filter: {query:$propertyFilter}) {
            pagination {
                cursor
            }
            results {
                id
                name
                properties {
                    results {
                        name
                        value
                        definition {
                            name
                            units {
                                id
                                name
                            }
                        }
                    }
                }
                references{
                    results{
                        name
                        displayValue
                        value{
                            properties{
                                results{
                                        name
                                        value
                                        displayValue
                                        }
                                    }
                            }
                        }
                }
                referencedBy(name: "Type"){
                    results{
                        id
                        name
                        properties{
                            results{
                                    name
                                    value
                                    }
                            }
                        }
                }
            }
        }
    }
"""

# Set the variables (you need to provide the actual elementGroupId and propertyFilter)
variables = {
    "elementGroupId": f"{element_group_id}",  # Replace with your actual element group ID
    "propertyFilter": "property.name.category==Furniture"  # Replace with your property filter property.name.category==Walls
}

# Send the POST request with the query and variables
response = requests.post(url, headers=headers, json={'query': query, 'variables': variables})
data = response.json()
```

In general testing, API is working well.


## How to get Type and Instance Elements ?

You can use `elementsByElementGroup` with custom filter to get `Type` and `Instance` elements, let's try with example `Walls` :

```py
headers = {
    'Authorization': f'Bearer {token.access_token}',
    'Content-Type': 'application/json',
    'Region': 'US'  # Optional, depending on your API setup
}
# Define the GraphQL query and variables
query = """
    query ($elementGroupId: ID!, $propertyFilter: String!) {
    elementsByElementGroup(
        elementGroupId: $elementGroupId
        filter: { query: $propertyFilter }
        pagination: {limit: 5}
    ) {
        pagination {
            cursor
        }
        results {
            id
            name
            properties {
                results {
                name
                value
                }
            }
            referencedBy(name: "Type") {
                pagination {
                    cursor
                }
                results {
                    id
                    name
                    alternativeIdentifiers {
                        externalElementId
                    }
                    properties {
                        results {
                            name
                            value
                        }
                    }
                }
            }
        }
    }
}
"""

# Set the variables (you need to provide the actual elementGroupId and propertyFilter)
variables = {
    "elementGroupId": f"{element_group_id}",  # Replace with your actual element group ID
    "propertyFilter": "'property.name.category'=contains=Walls and 'property.name.Element Context'==Type'"  # Replace with your property filter property.name.category==Walls
}

# Send the POST request with the query and variables
response = requests.post(url, headers=headers, json={'query': query, 'variables': variables})
data = response.json()
if response.status_code != 200:
    print(data)
    raise ValueError('Error')
d = data['data']['elementsByElementGroup']['results']
df = pd.json_normalize(d)
df.head()
```


## How you know snoop schema ? 

Yes, you can visit into [MFG AEC Data Model Explore](https://mfgdatamodel-explorer.autodesk.io/voyager) to lookup schema relation and custom your query: 

![](pic/firefox_5Q2CurLrTf.png)

Let's try with one example to see relation between `Hubs` and `Projects` :

![](pic/iShot_2024-08-27_22.55.36.png)


## How to transform data to DataFrame ?

You can use `pandas` to transform data to dataframe, let's try with `GetElementsFromCategory` :

```py
import requests
import pandas as pd
response = requests.post(url, headers=headers, json=data)
data = response.json()['data']['projects']['results']
df = pd.json_normalize(data)
df
```

In the case you want transform data of element by category to dataframe, with example `Furniture` :

```py
response = requests.post(url, headers=headers, json={'query': query, 'variables': variables})
data = response.json()
d = data['data']['elementsByElementGroup']['results']
df = pd.json_normalize(d)
for _, row in df.iterrows():
    id_value = row["id"]
    name_value = row["name"]
    json = row['properties.results']
    df_json = pd.json_normalize(json)
    df_data = df_json[['name', 'value']]
    df_data = df_json[['name', 'value']].drop_duplicates(subset=['name'])
    single_dict = df_data.set_index('name').T.to_dict('records')
    # create new key and set value
    single_dict[0]['id'] = id_value
    single_dict[0]['name'] = name_value
    df_type_json = pd.json_normalize(row['references.results'])
    if len(df_type_json) > 0:
        # print(dict_type)
        dict_type = df_type_json.set_index('name').T.to_dict('records')
        for key, value in dict_type[0].items():
            single_dict[0][key] = value
    df_single = pd.DataFrame.from_dict(single_dict)
    df_result = pd.concat([df_result, df_single], ignore_index=True)
df_result.head()
```


## Observations on the API

The [API](https://aps.autodesk.com/en/docs/aecdatamodel/v1/reference/graphqlendpoint/) still has several limitations, but it's a powerful tool for integrating data without spending excessive time on maintenance.

- You can retrieve complex custom data with a single entry point using [GraphQL](https://graphql.org/).
- It's easy to make API calls from different programming languages.
- Currently, there are limitations with geometry support.
- Sometimes, the developer feels confused with the schema and how to query data. It's complex and requires a lot of time to understand.

While I'm uncertain how it will improve in the future, it's definitely worth exploring.

## Resources

- [AEC Data Model Roadmap](https://aps.autodesk.com/aec-data-model-roadmap)

- [AEC Data Model API](https://aps.autodesk.com/autodesk-aec-data-model-api)

- [AEC Data Model Explore](https://aecdatamodel-explorer.autodesk.io/)

- [MFG AEC Data Model Explore](https://mfgdatamodel-explorer.autodesk.io/voyager)

## Introduction

To continue from the two previous articles that guided on authenticating with [Autodesk Platform Services](https://aps.autodesk.com/) (APS) API :

- https://chuongmep.com/posts/2024-05-01-get-3leg-aps-with-python.html

- https://chuongmep.com/posts/2024-05-07-get-3leg-aps-with-csharp.html

I will proceed with this series by demonstrating how to obtain a full APS OAuth token using [Google Colab](https://colab.research.google.com/). Utilizing [Google Colab](https://colab.research.google.com/) allows us to perform necessary tasks without the need to set up a development environment on a personal computer. Installation and configuration processes will be conducted on Google's servers, saving us time and effort.

![](pic/aps-oauth.png)

Reflecting on the year 2024, the time of writing this piece, I realized that discovering libraries for integration with construction data and utilizing available Python libraries has become significantly easier for data analysts. However, it is unfortunate that I haven't come across any library that effectively handles both APS authentication and easy data retrieval from APS. Hence, I write this article to illustrate the straightforward functionality of a portion of the [APSToolkit](https://github.com/chuongmep/aps-toolkit) library that I have developed.

This is some online platform I can refer to run online Jupyter notebook:

- [Kaggle](https://www.kaggle.com/)
- [Deepnote](https://deepnote.com/)
- [Jupyter](https://jupyter.org/)
- [Colab](https://colab.research.google.com/)
- [Code Spaces](https://github.com/features/codespaces)
- [Azure Notebooks](https://learn.microsoft.com/en-us/azure/machine-learning/how-to-run-jupyter-notebooks?view=azureml-api-2)
- [coCalc](https://cocalc.com/)
- [My Jupyter](https://chuongmep.github.io/jupyter/lab/index.html)

## APS Configuration

The setup process is incredibly straightforward, ensuring that you have installed the [APSToolkit](https://github.com/chuongmep/aps-toolkit) library on [Google Colab](https://colab.research.google.com/) before proceeding with the following steps:

```bash
pip install aps-toolkit --upgrade
```

Once installed, you need to add three important variables to the environment in case you want to use APS [OAuth 2-legged](https://aps.autodesk.com/en/docs/oauth/v2/tutorials/get-2-legged-token/):

```bash
APS_CLIENT_ID = "your-client"
APS_CLIENT_SECRET = "your-client-secret"
APS_CLIENT_ID_PKCE = "your-client-pkce"
```
## APS 2-legged OAuth

After adding the environment variables, you can obtain an APS [OAuth 2-legged](https://aps.autodesk.com/en/docs/oauth/v2/tutorials/get-2-legged-token/) token using the following approach:

```python
from aps_toolkit import AuthGoogleColab
from google.colab import userdata
client_id = userdata.get('APS_CLIENT_ID')
client_secret = userdata.get('APS_CLIENT_SECRET')
auth = AuthGoogleColab(client_id,client_secret)
token = auth.auth2leg()
print(token.access_token)
```

Thus, you have successfully acquired a full APS OAuth 2-legged token using Google Colab.

## APS 3-legged OAuth

Authentication with APS [OAuth 3-legged](https://aps.autodesk.com/en/docs/oauth/v2/tutorials/get-3-legged-token/) is more secure and allows you to access user data. In this case make sure that you added the callback URL to application settings in the applicaiton before proceeding.

![](https://developer.doc.autodesk.com/bPlouYTd/cloud-platform-id-pubdocs-master-226821/_images/authorization-code-3-legged-flow.png)

Obtaining an APS OAuth [3-legged token](https://aps.autodesk.com/en/docs/oauth/v2/tutorials/get-3-legged-token/) follows a similar process to [2-legged authentication](https://aps.autodesk.com/en/docs/oauth/v2/tutorials/get-2-legged-token/). You just need to execute the following:

```python
from aps_toolkit import AuthGoogleColab
from google.colab import userdata
client_id = userdata.get('APS_CLIENT_ID')
client_secret = userdata.get('APS_CLIENT_SECRET')
auth = AuthGoogleColab(client_id,client_secret)
redirect_uri = "http://localhost:8080/api/auth/callback"
scopes = 'data:read viewables:read'
token = auth.auth3leg(redirect_uri, scopes)
```

Your task is to follow the command-line instructions below, and you will receive a complete APS OAuth 3-legged token after the callback returns from the `redirect_uri` link.

## APS 3-legged OAuth PKCE

PKCE (Proof Key for Code Exchange) is a security method designed to prevent attacks from impersonating users. 

![](https://developer.doc.autodesk.com/bPlouYTd/cloud-platform-id-pubdocs-master-226821/_images/authorization-code-3-legged-flow_public.png)

To use PKCE, you need to follow these steps:

```python
from aps_toolkit import AuthGoogleColab
client_id = userdata.get('APS_CLIENT_PKCE_ID')
redirect_uri = "http://localhost:8080/api/auth/callback"
scopes = 'data:read viewables:read'
token = auth.auth3legPkce(client_id, redirect_uri, scopes)

```

Similar to 3-legged OAuth, you can easily follow the steps and receive a complete APS [OAuth 3-legged PKCE](https://aps.autodesk.com/en/docs/oauth/v2/tutorials/get-3-legged-token-pkce/) token after the callback returns from the `redirect_uri` link.

The video below illustrates the entire process:

<iframe width="720" height="400" src="https://www.youtube.com/embed/IiMwhVJiqIc?si=HQA3XU0-LnU5pdLp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Example of Retrieving Revit Data from APS

Once you have obtained the APS OAuth token, you can use it to retrieve Revit data from APS. The example below illustrates how to easily accomplish this on [Google Colab](https://colab.research.google.com/):

```python
from aps_toolkit import Auth
from aps_toolkit import PropDbReaderRevit
auth = Auth()
token = auth.auth2leg()
urn = "<Derivative URN>"
prop_reader = PropDbReaderRevit(urn, token)
df = prop_reader.get_data_by_category("Ducts")
df.save_to_excel("result.xlsx")
```

This is just a basic example of interacting with data from the library, with many guides and templates available [here](https://github.com/chuongmep/aps-toolkit/blob/dev/APSToolkitPython/Tutorials).

## Conclusion

I hope this article helps you understand how to obtain a full APS OAuth token using Google Colab. If you have any questions or feedback, please leave a comment below. Thank you for reading! Through this and previous articles, I hope to alleviate any headaches associated with APS user authentication.

## Resources

- https://github.com/chuongmep/aps-oauth-colab

- https://github.com/chuongmep/aps-toolkit
[Jupyter Forge](https://github.com/chuongmep/jupyter-forge) is a powerful library that seamlessly integrates Autodesk Platform Services with Jupyter Notebooks, enabling interactive 3D viewing and exploration within your notebook environment.
{% embed https://www.youtube.com/watch?v=7gXdM2B94-4 %}


## ⚡Features

- [x] Show 3d viewer from [Autodesk Platform Services](https://aps.autodesk.com/)
- [x] Show 3d viewer from [Autodesk Platform Services](https://aps.autodesk.com/) with object ids
- [x] Show 3d viewer from [Autodesk Platform Services](https://aps.autodesk.com/) with object ids and ajust width and height
- [x] Zoom In, Zoom Out, Pan, Isolate,
- [x] Clustering Viewer
- [x] Search Object by Name

## 🦞Installation

```bash
pip install jupyter-forge --upgrade
```

## 🙋🏻‍♂️Requirements

- Python 3.9+

- Setting Environment Variables, see
  Tutorial [Create an App](https://aps.autodesk.com/en/docs/oauth/v2/tutorials/create-app/)

Set Environment Variables

```bash
APS_CLIENT_ID=your_client_id
APS_CLIENT_SECRET=your_client_secret
```

## 🍽️Usage

```python
from jupyter_forge import JupyterForge
from aps_toolkit import Auth

urn = "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLlFsa1ZtVU5RUmYtanMtd3dLQ2dLM1E_dmVyc2lvbj0x"
token = Auth().auth2leg()
forge_viewer = JupyterForge(urn, token)

## CASE 1 : NONE OBJECTS IDS ISOLATE VIEWER
forge_viewer.show(width=800, height=600)
## CASE 2 : OBJECTS IDS ISOLATE VIEWER
# object id from derivative api
object_ids = [123, 456]
forge_viewer.show(object_ids, width=800, height=600)
```

## ©️License

This project is licensed under the Apache License.

## 💥Contributing

This is project just research in my free time and don't have any power to keep it up to date. If you want to contribute,
please feel free to fork and submit a pull request.

## 🎁 Sponsors
Thanks [JetBrains](https://www.jetbrains.com/) for providing a free All product IDE for this project.

## Knowledge

- [Jupyter Notebook](https://jupyter.org/)
- [Autodesk Platform Services](https://aps.autodesk.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [JetBrains](https://www.jetbrains.com/)
- [Python](https://www.python.org/)
- [Create App APS Tutorial](https://aps.autodesk.com/en/docs/oauth/v2/tutorials/create-app/)
- [Understand About Derivative Urn APS](https://chuongmep.com/posts/2023-12-28-Derivative-Urn-Forge.html#but-wrong-urn)
- [Easy To Snoop Info Item From ACC](https://chuongmep.com/posts/2024-04-02-APS-ACC-URN.html#how-to-get-urn-from-acc)

## Q&A

<details><summary>How can I get URN input?</summary>

1. You can use `aps-toolkit` library to get URN of the item latest version.

```python
from aps_toolkit import *

token = Auth().auth2leg()
bim360 = BIM360(token)
urn = bim360.get_latest_derivative_urn("<project_id>", "<folder_id>")
```

2. You can batch report urn to dataframe from BIM360 class in `aps-toolkit` library.

```python
from aps_toolkit import BIM360
from aps_toolkit import Auth

token = Auth().auth3leg()
bim360 = BIM360(token)
df = bim360.batch_report_items("<project_id>", "<folder_id>", ['.rvt'], is_sub_folder=False)
```

</details>


## Developers

### Test Data Readme

```python
pip
install - e.
```

### Fix server not starting

```bash
# start a server with dir 
python -m http.server 54364 --directory D:\API\Forge\jupyter-forge\src\template
``` 

### Kill Port

```bash
netstat -ano | findstr :54364
taskkill /F /PID 21008
```

- Kill all port relate to 54364

```bash
taskkill /F /PID 21008
```

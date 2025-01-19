
## Introduction

Hi , I'm so busy with my work and I don't have time to write blog. But today I have some free time and I will continue my series about APS.

This is a series following the article [Starting Back With APS Part 1 - Getting Started](http://chuongmep.com/posts/2023-10-30-Let-Back-To-Forge.html). We will continue our exploration of [Autodesk Platform Services](https://aps.autodesk.com/) (Former is **Autodesk Forge**) in more detail. Through this post, I hope you can gain a better understanding of the fundamental concepts in the basic view area, as well as delve into the details of the essential components of APS(*).

![Data Management and Model Derivative regions](pic/ijjiHo06Uw.png)

## Load Viewer

In the previous section, we learned that to display a [Viewer](https://aps.autodesk.com/viewer-sdk) on a website, we need to load some necessary libraries and have a div tag to contain it. However, let's delve a bit further into the process of loading a viewer onto a webpage. In fact, we have up to 2 options for loading a viewer onto a webpage.

![](pic/firefox_SFumm2q1Qq.png)

- Directly Load Viewer through a URL from the `Autodesk Construction Cloud`.

Here, you need to have a `token` for [authentication](https://forge-tutorials.autodesk.io/tutorials/hubs-browser/auth/) as mentioned before, and I'll emphasize it once again as in the first article. We can consider this as a method for online downloading of additional files related to object information, such as: Geometry, Attributes, Mesh, camera perspectives, etc.

```javascript
function loadModelIOnline(urn, token) {

    var options = {
        env: 'AutodeskProduction2',
        api: 'streamingV2', // for models uploadeded to EMEA change this option to 'streamingV2_EU'
        getAccessToken: function (onTokenReady) {
            var timeInSeconds = 3600; // Use value provided by Authentication (OAuth) API
            onTokenReady(token, timeInSeconds);
        }
    }
    <!-- This is called when the page is loaded-->
    Autodesk.Viewing.Initializer(options, function () {

        let forgeViewer = document.getElementById('forgeViewer');
        viewer = new Autodesk.Viewing.GuiViewer3D(forgeViewer);
        let startedCode = viewer.start();

        if (startedCode > 0) {
            console.error('Failed to create a Viewer: WebGL not supported.');
            return;
        }
        console.log('Initialization complete, loading a model next...');

    });
    let documentId = 'urn:' + urn; // Add the string 'urn:' to the actual URN value

    function onDocumentLoadFailure() {
        console.error('Failed to load model');
    }

    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure)
}

```

- Load Viewer through the previously downloaded [SVF](https://aps.autodesk.com/blog/svf2-public-beta-new-optimized-viewer-format) file.

We can consider this as a method for offline downloading of additional files related to object information, such as: Geometry, Attributes, Mesh, camera perspectives, etc. The `SVF` file is a compressed file that contains all the information about the object, and we can download it through the [forge-convert-utils](https://github.com/petrbroz/forge-convert-utils) - Utilities for converting Autodesk Forge file formats. 

![](pic/explorer_XoKirGg1J9.png)

- `geometry.svf`: Contains geometric information of the object.

- `Materials.json.gz`: Stores information about the materials of the object.

- `GeometryMetadata.pf`: Stores information about the geometry of the object.

- `0.pf, 1.pf, 2.pf, ...`: Stores information about the type and meta-geometry data of the object. We will have a separate article to provide more details about these files and their interconnections.

- ... : There are many other files that we will not go into detail in this article.

The object attributes are loaded through files as follows:

![](pic/explorer_mLbWsR9q2U.png)

- `model.sdb`: This file is not used to load anything onto the viewer; it is only used to query object properties as a database management system. For different versions, the accompanying format may be either sdb or db, which is SQLite.

Some compressed files are used to load information onto the viewer as follows:

- `objects_attrs.json.gz`: Stores object attributes.

- `objects_offs.json.gz`: Stores information about the position of objects.

- `objects_vals.json.gz`: Stores information about the values of objects.

- `objects_ids.json.gz`: Stores information about the IDs of objects.

![Entity-attribute-value structure](pic/42006184-3dc4fb5c-7a2d-11e8-90aa-647017d9b4a1.png)

For example, you can easy read 5 file gZip above by using small python code like this to test and check result. The reason why use gzip is to reduce the size of the file, which is more convenient for downloading, uploading, and transferring data into the viewer. We can load a big model with a small size of file.

```python 
import gzip
import json
import re

class PropDbReader:
    def __init__(self, ids_path, offsets_path, avs_path, attrs_path, vals_path):
        with gzip.open(ids_path, 'rb') as ids_file, gzip.open(offsets_path, 'rb') as offsets_file, \
             gzip.open(avs_path, 'rb') as avs_file, gzip.open(attrs_path, 'rb') as attrs_file, \
             gzip.open(vals_path, 'rb') as vals_file:
            self.ids = json.load(ids_file)
            self.offsets = json.load(offsets_file)
            self.avs = json.load(avs_file)
            self.attrs = json.load(attrs_file)
            self.vals = json.load(vals_file)

    def enumerateProperties(self, id):
        properties = []
        if 0 < id < len(self.offsets):
            av_start = 2 * self.offsets[id]
            av_end = len(self.avs) if id == len(self.offsets) - 1 else 2 * self.offsets[id + 1]
            for i in range(av_start, av_end, 2):
                attr_offset = self.avs[i]
                val_offset = self.avs[i + 1]
                attr_obj = self.attrs[attr_offset]

                # Check if attr_obj is a list and has at least two elements
                if isinstance(attr_obj, list) and len(attr_obj) >= 2:
                    name = attr_obj[0]
                    category = attr_obj[1]
                else:
                    name = "N/A"
                    category = "N/A"

                value = self.vals[val_offset]
                properties.append(Property(name, category, value))
        return properties


    def getProperties(self, id):
        props = {}
        rg = re.compile(r'^__\w+__$')
        for prop in self.enumerateProperties(id):
            if prop.category and not rg.match(prop.category):
                props[prop.name] = prop.value
        return props

    def getPropertiesByCategory(self, id):
        properties = {}
        rg = re.compile(r'^__\w+__$')
        categories = []

        props = self.enumerateProperties(id)
        for prop in props:
            if prop.category:
                if not rg.match(prop.category):
                    if not any(category in prop.category for category in categories):
                        categories.append(prop.category)

        for category in categories:
            prop_result = [prop for prop in props if prop.category == category]
            prop_dictionary = []
            for prop in prop_result:
                prop_key = prop.name
                prop_dictionary.append((prop_key, prop.value))
            properties[category] = prop_dictionary

        return properties

    def getChildren(self, id):
        children = []
        for prop in self.enumerateProperties(id):
            if prop.category == "__child__":
                children.append(int(prop.value))
        return children
    def getParent(self, id):
        parent = []
        for prop in self.enumerateProperties(id):
            if prop.category == "__parent__":
                parent.append(int(prop.value))
        return parent
    def getInstance(self, id):
        instanceOf = []
        for prop in self.enumerateProperties(id):
            if prop.category == "__instanceof__":
                instanceOf.append(int(prop.value))
        return instanceOf

class Property:
    def __init__(self, name, category, value):
        self.name = name
        self.category = category
        self.value = value
```

And them, we try input `5 file` gZip to know what is actually inside it.

```python

# Create a sample data (in byte format) for the PropDbReader constructor
object_att = 'svfs/objects_attrs.json.gz'
object_val = 'svfs/objects_vals.json.gz'
object_avs = 'svfs/objects_avs.json.gz'
object_ids = 'svfs/objects_ids.json.gz'
objects_offs = 'svfs/objects_offs.json.gz'

# Create an instance of PropDbReader with the sample data
prop_db = PropDbReader(object_ids, objects_offs, object_avs, object_att, object_val)
# Try Get Properties Chair at location idndex is 3528 with InternalId : 5bb069ca-e4fe-4e63-be31-f8ac44e80d30-00046bfe
# InternalId = UniqueId of Element, in this case we try with a chair from Revit Model have UniqueId = 5bb069ca-e4fe-4e63-be31-f8ac44e80d30-00046bfe
id_index = 3528
prop_db.getProperties(id_index)
```

OUTPUT

``` python
{'IFC Predefined Type': '',
 'Export to IFC As': '',
 'Export to IFC': 'By Type',
 'IfcGUID': '1Ri6dAvFvEOxun_An4x6RE',
 'Level': 'Level 1',
 'Elevation from Level': 0,
 'Host': 'Level : Level 1',
 'Offset from Host': 0,
 'Moves With Nearby Elements': 0,
 'Phase Created': 'Project Completion',
 'Phase Demolished': 'None',
 'Armrest Left': 0,
 'Armrest Right': 0,
 'Image': '',
 'Comments': 'This is a chair',
 'Mark': '',
 'Workset': 'Workset1',
 'Edited by': '',
 'Type Name': 'Plastic-Seat',
 'Room Name': 'Sleep',
 'Room Number': 'A001'}
```
For get element Type, we can use getinstance function like this

```python
# How to Get Parameter Type of Element
typeIndex = prop_db.getInstance(id_index)
# the output is [3527] which is the type of element, we will try to get the properties of this type
prop_db.getProperties(typeIndex[0])

```

```python

{'Type IFC Predefined Type': '',
 'Export Type to IFC As': '',
 'Export Type to IFC': 'Default',
 'Type IfcGUID': '1Ri6dAvFvEOxun_An4x6RO',
 'Default Elevation': 0,
 'Seat Material': 'Plastic - Black',
 'Legs Material': 'Plastic - Black',
 'Frame Material': 'Colour - Coated - Black',
 'Back Material': 'Plastic - Black',
 'Width': 510,
 'Weight': '4.1',
 'Height': 790,
 'Depth': 500,
 'URL': 'www.lammhults.se',
 'Model': 'PENNE',
 'Manufacturer': 'LAMMHULTS',
 'Keynote': '46.B',
 'Description': '*Please enter mtrl description here for use in mto*',
 'Content Author': 'AEC AB',
 'Assembly Code': 'E2020',
 'Type Image': '',
 'Type Comments': '',
 'Cost': 0,
 'Assembly Description': 'Moveable Furnishings',
 'Type Mark': '',
 'Workset': 'Family  : Furniture : Seating-LAMMHULTS-PENNE-Chair',
 'Edited by': '',
 'OmniClass Number': '23.40.20.00',
 'OmniClass Title': 'General Furniture and Specialties',
 'Code Name': ''}

```

Event you can quick check by category of parameter :

```python
# this one include more information of categories of properties
prop_db.getPropertiesByCategory(id_index)
```

```python
{'IFC Parameters': [('IFC Predefined Type', ''),
  ('Export to IFC As', ''),
  ('Export to IFC', 'By Type'),
  ('IfcGUID', '1Ri6dAvFvEOxun_An4x6RE')],
 'Constraints': [('Level', 'Level 1'),
  ('Elevation from Level', 0),
  ('Host', 'Level : Level 1'),
  ('Offset from Host', 0),
  ('Moves With Nearby Elements', 0)],
 'Phasing': [('Phase Created', 'Project Completion'),
  ('Phase Demolished', 'None')],
 'Construction': [('Armrest Left', 0), ('Armrest Right', 0)],
 'Identity Data': [('Image', ''),
  ('Comments', 'This is a chair'),
  ('Mark', ''),
  ('Workset', 'Workset1'),
  ('Edited by', ''),
  ('Type Name', 'Plastic-Seat')],
 'Other': [('Room Name', 'Sleep'), ('Room Number', 'A001')]}
```

When every thing show in viewer, it will look like this:  

![](pic/firefox_XpkTbPMomY.png)


::: tip Note
ID object `dbId` of the object in the viewer.
:::


- `3D View, Building Building,...`: In essence, these are classifications of Views, and inside them is a list of Views similar to those displayed inside software like Revit, such as:

```csharp {6-12-16}
public enum ViewType
  {
    /// <summary>Undefined/unspecified type of view.</summary>
    Undefined = 0,
    /// <summary>Floor plan type of view.</summary>
    FloorPlan = 1,
    /// <summary>Reflected ceiling plan type of view.</summary>
    CeilingPlan = 2,
    /// <summary>Elevation type of view.</summary>
    Elevation = 3,
    /// <summary>3-D type of view.</summary>
    ThreeD = 4,
    /// <summary>Schedule type of view.</summary>
    Schedule = 5,
    /// <summary>Drawing sheet type of view.</summary>
    DrawingSheet = 6,
    /// <summary>The project browser view.</summary>
    ProjectBrowser = 7,
    /// <summary>Report type of view.</summary>
    Report = 8,
    /// <summary>Drafting type of view.</summary>
    DraftingView = 10, // 0x0000000A
    /// <summary>Legend type of view.</summary>
    Legend = 11, // 0x0000000B
    /// <summary>The MEP system browser view.</summary>
    SystemBrowser = 12, // 0x0000000C
    /// <summary>Structural plan or Engineering plan type of view.</summary>
    EngineeringPlan = 115, // 0x00000073
    /// <summary>Area plan type of view.</summary>
    AreaPlan = 116, // 0x00000074
    /// <summary>Cross section type of view.</summary>
    Section = 117, // 0x00000075
    /// <summary>Detail type of view.</summary>
    Detail = 118, // 0x00000076
    /// <summary>Cost Report view.</summary>
    CostReport = 119, // 0x00000077
    /// <summary>Loads Report view.</summary>
    LoadsReport = 120, // 0x00000078
    /// <summary>Pressure Loss Report view.</summary>
    PresureLossReport = 121, // 0x00000079
    /// <summary>Column Schedule type of view.</summary>
    ColumnSchedule = 122, // 0x0000007A
    /// <summary>Panel Schedule Report view.</summary>
    PanelSchedule = 123, // 0x0000007B
    /// <summary>Walk-Through type of 3D view.</summary>
    Walkthrough = 124, // 0x0000007C
    /// <summary>Rendering type of view.</summary>
    Rendering = 125, // 0x0000007D
    /// <summary> Systems analysis report view. </summary>
    SystemsAnalysisReport = 126, // 0x0000007E
    /// <summary>Revit's internal type of view</summary>
    /// <remarks>Internal views are not available to API users</remarks>
    Internal = 214, // 0x000000D6
  }
```
Below is a sample code for Load a previously downloaded SVF file.

```javascript {16-17}

function loadModel(urn) {
    options = {
        useADP: false,
        env: "Local",
        isAEC: true,

    };
    // var config3d = {
    //     extensions: ['ToolbarExtension'],
    // };
    let forgeViewer = document.getElementById('forgeViewer');
    // viewer = new Autodesk.Viewing.GuiViewer3D(forgeViewer,config3d);
    viewer = new Autodesk.Viewing.GuiViewer3D(forgeViewer);
    Autodesk.Viewing.Initializer(options);
    viewer.start(urn, options, () => {
        console.log('Viewer started')
    });

}
```
Both, when downloaded, display the same result, and you can see the executed sample web at https://forge.chuongmep.com/. 

Here, I am using offline downloading to make it easy for everyone to preview without the need for authentication. In the bottom corner of the main screen are default additional utilities and some utilities that I have created. We will explore these utilities in the upcoming articles.

<iframe src="https://forge.chuongmep.com/" width="100%" height="500"></iframe>

Link to the source code of the sample web: [https://github.com/chuongmep/svf-viewer](https://github.com/chuongmep/svf-viewer)

## Events 

The loading success and failure events of the viewer are handled simultaneously with the model loading. To handle the loading failure event, we can use the `onDocumentLoadFailure` and `onDocumentLoadSuccess` functions as follows:

- The `onDocumentLoadFailure` function will be called when the model loading fails. We will print an error message to the console.

- The `onDocumentLoadSuccess` function will be called when the model loading is successful. We can perform some actions, such as the example code below, which includes:

    - Finding viewables using `viewerapp.search({'type': 'geometry'})`

    - Loading the first viewable using `viewer.loadDocumentNode(viewerDocument, md_viewables[0])`

    - Loading the ToolbarExtension using `viewer.loadExtension('ToolbarExtension')`

    - Monitoring the `Autodesk.Viewing.GEOMETRY_LOADED_EVENT` event to retrieve `propDbLoader` from `event.model.myData.propDbLoader`

Here is code demo for handle event loading success and failure of viewer.

```javascript {2,6,19,22,27}

function onDocumentLoadFailure() {
        console.error('Failed to load model');
    }

function onDocumentLoadSuccess(viewerDocument) {

let viewerapp = viewerDocument.getRoot();

let md_ViewerDocument = viewerDocument; // Hold the viewerDocument in a global variable so that we can access it within SelectViewable()
let md_viewables = viewerapp.search({'type': 'geometry'});

if (md_viewables.length === 0) {
    console.error('Document contains no viewables.');
    return;
}

viewer.loadDocumentNode(viewerDocument, md_viewables[0]);
viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this.selectionOnChange);
// unload extension
viewer.unloadExtension('ToolbarExtension');
viewer.loadExtension('ToolbarExtension').then(function () {
    console.log('ToolbarExtension loaded');
});


viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function (event) {
    console.log('GEOMETRY_LOADED_EVENT');
    let urn = viewer.model.getData().urn;
    console.log('Loaded urn: ' + urn);
    // get objecteav
    console.log(event.model.myData.propDbLoader);
});

}
```

Now , we will now try to see what happens with a `SELECTION_CHANGED_EVENT` when we select an object in the viewer. We will print some basic information such as:

- `dbId`: ID of the selected object

- `bounds`: Bounding box of the selected object

- `center`: Center of the selected object, simply the average of `bounds`

- `properties`: View the properties of the selected object

```javascript {6,12,14,17}
function selectionOnChange(event) {

    // get object id
    let dbId = event.dbIdArray[0];
    // get object id
    console.log("Object Id: ", dbId);
    const tree = viewer.model.getInstanceTree();
    const frags = viewer.model.getFragmentList();
    tree.enumNodeFragments(dbId, function(fragid) {
        let bounds = new THREE.Box3();
        frags.getWorldBounds(fragid, bounds);
        console.log("Bounding Box",bounds);
        let center = calcCenter(bounds);
        console.log("Center",center);
    }, true);
    // get properties by object id
    getProperty(this.model, dbId);
}
function calcCenter(bbox) {
    return new THREE.Vector3(
        (bbox.max.x + bbox.min.x) / 2,
        (bbox.max.y + bbox.min.y) / 2,
        (bbox.max.z + bbox.min.z) / 2
    );
}
function getProperty(model, dbId) {
    model.getProperties(dbId, function (data) {
        console.log(data);
    });
}
```

Here is the result when we select an object in the viewer.

![](pic/firefox_p0MLy79F1E.gif)

Information about the selected object is displayed in the console.

![](pic/firefox_WtbSBV6UeZ.png)

## Conclusion

So, we have learned how to load a viewer onto a website, handle loading success and failure events of the viewer, and process the object selection event in the viewer. This article is relatively short, but it provides an understanding of how to load a viewer onto a website and handle some basic events. We will continue exploring the fundamental components of APS in the upcoming articles.

For a detailed view of the entire sample I've created, you can access the source code of the web sample at: https://github.com/chuongmep/svf-viewer

Viewer SDK : https://aps.autodesk.com/viewer-sdk

## Glossary

- APS - Autodesk Platform Services

- SVF - Simple Vector Format

- dbId - ID of the object in the viewer

- Forge - Autodesk Forge

- Viewer - Autodesk Viewer

- ACC - Autodesk Construction Cloud
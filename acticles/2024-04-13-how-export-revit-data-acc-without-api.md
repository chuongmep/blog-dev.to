
## Introduction

Today, I'm excited to share with you a little interesting piece of code I recently wrote to easily export inspection data from a suggested idea by a friend. He didn't have any software to export data from a Revit model but had quick access to the [Autodesk Construction Cloud](https://construction.autodesk.com/). I also realized this could be a great way to assist him. So, I set out to find a solution.

## Debugging in ACC Viewer

In fact, we can quickly inspect data from the `NOP_VIEWER` provided by Autodesk for debugging purposes within the ACC viewer. As outlined in the tutorial [Easy To Snoop Info Item From ACC](https://chuongmep.com/posts/2024-04-02-APS-ACC-URN.html), I also introduced a method for you to quickly view the URN of the model through this approach.

Now, you can look to the viewer example below to see how you can debug the data in the ACC viewer, I just embed from https://forge.chuongmep.com/

<iframe src="https://forge.chuongmep.com/" width="100%" height="500"></iframe>

## Exporting Revit Data with ACC Viewer

I've written a piece of code that I believe you just need to copy and paste into the console of an open ACC viewer. This will allow you to download data by category from the Revit model you are viewing. Here are the detailed steps you need to follow:

- Open a Revit model on Autodesk Construction Cloud.
- Open the browser's Developer Tools by pressing `F12`.
- Switch to the `Console` tab.
- Paste the code snippet below into the `Console` and press `Enter`.
  In case of security concerns, you may need to grant browser access to perform these actions.
- Once completed, you'll receive a CSV file containing data from the Revit model.
- You can open this CSV file with any program that supports the CSV format, such as Microsoft Excel, Google Sheets, or Notepad.

Here is the code snippet you need to copy and paste into the console of the ACC viewer:

```js
class ModelData2 {
    constructor(viewer) {
        this._modelData = {};
        this._viewer = viewer;
    }
    init(callback) {
        let _this = this;

        _this.getAllLeafComponents(function (dbIds) {
            let count = dbIds.length;
            dbIds.forEach(function (dbId) {
               NOP_VIEWER.getProperties(dbId, function (props) {
                    props.properties.forEach(function (prop) {
                        if (!isNaN(prop.displayValue)) return; // let's not categorize properties that store numbers

                        // some adjustments for revit:
                        prop.displayValue = prop.displayValue.replace('Revit ', ''); // remove this Revit prefix
                        if (prop.displayValue.indexOf('<') == 0) return; // skip categories that start with <

                        // ok, now let's organize the data into this hash table
                        if (_this._modelData[prop.displayName] == null) _this._modelData[prop.displayName] = {};
                        if (_this._modelData[prop.displayName][prop.displayValue] == null) _this._modelData[prop.displayName][prop.displayValue] = [];
                        _this._modelData[prop.displayName][prop.displayValue].push(dbId);
                    })
                    if ((--count) == 0) callback();
                });
            })
        })
    }

    getAllLeafComponents(callback) {
        var instanceTree = NOP_VIEWER.model.getData().instanceTree;
        var allLeafComponents = [];
        instanceTree.enumNodeChildren(instanceTree.getRootId(), function (dbId) {
            if (instanceTree.getChildCount(dbId) === 0) {
                allLeafComponents.push(dbId);
            }
        }, true);
        callback(allLeafComponents);
    }

}
async function getProperties(model, dbid) {
  return new Promise(function(resolve, reject) {
      model.getProperties(dbid, function (props) {
          resolve(props);
      });
  });
}
async function getAllProperties(idsOnCategory) {
  return new Promise(function(resolve, reject) {
      let promises = [];
      idsOnCategory.forEach(function (dbid) {
        promises.push(getProperties(NOP_VIEWER.model, dbid));
      });
      resolve(Promise.all(promises));
  });
}
function formatRows(rows) {
    // Implement this function to format rows into CSV format
    // For simplicity, I'll assume each row is an array of strings
    return rows.map(row => Object.values(row).join(',')).join('\n');
}
function jsonToCsv(jsonData) {
    // Extract unique display names from all properties
    const uniqueDisplayNames = Array.from(
        new Set(jsonData.flatMap(obj =>
            obj.properties.map(prop => prop.displayName)
        ))
    );

    // Construct headers with dbId and unique display names
    const headers = ['dbId', ...uniqueDisplayNames];

    // Format rows
    const rows = jsonData.map(obj => {
        const rowData = [obj.dbId];
        uniqueDisplayNames.forEach(displayName => {
            const property = obj.properties.find(prop => prop.displayName === displayName);
            rowData.push(property ? property.displayValue : '');
        });
        return rowData.join(',');
    });

    // Join headers and rows with newlines
    return [headers.join(','), ...rows].join('\n');
}
function downloadCsv(csvData, fileName) {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = fileName;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
}
let data = new ModelData2(NOP_VIEWER);
data.init(async function () {
    let hierarchy = data._modelData.Category;
    let csvData = '';
    for (let key in hierarchy) {
        if (hierarchy.hasOwnProperty(key)) {
            console.log(key)
            let idsOnCategory = hierarchy[key];
            let rows = await getAllProperties(idsOnCategory);
            const csvData = jsonToCsv(rows);
            const fileName = `${key}.csv`;
            downloadCsv(csvData, fileName);
            // just test for one category, in case you want to download all categories, you can remove the break;
            break;
            
        }
    }
    
    
});
```

Through the console output, you can review the list of categories from which you have exported data from the Revit model. You can customize the data export method according to your preferences using the provided code snippet.

![](pic/acc_console_category.png)

And here is the CSV file containing the exported data from the Revit model.

![](pic/Code_0ZgYT1hASh.png)

If you feel so hard to follow the steps, you can quick look at the video below:

<iframe width="720" height="400" src="https://www.youtube.com/embed/o5bbSj6Jx0Q?si=HZN1KUPjqCHtK-T9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Conclusion

I do not recommend using this method to extract data from a Revit model without permission from the model owner. It's simply a means to help you verify data from a Revit model you've accessed on the Autodesk Construction Cloud. This method cannot guarantee the integrity of the exported data. It's best to utilize Autodesk's API for this purpose. You can find more information [here](https://aps.autodesk.com/).

I hope you find this code snippet helpful. If you have any questions or suggestions, feel free to leave a comment below. I'd be happy to help you out.
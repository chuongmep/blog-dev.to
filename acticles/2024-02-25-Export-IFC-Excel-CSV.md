
## Introduction

In today's article, I will document how I export data from an IFC file to Excel or CSV. The reason for writing this article is really simple - upon reviewing various instructional materials, I noticed that many people struggle with exporting data from an IFC file to Excel or CSV. But is it really that difficult? Let's explore my approach together.

I believe that all engineers can achieve this, not just myself.

## Why Jupyter Notebook

Jupyter Notebook is a web-based interactive development environment for creating and sharing documents that contain live code, equations, visualizations, and narrative text. It is a popular tool for data scientists, analysts, and researchers for its ease of use, flexibility, and ability to combine code, text, and multimedia in a single document.

Here are some reasons why I chose to use Jupyter Notebook for this task:

- Ease of use: Jupyter Notebook has a user-friendly interface that makes it easy to get started, even for beginners.

- Flexibility: Jupyter Notebook supports multiple programming languages, including Python, R, Julia, and JavaScript. This allows you to choose the language that best suits your needs.

- Cross-platform support: Jupyter Notebook can run on multiple operating systems, including Windows, macOS, and Linux.

- Free and open source: Jupyter Notebook is a free and open-source software, which means that it is available to everyone and can be modified and extended to meet specific needs.

- Integration with Visual Studio Code: Jupyter Notebook can be integrated with Visual Studio Code, a popular code editor, which provides a powerful and flexible environment for working with Jupyter Notebooks.


You can delve deeper into Jupyter Notebook [here](https://jupyter.org/). As for the convenience within Visual Studio Code, you can access the [marketplace](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter).

![](pic/Code_haVebN77t7.png)

## Why Excel

In fact, many people have told me that Excel is dead in data science because it can't handle big data. However, I disagree with this viewpoint. Excel remains a powerful tool in data processing, especially for non-programmers. Additionally, I can highlight some strengths of Excel such as:

- User-friendly interface
- End-user and business-friendly
- Formulae, formatting, and spreadsheet usage
- Integration with other tools like Power BI, Tableau, etc.
- Support for multiple sheets, allowing storage of multiple data frames in a single file
- Support for various data formats like CSV, XLSX, XLS, etc.
- Usage of filters, sorting, searching, etc.

These are just some reasons why I choose Excel for this task. Storing separate classes in a sheet, and the attributes of those classes in separate columns, will make it easier for me to process and validate data as an engineer with little coding experience but strong Excel skills.

## Export IFC to Excel

Your task requires installing some Python libraries to assist you. You'll use the `ifcopenshell` library to read the IFC file and the `pandas` library to store and export data to Excel. Other dependencies used in this process are `openpyxl` and `lark` as dependencies, and `wordcloud` to generate word clouds.

```bash
%pip install ifcopenshell -U
%pip install openpyxl -U
%pip install pandas -U
%pip install lark -U
%pip install wordcloud -U
```

Import the necessary libraries into Jupyter Notebook, warnings will be turned off to avoid displaying unnecessary notifications.

```python
import ifcopenshell
import pandas as pd
import warnings
warnings.filterwarnings('ignore')
```

The IFC file will be read using the `ifcopenshell` library. You need to specify the path to your IFC file in the `file_path` variable. Then, you will use the `ifcopenshell.open` function to open the IFC file.

```python
file_path = r"2022020320211122Wellness center Sama.ifc"
ifc_file = ifcopenshell.open(file_path)
ifc_file
```
To retrieve all classes within the IFC file, you will use the `by_type` function of `ifc_file`. This function will return a list of classes present in the IFC file. You can use the `is_a` function to get the names of the classes. This will help you to know all the classes present in the IFC file during the data export process.

```python
# get all classes
classes = ifc_file.by_type("IfcProduct")
# print all class names
class_names = [class_name.is_a() for class_name in classes]
class_names = list(set(class_names))
class_names.sort()
class_names
```

Result:

```xml
['IfcBuilding',
 'IfcBuildingElementProxy',
 'IfcBuildingStorey',
 'IfcColumn',
 'IfcCurtainWall',
 'IfcDistributionPort',
 'IfcDoor',
 'IfcFlowTerminal',
 'IfcFurnishingElement',
 'IfcMember',
 'IfcOpeningElement',
 'IfcPlate',
 'IfcRailing',
 'IfcRamp',
 'IfcSite',
 'IfcSlab',
 'IfcStair',
 'IfcStairFlight',
 'IfcWallStandardCase',
 'IfcWindow']
```
The next step is to retrieve all the properties of a class. To accomplish this, you will use the `ifcopenshell.util.element.get_psets` function to retrieve all the properties of a class. This function will return a dictionary containing the property names and their values. You can use the `pd.DataFrame` function to create a DataFrame from this dictionary. Finally, you will use the `pd.ExcelWriter` function to create a new Excel file and the `to_excel` function to store the DataFrame into the Excel file.

```python
file_name = "result.xlsx"
with pd.ExcelWriter(file_name, engine='openpyxl') as writer:
    for class_name in class_names:
        objects = ifc_file.by_type(class_name)
        result_df = pd.DataFrame()
        for object in objects:
            class_data = {}
            # get dict of properties and values
            psets  = ifcopenshell.util.element.get_psets(object)
            for name, value in psets.items():
                if isinstance(value, dict):
                    for key, val in value.items():
                        class_data[key] = val
                else:
                    pass
            class_df =  pd.DataFrame(class_data, index=[0])
            result_df = pd.concat([result_df, class_df], ignore_index=True)
        if(result_df.empty):
            continue
        result_df.to_excel(writer, sheet_name=class_name, index=False)
        # set auto fit column width
        worksheet = writer.sheets[class_name]
        for idx, col in enumerate(worksheet.columns):
            worksheet.column_dimensions[col[0].column_letter].width = 20

```
And there you have it! You have successfully exported data from the IFC file to Excel. You can open the Excel file to check your data.

```python
# read excel 
df = pd.read_excel(file_name, sheet_name=None)
list(df.keys())
```

Result:

```xml
['IfcBuilding',
 'IfcBuildingElementProxy',
 'IfcBuildingStorey',
 'IfcColumn',
 'IfcCurtainWall',
 'IfcDistributionPort',
 'IfcDoor',
 'IfcFlowTerminal',
 'IfcFurnishingElement',
 'IfcMember',
 'IfcOpeningElement',
 'IfcPlate',
 'IfcRailing',
 'IfcRamp',
 'IfcSite',
 'IfcSlab',
 'IfcStair',
 'IfcStairFlight',
 'IfcWallStandardCase',
 'IfcWindow']
```

Or quickly check any class.

```python
# show data IfcDoor
df['IfcDoor'].head(20)
```

## Export IFC to CSV

If you feel more comfortable with CSV, just make a few adjustments for CSV. Here, I will use the `os` library to create a new directory if it doesn't exist. Then, I will use the `to_csv` function to store the DataFrame into CSV files. The reason for creating the directory is because I want to store the CSV files in a separate directory, and the limitation of CSV is that it cannot store multiple sheets like Excel to easily categorize the type of class and its properties.


```python
import os
for class_name in class_names:
    objects = ifc_file.by_type(class_name)
    result_df = pd.DataFrame()
    for object in objects:
        class_data = {}
        # get dict of properties and values
        psets  = ifcopenshell.util.element.get_psets(object)
        for name, value in psets.items():
            if isinstance(value, dict):
                for key, val in value.items():
                    class_data[key] = val
            else:
                pass
        class_df =  pd.DataFrame(class_data, index=[0])
        result_df = pd.concat([result_df, class_df], ignore_index=True)
    if(result_df.empty):
        continue
    # export to csv
    dir = "./csv"
    if not os.path.exists(dir):
        os.makedirs(dir)
    result_df.to_csv(f"./csv/{class_name}.csv", index=False, sep='\t')
```
:::tip
Some time you will have the issue with value of properties contains comma, so you can use `sep='\t'` to avoid this issue or use another separator like `;` or `||`, it's up to you.
:::

## Data Visualization

Data analysis is an essential part of the data processing workflow. You can use the `matplotlib` and `seaborn` libraries to perform this task. Here, I will use `seaborn` to create a bar plot to visualize the number of each class. This helps you to analyze your data more easily, and it looks more aesthetically pleasing compared to using the default `matplotlib`.

```python
# Visualization by categories 
import matplotlib.pyplot as plt
import seaborn as sns
sns.set_theme(style="darkgrid")
# visualize data df dictionary, y is class name, x is number of objects
sns.barplot(y=list(df.keys()), x=[len(df[key]) for key in df.keys()])
plt.xticks(rotation=90)
plt.ylabel("Class name")
plt.xlabel("Number of objects")
plt.title("Visualization by Class")
plt.show()
```

![Visualization by Class](https://github.com/chuongmep/Ifc-to-excel/raw/main/docs/output.png)

If you want to browse through all the properties present in the IFC file, you can use `wordcloud` to create a word cloud. This makes it easier for you to browse through all the properties present in the IFC file and their popularity.

```python
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import seaborn as sns
sns.set_theme(style="darkgrid")
all_properties = []
for key in df.keys():
    all_properties.extend(df[key].columns)
all_properties = list(set(all_properties))
all_properties.sort()
# create word cloud
wordcloud = WordCloud(width = 1000, height = 500).generate(' '.join(all_properties))
# plot the WordCloud image
plt.figure(figsize=(15,8))
plt.imshow(wordcloud)
plt.axis("off")
plt.show()
```
## Another way to export IFC to Excel

If you prefer not to use Jupyter Notebook, you can utilize [ifc-file-analyzer](https://www.nist.gov/services-resources/software/ifc-file-analyzer). This is a powerful tool that helps you export data from IFC files to Excel or CSV.

![](https://www.nist.gov/sites/default/files/styles/960_x_960_limit/public/images/2024/01/19/IFA-UI.png?itok=j1U9u6mH)

Additionally, if you're interested in original IFC-related articles, you can follow [blenderbim](https://blenderbim.org/docs-python/ifccsv.html) for detailed guides on exporting data from IFC files to Excel or CSV.

## Conclusion

In this article, I have documented how to export data from an IFC file to Excel or CSV. I have used Jupyter Notebook to demonstrate the process, and I have also provided an alternative method for those who prefer not to use Jupyter Notebook. I hope this article has been helpful to you, and I encourage you to explore the process further to gain a deeper understanding of the topic. Please visit github [Ifc-to-excel](https://github.com/chuongmep/Ifc-to-excel) to get the full code and try it out for yourself.

## References

- [ifcopenshell](https://ifcopenshell.org/)
- [pandas](https://pandas.pydata.org/)
- [Ifc-to-excel](https://github.com/chuongmep/Ifc-to-excel)
- [linkedin](https://www.linkedin.com/feed/update/urn:li:activity:7155941320212074496/)
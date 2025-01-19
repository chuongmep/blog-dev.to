## Mở đầu

Ở <a href="https://chuongmep.com/Add-Share-Parameter-To-Family" target="_blank">bài trước</a> chúng ta đã giải quyết bài toán Add Share Paramter vào Family, hôm nay với bài này mình sẽ bàn nhau về chủ đề thêm share paramter vào một Family hệ thống nhé.Công việc thêm vào các family này hơi khác so với công việc các family thông thường khiến mình phải đi đường vòng bằng việc tái tạo lại các share Paramter.

![](pic/imageSystemFamily3.png)

## Đối tượng cần xử lý

Một số đối tượng cơ bản 

![](pic/imageSystemFamily.png)

Đối tượng cụ thể hóa hơn cho MEP

![](pic/imageSystemFamily2.png)

## Thư viện sử dụng

Lấy về Parameter với tên Parameter, nếu có tạo rồi thì không tạo nữa

```cs
public static Parameter GetElemParam(Element elem, string name)
        {
            return GetElemParam(elem, name, false);
        }
public static Parameter GetElemParam(Element elem, string name, bool matchCase)
        {
            StringComparison comp = StringComparison.CurrentCultureIgnoreCase;
            if (matchCase) comp = StringComparison.CurrentCulture;

            foreach (Parameter p in elem.Parameters)
            {
                if (p.Definition.Name.Equals(name, comp)) return p;
            }
            return null;
```

Khởi tạo lại một enum mới

```py
public enum BindSharedParamResult
        {
            eAlreadyBound,
            eSuccessfullyBound,
            eWrongParamType,
            eWrongBindingType,
            eFailed
        }
```

Lấy về DefinitionFile từ tệp Share trong đường dẫn hoặc mở từ tệp Share Parameter đã chèn vào dự án

```cs
/// <summary>
        /// Get or Create Shared Params File
        /// </summary>
        /// <param name="app"></param>
        /// <returns></returns>
        public static DefinitionFile GetOrCreateSharedParamsFile(Autodesk.Revit.ApplicationServices.Application app)
        {
            string fileName = string.Empty;
            try // generic
            {
                // Get file
                fileName = app.SharedParametersFilename;
                // Create file if not set yet (ie after Revit installed and no Shared params used so far)
                if (string.Empty == fileName)
                {
                    fileName = Microsoft.VisualBasic.FileIO.SpecialDirectories.MyDocuments + "\\MyRevitSharedParams.txt";
                    StreamWriter stream = new StreamWriter(fileName);
                    stream.Close();
                    app.SharedParametersFilename = fileName;
                }
                return app.OpenSharedParameterFile();
            }
            catch(Exception ex)
            {
                MessageBox.Show("ERROR: Failed to get or create Shared Params File: " + ex.Message);
                return null;
            }
        }
```

Lấy về Shared Parameters Group từ DefinitionFile bên trên

```cs
/// <summary>
        /// Get or Create Shared Parameters Group
        /// </summary>
        /// <param name="defFile"></param>
        /// <param name="grpName"></param>
        /// <returns></returns>
        public static DefinitionGroup GetOrCreateSharedParamsGroup(DefinitionFile defFile, string grpName)
        {
            try // generic
            {
                DefinitionGroup defGrp = defFile.Groups.get_Item(grpName);
                if (null == defGrp) defGrp = defFile.Groups.Create(grpName);
                return defGrp;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"ERROR: Failed to get or create Shared Params Group: {ex.Message}");
                return null;
            }
        }
```

Tạo ra một SharedParamDefinition mới với DefinitionGroup ,ParameterType từ đối tượng đã được làm việc ở trên.

```cs
// <summary> 
        /// Get or Create Shared Parameter Definition
        /// </summary>
        /// <param name="defGrp"></param>
        /// <param name="parType">used only if creating</param>
        /// <param name="parName">used only if creating</param>
        /// <param name="visible">used only if creating</param>
        /// <returns></returns>
        public static Definition GetOrCreateSharedParamDefinition(Document doc, DefinitionGroup defGrp, ParameterType parType, string parName, bool visible)
        {
            try // generic
            {
                Definition def = defGrp.Definitions.get_Item(parName);
                if (null == def) def = defGrp.Definitions.Create2(doc,parName, parType, visible);
                return def;
            }
            catch (Exception ex)
            {
                MessageBox.Show(string.Format("ERROR: Failed to get or create Shared Params Definition: {0}", ex.Message));
                return null;
            }
        }
```

BindSharedParam vào BindSharedParamResult 

```cs
/// <summary>
        /// 
        /// </summary>
        /// <param name="doc"></param>
        /// <param name="cat"></param>
        /// <param name="paramName"></param>
        /// <param name="grpName"></param>
        /// <param name="paramType"></param>
        /// <param name="visible"></param>
        /// <param name="instanceBinding"></param>
        /// <returns></returns>
        public static BindSharedParamResult BindSharedParam(Document doc, Category cat, string paramName, string grpName,
                                                            ParameterType paramType, bool visible, bool instanceBinding)
        {
            try // generic
            {
                Autodesk.Revit.ApplicationServices.Application app = doc.Application;

                // This is needed already here to store old ones for re-inserting
                CategorySet catSet = app.Create.NewCategorySet();

                // Loop all Binding Definitions
                // IMPORTANT NOTE: Categories.Size is ALWAYS 1 !? For multiple categories, there is really one pair per each
                //                 category, even though the Definitions are the same...
                DefinitionBindingMapIterator iter = doc.ParameterBindings.ForwardIterator();
                while (iter.MoveNext())
                {
                    Definition def = iter.Key;
                    ElementBinding elemBind = (ElementBinding)iter.Current;

                    // Got param name match
                    if (paramName.Equals(def.Name, StringComparison.CurrentCultureIgnoreCase))
                    {
                        // Check for category match - Size is always 1!
                        if (elemBind.Categories.Contains(cat))
                        {
                            // Check Param Type
                            if (paramType != def.ParameterType) return BindSharedParamResult.eWrongParamType;
                            // Check Binding Type
                            if (instanceBinding)
                            {
                                if (elemBind.GetType() != typeof(InstanceBinding)) return BindSharedParamResult.eWrongBindingType;
                            }
                            else
                            {
                                if (elemBind.GetType() != typeof(TypeBinding)) return BindSharedParamResult.eWrongBindingType;
                            }
                            // Check Visibility - cannot (not exposed)
                            // If here, everything is fine, ie already defined correctly
                            return BindSharedParamResult.eAlreadyBound;
                        }
                        // If here, no category match, hence must store "other" cats for re-inserting
                        else
                        {
                            foreach (Category catOld in elemBind.Categories) catSet.Insert(catOld); //1 only, but no index...
                        }
                    }
                }

                // If here, there is no Binding Definition for it, so make sure Param defined and then bind it!
                DefinitionFile defFile = GetOrCreateSharedParamsFile(app);
                DefinitionGroup defGrp = GetOrCreateSharedParamsGroup(defFile, grpName);
                Definition definition = GetOrCreateSharedParamDefinition(doc, defGrp, paramType, paramName, visible);
                catSet.Insert(cat);
                Autodesk.Revit.DB.Binding bind = null;
                if (instanceBinding)
                {
                    bind = app.Create.NewInstanceBinding(catSet);
                }
                else
                {
                    bind = app.Create.NewTypeBinding(catSet);
                }

             
                if (doc.ParameterBindings.Insert(definition, bind))
                {
                    return BindSharedParamResult.eSuccessfullyBound;
                }
                else
                {
                    if (doc.ParameterBindings.ReInsert(definition, bind))
                    {
                        return BindSharedParamResult.eSuccessfullyBound;
                    }
                    else
                    {
                        return BindSharedParamResult.eFailed;
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error in Binding Shared Param: {ex.Message}");
                return BindSharedParamResult.eFailed;
            }

        }
```

Giờ thì mình sẽ bắt đầu khởi tạo một ShareParameter

```cs
/// <summary>
        /// Gets or Creates Element's shared param.
        /// </summary>
        /// <param name="elem">Revit Element to get param for</param>
        /// <param name="paramName">Parameter Name</param>
        /// <param name="grpName">Param Group Name (relevant only when Creation takes place)</param>
        /// <param name="paramType">Param Type (relevant only when Creation takes place)</param>
        /// <param name="visible">Param UI Visibility (relevant only when Creation takes place)</param>
        /// <param name="instanceBinding">Param Binding: Instance or Type (relevant only when Creation takes place)</param>
        /// <returns></returns>
        public static Parameter GetOrCreateElemSharedParam(Element elem, string paramName, string grpName, ParameterType paramType, bool visible, bool instanceBinding)
        {
            try
            {
                // Check if existing
                Parameter param = GetElemParam(elem, paramName);
                if (null != param) return param;

                // If here, need to create it...
                BindSharedParamResult res = BindSharedParam(elem.Document, elem.Category, paramName, grpName, paramType, visible, instanceBinding);
                if (res != BindSharedParamResult.eSuccessfullyBound && res != BindSharedParamResult.eAlreadyBound) return null;

                // If here, binding is OK and param seems to be IMMEDIATELY available from the very same command
                return GetElemParam(elem, paramName);
            }
            catch (Exception ex)
            {
                System.Windows.Forms.MessageBox.Show(string.Format("Error in getting or creating Element Param: {0}", ex.Message));
                return null;
            }
        }
```


Cuối cùng ta thử tạo một ShareParameter giả để kiểm thử xem nhé

```cs
public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {

            UIApplication uiapp = commandData.Application;
            UIDocument uidoc = uiapp.ActiveUIDocument;
            Autodesk.Revit.ApplicationServices.Application app = uiapp.Application;
            Document doc = uidoc.Document;
            //code
            Reference r = uidoc.Selection.PickObject(ObjectType.Element);
            Element Element = doc.GetElement(r);
            string praName = "DM_PanelAssignment";
            string groupName = "COMMON";
            Transaction tran = new Transaction(doc);
            tran.Start("Run");
            Parameter Param = GetOrCreateElemSharedParam(Element, praName, groupName, ParameterType.Text, true,true);
            //Element.LookupParameter(praName).Definition.ParameterGroup = BuiltInParameterGroup.PG_DATA;

            MessageBox.Show(Param.Definition.ParameterGroup.ToString());
            tran.Commit();

            return Result.Succeeded;
        }
```

## Kết Quả
  
![](pic/imageSystemFamily1.png)

## Mở rộng 

Bài này là một bài trình bày cơ bản về cách hoạt động của Share Paramter trong Family hệ thống.Hy vọng một ngày nào đó bạn sẽ cần nó và bắt đầu sử dụng công cụ như một ma thuật.

## Tham khảo

<a href="https://thebuildingcoder.typepad.com/" target="_blank">thebuildingcoder</a> 



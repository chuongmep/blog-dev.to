

## Introduction

A transform is a mathematical operation that changes the position, orientation, or size of an object. In 3D graphics, a transform point3d is an operation that changes the position of a point in 3D space.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-04-24-Transform-Shared-CooridnateSystem-To-Origin/pic/WCS-UCS.png?raw=true)

There are many different types of transform point3ds, but some of the most common ones include:

1. Translation: This type of transform moves a point by a certain amount in each of the three axes (x, y, and z).
2. Rotation: This type of transform rotates a point around a certain axis by a certain angle.
3. Scale: This type of transform scales a point by a certain factor in each of the three axes.

Transform point3ds can be used to create a variety of effects in 3D graphics, such as:

- Moving objects around the scene
- Rotating objects around their axes
- Scaling objects up or down
- Creating reflections and refractions
- Animating objects

Transform point3ds are an essential part of 3D graphics, and they are used in a wide variety of applications, such as video games, movies, and simulations.

In this article, we will look at how to use transform point3ds to transform for some software in AEC.
## How it works

To transform a point, you need to know the following:

- The point you want to transform
- The type of transform you want to apply

The point you want to transform is usually represented by a vector, which is a mathematical object that has both a magnitude and a direction. The magnitude of a vector is the length of the vector, and the direction of a vector is the direction in which the vector points.

The type of transform you want to apply is usually represented by a matrix, which is a mathematical object that has both a magnitude and a direction. The magnitude of a matrix is the length of the matrix, and the direction of a matrix is the direction in which the matrix points.

# Shared Coordinate System To World Coordinate System Dynamo Revit

This is an example of how to convert `World Coordinate System` to  `Shared Coordinate System` in **DynamoRevit** use Revit API.

```py:line-numbers
import clr
clr.AddReference('RevitServices')
import RevitServices 
from RevitServices.Persistence import DocumentManager
doc = DocumentManager.Instance.CurrentDBDocument

clr.AddReference('RevitNodes')
import Revit
clr.ImportExtensions(Revit.GeometryConversion)

clr.AddReference('RevitAPI')
import Autodesk
from Autodesk.Revit.DB import FilteredElementCollector, BuiltInCategory

# Create a list object from singleton...
def tolist(obj1):
	if hasattr(obj1,"__iter__"): return obj1
	else: return [obj1]
	
# Convert Point from  Internal to Shared Coordinates...
def ToSharedCoordinates(pt):
	pt = doc.ActiveProjectLocation.GetTotalTransform().Inverse.OfPoint(pt).ToPoint()
	return pt
shared = []
pts = tolist(IN[0])
for pt in pts:
	# Convert point to Shared Coordinates...
	shared.append(ToSharedCoordinates(pt.ToXyz())) 
OUT = shared

```

![](https://github.com/chuongmep/DataBlog/blob/master/2023-04-24-Transform-Shared-CooridnateSystem-To-Origin/pic/Revit_xSY6LEt3GZ.png?raw=true)

This is an example of how to convert `Shared Coordinate System` to `World Coordinate System` in **DynamoRevit** use Revit API.

```py:line-numbers
import clr
clr.AddReference('RevitServices')
import RevitServices
from RevitServices.Persistence import DocumentManager
doc = DocumentManager.Instance.CurrentDBDocument

clr.AddReference('RevitNodes')
import Revit
clr.ImportExtensions(Revit.GeometryConversion)

pts = [pt.ToXyz(True) for pt in IN[0]] if isinstance(IN[0],list) else [IN[0].ToXyz(True)]

#Translate point from Shared coordinates to Internal
translatedPoint = [doc.ActiveProjectLocation.GetTotalTransform().OfPoint(pt).ToPoint() for pt in pts]

if isinstance(IN[0], list): OUT = translatedPoint
else: OUT = translatedPoint[0]
```

![](https://github.com/chuongmep/DataBlog/blob/master/2023-04-24-Transform-Shared-CooridnateSystem-To-Origin/pic/Revit_Yka39UBt7r.png?raw=true)

You can call this method by passing the 3D point and the BasisX, BasisY, BasisZ, and Origin vectors as arguments. This is information snoop transform of Revit Software.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-04-24-Transform-Shared-CooridnateSystem-To-Origin/pic/Revit_gakxtfQI5Z.png?raw=true)

The method will return the transformed point with point test input is 0,0,0.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-04-24-Transform-Shared-CooridnateSystem-To-Origin/pic/msedge_tKbOepxLdP.png?raw=true)

```cs:line-numbers
public static Vector3D TransformPoint(Vector3D point, Vector3D basisX, Vector3D basisY, Vector3D basisZ, Vector3D origin)
    {
        // Create a 4x4 matrix with the BasisX, BasisY, BasisZ, and Origin of the transform
        double[,] matrix = new double[4, 4] {
            { basisX.X, basisY.X, basisZ.X, origin.X },
            { basisX.Y, basisY.Y, basisZ.Y, origin.Y },
            { basisX.Z, basisY.Z, basisZ.Z, origin.Z },
            { 0, 0, 0, 1 }
        };
    
        // Convert the point to a 4D vector
        double[] vector = new double[] { point.X, point.Y, point.Z, 1 };
    
        // Multiply the matrix by the point vector
        double[] result = new double[4];
        for (int i = 0; i < 4; i++)
        {
            for (int j = 0; j < 4; j++)
            {
                result[i] += matrix[i, j] * vector[j];
            }
        }
        // Divide the first three components of the result by the fourth component to get the transformed point
        Vector3D transformedPoint = new Vector3D(
            result[0] / result[3],
            result[1] / result[3],
            result[2] / result[3]
        );
    
        // Return the transformed point
        return transformedPoint;
    }
```

Note that this implementation assumes that the input vectors are all normalized and orthogonal to each other. If this is not the case, you may need to normalize the BasisX, BasisY, and BasisZ vectors and/or use the Gram-Schmidt process to orthogonalize them before performing the transformation.

Now, we will try apply with transform from Revit Software and Vector3D is class of Navisworks API define a 3D vector.

```cs:line-numbers
using Vector3D = Autodesk.Navisworks.Api.Vector3D;
// Define a point
Vector3D point = new Vector3D(0, 0,0);
//Vector3D point = new Vector3D(0, 0, 0);
// Define a transformation matrix
Vector3D bx = new Vector3D( 1, 0, 0);
Vector3D by = new Vector3D( 0, 1, 0);
Vector3D bz = new Vector3D( 0, 0, 1);
Vector3D origin = new Vector3D(-44.11,33.05, -343.18);
Vector3D vector3D = TransformPoint(point,bx, by, bz, origin);
Trace.WriteLine($"{vector3D.X}, {vector3D.Y}, {vector3D.Z}");
```
Result is : -44.11, 33.05, -343.18

# SCS To World Coordinate System in Navisworks

This is step of how to convert `Shared Coordinate System` of to `World Coordinate System` in **Navisworks** use Native API without depend on any software use matrix 3x3 with model exported shared coordinate system from Revit Software.

1. Invert the `Translate(BasisX,BasisY,BasisZ)` of Revit Software.
2. Multiply the `Shared Coordinate System (X,Y,Z)` of Revit Software with the `Translate(Inverted)` of Revit Software.
3. Translate the `Shared Coordinate System (X,Y,Z)` of Navisworks Software with the result Multiply `Translate(Inverted)` of Revit Software.


## Dot Matrix

The dot product of two matrices is a mathematical operation that takes two matrices of compatible dimensions and returns a single value. It is also known as the inner product or scalar product of two matrices.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-04-24-Transform-Shared-CooridnateSystem-To-Origin/pic/_Image_8f119224-b44a-4feb-8685-71d3eb826531.png?raw=true)

To compute the dot product of two matrices, we take the rows of the first matrix and multiply them element-wise with the corresponding columns of the second matrix, and then sum the results. This process is repeated for each row and column pair until all elements of the resulting matrix have been computed.

```cs:line-numbers
public static double[] DotProduct(double[,] matrix3x3, double[] matrix3x1)
{
    if (matrix3x3.GetLength(0) != 3 || matrix3x3.GetLength(1) != 3 || matrix3x1.Length != 3)
        throw new ArgumentException("Invalid matrix dimensions");

    double[] result = new double[3];
    for (int i = 0; i < 3; i++)
    {
        double sum = 0;
        for (int j = 0; j < 3; j++)
        {
            sum += matrix3x3[i, j] * matrix3x1[j];
        }
        result[i] = sum;
    }
    return result;
}
```
This method takes in a 3x3 matrix represented as a two-dimensional array matrix3x3, and a 3x1 matrix represented as a one-dimensional array matrix3x1. It checks that the input matrices have the correct dimensions, and then performs the matrix multiplication using two nested loops. The result is returned as a new one-dimensional array.

Note that this method assumes that the input matrices are composed of double values. If your matrices are of a different data type, you may need to adjust the method accordingly.

## Add Matrix

Matrix addition is a mathematical operation that takes two matrices of the same dimensions and returns a new matrix with the same dimensions, where each element in the new matrix is the sum of the corresponding elements in the two original matrices.

![](https://github.com/chuongmep/DataBlog/raw/master/2023-04-24-Transform-Shared-CooridnateSystem-To-Origin/pic/Matrix_B.webp)

```cs:line-numbers
 public static double[] Add(double[] matrix3x1, double[] matrix3x1_2)
    {
        if (matrix3x1.Length != 3 || matrix3x1_2.Length != 3)
            throw new ArgumentException("Invalid matrix dimensions");
        double[] result = new double[3];
        for (int i = 0; i < 3; i++)
        {
            result[i] = matrix3x1[i] + matrix3x1_2[i];
        }
        return result;
    }
```

This method takes in two 3x1 matrices represented as one-dimensional arrays matrix3x1 and matrix3x1_2. It checks that the input matrices have the correct dimensions, and then performs the matrix addition using a single loop. The result is returned as a new one-dimensional array.

## Inverse Matrix 

In linear algebra, a matrix is a rectangular array of numbers, and an invertible matrix, also called a non-singular matrix, is a square matrix that can be inverted or reversed. The inverse of a matrix A is denoted by A^-1, and it satisfies the property that A * A^-1 = A^-1 * A = I, where I is the identity matrix.

The inverse of a matrix is a useful concept in many areas of mathematics and engineering, as it allows us to solve linear equations, compute determinants, and perform other matrix operations. In particular, if a system of linear equations is represented as a matrix equation, then the solution can be obtained by multiplying both sides of the equation by the inverse of the matrix.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-04-24-Transform-Shared-CooridnateSystem-To-Origin/pic/matrix-inverse-1658128150.png?raw=true)

To calculate the inverse of a matrix, we first need to check if the matrix is invertible by calculating its determinant. If the determinant is zero, then the matrix is not invertible. If the determinant is nonzero, then we can use a formula to compute the inverse of the matrix.

```cs:line-numbers
public static double[,] InvertMatrix(double[,] matrix)
    {
        // Create an augmented matrix by appending the identity matrix
        int n = matrix.GetLength(0);
        double[,] augmented = new double[n, 2 * n];
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                augmented[i, j] = matrix[i, j];
            }
            augmented[i, n + i] = 1;
        }

        // Apply row operations to get the identity matrix on the left
        for (int i = 0; i < n; i++)
        {
            // Find the pivot element
            double pivot = augmented[i, i];
            if (pivot == 0)
            {
                throw new ArgumentException("Matrix is singular and cannot be inverted");
            }
            // Scale the row so that the pivot element is 1
            for (int j = i; j < 2 * n; j++)
            {
                augmented[i, j] /= pivot;
            }

            // Use row operations to get zeros above and below the pivot element
            for (int j = 0; j < n; j++)
            {
                if (j != i)
                {
                    double factor = augmented[j, i];
                    for (int k = i; k < 2 * n; k++)
                    {
                        augmented[j, k] -= factor * augmented[i, k];
                    }
                }
            }
        }

        // Extract the inverted matrix from the augmented matrix
        double[,] inverted = new double[n, n];
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                inverted[i, j] = augmented[i, n + j];
            }
        }
        return inverted;
    }
```

This method takes in a 3x3 matrix represented as a two-dimensional array matrix. It checks that the input matrix has the correct dimensions, and then performs the matrix inversion using a combination of row operations and matrix multiplication. The result is returned as a new two-dimensional array.

this is example of how to convert `Shared Coordinate System` of to `World Coordinate System` in **Navisworks** use Native API without depend on any software use matrix 3x3 with model exported shared coordinate system from Revit Software.

```cs:line-numbers
using Application = Autodesk.Navisworks.Api.Application;
using ComApi = Autodesk.Navisworks.Api.Interop.ComApi;
using ComApiBridge = Autodesk.Navisworks.Api.ComApi;
using Point3D = Autodesk.Navisworks.Api.Point3D;
using Transform3D = Autodesk.Navisworks.Api.Transform3D;
using Vector3D = Autodesk.Navisworks.Api.Vector3D;
Vector3D BasisX = new Vector3D(1, 0, 0);
Vector3D BasisY = new Vector3D(0,1,0);
Vector3D BasisZ = new Vector3D(0, 0, 1);
Vector3D SharedCoordinate = new Vector3D(-24664.056, -29518, 105640);
Vector3D Origin = new Vector3D(-13444.728,10073.64,-104598.216);
    double[,] matrix = new double[3, 3] {
    { BasisX.X, BasisY.X, BasisZ.X},
    { BasisX.Y, BasisY.Y, BasisZ.Y},
    { BasisX.Z, BasisY.Z, BasisZ.Z},
};
double[,] inverseMatrix = InvertMatrix(matrix);
double[] dotProduct = DotProduct(inverseMatrix, new double[] { SharedCoordinate.X, SharedCoordinate.Y, SharedCoordinate.Z });
double[] add = Add(dotProduct, new double[] { Origin.X, Origin.Y, Origin.Z });
// test matrix add 
Trace.WriteLine(add[0]);
Trace.WriteLine(add[1]);
Trace.WriteLine(add[2]);    
// Result :-38108.784, -19444.36, 10041.784
```

## Another Way With Navisworks

Sure, we have another way to convert `Shared Coordinate System` of to `World Coordinate System` in **Navisworks**. We can combine with get transform of model from Navisworks API, then by use way build R matrix, we also can convert `Shared Coordinate System` of to `World Coordinate System` in **Navisworks**. 

This is a step by step to convert `Shared Coordinate System` of to `World Coordinate System` in **Navisworks** by another way : 

1. Get Transform Information Of Model From Navisworks API

![](https://github.com/chuongmep/DataBlog/blob/master/2023-04-24-Transform-Shared-CooridnateSystem-To-Origin/pic/Roamer_CeaoFY3laR.png?raw=true)

1. Build [R Matrix](https://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics/geometry/how-does-matrix-work-part-1.html)

![](https://github.com/chuongmep/DataBlog/blob/master/2023-04-24-Transform-Shared-CooridnateSystem-To-Origin/pic/msedge_9KPHq32x2N.png?raw=true)

1. Resolve R Matrix by use `MathNet.Numerics.LinearAlgebra` with [LinearEquations](https://numerics.mathdotnet.com/LinearEquations)

```cs:line-numbers
using MathNet.Numerics.LinearAlgebra;
 public Point3D TranslateSharedToOrigin(Point3D clashpoint, ModelTransformInfo transform)
    {
        double angle = transform.Rotation * transform.RotationAxisZ;
        double ToDeg() => angle * Math.PI / 180;
        var A = Matrix<double>.Build.DenseOfArray(new double[,]
        {
            {Math.Cos(ToDeg()), -Math.Sin(ToDeg()), 0},
            {Math.Sin(ToDeg()), Math.Cos(ToDeg()), 0},
            {0, 0, 1}
        });
        var b = Vector<double>.Build.Dense(new double[]
        {
            clashpoint.X - transform.TranslationX, clashpoint.Y - transform.TranslationY,
            clashpoint.Z - transform.TranslationZ
        });
        Vector<double>? x = A.Solve(b);
        return new Point3D(x[0], x[1], x[2]);
    }
```
Result : -253981.168040937,229102.953117446,4742.145

Now let try quick check test combine with Revit Model, we use DynamoRevit to visualize result and compare with algorithm above: 

![](https://github.com/chuongmep/DataBlog/blob/master/2023-04-24-Transform-Shared-CooridnateSystem-To-Origin/pic/Revit_xjPlz2ZnCz.png?raw=true)

## Conclusion

In this article, I help you to convert `Shared Coordinate System` of to `World Coordinate System` in **Navisworks** use Native API without depend on any software use matrix 3x3 with model exported shared coordinate system from Revit Software also know how to convert `Shared Coordinate System` of to `World Coordinate System` in **DynamoRevit** use Revit API.

I hope you will find this article useful, and then you can use it in your project, apply for any software with same algorithm.

## References

- [studypug](https://www.studypug.com/algebra-help/multiplying-a-matrix-by-another-matrix)

- [cuemath](https://www.cuemath.com/algebra/inverse-of-a-matrix/)

- [scratchapixel](https://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics/geometry/how-does-matrix-work-part-1.html)

- [www3.nd.edu](https://www3.nd.edu/~pbui/teaching/cse.40166.fa10/slides/Lecture_4_Transformations_and_Matrices.pdf)

- [numerics.mathdotnet.com](https://numerics.mathdotnet.com/LinearEquations)
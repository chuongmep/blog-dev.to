
## Introduction

In this article, we will introduce the Hungarian Maximum Matching Algorithm, and also try to solve a problem using this algorithm. We also try with Brute Force Method and compare the results.

## Problem Description

We are resolve problem assignment to optimize cost. We have a list of workers and a list of tasks. Each worker can do a task with a cost. We need to assign each worker to a task, and the total cost is minimum.

Let's go to this problem, we have so many connect between Devices and Machines. Each Device can connect to many Machines, and each Machine can connect to many Devices. We need to assign each Device to a Machine, and the total cost is minimum.

## Top Definition need to know

### Permutations Formular 

Permutations Formular used to calculate the number of permutations of n objects taken r at a time. The formula is:

![](https://github.com/chuongmep/DataBlog/blob/master/2023-08-19-Hungarian-Maximum-Matching-Algorithm/pic/POWERPNT_3DZR290SqR.png?raw=true)

We use this formular to calculate the number of permutations of n objects taken r at a time. For example, we have 3 objects, and we want to take 2 objects at a time, so we have 6 permutations.

### Euclidean Distance

The Euclidean distance between two points in either the plane or 3-dimensional space measures the length of a segment connecting the two points. It is the most obvious way of representing distance between two points.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-08-19-Hungarian-Maximum-Matching-Algorithm/pic/Euclideandistance.png?raw=true)

This is the formula to calculate Euclidean Distance between 2 points quick calculate in Python:

```py
#euclidean distance
def euclidean_distance(x1, y1, x2, y2):
    return math.sqrt((x1 - x2)**2 + (y1 - y2)**2)
#input 2 point to calculate distance
x1 = int(input("Enter x1: "))
y1 = int(input("Enter y1: "))
x2 = int(input("Enter x2: "))
y2 = int(input("Enter y2: "))
#call function
euclidean_distance = euclidean_distance(x1, y1, x2, y2)
print("Distance need to calc: ", euclidean_distance)

```
## Mahattan Distance

The Manhattan distance between two vectors (or points) a and b is defined as ∑i|ai−bi| over the dimensions of the vectors.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-08-19-Hungarian-Maximum-Matching-Algorithm/pic/mahattan.png?raw=true)

This is the formula to calculate Mahattan Distance between 2 points quick calculate in Python:

```py:line-numbers
#mahatan distance
def manhattan_distance(x1, y1, x2, y2):
    return abs(x1 - x2) + abs(y1 - y2)
#input 2 point to calculate distance
x1 = int(input("Enter x1: "))
y1 = int(input("Enter y1: "))
x2 = int(input("Enter x2: "))
y2 = int(input("Enter y2: "))
#call function
manhattan_distance = manhattan_distance(x1, y1, x2, y2)
print("Distance need to calc: ", manhattan_distance)

```

As a picture below, we have 2 points A and B, we need to calculate the distance between them. We have 2 ways to calculate the distance, Euclidean Distance and Mahattan Distance. The line green is Euclidean Distance, and the line red is Mahattan Distance.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-08-19-Hungarian-Maximum-Matching-Algorithm/pic/PictureEcAndMaha.png?raw=true)

## Brute Force Method

The brute force method for solving an optimization problem using a cost matrix involves exhaustively exploring all possible permutations of the rows and columns of the matrix to find the permutation that results in the minimum total cost.
Here are the steps for applying the brute force method:

Step 1. Start with the original cost matrix.

Step 2. Generate all possible permutations of the rows and columns of the matrix. For an n x n matrix, there are n! possible permutations.

Step 3. For each permutation, calculate the total cost by summing the costs of the corresponding cells in the matrix.

Step 4. Keep track of the permutation with the minimum total cost. Output the minimum total cost and the permutation that achieved it. While the brute force method guarantees finding the optimal solution, it can be computationally expensive for large matrices due to the large number of permutations to explore. Therefore, more efficient algorithms, such as the Hungarian algorithm, are often used to solve optimization problems with cost matrices.

Let's go to the example, we have a cost matrix with 3 rows and 3 columns. We need to find the minimum cost and the permutation that achieved it. We call D is Device, and M is Machine. We have 3 Devices and 3 Machines. Each Device can connect to many Machines, and each Machine can connect to many Devices. We need to assign each Device to a Machine, and the total cost is minimum.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-08-19-Hungarian-Maximum-Matching-Algorithm/pic/POWERPNT_rD5WpJdpDV.png?raw=true)

So we can see overall how we can calculate the cost for each permutation use Mahattan Distance and Euclidean Distance:

![](https://github.com/chuongmep/DataBlog/blob/master/2023-08-19-Hungarian-Maximum-Matching-Algorithm/pic/POWERPNT_JAsAsqiE2Z.png?raw=true)

Now, let apply Brute Force Method to calculate the minimum cost and the permutation that achieved it. We have 6 permutations, and we need to calculate the cost for each permutation. We can see the result below:

![](https://github.com/chuongmep/DataBlog/blob/master/2023-08-19-Hungarian-Maximum-Matching-Algorithm/pic/POWERPNT_fc5kS2YCEJ.png?raw=true)

We will try build full code use Brute Force Method to test for this problem.

```cs:line-numbers
using System;
void Main()
{
var watch = new Stopwatch();
watch.Start();
// define the cost matrix
int[,] costMatrix = {{7, 0, 8},
                {5, 2, 7},
                {5, 3, 5}};
//int[,] costMatrix = {{7, 0, 11},
//				{5, 2, 9},
//				{7, 4, 7}};
int numRows = costMatrix.GetLength(0);
int numCols = costMatrix.GetLength(1);

// generate all possible assignments
var assignments = GetPermutations(Enumerable.Range(0, numCols), numRows).ToList();

// calculate the cost of each assignment
int minCost = int.MaxValue;
List<int> minAssignment = new List<int>();
foreach (var assignment in assignments)
{
    int cost = 0;
    for (int i = 0; i < numRows; i++)
    {
        cost += costMatrix[i, assignment.ToList()[i]];
    }
    Console.WriteLine($"Assignment: {string.Join(", ", assignment)}, Cost: {cost}");
    if (cost < minCost)
    {
        minCost = cost;
        minAssignment = assignment.ToList();
    }
}
Console.WriteLine($"\nMinimum cost: {minCost}, Assignment: {string.Join(", ", minAssignment)}");
Console.WriteLine(minAssignment);
watch.Stop();
Console.WriteLine("Execution time: " + watch.ElapsedMilliseconds + "ms");
}
static IEnumerable<IEnumerable<T>> GetPermutations<T>(IEnumerable<T> list, int length)
{
	if (length == 1)
	{
		return list.Select(x => new[] { x });
	}

	return GetPermutations(list, length - 1)
		.SelectMany(x => list.Where(y => !x.Contains(y)),
			(t1, t2) => t1.Concat(new[] { t2 }));
}

```

![](https://github.com/chuongmep/DataBlog/blob/master/2023-08-19-Hungarian-Maximum-Matching-Algorithm/pic/BruteForceMethod.png?raw=true)

The problem with this method is that it is very slow. The time complexity of this method is O(n!). So, if we have 10 devices and 10 machines, we have 10! = 3628800 permutations. If we have 20 devices and 20 machines, we have 20! = 2432902008176640000 permutations. So, we need to find another way to solve this problem. And we will use another like Hungarian Algorithm to solve this problem.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-08-19-Hungarian-Maximum-Matching-Algorithm/pic/BruteForceMethodCompare.png?raw=true)

## Hungarian Algorithm

The Hungarian algorithm, also known as the Kuhn–Munkres algorithm, is an algorithm that uses the following matrix operations to solve the assignment problem in polynomial time:

- Step 1: For each row, subtract the minimum number in that row from all numbers in that row. 
- Step 2: For each column, subtract the minimum number in that column from all numbers in that column. 
- Step 3: Draw the minimum number of lines to cover all zeroes. If this number = n, Done — an assignment can be made. 
- Step 4: Determine the minimum uncovered number. Subtract  from uncovered numbers. Add to numbers covered by two lines. Numbers covered by one line remain the same. Then, Go to Step 3.

The image below shows the steps of the Hungarian algorithm with input is same with Brute Force Method.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-08-19-Hungarian-Maximum-Matching-Algorithm/pic/POWERPNT_g2YWfBl9W2.png?raw=true)

This is full code demo to solve this problem use Hungarian Algorithm.

```cs:line-numbers
void Main()
{
	var watch = new Stopwatch();
	watch.Start();
	int[,] costMatrix = {{7, 0, 8},
					{5, 2, 7},
					{5, 3, 5}};
	//int[,] costMatrix = {{7, 0, 11},
	//				{5, 2, 9},
	//				{7, 4, 7}};
	var assignment = HungarianAlgorithm.FindAssignments(costMatrix);
	Console.WriteLine(assignment);
	watch.Stop();
	Console.WriteLine("Execution time: " + watch.ElapsedMilliseconds + "ms");

}

/// <summary>
/// Assigment Matching between list point of machine with list poitnt of device
/// </summary>
public static Dictionary<string, object> AssignmentMatching(List<Point> lcMachines,
		List<Point> lcDevices, double limit = double.MaxValue)
{
	int[,] cost = new int[lcMachines.Count, lcDevices.Count];
	for (int i = 0; i < cost.GetLength(0); i++)
	{
		for (int j = 0; j < cost.GetLength(1); j++)
		{
			int manhattan = (int)Manhattan(lcMachines[i], lcDevices[j]);
			if (manhattan > limit) cost[i, j] = int.MaxValue;
			cost[i, j] = manhattan;
		}
	}

	int[] result = cost.FindAssignments();
	List<Line> lines = new List<Line>();
	List<Point> machines = new List<Point>();
	List<Point> devices = new List<Point>();
	for (int i = 0; i < result.Length; i++)
	{
		Line line =
			new Line(lcMachines[i], lcDevices[result[i]]);
			//TODO : Need more case for list output with machine is not posible
		if (line.Length() <= limit)
		{
			lines.Add(line);
			machines.Add(lcMachines[i]);
			devices.Add(lcDevices[result[i]]);
		}
	}

	return new Dictionary<string, object?>()
		{
			{"lines", lines},
			{"machines", machines},
			{"devices", devices}
		};
}
internal static double Manhattan(double x1, double x2, double y1, double y2, double z1, double z2)
{
	return Math.Abs(x1 - x2) + Math.Abs(y1 - y2) + Math.Abs(z1 - z2);
}
public static double Manhattan(Point p1, Point p2)
{
	return Math.Abs(p1.X - p2.X) + Math.Abs(p1.Y - p2.Y) + Math.Abs(p1.Z - p2.Z);
}
public static double Euclidean(Point p1, Point p2)
{
	return Euclidean(p1.X, p2.X, p1.Y, p2.Y, p1.Z, p2.Z);
}
internal static double Euclidean(double x1, double x2, double y1, double y2, double z1, double z2)
{
	return Math.Sqrt(Math.Pow(x1 - x2, 2) + Math.Pow(y1 - y2, 2) + Math.Pow(z1 - z2, 2));
}
public static class HungarianAlgorithm
{
	/// <summary>
	/// Finds the optimal assignments for a given matrix of agents and costed tasks such that the total cost is minimized.
	/// </summary>
	/// <param name="costs">A cost matrix; the element at row <em>i</em> and column <em>j</em> represents the cost of agent <em>i</em> performing task <em>j</em>.</param>
	/// <returns>A matrix of assignments; the value of element <em>i</em> is the column of the task assigned to agent <em>i</em>.</returns>
	/// <exception cref="ArgumentNullException"><paramref name="costs"/> is null.</exception>
	public static int[] FindAssignments(this int[,] costs)
	{
		if (costs == null)
			throw new ArgumentNullException(nameof(costs));
		var h = costs.GetLength(0);
		var w = costs.GetLength(1);
		for (var i = 0; i < h; i++)
		{
			var min = int.MaxValue;

			for (var j = 0; j < w; j++)
			{
				min = Math.Min(min, costs[i, j]);
			}
			for (var j = 0; j < w; j++)
			{
				costs[i, j] -= min;
			}
		}

		var masks = new byte[h, w];
		var rowsCovered = new bool[h];
		var colsCovered = new bool[w];

		for (var i = 0; i < h; i++)
		{
			for (var j = 0; j < w; j++)
			{
				if (costs[i, j] == 0 && !rowsCovered[i] && !colsCovered[j])
				{
					masks[i, j] = 1;
					rowsCovered[i] = true;
					colsCovered[j] = true;
				}
			}
		}

		HungarianAlgorithm.ClearCovers(rowsCovered, colsCovered, w, h);

		var path = new Location[w * h];
		var pathStart = default(Location);
		var step = 1;

		while (step != -1)
		{
			step = step switch
			{
				1 => HungarianAlgorithm.RunStep1(masks, colsCovered, w, h),
				2 => HungarianAlgorithm.RunStep2(costs, masks, rowsCovered, colsCovered, w, h, ref pathStart),
				3 => HungarianAlgorithm.RunStep3(masks, rowsCovered, colsCovered, w, h, path, pathStart),
				4 => HungarianAlgorithm.RunStep4(costs, rowsCovered, colsCovered, w, h),
				_ => step
			};
		}

		var agentsTasks = new int[h];

		for (var i = 0; i < h; i++)
		{
			for (var j = 0; j < w; j++)
			{
				if (masks[i, j] == 1)
				{
					agentsTasks[i] = j;
					break;
				}
			}
		}

		return agentsTasks;
	}

	/// <summary>
	/// For each row, subtract the minimum number in that row from
	/// all numbers in that row
	/// </summary>
	/// <param name="masks"></param>
	/// <param name="colsCovered"></param>
	/// <param name="w">width</param>
	/// <param name="h">height</param>
	/// <returns></returns>
	/// <exception cref="ArgumentNullException"></exception>
	private static int RunStep1(byte[,] masks, bool[] colsCovered, int w, int h)
	{
		if (masks == null)
			throw new ArgumentNullException(nameof(masks));

		if (colsCovered == null)
			throw new ArgumentNullException(nameof(colsCovered));

		for (var i = 0; i < h; i++)
		{
			for (var j = 0; j < w; j++)
			{
				if (masks[i, j] == 1)
					colsCovered[j] = true;
			}
		}
		var colsCoveredCount = 0;

		for (var j = 0; j < w; j++)
		{
			if (colsCovered[j])
				colsCoveredCount++;
		}
		if (colsCoveredCount == h)
			return -1;
		return 2;
	}

	/// <summary>
	/// Find Zero number in matrix
	/// </summary>
	/// <param name="costs"></param>
	/// <param name="masks"></param>
	/// <param name="rowsCovered"></param>
	/// <param name="colsCovered"></param>
	/// <param name="w"></param>
	/// <param name="h"></param>
	/// <param name="pathStart"></param>
	/// <returns></returns>
	/// <exception cref="ArgumentNullException"></exception>
	private static int RunStep2(int[,] costs, byte[,] masks, bool[] rowsCovered, bool[] colsCovered, int w, int h,
		ref Location pathStart)
	{
		if (costs == null)
			throw new ArgumentNullException(nameof(costs));

		if (masks == null)
			throw new ArgumentNullException(nameof(masks));

		if (rowsCovered == null)
			throw new ArgumentNullException(nameof(rowsCovered));

		if (colsCovered == null)
			throw new ArgumentNullException(nameof(colsCovered));

		while (true)
		{
			var loc = HungarianAlgorithm.FindZero(costs, rowsCovered, colsCovered, w, h);
			if (loc.row == -1)
				return 4;

			masks[loc.row, loc.column] = 2;

			var starCol = HungarianAlgorithm.FindStarInRow(masks, w, loc.row);
			if (starCol != -1)
			{
				rowsCovered[loc.row] = true;
				colsCovered[starCol] = false;
			}
			else
			{
				pathStart = loc;
				return 3;
			}
		}
	}


	/// <summary>
	/// From Column in matrix, find Zero number
	/// </summary>
	/// <param name="masks"></param>
	/// <param name="rowsCovered"></param>
	/// <param name="colsCovered"></param>
	/// <param name="w"></param>
	/// <param name="h"></param>
	/// <param name="path"></param>
	/// <param name="pathStart"></param>
	/// <returns></returns>
	/// <exception cref="ArgumentNullException"></exception>
	private static int RunStep3(byte[,] masks, bool[] rowsCovered, bool[] colsCovered, int w, int h, Location[] path,
		Location pathStart)
	{
		if (masks == null)
			throw new ArgumentNullException(nameof(masks));

		if (rowsCovered == null)
			throw new ArgumentNullException(nameof(rowsCovered));

		if (colsCovered == null)
			throw new ArgumentNullException(nameof(colsCovered));

		var pathIndex = 0;
		path[0] = pathStart;

		while (true)
		{
			var row = HungarianAlgorithm.FindStarInColumn(masks, h, path[pathIndex].column);
			if (row == -1)
				break;

			pathIndex++;
			path[pathIndex] = new Location(row, path[pathIndex - 1].column);

			var col = HungarianAlgorithm.FindPrimeInRow(masks, w, path[pathIndex].row);

			pathIndex++;
			path[pathIndex] = new Location(path[pathIndex - 1].row, col);
		}

		HungarianAlgorithm.ConvertPath(masks, path, pathIndex + 1);
		HungarianAlgorithm.ClearCovers(rowsCovered, colsCovered, w, h);
		HungarianAlgorithm.ClearPrimes(masks, w, h);

		return 1;
	}

	private static int RunStep4(int[,] costs, bool[] rowsCovered, bool[] colsCovered, int w, int h)
	{
		if (costs == null)
			throw new ArgumentNullException(nameof(costs));

		if (rowsCovered == null)
			throw new ArgumentNullException(nameof(rowsCovered));

		if (colsCovered == null)
			throw new ArgumentNullException(nameof(colsCovered));

		var minValue = HungarianAlgorithm.FindMinimum(costs, rowsCovered, colsCovered, w, h);

		for (var i = 0; i < h; i++)
		{
			for (var j = 0; j < w; j++)
			{
				if (rowsCovered[i])
					costs[i, j] += minValue;
				if (!colsCovered[j])
					costs[i, j] -= minValue;
			}
		}

		return 2;
	}

	private static int FindMinimum(int[,] costs, bool[] rowsCovered, bool[] colsCovered, int w, int h)
	{
		if (costs == null)
			throw new ArgumentNullException(nameof(costs));

		if (rowsCovered == null)
			throw new ArgumentNullException(nameof(rowsCovered));

		if (colsCovered == null)
			throw new ArgumentNullException(nameof(colsCovered));

		var minValue = int.MaxValue;

		for (var i = 0; i < h; i++)
		{
			for (var j = 0; j < w; j++)
			{
				if (!rowsCovered[i] && !colsCovered[j])
					minValue = Math.Min(minValue, costs[i, j]);
			}
		}

		return minValue;
	}

	private static int FindStarInRow(byte[,] masks, int w, int row)
	{
		if (masks == null)
			throw new ArgumentNullException(nameof(masks));

		for (var j = 0; j < w; j++)
		{
			if (masks[row, j] == 1)
				return j;
		}

		return -1;
	}

	private static int FindStarInColumn(byte[,] masks, int h, int col)
	{
		if (masks == null)
			throw new ArgumentNullException(nameof(masks));

		for (var i = 0; i < h; i++)
		{
			if (masks[i, col] == 1)
				return i;
		}

		return -1;
	}

	private static int FindPrimeInRow(byte[,] masks, int w, int row)
	{
		if (masks == null)
			throw new ArgumentNullException(nameof(masks));

		for (var j = 0; j < w; j++)
		{
			if (masks[row, j] == 2)
				return j;
		}

		return -1;
	}

	private static Location FindZero(int[,] costs, bool[] rowsCovered, bool[] colsCovered, int w, int h)
	{
		if (costs == null)
			throw new ArgumentNullException(nameof(costs));

		if (rowsCovered == null)
			throw new ArgumentNullException(nameof(rowsCovered));

		if (colsCovered == null)
			throw new ArgumentNullException(nameof(colsCovered));

		for (var i = 0; i < h; i++)
		{
			for (var j = 0; j < w; j++)
			{
				if (costs[i, j] == 0 && !rowsCovered[i] && !colsCovered[j])
					return new Location(i, j);
			}
		}

		return new Location(-1, -1);
	}

	private static void ConvertPath(byte[,] masks, Location[] path, int pathLength)
	{
		if (masks == null)
			throw new ArgumentNullException(nameof(masks));

		if (path == null)
			throw new ArgumentNullException(nameof(path));

		for (var i = 0; i < pathLength; i++)
		{
			masks[path[i].row, path[i].column] = masks[path[i].row, path[i].column] switch
			{
				1 => 0,
				2 => 1,
				_ => masks[path[i].row, path[i].column]
			};
		}
	}

	private static void ClearPrimes(byte[,] masks, int w, int h)
	{
		if (masks == null)
			throw new ArgumentNullException(nameof(masks));

		for (var i = 0; i < h; i++)
		{
			for (var j = 0; j < w; j++)
			{
				if (masks[i, j] == 2)
					masks[i, j] = 0;
			}
		}
	}

	private static void ClearCovers(bool[] rowsCovered, bool[] colsCovered, int w, int h)
	{
		if (rowsCovered == null)
			throw new ArgumentNullException(nameof(rowsCovered));

		if (colsCovered == null)
			throw new ArgumentNullException(nameof(colsCovered));

		for (var i = 0; i < h; i++)
		{
			rowsCovered[i] = false;
		}

		for (var j = 0; j < w; j++)
		{
			colsCovered[j] = false;
		}
	}

	private struct Location
	{
		internal readonly int row;
		internal readonly int column;

		internal Location(int row, int col)
		{
			this.row = row;
			this.column = col;
		}
	}
}
public class Point
{
	public double X { get; set; }
	public double Y { get; set; }
	public double Z { get; set; }
	public Point(double x, double y, double z)
	{
		this.X = x;
		this.Y = y;
		this.Z = z;

	}
}
public class Line
{
	public Point StartPoint { get; set; }
	public Point EndPoint { get; set; }
	public Line(Point Start, Point End)
	{
		this.StartPoint = Start;
		this.EndPoint = End;
	}
	public double Length()
	{
		return Math.Sqrt(Math.Pow(this.EndPoint.X - this.StartPoint.X, 2) + Math.Pow(this.EndPoint.Y - this.StartPoint.Y, 2) + Math.Pow(this.EndPoint.Z - this.StartPoint.Z, 2));
	}
}
```

Now you can view full visual of Hungarian Algorithm use Dynamo with location of machine and device change, and connect will be change to math with location of machine and device make sure the distance is minimum and the cost is minimum.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-08-19-Hungarian-Maximum-Matching-Algorithm/pic/HungarianAssignment.gif?raw=true)

For test with real case, we can see use Hungarian Algorithm is faster than Brute Force Method. With that reason, we will use Hungarian Algorithm to try allply for real case and visualize with Dynamo.

The red line is result of Hungarian Algorithm visualize result connect between device and machine optimize with location of device and machine, make sure the distance is minimum and the cost is minimum.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-08-19-Hungarian-Maximum-Matching-Algorithm/pic/DynamoSandbox_6JaTeZw7GQ.png?raw=true)

## Conclusion

In this article, we have learned about the assignment problem and how to solve it using the Hungarian algorithm. We have also learned how to implement the Hungarian algorithm in C# and how to use it to solve the assignment problem. We have also learned how to use Dynamo to visualize the result of the Hungarian algorithm. I hope you have found this article useful.

For actual case with enginnering working, we still need many step to go ahead.

![](https://github.com/chuongmep/DataBlog/blob/master/2023-08-19-Hungarian-Maximum-Matching-Algorithm/pic/POWERPNT_bNkbj89Cci.png?raw=true)

## Refenrence

- [diva-portal.org](http://www.diva-portal.org/smash/get/diva2:918778/FULLTEXT02.pdf)

- [genetic-algorithm-in-machine-learning](https://www.javatpoint.com/genetic-algorithm-in-machine-learning)

- [Hungarian Algorithm](https://cyberlab.engr.uconn.edu/wp-content/uploads/sites/2576/2018/09/Lecture_8.pdf)

- [brilliant.org](https://brilliant.org/wiki/hungarian-matching/)
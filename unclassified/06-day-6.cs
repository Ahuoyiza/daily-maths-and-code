// implementation by : @ayiamco
using System.Linq;
					
public class Program
{
	public static void Main()
	{
		foreach(var item in Enumerable.Range(1,100))
		{
			Console.WriteLine($"{item}: {(decimal)item/(item+1)}");
		}
	}

}

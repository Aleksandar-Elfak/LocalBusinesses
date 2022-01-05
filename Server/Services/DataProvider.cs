using Neo4j.Driver;
using Server.Models;
using Neo4j.Driver.Extensions;

namespace Server.Services
{
    public class DataProvider
    {
        private IAsyncSession Session{ get; set; }
        public DataProvider()
        {
            Session = new Neo4JDriver().Session;
        }

        public async Task<Business> GetBusiness(string name)
        {
            var a = (await (await Session.RunAsync($"Match (b:Business) where b.name = '{name}' return b")).ToListAsync()).FirstOrDefault();

            Business b = a["b"].As<INode>().ToObject<Business>();
            System.Console.WriteLine($"{b.Name} {b.Address} {b.Rating.ToString()}");
            return b;
        }
    }
}


//var session = driver.AsyncSession();
//try
//{
//    var readResults = await session.ReadTransactionAsync(async tx =>
//    {
//        var result = await tx.RunAsync(@" MATCH (p:Business) RETURN p limit 25");
//        return (await result.ToListAsync());
//    });

//    //foreach (var result in readResults)
//    //{
//    //    //..Console.WriteLine($"Found person: {result["p"].As<String>()}");
//    //}
//    return readResults;
//}
//// Capture any errors along with the query and data for traceability
//catch (Neo4jException ex)
//{
//    Console.WriteLine($"{@" MATCH (p:Business) RETURN p.name limit 25"} - {ex}");
//    throw;
//}
//finally
//{
//    await session.CloseAsync();
//}
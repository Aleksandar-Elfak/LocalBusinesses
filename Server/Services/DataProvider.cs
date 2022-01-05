using Neo4j.Driver;
using Server.Models;
using Neo4j.Driver.Extensions;
using Neo4jClient;
using Neo4jClient.Cypher;

namespace Server.Services
{
    public class DataProvider
    {
        private IAsyncSession Session{ get; set; }
        public DataProvider()
        {
            Session = new Neo4JDriver().Session;
        }

        public async void GetBusiness(string name)
        {
            var a = (await (await Session.RunAsync($"Match (b:Business) where b.name = '{name}' return b")).ToListAsync()).FirstOrDefault();

            Business b = a["b"].As<INode>().ToObject<Business>();
            System.Console.WriteLine($"{b.Name} {b.Address} {b.Rating.ToString()}");
        
        }
    }
}

using Neo4j.Driver;
using Server.Models;
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
            System.Console.WriteLine(a["b"].ToString());
            foreach (var item in a.Values)
            {
                System.Console.WriteLine(item);
            }
            System.Console.WriteLine(a.Keys);
            foreach (var item in a.Keys)
            {
                System.Console.WriteLine(item);
            }
        
        }
    }
}

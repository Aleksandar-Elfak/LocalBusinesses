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

        public async Task<Business> GetBusiness(string name, string username)
        {
            var a = (await (await Session.RunAsync($"Match (b:Business) where b.name = '{name}' merge(u: User {{ username: '{username}'}})" +
                $"merge(u)-[r: Visited]->(b) on create set r.visits = 1 on match set r.visits = r.visits + 1 return b")).ToListAsync()).FirstOrDefault();

#pragma warning disable CS8602 // Dereference of a possibly null reference.
            Business b = a["b"].As<INode>().ToObject<Business>();
#pragma warning restore CS8602 // Dereference of a possibly null reference.
            return b;
        }

        public async Task<bool> LogInAsync(User user)
        {
            try
            {
                var list = await (await Session.RunAsync($"Merge (u:User {{username: '{user.Username}', password: '{user.Password}'}})  return u")).ToListAsync();

            }
            catch (Exception)
            {

                return false;
            }
            return true;
        }

        public async Task<bool> Review(string username, string business, Review r)
        {
            try
            {
                await Session.RunAsync($"Match (b:Business) where b.name = '{business}' merge(u: User {{ username: '{username}'}})" +
                    $"merge(u)-[r: Reviewed]->(b) set r.review = '{r.review}' set r.rating = { r.Rating}");
                ReRate(business);

            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }

        public async void ReRate(string name)
        {
            await Session.RunAsync($"MATCH ()-[r:Reviewed]->(b:Business) where b.name = '{name}' with b, avg(r.rating) as d set b.rating = d");
        }

        public async Task<List<Review>> GetUsernameReviews(string username)
        {
            List<Review> reviews = new List<Review>();
            var list = await (await Session.RunAsync($"Match (u:User)-[r:Reviewed]->(b:Business) where u.username = '{username}' return r, b.name limit 5")).ToListAsync();
            foreach (var item in list)
            {
                reviews.Add(item["r"].As<IRelationship>().ToObject<Review>());
                reviews.Last<Review>().Name = item["b.name"].As<string>();
            }
            return reviews;
        }

        public async Task<List<Review>> GetBusinessReviews(string name)
        {
            List<Review> reviews = new List<Review>();
            var list = await (await Session.RunAsync($"Match (u:User)-[r:Reviewed]->(b:Business) where b.name = '{name}' return r, u.username limit 5")).ToListAsync();
            foreach (var item in list)
            {
                reviews.Add(item["r"].As<IRelationship>().ToObject<Review>());
                reviews.Last<Review>().Name = item["u.username"].As<string>();
            }
            return reviews;
        }

        public async Task<List<Business>> SearchBusinesses(string tag)
        {
            List<Business> businesses = new List<Business>();
            var list = await(await Session.RunAsync($"Match (b:Business)-[:tagged]->(t:tag) where t.tag = '{tag}' return b order by b.rating desc limit 5")).ToListAsync();
            foreach (var item in list)
            {
                businesses.Add(item["b"].As<INode>().ToObject<Business>());
            }
            return businesses;
        }

        public async Task<List<Business>> GetRecommended(string username)
        {
            List<Business> businesses = new List<Business>();
            var list = await (await Session.RunAsync($"Match (u:User)-[v:Visited]->(b:Business) where u.username = '{username}' return b order by v.visits desc limit 5")).ToListAsync();
            if (list.Count == 0)
                list = await (await Session.RunAsync($"Match (b:Business) return b order by b.rating desc limit 5")).ToListAsync();
            foreach (var item in list)
            {
                businesses.Add(item["b"].As<INode>().ToObject<Business>());
            }
            return businesses;
        }

        public void DeleteReview(string username, string name)
        {
            Session.RunAsync($"MATCH(n {{ username: '{username}'}})-[r: Reviewed]->(b: Business {{ name: '{name}'}}) DELETE r");
            ReRate(name);
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
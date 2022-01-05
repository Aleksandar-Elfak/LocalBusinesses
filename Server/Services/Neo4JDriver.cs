using Neo4j.Driver;

namespace Server.Services
{
    public class Neo4JDriver
    {
        private IAsyncSession? session;
        public IAsyncSession Session 
        {
            get
            {
                if (session == null)
                {
                    var _Driver = GraphDatabase.Driver("neo4j+s://11018b1e.databases.neo4j.io", AuthTokens.Basic("neo4j", "2sfjsGtxy4jhdDucsUSYCckzvGNEg4AwnEmO6LrI9UY"));
                    session = _Driver.AsyncSession();
                }
                return session;
            }
        }
    }
}

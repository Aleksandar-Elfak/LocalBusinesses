using Neo4j.Driver.Extensions;

namespace Server.Models
{
    public class User
    {
        [Neo4jProperty(Name = "username")]
        public string? Username { get; set; }
        [Neo4jProperty(Name = "password")]
        public string? Password { get; set; }

    }
}
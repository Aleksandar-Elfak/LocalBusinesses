using Neo4j.Driver.Extensions;

namespace Server.Models
{
    public class Review
    {
        [Neo4jProperty(Name = "review")]
        public string? review { get; set; }
        [Neo4jProperty(Name = "rating")]
        public double Rating { get; set; }
        public string? Name { get; set; }
    }
}

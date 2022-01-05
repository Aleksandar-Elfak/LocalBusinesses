using Microsoft.AspNetCore.Mvc;
using Neo4j.Driver;
using Neo4jClient;

namespace Server.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public async Task<List<IRecord>> Get()
    {
        IDriver driver = GraphDatabase.Driver("neo4j+s://11018b1e.databases.neo4j.io", AuthTokens.Basic("neo4j", "2sfjsGtxy4jhdDucsUSYCckzvGNEg4AwnEmO6LrI9UY"));
        var session = driver.AsyncSession();
        try
        {
            var readResults = await session.ReadTransactionAsync(async tx =>
            {
                var result = await tx.RunAsync(@" MATCH (p:Business) RETURN p limit 25");
                return (await result.ToListAsync());
            });

            //foreach (var result in readResults)
            //{
            //    //..Console.WriteLine($"Found person: {result["p"].As<String>()}");
            //}
            return readResults;
        }
        // Capture any errors along with the query and data for traceability
        catch (Neo4jException ex)
        {
            Console.WriteLine($"{@" MATCH (p:Business) RETURN p.name limit 25"} - {ex}");
            throw;
        }
        finally
        {
            await session.CloseAsync();
        }
    }
}

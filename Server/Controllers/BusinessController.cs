using Microsoft.AspNetCore.Mvc;
using Neo4j.Driver;
using Server.Services;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BusinessController : ControllerBase
    {
        public DataProvider data { get; set; }

        public BusinessController()
        {
            data = new DataProvider();
        }

        [HttpGet]
        [Route("GetBusiness/{name}&{username}")]
        public async Task<Business> GetBusiness(string name, string username)
        {
            return await data.GetBusiness(name, username);
        }

        [HttpGet]
        [Route("GetRecommended/{username}")]
        public async Task<List<Business>> GetRecommended(string username)
        {
            return await data.GetRecommended(username);
        }

        [HttpGet]
        [Route("GetReviews/{username}")]
        public async Task<List<Review>> GetReviews(string username)
        {
            return await data.GetReviews(username);
        }

        [HttpGet]
        [Route("SearchBusinesses/{tag}")]
        public async Task<List<Business>> SearchBusinesses(string tag)
        {
            return await data.SearchBusinesses(tag);
        }

        [HttpPost]
        [Route("Review/{username}&{name}")]
        public IActionResult Review([FromBody] Review r, string username, string name)
        {
            data.Review(username, name, r);
            return Ok();
        }

        [HttpPost]
        [Route("LogIn")]
        public IActionResult LogIn([FromBody] User user)
        {
            data.LogIn(user);
            return Ok();
        }
    }
}

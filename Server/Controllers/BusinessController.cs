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
        [Route("GetUsernameReviews/{username}")]
        public async Task<List<Review>> GetUsernameReviews(string username)
        {
            return await data.GetUsernameReviews(username);
        }

        [HttpGet]
        [Route("GetBusinessReviews/{name}")]
        public async Task<List<Review>> GetBusinessReviews(string name)
        {
            return await data.GetBusinessReviews(name);
        }

        [HttpGet]
        [Route("SearchBusinesses/{tag}")]
        public async Task<List<Business>> SearchBusinesses(string tag)
        {
            return await data.SearchBusinesses(tag);
        }

        [HttpPost]
        [Route("Review/{username}&{name}")]
        public async Task<IActionResult> ReviewAsync([FromBody] Review r, string username, string name)
        {
            await data.Review(username, name, r);
            return Ok();
        }

        [HttpPost]
        [Route("LogIn")]
        public async Task<bool> LogIn([FromBody] User user)
        {
            return await data.LogInAsync(user);
        }

        [HttpDelete]
        [Route("DeleteReview/{username}&{name}")]
        public IActionResult DeleteReview(string username, string name)
        {
            data.DeleteReview(username, name);
            return Ok();
        }
    }
}

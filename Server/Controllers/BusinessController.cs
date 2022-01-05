using Microsoft.AspNetCore.Mvc;
using Neo4j.Driver;
using Server.Services;

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
        [Route("GetBusiness/{name}")]
        public IActionResult GetDeliveries(string name)
        {
            Task<Models.Business> task = data.GetBusiness(name);
            return Ok();
        }
    }
}

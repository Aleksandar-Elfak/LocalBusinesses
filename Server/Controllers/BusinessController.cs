﻿using Microsoft.AspNetCore.Mvc;
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
        [Route("GetBusiness/{name}")]
        public async Task<Business> GetBusiness(string name)
        {
            return await data.GetBusiness(name);
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

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace XgagSPA.Controllers
{
    [Route("api/[controller]")]
    public class ConfigurationController : Controller
    {
        private readonly ServersConfiguration m_ServersConfiguration;

        public ConfigurationController(
            IOptions<ServersConfiguration> serversConfiguration)
        {
            m_ServersConfiguration = serversConfiguration.Value;
        }

        // GET: api/values
        [HttpGet]
        public ServersConfiguration Get()
        {
            return m_ServersConfiguration;
        }
    }
}

using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ReactResume.Data.Dto;
using ReactResume.Data.Interface;
using ReactResume.Data.Service;

namespace ReactResume.Web.Api
{
    [Produces("application/json")]
    [Route("api/jobs")]
    public class JobsController : Controller
    {
        //TODO: Add Ninject binding, use generics instead
        private IDataService<JobDto> _jobService;

        public JobsController()
        {
            _jobService = new JsonFileJobService();
        }

        [HttpGet("")]
        public IEnumerable<JobDto> GetJobs()
        {
            return _jobService.GetData();
        }
    }
}
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ReactResume.Data.Dto;
using ReactResume.Data.Interface;
using ReactResume.Data.Service;

namespace ReactResume.Web.Api
{
    [Produces("application/json")]
    [Route("api/education")]
    public class EducationController : Controller
    {
        private IDataService<EducationDto> _educationService;

        public EducationController()
        {
            _educationService = new JsonFileEducationService();
        }

        [HttpGet("")]
        public JsonResult GetEducation()
        {
            return Json(_educationService.GetData());
        }
    }
}
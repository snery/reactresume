using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ReactResume.Data.Dto;
using ReactResume.Data.Interface;
using ReactResume.Data.Service;

namespace ReactResume.Web.Api
{
    [Produces("application/json")]
    [Route("api/skills")]
    public class SkillsController : Controller
    {
        private IDataService<GenericDto> _skillsService;

        public SkillsController()
        {
            _skillsService = new JsonFileGenericObjectService();
        }

        [HttpGet("")]
        public IEnumerable<GenericDto> GetSkills()
        {
            return _skillsService.GetData();
        }
    }
}
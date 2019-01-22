using Newtonsoft.Json;
using ReactResume.Caching.Concrete;
using ReactResume.Caching.Interface;
using ReactResume.Data.Dto;
using ReactResume.Data.Interface;
using System.Collections.Generic;
using System.IO;

namespace ReactResume.Data.Service
{
    public class JsonFileEducationService : IDataService<EducationDto>
    {
        public ICacheWrapper<EducationDto> CacheWrapper { get; set; }

        public JsonFileEducationService()
        {
            CacheWrapper = new MemoryCacheWrapper<EducationDto>();
        }

        public IEnumerable<EducationDto> GetData()
        {
            return CacheWrapper.GetCachedValues(() => ReadJsonFile());
        }

        private IEnumerable<EducationDto> ReadJsonFile()
        {
            using (StreamReader reader = new StreamReader("json/education.json"))
            {
                string json = reader.ReadToEnd();
                var schools = JsonConvert.DeserializeObject<IEnumerable<EducationDto>>(json);
                return schools;
            }
        }
    }
}

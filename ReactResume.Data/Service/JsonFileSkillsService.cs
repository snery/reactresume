using ReactResume.Caching.Concrete;
using ReactResume.Caching.Interface;
using ReactResume.Data.Interface;
using System.IO;
using Newtonsoft.Json;
using System.Collections.Generic;
using ReactResume.Data.Dto;
using Newtonsoft.Json.Linq;

namespace ReactResume.Data.Service
{
    public class JsonFileGenericObjectService : IDataService<GenericDto>
    {
        public ICacheWrapper<GenericDto> CacheWrapper { get;set; }

        public JsonFileGenericObjectService()
        {
            CacheWrapper = new MemoryCacheWrapper<GenericDto>();
        }

        public IEnumerable<GenericDto> GetData()
        {
            using (StreamReader reader = new StreamReader("json/skills.json"))
            {
                string json = reader.ReadToEnd();
                dynamic parsed = JsonConvert.DeserializeObject(json);
                var list = new List<GenericDto>();
                foreach(dynamic entry in parsed)
                {
                    list.Add(new GenericDto
                    {
                        Key = entry.Name,
                        Value = entry.Value
                    });
                }
                return list;
            }
        }
    }
}

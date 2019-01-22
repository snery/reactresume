using Newtonsoft.Json;
using ReactResume.Caching.Concrete;
using ReactResume.Caching.Interface;
using ReactResume.Data.Dto;
using ReactResume.Data.Interface;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace ReactResume.Data.Service
{
    public class JsonFileJobService : IDataService<JobDto>
    {
        public ICacheWrapper<JobDto> CacheWrapper { get; set; }

        public JsonFileJobService()
        {
            CacheWrapper = new MemoryCacheWrapper<JobDto>();
        }

        public IEnumerable<JobDto> GetData()
        {
            return CacheWrapper.GetCachedValues(() => ReadJsonFile());
        }        

        private IEnumerable<JobDto> ReadJsonFile()
        {
            using (StreamReader reader = new StreamReader("json/jobs.json"))
            {
                string json = reader.ReadToEnd();
                var jobs = JsonConvert.DeserializeObject<IEnumerable<JobDto>>(json);
                return jobs;
            }
        }
    }
}
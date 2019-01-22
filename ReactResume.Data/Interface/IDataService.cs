using ReactResume.Caching.Interface;
using ReactResume.Data.Dto;
using System.Collections.Generic;

namespace ReactResume.Data.Interface
{
    public interface IDataService<T> where T : class, new()
    {
        ICacheWrapper<T> CacheWrapper { get; set; }

        IEnumerable<T> GetData();
    }
}
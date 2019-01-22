using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;

namespace ReactResume.Caching.Interface
{
    public interface ICacheWrapper<T> where T : class
    {
        object[] MethodParams(params object[] args);

        int? CacheMinutes { get; set; }

        IEnumerable<T> GetCachedValues(Func<IEnumerable<T>> method, object[] parameters = null, [CallerMemberName] string caller = null);

        IEnumerable<T> SetAndReturnCacheValue(Func<IEnumerable<T>> method, object[] parameters = null, [CallerMemberName] string caller = null);

        T GetCachedValues(Func<T> method, object[] parameters = null, [CallerMemberName] string caller = null);

        T SetAndReturnCacheValue(Func<T> method, object[] parameters = null, [CallerMemberName] string caller = null);
    }
}

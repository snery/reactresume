using ReactResume.Caching.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Runtime.Caching;
using System.Runtime.CompilerServices;
using System.Linq;

namespace ReactResume.Caching.Concrete
{
    public class MemoryCacheWrapper<T> : ICacheWrapper<T> where T : class
    {
        private MemoryCache _cache = MemoryCache.Default;

        private CacheItemPolicy Policy
        {
            get { return new CacheItemPolicy { AbsoluteExpiration = DateTime.Now.AddMinutes(CacheMinutes ?? 60) }; }
        }

        #region ICacheWrapper Implementation

        public object[] MethodParams(params object[] args) => args;

        public int? CacheMinutes { get; set; }

        public IEnumerable<T> GetCachedValues(Func<IEnumerable<T>> method, object[] parameters = null, [CallerMemberName] string caller = null)
        {
            string cacheKey = GetKeyName(method, caller, parameters);

            IEnumerable<T> value;
            if (_cache.Get(cacheKey) == null)
            {
                value = method().ToList();
                _cache.Set(cacheKey, value, Policy);
            }

            return (IEnumerable<T>)_cache.Get(cacheKey);
        }

        public T GetCachedValues(Func<T> method, object[] parameters = null, [CallerMemberName] string caller = null)
        {
            string cacheKey = GetKeyName(method, caller, parameters);

            T value;
            if (_cache.Get(cacheKey) == null)
            {
                value = method();
                _cache.Set(cacheKey, value, Policy);
            }

            return (T)_cache.Get(cacheKey);
        }

        public IEnumerable<T> SetAndReturnCacheValue(Func<IEnumerable<T>> method, object[] parameters = null, [CallerMemberName] string caller = null)
        {
            string cacheKey = GetKeyName(method, caller, parameters);

            IEnumerable<T> value;
            value = method().ToList();
            _cache.Set(cacheKey, value, Policy);

            return (IEnumerable<T>)_cache.Get(cacheKey);
        }

        public T SetAndReturnCacheValue(Func<T> method, object[] parameters = null, [CallerMemberName] string caller = null)
        {
            string cacheKey = GetKeyName(method, caller, parameters);

            T value;
            value = method();
            _cache.Set(cacheKey, value, Policy);

            return (T)_cache.Get(cacheKey);
        }

        #endregion

        #region Private Methods

        private string GetKeyName(Func<IEnumerable<T>> method, string functionName, params object[] parameters)
        {
            string className = method.Method.DeclaringType.FullName;

            string parameterValues = string.Empty;
            if (parameters != null)
            {
                foreach (object parameter in parameters)
                {
                    if (parameter != null)
                        parameterValues = string.Concat(parameterValues, "_", parameter.ToString());
                }
            }

            return string.Concat(className, "_", functionName, parameterValues);
        }

        private string GetKeyName(Func<T> method, string functionName, params object[] parameters)
        {
            string className = method.Method.DeclaringType.FullName;

            string parameterValues = string.Empty;
            if (parameters != null)
            {
                foreach (object parameter in parameters)
                {
                    if (parameter != null)
                        parameterValues = string.Concat(parameterValues, "_", parameter.ToString());
                }
            }

            return string.Concat(className, "_", functionName, parameterValues);
        }

        #endregion
    }
}

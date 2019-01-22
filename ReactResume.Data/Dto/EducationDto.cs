using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReactResume.Data.Dto
{
    public class EducationDto
    {
        [JsonProperty("school")]
        public string School { get; set; }

        [JsonProperty("image")]
        public string Image { get; set; }

        [JsonProperty("startdate")]
        public string StartDate { get; set; }

        [JsonProperty("enddate")]
        public string EndDate { get; set; }

        [JsonProperty("degree")]
        public string Degree { get; set; }
    }
}

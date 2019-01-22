using Newtonsoft.Json;
using System;

namespace ReactResume.Data.Dto
{
    public class JobDto
    {
        [JsonProperty("company")]
        public string Company { get; set; }

        [JsonProperty("position")]
        public string Position { get; set; }

        [JsonProperty("image")]
        public string Image { get; set; }

        [JsonProperty("startdate")]
        public string StartDate { get; set; }

        [JsonProperty("enddate")]
        public string EndDate { get; set; }

        [JsonProperty("iscurrent")]
        public bool IsCurrent { get; set; }

        [JsonProperty("responsibilities")]
        public string[] Responsibilities { get; set; }

        [JsonProperty("projects")]
        public string[] Projects { get; set; }
    }
}

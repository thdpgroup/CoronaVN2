using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace vnGeoJson
{
  public class ProvinceJson
  {
   
    public string name { get; set; }
    public int id { get; set; }

    [JsonProperty("case")]
    public int Case { get; set; }

    public int recovered { get; set; }

    public int death { get; set; }

    [JsonProperty("new")]
    public int NewCase { get; set; }

    public int color { get; set; }
  }
}

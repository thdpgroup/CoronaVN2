using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace vnGeoJson
{
  public class Geometry2
  {
    public string type { get; set; }
    public List<List<List<double>>> coordinates { get; set; }
  }

  public class Geometry
  {
    public string type { get; set; }
    public List<List<List<double>>> coordinates { get; set; }
    public List<Geometry2> geometries { get; set; }
  }

  public class GeometryMulti
  {
    public GeometryMulti()
    {
      type = "MultiPolygon";
    }

    public GeometryMulti(List<List<List<double>>> data)
    {
      coordinates = new List<List<List<List<double>>>>();
      type = "MultiPolygon";
      coordinates.Add(data);
    }

    public string type { get; set; }
    public List<List<List<List<double>>>> coordinates { get; set; }
    public List<Geometry2> geometries { get; set; }
  }

  public class Feature
  {
    public string type { get; set; }
    public Geometry geometry { get; set; }
    public geovn.Properties properties { get; set; }
  }

  public class FeatureMultigon
  {
    public string type { get; set; }
    public GeometryMulti geometry { get; set; }
    public geovn.Properties properties { get; set; }
  }

  public class GeoVn
  {
    public string type { get; set; }
    public List<Feature> features { get; set; }
  }


  public class GeoMultiPolygon
  {
    public string type { get; set; }
    public List<FeatureMultigon> features { get; set; }
  }
}

namespace geovn
{
  public class Properties
  {
  
    public string country { get; set; }
    public string province { get; set; }
    public int id { get; set; }
    
  }
}

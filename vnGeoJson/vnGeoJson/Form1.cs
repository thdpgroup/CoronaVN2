using GeoJSON.Net.Converters;
using GeoJSON.Net.Feature;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace vnGeoJson
{
  public partial class Form1 : Form
  {
    public Form1()
    {
      InitializeComponent();
    }

    private void button1_Click(object sender, EventArgs e)
    {
      string dataJson = File.ReadAllText("./data/map_vn.geo.json");
      var data2 = JsonConvert.DeserializeObject<GeoVn>(dataJson);
      int i = 0;

      foreach (var feature in data2.features)
      {
        i++;
        feature.properties.Id = i;
      }

      //---- convert to multi polygon
      GeoVnPolygon geoMultiPolygon = new GeoVnPolygon()
      {
        type = data2.type,
        features = new List<FeatureMultigon>()
    };

      foreach (var feature in data2.features)
      {
        geoMultiPolygon.features.Add(new FeatureMultigon() {
          type = feature.type,
          properties = feature.properties,
          geometry = new GeometryMulti(feature.geometry.coordinates)
        });
      }

      var dataSerialize = JsonConvert.SerializeObject(geoMultiPolygon);
      CreateJsonFile(dataSerialize, "geo_vn.json");
    }

    private static void CreateJsonFile(string dataSerialize,string fileName)
    {
      if (File.Exists(fileName))
      {
        File.Delete(fileName);
      }

      File.WriteAllText(fileName, dataSerialize);
    }

    private void btnProvince_Click(object sender, EventArgs e)
    {
      var provinces = new List<ProvinceJson>();

      string dataJson = File.ReadAllText("./data/map_vn.geo.json");
      var data2 = JsonConvert.DeserializeObject<GeoVn>(dataJson);
      int i = 0;

      foreach (var feature in data2.features)
      {
        i++;
        provinces.Add(new ProvinceJson() {
          Id = i,
          Case = 0,
          color = 0,
          name = feature.properties.province
        });
      }

      var dataSerialize = JsonConvert.SerializeObject(provinces);
      CreateJsonFile(dataSerialize, "provinces.json");
    }
  }
}

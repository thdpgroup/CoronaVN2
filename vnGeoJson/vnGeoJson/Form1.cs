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
      var geoPolygon = JsonConvert.DeserializeObject<GeoVn>(dataJson);
      int i = 0;

      foreach (var feature in geoPolygon.features)
      {
        i++;
        feature.properties.id = i;
      }
      // using for conver to Multi Polygon
      // ConvertToMultiPolygon(geoPolygon);

      var dataSerialize = JsonConvert.SerializeObject(geoPolygon);
      CreateJsonFile(dataSerialize, "geo_vn.json");

      MessageBox.Show("NO error ! So, it done =)))) ");
    }

    private static void CreateJsonFile(string dataSerialize, string fileName)
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
          id = i,
          Case = 0,
          color = 0,
          name = feature.properties.province
        });
      }

      var dataSerialize = JsonConvert.SerializeObject(provinces);
      CreateJsonFile(dataSerialize, "provinces.json");

      MessageBox.Show("NO error => DONE !!!  ");
    }

    private GeoMultiPolygon ConvertToMultiPolygon(GeoVn data)
    {
      //---- convert to multi polygon
      GeoMultiPolygon geoMultiPolygon = new GeoMultiPolygon()
      {
        type = data.type,
        features = new List<FeatureMultigon>()
      };

      foreach (var feature in data.features)
      {
        geoMultiPolygon.features.Add(new FeatureMultigon()
        {
          type = feature.type,
          properties = feature.properties,
          geometry = new GeometryMulti(feature.geometry.coordinates)
        });
      }

      return geoMultiPolygon;
    }
  }


}

<template>
  <div id="app">
    <l-map :center="[16.109,102.797]" :zoom="6" style="height: 500px;" :options="mapOptions">
      <l-choropleth-layer :data="pyDepartmentsData" titleKey="name" idKey="id" :value="value" geojsonIdKey="id" :geojson="paraguay" :colorScale="colorScale">
        <template slot-scope="props">
          <l-info-control :item="props.currentItem" :unit="props.unit" title="Department" placeholder="Hover over a department"/>
          <l-reference-chart title="Girls school enrolment" :colorScale="colorScale" position="topright"/>
        </template>
      </l-choropleth-layer>
      <l-tile-layer :url="url"></l-tile-layer>
    </l-map>
  </div>
</template>

<script>
import { InfoControl, ReferenceChart, ChoroplethLayer } from 'vue-choropleth'

import geojson  from '../assets/data/geo_vn.json'  // ./data/py-departments-geojson
import paraguay from '../assets/data/geo_vn.json'  // './data/paraguay.json'
import pyDepartmentsData from '../assets/data/provinces.json'
import {LMap, LTileLayer} from 'vue2-leaflet';

export default {
  name: "app",
  components: { 
    LMap,
    LTileLayer,
    'l-info-control': InfoControl, 
    'l-reference-chart': ReferenceChart, 
    'l-choropleth-layer': ChoroplethLayer 
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      pyDepartmentsData,
      paraguay,
      colorScale: ["1a44db", "1a44db",  "f10f0f", "f10f0f"],
      value: {
        key: "Case",
        metric: "Số người bị"
      },
      mapOptions: {
        attributionControl: false
      },
      currentStrokeColor: '3d3213'
    }
  }
}
</script>
<style>
@import "../node_modules/leaflet/dist/leaflet.css";
body {
  background-color: #e7d090;
  margin-left: 100px;
  margin-right: 100px;
}

#map {
  background-color: #eee;
}
</style>

<template>
  <div id="app">
    <l-map :center="[16.109,102.797]" :zoom="6" style="height: 500px;">
      <l-choropleth-layer :data="pyDepartmentsData" titleKey="name" idKey="id" :value="value" geojsonIdKey="id" :geojson="paraguay"
        :colorScale="colorScale" 
        :strokeColor="strokeColor" 
        :currentStrokeColor="currentStrokeColor"
        :strokeWidth="strokeWidth"
        :currentStrokeWidth="currentStrokeWidth"
        @click="openPopUp(circle.center, 'circle')">
        <template slot-scope="props">
          <l-info-control :item="props.currentItem" :unit="props.unit" title="Số ca nhiễm"/>
        </template>
      </l-choropleth-layer>
      <l-tile-layer :url="url" :attribution="tileOptions.attribution" :noWrap="true"></l-tile-layer>
      <l-circle
      :lat-lng="circle.center"
      :radius="circle.radius"
      :color="circle.color"
      @click="openPopUp(circle.center, 'circle')"
      />
    </l-map>
  </div>
</template>

<script>
import { InfoControl, ReferenceChart, ChoroplethLayer } from 'vue-choropleth'

import geojson  from '../assets/data/map_vn.json'
import paraguay from '../assets/data/map_vn.json'
import pyDepartmentsData from '../assets/data/provinces.json'
import {LMap, LTileLayer, LPopup, LCircle} from 'vue2-leaflet';

export default {
  name: "app",
  components: { 
    LMap,
    LTileLayer,
    LPopup, LCircle,
    'l-info-control': InfoControl, 
    'l-reference-chart': ReferenceChart, 
    'l-choropleth-layer': ChoroplethLayer 
  },
  data() {

    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      pyDepartmentsData,
      paraguay,
      colorScale: ["fd7e14", "1a44db",  "f10f0f", "f10f0f"],
      value: {
        key: "case",
        metric: "Số người bị"
      },
      tileOptions: {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      },
      strokeColor: "fff",
      currentStrokeColor: 'cc0909',
      strokeWidth: 0.5, 
      currentStrokeWidth : 0.8,
      circle: {
        center: [10.667,106.875],
        radius: 4500,
        color: 'red'
      }
    }
  },

  methods: {
    openPopUp (latLng, caller) {
      console.log('hi');
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

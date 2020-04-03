<template>
  <div id="app">
    <l-map :center="center" :zoom="6" style="height: 500px;" @click="updateLatLng">
      <l-choropleth-layer :data="pyDepartmentsData" titleKey="name" idKey="id" :value="value" geojsonIdKey="id" :geojson="paraguay" 
        :colorScale="colorScale" 
        :strokeColor="strokeColor" 
        :currentStrokeColor="currentStrokeColor"
        :strokeWidth="strokeWidth"
        :currentStrokeWidth="currentStrokeWidth" @clickMap="clickLayer">
        <template slot-scope="props">
          <l-info-control :item="props.currentItem" :unit="props.unit" title="Số ca nhiễm"/>
          <l-marker :lat-lng="popupLatLng" :visible="false">
            <l-popup keepInView="true">hi</l-popup>
          </l-marker>
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
    <div class="card bg-light" v-if="checkedContent">
      <h5 class="card-title" v-html="checkedContent.feature.properties.province"></h5>
      <p class="card-text">Số ca nhiễm: {{checkedContent.feature.properties.case}}</p>
      <p class="card-text">Bệnh nhân thứ n đi từ anh đã bị cách ly tại</p>
    </div>
  </div>
</template>

<script>
import { InfoControl, ReferenceChart } from 'vue-choropleth'
import ChoroplethLayer from '../plugins/Choropleth'

import geojson  from '../assets/data/map_vn.json'
import paraguay from '../assets/data/map_vn.json'
//import pyDepartmentsData from '../assets/data/provinces.json'
import city from '../server/node/api/city'
import {LMap, LTileLayer, LPopup, LCircle, LMarker} from 'vue2-leaflet';

export default {
  name: "app",
  components: { 
    LMap,
    LTileLayer,
    LPopup, LCircle,
    LMarker,
    'l-info-control': InfoControl, 
    'l-reference-chart': ReferenceChart, 
    'l-choropleth-layer': ChoroplethLayer
  },
  data() {
    var pyDepartmentsData = city.GetData.getProvinces();
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      pyDepartmentsData,
      paraguay,
      colorScale: ["fd7e14", "f10f0f", "ffffff"],
      value: {
        key: "color",
        metric: " người bị"
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
      },
      checkedContent: null,
      center: [16.109,102.797]
    }
  },
  computed: {
    popupLatLng() {
      return this.center
    }
  },

  methods: {
    openPopUp (latLng, caller) {
      console.log('hi');
    },
    clickLayer(data) {
      this.checkedContent = data
      this.openPopUp(this.circle.center, 'circle')
    },
    updateLatLng(data) {
      this.center= [data.latlng.lat, data.latlng.lng]
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

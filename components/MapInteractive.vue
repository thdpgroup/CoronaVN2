<template>
  <div id="app" class="container">
    <l-map ref="mapRef" @ready="mapReady" :center="center" :zoom="6" style="height: 500px;" @click="updateLatLng">
      <l-choropleth-layer :data="provinces" titleKey="name" idKey="id" :value="value" geojsonIdKey="id" :geojson="map_vn" 
        :colorScale="colorScale" 
        :strokeColor="strokeColor" 
        :currentStrokeColor="currentStrokeColor"
        :strokeWidth="strokeWidth"
        :currentStrokeWidth="currentStrokeWidth" @clickMap="clickLayer">
        <template slot-scope="props">
          <l-info-control :item="props.currentItem" :unit="props.unit" title="Số ca nhiễm"/>
          <l-circle-marker
            ref="marker"
            :lat-lng="popupLatLng"
            :radius="markerOption.radius"
            :color="markerOption.color"
            :fillOpacity = "markerOption.opacity"
            :opacity = "markerOption.opacity"
            :weight = "markerOption.weight"
          >
            <l-popup ref="popup" keepInView="true"></l-popup> 
          </l-circle-marker>
        </template>
      </l-choropleth-layer>
      <l-tile-layer :url="url" :attribution="tileOptions.attribution" :noWrap="true"></l-tile-layer>

    </l-map>
    <div class="card p-3" v-if="checkedContent">
      <h2 class="card-title" v-html="checkedContent.name" v-if="checkedContent.name"></h2>
      <h3 v-if="String(checkedContent.new)&&String(checkedContent.recovered)&&checkedContent.date">Số ca nhiễm mới: {{checkedContent.new}}, bình phục: {{checkedContent.recovered}} (04/02/2020)</h3>
			<ul class="timeline mt-4" v-if="checkedContent.patients">
				<li v-for="patient in checkedContent.patients" :key="patient.id" :id="patient.id">
					<p v-html="patient.report" class="d-inline"></p>
          <a class="text-warning" :href="patient.url" :target="patient.isExternalLink&&'_blank'" v-if="patient.isSeeMore">Xem thêm</a>
          
				</li>
			</ul>
    </div>
  </div>
</template>

<script>
import { InfoControl, ReferenceChart } from 'vue-choropleth'
import ChoroplethLayer from '../plugins/Choropleth'

import map_vn from '../assets/data/map_vn.json'
import provinces from '../assets/data/provinces.json'
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

    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      provinces,
      map_vn,
      colorScale: ["fd7e14", "f10f0f", "ffffff"],
      value: {
        key: "case",
        keyColor: "color",
        metric: " người bị"
      },
      tileOptions: {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      },
      strokeColor: "fff",
      currentStrokeColor: 'cc0909',
      strokeWidth: 0.5, 
      currentStrokeWidth : 0.8,
      markerOption: {
        radius: 0.1,
        opacity: 0.5,
        color	: '#007bff',
        weight: 1
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
    mapReady(data) {
      this.$refs.marker.setVisible(false);
    },
    openPopUp (latLng, caller) {
      const totalCase = `Tổng số ca: <span class="text-danger font-weight-bold">${this.checkedContent.case||''}</span>`

      const revoceredCase = `,số ca hồi phục: <span class="text-warning font-weight-bold">${this.checkedContent.recovered||''}</span>`

      const deadCase = this.checkedContent.death?`,chết: <span class="text-info font-weight-bold">${this.checkedContent.death}</span>`:''

      this.$refs.marker.setVisible(true);
      this.$refs.popup.setContent(`${totalCase} ${revoceredCase} ${deadCase}`);
      this.$refs.marker.mapObject.openPopup();
    },
    clickLayer(data) {
      this.checkedContent = provinces.find(province => province.id == data.feature.properties.id)
      this.openPopUp(this.center, 'circle')
    },
    updateLatLng(data) {
      this.center = [data.latlng.lat, data.latlng.lng]
    }
  }

}
</script>
<style>
@import "../node_modules/leaflet/dist/leaflet.css";
.timeline {
    list-style-type: none;
    position: relative;
}
.timeline:before {
    content: ' ';
    background: #d4d9df;
    display: inline-block;
    position: absolute;
    left: 29px;
    width: 2px;
    height: 100%;
    z-index: 400;
}
.timeline > li {
    margin: 20px 0;
    padding-left: 20px;
}
.timeline > li:before {
    content: ' ';
    background: white;
    display: inline-block;
    position: absolute;
    border-radius: 50%;
    border: 3px solid #22c0e8;
    left: 20px;
    width: 20px;
    height: 20px;
    z-index: 400;
}
</style>

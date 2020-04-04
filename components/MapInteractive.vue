<template>
  <div id="app" class="container">
    <l-map ref="mapRef" @ready="mapReady" :center="center" :zoom="zoomSize" style="height: 500px;" @click="updateLatLng" @update:zoom="zoomMap">
      <l-choropleth-layer :data="provinces" titleKey="name" idKey="id" :value="value" geojsonIdKey="id" :geojson="map_vn" 
        :colorScale="colorScale" 
        :strokeColor="strokeColor" 
        :currentStrokeColor="currentStrokeColor"
        :strokeWidth="strokeWidth"
        :currentStrokeWidth="currentStrokeWidth" @clickMap="clickLayer">
        <template slot-scope="props">
          <l-info-control :item="props.currentItem" :unit="props.unit" title="Số ca nhiễm"/>
          
        </template>
      </l-choropleth-layer>
      <l-tile-layer :url="url" :attribution="tileOptions.attribution" :noWrap="true"></l-tile-layer>
      <template v-for="province in provinces" >
        <l-marker  v-if="province.markerLocation.length > 0"
        :lat-lng="province.markerLocation" :key="province.id">
          <l-icon class="map--icon">
            <p class="map--icon-text font-weight-bold" v-show="zoomSize>6">{{ province.case }}</p>
          </l-icon>
        </l-marker>
      </template>

    </l-map>
    <div class="card p-3 bg-dark province" v-if="currentProvince">
      <h2 class="card-title" v-html="currentProvince.name" v-if="currentProvince.name"></h2>
      <h3 v-if="String(currentProvince.new)&&String(currentProvince.recovered)&&currentProvince.date">Số ca nhiễm mới: {{currentProvince.new}}, bình phục: {{checkedContent.recovered}} (04/02/2020)</h3>
			<ul class="timeline mt-4" v-if="currentTimeline">
				<li v-for="timeline in currentTimeline.patients" :key="timeline.id" :id="timeline.id" class="timeline--item">
					<p v-html="timeline.report" class="d-inline"></p>
          <a class="text-warning" :href="timeline.url" :target="timeline.isExternalLink&&'_blank'" v-if="timeline.isSeeMore">Xem thêm</a>
				</li>
			</ul>
    </div>
  </div>
</template>

<script>
import { InfoControl, ReferenceChart } from 'vue-choropleth'
import ChoroplethLayer from '../plugins/Choropleth'

import map_vn from '../assets/data/map_vn.json'
import timelineStore from '../assets/data/patients.json'
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
      timelineStore: null,
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
        radius: 55,
        opacity: 0.5,
        color	: '#007bff',
        weight: 0.4
      },
      currentProvince: null,
      currentTimeline: null,
      center: [16.109,102.797],
      zoomSize: 5
    }
  },
  computed: {
    popupLatLng() {
      return this.center
    }
  },

  methods: {
    mapReady(data) {
      //this.$refs.marker.setVisible(false);
    },
    openPopUp (latLng, caller) {
      const totalCase = `Tổng số ca: <span class="text-danger font-weight-bold">${this.currentProvince.case||''}</span>`

      const revoceredCase = `, số ca hồi phục: <span class="text-warning font-weight-bold">${this.currentProvince.recovered||''}</span>`

      const deadCase = this.currentProvince.death?`, chết: <span class="text-info font-weight-bold">${this.currentProvince.death}</span>`:''

      // this.$refs.marker.setVisible(true);
      // this.$refs.popup.setContent(`${totalCase} ${revoceredCase} ${deadCase}`);
      // this.$refs.marker.mapObject.openPopup();
    },
    clickLayer(data) {

      this.currentProvince = provinces.find(province => province.id == data.feature.properties.id);
      this.currentTimeline = timelineStore.find(patient => patient.id == data.feature.properties.id);
      this.openPopUp(this.center, 'circle')
    },
    updateLatLng(data) {
      this.center = [data.latlng.lat, data.latlng.lng]
    },
    zoomMap(zoomSize) {
      this.zoomSize = zoomSize
    }
  }

}
</script>
<style>
@import "../node_modules/leaflet/dist/leaflet.css";
.province {
  margin-top: 50px;
  box-shadow: 0 5px 10px 4px rgba(253, 200, 10, .4);
  color: #fff;
}
.map {
  box-shadow: 0 5px 10px 4px rgba(253, 200, 10, .4)
}
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
    margin: 20px 0 20px 20px;
}
.timeline > li:before {
    content: ' ';
    background: white;
    display: inline-block;
    position: absolute;
    border-radius: 50%;
    border: 3px solid #22c0e8;
    left: -40px;
    width: 20px;
    height: 20px;
    z-index: 400;
}
.timeline > li:after {
    content: ' ';
    display: inline-block;
    position: absolute;
    border-left: 10px solid #333232;
    border-top: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #333232;
    top: 12px;
    left: -10px;
    transform: rotate(45deg);
    width: 20px;
    height: 20px;
    z-index: 400;
}
.timeline--item {
  background: #333232;
  padding: 10px;
  position: relative;
}
.timeline--date {
  font-size: 20px;
  padding: 5px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(255, 255, 255, .5);
}
.map--icon-text {
  font-size: 14px;
  text-shadow: 0 0 10px #ffee06, 0 0 10px #48ff00;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

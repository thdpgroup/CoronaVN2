<template>
  <div id="app" class="container">
    
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: "app",
  components: { 
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState(['provinces']),
    popupLatLng() {
      return this.center
    },
    popupContent() {
      return this.currentProvince && `Tổng số ca: <span class="text-danger font-weight-bold">${this.currentProvince.case||''}</span>, hồi phục: <span class="text-info font-weight-bold">${this.currentProvince.recovered||''}</span> chết: <span class="text-warning font-weight-bold">${this.currentProvince.death}</span>`
    }
  },
  methods: {
    ...mapActions(['fetchTemplates']),
    mapReady(data) {
      this.zoomControl.zoomSizeDefault = this.zoomSize;
    },
    clickLayer(data) {
      this.currentProvince = this.provinces.find(province => Number(province.id, 10) == Number(data.feature.properties.id, 10));
      this.currentTimeline = timelineStore.filter(patient => (Number(patient.cityId, 10) == Number(data.feature.properties.id, 10) || patient.cityId == -1));
    },
    zoomMap(zoomSize) {
      this.zoomSize = zoomSize
    },
    markerChanged(id) {
      this.currentProvince = this.provinces.find(province => Number(province.id, 10) === Number(id, 10))
      this.currentTimeline = timelineStore.find(patient => Number(patient.cityId, 10) === Number(id, 10) || patient.cityId == -1 )
    },
    switchNSHandler(){
      this.zoomSize = this.zoomControl.zoomSizeDefault;
      this.zoomControl.isNorth = !this.zoomControl.isNorth;
      this.zoomControl.buttonCaption = this.zoomControl.isNorth ? "Miền Nam" : "Miền Bắc";
      this.center = this.zoomControl.isNorth ?  this.zoomControl.centerAtNorth :  this.zoomControl.centerAtSouth;
    }
  },
  mounted() {
    this.fetchTemplates()
  }

}
</script>
<style>
.province {
  margin-top: 50px;
  box-shadow: 0 3px 6px 2px #17a2b8;
  color: #fff;
}
.map {
  box-shadow: 0 3px 6px 2px #17a2b8;
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
    left: 0;
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
    left: -10px;
    width: 20px;
    height: 20px;
    z-index: 400;
}
.timeline--date {
  font-size: 18px;
  font-weight: 700;
}
.map--icon-text {
  font-size: 14px;
  text-shadow: 0 0 10px #ffee06, 0 0 10px #48ff00;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes fade { 
  from { opacity: 0.5; } 
}

.map--icon-text:hover {
  animation: fade 1s infinite alternate;
}
</style>

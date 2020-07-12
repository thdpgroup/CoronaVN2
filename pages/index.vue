<template>
  <div>
    <map-interactive />

      <div>

      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {LMap, LTileLayer} from 'vue2-leaflet';
import MapInteractive from '~/components/MapInteractive.vue'

export default Vue.extend({
  components: {
    MapInteractive,
    LMap, 
    LTileLayer
  }
})
</script>

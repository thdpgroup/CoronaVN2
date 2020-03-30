<template>
  <div class="container">
    <div>
      <map-interactive />
      <h1 class="title">
        CoronaVN2
      </h1>
      <h2 class="subtitle">
        Interactive Vietnam Map
      </h2>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MapInteractive from '~/components/MapInteractive.vue'

export default Vue.extend({
  components: {
    MapInteractive
  }
})
</script>

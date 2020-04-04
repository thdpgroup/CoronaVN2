<template>
  <div id="app" class="container background-color">
    <div>
      <v-data-table
        class="elevation-1"
        :items="Details"
        :headers="DetailHeader"
        item-key="ReInvoicingId"
        sort-by= "case"
        sort-desc= true
        multi-sort= true
        items-per-page=-1
      >
      </v-data-table>
    </div>
  </div>
</template>

<script>
import provinces from '../assets/data/provinces.json'

export default {
  data() {
    return {
      Details: [],
      DetailHeader: [
        {
          text: 'id',
          value: 'id'
        },
        {
          text: 'name',
          value: 'name'
        },
        {
          text: 'case',
          value: 'case'
        },
        {
          text: 'recovered',
          value: 'recovered'
        },
        {
          text: 'death',
          value: 'death'
        },
        {
          text: 'new',
          value: 'new'
        },
        {
          text: 'color',
          value: 'color'
        },
        {
          text: 'markerLocation',
          value: 'markerLocation'
        }
      ]
    }
  },
  mounted() {
    this.Details = provinces
  }
}
</script>

<style scoped>
.background-color {
  background-color: aliceblue;
}
</style>

<template>
  <v-app>
    <div id="app" class="container background-color">
      <div style="padding-bottom:10px">
        Total : {{ totalCase }} - Recovered : {{ totalRecovered }} - death :
        {{ totalDeath }}
      </div>
      <div>
        <v-data-table
          class="elevation-1"
          :items="Details"
          :headers="DetailHeader"
          sort-by="case"
          sort-desc="true"
          items-per-page="-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ editedItem.name }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.name"
                            label="name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.case"
                            label="case"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.recovered"
                            label="recovered"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.death"
                            label="death"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.new"
                            label="new"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.color"
                            label="color"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
      </div>
    </div>
  </v-app>
</template>

<script>
import provinces from '../assets/data/provinces.json'

export default {
  data() {
    return {
      Details: [],
      totalCase: 0,
      totalRecovered: 0,
      totalDeath: 0,
      dialog: false,
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
        },
        { text: 'Actions', value: 'actions' }
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        name: '',
        case: '',
        recovered: '',
        death: '',
        new: '',
        color: '',
        markerLocation: []
      },
      defaultItem: {
        id: '',
        name: '',
        case: '',
        recovered: '',
        death: '',
        new: '',
        color: '',
        markerLocation: []
      }
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    }
  },
  mounted() {
    this.Details = provinces
    this.totalCase = this.sum(this.Details, 'case')
    this.totalRecovered = this.sum(this.Details, 'recovered')
    this.totalDeath = this.sum(this.Details, 'death')
  },
  methods: {
    sum(items, prop) {
      return items.reduce(function(a, b) {
        return a + parseInt(b[prop])
      }, 0)
    },
    editItem(item) {
      this.dialog = false
      this.editedIndex = this.Details.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.Details[this.editedIndex], this.editedItem)
      } else {
        this.Details.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style scoped>
.background-color {
  background-color: aliceblue;
}
</style>

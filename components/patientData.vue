<template>
  <v-app>
    <div id="app" class="container background-color">
      
      <div style="padding-bottom:10px">
      
      </div>
      <div>
        <v-data-table
          class="elevation-1"
          :items="Details"
          :headers="DetailHeader"
          sort-by="id"
          sort-desc="true"
          items-per-page="-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-dialog v-model="dialog" max-width="700px">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ editedItem.id }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.id"
                            label="id"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.tag"
                            label="tag"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.date"
                            label="date"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.cityId"
                            label="cityId"
                          ></v-text-field>
                        </v-col>
                        <v-col sm="12">
                          <v-textarea
                            v-model="editedItem.report"
                            label="report"
                          ></v-textarea>
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

import patientService from "@/store/patients-service.js"

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
          text: 'tag',
          value: 'tag'
        },
        {
          text: 'date',
          value: 'date'
        },
        {
          text: 'cityId',
          value: 'cityId'
        },
        {
          text: 'report',
          value: 'report'
        },
       
        { text: 'Actions', value: 'actions' }
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        tag: '',
        date: '',
        cityId: '',
        report: ''       
      },
      defaultItem: {
       id: '',
        tag: '',
        date: '',
        cityId: '',
        report: ''  
      }
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    }
  },
  mounted() {
    this.getData()       
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
      patientService.writeFile(this.Details)
      this.count()
      this.close()
    },
    getData() {
      var that = this;
      patientService.getPatients()
      .then(function(response){
        that.Details = response.data.data   
        
      })
    }
  }
}
</script>

<style scoped>
.background-color {
  background-color: aliceblue;
}
</style>

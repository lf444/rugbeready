<template>
  <div>
    <v-expansion-panel-header>Blessures</v-expansion-panel-header>
    <v-expansion-panel-content style="justify-content: center">
      <!-- tableau blessures -->
      <v-simple-table
        dark
        style="
          background-color: grey;
          margin-top: 15px;
          margin-bottom: 30px;
          border-radius: 4px !important;
        "
      >
        <thead style="background: #2196f3">
          <tr>
            <th style="color: #fff; font-size: 15px" class="text-center">
              Date
            </th>
            <th style="color: #fff; font-size: 15px" class="text-center">
              Durée (jours)
            </th>
            <th style="color: #fff; font-size: 15px" class="text-center">
              Type
            </th>
            <th style="color: #fff; font-size: 15px" class="text-center">
              Contexte
            </th>
          </tr>
        </thead>

        <tbody class="text-center">
          <tr v-for="blessure in blessures" v-bind:key="blessure.idJoueur">
            <td>{{ blessure.dateBlessure }}</td>
            <td>{{ blessure.tempsRepos }}</td>
            <td>{{ blessure.typeBlessure }}</td>
            <td>{{ blessure.contextBlessure }}</td>
          </tr>
        </tbody>
      </v-simple-table>

      <!-- ajout blessure -->
      <v-row justify="center" style="margin-bottom: 4px">
        <v-dialog v-model="dialog"  max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              style="border-radius: 4px !important"
              >Nouvelle blessure</v-btn
            >
          </template>
          <v-card style="margin: 0px !important">
            <v-card-title>
              <span class="headline">Nouvelle blessure</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="dateBlessure"
                      type="date"
                      label="Date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      @keypress="isNumber($event)"
                      label="Durée (jours)"
                      v-model="tempsRepos"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field label="Type" v-model="typeBlessure"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field  label="Contexte" v-model="contextBlessure"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <v-btn color="blue darken-1" text @click="this.dialog = false;">Fermer</v-btn> -->
              <v-btn color="blue darken-1" text @click="addBlessure()"
                >Ajouter</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-expansion-panel-content>
  </div>
</template>
<script>
const axios = require("axios");
export default {
  name: "ProfilBlessure",
  data: () => ({
    dialog: false,
    blessures: [],
    tempsRepos: "",
    dateBlessure:  new Date().toISOString().substr(0, 10),
    typeBlessure: "",
    contextBlessure: "",
  }),

  methods: {
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    getBlessuresJoueur() {
      axios
        .get(`http://api.rugbeready.fr:3000/blessures/${this.$route.params.idJoueur}`)
        .then((response) => {
          console.log(response.data)
          this.blessures = response.data;
          this.blessures.forEach((element) => {
            var j = element.dateBlessure.substring(8,10)
            var m = element.dateBlessure.substring(5,7)
            var a = element.dateBlessure.substring(0,4)
            element.dateBlessure = j + "/" + m + "/" + a
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    addBlessure() {
      if (
       this.tempsRepos != "" &&
       this.typeBlessure != "" &&
       this.typeBlessure != ""
      ) {
        axios
          .post(`http://api.rugbeready.fr:3000/blessures/${this.$route.params.idJoueur}`, {
            idJoueur: this.$route.params.idJoueur,
            dateBlessure: this.dateBlessure,
            tempsRepos: this.tempsRepos,
            typeBlessure:this.typeBlessure,
            contextBlessure: this.contextBlessure,
          })
          .then(function (error) {
            console.log(error);
          });
        setTimeout(() => {
          this.dialog = false;
          this.dateBlessure = new Date().toISOString().substr(0, 10)
          this.tempsRepos = ''
          this.typeBlessure = ''
          this.contextBlessure = ''
          this.getBlessuresJoueur();
        }, 100);

         axios
          .put(`http://api.rugbeready.fr:3000/blessures/${this.$route.params.idJoueur}`, {
            dateBlessure:this.dateBlessure,
            tempsRepos: this.tempsRepos,
          })
          .then(function (error) {
            console.log(error);
          });
      }
    },
  },

  created() {
    this.getBlessuresJoueur();
  },
};
</script>

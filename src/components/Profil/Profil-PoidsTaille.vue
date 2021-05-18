<template>
  <div>
    <v-expansion-panel>
      <v-expansion-panel-header @click="drawEvolutionTaillePoids()"
        >Taille & Poids</v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-row justify="center" style="margin-top: 40px; margin-bottom: 30px">
          <v-card
            style="margin-top: 20px; width: 50%; box-shadow: none; border: none"
          >
            <canvas id="chartTaillePoids" width="400" height=""></canvas>
          </v-card>
        </v-row>

        <v-row
          justify="center"
          style="
            padding-bottom: 30px;
            margin-left: 10px !important;
            padding-top: 10px !important;
          "
        >
          <v-dialog v-model="dialog1" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                style="border-radius: 4px !important"
                >Nouveau relevé</v-btn
              >
            </template>
            <v-card style="margin: 0px !important">
              <v-card-title>
                <span class="headline">Nouveau relevé</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Poids (kg)"
                        v-model="poids"
                        @keypress="isNumber($event)"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Taille (cm)"
                        v-model="taille"
                        @keypress="isNumber($event)"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog1 = false"
                  >Fermer</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="updateTaillePoidsJoueur()"
                  >Mettre à jour</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>
<script>

const Chart = require("chart.js");
const axios = require("axios");
export default {
  name: "ProfilTaillePoids",

  data: () => ({
    chartTaillePoids: "",
    dialog1: false,
    dateTaillePoids: new Date().toISOString().substr(0, 10),
    taille: "",
    poids: "",
    panel: [0],
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

    getTaillePoidsJoueur() {
      axios
        .get(`http://api.rugbeready.fr:3000/tp/${this.$route.query.idJoueur}/one`)
        .then((response) => {
          this.i
          this.dateTaillePoids = response.data.dateTaillePoids,
          this.taille =  response.data.taille;
          this.poids =  response.data.poids;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    drawEvolutionTaillePoids(){    
      axios
        .get(`http://api.rugbeready.fr:3000/tp/${this.$route.query.idJoueur}/all`)
        .then((response) => {

          var chartPoids = response.data.map((item) => item.poids);
          var chartTaille = response.data.map((item) => item.taille);
          var chartlabel = response.data.map((item) => item.dateTaillePoids.substring(0,10));

        /*   for (let index = 0; index < chartlabel.length; index++) {
            var j = chartlabel[index].substring(8)
            var m = chartlabel[index].substring(5,7)
            var a = chartlabel[index].substring(0,4)
            chartlabel[index] = j + "/" + m + "/" + a
          } */

          const ctx = document.getElementById("chartTaillePoids").getContext("2d");
          this.chartTaillePoids = new Chart(ctx, {
            type: "line",
            data: {
              labels: chartlabel,
              datasets: [
                {
                  label: "Poids (kg)",
                  fill: false,
                  data: chartPoids,
                  backgroundColor: 'red',
                  borderColor: 'red',
                },
                {
                  label: "Taille (cm)",
                  fill: false,
                  data: chartTaille,
                  backgroundColor : 'green',
                  borderColor: 'green',
                },
              ],
            },
            options: {
              responsive:true,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
              tooltips:{
                displayColors: false,
              }
            },
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    updateTaillePoidsJoueur() {
      axios
        .post(`http://api.rugbeready.fr:3000/tp/${this.$route.query.idJoueur}/`, {
          idJoueur: this.$route.query.idJoueur, 
          dateTaillePoids: new Date().toISOString().substr(0, 10),
          poids: this.poids,
          taille: this.taille,
        })
        .then(function (error) {
          console.log(error);
        });

      setTimeout(() => {
        this.dialog2 = false;
        this.drawEvolutionTaillePoids();
      }, 100);

    },
  },

  created() {
    this.getTaillePoidsJoueur();
  },


};
</script>

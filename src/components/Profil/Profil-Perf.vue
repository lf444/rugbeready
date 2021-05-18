<template>
  <div>
          <v-expansion-panel-header @click="drawEvolutionPerf()">Performances</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row justify="center" style="margin-top:40px;margin-bottom:30px">
              <v-card style="margin-top:20px;width:50%;box-shadow:none;border:none">
                <canvas  id="chartPerf" width="400" height=""></canvas>
              </v-card>
            </v-row>
            <v-row justify="center" style="padding-bottom:30px; padding-top:10px !important;">
              <v-dialog v-model="dialog2" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on" style="border-radius:4px !important">Nouveau relevé</v-btn>
                </template>
                <v-card style="margin:0px !important">
                  <v-card-title>
                    <span class="headline">Modifier</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="4">
                          <v-text-field label="Squat (kg)" v-model="squat" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-text-field  label="Développé couché (kg)" v-model="dcouche" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-text-field  label="Tirage (kg)" v-model="tirage" required></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field  label="Détente verticale" v-model="detenteVerticale" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field type="time" label="Temps sprint" v-model="tempsSprint" required></v-text-field>
                        </v-col>
                      </v-row> 
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog2 = false">Fermer</v-btn>
                    <v-btn color="blue darken-1" text @click="updatePerfJoueur()">Mettre à jour</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </v-expansion-panel-content>
  </div>
  
</template>

<script>
const Chart = require("chart.js");
const axios = require("axios");
export default {
  name: "ProfilPerf",
  data: () => ({
    chartPerf :"",
    dialog2: false,
    datePerf:new Date().toISOString().substr(0, 10),
    squat: "",
    dcouche: "",
    tirage: "",
    detenteVerticale: "",
    tempsSprint: "",
    panel: [0]
  }),

  methods: {

    getPerfsJoueurs() {
      axios.get(`http://api.rugbeready.fr:3000/perfomances/${this.$route.query.idJoueur}/one`)
      .then((response) => {
        this.squat =  response.data.squat
        this.dcouche =  response.data.dcouche
        this.tirage =  response.data.tirage
        this.detenteVerticale =  response.data.detenteVerticale
        this.tempsSprint =  response.data.tempsSprint
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    drawEvolutionPerf() {
      axios
        .get(`http://api.rugbeready.fr:3000/perfomances/${this.$route.query.idJoueur}/all`)
        .then((response) => {
          var chartSquat   = response.data.map((item) => item.squat);
          var chartDcouche = response.data.map((item) => item.dcouche);
          var chartTirage  = response.data.map((item) => item.tirage);
          var chartlabel = response.data.map((item) => item.datePerf.substring(0,10));
        /*    for (let index = 0; index < chartlabel.length; index++) {
            var j = chartlabel[index].substring(8)
            var m = chartlabel[index].substring(5,7)
            var a = chartlabel[index].substring(0,4)
            chartlabel[index] = j + "/" + m + "/" + a
          } */

          const ctx = document.getElementById("chartPerf").getContext("2d");
          this.chartPerf = new Chart(ctx, {
            type: "line",
            data: {
              labels: chartlabel,
              datasets: [
                {
                  label: "Squat (kg)",
                  fill: false,
                  data: chartSquat,
                  backgroundColor: 'red',
                  borderColor: 'red'
                },
                {
                  label: "Développé couché (kg)",
                  fill: false,
                  data: chartDcouche,
                  backgroundColor: 'green',
                  borderColor: 'green'
                },

                {
                  label: "Tirage (kg)",
                  fill: false,
                  data: chartTirage,
                  backgroundColor: 'blue',
                  borderColor: 'blue'
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

    updatePerfJoueur() {
      axios.post(`http://api.rugbeready.fr:3000/perfomances/${this.$route.query.idJoueur}/`, {
        idJoueur: this.$route.query.idJoueur,
        datePerf: this.datePerf,
        squat: this.squat,
        dcouche: this.dcouche,
        tirage: this.tirage,
        detenteVerticale: this.detenteVerticale,
        tempsSprint: this.tempsSprint,
      })
      .then(function (error) {
        console.log(error);
      });

      setTimeout(() => {
        this.drawEvolutionPerf();
        this.dialog2 = false;
      }, 100);
    },
    
  },

  created() {
    this.getPerfsJoueurs();
  },
};
</script>


     
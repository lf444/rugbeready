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
                          <v-text-field label="Squat" v-model="squat" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-text-field  label="DCouché" v-model="dcouche" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-text-field  label="Tirage" v-model="tirage" required></v-text-field>
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
    datePerf:"",
    squat: "",
    dcouche: "",
    tirage: "",
    detenteVerticale: "",
    tempsSprint: "",
    panel: [0]
  }),

  methods: {

    Close(){
      this.dialog2=false;
    },

    getPerfsJoueurs() {
      axios.post("../../../reqJoueur.php", {
        idJoueur: this.$route.query.idJoueur,
        request: 5
      })
      .then((response) => {
        var tab = response.data[0];
        this.squat = tab.squat
        this.dcouche = tab.dcouche
        this.tirage = tab.tirage
        this.detenteVerticale = tab.detenteVerticale
        this.tempsSprint = tab.tempsSprint
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    drawEvolutionPerf() {
      axios
        .post("../../../reqHistorique.php", {
          idJoueur: this.$route.query.idJoueur,
          request: 1,
        })
        .then((response) => {
          const responData = response.data;

          var chartSquat   = responData.map((item) => item.squat);
          var chartDcouche = responData.map((item) => item.dcouche);
          var chartTirage  = responData.map((item) => item.tirage);
          var chartlabel = responData.map((item) => item.datePerf);
          for (let index = 0; index < chartlabel.length; index++) {
            var j = chartlabel[index].substring(8)
            var m = chartlabel[index].substring(5,7)
            var a = chartlabel[index].substring(0,4)
            chartlabel[index] = j + "/" + m + "/" + a
          }

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

      axios.post("../../../reqJoueur.php", {
        request: 2,
        idJoueur: this.$route.query.idJoueur,
        datePerf: "",
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


     
<template>
  <div>

    <!-- <v-row justify="center" style="margin-top:60px;">
      <v-card id="banniere" style="display:flex;flex-direction:column;justify-content:center">

        <p style="font-size:35px;font-weight:700;color:black;margin-bottom:0">{{prenom}} {{nom}}</p>
        <p style="font-size:27px;font-weight:500;color:black;margin-bottom:0">{{poste}}</p>
      </v-card>
    </v-row> -->
      

    <v-row justify="center" style="margin-top:60px;margin-bottom:100px;">

      <v-expansion-panels v-model="panel" multiple focusable style="width:90%">

        <v-expansion-panel>
          <v-expansion-panel-header>Informations générales</v-expansion-panel-header>
          <v-expansion-panel-content>

            <v-row style="margin-top:40px;margin-bottom:30px">
              <v-card class="d-flex flex-column col-10" style="font-size:15px;box-shadow:none;border:none;padding-left:35px">
                <span style="margin-bottom:5px;text-align:start">Prénom : {{prenom}}</span>
                <span style="margin-bottom:5px;text-align:start">Nom : {{nom}}</span>
                <span style="margin-bottom:5px;text-align:start">Age : {{age}} ans</span>
                <span style="margin-bottom:7px;text-align:start">Poste : {{poste}}</span>
                <span style="margin-bottom:5px;text-align:start">Email : {{email}}</span>
                <span style="margin-bottom:5px;text-align:start">Tél : {{telephone}}</span>
              </v-card>
            </v-row>
            
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header @click="drawEvolutionTaillePoids()">Taille & Poids</v-expansion-panel-header>
          <v-expansion-panel-content>

            <v-row justify="center" style="margin-top:40px;margin-bottom:30px">
              <v-card style="margin-top:20px;width:50%;box-shadow:none;border:none">
                <canvas id="chartTaillePoids" width="400" height=""></canvas>
              </v-card>
            </v-row>

            <v-row justify="center" style="padding-bottom:30px;margin-left:10px !important;padding-top:10px !important;">
              <v-dialog v-model="dialog1" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on" style="border-radius:4px !important">Nouveau relevé</v-btn>
                </template>
                <v-card style="margin:0px !important">
                  <v-card-title>
                    <span class="headline">Nouveau relevé</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>

                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field label="Poids (kg)" v-model="poids" @keypress="isNumber($event)" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field label="Taille (cm)" v-model="taille" @keypress="isNumber($event)" required></v-text-field>
                        </v-col>
                      </v-row>

                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog1 = false">Fermer</v-btn>
                        <v-btn color="blue darken-1" text @click="updateTaillePoidsJoueur()">Mettre à jour</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
            
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header >Blessures</v-expansion-panel-header>
          <v-expansion-panel-content style="justify-content:center;">

            <!-- tableau blessures -->
            <v-simple-table dark style="background-color: grey; margin-top:15px;margin-bottom:30px;border-radius:4px !important;">
              <thead style="background:#2196f3">
                <tr>
                  <th style="color:#fff;font-size:15px" class="text-center">Date</th>
                  <th style="color:#fff;font-size:15px" class="text-center">Durée</th>
                  <th style="color:#fff;font-size:15px" class="text-center">Type</th>
                  <th style="color:#fff;font-size:15px" class="text-center">Contexte</th>
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
            <v-row justify="center" style="margin-bottom:4px;">
              <v-dialog v-model="dialog3" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on" style="border-radius:4px !important">Déclarer une nouvelle blessure</v-btn>
                </template>
                <v-card style="margin:0px !important">
                  <v-card-title>
                    <span class="headline">Déclarer une nouvelle blessure</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="dateDuJour" type="date" id="dateBlessure" label="Date" ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field id="duree" @keypress="isNumber($event)" label="Durée (jours)"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field id="type" label="Type"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field id="context" label="Contexte"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog3 = false">Fermer</v-btn>
                        <v-btn color="blue darken-1" text @click="addBlessure()">Ajouter</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>

          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header @click="drawEvolutionPerf()">Performances</v-expansion-panel-header>
          <v-expansion-panel-content>

            <v-row justify="center" style="margin-top:40px;margin-bottom:30px">
              <v-card style="margin-top:20px;width:50%;box-shadow:none;border:none">
                <canvas id="chartPerf" width="400" height=""></canvas>
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
                          <v-text-field id="valeurPerfSquat" label="Squat" v-model="squat" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-text-field id="valeurPerfDcouche" label="DCouché" v-model="dcouche" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-text-field id="valeurPerfTirage" label="Tirage" v-model="tirage" required></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field id="valeurPerfDetente" label="Détente verticale" v-model="detenteVerticale" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field type="time" id="valeurPerfSprint" label="Temps sprint" v-model="tempsSprint" required></v-text-field>
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
        </v-expansion-panel>

      </v-expansion-panels>

    </v-row>

  </div>
  
</template>

<style>
  #liste_blessure{
    margin: 60px 7vh !important;
  }

  #banniere{
    height: 330px;
    width: 90%;
    background-image: url("https://api.www.ffr.fr/wp-content/uploads/2020/04/Sans-titre-1-1.jpg");
    background-size: cover;
    background-position: 0px -162px;
  }

  .v-tab {
    padding-bottom: 10px !important;
  }
</style>

<script>

const Chart = require("chart.js");
const axios = require("axios");
export default {
  name: "ProfileJoueur",
  data: () => ({
    chartPerf :"",
    chartTaillePoids : "",
    dialog1: false,
    dialog2: false,
    dialog3: false,
    nom:"",
    prenom:"",
    poste:"",
    age:"",
    email:"",
    telephone:"",
    idEquipe: "",
    taille: "",
    poids: "",
    blessures: [],
    tempsRepos: "",
    dateBlessure: "",
    typeBlessure: "",
    contextBlessure: "",
    datePerf:"",
    squat: "",
    dcouche: "",
    tirage: "",
    detenteVerticale: "",
    tempsSprint: "",
    postes: [
      "Pilliers","Talonneur","Deuxième ligne","Troisième ligne",
      "Demi de mêlée","Demi d'ouverture","Trois-quarts","Ailier","Arrière",
    ],
    dateDuJour: new Date().toISOString().substr(0, 10),
    panel: [0]
  }),

  methods: {

    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    

    getIdentiteJoueur() {
      axios.post("../../reqJoueur.php", {
        request:0,
        idJoueur: this.$route.query.idJoueur,
      })
      .then((response) => {
        var tab = response.data[0];
        this.nom = tab.nom
        this.prenom = tab.prenom
        this.poste = tab.poste
        this.age = new Date(new Date() - new Date(tab.dateNaissance)).getFullYear() - 1970;
        this.email = tab.email
        this.telephone = tab.telephone
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    getTaillePoidsJoueur() {
      axios.post("../../reqJoueur.php", {
        request: 1,
        idJoueur: this.$route.query.idJoueur
      })
      .then((response) => {
        var tab = response.data[0];
        this.taille = tab.taille
        this.poids = tab.poids
      })
      .catch(function (error) {
        console.log(error);
      });
    },


    getBlessuresJoueur() {
      axios.post("../../reqJoueur.php", {
        idJoueur: this.$route.query.idJoueur,
        request: 4
      })
      .then((response) => {
        this.blessures = response.data;
        this.blessures.forEach(element => {
          var j = element.dateBlessure.substring(8)
          var m = element.dateBlessure.substring(5,7)
          var a = element.dateBlessure.substring(0,4)
          element.dateBlessure = j + "/" + m + "/" + a
        });

      })
      .catch(function (error) {
        console.log(error);
      });
    },

    getPerfsJoueurs() {
      axios.post("../../reqJoueur.php", {
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

    updateTaillePoidsJoueur() {

      axios.post("../../reqJoueur.php", {
        request:3,
        idJoueur: this.$route.query.idJoueur,
        poids:  this.poids,
        taille: this.taille,
      })
      .then(function (error) {
        console.log(error);
      });

      setTimeout(() => {
        this.dialog1 = false;
        this.drawEvolutionTaillePoids();
      }, 100);

    },


    

    
    addBlessure() {
      if(document.getElementById("duree").value != "" && document.getElementById("type").value != "" && document.getElementById("context").value != ""){

        axios.post("../../reqJoueur.php", {
          request:6,
          idJoueur: this.$route.query.idJoueur,
          dateBlessure:    document.getElementById("dateBlessure").value,
          tempsRepos:    document.getElementById("duree").value,
          typeBlessure:  document.getElementById("type").value,
          contextBlessure:  document.getElementById("context").value,
        })
        .then(function (error) {
          console.log(error);
        });

        setTimeout(() => {
          this.dialog3 = false;
          this.getBlessuresJoueur();
        }, 100);

        axios.post("../../reqJoueur.php", {
          request:7,
          idJoueur: this.$route.query.idJoueur,
          dateBlessure:    document.getElementById("dateBlessure").value,
          tempsRepos:    document.getElementById("duree").value,
        })
        .then(function (error) {
          console.log(error);
        });

      }
    },

    
    updatePerfJoueur() {

      axios.post("../../reqJoueur.php", {
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


    drawEvolutionTaillePoids(){
      
      axios
        .post("../../reqHistorique",{
          idJoueur: this.$route.query.idJoueur,
          request: 0
        })
        .then((response) => {
          const responData = response.data;
          //console.log(responData);

          var chartPoids = responData.map((item) => item.poids);
          var chartTaille = responData.map((item) => item.taille);
          var chartlabel = responData.map((item) => item.dateTaillePoids);

          for (let index = 0; index < chartlabel.length; index++) {
            var j = chartlabel[index].substring(8)
            var m = chartlabel[index].substring(5,7)
            var a = chartlabel[index].substring(0,4)
            chartlabel[index] = j + "/" + m + "/" + a
          }

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

    drawEvolutionPerf() {
      axios
        .post("../../reqHistorique.php", {
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

    
  },

  created() {
    this.getIdentiteJoueur();
    this.getTaillePoidsJoueur();
    this.getBlessuresJoueur();
    this.getPerfsJoueurs();
  },
};
</script>


     
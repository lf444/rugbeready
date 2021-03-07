<template>
  <div>
    <v-card>
      <v-col style="padding-bottom:0px"> 
          <v-tabs>
              <v-tab @click="goToIdentite">Identité</v-tab>
              <v-tab @click="goToBlessures">Blessures</v-tab>
              <v-tab @click="goToPerf">Performances</v-tab>
          </v-tabs>
      </v-col>
    </v-card>
 
    <div id="identite">
      <v-card style="padding-top:25px">

        <div>
           <tr v-for='joueur in joueurs' v-bind:key="joueur.idJoueur">
          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Nom : </p>
             <input type='text' id="valeurNom" style="height:100%;color:white" v-model="joueur.nom" >
          </div>

          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Prénom : </p>
           <input type='text' id="valeurPrenom" style="height:100%;color:white" v-model="joueur.prenom">
          </div>

          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Poste : </p>
          <input type='text' id="valeurPoste" style="height:100%;color:white" v-model="joueur.poste">
          </div>
          </tr>

           <tr v-for='jspec in jspecs' v-bind:key="jspec.idTaillePoids">
          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Poids : </p>
            <input type='text' id="valeurPoids" style="height:100%;color:white" v-model="jspec.poids">
          </div>

          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Taille : </p>
            <input type='text' id="valeurTaille" style="height:100%;color:white" v-model="jspec.taille">
          </div>
          </tr>
          <v-btn v-on:click="UpdateRecord();"> submit </v-btn>
        </div>
      </v-card>
     
    </div>


    <div id="blessures" hidden=true>
      <tr v-for='blessure in blessures' v-bind:key="blessure.idBlessure">
      <v-card style="padding-top:25px">
        <div>
          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Date : </p>
            <input type="date" id="valeurDateBlessure" style="height:100%;color:white" v-model="blessure.dateBlessure">
          </div>

          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Durée : </p>
            <input type='text' id="valeurTempsRepos" style="height:100%;color:white" v-model="blessure.tempsRepos">
          </div>

            <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Type : </p>
            <input type='text' id="valeurTypeBlessure" style="height:100%;color:white" v-model="blessure.typeBlessure">
          </div>
           
          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Contexte : </p>
            <v-textarea type='text' id="valeurContextBlessure" style="height:100%;color:white" v-model="blessure.contextBlessure">
          </div> 
        </div>
      </v-card>
      </tr>
      <v-btn v-on:click="UpdateRecordBlessure();"> submit </v-btn>
    </div>

    <div id="perf" hidden=true>
        <tr v-for='perf in perfs' v-bind:key="perf.idPerf">
      <v-card style="padding-top:25px">
        <div>
            
            <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Date : </p>
            <input type="date" id="valeurDatePerf" style="height:100%;color:white"  v-model="perf.datePerf">
          </div>

          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Squat : </p>
            <input type="text" id="valeurPerfSquat" style="height:100%;color:white"  v-model="perf.squat">
          </div>
               <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Couché : </p>
            <input type="text" id="valeurPerfDcouche" style="height:100%;color:white"  v-model="perf.dcouche">
          </div>
               <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Tirage : </p>
            <input type="text" id="valeurPerfTirage" style="height:100%;color:white"  v-model="perf.tirage">
          </div>

        </div>

      </v-card>
       </tr>
       <v-btn v-on:click="UpdateRecordPerf();"> submit </v-btn>
    </div>

    <chart :options="chartOptionsBar"></chart>
  
  </div>
  
</template>

<script>
const axios = require("axios");
export default {
  name: "ProfileJoueur",
  data: () => ({
    joueurs: [],
    nom: "",
    prenom: "",
    poste:"",
    selectedPoste: "",
    idEquipe: "",
    jspecs: [],
    taille: "",
    poids: "",
    blessures: [],
    tempsRepos: "",
    dateBlessure: "",
    typeBlessure: "",
    contextBlessure: "",
    perfs: [],
    datePerf:"",
    squat: "",
    dcouche: "",
    tirage: "",
  }),

  methods: {
    // Recup les donners depuis la base
    AllRecords() {
      axios
        .post("../../afficherData.php", {
          request:2,
          //Recup de l'id dans l'url
          idJoueur: this.$route.query.idJoueur,
        })
        .then((response) => {
        //  console.log(response.data);
          this.joueurs = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    JoueurTaillePoids() {
      axios
        .post("../../afficherJoueurSpec.php", {
          //Recup de l'id dans l'url
          idJoueur: this.$route.query.idJoueur,
        })
        .then((response) => {
         // console.log(response.data);
          this.jspecs = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    JoueurBlessure() {
      axios
        .post("../../afficherJoueurBlessure.php", {
          //Recup de l'id dans l'url
          idJoueur: this.$route.query.idJoueur,
        })
        .then((response) => {
         // console.log(response.data);
          this.blessures = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    JoueurPerfs() {
      axios
        .post("../../afficherJoueurPerfs.php", {
          //Recup de l'id dans l'url
          idJoueur: this.$route.query.idJoueur,
        })
        .then((response) => {
         // console.log(response.data);
          this.perfs = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    UpdateRecord() {

      axios
        .post("../../updateData.php", {
          request:0,
          idJoueur: this.$route.query.idJoueur,
          nom:    document.getElementById("valeurNom").value,
          prenom: document.getElementById("valeurPrenom").value,
          poste:  document.getElementById("valeurPoste").value,
          poids:  document.getElementById("valeurPoids").value,
          taille: document.getElementById("valeurTaille").value,

        })
        .then(function (error) {
          console.log(error);
        });
    },

    
    UpdateRecordBlessure() {

      axios
        .post("../../updateData.php", {
          request:1,
          idJoueur: this.$route.query.idJoueur,
          dateBlessure:    document.getElementById("valeurDateBlessure").value,
          tempsRepos:    document.getElementById("valeurTempsRepos").value,
          typeBlessure:  document.getElementById("valeurTypeBlessure").value,
          contextBlessure:  document.getElementById("valeurContextBlessure").value,
        })
        .then(function (error) {
          console.log(error);
        });
    },

    
    UpdateRecordPerf() {

      axios
        .post("../../updateData.php", {
          request:2,
          idJoueur: this.$route.query.idJoueur,
          datePerf:   document.getElementById("valeurDatePerf").value,
          squat: document.getElementById("valeurPerfSquat").value,
          dcouche:  document.getElementById("valeurPerfDcouche").value,
          tirage:  document.getElementById("valeurPerfTirage").value,
        })
        .then(function (error) {
          console.log(error);
        });
    },

    goToIdentite: function () {
      const tabIdentite = document.getElementById("identite");
      const tabBlessures = document.getElementById("blessures");
      const tabPerf = document.getElementById("perf");
      tabIdentite.hidden = false;
      tabBlessures.hidden = true;
      tabPerf.hidden = true;
    },
    goToBlessures: function () {
      const tabIdentite = document.getElementById("identite");
      const tabBlessures = document.getElementById("blessures");
      const tabPerf = document.getElementById("perf");
      tabIdentite.hidden = true;
      tabBlessures.hidden = false;
      tabPerf.hidden = true;
    },
    goToPerf: function () {
      const tabIdentite = document.getElementById("identite");
      const tabBlessures = document.getElementById("blessures");
      const tabPerf = document.getElementById("perf");
      tabIdentite.hidden = true;
      tabBlessures.hidden = true;
      tabPerf.hidden = false;
    },

    // les fonctions qui seront executé à la création de la page
  },
  created() {
    this.AllRecords();
    this.JoueurTaillePoids();
    this.JoueurBlessure();
    this.JoueurPerfs();
  },
};
</script>

<style>
.v-tab {
  padding-bottom: 10px !important;
}
</style>

     
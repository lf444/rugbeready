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
             <input style="height:100%;color:white" v-bind:value="joueur.nom">
          </div>

          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Prénom : </p>
           <input style="height:100%;color:white" v-bind:value=" joueur.prenom ">
          </div>

          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Poste : </p>
          <input style="height:100%;color:white" v-bind:value="joueur.poste">
          </div>
          </tr>

           <tr v-for='jspec in jspecs' v-bind:key="jspec.idTaillePoids">
          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Poids : </p>
            <input style="height:100%;color:white" v-bind:value="jspec.poids">
          </div>

          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Taille : </p>
            <input style="height:100%;color:white" v-bind:value="jspec.taille">
          </div>
          </tr>


        </div>
      </v-card>
     
    </div>


    <div id="blessures" hidden=true>
      <tr v-for='blessure in blessures' v-bind:key="blessure.idBlessure">
      <v-card style="padding-top:25px">
        <div>
          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Date : </p>
            <input type="date" style="height:100%;color:white" v-bind:value="blessure.dateBlessure">
          </div>

          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Durée : </p>
            <input style="height:100%;color:white" v-bind:value="blessure.tempsRepos">
          </div>

            <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Type de blessure : </p>
            <input style="height:100%;color:white" v-bind:value="blessure.typeBlessure">
          </div>
           

          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Contexte : </p>
            <v-textarea style="height:100%;color:white" v-bind:value="blessure.contextBlessure">
          </div>
           
        </div>
        
      </v-card>
      </tr>
    </div>

    <div id="perf" hidden=true>
        <tr v-for='perf in perfs' v-bind:key="perf.idPerf">
      <v-card style="padding-top:25px">
        <div>
            
            <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Date : </p>
            <input type="text" style="height:100%;color:white"  v-bind:value="perf.datePerf">
          </div>

          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Squat : </p>
            <input type="text" style="height:100%;color:white"  v-bind:value="perf.squat">
          </div>
               <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">développer COUCHER  : </p>
            <input type="text" style="height:100%;color:white"  v-bind:value="perf.dcouche">
          </div>
               <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Tirage horizontal : </p>
            <input type="text" style="height:100%;color:white"  v-bind:value="perf.tirage">
          </div>

        </div>

      </v-card>
       </tr>
    </div>

    <chart :options="chartOptionsBar"></chart>
  
  </div>
  
</template>

<script>
const axios = require("axios");
export default {
  name: "ProfileJoueur",
  data:()=>({
                joueurs:[],
                nom:"",
                prenom:"",
                poste:[
                'Pilliers',
                'Talonneur',
                'Deuxième ligne',
                'Troisième ligne',
                'Demi de mêlée',
                "Demi d'ouverture",
                'Trois-quarts',
                'Ailier',
                'Arrière'],
                selectedPoste:"",
                idEquipe:"",
                jspecs:[],
                taille:"",
                poids:"",
                blessures:[],
                tempsRepos:"",
                dateBlessure:"",
                typeBlessure:"",
                contextBlessure:"",
                perfs:[],
                squat:"",
                dcouche:"",
                tirage:"",
        }),

  methods:{
     // Recup les donners depuis la base
      AllRecords(){
          axios.post("../../afficherUnJoueur.php", {
            //Recup de l'id dans l'url
            idJoueur: this.$route.query.idJoueur
          })
          .then((response)=>{ 
              console.log(response.data);
              this.joueurs = response.data;
          })
          .catch(function(error){
              console.log(error);
          });
      },

         JoueurTaillePoids(){
          axios.post("../../afficherJoueurSpec.php", {
            //Recup de l'id dans l'url
            idJoueur: this.$route.query.idJoueur
          })
          .then((response)=>{ 
              console.log(response.data);
              this.jspecs = response.data;
          })
          .catch(function(error){
              console.log(error);
          });
      },
        JoueurBlessure(){
          axios.post("../../afficherJoueurBlessure.php", {
            //Recup de l'id dans l'url
            idJoueur: this.$route.query.idJoueur
          })
          .then((response)=>{ 
              console.log(response.data);
              this.blessures = response.data;
          })
          .catch(function(error){
              console.log(error);
          });
      },

       JoueurPerfs(){
          axios.post("../../afficherJoueurPerfs.php", {
            //Recup de l'id dans l'url
            idJoueur: this.$route.query.idJoueur
          })
          .then((response)=>{ 
              console.log(response.data);
              this.perfs = response.data;
          })
          .catch(function(error){
              console.log(error);
          });
      },

   UpdateRecord(){
                axios.post("../../UpdateJoueur.php",{
                    nom: this.nom,
                    prenom: this.prenom,
                    poste: this.selectedPoste,
                
                })
                .then(function(error){
                    console.log(error);
                })
             },

      goToIdentite: function () {
          const tabIdentite = document.getElementById('identite')
          const tabBlessures = document.getElementById('blessures')
          const tabPerf = document.getElementById('perf')
          tabIdentite.hidden = false;
          tabBlessures.hidden = true;
          tabPerf.hidden = true;
        },
        goToBlessures: function () {
          const tabIdentite = document.getElementById('identite')
          const tabBlessures = document.getElementById('blessures')
          const tabPerf = document.getElementById('perf')
          tabIdentite.hidden = true;
          tabBlessures.hidden = false;
          tabPerf.hidden = true;
        },
        goToPerf: function () {
          const tabIdentite = document.getElementById('identite')
          const tabBlessures = document.getElementById('blessures')
          const tabPerf = document.getElementById('perf')
          tabIdentite.hidden = true;
          tabBlessures.hidden = true;
          tabPerf.hidden = false;
        },

    // les fonctions qui seront executé à la création de la page
  },
      created(){
      this.AllRecords();
      this.JoueurTaillePoids();
      this.JoueurBlessure();
      this.JoueurPerfs();
   },
}
</script>

<style>
.v-tab{
  padding-bottom : 10px !important;
}
</style>
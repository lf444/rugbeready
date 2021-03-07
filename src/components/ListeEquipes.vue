<template>
  <div id="liste_equipe" style="display:flex">
    
      <v-card style="margin-right:3vh !important" class="mx-auto" width="344" height="266">
          <v-btn height="200" width="100%" v-on:click="NewEquipe();AllRecords()">
            <p style="font-size:225px">+</p>
          </v-btn>
        <v-card-title>
          Ajouter une équipe
        </v-card-title>
      </v-card>


        <tr v-for='equipe in equipes' v-bind:key="equipe.idEquipe">
          <!-- Route qui sert à transmettre l'id d'une équipe via l'url -->
         <router-link tag="span" :to=" { path: '/EquipeVue/?idEquipe='+equipe.idEquipe } " v-bind:tooltip="equipe.idEquipe" style="cursor:pointer">
          <v-card style="margin-right:3vh !important" class="mx-auto" max-width="344" height="266">
            <v-img src="https://www.asm-rugby.com/sites/default/files/thumbnails/image/160331-ballon%20%281%29.jpg" height="200px"></v-img>
              <v-card-title>

              <td>{{ equipe.nom }}</td>

              </v-card-title>
            </v-card>
          </router-link>
        </tr>
 
    
  </div>
</template>
<style>
  #liste_equipe{
    margin-left:10vh;
    margin-top: 10vh;
  }
  .v-btn{
    border-radius:4px 4px 0px 0px  !important;
  }
  .v-card__title{
    border-top: 2px solid rgba(0,0,0,0.2);
  }
  .v-card{
    margin-right:7vh !important;
  }
  </style>

<script>
const axios = require("axios");
  export default {
    name: 'ListeEquipes',
      data() {
    return {
      equipes:[],
      nom:"",
   
    }
  },
    methods:{
      // Recup les donners depuis la base
      AllRecords(){
          axios.post("../../afficherData.php",{
            request:0,
          })
          .then((response)=>{ 
              console.log(response.data);
              this.equipes = response.data;
          })
          .catch(function(error){
              console.log(error);
          });
      },
          NewEquipe() {
      axios
        .post("../../addData.php", {
          request: 0,
        })
        .catch(function (error) {
          console.log(error);
        });
    },

   },
    created(){
      this.AllRecords();
   },
  }; 
</script>

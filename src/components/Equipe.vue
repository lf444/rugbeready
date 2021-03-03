<template>
  <v-app>
    <v-main>
    <v-card>
    <v-simple-table dark style="background-color:grey;">

        <thead>
          <tr>
            <th class="text-center">Nom</th>
            <th class="text-center">Prénom</th>
            <th class="text-center">Poste</th>
            <th class="text-center">Etat</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for='joueur in joueurs' v-bind:key="joueur.idJoueur">
            <td>{{ joueur.nom }}</td>
            <td>{{ joueur.prenom }}</td>
            <td>{{ joueur.poste }}</td>
            <td>En bonne etat</td>
            <td>
            <button value="Delete data" v-on:click="DeleteRecods(joueur.idJoueur);AllRecords();">Delete</button>
            </td>
          </tr>
        </tbody>
 
    </v-simple-table>
    <v-row>
        <v-col>
            <v-button style="cursor: pointer; color:red">Annuler</v-button>
        </v-col>
        <v-col>
            <v-button style="cursor: pointer; color:green;">Valider</v-button>
        </v-col>
    </v-row>
  </v-card>
    </v-main>
  </v-app>
</template>

<script>
const axios = require("axios");

export default {
  name: 'Equipe',
  data() {
    return {
      joueurs:[],
      nom:"",
      poste:"",
      prenom:"",
    }
  },
    methods:{
      
      // Recup les donners depuis la base
      AllRecords(){
          axios.post("../../ajaxfile.php", {
            idEquipe: this.$route.query.idEquipe
          })
          .then((response)=>{ 
              console.log(response.data);
              this.joueurs = response.data;
          })
          .catch(function(error){
              console.log(error);
          });
      },

    DeleteRecods(id){
      axios.post("../../deldata.php", {
        id: id
      })
      .then(function() {
        this.AllRecords();
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

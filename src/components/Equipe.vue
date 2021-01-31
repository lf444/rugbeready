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
            <td>Pas encore mis</td>
            <td>
              <router-link tag="span" to="/ProfilJoueurVue"
                ><v-button style="cursor: pointer">Profil</v-button></router-link
              >
              |
              <router-link tag="span" to="/"><v-button style="cursor: pointer">Delete</v-button></router-link>
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
          axios.get("../../ajaxfile.php")
          .then((response)=>{ 
              console.log(response.data);
              this.joueurs = response.data;
          })
          .catch(function(error){
              console.log(error);
          });
      }
    },
    created(){
      this.AllRecords();
   },
  };

</script>

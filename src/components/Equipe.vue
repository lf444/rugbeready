<template>
  <v-app>
    <v-main>
      <v-card>
        <v-simple-table dark style="background-color: grey">
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
            <tr v-for="joueur in joueurs" v-bind:key="joueur.idJoueur">
              <td>{{ joueur.nom }}</td>
              <td>{{ joueur.prenom }}</td>
              <td>{{ joueur.poste }}</td>
              <td>En bonne etat</td>
              <td>
                <router-link
                  tag="span"
                  :to="{
                    path: '/ProfilJoueurVue/?idJoueur=' + joueur.idJoueur,
                  }"
                  v-bind:tooltip="joueur.idJoueur"
                  style="cursor: pointer"
                >
                  <button value="Profil">Profil</button>
                </router-link>
                <p>|</p>
                <button
                  value="Delete data"
                  v-on:click="
                    DeleteRecods(joueur.idJoueur);
                    AllRecords();
                  "> Delete
                </button>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-row> </v-row>
      </v-card>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field v-model="nom" label="Nom"></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field v-model="prenom" label="Prenom"></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <input
                type="date"
                v-model="dateNaissance"
                label="Date de naissance"
              />
            </v-col>

            <v-col cols="12">
              <v-select
                v-model="selectedPoste"
                v-bind:items="poste"
                label="Select a post"
                single-line
              ></v-select>
            </v-col>

            <v-btn v-on:click="InsertRecods();clear();AllRecords()">
              submit
            </v-btn>
            <v-btn v-on:click="clear()"> clear</v-btn>
          </v-row>
        </v-container>
      </v-form>
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
      prenom:"",
      dateNaissance:"",
      poste: [
      "Pilliers",
      "Talonneur",
      "Deuxième ligne",
      "Troisième ligne",
      "Demi de mêlée",
      "Demi d'ouverture",
      "Trois-quarts",
      "Ailier",
      "Arrière",
    ],
    selectedPoste:"",

    }
  },
    methods:{
      
      // Recup les donners depuis la base
      AllRecords(){
          axios.post("../../afficherJoueur.php", {
            //Recup de l'id dans l'url
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
        // id du joueur à supprimer
        id: id
      })
      .then(function() {
        this.AllRecords();
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    
    // Insert les donners depuis les champs
    InsertRecods() {
      axios
        .post("./adddata.php", {
          nom: this.nom,
          prenom: this.prenom,
          poste: this.selectedPoste,
          dateNaissance: this.dateNaissance,
          idEquipe: this.$route.query.idEquipe,
        })
        .then(function (error) {
          console.log(error);
        });
    },

    clear() {
      this.nom = "";
      this.prenom = "";
      this.selectedPoste = "";
    },

   },

    // les fonctions qui seront executé à la création de la page
    created(){
      this.AllRecords();
   },
  };
</script>

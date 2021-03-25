<template>
  <v-app>
    <v-main>

      <v-card id="listeJoueur">
        <v-simple-table dark style="background-color: grey">
          <thead style="background:#2196f3">
            <tr>
              <th style="color:#fff;font-size:15px" class="text-center">Nom</th>
              <th style="color:#fff;font-size:15px" class="text-center">Prénom</th>
              <th style="color:#fff;font-size:15px" class="text-center">Poste</th>
              <th style="color:#fff;font-size:15px" class="text-center">Etat</th>
              <th style="color:#fff;font-size:15px" class="text-center">Actions</th>
            </tr>
          </thead>

          <tbody class="text-center">
            <tr v-for="joueur in joueurs" v-bind:key="joueur.idJoueur">
              <td>{{ joueur.nom }}</td>
              <td>{{ joueur.prenom }}</td>
              <td>{{ joueur.poste }}</td>
              <td>RAS</td>
              <td style="display: flex;justify-content: center">
                <router-link tag="span" :to="{path: '/ProfilJoueurVue/?idJoueur=' + joueur.idJoueur,}" v-bind:tooltip="joueur.idJoueur" style="display:inherit;cursor:pointer">
                  <button value="Profil">Profil</button>
                </router-link>
                <p style="display: flex;flex-direction: column;justify-content: center;margin-left: 5px;margin-right: 5px;margin-bottom:none;height:100%">|</p>
                <button value="Delete data" v-on:click="delJoueurFromEquipe(joueur.idJoueur);">Delete</button>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>


      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on" style="border-radius:4px !important">Ajouter un joueur</v-btn>
          </template>
          <v-card style="margin:0px !important">
            <v-card-title>
              <span class="headline">Ajouter un joueur</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field label="Nom" v-model="nom" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field label="Prenom" v-model="prenom"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select label="Poste" v-model="selectedPoste" v-bind:items="poste" required></v-select>
                  </v-col>
                  <v-col style="display:inherit;justify-content:center" cols="12" sm="6">
                    <input style="color:white;" type="date" v-model="dateNaissance" label="Date de naissance" required>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Fermer</v-btn>
              <v-btn color="blue darken-1" text @click="addJoueurToEquipe()">Ajouter</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>



    </v-main>
  </v-app>
</template>


<style>

#listeJoueur{
  margin: 60px 7vh !important;
  border-radius: 0px !important;
}

</style>

<script>
  const axios = require("axios");
  export default {
    name: 'Equipe',
    data() {
      return {
        dialog: false,
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

      test(){

      },
      
      getJoueursFromEquipe(){
        axios.post("../../reqEquipe.php", {
          request:2,
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

      addJoueurToEquipe() {
        this.dialog = false;
        axios.post("../../reqEquipe.php", {
          request: 3,
          nom: this.nom,
          prenom: this.prenom,
          poste: this.selectedPoste,
          dateNaissance: this.dateNaissance,
          idEquipe: this.$route.query.idEquipe,
        })
        .catch(function (error) {
          console.log(error);
        });

        setTimeout(() => {
          this.clear();
          this.getJoueursFromEquipe();
        }, 100);
      },

      delJoueurFromEquipe(id){
        axios.post("../../reqEquipe.php", {
          request: 4,
          id: id,
        })
        .catch(function (error) {
          console.log(error);
        });

        setTimeout(() => {
          this.getJoueursFromEquipe();
        }, 100);
      },
    
      clear() {
        this.nom = "";
        this.prenom = "";
        this.selectedPoste = "";
      }

    },

    created(){
      this.getJoueursFromEquipe();
    }

  };
</script>

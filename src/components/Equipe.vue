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
              <td>{{ joueur.dateFinBlessure}}</td>
              <td style="display: flex;justify-content: center">
                <router-link class="d-flex flex-column" tag="span" :to="{name:'ProfilJoueurVue', params:{idJoueur:joueur.idJoueur}}" v-bind:tooltip="joueur.idJoueur" style="cursor:pointer;justify-content:center">
                  <button style="background:#2196f3;width:25px;height:25px;border-radius:4px" value="Profil"><font-awesome-icon icon="user"/></button>
                </router-link>
                <p style="display: flex;flex-direction: column;justify-content: center;margin-left: 5px;margin-right: 5px;margin-bottom:none;height:100%"></p>
                <span class="d-flex flex-column" style="cursor:pointer;justify-content:center">
                  <button style="background:#2196f3;width:25px;height:25px;border-radius:4px" value="Delete data" v-on:click="delJoueur(joueur.idJoueur);"><font-awesome-icon icon="trash"/></button>
                </span>
                
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>


      <v-row justify="center" class="mb-5">
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on" style="border-radius:4px !important">Ajouter un nouveau joueur</v-btn>
          </template>
          <v-card style="margin:0px !important">
            <v-card-title>
              <span class="headline">Ajouter un nouveau joueur</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field label="Nom" v-model="nom"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field label="Prenom" v-model="prenom"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select label="Poste" v-model="selectedPoste" v-bind:items="poste"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field style="color:white;" type="date" v-model="dateNaissance" label="Date de naissance"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="addJoueurToEquipe()">Ajouter</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row justify="center" class="mb-5">
        <v-dialog v-model="dialog2" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red" dark v-bind="attrs" v-on="on" style="border-radius:4px !important">Supprimer l'équipe</v-btn>
          </template>
          <v-card style="margin:0px !important">
            <v-card-title>
              <span class="headline">Supprimer l'équipe</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <span style="color:white;font-size:16px">Êtes-vous sur de vouloir supprimer cette équipe ?</span>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="deleteEquipe()">Supprimer</v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>
      </v-row>

      

    </v-main>
  </v-app>
</template>




<script>
  import servicesJoueur from "../services/servicesJoueur";
  import servicesEquipe from "../services/servicesEquipe";
  export default {
    name: 'Equipe',
    data() {
      return {
        dialog: false,
        dialog2: false,
        joueurs:[],
        nom:"",
        prenom:"",
        dateNaissance:"",
        email:"",
        telephone:"",
        selectedPoste:"",
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
        ]
      }
    },

    methods:{

      text: item => item.nom + " " + item.prenom + " ("+item.idJoueur+")",
      
      getJoueursFromEquipe() {
        servicesJoueur.getJoueursFromEquipe(this.$route.params.idEquipe).then((result) => {
          this.joueurs = result
          this.joueurs.forEach(joueur => {
            if (joueur.dateFinBlessure != null) {
              var diff = (new Date(joueur.dateFinBlessure) - new Date());
              var diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
              (diffDays > 0) ? joueur.dateFinBlessure = "Blessé ("+diffDays+" jours restants)" : joueur.dateFinBlessure ="RAS"
            }else{ joueur.dateFinBlessure ="RAS" }
          })
        })
      },

      addJoueurToEquipe() {
        if(this.nom != "" && this.prenom != "" && this.poste != "" && this.dateNaissance != "") {
          servicesJoueur.addJoueurToEquipe(this.nom, this.prenom, this.selectedPoste, this.dateNaissance, "email de test", "0707070707", this.$route.params.idEquipe)
          .then(() => {
            this.dialog = false;
            this.nom = "";
            this.prenom = "";
            this.selectedPoste = "";
            this.dateNaissance = "";
            this.addBlessureToLastJoueur();
          })
        }
      },

      addBlessureToLastJoueur(){
        servicesJoueur.addBlessureToLastJoueur()
        setTimeout(() => {
          this.getJoueursFromEquipe()
        }, 100);
      },

      delJoueur(idJoueur){
        servicesJoueur.deleteJoueur(idJoueur).then(() => {
          this.getJoueursFromEquipe();
        })
      },


      deleteEquipe(){
        servicesEquipe.deleteEquipe(this.$route.params.idEquipe).then(() => {
          this.$router.push('/');
        })
      }

    },

    created(){
      this.getJoueursFromEquipe();
    },
  };
</script>

<style>

  #listeJoueur{
    margin: 60px 7vh !important;
    border-radius: 0px !important;
  }

</style>

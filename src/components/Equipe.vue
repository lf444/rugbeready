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
                <router-link class="d-flex flex-column" tag="span" :to="{path: '/ProfilJoueurVue/?idJoueur=' + joueur.idJoueur,}" v-bind:tooltip="joueur.idJoueur" style="cursor:pointer;justify-content:center">
                  <button style="background:#2196f3;width:25px;height:25px;border-radius:4px" value="Profil"><font-awesome-icon icon="user"/></button>
                </router-link>
                <p style="display: flex;flex-direction: column;justify-content: center;margin-left: 5px;margin-right: 5px;margin-bottom:none;height:100%"></p>
                <span class="d-flex flex-column" style="cursor:pointer;justify-content:center">
                  <button style="background:#2196f3;width:25px;height:25px;border-radius:4px" value="Delete data" v-on:click="delJoueurFromEquipe(joueur.idJoueur);"><font-awesome-icon icon="trash"/></button>
                </span>
                
              </td>
            </tr>
          </tbody>

        </v-simple-table>
      </v-card>


      <v-row justify="center" class="mb-5">
        <v-dialog v-model="dialog" persistent max-width="600px">
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
              <v-btn color="blue darken-1" text @click="dialog = false;clear()">Fermer</v-btn>
              <v-btn color="blue darken-1" text @click="addJoueurToEquipe()">Ajouter</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row justify="center">
        <v-dialog v-model="dialog2" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on" style="border-radius:4px !important">Ajouter un joueur existant</v-btn>
          </template>
          <v-card style="margin:0px !important">
            <v-card-title>
              <span class="headline">Ajouter un joueur existant</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">

                    <!-- <select style="color:white;background:blue" label="Joueur" id="categories" v-model="selected">
                      <option style="color:black" v-for="test in tests" :key="test.id" :value="test.id">{{ test.nom }}</option>
                    </select>
                    Selected Value: {{selected}} -->

                    <v-select v-model="selected" label="Joueur" :items="joueursNoEquipe" :item-text="text"></v-select>
                    Selected Value: {{selected}}
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog2 = false;clear()">Fermer</v-btn>
              <v-btn color="blue darken-1" text @click="addJoueurExistantToEquipe()">Ajouter</v-btn>
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
        dialog2: false,
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
        dateFinBlessure:"",
        selectedPoste:"",
        joueursNoEquipe:[],
        selected: null,
        
      }
    },

    methods:{

      text: item => item.nom + " " + item.prenom + " ("+item.idJoueur+")",

      getJoueursFromEquipe(){
        axios.post("../../reqEquipe.php", {
          request:2,
          idEquipe: this.$route.query.idEquipe
        })
        .then((response)=>{ 
          this.joueurs = response.data;
          this.joueurs.forEach(element => {
            if(element.dateFinBlessure != null){
              var date1 = new Date(element.dateFinBlessure)
              var date2 = new Date()
              var diff = (date1 - date2);
              var diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
              if(diffDays>0){
                element.dateFinBlessure = "Blessé ("+diffDays+" jours restants)"
              }else{
                element.dateFinBlessure ="RAS"
              }
            }else{
              element.dateFinBlessure ="RAS"
            }
          });
        })
        .catch(function(error){
          console.log(error);
        });
      },

      addJoueurToEquipe() {
        if(this.nom != "" && this.prenom != "" && this.poste != "" && this.dateNaissance != ""){
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

          axios.post("../../reqEquipe.php", {
            request: 6,
          })
          .then((response)=>{
            axios.post("../../reqEquipe.php", {
              request: 7,
              id: response.data[0].idJoueur
            })
          })
          .catch(function (error) {
            console.log(error);
          });

          setTimeout(() => {
            this.clear();
            this.getJoueursFromEquipe();
          }, 100);
        }
      },

      addJoueurExistantToEquipe(){
        this.dialog = false;
        axios.post("../../reqEquipe.php", {
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

      getJoueursNoEquipe(){
        axios.post("../../reqEquipe.php", {
          request:5,
        })
        .then((response)=>{ 
          this.joueursNoEquipe = response.data
        })
        .catch(function(error){
          console.log(error);
        });
      },

    
      clear() {
        this.nom = "";
        this.prenom = "";
        this.selectedPoste = "";
        this.dateNaissance = "";
        this.selected = "";
      }

    },

    computed:{

    },

    created(){
      this.getJoueursFromEquipe();
      this.getJoueursNoEquipe();
    }

  };
</script>

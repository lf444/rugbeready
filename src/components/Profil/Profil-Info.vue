<template>
  <div>

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
  </div>
  
</template>
<script>
const axios = require("axios");
export default {
  name: "ProfilInfo",
  
  data: () => ({
    nom:"",
    prenom:"",
    poste:"",
    age:"",
    email:"",
    telephone:"",
    panel: [0]
  }),

  methods: {

    getIdentiteJoueur() {
      axios.post("../../../reqJoueur.php", {
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
  },

  created() {
    this.getIdentiteJoueur();
  },
};
</script>


     
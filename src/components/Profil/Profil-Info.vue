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
                <!-- <span style="margin-bottom:5px;text-align:start">Email : {{email}}</span>
                <span style="margin-bottom:5px;text-align:start">Tél : {{telephone}}</span> -->
              </v-card>
            </v-row>
          </v-expansion-panel-content>
  </div>
  
</template>
<script>
  import servicesJoueur from "../../services/servicesJoueur";
  export default {
  name: "ProfilInfo",
  
  data: () => ({
    nom:"",
    prenom:"",
    poste:"",
    age:"",
    email:"",
    telephone:"",
  }),

  methods: {

    getIdentiteJoueur() {
      servicesJoueur.getIdentiteJoueur(this.$route.params.idJoueur).then((result) => {
        this.nom = result.nom;
        this.prenom = result.prenom;
        this.poste = result.poste;
        this.age = new Date(new Date() - new Date(result.dateNaissance)).getFullYear() - 1970;
        this.email = result.email;
        this.telephone = result.telephone;
      })
    },    
  },

  created() {
    this.getIdentiteJoueur();
  },
};
</script>


     
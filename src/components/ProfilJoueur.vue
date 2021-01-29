<template>
  <v-card>
    <v-col-5 style="background-color:green"> 
        <v-tabs>
            <v-tab>Item One</v-tab>
            <v-tab>Item Two</v-tab>
            <v-tab>Item Three</v-tab>
        </v-tabs>
    </v-col-5>
    
  </v-card>
</template>

<script>
export default {
  name: "ProfileJoueur",

  data() {
    return {
      equipe: [
        {
          name: "Chabal",
          poste: "Pilier",
          etat: "-",
          id: "1",
        },
        {
          name: "Perret",
          poste: "Talonneur",
          etat: "Blessure",
          id: "2",
        },
        {
          name: "Obama",
          poste: "Ailier droit",
          etat: "Malade",
          id: "3",
        },
        {
          name: "-",
          poste: "-",
          etat: "-",
          id: "-",
        },
      ],
    };
  },
};
</script>
<template>
  <v-app>
    

    <v-main>
      <ProfilJoueur/>
    </v-main>
  </v-app>
</template>

<script>
import ProfilJoueur from '../components/ProfilJoueur';

export default {
  name: 'ProfilJoueurVue',

  components: {
    ProfilJoueur,
  },

  data: () => ({
    //
  }),
};
</script>

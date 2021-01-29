<template>
  <v-app>
    

    <v-main>
      <Equipe/>
    </v-main>
  </v-app>
</template>

<script>
import Equipe from '../components/Equipe';

export default {
  name: 'EquipeVue',

  components: {
    Equipe,
  },

  data: () => ({
    //
  }),
};
</script>

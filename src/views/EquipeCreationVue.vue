<template>
  <v-app>
    

    <v-main>
      <EquipeCreation/>
    </v-main>
  </v-app>
</template>

<script>
import EquipeCreation from '../components/EquipeCreation';

export default {
  name: 'EquipeCreationVue',

  components: {
    EquipeCreation,
  },

  data: () => ({
    //
  }),
};
</script>
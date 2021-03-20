<template>
  <v-app>
    <v-main >
        
          <ListeEquipes/>
        
    </v-main>
  </v-app>
</template>

<script>

import ListeEquipes from '../components/ListeEquipes';



export default {
  name: 'Home',

  components: {
    ListeEquipes
  },

  data: () => ({
    //
  }),
};
</script>

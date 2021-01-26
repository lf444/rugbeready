<template>
  <v-app>
    <v-main >
        <v-row style="height:100%">
          <ListeEquipes/>
        </v-row>
        
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

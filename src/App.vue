<template>
  <v-app>
    

    <v-main >
        <v-row style="height:100%">
          <HomeHead/>
        <v-col>
          <Equipe/>
      </v-col>
        </v-row>
    </v-main>
  </v-app>
</template>

<script>
import HomeHead from './components/HomeHead';
import Equipe from './components/Equipe.vue';

export default {
  name: 'App',

  components: {
    HomeHead,
    Equipe,
  },

  data: () => ({
    //
  }),
};
</script>

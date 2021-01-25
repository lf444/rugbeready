<template>
  <v-app>
    

    <v-main>
      <HomeHead/>
    </v-main>
  </v-app>
</template>

<script>
import HomeHead from './components/HomeHead';

export default {
  name: 'App',

  components: {
    HomeHead,
  },

  data: () => ({
    //
  }),
};
</script>

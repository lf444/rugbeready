<template>
    <v-app>
        <v-main>
            <Calendrier/>
        </v-main>
    </v-app>
</template>

<script>
import Calendrier from '../components/Calendrier';
export default {
  name: 'CalendrierVue',
  components: {
    Calendrier,
  },
  data: () => ({
    
  }),
};
</script>
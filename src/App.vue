<template>
  <v-app id="app">
    <HomeHead/>
    <router-view/>
  </v-app>
</template>

<script>
import HomeHead from './components/HomeHead';
export default {
  name: 'App',
  components:{
    HomeHead,
  }
};
</script>

<style lang="scss">
html{
  overflow: hidden;
}

.v-application--wrap{
  flex-direction: row !important;
}



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

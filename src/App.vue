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
  font-family: Roboto,sans-serif;
}

body{
  background: #121212;
}

.v-application--wrap{
  flex-direction: row !important;
}



#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
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

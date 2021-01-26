<template>
  <div id="liste_equipe" style="display:flex">
    
      <v-card style="margin-right:3vh !important" class="mx-auto" width="344" height="266">
        <router-link tag="span" to="/EquipeCreationVue">
          <v-btn height="200" width="100%">
            <p style="font-size:225px">+</p>
          </v-btn>
        </router-link>
        <v-card-title>
          Ajouter une équipe
        </v-card-title>
      </v-card>

      <router-link tag="span" to="/Equipe/?id=1" style="cursor:pointer">
        <v-card style="margin-right:3vh !important" class="mx-auto" max-width="344" height="266">
          <v-img src="https://www.asm-rugby.com/sites/default/files/thumbnails/image/160331-ballon%20%281%29.jpg" height="200px"></v-img>
          <v-card-title>
            Equipe 1  
          </v-card-title>
        </v-card>
      </router-link>

      <router-link tag="span" to="/Equipe/?id=2" style="cursor:pointer">
        <v-card style="margin-right:3vh !important" class="mx-auto" max-width="344" height="266">
          <v-img src="https://www.asm-rugby.com/sites/default/files/thumbnails/image/160331-ballon%20%281%29.jpg" height="200px"></v-img>
          <v-card-title>
            Equipe 2
          </v-card-title>
        </v-card>
      </router-link>

      <router-link tag="span" to="/Equipe/?id=3" style="cursor:pointer">
        <v-card style="margin-right:3vh !important" class="mx-auto" max-width="344" height="266">
          <v-img src="https://www.asm-rugby.com/sites/default/files/thumbnails/image/160331-ballon%20%281%29.jpg" height="200px"></v-img>
          <v-card-title>
            Equipe 3
          </v-card-title>
        </v-card>
      </router-link>
    
  </div>
</template>


<style>
#liste_equipe{
  margin-left:10vh;
  margin-top: 10vh;
}

.v-btn{
  border-radius:4px 4px 0px 0px  !important;
}

.v-card__title{
  border-top: 2px solid rgba(0,0,0,0.2);
}

.v-card{
  margin-right:7vh !important;
}

</style>

<script>
  export default {
    name: 'ListeEquipes',
  }

  
  
</script>

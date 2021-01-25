<template>
<div>
<v-row>
<v-card
    class="mx-auto"
    width="344"
    style="margin-top:50px"
  >
    <v-btn
      height="200"
      width="100%">
    <p style="font-size:225px">+</p>
    </v-btn>

    <v-card-title>
      Fabriquer un Chabal
    </v-card-title>
    
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
      </div>
    </v-expand-transition>
  </v-card>
<v-card
    class="mx-auto"
    max-width="344"
    style="margin-top:50px"
  >
    <v-img
      src="https://medias.liberation.fr/photo/26088-sport-rugby.jpg?modified_at=1236773118&width=960"
      height="200px"
    ></v-img>
    
    <v-card-title>
      Le bo Chabal
    </v-card-title>
    
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
      </div>
    </v-expand-transition>
  </v-card>
  <v-card
    class="mx-auto"
    max-width="344"
    style="margin-top:50px"
  >
    <v-img
      src="https://medias.liberation.fr/photo/26088-sport-rugby.jpg?modified_at=1236773118&width=960"
      height="200px"
    ></v-img>
    
    <v-card-title>
      Le bo Chabal
    </v-card-title>
    
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
      </div>
    </v-expand-transition>
  </v-card>
  <v-card
    class="mx-auto"
    max-width="344"
    style="margin-top:50px"
  >
    <v-img
      src="https://medias.liberation.fr/photo/26088-sport-rugby.jpg?modified_at=1236773118&width=960"
      height="200px"
    ></v-img>
    
    <v-card-title>
      Le bo Chabal
    </v-card-title>
    
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
      </div>
    </v-expand-transition>
  </v-card>
</v-row>
</div>
</template>

<script>
  export default {
    name: 'HomeHead',
  }
</script>

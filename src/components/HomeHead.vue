<template>

  <div style="height:100%">
      <v-navigation-drawer permanent expand-on-hover>
        <v-list nav dense>

          <router-link tag="span" to="/EquipeVue">
            <v-list-item link>
                <v-list-item-icon style="display:inline">
                  <font-awesome-icon icon="users"/>
                </v-list-item-icon>
                <v-list-item-title style="font-size:14px">Equipes</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link tag="span" to="/Calendrier">
            <v-list-item link>
              <v-list-item-icon style="display:inline">
                <font-awesome-icon icon="calendar-plus"/>
              </v-list-item-icon>
              <v-list-item-title style="font-size:14px">Calendrier</v-list-item-title>
            </v-list-item>
          </router-link>


          <router-link tag="span" to="/Messagerie">
            <v-list-item link>
              <v-list-item-icon style="display:inline">
                <font-awesome-icon icon="comments"/>
              </v-list-item-icon>
              <v-list-item-title style="font-size:14px">Messagerie</v-list-item-title>
            </v-list-item>
          </router-link>

        </v-list>
      </v-navigation-drawer>  
  </div>

</template>

<style>

</style>

<script>

  export default {
    name: 'HomeHead',
    
  }
  
</script>

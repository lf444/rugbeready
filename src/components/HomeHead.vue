<template>
  <div style="height:100%">
      <v-navigation-drawer
        permanent
        expand-on-hover
      >
        <v-list
          nav
          dense
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Equipe</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Calendrier</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Messagerie</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>  
  </div>
</template>

<script>
  export default {
    name: 'HomeHead',
  }
</script>

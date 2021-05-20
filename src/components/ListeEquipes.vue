<template>

  <v-app>
    <v-main>

      <div id="liste_equipe">
        <v-row style="padding-bottom:60px;">
          <tr v-for='equipe in equipes' v-bind:key="equipe.idEquipe">
            <router-link tag="span" :to="{ name : 'EquipeVue', params: { idEquipe: equipe.idEquipe } }" v-bind:tooltip="equipe.idEquipe" style="cursor:pointer">
              <v-card style="margin-right:15px !important;margin-top: 15px !important;" class="mx-auto" max-width="344" height="266">
                <v-img v-bind:src="equipe.image" height="200px"></v-img>
                <v-card-title>
                  <td>{{ equipe.nom }}</td>
                </v-card-title>
              </v-card> 
            </router-link>
          </tr>
        </v-row>

        <v-row style="padding-bottom:30px;" justify="start">
          <v-dialog v-model="dialog"  max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on" style="border-radius:4px !important">Ajouter une équipe</v-btn>
            </template>
            <v-card style="margin:0px !important">
              <v-card-title>
                <span class="headline">Ajouter une équipe</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field label="Nom" v-model="nomEquipe" required></v-text-field>
                      <v-text-field label="url" v-model="ImgAdded" required></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn color="blue darken-1" text @click="dialog = false">Fermer</v-btn> -->
                <v-btn color="blue darken-1" text @click="addEquipe()">Ajouter</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

      </div>

    </v-main>
  </v-app>

  

  
</template>

<style>
  #liste_equipe{
    margin-left: 3vw;
    margin-top: 7vh;
  }
  .v-btn{
    border-radius:4px 4px 0px 0px  !important;
  }
  .v-card__title{
    border-top: 2px solid rgba(0,0,0,0.2);
  }

  </style>

<script>
  const axios = require("axios");
  export default {
    name: 'ListeEquipes',
    data() {
      return {
        dialog: false,
        equipes:[],
        nomEquipe:"",
        ImgAdded:"",
      }
    },

    methods:{

      getEquipes(){
        axios.get("http://api.rugbeready.fr:3000/equipes")
        .then((response)=>{ 
          this.equipes = response.data;
        })
        .catch(function(error){
          console.log(error);
        });
      },


      addEquipe() {
        this.dialog = false;
        console.log(this.ImgAdded),
        axios.post("http://api.rugbeready.fr:3000/equipes", {
          nom: this.nomEquipe,
          image:this.ImgAdded
        }).catch(function (error) {
          console.log(error);
        });

        setTimeout(() => {
          this.dialog = false
          this.getEquipes();
          this.nomEquipe="";
        }, 200);
      },

    },

    created(){
      this.getEquipes();
    },

  }; 
</script>

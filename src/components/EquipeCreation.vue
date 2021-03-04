<template>
<v-app>
    <v-main>


    <v-card>
    <v-form v-model="valid">
    <v-container>
      <v-row>

        <v-col cols="12">
          <p>Créer une equipe</p>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="nom" label="Nom"></v-text-field>
        </v-col>

        <v-col cols="12">
          <!-- Penser a ajouter le joueur selectionne des qu on a clicke dessus dans le menu deroulant (pour pouvoir en selectionner un autre) -->
          <v-select 
            v-model ="selectedJoueur"
            v-bind:items="Joueurs"
            label="Select a player" 
            single-line
            
          ></v-select>
        </v-col>
          

        <v-btn v-on:click="InsertRecods();AllRecords();clear()"> submit </v-btn>
         <v-btn v-on:click="clear();"> clear</v-btn>
        </v-row>
    </v-container>
  </v-form>


  
   </v-card>

    <v-card>
    <v-simple-table dark style="background-color:grey;">

<thead>
  <tr>
    <th class="text-center">Nom</th>
    <th class="text-center">Prénom</th>
    <th class="text-center">Poste</th>
    <th class="text-center">idEquipe</th>
  </tr>
</thead>
  <tbody class="text-center">
    <tr v-for='joueur in joueurs' v-bind:key="joueur.idJoueur">
      <td>{{ joueur.nom }}</td><v-button style="cursor: pointer">Delete</v-button>
      <td>{{ joueur.prenom }}</td><v-button style="cursor: pointer">Delete</v-button>
      <td>{{ joueur.poste }}</td><v-button style="cursor: pointer">Delete</v-button>
      <td>{{ joueur.idEquipe }}</td><v-button style="cursor: pointer">Delete</v-button>
      <td>
    </td>
  </tr>
</tbody>

</v-simple-table>

    </v-card>
    </v-main>
  </v-app>
</template>

<script>
const axios = require("axios");
    export default {
        name:"EquipeCreation",
        data:()=>({
                joueurs:[],
                nom:"",
                prenom:"",
                selectedJoueur:"",
                idEquipe:"",
        }),
        methods:{
            // Recup les donners depuis la base
            AllRecords(){
                axios.post("./afficherJoueur.php",{
                  idEquipe: 1
                })
                .then((response)=>{ 
                    this.joueurs = response.data;
                })
                .catch(function(error){
                    console.log(error);
                });
            },

             // Insert les donners depuis les champs
            InsertRecods(){
                axios.post("./adddata.php",{
                    nom: this.nom,
                    prenom: this.prenom,
                    poste: this.selectedPoste,
                    idEquipe: this.idEquipe,
                
                })
                .then(function(error){
                    console.log(error);
                })
             },
            // Nettoye les champs
             clear(){
               this.nom='';
               this.prenom='';
               this.selectedPoste='';
               this.idEquipe='';
             }
                    

        },

        created(){
           this.AllRecords();
        },
}

    
    
</script>
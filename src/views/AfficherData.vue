<template>
<v-app>
    <v-main>


    <v-card>
    <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="nom" label="Nom"></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="prenom" label="Prenom" ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-select 
            v-model ="selectedPoste"
            v-bind:items="poste"
            label="Select a post" 

            single-line

          ></v-select>
        </v-col>
          <v-col cols="12" md="4">
          <v-text-field v-model="idEquipe" label="Equipe" ></v-text-field>
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
      <td>{{ joueur.nom }}</td>
      <td>{{ joueur.prenom }}</td>
      <td>{{ joueur.poste }}</td>
      <td>{{ joueur.idEquipe }}</td>
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
        name:"AfficherData",
        data:()=>({
                joueurs:[],
                nom:"",
                prenom:"",
                poste:[
                'Pilliers',
                'Talonneur',
                'Deuxième ligne',
                'Troisième ligne',
                'Demi de mêlée',
                "Demi d'ouverture",
                'Trois-quarts',
                'Ailier',
                'Arrière'],
                selectedPoste:"",
                idEquipe:"",
        }),
        methods:{
            // Recup les donners depuis la base
            AllRecords(){
                axios.post("./ajaxfile.php",{
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
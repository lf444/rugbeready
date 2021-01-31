<template>
<v-app>
    <v-main>
                 
    <!-- Add Recods -->       
    <button v-on:click="AllRecords();"  value='Select All users' >Le potit bouton</button>
			<br><br>
    <!-- Add -->
   <tr>
     <td><input type='text' v-model='nom'></td>
     <td><input type='text' v-model='poste'></td>
     <td><input type='text' v-model='prenom'></td>
     <td><input type='button' value='Add'  v-on:click='InsertRecods();'></td>
   </tr>
   <br><br>

    <v-card>
    <v-simple-table dark style="background-color:grey;">

<thead>
  <tr>
    <th class="text-center">Nom</th>
    <th class="text-center">Prénom</th>
    <th class="text-center">Poste</th>
  </tr>
</thead>
  <tbody class="text-center">
    <tr v-for='joueur in joueurs' v-bind:key="joueur.idJoueur">
      <td>{{ joueur.nom }}</td>
      <td>{{ joueur.prenom }}</td>
      <td>{{ joueur.poste }}</td>
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
        data(){
       
            return{
                joueurs:[],
                nom:"",
                poste:"",
                prenom:"",
            }
        },
        methods:{
            // Recup les donners depuis la base
            AllRecords(){
                axios.get("./ajaxfile.php")
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
                    poste: this.poste,
                    prenom: this.prenom
                })
                .then(function(response){
                    //Vide les champs :) !
                    this.nom='';
                    this.poste='';
                    this.prenom='';
                    // refresh les donner recup
                    this.AllRecords();
                    console.log(response.data);
                })
                .then(function(error){
                    console.log(error);
                });
             }
           
        },

        created(){
           this.AllRecords();
        },
}

    
    
</script>
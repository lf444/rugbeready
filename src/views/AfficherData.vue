<template>
<v-app>
    <v-main>

	<!-- Select All records -->
          <button v-on:click="allRecords"  value='Select All users' >Le potit bouton</button>
			<br><br>
			<!-- List records -->
			<table border='1' width='80%' style='border-collapse: collapse;'>
				<tr>
					<th>Username</th>
					<th>Name</th>
					<th>Email</th>
				</tr>

				<tr v-for='user in users' v-bind:key="user.id">
					<td>{{ user.username }}</td>
					<td>{{ user.name }}</td>
					<td>{{ user.email }}</td>
				</tr>
			</table>


    </v-main>
  </v-app>
</template>

<script>
const axios = require("axios");
    export default {
        name:"AfficherData",
        data(){
            return{
                users:"null",
            }
        },

        methods:{
            allRecords:function(){
                axios.get("./ajaxfile.php")
                .then((response)=>{ 
                    this.users = response.data;
                })
                .catch(function(error){
                    console.log(error);
                });
            }
        }

}

    
    
</script>
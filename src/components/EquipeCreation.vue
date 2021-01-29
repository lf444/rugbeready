<template>
  <v-card>
    <v-simple-table dark style="background-color:grey;">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">Nom</th>
            <th class="text-center">Poste</th>
            <th class="text-center">Etat</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="item in equipe" :key="item.name">
            <td><input></td>
            <td><input></td>
            <td><input></td>
            <td>
              <router-link tag="span" to="/"
                ><v-button style="cursor: pointer">Edit</v-button></router-link
              >
              |
              <router-link tag="span" to="/"
                ><v-button style="cursor: pointer"
                  >Delete</v-button
                ></router-link
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-row>
        <v-col>
            <v-button style="cursor: pointer; color:red">Annuler</v-button>
        </v-col>
        <v-col>
            <v-button style="cursor: pointer; color:green;">Valider</v-button>
        </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "EquipeCreation",

  data() {
    return {
      equipe: [
        {
          name: "-",
          poste: "-",
          etat: "-",
          id: "-",
        },
      ],
    };
  },
};
</script>
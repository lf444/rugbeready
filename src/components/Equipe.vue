<template>
  <v-card>
    <v-simple-table dark style="background-color:grey;">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">Nom</th>
            <th class="text-center">Prénom</th>
            <th class="text-center">Poste</th>
            <th class="text-center">Etat</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="item in equipe" :key="item.id">
            <td>{{ item.nom }}</td>
            <td>{{ item.prenom }}</td>
            <td>{{ item.poste }}</td>
            <td>{{ item.etat }}</td>
            <td>
              <router-link tag="span" to="/ProfilJoueurVue"
                ><v-button style="cursor: pointer">Profil</v-button></router-link
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
  name: "Equipe",

  data() {
    return {
      equipe: [
        {
          nom: "Lartin",
          prenom: "Fabien",
          poste: "Pilier",
          etat: "-",
          id: "1",
        },
        {
          nom: "Perret",
          prenom: "Anthony",
          poste: "Talonneur",
          etat: "Blessure",
          id: "2",
        },
        {
          nom: "Celaries",
          prenom: "Loup",
          poste: "Ailier droit",
          etat: "Malade",
          id: "3",
        },
      ],
    };
  },
};
</script>
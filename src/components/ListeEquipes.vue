<template>
  <v-app>
    <v-main>
      <div id="liste_equipe">
        <v-row style="padding-bottom: 60px">
          <tr v-for="equipe in equipes" v-bind:key="equipe.idEquipe">
            <v-card
              style="margin-right: 15px !important; margin-top: 15px !important"
              class="mx-auto"
              max-width="344"
              min-width="344"
              height="266"
            >
              <router-link
                tag="span"
                :to="{
                  name: 'EquipeVue',
                  params: { idEquipe: equipe.idEquipe },
                }"
                v-bind:tooltip="equipe.idEquipe"
                style="cursor: pointer"
              >
                <v-img v-bind:src="equipe.image" height="200px"></v-img>
              </router-link>
              <v-card-title>
                <td>{{ equipe.nom }}</td>
              </v-card-title>
            </v-card>
          </tr>
        </v-row>

        <v-row style="padding-bottom: 30px" justify="start">
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                style="border-radius: 4px !important"
                >Ajouter une équipe</v-btn
              >
            </template>
            <v-card style="margin: 0px !important">
              <v-card-title>
                <span class="headline">Ajouter une équipe</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Nom"
                        v-model="nomEquipe"
                        :rules="rules"
                        required
                      ></v-text-field>
                      <v-text-field
                        label="Url (optionel)"
                        v-model="imgAdded"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="nameValidator()"
                  >Ajouter</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import servicesEquipe from "../services/servicesEquipe";

export default {
  name: "ListeEquipes",
  data() {
    return {
      dialog: false,
      dialog2: false,
      equipes: [],
      nomEquipe: "",
      imgAdded: "",
      imgDefault:
        "https://static.lpnt.fr/images/2018/12/13/17747713lpw-17748036-article-rugby-ballon-jpg_5803326_1250x625.jpg",
      rules: [
        (value) => !!value || "Required.",
        (value) => value != "" || "Required.",
        (value) => (value || "").length > 2 || "Min 3 characters",
        (value) => (value || "").length <= 40 || "Max 40 characters",
      ],
    };
  },

  methods: {
    getEquipes() {
      servicesEquipe.getEquipes().then((result) => {
        this.equipes = result;
      });
    },

    nameValidator() {
      if (this.nomEquipe.length >= 3 && this.nomEquipe.length <= 40) {
        this.urlValidator();
        this.addEquipe();
      } else {
        this.dialog = true;
      }
    },

    urlValidator(){
      var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
      var regex = new RegExp(expression);
      if (this.imgAdded == "") {
        this.imgAdded = this.imgDefault;
      }
      if(!regex.test(this.imgAdded)){
        this.imgAdded = this.imgDefault;
      }
    },

    addEquipe() {
      this.dialog = false;
      servicesEquipe.addEquipe(this.nomEquipe, this.imgAdded).then(() => {
        this.getEquipes();
        this.nomEquipe = "";
        this.imgAdded = "";
      });
    },
  },

  created() {
    this.getEquipes();
  },
};
</script>

<style>
#liste_equipe {
  margin-left: 3vw;
  margin-top: 7vh;
}
.v-btn {
  border-radius: 4px 4px 0px 0px !important;
}
.v-card__title {
  border-top: 2px solid rgba(0, 0, 0, 0.2);
}

.v-image__image {
  border-radius: 4px 4px 0 0 !important;
}
</style>

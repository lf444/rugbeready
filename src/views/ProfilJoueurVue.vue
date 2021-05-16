<template>
  <div>
    <v-row justify="center" style="margin-top: 60px; margin-bottom: 100px">
      <v-expansion-panels v-model="panel" multiple focusable style="width: 90%">
        <v-expansion-panel>
          <ProfilInfo />
        </v-expansion-panel>

        <v-expansion-panel>
          <ProfilTaillePoids />
        </v-expansion-panel>

        <v-expansion-panel>
          <ProfilBlessure />
        </v-expansion-panel>

        <v-expansion-panel>
          <ProfilPerf />
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </div>
</template>

<style>
#liste_blessure {
  margin: 60px 7vh !important;
}

#banniere {
  height: 330px;
  width: 90%;
  background-image: url("https://api.www.ffr.fr/wp-content/uploads/2020/04/Sans-titre-1-1.jpg");
  background-size: cover;
  background-position: 0px -162px;
}

.v-tab {
  padding-bottom: 10px !important;
}
</style>

<script>
import ProfilInfo from "../components/Profil/Profil-Info";
import ProfilTaillePoids from "../components/Profil/Profil-PoidsTaille";
import ProfilBlessure from "../components/Profil/Profil-Blessure.vue";
import ProfilPerf from "../components/Profil/Profil-Perf";

export default {
  name: "ProfileJoueur",
  components: {
    ProfilInfo,
    ProfilTaillePoids,
    ProfilBlessure,
    ProfilPerf,
  },
};
</script>

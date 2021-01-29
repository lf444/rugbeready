<template>
  <div>
    <v-card>
      <v-col style="padding-bottom:0px"> 
          <v-tabs>
              <v-tab @click="goToIdentite">Identité</v-tab>
              <v-tab @click="goToBlessures">Blessures</v-tab>
              <v-tab @click="goToPerf">Performances</v-tab>
          </v-tabs>
      </v-col>
    </v-card>

    <div id="identite">
      <v-card style="padding-top:25px">
        <div>
          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Nom : </p>
            <input style="height:100%;color:white" value="Perret">
          </div>

          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Prénom : </p>
            <input style="height:100%;color:white" value="Anthony">
          </div>

          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Poste : </p>
            <input style="height:100%;color:white" value="Ailier droit">
          </div>

          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Poids : </p>
            <input style="height:100%;color:white" value="60">
          </div>

          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Taille : </p>
            <input style="height:100%;color:white" value="175">
          </div>

        </div>
      </v-card>
    </div>


    <div id="blessures" hidden=true>
      <v-card style="padding-top:25px">
        <div>
          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Date : </p>
            <input type="date" style="height:100%;color:white" value="2021-01-29">
          </div>

          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Contexte : </p>
            <input style="height:100%;color:white" value="Entrainement">
          </div>

          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Durée : </p>
            <input style="height:100%;color:white" value="30j">
          </div>
        </div>
      </v-card>
    </div>

    <div id="perf" hidden=true>
      <v-card style="padding-top:25px">
        <div>
          <div style="display:flex; max-heigth:20px;">
            <p style="height:100%;margin-right:5px;width:75px;">Squat : </p>
            <input type="text" style="height:100%;color:white" value="">
          </div>
        </div>

      </v-card>
    </div>

    <chart :options="chartOptionsBar"></chart>
  
  </div>
  
</template>

<script>
export default {
  name: "ProfileJoueur",

  data: () => ({
      chartOptionsBar: {
        xAxis: {
          data: ["Q1", "Q2", "Q3", "Q4"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "bar",
            data: [63, 75, 24, 92]
          }
        ]
      },

    
  }),

  methods:{
        goToIdentite: function () {
          const tabIdentite = document.getElementById('identite')
          const tabBlessures = document.getElementById('blessures')
          const tabPerf = document.getElementById('perf')

          tabIdentite.hidden = false;
          tabBlessures.hidden = true;
          tabPerf.hidden = true;
        },
        goToBlessures: function () {
          const tabIdentite = document.getElementById('identite')
          const tabBlessures = document.getElementById('blessures')
          const tabPerf = document.getElementById('perf')

          tabIdentite.hidden = true;
          tabBlessures.hidden = false;
          tabPerf.hidden = true;
        },
        goToPerf: function () {
          const tabIdentite = document.getElementById('identite')
          const tabBlessures = document.getElementById('blessures')
          const tabPerf = document.getElementById('perf')

          tabIdentite.hidden = true;
          tabBlessures.hidden = true;
          tabPerf.hidden = false;
        }
  }
}
</script>

<style>
.v-tab{
  padding-bottom : 10px !important;
}
</style>
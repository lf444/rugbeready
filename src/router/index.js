import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EquipeVue from '../views/EquipeVue.vue'
import ProfilJoueurVue from '../views/ProfilJoueurVue.vue'
import CalendrierVue from '../views/CalendrierVue.vue'


Vue.use(VueRouter)

const Routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Equipe/:idEquipe',
    name: 'EquipeVue',
    component: EquipeVue
  },

  {
    path: '/Equipe/:idEquipe/Profil/:idJoueur',
    name: 'ProfilJoueurVue',
    component: ProfilJoueurVue
  },

  {
    path: '/CalendrierVue',
    name: 'CalendrierVue',
    component: CalendrierVue
  }

  
]

const router = new VueRouter({
  // Mode hash pour avoir l'historique sans avoir à activé des truc cotés serveur c'est le mode par défaut. 
  mode: 'hash',
  routes: Routes,
})

export default router

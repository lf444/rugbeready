import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EquipeVue from '../views/EquipeVue.vue'
import ProfilJoueurVue from '../views/ProfilJoueurVue.vue'



Vue.use(VueRouter)

const Routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/EquipeVue/',
    name: 'EquipeVue',
    component: EquipeVue
  },

  {
    path: '/ProfilJoueurVue',
    name: 'ProfilJoueurVue',
    component: ProfilJoueurVue
},

  
]

const router = new VueRouter({
  // Mode hash pour avoir l'historique sans avoir à activé des truc cotés serveur c'est le mode par défaut. 
  mode: 'hash',
  routes: Routes,
})

export default router

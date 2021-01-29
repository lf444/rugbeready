import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EquipeVue from '../views/EquipeVue.vue'
import EquipeCreationVue from '../views/EquipeCreationVue.vue'
import ProfilJoueurVue from '../views/ProfilJoueurVue.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/EquipeVue',
    name: 'EquipeVue',
    component: EquipeVue
  },
  {
    path: '/EquipeCreationVue',
    name: 'EquipeCreationVue',
    component: EquipeCreationVue
  },
  {
    path: '/ProfilJoueurVue',
    name: 'ProfilJoueurVue',
    component: ProfilJoueurVue
},
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

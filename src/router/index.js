import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EquipeVue from '../views/EquipeVue.vue'
import EquipeCreationVue from '../views/EquipeCreationVue.vue'
import ProfilJoueurVue from '../views/ProfilJoueurVue.vue'
import AfficherData from '../views/AfficherData.vue'


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
    path: '/EquipeCreationVue',
    name: 'EquipeCreationVue',
    component: EquipeCreationVue
  },
  {
    path: '/ProfilJoueurVue',
    name: 'ProfilJoueurVue',
    component: ProfilJoueurVue
},
{
  path: '/AfficherData',
  name: 'AfficherData',
  component: AfficherData
},
  
]

const router = new VueRouter({
  mode: 'hash',
  routes: Routes,
})

export default router

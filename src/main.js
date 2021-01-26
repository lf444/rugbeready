import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';


import { library } from '@fortawesome/fontawesome-svg-core'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUsers)
library.add(faCalendarPlus)
library.add(faComments)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false


var vm = new Vue({
  
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

console.log(vm.equipes)

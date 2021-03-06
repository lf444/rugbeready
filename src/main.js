import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';

import * as echarts from 'echarts/lib/echarts'

import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/line';

Vue.component('chart', echarts);

import VCalendar from 'v-calendar';

Vue.use(VCalendar, {
  componentPrefix: 'vc'
})

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false


var vm = new Vue({
  router,
  vuetify,
  render: h => h(App)
})

vm.$mount('#app')

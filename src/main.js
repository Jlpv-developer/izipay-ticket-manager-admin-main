/* Styles */
import '@/scss/main.scss'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
/* Core */
import Vue from 'vue'
import Buefy from 'buefy'

/* Azure */
import Emitter from 'tiny-emitter'

/* Router & Store */
import router from './router'
import store from './store'

/* Service Worker */
import './registerServiceWorker'

/* Vue. Main component */
import App from './App.vue'

import LightTimeline from 'vue-light-timeline'
import VueQr from 'vue-qr'
/* Default title tag */
const defaultDocumentTitle = 'App Izipay'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueApexCharts from 'vue-apexcharts'
import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";

import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
Vue.use(VueSidebarMenu)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueApexCharts)

Vue.component('vue-sidebar-menu-akahon', VueSidebarMenuAkahon);

/* Esto se ejecutara antes de que se lean las rutas */
router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if ((localStorage.getItem('loggedIn') !== 'true')) {
      store.dispatch('formScreenToggle', !!to.meta.formScreen)
      next('/login')
    } else {
      next()
    }
  } else {
    store.dispatch('formScreenToggle', !to.meta.formScreen)
    next()
  }
})

/* Contraer el menú lateral del dispositivo móvil en el cambio de ruta y establecer el título del documento desde la meta de la ruta */
router.afterEach(to => {
  store.commit('asideMobileStateToggle', false)

  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }
})

var emitter = new Emitter()

Vue.config.productionTip = false
Vue.prototype.$msalInstance = {}
Vue.prototype.$emitter = emitter

Vue.use(LightTimeline)
Vue.use(VueQr)
Vue.use(Buefy)

console.log("Version",Vue.version); 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

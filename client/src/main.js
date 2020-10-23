import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import PortalVue from 'portal-vue';

Vue.use(PortalVue);

Vue.config.productionTip = false

export const eventBus = new Vue()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

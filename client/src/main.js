import Vue from 'vue';
import App from './App.vue';
import router from './router.js';

Vue.config.productionTip = false

const eventBus = new Vue()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

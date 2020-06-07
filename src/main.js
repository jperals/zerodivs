import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueClipboard from 'vue-clipboard2';
import vuetify from '@/plugins/vuetify' // path to vuetify export

Vue.use(VueClipboard);

Vue.config.productionTip = false;

Vue.component('v-style', {
  render: function (createElement) {
    return createElement('style', this.$slots.default)
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
  vuetify
}).$mount("#app");

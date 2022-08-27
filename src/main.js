import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PortalVue from "portal-vue";
import VueClipboard from "vue-clipboard2";

Vue.use(PortalVue);
Vue.use(VueClipboard);

Vue.config.productionTip = false;

Vue.component("v-style", {
  render: function(createElement) {
    return createElement("style", this.$slots.default);
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

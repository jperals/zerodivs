import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueClipboard from "vue3-clipboard";
import VueMatomo from 'vue-matomo';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueClipboard, {
  autoSetContainer: true
});
app.use(VueMatomo, {
  host: 'https://zerodivs.matomo.cloud/',
  siteId: 1
});

app.config.productionTip = false;

app.mount("#app");

window._paq.push(['trackPageView']);
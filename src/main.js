import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueClipboard from "vue3-clipboard";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueClipboard, {
  autoSetContainer: true
});

app.config.productionTip = false;

app.mount("#app");

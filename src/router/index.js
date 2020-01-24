import Vue from "vue";
import VueRouter from "vue-router";
import Gallery from "@/components/Gallery";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "gallery",
    component: Gallery
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;

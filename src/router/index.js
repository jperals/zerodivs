import Vue from "vue";
import VueRouter from "vue-router";
import Gallery from "@/components/Gallery";
import Editor from "@/components/Editor";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "gallery",
    component: Gallery
  },
  {
    path: "/div/:id",
    name: "editor",
    component: Editor
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

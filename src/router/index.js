import Vue from "vue";
import VueRouter from "vue-router";
import Gallery from "@/gallery/Gallery";
import Editor from "@/editor/Editor";

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
  }
];

const router = new VueRouter({
  routes
});

export default router;

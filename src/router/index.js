import { createRouter, createWebHistory } from "vue-router";
import Gallery from "@/gallery/ProjectGallery.vue";
import Editor from "@/editor/ProjectEditor.vue";
import About from "@/about-page/AboutPage.vue";
import ProjectOutput from "@/components/ProjectOutput.vue";
import CssOutput from "@/components/CssOutput.vue";
import JsonOutput from "@/components/JsonOutput.vue";

const routes = [
  {
    path: "/",
    name: "gallery",
    component: Gallery
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/i/:id",
    name: "editor",
    component: Editor,
    children: [
      {
        path: "result",
        component: ProjectOutput,
        name: "result",
        redirect: {
          name: "css-result"
        },
        children: [
          {
            path: "css",
            component: CssOutput,
            name: "css-result"
          },
          {
            path: "json",
            component: JsonOutput,
            name: "json-result"
          }
        ]
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import Gallery from "@/gallery/Gallery";
import Editor from "@/editor/Editor";
import About from "@/about-page/About";
import ProjectOutput from "@/components/ProjectOutput";
import CssOutput from "@/components/CssOutput";
import JsonOutput from "@/components/JsonOutput";

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

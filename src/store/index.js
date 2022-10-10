import { createStore } from "vuex";
import router from "../router";
import projects from "../gallery/projects-store";
import shapes from "../editor/shapes-store";
import snap from "../snap/snap-store";
import ui from "./ui";
import undoRedo from "../undo-redo/undo-redo-store";

export default createStore({
  get route() {
    return router.currentRoute.value;
  },
  state: {},
  mutations: {},
  getters: {},
  actions: {
    commitChange({ dispatch }) {
      dispatch("addSnapshot");
      return dispatch("updateProject");
    }
  },
  modules: { projects, shapes, snap, ui, undoRedo }
});

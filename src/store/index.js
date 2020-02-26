import Vue from "vue";
import Vuex from "vuex";
import projects from "../gallery/projects-store";
import shapes from "../editor/shapes-store";
import snap from "../snap/snap-store";
import ui from "./ui";
import undoRedo from "../undo-redo/undo-redo";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { projects, shapes, snap, ui, undoRedo }
});

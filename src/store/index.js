import Vue from "vue";
import Vuex from "vuex";
import projects from "./projects";
import shapes from "./shapes";
import snap from "./snap";
import ui from "./ui";
import undoRedo from "./undo-redo";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { projects, shapes, snap, ui, undoRedo }
});

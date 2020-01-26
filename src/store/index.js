import Vue from "vue";
import Vuex from "vuex";
import projects from "./projects";
import shapes from "./shapes";
import ui from "./ui";
import undoRedo from "./undo-redo";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { projects, shapes, ui, undoRedo }
});

import undoRedoStore from "@/undo-redo/undo-redo-store";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store(undoRedoStore);

describe("Undo / redo store", () => {
  it("add a shape, undo and redo", () => {
    // ToDo
  });
});

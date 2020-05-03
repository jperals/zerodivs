import undoRedo from "@/undo-redo/undo-redo-store";
import shapes from "../editor/shapes-store";
import Vue from "vue";
import Vuex from "vuex";
import {objectCopy} from "@/common/utils";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    shapes,
    undoRedo
  }
});

beforeEach(() => {
  store.dispatch("resetSnapshots");
});

describe("Undo / redo store", () => {
  beforeEach(() => {
    store.dispatch("resetSnapshots");
    store.dispatch("setShapes", []);
  })
  it("save a snapshot", () => {
    expect(store.getters.latestDelta).toBeUndefined();
    store.dispatch("setLayers", [{"dummyObject": Date.now()}]);
    store.dispatch("addSnapshot");
    expect(store.getters.currentSnapshot).toBeDefined();
  });
  it("undo and redo", () => {
    const layersBefore = objectCopy(store.getters.allLayers);
    store.dispatch("addSnapshot");
    store.dispatch("setLayers", {...layersBefore, dummyObject: Date.now()});
    const layersAfter = objectCopy(store.getters.allLayers);
    store.dispatch("addSnapshot");
    store.dispatch("undo");
    expect(store.getters.allLayers).toEqual(layersBefore);
    store.dispatch("redo");
    expect(store.getters.allLayers).toEqual(layersAfter);
  });
  it("undo and redo several times", () => {
    const layersBefore = store.getters.allLayers;
    store.dispatch("addSnapshot");
    store.dispatch("setLayers", {"dummyObject": 1});
    store.dispatch("addSnapshot");
    store.dispatch("setLayers", {"dummyObject": 2});
    store.dispatch("addSnapshot");
    const layersAfter = store.getters.allLayers;
    store.dispatch("undo");
    store.dispatch("undo");
    expect(store.getters.allLayers).toEqual(layersBefore);
    store.dispatch("redo");
    store.dispatch("redo");
    expect(store.getters.allLayers).toEqual(layersAfter);
  });
});

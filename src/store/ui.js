const ui = {
  state: {
    selectedLayer: "main",
    selectedShape: null
  },
  mutations: {
    selectLayer(state, layerName) {
      state.selectedLayer = layerName;
    },
    selectShape(state, shape) {
      state.selectedShape = shape;
    }
  },
  getters: {
    selectedLayer: state => state.selectedLayer,
    selectedShape: state => state.selectedShape
  },
  actions: {
    selectLayer({ commit }, layerName) {
      commit("selectLayer", layerName);
    },
    selectShape({ commit }, shape) {
      commit("selectShape", shape);
    }
  }
};

export default ui;

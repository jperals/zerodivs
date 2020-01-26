const ui = {
  state: {
    selectedLayer: "main",
    selectedShape: null,
    currentColor: "lightgray"
  },
  mutations: {
    selectColor(state, color) {
      state.currentColor = color;
    },
    selectLayer(state, layerName) {
      state.selectedLayer = layerName;
    },
    selectShape(state, shape) {
      state.selectedShape = shape;
    }
  },
  getters: {
    currentColor: state => state.currentColor,
    selectedLayer: state => state.selectedLayer,
    selectedShape: state => state.selectedShape
  },
  actions: {
    selectColor({ commit }, color) {
      commit("selectColor", color);
    },
    selectLayer({ commit }, layerName) {
      commit("selectLayer", layerName);
    },
    selectShape({ commit }, shape) {
      commit("selectShape", shape);
    }
  }
};

export default ui;

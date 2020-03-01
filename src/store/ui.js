const ui = {
  state: {
    selectedLayer: "main",
    selectedShape: null,
    showOutput: false,
    currentColor: "turquoise"
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
    },
    toggleOutput(state, value) {
      state.showOutput = value === undefined ? !state.showOutput : value;
    }
  },
  getters: {
    currentColor: state => state.currentColor,
    selectedLayer: state => state.selectedLayer,
    selectedShape: state => state.selectedShape,
    showOutput: state => state.showOutput
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
    },
    toggleOutput({ commit }, value) {
      commit("toggleOutput", value);
    },
    unselectShape({ commit }) {
      commit("selectShape", null);
    }
  }
};

export default ui;

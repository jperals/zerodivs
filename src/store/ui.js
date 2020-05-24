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
    selectLayer(state, layerId) {
      state.selectedLayer = layerId;
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
    selectLayer({ commit }, layerId) {
      commit("selectLayer", layerId);
    },
    selectShape({ commit, getters, dispatch }, shape) {
      commit("selectShape", shape);
      const layerId = getters.layerIdFromShape(shape);
      return dispatch("selectLayer", layerId);
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

import { get } from "lodash";

const shapes = {
  state: {
    layers: {
      main: {
        active: true,
        shapes: []
      },
      before: {
        active: false,
        shapes: []
      },
      after: {
        active: false,
        shapes: []
      }
    }
  },
  mutations: {
    toggleLayer(state, layerName) {
      state.layers[layerName].active = !(state.layers[layerName].active);
    }
  },
  getters: {
    isLayerActive: state => layerName =>
      get(state, `layers[${layerName}].active`, false),
    layerShapes: state => layerName =>
      get(state, `layers[${layerName}].active`, []),
    shapes: (state, getters) => {
      const shapes = [];
      for (const layerName of ["main", "before", "active"]) {
        const isActive = getters.isLayerActive(layerName);
        if (isActive) {
          shapes.concat(getters.layerShapes(layerName));
        }
      }
      return shapes;
    }
  },
  actions: {
    toggleLayer({ commit }, layerName) {
      commit("toggleLayer", layerName);
    }
  }
};

export default shapes;

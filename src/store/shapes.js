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
    },
    shapeToBeAdded: null
  },
  mutations: {
    setShapeToBeAdded(state, shape) {
      state.shapeToBeAdded = shape;
    },
    toggleLayer(state, layerName) {
      state.layers[layerName].active = !state.layers[layerName].active;
    },
    updateShape(state, { shape, ...newProps }) {
      for (const key in newProps) {
        shape[key] = newProps[key];
      }
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
    },
    shapeToBeAdded: state => state.shapeToBeAdded
  },
  actions: {
    setShapeToBeAdded({ commit }, shape) {
      commit("setShapeToBeAdded", shape);
    },
    toggleLayer({ commit }, layerName) {
      commit("toggleLayer", layerName);
    },
    updateShape({ commit }, { shape, ...newProps }) {
      commit("updateShape", { shape, ...newProps });
    }
  }
};

export default shapes;

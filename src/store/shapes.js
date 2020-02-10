import { get } from "lodash";
import uuid from "uuid/v1";

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
    addShape(state, { layerName, shape }) {
      state.layers[layerName].shapes.push(shape);
    },
    moveShape(state, { shape, left, top }) {
      if (typeof left === "object" && left.units === shape.left.units) {
        shape.left = left;
      }
      if (typeof top === "object" && top.units === shape.top.units) {
        shape.top = top;
      }
      state.layers = { ...state.layers };
    },
    setShapeToBeAdded(state, shape) {
      state.shapeToBeAdded = deepCopy(shape);
    },
    toggleLayer(state, layerName) {
      state.layers[layerName].active = !state.layers[layerName].active;
    },
    unsetShapeToBeAdded(state) {
      state.shapeToBeAdded = null;
    },
    updateShape(state, { shape, ...newProps }) {
      for (const key in newProps) {
        shape[key] = { ...shape[key], ...newProps[key] };
      }
    }
  },
  getters: {
    isLayerActive: state => layerName =>
      get(state, `layers[${layerName}].active`, false),
    layerShapes: state => layerName =>
      get(state, `layers[${layerName}].shapes`, []),
    shapes: (state, getters) => {
      let shapes = [];
      for (const layerName of ["main", "before", "active"]) {
        const isActive = getters.isLayerActive(layerName);
        if (isActive) {
          shapes = shapes.concat(getters.layerShapes(layerName));
        }
      }
      return shapes;
    },
    shapeToBeAdded: state => state.shapeToBeAdded,
    visibleShapes: (state, getters) => {
      let shapes = [];
      for (const layerName of ["main", "before", "active"]) {
        const isActive = getters.isLayerActive(layerName);
        if (isActive) {
          shapes = shapes.concat(getters.layerShapes(layerName));
        }
      }
      if (
        state.shapeToBeAdded &&
        typeof get(state, "shapeToBeAdded.top.value") === "number" &&
        typeof get(state, "shapeToBeAdded.left.value") === "number" &&
        typeof get(state, "shapeToBeAdded.width.value") === "number" &&
        typeof get(state, "shapeToBeAdded.height.value") === "number"
      ) {
        shapes.push(state.shapeToBeAdded);
      }
      return shapes;
    }
  },
  actions: {
    addShape(
      { commit, getters },
      { layerName = getters.selectedLayer, shape = getters.shapeToBeAdded }
    ) {
      const shapeWithId = { ...shape, id: uuid() };
      commit("addShape", { layerName, shape: shapeWithId });
      commit("unsetShapeToBeAdded");
      return shapeWithId;
    },
    moveShape({ commit }, { shape, left, top }) {
      commit("moveShape", { shape, left, top });
    },
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

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default shapes;

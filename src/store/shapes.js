import { get, isObject } from "lodash";
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
      get(shape, "stops", []).forEach(stop => (stop.id = uuid()));
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
    resizeShape(
      state,
      { shape, initialShapeProps = { ...shape }, direction, diff }
    ) {
      if (direction.includes("top")) {
        shape.top.value = initialShapeProps.top.value + diff.top;
        shape.height.value = initialShapeProps.height.value - diff.top;
      }
      if (direction.includes("left")) {
        shape.left.value = initialShapeProps.left.value + diff.left;
        shape.width.value = initialShapeProps.width.value - diff.left;
      }
      if (direction.includes("right")) {
        shape.width.value = initialShapeProps.width.value + diff.left;
      }
      if (direction.includes("bottom")) {
        shape.height.value = initialShapeProps.height.value + diff.top;
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
        if (isObject(shape[key]) && isObject(newProps[key])) {
          shape[key] = { ...shape[key], ...newProps[key] };
        } else {
          shape[key] = newProps[key];
        }
      }
    },
    updateShapeStop(state, { shape, stop, ...newProps }) {
      for (const key in newProps) {
        if (isObject(stop[key]) && isObject(newProps[key])) {
          stop[key] = { ...stop[key], ...newProps[key] };
        } else {
          stop[key] = newProps[key];
        }
      }
      shape.stops = [...shape.stops];
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
    resizeShape({ commit }, { diff, direction, initialShapeProps, shape }) {
      commit("resizeShape", { diff, direction, initialShapeProps, shape });
    },
    setShapeToBeAdded({ commit }, shape) {
      commit("setShapeToBeAdded", shape);
    },
    toggleLayer({ commit }, layerName) {
      commit("toggleLayer", layerName);
    },
    updateShape({ commit }, { shape, ...newProps }) {
      commit("updateShape", { shape, ...newProps });
    },
    updateShapeStop({ commit }, { shape, stop, ...newProps }) {
      commit("updateShapeStop", { shape, stop, ...newProps });
    }
  }
};

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default shapes;

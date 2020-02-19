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
    round: true,
    shapeToBeAdded: null
  },
  mutations: {
    addNewStop(state, { shape, index }) {
      const newStop = { color: "", position: "" };
      if (typeof index === "number") {
        shape.stops.splice(index, 0, newStop);
      } else {
        shape.stops.push(newStop);
      }
    },
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
    moveShapeBy(state, { shape, left, top }) {
      if (typeof left === "object" && left.units === shape.left.units) {
        shape.left.value += left.value;
      }
      if (typeof top === "object" && top.units === shape.top.units) {
        shape.top.value += top.value;
      }
      state.layers = { ...state.layers };
    },
    removeShape(state, shape) {
      for (const layer of Object.values(state.layers)) {
        const index = layer.shapes.findIndex(s => s === shape);
        if (index !== -1) {
          layer.shapes.splice(index, 1);
          break;
        }
      }
      state.layers = { ...state.layers };
    },
    removeStop(state, { shape, index }) {
      shape.stops.splice(index, 1);
    },
    resizeShape(
      state,
      { shape, initialShapeProps = { ...shape }, direction, diff }
    ) {
      if (direction.includes("top")) {
        const bottom =
          initialShapeProps.top.value + initialShapeProps.height.value;
        shape.top.value = Math.min(
          initialShapeProps.top.value + diff.top,
          bottom
        );
        shape.height.value = bottom - shape.top.value;
      }
      if (direction.includes("left")) {
        const right =
          initialShapeProps.left.value + initialShapeProps.width.value;
        shape.left.value = Math.min(
          initialShapeProps.left.value + diff.left,
          right
        );
        shape.width.value = right - shape.left.value;
      }
      if (direction.includes("right")) {
        shape.width.value = Math.max(
          0,
          initialShapeProps.width.value + diff.left
        );
      }
      if (direction.includes("bottom")) {
        shape.height.value = Math.max(
          0,
          initialShapeProps.height.value + diff.top
        );
      }
      state.layers = { ...state.layers };
    },
    roundShapeProperty(state, { shape, propertyName }) {
      if (state.round) {
        shape[propertyName].value = Math.round(shape[propertyName].value);
      }
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
      state.layers = { ...state.layers };
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
    addNewStop({ commit }, { shape, index }) {
      commit("addNewStop", { shape, index });
    },
    addShape(
      { commit, getters },
      { layerName = getters.selectedLayer, shape = getters.shapeToBeAdded }
    ) {
      const shapeWithId = { ...shape, id: uuid() };
      commit("addShape", { layerName, shape: shapeWithId });
      commit("unsetShapeToBeAdded");
      return shapeWithId;
    },
    moveShape({ commit, dispatch }, { shape, left, top }) {
      commit("moveShape", { shape, left, top });
      dispatch("roundShapeProperties", { shape, left, top });
    },
    moveShapeBy({ commit, dispatch }, { shape, left, top }) {
      commit("moveShapeBy", { shape, left, top });
      dispatch("roundShapeProperties", { shape, left, top });
    },
    removeSelectedShape({ dispatch, getters }) {
      dispatch("removeShape", getters.selectedShape);
      dispatch("unselectShape");
    },
    removeShape({ commit }, shape) {
      commit("removeShape", shape);
    },
    removeStop({ commit }, { shape, index }) {
      commit("removeStop", { shape, index });
    },
    resizeShape(
      { commit, dispatch },
      { diff, direction, initialShapeProps, shape }
    ) {
      commit("resizeShape", { diff, direction, initialShapeProps, shape });
      dispatch("roundShapeProperties", { shape, ...initialShapeProps });
    },
    roundShapeProperties({ commit }, { shape, ...properties }) {
      for (const key in properties) {
        if (properties[key] !== undefined) {
          commit("roundShapeProperty", { shape, propertyName: key });
        }
      }
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

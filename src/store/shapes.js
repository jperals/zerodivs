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
    addShape(state, { layerName, shape }) {
      state.layers[layerName].shapes.push(shape);
    },
    setShapeToBeAdded(state, shape) {
      state.shapeToBeAdded = shape;
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
          shapes.concat(getters.layerShapes(layerName));
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
        console.log(state.shapeToBeAdded);
        shapes.push(state.shapeToBeAdded);
      }
      console.log(shapes);
      return shapes;
    }
  },
  actions: {
    addShape(
      { commit, getters },
      { layerName, shape = getters.shapeToBeAdded }
    ) {
      commit("addShape", { layerName, shape });
      commit("unsetShapeToBeAdded");
    },
    setShapeToBeAdded({ commit }, shape) {
      console.log(shape);
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

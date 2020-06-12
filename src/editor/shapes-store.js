import { get, isObject } from "lodash";
import uuid from "uuid/v1";
import warn from "@/warn";
import { move, moveBy } from "./shapes";
import { getSnaps, moveToSnaps } from "@/snap/snap";

function initialLayersState() {
  return {
    main: {
      active: true,
      extraStyles: `width: 100%;
height: 100%;
position: relative;
margin: 0 auto;
background-color: white;
`,
      shapes: [],
    },
    before: {
      active: false,
      extraStyles: `position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
display: block;
content: "";
`,
      shapes: [],
    },
    after: {
      active: false,
      extraStyles: `position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
display: block;
content: "";
`,
      shapes: [],
    },
  };
}

const shapes = {
  state: {
    layers: initialLayersState(),
    round: true,
    shapeToBeAdded: null
  },
  mutations: {
    addNewStop(state, { shape, index }) {
      const lastStop = shape.stops[shape.stops.length - 1];
      const newStop = { color: lastStop.color, id: uuid(), position: "" };
      if (typeof index === "number") {
        shape.stops.splice(index, 0, newStop);
      } else {
        shape.stops.push(newStop);
      }
    },
    addShape(state, { layerName, shape }) {
      get(shape, "stops", []).forEach((stop) => (stop.id = uuid()));
      state.layers[layerName].shapes.push(shape);
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
        const index = layer.shapes.findIndex((s) => s === shape);
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
        const propertyObject = get(shape, propertyName);
        if (propertyObject && isObject(propertyObject)) {
          propertyObject.value = Math.round(propertyObject.value);
        } else {
          warn(`Property ${propertyName} of shape is not an object`);
        }
      }
    },
    setExtraStyles(state, { layerName, styles }) {
      state.layers[layerName].extraStyles = styles;
    },
    setLayers(state, layers) {
      state.layers = layers;
    },
    setShapes(state, shapes) {
      state.layers = { ...initialLayersState(), ...shapes };
    },
    setShapeToBeAdded(state, shape) {
      state.shapeToBeAdded = deepCopy(shape);
    },
    swapLayerShapes(state, { layerName, sourceIndex, targetIndex }) {
      const shapes = state.layers[layerName].shapes;
      const sourceShape = shapes[sourceIndex];
      const targetShape = shapes[targetIndex];
      shapes[sourceIndex] = targetShape;
      shapes[targetIndex] = sourceShape;
      state.layers[layerName].shapes = [...shapes];
    },
    swapStops(state, { shape, sourceIndex, targetIndex }) {
      const { stops } = shape;
      const sourceStop = stops[sourceIndex];
      const targetStop = stops[targetIndex];
      stops[sourceIndex] = targetStop;
      stops[targetIndex] = sourceStop;
      state.layers = { ...state.layers };
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
    },
  },
  getters: {
    allLayers: (state) => state.layers,
    extraStyles: (state) => (layerName) =>
      state.layers[layerName].extraStyles || "",
    isLayerActive: (state) => (layerName) =>
      get(state, `layers[${layerName}].active`, false),
    layerIdFromShape: (state) => (shape) =>
      Object.keys(state.layers).find((key) =>
        state.layers[key].shapes.includes(shape)
      ),
    layerShapes: (state) => (layerName) =>
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
    shapeToBeAdded: (state) => state.shapeToBeAdded,
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
    },
  },
  actions: {
    addNewStop({ commit, dispatch }, { shape, index }) {
      commit("addNewStop", { shape, index });
      dispatch("updateProject");
    },
    addShape(
      { commit, dispatch, getters },
      { layerName = getters.selectedLayer, shape = getters.shapeToBeAdded }
    ) {
      const shapeWithId = newShape(shape);
      commit("addShape", { layerName, shape: shapeWithId });
      commit("unsetShapeToBeAdded");
      dispatch("updateProject");
      return shapeWithId;
    },
    duplicateSelectedShape({ dispatch, getters }) {
      const selectedShape = getters.selectedShape;
      const duplicatedShape = newShape(deepCopy(selectedShape));
      const newPosition = moveBy({
        shape: duplicatedShape,
        top: { value: 10 },
        left: { value: 10 },
      });
      duplicatedShape.left = newPosition.left;
      duplicatedShape.top = newPosition.top;
      dispatch("addShape", { shape: duplicatedShape }).then((shape) =>
        dispatch("selectShape", { shape })
      );
    },
    moveShape({ commit, dispatch, getters }, { shape, left, top }) {
      const moved = move({ left, shape, top });
      if (getters.snap && getters.snapPoints && getters.snapPoints.x.length) {
        const snaps = getSnaps({
          shape: moved,
          snapPoints: getters.snapPoints,
          threshold: getters.snapThreshold,
        });
        dispatch("setCurrentSnaps", snaps);
        const snapped = moveToSnaps({ shape: moved, snaps });
        const propertiesToRound = [];
        if (moved.left.value === snapped.left.value) {
          // No snap, we can round
          propertiesToRound.push("left");
        }
        if (moved.top.value === snapped.top.value) {
          // No snap, we can round
          propertiesToRound.push("top");
        }
        if (propertiesToRound.length) {
          dispatch("roundShapeProperties", {
            shape: snapped,
            propertyNames: propertiesToRound,
          }).then(() => {
            commit("updateShape", {
              shape,
              left: snapped.left,
              top: snapped.top,
            });
          });
        } else {
          commit("updateShape", {
            shape,
            left: snapped.left,
            top: snapped.top,
          });
        }
      } else {
        dispatch("roundShapeProperties", {
          shape: moved,
          propertyNames: ["top", "left"],
        }).then(() => {
          commit("updateShape", {
            shape,
            left: moved.left,
            top: moved.top,
          });
        });
      }
    },
    moveShapeBy({ commit, dispatch }, { shape, left, top }) {
      if (!shape) {
        return;
      }
      commit("moveShapeBy", { shape, left, top });
      dispatch("roundShapeProperties", { shape, left, top }).then(() => {
        dispatch("setCurrentSnaps");
        dispatch("commitChange");
      });
    },
    moveShapesBy({ commit, dispatch }, { shapes, left, top }) {
      for (const shape of shapes) {
        commit("moveShapeBy", { shape, left, top });
      }
      dispatch("setCurrentSnaps");
      dispatch("commitChange");
    },
    removeSelectedShape({ dispatch, getters }) {
      dispatch("removeShape", getters.selectedShape);
      dispatch("unselectShape");
    },
    removeSelectedShapes({ commit, dispatch, getters }) {
      for (const shape of getters.selectedShapes) {
        commit("removeShape", shape);
      }
      dispatch("unselectShape");
      dispatch("commitChange");
    },
    removeShape({ commit, dispatch }, shape) {
      commit("removeShape", shape);
      dispatch("commitChange");
    },
    removeStop({ commit, dispatch }, { shape, index }) {
      commit("removeStop", { shape, index });
      dispatch("commitChange");
    },
    resizeShape(
      { commit, dispatch },
      { diff, direction, initialShapeProps, shape }
    ) {
      commit("resizeShape", { diff, direction, initialShapeProps, shape });
      dispatch("roundShapeProperties", { shape, ...initialShapeProps });
    },
    roundShapeProperties({ commit }, { shape, propertyNames, ...properties }) {
      if (propertyNames instanceof Array) {
        for (const propertyName of propertyNames) {
          commit("roundShapeProperty", { shape, propertyName });
        }
      }
      if (properties) {
        for (const key in properties) {
          if (properties[key] !== undefined) {
            commit("roundShapeProperty", { shape, propertyName: key });
          }
        }
      }
    },
    setExtraStyles({ commit }, { layerName, styles }) {
      commit("setExtraStyles", { layerName, styles });
    },
    setLayers({ commit }, layers) {
      commit("setLayers", layers);
    },
    setShapes({ commit }, shapes) {
      commit("setShapes", shapes);
    },
    setShapeToBeAdded({ commit }, shape) {
      commit("setShapeToBeAdded", shape);
    },
    swapLayerShapes({ commit }, { layerName, sourceIndex, targetIndex }) {
      commit("swapLayerShapes", { layerName, sourceIndex, targetIndex });
    },
    swapStops({ commit }, { shape, sourceIndex, targetIndex }) {
      commit("swapStops", { shape, sourceIndex, targetIndex });
    },
    toggleLayer({ commit, dispatch }, layerName) {
      commit("toggleLayer", layerName);
      dispatch("updateProject");
    },
    updateShape({ commit, dispatch }, { shape, round = true, ...newProps }) {
      commit("updateShape", { shape, ...newProps });
      if (round) {
        dispatch("roundShapeProperties", {
          shape,
          propertyNames: ["left", "top"],
        }).then(() => dispatch("updateProject"));
      } else {
        dispatch("updateProject");
      }
    },
    updateShapeStop({ commit, dispatch }, { shape, stop, ...newProps }) {
      commit("updateShapeStop", { shape, stop, ...newProps });
      dispatch("updateProject");
    },
  },
};

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function newShape(shape) {
  return { ...shape, id: uuid() };
}

export default shapes;

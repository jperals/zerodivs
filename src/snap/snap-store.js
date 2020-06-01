import { findClosestSnap, generateSnapPoints } from "./snap";

export default {
  state: {
    currentSnaps: {},
    snap: true,
    snapPoints: { x: [], y: [] },
    snapThreshold: 5
  },
  getters: {
    currentSnaps: state => state.currentSnaps,
    snapPoint: state => point =>
      findClosestSnap({ snapPointsSorted: state.snapPoints, point }),
    snapPoints: state => state.snapPoints,
    snapThreshold: state => state.snapThreshold
  },
  mutations: {
    generateSnapPoints(state, { shapes, excluded }) {
      state.snapPoints = generateSnapPoints({ shapes, excluded });
    },
    setCurrentSnaps(state, snaps) {
      state.currentSnaps = snaps;
    },
    setSnapThreshold(state, value) {
      state.snapThreshold = value;
    },
    toggleSnap(state, value = !state.snap) {
      state.snap = value;
    }
  },
  actions: {
    generateSnapPoints({ commit, getters }) {
      commit("generateSnapPoints", {
        shapes: getters.shapes,
        excluded: getters.selectedShape
      });
    },
    setCurrentProject({ dispatch }) {
      dispatch("generateSnapPoints");
    },
    setCurrentSnaps({ commit }, snaps) {
      commit("setCurrentSnaps", snaps);
    },
    setSnapThreshold({ commit }, value) {
      commit("setSnapThreshold", value);
    },
    toggleSnap({ commit }, value) {
      commit("toggleSnap", value);
    },
    updateProject({ dispatch }) {
      dispatch("generateSnapPoints");
    }
  }
};

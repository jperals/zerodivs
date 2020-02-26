import { findClosestSnap, generateSnapPoints } from "./snap";

export default {
  state: {
    closestSnapPoints: {},
    snapPoints: { x: [], y: [] },
    snapThreshold: 5
  },
  getters: {
    snapPoint: state => point =>
      findClosestSnap({ snapPointsSorted: state.snapPoints, point }),
    snapPoints: state => state.snapPoints,
    snapThreshold: state => state.snapThreshold
  },
  mutations: {
    generateSnapPoints(state, shapes) {
      state.snapPoints = generateSnapPoints(shapes);
    }
  },
  actions: {
    generateSnapPoints({ commit, getters }) {
      commit("generateSnapPoints", getters.shapes);
    },
    setCurrentProject({ dispatch }) {
      dispatch("generateSnapPoints");
    },
    updateProject({ dispatch }) {
      dispatch("generateSnapPoints");
    }
  }
};

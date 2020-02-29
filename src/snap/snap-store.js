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
    generateSnapPoints(state, {shapes, excluded}) {
      state.snapPoints = generateSnapPoints({shapes, excluded});
    }
  },
  actions: {
    generateSnapPoints({ commit, getters }) {
      commit("generateSnapPoints", {shapes: getters.shapes, excluded: getters.selectedShape});
    },
    setCurrentProject({ dispatch }) {
      dispatch("generateSnapPoints");
    },
    updateProject({ dispatch }) {
      dispatch("generateSnapPoints");
    }
  }
};

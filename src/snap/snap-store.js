import { findClosestSnap, generateSnapPoints } from "./snap";

export default {
  state: {
    currentSnapPoints: {},
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
    generateSnapPoints(state, { shapes, excluded }) {
      state.snapPoints = generateSnapPoints({ shapes, excluded });
    },
    setCurrentSnapPoints(state, snapPoints) {
      state.currentSnapPoints = snapPoints;
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
    setCurrentSnapPoints({ commit }, snapPoints) {
      commit("setCurrentSnapPoints", snapPoints);
    },
    updateProject({ dispatch }) {
      dispatch("generateSnapPoints");
    }
  }
};

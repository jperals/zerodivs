import { deepCopy } from "@/common/utils";

export default {
  state: {
    snapshots: [],
    snapshotIndex: -1
  },
  getters: {
    canUndo: state => 0 < state.snapshotIndex && 0 < state.snapshots.length,
    canRedo: state => state.snapshotIndex < state.snapshots.length - 1,
    currentSnapshot: state => state.snapshots[state.snapshotIndex],
    nextSnapshot: state => state.snapshots[state.snapshotIndex + 1],
    previousSnapshot: state => state.snapshots[state.snapshotIndex - 1],
    snapshots: state => state.snapshots
  },
  mutations: {
    addSnapshot(state, layers) {
      state.snapshots.push(deepCopy(layers));
      state.snapshotIndex += 1;
    },
    undo(state) {
      state.snapshotIndex -= 1;
    },
    redo(state) {
      state.snapshotIndex += 1;
    },
    resetSnapshots(state) {
      state.snapshots = [];
      state.snapshotIndex = -1;
    },
    trimSnaphots(state) {
      state.snapshots = state.snapshots.slice(0, state.snapshotIndex + 1);
    }
  },
  actions: {
    addSnapshot({ commit, getters }) {
      if (getters.canRedo) {
        commit("trimSnaphots");
      }
      commit("addSnapshot", getters.allLayers);
    },
    undo({ commit, dispatch, getters }) {
      if (getters.canUndo) {
        dispatch("setLayers", deepCopy(getters.previousSnapshot));
        commit("undo");
      }
    },
    redo({ commit, dispatch, getters }) {
      if (getters.canRedo) {
        dispatch("setLayers", deepCopy(getters.nextSnapshot));
        commit("redo");
      }
    },
    resetSnapshots({ commit }) {
      commit("resetSnapshots");
    }
  }
};

export default {
  state: {
    snapshots: [],
    snapshotIndex: null
  },
  getters: {
    canUndo: state => 0 < state.snapshotIndex && 0 < state.snapshots.length,
    canRedo: state => state.snapshotIndex < state.snapshots.length - 1
  },
  mutations: {
    undo() {},
    redo() {}
  },
  actions: {
    undo() {},
    redo() {}
  }
};

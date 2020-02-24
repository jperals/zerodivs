export default {
  state: {
    snapPoints: [],
    snapThreshold: 5
  },
  getters: {
    snapPoint: state => point =>
    findClosestSnap({ snapPointsSorted: state.snapPoints, point })
  }
};

export function findClosestSnap({ snapPointsSorted, snapPoint }) {

}

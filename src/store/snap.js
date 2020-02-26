export default {
  state: {
    closestSnapPoints: {},
    snapPoints: { x: [], y: [] },
    snapThreshold: 5
  },
  getters: {
    snapPoint: state => point =>
      findClosestSnap({ snapPointsSorted: state.snapPoints, point })
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
    updateProject({ dispatch }) {
      dispatch("generateSnapPoints");
    }
  }
};

export function findClosestSnap({ snapPointsSorted, point }) {
  return {
    x: findClosestSnapInAxis({
      snapPointsSorted: snapPointsSorted.x,
      point: point.x
    }),
    y: findClosestSnapInAxis({
      snapPointsSorted: snapPointsSorted.y,
      point: point.y
    })
  };
}

// Performs binary search
function findClosestSnapInAxis({
  snapPointsSorted,
  point,
  start = 0,
  end = snapPointsSorted.length - 1
}) {
  if (start == end) {
    return snapPointsSorted[start];
  } else if (end - start === 1) {
    const first = snapPointsSorted[start];
    const second = snapPointsSorted[end];
    const distanceFirst = snapDistance({ snapPoint: first, number: point });
    const distanceSecond = snapDistance({ snapPoint: second, number: point });
    return distanceFirst <= distanceSecond ? first : second;
  }
  let indexAtHalf = start + Math.floor((end - start) / 2);
  const valueAtHalf = snapPointsSorted[indexAtHalf].value;
  const [newStart, newEnd] =
    point <= valueAtHalf ? [start, indexAtHalf] : [indexAtHalf + 1, end];
  return findClosestSnapInAxis({
    snapPointsSorted,
    point,
    start: newStart,
    end: newEnd
  });
}

function snapDistance({ snapPoint, number }) {
  return Math.abs(snapPoint.value - number);
}

export function generateSnapPoints(shapes) {
  const snapPoints = {
    x: [],
    y: []
  };
  for (const shape of shapes) {
    snapPoints.x.push({shape, value: shape.left.value, property: "left"});
    snapPoints.x.push({shape, value: shape.left.value + shape.width.value, property: "right"});
    snapPoints.y.push({shape, value: shape.top.value, property: "top"});
    snapPoints.y.push({shape, value: shape.top.value + shape.height.value, property: "bottom"});
  }
  snapPoints.x.sort((pointA, pointB) => pointA.value - pointB.value);
  snapPoints.y.sort((pointA, pointB) => pointA.value - pointB.value);
  return snapPoints;
}

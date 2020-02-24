export default {
  state: {
    snapPoints: { x: [], y: [] },
    snapThreshold: 5
  },
  getters: {
    snapPoint: state => point =>
      findClosestSnap({ snapPointsSorted: state.snapPoints, point })
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

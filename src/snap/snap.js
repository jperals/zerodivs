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
export function findClosestSnapInAxis({
  snapPointsSorted = [],
  point,
  start = 0,
  end = snapPointsSorted.length - 1
}) {
  if (end < start) {
    return;
  }
  if (start == end) {
    return snapPointsSorted[start];
  } else if (end - start === 1) {
    const first = snapPointsSorted[start];
    const second = snapPointsSorted[end];
    const distanceFirst = snapDistance({ snapPoint: first, number: point });
    const distanceSecond = snapDistance({ snapPoint: second, number: point });
    return distanceFirst <= distanceSecond ? first : second;
  }
  const indexAtLeftOfHalf = start + Math.floor((end - start) / 2);
  const indexAtRightOfHalf = indexAtLeftOfHalf + 1;
  const pointAtLeft = snapPointsSorted[indexAtLeftOfHalf];
  const pointAtRight = snapPointsSorted[indexAtRightOfHalf];
  const distanceToLeft = snapDistance({
    snapPoint: pointAtLeft,
    number: point
  });
  const distanceToRight = snapDistance({
    snapPoint: pointAtRight,
    number: point
  });
  const [newStart, newEnd] =
    distanceToLeft <= distanceToRight
      ? [start, indexAtLeftOfHalf]
      : [indexAtRightOfHalf, end];
  return findClosestSnapInAxis({
    snapPointsSorted,
    point,
    start: newStart,
    end: newEnd
  });
}

export function generateSnapPoints(shapes) {
  const snapPoints = {
    x: [],
    y: []
  };
  for (const shape of shapes) {
    snapPoints.x.push({ shape, value: shape.left.value, property: "left" });
    snapPoints.x.push({
      shape,
      value: shape.left.value + shape.width.value,
      property: "right"
    });
    snapPoints.y.push({ shape, value: shape.top.value, property: "top" });
    snapPoints.y.push({
      shape,
      value: shape.top.value + shape.height.value,
      property: "bottom"
    });
  }
  snapPoints.x.sort((pointA, pointB) => pointA.value - pointB.value);
  snapPoints.y.sort((pointA, pointB) => pointA.value - pointB.value);
  return snapPoints;
}

export function move({ left, shape, top }) {
  const moved = { ...shape };
  if (left !== undefined) {
    moved.left.value = left.value;
  }
  if (top !== undefined) {
    moved.top.value = top.value;
  }
  return moved;
}

export function moveAndSnap({ left, shape, snapPoints, threshold, top }) {
  const moved = move({ left, shape, top });
  return moveSnap({ left, shape: moved, snapPoints, threshold });
}

function moveBy({ left, shape, top }) {
  const moved = { ...shape };
  if (
    typeof left === "object" &&
    (left.units === moved.left.units || !left.units)
  ) {
    moved.left.value += left.value;
  }
  if (
    typeof top === "object" &&
    (top.units === moved.top.units || !top.units)
  ) {
    moved.top.value += top.value;
  }
  return moved;
}

export function moveByAndSnap({ left, shape, snapPoints, threshold, top }) {
  const moved = moveBy({ left, shape, top });
  return moveSnap({ shape: moved, snapPoints, threshold });
}

export function moveSnap({ shape, snapPoints, threshold }) {
  return moveSnapY({
    shape: moveSnapX({ shape, snapPoints, threshold }),
    snapPoints,
    threshold
  });
}

function moveSnapX({ shape, snapPoints, threshold }) {
  let moved = { ...shape, left: { ...shape.left }, top: { ...shape.top } };
  const closestToLeft = findClosestSnapInAxis({
    snapPointsSorted: snapPoints.x,
    point: shape.left.value
  });
  const distanceLeft = Math.abs(shape.left.value - closestToLeft.value);
  const closestToRight = findClosestSnapInAxis({
    snapPointsSorted: snapPoints.x,
    point: shape.left.value + shape.width.value
  });
  const distanceRight = Math.abs(
    shape.left.value + shape.width.value - closestToRight.value
  );
  if (distanceLeft <= distanceRight) {
    if (distanceLeft <= threshold) {
      moved = move({ shape, left: { value: closestToLeft.value } });
    }
  } else if (distanceRight <= threshold) {
    moved = move({
      shape,
      left: { value: closestToRight.value - shape.width.value }
    });
  }
  return moved;
}

function moveSnapY({ shape, snapPoints, threshold }) {
  let moved = { ...shape, left: { ...shape.left }, top: { ...shape.top } };
  const closestToTop = findClosestSnapInAxis({
    snapPointsSorted: snapPoints.y,
    point: shape.top.value
  });
  const distanceTop = Math.abs(shape.top.value - closestToTop.value);
  const closestToBottom = findClosestSnapInAxis({
    snapPointsSorted: snapPoints.y,
    point: shape.top.value + shape.height.value
  });
  const distanceBottom = Math.abs(
    shape.top.value + shape.height.value - closestToBottom.value
  );
  if (distanceTop <= distanceBottom) {
    if (distanceTop <= threshold) {
      moved = move({ shape, top: { value: closestToTop.value } });
    }
  } else if (distanceBottom <= threshold) {
    moved = move({
      shape,
      top: { value: closestToBottom.value - shape.height.value }
    });
  }
  console.log({ moved, threshold, distanceTop, distanceBottom });
  return moved;
}

function snapDistance({ snapPoint, number }) {
  return Math.abs(snapPoint.value - number);
}

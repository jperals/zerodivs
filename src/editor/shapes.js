export function move({ left, shape, top }) {
  const moved = {
    left: { ...shape.left },
    top: { ...shape.top },
    width: { ...shape.width },
    height: { ...shape.height }
  };
  if (left !== undefined) {
    moved.left.value = left.value;
  }
  if (top !== undefined) {
    moved.top.value = top.value;
  }
  return moved;
}

export function moveBy({ left, shape, top }) {
  const moved = {
    left: { ...shape.left },
    top: { ...shape.top },
    width: { ...shape.width },
    height: { ...shape.height }
  };
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

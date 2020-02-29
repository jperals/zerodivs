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

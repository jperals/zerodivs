export function transformCoords({ x, y, viewportTransform }) {
  return {
    x: (x - viewportTransform.x) / viewportTransform.scale,
    y: (y - viewportTransform.y) / viewportTransform.scale
  };
}

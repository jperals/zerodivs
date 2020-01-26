export default function shapes2css(shapes, padding = "") {
  const reversed = [...shapes].reverse();
  return `\
${padding}background-image: ${formatImages(reversed)};
${padding}background-position: ${formatPositions(reversed)};
${padding}background-size: ${formatSizes(reversed)};${
    someRepeat(shapes)
      ? `
${padding}background-repeat: ${formatRepeats(reversed)};`
      : ``
  }
`;
}

function formatStop(stop) {
  return stop.position === undefined
    ? stop.color
    : [stop.color, stop.position].join(" ");
}

function formatStops(stops) {
  return stops.map(stop => formatStop(stop)).join(", ");
}

function formatImages(shapes) {
  return shapes.map(shape => formatImage(shape)).join(", ");
}

function formatImage(shape) {
  return `${formatType(shape.type)}(${[
    shape.direction,
    formatStops(shape.stops)
  ].join(", ")})`;
}

function formatType(type) {
  return `${type}-gradient`;
}

function formatPositions(shapes) {
  return shapes.map(shape => formatPosition(shape)).join(", ");
}

function formatPosition(shape) {
  return `${shape.left.value}${shape.left.units} ${shape.top.value}${shape.top.units}`;
}

function formatSizes(shapes) {
  return shapes.map(shape => formatSize(shape)).join(", ");
}

function formatSize(shape) {
  return `${shape.width.value}${shape.width.units} ${shape.height.value}${shape.height.units}`;
}

function formatRepeats(shapes) {
  return shapes
    .map(shape => (isRepeat(shape.repeat) ? shape.repeat : "no-repeat"))
    .join(", ");
}

function someRepeat(shapes) {
  for (const shape of shapes) {
    if (isRepeat(shape.repeat)) {
      return true;
    }
  }
  return false;
}

function isRepeat(str) {
  return str && str !== "no-repeat";
}

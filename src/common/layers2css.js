import shapes2css from "@/common/shapes2css";

export default function layers2css({layers, selector = "body"}) {
  let cssStr = `html {
  height: 100%;
  width: 100%;
}
`;
  for (const layerName of ["main", "before", "after"]) {
    if (isLayerActive({layerName, layers})) {
      cssStr += layerName === "main" ? selector : selector + ":" + layerName;
      cssStr += " {\n"
      const customStyle = layerExtraStyles({layerName, layers});
      cssStr += customStyle;
      const shapes = getLayerShapes({layerName, layers});
      cssStr += shapes2css(shapes, "  ");
      cssStr += "}\n";
    }
  }
  return cssStr;
}

function getLayerShapes({ layerName, layers}) {
  return layers[layerName].shapes;
}

function isLayerActive({ layerName, layers}) {
  return layers[layerName].active;
}

function layerExtraStyles({ layerName, layers }) {
  const rawString = layers[layerName].extraStyles || "";
  return "  " + rawString.replace(
    /\n[^$]/g,
    (match, char) => "\n  " + rawString[char + 1]
  );
}

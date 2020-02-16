import store from "@/store";
export default function reactToKeyboard(event) {
  switch (event.keyCode) {
    case 8:
      if (isNotWriting(event)) {
        store.dispatch("removeSelectedShape");
      }
      break;
    case 37:
      if (isNotWriting(event)) {
        store.dispatch("moveShapeBy", {
          shape: store.getters.selectedShape,
          left: { value: -1, units: "px" }
        });
      }
      break;
    case 38:
      if (isNotWriting(event)) {
        store.dispatch("moveShapeBy", {
          shape: store.getters.selectedShape,
          top: { value: -1, units: "px" }
        });
      }
      break;
    case 39:
      if (isNotWriting(event)) {
        store.dispatch("moveShapeBy", {
          shape: store.getters.selectedShape,
          left: { value: 1, units: "px" }
        });
      }
      break;
    case 40:
      if (isNotWriting(event)) {
        store.dispatch("moveShapeBy", {
          shape: store.getters.selectedShape,
          top: { value: 1, units: "px" }
        });
      }
      break;
  }
}

function isNotWriting(event) {
  return (
    event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA"
  );
}

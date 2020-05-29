import { isNotWriting } from "@/common/ui";
import store from "@/store";
export default function reactToKeyboard(event) {
  switch (event.key) {
    case "Backspace":
    case "Delete":
      if (isNotWriting(event)) {
        store.dispatch("removeSelectedShapes");
      }
      break;
    case "ArrowLeft":
      if (isNotWriting(event)) {
        store.dispatch("moveShapesBy", {
          shapes: store.getters.selectedShapes,
          left: { value: -1, units: "px" },
        });
      }
      break;
    case "ArrowUp":
      if (isNotWriting(event)) {
        store.dispatch("moveShapesBy", {
          shapes: store.getters.selectedShapes,
          top: { value: -1, units: "px" },
        });
      }
      break;
    case "ArrowRight":
      if (isNotWriting(event)) {
        store.dispatch("moveShapesBy", {
          shapes: store.getters.selectedShapes,
          left: { value: 1, units: "px" },
        });
      }
      break;
    case "ArrowDown":
      if (isNotWriting(event)) {
        store.dispatch("moveShapesBy", {
          shapes: store.getters.selectedShapes,
          top: { value: 1, units: "px" },
        });
      }
      break;
    case "d":
      if (isNotWriting(event)) {
        store.dispatch("duplicateSelectedShape");
      }
      break;
    case "Escape":
      if (isNotWriting(event)) {
        store.dispatch("setShapeToBeAdded", null);
      }
      break;
    case "z":
      if (isNotWriting(event) && event.metaKey) {
        if (event.shiftKey) {
          store.dispatch("redo");
        } else {
          store.dispatch("undo");
        }
      }
      break;
  }
}

import store from "@/store";
export default function reactToKeyboard(event) {
  switch(event.keyCode) {
    case 8:
      if (event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") {
        store.dispatch("removeSelectedShape");
      }
  }
}

<template>
  <div />
</template>

<script>
import store from "@/store";
export default {
  created() {
    window.addEventListener("keydown", this.onKeyPress);
  },
  destroyed() {
    window.removeEventListener("keydown", this.onKeyPress);
  },
  methods: {
    onKeyPress(event) {
      switch(event.keyCode) {
        case 8:
          if (event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") {
            store.dispatch("removeSelectedShape");
          }
      }
    }
  }
};
</script>

<template>
  <div class="canvas" :style="computedStyle"></div>
</template>

<script>
import { get } from "lodash";
import store from "@/store";
import shapes2css from "@/common/shapes2css";
export default {
  computed: {
    computedStyle() {
      const snapShapes = [];
      const snaps = store.getters.currentSnaps;
      const snapX = get(snaps, "x");
      const color = "khaki";
      if (snapX) {
        const position =
          snapX.location === "left" ? snapX.point.value - 1 : snapX.point.value;
        snapShapes.push({
          type: "linear",
          direction: "to right",
          left: { value: position, units: "px" },
          top: { value: 0, units: "px" },
          width: { value: 1, units: "px" },
          height: { value: 100, units: "%" },
          stops: [{ color }, { color }]
        });
      }
      const snapY = get(snaps, "y");
      if (snapY) {
        const position =
          snapY.location === "top"
            ? snapY.point.value - 1
            : snapY.point.value;
        snapShapes.push({
          type: "linear",
          direction: "to bottom",
          left: { value: 0, units: "%" },
          top: { value: position, units: "px" },
          width: { value: 100, units: "%" },
          height: { value: 1, units: "px" },
          stops: [{ color }, { color }]
        });
      }
      const shapes = snapShapes.concat(store.getters.visibleShapes);
      return shapes2css(shapes);
    }
  }
};
</script>

<style scoped>
.canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>

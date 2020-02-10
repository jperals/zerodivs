<template>
  <div class="canvas" :style="computedStyle"></div>
</template>

<script>
import store from "@/store";
import shapes2css from "@/shapes2css";
export default {
  computed: {
    computedStyle() {
      const shapes = store.getters.visibleShapes;
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

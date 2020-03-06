<template>
  <div
    class="overlay"
    :class="{ selected: isSelected }"
    :style="computedStyle"
    v-on:mousedown="$event => onMouseDown(shape, $event)"
    v-on:mouseup="$event => onMouseUp(shape, $event)"
    v-on:pointerdown="$event => onMouseDown(shape, $event)"
    v-on:pointerup="$event => onMouseUp(shape, $event)"
  >
  </div>
</template>

<script>
import store from "@/store";
export default {
  props: {
    onMouseDown: Function,
    onMouseUp: Function,
    shape: Object
  },
  data() {
    return {
      borderWidth: 1
    };
  },
  computed: {
    computedStyle() {
      const left =
        this.shape.left.value - this.borderWidth + this.shape.left.units;
      const top =
        this.shape.top.value - this.borderWidth + this.shape.left.units;
      return {
        transform: `translate(${left}, ${top})`,
        width: this.shape.width.value + this.shape.width.units,
        height: this.shape.height.value + this.shape.height.units
      };
    },
    isSelected() {
      return store.getters.selectedShape === this.shape;
    }
  }
};
</script>

<style scoped>
.overlay {
  position: absolute;
}
.overlay.selected {
  z-index: 10;
}
</style>

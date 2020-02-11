<template>
  <div
    class="overlay"
    :class="{ selected: isSelected }"
    :style="computedStyle"
    v-on:mousedown="$event => onMouseDown(shape, $event)"
    v-on:mouseup="$event => onMouseUp(shape, $event)"
  />
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
      return {
        left: this.shape.left.value - this.borderWidth + this.shape.left.units,
        top: this.shape.top.value - this.borderWidth + this.shape.left.units,
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
  border: 1px solid lightpink;
}
</style>

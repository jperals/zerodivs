<template>
  <div
    class="overlay"
    :class="{ selected: isSelected }"
    :style="computedStyle"
    v-on:pointerdown="$event => onMouseDown(shape, $event)"
    v-on:pointerup="$event => onMouseUp(shape, $event)"
  ></div>
</template>

<script>
import store from "@/store";
export default {
  props: {
    onMouseDown: Function,
    onMouseUp: Function,
    shape: Object
  },
  computed: {
    computedStyle() {
      const left = this.shape.left.value + this.shape.left.units;
      const top = this.shape.top.value + this.shape.left.units;
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
.overlay:hover:not(.selected) {
  /* background-color: rgba(170, 170, 255, .3); */
  --stripe-color-dark: rgba(0, 0, 255, 0.5);
  --stripe-color-bright: rgba(255, 255, 255, 0.25);
  background-image: linear-gradient(
    135deg,
    var(--stripe-color-bright) 24.5%,
    var(--stripe-color-dark) 24.5%,
    var(--stripe-color-dark) 25.5%,
    var(--stripe-color-bright) 25.5%,
    var(--stripe-color-bright) 74.5%,
    var(--stripe-color-dark) 74.5%,
    var(--stripe-color-dark) 75.5%,
    var(--stripe-color-bright) 75.5%
  );
  background-size: 3px 3px;
  background-repeat: repeat;
}
.overlay.selected {
  z-index: 10;
}
</style>

<template>
  <div class="overlay" :style="computedStyle" v-on:mousedown.stop="() => onMouseDown(shape, $event)" v-on:mouseup.stop="() => onMouseUp(shape, $event)" />
</template>

<script>
export default {
  props: {
    onMouseDown: Function,
    onMouseUp: Function,
    shape: Object
  },
  computed: {
    computedStyle() {
      return {
        left: this.shape.left.value + this.shape.left.units,
        top: this.shape.top.value + this.shape.left.units,
        width: this.shape.width.value + this.shape.width.units,
        height: this.shape.height.value + this.shape.height.units
      };
    }
  }
}
</script>

<style scoped>
.overlay {
  position: absolute;
}
</style>
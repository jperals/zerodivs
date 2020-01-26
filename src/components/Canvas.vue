<template>
  <div
    class="canvas"
    :class="{'adding-shape': addingShape}"
    v-on:mousemove="onDrag"
    v-on:mousedown="onMouseDown"
    v-on:mouseup="onMouseUp"
  ></div>
</template>

<script>
import store from "@/store";
export default {
  data() {
    return {
      initialPointerPosition: {}
    };
  },
  methods: {
    onDrag(event) {
      console.log(event);
    },
    onDragEnd(event) {
      console.log(event);
    },
    onDragStart(event) {
      console.log(event);
    },
    onMouseDown(event) {
      console.log(event);
    },
    onMouseUp(event) {
      console.log(event);
    }
  },
  computed: {
    addingShape() {
      return !!store.getters.shapeToBeAdded;
    }
  }
};
</script>

<style scoped>
.canvas.adding-shape {
  cursor: crosshair;
}
</style>

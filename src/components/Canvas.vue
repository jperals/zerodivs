<template>
  <div
    class="canvas"
    :class="{'adding-shape': addingShape}"
    ref="canvas"
    :style="computedStyle"
    v-on:mousemove="onDrag"
    v-on:mousedown="onMouseDown"
    v-on:mouseup="onMouseUp"
  ></div>
</template>

<script>
import store from "@/store";
import shapes2css from "@/shapes2css";
export default {
  data() {
    return {
      canvasPosition: {},
      initialNewShapePosition: {},
      initialPointerPosition: {}
    };
  },
  methods: {
    onDrag(event) {
      if (!this.addingShape) {
        return;
      }
      const diff = {
        x: event.x - this.initialPointerPosition.x,
        y: event.y - this.initialPointerPosition.y
      };
      const x =
        0 <= diff.x
          ? this.initialNewShapePosition.x
          : this.initialNewShapePosition.x + diff.x;
      const width = Math.abs(diff.x);
      const y =
        0 <= diff.y
          ? this.initialNewShapePosition.y
          : this.initialNewShapePosition.y + diff.y;
      const height = Math.abs(diff.y);
      store.dispatch("updateShape", {
        shape: store.getters.shapeToBeAdded,
        width: { value: width },
        height: { value: height },
        top: { value: y },
        left: { value: x }
      });
    },
    onDragEnd(event) {
      console.log(event);
    },
    onDragStart(event) {
      console.log(event);
    },
    onMouseDown(event) {
      console.log(event);
      if (!this.addingShape) {
        return;
      }
      const rect = this.$refs.canvas.getBoundingClientRect().top;
      this.canvasPosition = { x: rect.left, y: rect.top };
      this.initialPointerPosition = { x: event.x, y: event.y };
      this.initialNewShapePosition = {
        x: event.x - this.canvasPosition.x,
        y: event - this.canvasPosition.y
      };
      //console.log(rect, this.initialNewShapePosition);
      store.dispatch("setShapeToBeAdded", {
        ...store.getters.shapeToBeAdded,
        width: {
          units: "px",
          value: 0
        },
        height: {
          units: "px",
          value: 0
        },
        left: {
          units: "px",
          value: this.initialNewShapePosition.x
        },
        top: {
          units: "px",
          value: this.initialNewShapePosition.y
        }
      });
    },
    onMouseUp(event) {
      console.log(event);
      if (this.addingShape) {
        store.dispatch("addShape", {
          layerName: store.getters.selectedLayer,
          shape: store.getters.shapeToBeAdded
        });
      }
    }
  },
  computed: {
    addingShape() {
      return !!store.getters.shapeToBeAdded;
    },
    computedStyle() {
      const shapes = store.getters.visibleShapes;
      return shapes2css(shapes);
    }
  }
};
</script>

<style scoped>
.canvas.adding-shape {
  cursor: crosshair;
}
</style>

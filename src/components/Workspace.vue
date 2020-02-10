<template>
  <div
    class="workspace"
    ref="workspace"
    :class="{ 'adding-shape': addingShape }"
    v-on:mousemove="onDrag"
    v-on:mousedown="onMouseDown"
    v-on:mouseup="onMouseUp"
  >
    <Canvas />
    <ShapeOverlay
      v-for="shape in shapes"
      :shape="shape"
      :onMouseDown="onShapeMouseDown"
      :onMouseUp="onShapeMouseUp"
      :key="shape.id"
    />
  </div>
</template>

<script>
import store from "@/store";
import Canvas from "@/components/Canvas";
import ShapeOverlay from "@/components/ShapeOverlay";
export default {
  data() {
    return {
      initialNewShapePosition: {},
      initialShapePosition: {},
      initialPointerPosition: {},
      shapeBeingAdded: null,
      shapeBeingMoved: null,
      workspacePosition: {}
    };
  },
  components: {
    Canvas,
    ShapeOverlay
  },
  methods: {
    onDrag(event) {
      if (this.shapeBeingMoved) {
        const diff = {
          left: event.x - this.initialPointerPosition.x,
          top: event.y - this.initialPointerPosition.y
        };
        const newPosition = {
          left: this.initialShapePosition.left.value + diff.left,
          top: this.initialShapePosition.top.value + diff.top
        };
        store.dispatch("moveShape", {
          shape: this.shapeBeingMoved,
          left: { value: newPosition.left, units: "px" },
          top: { value: newPosition.top, units: "px" }
        });
      }
      if (this.addingShape) {
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
      }
    },
    onDragEnd() {},
    onDragStart() {},
    onMouseDown() {
      if (this.addingShape) {
        const rect = this.$refs.workspace.getBoundingClientRect();
        this.workspacePosition = { x: rect.left, y: rect.top };
        this.initialPointerPosition = { x: event.x, y: event.y };
        this.initialNewShapePosition = {
          x: event.x - this.workspacePosition.x,
          y: event.y - this.workspacePosition.y
        };
        this.shapeBeingAdded = {
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
        };
        store.dispatch("setShapeToBeAdded", this.shapeBeingAdded);
      }
    },
    onMouseUp() {
      if (this.addingShape) {
        store.dispatch("addShape", {
          layerName: store.getters.selectedLayer,
          shape: store.getters.shapeToBeAdded
        });
        this.shapeBeingAdded = null;
      }
    },
    onShapeMouseDown(shape, event) {
      if (this.addingShape) {
        return;
      }
      event.stopPropagation();
      this.shapeBeingMoved = shape;
      const rect = this.$refs.workspace.getBoundingClientRect();
      this.workspacePosition = { x: rect.left, y: rect.top };
      this.initialPointerPosition = { x: event.x, y: event.y };
      this.initialShapePosition = { left: shape.left, top: shape.top };
    },
    onShapeMouseUp(shape, event) {
      event.stopPropagation();
      this.shapeBeingMoved = null;
    }
  },
  computed: {
    addingShape() {
      return !!store.getters.shapeToBeAdded;
    },
    shapes() {
      return store.getters.shapes;
    }
  }
};
</script>

<style scoped>
.workspace.adding-shape {
  cursor: crosshair;
}
</style>

<template>
  <div
    class="workspace"
    ref="workspace"
    :class="{'adding-shape': addingShape}"
    v-on:mousemove="onDrag"
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
      initialShapePosition: {},
      initialPointerPosition: {},
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
      if (!this.shapeBeingMoved) {
        return;
      }
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
    },
    onDragEnd() {},
    onDragStart() {},
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

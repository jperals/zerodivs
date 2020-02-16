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
      :onResizeHandleMouseDown="onResizeHandleMouseDown"
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
      initialNewShapePosition: null,
      initialShapeProps: null,
      initialPointerPosition: null,
      resizeDirection: null,
      shapeBeingAdded: null,
      shapeBeingMoved: null,
      workspacePosition: null
    };
  },
  components: {
    Canvas,
    ShapeOverlay
  },
  methods: {
    dragNewShape(diff) {
      const x =
        0 <= diff.left
          ? this.initialNewShapePosition.left
          : this.initialNewShapePosition.left + diff.left;
      const width = Math.abs(diff.left);
      const y =
        0 <= diff.top
          ? this.initialNewShapePosition.top
          : this.initialNewShapePosition.top + diff.top;
      const height = Math.abs(diff.top);
      store.dispatch("updateShape", {
        shape: store.getters.shapeToBeAdded,
        width: { value: width },
        height: { value: height },
        top: { value: y },
        left: { value: x }
      });
    },
    moveShape(diff) {
      const newPosition = {
        left: this.initialShapeProps.left.value + diff.left,
        top: this.initialShapeProps.top.value + diff.top
      };
      store.dispatch("moveShape", {
        shape: this.shapeBeingMoved,
        left: { value: newPosition.left, units: "px" },
        top: { value: newPosition.top, units: "px" }
      });
    },
    onDrag(event) {
      if (!this.initialPointerPosition) {
        return;
      }
      const diff = {
        left: event.x - this.initialPointerPosition.x,
        top: event.y - this.initialPointerPosition.y
      };
      if (this.addingShape) {
        this.dragNewShape(diff);
      } else if (this.resizeDirection) {
        this.resizeShape(diff);
      } else if (this.shapeBeingMoved) {
        this.moveShape(diff);
      }
    },
    onMouseDown(event) {
      if (this.addingShape) {
        const rect = this.$refs.workspace.getBoundingClientRect();
        this.workspacePosition = { x: rect.left, y: rect.top };
        this.initialPointerPosition = { x: event.x, y: event.y };
        this.initialNewShapePosition = {
          left: event.x - this.workspacePosition.x,
          top: event.y - this.workspacePosition.y
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
            value: this.initialNewShapePosition.left
          },
          top: {
            units: "px",
            value: this.initialNewShapePosition.top
          }
        };
        store.dispatch("setShapeToBeAdded", this.shapeBeingAdded);
      }
    },
    onMouseUp() {
      this.initialPointerPosition = null;
      this.initialShapeProps = null;
      this.resizeDirection = null;
      this.shapeBeingMoved = null;
      if (this.addingShape) {
        store
          .dispatch("addShape", {
            layerName: store.getters.selectedLayer,
            shape: store.getters.shapeToBeAdded
          })
          .then(newShape => {
            store.dispatch("selectShape", newShape);
          });
        this.shapeBeingAdded = null;
      } else {
        store.dispatch("unselectShape");
      }
    },
    onResizeHandleMouseDown(direction, event) {
      const shape = store.getters.selectedShape;
      if (!shape) {
        return;
      }
      this.resizeDirection = direction;
      const rect = this.$refs.workspace.getBoundingClientRect();
      this.workspacePosition = { x: rect.left, y: rect.top };
      this.initialPointerPosition = { x: event.x, y: event.y };
      this.initialShapeProps = {
        left: { ...shape.left },
        top: { ...shape.top },
        width: { ...shape.width },
        height: { ...shape.height }
      };
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
      this.initialShapeProps = {
        left: { ...shape.left },
        top: { ...shape.top },
        width: { ...shape.width },
        height: { ...shape.height }
      };
      store.dispatch("selectShape", shape);
    },
    onShapeMouseUp(shape, event) {
      if (this.addingShape) {
        return;
      }
      event.stopPropagation();
      this.initialPointerPosition = null;
      this.initialShapeProps = null;
      this.resizeDirection = null;
      this.shapeBeingMoved = null;
    },
    resizeShape(diff) {
      store.dispatch("resizeShape", {
        diff,
        direction: this.resizeDirection,
        initialShapeProps: this.initialShapeProps,
        shape: store.getters.selectedShape
      });
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

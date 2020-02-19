<template>
  <div class="workspace" ref="workspace" :class="{ 'adding-shape': addingShape }">
    <pinch-zoom ref="zoom">
      <div
        class="pinch-zoom-wrapper"
        v-on:mousemove="onDrag"
        v-on:mousedown="onMouseDown"
        v-on:mouseup="onMouseUp"
        ref="pinch"
      >
        <Canvas />
        <div class="overlays">
          <ShapeOverlay
            v-for="shape in shapes"
            :shape="shape"
            :onMouseDown="onShapeMouseDown"
            :onMouseUp="onShapeMouseUp"
            :onResizeHandleMouseDown="onResizeHandleMouseDown"
            :key="shape.id"
          />
        </div>
      </div>
    </pinch-zoom>
  </div>
</template>

<script>
import store from "@/store";
import Canvas from "@/components/Canvas";
import ShapeOverlay from "@/components/ShapeOverlay";
import "pinch-zoom-element";
export default {
  data() {
    return {
      currentAction: null,
      initialNewShapePosition: null,
      initialShapeProps: null,
      initialMousePosition: null,
      initialPointerPosition: null,
      resizeDirection: null,
      shapeBeingAdded: null,
      shapeBeingMoved: null,
      viewport: {
        offset: {
          left: 0,
          top: 0
        },
        zoom: 1
      }
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
      event.stopPropagation();
      if (!this.initialMousePosition) {
        return;
      }
      const { x, y } = this.transformCoords({ x: event.x, y: event.y });
      const diff = {
        left: x - this.initialMousePosition.x,
        top: y - this.initialMousePosition.y
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
      event.stopPropagation();
      if (this.addingShape) {
        const rect = this.$refs.workspace.getBoundingClientRect();
        this.workspacePosition = { x: rect.left, y: rect.top };
        this.initialMousePosition = this.transformCoords({
          x: event.x,
          y: event.y
        });
        this.initialNewShapePosition = {
          left: this.initialMousePosition.x - this.workspacePosition.x,
          top: this.initialMousePosition.y - this.workspacePosition.y
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
      this.initialMousePosition = null;
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
      event.stopPropagation();
      const shape = store.getters.selectedShape;
      if (!shape) {
        return;
      }
      this.resizeDirection = direction;
      const rect = this.$refs.workspace.getBoundingClientRect();
      this.workspacePosition = { x: rect.left, y: rect.top };
      this.initialMousePosition = this.transformCoords({
        x: event.x,
        y: event.y
      });
      this.initialShapeProps = {
        left: { ...shape.left },
        top: { ...shape.top },
        width: { ...shape.width },
        height: { ...shape.height }
      };
    },
    onShapeMouseDown(shape, event) {
      event.stopPropagation();
      if (this.addingShape) {
        return;
      }
      this.shapeBeingMoved = shape;
      const rect = this.$refs.workspace.getBoundingClientRect();
      this.workspacePosition = { x: rect.left, y: rect.top };
      this.initialMousePosition = this.transformCoords({
        x: event.x,
        y: event.y
      });
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
      this.initialMousePosition = null;
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
    },
    preventZoom(event) {
      // console.log(this.addingShape, this.initialShapeProps);
      // if (this.addingShape || this.initialShapeProps) {
      //   }
      event.stopPropagation();
    },
    transformCoords({ x, y }) {
      const viewportTransform = {
        x: this.$refs.zoom.x,
        y: this.$refs.zoom.y,
        scale: this.$refs.zoom.scale
      };
      return {
        x: x / viewportTransform.scale - viewportTransform.x,
        y: y / viewportTransform.scale - viewportTransform.y
      };
    }
  },
  mounted() {
    this.$refs.pinch.addEventListener("touchstart", this.preventZoom);
    this.$refs.pinch.addEventListener("touchmove", this.preventZoom);
    this.$refs.pinch.addEventListener("mousemove", this.preventZoom);
    this.$refs.pinch.addEventListener("pointerdown", this.preventZoom);
    this.$refs.pinch.addEventListener("pointermove", this.preventZoom);
    this.$refs.pinch.addEventListener("mousedown", this.preventZoom);
    // this.$refs.pinch.addEventListener("wheel", this.preventZoom);
  },
  beforeDestroy() {
    this.$refs.workspace.removeEventListener("touchstart", this.touchstart);
  },
  computed: {
    addingShape() {
      return !!store.getters.shapeToBeAdded;
    },
    shapes() {
      return store.getters.shapes;
    },
    viewportTransform() {
      return {
        x: this.$refs.zoom.x,
        y: this.$refs.zoom.y,
        scale: this.$refs.zoom.scale
      };
    }
  }
};
</script>

<style scoped>
.workspace,
pinch-zoom {
  height: 100%;
}
.workspace {
  background-color: var(--panel-border-color);
}
.canvas {
  background-color: white;
}
.workspace.adding-shape {
  cursor: crosshair;
}
.pinch-zoom-wrapper {
  width: 100%;
  height: 100%;
}
.overlays {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>

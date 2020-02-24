<template>
  <div class="workspace" ref="workspace" :class="{ 'adding-shape': addingShape }">
    <pinch-zoom ref="pinchZoom">
      <div
        class="pinch-zoom-wrapper"
        v-on:mousemove="onDrag"
        v-on:mousedown="onMouseDown"
        v-on:mouseup="onMouseUp"
        v-on:pointermove="onDrag"
        v-on:pointerdown="onMouseDown"
        ref="pinchZoomInner"
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
    <div class="reset-zoom" v-if="zoomLevel && zoomLevel !== 1">
      <p class="zoom-value">Zoom: {{zoomLevel | decimals(2)}}x</p>
      <button v-on:click="resetZoom">Reset</button>
    </div>
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
      },
      zoomLevel: null
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
      if (!this.initialMousePosition) {
        return;
      }
      event.stopPropagation();
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
      if (this.addingShape) {
        event.stopPropagation();
        const rect = this.$refs.workspace.getBoundingClientRect();
        this.workspacePosition = { x: rect.left, y: rect.top };
        this.initialMousePosition = this.transformCoords({
          x: event.x,
          y: event.y
        });
        const { x, y } = this.transformCoords({
          x: event.x - this.workspacePosition.x,
          y: event.y - this.workspacePosition.y
        });
        this.initialNewShapePosition = {
          left: x,
          top: y
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
      } else {
        store.dispatch("unselectShape");
       }
    },
    onMouseUp(event) {
      event.stopPropagation();
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
      if (this.addingShape) {
        return;
      }
      event.stopPropagation();
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
      store.dispatch("updateProject");
    },
    resetZoom() {
      this.$refs.pinchZoom.setTransform({ scale: 1, x: 0, y: 0 });
      this.updateZoomLevel();
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
      event.stopPropagation();
    },
    transformCoords({ x, y }) {
      const viewportTransform = {
        x: this.$refs.pinchZoom.x,
        y: this.$refs.pinchZoom.y,
        scale: this.$refs.pinchZoom.scale
      };
      return {
        x: (x - viewportTransform.x) / viewportTransform.scale,
        y: (y - viewportTransform.y) / viewportTransform.scale
      };
    },
    updateZoomLevel() {
      this.zoomLevel = this.$refs.pinchZoom.scale;
    }
  },
  mounted() {
    this.$refs.pinchZoomInner.addEventListener("wheel", this.updateZoomLevel);
  },
  beforeDestroy() {
    this.$refs.workspace.removeEventListener("wheel", this.updateZoomLevel);
  },
  computed: {
    addingShape() {
      return !!store.getters.shapeToBeAdded;
    },
    shapes() {
      return store.getters.shapes;
    }
  },
  filters: {
    decimals(n, desiredDecimals) {
      if (!desiredDecimals) {
        return Math.round(n);
      }
      const rounded =
        Math.round(n * Math.pow(10, desiredDecimals)) /
        Math.pow(10, desiredDecimals);
      let str = String(rounded);
      const actualDecimalDigits = str.split(".")[1];
      let actualLength = 0;
      if (actualDecimalDigits === undefined) {
        str += ".";
      } else {
        actualLength = actualDecimalDigits.length;
      }
      for (let i = 0; i < desiredDecimals - actualLength; i++) {
        str += "0";
      }
      return str;
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
.reset-zoom {
  position: absolute;
  right: 210px;
  top: 10px;
  background-color: hsla(0, 0%, 92%, 0.5);
  padding: 0.5rem;
  border-radius: 0.25rem;
  text-align: right;
}
.reset-zoom .zoom-value {
  font-size: 0.75rem;
  margin: 0 0 0.25rem;
  text-align: left;
}
.workspace:not(.adding-shape) .overlay:not(.selected):hover {
  border: 1px solid hsl(200, 80%, 85%);
}
</style>

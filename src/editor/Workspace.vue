<template>
  <div class="workspace" ref="workspace" :class="{ 'adding-shape': addingShape }">
    <pinch-zoom ref="pinchZoom">
      <div
        class="pinch-zoom-wrapper"
        v-on:mousemove="onDrag"
        v-on:mousedown="onMouseDown"
        v-on:mouseup="onMouseUp"
        v-on:pointerdown="onMouseDown"
        ref="pinchZoomInner"
      >
        <div class="full-wrapper">
          <div class="canvas-wrapper" :class="'canvas-wrapper-' + projectId" ref="canvas">
            <Canvas :projectId="projectId" :shapesLayers="shapesLayers" />
          </div>
        </div>
        <div class="full-wrapper">
          <ShapeOverlays
            :onShapeMouseDown="onShapeMouseDown"
            :onShapeMouseUp="onShapeMouseUp"
            :projectId="projectId"
            :shapesLayers="shapesLayers"
          />
        </div>
      </div>
    </pinch-zoom>
    <ShapeResizeHandles
      v-if="selectedShape"
      :canvasPosition="canvasPosition"
      :shape="selectedShape"
      :viewportTransform="viewportTransform"
      :onMouseDown="onResizeHandleMouseDown"
      :onMouseUp="onMouseUp"
    />
    <div class="reset-zoom" v-if="zoomLevel && zoomLevel !== 1">
      <p class="zoom-value">Zoom: {{zoomLevel * 100 | decimals(0)}}%</p>
      <button v-on:click="resetZoom">Reset</button>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import Canvas from "./Canvas";
import { transformCoords } from "@/common/geometry";
import ShapeOverlays from "./ShapeOverlays";
import ShapeResizeHandles from "./ShapeResizeHandles";
import "pinch-zoom-element";
export default {
  data() {
    return {
      canvasPosition: null,
      currentAction: null,
      dragging: false,
      initialNewShapePosition: null,
      initialShapeProps: null,
      initialMousePosition: null,
      initialPointerPosition: null,
      resizeDirection: null,
      shapeBeingAdded: null,
      shapeBeingMoved: null,
      viewportTransform: {
        x: 0,
        y: 0,
        scale: 1
      }
    };
  },
  components: {
    Canvas,
    ShapeOverlays,
    ShapeResizeHandles
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
        left: { value: x },
        round: true
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
    onChange() {
      store.dispatch("updateProject");
      store.dispatch("setCurrentSnaps");
      store.dispatch("addSnapshot");
    },
    onDrag(event) {
      if (!this.initialMousePosition) {
        this.updateViewport();
        return;
      }
      event.stopPropagation();
      this.dragging = true;
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
        this.updateCanvasPosition();
        this.initialMousePosition = this.transformCoords({
          x: event.x,
          y: event.y
        });
        this.initialNewShapePosition = {
          left:
            (event.x - this.canvasPosition.x) / this.viewportTransform.scale,
          top: (event.y - this.canvasPosition.y) / this.viewportTransform.scale
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
            store
              .dispatch("selectShape", newShape)
              .then(() => store.dispatch("generateSnapPoints"));
          });
        this.shapeBeingAdded = null;
      }
      if (this.dragging) {
        this.onChange();
        this.dragging = false;
      }
    },
    onResizeHandleMouseDown(direction, event) {
      event.stopPropagation();
      const shape = store.getters.selectedShape;
      if (!shape) {
        return;
      }
      this.resizeDirection = direction;
      this.updateCanvasPosition();
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
      this.updateCanvasPosition();
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
      store
        .dispatch("selectShape", shape)
        .then(() => store.dispatch("generateSnapPoints"));
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
      if (this.dragging) {
        this.onChange();
        this.dragging = false;
      }
    },
    resetZoom() {
      this.$refs.pinchZoom.setTransform({ scale: 1, x: 0, y: 0 });
      this.updateViewport();
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
      return transformCoords({
        x,
        y,
        viewportTransform: this.viewportTransform
      });
    },
    updateCanvasPosition() {
      const canvasRect = this.$refs.canvas.getBoundingClientRect();
      this.canvasPosition = { x: canvasRect.left, y: canvasRect.top };
    },
    updateViewport() {
      // Use setTimeout to let the pinch-zoom web component render first,
      // so that we can access its updated properties.
      setTimeout(() => {
        this.updateCanvasPosition();
        this.viewportTransform = {
          x: this.$refs.pinchZoom.x,
          y: this.$refs.pinchZoom.y,
          scale: this.$refs.pinchZoom.scale
        };
      }, 0);
    }
  },
  mounted() {
    this.$refs.pinchZoomInner.addEventListener("wheel", this.updateViewport, {
      passive: true
    });
    this.updateCanvasPosition();
  },
  beforeDestroy() {
    this.$refs.pinchZoomInner.removeEventListener("wheel", this.updateViewport);
    store.dispatch("unselectShape");
  },
  computed: {
    addingShape() {
      return !!store.getters.shapeToBeAdded;
    },
    projectId() {
      return store.getters.currentProject.id;
    },
    selectedShape() {
      return store.getters.selectedShape;
    },
    shapes() {
      return store.getters.shapes;
    },
    shapesLayers() {
      return store.getters.allLayers;
    },
    zoomLevel() {
      return this.viewportTransform.scale;
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
  margin-left: var(--layers-width);
  margin-right: var(--shape-form-width);
}
.workspace.adding-shape {
  cursor: crosshair;
}
.pinch-zoom-wrapper {
  width: 100%;
  height: 100%;
}
.full-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
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

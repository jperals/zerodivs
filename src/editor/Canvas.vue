<template>
  <div class="canvas-wrapper">
    <div class="canvas">
      <div class="overlays">
        <div class="overlays--main">
          <ShapeOverlay
            v-for="shape in shapesMain"
            :shape="shape"
            :onMouseDown="onShapeMouseDown"
            :onMouseUp="onShapeMouseUp"
            :onResizeHandleMouseDown="onResizeHandleMouseDown"
            :key="shape.id"
          />
        </div>
        <div class="overlays--before">
          <ShapeOverlay
            v-for="shape in shapesBefore"
            :shape="shape"
            :onMouseDown="onShapeMouseDown"
            :onMouseUp="onShapeMouseUp"
            :onResizeHandleMouseDown="onResizeHandleMouseDown"
            :key="shape.id"
          />
        </div>
        <div class="overlays--after">
          <ShapeOverlay
            v-for="shape in shapesAfter"
            :shape="shape"
            :onMouseDown="onShapeMouseDown"
            :onMouseUp="onShapeMouseUp"
            :onResizeHandleMouseDown="onResizeHandleMouseDown"
            :key="shape.id"
          />
        </div>
      </div>
    </div>
    <v-style type="text/css">
      .canvas,
      .overlays {
      {{ mainCustomStyle }}
      }
    </v-style>
    <v-style type="text/css" v-if="isMainActive">
      .canvas {
      {{ mainStyle }}
      }
    </v-style>
    <v-style type="text/css" v-if="isBeforeActive">
      .canvas:before,
      .overlays--before {
      {{ beforeStyle }}
      }
    </v-style>
    <v-style type="text/css" v-if="isAfterActive">
      .canvas:after,
      .overlays--after {
      {{ afterStyle }}
      }
    </v-style>
  </div>
</template>

<script>
import { get } from "lodash";
import store from "@/store";
import ShapeOverlay from "./ShapeOverlay";
import shapes2css from "@/common/shapes2css";
export default {
  props: {
    onShapeMouseDown: Function,
    onShapeMouseUp: Function,
    onResizeHandleMouseDown: Function,
    shapes: Array
  },
  components: {
    ShapeOverlay
  },
  computed: {
    mainCustomStyle() {
      return store.getters.extraStyles("main");
    },
    mainStyle() {
      const snapShapes = [];
      const snaps = store.getters.currentSnaps;
      const snapX = get(snaps, "x");
      const color = "khaki";
      if (snapX) {
        const position =
          snapX.location === "left" ? snapX.point.value - 1 : snapX.point.value;
        snapShapes.push({
          type: "linear",
          direction: "to right",
          left: { value: position, units: "px" },
          top: { value: 0, units: "px" },
          width: { value: 1, units: "px" },
          height: { value: 100, units: "%" },
          stops: [{ color }, { color }]
        });
      }
      const snapY = get(snaps, "y");
      if (snapY) {
        const position =
          snapY.location === "top" ? snapY.point.value - 1 : snapY.point.value;
        snapShapes.push({
          type: "linear",
          direction: "to bottom",
          left: { value: 0, units: "%" },
          top: { value: position, units: "px" },
          width: { value: 100, units: "%" },
          height: { value: 1, units: "px" },
          stops: [{ color }, { color }]
        });
      }
      const shapes = snapShapes.concat(this.shapesMain);
      return shapes2css(shapes);
    },
    beforeStyle() {
      const shapes = this.shapesBefore;
      return store.getters.extraStyles("before") + shapes2css(shapes);
    },
    afterStyle() {
      const shapes = this.shapesAfter;
      return store.getters.extraStyles("after") + shapes2css(shapes);
    },
    isMainActive() {
      return store.getters.isLayerActive("main");
    },
    isBeforeActive() {
      return store.getters.isLayerActive("before");
    },
    isAfterActive() {
      return store.getters.isLayerActive("after");
    },
    shapesMain() {
      return store.getters.layerShapes("main");
    },
    shapesBefore() {
      return store.getters.layerShapes("before");
    },
    shapesAfter() {
      return store.getters.layerShapes("after");
    }
  }
};
</script>

<style scoped>
.canvas-wrapper {
  height: 100%;
  width: 100%;
  position: absolute;
}
.overlays {
  position: absolute;
  top: 0;
  margin: 0;
  background-color: transparent;
}
.overlays,
.overlays--main,
.overlays--before,
.overlays--after {
  pointer-events: none;
}
.overlay {
  pointer-events: all;
}
</style>

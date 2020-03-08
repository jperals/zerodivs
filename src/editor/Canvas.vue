<template>
  <div class="overlays-wrapper">
    <div class="overlays" :class="'overlays-' + projectId">
      <div class="overlays--main">
        <ShapeOverlay
          v-for="shape in shapesMain"
          :shape="shape"
          :onMouseDown="onShapeMouseDown"
          :onMouseUp="onShapeMouseUp"
          :key="shape.id"
        />
      </div>
      <div class="overlays--before">
        <ShapeOverlay
          v-for="shape in shapesBefore"
          :shape="shape"
          :onMouseDown="onShapeMouseDown"
          :onMouseUp="onShapeMouseUp"
          :key="shape.id"
        />
      </div>
      <div class="overlays--after">
        <ShapeOverlay
          v-for="shape in shapesAfter"
          :shape="shape"
          :onMouseDown="onShapeMouseDown"
          :onMouseUp="onShapeMouseUp"
          :key="shape.id"
        />
      </div>
    </div>
    <v-style type="text/css">
      .canvas-{{projectId}},
      .canvas-{{projectId}} .overlays {
      {{ mainCustomStyle }}
      }
    </v-style>
    <v-style type="text/css" v-if="isMainActive">
      .canvas-{{projectId}} {
      {{ mainStyle }}
      }
    </v-style>
    <v-style type="text/css" v-if="isBeforeActive">
      .canvas-{{projectId}}:before,
      .canvas-{{projectId}} .overlays--before {
      {{ beforeStyle }}
      }
    </v-style>
    <v-style type="text/css" v-if="isAfterActive">
      .canvas-{{projectId}}:after,
      .canvas-{{projectId}} .overlays--after {
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
    projectId: String,
    shapesLayers: Object
  },
  components: {
    ShapeOverlay
  },
  computed: {
    mainCustomStyle() {
      return this.shapesLayers.main.extraStyles;
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
      const shapes = this.shapesMain.concat(snapShapes);
      return shapes2css(shapes);
    },
    beforeStyle() {
      const shapes = this.shapesBefore;
      return this.layerExtraStyles("before") + shapes2css(shapes);
    },
    afterStyle() {
      const shapes = this.shapesAfter;
      return this.layerExtraStyles("after") + shapes2css(shapes);
    },
    isMainActive() {
      return this.isLayerActive("main");
    },
    isBeforeActive() {
      return this.isLayerActive("before");
    },
    isAfterActive() {
      return this.isLayerActive("after");
    },
    shapesMain() {
      const shapes = this.getLayerShapes("main");
      if (this.shapeToBeAdded && store.getters.selectedLayer === "main") {
        return shapes.concat([this.shapeToBeAdded]);
      }
      return shapes;
    },
    shapesBefore() {
      const shapes = this.getLayerShapes("before");
      if (this.shapeToBeAdded && store.getters.selectedLayer === "before") {
        return shapes.concat([this.shapeToBeAdded]);
      }
      return shapes;
    },
    shapesAfter() {
      const shapes = this.getLayerShapes("after");
      if (this.shapeToBeAdded && store.getters.selectedLayer === "after") {
        return shapes.concat([this.shapeToBeAdded]);
      }
      return shapes;
    },
    shapeToBeAdded() {
      return (
        typeof get(store.getters, "shapeToBeAdded.top.value") === "number" &&
        typeof get(store.getters, "shapeToBeAdded.left.value") === "number" &&
        typeof get(store.getters, "shapeToBeAdded.width.value") === "number" &&
        typeof get(store.getters, "shapeToBeAdded.height.value") === "number" &&
        store.getters.shapeToBeAdded
      );
    }
  },
  methods: {
    getLayerShapes(layerName) {
      return this.shapesLayers[layerName].shapes;
    },
    isLayerActive(layerName) {
      return this.shapesLayers[layerName].active;
    },
    layerExtraStyles(layerName) {
      return this.shapesLayers[layerName].extraStyles;
    }
  }
};
</script>

<style scoped>
.overlays-wrapper {
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0;
}
.overlays {
  position: absolute;
  top: 0;
  margin: 0;
  background-color: transparent !important;
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

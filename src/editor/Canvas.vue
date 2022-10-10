<template>
  <div class="canvas" :class="'canvas-' + projectId">
    <component :is="'style'" type="text/css">
      .canvas-wrapper-{{ projectId }} {
      {{ mainCustomStyle }}
      }
    </component>
    <component :is="'style'" type="text/css" v-if="isMainActive">
      .canvas-{{ projectId }} {
      {{ mainStyle }}
      }
    </component>
    <component :is="'style'" type="text/css" v-if="isBeforeActive">
      .canvas-{{ projectId }}:before {
      {{ beforeStyle }}
      }
    </component>
    <component :is="'style'" type="text/css" v-if="isAfterActive">
      .canvas-{{ projectId }}:after {
      {{ afterStyle }}
      }
    </component>
  </div>
</template>

<script>
import { get } from "lodash";
import store from "@/store";
import shapes2css from "@/common/shapes2css";
export default {
  props: {
    projectId: String,
    shapesLayers: Object
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
.canvas {
  width: 100%;
  height: 100%;
}
</style>

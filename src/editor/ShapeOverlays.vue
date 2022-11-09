<template>
  <div class="overlays-wrapper">
    <div class="overlays" :class="'overlays-' + projectId">
      <div class="overlays--main" v-if="isMainActive">
        <ShapeOverlay
          v-for="shape in shapesMain"
          :shape="shape"
          :onMouseDown="onShapeMouseDown"
          :onMouseUp="onShapeMouseUp"
          :key="shape.id"
        />
      </div>
      <div class="overlays--before" v-if="isBeforeActive">
        <ShapeOverlay
          v-for="shape in shapesBefore"
          :shape="shape"
          :onMouseDown="onShapeMouseDown"
          :onMouseUp="onShapeMouseUp"
          :key="shape.id"
        />
      </div>
      <div class="overlays--after" v-if="isAfterActive">
        <ShapeOverlay
          v-for="shape in shapesAfter"
          :shape="shape"
          :onMouseDown="onShapeMouseDown"
          :onMouseUp="onShapeMouseUp"
          :key="shape.id"
        />
      </div>
    </div>
    <component :is="'style'" type="text/css">
      .overlays-{{ projectId }} {
      {{ mainCustomStyle }}
      }
    </component>
    <component :is="'style'" type="text/css" v-if="isBeforeActive">
      .overlays-{{ projectId }} .overlays--before {
      {{ beforeStyle }}
      }
    </component>
    <component :is="'style'" type="text/css" v-if="isAfterActive">
      .overlays-{{ projectId }} .overlays--after {
      {{ afterStyle }}
      }
    </component>
  </div>
</template>

<script>
import ShapeOverlay from "./ShapeOverlay.vue";
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
      return this.getLayerShapes("main");
    },
    shapesBefore() {
      return this.getLayerShapes("before");
    },
    shapesAfter() {
      return this.getLayerShapes("after");
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

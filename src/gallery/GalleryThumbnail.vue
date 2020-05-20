<template>
  <div class="thumbnail-wrapper" :class="'thumbnail-wrapper-' + projectId" v-if="shapesLayers" :style="offsetStyle">
    <div class="thumbnail" :class="'thumbnail-' + projectId"></div>
    <v-style type="text/css">
      .thumbnail-wrapper-{{projectId}} {
      {{ mainCustomStyle }}
      }
    </v-style>
    <v-style type="text/css" v-if="isMainActive">
      .thumbnail-{{projectId}} {
      {{ mainStyle }}
      }
    </v-style>
    <v-style type="text/css" v-if="isBeforeActive">
      .thumbnail-{{projectId}}:before {
      {{ beforeStyle }}
      }
    </v-style>
    <v-style type="text/css" v-if="isAfterActive">
      .thumbnail-{{projectId}} {
      {{ afterStyle }}
      }
    </v-style>
  </div>
</template>

<script>
import store from "@/store";
import shapes2css from "@/common/shapes2css";
export default {
  props: {
    projectId: String
  },
  computed: {
    mainCustomStyle() {
      return this.shapesLayers.main.extraStyles;
    },
    mainStyle() {
      return shapes2css(this.shapesMain);
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
    offset() {
      const allShapes = this.shapesMain.concat(this.shapesBefore).concat(this.shapesAfter);
      if (!allShapes.length) {
        return {x: 0, y: 0};
      }
      let minLeft = Infinity;
      let minTop = Infinity;
      for(const shape of allShapes) {
        minLeft = Math.min(minLeft, shape.left.value);
        minTop = Math.min(minTop, shape.top.value);
      }
      return {x: minLeft, y: minTop};
    },
    offsetStyle() {
      return {
        minHeight: `calc(100% + ${this.offset.y}px)`,
        left: '0',
        margin: '0',
        top: '0',
        transform: `translate(${-this.offset.x}px, ${-this.offset.y}px)`,
        minWidth: `calc(100% + ${this.offset.x}px)`
      };
    },
    shapesLayers() {
      return store.getters.shapesLayersByProjectId(this.projectId);
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
.thumbnail {
  width: 100%;
  height: 100%;
}
</style>
<template>
  <pre>
div {
  {{ mainCustomStyle }}{{ mainStyle }}}
div:before {
{{ beforeStyle }}}
div:after {
{{ afterStyle }}}
  </pre>
</template>

<script>
import shapes2css from "@/common/shapes2css";
import store from "@/store";
export default {
  computed: {
    mainCustomStyle() {
      return this.layerExtraStyles("main");
    },
    mainStyle() {
      return shapes2css(this.shapesMain, "  ");
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
    shapesLayers() {
      return store.getters.allLayers;
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
      const rawString = this.shapesLayers[layerName].extraStyles || "";
      return rawString.replace(
        /\n[^$]/g,
        (match, char) => "\n  " + rawString[char + 1]
      );
    },
    close() {
      this.$router.push({name: "editor"});
    }
  }
};
</script>

<style scoped>
pre {
  white-space: pre-wrap;
}
</style>

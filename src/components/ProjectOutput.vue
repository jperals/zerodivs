<template>
  <div class="output">
    <button class="close-button" v-on:click="close">Close</button>
    <pre>
div {
  {{ mainCustomStyle }}{{ mainStyle }}}
div:before {
{{ beforeStyle }}}
div:after {
{{ afterStyle }}}
      </pre>
  </div>
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
      store.dispatch("toggleOutput", false);
    }
  }
};
</script>

<style scoped>
.output {
  padding: 2rem;
  font-family: "Courier New", Courier, monospace;
  background: white;
}
.output:after {
  position: absolute;
  content: "";
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: -10;
}
pre {
  background-color: hsl(200, 50%, 95%);
  padding: 1rem;
  border-radius: 0.25rem;
  border: 1px solid var(--panel-border-color);
  margin-bottom: 0;
  white-space: pre-wrap;
}
</style>

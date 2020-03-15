<template>
  <form action="https://codepen.io/pen/define" method="POST" target="_blank">
    <input type="hidden" name="data" :value="value" />
    <input type="submit" value="Export to CodePen" />
  </form>
</template>

<script>
import layers2css from "@/common/layers2css";
import store from "@/store";
export default {
  computed: {
    value() {
      return JSON.stringify({
        css: layers2css({ layers: this.shapesLayers }),
        editors: "110",
        layout: "left",
        html: "<div></div>",
        title: "New Pen!"
      });
    },
    shapesLayers() {
      return store.getters.allLayers;
    }
  }
};
</script>

<style scoped>
</style>
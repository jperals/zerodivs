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
        title: "New Pen!",
        html: "<div></div>",
        css: layers2css({ layers: this.shapesLayers })
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
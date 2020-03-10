<template>
  <pre>
{{ css }}
  </pre>
</template>

<script>
import layers2css from "@/common/layers2css";
import store from "@/store";
export default {
  computed: {
    css() {
      return layers2css({layers: this.shapesLayers});
    },
    shapesLayers() {
      return store.getters.allLayers;
    }
  },
  methods: {
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

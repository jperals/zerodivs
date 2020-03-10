<template>
  <pre>
{{ jsonResult }}
  </pre>
</template>

<script>
import store from "@/store";
export default {
  computed: {
    jsonResult() {
      return store.getters.allLayers;
    }
  }
};
</script>

<style scoped>
pre {
  white-space: pre-wrap;
}
</style>

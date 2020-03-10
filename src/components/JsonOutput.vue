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
  background-color: hsl(200, 50%, 95%);
  padding: 1rem;
  border-radius: 0.25rem;
  border: 1px solid var(--panel-border-color);
  margin-bottom: 0;
  white-space: pre-wrap;
}
</style>

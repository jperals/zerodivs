<template>
  <ul class="layers panel">
    <LayerSubtree layerName="main" />
    <LayerSubtree layerName="before" />
    <LayerSubtree layerName="after" />
  </ul>
</template>

<script>
import LayerSubtree from "./LayerSubtree";
export default {
  components: {
    LayerSubtree
  }
};
</script>

<style scoped>
.layers {
  background-color: var(--panel-bg-color);
  margin: 0;
  padding-left: 0;
  width: var(--layers-width);
  border-right: 1px solid var(--panel-border-color);
  overflow-y: auto;
}
ul {
  list-style: none;
}
</style>

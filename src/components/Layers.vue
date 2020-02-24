<template>
  <ul class="layers panel">
    <LayerSubtree layerName="main" />
    <LayerSubtree layerName="before" />
    <LayerSubtree layerName="after" />
  </ul>
</template>

<script>
import store from "@/store";
import LayerSubtree from "@/components/LayerSubtree";
export default {
  components: {
    LayerSubtree
  },
  computed: {
    shapes() {
      return store.getters.shapes;
    }
  }
};
</script>

<style scoped>
.layers {
  background-color: var(--panel-bg-color);
  margin: 0;
  padding-left: 0;
  width: 160px;
  border-right: 1px solid var(--panel-border-color);
  overflow-y: auto;
}
ul {
  list-style: none;
}
</style>

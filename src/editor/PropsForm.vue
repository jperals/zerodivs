<template>
  <form class="props panel">
    <LayerPropsFormFields v-if="layerName" :layer-name="layerName" />
    <ShapePropsFormFields v-if="shape" :shape="shape" />
  </form>
</template>

<script>
import LayerPropsFormFields from "./LayerPropsFormFields.vue";
import ShapePropsFormFields from "./ShapePropsFormFields.vue";
import store from "@/store";
export default {
  components: {
    LayerPropsFormFields,
    ShapePropsFormFields
  },
  computed: {
    layerName() {
      return !this.shape && store.getters.selectedLayer;
    },
    shape() {
      return store.getters.selectedShape;
    }
  }
};
</script>

<style scoped>
form {
  background-color: var(--panel-bg-color);
  margin: 0;
  padding-right: 0;
  width: var(--shape-form-width);
  height: 100%;
  border-left: 1px solid var(--panel-border-color);
  overflow-x: visible;
  overflow-y: auto;
}
</style>

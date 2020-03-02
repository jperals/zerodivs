<template>
  <textarea v-model="style" />
</template>

<script>
import store from "@/store";
export default {
  props: {
    layerName: String
  },
  computed: {
    style: {
      get() {
        return store.getters.extraStyles(this.layerName);
      },
      set(value) {
        store.dispatch("setExtraStyles", {layerName: this.layerName, styles: value});
      }
    }
  }
}
</script>

<style scoped>
textarea {
  width: 100%;
  min-height: 15rem;
}
</style>

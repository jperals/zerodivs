<template>
  <ColorPicker
    v-model="currentColor"
    :on-pick="selectColor"
    class="current-color-picker"
    anchor="top"
    id="current-color"
  />
</template>

<script>
import ColorPicker from "@/components/ColorPicker";
import store from "@/store";
export default {
  components: { ColorPicker },
  computed: {
    currentColor() {
      return store.getters.currentColor;
    }
  },
  methods: {
    selectColor(color) {
      store.dispatch("selectColor", color);
    }
  }
};
</script>

<style scoped>
.current-color-picker {
  --side: 1.75rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  box-sizing: border-box;
}
</style>

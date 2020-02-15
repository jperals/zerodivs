<template>
  <ColorPicker v-model="currentColor" :on-pick="selectColor" />
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

<style scoped lang="scss">
$side: 2rem;
.color-picker {
  height: 2rem;
}
</style>

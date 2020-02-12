<template>
  <div class="color-picker">
    <input type="text" v-model="color" />
    <span class="sample" :style="{ backgroundColor: color }" />
  </div>
</template>

<script>
import store from "@/store";
export default {
  computed: {
    color: {
      get () {
        return store.getters.currentColor;
      },
      set (value) {
        store.dispatch("selectColor", value);
      }
    }
  }
};
</script>

<style scoped>
.color-picker {
  display: flex;
  flex-direction: row;
}
.sample {
  display: inline-block;
  height: 1.5rem;
  width: 1.5rem;
}
</style>

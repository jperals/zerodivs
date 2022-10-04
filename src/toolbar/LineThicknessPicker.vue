<template>
  <label
    >Line width&nbsp;<input type="text" class="w-m" v-model="lineThickness"
  /></label>
</template>

<script>
import store from "@/store";

export default {
  computed: {
    lineThickness: {
      get() {
        return store.getters.lineThickness;
      },
      set(value) {
        store.dispatch("setLineThickness", value);
      }
    }
  }
};
</script>

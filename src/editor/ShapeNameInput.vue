<template>
  <span>
    <input class="shape-name" type="text" v-model="shapeName" />
  </span>
</template>

<script>
import store from "@/store";
export default {
  props: {
    selected: Boolean,
    shape: Object
  },
  computed: {
    shapeName: {
      get() {
        return this.shape.name;
      },
      set(value) {
        store.dispatch("updateShape", { shape: this.shape, name: value });
      }
    }
  }
};
</script>

<style scoped>
.shape-name {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  display: inline-block;
}
.shape-name.span {
  border: 1px solid transparent;
}
input {
  border-radius: 0.25rem;
  border: 1px solid var(--gray-300);
  margin-left: -0.25rem;
}
input:not(:hover):not(:focus) {
  background-color: transparent;
  border-color: transparent;
}
</style>

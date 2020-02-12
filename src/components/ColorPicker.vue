<template>
  <div class="color-picker">
    <input type="text" v-model="color" />
    <span class="sample" :style="{ backgroundColor: color }" />
    <input type="color" v-on:change="selectColor" :style="{ backgroundColor: color }" />
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
  },
  methods: {
    selectColor(event) {
      store.dispatch("selectColor", event.target.value);
    }
  }
};
</script>

<style scoped>
.color-picker {
  display: flex;
  flex-direction: row;
}
input[type="text"] {
  width: 15ch;
}
input[type="color"] {
  opacity: 0;
  height: 1.5rem;
  width: 1.5rem;
  margin-left: -1.5rem;
  border: 0 none;
  padding: 0;
}
.sample {
  display: inline-block;
  height: 1.5rem;
  width: 1.5rem;
}
</style>

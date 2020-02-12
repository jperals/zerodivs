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

<style scoped lang="scss">
$side: 1.5rem;
.color-picker {
  height: $side;
  display: flex;
  flex-direction: row;
}
.color-picker > * {
  height: 100%;
}
input[type="text"] {
  display: inline-block;
  width: 15ch;
  box-sizing: border-box;
  border: 1px solid lightgray;
  border-right: 0 none;
}
input[type="color"] {
  opacity: 0;
  width: $side;
  margin-left: - $side;
  border: 0 none;
  padding: 0;
}
.sample {
  display: inline-block;
  width: $side;
}
</style>

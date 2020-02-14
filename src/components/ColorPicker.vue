<template>
  <div class="color-picker">
    <input type="text" v-model="selectedColor" />
    <span class="sample" :style="{ backgroundColor: selectedColor }" />
    <input type="color" v-on:change="selectColor" :style="{ backgroundColor: selectedColor }" />
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    onPick: Function
  },
  computed: {
    selectedColor: {
      get() {
        return this.value;
      },
      set(value) {
        if (typeof this.onPick === "function") {
          this.onPick(value);
        }
      }
    }
  },
  methods: {
    selectColor(event) {
        if (typeof this.onPick === "function") {
          this.onPick(event.target.value);
        }
    }
  }
};
</script>

<style scoped lang="scss">
$side: 1.5rem;
$border-color: lightgray;
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
  border: 1px solid $border-color;
  border-right: 0 none;
}
input[type="color"] {
  opacity: 0;
  width: $side;
  margin-left: -$side;
  border: 0 none;
  padding: 0;
}
.sample {
  display: inline-block;
  width: $side;
  box-sizing: border-box;
  border: 1px solid $border-color;
}
</style>

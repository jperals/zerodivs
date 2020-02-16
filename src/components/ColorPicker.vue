<template>
  <div class="color-picker">
    <input type="text" v-model="selectedColor" />
    <span class="sample" :style="{ backgroundColor: selectedColor }">
      <input type="color" v-on:change="selectColor" :style="{ backgroundColor: selectedColor }" />
    </span>
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
$border-color: lightgray;
.color-picker {
  --side: 1.5rem;
  height: var(--side);
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
.sample {
  display: inline-block;
  width: var(--side);
  height: 100%;
  box-sizing: border-box;
  border: 1px solid $border-color;
}
input[type="color"] {
  opacity: 0;
  width: 100%;
  height: 100%;
  border: 0 none;
  padding: 0;
}
</style>

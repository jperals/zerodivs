<template>
  <div class="color-picker">
    <input type="text" v-model="selectedColor" />
    <span class="sample" :style="{ backgroundColor: selectedColor }" v-on:click="togglePicker"></span>
    <div class="color-modal" v-if="pickerOpen">
      <VColorPicker class="picker" v-model="selectedColorHex" />
    </div>
  </div>
</template>

<script>
import validateColor from 'validate-color';
import {VColorPicker} from 'vuetify/lib';
export default {
  props: {
    value: String,
    onPick: Function
  },
  data() {
    return {
      pickerOpen: false
    };
  },
  components: {
    VColorPicker
  },
  computed: {
    selectedColor: {
      get() {
        return this.value;
      },
      set(value) {
        this.selectColor(value);
      }
    },
    selectedColorHex: {
      get() {
        return this.value;
      },
      set(value) {
        this.selectColor(value);
      }
    }
  },
  methods: {
    selectColor(value) {
        if (typeof this.onPick === "function" && validateColor(value)) {
          this.onPick(value);
        }
    },
    togglePicker() {
      this.pickerOpen = !(this.pickerOpen);
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
  position: relative;
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
.color-modal {
  position: absolute;
  top: 100%;
  right: 0;
}
.color-modal .picker {
  margin: 0 auto;
}
</style>

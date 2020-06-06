<template>
  <div class="color-picker" :class="anchorClass" v-on:click="stopPropagation">
    <input type="text" v-model="selectedColor" />
    <span class="sample" :style="{ backgroundColor: selectedColor }" v-on:click="togglePicker"></span>
    <div class="color-modal" v-if="pickerOpen">
      <ChromeColorPicker class="picker" v-model="selectedColorHex" />
    </div>
  </div>
</template>

<script>
import convertCssColorNameToHex from "convert-css-color-name-to-hex";
import validateColor from "validate-color";
import { Chrome } from "vue-color";
export default {
  props: {
    anchor: {
      type: String,
      required: false
    },
    value: String,
    onPick: Function
  },
  data() {
    return {
      pickerOpen: false
    };
  },
  components: {
    ChromeColorPicker: Chrome
  },
  computed: {
    anchorClass() {
      return this.anchor ? `anchor-${this.anchor}` : undefined;
    },
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
        return convertCssColorNameToHex(this.value);
      },
      set(value) {
        this.selectColor(value.hex8);
      }
    }
  },
  methods: {
    closePicker() {
      this.pickerOpen = false;
    },
    openPicker() {
      this.pickerOpen = true;
    },
    selectColor(value) {
      if (typeof this.onPick === "function" && validateColor(value)) {
        this.onPick(value);
      }
    },
    stopPropagation(event) {
      event.stopPropagation();
    },
    togglePicker() {
      this.pickerOpen = !this.pickerOpen;
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
input[type="color"] {
  opacity: 0;
  width: 100%;
  height: 100%;
  border: 0 none;
  padding: 0;
}
.color-modal {
  position: absolute;
  top: 100%;
  right: 0;
}
.color-modal .picker {
  margin: 0 auto;
}
.color-picker.anchor-bottom-right .color-modal {
  right: calc(100% + 1rem);
  bottom: 0;
}
</style>

<template>
  <div class="color-picker" :class="{anchorClass, active: pickerOpen}" ref="container">
    <input type="text" v-model="selectedColor" />
    <span class="sample" :style="{ backgroundColor: selectedColor }" v-on:click="togglePicker"></span>
    <portal to="color-picker">
      <div class="color-modal" v-if="pickerOpen" v-on:click="closePicker" ref="modal">
        <ChromeColorPicker class="picker" v-model="selectedColorHex" :style="pickerStyle" />
      </div>
    </portal>
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
      pickerOpen: false,
      pickerStyle: null
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
    closePicker(event) {
      if (event.target === this.$refs.modal) {
        this.pickerOpen = false;
      }
    },
    openPicker() {
      this.pickerOpen = true;
    },
    selectColor(value) {
      if (typeof this.onPick === "function" && validateColor(value)) {
        this.onPick(value);
      }
    },
    togglePicker() {
      const box = this.$refs.container.getBoundingClientRect();
      this.pickerOpen = !this.pickerOpen;
      const padding = 20;
      this.pickerStyle = {
        top: box.top + box.height - 100 + "px",
        left: box.left - 100 + "px"
      };
      if (this.anchor) {
        if (this.anchor.includes("left")) {
          this.pickerStyle.left = box.left + box.width + padding + "px";
        }
        if (this.anchor.includes("right")) {
          this.pickerStyle.left = undefined;
          this.pickerStyle.right = (window.innerWidth - box.left) + padding + "px";
        }
        if (this.anchor.includes("top")) {
          this.pickerStyle.top = box.top + box.height + padding + "px";
        }
        if (this.anchor.includes("bottom")) {
          this.pickerStyle.top = undefined;
          this.pickerStyle.bottom = (window.innerHeight - box.top) + padding + "px";
        }
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
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.color-modal .picker {
  margin: 0 auto;
  position: absolute;
}
.color-picker.anchor-bottom-right .color-modal {
  right: calc(100% + 1rem);
  bottom: 0;
}
.color-picker.active input,
.color-picker.active .sample {
  border-color: var(--selected-color);
}
</style>

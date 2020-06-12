<template>
  <div class="color-picker" :class="{active: isPickerOpen}" ref="container">
    <input type="text" v-model="selectedColor" />
    <span class="sample" :style="{ backgroundColor: selectedColor }" v-on:click="togglePicker"></span>
    <portal to="color-picker">
      <div class="color-modal" v-if="isPickerOpen">
        <div class="picker-container" :class="anchorClass" :style="pickerStyle">
          <ChromeColorPicker class="picker" v-model="selectedColorHex" />
          <EdgeCloseButton :onClick="closePicker" />
        </div>
      </div>
    </portal>
  </div>
</template>

<script>
import convertCssColorNameToHex from "convert-css-color-name-to-hex";
import validateColor from "validate-color";
import { Chrome } from "vue-color";
import EdgeCloseButton from "@/components/EdgeCloseButton";
import store from "@/store";
export default {
  props: {
    anchor: {
      type: String,
      required: false
    },
    id: String,
    onPick: Function,
    value: String
  },
  data() {
    return {
      pickerStyle: null
    };
  },
  components: {
    ChromeColorPicker: Chrome,
    EdgeCloseButton
  },
  computed: {
    anchorClass() {
      return this.anchor ? `anchor-${this.anchor}` : undefined;
    },
    openColorPickerId() {
      return store.getters.openColorPickerId;
    },
    isPickerOpen() {
      return this.openColorPickerId === this.id;
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
  beforeDestroy() {
    if (this.isPickerOpen) {
      this.closePicker();
    }
  },
  methods: {
    closePicker() {
      store.dispatch("setOpenColorPickerId", null);
    },
    openPicker() {
      const box = this.$refs.container.getBoundingClientRect();
      store.dispatch("setOpenColorPickerId", this.id);
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
          this.pickerStyle.right =
            window.innerWidth - box.left + padding + "px";
        }
        if (this.anchor.includes("top")) {
          this.pickerStyle.top = box.top + box.height + padding + "px";
        }
        if (this.anchor.includes("bottom")) {
          this.pickerStyle.top = undefined;
          this.pickerStyle.bottom =
            window.innerHeight - box.top + padding + "px";
        }
      }
    },
    selectColor(value) {
      if (typeof this.onPick === "function" && validateColor(value)) {
        this.onPick(value);
      }
    },
    togglePicker() {
      if (this.isPickerOpen) {
        this.closePicker();
      } else {
        this.openPicker();
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
  overflow: visible;
}
.color-modal .picker-container {
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
  box-shadow: 0 0 5px var(--selected-color);
}
.picker-container {
  box-shadow: 0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3);
  background-color: white;
  padding-top: 1rem;
}
.picker-container .vc-chrome {
  box-shadow: none;
}
</style>

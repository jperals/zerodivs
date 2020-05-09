<template>
  <button v-on:click="undo" :class="{disabled: !canUndo}">
    <div class="icon" :style="style" />
  </button>
</template>

<script>
import shapes from "./undo-button-shapes";
import shapes2css from "@/common/shapes2css";
import store from "@/store";
export default {
  methods: {
    undo() {
      store.dispatch("undo");
      store.dispatch("unselectShape");
    }
  },
  data() {
    return {
      style: shapes2css(shapes)
    };
  },
  computed: {
    canUndo() {
      return store.getters.canUndo;
    }
  }
};
</script>

<style scoped>
button {
  height: 2rem;
  width: 2rem;
  margin: 2px;
  border-color: var(--panel-border-color-strong);
  border-radius: 2px;
  align-items: center;
  padding: 0;
  font-size: 0;
}
button:not(.disabled):hover {
  border-color: var(--panel-border-color-stronger);
  background-color: hsl(0, 0%, 97%);
}
.icon {
  margin: 0 auto;
  width: 71%;
  height: 80%;
}
button.disabled {
  cursor: default;
}
button.disabled .icon {
  opacity: .5;
}
</style>

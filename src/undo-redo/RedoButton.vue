<template>
  <button v-on:click="undo" :class="{disabled: !canRedo}">
    <div class="icon" :style="style" />
  </button>
</template>

<script>
import shapes from "./redo-button-shapes";
import shapes2css from "@/common/shapes2css";
import store from "@/store";
export default {
  methods: {
    undo() {
      store.dispatch("redo");
      store.dispatch("unselectShape");
      store.dispatch("updateProject");
    }
  },
  data() {
    return {
      style: shapes2css(shapes)
    };
  },
  computed: {
    canRedo() {
      return store.getters.canRedo;
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
  opacity: 0.5;
}
</style>

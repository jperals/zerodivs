<template>
  <div class="output">
    <button class="close-button" v-on:click="close">Close</button>
    <pre>{{ computedStyle }}</pre>
  </div>
</template>

<script>
import shapes2css from "@/shapes2css";
import store from "@/store";
export default {
  computed: {
    computedStyle() {
      const shapes = store.getters.visibleShapes;
      return shapes2css(shapes);
    }
  },
  methods: {
    close() {
      store.dispatch("toggleOutput", false);
    }
  }
};
</script>

<style scoped>
.output {
  padding: 2rem;
  font-family: "Courier New", Courier, monospace;
  background: white;
}
.output:after {
  position: absolute;
  content: "";
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: -10;
}
pre {
  background-color: hsl(200, 50%, 95%);
  padding: 1rem;
  border-radius: .25rem;
  border: 1px solid var(--panel-border-color);
  margin-bottom: 0;
  white-space: pre-line;
}
</style>

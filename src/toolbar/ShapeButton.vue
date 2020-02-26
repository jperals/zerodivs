<template>
  <ToolbarButton :style="style" :callback="addShape" />
</template>

<script>
import ToolbarButton from "./ToolbarButton";
import { formatImage } from "@/shapes2css";
import store from "@/store";
export default {
  props: {
    onSelect: {
      type: Function,
      require: false
    },
    shape: Object
  },
  components: {
    ToolbarButton
  },
  methods: {
    addShape() {
      if (typeof this.onSelect === "function") {
        this.onSelect();
      }
      store.dispatch("setShapeToBeAdded", this.shape);
      store.dispatch("unselectShape");
    }
  },
  computed: {
    style() {
      return {
        backgroundImage: formatImage(this.shape),
        backgroundSize: "60% 60%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      };
    }
  }
};
</script>

<style scoped>
</style>
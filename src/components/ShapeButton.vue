<template>
  <ToolbarButton :style="style" :callback="addShape" />
</template>

<script>
import ToolbarButton from "@/components/ToolbarButton";
import { formatImage } from "@/shapes2css";
import store from "@/store";
export default {
  props: {
    shape: Object
  },
  components: {
    ToolbarButton
  },
  methods: {
    addShape() {
      store.dispatch("setShapeToBeAdded", this.shape);
    }
  },
  data() {
    return {
      style: {
        backgroundImage: formatImage(this.shape),
        backgroundSize: "60% 60%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }
    };
  }
};
</script>

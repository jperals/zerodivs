<template>
  <ToolbarButton :style="style" :callback="callback" />
</template>

<script>
import ToolbarButton from "@/components/ToolbarButton";
import { formatImage } from "@/shapes2css";
export default {
  props: {
    callback: Function,
    shape: Object
  },
  components: {
    ToolbarButton
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

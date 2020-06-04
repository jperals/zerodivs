<template>
  <button v-on:click="onClick" :style="style" />
</template>

<script>
import shapes2css from "@/common/shapes2css";
export default {
  props: {
    onClick: {
      type: Function,
      required: false
    }
  },
  data() {
    const color = "white";
    const lineShape = {
      type: "linear",
      left: {
        units: "",
        value: "center"
      },
      top: {
        units: "",
        value: "center"
      },
      width: {
        units: "%",
        value: 60
      },
      height: {
        units: "%",
        value: 60
      },
      stops: [
        { color: "transparent", position: "40%" },
        { color, position: "40%" },
        { color, position: "60%" },
        { color: "transparent", position: "60%" }
      ]
    };
    const verticalLine = { ...lineShape, direction: "to right" };
    const horizontalLine = { ...lineShape, direction: "to bottom" };
    return {
      style: shapes2css([verticalLine, horizontalLine])
    };
  }
};
</script>

<style scoped>
button {
  background-color: var(--panel-border-color-stronger);
  border: 0 none;
}
</style>
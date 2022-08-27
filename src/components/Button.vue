<template>
  <button v-on:click="onClick" :style="style" />
</template>

<script>
import shapes2css from "@/common/shapes2css";
export default {
  props: {
    onClick: Function,
    shapes: Array
  },
  data() {
    return {
      style: this.shapes instanceof Array ? shapes2css(this.shapes) : ""
    };
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
}
button:hover {
  border-color: var(--panel-border-color-stronger);
  background-color: hsl(0, 0%, 97%);
}
</style>

<template>
  <button v-clipboard:copy="content" title="Copy to clipboard" :style="style">Copy</button>
</template>

<script>
import shapes2css from "@/common/shapes2css";
import shapes from "@/components/CopyButton/copy-button-shapes";
export default {
  props: {
    content: String
  },
  data() {
    return {
      style: shapes instanceof Array ? shapes2css(shapes) : ""
    };
  }
};
</script>

<style scoped>
button {
  min-height: 2rem;
  min-width: 27px;
  background-color: var(--gray-750);
  border: 0 none;
  font-size: 0;
}
button:hover {
  background-color: var(--gray-900);
}
</style>
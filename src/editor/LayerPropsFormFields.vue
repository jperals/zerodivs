<template>
  <codemirror
    v-model="style"
    :extensions="extensions"
    mode="css"
    height="auto"
    class="code-editor code-editor-extra-styles"
  />
</template>

<script>
import store from "@/store";
import { Codemirror } from "vue-codemirror";
import { css } from "@codemirror/lang-css";
export default {
  props: {
    layerName: String
  },
  components: {
    Codemirror
  },
  computed: {
    style: {
      get() {
        return store.getters.extraStyles(this.layerName);
      },
      set(value) {
        store
          .dispatch("setExtraStyles", {
            layerName: this.layerName,
            styles: value
          })
          .then(() => store.dispatch("updateProject"));
      }
    }
  },
  data() {
    return { extensions: [css()] };
  }
};
</script>

<style scoped>
.code-editor {
  width: 100%;
  height: 100%;
  font-size: 0.75rem;
}
</style>

<style>
.code-editor-extra-styles .CodeMirror {
  height: auto;
}
</style>

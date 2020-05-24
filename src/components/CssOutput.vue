<template>
  <codemirror v-model="css" :options="codeMirrorOptions" class="code-editor" />
</template>

<script>
import layers2css from "@/common/layers2css";
import store from "@/store";
import { codemirror } from "vue-codemirror-lite";
require("codemirror/mode/css/css");
export default {
  components: {
    codemirror
  },
  computed: {
    css() {
      return layers2css({layers: this.shapesLayers});
    },
    codeMirrorOptions() {
      return {
        height: "auto",
        lineWrapping: true,
        mode: "css",
        readOnly: true
      };
    },
    shapesLayers() {
      return store.getters.allLayers;
    }
  },
  methods: {
    close() {
      this.$router.push({name: "editor"});
    }
  }
};
</script>

<style scoped>
.code-editor {
  width: 100%;
  font-size: 0.75rem;
}
.code-editor .CodeMirror {
  height: auto;
}
</style>

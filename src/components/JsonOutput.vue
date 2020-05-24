<template>
  <codemirror v-model="jsonResult" :options="codeMirrorOptions" class="code-editor" />
</template>

<script>
import store from "@/store";
import { codemirror } from "vue-codemirror-lite";
require("codemirror/mode/javascript/javascript");
export default {
  components: {
    codemirror
  },
  computed: {
    jsonResult() {
      return JSON.stringify(store.getters.allLayers, null, 2);
    },
    codeMirrorOptions() {
      return {
        height: "auto",
        mode: { name: "javascript", json: true },
        readOnly: true
      };
    }
  }
};
</script>

<style scoped>
.code-editor {
  font-size: 0.75rem;
}
.code-editor .CodeMirror {
  height: auto;
}
</style>

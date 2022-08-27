<template>
  <div class="output-code">
    <codemirror
      v-model="jsonResult"
      :options="codeMirrorOptions"
      class="code-editor code-editor-json-output"
    />
    <CopyButton :content="jsonResult" class="copy-output-to-clipboard" />
  </div>
</template>

<script>
import store from "@/store";
import { codemirror } from "vue-codemirror-lite";
import CopyButton from "@/components/CopyButton/CopyButton";
require("codemirror/mode/javascript/javascript");
require("codemirror/theme/nord.css");
export default {
  components: {
    codemirror,
    CopyButton
  },
  computed: {
    jsonResult() {
      return JSON.stringify(store.getters.allLayers, null, 2);
    },
    codeMirrorOptions() {
      return {
        height: "auto",
        lineWrapping: true,
        mode: { name: "javascript", json: true },
        readOnly: true,
        theme: "nord"
      };
    }
  }
};
</script>

<style scoped>
.code-editor {
  font-size: 0.75rem;
}
</style>

<style>
.code-editor-json-output .CodeMirror {
  height: auto;
  padding: 0.5rem 1rem;
}
</style>

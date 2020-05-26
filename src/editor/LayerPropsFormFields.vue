<template>
  <codemirror v-model="style" :options="codeMirrorOptions" class="code-editor code-editor-extra-styles" ref="codeEditor" />
</template>

<script>
import store from "@/store";
import { codemirror } from "vue-codemirror-lite";
require("codemirror/mode/css/css");
require("codemirror/addon/comment/comment");
export default {
  props: {
    layerName: String
  },
  components: {
    codemirror
  },
  computed: {
    codeEditor() {
      return this.$refs.codeEditor.editor;
    },
    codeMirrorOptions() {
      return {
        extraKeys: {
          "Ctrl-/": this.toggleComment,
          "Cmd-/": this.toggleComment
        },
        height: "auto",
        mode: "css"
      };
    },
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
  methods: {
    toggleComment() {
      this.codeEditor.execCommand("toggleComment");
    }
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

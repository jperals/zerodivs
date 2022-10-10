<template>
  <div class="output-code">
    <codemirror
      v-model="jsonResult"
      height="auto"
      :extensions="extensions"
      mode="json"
      :line-wrapping="true"
      :disabled="true"
      class="code-editor code-editor-json-output"
    />
    <CopyButton :content="jsonResult" class="copy-output-to-clipboard" />
  </div>
</template>

<script>
import store from "@/store";
import { Codemirror } from "vue-codemirror";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import CopyButton from "@/components/CopyButton/CopyButton";

export default {
  components: {
    Codemirror,
    CopyButton
  },
  computed: {
    jsonResult() {
      return JSON.stringify(store.getters.allLayers, null, 2);
    }
  },
  data() {
    return {
      extensions: [json(), oneDark]
    };
  }
};
</script>

<template>
  <div class="output-code">
    <codemirror
      v-model="cssCode"
      height="auto"
      :extensions="extensions"
      mode="css"
      :disabled="true"
      :line-wrapping="true"
      class="code-editor code-editor-css-output"
    />
    <CopyButton :content="cssCode" class="copy-output-to-clipboard" />
  </div>
</template>

<script>
import layers2css from "@/common/layers2css";
import store from "@/store";
import { Codemirror } from "vue-codemirror";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";
import CopyButton from "@/components/CopyButton/CopyButton";

export default {
  components: {
    Codemirror,
    CopyButton
  },
  computed: {
    cssCode() {
      return layers2css({ layers: this.shapesLayers });
    },
    shapesLayers() {
      return store.getters.allLayers;
    }
  },
  data() {
    return {
      extensions: [css(), oneDark]
    };
  },
  methods: {
    close() {
      this.$router.push({ name: "editor" });
    }
  }
};
</script>

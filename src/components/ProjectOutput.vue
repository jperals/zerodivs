<template>
  <div class="modal-container">
    <div class="modal-overlay" v-on:click="close"></div>
    <div class="modal output">
      <div class="actions">
        <div class="tabs">
          <router-link :to="{name: 'json-result'}">JSON</router-link>
          <router-link :to="{name: 'css-result'}">CSS</router-link>
        </div>
        <ExportToCodePenButton />
        <button class="button close-button" v-on:click="close">Close</button>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import ExportToCodePenButton from "./ExportToCodePenButton/ExportToCodePenButton";
export default {
  components: {
    ExportToCodePenButton
  },
  methods: {
    close() {
      this.$router.push({ name: "editor" });
    }
  }
};
</script>

<style scoped>
.modal-container {
  z-index: 20;
  overflow-y: auto;
}
.output {
  margin-top: 100px;
  max-height: calc(100% - 200px);
  margin-left: 50px;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
}
.output .tabs {
  flex-grow: 1;
}
.output .tabs a {
  color: var(--gray-700);
  padding: 0.75rem 0.75rem 0.5rem;
  display: inline-block;
  text-decoration: none;
  border-bottom: 0.25rem solid transparent;
}
.output .tabs a.router-link-active {
  color: var(--selected-color);
  border-bottom-color: var(--selected-color);
}
.output .tabs a:hover {
  background-color: #f7f7f7;
}
.output pre {
  font-family: "Courier New", Courier, monospace;
  font-size: 0.75rem;
  background-color: hsl(200, 50%, 95%);
  margin: 0;
  padding-top: 0.5rem;
  overflow-y: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>

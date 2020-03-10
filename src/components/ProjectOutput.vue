<template>
  <div class="output">
    <button class="close-button" v-on:click="close">Close</button>
    <div class="actions">
      <div class="tabs">
        <router-link :to="{name: 'json-result'}">JSON</router-link>
        <router-link :to="{name: 'css-result'}">CSS</router-link>
      </div>
      <ExportToCodePenButton />
    </div>
    <router-view />
  </div>
</template>

<script>
import ExportToCodePenButton from "./ExportToCodePenButton";
export default {
  components: {
    ExportToCodePenButton
  },
  methods: {
    close() {
      this.$router.push({name: "editor"});
    }
  }
};
</script>

<style scoped>
.output {
  position: fixed;
}
.output .tabs,
.output pre {
  padding-left: 1rem;
  padding-right: 1rem;
}
.actions {
  display: flex;
  flex-direction: row;
  background: white;
  border-bottom: 1px solid var(--panel-border-color);
  align-items: center;
}
.output .tabs a {
  color: var(--gray-700);
  padding: .75rem .75rem .5rem;
  display: inline-block;
  text-decoration: none;
  border-bottom: .25rem solid transparent;
}
.output .tabs a.router-link-active {
  color: var(--selected-color);
  border-bottom-color: var(--selected-color);
}
.output .tabs a:hover {
  background-color: #F7F7F7;
}
button {
  position: absolute;
  top: .75rem;
  right: 1rem;
  display: inline-block;
}
.output pre {
  font-family: "Courier New", Courier, monospace;
  font-size: 0.75rem;
  background-color: hsl(200, 50%, 95%);
  margin: 0;
  padding-top: 0.5rem;
  overflow-y: auto;
}
</style>

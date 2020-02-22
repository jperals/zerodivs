<template>
  <nav>
    <router-link to="/">Stretch</router-link>
    <button v-on:click="toggleOutput">Output</button>
  </nav>
</template>

<script>
import store from "@/store";
export default {
  computed: {
    currentProject() {
      return store.getters.currentProject;
    }
  },
  methods: {
    toggleOutput() {
      store.dispatch("toggleOutput");
    }
  }
};
</script>

<style scoped>
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
nav > * {
  display: inline-block;
}
nav > a {
  padding: 0.25rem 1rem;
}
nav > button {
  margin: 0.25rem 1rem;
}
</style>

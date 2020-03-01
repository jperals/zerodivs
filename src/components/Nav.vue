<template>
  <nav>
    <section class="breadcrumbs">
      <router-link to="/" class="link-to-home">Stretch</router-link>
      <span v-if="currentProject">/</span>
      <span v-if="currentProject">{{ currentProject.id }}</span>
    </section>
    <button v-if="currentProject" v-on:click="toggleOutput">Output</button>
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
.breadcrumbs > * {
  display: inline-block;
  padding: 0.75rem 0.25rem;
}
.link-to-home {
  padding-left: 1rem;
}
span {
  color: var(--gray-700);
}
nav > button {
  margin: 0.25rem 1rem;
}
</style>

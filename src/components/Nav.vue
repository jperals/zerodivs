<template>
  <nav>
    <section class="breadcrumbs">
      <router-link to="/" class="link-to-home">Mirage</router-link>
      <span v-if="currentProject">/</span>
      <span v-if="currentProject">
        <input v-model="projectName" placeholder="Project name" />
      </span>
    </section>
    <button v-if="currentProject" v-on:click="toggleOutput">Result</button>
  </nav>
</template>

<script>
import store from "@/store";
export default {
  computed: {
    currentProject() {
      return store.getters.currentProject;
    },
    projectName: {
      get() {
        return this.currentProject.name || "";
      },
      set(value) {
        store.dispatch("updateProject", {
          project: this.currentProject,
          newProps: { name: value }
        });
      }
    }
  },
  methods: {
    toggleOutput() {
      this.$router.push({ name: "result" });
    }
  }
};
</script>

<style scoped>
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  transition: background-color 300ms;
}
nav > * {
  display: inline-block;
}
.breadcrumbs > * {
  display: inline-block;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
.link-to-home {
  padding-left: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
span {
  color: var(--gray-700);
}
nav > button {
  margin: 0.45rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
nav > button:hover {
  text-decoration: underline;
}
input {
  color: var(--gray-900);
  font-size: 1rem;
  border-radius: 0.25rem;
  border-width: 1px;
  border-color: var(--gray-400);
  border-style: solid;
  width: 20ch;
  padding: 0.25rem;
}
input:not(:hover) {
  border-color: transparent;
}
</style>

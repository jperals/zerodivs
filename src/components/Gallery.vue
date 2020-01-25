<template>
  <ul class="div-gallery">
    <li v-for="div in divs" :key="div.id" class="div-thumbnail">
      <router-link :to="link(div.id)" />
    </li>
    <li class="div-thumbnail">
      <button v-on:click="createNewDiv" class="new-div-button">+</button>
    </li>
  </ul>
</template>

<script>
import store from "@/store";
export default {
  methods: {
    createNewDiv() {
      return store.dispatch("createNewProject");
    },
    link(id) {
      return `/div/${id}`;
    }
  },
  computed: {
    divs() {
      return store.getters.projects;
    }
  },
  mounted() {
    store.dispatch("loadProjects");
  }
};
</script>

<style scoped>
.div-gallery {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}
.div-thumbnail {
  margin: 1rem;
}
.div-thumbnail a,
.new-div-button {
  display: block;
  width: 200px;
  height: 200px;
  border: 1px solid hsl(0, 0%, 90%);
  cursor: pointer;
  border-radius: 0.5rem;
}
.div-thumbnail a:hover,
.new-div-button:hover {
  background-color: hsl(0, 0%, 97%);
  border: 1px solid hsl(0, 0%, 80%);
}
</style>

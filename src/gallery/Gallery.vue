<template>
  <ul class="div-gallery">
    <li v-for="div in divs" :key="div.id" class="div-thumbnail">
      <router-link :to="link(div.id)">
        <GalleryThumbnail :projectId="div.id" />
      </router-link>
    </li>
    <li class="div-thumbnail">
      <button v-on:click="createNewDiv" class="new-div-button">+</button>
    </li>
  </ul>
</template>

<script>
import GalleryThumbnail from "./GalleryThumbnail";
import store from "@/store";
export default {
  components: {
    GalleryThumbnail
  },
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
    store.dispatch("setCurrentProject", null);
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
.div-thumbnail a {
  background-color: lightgray;
  overflow: hidden;
  position: relative;
}
.div-thumbnail a:hover,
.new-div-button:hover {
  border-color: hsl(0, 0%, 75%);
}
.div-thumbnail a:hover {
  box-shadow: 2px 2px 18px var(--gray-500);
}
.new-div-button:hover {
  background-color: hsl(0, 0%, 97%);
}
.div-thumbnail a:not(:hover):after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: hsla(0, 0%, 0%, 0.25);
}
</style>

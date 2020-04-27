<template>
  <div class="div-gallery">
    <ul>
      <li v-for="div in divs" :key="div.id" class="div-thumbnail">
        <router-link :to="link(div.id)">
          <GalleryThumbnail :projectId="div.id" />
        </router-link>
        <button v-on:click="confirmDeleteDiv(div)" class="remove-button">Delete</button>
      </li>
      <li class="div-thumbnail">
        <button v-on:click="createNewDiv" class="new-div-button">Create New</button>
      </li>
    </ul>
    <div v-if="askingForDeleteConfirmation" class="modal-container delete-confirmation-modal">
      <div class="modal-overlay" v-on:click="cancelDelete"></div>
      <div class="modal">
        <h3 class="header">Delete Project?</h3>
        <div class="main">
          <p>This operation cannot be undone.</p>
        </div>
        <div class="actions actions-bottom">
          <button class="cancel-button" v-on:click="cancelDelete">Cancel</button>
          <button class="main-action" v-on:click="deleteDiv">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GalleryThumbnail from "./GalleryThumbnail";
import store from "@/store";
export default {
  components: {
    GalleryThumbnail
  },
  data() {
    return {
      projectToBeDeleted: null
    };
  },
  methods: {
    cancelDelete() {
      this.projectToBeDeleted = null;
    },
    confirmDeleteDiv(project) {
      this.projectToBeDeleted = project;
    },
    createNewDiv() {
      return store.dispatch("createNewProject");
    },
    link(id) {
      return `/div/${id}`;
    },
    deleteDiv() {
      store.dispatch("removeProject", this.projectToBeDeleted);
      this.projectToBeDeleted = null;
    }
  },
  computed: {
    divs() {
      return store.getters.projects;
    },
    askingForDeleteConfirmation() {
      return this.projectToBeDeleted !== null;
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
  padding: 0;
  margin: 0;
}
.div-gallery ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}
.div-thumbnail {
  margin: 1rem;
  position: relative;
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
.remove-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid white;
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;
  opacity: 0;
}
.div-thumbnail:hover .remove-button:not(:hover) {
  opacity: 0.75;
}
.div-thumbnail:hover .remove-button:hover {
  opacity: 1;
}

.delete-confirmation-modal {
  display: flex;
  align-items: center;
}

.delete-confirmation-modal .modal {
  margin-left: auto;
  margin-right: auto;
  width: 300px;
}
</style>

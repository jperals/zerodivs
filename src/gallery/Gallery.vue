<template>
  <div class="div-gallery">
    <ul>
      <li v-for="project in divs" :key="project.id" class="div-thumbnail">
        <router-link :to="link(project.id)">
          <GalleryThumbnail :projectId="project.id" />
        </router-link>
        <ul class="actions">
          <li>
            <button v-on:click="duplicate(project)" class="action-button">Duplicate</button>
          </li>
          <li>
            <button v-on:click="confirmDeleteDiv(project)" class="action-button">Delete</button>
          </li>
        </ul>
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
    async createNewDiv() {
      const newProjectId = await store.dispatch("createNewProject");
      this.$router.push(this.link(newProjectId));
    },
    duplicate(project) {
      store.dispatch("duplicateProject", project);
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
.div-gallery > ul {
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
.div-thumbnail .actions {
  list-style: none;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 20;
}
.div-thumbnail .actions > li {
  display: block;
  text-align: right;
}
.div-thumbnail:not(:hover) .actions {
  opacity: 0;
}
.div-thumbnail .action-button {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid white;
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-bottom: 0.25rem;
  text-align: right;
  right: 0;
}
.div-thumbnail:hover .action-button:not(:hover) {
  opacity: 0.75;
}
.div-thumbnail:hover .action-button:hover {
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

<template>
  <div class="div-gallery">
    <ul>
      <li v-for="project in divs" :key="project.id" class="div-thumbnail" :class="{'options-open': isOptionsOpenId(project.id)}">
        <router-link :to="link(project.id)">
          <GalleryThumbnail :projectId="project.id" />
          <div v-if="project.name" class="project-name">{{project.name}}</div>
        </router-link>
        <ul class="actions" v-if="isOptionsOpenId(project.id)">
          <li>
            <button v-on:click="duplicate(project)" class="action-button">Duplicate</button>
          </li>
          <li>
            <button v-on:click="confirmDeleteDiv(project)" class="action-button">Delete</button>
          </li>
        </ul>
        <div class="options-toggle" v-on:click="() => toggleOptions(project.id)">
          <HamburgerButton class="close-button" :isOpen="isOptionsOpenId(project.id)" />
        </div>
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
import HamburgerButton from "@/components/HamburgerButton";
import store from "@/store";
export default {
  components: {
    GalleryThumbnail,
    HamburgerButton
  },
  data() {
    return {
      optionsOpenId: null,
      projectToBeDeleted: null
    };
  },
  methods: {
    cancelDelete() {
      this.projectToBeDeleted = null;
    },
    confirmDeleteDiv(project) {
      this.optionsOpenId = null;
      this.projectToBeDeleted = project;
    },
    async createNewDiv() {
      const newProjectId = await store.dispatch("createNewProject");
      this.$router.push(this.link(newProjectId));
    },
    deleteDiv() {
      store.dispatch("removeProject", this.projectToBeDeleted);
      this.projectToBeDeleted = null;
    },
    duplicate(project) {
      this.optionsOpenId = null;
      store.dispatch("duplicateProject", project);
    },
    isOptionsOpenId(id) {
      return this.optionsOpenId === id;
    },
    link(id) {
      return `/div/${id}`;
    },
    toggleOptions(id) {
      if (this.optionsOpenId === id) {
        this.optionsOpenId = null;
      } else {
        this.optionsOpenId = id;
      }
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
  background-color: var(--gray-900);
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
  box-shadow: 2px 2px 20px black;
}
.div-thumbnail a,
.new-div-button {
  display: block;
  width: 200px;
  height: 200px;
  border: 1px solid var(--gray-600);
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
.new-div-button:hover {
  background-color: hsl(0, 0%, 97%);
}
.div-thumbnail:not(.options-open) a:not(:hover):before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}
.div-thumbnail a:hover .project-name {
  background-color: rgba(0, 0, 0, 0.75);
}
.div-thumbnail .actions {
  list-style: none;
  position: absolute;
  top: 3rem;
  right: 0.5rem;
  z-index: 30;
  animation: from-top 300ms;
}
.div-thumbnail.options-open:before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.65),
    rgba(0, 0, 0, 1)
  );
}
.div-thumbnail .actions > li {
  display: block;
  text-align: right;
}
.div-thumbnail:not(.options-open):not(:hover) .options-toggle {
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
.div-thumbnail .options-toggle:not(:hover),
.div-thumbnail:hover .action-button:not(:hover) {
  opacity: 0.75;
}

.delete-confirmation-modal {
  display: flex;
  align-items: center;
  z-index: 30;
}

.delete-confirmation-modal .modal {
  margin-left: auto;
  margin-right: auto;
  width: 300px;
}
.project-name {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;
  color: white;
  z-index: 20;
}
.options-toggle {
  cursor: pointer;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;  
  background:rgba(0, 0, 0, 0.25);
  border-radius: 0.25rem;
  padding: 0.25rem;
  z-index: 30;
}
@keyframes from-top {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
}
</style>

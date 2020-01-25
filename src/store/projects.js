import uuid from "uuid/v1";
import { warn } from "@/warn";
import persistence from "@/persistence";

const projects = {
  state: {
    currentProject: null,
    projects: []
  },
  getters: {
    currentProject: state => state.currentProject,
    projectById: state => id =>
      state.projects.find(project => project.id === id),
    projects: state => state.projects
  },
  mutations: {
    createNewProject(state) {
      state.projects = state.projects.concat([
        {
          id: uuid()
        }
      ]);
    },
    removeProject(state, project) {
      const index = state.projects.findIndex(item => item.id === project.id);
      if (-1 < index) {
        state.projects.splice(index, 1);
      } else {
        warn("Project to be removed not found");
      }
    },
    setCurrentProject(state, project) {
      state.currentProject = project;
    },
    setProjects(state, projects) {
      state.projects = projects;
    }
  },
  actions: {
    createNewProject({ commit, getters }) {
      commit("createNewProject");
      return persistence.set("divs", getters.projects);
    },
    loadProjectById({ commit, getters }, id) {
      const project = getters.projectById(id);
      return commit("setCurrentProject", project);
    },
    loadProjects({ commit }) {
      return persistence
        .get("divs")
        .then(projects => commit("setProjects", projects || []));
    },
    modifyProject({ commit, getters }, { project, newProps }) {
      commit("modifyProject", { project, newProps });
      return persistence.set("divs", getters.projects);
    },
    removeProject({ commit, getters }, project) {
      commit("removeProject", project);
      return persistence.set("divs", getters.projects);
    },
    setCurrentProject({ commit }, project) {
      return commit("setCurrentProject", project);
    }
  }
};

export default projects;

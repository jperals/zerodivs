import uuid from "uuid/v1";
import { get } from "lodash";
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
    },
    updateProject(state, { project, newProps = {} }) {
      for (const propName in newProps) {
        project[propName] = newProps[propName];
      }
    }
  },
  actions: {
    createNewProject({ commit, getters }) {
      commit("createNewProject");
      return persistence.set("divs", getters.projects);
    },
    loadProjectById({ dispatch, getters }, id) {
      dispatch("loadProjects").then(() => {
        const project = getters.projectById(id);
        const projectShapes = get(project, "shapes");
        dispatch("setShapes", projectShapes);
        return dispatch("setCurrentProject", project);
      });
    },
    loadProjects({ commit }) {
      return persistence
        .get("divs")
        .then(projects => commit("setProjects", projects || []));
    },
    updateProject({ commit, getters }, options) {
      const project = get(options, "project", getters.currentProject);
      const newProps = get(options, "newProps", { shapes: getters.allLayers });
      commit("updateProject", { project, newProps });
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

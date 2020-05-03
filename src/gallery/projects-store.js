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
    projects: state => state.projects,
    shapesLayersByProjectId: (state, getters) => id => get(getters.projectById(id), "shapes")
  },
  mutations: {
    createNewProject(state, id) {
      state.projects = state.projects.concat([
        {
          id
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
    async createNewProject({ commit, getters }) {
      const id = uuid();
      commit("createNewProject", id);
      await persistence.set("divs", getters.projects);
      return id;
    },
    loadProjectById({ dispatch, getters }, id) {
      return dispatch("loadProjects").then(() => {
        const project = getters.projectById(id);
        const projectShapes = get(project, "shapes");
        dispatch("setCurrentProject", project);
        return dispatch("setShapes", projectShapes);
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

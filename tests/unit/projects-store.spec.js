import projectsStore from "@/store/projects";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store(projectsStore);

describe("Projects store", () => {
  it("remove a project", () => {
    store.commit("createNewProject");
    store.commit("createNewProject");
    store.commit("createNewProject");
    const projects = store.getters.projects;
    const projectsCopy = [...projects];
    store.commit("removeProject", projects[1]);
    expect(store.getters.projects.length).toBe(2);
    expect(store.getters.projects).toStrictEqual([
      projectsCopy[0],
      projectsCopy[2]
    ]);
  });
});

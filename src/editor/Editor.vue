<template>
  <div class="editor" v-on:mouseup="unselect">
    <template v-if="project">
      <Toolbar />
      <div>
        <Workspace />
        <Layers />
        <PropsForm />
      </div>
      <router-view />
    </template>
    <div v-else>Couldn't find this div. :-/</div>
  </div>
</template>

<script>
import { get } from "lodash";
import Workspace from "./Workspace";
import Layers from "./Layers";
import PropsForm from "./PropsForm";
import Toolbar from "@/toolbar/Toolbar";
import reactToKeyboard from "@/react-to-keyboard";
import store from "@/store";
export default {
  data() {
    return {
      shapes: null
    };
  },
  components: {
    Layers,
    PropsForm,
    Toolbar,
    Workspace
  },
  created() {
    window.addEventListener("keydown", this.onKeyPress);
  },
  destroyed() {
    window.removeEventListener("keydown", this.onKeyPress);
  },
  mounted() {
    const projectId = get(this, "$route.params.id");
    store.dispatch("resetSnapshots");
    if (projectId === undefined) {
      this.$router.history.push("/");
    } else {
      store.dispatch("loadProjectById", projectId).then(() => {
        store.dispatch("addSnapshot");
      });
    }
  },
  computed: {
    project() {
      return store.getters.currentProject;
    },
    showOutput() {
      return store.getters.showOutput;
    }
  },
  methods: {
    onKeyPress(event) {
      reactToKeyboard(event);
    },
    unselect() {
      store.dispatch("unselectShape");
    }
  }
};
</script>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
}
.toolbar {
  z-index: 10;
}
.toolbar + div {
  flex-grow: 1;
  position: relative;
}
.layers,
.canvas,
.props {
  position: absolute;
  top: 0;
  bottom: 0;
}
.layers,
.canvas {
  left: 0;
}
.canvas,
.props {
  right: 0;
}
</style>

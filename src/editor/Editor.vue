<template>
  <div class="editor">
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
    if (projectId === undefined) {
      this.$router.history.push("/");
    } else {
      store.dispatch("loadProjectById", projectId);
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
.output {
  position: absolute;
  top: 50px;
  left: 50px;
  right: 50px;
  z-index: 20;
}
.output:before {
  content: "";
  position: fixed;
  z-index: -20;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: hsla(0, 0%, 0%, .25);
  backdrop-filter: blur(10px);
}
</style>

<template>
  <div class="editor">
    <template v-if="project">
      <Toolbar />
      <div>
        <Workspace />
        <Layers />
        <PropsForm />
      </div>
      <portal-target name="color-picker"/>
      <router-view />
    </template>
    <div v-else>Couldn't find this project. :-/</div>
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
      pressedKeys: new Set(),
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
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  },
  destroyed() {
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
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
    onKeyDown(event) {
      store.dispatch("addPressedKey", event.key);
      reactToKeyboard(event);
    },
    onKeyUp(event) {
      store.dispatch("removePressedKey", event.key);
    }
  }
};
</script>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  --layers-width: 160px;
  --shape-form-width: 200px;
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

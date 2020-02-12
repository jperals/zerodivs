<template>
  <div class="editor">
    <template v-if="project">
      <Toolbar />
      <div>
        <Workspace />
        <Layers />
        <PropsForm />
      </div>
    </template>
    <div v-else>Couldn't find this div. :-/</div>
  </div>
</template>

<script>
import { get } from "lodash";
import Workspace from "@/components/Workspace";
import Layers from "@/components/Layers";
import PropsForm from "@/components/PropsForm";
import Toolbar from "@/components/Toolbar";
import store from "@/store";
export default {
  data() {
    return {
      shapes: null
    };
  },
  components: {
    Workspace,
    Layers,
    PropsForm,
    Toolbar
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
    }
  }
};
</script>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
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

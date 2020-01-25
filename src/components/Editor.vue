<template>
  <div class="editor">
    <template v-if="project">
      <Toolbar />
      <Canvas />
      <Layers />
      <ShapeProperties />
    </template>
    <div v-else>Couldn't find this div. :-/</div>
  </div>
</template>

<script>
import { get } from "lodash";
import Canvas from "@/components/Canvas";
import Layers from "@/components/Layers";
import ShapeProperties from "@/components/ShapeProperties";
import Toolbar from "@/components/Toolbar";
import store from "@/store";
export default {
  data() {
    return {
      shapes: null
    };
  },
  components: {
    Canvas,
    Layers,
    ShapeProperties,
    Toolbar
  },
  mounted() {
    const projectId = get(this, "$route.params.id");
    store.dispatch("loadProjectById", projectId);
  },
  computed: {
    project() {
      return store.getters.currentProject;
    }
  }
};
</script>

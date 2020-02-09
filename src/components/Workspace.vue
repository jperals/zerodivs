<template>
  <div
    class="workspace"
    :class="{'adding-shape': addingShape}"
  >
    <Canvas/>
    <ShapeOverlay v-for="shape in shapes" :shape="shape" :onClick="onShapeClick" :key="shape.id" />
  </div>
</template>

<script>
import store from "@/store";
import Canvas from "@/components/Canvas";
import ShapeOverlay from "@/components/ShapeOverlay";
export default {
  components: {
    Canvas,
    ShapeOverlay
  },
  methods: {
    onShapeClick(event) {
      event.stopPropagation();
      console.log("shape click", event);
    }
  },
  computed: {
    addingShape() {
      return !!store.getters.shapeToBeAdded;
    },
    shapes() {
      return store.getters.shapes;
    }
  }
};
</script>

<style scoped>
.workspace.adding-shape {
  cursor: crosshair;
}
</style>

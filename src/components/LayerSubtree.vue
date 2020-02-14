<template>
  <li
    class="layer"
    :class="{ active: isLayerActive, layerName, selected: isLayerSelected }"
  >
    <div class="list-node root-node" v-on:click="selectLayer">
      <label>{{ label }}</label>
      <span class="checkbox">
        <input
          type="checkbox"
          :checked="isLayerActive"
          v-on:click.stop="toggleLayer"
        />
      </span>
    </div>
    <ul class="shapes">
      <li
        class="shape list-node"
        :class="{ selected: isShapeSelected(shape) }"
        v-for="shape in shapesFromLayer"
        :key="shape.id"
        v-on:click="selectShape(shape)"
      >
        <label>{{ shapeLabel(shape) }}</label>
      </li>
    </ul>
  </li>
</template>

<script>
import store from "@/store";
export default {
  props: {
    layerName: String
  },
  methods: {
    isShapeSelected(shape) {
      return store.getters.selectedShape === shape;
    },
    shapeLabel(shape) {
      return shape.type;
    },
    selectLayer() {
      store.dispatch("selectLayer", this.layerName);
      store.dispatch("unselectShape");
    },
    selectShape(shape) {
      store.dispatch("selectShape", shape);
    },
    toggleLayer() {
      store.dispatch("toggleLayer", this.layerName);
    }
  },
  computed: {
    isLayerActive() {
      return store.getters.isLayerActive(this.layerName);
    },
    isLayerSelected() {
      return (
        store.getters.selectedLayer === this.layerName &&
        !store.getters.selectedShape
      );
    },
    label() {
      if (this.layerName === "before" || this.layerName === "after") {
        return ":" + this.layerName;
      } else {
        return this.layerName;
      }
    },
    shapesFromLayer() {
      return store.getters.layerShapes(this.layerName);
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
.shape.list-node {
  padding-left: 2rem;
}
.list-node:last-child {
  border-bottom-color: var(--panel-border-color-strong);
}
li li {
  padding-left: 0.5rem;
}
.layer:not(.active) label {
  opacity: 0.35;
}
.root-node {
  display: flex;
  flex-direction: row;
}
.root-node .checkbox {
  flex-grow: 1;
  text-align: right;
}
.shapes > .selected,
.layer.selected .root-node {
  background-color: var(--selected-color);
  color: white;
}
</style>

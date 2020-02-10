<template>
  <ul class="layers">
    <li
      class="main"
      :class="{ selected: isLayerSelected('main') }"
      v-on:click="selectLayer('main')"
    >
      <label>main</label>
      <ul class="main--layers">
        <li
          class="main--layer"
          :class="{ active: isSelected(shape) }"
          v-for="shape in shapesFromLayer('main')"
          :key="shape.id"
          v-on:click="selectShape(shape)"
        >{{ shapeLabel(shape) }}</li>
      </ul>
    </li>
    <li
      class="pseudo before"
      :class="{ active: isLayerActive('before'), selected: isLayerSelected('before') }"
      v-on:click="selectLayer('before')"
    >
      <div class="layer--root-node">
        <label>:before</label>
        <span class="checkbox">
          <input type="checkbox" :checked="activeLayers.before" v-on:click.stop="toggleLayer('before')" />
        </span>
      </div>
      <ul class="before--layers" v-if="activeLayers.before">
        <li
          class="before--layer"
          :class="{ active: isSelected(shape) }"
          v-for="shape in shapesFromLayer('before')"
          :key="shape.id"
          v-on:click="selectShape(shape)"
        >{{ shapeLabel(shape) }}</li>
      </ul>
    </li>
    <li
      class="pseudo after"
      :class="{ active: isLayerActive('after'), selected: isLayerSelected('after') }"
      v-on:click="selectLayer('after')"
    >
      <div class="layer--root-node">
        <label>:after</label>
        <span class="checkbox">
          <input type="checkbox" :checked="activeLayers.after" v-on:click.stop="toggleLayer('after')" />
        </span>
      </div>
      <ul class="after--layers" v-if="activeLayers.after">
        <li
          class="after--layer"
          :class="{ active: isSelected(shape) }"
          v-for="shape in shapesFromLayer('after')"
          :key="shape.id"
          v-on:click="selectShape(shape)"
        >{{ shapeLabel(shape) }}</li>
      </ul>
    </li>
  </ul>
</template>

<script>
import store from "@/store";
export default {
  data() {
    return {
      activeLayers: {
        before: false,
        after: false
      }
    };
  },
  methods: {
    isLayerActive(layerName) {
      return store.getters.isLayerActive(layerName);
    },
    isLayerSelected(layerName) {
      return store.getters.selectedLayer === layerName;
    },
    isSelected(shape) {
      return store.getters.selectedShape === shape;
    },
    shapeLabel(shape) {
      return shape.type;
    },
    selectLayer(layerName) {
      store.dispatch("selectLayer", layerName);
    },
    selectShape(shape) {
      store.dispatch("selectShape", shape);
    },
    shapesFromLayer(layerName) {
      return store.getters.layerShapes(layerName);
    },
    toggleLayer(layerName) {
      store.dispatch("toggleLayer", layerName);
    }
  },
  computed: {
    shapes() {
      return store.getters.shapes;
    }
  }
};
</script>

<style scoped>
.layers {
  background-color: var(--panel-bg-color);
  margin: 0;
  padding-left: 0;
  width: 160px;
  border-right: 1px solid var(--panel-border-color);
}
ul {
  list-style: none;
}
li {
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-bottom: 1px solid var(--panel-border-color);
}
li li {
  padding-left: 0.5rem;
}
.pseudo:not(.active) label {
  opacity: 0.35;
}
.pseudo .layer--root-node {
  display: flex;
  flex-direction: row;
}
.layer--root-node .checkbox {
  flex-grow: 1;
  text-align: right;
}
.layers > .selected {
  background-color: var(--selected-color);
  color: white;
}
</style>

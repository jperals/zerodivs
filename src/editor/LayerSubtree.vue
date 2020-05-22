<template>
  <li class="layer" :class="{ active: isLayerActive, layerName, selected: isLayerSelected }">
    <div class="list-node root-node" v-on:click="selectLayer">
      <label>{{ label }}</label>
      <span class="checkbox">
        <input type="checkbox" :checked="isLayerActive" v-on:click.stop="toggleLayer" />
      </span>
    </div>
    <ul class="shapes">
      <li
        class="shape list-node draggable"
        :class="{ selected: isShapeSelected(shape), 'moved-down': isItemMovedDown(index), 'moved-up': isItemMovedUp(index), dragging: shape === itemBeingDragged }"
        :style="listItemStyle(shape)"
        v-for="(shape, index) in items"
        :key="shape.id"
        v-on:mousemove="onItemMouseMove"
        v-on:mousedown="onShapeMouseDown(index, $event)"
        v-on:mouseup="onItemMouseUp"
      >
        <span class="draggable-indicator" />
        <ShapeNameInput :shape="shape" :selected="isShapeSelected(shape)" />
      </li>
    </ul>
  </li>
</template>

<script>
import DraggableListMixin from "@/components/DraggableListMixin";
import ShapeNameInput from "@/editor/ShapeNameInput";
import store from "@/store";
export default {
  props: {
    layerName: String
  },
  mixins: [DraggableListMixin],
  data() {
    return {
      elementHeight: null,
      elementIndex: null,
      initialMousePosition: null,
      offset: null,
      shapeBeingDragged: null,
      shapeMovedDown: null,
      shapeMovedUp: null
    };
  },
  components: {
    ShapeNameInput
  },
  methods: {
    isShapeSelected(shape) {
      return store.getters.selectedShape === shape;
    },
    onShapeMouseDown(index, event) {
      const shape = this.items[index];
      this.selectShape(shape);
      this.onItemMouseDown(index, event);
    },
    selectLayer() {
      store.dispatch("selectLayer", this.layerName);
      store.dispatch("unselectShape");
    },
    selectShape(shape) {
      store.dispatch("selectShape", shape);
    },
    shapeLabel(shape) {
      return shape.name;
    },
    async swapItems(sourceIndex, targetIndex) {
      await store.dispatch("swapLayerShapes", {
        layerName: this.layerName,
        sourceIndex,
        targetIndex
      });
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
    items() {
      return store.getters.layerShapes(this.layerName);
    }
  }
};
</script>

<style scoped>
@import "../components/draggable-indicator.css";
ul {
  list-style: none;
  padding: 0;
}
.list-node {
  padding-left: 0.5rem;
}
.shape.list-node {
  background-color: var(--panel-bg-color);
  border-color: var(--panel-border-color);
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-right: 0.25rem;
  display: flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  color: var(--gray-700);
}
.shape.list-node label {
  width: 100%;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.shape.list-node.dragging,
.shape.list-node.dragging label,
.shape.list-node.dragging .draggable-indicator {
  cursor: grabbing;
}
.shape.list-node:not(.dragging) {
  transition: transform 100ms;
}
.shape.list-node:not(.selected) label {
  color: var(--gray-700);
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
  padding-right: 0.5rem;
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
.shape-name {
  width: 7.5rem;
}
.shape.moved-down {
  animation: moveDown 150ms;
}
.shape.moved-up {
  animation: moveUp 150ms;
}
@keyframes moveDown {
  from {
    transform: translateY(-100%);
  }
}
@keyframes moveUp {
  from {
    transform: translateY(100%);
  }
}
</style>

<style>
.shape-name {
  width: 6.5rem;
}
</style>
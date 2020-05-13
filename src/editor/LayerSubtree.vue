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
        class="shape list-node"
        :class="{ selected: isShapeSelected(shape) }"
        :style="style(shape)"
        v-for="(shape, index) in shapesFromLayer"
        :key="shape.id"
        v-on:mousemove="onMouseMove"
        v-on:mousedown="onMouseDown(index, $event)"
        v-on:mouseup="onMouseUp"
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
  data() {
    return {
      elementHeight: null,
      elementIndex: null,
      initialMousePosition: null,
      offset: null,
      shapeBeingDragged: null
    };
  },
  methods: {
    isShapeSelected(shape) {
      return store.getters.selectedShape === shape;
    },
    onMouseDown(index, event) {
      const shape = this.shapesFromLayer[index];
      this.selectShape(shape);
      this.shapeBeingDragged = shape;
      this.initialMousePosition = event.y;
      this.elementHeight = parseInt(
        event.target.closest(".shape.list-node").getBoundingClientRect().height
      );
      this.elementIndex = index;
    },
    onMouseMove(event) {
      if (this.shapeBeingDragged) {
        event.preventDefault();
        this.offset = event.y - this.initialMousePosition;
        if (this.elementHeight < this.offset) {
          store
            .dispatch("swapLayerShapes", {
              layerName: this.layerName,
              sourceIndex: this.elementIndex,
              targetIndex: this.elementIndex + 1
            })
            .then(() => {
              this.initialMousePosition += this.elementHeight;
              this.offset -= this.elementHeight;
              this.elementIndex += 1;
            });
        } else if (this.offset < -this.elementHeight) {
          store
            .dispatch("swapLayerShapes", {
              layerName: this.layerName,
              sourceIndex: this.elementIndex,
              targetIndex: this.elementIndex - 1
            })
            .then(() => {
              this.initialMousePosition -= this.elementHeight;
              this.offset += this.elementHeight;
              this.elementIndex -= 1;
            });
        }
      }
    },
    onMouseUp() {
      this.shapeBeingDragged = null;
      this.initialMousePosition = null;
      this.offset = null;
      store.dispatch("addSnapshot");
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
    style(shape) {
      if (shape === this.shapeBeingDragged && this.offset !== null) {
        return {
          position: "relative",
          transform: `translateY(${this.offset}px)`,
          zIndex: 10
        };
      } else {
        return {};
      }
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
  background-color: var(--panel-bg-color);
  padding-left: 1rem;
}
.shape.list-node label {
  width: 100%;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
.shapes {
  background-color: var(--panel-border-color);
}
.shapes > .selected,
.layer.selected .root-node {
  background-color: var(--selected-color);
  color: white;
}
</style>

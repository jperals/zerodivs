<template>
  <div class="list-node">
    <label class="row wrapper">Stops</label>
    <ul class="stops">
      <li
        v-for="(stop, index) in shape.stops"
        :key="stop.id"
        class="stop draggable"
        :class="{
          'moved-down': isItemMovedDown(index),
          'moved-up': isItemMovedUp(index),
          dragging: stop === itemBeingDragged
        }"
        :style="listItemStyle(stop)"
        v-on:mousedown="onItemMouseDown(index, $event)"
        v-on:mousemove="onItemMouseMove"
        v-on:mouseup="onItemMouseUp"
      >
        <span class="draggable-indicator" />
        <ColorPicker
          v-model="stop.color"
          :on-pick="color => onStopColorPick(stop, color)"
          :on-close="commitChange"
          anchor="right"
          :id="stop.id"
        />
        <input
          type="text"
          class="m-l-s"
          v-model="stop.position"
          v-on:change="
            event => updateStop(stop, { position: event.target.value })
          "
        />
        <CloseButton
          class="remove-stop"
          :on-click="() => removeStop(index)"
          title="Remove stop"
        />
      </li>
    </ul>
    <div class="row add-new">
      <button
        class="add-new-stop"
        v-on:click="() => addNewStop()"
        title="Add new stop"
      >
        Add stop
      </button>
    </div>
  </div>
</template>

<script>
import CloseButton from "@/components/CloseButton.vue";
import ColorPicker from "@/components/ColorPicker.vue";
import DraggableListMixin from "@/components/DraggableListMixin";
import store from "@/store";
export default {
  components: {
    CloseButton,
    ColorPicker
  },
  props: {
    shape: Object
  },
  mixins: [DraggableListMixin],
  methods: {
    addNewStop(index) {
      store.dispatch("addNewStop", { shape: this.shape, index });
    },
    commitChange() {
      store.dispatch("commitChange");
    },
    onStopColorPick(stop, color) {
      this.updateStop(stop, { color });
    },
    removeStop(index) {
      store.dispatch("removeStop", { shape: this.shape, index });
    },
    swapItems(sourceIndex, targetIndex) {
      return store.dispatch("swapStops", {
        shape: this.shape,
        sourceIndex,
        targetIndex
      });
    },
    updateStop(stop, newProps) {
      store.dispatch("updateShapeStop", {
        shape: this.shape,
        stop,
        ...newProps
      });
    }
  },
  computed: {
    items() {
      return this.shape.stops;
    }
  }
};
</script>

<style scoped>
.stop {
  border-color: var(--panel-border-color);
  border-style: solid;
  border-width: 1px 0;
  margin-top: -1px;
}
.list-node {
  padding-bottom: 0;
}
.stops {
  list-style: none;
  margin: 0.25rem 0 0;
  padding: 0;
}
.stop .color-picker {
  flex-grow: 1;
}
.remove-stop {
  box-sizing: border-box;
  width: 1rem;
  height: 1rem;
  padding: 0;
  border-radius: 50%;
  margin-left: 0.5rem;
  opacity: 0;
  min-height: 0;
}
.stop,
.add-new {
  background-color: var(--panel-bg-color);
}
.stop {
  align-items: center;
  padding: 0.375rem 0.5rem;
  display: flex;
  flex-direction: row;
}
.stop:hover .remove-stop {
  opacity: 1;
}
.add-new {
  padding: 0.5rem 0;
}
li.dragging,
li.dragging * {
  cursor: grabbing;
}
li:not(.dragging) {
  transition: transform 100ms;
}
li.moved-down {
  animation: moveDown 150ms;
}
li.moved-up {
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
.stop .color-picker input[type="text"] {
  width: 7ch;
}
.stop .color-picker + input[type="text"] {
  width: 8ch;
}
</style>

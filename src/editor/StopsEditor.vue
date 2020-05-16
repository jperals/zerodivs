<template>
  <div class="list-node">
    <label class="row wrapper">Stops</label>
    <ul class="stops">
      <li
        v-for="(stop, index) in shape.stops"
        :key="stop.id"
        class="stop draggable"
        :class="{ 'moved-down': isItemMovedDown(index), 'moved-up': isItemMovedUp(index), dragging: stop === itemBeingDragged }"
        :style="listItemStyle(stop)"
        v-on:mousedown="onItemMouseDown(index, $event)"
        v-on:mousemove="onItemMouseMove"
        v-on:mouseup="onItemMouseUp"
      >
        <div class="row">
          <div class="wrapper">
            <ColorPicker v-model="stop.color" :on-pick="color => onStopColorPick(stop, color)" />
            <input
              type="text"
              class="w-s m-l-s"
              v-model="stop.position"
              v-on:change="(event) => updateStop(stop, {position: event.target.value})"
            />
            <CloseButton
              class="remove-stop"
              :on-click="() => removeStop(index)"
              title="Remove stop"
            />
          </div>
        </div>
      </li>
    </ul>
    <div class="row add-new">
      <button class="add-new-stop" v-on:click="() => addNewStop()" title="Add new stop">Add</button>
    </div>
  </div>
</template>

<script>
import CloseButton from "@/components/CloseButton";
import ColorPicker from "@/components/ColorPicker";
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
    onStopColorPick(stop, color) {
      this.updateStop(stop, { color });
    },
    removeStop(index) {
      store.dispatch("removeStop", { shape: this.shape, index });
    },
    swapItems(sourceIndex, targetIndex) {
      console.log(sourceIndex, targetIndex);
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
  background-color: var(--panel-child-bg-color);
}
.stop {
  border-color: var(--panel-child-border-color);
  border-style: solid;
  border-width: 0 0 1px 0;
}
.stop:first-child {
  border-top-width: 1px;
}
.stop .wrapper {
  align-items: center;
}
.stop .wrapper:hover .remove-stop {
  opacity: 1;
}
.add-new {
  padding: 0.5rem 0;
}
</style>

<style>
.color-picker input[type="text"] {
  width: 9ch;
}
</style>

<style scoped>
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
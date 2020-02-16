<template>
  <div class="list-node">
    <label class="wrapper">Stops</label>
    <ul class="stops">
      <li v-for="(stop, index) in shape.stops" :key="stop.id" class="stop">
        <div>
          <button
            class="add-new-stop"
            v-on:click="() => addNewStop(index)"
            title="Add new stop"
          >Add</button>
        </div>
        <div class="wrapper">
          <ColorPicker v-model="stop.color" :on-pick="color => onStopColorPick(stop, color)" />
          <input
            type="text"
            class="w-s"
            v-model="stop.position"
            v-on:change="(event) => updateStop(stop, {position: event.target.value})"
          />
          <button class="remove-stop" v-on:click="() => removeStop(index)" title="Remove stop">x</button>
        </div>
      </li>
    </ul>
    <div>
      <button class="add-new-stop" v-on:click="() => addNewStop()">Add</button>
    </div>
  </div>
</template>

<script>
import ColorPicker from "@/components/ColorPicker";
import store from "@/store";
export default {
  components: {
    ColorPicker
  },
  props: {
    shape: Object
  },
  methods: {
    addNewStop(index = this.shape.stops.length) {
      store.dispatch("addNewStop", { shape: this.shape, index });
    },
    onStopColorPick(stop, color) {
      this.updateStop(stop, { color });
    },
    removeStop(index) {
      store.dispatch("removeStop", { shape: this.shape, index });
    },
    updateStop(stop, newProps) {
      store.dispatch("updateShapeStop", {
        shape: this.shape,
        stop,
        ...newProps
      });
    }
  }
};
</script>

<style scoped>
.stops {
  list-style: none;
  margin: 0.25rem 0 0;
  padding: 0;
}
.stop .color-picker {
  flex-grow: 1;
}
.remove-stop {
  border: 1px solid var(--panel-border-color-strong);
  box-sizing: border-box;
  margin-left: 0.25rem;
}
</style>

<style>
.color-picker input[type="text"] {
  width: 10ch;
}
</style>
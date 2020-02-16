<template>
  <div class="list-node">
    <label class="wrapper">Stops</label>
    <ul class="stops">
      <li v-for="(stop, index) in shape.stops" :key="stop.id" class="stop">
        <div class="wrapper">
          <ColorPicker v-model="stop.color" :on-pick="color => onStopColorPick(stop, color)" />
          <input
            type="text"
            class="w-s"
            v-model="stop.position"
            v-on:change="(event) => updateStop(stop, {position: event.target.value})"
          />
          <CloseButton class="remove-stop" :on-click="() => removeStop(index)" title="Remove stop" />
        </div>
      </li>
    </ul>
    <div>
      <button class="add-new-stop" v-on:click="() => addNewStop()" title="Add new stop">Add</button>
    </div>
  </div>
</template>

<script>
import CloseButton from "@/components/CloseButton";
import ColorPicker from "@/components/ColorPicker";
import store from "@/store";
export default {
  components: {
    CloseButton,
    ColorPicker
  },
  props: {
    shape: Object
  },
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
.add-new-stop{
  margin: 0.25rem 0;
}
.remove-stop {
  box-sizing: border-box;
  width: 1rem;
  height: 1rem;
  padding: 0;
  border-radius: 50%;
  margin-left: 0.5rem;
  opacity: 0;
}
.stop .wrapper {
  align-items: center;
}
.stop .wrapper:hover .remove-stop {
  opacity: 1;
}
</style>

<style>
.color-picker input[type="text"] {
  width: 10ch;
}
</style>
<template>
  <div class="list-node">
    <label class="wrapper">Stops</label>
    <ul class="stops">
      <li v-for="stop in shape.stops" :key="stop.id" class="stop wrapper">
        <ColorPicker v-model="stop.color" :on-pick="color => onStopColorPick(stop, color)" />
        <input
          type="text"
          class="w-s"
          v-model="stop.position"
          v-on:change="(event) => updateStop(stop, {position: event.target.value})"
        />
      </li>
    </ul>
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
    onStopColorPick(stop, color) {
      this.updateStop(stop, { color });
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
  padding: 0.25rem 0;
  margin: 0;
}
.stop {
  display: flex;
  flex-direction: row;
}
.stop .color-picker {
  flex-grow: 1;
}
</style>

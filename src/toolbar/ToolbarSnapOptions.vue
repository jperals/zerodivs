<template>
  <section>
    <label>
      <input type="checkbox" :checked="snap" v-model="snap" />
      Snap
    </label>
    <input
      type="number"
      v-model="threshold"
      class="w-s"
      :class="{ inactive: !snap }"
      :disabled="!snap"
    />
    <span class="units">px</span>
  </section>
</template>

<script>
import store from "@/store";
export default {
  computed: {
    snap: {
      get() {
        return store.getters.snap;
      },
      set() {
        store.dispatch("toggleSnap");
      }
    },
    threshold: {
      get() {
        return store.getters.snapThreshold;
      },
      set(value) {
        store.dispatch("setSnapThreshold", value);
      }
    }
  }
};
</script>

<style scoped>
label {
  align-items: center;
  display: flex;
  flex-direction: colum;
  margin-right: 0.25rem;
}
input.inactive {
  pointer-events: none;
  color: lightgray;
}
.units {
  margin-left: 0.25em;
}
</style>

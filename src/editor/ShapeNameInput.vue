<template>
  <span class="root" v-on:click="onClick">
    <input v-if="active" class="shape-name" type="text" v-model="shapeName" ref="input" />
    <span v-else class="shape-name">{{shapeName}}</span>
  </span>
</template>

<script>
import store from "@/store";
export default {
  props: {
    selected: Boolean,
    shape: Object
  },
  data() {
    return {
      active: false,
      firstClickTime: null
    };
  },
  computed: {
    shapeName: {
      get() {
        return this.shape.name;
      },
      set(value) {
        store.dispatch("updateShape", { shape: this.shape, name: value });
      }
    }
  },
  methods: {
    onClick() {
      if (this.firstClickTime) {
        const now = Date.now();
        if (now - this.firstClickTime <= 500) {
          this.active = true;
        }
      }
      this.firstClickTime = Date.now();
    }
  },
  watch: {
    selected(value) {
      if (!value) {
        this.active = false;
      }
    }
  }
};
</script>

<style scoped>
.root {
  font-size: 0;
}
.root > * {
  font-size: 0.75rem;
}
.shape-name {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  display: inline-block;
}
span.shape-name {
  border: 1px solid transparent;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  overflow: hidden;
}
input {
  border-radius: 0.25rem;
  border: 1px solid var(--gray-300);
  margin-left: -0.25rem;
}
</style>

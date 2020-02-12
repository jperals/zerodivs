<template>
  <div>
    <div>
      <label>
        <span>Type</span>
        <input type="text" v-model="type" />
      </label>
    </div>
    <div>
      <label>
        <span>Direction</span>
        <input type="text" v-model="direction" />
      </label>
    </div>
    <div>
      <label>
        <span>Top</span>
        <input type="number" v-model="top" :class="{error: errors.top}" />
        <span class="units">{{shape.top.units}}</span>
      </label>
    </div>
    <div>
      <label>
        <span>Left</span>
        <input type="number" v-model="left" :class="{error: errors.left}" />
        <span class="units">{{shape.left.units}}</span>
      </label>
    </div>
    <div>
      <label>
        <span>Width</span>
        <input type="number" v-model="width" :class="{error: errors.width}" />
        <span class="units">{{shape.width.units}}</span>
      </label>
    </div>
    <div>
      <label>
        <span>Height</span>
        <input type="number" v-model="height" :class="{error: errors.height}" />
        <span class="units">{{shape.height.units}}</span>
      </label>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  props: {
    shape: Object
  },
  data() {
    return {
      errors: {}
    };
  },
  computed: {
    direction: {
      get() {
        return this.shape.direction;
      },
      set(value) {
        store.dispatch("updateShape", {
          shape: this.shape,
          direction: value
        });
      }
    },
    height: {
      get() {
        return this.shape.height.value;
      },
      set(value) {
        store.dispatch("updateShape", {
          shape: this.shape,
          height: {
            value: Number(value)
          }
        });
      }
    },
    left: {
      get() {
        return this.shape.left.value;
      },
      set(value) {
        store.dispatch("updateShape", {
          shape: this.shape,
          left: {
            value: Number(value)
          }
        });
      }
    },
    top: {
      get() {
        return this.shape.top.value;
      },
      set(value) {
        store.dispatch("updateShape", {
          shape: this.shape,
          top: {
            value: Number(value)
          }
        });
      }
    },
    type: {
      get() {
        return this.shape.type;
      },
      set(value) {
        store.dispatch("updateShape", { shape: this.shape, type: value });
      }
    },
    width: {
      get() {
        return this.shape.width.value;
      },
      set(value) {
        store.dispatch("updateShape", {
          shape: this.shape,
          width: {
            value: Number(value)
          }
        });
      }
    }
  }
};
</script>

<style scoped>
input.error {
  background-color: hsl(0, 70%, 95%);
  border-color: hsl(0, 90%, 75%);
}
</style>

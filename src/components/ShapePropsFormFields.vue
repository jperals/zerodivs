<template>
  <div>
    <div class="list-node">
      <label class="wrapper">
        <span class="label">Type</span>
        <input type="text" v-model="type" class="w-l" />
      </label>
    </div>
    <div class="list-node">
      <label class="wrapper">
        <span class="label">Direction</span>
        <input type="text" v-model="direction" class="w-l" />
      </label>
    </div>
    <div class="list-node">
      <div>
        <label class="wrapper">
          <span class="label">Top</span>
          <input type="number" v-model="top" class="w-m" />
          <span class="units">{{shape.top.units}}</span>
        </label>
      </div>
      <div>
        <label class="wrapper">
          <span class="label">Left</span>
          <input type="number" v-model="left" class="w-m" />
          <span class="units">{{shape.left.units}}</span>
        </label>
      </div>
    </div>
    <div class="list-node">
      <div>
        <label class="wrapper">
          <span class="label">Width</span>
          <input type="number" v-model="width" class="w-m" />
          <span class="units">{{shape.width.units}}</span>
        </label>
      </div>
      <div>
        <label class="wrapper">
          <span class="label">Height</span>
          <input type="number" v-model="height" class="w-m" />
          <span class="units">{{shape.height.units}}</span>
        </label>
      </div>
    </div>
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
    <div class="list-node">
      <label class="wrapper">
        <div class="label">Repeat</div>
        <input type="text" v-model="backgroundRepeat" class="w-l" />
      </label>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import ColorPicker from "@/components/ColorPicker";
export default {
  components: {
    ColorPicker
  },
  props: {
    shape: Object
  },
  data() {
    return {
      errors: {}
    };
  },
  computed: {
    backgroundRepeat: {
      get() {
        return this.shape.backgroundRepeat;
      },
      set(value) {
        store.dispatch("updateShape", {
          shape: this.shape,
          repeat: value
        });
      }
    },
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
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0.25rem 0;
}
.label,
.units {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.label {
  flex-grow: 1;
}
input[type="text"],
input[type="number"] {
  font-size: 0.75rem;
}
input[type="text"].w-s,
input[type="number"].w-s {
  width: 4ch;
}
input[type="text"].w-m,
input[type="number"].w-m {
  width: 10ch;
}
input[type="text"].w-l,
input[type="number"].w-l {
  width: 14ch;
}
.units {
  margin-left: 0.5ch;
}
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

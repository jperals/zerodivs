<template>
  <div class="form shape-props-form">
    <div class="list-node">
      <div class="row">
        <label class="wrapper">
          <span class="label">Top</span>
          <input type="number" v-model="top" class="w-m" />
          <span class="units">{{ shape.top.units }}</span>
        </label>
      </div>
      <div class="row">
        <label class="wrapper">
          <span class="label">Left</span>
          <input type="number" v-model="left" class="w-m" />
          <span class="units">{{ shape.left.units }}</span>
        </label>
      </div>
    </div>
    <div class="list-node">
      <div class="row">
        <label class="wrapper">
          <span class="label">Width</span>
          <input type="number" v-model="width" class="w-m" />
          <span class="units">{{ shape.width.units }}</span>
        </label>
      </div>
      <div class="row">
        <label class="wrapper">
          <span class="label">Height</span>
          <input type="number" v-model="height" class="w-m" />
          <span class="units">{{ shape.height.units }}</span>
        </label>
      </div>
    </div>
    <div class="list-node">
      <label class="row wrapper">
        <span class="label">Type</span>
        <select v-model="type" class="w-l">
          <option value="linear">Linear</option>
          <option value="radial">Radial</option>
          <option value="conic">Conic</option>
        </select>
      </label>
    </div>
    <div class="list-node">
      <label class="row wrapper">
        <span class="label">Direction</span>
        <input type="text" v-model="direction" class="m-l-s w-l" />
      </label>
    </div>
    <div class="list-node">
      <label class="row wrapper">
        <div class="label">Repeat</div>
        <input type="text" v-model="backgroundRepeat" class="w-l" />
      </label>
    </div>
    <StopsEditor :shape="shape" />
  </div>
</template>

<script>
import store from "@/store";
import StopsEditor from "./StopsEditor.vue";
export default {
  components: {
    StopsEditor
  },
  props: {
    shape: Object
  },
  computed: {
    backgroundRepeat: {
      get() {
        return this.shape.repeat;
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
  }
};
</script>

<style>
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0.25rem 0;
  box-sizing: border-box;
}
.shape-props-form .list-node .row {
  padding-left: 1rem;
  padding-right: 1rem;
}
.form .label,
.form .units {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.form .label {
  flex-grow: 1;
}
.form .units {
  margin-left: 0.5ch;
}
</style>

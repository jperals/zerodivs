<template>
  <div class="handles" :style="containerStyle" v-on:mouseup="onMouseUp">
    <div
      class="handle top-left"
      v-on:mousedown="($event) => onMouseDown('top-left', $event)"
      :style="transformTopLeft"
    ></div>
    <div class="handle top" v-on:mousedown="($event) => onMouseDown('top', $event)" :style="transformTop"></div>
    <div class="handle top-right" v-on:mousedown="($event) => onMouseDown('top-right', $event)" :style="transformTopRight"></div>
    <div class="handle right" v-on:mousedown="($event) => onMouseDown('right', $event)" :style="transformRight"></div>
    <div
      class="handle bottom-right"
      v-on:mousedown="($event) => onMouseDown('bottom-right', $event)" :style="transformBottomRight"
    ></div>
    <div class="handle bottom" v-on:mousedown="($event) => onMouseDown('bottom', $event)" :style="transformBottom"></div>
    <div class="handle bottom-left" v-on:mousedown="($event) => onMouseDown('bottom-left', $event)" :style="transformBottomLeft"></div>
    <div class="handle left" v-on:mousedown="($event) => onMouseDown('left', $event)" :style="transformLeft"></div>
  </div>
</template>

<script>
import shapes2css from "@/common/shapes2css";
export default {
  props: {
    onMouseDown: Function,
    onMouseUp: Function,
    shape: Object
  },
  computed: {
    containerStyle() {
      const color = "red";
      const shapes = [
        {
          height: {
            value: 1,
            units: "px"
          },
          width: {
            value: this.shape.width.value,
            units: this.shape.width.units
          },
          top: this.shapeTop,
          left: this.shapeLeft,
          type: "linear",
          direction: "to bottom",
          stops: [{ color }, { color }]
        },
        {
          height: {
            value: this.shape.height.value,
            units: this.shape.height.units
          },
          width: {
            value: 1,
            units: "px"
          },
          top: this.shapeTop,
          left: this.shapeRight,
          type: "linear",
          direction: "to bottom",
          stops: [{ color }, { color }]
        },
        {
          height: {
            value: 1,
            units: "px"
          },
          width: {
            value: this.shape.width.value,
            units: this.shape.width.units
          },
          top: this.shapeBottom,
          left: this.shapeLeft,
          type: "linear",
          direction: "to bottom",
          stops: [{ color }, { color }]
        },
        {
          height: {
            value: this.shape.height.value,
            units: this.shape.height.units
          },
          width: {
            value: 1,
            units: "px"
          },
          top: this.shapeTop,
          left: this.shapeLeft,
          type: "linear",
          direction: "to bottom",
          stops: [{ color }, { color }]
        }
      ];
      return shapes2css(shapes);
    },
    shapeBottom() {
      return {
        value: this.shape.top.value + this.shape.height.value,
        units: this.shape.top.units
      };
    },
    shapeLeft() {
      return {
        value: this.shape.left.value,
        units: this.shape.left.units
      };
    },
    shapeRight() {
      return {
        value: this.shape.left.value + this.shape.width.value,
        units: this.shape.left.units
      };
    },
    shapeTop() {
      return {
        value: this.shape.top.value,
        units: this.shape.top.units
      };
    },
    transformBottom() {
      return this.transform({ top: this.shapeBottom, left: {value: (this.shapeLeft.value + this.shapeRight.value)/2, units: this.shapeLeft.units }});
    },
    transformBottomLeft() {
      return this.transform({ top: this.shapeBottom, left: this.shapeLeft});
    },
    transformBottomRight() {
      return this.transform({ top: this.shapeBottom, left: this.shapeRight});
    },
    transformLeft() {
      return this.transform({ top: {value: (this.shapeTop.value + this.shapeBottom.value)/2, units: this.shapeTop.units}, left: this.shapeLeft })
    },
    transformRight() {
      return this.transform({ top: {value: (this.shapeTop.value + this.shapeBottom.value)/2, units: this.shapeTop.units}, left: this.shapeRight })
    },
    transformTop() {
      return this.transform({ top: this.shapeTop, left: {value: (this.shapeLeft.value + this.shapeRight.value)/2, units: this.shapeLeft.units }});
    },
    transformTopLeft() {
      return this.transform({ top: this.shapeTop, left: this.shapeLeft });
    },
    transformTopRight() {
      return this.transform({ top: this.shapeTop, left: this.shapeRight });
    }
  },
  methods: {
    transform({ top, left }) {
      return `transform: translate(${left.value}${left.units}, ${top.value}${top.units})`;
    }
  }
};
</script>

<style scoped lang="scss">
$handle-width: 8px;
.handles {
  position: absolute;
  left: -2px;
  top: -2px;
  right: -2px;
  bottom: -2px;
  pointer-events: none;
}
.handle {
  background-color: white;
  border: 1px solid lightgray;
  position: absolute;
  width: $handle-width;
  height: $handle-width;
  pointer-events: all;
  left: -$handle-width/2;
  top: -$handle-width/2;
}
.top-left {
  cursor: nwse-resize;
}
.top {
  cursor: ns-resize;
}
.top-right {
  cursor: nesw-resize;
}
.right {
  cursor: ew-resize;
}
.bottom-right {
  cursor: nwse-resize;
}
.bottom {
  cursor: ns-resize;
}
.bottom-left {
  cursor: nesw-resize;
}
.left {
  cursor: ew-resize;
}
</style>

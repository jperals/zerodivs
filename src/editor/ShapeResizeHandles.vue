<template>
  <div
    class="shape-handles-wrapper"
    v-if="canvasPosition"
    :style="containerStyle"
    ref="wrapper"
    v-on:mouseup="onMouseUp"
  >
    <template v-if="showHandles">
      <div
        class="handle top-left"
        v-on:mousedown="($event) => onMouseDown('top-left', $event)"
        :style="transformTopLeft"
      ></div>
      <div
        class="handle top"
        v-on:mousedown="($event) => onMouseDown('top', $event)"
        :style="transformTop"
      ></div>
      <div
        class="handle top-right"
        v-on:mousedown="($event) => onMouseDown('top-right', $event)"
        :style="transformTopRight"
      ></div>
      <div
        class="handle right"
        v-on:mousedown="($event) => onMouseDown('right', $event)"
        :style="transformRight"
      ></div>
      <div
        class="handle bottom-right"
        v-on:mousedown="($event) => onMouseDown('bottom-right', $event)"
        :style="transformBottomRight"
      ></div>
      <div
        class="handle bottom"
        v-on:mousedown="($event) => onMouseDown('bottom', $event)"
        :style="transformBottom"
      ></div>
      <div
        class="handle bottom-left"
        v-on:mousedown="($event) => onMouseDown('bottom-left', $event)"
        :style="transformBottomLeft"
      ></div>
      <div
        class="handle left"
        v-on:mousedown="($event) => onMouseDown('left', $event)"
        :style="transformLeft"
      ></div>
    </template>
  </div>
</template>

<script>
import shapes2css from "@/common/shapes2css";
export default {
  props: {
    canvasPosition: Object,
    showHandles: {
      type: Boolean,
      required: false,
      default: true,
    },
    onMouseDown: Function,
    onMouseUp: Function,
    viewportTransform: Object,
    shape: Object,
  },
  computed: {
    containerStyle() {
      const color = "orange";
      const shapes = [
        {
          height: {
            value: 1,
            units: "px",
          },
          width: {
            value: this.shape.width.value * this.viewportTransform.scale,
            units: this.shape.width.units,
          },
          ...this.transformCoords({ top: this.shapeTop, left: this.shapeLeft }),
          type: "linear",
          direction: "to bottom",
          stops: [{ color }, { color }],
        },
        {
          height: {
            value: this.shape.height.value * this.viewportTransform.scale,
            units: this.shape.height.units,
          },
          width: {
            value: 1,
            units: "px",
          },
          ...this.transformCoords({
            top: this.shapeTop,
            left: this.shapeRight,
          }),
          type: "linear",
          direction: "to bottom",
          stops: [{ color }, { color }],
        },
        {
          height: {
            value: 1,
            units: "px",
          },
          width: {
            value: this.shape.width.value * this.viewportTransform.scale,
            units: this.shape.width.units,
          },
          ...this.transformCoords({
            top: this.shapeBottom,
            left: this.shapeLeft,
          }),
          type: "linear",
          direction: "to bottom",
          stops: [{ color }, { color }],
        },
        {
          height: {
            value: this.shape.height.value * this.viewportTransform.scale,
            units: this.shape.height.units,
          },
          width: {
            value: 1,
            units: "px",
          },
          ...this.transformCoords({ top: this.shapeTop, left: this.shapeLeft }),
          type: "linear",
          direction: "to bottom",
          stops: [{ color }, { color }],
        },
      ];
      return shapes2css(shapes);
    },
    shapeBottom() {
      return {
        value: this.shape.top.value + this.shape.height.value,
        units: this.shape.top.units,
      };
    },
    shapeLeft() {
      return {
        value: this.shape.left.value,
        units: this.shape.left.units,
      };
    },
    shapeRight() {
      return {
        value: this.shape.left.value + this.shape.width.value,
        units: this.shape.left.units,
      };
    },
    shapeTop() {
      return {
        value: this.shape.top.value,
        units: this.shape.top.units,
      };
    },
    transformBottom() {
      return this.cssTransform({
        top: this.shapeBottom,
        left: {
          value: (this.shapeLeft.value + this.shapeRight.value) / 2,
          units: this.shapeLeft.units,
        },
      });
    },
    transformBottomLeft() {
      return this.cssTransform({ top: this.shapeBottom, left: this.shapeLeft });
    },
    transformBottomRight() {
      return this.cssTransform({
        top: this.shapeBottom,
        left: this.shapeRight,
      });
    },
    transformLeft() {
      return this.cssTransform({
        top: {
          value: (this.shapeTop.value + this.shapeBottom.value) / 2,
          units: this.shapeTop.units,
        },
        left: this.shapeLeft,
      });
    },
    transformRight() {
      return this.cssTransform({
        top: {
          value: (this.shapeTop.value + this.shapeBottom.value) / 2,
          units: this.shapeTop.units,
        },
        left: this.shapeRight,
      });
    },
    transformTop() {
      return this.cssTransform({
        top: this.shapeTop,
        left: {
          value: (this.shapeLeft.value + this.shapeRight.value) / 2,
          units: this.shapeLeft.units,
        },
      });
    },
    transformTopLeft() {
      return this.cssTransform({ top: this.shapeTop, left: this.shapeLeft });
    },
    transformTopRight() {
      return this.cssTransform({ top: this.shapeTop, left: this.shapeRight });
    },
  },
  methods: {
    cssTransform({ top, left }) {
      const transformed = this.transformCoords({ top, left });
      return `transform: translate(${transformed.left.value}${left.units}, ${transformed.top.value}${top.units})`;
    },
    handleWheel(event) {
      if (event.target.classList.contains("handle")) {
        event.preventDefault();
      }
    },
    transformCoords({ top, left, offset = { top: 0, left: 0 } }) {
      if (!this.canvasPosition) {
        return;
      }
      return {
        top: {
          ...top,
          value:
            top.value * this.viewportTransform.scale +
            offset.top +
            this.canvasPosition.y,
        },
        left: {
          ...left,
          value:
            left.value * this.viewportTransform.scale +
            offset.left +
            this.canvasPosition.x,
        },
      };
    },
  },
  mounted() {
    this.$refs.wrapper.addEventListener("wheel", this.handleWheel);
  },
  beforeDestroy() {
    this.$refs.wrapper.removeEventListener("wheel", this.handleWheel);
  },
};
</script>

<style scoped lang="scss">
$handle-width: 8px;
.shape-handles-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}
.handle {
  background-color: white;
  border: 1px solid var(--gray-400);
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

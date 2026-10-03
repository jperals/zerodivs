<template>
  <div
    class="handle"
    :class="position"
    draggable="false"
    @dragstart.prevent
    v-on:mousedown="($event) => onMouseDown(position, $event)"
    :style="transform"
  ></div>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      required: true,
      validator: (v) =>
        ['top-left', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left'].includes(v),
    },
    transform: {
      type: String,
      required: true,
    },
    onMouseDown: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@use "sass:math";

$handle-width: 8px;

.handle {
  background-color: white;
  border: 1px solid var(--gray-400);
  position: absolute;
  width: $handle-width;
  height: $handle-width;
  pointer-events: all;
  left: math.div(-$handle-width, 2);
  top: math.div(-$handle-width, 2);
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

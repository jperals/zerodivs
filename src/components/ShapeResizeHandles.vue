<template>
  <div class="handles">
    <div class="handle top-left" v-on:mousedown="($event) => onMouseDown('top-left', $event)"></div>
    <div class="handle top" v-on:mousedown="($event) => onMouseDown('top', $event)"></div>
    <div class="handle top-right" v-on:mousedown="($event) => onMouseDown('top-right', $event)"></div>
    <div class="handle right" v-on:mousedown="($event) => onMouseDown('right', $event)"></div>
    <div class="handle bottom-right" v-on:mousedown="($event) => onMouseDown('bottom-right', $event)"></div>
    <div class="handle bottom" v-on:mousedown="($event) => onMouseDown('bottom', $event)"></div>
    <div class="handle bottom-left" v-on:mousedown="($event) => onMouseDown('bottom-left', $event)"></div>
    <div class="handle left" v-on:mousedown="($event) => onMouseDown('left', $event)"></div>
  </div>
</template>

<script>
export default {
  props: {
    onMouseDown: Function
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
}
.handle {
  background-color: white;
  border: 1px solid lightgray;
  position: absolute;
  width: $handle-width;
  height: $handle-width;
}
.top-left {
  left: -$handle-width/2;
  top: -$handle-width/2;
  cursor: nwse-resize;
}
.top {
  left: calc(50% - #{$handle-width/2});
  top: -$handle-width/2;
  cursor: ns-resize;
}
.top-right {
  right: -$handle-width/2;
  top: -$handle-width/2;
  cursor: nesw-resize;
}
.right {
  right: -$handle-width/2;
  top: calc(50% - #{$handle-width/2});
  cursor: ew-resize;
}
.bottom-right {
  right: -$handle-width/2;
  bottom: -$handle-width/2;
  cursor: nwse-resize;
}
.bottom {
  left: calc(50% - #{$handle-width/2});
  bottom: -$handle-width/2;
  cursor: ns-resize;
}
.bottom-left {
  left: -$handle-width/2;
  bottom: -$handle-width/2;
  cursor: nesw-resize;
}
.left {
  left: -$handle-width/2;
  top: calc(50% - #{$handle-width/2});
  cursor: ew-resize;
}
</style>

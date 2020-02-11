<template>
  <div class="handles">
    <div class="handle top-left"></div>
    <div class="handle top"></div>
    <div class="handle top-right"></div>
    <div class="handle right"></div>
    <div class="handle bottom-right"></div>
    <div class="handle bottom"></div>
    <div class="handle bottom-left"></div>
    <div class="handle left"></div>
  </div>
</template>

<script>
export default {
  props: {}
};
</script>

<style scoped lang="scss">
$handle-width: 8px;
.handles {
  position: absolute;
  left: -1px;
  top: -1px;
  right: -1px;
  bottom: -1px;
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

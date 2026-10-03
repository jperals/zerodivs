<template>
  <div
    class="workspace"
    ref="workspace"
    :class="{ 'adding-shape': addingShape }"
  >
    <input type="text" ref="focus" class="fake-focus" />
    <pinch-zoom ref="pinchZoom">
      <div
        class="pinch-zoom-wrapper"
        v-on:mousemove="onDrag"
        v-on:mouseup="onMouseUp"
        v-on:pointerdown="onMouseDown"
        ref="pinchZoomInner"
      >
        <div class="full-wrapper">
          <div
            class="canvas-wrapper"
            :class="'canvas-wrapper-' + projectId"
            ref="canvas"
          >
            <EditorCanvas :projectId="projectId" :shapesLayers="shapesLayers" />
          </div>
        </div>
        <div class="full-wrapper">
          <ShapeOverlays
            :onShapeMouseDown="onShapeMouseDown"
            :onShapeMouseUp="onShapeMouseUp"
            :projectId="projectId"
            :shapesLayers="shapesLayers"
          />
        </div>
      </div>
    </pinch-zoom>
    <template v-if="canvasPosition">
      <ShapeResizeHandles
        v-for="shape in selectedShapes"
        :canvasPosition="canvasPosition"
        :key="shape.id"
        :onMouseDown="onResizeHandleMouseDown"
        :onMouseUp="onMouseUp"
        :shape="shape"
        :showHandles="!!selectedShape"
        :viewportTransform="viewportTransform"
      />
    </template>
    <div class="reset-zoom" v-if="zoomLevel && zoomLevel !== 1">
      <p class="zoom-value">Zoom: {{ zoomLevelPercentage }}%</p>
      <button v-on:click="resetZoom">Reset</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import store from "@/store";
import EditorCanvas from "./EditorCanvas.vue";
import { deepCopy } from "@/common/utils";
import { transformCoords as transformCoordsUtil } from "@/common/geometry";
import ShapeOverlays from "./ShapeOverlays.vue";
import ShapeResizeHandles from "./ShapeResizeHandles.vue";
import "pinch-zoom-element";

// --- Template refs ---
const workspace = ref<HTMLDivElement | null>(null);
const focus = ref<HTMLInputElement | null>(null);
const pinchZoom = ref<any>(null);
const pinchZoomInner = ref<HTMLDivElement | null>(null);
const canvas = ref<HTMLDivElement | null>(null);

// --- Reactive state ---
const canvasPosition = ref<{ x: number; y: number } | null>(null);
const currentAction = ref<any>(null);
const dragging = ref(false);
const initialNewShapePosition = ref<{ left: number; top: number } | null>(null);
const initialShapeProps = ref<any>(null);
const initialMousePosition = ref<{ x: number; y: number } | null>(null);
const initialPointerPosition = ref<any>(null);
const resizeDirection = ref<any>(null);
const shapeBeingAdded = ref<any>(null);
const shapesBeingMoved = ref<Record<string, any> | null>(null);
const viewportTransform = ref({ x: 0, y: 0, scale: 1 });

// --- Computed ---
const addingShape = computed(() => !!store.getters.shapeToBeAdded);
const projectId = computed(() => store.getters.currentProject.id);
const selectedShape = computed(() => store.getters.selectedShape);
const selectedShapes = computed(() => store.getters.selectedShapes);
const selectingMultipleShapes = computed(() => {
  const selectMultiple = store.getters.isKeyPressed("Shift");
  return selectMultiple || 1 < store.getters.selectedShapes.length;
});
const shapes = computed(() => store.getters.shapes);
const shapesLayers = computed(() => store.getters.allLayers);
const zoomLevel = computed(() => viewportTransform.value.scale);
const zoomLevelPercentage = computed(() => decimals(zoomLevel.value * 100, 0));

// --- Stable resize event handlers (top-level consts — same reference across add/remove) ---
const _onResizeMouseMove = (event: MouseEvent) => {
  if (!initialMousePosition.value || !resizeDirection.value) return;
  dragging.value = true;
  const { x, y } = transformCoords({ x: event.x, y: event.y });
  const diff = {
    left: x - initialMousePosition.value.x,
    top: y - initialMousePosition.value.y,
  };
  resizeShape(diff);
};

const _onResizeMouseUp = (_event: MouseEvent) => {
  document.removeEventListener("mousemove", _onResizeMouseMove);
  document.removeEventListener("mouseup", _onResizeMouseUp);
  initialMousePosition.value = null;
  initialShapeProps.value = null;
  resizeDirection.value = null;
  if (dragging.value) {
    onChange();
    dragging.value = false;
  }
};

// --- Methods ---
function dragNewShape(diff: { left: number; top: number }) {
  const roundedDiff = {
    left: Math.round(diff.left),
    top: Math.round(diff.top),
  };
  const x =
    0 <= roundedDiff.left
      ? initialNewShapePosition.value!.left
      : initialNewShapePosition.value!.left + roundedDiff.left;
  const width = Math.abs(roundedDiff.left);
  const y =
    0 <= roundedDiff.top
      ? initialNewShapePosition.value!.top
      : initialNewShapePosition.value!.top + roundedDiff.top;
  const height = Math.abs(roundedDiff.top);
  store.dispatch("updateShape", {
    shape: store.getters.shapeToBeAdded,
    width: { value: width },
    height: { value: height },
    top: { value: y },
    left: { value: x },
    round: true,
  });
}

function initDrag({ event }: { event: MouseEvent }) {
  shapesBeingMoved.value = {};
  for (const shape of store.getters.selectedShapes) {
    shapesBeingMoved.value[shape.id] = deepCopy(shape);
  }
  updateCanvasPosition();
  initialMousePosition.value = transformCoords({ x: event.x, y: event.y });
}

function moveShapes(diff: { left: number; top: number }) {
  const selectedShapes = store.getters.selectedShapes;
  if (selectedShapes.length === 1) {
    const newPosition = {
      left: initialShapeProps.value.left.value + diff.left,
      top: initialShapeProps.value.top.value + diff.top,
    };
    store.dispatch("moveShape", {
      shape: selectedShapes[0],
      left: { value: newPosition.left, units: "px" },
      top: { value: newPosition.top, units: "px" },
    });
  } else {
    for (const shape of store.getters.selectedShapes) {
      const initialProps = shapesBeingMoved.value![shape.id];
      store.dispatch("moveShape", {
        shape,
        left: {
          value: initialProps.left.value + diff.left,
          units: "px",
        },
        top: { value: initialProps.top.value + diff.top, units: "px" },
      });
    }
  }
}

function onChange() {
  store.dispatch("setCurrentSnaps");
  store.dispatch("commitChange");
}

function onDrag(event: MouseEvent) {
  if (!initialMousePosition.value) {
    updateViewport();
    return;
  }
  event.stopPropagation();
  dragging.value = true;
  const { x, y } = transformCoords({ x: event.x, y: event.y });
  const diff = {
    left: x - initialMousePosition.value.x,
    top: y - initialMousePosition.value.y,
  };
  if (addingShape.value) {
    dragNewShape(diff);
  } else if (resizeDirection.value) {
    resizeShape(diff);
  } else if (shapesBeingMoved.value) {
    moveShapes(diff);
  }
}

function onMouseDown(event: MouseEvent) {
  focus.value!.focus();
  if (addingShape.value) {
    event.stopPropagation();
    updateCanvasPosition();
    initialMousePosition.value = transformCoords({ x: event.x, y: event.y });
    initialNewShapePosition.value = {
      left:
        (event.x - canvasPosition.value!.x) / viewportTransform.value.scale,
      top: (event.y - canvasPosition.value!.y) / viewportTransform.value.scale,
    };
    shapeBeingAdded.value = {
      ...store.getters.shapeToBeAdded,
      width: {
        units: "px",
        value: 0,
      },
      height: {
        units: "px",
        value: 0,
      },
      left: {
        units: "px",
        value: initialNewShapePosition.value.left,
      },
      top: {
        units: "px",
        value: initialNewShapePosition.value.top,
      },
    };
    store.dispatch("setShapeToBeAdded", shapeBeingAdded.value);
  } else {
    store.dispatch("unselectShape");
  }
}

function onMouseUp(event: MouseEvent) {
  event.stopPropagation();
  initialMousePosition.value = null;
  initialShapeProps.value = null;
  resizeDirection.value = null;
  shapesBeingMoved.value = null;
  if (addingShape.value) {
    store
      .dispatch("addShape", {
        layerName: store.getters.selectedLayer,
        shape: store.getters.shapeToBeAdded,
      })
      .then((newShape: any) => {
        store
          .dispatch("selectShape", { shape: newShape })
          .then(() => store.dispatch("generateSnapPoints"));
      });
    shapeBeingAdded.value = null;
  }
  if (dragging.value) {
    onChange();
    dragging.value = false;
  }
}

function onResizeHandleMouseDown(direction: any, event: MouseEvent) {
  event.stopPropagation();
  const shape = store.getters.selectedShape;
  if (!shape) {
    return;
  }
  resizeDirection.value = direction;
  updateCanvasPosition();
  initialMousePosition.value = transformCoords({ x: event.x, y: event.y });
  initialShapeProps.value = {
    left: { ...shape.left },
    top: { ...shape.top },
    width: { ...shape.width },
    height: { ...shape.height },
  };
  // Attach document-level listeners so resize works across Firefox's pointer capture boundary
  document.addEventListener("mousemove", _onResizeMouseMove);
  document.addEventListener("mouseup", _onResizeMouseUp);
}

function onShapeMouseDown(shape: any, event: MouseEvent) {
  if (addingShape.value) {
    return;
  }
  event.stopPropagation();
  initDrag({ event });
  initialShapeProps.value = {
    left: { ...shape.left },
    top: { ...shape.top },
    width: { ...shape.width },
    height: { ...shape.height },
  };
  if (!selectingMultipleShapes.value) {
    store
      .dispatch("selectShape", { shape })
      .then(() => store.dispatch("generateSnapPoints"));
  }
}

function onShapeMouseUp(shape: any, event: MouseEvent) {
  if (addingShape.value) {
    return;
  }
  event.stopPropagation();
  initialMousePosition.value = null;
  initialShapeProps.value = null;
  resizeDirection.value = null;
  shapesBeingMoved.value = null;
  if (dragging.value) {
    onChange();
    dragging.value = false;
  } else if (selectingMultipleShapes.value) {
    store
      .dispatch("selectShape", {
        shape,
        keepSelection: store.getters.isKeyPressed("Shift"),
      })
      .then(() => store.dispatch("generateSnapPoints"));
  }
}

function resetZoom() {
  pinchZoom.value.setTransform({ scale: 1, x: 0, y: 0 });
  updateViewport();
}

function resizeShape(diff: { left: number; top: number }) {
  store.dispatch("resizeShape", {
    diff,
    direction: resizeDirection.value,
    initialShapeProps: initialShapeProps.value,
    shape: store.getters.selectedShape,
  });
}

function preventZoom(event: Event) {
  event.stopPropagation();
}

function transformCoords({ x, y }: { x: number; y: number }) {
  return transformCoordsUtil({
    x,
    y,
    viewportTransform: viewportTransform.value,
  });
}

function updateCanvasPosition() {
  const canvasRect = canvas.value!.getBoundingClientRect();
  canvasPosition.value = { x: canvasRect.left, y: canvasRect.top };
}

function updateViewport() {
  // Use setTimeout to let the pinch-zoom web component render first,
  // so that we can access its updated properties.
  setTimeout(() => {
    updateCanvasPosition();
    viewportTransform.value = {
      x: pinchZoom.value.x,
      y: pinchZoom.value.y,
      scale: pinchZoom.value.scale,
    };
  }, 0);
}

// --- Lifecycle ---
onMounted(() => {
  pinchZoom.value.addEventListener("wheel", updateViewport, { passive: true });
  pinchZoom.value.addEventListener("pointermove", updateViewport);
  updateCanvasPosition();
});

onBeforeUnmount(() => {
  document.removeEventListener("mousemove", _onResizeMouseMove);
  document.removeEventListener("mouseup", _onResizeMouseUp);
  pinchZoom.value.removeEventListener("wheel", updateViewport);
  pinchZoom.value.removeEventListener("pointermove", updateViewport);
  store.dispatch("unselectShape");
});
</script>

<script lang="ts">
function decimals(n: number, desiredDecimals: number): string | number {
  if (!desiredDecimals) {
    return Math.round(n);
  }
  const rounded =
    Math.round(n * Math.pow(10, desiredDecimals)) /
    Math.pow(10, desiredDecimals);
  let str = String(rounded);
  const actualDecimalDigits = str.split(".")[1];
  let actualLength = 0;
  if (actualDecimalDigits === undefined) {
    str += ".";
  } else {
    actualLength = actualDecimalDigits.length;
  }
  for (let i = 0; i < desiredDecimals - actualLength; i++) {
    str += "0";
  }
  return str;
}
</script>

<style scoped>
.workspace,
pinch-zoom {
  height: 100%;
}
.workspace {
  background-color: var(--panel-border-color);
  margin-left: var(--layers-width);
  margin-right: var(--shape-form-width);
}
.workspace.adding-shape {
  cursor: crosshair;
}
.fake-focus {
  position: absolute;
  z-index: -1;
}
.pinch-zoom-wrapper {
  width: 100%;
  height: 100%;
}
.full-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.overlays {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.reset-zoom {
  position: absolute;
  right: 210px;
  top: 10px;
  background-color: hsla(0, 0%, 92%, 0.5);
  padding: 0.5rem;
  border-radius: 0.25rem;
  text-align: right;
}
.reset-zoom .zoom-value {
  font-size: 0.75rem;
  margin: 0 0 0.25rem;
  text-align: left;
}
.workspace:not(.adding-shape) .overlay:not(.selected):hover {
  border: 1px solid hsl(200, 80%, 85%);
}
</style>

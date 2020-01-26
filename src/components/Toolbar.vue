<template>
  <div class="toolbar">
    <section>
      <Button :callback="undo" />
      <Button :callback="redo" />
    </section>
    <section>
      <ShapeButton
        v-for="(shape, index) in buttonShapes"
        :key="index"
        :shape="shape"
        :callback="addShape"
      />
    </section>
  </div>
</template>

<script>
import Button from "@/components/ToolbarButton";
import ShapeButton from "@/components/ShapeButton";
import buttonShapes from "@/components/toolbar-button-shapes";
import store from "@/store";
export default {
  components: {
    Button,
    ShapeButton
  },
  data() {
    return {
      buttonShapes: buttonShapes("lightgray")
    };
  },
  methods: {
    undo() {
      store.dispatch("undo");
    },
    redo() {
      store.dispatch("redo");
    },
    addShape(shape) {
      console.log("TODO Add shape", shape.type);
    }
  }
};
</script>

<style scoped>
.toolbar {
  padding: 0.25rem 1rem;
  border-bottom: 1px solid var(--panel-border-color);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>

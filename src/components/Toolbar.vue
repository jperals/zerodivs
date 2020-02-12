<template>
  <div class="toolbar">
    <section>
      <Button :callback="undo" />
      <Button :callback="redo" />
    </section>
    <section>
      <ShapeButton
        v-for="(shapeGenerator, index) in buttonShapeGenerators"
        :key="index"
        :shapeGenerator="shapeGenerator"
      />
    </section>
    <section>
      <ColorPicker />
    </section>
  </div>
</template>

<script>
import Button from "@/components/ToolbarButton";
import ColorPicker from "@/components/ColorPicker";
import ShapeButton from "@/components/ShapeButton";
import buttonShapeGenerators from "@/components/toolbar-button-shapes";
import store from "@/store";
export default {
  components: {
    Button,
    ColorPicker,
    ShapeButton
  },
  data() {
    return {
      buttonShapeGenerators
    };
  },
  methods: {
    undo() {
      store.dispatch("undo");
    },
    redo() {
      store.dispatch("redo");
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

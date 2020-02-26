<template>
  <div class="toolbar">
    <section>
      <Button :callback="undo" />
      <Button :callback="redo" />
    </section>
    <section>
      <ShapeButtonGroup
        v-for="(shapeGeneratorGroup, index) in buttonShapeGenerators"
        :key="index"
        :shapeGeneratorGroup="shapeGeneratorGroup"
      />
    </section>
    <section>
      <CurrentColorPicker />
    </section>
  </div>
</template>

<script>
import Button from "./ToolbarButton";
import CurrentColorPicker from "@/components/CurrentColorPicker";
import ShapeButtonGroup from "./ShapeButtonGroup";
import buttonShapeGenerators from "./toolbar-button-shapes";
import store from "@/store";
export default {
  components: {
    Button,
    CurrentColorPicker,
    ShapeButtonGroup
  },
  data() {
    return {
      buttonShapeGenerators: buttonShapeGenerators
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
  border-width: 1px 0;
  border-style: solid;
  border-color: var(--panel-border-color);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--panel-bg-color);
}
section button:first-child {
  margin-left: 0;
}
section button:last-child {
  margin-right: 0;
}
</style>

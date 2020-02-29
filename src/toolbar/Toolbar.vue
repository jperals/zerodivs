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
    <section class="right">
      <CurrentColorPicker />
      <ToolbarSnapOptions />
    </section>
  </div>
</template>

<script>
import Button from "./ToolbarButton";
import buttonShapeGenerators from "./toolbar-button-shapes";
import CurrentColorPicker from "./CurrentColorPicker";
import ShapeButtonGroup from "./ShapeButtonGroup";
import store from "@/store";
import ToolbarSnapOptions from "./ToolbarSnapOptions";
export default {
  components: {
    Button,
    CurrentColorPicker,
    ShapeButtonGroup,
    ToolbarSnapOptions
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
  font-size: 0.75rem;
}
section button:first-child {
  margin-left: 0;
}
section button:last-child {
  margin-right: 0;
}
.toolbar > section {
  display: flex;
  flex-direction: row;
}
.toolbar section.right > * {
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
}
.toolbar section.right section:not(:first-child) {
  margin-left: .75rem;
}
.toolbar section.right section:not(:last-child) {
  margin-right: 0.75rem;
}

</style>

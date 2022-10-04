<template>
  <div class="toolbar">
    <section>
      <section>
        <UndoButton />
        <RedoButton />
      </section>
    </section>
    <section>
      <CurrentColorPicker />
    </section>
    <section>
      <ShapeButtonGroup
        v-for="(shapeGeneratorGroup, index) in buttonShapeGenerators"
        :key="index"
        :shapeGeneratorGroup="shapeGeneratorGroup"
      />
    </section>
    <section class="input">
      <LineThicknessPicker />
    </section>
    <section class="input">
      <ToolbarSnapOptions />
    </section>
  </div>
</template>

<script>
import buttonShapeGenerators from "./toolbar-button-shapes";
import CurrentColorPicker from "./CurrentColorPicker";
import LineThicknessPicker from "./LineThicknessPicker.vue";
import RedoButton from "@/undo-redo/RedoButton";
import ShapeButtonGroup from "./ShapeButtonGroup";
import store from "@/store";
import ToolbarSnapOptions from "./ToolbarSnapOptions";
import UndoButton from "@/undo-redo/UndoButton";
export default {
  components: {
    CurrentColorPicker,
    LineThicknessPicker,
    RedoButton,
    ShapeButtonGroup,
    ToolbarSnapOptions,
    UndoButton
  },
  data() {
    return {
      buttonShapeGenerators: buttonShapeGenerators
    };
  },
  methods: {
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
  flex-wrap: wrap;
  background-color: var(--panel-bg-color);
  font-size: 0.75rem;
}
section button:first-child {
  margin-left: 0;
}
section button:last-child {
  margin-right: 0;
}
.toolbar > section:not(.input) > * {
  height: 100%;
}
.toolbar > section.input {
  display: flex;
  align-items: center;
}

.toolbar > section:first-child > *,
.toolbar > section:last-child > * {
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
}
.toolbar section.right section:not(:first-child) {
  margin-left: 0.75rem;
}
.toolbar section.right section:not(:last-child) {
  margin-right: 0.75rem;
}
</style>

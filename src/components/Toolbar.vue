<template>
  <div class="toolbar">
    <section>
      <Button :callback="undo" />
      <Button :callback="redo" />
    </section>
  </div>
</template>

<script>
import Button from "@/components/ToolbarButton";
import store from "@/store";
export default {
  components: {
    Button
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
}
</style>

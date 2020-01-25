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

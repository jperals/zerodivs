<template>
  <AddButton :onClick="onClick" />
</template>

<script>
import AddButton from "@/components/AddButton";
export default {
  components: {
    AddButton
  },
  props: {
    onClick: Function
  }
}
</script>

<style scoped>
  button {
    transform: rotate(45deg);
  }
</style>

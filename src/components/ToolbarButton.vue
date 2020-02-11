<template>
  <button v-on:click="callback"></button>
</template>

<script>
export default {
  props: {
    callback: Function
  }
};
</script>

<style scoped>
button {
  height: 1.5rem;
  width: 1.5rem;
  border-color: var(--panel-border-color);
}
</style>

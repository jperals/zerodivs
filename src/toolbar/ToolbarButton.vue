<template>
  <button v-on:click="callback" title="Click to add this shape"></button>
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
  height: 2rem;
  width: 2rem;
  margin: 2px;
  border-color: var(--panel-border-color-strong);
  border-radius: 2px;
}
button:not(.disabled):hover {
  border-color: var(--panel-border-color-stronger);
  background-color: hsl(0, 0%, 97%);
}
</style>

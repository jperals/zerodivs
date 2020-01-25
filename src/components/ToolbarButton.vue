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

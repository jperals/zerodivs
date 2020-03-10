<template>
  <form action="https://codepen.io/pen/define" method="POST" target="_blank">
    <input type="hidden" name="data" :value="value" />

    <input type="submit" value="Export to CodePen" />
  </form>
</template>

<script>
export default {
  computed: {
    value() {
      return JSON.stringify({ title: "New Pen!", html: "<div>Hello, World!</div>" });
    }
  }
};
</script>

<style scoped>
</style>
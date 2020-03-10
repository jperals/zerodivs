<template>
  <div class="output">
    <button class="close-button" v-on:click="close">Close</button>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$router.push({name: "editor"});
    }
  }
};
</script>

<style scoped>
.output {
  padding: 2rem;
  font-family: "Courier New", Courier, monospace;
  background: white;
}
.output:after {
  position: absolute;
  content: "";
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: -10;
}
</style>

<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>

<script>
import Nav from "@/components/Nav";
export default {
  components: { Nav }
};
</script>

<style>
#app {
  --panel-bg-color: hsla(0, 0%, 90%, 0.5);
  --panel-border-color: hsl(0, 0%, 90%);
  --panel-border-color-strong: hsl(0, 0%, 85%);
  --selected-color: hsl(224, 100%, 67%);
}
html,
body {
  margin: 0;
}
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
#app .editor {
  flex-grow: 1;
}
</style>

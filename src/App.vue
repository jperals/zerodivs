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
  --panel-bg-color: hsla(0, 0%, 93%, 0.75);
  --panel-border-color: hsl(0, 0%, 83%);
  --panel-border-color-strong: hsl(0, 0%, 78%);
  --selected-color: hsl(224, 100%, 67%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
.list-node {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--panel-border-color);
  font-size: 0.75rem;
}
input[type="text"],
input[type="number"] {
  padding: .125rem .25rem;
}
</style>

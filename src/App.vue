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
  --panel-border-color-stronger: hsl(0, 0%, 70%);
  /* Grays taken from https://material-ui.com/customization/color/ */
  --gray-400: #bdbdbd;
  --gray-500: #9e9e9e;
  --gray-600: #757575;
  --gray-700: #616161;
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
.panel {
  backdrop-filter: blur(4px);
}
.list-node {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--panel-border-color);
  font-size: 0.75rem;
}
input[type="text"],
input[type="number"] {
  padding: .125rem .25rem;
  font-size: 0.75rem;
}
input[type="text"].w-xs,
input[type="number"].w-xs {
  width: 3ch;
}
input[type="text"].w-s,
input[type="number"].w-s {
  width: 4ch;
}
input[type="text"].w-m,
input[type="number"].w-m {
  width: 10ch;
}
input[type="text"].w-l,
input[type="number"].w-l {
  width: 14ch;
}
</style>

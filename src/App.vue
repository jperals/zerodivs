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
  --gray-50: #fafafa;
  --gray-100: #f5f5f5;
  --gray-200: #eeeeee;
  --gray-300: #e0e0e0;
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
.modal-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.modal .actions > * {
  margin-left: .5rem;
  margin-right: .5rem;
}
.modal .main {
  background-color: white;
  padding: .5rem;
}
.modal-overlay {
  content: "";
  position: fixed;
  z-index: -20;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: hsla(0, 0%, 0%, .25);
  backdrop-filter: blur(10px);
}
.modal .actions {
  display: flex;
  flex-direction: row;
  background: white;
  border-bottom: 1px solid var(--panel-border-color);
  align-items: center;
  padding-left: .5rem;
  padding-right: .5rem;
}
.modal .actions-bottom {
  border-top: 1px solid var(--gray-200);
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  display: flex;
  justify-content: flex-end;
}
.modal .header {
  background: white;
  font-size: 1rem;
  padding: 1rem .5rem 0 .5rem;
  margin: 0;
  font-weight: normal;
}
.modal .main {
  font-size: 0.75rem;
}
button,
.button {
  min-height: 27px;
  border-radius: .25rem;
  cursor: pointer;
}
.main-action {
  background-color: var(--selected-color);
  color: white;
}
</style>

<template>
  <div id="app" :class="mode">
    <Nav />
    <router-view />
  </div>
</template>

<script>
import Nav from "@/components/Nav";
export default {
  components: { Nav },
  computed: {
    mode() {
      return this.$route.name === "gallery" ? "at-root" : "";
    }
  }
};
</script>

<style>
body {
  --brightness-300: 36%;
  --brightness-400: 43%;
  --brightness-500: 59%;
  --brightness-600: 70%;
  --brightness-650: 76%;
  --brightness-700: 82%;
  --brightness-750: 85%;
  --brightness-800: 88%;
  --brightness-850: 93%;
  --brightness-900: 96%;
  --brightness-950: 98%;
  --panel-bg-color: hsla(0, 0%, calc(var(--brightness-900)), 0.75);
  --panel-child-bg-color: hsla(0, 0%, calc(var(--brightness-800)), 1);
  --panel-border-color: hsl(0, 0%, calc(var(--brightness-800)));
  --panel-child-border-color: hsla(0, 0%, calc(var(--brightness-650)), 0.75);
  --panel-border-color-strong: hsl(0, 0%, 78%);
  --panel-border-color-stronger: hsl(0, 0%, 70%);
  /* Grays taken from https://material-ui.com/customization/color/ */
  --gray-50: #fafafa;
  --gray-100: #f5f5f5;
  --gray-200: #eeeeee;
  --gray-300: #e0e0e0;
  --gray-350: rgb(241, 241, 241);
  --gray-400: #bdbdbd;
  --gray-500: #9e9e9e;
  --gray-600: #757575;
  --gray-700: #616161;
  --gray-800: #424242;
  --gray-900: #212121;
  --selected-color: hsl(224, 100%, 67%);
  --selected-color-strong: hsl(224, 100%, 60%);
}
#app,
input,
textarea {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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
#app.at-root {
  height: 100%;
}
#app.at-root > nav {
  background-color: var(--gray-900);
  color: white;
}
#app.at-root > nav a,
#app.at-root > nav a:link,
#app.at-root > nav a:hover,
#app.at-root > nav a:visited {
  color: white;
  text-decoration: none;
}
.panel {
  backdrop-filter: blur(4px);
}
.list-node {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--panel-border-color);
  font-size: 0.75rem;
}
input[type="text"],
input[type="number"] {
  padding: 0.125rem 0.25rem;
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
  width: 12ch;
}
select.w-l {
  width: calc(12ch + 0.5rem);
}
.modal-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.modal .actions > * {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.modal .main {
  background-color: white;
  padding: 0.5rem;
}
.modal-overlay {
  content: "";
  position: fixed;
  z-index: -20;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: hsla(0, 0%, 0%, 0.25);
  backdrop-filter: blur(10px);
}
.modal .actions {
  display: flex;
  flex-direction: row;
  background: white;
  border-bottom: 1px solid var(--panel-border-color);
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
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
  padding: 1rem 0.5rem 0 0.5rem;
  margin: 0;
  font-weight: normal;
}
.modal .main {
  font-size: 0.75rem;
}
button,
.button {
  min-height: 27px;
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: white;
}
.main-action {
  background-color: var(--selected-color);
  color: white;
}
.main-action:hover {
  background-color: var(--selected-color-strong);
}
.m-l-s {
  margin-left: 0.5rem;
}
.p-h-m {
  padding-left: 1rem;
  padding-right: 1rem;
}
.p-t-s {
  padding-top: 0.5rem;
}
button {
  font-size: 0.75rem;
  border-style: solid;
  border-width: 1px;
  border-color: var(--gray-500) var(--gray-500) var(--gray-600);
}
button:hover {
  background-color: var(--gray-200);
  text-decoration: none;
}
</style>

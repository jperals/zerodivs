<template>
  <form action="https://codepen.io/pen/define" method="POST" target="_blank">
    <input type="hidden" name="data" :value="value" />
    <button type="submit">
     <span class="codepen-icon" :style="buttonStyle"></span>
     Export to CodePen
    </button>
  </form>
</template>

<script>
import layers2css from "@/common/layers2css";
import shapes2css from "@/common/shapes2css";
import store from "@/store";
import shape from "./export-to-codepen-button-shape";
export default {
  data() {
    return {
      buttonStyle: shapes2css(shape)
    };
  },
  computed: {
    value() {
      return JSON.stringify({
        css: layers2css({ layers: this.shapesLayers }),
        editors: "010",
        layout: "left",
        title: this.projectName
      });
    },
    projectName() {
      return store.getters.currentProject.name;
    },
    shapesLayers() {
      return store.getters.allLayers;
    }
  }
};
</script>

<style scoped>
button[type="submit"] {
  background-color: hsl(271, 17%, 52%);
  border: 0 none;
  border-radius: .25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: .125rem .65rem .125rem .5rem;
  color: white;
  font-size: .75rem;
  cursor: pointer;
}
.codepen-icon {
  height: 23px;
  width: 24px;
  margin-right: .5rem;
  display: inline-block;
  transform: scale(0.75);
}
button[type="submit"]:hover {
  background-color: hsl(271, 24%, 42%);
}
</style>
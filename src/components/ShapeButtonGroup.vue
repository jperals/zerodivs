<template>
  <section>
    <ShapeButton :shape="defaultShape" :class="{ selected: wasSelected }" />
    <div class="other-shapes">
      <ShapeButton
        v-for="shape in otherShapes"
        :key="shape.name"
        :onSelect="() => selectShape(shape)"
        :shape="shape"
      />
    </div>
  </section>
</template>

<script>
import { get } from "lodash";
import ShapeButton from "@/components/ShapeButton";
import store from "@/store";
export default {
  props: ["shapeGeneratorGroup"],
  components: {
    ShapeButton
  },
  data() {
    const firstShape = this.shapeGeneratorGroup[0](store.getters.currentColor)
    return {
      defaultShapeName: get(firstShape, "name")
    };
  },
  methods: {
    selectShape(shape) {
      this.defaultShapeName = shape.name;
    }
  },
  computed: {
    defaultShape() {
      return this.shapes.find(shape => shape.name === this.defaultShapeName);
    },
    otherShapes() {
      return this.shapes.filter(shape => shape.name !== this.defaultShapeName);
    },
    shapes() {
      return this.shapeGeneratorGroup.map(generator =>
        generator(store.getters.currentColor)
      );
    },
    wasSelected() {
      return get(store.getters.shapeToBeAdded, "name") === this.defaultShapeName;
    }
  }
};
</script>

<style scoped>
section {
  display: inline-flex;
  flex-direction: column;
  position: relative;
}
.other-shapes {
  position: absolute;
  top: 100%;
}
.other-shapes button {
  display: block;
}
section:not(:hover) .other-shapes {
  opacity: 0;
  pointer-events: none;
}
button.selected {
  box-shadow: 0 0 2px 2px var(--selected-color);
}
</style>
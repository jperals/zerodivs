<template>
  <section>
    <ShapeButton :shapeGenerator="defaultShapeGenerator" />
    <div class="other-shapes">
      <ShapeButton
        v-for="(shapeGenerator, index) in otherShapeGenerators"
        :key="index"
        :shapeGenerator="shapeGenerator"
      />
    </div>
  </section>
</template>

<script>
import ShapeButton from "@/components/ShapeButton";
export default {
  props: ["shapeGeneratorGroup"],
  components: {
    ShapeButton
  },
  data() {
    return { defaultShapeGeneratorIndex: 0 };
  },
  computed: {
    defaultShapeGenerator() {
      return this.shapeGeneratorGroup[this.defaultShapeGeneratorIndex];
    },
    otherShapeGenerators() {
      return this.shapeGeneratorGroup.filter(
        shapeGenerator => shapeGenerator !== this.defaultShapeGenerator
      );
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
</style>
<template>
  <div
    class="hamburger-button"
    :class="{ active: isOpen }"
    v-on:click="tryClick"
  ></div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    onClick: { type: Function, required: false },
  },
  methods: {
    tryClick(event) {
      if (this.onClick) {
        this.onClick(event);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@use "sass:math";

// Preferably keep border-width to
// an even number,
// because some calculations
// divide it by two.
$border-width: 2px;
// Height and width can be set to anything.
$width: 1.5rem;
$height: 0.75rem;
$border-color: white;
$border-color-hover: var(--gray-200);

.hamburger-button,
.hamburger-button:before,
.hamburger-button:after {
  border-color: $border-color;
  border-style: solid;
  border-left-width: 0;
  border-right-width: 0;
  transition: transform 200ms;
}

.hamburger-button:hover {
  &,
  &.hamburger-button:before,
  &.hamburger-button:after {
    border-color: $border-color-hover;
  }
}

.hamburger-button {
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  width: $width;
  height: $height;
  position: relative;
  cursor: pointer;
  border-top-width: $border-width;
  border-bottom-width: 0;
  transform-origin: center top;
}

.hamburger-button:before,
.hamburger-button:after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
}

.hamburger-button:before {
  top: calc(-#{math.div($border-width, 2)} - 50%);
  border-top-width: 0;
  border-bottom-width: $border-width;
}

.hamburger-button:after {
  top: 100%;
  border-top-width: $border-width;
  border-bottom-width: 0;
  transform-origin: top center;
}

.hamburger-button.active {
  transform: translateY(50%) rotate(45deg);
}

.hamburger-button.active:before {
  transform: translateY(-50%);
}

.hamburger-button.active:after {
  transform: translate(
      -#{math.div($border-width, 2)},
      calc(#{math.div($border-width, 2)} - 100%)
    )
    rotate(-90deg);
}
</style>

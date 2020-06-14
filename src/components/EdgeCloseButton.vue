<template>
  <a v-on:click="onClick" />
</template>

<script>
export default {
  props: {
    onClick: Function
  }
};
</script>

<style scoped>
a {
  --side: 1rem;
  --gray: var(--gray-500);
  background-color: white;
  width: var(--side);
  height: var(--side);
  right: 0;
  top: 0;
  position: absolute;
  padding: 0;
  display: block;
  cursor: pointer;
}
a:hover {
  background-color: var(--gray-100);
  border-color: var(--gray-800);
}
a:before {
  --gray: var(--gray-600);
  content: "";
  position: absolute;
  left: 20%;
  top: 20%;
  width: 60%;
  height: 60%;
  display: block;
  background-image: linear-gradient(
      transparent 40%,
      var(--gray) 40%,
      var(--gray) 60%,
      transparent 60%
    ),
    linear-gradient(
      to right,
      transparent 40%,
      var(--gray) 40%,
      var(--gray) 60%,
      transparent 60%
    );
  transform: rotate(45deg);
}
a:not(:hover):before {
  opacity: 0.6;
}
</style>

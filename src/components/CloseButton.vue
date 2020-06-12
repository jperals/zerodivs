<template>
  <button v-on:click="onClick" />
</template>

<script>
export default {
  props: {
    onClick: Function
  }
};
</script>

<style scoped>
button {
  background-color: var(--gray-400);
  position: relative;
  border: 0 none;
}
button:hover {
  background-color: var(--gray-500);
}
button:before {
  background-image: linear-gradient(
      transparent 40%,
      white 40%,
      white 60%,
      transparent 60%
    ),
    linear-gradient(
      to right,
      transparent 40%,
      white 40%,
      white 60%,
      transparent 60%
    );
  background-position: center center, center center;
  background-size: 60% 60%, 60% 60%;
  background-repeat: no-repeat;
  transform: rotate(45deg);
  display: block;
  content: '';
  width: 100%;
  height: 100%;
  position: relative;
  left: 0;
  top: 0;
}
</style>

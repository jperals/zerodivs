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
    border-radius: 50%;
    width: var(--side);
    height: var(--side);
    right: calc(var(--side) / -2.6);
    top: calc(var(--side) / -2.6);
    position: absolute;
    border: 1px solid var(--gray);
    padding: 0;
    display: block;
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, .1);
    cursor: pointer;
  }
  a:hover {
    background-color: var(--gray-100);
    border-color: var(--gray-800);
  }
  a:before {
    --gray: var(--gray-600);
    content: '';
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

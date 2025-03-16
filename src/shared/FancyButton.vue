<script lang="ts" setup>
defineProps({
  action: {
    type: Function,
    required: true,
  },
  icon: {
    type: String,
    default: "",
  },
  size: {
    type: Number,
    default: 4,
  },
});
</script>

<template>
  <img
    @click="action()"
    :src="`/images/${icon}.png`"
    :alt="icon"
    :style="{
      height: `${size}rem`,
    }"
  />
</template>

<style scoped>
img {
  transition: filter 0.3s ease;
  cursor: pointer;
}

img:hover {
  filter: brightness(70%);
}
</style>

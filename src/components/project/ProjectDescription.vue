<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "Title",
  },
  imgPath: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "description",
  },
});
</script>

<template>
  <div class="w-[30rem] sm:w-full">
    <div class="w-full h-[20rem] sm:h-[30rem] mb-3">
      <img
        class="w-full h-[20rem] sm:h-full border"
        :src="`/images/${imgPath}`"
        :alt="`${imgPath}`"
      />
    </div>
    <h2 class="mb-3">{{ title }}</h2>
    <div class="w-full h-[25rem] p-3 overflow-auto">
      <span class="text-[1.1rem]" v-html="description"></span>
    </div>
  </div>
</template>

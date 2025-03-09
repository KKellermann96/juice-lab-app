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
  disable: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits<{
  (e: "onClick"): void;
}>();
</script>

<template>
  <button
    class="w-full max-w-[16rem] h-[16.2rem] border rounded-xl text-start transition-transform transform shadow-md flex flex-col justify-start items-start"
    :class="{
      'scale-105 hover:scale-110 active:scale-[1.08] hover:shadow-xl': !disable,
    }"
    :disabled="disable"
    @click="emits('onClick')"
  >
    <img
      class="h-[9rem] w-full border-b rounded-t-xl"
      :src="`/images/${imgPath}`"
      :alt="`${imgPath}`"
    />
    <div
      class="h-[7.09rem] w-full pb-3 rounded-b-xl flex flex-col justify-between px-2 pt-1 bg-Mint-400 text-white items-start"
    >
      <span class="font-semi-bold text-[1.1rem] leading-6 mb-2">{{
        title
      }}</span>

      <button
        v-if="!disable"
        class="p-1 mt-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        View Project
      </button>
    </div>
  </button>
</template>

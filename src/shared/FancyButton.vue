<script lang="ts" setup>
import getTailwindColor from "../helpers/getTailwindColor";
import { ref } from "vue";

const props = defineProps({
  action: {
    type: Function,
    required: true,
  },
  color: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  size: {
    type: Number,
    default: 2.5,
  },
});

const buttonColor = getTailwindColor(props.color, "300");
const buttonColorHover = getTailwindColor(props.color, "500");
const isHovered = ref(false);
</script>

<template>
  <button
    @click="action()"
    :class="`flex items-center gap-2 py-[1px] pr-3 border border-black rounded-full transition`"
    :style="{
      backgroundColor: isHovered ? buttonColorHover : buttonColor,
    }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="flex items-center justify-center">
      <img
        :src="`/icons/${icon}.svg`"
        :alt="icon"
        :style="{
          height: `${size}rem`,
        }"
      />
    </div>
    <span class="text-white font-semi-bold">{{ text }}</span>
  </button>
</template>

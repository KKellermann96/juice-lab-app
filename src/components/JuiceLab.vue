<script setup lang="ts">
import { onMounted, ref } from "vue";
import { startUp } from "./startUp";

const modelPath = "/model/scene9.glb";
const threeCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  startUp(threeCanvas, modelPath);
});
</script>

<template>
  <canvas ref="threeCanvas" class="w-full h-full"></canvas>
</template>

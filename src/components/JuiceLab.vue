<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { startUp } from "./startUp";
import { CSS2DRenderer, CSS3DRenderer } from "three/examples/jsm/Addons.js";

const modelPath = "/model/scene.glb";
const threeCanvas = ref<HTMLCanvasElement | null>(null);

let htmlRenderer = new CSS2DRenderer();

onMounted(() => {
  htmlRenderer.setSize(window.innerWidth, window.innerHeight);
  htmlRenderer.domElement.style.position = "absolute";
  htmlRenderer.domElement.style.top = "0px";
  htmlRenderer.domElement.style.pointerEvents = "none";
  document.body.appendChild(htmlRenderer.domElement);
  startUp(threeCanvas, modelPath, htmlRenderer);
});

onUnmounted(() => {
  if (htmlRenderer) {
    document.body.removeChild(htmlRenderer.domElement);
    htmlRenderer = null;
  }
});
</script>

<template>
  <canvas ref="threeCanvas" class="w-full h-full"></canvas>
</template>

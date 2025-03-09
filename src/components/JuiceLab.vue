<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { startUp } from "./startUp";
import { CSS2DRenderer } from "three/examples/jsm/Addons.js";

const modelPath = "/model/scene.glb";
const threeCanvas = ref<HTMLCanvasElement | null>(null);

let htmlRenderer = new CSS2DRenderer();

onMounted(() => {
  document.addEventListener("wheel", preventZoom, { passive: false });
  document.addEventListener("keydown", preventKeyboardZoom);

  htmlRenderer.setSize(window.innerWidth, window.innerHeight);
  htmlRenderer.domElement.style.position = "absolute";
  htmlRenderer.domElement.style.top = "0px";
  htmlRenderer.domElement.style.pointerEvents = "none";
  document.body.appendChild(htmlRenderer.domElement);
  startUp(threeCanvas, modelPath, htmlRenderer);
});

onUnmounted(() => {
  document.removeEventListener("wheel", preventZoom);
  document.removeEventListener("keydown", preventKeyboardZoom);

  if (htmlRenderer) {
    document.body.removeChild(htmlRenderer.domElement);
    htmlRenderer = null;
  }
});

const preventZoom = (event: WheelEvent) => {
  if (event.ctrlKey) {
    event.preventDefault();
  }
};

const preventKeyboardZoom = (event: KeyboardEvent) => {
  if (
    event.ctrlKey &&
    (event.key === "+" || event.key === "-" || event.key === "0")
  ) {
    event.preventDefault();
  }
};
</script>

<template>
  <canvas ref="threeCanvas" class="w-full h-full"></canvas>
</template>

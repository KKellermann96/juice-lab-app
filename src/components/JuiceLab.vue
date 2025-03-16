<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { startUp } from "./startUp";
import { CSS3DRenderer } from "three/examples/jsm/Addons.js";
import { VideoTexture } from "three";

const modelPath = "/model/scene.glb";
const threeCanvas = ref<HTMLCanvasElement | null>(null);
const progress = ref(0);

let htmlRenderer = new CSS3DRenderer();
const videoElements = ref<HTMLVideoElement[]>([]);
const videoTextures = ref<VideoTexture[]>([]);

onMounted(() => {
  document.addEventListener("wheel", preventZoom, { passive: false });
  document.addEventListener("keydown", preventKeyboardZoom);

  htmlRenderer.setSize(window.innerWidth, window.innerHeight);
  htmlRenderer.domElement.style.position = "absolute";
  htmlRenderer.domElement.style.top = "0px";
  htmlRenderer.domElement.style.pointerEvents = "none";
  document.body.appendChild(htmlRenderer.domElement);
  startUp(
    threeCanvas,
    modelPath,
    htmlRenderer,
    videoElements,
    videoTextures,
    progress
  );
});

onUnmounted(() => {
  document.removeEventListener("wheel", preventZoom);
  document.removeEventListener("keydown", preventKeyboardZoom);

  if (htmlRenderer) {
    document.body.removeChild(htmlRenderer.domElement);
    htmlRenderer = null;
  }

  videoElements.value.forEach((video) => {
    video.pause();
    video.src = "";
    video.remove();
  });

  videoTextures.value.forEach((texture) => {
    texture.dispose();
  });

  videoElements.value.length = 0;
  videoTextures.value.length = 0;
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

const progressStage = computed(() => {
  if (progress.value < 15) return 0;
  else if (progress.value < 40) return 1;
  else if (progress.value < 65) return 2;
  else if (progress.value < 80) return 3;
  else return 4;
});

const removeLoadingScreen = ref(false);

watch(progress, (newValue) => {
  if (newValue >= 100) {
    setTimeout(() => {
      removeLoadingScreen.value = true;
    }, 1000);
  }
});
</script>

<template>
  <Transition name="fade">
    <div
      id="progress-bar-container"
      class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black flex flex-col justify-center items-center"
      v-if="!removeLoadingScreen"
    >
      <div
        class="apple-sprite"
        :style="{ backgroundPosition: `-${progressStage * 100}% 0` }"
      ></div>
      <label class="text-white text-[2rem]">Loading...</label>
      <span class="text-white text-[2rem]">{{ progress }}%</span>
    </div>
  </Transition>
  <canvas ref="threeCanvas" class="w-full h-full"></canvas>
</template>

<style scoped>
.apple-sprite {
  width: 500px;
  height: 500px;
  background-image: url("/images/appleBiteLoading.png");
  background-size: 500% 100%;
  background-position: 0% 0;
}
</style>

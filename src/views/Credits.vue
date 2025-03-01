<script lang="ts" setup>
import { ref } from "vue";
import FancyButton from "../shared/FancyButton.vue";

defineProps({
  goBack: {
    type: Function,
    default: () => {},
  },
});

const creditsContainer = ref<HTMLDivElement | null>(null);
defineExpose({ creditsContainer });
</script>

<template>
  <div ref="creditsContainer" class="w-[70%] flex justify-between flex-wrap">
    <div class="text-white w-[35rem] mb-[5rem]">
      <h1 class="text-[5rem] mb-5">Credits</h1>

      <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-3">
          <h2 class="text-[2rem]">Developed by:</h2>
          <li><span class="font-semi-bold">Kristian Kellermann</span></li>
        </div>

        <div class="flex flex-col gap-3">
          <h2 class="text-[2rem]">Models and illustrations:</h2>
          <li><span class="font-semi-bold">Kristian Kellermann</span></li>
        </div>

        <div class="flex flex-col gap-3">
          <h2 class="text-[2rem]">Inspired by:</h2>
          <li>
            <span class="font-semi-bold">Jesse Zhou</span> and his interactive
            Ramen Shop
          </li>
          <li>
            <span class="font-semi-bold">Marcel Kwant</span> and his Tentalabs
            Metaverse
          </li>
          <li>
            <span class="font-semi-bold">Brandon James Greer</span> and his
            amazing pixel arts
          </li>
          <li>
            <span class="font-semi-bold">Polygon Runway</span> and
            <span class="font-semi-bold">Ru's Blender Diary</span> for their
            dedication to modeling and awesome blender projects and tutorials
          </li>
        </div>

        <div class="flex flex-col gap-3">
          <h2 class="text-[2rem]">Created with:</h2>
          <li>Vue3, Typescript and ThreeJS</li>
          <li>GLTFLoader from <span class="font-semi-bold">mrdoob</span></li>
        </div>

        <div class="flex flex-col gap-3">
          <h2 class="text-[2rem]">Special Thanks:</h2>
          <li>To my family and friends who supported me on this project</li>
        </div>
      </div>
    </div>
    <div class="flex items-end">
      <FancyButton
        :action="goBack"
        icon="backIcon"
        :size="3"
        color="purple"
        text="Go Back"
      >
      </FancyButton>
    </div>
  </div>
</template>

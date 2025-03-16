<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import FancyButton from "../shared/FancyButton.vue";

const gameUrl = ref("/game/gunRunner/index.html");
const distance = ref(0);
const startGame = ref(false);
const toggleControlls = ref(false);

defineProps({
  goBack: {
    type: Function,
    default: () => {},
  },
});

const play = () => {
  startGame.value = true;
  toggleControlls.value = true;
};

const handleMessage = (event: MessageEvent) => {
  if (event.data) {
    if (event.data.type === "distance") {
      if (event.data.value > distance.value) {
        distance.value = event.data.value;
      }
    }
    if (event.data.type === "quitGame") {
      startGame.value = false;
    }
  }
};

onMounted(() => {
  window.addEventListener("message", handleMessage);
});

onUnmounted(() => {
  window.removeEventListener("message", handleMessage);
});

const gunRunnerContainer = ref<HTMLDivElement | null>(null);

defineExpose({ gunRunnerContainer });
</script>

<template>
  <div
    ref="gunRunnerContainer"
    class="relative w-[80.1rem] h-[70.5rem] flex flex-col items-center"
  >
    <img
      v-if="!startGame"
      class="my-4 z-10 h-[25rem] sm:h-[39rem]"
      src="/images/gunRunnerBanner.jpg"
      alt="GunRunnerBanner"
    />
    <iframe
      v-else
      ref="unityFrame"
      :src="gameUrl"
      frameborder="0"
      class="w-full h-[42rem] z-10 mb-3"
    ></iframe>

    <div
      v-if="!startGame"
      class="mb-3 grid grid-cols-2 sm:flex gap-x-5 gap-y-3 z-10"
    >
      <FancyButton :action="play" icon="play"> </FancyButton>
      <FancyButton
        :action="
          () => {
            toggleControlls = false;
          }
        "
        icon="story"
      >
      </FancyButton>
      <FancyButton
        :action="
          () => {
            toggleControlls = true;
          }
        "
        icon="control"
      >
      </FancyButton>
      <FancyButton :action="goBack" icon="home"> </FancyButton>
    </div>
    <div
      class="w-[30rem] sm:w-[60rem] h-[19rem] z-10 flex gap-4 text-white font-pixel"
    >
      <Transition name="fade" mode="out-in">
        <div v-if="!toggleControlls" class="flex flex-col gap-2">
          <div>
            <span class="mr-5 font-semi-bold text-[1.5rem]">Story</span>
            <hr class="w-[21rem] h-[1px] border-t-0 bg-white mb-2" />
          </div>
          <div class="overflow-auto">
            <p class="mb-2">
              Welcome to
              <span class="font-semi-bold text-green-200"
                >GunRunner: Procedural Assault</span
              >
              - a 2D shooter demo that takes place in a futuristic world full of
              menace and action! You take control of an advanced cyborg who must
              fight his way through an endless sequence of procedurally
              generated levels to save the world from a robot invasion.
            </p>
            <span class="font-semi-bold mb-1">Challenges:</span>
            <p>
              Your mission is to bravely fight your way through increasingly
              difficult levels populated by dangerous robots. But beware, you're
              equipped with a ticking time bomb. He must continuously keep
              moving, since standing still will cause his drive core to overheat
              and lead to an explosion. However, you have a limited resource to
              escape the pressure: The
              <span class="text-green-200">S</span> key allows you to stop for 3
              seconds and analyze your surroundings more closely.
            </p>
          </div>
        </div>
        <div v-else class="w-full flex justify-between">
          <div class="flex flex-col gap-3 w-[24rem]">
            <div>
              <span class="mr-5 font-semi-bold text-[1.5rem]">Controlls</span>
              <hr class="w-[14rem] h-[1px] border-t-0 bg-white mb-2" />
            </div>

            <li><span class="text-green-200">Esc</span> to Pause</li>
            <li>Use the <span class="text-green-200">mouse</span> to shoot</li>

            <li><span class="text-green-200">Space Bar</span> to jump</li>
            <li><span class="text-green-200">S</span> to stop</li>
          </div>
          <div v-if="startGame" class="flex flex-col gap-2">
            <div>
              <span class="mr-5 font-semi-bold text-[1.5rem]">Highscrore</span>
              <hr class="w-[21rem] h-[1px] border-t-0 bg-white mb-2" />
            </div>
            <!-- TODO: Add Highscore system -->
            <!-- <div class="flex flex-col gap-1 h-[10rem] overflow-y-auto">
              <li class="text-arcade-200">1. User1: 1000m</li>
              <li class="text-arcade-300">2. User2: 840m</li>
              <li class="text-arcade-400">3. User3: 839m</li>
              <li v-for="i in 47" :key="i">
                {{ i + 4 }}. {{ "User " + i }}: {{ i + 100 }}
              </li>
            </div> -->
            <span class="mt-3 text-[1.7rem]"
              >Your best score: {{ distance }}m</span
            >
          </div>
        </div>
      </Transition>
    </div>

    <img
      class="absolute top-0 left-0 w-full h-full z-0"
      src="/images/arcadeBackground.png"
      alt="ArcadeBackground"
    />
  </div>
</template>

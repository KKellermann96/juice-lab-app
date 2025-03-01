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
      distance.value = event.data.value;
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
    class="w-screen h-screen flex items-center justify-center pt-[4.3rem] pb-[5.4rem]"
  >
    <div
      class="relative w-[79.7rem] h-full bg-arcade-100 flex flex-col items-center"
    >
      <div class="h-[4rem] w-full bg-black z-10"></div>
      <img
        v-if="!startGame"
        class="my-4 z-10 h-[39rem]"
        src="/src/assets/images/gunRunnerBanner.jpg"
        alt="GunRunnerBanner"
      />
      <iframe
        v-else
        ref="unityFrame"
        :src="gameUrl"
        frameborder="0"
        class="w-[79.7rem] h-[42rem] z-10"
      ></iframe>

      <div v-if="!startGame" class="mb-5 flex gap-5 z-10">
        <FancyButton
          :action="play"
          icon="playIcon"
          color="green"
          text="Play Game"
        >
        </FancyButton>
        <FancyButton
          :action="
            () => {
              toggleControlls = false;
            }
          "
          icon="bookIcon"
          color="red"
          text="Story"
        >
        </FancyButton>
        <FancyButton
          :action="
            () => {
              toggleControlls = true;
            }
          "
          icon="gameIcon"
          color="blue"
          text="Controlls"
        >
        </FancyButton>
        <FancyButton
          :action="goBack"
          icon="backIcon"
          color="purple"
          text="Go Back"
        >
        </FancyButton>
      </div>
      <div class="w-[60rem] h-[15rem] z-10 flex gap-4 text-white">
        <div v-if="!toggleControlls" class="flex flex-col gap-2">
          <div>
            <span class="mr-5 font-semi-bold text-[1.5rem]">Story</span>
            <hr class="w-[21rem] h-[1px] border-t-0 bg-white mb-2" />
          </div>
          <div>
            <p class="mb-2">
              Welcome to
              <span class="font-semi-bold text-green-100"
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
              escape the pressure: The "S" key allows you to pause for 3 seconds
              and analyze your surroundings more closely.
            </p>
          </div>
        </div>
        <div v-if="toggleControlls" class="w-full flex justify-between">
          <div class="flex flex-col gap-2 w-[22rem]">
            <div>
              <span class="mr-5 font-semi-bold text-[1.5rem]">Controlls</span>
              <hr class="w-[21rem] h-[1px] border-t-0 bg-white mb-2" />
            </div>
            <li>
              Use the <span class="font-semi-bold">mouse</span> to target and
              shoot enemies.
            </li>
            <li><span class="font-semi-bold">Space Bar</span> to jump</li>
            <li><span class="font-semi-bold">Esc</span> to Pause</li>
            <li>
              The <span class="font-semi-bold">"S"</span> key allows you to
              pause in place for a short time and plan the next step of your
              tactics.
            </li>
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
      </div>

      <img
        class="absolute top-0 left-0 w-full h-full z-0"
        src="/src/assets/images/arcadeBackground.jpg"
        alt="ArcadeBackground"
      />
    </div>
  </div>
</template>

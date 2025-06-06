<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import FancyButton from "../shared/FancyButton.vue";
import { Highscore } from "../models";
import { highscoreService, playerService } from "../services";

const gameUrl = ref("/game/gunRunner/index.html");
const distance = ref(0);
const startGame = ref(false);
const toggleControlls = ref(false);

const props = defineProps({
  goBack: {
    type: Function,
    default: () => {},
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
});

const play = () => {
  if (props.isMobile) {
    alert("This game is only supported on desktop browsers.");
    return;
  }
  startGame.value = true;
  toggleControlls.value = true;
};

const handleMessage = async (event: MessageEvent) => {
  if (event.data) {
    if (event.data.type === "distance") {
      if (event.data.value > distance.value) {
        distance.value = +event.data.value;
        if (playerHighscore.value < distance.value && playerName.value.length) {
          await highscoreService.updateHighscore(
            playerName.value,
            distance.value
          );
          allHighscores.value = await highscoreService.getHighscores();
        }
      }
    }
    if (event.data.type === "quitGame") {
      startGame.value = false;
    }
  }
};

const allHighscores = ref<Highscore[]>([]);
const playerName = ref<string>("");

const playerHighscore = computed(
  () =>
    allHighscores.value.find((highscore) => highscore.name === playerName.value)
      ?.score ?? 0
);
onMounted(async () => {
  window.addEventListener("message", handleMessage);
  playerName.value = await playerService.getPlayername();
  allHighscores.value = await highscoreService.getHighscores();
});

const reset = () => {
  props.goBack();
  window.removeEventListener("message", handleMessage);
};

const gunRunnerContainer = ref<HTMLDivElement | null>(null);

defineExpose({ gunRunnerContainer });
</script>

<template>
  <div
    ref="gunRunnerContainer"
    class="relative h-screen w-screen flex justify-center items-center !select-text"
  >
    <div>
      <div class="relative w-[80.1rem] h-[70.5rem] flex flex-col items-center">
        <div class="bg-black w-full z-10 flex justify-center" :key="distance">
          <div
            class="w-[60rem] h-5 flex flex-col sm:flex-row items-center justify-between"
          >
            <div class="z-10 text-white font-pixel flex gap-1">
              <span>Player:</span>
              <span
                class="underline w-[25rem] overflow-hidden text-nowrap text-ellipsis"
                >{{ playerName }}</span
              >
            </div>
            <div class="z-10 text-white font-pixel flex gap-1">
              <span>Highscore:</span>
              <span>{{ playerHighscore }}m</span>
            </div>
          </div>
        </div>
        <img
          v-if="!startGame"
          class="my-3 z-10 h-[25rem] sm:h-[39rem]"
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
          <FancyButton :action="reset" icon="home"> </FancyButton>
        </div>
        <div
          class="w-[30rem] sm:w-[60rem] h-[20rem] z-10 flex gap-4 text-white font-pixel"
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
                  - a 2D shooter demo that takes place in a futuristic world
                  full of menace and action! You take control of an advanced
                  cyborg who must fight his way through an endless sequence of
                  procedurally generated levels to save the world from a robot
                  invasion.
                </p>
                <span class="font-semi-bold mb-1">Challenges:</span>
                <p>
                  Your mission is to bravely fight your way through increasingly
                  difficult levels populated by dangerous robots. But beware,
                  you're equipped with a ticking time bomb. He must continuously
                  keep moving, since standing still will cause his drive core to
                  overheat and lead to an explosion. However, you have a limited
                  resource to escape the pressure: The
                  <span class="text-green-200">S</span> key allows you to stop
                  for 3 seconds and analyze your surroundings more closely.
                </p>
              </div>
            </div>
            <div v-else class="w-full flex justify-between">
              <div class="flex flex-col gap-3 w-[24rem]">
                <div>
                  <span class="mr-5 font-semi-bold text-[1.5rem]"
                    >Controlls</span
                  >
                  <hr class="w-[14rem] h-[1px] border-t-0 bg-white mb-2" />
                </div>

                <li><span class="text-green-200">Esc</span> to Pause</li>
                <li>
                  Use the <span class="text-green-200">mouse</span> to shoot
                </li>

                <li><span class="text-green-200">Space Bar</span> to jump</li>
                <li><span class="text-green-200">S</span> to stop</li>
              </div>
              <div class="flex flex-col gap-2">
                <div>
                  <span class="mr-5 font-semi-bold text-[1.5rem]"
                    >Highscrore</span
                  >
                  <hr class="w-[21rem] h-[1px] border-t-0 bg-white mb-2" />
                </div>
                <div
                  v-if="allHighscores.length"
                  :key="distance"
                  class="flex flex-col gap-1 h-[10rem] overflow-y-auto"
                >
                  <span
                    v-for="(highscore, idx) in allHighscores"
                    :key="highscore.name"
                    :class="{
                      'text-arcade-200': idx === 0,
                      'text-arcade-300': idx === 1,
                      'text-arcade-400': idx === 2,
                    }"
                  >
                    <div class="flex gap-1">
                      <span>{{ `${idx + 1}.` }}</span>
                      <span
                        class="w-[10rem] sm:w-[25rem] overflow-hidden text-ellipsis"
                        >{{ `${highscore.name}:` }}</span
                      >
                      <span>{{ `${highscore.score}m` }}</span>
                    </div>
                  </span>
                </div>
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
    </div>
  </div>
</template>
